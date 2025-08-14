// Problem: 904. Fruit Into Baskets
// Link: https://leetcode.com/problems/fruit-into-baskets/
// Date: 2025-08-04 ( YYYY-MM-DD )
// Approach:
// 1. Use a sliding window to find the longest contiguous segment with at most 2 distinct fruit types.
// 2. Keep a Map (count) to store the frequency of each fruit type in the current window.
// 3. Move the right pointer one step at a time, adding fruits to the map and updating their count.
// 4. If the window contains more than 2 distinct types, move the left pointer forward, decreasing counts, and remove fruit types from the map when their count reaches 0.
// 5. At each step, update maxLen with the current window size (right - left + 1).

// Explanation:
// -The problem is equivalent to "Longest Substring with at Most K Distinct Characters" with K = 2.
// -The sliding window ensures we only pass through the array once, adjusting the window size dynamically to always satisfy the "at most 2 types" condition.
// -The map is crucial for quick frequency updates and checking the number of distinct types in O(1).

// Time Complexity:
// O(n), where n is the number of fruits — each fruit is added and removed from the map at most once.
// Space Complexity:
// O(1), because the map holds at most 2 fruit types regardless of input size.

var totalFruit = function(fruits) {
    let count = new Map();
    let left = 0, maxLen = 0;

    for (let right = 0; right < fruits.length; right++) {
        count.set(fruits[right], (count.get(fruits[right]) || 0) + 1);

        while (count.size > 2) {
            count.set(fruits[left], count.get(fruits[left]) - 1);
            if (count.get(fruits[left]) === 0) count.delete(fruits[left]);
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};


// Example 1:
// Input: fruits = [1,2,1]
// Output: 3
// Explanation: We can pick from all 3 trees.
// Example 2:

// Input: fruits = [0,1,2,2]
// Output: 3
// Explanation: We can pick from trees [1,2,2].
// If we had started at the first tree, we would only pick from trees [0,1].
// Example 3:
