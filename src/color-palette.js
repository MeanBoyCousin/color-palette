const fs = require('fs')
const inquirer = require('inquirer')
const listPaths = require('list-paths')
const chroma = require('chroma-js')

const dirExists = require('./helpers/dirExists')
const createStream = require('./helpers/createStream')
const { analogous, complimentary, triadic } = require('./helpers/colorSets')
const relativeLuminance = require('./helpers/getLuminance')
const getTextColor = require('./helpers/getTextColor')
const { buildVariables, buildMixins } = require('./helpers/buildColorSets')

const buildFiles = answers => {
    dirExists(answers.directory)

    const variablesStream = createStream(
        `${answers.directory}/_colors_variables.scss`
    )
    const mixinsStream = createStream(
        `${answers.directory}/_colors_mixins.scss`
    )
    const streams = [variablesStream, mixinsStream]

    // Primary
    const primaryTextColor = getTextColor(
        relativeLuminance(...chroma(answers.primary).rgb())
    )

    const primaryParams = [
        'primary',
        answers.primary,
        primaryTextColor,
        answers.pseudo
    ]

    variablesStream.write(buildVariables(...primaryParams))

    mixinsStream.write(buildMixins(...primaryParams))

    // Secondaries
    answers.colorSets.map(set => {
        const key = set.charAt(0).toLowerCase()
        streams.map(stream => {
            stream.write(`// ${key} ==> ${set} Color Harmony\n`)
        })
        if (set.toLowerCase() === 'complimentary') {
            // Complimentary
            const complimentaryColor = complimentary(answers.primary)
            const complimentaryTextColor = getTextColor(
                relativeLuminance(...chroma(complimentaryColor).rgb())
            )

            const scParams = [
                'secondary_c',
                complimentaryColor,
                complimentaryTextColor,
                answers.pseudo
            ]

            variablesStream.write(buildVariables(...scParams))
            mixinsStream.write(buildMixins(...scParams))
        } else if (set.toLowerCase() === 'analogous') {
            // Analogous
            const analogousSet = analogous(answers.primary)
            const analogousOneTextColor = getTextColor(
                relativeLuminance(...chroma(analogousSet[0]).rgb())
            )
            const analogousTwoTextColor = getTextColor(
                relativeLuminance(...chroma(analogousSet[1]).rgb())
            )

            const aParams = [
                [
                    'secondary_a1',
                    analogousSet[0],
                    analogousOneTextColor,
                    answers.pseudo
                ],
                [
                    'secondary_a2',
                    analogousSet[1],
                    analogousTwoTextColor,
                    answers.pseudo
                ]
            ]

            aParams.forEach(params => {
                variablesStream.write(buildVariables(...params))
                mixinsStream.write(buildMixins(...params))
            })
        } else if (set.toLowerCase() === 'triadic') {
            // Triadic
            const triadicSet = triadic(answers.primary)
            const triadicOneTextColor = getTextColor(
                relativeLuminance(...chroma(triadicSet[0]).rgb())
            )
            const triadicTwoTextColor = getTextColor(
                relativeLuminance(...chroma(triadicSet[1]).rgb())
            )

            const tParams = [
                [
                    'secondary_t1',
                    triadicSet[0],
                    triadicOneTextColor,
                    answers.pseudo
                ],
                [
                    'secondary_t2',
                    triadicSet[1],
                    triadicTwoTextColor,
                    answers.pseudo
                ]
            ]

            tParams.forEach(params => {
                variablesStream.write(buildVariables(...params))
                mixinsStream.write(buildMixins(...params))
            })
        }
    })

    // Additional
    variablesStream.write('// Additional action colors\n')
    variablesStream.write(`$surface: rgb(${chroma('#fff').rgb()});\n`)
    variablesStream.write(`$error: rgb(${chroma('#f44336').rgb()});\n`)
    variablesStream.write(`$warning: rgb(${chroma('#ff9800').rgb()});\n`)
    variablesStream.write(`$info: rgb(${chroma('#2196f3').rgb()});\n`)
    variablesStream.write(`$success: rgb(${chroma('#4caf50').rgb()});\n`)

    // Log Message
    console.log(
        '\x1b[32m%s\x1b[0m',
        `Created '_colors_mixins.scss' & '_colors_variables.scss' at '${answers.directory}'.`
    )
}

if (fs.existsSync('./color-palette.config.js')) {
    console.log('\x1b[32m%s\x1b[0m', 'Config file detected.')

    const answers = require('./color-palette.config.js')

    buildFiles(answers)
} else {
    inquirer
        .prompt([
            {
                name: 'primary',
                type: 'input',
                default: '#0F4C81',
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
                name: 'directory',
                type: 'list',
                message:
                    'Please select the directory you would like the scss files placed in.',
                choices: listPaths()
            }
        ])
        .then(answers => {
            buildFiles(answers)
        })
        .catch(error => {
            if (error.isTtyError) {
                console.log(error.isTtyError)
            } else {
                console.log(error)
            }
        })
}
