/* RemoveNode */

/* Question
Given the head of a linkedList and a key, remove the node with a value equal to
the key
*/

/* Approach
if head is null return null.

Need to keep track of previous node and current node. If current node.value === key
prev.next = current.next
if

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

/* merge K sorted linkedLists */

/* Question
Given an array of sorted linkedLists, merge the lists into one sorted list
1. pop of array values 2 at a time until list.length === 0; 1 subsequently given return value from mergeSort will be a sorted comibined list.

2.


*/

/* Approach
1.

*/

const mergeKSortedLinkedLists = (lists) => {
  let sortedList;
  let nextList;

  if(!sortedList){
    sortedList = lists.pop()
  }

  if(!nextList){
    nextList = lists.pop()
  }



}

const mergeSort = (nodeA, nodeB) => {

  while()

}

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
