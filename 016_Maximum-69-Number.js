//problem -> 1323 Maximum 69 Number
// problem link -> https://leetcode.com/problems/maximum-69-number/

//date -> 2025-08-16 (yyyy-mm-dd)

// Explanation:
// You’re given a number made only of digits 6 and 9.
// You can change at most one digit (a 6 → 9 or 9 → 6).
// You need to maximize the number.

// Example:
// 9669 → 9969 (change the first 6).

// Approach:  
// Key observation:
// To maximize the number, you should change the first occurrence of 6 (from left to right) into a 9.
// Why? Because higher place values (leftmost digits) contribute more to the value.
// Do we need nested loops or hashmap?
// No nested loops needed — just scan once from left to right.
// No hashmap needed — it’s just digits replacement, not frequency counting.

// Steps:
// Convert the number to a string.
// Traverse from left to right:
// If you find a 6, change it to 9 and stop.
// Convert back to number and return.         

// Time Complexity: O(d) ~~ O(1)
// Space Complexity: O(d) ~~ O(1)


var maximum69Number  = function(num) {
    let str = num.toString();
    let candidates = [num];

    for(let i = 0; i<str.length; i++){
        let arr = str.split("");
        arr[i] = arr[i] === "6" ? "9" : "6";  // flip digit
        candidates.push(parseInt(arr.join(""), 10));
    }

    candidates = Math.max(...candidates);

    return candidates;
};