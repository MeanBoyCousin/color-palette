const chroma = require('chroma-js')
const dedent = require('dedent')

const { blendColors } = require('./blendColors')

const buildVariables = (name, color, textColor, pseudo) => {
    const main = `$${name}: rgb(${chroma(color).rgb().join(', ')});\n`
    const mainHover = `$${name}_hover: ${blendColors(
        [chroma(color).rgb(), 1],
        [textColor, 0.06]
    )};\n`
    const mainActive = `$${name}_active: ${blendColors(
        [chroma(color).rgb(), 1],
        [textColor, 0.18]
    )};\n`
    const light = `$${name}_light: rgb(${chroma(color)
        .brighten()
        .rgb()
        .join(', ')});\n`
    const lightHover = `$${name}_light_hover: ${blendColors(
        [chroma(color).brighten().rgb(), 1],
        [textColor, 0.06]
    )};\n`
    const lightActive = `$${name}_light_active: ${blendColors(
        [chroma(color).brighten().rgb(), 1],
        [textColor, 0.18]
    )};\n`
    const dark = `$${name}_dark: rgb(${chroma(color)
        .darken()
        .rgb()
        .join(', ')});\n`
    const darkHover = `$${name}_dark_hover: ${blendColors(
        [chroma(color).darken().rgb(), 1],
        [textColor, 0.06]
    )};\n`
    const darkActive = `$${name}_dark_active: ${blendColors(
        [chroma(color).darken().rgb(), 1],
        [textColor, 0.18]
    )};\n`
    const text = `$${name}_text: rgb(${chroma(textColor)
        .rgb()
        .join(', ')});\n\n`

    if (pseudo) {
        return [
            main,
            mainHover,
            mainActive,
            light,
            lightHover,
            lightActive,
            dark,
            darkHover,
            darkActive,
            text
        ].join('')
    } else {
        return [main, light, dark, text].join('')
    }
}

const buildMixins = (name, color, textColor, pseudo) => {
    const main = dedent`
        @mixin ${name} {
            background-color: rgb(${chroma(color).rgb().join(', ')});
            color: rgb(${chroma(textColor).rgb().join(', ')});
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
        }

        @mixin ${name}_light {
            background-color: rgb(${chroma(color).brighten().rgb().join(', ')});
            color: rgb(${chroma(textColor).rgb().join(', ')});
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
        }
        
        @mixin ${name}_dark {
            background-color: rgb(${chroma(color).darken().rgb().join(', ')});
            color: rgb(${chroma(textColor).rgb().join(', ')});
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
        }\n\n`

    const mainNoPseudo = dedent`
        @mixin ${name} {
            background-color: rgb(${chroma(color).rgb().join(', ')});
            color: rgb(${chroma(textColor).rgb().join(', ')});
        }

        @mixin ${name}_light {
            background-color: rgb(${chroma(color).brighten().rgb().join(', ')});
            color: rgb(${chroma(textColor).rgb().join(', ')});
        }
        
        @mixin ${name}_dark {
            background-color: rgb(${chroma(color).darken().rgb().join(', ')});
            color: rgb(${chroma(textColor).rgb().join(', ')});
        }\n\n`

    if (pseudo) {
        return main
    } else {
        return mainNoPseudo
    }
}

module.exports = {
    buildVariables: buildVariables,
    buildMixins: buildMixins
}
