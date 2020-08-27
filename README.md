# Color Palette CLI

[![Build Status](https://travis-ci.org/MeanBoyCousin/color-palette.svg?branch=master) ](https://travis-ci.org/MeanBoyCousin/color-palette) [![npm version](http://img.shields.io/npm/v/color-palette-cli.svg?style=flat)](https://npmjs.org/package/color-palette-cli 'View this project on npm') [![codecov](https://codecov.io/gh/MeanBoyCousin/color-palette/branch/master/graph/badge.svg)](https://codecov.io/gh/MeanBoyCousin/color-palette) [![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2FMeanBoyCousin%2Fcolor-palette%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/MeanBoyCousin/color-palette/master)

### CLI tool to build color variables and mixins based on a primary color.

> Create beautiful color palettes with contrast compliant text coloring.
> Complimentary, Analogous and Triadic color schemes available.
> Pseudo class coverage for perfect interaction with elements like buttons.

## Install

Using npx is the easiest and quickest way to get started. The CLI will guide you through the process and create your SCSS files in seconds!

```console
$ npx color-palette-cli
```

## CLI Options

-   Primary Color (default: #0F4C81) - Your main color choice for the palette. This can be in named, hex, rgb or hsl format. Please make sure to enter colors that do not have an alpha value.

-   Secondary Color sets (default: Complimentary) - Here you may pick which set(s) you wish to include in the SCSS files. You can either choose multiple (and remove them later if not needed) or simply pick one.

-   Pseudo-Classes (default: true) - Specific if you wish to include pseudo-class colors for hover and active states. This is helpful for creating clear interactivity within your UI.

-   Source Directory - A list of possible source directories within your working directory will be presented. Please select one to define where you would like your SCSS files to live.

## Config

Color Palette CLI also has support for the use of a local config file to allow quick setup and storable user preferences.

```js
$ npx -p color-palette-cli color-palette-init  // Creates a color-palette.config.js file in the route working directory.
```

Once your config file is created, continue by calling the installation command via npx and you'll be all setup.

## Config Setup

Each of the fields in the config file equate to the CLI options above.

```js
module.exports = {
    primary: '#0f4c81', //String
    colorSets: ['Complimentary'], //String[]
    pseudo: true, //Boolean
    directory: './' //String
}
```

## Examples

Please see the example [variables](./src/demo/_colors_variables.scss) and [mixins](./src/demo/_colors_mixins.scss) files to get an idea of what the generated code looks like. These examples include all three color schemes as well as pseudo-classes.

## Authors

Tim Dunphy

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE) file for details.
