const relativeLuminance = require('../helpers/getLuminance')

describe('Check luminance calculations', () => {
    const blue = [2, 20, 200]
    const red = [100, 10, 1]
    const equalityCheck = [10.0164, 0, 0]

    test('should return correct integer value', () => {
        expect(relativeLuminance(...equalityCheck)).toEqual(
            0.0006463566563467493
        )
        expect(relativeLuminance(...blue)).toEqual(0.04683348483835794)
        expect(relativeLuminance(...red)).toEqual(0.029285990495172155)
        expect(typeof relativeLuminance(...red)).toEqual('number')
    })
})
