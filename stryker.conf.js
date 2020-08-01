/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
    files: ['./tests/*.js', './src/helpers/*.js'],
    mutate: ['./src/helpers/*.js'],
    mutator: 'javascript',
    packageManager: 'npm',
    reporters: ['html', 'progress', 'dashboard'],
    testRunner: 'jest',
    tempDirName: 'stryker-tmp',
    transpilers: [],
    coverageAnalysis: 'off',
    timeoutMS: 10000,
    maxConcurrentTestRunners: 2,
    dashboard: {
        project: 'github.com/MeanBoyCousin/color-palette',
        version: 'master',
        baseUrl: 'https://dashboard.stryker-mutator.io/api/reports',
        reportType: 'full'
    }
}
