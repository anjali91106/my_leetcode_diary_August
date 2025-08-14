//problem -> 3477. Fruits Into Baskets II
//problem link -> https://leetcode.com/problems/fruits-into-baskets-ii/

//Date -> 2025-08-05 (yyyy-mm-dd)

// Approach:
// 1. Iterate over each fruit type’s quantity
// 2. For each fruit type, scan baskets from left to right to find the first unused basket with enough capacity (baskets[i] >= fruitQuantity).
// 3. Mark the basket as used and decrease the count of unplaced fruits.
// 4. If no suitable basket is found for a fruit type, it remains unplaced.
// 5. Return the total number of unplaced fruit types.

// Explanation:
// This is a greedy approach where we always try to place a fruit type into the leftmost valid basket.
// The used array ensures that each basket is used at most once.
// The nested loop checks every fruit type against every basket until it finds a valid match.
// The process continues until all fruits are either placed or no valid baskets remain.

// Time Complexity:
// O(n²) in the worst case — for each of the n fruit types, we may scan up to n baskets to find a match.

// Space Complexity:
// O(n) for the used array to track which baskets are already occupied.

var numOfUnplacedFruits = function(fruits, baskets) {
    //fruits[i] -> quantity of ith type pf fruit
    //basket[j] -> represents the capacity of jth basket
    //capacity >= quantity of that fruit type(in leftmost basket)
    //each basket -> can have only one type of fruit
    //return unplaced fruit 

    const n = fruits.length;
    const used = new Array(n).fill(false); // tracks used baskets
    let unplaced = n;
  
    for (let x of fruits) {
        for (let i = 0; i < n; i++) {
        if (!used[i] && baskets[i] >= x) {
            used[i] = true;
            unplaced--;
            break; // fruit placed in the leftmost valid basket
        }
      }
    }
  
  return unplaced;
};
