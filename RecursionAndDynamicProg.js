/* Word Break */

/* Question
Given a string 's' and a dictionary (array of words), find out if the string can
be divided into space delineated sentence given the words in the dictionary.

Ex:
s = 'bettercodebetter'
dict = ['bet','better','code']

return true => 'better code better'
*/

/* Complexities
n = string length
d = dictionary length

time: best case: O(n^2) since set look ups are O(1) (loop * slice) worstcase: ...
space: O(n)

*/

const s = 'bettercodebetter';
const dict = ['bet', 'better', 'code'];

const wordBreak = (s, dict, dictSet = undefined) => {
  if (!dictSet) {
    dictSet = new Set(dict);
  }
  // base case
  if (!s.length) return true;
  let curWord = '';
  for (let i = 0; i < s.length; i++) {
    let curLetter = s[i];

    curWord += curLetter;
    if (dictSet.has(curWord)) {
      let found = wordBreak(s.slice(i + 1), dict, dictSet);
      if (found) return true;
    }
  }

  return false;
};

console.log('wordBreak answer: ', wordBreak(s, dict));

/* Rod cutting */

const rod = 10;
const lengths = [2, 4, 5, 6, 7, 9]; // answer = 10 [4,6]

const rodCutting = (rod, lengths) => {
  const matrix = [];

  for (let i = 0; i <= lengths.length; i++) {
    let row = new Array(rod + 1).fill(0);
    matrix.push(row);
  }

  for (let i = 0; i < lengths.length; i++) {
    for (let j = 1; j <= rod; j++) {
      let curLength = lengths[i];
      if (curLength <= j) {
        matrix[i + 1][j] = Math.max(matrix[i][j], matrix[i][j - curLength] + curLength);
      } else {
        matrix[i + 1][j] = Math.max(matrix[i][j], matrix[i + 1][j - 1]);
      }
    }
  }

  return matrix[lengths.length][rod];
};

console.log('rodCutting answer: ', rodCutting(rod, lengths));

/* TripleStep */

/* Question

A person is climbing stairs and can either climb 1, 2, or 3 stairs at a time.
Write a function that returns the total possible routes that can be taken to climb
the stairs given the input steps, which is the total of stairs needed to climb.

*/

const steps = 7;

const tripleStep = (steps, memo = {}) => {
  if (steps < 1) {
    return 0;
  } else if (steps === 1) {
    return 1;
  } else if (steps === 2) {
    return 2;
  } else if (steps === 3) {
    return 4;
  } else if (memo[steps] >= 0) {
    return memo[steps];
  } else {
    return memo[steps] = tripleStep(steps - 1, memo) + tripleStep(steps - 2, memo) + tripleStep(steps - 3, memo);
  }
};

console.log('tripleStep answer: ', tripleStep(steps));

/* Fibonacci numbers */

/* Question
Given the input n, find the nth number in the fibonacci sequence

fibonacci sequence = 0,1,1,2,3,5,8....

*/

const fib = (n, memo = {}) => {
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else if (memo[n] >= 0) {
    return memo[n];
  } else {
    return memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  }
};

console.log('fibonacci answer: ', fib(10));

/* Prisoners of War */

/* Question
A bunch of POWs have been captured. The Capturing army executes every prisoner.
Given n prisoners and x prisoners skipped, return the order they will be executed.

ex: n = 5, x = 2
[1,2,3,4,5] => [1,3,4,5] => [1,3,5] => [3,5] => [3] => []
2,4,1,5,3

-1 + 2 = index 1 (2)
1 + 2 - 1 % arr.length= index 2 (4)
2 + 2 - 1 % arr.length (3) = index 0 (1)
0 + 2 - 1 % 2 = index 1 (5)
last item = (3)

ex: n = 5, x = 3
[1,2,3,4,5] => [1,2,4,5] => [2,4,5] => [2,4] => [4] => []
3,1,5,2,4

-1 + 3 = index 2 (3)
2 + 3 - 1 % arr.length (4) = index 0 (1)
0 + 3 - 1 % arr.length (3) = index 2 (5)
2 + 3 - 1 % 2 = index 0 (2)
last item = (4)


*/

const n = 5;
const x = 3;

const prisonersCircle = (n, x) => {
  let prisoners = [];
  let order = [];
  for (let i = 1; i <= n; i++) {
    prisoners.push(i);
  }

  let idx = 0;

  while (prisoners.length > 1) {
    idx += x - 1;
    let next = idx % prisoners.length;

    let died = prisoners.splice(next, 1);
    order.push(...died);
    idx = next;
  }

  let finalOrder = order.concat(prisoners);
  return finalOrder;
};

console.log('prisonersCircle answer: ', prisonersCircle(n, x));


/* Number of candies - HackerRank */

