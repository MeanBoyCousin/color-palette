const contrastRatio = (l1, l2) => {
    return l1 > l2
        ? parseFloat(((l1 + 0.05) / (l2 + 0.05)).toFixed(2))
        : parseFloat(((l2 + 0.05) / (l1 + 0.05)).toFixed(2))
}

module.exports = contrastRatio
