/* Convert book to trie */

/* Question
Find the starting indicies of each word in a given book.
*/

const book = `Once upon a time, there was a book with words. The book had not been catalogued, but would catch the eyes of onlookers nonetheless.`;

const makeTrie = book => {
  let trie = {};
  let bookLower = book.toLowerCase();
  let endings = [' ', '.', ',', '?', '!'];

  for (let i = 0; i < bookLower.length; i++) {
    let current = bookLower[i];
    let start = i;
    let node = trie;

    while (endings.indexOf(current) === -1 && i < bookLower.length) {
      if (node[current]) {
        node[current].indices.push(start);
        node = node[current];
      } else {
        node[current] = {
          indices: [start]
        };
        node = node[current];
      }
      i++;
      current = bookLower[i];
    }
  }
  return trie;
};

const wordLookUp = (book, word) => {
  let trie = makeTrie(book);

  for (let i = 0; i < word.length; i++) {
    let letter = word[i];
    if (trie[letter]) {
      trie = trie[letter];
    } else {
      return -1;
    }
  }
  return trie.indices;
};

console.log('wordLookUp answer: ', wordLookUp(book, 'the'));

/* Binary min Heap */

class BinaryMinHeap {
  constructor(array) {
    this.heap = this.buildHeap(array);
  }

  buildHeap(array) {
    let lastParIdx = Math.floor((array.length) / 2) - 1;
    for (let i = lastParIdx; i >= 0; i--) {
      this.siftDown(array, i, array.length - 1);
    }
    return array;
  }

  siftDown(array, start, end) {
    let firstChildIdx = start * 2 + 1;
    while (firstChildIdx <= end) {
      let secondChildIdx = start * 2 + 2;
      let minIdx = firstChildIdx;

      if (secondChildIdx <= end) {
        if (array[secondChildIdx] < array[firstChildIdx]) {
          minIdx = secondChildIdx;
        }
      }

      if (array[start] > array[minIdx]) {
        this.swap(array, start, minIdx);
        start = minIdx;
        firstChildIdx = start * 2 + 1;
      } else {
        return;
      }
    }
  }

  siftUp(array, childIdx) {
    let parentIdx = Math.floor((childIdx - 1) / 2);
    while (parentIdx >= 0) {
      if (array[parentIdx] > array[childIdx]) {
        this.swap(array, parentIdx, childIdx);
        childIdx = parentIdx;
        parentIdx = Math.floor((childIdx - 1) / 2);
      } else {
        return;
      }
    }
  }

  remove(val) {
    this.swap(this.heap, 0, this.heap.length - 1);
    const removing = this.heap.pop();
    this.siftDown(this.heap, 0, this.heap.length - 1);
    return removing;
  }

  insert(val) {
    this.heap.push(val);
    this.siftUp(this.heap, this.heap.length - 1);
  }

  peek() {
    return this.heap[0];
  }

  swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

/* Balanced Brackets  queue*/

const s = '([{{[()]}()}[]])';

const balancedBrackets = s => {
  const opens = ['(', '[', '{'];
  const closed = [')', ']', '}'];
  let openStack = [];

  for (let i = 0; i < s.length; i++) {
    if (opens.includes(s[i])) {
      openStack.push(s[i]);
    } else {
      let next = openStack.pop();
      if (opens.indexOf(next) !== closed.indexOf(s[i])) return false;
    }
  }
  if (!openStack.length) return true;
  return false;
};

console.log('balancedBrackets answer: ', balancedBrackets(s));

/* Asteroids (stacks) */

const asteroids = [-5, 10, 15, -10, 2, -8];

const asteroidCollision = asteroids => {
  let found = false;
  let stack = [];
  for (let i = 0; i < asteroids.length; i++) {
    let cur = asteroids[i];
    if (cur >= 0) {
      found = true;
      stack.push(cur);
    } else if (!found) {
      stack.push(asteroids[i]);
    } else {
      while (stack.length) {
        let prev = stack.pop();
        if (prev < 0) {
          stack.push(prev);
          stack.push(cur);
          break;
        } else if (Math.abs(cur) < prev) {
          stack.push(prev);
          break;
        } else if (Math.abs(cur) === prev) {
          if (!stack.length) found = false;
          break;
        } else if (Math.abs(cur) > prev && !stack.length) {
          stack.push(cur);
          found = false;
          break;
        }
      }
    }
  }
  return stack;
};

console.log('asteroid collision answer: ', asteroidCollision(asteroids));
