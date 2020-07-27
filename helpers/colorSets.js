const tinycolor = require('tinycolor2')

const analogousSet = primary => {
    return tinycolor(primary)
        .analogous()
        .map(color => color.toHexString())
}

const complimentary = primary => {
    return tinycolor(primary).complement().toRgbString()
}

const triadicSet = primary => {
    return tinycolor(primary)
        .triad()
        .map(color => color.toHexString())
}

module.exports = {
    analogous: analogousSet,
    triadic: triadicSet,
    complimentary: complimentary
}
