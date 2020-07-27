const dedent = require('dedent')

const { buildVariables, buildMixins } = require('../helpers/buildColorSets')

describe('Check color set builder function', () => {
    test('should generate correctly formatted variables & mixins in string format with hover and active pseudo classes', () => {
        const variablesWithPseudo = dedent`
        $test: rgb(255, 0, 0);
        $test_hover: rgb(240, 0, 0);
        $test_active: rgb(209, 0, 0);
        $test_light: rgb(255, 90, 54);
        $test_light_hover: rgb(240, 85, 51);
        $test_light_active: rgb(209, 74, 44);
        $test_dark: rgb(194, 0, 0);
        $test_dark_hover: rgb(182, 0, 0);
        $test_dark_active: rgb(159, 0, 0);
        $test_text: rgb(0, 0, 0);\n\n`

        const mixinsWithPseudo = dedent`
        @mixin test {
            background-color: rgb(255, 0, 0);
            color: rgb(0, 0, 0);
            &:hover {
                background-color: rgb(240, 0, 0);
            }
            &:active {
                background-color: rgb(209, 0, 0);
            }
        }

        @mixin test_light {
            background-color: rgb(255, 90, 54);
            color: rgb(0, 0, 0);
            &:hover {
                background-color: rgb(240, 85, 51);
            }
            &:active {
                background-color: rgb(209, 74, 44);
            }
        }

        @mixin test_dark {
            background-color: rgb(194, 0, 0);
            color: rgb(0, 0, 0);
            &:hover {
                background-color: rgb(182, 0, 0);
            }
            &:active {
                background-color: rgb(159, 0, 0);
            }
        }\n\n`

        expect(buildVariables('test', 'red', 'black', true)).toEqual(
            variablesWithPseudo
        )

        expect(buildVariables('test', '#f00', '#000', true)).toEqual(
            variablesWithPseudo
        )

        expect(buildVariables('test', '#ff0000', '#000000', true)).toEqual(
            variablesWithPseudo
        )

        expect(
            buildVariables('test', 'rgb(255, 0, 0)', 'rgb(0, 0, 0)', true)
        ).toEqual(variablesWithPseudo)

        expect(
            buildVariables('test', 'hsl(0, 100%, 50%)', 'hsl(0, 0%, 0%)', true)
        ).toEqual(variablesWithPseudo)

        expect(typeof buildVariables('test', 'red', 'black', true)).toEqual(
            'string'
        )

        expect(buildMixins('test', 'red', 'black', true)).toEqual(
            mixinsWithPseudo
        )

        expect(buildMixins('test', '#f00', '#000', true)).toEqual(
            mixinsWithPseudo
        )

        expect(buildMixins('test', '#ff0000', '#000000', true)).toEqual(
            mixinsWithPseudo
        )

        expect(
            buildMixins('test', 'rgb(255, 0, 0)', 'rgb(0, 0, 0)', true)
        ).toEqual(mixinsWithPseudo)

        expect(
            buildMixins('test', 'hsl(0, 100%, 50%)', 'hsl(0, 0%, 0%)', true)
        ).toEqual(mixinsWithPseudo)

        expect(typeof buildMixins('test', 'red', 'black', true)).toEqual(
            'string'
        )
    })

    test('should generate correctly formatted variables & mixins in string format without hover and active pseudo classes', () => {
        const variablesWithoutPseudo = dedent`
        $test: rgb(255, 0, 0);
        $test_light: rgb(255, 90, 54);
        $test_dark: rgb(194, 0, 0);
        $test_text: rgb(0, 0, 0);\n\n`

        const mixinsWithoutPseudo = dedent`
        @mixin test {
            background-color: rgb(255, 0, 0);
            color: rgb(0, 0, 0);
        }

        @mixin test_light {
            background-color: rgb(255, 90, 54);
            color: rgb(0, 0, 0);
        }

        @mixin test_dark {
            background-color: rgb(194, 0, 0);
            color: rgb(0, 0, 0);
        }\n\n`

        expect(buildVariables('test', 'red', 'black', false)).toEqual(
            variablesWithoutPseudo
        )
        expect(buildVariables('test', '#f00', '#000', false)).toEqual(
            variablesWithoutPseudo
        )

        expect(buildVariables('test', '#ff0000', '#000000', false)).toEqual(
            variablesWithoutPseudo
        )

        expect(
            buildVariables('test', 'rgb(255, 0, 0)', 'rgb(0, 0, 0)', false)
        ).toEqual(variablesWithoutPseudo)

        expect(
            buildVariables('test', 'hsl(0, 100%, 50%)', 'hsl(0, 0%, 0%)', false)
        ).toEqual(variablesWithoutPseudo)

        expect(typeof buildVariables('test', 'red', 'black', false)).toEqual(
            'string'
        )

        expect(buildMixins('test', 'red', 'black', false)).toEqual(
            mixinsWithoutPseudo
        )

        expect(buildMixins('test', '#f00', '#000', false)).toEqual(
            mixinsWithoutPseudo
        )

        expect(buildMixins('test', '#ff0000', '#000000', false)).toEqual(
            mixinsWithoutPseudo
        )

        expect(
            buildMixins('test', 'rgb(255, 0, 0)', 'rgb(0, 0, 0)', false)
        ).toEqual(mixinsWithoutPseudo)

        expect(
            buildMixins('test', 'hsl(0, 100%, 50%)', 'hsl(0, 0%, 0%)', false)
        ).toEqual(mixinsWithoutPseudo)

        expect(typeof buildMixins('test', 'red', 'black', false)).toEqual(
            'string'
        )
    })
})
