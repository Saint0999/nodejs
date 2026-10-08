const fs = require('fs');
const path = './files/lorem.txt';

const rs = fs.createReadStream(path, {encoding: 'utf8'});

const ws = fs.createWriteStream('./files/new-lorem.txt');

rs.on('data', (dataChunk) => {
    ws.write(dataChunk);
});