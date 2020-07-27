const chroma = require('chroma-js')

const getTextColor = require('../helpers/getTextColor')
const relativeLuminance = require('../helpers/getLuminance')

describe('Check text color calculations', () => {
    test('should return array with three values for use in an RGB color string', () => {
        expect(
            getTextColor(relativeLuminance(...chroma('white').rgb()))
        ).toEqual([0, 0, 0])
        expect(
            getTextColor(relativeLuminance(...chroma('#fff').rgb()))
        ).toEqual([0, 0, 0])
        expect(
            getTextColor(relativeLuminance(...chroma('#ffffff').rgb()))
        ).toEqual([0, 0, 0])
        expect(
            getTextColor(
                relativeLuminance(...chroma('rgb(255, 255, 255)').rgb())
            )
        ).toEqual([0, 0, 0])
        expect(
            getTextColor(
                relativeLuminance(...chroma('hsl(0, 100%, 100%)').rgb())
            )
        ).toEqual([0, 0, 0])

        expect(
            getTextColor(relativeLuminance(...chroma('black').rgb()))
        ).toEqual([255, 255, 255])
        expect(
            getTextColor(relativeLuminance(...chroma('#000').rgb()))
        ).toEqual([255, 255, 255])
        expect(
            getTextColor(relativeLuminance(...chroma('#000000').rgb()))
        ).toEqual([255, 255, 255])
        expect(
            getTextColor(relativeLuminance(...chroma('rgb(0, 0, 0)').rgb()))
        ).toEqual([255, 255, 255])
        expect(
            getTextColor(relativeLuminance(...chroma('hsl(0, 100%, 0%)').rgb()))
        ).toEqual([255, 255, 255])

        expect(Array.isArray(getTextColor('black'))).toEqual(true)
        expect(getTextColor('black').length).toEqual(3)
    })
})
