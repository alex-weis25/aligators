class MinHeap {
  constructor(array){
  this.heap = this.buildHeap(array)
}

buildHeap(array) {
  let firstParentIdx = Math.floor((array.length - 2) / 2)
  for(let start = firstParentIdx; start >= 0; start--){
    this.siftDown(start, array.length - 1, array)
  }
  return array;
}

siftUp(idx, array){
  let parentIdx = Math.floor((idx - 1)/2)
  while(parentIdx >= 0){
    if(array[parentIdx] > array[idx]){
      this.swap(parentIdx, idx, array)
      idx = parentIdx
      parentIdx = Math.floor((idx - 1) / 2);
    } else {
      return;
    }
  }
}

siftDown(startIdx, endIdx, array){
  let firstChildIdx = startIdx * 2 + 1
  while(firstChildIdx <= endIdx){
    let secondChildIdx = startIdx * 2 + 2
    let minIdx = firstChildIdx;
    if(secondChildIdx <= endIdx){
      if(array[secondChildIdx] < array[firstChildIdx]){
        minIdx = secondChildIdx
      }
    }

    if(array[startIdx] > array[minIdx]){
      this.swap(startIdx, minIdx, array)
      startIdx = minIdx
      firstChildIdx = startIdx * 2 + 1
    } else {
      return
    }
  }
}

peek(){
  return this.heap[0]
}

remove(val){
  this.swap(0, this.heap.length - 1, this.heap)
  const removing = this.heap.pop()
  this.siftDown(0,this.heap.length - 1, this.heap)
  return removing;
}

insert(val){
  this.heap.push(val)
  this.siftUp(this.heap.length - 1, this.heap)
}

swap(idx1, idx2, array){
  let high = array[idx1]
  let low = array[idx2]
  array[idx2] = high
  array[idx1] = low
}

}
