//problem -> 2561 Rearranging Fruits
// problem link -> https://leetcode.com/problems/rearranging-fruits/
//date -> 2025-08-02 (yyyy-mm-dd)

// Approach:
// 1. Count the frequency difference of each fruit between basket1 and basket2.
// 2. If any fruit has an odd difference, it’s impossible to make the baskets equal.
// 3. Collect the extra fruits (excess count) from both baskets.
// 4. Sort the extra fruits and only consider the smallest half for swapping.
// 5. The cost for each swap is either the fruit’s value or twice the smallest fruit value overall (using globalMin for a cheaper swap).

// Time Complexity: O(n log n)
// Space Complexity: O(n)

// Explanation:
// - First, we find the frequency difference for each fruit type between the two baskets.
// - If a difference is odd, no number of swaps can balance it (return -1).
// - We store half of each excess in an `extra` array, representing fruits that need to be swapped.
// - Sorting ensures we swap cheaper fruits first to minimize cost.
// - For each swap, the cost is the cheaper of:
//      a) The fruit value itself.
//      b) Twice the smallest fruit value in all baskets (globalMin).
// - Summing these minimal costs gives the final answer.

var minCost = function(basket1, basket2) {
    let n = basket1.length;
    let freq = new Map();
    let allFruits = [];

    // Count frequency difference between baskets
    for (let i = 0; i < n; i++) {
        freq.set(basket1[i], (freq.get(basket1[i]) || 0) + 1);
        freq.set(basket2[i], (freq.get(basket2[i]) || 0) - 1);
        allFruits.push(basket1[i], basket2[i]);
    }

    // Find the smallest fruit value across both baskets
    let globalMin = Math.min(...allFruits);

    // Find extra fruits that need swapping
    let extra = [];
    for (let [fruit, count] of freq) {
        if (count % 2 !== 0) return -1; // Impossible if odd difference
        for (let k = 0; k < Math.abs(count) / 2; k++) {
            extra.push(fruit);
        }
    }

    // Sort to handle smallest swaps first
    extra.sort((a, b) => a - b);
    let swapsNeeded = extra.length / 2;

    // Calculate minimum cost
    let cost = 0;
    for (let i = 0; i < swapsNeeded; i++) {
        cost += Math.min(extra[i], 2 * globalMin);
    }

    return cost;
};

// Example:
// Input: basket1 = [4,2,2,2], basket2 = [1,4,1,2]
// Output: 1
// Explanation:
// Swap index 1 of basket1 with index 0 of basket2, which has cost 1. Now basket1 = [4,1,2,2] and basket2 = [2,4,1,2]. Rearranging both the arrays makes them equal.

// Example 2:
// Input: basket1 = [2,3,4,1], basket2 = [3,2,5,1]
// Output: -1
// Explanation: It can be shown that it is impossible to make both the baskets equal.
