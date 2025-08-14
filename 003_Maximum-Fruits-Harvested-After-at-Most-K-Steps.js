//problem -> 2106 Maximum Fruits Harvested After at Most K Steps
//problem link -> https://leetcode.com/problems/maximum-fruits-harvested-after-at-most-k-steps/

//date -> 2025-08-03 (yyyy-mm-dd)

// Approach:
// 1. Preprocess the fruit positions and amounts into a prefix sum array for fast range queries.
// 2. Use two strategies:
//    - Go right first, then left.
//    - Go left first, then right.
// 3. For each possible number of steps in one direction, calculate the maximum fruit collection possible 
//    using binary search to find the reachable fruit positions.
// 4. Keep track of the best possible total.
// Time Complexity: O(n log n) - Each range query uses binary search (O(log n)) and we iterate O(k) times.
// Space Complexity: O(n) - For storing positions array and prefix sum.
//
// Explanation:
// - The problem asks us to maximize the number of fruits collected starting from `startPos` with at most `k` steps.
// - Since each fruit type is located at a fixed position, we can preprocess:
//     * `pos` array → positions of fruits
//     * `prefix` array → prefix sums of fruit counts for fast range sum queries
// - We use binary search (`lowerBound` and `upperBound`) to find the indices of fruits within reach.
// - We consider two movement patterns:
//     1) Move right `r` steps, then left using remaining steps (which costs double to return).
//     2) Move left `l` steps, then right with the remaining steps.
// - For each possible split, we calculate total fruits using the `getSum` helper and take the maximum.

var maxTotalFruits = function(fruits, startPos, k) {
    let n = fruits.length;
    let pos = fruits.map(f => f[0]); // positions
    let prefix = Array(n + 1).fill(0);

    // Build prefix sum array
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + fruits[i][1];
    }

    // Helper to get fruit sum in range [l, r]
    function getSum(l, r) {
        let leftIdx = lowerBound(pos, l);
        let rightIdx = upperBound(pos, r) - 1;
        if (leftIdx > rightIdx) return 0;
        return prefix[rightIdx + 1] - prefix[leftIdx];
    }

    // Binary search: first index >= target
    function lowerBound(arr, target) {
        let lo = 0, hi = arr.length;
        while (lo < hi) {
            let mid = (lo + hi) >> 1;
            if (arr[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    // Binary search: first index > target
    function upperBound(arr, target) {
        let lo = 0, hi = arr.length;
        while (lo < hi) {
            let mid = (lo + hi) >> 1;
            if (arr[mid] <= target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    let ans = 0;

    // Case 1: Go right first
    for (let rightSteps = 0; rightSteps <= k; rightSteps++) {
        let remaining = k - 2 * rightSteps;
        if (remaining < 0) continue;
        let leftReach = startPos - remaining;
        let rightReach = startPos + rightSteps;
        ans = Math.max(ans, getSum(leftReach, rightReach));
    }

    // Case 2: Go left first
    for (let leftSteps = 0; leftSteps <= k; leftSteps++) {
        let remaining = k - 2 * leftSteps;
        if (remaining < 0) continue;
        let leftReach = startPos - leftSteps;
        let rightReach = startPos + remaining;
        ans = Math.max(ans, getSum(leftReach, rightReach));
    }

    return ans;
};

// Example:
// Input: fruits = [[2,4],[4,5],[5,3],[8,2]], startPos = 5, k = 4
// Output: 9
// Explanation:
// - Go left to position 4 (1 step) → collect 5 fruits
// - Then go left to position 2 (2 more steps) → collect 4 fruits
// - Total = 9 fruits