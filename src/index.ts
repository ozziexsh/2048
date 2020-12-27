export type BoardType = Array<Array<number | null>>;

export class Board {
  private board: BoardType;

  public static EMPTY_SPACE = null;

  constructor(initialBoard: BoardType) {
    this.board = initialBoard;
  }

  public rotateLeft<T>(arr: T[][]): T[][] {
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

  public rotateRight<T>(arr: T[][]): T[][] {
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

  private shiftLeft(arr: BoardType) {
    const newBoard: BoardType = [];
    for (let y = 0; y < arr.length; y++) {
      const row = arr[y];
      const nonEmpty = row.filter(cell => cell !== Board.EMPTY_SPACE);
      const newRow = [];
      for (let i = 0; i < nonEmpty.length; i++) {
        const currentCell = nonEmpty[i];
        const nextCell = nonEmpty[i + 1];
        if (!currentCell) {
          continue;
        }
        if (!nextCell) {
          newRow.push(currentCell);
          continue;
        }
        if (nextCell === currentCell) {
          newRow.push(nextCell + currentCell);
          i++; // skip 2 (iterator counts as 1)
          continue;
        }
        newRow.push(currentCell);
      }
      if (newRow.length !== row.length) {
        newRow.push(
          ...Array.from({ length: row.length - newRow.length }).map(
            () => Board.EMPTY_SPACE,
          ),
        );
      }
      newBoard.push(newRow);
    }
    return newBoard;
  }

  private shiftRight(arr: BoardType) {
    const newBoard = [];
    for (let y = 0; y < arr.length; y++) {
      const row = arr[y];
      const nonEmpty = row.filter(cell => cell !== Board.EMPTY_SPACE);
      const newRow = [];
      for (let i = nonEmpty.length - 1; i >= 0; i--) {
        const currentCell = nonEmpty[i];
        const prevCell = nonEmpty[i - 1];
        if (!currentCell) {
          continue;
        }
        if (!prevCell) {
          newRow.unshift(currentCell);
          continue;
        }
        if (prevCell === currentCell) {
          newRow.unshift(prevCell + currentCell);
          i--; // skip 2 (iterator counts as 1)
          continue;
        }
        newRow.unshift(currentCell);
      }
      if (newRow.length !== row.length) {
        newRow.unshift(
          ...Array.from({ length: row.length - newRow.length }).map(
            () => Board.EMPTY_SPACE,
          ),
        );
      }
      newBoard.push(newRow);
    }
    return newBoard;
  }

  public moveUp(): Board {
    let newBoard = this.rotateLeft(this.board);
    newBoard = this.shiftLeft(newBoard);
    newBoard = this.rotateRight(newBoard);
    this.board = newBoard;
    return this;
  }

  public moveDown(): Board {
    let newBoard = this.rotateLeft(this.board);
    newBoard = this.shiftRight(newBoard);
    newBoard = this.rotateRight(newBoard);
    this.board = newBoard;
    return this;
  }

  public moveLeft(): Board {
    this.board = this.shiftLeft(this.board);
    return this;
  }

  public moveRight(): Board {
    this.board = this.shiftRight(this.board);
    return this;
  }

  public getBoard(): BoardType {
    return this.board;
  }
}
