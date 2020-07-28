const fs = require('fs')

const dirExists = require('../helpers/dirExists')

describe('Check user selected dir is created if it does not exist', () => {
    afterAll(() => {
        fs.rmdirSync('./tests/temp')
    })

    test('should return [false, true] if dir did not exist and was then created', () => {
        const noDir = fs.existsSync('./test/temp')
        dirExists('./tests/temp')
        expect([noDir, fs.existsSync('./tests/temp')]).toEqual([false, true])
    })

    test('should return true if dir already exists', () => {
        dirExists('./tests/temp')
        expect(fs.existsSync('./tests/temp')).toBeTruthy()
    })
})
