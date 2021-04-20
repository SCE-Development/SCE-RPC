var fs = require('fs') // importing file system modules of node js
// var wwgs = require('WindowOrWorkerGlobalScope')
var b = require('js-base64')

class decodeFile {
    constructor() {

    }
    convert(file) {
        var binaryData = fs.readFileSync(file); // reading binary data of the file
        var base64String = new Buffer.from(binaryData, 'base64').toString(); //converting binary data to base64 string
        const byte_chars = b.atob(base64String);
        const byte_numbers = new Array(byte_chars.length);
        for (let i = 0; i < byte_chars.length; i++) {
            byte_numbers[i] = byte_chars.charCodeAt(i);
        }
        const byte_array = new Uint8Array(byte_numbers);
        
        fs.writeFile('decodedResume.pdf', byte_array, function (err) {
            if (err) return console.log(err);
        });
    }
}

function main () {
    decoder = new decodeFile();
    decoder.convert('encodedResume.txt');
}

main();
// module.exports = encodeFile;
