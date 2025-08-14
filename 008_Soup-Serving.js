//problem -> 808 Soup Serving
// Problem LInk -> https://leetcode.com/problems/soup-servings/

// Date: 2025-08-08 ( YYYY-MM-DD )

//Explanation ->
// Soup A and Soup B, each starting with n milliliters.
// In each serving, one of four serving options is chosen with equal probability (0.25):

// | Option | Serve from A | Serve from B |
// | ------ | ------------ | ------------ |
// | 1      | 100ml        | 0ml          |
// | 2      | 75ml         | 25ml         |
// | 3      | 50ml         | 50ml         |
// | 4      | 25ml         | 75ml         |

//Goal: Find the probability that Soup A will empty first plus half the probability that both empty at the same time.

//Approach ->
// 1. Scaling down the problem -> const N = Math.ceil(n / 25)
//Since servings are multiples of 25 ml, n can be divided by 25 to reduce the problem size.
//Instead of dealing with actual milliliters, we deal with units of 25 ml:
// 100ml → 4
// 75ml → 3
// etc.

//2. Large n cutoff optimization -> if (n >= 4800) return 1.0
// For very large n, the probability approaches 1 (A almost certainly empties first).
// This cutoff drastically reduces recursion depth for big inputs.

// 3. Recursive DFS with memoization
// Base cases handle when either soup is empty.
// Each call splits into 4 equally probable serving paths.
// Results are cached in a Map to prevent recomputation.

// 4. Start the recursion -> return dfs(N, N);
// Start with both soups at N units.

//Time Complexity -> O((n/25)²)
//Space Complecity -> O((n/25)²) for memoization.

var soupServings = function(n) {
    if (n >= 4800) return 1.0; // cutoff optimization
    
    const memo = new Map();
    const getKey = (a, b) => `${a},${b}`;
    
    function dfs(a, b) {
        if (a <= 0 && b <= 0) return 0.5;
        if (a <= 0) return 1;
        if (b <= 0) return 0;

        const key = getKey(a, b);
        if (memo.has(key)) return memo.get(key);

        const prob = 0.25 * (
            dfs(a - 4, b) +
            dfs(a - 3, b - 1) +
            dfs(a - 2, b - 2) +
            dfs(a - 1, b - 3)
        );

        memo.set(key, prob);
        return prob;
    }

    const N = Math.ceil(n / 25);
    return dfs(N, N);
};