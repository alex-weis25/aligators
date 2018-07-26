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

/* Subtree */

/* Question
Given two trees, check to see if t is an exact subtree of s
*/


const compareTrees = (s, t) => {
  if (s === null || t === null) {
    if (s !== t) {
      return false;
    } else {
      return true;
    }
  }

  if (s.val !== t.val) return false;
  let left = compareTrees(s.left, t.left);
  if (!left) return false;
  let right = compareTrees(s.right, t.right);
  if (!right) return false;

  return true;
};

const isSubtree = (s, t) => {
  if (s === null || t === null) {
    if (s !== t) {
      return false;
    } else {
      return true;
    }
  }

  if (s.val === t.val) {
    let found = compareTrees(s, t);
    if (found) {
      return true;
    }
  }
  let left = isSubtree(s.left, t);
  if (left) return true;
  let right = isSubtree(s.right, t);
  if (right) return true;
  return false;
};

/* https://leetcode.com/problems/subtree-of-another-tree/ */
console.log('subTree answer: LeetCode Complete');

/* Balanced Binary Tree */

/* Approach
1. for each node, pass the left and right child into helper function
2. check return value from helper function for difference <= 1
3. Helper function: check non-null children using DFS and add one to height
4. if current height is > maxHeight, return current height

*/

const checkHeight = (node, curHeight, maxHeight = 1) => {
  let newHeight = curHeight + 1;
  let left;
  let right;

  if (node === null) return curHeight;
  if (node.left !== null) {
    left = checkHeight(node.left, newHeight, maxHeight);
  }
  if (node.right !== null) {
    right = checkHeight(node.right, newHeight, maxHeight);
  }

  let maxSubtree = 0;
  if (!isNaN(left) && !isNaN(right)) {
    maxSubtree = Math.max(left, right);
  } else if (!isNaN(left)) {
    maxSubtree = left;
  } else if (!isNaN(right)) {
    maxSubtree = right;
  }

  if (maxSubtree > maxHeight) {
    return maxSubtree;
  } else {
    return newHeight;
  }
};

const isBalanced = (root) => {
  let current = root;
  let balanced = true;
  if (current !== null) {
    let leftSubtree = checkHeight(current.left, 0);
    let rightSubtree = checkHeight(current.right, 0);
    if (Math.abs(leftSubtree - rightSubtree) > 1) {
      return false;
    }
    balanced = isBalanced(current.left);
    if (!balanced) return false;
    balanced = isBalanced(current.right);
    if (!balanced) return false;
  }

  return balanced;
};

console.log('balancedBinary trees: LeetCode Complete');
