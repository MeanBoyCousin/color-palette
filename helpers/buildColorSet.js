const chroma = require('chroma-js')

const blendColors = require('./blendColors')

const buildColorSet = (stream, name, color, textColor) => {
    stream.write(`$${name}: rgb(${chroma(color).rgb()});\n`)
    stream.write(
        `$${name}_h: ${blendColors(
            [chroma(color).rgb(), 1],
            [textColor, 0.06]
        )};\n`
    )
    stream.write(
        `$${name}_ac: ${blendColors(
            [chroma(color).rgb(), 1],
            [textColor, 0.18]
        )};\n`
    )

    stream.write(`$${name}_l: rgb(${chroma(color).brighten().rgb()});\n`)
    stream.write(
        `$${name}_l_h: ${blendColors(
            [chroma(color).brighten().rgb(), 1],
            [textColor, 0.06]
        )};\n`
    )
    stream.write(
        `$${name}_l_ac: ${blendColors(
            [chroma(color).brighten().rgb(), 1],
            [textColor, 0.18]
        )};\n`
    )

    stream.write(`$${name}_d: rgb(${chroma(color).darken().rgb()});\n`)
    stream.write(
        `$${name}_d_h: ${blendColors(
            [chroma(color).darken().rgb(), 1],
            [textColor, 0.06]
        )};\n`
    )
    stream.write(
        `$${name}_d_ac: ${blendColors(
            [chroma(color).darken().rgb(), 1],
            [textColor, 0.18]
        )};\n`
    )
}

module.exports = buildColorSet
