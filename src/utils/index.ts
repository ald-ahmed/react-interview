import { INITIAL_CELL_VALUE } from './config';

const isTopLeftCorner = (row, col) => {
  return row === 0 && col === 0;
};

const isProtected = (row, col) => {
  return row === 0 || col === 0;
};

const getCellContent = (row, col) => {
  return isTopLeftCorner(row, col)
    ? ''
    : row === 0
    ? numberToLetter(col)
    : col === 0
    ? numberToLetter(row)
    : INITIAL_CELL_VALUE;
};

const numberToLetter = (num) => {
  return (num + 9).toString(36).toUpperCase();
};

export { numberToLetter, getCellContent, isProtected };
