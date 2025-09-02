//Problem -> 3000. Maximum-Area-of-Longest-Diagonal-Rectangle
//Problem Link -> https://leetcode.com/problems/maximum-area-of-longest-diagonal-rectangle/

//date -> 2025-08-26 (yyyy-mm-dd)

//TC-> O(n)
//SC-> O(1)

var areaOfMaxDiagonal = function(dimensions) {
    let maxA = 0;
    let maxDiagonal = 0
    const m = dimensions.length;
    const n = dimensions[0].length;

    for(let [l,w] of dimensions){
        const diagonal = l*l+w*w;
        const area = l*w;

        if(diagonal > maxDiagonal){
            maxDiagonal = diagonal;
            maxA = area;
        }else if(diagonal === maxDiagonal){
            maxA = Math.max(maxA, area);
        }
    }

    return maxA;
};

