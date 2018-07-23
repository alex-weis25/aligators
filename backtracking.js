/* Sudoku Solver */

/* Question
Given a partially completed soduko board, write an algorithm that returns true
if there is a valid solution and false if there is not. Print the final board
before returning true.
*/

const board = [
  ['.', '.', '5', '.', '.', '2', '.', '.', '.'],
  ['.', '.', '9', '.', '4', '7', '.', '2', '.'],
  ['.', '.', '8', '.', '5', '6', '.', '.', '1'],
  ['.', '.', '.', '.', '.', '8', '3', '4', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '6'],
  ['.', '.', '.', '.', '3', '.', '1', '8', '.'],
  ['.', '2', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '9', '.', '.', '8', '.', '6', '7', '.'],
  ['3', '.', '6', '5', '7', '.', '.', '.', '.']
];

/* Helper functions */
const checkRow = (board, row, col, value) => {
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
const checkCol = (board, row, col, value) => {
  for (let i = 0; i < 9; i++) {
    let number = +board[i][col];
    if (number === value) {
      return false;
    }
  }
  return true;
};

/* check square */
const checkSquare = (board, row, col, value) => {
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

const getCandidates = (array, row, col) => {
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
