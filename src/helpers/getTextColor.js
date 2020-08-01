const contrastRatio = require('./getContrastRatio')

const getTextColor = userColor => {
    return contrastRatio(userColor, 1) > contrastRatio(userColor, 0)
        ? [255, 255, 255]
        : [0, 0, 0]
}

module.exports = getTextColor
