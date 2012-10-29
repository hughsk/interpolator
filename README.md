# interpolator

A small collection of d3-ish interpolation methods.

## Installation

``` bash
$ npm install interpolator
```

## Usage

Each interpolator takes two or more parameters and returns a function that
tweens between the values of zero and one.

``` javascript
var interpolator = require('interpolator')
  , linear = interpolator.linear(0, 10)

linear(0)   // 0
linear(0.5) // 5
linear(1)   // 10
```

## API

**interpolator.linear(a, b)**

**interpolator.round(a, b)**

**interpolator.quad(a, b)**

**interpolator.cubic(a, b)**

**interpolator.sin(a, b)**

This interpolator oscillates like a sine wave, reaching its peak at `0.5` and
its trough at `0` and `1`.

``` javascript
var sin = interpolator.sin(10, 20)

sin(0.00) // 10
sin(0.25) // 15
sin(0.50) // 20
sin(0.75) // 15
sin(1.00) // 10
sin(1.25) // 15
sin(1.50) // 20
sin(1.75) // 15
```

**interpolator.bezier(a, b, ...)**

Returns an *n*-degree Bézier curve, where *n* is the number of arguments.

``` javascript
var bezier = interpolator.bezier(0, 1, 0)

bezier(0.000) // 0
bezier(0.125) // 0.21875
bezier(0.250) // 0.375
bezier(0.500) // 0.5
bezier(0.750) // 0.375
bezier(0.875) // 0.21875
bezier(1.000) // 0

interpolator.bezier(0, 5)(0.5)          // 0.25
interpolator.bezier(0, 5, 0, 0, 0)(0.5) // 1.25
```