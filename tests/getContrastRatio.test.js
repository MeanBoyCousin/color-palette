const contrastRatio = require('../helpers/getContrastRatio')

describe('Check contrast ratio calculations', () => {
    const white = 0
    const black = 1

    test('should return correct integer value', () => {
        expect(contrastRatio(white, black)).toEqual(21)
        expect(contrastRatio(black, white)).toEqual(21)
        expect(contrastRatio(black, black)).toEqual(1)
        expect(typeof contrastRatio(black, white)).toEqual('number')
    })
})
