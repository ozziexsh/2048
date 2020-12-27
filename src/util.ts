/**
 * Rotates a 2d array counter clockwise
 *
 * @param arr any 2d array
 */
export function rotateLeft<T>(arr: T[][]): T[][] {
  const newArr: T[][] = Array.from({ length: arr.length }).map(() => []);
  const numRows = arr.length;
  for (let y = 0; y < numRows; y++) {
    const row = arr[y];
    const numCols = row.length;
    for (let x = 0; x < numCols; x++) {
      newArr[numRows - 1 - x][y] = arr[y][x];
    }
  }
  return newArr;
}

/**
 * Rotates a 2d array clockwise
 *
 * @param arr any 2d array
 */
export function rotateRight<T>(arr: T[][]): T[][] {
  const newArr: T[][] = Array.from({ length: arr.length }).map(() => []);
  const numRows = arr.length;
  for (let y = 0; y < numRows; y++) {
    const row = arr[y];
    const numCols = row.length;
    for (let x = 0; x < numCols; x++) {
      newArr[x][numRows - 1 - y] = arr[y][x];
    }
  }
  return newArr;
}
