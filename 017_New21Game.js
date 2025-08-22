//Problem -> 837 New 21 Game
//Problem Link -> https://leetcode.com/problems/new-21-game/

//Date-> 2025-08-17

//Explanation-> Alice starts with 0 points.
// She keeps drawing numbers uniformly from 1..W and adds them to her total.
// She stops drawing as soon as her total is ≥ K.
// You’re asked: What’s the probability her final total is ≤ N?

// If K == 0, Alice doesn’t draw at all, so total is 0 → answer = 1.0 as long as 0 ≤ N (which the constraints guarantee).
// If N ≥ K + MAX - 1, then no matter what, once Alice stops (first time total ≥ K), the total can’t exceed K-1 + MAX → it’s automatically ≤ N. So answer = 1.0.

//Approach-> Let P[x] be the probability of winning (ending ≤ N) given current total is x.
// If x ≥ K, Alice has already stopped.
// If x ≤ N, P[x] = 1
// Else P[x] = 0
// If x < K, one more draw happens, uniformly in 1..MAX:
// P[x] = (P[x+1] + P[x+2] + ... + P[x+MAX]) / MAX
// We need P[0].
// Sliding window trick
// Directly summing MAX terms for every x is O(K·MAX). We can do O(K+MAX) with a sliding window:
// For x in [K, K+MAX-1]:
// P[x] = 1 if x ≤ N, else 0.
// Initialize
// windowSum = sum(P[K], P[K+1], ..., P[K+MAX-1]) = min(N - K + 1, MAX) (count of ones in that block).
// For x = K-1 down to 0:
// P[x] = windowSum / MAX
// Slide the window:
// windowSum = windowSum - P[x + MAX] + P[x]
// Answer is P[0].
// Time: O(K + MAX), Space: O(K + MAX) (can compress a bit if you like).
// Intuition
// Before reaching K, each state’s win chance is just the average of the next MAX states (because of uniform draws). After reaching K, the game is decided instantly by whether the stopping total is ≤ N. The sliding window keeps that moving average in O(1) per state.
// Edge cases to remember
// K == 0 → return 1.0.
// N >= K + MAX - 1 → return 1.0.
// Small N vs K (e.g., N < K) still works: many P[x] in the stop region become 0

//TC-> O(N)
//SC-> O(N)

var new21Game = function(n, k, maxPts) {
   if (k === 0) return 1.0;
  if (n >= k + maxPts - 1) return 1.0;

  const P = new Array(k + maxPts).fill(0);

  // base: for x >= K
  for (let x = k; x <= n; x++) {
    P[x] = 1.0;
  }

  // initial window sum = sum(P[K] .. P[K+W-1])
  let windowSum = 0;
  for (let i = k; i < k + maxPts; i++) {
    windowSum += P[i];
  }

  // compute P[x] backwards
  for (let x = k - 1; x >= 0; x--) {
    P[x] = windowSum / maxPts;
    windowSum += P[x] - P[x + maxPts];  // ✅ correct update
  }

  return P[0];
};