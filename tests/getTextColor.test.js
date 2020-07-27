const getTextColor = require('../helpers/getTextColor')

describe('Check text color calculations', () => {
    test('should return array with three values for use in an RGB color string', () => {
        expect(getTextColor('white')).toEqual([0, 0, 0])
        expect(getTextColor('#fff')).toEqual([0, 0, 0])
        expect(getTextColor('#ffffff')).toEqual([0, 0, 0])
        expect(getTextColor('rgb(255, 255, 255)')).toEqual([0, 0, 0])
        expect(getTextColor('hsl(0, 100%, 100%)')).toEqual([0, 0, 0])

        expect(getTextColor('black')).toEqual([0, 0, 0])
        expect(getTextColor('#000')).toEqual([0, 0, 0])
        expect(getTextColor('#000000')).toEqual([0, 0, 0])
        expect(getTextColor('rgb(0, 0, 0)')).toEqual([0, 0, 0])
        expect(getTextColor('hsl(0, 0%, 0%)')).toEqual([0, 0, 0])

        expect(Array.isArray(getTextColor('black'))).toEqual(true)
        expect(getTextColor('black').length).toEqual(3)
    })
})
