# CSS Custom Properties in `@media` and `@custom-media`

[![NPM Version][npm-img]][npm-url]
[![License][license-img]](LICENSE)

[PostCSS][postcss] plugin to use CSS Custom Properties in `@media` and `@custom-media` query parameters. Use ":root" scope only!

**There's no specification for this!**, but based on the specifications:
- [W3C CSS Custom Properties](https://www.w3.org/TR/css-variables-1/)
- [W3C CSS Custom Media Queries](https://www.w3.org/TR/mediaqueries-4/)

## Example

```css
/* input */
:root {
  --column-width: 300px;
  --columns-gap: 20px;
  --two-column: calc(2 * (var(--column-width) + var(--columns-gap)) + var(--columns-gap));
}

@custom-media --media-two-columns (min-width: var(--two-column));

@media (min-width: calc(3 * (var(--column-width) + var(--columns-gap)) + var(--columns-gap))) {}


/* becomes */


@custom-media --media-two-columns (min-width: calc(2 * (300px + 20px) + 20px));

@media (min-width: calc(3 * (300px + 20px) + 20px)) {}
```

## Install

`npm install postcss-media-properties --save-dev`

## Usage

Every other plugin is optional, but use this plugin first.
Recommended to use [`postcss-calc`][postcss-calc] plugin for fix `calc` nesting.

- **`postcss-media-properties`**
- [`postcss-custom-media`][postcss-custom-media]
- [`postcss-calc`][postcss-calc]
- [`postcss-media-minmax`][postcss-media-minmax]

### Example

```js
const fs = require('fs');
const postcss = require('postcss');

const postcssMediaProperties = require('postcss-media-properties');
const postcssCustomMedia = require('postcss-custom-media');
const postcssCalc = require('postcss-calc');
const postcssMediaMinmax = require('postcss-media-minmax');

const inputRaw = fs.readFileSync('input.css', 'utf8');

// Process your CSS
const outputCss = postcss()
                  .use(postcssMediaProperties())
                  .use(postcssCustomMedia(/* options */))
                  .use(postcssCalc({ mediaQueries: true, /* other options */}))
                  .use(postcssMediaMinmax(/* options */))
                  .process(cssRaw, { /* options */ })
                  .css;

fs.writeFileSync('output.css', outputCss, 'utf8');
```

*For more exapmles, see* [*PostCSS usage guide*][postcss]

## Non-Standard functionality
This plugin is created in personal needs. Use CSS Custom Properties as part of media query not included in the standard or draft. But it's very convenient at large projects.

## [Changelog](CHANGELOG.md)

## Feedbacks

Suggestions are welcome on [GitHub issue tracker](https://github.com/wisdman/postcss-media-properties/issues)

## Donation

* PayPal: https://www.paypal.me/wisdman
* BTC: 1862ZyKQLpkrnHC5zN2Xm8UtwW7PEHnFTW
* ETH: 0x1572F3A21487eDD3b88811F87520e8cadB1ee136

[postcss]:              https://github.com/postcss/postcss
[postcss-calc]:         https://github.com/postcss/postcss-calc
[postcss-custom-media]: https://github.com/postcss/postcss-custom-media
[postcss-media-minmax]: https://github.com/postcss/postcss-media-minmax

[npm-url]: https://www.npmjs.com/package/postcss-media-properties
[npm-img]: https://img.shields.io/npm/v/postcss-media-properties.svg

[license-img]: https://img.shields.io/github/license/wisdman/postcss-media-properties.svg
