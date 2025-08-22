//problem -> 1504. Count Submatrices With All Ones
//Problem Link -> https://leetcode.com/problems/count-submatrices-with-all-ones/

//Date -> 2025-08-21 (yyyy-mm-dd)

//Explanation -> We are given a binary matrix (mat with 0s and 1s). 
// We need to count the total number of submatrices (rectangles inside the matrix) that are completely filled with 1s.

//Approach -> 
// The approach is similar to largest rectangle in a histogram problems.
// Transform rows into histograms
// For each row, we treat it as the base of a histogram.
// heights[j] keeps track of the number of consecutive 1s in column j up to the current row.
// If mat[i][j] == 1, we increase height.
// If mat[i][j] == 0, we reset to 0.
// Count submatrices ending at row i
// For each row, we check: "If this row is the bottom of the submatrix, how many submatrices end here?"
// For every column j, look leftwards (k = j, j-1, j-2, ...), and track the minimum height so far.
// This ensures all chosen columns form a rectangle of height minHeight.
// Add minHeight to count.
// Why?
// Suppose heights = [2,1,2].
// At j=2, we look left:
// k=2 → minHeight=2 → add 2
// k=1 → minHeight=min(2,1)=1 → add 1
// k=0 → minHeight=min(1,2)=1 → add 1
// Total = 4 submatrices ending at column 2.
// Accumulate total count
// Do this for each row, for each column, and add them all.

// TC = O(m * n²)
// SC = O(n)

var numSubmat = function(mat) {
    const m = mat.length;
    const n = mat[0].length;
    let count = 0;
  let heights = new Array(n).fill(0);

  for(let i = 0; i<m; i++){
    //update heights
    for(let j = 0; j<n; j++){
        if(mat[i][j] === 1){
            heights[j] += 1;
        }else heights[j] = 0;
    }

   //count submatrices ending at i
    for(let j = 0; j<n; j++){
        let minHeight = heights[j];
        for(let k = j; k>=0 && minHeight > 0; k--){
            minHeight = Math.min(minHeight, heights[k]);
            count += minHeight;
        }
    }
  }

  return count;
};