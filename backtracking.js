/* Sudoku Solver */

/* Question
Given a partially completed sudoku board, write an algorithm that returns true
if there is a valid solution and false if there is not. Print the final board
before returning true.
*/

const board = [
  ['.', '.', '.', '5', '.', '.', '.', '.', '.'],
  ['.', '.', '9', '7', '.', '.', '.', '1', '3'],
  ['4', '.', '.', '.', '1', '.', '8', '7', '.'],
  ['.', '.', '8', '.', '.', '7', '.', '.', '4'],
  ['.', '7', '.', '.', '9', '.', '.', '8', '.'],
  ['9', '.', '.', '2', '.', '.', '3', '.', '.'],
  ['.', '4', '1', '.', '3', '.', '.', '.', '6'],
  ['3', '2', '.', '.', '.', '1', '4', '.', '.'],
  ['.', '.', '.', '.', '.', '6', '.', '.', '.']
];

/* Helper functions */
let checkRow = (board, row, col, value) => {
  let currentRow = board[row];
  for (let i = 0; i < 9; i++) {
    let number = +currentRow[i];
    if (number === value) {
      return false;
    }
  }
  return true;
};

/* check col */
let checkCol = (board, row, col, value) => {
  for (let i = 0; i < 9; i++) {
    let number = +board[i][col];
    if (number === value) {
      return false;
    }
  }
  return true;
};

/* check square */
let checkSquare = (board, row, col, value) => {
  let startRow = Math.floor(row / 3) * 3;
  let startCol = Math.floor(col / 3) * 3;

  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      let number = +board[i][j];
      if (number === value) {
        return false;
      }
    }
  }
  return true;
};

let getCandidates = (array, row, col) => {
  let candidates = [];
  for (let value = 1; value < 10; value++) {
    if (checkRow(array, row, col, value) && checkCol(array, row, col, value) && checkSquare(array, row, col, value)) {
      candidates.push(value);
    }
  }
  return candidates;
};

const sudokuSolver = board => {
  let candidates;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      let cell = board[row][col];
      if (cell === '.') {
        candidates = getCandidates(board, row, col);
        if (!candidates.length) return false;

        for (let i = 0; i < candidates.length; i++) {
          board[row][col] = candidates[i];
          if (sudokuSolver(board)) {
            return board;
          }
        }
        board[row][col] = '.';
        return false;
      }
    }
  }
  return board;
};

console.log('sudokuSolver answer: ', sudokuSolver(board));


/* nQueens */

/* Question
Given a board of NxN height and length, find a possible solution in which N queens
can all fit on the board without attacking.
*/

const board6 = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0]
];

const nQueens = (board, n, placed = 0) => {

  for (let queen = placed; queen < n; queen++){
    let candidates = getCandidates(board);
    if (!candidates.length) return false;

    for (let cell = 0; cell < candidates.length; cell++){
      let coords = candidates[cell];
      const newRow = coords[0];
      const newCol = coords[1];
      board[newRow][newCol] = 1;
      placed++;

      if (nQueens(board, n, placed)){
        return true;
      } else {
        board[newRow][newCol] = 0;
        placed--;
      }
    }
    return false;
  }
  console.log('final nQueens board: ', board);
  return true;
};

/* helper functions */

checkRow = (board, row, col) => {
  let newRow = board[row];
  for (let i = 0; i < board[row].length; i++){
    let cell = newRow[i];
    if (cell){
      return false;
    }
  }
  return true;
};

checkCol = (board, row, col) => {
  for (let row = 0; row < board.length; row++){
    let cell = board[row][col];
    if (cell){
      return false;
    }
  }
  return true;
};

const findCells = (board, row, col) => {
  /* find cells */
   let cells = [];
   // Upper left
   let rowCopy = row - 1;
   let colCopy = col - 1;
   while (rowCopy >= 0 && colCopy >= 0){
     let nextCell = board[rowCopy][colCopy];
     cells.push(nextCell);
     rowCopy--;
     colCopy--;
   }
   // Lower right
   rowCopy = row + 1;
   colCopy = col + 1;
   while (rowCopy < board.length && colCopy < board[rowCopy].length){
     let nextCell = board[rowCopy][colCopy];
     cells.push(nextCell);
     rowCopy++;
     colCopy++;
   }

   // UpperRight
   rowCopy = row - 1;
   colCopy = col + 1;
   while (rowCopy >= 0 && colCopy < board[rowCopy].length){
     let nextCell = board[rowCopy][colCopy];
     cells.push(nextCell);
     rowCopy--;
     colCopy++;
   }

   // LowerLeft
   rowCopy = row + 1;
   colCopy = col - 1;
   while (rowCopy < board.length && colCopy >= 0){
     let nextCell = board[rowCopy][colCopy];
     cells.push(nextCell);
     rowCopy++;
     colCopy--;
   }

   return cells;
 };

const checkCross = (board, row, col) => {
  let cells = findCells(board, row, col);

  for (let i = 0; i < cells.length; i++){
    if (cells[i]){
      return false;
    }
  }
  return true;
};

getCandidates = (board) => {
  let candidates = [];
  for (let row = 0; row < board.length; row++){
    for (let col = 0; col < board[row].length; col++){
      if (checkRow(board, row, col) && checkCol(board, row, col) && checkCross(board, row, col)){
        candidates.push([row, col]);
      }
    }
  }
  return candidates;
};

console.log('nQueens answer: ', nQueens(board6, 6));
