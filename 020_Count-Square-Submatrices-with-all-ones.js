//problem -> 1277. Count Square Submatrices with All Ones
// problem link -> https://leetcode.com/problems/count-square-submatrices-with-all-ones/
//date -> 2025-08-20 (yyyy-mm-dd)

//Explanation :- 
// You’re given an m x n binary matrix filled with 0’s and 1’s.
// Your task is to count the total number of square submatrices that have all ones.
// A square submatrix means rows = columns (e.g., 1x1, 2x2, 3x3, …).
// You need to count all of them.

// Approach: 
// Key Insight
// If matrix[i][j] == 1, the size of the largest square ending at (i, j) depends on:
// The top cell (i-1, j)
// The left cell (i, j-1)
// The top-left diagonal (i-1, j-1)

// Algorithm
// Initialize dp same size as matrix.
// Iterate over all cells:
// If cell is 1, apply formula.
// Add dp[i][j] to result (because it counts all possible squares ending at that cell).
// Return result.

//formula -> If matrix[i][j] == 1, then:
// dp[i][j] = 1 + min(
            //   dp[i-1][j],     // top
            //   dp[i][j-1],     // left
            //   dp[i-1][j-1]    // top-left diagonal
            // )


//  Time Complexity: O(m * n)
//  Space Complexity: O(m * n) (can be optimized to O(n))

var countSquares = function(matrix) {
    let m = matrix.length;
    let n = matrix[0].length 
    let dp = Array.from({length: m}, () => new Array(n).fill(0));

    if(!matrix || matrix.length === 0) return 0;

    let count = 0;

    for(let i = 0; i<m; i++){
        for(let j = 0; j<n; j++){
            if(matrix[i][j] === 1){
                if(i === 0 || j === 0){
                    dp[i][j] = 1;
                } else {
                    dp[i][j] = 1 + Math.min(
                        dp[i-1][j],     // top
                        dp[i][j-1],     // left
                        dp[i-1][j-1]    // top-left
                    );
                }
                count += dp[i][j]
            }
        }
    }

    return count;
};