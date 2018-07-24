/* Merge Sort */
const arr = [23, 6, -8, 0, 14, 0, 14, 23, 109];

const mergeMath = (left, right) => {
  let leftIdx = 0;
  let rightIdx = 0;
  let pointer = 0;
  let sorted = [];

  while (leftIdx < left.length && rightIdx < right.length) {
    let leftVal = left[leftIdx];
    let rightVal = right[rightIdx];

    if (leftVal > rightVal) {
      sorted[pointer] = rightVal;
      rightIdx++;
      pointer++;
    } else {
      sorted[pointer] = leftVal;
      leftIdx++;
      pointer++;
    }
  }

  while (leftIdx < left.length) {
    sorted[pointer++] = left[leftIdx++];
  }

  while (rightIdx < right.length) {
    sorted[pointer++] = right[rightIdx++];
  }

  return sorted;
};

const mergeSort = arr => {
  if (arr.length === 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);

  return mergeMath(mergeSort(left), mergeSort(right));
};

console.log('mergeSort answer: ', mergeSort(arr));

/* QuickSort */

const swap = (arr, first, next) => {
  let temp = arr[first];
  arr[first] = arr[next];
  arr[next] = temp;
};

const quickSort = (arr, startIdx, endIdx) => {
  let pivot = startIdx;
  let left = pivot + 1;
  let right = endIdx;
  if (startIdx >= endIdx) return;

  while (left <= right) {
    if (arr[pivot] < arr[left] && arr[pivot] > arr[right]) swap(arr, left, right);
    if (arr[pivot] >= arr[left]) left++;
    if (arr[pivot] <= arr[right]) right--;
  }
  swap(arr, pivot, right);

  let leftIsShorter = right - 1 - startIdx > endIdx - right - 1;

  if (leftIsShorter) {
    quickSort(arr, startIdx, right - 1);
    quickSort(arr, right + 1, endIdx);
  } else {
    quickSort(arr, right + 1, endIdx);
    quickSort(arr, startIdx, right - 1);
  }
};

const quickSortSpark = arr => {
  quickSort(arr, 0, arr.length - 1);
  return arr;
};

console.log('quickSort answer: ', quickSortSpark(arr));

/* Bubble sort */

const bubbleSort = arr => {
  let sorted = false;
  let count = 0;

  while (!sorted){
    sorted = true;
    for (let i = 1; i < arr.length - count; i++){
      let current = arr[i];
      let prev = arr[i - 1];
      if (prev > current){
        sorted = false;
        arr[i] = prev;
        arr[i - 1] = current;
      }
    }
    count++;
  }
  return arr;
};

console.log('bubbleSort answer: ', bubbleSort(arr));

/* Insertion sort */

const insertionSort = arr => {
  for (let index = 0; index < arr.length; index++){
    let left = arr[index];
    let right = arr[index + 1];
    let marker = index;

    while (right < left){
      arr[marker] = right;
      arr[marker + 1] = left;
      right = arr[marker];
      left = arr[marker - 1];
      marker--;
    }
  }
  return arr;
};

console.log('insertionSort answer: ', insertionSort(arr));

