const readline = require('readline');
var Decimal = require('decimal.js');

Decimal.config({
  precision: 100
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function arctan(x) {
  var y = x;
  var yPrev = NaN;
  var x2 = x.times(x);
  var num = x;
  var sign = -1;

  for (var k = 3; !y.equals(yPrev); k += 2) {
    num = num.times(x2);

    yPrev = y;
    y = (sign > 0) ? y.plus(num.div(k)) : y.minus(num.div(k));
    sign = -sign;
  }

  return y;
}

function factorial(n) {
  var i = 2,
    r = new Decimal(1);
  for (; i <= n; r = r.times(i++));
  return r;
}


function Machin(n) {
  n = Number(n)+1

  var pi4th = new Decimal(4).times(arctan(new Decimal(1).div(5)))
    .minus(arctan(new Decimal(1).div(239)));

  return Decimal(4).times(pi4th).toSD(n);
}

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


var Bailey_Borwein_Plouffe = function(n) {
  n = Number(n)
  // the Bailey-Borwein-Plouffe formula
  var p16 = new Decimal(1);
  var pi = new Decimal(0);
  var precision = Decimal.precision;

  var one = new Decimal(1);
  var two = new Decimal(2);
  var four = new Decimal(4);
  var k8 = new Decimal(0);

  for (var k = new Decimal(0); k.lte(precision); k = k.plus(one)) {
    // pi += 1/p16 * (4/(8*k + 1) - 2/(8*k + 4) - 1/(8*k + 5) - 1/(8*k+6));
    // p16 *= 16;
    //
    // a little simpler:
    // pi += p16 * (4/(8*k + 1) - 2/(8*k + 4) - 1/(8*k + 5) - 1/(8*k+6));
    // p16 /= 16;

    var f = four.div(k8.plus(1))
      .minus(two.div(k8.plus(4)))
      .minus(one.div(k8.plus(5)))
      .minus(one.div(k8.plus(6)));

    pi = pi.plus(p16.times(f));
    p16 = p16.div(16);
    k8 = k8.plus(8);
  }

  return pi.toFixed(Number(n));
}

rl.question('Enter n value: ', (n) => {
  let res = chudnovsky(n)
  console.log(`PI: ${res}`)
  rl.close()
});
