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

time: best case: O(n^2 * d) (loop * slice) worstcase: ...
space: O(n) ... can include recursive call for each letter ... i.e. = ['icu'] => ' i c u'

*/

const s = 'bettercodebetter';
const dict = ['bet', 'better', 'code'];

const wordBreak = (s, dict) => {
  // base case
  if (!s.length) return true;

  let curWord = '';
  for (let i = 0; i < s.length; i++) {
    let curLetter = s[i];
    curWord += curLetter;
    if (dict.includes(curWord)) {
      let found = wordBreak(s.slice(i + 1), dict);
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
A bunch of POWs have been captured. The Capturing army executes every 5 prisoners.
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
  for (let i = 1; i <= n; i++){
    prisoners.push(i);
  }

  let idx = 0;

  while (prisoners.length > 1){
    idx += x - 1;
    let next = idx % prisoners.length;

    let died = prisoners.splice(next, 1);
    order.push(...died);
    idx = next;
  }

  let finalOrder = order.concat(prisoners);
  return finalOrder;
};

console.log('answer to prisoners: ', prisonersCircle(n, x));


/* Number of candies - HackerRank */

/* Question
Alice is a kindergarten teacher. She wants to give some candies to the children in her class.  All the children sit in a line and each of them has a rating score according to his or her performance in the class.  Alice wants to give at least 1 candy to each child. If two children sit next to each other, then the one with the higher rating must get more candies. Alice wants to minimize the total number of candies she must buy.

For example, assume her students' ratings are [4, 6, 4, 5, 6, 2]. She gives the students candy in the following minimal amounts: [1, 2, 1, 2, 3, 1]. She must buy a minimum of 10 candies.

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

console.log('Answer to candies', candies(ratings));
