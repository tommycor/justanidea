var gulp            = require('gulp');
var browserify      = require('browserify');
var babelify        = require('babelify');
var path            = require('path');
var stylus          = require('gulp-stylus');
var sass            = require('gulp-sass');
var uncss           = require('gulp-uncss');
var plumber         = require('gulp-plumber');
var minifyCSS       = require('gulp-minify-css');
var sourcemaps      = require('gulp-sourcemaps');
var postcss         = require('gulp-postcss');
var autoprefixer    = require('autoprefixer');
var gutil           = require('gulp-util');
var source          = require('vinyl-source-stream');
var buffer          = require('vinyl-buffer');
var browserSync     = require('browser-sync');
var modRewrite      = require('connect-modrewrite');
var del             = require('del');
var uglify          = require('gulp-uglify');
var notify          = require("gulp-notify");
var watchify        = require('watchify');
var stringify       = require('stringify');
var CFonts          = require('cfonts');
var concat          = require('gulp-concat');

var config  = {
    proxy: 'http://localhost:8080',

    sourceDir: './src/',
    destDir:   './static/',
    buildDir: './bin/',

    stylesDir: 'styles/',
    stylesEntryPoint: 'styles.scss',
    autoprefixer: ['last 8 versions'],

    scriptDir:  'scripts/',
    scriptEntryPoint: 'initialize.js',
    scriptOutput: 'bundle.js',

    libsDir: 'libs/',

    iconsDir: 'icons/',
    iconsOutput: 'src/scripts/components/my-application/',
    iconsName: 'icons',
    iconsExtension: '.html'
}
var fontConf = {
    font: 'block',
    align: 'left',
    colors: ['red', 'yellow'],
    background: 'black',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0'
};


var isWatching = true;
var rootPath   = path.dirname() + '/';


// clean (remove sourcemaps on build)
// -------------------------
gulp.task('clean', function (cb) {
    del([rootPath + config.destDir + '*.map']).then(function(){
        console.log('cleaned')
    });
});


// copy
// -------------------------
gulp.task('copy', function (cb) {
    gulp.src([
            rootPath + config.destDir + '/**/*',
            '!' + rootPath + config.destDir + '*.css', //the css that is aat the root,
            '!' + rootPath + config.destDir + config.scriptOutput //the js that is aat the root,
        ])
        .pipe(gulp.dest(config.buildDir));
});


// scripts (Builds the scripts based on a single entry point using browserify)
// -------------------------
gulp.task('scripts', function() {

    //bypass gulp method and use browserify
    var bundler = browserify( rootPath + config.sourceDir + config.scriptDir + config.scriptEntryPoint, {
            debug: true,
            extensions: [ '.js', '.html', '.glsl' ],
            fullPaths: true,
            debug: isWatching,
            paths: [
                rootPath + config.sourceDir + config.scriptDir
                //rootPath + configExt.scripteaseDir,
                //rootPath + configExt.scriptease
            ],
            transform: [
                [ stringify(['.html', '.glsl']) ],
                [ babelify ]
            ],
            cache: {},
            packageCache: {}
        }
    );

    //don't use gulp watch to avoid browerify rebuild on each file chnage
    //instead we use watchify
    if(isWatching){
        bundler = watchify(bundler);
        bundler.on('update', bundle);
    }

    function bundle(){
        var startBundleTime = Date.now();
        return bundler.bundle()
            .on('error', function(err) {
                console.error(err); this.emit('end');
                notify({title:'Gulp: scripts', message: err, icon: path.join(__dirname, 'es6.png')});
            })
            .pipe(source(config.scriptOutput))
            .pipe(buffer())
            .pipe(!isWatching ? gutil.noop() : sourcemaps.init({ loadMaps: true }))
            .pipe(!isWatching ? gutil.noop() : sourcemaps.write('./'))
            .pipe(!isWatching ? uglify() : gutil.noop() )
            .pipe(gulp.dest( !isWatching ? rootPath + config.buildDir : rootPath + config.destDir ))
            .pipe(!isWatching ? gutil.noop() : browserSync.reload({stream:true})) //tell the browser to reload itself
            .pipe(notify({title:'Gulp: scripts', message:'success', icon: path.join(__dirname, 'es6.png')}));
    }

    bundle();

});


// styles
// -------------------------

gulp.task('styles', function() {
    gulp.src([ rootPath + config.sourceDir + config.stylesDir + '**/' + config.stylesEntryPoint ])
        .pipe(sass({'include css': true}))
        .on('error', function(err){
            console.error(err); this.emit('end');
            notify({title:'Gulp: styles', message: err, icon: path.join(__dirname, 'stylus.png')});
        })
        .pipe(postcss([ autoprefixer({ browsers: config.autoprefixer }) ]))
        .pipe(!isWatching ? gutil.noop() : sourcemaps.init({ loadMaps: true }))
        //.pipe(isWatching ? gutil.noop() : uncss({
          //  html: [rootPath + config.destDir + '**/*.html']
//        }))
        .pipe(isWatching ? gutil.noop() : minifyCSS({ advanced: false }))
        .pipe(!isWatching ? gutil.noop() : sourcemaps.write('./'))
        .pipe(gulp.dest( !isWatching ? rootPath + config.buildDir : rootPath + config.destDir ))
        .pipe(browserSync.stream({match: '**/*.css'})) // live css injection to avoid browser reload
        .pipe(notify({title:'Gulp: styles', message:'success', icon: path.join(__dirname, 'stylus.png')}));
});


// serve
// -------------------------

gulp.task('serve', function () {
    var options = {ghostMode: false};
    if(!config.proxy){
        options.server= {
            baseDir: [ rootPath + config.destDir ],
            middleware: [
                modRewrite([ '^[^\\.]*$ /index.html [L]' ])
            ]
        };
    }
    else {
        options.proxy = config.proxy;
    }
    browserSync(options);
});

gulp.task('jsLibs', function() {
    return gulp.src( config.sourceDir + config.scriptDir + config.libsDir + '*.js')
    .pipe(concat('libs.js'))
    .pipe(gulp.dest( config.destDir))
    .pipe(notify('jsLibs Complete!'));
});

// default
// -------------------------

gulp.task('default', function() {

    isWatching = true;

    // gulp.watch( rootPath + config.sourceDir + config.scriptDir + '**/*',  ['scripts']);
    // we use watchify to to rebuild browsrify conf on each file change

    // Watch the CSS directory for changes and re-run styles task when it changes

    // Run scripts and styles tasks for the first time
    // chalkAnimation.rainbow('Wow. Very watching. Much compilation.');
    gulp.start('scripts');
    gulp.start('styles');

    CFonts.say('Wow.', fontConf);
    CFonts.say('Very watching.', fontConf);
    CFonts.say('Much compilation.', fontConf);

    // Run the server
    gulp.start('serve');

    gulp.watch( rootPath + config.sourceDir + config.stylesDir + "**/*", ['styles']);
});

// build
// -------------------------
gulp.task('build', function() {
    isWatching = false;

    gulp.start('clean');
    gulp.start('scripts');
    gulp.start('styles');
    gulp.start('jsLibs');
    gulp.start('copy');

    CFonts.say('Wow.', fontConf);
    CFonts.say('Very building.', fontConf);
    CFonts.say('Much compilation.', fontConf);
});