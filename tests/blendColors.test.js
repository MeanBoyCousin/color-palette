const { blendFormat, blendColors } = require('../src/helpers/blendColors')

describe('Check color blending functions', () => {
    test('should format a color into the correct object for blending', () => {
        const redObject = { r: 255, g: 0, b: 0, a: 1 }
        const blueObject = { r: 0, g: 0, b: 255, a: 0.5 }

        expect(blendFormat('red', 1)).toEqual(redObject)
        expect(blendFormat('#f00', 1)).toEqual(redObject)
        expect(blendFormat('#ff0000', 1)).toEqual(redObject)
        expect(blendFormat('rgb(255, 0, 0)', 1)).toEqual(redObject)
        expect(blendFormat('hsl(0, 100%, 50%)', 1)).toEqual(redObject)

        expect(blendFormat('blue', 0.5)).toEqual(blueObject)
        expect(blendFormat('#00f', 0.5)).toEqual(blueObject)
        expect(blendFormat('#0000ff', 0.5)).toEqual(blueObject)
        expect(blendFormat('rgb(0, 0, 255)', 0.5)).toEqual(blueObject)
        expect(blendFormat('hsl(240, 100%, 50%)', 0.5)).toEqual(blueObject)

        expect(typeof blendFormat('blue', 0.5)).toEqual('object')
        expect(Object.values(blendFormat('blue', 0.5)).length).toEqual(4)
        expect(Object.keys(blendFormat('blue', 0.5)).length).toEqual(4)
    })

    test('should return a blended color in rgb format', () => {
        const blackHover = ['black', 0.06]
        const redBlackBlend = 'rgb(240, 0, 0)'

        expect(blendColors(['red', 1], blackHover)).toEqual(redBlackBlend)
        expect(blendColors(['#f00', 1], blackHover)).toEqual(redBlackBlend)
        expect(blendColors(['#ff0000', 1], blackHover)).toEqual(redBlackBlend)
        expect(blendColors(['rgb(255, 0, 0)', 1], blackHover)).toEqual(
            redBlackBlend
        )
        expect(blendColors(['hsl(0, 100%, 50%)', 1], blackHover)).toEqual(
            redBlackBlend
        )

        const whiteActive = ['white', 0.18]
        const blueWhiteBlend = 'rgb(46, 46, 255)'

        expect(blendColors(['blue', 1], whiteActive)).toEqual(blueWhiteBlend)
        expect(blendColors(['#00f', 1], whiteActive)).toEqual(blueWhiteBlend)
        expect(blendColors(['#0000ff', 1], whiteActive)).toEqual(blueWhiteBlend)
        expect(blendColors(['rgb(0, 0, 255)', 1], whiteActive)).toEqual(
            blueWhiteBlend
        )
        expect(blendColors(['hsl(240, 100%, 50%)', 1], whiteActive)).toEqual(
            blueWhiteBlend
        )

        expect(typeof blendColors(['blue', 1], whiteActive)).toEqual('string')
    })
})
