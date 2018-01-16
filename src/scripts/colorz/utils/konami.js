module.exports = function konami(callback) {
    var sequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    var position = 0;
    document.addEventListener('keyup', function (event) {
        if (position < sequence.length && event.which == sequence[position]) {
            position++;
        } else {
            position = 0;
        }
        if (position == sequence.length) {
            position = 0;
            callback();
        }
    });
}