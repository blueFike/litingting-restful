var fs = require('fs');
var itemsFile = './items.json';

fs.stat(itemsFile, function (err, stat) {
    var fileNotFound = !(stat && stat.isFile());

    if (fileNotFound) {
        initFile();
    }
});

function initFile() {
    fs.open(itemsFile, 'a', function (err, fd) {
        fs.write(fd, "", 0, 'utf-8', function (err) {
            if (err) {
                console.error(err.stack);
            }
        });
    });
}
