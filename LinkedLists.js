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

const head = {
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
  console.log('head', head.next);
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

/*


*/

const mergeKLinkedLists = (lists) => {


}
