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
