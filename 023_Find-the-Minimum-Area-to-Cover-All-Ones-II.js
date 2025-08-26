//problem -> 3197. Find the Minimum Area to Cover All Ones II
// problem link -> https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-ii/
//date -> 2025-08-23 (yyyy-mm-dd)

//Approach :- 
// Bounding box idea → For any set of 1s, the smallest rectangle covering them is just:
// minRow, maxRow, minCol, maxCol → area = (maxRow-minRow+1) × (maxCol-minCol+1).
// Three rectangles → You can think of cutting the grid either:
// Horizontally into 3 bands,
// Vertically into 3 bands,
// Or 1 horizontal + 2 vertical (or vice versa).
// Brute force with pruning → Try all possible 2 cuts:
// If you cut along rows: pick r1 and r2 (r1 < r2), you get 3 horizontal bands.
// Compute the bounding box area of 1’s in each band → sum them.
// Do the same for column cuts
// Also try “mixed”: first cut horizontally once, then cut one of the parts vertically.
// Optimization → Precompute prefix/suffix bounding boxes so you don’t rescan the grid each time.

//TC-> O(n^2⋅m^2+n^3⋅m) -> (worst case depending on n vs m, it’s essentially quartic in size)
//SC->O(n⋅m)

var minimumSum = function(grid) {
    const minimumArea = (B) => {
        if (!B.length || !B[0].length) return 0;
        let n = B.length, m = B[0].length;
        let left = Infinity, top = Infinity, right = -1, bottom = -1;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (B[i][j] === 1) {
                    left = Math.min(left, j);
                    top = Math.min(top, i);
                    right = Math.max(right, j);
                    bottom = Math.max(bottom, i);
                }
            }
        }
        if (right === -1) return 0;
        return (right - left + 1) * (bottom - top + 1);
    };
    // Rotate the grid 90 degrees clockwise so we just have to iterate horizontally
    const rotate = (B) => {
        let n = B.length, m = B[0].length;
        let rotated = Array.from({length: m}, () => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                rotated[j][n - 1 - i] = B[i][j];
            }
        }
        return rotated;
    };
    let res = Infinity;
    for (let rot = 0; rot < 4; rot++) {
        let n = grid.length, m = grid[0].length;
        for (let i = 1; i < n; i++) {
            let a1 = minimumArea(grid.slice(0, i));
            for (let j = 1; j < m; j++) {
                let part2 = grid.slice(i).map(r => r.slice(0, j));
                let part3 = grid.slice(i).map(r => r.slice(j));
                let a2 = minimumArea(part2);
                let a3 = minimumArea(part3);
                res = Math.min(res, a1 + a2 + a3);
            }
            for (let i2 = i + 1; i2 < n; i2++) {
                let part2 = grid.slice(i, i2);
                let part3 = grid.slice(i2);
                let a2 = minimumArea(part2);
                let a3 = minimumArea(part3);
                res = Math.min(res, a1 + a2 + a3);
            }
        }
        grid = rotate(grid);
    }
    return res;
};

