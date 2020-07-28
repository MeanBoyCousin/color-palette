const contrastRatio = (l1, l2) => {
    return parseFloat(
        ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2)
    )
}

module.exports = contrastRatio
