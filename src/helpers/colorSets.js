const chroma = require('chroma-js')

const complimentary = color => {
    const hsl = chroma(color).hsl()
    const h = (hsl[0] + 180) % 360
    const rgb = chroma(`hsl(${h}, ${hsl[1] * 100}%, ${hsl[2] * 100}%)`).rgb()
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}

const triadicSet = color => {
    const hsl = chroma(color).hsl()
    const h1 = (hsl[0] + 120) % 360
    const h2 = (hsl[0] + 240) % 360
    const rgb1 = chroma(`hsl(${h1}, ${hsl[1] * 100}%, ${hsl[2] * 100}%)`).rgb()
    const rgb2 = chroma(`hsl(${h2}, ${hsl[1] * 100}%, ${hsl[2] * 100}%)`).rgb()
    return [
        `rgb(${rgb1[0]}, ${rgb1[1]}, ${rgb1[2]})`,
        `rgb(${rgb2[0]}, ${rgb2[1]}, ${rgb2[2]})`
    ]
}

const analogousSet = color => {
    const hsl = chroma(color).hsl()
    const h1 = (hsl[0] + 24) % 360
    const h2 = (hsl[0] + -24) % 360
    const rgb1 = chroma(`hsl(${h1}, ${hsl[1] * 100}%, ${hsl[2] * 100}%)`).rgb()
    const rgb2 = chroma(`hsl(${h2}, ${hsl[1] * 100}%, ${hsl[2] * 100}%)`).rgb()
    return [
        `rgb(${rgb1[0]}, ${rgb1[1]}, ${rgb1[2]})`,
        `rgb(${rgb2[0]}, ${rgb2[1]}, ${rgb2[2]})`
    ]
}

module.exports = {
    analogous: analogousSet,
    triadic: triadicSet,
    complimentary: complimentary
}
