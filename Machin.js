var Decimal = require('decimal.js');

Decimal.config({precision: 100});

  // arctan(x) = x - x^3/3 + x^5/5 - x^7/7 + x^9/9 - ...
  //           = x - x^2*x^1/3 + x^2*x^3/5 - x^2*x^5/7 + x^2*x^7/9 - ...
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

  function pi() {
    // Machin: Pi / 4 = 4 * arctan(1 / 5) - arctan(1 / 239)
    // http://milan.milanovic.org/math/english/pi/machin.html

    n = Number(n)+1

    var pi4th = new Decimal(4).times(arctan(new Decimal(1).div(5)))
      .minus(arctan(new Decimal(1).div(239)));

    return Decimal(4).times(pi4th).toSD(n);
  }

  var calculatedPi = pi();
