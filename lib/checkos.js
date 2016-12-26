const this_os = require('os').type();

//win 0 linux 1 mac 2
exports.win = 0
exports.linux = 1
exports.mac = 2
exports.get = function () {
    let os_type = {
        Windows_NT: this.win,
        Linux: this.linux,
        Darwin: this.mac
    };
    return os_type[this_os]
}   