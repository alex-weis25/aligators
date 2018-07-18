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

