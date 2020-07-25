const relativeLuminance = (r, g, b) => {
    const sRGB = [r / 255, g / 255, b / 255]
    const lRGB = sRGB.map(color => {
        return color <= 0.03928
            ? color / 12.92
            : Math.pow((color + 0.055) / 1.055, 2.4)
    })

    return 0.2126 * lRGB[0] + 0.7152 * lRGB[1] + 0.0722 * lRGB[2]
}

module.exports = relativeLuminance
