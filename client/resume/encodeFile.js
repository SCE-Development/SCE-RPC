var fs = require('fs') // importing file system modules of node js

class encodeFile {
    constructor() {

    }
    convert(file) {
        var binaryData = fs.readFileSync(file); // reading binary data of the file
        var base64String = new Buffer.from(binaryData).toString("base64"); //converting binary data to base64 string

        fs.writeFile('encodedFile.txt', base64String, function (err) {
            if (err) return console.log(err);
        });
    }
}

module.exports = encodeFile;
