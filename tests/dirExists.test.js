const fs = require('fs')
const mock = require('mock-fs')

const dirExists = require('../src/helpers/dirExists')

mock({})

describe('Check user selected dir is created if it does not exist', () => {
    afterAll(() => {
        mock.restore()
    })

    test('should return [false, true] if dir did not exist and was then created', () => {
        const noDir = fs.existsSync('./test/temp')
        dirExists('./tests/temp')
        expect([noDir, fs.existsSync('./tests/temp')]).toEqual([false, true])
    })

    test('should return false if dir already exists', () => {
        expect(dirExists('./tests/temp')).toEqual(false)
    })
})
