const tinycolor = require('tinycolor2')

const analogousSet = primary => {
    return tinycolor(primary)
        .analogous()
        .map(color => color.toHexString())
}

const triadicSet = primary => {
    return tinycolor(primary)
        .triad()
        .map(color => color.toHexString())
}

const complimentary = primary => {
    return tinycolor(primary).complement().toRgbString()
}

module.exports = {
    analogous: analogousSet,
    triadic: triadicSet,
    complimentary: complimentary
}
