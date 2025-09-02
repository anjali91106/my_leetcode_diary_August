//Problem -> 3446. Sort Matrix by Diagonals
//Problem Link -> https://leetcode.com/problems/sort-matrix-by-diagonals/

//date -> 2025-08-28 (yyyy-mm-dd)

// Problem Summary
// We need to:
// Bottom-left (including main diagonal) → sort diagonals in descending order
// Top-right → sort diagonals in ascending order

//Approcah 
// To solve this, the main idea is:
// Identify each diagonal, one at a time.
// Extract its elements into a list.
// Sort the list—descending for bottom-left, ascending for top-right.
// Write back the sorted elements into the same diagonal positions.
// A step-by-step plan:
// A. Bottom-Left Diagonals (including main diagonal)
// Iterate starting rows from n–2 down to 0 (these are the starting points of the diagonals along the left edge, apart from the final row).
// For each start row k, set i = k, j = 0 and collect elements along the diagonal (i, j), incrementing both until reaching matrix boundary.
// Sort the gathered list in descending order.
// Write them back along the diagonal positions.
// B. Top-Right Diagonals (above main diagonal)
// Iterate starting columns or rows that define diagonals starting in the top row (excluding the main diagonal) or the rightmost column. One implementation iterates k from n–2 down to 1, using (i = 0, j = k+1) or similar; the key idea is to process each diagonal origin.
// Collect elements along the diagonal by decrementing both indices (i–, j–) until boundary.
// Sort in ascending order.
// Write back to their positions.
// This isolates each diagonal, sorts it appropriately, then reassigns it—achieving the required transformation.

// Time Complexity: O(n^2 log n) (sorting diagonals up to length n)
// Space Complexity: O(n) extra per diagonal

var sortMatrix = function(grid) {
   let n = grid.length;

  // bottom-left (including main diagonal) → descending
  for (let row = n - 1; row >= 0; row--) {
    let diag = getDiagonal(grid, row, 0);
    diag.sort((a, b) => b - a); // descending
    putDiagonal(grid, row, 0, diag);
  }

  // top-right (above main diagonal) → ascending
  for (let col = 1; col < n; col++) {
    let diag = getDiagonal(grid, 0, col);
    diag.sort((a, b) => a - b); // ascending
    putDiagonal(grid, 0, col, diag);
  }

  return grid;
};

function getDiagonal(grid, i, j){
  let n = grid.length;
  let arr = [];
  while (i < n && j < n) {
    arr.push(grid[i][j]);
    i++;
    j++;
  }
  return arr;
}

function putDiagonal(grid, i, j, arr){
    let n = grid.length;
    let k = 0;

    while(i<n && j<n){
       grid[i][j] = arr[k++];
       i++;
       j++;
    }
}