/* Question
Alice is a kindergarten teacher. She wants to give some candies to the children
in her class.  All the children sit in a line and each of them has a rating score
according to his or her performance in the class.  Alice wants to give at least
1 candy to each child. If two children sit next to each other, then the one with
the higher rating must get more candies. Alice wants to minimize the total number
of candies she must buy.

For example, assume her students' ratings are [4, 6, 4, 5, 6, 2]. She gives the
students candy in the following minimal amounts: [1, 2, 1, 2, 3, 1]. She must buy
a minimum of 10 candies.

*/

/* Example
const ratings = [2, 4, 2, 6, 1, 7, 8, 9, 2, 1];
first pass = [1,2,1,2,1,2,3,4,1,1]
second pass = [1,2,1,2,1,2,3,4,2,1]

*/

const ratings = [2, 4, 2, 6, 1, 7, 8, 9, 2, 1];

const candies = (ratings) => {
  let numOfCandies = [1];

  for (let i = 1; i < ratings.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      numOfCandies[i] = numOfCandies[i - 1] + 1;
    } else {
      numOfCandies[i] = 1;
    }
  }

  for (let i = ratings.length - 1; i > 0; i--) {
    if (ratings[i - 1] > ratings[i]) {
      numOfCandies[i - 1] = Math.max(numOfCandies[i] + 1, numOfCandies[i - 1]);
    }
  }

  return numOfCandies.reduce((start, next) => {
    return start += next;
  }, 0);

};

console.log('candies answer: ', candies(ratings));


/* Promise bracelets */

/* Question
You are selling promise bracelts to a group of customers. Each customer has a max
price they are willing to pay. You can only sell to each customer the same or more
than you charged your last customer. Given an input array designating the amount you
can charge each customer, return an array representing price you charge each
customer and the total profit.

ex: customers = [40,100,50,60,70,90,90,90,70]
answer = [[40,50,50,60,70,70,70,70,70], 500]
*/

const customers = [40, 100, 50, 60, 10, 90, 90, 90, 70];

const promiseBracelets = customers => {
  let prices = new Array(customers.length).fill(0);
  prices[0] = customers[0];
  let total = 0;

  for (let i = 1; i < customers.length; i++) {
    if (customers[i] >= prices[i - 1]) {
      prices[i] = customers[i];
    } else if (prices[i - 1] - customers[i] > customers[i]) {
      prices[i] = prices[i - 1];
    } else {
      prices[i] = customers[i];
    }
  }

  let curDeficit = 0;
  for (let i = prices.length - 2; i >= 0; i--) {
    if (prices[i] > prices[i + 1]) {
      curDeficit += prices[i] - prices[i + 1];
      if (curDeficit <= prices[i + 1]) {
        prices[i] = prices[i + 1];
      } else {
        prices[i + 1] = prices[i];
      }
    } else if (prices[i] <= prices[i + 1]) {
      curDeficit = 0;
    }
  }

  for (let i = 0; i < prices.length - 1; i++) {
    if (prices[i] > prices[i + 1]) {
      prices[i + 1] = prices[i];
    }
  }

  prices.forEach((val, i) => {
    if (customers[i] >= val) {
      total += val;
    }
  });
  return [total, prices];
};

console.log('promiseBraclets answer: ', promiseBracelets(customers));

/* Subarray sort */

/* Question
Write a function that takes in an array of integers of length atleast 2
and return the smallest subarray that needs to be sorted in place in order
for the entire array to be sorted. If the input array is already sorted,
return [-1,-1]
*/

/* Apprach

*/

const array = [1, 2, 2, 3, 13, 4, 5, 6, 7, 13, 9, 12, 13, 14];

const isOutOfOrder = (i, num, array) => {
  if (i === 0) return num > array[i + 1];
  if (i === array.length - 1) return num < array[i - 1];
  return num > array[i + 1] || num < array[i - 1];
};

const subArrSort = arr => {
  let minOutOfOrder = Infinity;
  let maxOutOfOrder = -Infinity;
  for (let i = 0; i < array.length; i++) {
    let current = array[i];
    if (isOutOfOrder(i, current, array)) {
      minOutOfOrder = Math.min(minOutOfOrder, current);
      maxOutOfOrder = Math.max(maxOutOfOrder, current);
    }
  }

  if (minOutOfOrder === Infinity) {
    return [-1, -1];
  }

  let leftIdx = 0;
  while (minOutOfOrder >= array[leftIdx]) {
    leftIdx++;
  }

  let rightIdx = array.length - 1;
  while (maxOutOfOrder <= array[rightIdx]) {
    rightIdx--;
  }
  return [leftIdx, rightIdx];
};

console.log('subArraySort answer: ', subArrSort(array));

/* Spiral Matrix */

/* Question
Given an 2X2 matrix, return an array that includes all the values in a clockwise
pattern around the perimeter of the inputMatrix
 */

const inputMatrix = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [10, 11, 12, 13, 14],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20]
];

