# n-th-digit-of-pi

 ## Based on Pascal Sebah C++ Program
 
 ## Pascal Sebah: September 1999

 ## Subject:

    A very easy program to compute Pi with many digits.
    No optimisations, no tricks, just a basic program to learn how
    to compute in multiprecision.

 ## Formulae:

    Pi/4 =    arctan(1/2)+arctan(1/3)                     (Hutton 1)
    Pi/4 =  2*arctan(1/3)+arctan(1/7)                     (Hutton 2)
    Pi/4 =  4*arctan(1/5)-arctan(1/239)                   (Machin)
    Pi/4 = 12*arctan(1/18)+8*arctan(1/57)-5*arctan(1/239) (Gauss)

      with arctan(x) =  x - x^3/3 + x^5/5 - ...

    The Lehmer's measure is the sum of the inverse of the decimal
    logarithm of the pk in the arctan(1/pk). The more the measure
    is small, the more the formula is efficient.
    For example, with Machin's formula:

      E = 1/log10(5)+1/log10(239) = 1.852

 ## Data:

    A big real (or multiprecision real) is defined in base B as:
      X = x(0) + x(1)/B^1 + ... + x(n-1)/B^(n-1)
      where 0<=x(i)<B

 ## Results: (PentiumII, 450Mhz)

  |Formula          |Hutton 1 |Hutton 2 |Machin |Gauss  |
  |-----------------|---------|---------|-------|-------|
  |Lehmer's measure |5.418    |3.280    |1.852  |1.786  |
  |10000  decimals  |19.0s    |11.4s    |6.7s   |6.4s   |
  |100000 decimals  |1891.0s  |1144.0s  |785.0s |622.0s |

 With a little work it's possible to reduce those computation
 times by a factor 3 and more:

     => Work with double instead of long and the base B can
        be choosen as 10^8
     => During the iterations the numbers you add are smaller
        and smaller, take this in account in the +, *, /
     => In the division of y=x/d, you may precompute 1/d and
        avoid multiplications in the loop (only with doubles)
     => MaxDiv may be increased to more than 3000 with doubles
     => ...
