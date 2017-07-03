const readline = require('readline');
var Decimal = require('decimal.js');

Decimal.config({
  precision: 100
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var pi = function(n) {
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
  let res = pi(n)
  console.log(`PI: ${res}`)
  rl.close()
});
