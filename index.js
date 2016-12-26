const checkos = require('./lib/checkos.js');
const this_os = checkos.get();
const exec = require('child_process').exec, fs = require('fs'), path = require('path');
const moment = require('moment'), temp_dir = require('os').tmpdir();
const Promise = require('bluebird')

function exists(path) {
    return fs.existsSync(path);
}
function isFile(path) {
    return exists(path) && fs.statSync(path).isFile();
}
function isDir(path) {
    return exists(path) && fs.statSync(path).isDirectory();
}
function getnow() {
    return moment().format('YYYYMMDDhhmmss');
}
function runcmd(cmd, callback, end) {
    let zip = exec(cmd);
    zip.stdout.on('data', function (data) {
        callback('msg:' + data)
    });
    zip.stdout.on('error', function (data) {
        callback('err:' + data)
    });
    zip.on('exit', function (code) {
        end(~~code === 0)
    });
}

exports.dirzip = function (dir_path, new_path, callback) {
    let zip_cmd = '';
    if (new_path && isDir(new_path))
        new_path = new_path + path.sep + getnow() + '.zip';
    let new_zip_path = new_path || temp_dir + path.sep + getnow() + '.zip'
    if (!isDir(dir_path))
        throw 'dir is not exists or is not dir!'
    else {
        switch (this_os) {
            case checkos.win: ; break;
            case checkos.linux: ; break;
            case checkos.mac:
                let last_path = path.dirname(dir_path), dir_path_split = dir_path.split(path.sep);
                zip_cmd = `cd ${last_path} && zip -q -r ${new_zip_path} ${dir_path_split[dir_path_split.length - 1]}`;
                let result = '';
                runcmd(zip_cmd, msg => {
                    result += msg;
                }, end => {
                    if (end) {
                        callback(null, new_zip_path)
                    } else
                        callback(result)
                })
                break;
        }
    }
}
exports.dirzipAsync = Promise.promisify(this.dirzip)

this.dirzipAsync('', '').then(path => {
    console.log(path)
}).catch(err => {
    console.log(err)
})