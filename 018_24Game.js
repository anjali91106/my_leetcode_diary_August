// Problem-> 679 24Game
// Problem Link -> https://leetcode.com/problems/24-game/

// Date -> 2025-08-18

//Explanation -> Input: An array cards with 4 integers (1–9).
// Task: Determine whether you can combine these numbers with arithmetic operators and parentheses to make exactly 24.
// Return true if possible, otherwise false.

// Key Challenges
// All permutations – Order matters (e.g., 3 * (8 / (3 - 7)) works differently than (3 * 8) / (3 - 7)).
// Floating-point precision – Division introduces decimals, so we check if the result is close enough to 24 using EPS = 1e-6.
// Recursive search – At each step, pick two numbers, replace them with their result, and recurse until one number is left.

//Approach -> 
// Base Case:
// If only one number is left (nums.length === 1), check if it’s close to 24:
// Recursive Step:
// Pick two numbers a and b.
// Generate all possible results of combining them:
// a + b
// a - b
// b - a
// a * b
// a / b (if b ≠ 0)
// b / a (if a ≠ 0)
// Append the result to the remaining numbers list (rest) and recurse:
// Try all pairs:
// Loop over all pairs (i, j) of numbers.
// For each pair, recursively test all operations.
// If any path reaches 24, return true.
// Example Walkthrough
// Input: cards = [4, 1, 8, 7]
// Pick (8, 4):
// Try 8 + 4 = 12, recurse with [12, 1, 7]
// Try 8 - 4 = 4, recurse with [4, 1, 7]
// Try 8 * 4 = 32, recurse with [32, 1, 7]
// Try 8 / 4 = 2, recurse with [2, 1, 7]
// Suppose we take 8 / 4 = 2 → [2, 1, 7]:
// Pick (2, 7) → try 2 * 7 = 14 → [14, 1]
// Then (14, 1) → try 14 + 1 = 15, 14 - 1 = 13, 14 * 1 = 14, 14 / 1 = 14.
// Another path: (7, 1) = 6 → [6, 8, 4] → eventually gives (8 - (4 - 6)) = 24. ✅


//TC-> O(N^2) This algorithm brute-forces all valid operation orders and groupings until it finds a combination equal to 24
//SC-> O(N)

var judgePoint24 = function(cards) {
    const EPS = 1e-6;

  const backtrack = (nums) => {
    if (nums.length === 1) return Math.abs(nums[0] - 24) < EPS;

    const n = nums.length;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const rest = [];
        for (let k = 0; k < n; k++) {
          if (k !== i && k !== j) rest.push(nums[k]);
        }

        const a = nums[i], b = nums[j];

        const candidates = [];
        candidates.push(a + b);        // + 
        candidates.push(a - b);        // -
        candidates.push(b - a);        // -
        candidates.push(a * b);        // * 
        if (Math.abs(b) > EPS) candidates.push(a / b); 
        if (Math.abs(a) > EPS) candidates.push(b / a); 

        for (const x of candidates) {
          rest.push(x);
          if (backtrack(rest)) return true;
          rest.pop();
        }
      }
    }
    return false;
  };

  return backtrack(cards.map(x => x * 1.0));
};

