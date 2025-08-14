//Problem -> 2438 Range Product Queries of Powers
//Problem Link -> https://leetcode.com/problems/range-product-queries-of-powers/

//Date -> 2025-08-11 (yyyy-mm-dd)

//Explanation ->
// Given:
// - n: a positive integer
// - queries: 0-indexed array where queries[i] = [left, right]
//
// Goal:
// 1. Represent n as the sum of the minimal number of distinct powers of 2.
//    This comes directly from the set bits in n's binary representation.
// 2. Store these powers in an array (smallest to largest).
// 3. For each query [l, r], compute the product of arr[l...r] modulo 1e9+7.
//
// Steps:
// - Step 1: Extract powers of 2 from n (via bitwise check for set bits).
// - Step 2: For each query, multiply the relevant segment of powers[]
//           using BigInt to avoid overflow, taking modulo each time.
// - Step 3: Push results to the answer array.
//
// Note: This is O(#queries * range length). For larger constraints,
//       a prefix-product + modular inverse approach would be faster.
// (If you want this optimized to O(Q + log n) time, you’d need a prefix product array + modular inverses so each query becomes O(1).)

//TC: O(log n + Q × log n)  →  O(Q × log n) in worst case
//SC: O(log n + Q)

var productQueries = function (n, queries) {
  //n -> +ive interger
  //0 indxed array -> powers
  //min number of powers of 2 that sums to n
  // arr -> sorted in decreasing order
  //given -> 0 indexed 2d array -> queries
  //queries[i] = [lefti, righti]
  //each queries[i] -> find product of all powers[j] with lefti <= j <= right

  //return array answers.length = queries.length
  //answers[i] -> answer to the ith query
  //each answers should be return in modulo 10^9 + 7

  // solution ->
  const MOD = 1_000_000_007n;

  // Step 1: Get powers of 2 from n
  let arr = [];
  for (let i = 0; 1 << i <= n; i++) {
    if (n & (1 << i)) arr.push(BigInt(1 << i));
  }

  // Step 2: Answer queries by direct multiplication
  let ans = [];
  for (let [l, r] of queries) {
    let prod = 1n;
    for (let i = l; i <= r; i++) {
      prod = (prod * arr[i]) % MOD;
    }
    ans.push(Number(prod));
  }

  return ans;
};
