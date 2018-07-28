/* RemoveNode */

/* Question
Given the head of a linkedList and a key, remove the node with a value equal to
the key
*/

let head = {
  val: 10,
  next: {
    val: 5,
    next: {
      val: 3,
      next: {
        val: 2,
        next: {
          val: 1,
          next: null
        }
      }
    }
  }
};

const removeNode = (head, key) => {
  if (head === null) return null;
  if (head.val === key) {
    if (head.next === null) {
      return null;
    } else {
      return head.next;
    }
  }
  let previous = head;
  let current = head.next;

  while (current !== null) {
    if (current.val === key) {
      previous.next = current.next;
      return head;
    } else {
      previous = current;
      current = current.next;
    }
  }

  return head;
};

console.log('removeNode answer: ', removeNode(head, 3));

/* remove Nth node from end of linkedList */

const removeNthNodeFromEnd = (head, n) => {
  let length = 0;
  let base = {val: 0, next: head};
  base.next = head;
  let current = head;

  while (current !== null){
      current = current.next;
      length++;
  }

  let countDown = length - n;
  let prev = base;
  current = head;

  while (countDown > 0){
      current = current.next;
      prev = prev.next;
      countDown--;
  }

  prev.next = current.next;

  return base.next;
};

console.log('removeNthNodeFromEnd answer: ', 'works on leetCode');

/* Reverse a (singly or doubly) linked list */

head = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: null
    }
  }
};

const reverseLinkedList = head => {
  let cur = head;
  let prev = null;

  while (cur) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;

  }
  return prev;
};

console.log('reverseLinkedList answer: ', reverseLinkedList(head));

/* Detect a cycle */

const detectCycle = node => {
  if (node === null) return null;
  if (node.next === null) return null;
  if (node.next.next === null) return null;
  let slow = node.next;
  let fast = node.next.next;

  while (slow !== fast && fast.next !== null){
    if (fast.next.next === null) return null;
    slow = slow.next;
    fast = fast.next.next;
  }

  if (slow === fast){
    fast = node;
    while (slow !== fast){
      slow = slow.next;
      fast = fast.next;
    }
    if (slow === fast){
      return slow;
    }
  } else {
    return null;
  }
};


/* Swap Pairs in LinkedList */

const swapPairs = head => {
  let base = {val: 0, next: head};
  let first = base;
  let second = head;

  while (second !== null && second.next !== null){
    let next = second.next;
    let nextNext = next.next;

    first.next = next;
    next.next = second;
    second.next = nextNext;

    first = second;
    second = nextNext;
  }
  return base.next;
};

console.log('swapPairs answer: ', 'No test cases, works on leetCode');

/* Reverse nodes in k-groups */


/* merge K sorted linkedLists */

/* Question
Given an array of sorted linkedLists, merge the lists into one sorted list
*/

const lists = [
  [{val: 1, next: {val: 3, next: {val: 5, next: null}}}],
  [{val: 2, next: {val: 6, next: {val: 8, next: null}}}],
  [{val: 4, next: {val: 5, next: null}}],
  [{val: 0, next: {val: 7, next: {val: 9, next: null}}}]
];

const mergeSort = (nodeAList, nodeBList) => {
  let headNode = {
    val: 0,
    next: null
  };
  let headStart = headNode;
  if (!nodeAList) return nodeBList;
  if (!nodeBList) return nodeAList;
  let nodeA = nodeAList[0];
  let nodeB = nodeBList[0];

  while (nodeA !== null && nodeB !== null){
    if (nodeA.val > nodeB.val){
      headStart.next = nodeB;
      headStart = headStart.next;
      nodeB = nodeB.next;
    } else {
      headStart.next = nodeA;
      headStart = headStart.next;
      nodeA = nodeA.next;
    }
  }

  while (nodeA !== null){
    headStart.next = nodeA;
    headStart = headStart.next;
    nodeA = nodeA.next;
  }

  while (nodeB !== null){
    headStart.next = nodeB;
    headStart = headStart.next;
    nodeB = nodeB.next;
  }
  return [headNode.next];

};

const mergeKSortedLinkedLists = (lists) => {
  if (lists.length === 0) return [];
  if (lists.length === 1) return lists[0];

  let mid = Math.floor(lists.length / 2);
  let left = lists.slice(0, mid);
  let right = lists.slice(mid);
  return mergeSort(mergeKSortedLinkedLists(left), mergeSort(mergeKSortedLinkedLists(right)));

};

console.log('mergeKSortedLinkedLists answer: ', mergeKSortedLinkedLists(lists));

/* Find intersection of two linkedLists */

const findMergeNode = (headA, headB) => {
  if (headA === null || headB === null) return null;
  let lengthA = 0;
  let lengthB = 0;
  let nodeA = headA;
  let nodeB = headB;

  while (nodeA !== null) {
    lengthA++;
    nodeA = nodeA.next;
  }
  nodeA = headA;

  while (nodeB !== null) {
    lengthB++;
    nodeB = nodeB.next;
  }
  nodeB = headB;

  while (lengthB !== lengthA) {
    if (lengthA > lengthB) {
      nodeA = nodeA.next;
      lengthA--;
    } else {
      nodeB = nodeB.next;
      lengthB--;
    }
  }

  while (nodeA.data !== nodeB.data && nodeA && nodeB) {
    nodeA = nodeA.next;
    nodeB = nodeB.next;
  }

  if (nodeA) {
    return nodeA;
  } else {
    return null;
  }
};

console.log('Find intersection of two LinkedLists');
