const {
    analogous,
    complimentary,
    triadic
} = require('../src/helpers/colorSets')

describe('Check color set functions', () => {
    test('should return correct analogous color harmonies', () => {
        const analogousRed = ['rgb(255, 102, 0)', 'rgb(255, 0, 102)']

        const analogousBlue = ['rgb(102, 0, 255)', 'rgb(0, 102, 255)']

        expect(analogous('red')).toEqual(analogousRed)
        expect(analogous('#f00')).toEqual(analogousRed)
        expect(analogous('#ff0000')).toEqual(analogousRed)
        expect(analogous('rgb(255, 0, 0)')).toEqual(analogousRed)
        expect(analogous('hsl(0, 100%, 50%)')).toEqual(analogousRed)

        expect(analogous('blue')).toEqual(analogousBlue)
        expect(analogous('#00f')).toEqual(analogousBlue)
        expect(analogous('#0000ff')).toEqual(analogousBlue)
        expect(analogous('rgb(0, 0, 255)')).toEqual(analogousBlue)
        expect(analogous('hsl(240, 100%, 50%)')).toEqual(analogousBlue)

        expect(Array.isArray(analogous('blue'))).toEqual(true)
        expect(analogous('blue').length).toEqual(2)
    })

    test('should return correct complimentary color harmonies', () => {
        const complimentaryRed = 'rgb(0, 255, 255)'
        const complimentaryBlue = 'rgb(255, 255, 0)'

        expect(complimentary('red')).toEqual(complimentaryRed)
        expect(complimentary('#f00')).toEqual(complimentaryRed)
        expect(complimentary('#ff0000')).toEqual(complimentaryRed)
        expect(complimentary('rgb(255, 0, 0)')).toEqual(complimentaryRed)
        expect(complimentary('hsl(0, 100%, 50%)')).toEqual(complimentaryRed)

        expect(complimentary('blue')).toEqual(complimentaryBlue)
        expect(complimentary('#00f')).toEqual(complimentaryBlue)
        expect(complimentary('#0000ff')).toEqual(complimentaryBlue)
        expect(complimentary('rgb(0, 0, 255)')).toEqual(complimentaryBlue)
        expect(complimentary('hsl(240, 100%, 50%)')).toEqual(complimentaryBlue)

        expect(typeof complimentary('blue')).toEqual('string')
    })

    test('should return correct triadic color harmonies', () => {
        const triadicRed = ['rgb(0, 255, 0)', 'rgb(0, 0, 255)']

        const triadicBlue = ['rgb(255, 0, 0)', 'rgb(0, 255, 0)']

        expect(triadic('red')).toEqual(triadicRed)
        expect(triadic('#f00')).toEqual(triadicRed)
        expect(triadic('#ff0000')).toEqual(triadicRed)
        expect(triadic('rgb(255, 0, 0)')).toEqual(triadicRed)
        expect(triadic('hsl(0, 100%, 50%)')).toEqual(triadicRed)

        expect(triadic('blue')).toEqual(triadicBlue)
        expect(triadic('#00f')).toEqual(triadicBlue)
        expect(triadic('#0000ff')).toEqual(triadicBlue)
        expect(triadic('rgb(0, 0, 255)')).toEqual(triadicBlue)
        expect(triadic('hsl(240, 100%, 50%)')).toEqual(triadicBlue)

        expect(Array.isArray(triadic('blue'))).toEqual(true)
        expect(triadic('blue').length).toEqual(2)
    })
})
