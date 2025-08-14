//problem -> 2264 Largest 3 digit Number in String
//problem link -> https://leetcode.com/problems/largest-3-same-digit-number-in-string/

// Date -> 2025-08-14 (yyyy-mm-dd)

// Approach:
//1. The biggest possible 3-same-digit substring is "999".
//2. If "999" is inside num, that’s definitely our answer — we can stop immediately.
//3. If not, check "888", then "777", … all the way down to "000".
//4. The first match we find is guaranteed to be the largest possible substring because we’re going from high to low.

// Explanation:
// Greedy Thinking
// Instead of searching for all substrings and then finding the largest,
// we can start from the largest possible digit and check downwards.


// Time Complexity:
//O(10 × n) → O(n) (because 10 is constant)

// Space Complexity:
// O(1) — only storing triple

var largestGoodInteger = function(num) {
    //if -> substring of num -> length 3
    //have only one unique digit 

    for(let i = 9; i>=0; i--){
        let triple = String(i).repeat(3);
        
        if(num.includes(triple)) return triple;
    }

    return ""
};