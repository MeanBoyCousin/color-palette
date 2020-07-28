const contrastRatio = require('../helpers/getContrastRatio')

describe('Check contrast ratio calculations', () => {
    const white = 0
    const black = 1
    const blue = 0.04683348483835794
    const red = 0.029285990495172155

    test('should return correct integer value', () => {
        expect(contrastRatio(red, black)).toEqual(13.24)
        expect(contrastRatio(blue, white)).toEqual(1.94)
        expect(contrastRatio(black, black)).toEqual(1)
        expect(typeof contrastRatio(black, white)).toEqual('number')
    })
})