const matrixSpiral = matrix => {
  let finalMatrix = [];
  let row = 0;
  let col = 0;
  let height = matrix.length;
  let width = matrix[0].length;

  while (row < height && col < width) {
    for (let i = row; i < width; i++) {
      finalMatrix.push(matrix[row][i]);
    }
    row++;

    for (let j = row; j < height; j++) {
      finalMatrix.push(matrix[j][width - 1]);
    }
    width--;
    if (row < height) {
      for (let k = width - 1; k >= col; k--) {
        finalMatrix.push(matrix[height - 1][k]);
      }
      height--;
    }

    if (col < width) {
      for (let m = height - 1; m >= row; m--) {
        finalMatrix.push(matrix[m][col]);
      }
      col++;
    }

  }
  return finalMatrix;
};

console.log('matrixSpiral answer: ', matrixSpiral(inputMatrix));


/* Find largest square in matrix */

/* Question
given a matrix of 0s and 1s, find the area of the largest square containing all 1s
*/

const squares = [
  [1, 1, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 1],
  [0, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 0]
];

const largestSquare = squares => {
  let found = [];
  for (let i = 0; i < squares.length; i++) {
    let row = new Array(squares[i].length).fill(0);
    found.push(row);
  }
  let largest = 0;

  for (let row = 0; row < squares.length; row++) {
    for (let col = 0; col < squares[row].length; col++) {
      let cell = squares[row][col];
      if (cell === 1) {
        if (row === 0 || col === 0) {
          found[row][col] = 1;
        } else {
          found[row][col] = 1 + Math.min(found[row - 1][col], found[row - 1][col - 1], found[row][col - 1]);
          if (found[row][col] > largest) largest = found[row][col];
        }
      } else {
        found[row][col] = 0;
      }
    }
  }
  console.log('found: ', found);
  return Math.pow(largest, 2);
};

console.log('largestSquare answer: ', largestSquare(squares));

/* Max increasing sum */

const nums = [40, 70, 20, 30, 15, 90, 50, 30];

const maxIncreasingSum = nums => {
  let maxSums = nums.slice();
  let refs = new Array(nums.length).fill(null);
  let maxVal = 0;
  let maxIdx = undefined;
  for (let i = 0; i < nums.length; i++) {
    for (let k = 0; k < i; k++) {
      let cur = nums[i];
      let prev = nums[k];
      if (prev < cur) {
        if (maxSums[k] + cur > maxSums[i]) {
          maxSums[i] = maxSums[k] + cur;
          refs[i] = k;
          if (maxVal < maxSums[i]) {
            maxVal = maxSums[i];
            maxIdx = i;
          }
        }
      }
    }
  }
  return [maxVal, buildSequence(nums, refs, maxIdx)];
};

const buildSequence = (nums, refs, maxIdx) => {
  let sequence = [];
  let next = nums[maxIdx];
  while (maxIdx !== null) {
    sequence.unshift(next);
    maxIdx = refs[maxIdx];
    next = nums[maxIdx];
  }
  return sequence;
};


console.log('max Increasing Sum answer: ', maxIncreasingSum(nums));

/* Ways to reach end of xy plane */

/* Question
Given two positive integers, x&y, calculate the total possible ways of getting
from [0,0] to [0,x] if you can move up-right, right and down-right on the
plane. You can not go outside the plane (x < 0)
*/

const maxWays = (width, length) => {
  let ways = 0;
  const memo = {};
  for (let i = -1; i <= width + 1; i++) {
    memo[i] = {};
  }

  const recurse = (width, length, x, y, memo) => {
    if (memo[x.toString()][y.toString()]) return memo[x.toString()][y.toString()];
    if (x > width) return 0;
    if (y > length) return 0;
    if (y < 0) return 0;
    if (x === width && y === 0) return 1;
    return memo[x.toString()][y.toString()] = recurse(width, length, x + 1, y, memo) + recurse(width, length, x + 1, y + 1, memo) + recurse(width, length, x + 1, y - 1, memo);
  };

  ways = recurse(width, length, 0, 0, memo);
  return ways;
};

console.log('maxWays answer: ', maxWays(3, 3));

/* Wiggle subsequence */

/* Question
A sequence of numbers is called a wiggle sequence if the differences between successive numbers
strictly alternate between positive and negative. Given a sequence of integers,
return the length of the longest subsequence that is a wiggle sequence. A subsequence
is obtained by deleting some number of elements (eventually, also zero) from the original
sequence, leaving the remaining elements in their original order.
*/

const wigNums = [2, 1, 7, 5, 9, 8, 8];

const wiggleMaxLength = nums => {
  if (!nums.length) return 0;
  if (nums.length === 1) return 1;

  let curSign = nums[1] > nums[0] ? 1 : -1;
  if (nums[1] === nums[0]) curSign = 0;
  let idx = 1;
  let count = 1;
  if (curSign) count++;

  while (idx < nums.length - 1) {

    let nextSign = nums[++idx] > nums[idx - 1] ? 1 : -1;
    if (nums[idx] === nums[idx - 1]) nextSign = 0;

    if (nextSign !== 0 && curSign !== nextSign) {
      count++;
      curSign = nextSign;
    }
  }

  return count;
};

console.log('wiggleLength answer: ', wiggleMaxLength(wigNums));
