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
    if(customers[i] >= val){
      total += val
    }
  })
  return [total, prices]
};

console.log('promiseBraclets answer: ', promiseBracelets(customers));
