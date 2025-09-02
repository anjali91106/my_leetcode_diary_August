//Problem -> 3459. Length of Longest V-Shaped Diagonal Segment
//Problem Link -> https://leetcode.com/problems/length-of-longest-v-shaped-diagonal-segment/

//date -> 2025-08-27 (yyyy-mm-dd)

// Problem Summary
// You have an n × m grid filled with 0, 1, or 2. A V-shaped diagonal segment is defined by:
// Starting at a cell with value 1.
// Continuing along a diagonal direction (↘, ↘? actually there are 4: down-right, down-left, up-left, up-right).
// Following the sequence: 1 → 2 → 0 → 2 → 0 → ...
// You may make at most one clockwise 90° turn, continuing the sequence along the new diagonal.
// You need to return the maximum length of such a segment found in the grid (or 0 if none found).

// Time Complexity: O(n * m)
// Space Complexity: O(n * m)

var lenOfVDiagonal = function(grid) {
   const n = grid.length;
    const m = grid[0].length;

    // Diagonal directions: down-right, down-left, up-left, up-right
    const DIRS = [[1, 1], [1, -1], [-1, -1], [-1, 1]];

    // Memoization: [row][col][direction+turn_state]
    // direction (2 bits) + canTurn (1 bit) → total 8 states
    const memo = Array.from({ length: n }, () =>
        Array.from({ length: m }, () => Array(8).fill(0))
    );

    let ans = 0;

    // Try starting from every cell with value = 1
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] !== 1) continue;

            // Pruning: how far we can go in each direction
            const maxs = [n - i, j + 1, i + 1, m - j];

            for (let k = 0; k < 4; k++) {
                if (maxs[k] > ans) {
                    ans = Math.max(ans, dfs(i, j, k, 1, 2) + 1);
                }
            }
        }
    }

    return ans;

    // Depth-first search with memoization
    function dfs(i, j, k, canTurn, target) {
        i += DIRS[k][0];
        j += DIRS[k][1];

        // Stop if out of bounds or not matching target value
        if (i < 0 || i >= n || j < 0 || j >= m || grid[i][j] !== target) {
            return 0;
        }

        // Encode state
        const mask = (k << 1) | canTurn;
        if (memo[i][j][mask] > 0) return memo[i][j][mask];

        // Continue in same direction, alternate target
        let res = dfs(i, j, k, canTurn, 2 - target);

        // Optionally turn once (only if canTurn = 1)
        if (canTurn === 1) {
            const maxs = [n - i - 1, j, i, m - j - 1];
            const nk = (k + 1) % 4; // turn clockwise

            if (maxs[nk] > res) {
                res = Math.max(res, dfs(i, j, nk, 0, 2 - target));
            }
        }

        // Store and return result (+1 for current cell)
        return (memo[i][j][mask] = res + 1);
    }
};



