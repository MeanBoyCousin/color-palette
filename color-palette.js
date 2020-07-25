const inquirer = require('inquirer')
const chroma = require('chroma-js')
const fs = require('fs')

const colorSets = require('./helpers/colorSets')
const relativeLuminance = require('./helpers/getLuminance')
const getTextColor = require('./helpers/getTextColor')
const buildColorSet = require('./helpers/buildColorSet')

inquirer
    .prompt([
        {
            name: 'userColor',
            type: 'input',
            message:
                'Please enter your primary color. This can be a named, hex, rgb or hsl color.'
        },
        {
            name: 'colorSets',
            type: 'checkbox',
            message:
                'Please select which sets you would like as your secondary colors.',
            choices: ['Complimentary', 'Analogous', 'Triadic'],
            default: ['Complimentary']
        },
        {
            name: 'pseudo',
            type: 'confirm',
            message:
                'Would you like to generate appropriate pseudo-class colors for hover and active states?',
            default: true
        }
    ])
    .then(answers => {
        const stream = fs.createWriteStream('./demo/_colors.scss')

        // Key
        stream.write('// l => Light\n')
        stream.write('// d => Dark\n')
        stream.write('// h => Hover\n')
        stream.write('// ac => Active\n')

        // Primary
        const userColor = answers.userColor

        const primaryTextColor = getTextColor(
            relativeLuminance(...chroma(userColor).rgb())
        )

        buildColorSet(stream, 'primary', userColor, primaryTextColor)
        stream.write(`$primary_text: rgb(${primaryTextColor});\n\n`)

        // Secondaries
        // Complimentary
        const complimentary = colorSets.complimentary(userColor)

        const complimentaryTextColor = getTextColor(
            relativeLuminance(...chroma(complimentary).rgb())
        )

        // Analogous
        const analogousSet = colorSets.analogous(userColor)

        const analogousOneTextColor = getTextColor(
            relativeLuminance(...chroma(analogousSet[1]).rgb())
        )
        const analogousTwoTextColor = getTextColor(
            relativeLuminance(...chroma(analogousSet[5]).rgb())
        )

        // Triadic
        const triadicSet = colorSets.triadic(userColor)

        const triadicOneTextColor = getTextColor(
            relativeLuminance(...chroma(triadicSet[1]).rgb())
        )
        const triadicTwoTextColor = getTextColor(
            relativeLuminance(...chroma(triadicSet[2]).rgb())
        )

        answers.colorSets.map(set => {
            const key = set.charAt(0).toLowerCase()
            stream.write(`// ${key} ==> ${set} Color Harmony\n`)
            if (set === 'Complimentary') {
                buildColorSet(
                    stream,
                    'secondary_c',
                    complimentary,
                    complimentaryTextColor
                )
                stream.write(
                    `$secondary_c_text: rgb(${complimentaryTextColor});\n\n`
                )
            } else if (set === 'Analogous') {
                buildColorSet(
                    stream,
                    'secondary_a1',
                    analogousSet[1],
                    analogousOneTextColor
                )
                stream.write(
                    `$secondary_a1_text: rgb(${analogousOneTextColor});\n\n`
                )

                buildColorSet(
                    stream,
                    'secondary_a2',
                    analogousSet[5],
                    analogousTwoTextColor
                )
                stream.write(
                    `$secondary_a2_text: rgb(${analogousTwoTextColor});\n\n`
                )
            } else if (set === 'Triadic') {
                buildColorSet(
                    stream,
                    'secondary_t1',
                    triadicSet[1],
                    triadicOneTextColor
                )
                stream.write(
                    `$secondary_t1_text: rgb(${triadicOneTextColor});\n\n`
                )

                buildColorSet(
                    stream,
                    'secondary_t2',
                    triadicSet[2],
                    triadicTwoTextColor
                )
                stream.write(
                    `$secondary_t2_text: rgb(${triadicTwoTextColor});\n\n`
                )
            }
        })

        // Additional
        if (answers.pseudo) {
            stream.write('// Additional action colors\n')
            stream.write(`$surface: rgb(${chroma('#fff').rgb()});\n`)
            stream.write(`$error: rgb(${chroma('#f44336').rgb()});\n`)
            stream.write(`$warning: rgb(${chroma('#ff9800').rgb()});\n`)
            stream.write(`$info: rgb(${chroma('#2196f3').rgb()});\n`)
            stream.write(`$success: rgb(${chroma('#4caf50').rgb()});\n`)
        }
    })
    .catch(error => {
        if (error.isTtyError) {
            console.log(error.isTtyError)
        } else {
            console.log(error)
        }
    })
