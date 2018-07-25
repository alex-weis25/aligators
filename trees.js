/* Identical trees */

/* Question
Given the root node of two binary tress, check to see if the trees are identical.

node.val, node.left, node.right
*/

const isSameTree = (p, q) => {
  if (p === null && q === null) {
    return true;
  } else if (p === null || q === null) {
    return false;
  }

  let pArr = convertTree(p);
  let qArr = convertTree(q);

  if (pArr.length !== qArr.length) return false;

  for (let i = 0; i < pArr.length; i++) {
    if (pArr[i] !== qArr[i]) return false;
  }
  return true;
};

const convertTree = root => {
  let arr = [];
  let children = [];
  let current = root;
  arr.push(current.val);
  if (current.left !== null || current.right !== null) {
    children = [current.left, current.right];
  }

  while (children.length) {
    let next = children.shift();
    if (next === null) {
      arr.push(next);
    } else {
      arr.push(next.val);
      if (next.left !== null || next.right !== null) {
        children.push(next.left, next.right);
      }
    }
  }
  return arr;
};


/* https://leetcode.com/problems/same-tree/description/ */

console.log('identicalTrees answer: LeetCode Complete');

/* InOrderTraversal */

/* Question: print a tree using in order traversal */

const inorderTraversal = (root, arr = []) => {
  let current = root;

  if (current !== null) {
    inorderTraversal(current.left, arr);
    arr.push(current.val);
    inorderTraversal(current.right, arr);
  }

  return arr;
};

/* https://leetcode.com/problems/binary-tree-inorder-traversal/description/ */
console.log('inOrderTraversal answer: LeetCode complete');

/* Symmetric Tree */

var isSymmetric = function (root) {
  if (root === null) return true;
  let curLevel = [];
  let nextLeft = [];
  let nextRight = [];
  let current = root;
  if (current.left !== null || current.right !== null) {
    curLevel = [current.left, current.right];
  }

  while (curLevel.length) {
    let left = curLevel.shift();
    let right = curLevel.pop();
    if (left === null || right === null) {
      if (left !== right) return false;
    } else {
      if (left.val !== right.val) return false;
      nextLeft.push(left.left, left.right);
      nextRight.unshift(right.left, right.right);
    }

    if (curLevel.length === 0) {
      curLevel = nextLeft.concat(nextRight);
      nextLeft = [];
      nextRight = [];
    }
  }

  return true;
};

/* https://leetcode.com/problems/symmetric-tree/description/ */
console.log('Symmetric tree answer: LeetCode Complete');
