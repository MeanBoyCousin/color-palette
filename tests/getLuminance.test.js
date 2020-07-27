const relativeLuminance = require('../helpers/getLuminance')

describe('Check luminance calculations', () => {
    const white = [255, 255, 255]
    const black = [0, 0, 0]

    test('should return correct integer value', () => {
        expect(relativeLuminance(...white)).toEqual(1)
        expect(relativeLuminance(...black)).toEqual(0)
        expect(typeof relativeLuminance(...black)).toEqual('number')
    })
})
