var Decimal = require('decimal.js');

/*
 * Compute pi to the specified number of decimal digits using the
 * Chudnovsky Algorithm.
 *                               _____
 *                     426880 * /10005
 *  pi = ---------------------------------------------
 *         _inf_
 *         \     (6*k)! * (13591409 + 545140134 * k)
 *          \    -----------------------------------
 *          /     (3*k)! * (k!)^3 * (-640320)^(3*k)
 *         /____
 *          k=0
 *
 * http://en.wikipedia.org/wiki/Pi#Rapidly_convergent_series
 *
 * Adapted from the C code of Brian Hall at
 * http://beej.us/blog/data/pi-chudnovsky-gmp/chudnovsky_c.txt
 *
 * parameter: digits {number} the number of decimal digits to compute
 * returns: Pi {Decimal}
 */
function chudnovsky(digits) {
  digits = Number(digits) + 1

  // The number of decimal digits the algorithm generates per iteration.
  var digits_per_iteration = 14.1816474627254776555;
  var iterations = (digits / digits_per_iteration) + 1;

  var a = new Decimal(13591409);
  var b = new Decimal(545140134);
  var c = new Decimal(-640320);

  var numerator, denominator;
  var sum = new Decimal(0);

  for (var k = 0; k < iterations; k++) {

    // (6k)! * (13591409 + 545140134k)
    numerator = factorial(6 * k).times(a.plus(b.times(k)));

    // (3k)! * (k!)^3 * -640320^(3k)
    denominator = factorial(3 * k).times(factorial(k).pow(3)).times(c.pow(3 * k));

    sum = sum.plus(numerator.div(denominator));
  }

  // pi = ( sqrt(10005) * 426880 ) / sum
  return Decimal.sqrt(10005).times(426880).div(sum).toSD(digits);
}

var start = Date.now();
var pi = chudnovsky(2000);
var timeTaken = Date.now() - start;

console.log(pi.toString());
console.log('Time taken: ' + timeTaken + ' ms');
