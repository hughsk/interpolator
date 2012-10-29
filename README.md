# interpolator

A small collection of d3-esque interpolation methods.

## Installation

``` bash
$ npm install interpolator
```

## Usage

Each interpolator takes two or more parameters and returns a function that
"tweens" between the values of zero and one.

``` javascript
var interpolator = require('interpolator')

var linear = interpolator.linear(0, 10)

linear(0)   // 0
linear(0.5) // 5
linear(1)   // 10

var bezier = interpolator.bezier(0, 2, 0)

bezier(0)    // 0
bezier(0.25) // 2.25
bezier(0.50) // 1
bezier(0.75) // 0.25
bezier(1)    // 0
```

## API

**interpolator.linear(a, b)**

**interpolator.round(a, b)**

**interpolator.quad(a, b)**

**interpolator.cubic(a, b)**

**interpolator.sin(a, b)**

**interpolator.bezier(a, b, ...)**