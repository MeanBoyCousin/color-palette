const chroma = require('chroma-js')
const dedent = require('dedent')

const blendColors = require('./blendColors')

const buildColorSet = (variableStream, mixinStream, name, color, textColor) => {
    // Write variables.
    variableStream.write(`$${name}: rgb(${chroma(color).rgb()});\n`)
    variableStream.write(
        `$${name}_hover: ${blendColors(
            [chroma(color).rgb(), 1],
            [textColor, 0.06]
        )};\n`
    )
    variableStream.write(
        `$${name}_active: ${blendColors(
            [chroma(color).rgb(), 1],
            [textColor, 0.18]
        )};\n`
    )

    variableStream.write(
        `$${name}_light: rgb(${chroma(color).brighten().rgb()});\n`
    )
    variableStream.write(
        `$${name}_light_hover: ${blendColors(
            [chroma(color).brighten().rgb(), 1],
            [textColor, 0.06]
        )};\n`
    )
    variableStream.write(
        `$${name}_light_active: ${blendColors(
            [chroma(color).brighten().rgb(), 1],
            [textColor, 0.18]
        )};\n`
    )

    variableStream.write(
        `$${name}_dark: rgb(${chroma(color).darken().rgb()});\n`
    )
    variableStream.write(
        `$${name}_dark_hover: ${blendColors(
            [chroma(color).darken().rgb(), 1],
            [textColor, 0.06]
        )};\n`
    )
    variableStream.write(
        `$${name}_dark_active: ${blendColors(
            [chroma(color).darken().rgb(), 1],
            [textColor, 0.18]
        )};\n`
    )
    variableStream.write(`$${name}_text: rgb(${textColor});\n\n`)

    // Write mixins.
    mixinStream.write(dedent`@mixin ${name} {
            background-color: rgb(${chroma(color).rgb()});
            color: rgb(${textColor});
            &:hover {
                background-color: ${blendColors(
                    [chroma(color).rgb(), 1],
                    [textColor, 0.06]
                )};
            }
            &:active {
                background-color: ${blendColors(
                    [chroma(color).rgb(), 1],
                    [textColor, 0.18]
                )};
            }
        }\n\n`)

    mixinStream.write(dedent`@mixin ${name}_light {
            background-color: rgb(${chroma(color).brighten().rgb()});
            color: rgb(${textColor});
            &:hover {
                background-color: ${blendColors(
                    [chroma(color).brighten().rgb(), 1],
                    [textColor, 0.06]
                )};
            }
            &:active {
                background-color: ${blendColors(
                    [chroma(color).brighten().rgb(), 1],
                    [textColor, 0.18]
                )};
            }
        }\n\n`)

    mixinStream.write(dedent`@mixin ${name}_dark {
            background-color: rgb(${chroma(color).darken().rgb()});
            color: rgb(${textColor});
            &:hover {
                background-color: ${blendColors(
                    [chroma(color).darken().rgb(), 1],
                    [textColor, 0.06]
                )};
            }
            &:active {
                background-color: ${blendColors(
                    [chroma(color).darken().rgb(), 1],
                    [textColor, 0.18]
                )};
            }
        }\n\n`)
}

module.exports = buildColorSet
