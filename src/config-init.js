const fs = require('fs')

const configStream = fs.createWriteStream('./color-palette.config.js')

configStream.write(`module.exports = {
    primary: '#0F4C81',
    colorSets: ['Complimentary'],
    pseudo: true,
    directory: './'
}`)
