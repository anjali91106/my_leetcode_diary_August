//Problem -> 231 Power of Two
//Problem LInk -> https://leetcode.com/problems/power-of-two/

//Date-> 2025-08-09 (yyyy-mm-dd)

//Explanation -> You are given an integer n.
// You need to check if n is a power of two.
//Example -> 
// 1 (2^0), 2 (2^1), 4 (2^2), 8 (2^3) ✅
// 3, 5, 6, 10  ❌

// TC: O(1)
// SC: O(1)


var isPowerOfTwo = function(n) {
    // Edge case check
    // Powers of two are positive integers. If n is zero or negative, return false.
    if(n <= 0) return false;
    
    // Use logarithms to find exponent -> n = 8 → log2(8) = 3
    // n = 12 → log2(12) ≈ 3.58
    let logVal = Math.floor(Math.log2(n));
    
    // Verify by raising 2 back -> 
    // Raise 2 to logVal and check if it equals n.
    // This avoids floating-point precision errors that could occur if we directly check Number.isInteger(Math.log2(n)).
    if(Math.pow(2, logVal) === n) return true;
    else return false;
};