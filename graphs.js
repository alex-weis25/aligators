/* All Paths */

/* Question
Given an array representing a matrix and its vertices, find all paths from 0 to array.length - 1
*/

const paths = [[1, 2, 4], [3, 5], [3, 4], [5], [5], []];

var allPaths = function(graph) {
  const start = graph[0];
  const end = graph.length - 1;
  let path = [0];
  let allPaths = [];

  const DFS = (graph, pathNodes, target, curPath) => {
    let nodes = pathNodes.slice();
    while (nodes.length) {
      let next = nodes.pop();
      curPath.push(next);
      if (next === target) {
        const found = curPath.slice();
        allPaths.push(found);
        curPath.pop();
      } else {
        DFS(graph, graph[next], end, curPath);
        curPath.pop();
      }
    }
  };

  DFS(graph, start, end, path);
  return allPaths;
};

console.log('allPaths answer: ', allPaths(paths));

/* Shortest Path Visiting all Nodes */

/* link to Repl
https://repl.it/@alexweis25/ShortestPathAllNodes
*/

/* Friend circles */

/* Question
Given an adjacency matrix representing friend connections, find the
number of unique friend cirlces. Friend A can be connected to D through,
B and C.

*/

const M = [
  [1,1,0],
  [1,1,0],
  [0,0,1]
];

const makeAdjList = matrix => {
  let adjList = {};

  for(let row = 0; row < matrix.length; row++){
      adjList[row] = [];
      for(let col = 0; col < matrix[row].length; col++){
          if(row !== col){
              if(matrix[row][col] === 1){
                  adjList[row].push(col);
              }
          }
      }
  }
  return adjList;
};

const friendCircles = (M) => {
  let adjList = makeAdjList(M);
  let circles = 0;
  let visited = new Set();

  for(let i = 0; i < M.length; i++){
      let friend = i.toString();
      if(!visited.has(friend)){
          let friends = adjList[friend];
          visited.add(friend);
          circles++;
          while(friends.length){
              let nextFriend = friends.pop();
              if(nextFriend) nextFriend = nextFriend.toString();
              if(!visited.has(nextFriend)){
                  friends = friends.concat(adjList[nextFriend]);
                  visited.add(nextFriend);
              }
          }
      }
  }
  return circles;
};

console.log('friendCirlces answer: ', friendCircles(M));
