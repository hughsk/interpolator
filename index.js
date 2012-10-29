var choose = require('choose')

var TWO_PI = Math.PI * 2

/**
 * Linear interpolation (a straight line).
 *
 * @param  {Number} a The value to hit at "0"
 * @param  {Number} b The value to hit at "1"
 * @return {Function}
 */
var interpolate = module.exports = function (a, b) {
  b -= a

  return function interpolate(t) {
    return a + b * t
  };
};
interpolate.linear = interpolate

/**
 * Linear interpolation, returning only
 * rounded numbers.
 * 
 * @param  {Number} a The value to hit at "0"
 * @param  {Number} b The value to hit at "1"
 * @return {Function}
 */
interpolate.round = function (a, b) {
  b -= a

  return function round(t) {
    return Math.round(a + b * t)
  };
};

/**
 * Quadratic interpolation.
 * 
 * @param  {Number} a The value to hit at "0"
 * @param  {Number} b The value to hit at "1"
 * @return {Function}
 */
interpolate.quad = function (a, b) {
  b -= a

  return function quad(t) {
    return a + b * t * t
  };
};

/**
 * Cubic interpolation.
 * 
 * @param  {Number} a The value to hit at "0"
 * @param  {Number} b The value to hit at "1"
 * @return {Function}
 */
interpolate.cubic = function (a, b) {
  b -= a

  return function cubic(t) {
    return a + b * t * t * t
  };
};

/**
 * Cosine wave interpolation - starts at the first value,
 * curves up to the second and back down to the first again.
 * 
 * @param  {Number} a The value to hit at "0" and "1"
 * @param  {Number} b The value to hit at "0.5"
 * @return {Function}
 */
interpolate.sin = function (a, b) {
  a -= b
  a *= 0.5

  return function sin(t) {
    return b + a * (Math.cos(t * TWO_PI) + 1)
  };
};

/**
 * Returns an n-piece Bezier interpolator, determined
 * by the number of arguments.
 *
 * (a, b): a linear curve
 * (a, b, c): a quadratic curve
 * (a, b, c, d): a cubic curve
 * (a, b, c, d, e): a quintic curve
 *
 * etc...
 *
 * @return {Function} Takes a number between 0 and 1.
 */
interpolate.bezier = function (a, b) {
  if (arguments.length === 2) return interpolate(a, b)

  var count = arguments.length
    , total = count - 1
    , args = Array.prototype.slice.call(arguments)
    , coeffs = []
    , coeffsLength

  while (count--) {
    coeffs.push(choose(total, count))
  }

  coeffsLength = coeffs.length

  return function bezier(t) {
    var x = 0
      , i = 0
      , oneMinusT = 1 - t

    if (t === 0) return args[0]
    if (t === 1) return args[total]

    for (; i < coeffsLength; i += 1) {
      x += (
        coeffs[i] * 
        args[i] *
        Math.pow(oneMinusT, coeffsLength - i - 1) *
        Math.pow(t, i)
      );
    }

    return x
  };
};