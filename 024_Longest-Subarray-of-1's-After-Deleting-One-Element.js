//problem -> 1493. Longest Subarray of 1's After Deleting One Element
// problem link -> https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element
//date -> 2025-08-24 (yyyy-mm-dd)

//Approach :- 
// Initialize l = 0, zero = 0, ans = 0.
// For each r from 0 to n-1:
// If nums[r] == 0, increment zero.
// While zero > 1, move l right:
// If nums[l] == 0, decrement zero.
// l++
// Now the window has at most one 0. The length after deleting one element is (r - l + 1) - 1.
// Update ans = max(ans, r - l) (same as subtracting one).
// Edge case: if the array is all 1’s, you must delete one element, so answer is n - 1. The formula above already yields that.

//TC-> O(n)
//SC-> O(1)

var longestSubarray = function(nums) {

    let left = 0, zero = 0, ans = 0;
    for(let i=0; i<nums.length; i++){
      if(nums[i] === 0) zero++;
      while(zero > 1){
        if(nums[left] === 0) zero--;
        left++;
      }
      ans = Math.max(ans, i - left); //delete one element
    }

    return ans;
};


