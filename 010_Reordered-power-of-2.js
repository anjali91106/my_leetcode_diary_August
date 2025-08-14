//problem -> Reordered Power of 2
//problem link -> https://leetcode.com/problems/reordered-power-of-2/

// TC-> O(d * 31) -> O(d) -> Constant
// SC-> O(1) -> only digit frequency objects and a few variables.

//Date-> 2025-08-10 (yyyy-mm-dd)

//explanation -> 
// What the question is really asking
// You have a number n.
// You can shuffle its digits around however you want (but no leading zero).
// After shuffling, can you make it exactly equal to some power of 2?
// If yes → return true.
// If no → return false.

// Example:
//n = 128 -> can stay as 128 -> 2^7 -> true
//n = 46 -> shuffle 64 -> 2^6 -> true
//n = 10 -> can only be 10 because shuffle 01 not valid (leading number is 0) -> false

//Approach -> 
// Step 1 — Count digits of n
// Say n = 821:
// Digits are: 1, 2, 8 → frequency {1:1, 2:1, 8:1}
// Step 2 — Precompute all powers of 2
// List all powers of 2 that are small enough (like 2^0 = 1 up to 2^29 = 536870912)
// For each, count their digits too.
//2^7 -> 128 → {1:1, 2:1, 8:1}
//2^6 -> 64 → {4:1, 6:1}
// Step 3 — Compare digit counts
// If any power of 2 has exactly the same digit counts as n, it means you can rearrange n to get that number.
//For n = 821 → matches 2^7 = 128 → true.

var reorderedPowerOf2 = function(n) {
    //leading digits != zero
    const freqCount = (num) => {
        const freq = {};
        const str = num.toString(); // convert to string
        for (let ch of str) {
            freq[ch] = (freq[ch] || 0) + 1; //frequency count
        }
        return freq;
    }

    const targetCount = freqCount(n); //total digits freq count

    //check all power of 2 up to billion

    for(let i = 0; i<31; i++){
        const powerCount = freqCount(1 << i) //2^i  //counting one by one

        if(JSON.stringify(powerCount) === JSON.stringify(targetCount)){
            return true;
        }
    }

    return false;
};
