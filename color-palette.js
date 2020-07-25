const inquirer = require('inquirer')
const chroma = require('chroma-js')
const fs = require('fs')

const colorSets = require('./helpers/colorSets')
const relativeLuminance = require('./helpers/getLuminance')
const getTextColor = require('./helpers/getTextColor')
const buildColorSet = require('./helpers/buildColorSets')

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
        },
        {
            name: 'dir',
            type: 'input',
            message:
                'Please enter the directory you would like the scss files in. e.g. ./src/styles'
        }
    ])
    .then(answers => {
        if (!fs.existsSync(answers.dir)) fs.mkdirSync(answers.dir)

        const variablesStream = fs.createWriteStream(
            `${answers.dir}/_colors_variables.scss`
        )
        const mixinsStream = fs.createWriteStream(
            `${answers.dir}/_colors_mixins.scss`
        )
        const streams = [variablesStream, mixinsStream]

        // Primary
        const primaryTextColor = getTextColor(
            relativeLuminance(...chroma(answers.userColor).rgb())
        )

        buildColorSet(
            ...streams,
            'primary',
            answers.userColor,
            primaryTextColor
        )

        // Secondaries
        // Complimentary
        const complimentary = colorSets.complimentary(answers.userColor)

        const complimentaryTextColor = getTextColor(
            relativeLuminance(...chroma(complimentary).rgb())
        )

        // Analogous
        const analogousSet = colorSets.analogous(answers.userColor)

        const analogousOneTextColor = getTextColor(
            relativeLuminance(...chroma(analogousSet[1]).rgb())
        )
        const analogousTwoTextColor = getTextColor(
            relativeLuminance(...chroma(analogousSet[5]).rgb())
        )

        // Triadic
        const triadicSet = colorSets.triadic(answers.userColor)

        const triadicOneTextColor = getTextColor(
            relativeLuminance(...chroma(triadicSet[1]).rgb())
        )
        const triadicTwoTextColor = getTextColor(
            relativeLuminance(...chroma(triadicSet[2]).rgb())
        )

        answers.colorSets.map(set => {
            const key = set.charAt(0).toLowerCase()
            streams.map(stream => {
                stream.write(`// ${key} ==> ${set} Color Harmony\n`)
            })
            if (set === 'Complimentary') {
                buildColorSet(
                    ...streams,
                    'secondary_c',
                    complimentary,
                    complimentaryTextColor
                )
            } else if (set === 'Analogous') {
                buildColorSet(
                    ...streams,
                    'secondary_a1',
                    analogousSet[1],
                    analogousOneTextColor
                )
                buildColorSet(
                    ...streams,
                    'secondary_a2',
                    analogousSet[5],
                    analogousTwoTextColor
                )
            } else if (set === 'Triadic') {
                buildColorSet(
                    ...streams,
                    'secondary_t1',
                    triadicSet[1],
                    triadicOneTextColor
                )
                buildColorSet(
                    ...streams,
                    'secondary_t2',
                    triadicSet[2],
                    triadicTwoTextColor
                )
            }
        })

        // Additional
        if (answers.pseudo) {
            variablesStream.write('// Additional action colors\n')
            variablesStream.write(`$surface: rgb(${chroma('#fff').rgb()});\n`)
            variablesStream.write(`$error: rgb(${chroma('#f44336').rgb()});\n`)
            variablesStream.write(
                `$warning: rgb(${chroma('#ff9800').rgb()});\n`
            )
            variablesStream.write(`$info: rgb(${chroma('#2196f3').rgb()});\n`)
            variablesStream.write(
                `$success: rgb(${chroma('#4caf50').rgb()});\n`
            )
        }
    })
    .catch(error => {
        if (error.isTtyError) {
            console.log(error.isTtyError)
        } else {
            console.log(error)
        }
    })
