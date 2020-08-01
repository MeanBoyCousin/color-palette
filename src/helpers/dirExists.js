const fs = require('fs')

const dirExists = dir => {
    if (fs.existsSync(dir)) {
        return false
    } else {
        fs.mkdirSync(dir, { recursive: true })
    }
}

module.exports = dirExists
