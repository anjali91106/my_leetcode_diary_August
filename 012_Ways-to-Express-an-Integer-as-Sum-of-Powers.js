//Problem -> 2797 Ways to Express an Integer as Sum of Powers
//Problem Link -> https://leetcode.com/problems/ways-to-express-an-integer-as-sum-of-powers/

//Approach ->
// This is a Dynamic Programming solution similar to subset sum / knapsack:
// 1. DP table definition
// f[i][j] = number of ways to get sum j using integers from 1 to i (each raised to power x).
// Base case: f[0][0] = 1 (one way to make sum 0 with no numbers).

//2. Iterating through integers
// Outer loop: Try each integer i from 1 to n.
// Compute k = i^x.
// Inner loop: For each target sum j from 0 to n:
// Case 1: Exclude i → same count as without it (f[i-1][j]).
// Case 2: Include i → add count of ways to make j - k without i.

//3. Result -> The number of ways to make n using numbers 1..n with each raised to power x.

// TC: O(n²)
// SC: O(n²)

var numberOfWays = function (n, x) {
  // two +ve integer -> n, x
  //return -> number of ways n can be expressed as the sum of the xth power
  //number od sets of unique integers -> n = n1^x + n2^x + . . . + nk^x

  const mod = 10 ** 9 + 7;
  const f = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
  f[0][0] = 1;

  // Iterating through integers
  for (let i = 1; i <= n; ++i) {
    let k = Math.pow(i, x);
    for (let j = 0; j <= n; ++j) {
      f[i][j] = f[i - 1][j];
      if (k <= j) {
        f[i][j] = (f[i][j] + f[i - 1][j - k]) % mod;
      }
    }
  }

  return f[n][n];
};


//More Optimized Solution ->
var numberOfWays = function(n, x) {
    const mod = 10 ** 9 + 7;
    let dp = Array(n + 1).fill(0);
    dp[0] = 1; // base case

    for (let i = 1; i <= n; i++) {
        let k = Math.pow(i, x);
        for (let j = n; j >= k; j--) { 
            dp[j] = (dp[j] + dp[j - k]) % mod;
        }
    }

    return dp[n];
};

// Why this is better:
// Space Complexity:
// From O(n²) → O(n) because we store only the current row instead of the full DP table.

// Time Complexity:
// Still O(n²) in worst case (since we still iterate over i and j), but constant factors are smaller.

//Note -> we can also slightly optimize the inner loop range so we don’t iterate over all j values when unnecessary, saving more time in practice.
