//Problem -> 342 Power of four
//Problem LInk -> https://leetcode.com/problems/power-of-four/

//Date -> 2025-08-15

// Approach:
//1. Edge Case Handling:
// If n <= 0, immediately return false because powers of 4 are strictly positive.
//2. Find the Exponent:
// Use the change of base formula to calculate the base-4 logarithm:
// log3(𝑛) = log(𝑛) / log(4)
//3. Avoid Floating-Point Precision Errors:
// Due to floating-point imprecision, the logarithm may be slightly off from an integer.
// 4. Verification:
// Raise 4 to the floored exponent using Math.pow.
// If the result equals n, it’s a power of 4; otherwise, it’s not.

// Explanation:
//We want to check if a given number n is a power of 4 (i.e., n = 4^k for some integer k ≥ 0).

// Time Complexity:
//O(1) — logarithms and exponentiation are constant time..

// Space Complexity:
// O(1) — Only a few Variables.

var isPowerOfFour = function(n) {
    if( n<=0 ) return false;

    let logVal = Math.floor(logBase4(n));

    if(Math.pow(4, logVal) === n) return true;
    else return false;
};


function logBase4(n) {
   let x = Math.log(n) / Math.log(4);
   return x;
}