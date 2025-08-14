//problem -> 326 Power Of Three
//problem link -> https://leetcode.com/problems/power-of-three/

// Date -> 2025-08-13 (yyyy-mm-dd)

// Approach:
//1. Edge Case Handling:
// If n <= 0, immediately return false because powers of 3 are strictly positive.
//2. Find the Exponent:
// Use the change of base formula to calculate the base-3 logarithm:
// log3(𝑛) = log(𝑛) / log(3)
//3. Avoid Floating-Point Precision Errors:
// Due to floating-point imprecision, the logarithm may be slightly off from an integer.
// Example: for n = 27, logBase3(n) might give 2.999999999 instead of exactly 3.
// To handle this, take the Math.floor of the result.
// 4. Verification:
// Raise 3 to the floored exponent using Math.pow.
// If the result equals n, it’s a power of 3; otherwise, it’s not.

// Explanation:
//We want to check if a given number n is a power of 3 (i.e., n = 3^k for some integer k ≥ 0).

// Time Complexity:
//O(1) — logarithms and exponentiation are constant time..

// Space Complexity:
// O(1) — Only a few Variables.

var isPowerOfThree = function(n) {
    if(n<=0) return false;
   
    let logVal = Math.floor(logBase3(n));

    if(Math.pow(3, logVal) === n) return true;
    else return false;

};

function logBase3(x) {
  return Math.log(x) / Math.log(3);
}