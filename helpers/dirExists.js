const fs = require('fs')

const dirExists = dir => {
    fs.existsSync(dir) ? false : fs.mkdirSync(dir, { recursive: true })
}

module.exports = dirExists
