//problem -> 2348 Number of zeros-filled subarrays
// problem link -> https://leetcode.com/problems/number-of-zero-filled-subarrays/
//date -> 2025-08-19 (yyyy-mm-dd)

//Explanation :- 
// We need to find all contiguous subarrays filled with 0s in the given array.
// A subarray is defined as a contiguous portion of the array.
//we just need to count the number of contiguous subarrays filled with 0s.

// Approach: 
// make two varible one to count zeros and other to count when subarray is found
// we can iterate through the array and for each zero we find, we increment the zero counter
// when we find a non-zero, we add the current zero counter to the result and reset it
//example:- For nums = [0, 0, 1, 0]:
// i=0: x=0 → cnt=1, ans=1
// i=1: x=0 → cnt=2, ans=1+2=3
// i=2: x=1 → reset cnt=0
// i=3: x=0 → cnt=1, ans=3+1=4

// Time Complexity: O(n²) - We compute each element once.
// Space Complexity: O(n²) - We store all rows.

var zeroFilledSubarray = function(nums) {
    let count = 0;
    let ans = 0;
    for(let num of nums){
        if(num === 0){
            count++;
            ans += count;
        }else count = 0;
    }
    return ans;
};