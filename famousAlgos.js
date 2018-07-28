/* Levenshtein distance */

/* Min edits
Given two strings, find the minimum amount of edits (add, delete, swap) needed to make two strings identical
*/

const str1 = 'alexander';
const str2 = 'charmander';

const levenshtein = (str1, str2) => {
  let matrix = [];
  for (let i = 0; i <= str1.length; i++){
    let row = [];
    for (let j = 0; j <= str2.length; j++){
      row.push(j);
    }
    row[0] = i;
    matrix.push(row);
  }
  for (let i = 1; i <= str1.length; i++){
    for (let j = 1; j <= str2.length; j++){
      if (str1[i - 1] === str2[j - 1]){
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = 1 + Math.min(matrix[i - 1][j - 1], matrix[i][j - 1], matrix[i - 1][j]);
      }
    }
  }
  // console.log('matrix', matrix);
  return matrix[str1.length][str2.length];
};

console.log('Levenshtein distance: ', levenshtein(str1, str2));

/* Kadane's Algorithm */

/* Max sum adjacent numbers */

let numArr = [2, -1, 3, -6, 0, 8, 7, -2, -3, 6, -1, 5];

const kadane = nums => {
  let maxEndingIdx = nums[0];
  let maxSoFar = nums[0];
  for (let i = 0; i < nums.length; i++){
    maxEndingIdx = Math.max(nums[i] + maxSoFar, nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingIdx);
  }
  return maxSoFar;
};

console.log('kadanes answer: ', kadane(numArr));

/* Dijkstra's algorithm */

/* Question
Find the 'least expensive' path from S to X and return the path
*/

const graph = {
  S: {A: 5, B: 2},
  A: {C: 4, D: 2},
  B: {A: 5, D: 9},
  C: {D: 6, X: 3},
  D: {X: 1, C: 1},
  X: {}
};

const lowestCostNode = (costs, visited) => {
  return Object.keys(costs).reduce((lowest, node) => {
    if (lowest === null || costs[node] < costs[lowest]){
      if (!visited.includes(node)){
        lowest = node;
      }
    }
    return lowest;
  }, null);
};


const dijkstras = (graph, start, finish) => {
  let newObj = {};
  newObj[finish] = Infinity;
  const costs = Object.assign(newObj, graph[start]);
  const parents = {};
  parents[finish] = null;

  for (let child in graph[start]){
    parents[child] = start;
  }

  const visited = [];
  let node = lowestCostNode(costs, visited);

  while (node){
    let cost = costs[node];
    let children = graph[node];

    for (let child in children){
      let newCost = cost + children[child];
      if (!costs[child]){
        costs[child] = newCost;
        parents[child] = node;
      }
      if (costs[child] > newCost) {
        costs[child] = newCost;
        parents[child] = node;
      }
    }
    visited.push(node);
    node = lowestCostNode(costs, visited);
  }

  let optimalPath = [finish];
  let parent = parents[finish];

  while (parent){
    optimalPath.push(parent);
    parent = parents[parent];
  }

  optimalPath.reverse();
  const results = {
    cost: costs[finish],
    path: optimalPath
  };
  return results;
};

console.log('dijkstras answer: ', dijkstras(graph, 'S', 'X'));
