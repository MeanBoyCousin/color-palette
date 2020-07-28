const fs = require('fs')
const mock = require('mock-fs')

const createStream = require('../helpers/createStream')

mock({
    './tests/temp': {}
})

describe('Check stream scss files are created in user specified path', () => {
    beforeAll(() => {
        createStream('./tests/temp/variables.scss')
        createStream('./tests/temp/mixins.scss')
    })

    afterAll(() => {
        mock.restore()
    })

    test('should return true is variables.scss has been created', () => {
        expect(fs.existsSync('./tests/temp/variables.scss')).toBeTruthy()
    })

    test('should return true is mixins.scss has been created', () => {
        expect(fs.existsSync('./tests/temp/mixins.scss')).toBeTruthy()
    })
})
