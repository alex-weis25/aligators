/* Identical trees */

/* Question
Given the root node of two binary tress, check to see if the trees are identical.

node.val, node.left, node.right
*/

const isSameTree = (p, q) => {
  let balanced = true;
  if(p === null && q === null){
      return true;
  } else if (p === null || q === null){
      return false;
  }

  if(p.val !== q.val) return false;
   if(p !== null && q !== null){
       balanced = isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
   }
   return balanced;
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
  let sym = true;
    if(root === null) return true;

    const check = (n1, n2, s) => {
        if(n1 === null && n2 === null) return true;
        if(n1 === null || n2 === null) return false;
        if(n1.val === n2.val){
            s = check(n1.left, n2.right,s) && check(n1.right, n2.left, s);
        } else {
            return false;
        }
        return s;
    };

    sym = check(root.left, root.right);
    return sym;
};

/* https://leetcode.com/problems/symmetric-tree/description/ */
console.log('Symmetric tree answer: LeetCode Complete');

/* Subtree */

/* Question
Given two trees, check to see if t is an exact subtree of s
*/

const isSubtree = (s, t) => {
  if(s === null && t === null) return true;
  if(s === null || t === null) return false;
  let found = false;

  if(s.val === t.val){
      found = recurse(s,t);
      if(found) return true;
  }

  return isSubtree(s.left, t) || isSubtree(s.right, t);
};


const recurse = (n1, n2) => {
  if(n1 === null && n2 === null) return true;
  if(n1 === null || n2 === null) return false;
  let same = true;
  if(n1.val === n2.val){
    same = recurse(n1.left, n2.left) && recurse(n1.right, n2.right);
  } else {
    return false;
  }
  return same;
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

const findDepth = (node, depth = 0) => {
  if(node === null) return depth;
  let newDepth = depth + 1;
  let leftDepth = findDepth(node.left, newDepth);
  let rightDepth = findDepth(node.right, newDepth);
  let maxDepth = leftDepth > rightDepth ? leftDepth : rightDepth;
  return maxDepth;
};

const isBalanced = (node) => {
  if(node === null) return true;
  let sameLength = true;
  let left = findDepth(node.left);
  let right = findDepth(node.right);
  if(!(Math.abs(left - right) < 2)) return false;

  sameLength = isBalanced(node.left);
  if(!sameLength) return false;
  sameLength = isBalanced(node.right);
  if(!sameLength) return false;

  return sameLength;
};

console.log('balancedBinary trees: LeetCode Complete');

/* Check if Binary tree is univalue */

const nodez = {
  val: 1,
  left: {
    val: 1,
    left: null,
    right: {
      val: 1,
      left: {
        val: 1,
        left: null,
        right: null
      },
      right: null
    }
  },
  right: {
    val: 1,
    left: {
      val: 1,
      left: null,
      right: null
    },
    right: null,
  }
};

const addChildren = (node, arr) => {
  if(node.left !== null) arr.push(node.left);
  if(node.right !== null) arr.push(node.right);
  return arr;
};

const checkUnivalue = node => {
  let children = [];
  const val = node.val;
  if(node !== null){
    children = addChildren(node, children);
  } else {
    return false;
  }

  while(children.length){
    let next = children.shift();
    if(next.val !== val) return false;
    children = addChildren(next, children);
  }

  return true;
};

console.log('univalue Tree answer: ', checkUnivalue(nodez));
