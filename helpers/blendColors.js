const chroma = require('chroma-js')
const { normal } = require('color-blend')

const blendFormat = (color, alpha) => {
    const ch = chroma(color).rgb()
    return { r: ch[0], g: ch[1], b: ch[2], a: alpha }
}

const blendColors = (primary, text) => {
    const blended = normal(blendFormat(...primary), blendFormat(...text))
    return `rgb(${blended.r}, ${blended.g}, ${blended.b})`
}

module.exports = blendColors
