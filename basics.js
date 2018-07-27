/* Binary Search */

const array = [0, 2, 4, 5, 7, 8, 10, 12, 14, 17, 20];

const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let cur = arr[mid];
    if (cur === target) {
      return mid;
    } else if (cur < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
};

console.log('binarySearch answer (14): ', binarySearch(array, 14));
console.log('binarySearch answer (6): ', binarySearch(array, 6));

/* Depth First Search */

const node = {
  val: 5,
  left: {
    val: 3,
    left: {
      val: 1,
      left: null,
      right: null
    },
    right: {
      val: 4,
      left: null,
      right: null
    }
  },
  right: {
    val: 8,
    left: {
      val: 6,
      left: null,
      right: null
    },
    right: {
      val: 10,
      left: null,
      right: null
    }
  }
};


const dfsPre = (node, arr = []) => {
  let current = node;

  if (current !== null) {
    arr.push(current.val);
    dfsPre(current.left, arr);
    dfsPre(current.right, arr);
  }
  return arr;
};

const dfsIn = (node, arr = []) => {
  let current = node;

  if (current !== null) {
    dfsIn(current.left, arr);
    arr.push(current.val);
    dfsIn(current.right, arr);
  }
  return arr;
};

const dfsPost = (node, arr = []) => {
  let current = node;

  if (current !== null) {
    dfsPost(current.left, arr);
    dfsPost(current.right, arr);
    arr.push(current.val);
  }
  return arr;
};

console.log('dfsIn answer: ', dfsIn(node));
console.log('dfsPre answer: ', dfsPre(node));
console.log('dfsPost answer: ', dfsPost(node));

/* Breadth First Search */

const addToQueue = (node, arr) => {
  if (node.left) arr.push(node.left);
  if (node.right) arr.push(node.right);
  return arr;
};


const bfs = (node, arr = []) => {
  if (node === null) return null;
  arr.push(node.val);
  let children = [];
  children = addToQueue(node, children);

  while (children.length) {
    let next = children.shift();
    children = addToQueue(next, children);
    arr.push(next.val);
  }
  return arr;
};

console.log('bfs answer: ', bfs(node));

/* Anagram check */

/* Question
Return an array of anagrams of length greater than 1.
*/

const wordBank = ['cat', 'act', 'ignore', 'a phrase', 'tape', 'pate', 'e hpsara'];

const anagramDetector = words => {
  let hash = {};
  words.forEach(word => {
    let copy = word.split('').sort().join('');
    if (hash[copy]) {
      hash[copy].push(word);
    } else {
      hash[copy] = [word];
    }
  });
  return Object.values(hash).filter(arr => arr.length > 1);
};

console.log('anagramDetector: ', anagramDetector(wordBank));

/* Palindrome check */

/* Questions
Find the largest substring palindrome in a given word

*/

const palinWord = 'abaxxyyzyyxa';

const isPalin = (word, left, right) => {
  while (left >= 0 && right < word.length) {
    let leftLet = word[left];
    let rightLet = word[right];
    if (leftLet === rightLet) {
      left--;
      right++;
    } else {
      break;
    }
  }
  return word.slice(left + 1, right);
};

const largestSubPal = pal => {
  let largest = pal[0];
  for (let i = 1; i < pal.length; i++) {
    let odd = isPalin(pal, i - 1, i + 1);
    let even = isPalin(pal, i - 1, i);
    let longer = odd.length > even.length ? odd : even;
    if (largest.length < longer.length) largest = longer;
  }
  return largest;
};

console.log('largestSubPal answer: ', largestSubPal(palinWord));

/* Permutation */

let nums = [1, 2, 3];

const makePermutation = perm => {
  let perms = [
    [perm.pop()]
  ];
  while (perm.length) {
    let next = perm.pop();
    let tempArr = [];
    perms.forEach(val => {
      for (let i = 0; i <= val.length; i++) {
        let copy = val.slice();
        copy.splice(i, 0, next);
        tempArr.push(copy);
      }
    });
    perms = tempArr;
  }
  return perms.map(val => {
    return val.join('');
  });
};

console.log('makePermutation answer: ', makePermutation(nums));

/* Powerset */
nums = [1, 2, 3];

const powerSet = nums => {
  const arr = [[]];

  for (let i = 0; i < nums.length; i++){
    let length = arr.length;
    for (let j = 0; j < length; j++){
      let temp = arr[j].concat(nums[i]);
      arr.push(temp);
    }
  }
  return arr;
};

console.log('powerSet answer: ', powerSet(nums));
