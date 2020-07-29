const fs = require('fs')

const ignorePaths = (ignoreNodeModules, ignoreGit, useGitIgnore) => {
    const ignoreNM = 'node_modules'
    const ignoreG = '.git'
    const gitIgnoreArray = fs
        .readFileSync('.gitignore', 'utf8')
        .split('\r\n')
        .filter(
            path =>
                path !== '' && // Remove white-space
                !path.includes('#') && // Remove comments
                path !== 'node_modules' &&
                path !== '.git'
        )

    return [
        ignoreNodeModules ? ignoreNM : null,
        ignoreGit ? ignoreG : null,
        useGitIgnore ? [...gitIgnoreArray] : null
    ]
        .flat()
        .filter(path => path !== null)
}

const filterPath = (
    path = '.',
    {
        ignoreNodeModules = true,
        ignoreGit = true,
        useGitIgnore = true,
        includeFiles = false
    } = {}
) => {
    return [
        `${path}/`,
        fs
            .readdirSync(path)
            .reduce((pathList, subPath) => {
                if (
                    ignorePaths(
                        ignoreNodeModules,
                        ignoreGit,
                        useGitIgnore
                    ).indexOf(subPath) === -1
                ) {
                    const fullPath = `${path}/${subPath}`
                    if (fs.statSync(fullPath).isDirectory()) {
                        pathList.push(
                            filterPath(fullPath, {
                                ignoreNodeModules,
                                ignoreGit,
                                useGitIgnore,
                                includeFiles
                            })
                        )
                    }
                    if (includeFiles && fs.statSync(fullPath).isFile())
                        pathList.push(fullPath)
                }
                return pathList
            }, [])
            .flat()
    ].flat()
}

module.exports = filterPath
