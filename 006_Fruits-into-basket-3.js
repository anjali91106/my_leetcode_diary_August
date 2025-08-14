//problem -> 3479. Fruits Into Baskets III
//problem link -> https://leetcode.com/problems/fruits-into-baskets-iii/

//Date -> 2025-08-06 (yyyy-mm-dd)

// Approach:
// Initialize Segment Tree
// Let n = number of baskets.
// Find N = the smallest power of two ≥ n (for segment tree array structure).
// Create a segment tree array segTree of size 2*N and fill with 0.
// Place the basket capacities in the leaf nodes (segTree[N + i]).
// Build the tree bottom-up where each parent = max(left child, right child).

// Process Each Fruit
// Start from the root (index = 1), which stores the maximum basket capacity.
// If the maximum capacity in the tree is less than the current fruit’s quantity:
// No basket can hold this fruit → increment count (unplaced fruits) and skip.

// Otherwise:
// Traverse down the segment tree:
// Always move to the left child if it has enough capacity.
// If not, move to the right child.
// When you reach a leaf node → this is the basket to place the fruit in.

// Update Tree
// Set the chosen basket’s capacity to -1 (mark as unavailable).
// Move upward to the root, updating each parent’s value as the max of its children.

// Return
// Return count, the number of unplaced fruits..

// Explanation:
// We are given:
// fruits[i] → quantity of the i-th type of fruit.
// baskets[j] → capacity of the j-th basket.
// We must determine how many fruits cannot be placed into any basket.
// A fruit can be placed into exactly one basket whose remaining capacity is at least the fruit’s quantity.
// Once a fruit is placed in a basket, that basket becomes unavailable for future fruits.

// Time Complexity:
// O(n + m log n)

// Space Complexity:
// O(n)

var numOfUnplacedFruits = function(fruits, baskets) {
    //fruits[i] -> quantity of ith type of fruit
    //basket[j] -> capacity of jth basket

      const n = baskets.length;
    let N = 1;
    while (N <= n) N <<= 1;

    const segTree = new Array(N << 1).fill(0);
    for (let i = 0; i < n; i++) segTree[N + i] = baskets[i];

    for (let i = N - 1; i > 0; i--) {
        segTree[i] = Math.max(segTree[2 * i], segTree[2 * i + 1]);
    }

    let count = 0;
    for (let fruit of fruits) {
        let index = 1;
        if (segTree[index] < fruit) {
            count++;
            continue;
        }

        while (index < N) {
            if (segTree[2 * index] >= fruit) {
                index = 2 * index;
            } else {
                index = 2 * index + 1;
            }
        }

        segTree[index] = -1;
        while (index > 1) {
            index >>= 1;
            segTree[index] = Math.max(segTree[2 * index], segTree[2 * index + 1]);
        }
    }

    return count;
};