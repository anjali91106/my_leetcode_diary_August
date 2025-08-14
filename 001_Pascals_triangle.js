
//problem -> 118 Pascals Triangle
// problem link -> https://leetcode.com/problems/pascals-triangle/
//date -> 2025-08-01 (yyyy-mm-dd)
// Approach: Start with the first row [1], then build each subsequent row
//           by setting the first and last elements to 1, and filling the
//           middle elements as the sum of the two numbers above it.

// Time Complexity: O(n²) - We compute each element once.
// Space Complexity: O(n²) - We store all rows.

// Explanation:
// Pascal's Triangle is constructed so that:
// - The first row is always [1].
// - Each number inside the triangle is the sum of the two numbers above it.
// - The first and last numbers of each row are always 1.

var generate = function(numRows) {
    //first creating a result array
     let res = [];
     res[0] = [1]; //initalizing it to 1 on zeroth index

    for(let i = 1; i<numRows; i++){
       let subArr = [] //empty row array
       subArr[0] = 1; //first element of each low

       //fill the middle elements by adding two numbers above it
       for(let j = 1; j<i; j++){
           subArr[j] = res[i-1][j-1] + res[i-1][j]
       }

       subArr[i] = 1; //last element of each row
       res[i] = subArr;
    }

    return res;
};


//example -> Input: numRows = 5
// Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]


