var fs = require('fs') // importing file system modules of node js

class decodeFile {
    constructor() {

    }
    convert(file) {
        var binaryData = fs.readFileSync(file); // reading binary data of the file
        var base64String = new Buffer.from(binaryData, 'base64').toString(); //converting binary data to base64 string
        var decodedString = new Buffer.from(base64String, 'base64').toString();
        // console.log(decodedString);

        fs.writeFile('decodedResume.pdf', decodedString, function (err) {
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
