//Problem ->498 Diagonal Traverse
//Problem Link -> https://leetcode.com/problems/diagonal-traverse/description/

//date -> 2025-08-25 (yyyy-mm-dd)

//Explanation -
// The problem wants you to traverse diagonals in a zig-zag order:
// first diagonal: top-left → down-right
// second diagonal: reverse (bottom-up)
// alternate directions each time.

//Approach :- 
//1. Grouping by diagonals
// Each diagonal in the matrix can be uniquely identified by the sum of indices i + j.
// Example for a 3×3 matrix:
// Diagonal 0: mat[0][0] → key = 0
// Diagonal 1: mat[0][1], mat[1][0] → key = 1
// Diagonal 2: mat[0][2], mat[1][1], mat[2][0] → key = 2
// So we loop through all cells (i, j) and push them into a bucket str[i + j].

//2.Reordering diagonals
// After collecting, we traverse diagonals in order of increasing key (0 to m + n - 2).
// The problem wants a zig-zag traversal:
// Even-numbered diagonals (0, 2, 4, …) → reverse the collected order
// Odd-numbered diagonals (1, 3, 5, …) → keep as-is

//3. Flatten into result
// For each diagonal, expand it into the final array with push(...str[k]) (or reversed if needed).



//TC-> O(m * n)
//SC-> O(m * n)

var findDiagonalOrder = function(mat) {
    let m = mat.length;
    let n = mat[0].length
    let str = {};

    let diagonals = [];

    for(let i=0; i<m; i++){
        for(let j=0; j<n; j++){
            let key = i + j; 
            if (!str[key]) str[key] = [];
            str[key].push(mat[i][j]);
        }
    }

    for (let k = 0; k < m + n - 1; k++) {
        if (k % 2 === 0) {
            // reverse order for even diagonals
            diagonals.push(...str[k].reverse());
        } else {
            diagonals.push(...str[k]);
        }
    }

    return diagonals;
};
