const fs = require('fs')

const createStream = path => {
    return fs.createWriteStream(path)
}

module.exports = createStream
