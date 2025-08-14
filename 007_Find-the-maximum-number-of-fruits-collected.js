// Problem: 3363 Find The Maximum n]Number of Fruits Collected
// Link: https://leetcode.com/problems/find-the-maximum-number-of-fruits-collected/

// Date: 2025-08-07 ( YYYY-MM-DD )

// Approach:
// 1. Take the main diagonal first :-
// -This diagonal represents fruits both kids pass over initially (top-left to bottom-right).

// 2. Compute max fruits for the top-left kid :-
// Uses a helper updateFromLeftPaths(i,j):
// It checks 3 possible cells from the previous column (j-1) that the kid could have come from:
// (i-1, j-1) → came diagonally up
// (i, j-1) → came from the left
// (i+1, j-1) → came diagonally down
// Picks the maximum of those and adds it to fruits[i][j].
// Two loops handle the left half:
// First half: filling bottom-left triangle up to the middle column.
// Second half: filling until bottom center.

// 3. Compute max fruits for the top-right kid: -
// Uses updateFromTopPaths(i,j):
// Similar to left kid, but moves vertically down and checks:
// (i-1, j-1) → diagonally left
// (i-1, j) → straight up
// (i-1, j+1) → diagonally right
// Two loops handle the right half:
// First half: top-right triangle down to the middle.
// Second half: until bottom center.

// 4.Add the results :- 
// totalsum += fruits[n - 1][n - 2]; // Max for left kid
// totalsum += fruits[n - 2][n - 1]; // Max for right kid

// Explanation:
// You are given a square grid fruits[n][n].
// Think of it as two kids starting:
// Top-left kid: starts at (0,0), moves diagonally down-right initially and then curves down-left towards bottom center.
// Top-right kid: starts at (0,n-1), moves diagonally down-left initially and then curves down-right towards bottom center.
// Both kids:
// Can move down, down-left, or down-right (but in their respective half of the grid).
// Want to collect the maximum number of fruits.
// Meet near the bottom middle (around (n-1, n-2) for left kid and (n-2, n-1) for right kid).
// The goal: Return the maximum total fruits collected by both kids, plus the diagonal path that’s always collected first.

// Time Complexity:
// O(n²) -> Two DP passes over the grid
// Space Complexity:
// O(1) extra space

var maxCollectedFruits = function(fruits) {
      let n = fruits.length;
    let totalsum = 0, half = Math.ceil( (n-1) / 2);
    //top left goes diagonically to bottom right
    for(let i=0; i<n; i++) {
        totalsum += fruits[i][i];
    }
    //bottom left triangle
    function updateFromLeftPaths(i,j) {
        let maxFromLeft = 0;
        if (i-1 >= n - j) {
            maxFromLeft = fruits[i-1][j - 1];
        }
        if (i >= n - j) {
            maxFromLeft = Math.max(maxFromLeft, fruits[i][j-1]);
        }
        if (i+1 >= n - j && i+1 < n) {
            maxFromLeft = Math.max(maxFromLeft, fruits[i+1][j-1]);
        }
        fruits[i][j] += maxFromLeft;
    }
    for(let j=1; j<=half - 1; j++) {
        for(let i=n - 1; i>= n - j - 1; i--) {
            updateFromLeftPaths(i,j);
        }
    }
    for(let j=half; j<=n - 2; j++) {
        for(let i=n - 1; i>= j + 1; i--) {
            updateFromLeftPaths(i,j);
        }
    }
    //fruits[n-1][n-2] has max for topLeftKid
    totalsum += fruits[n - 1][n - 2];

    //top right
    function updateFromTopPaths(i,j) {
        let maxFromTop = 0;
        if (j-1 >= n - i) {
            maxFromTop = fruits[i-1][j-1];
        }
        if (j >= n - i) {
            maxFromTop = Math.max(maxFromTop, fruits[i-1][j]);
        }
        if (j+1 >= n - i && j+1 < n) {
            maxFromTop = Math.max(maxFromTop, fruits[i-1][j+1]);
        }
        fruits[i][j] += maxFromTop;
    }
    for(let i=1; i<=half - 1; i++) {
        for(let j=n - 1; j>= n - i - 1; j--) {
            updateFromTopPaths(i,j);
        }
    }
    for(let i=half; i<=n - 2; i++) {
        for(let j=n - 1; j>= i + 1; j--) {
            updateFromTopPaths(i,j);
        }
    }
    //fruits[n-2][n-1] has totalfruits for topright kid
    totalsum += fruits[n - 2][n - 1];
    return totalsum;
};