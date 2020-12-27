export type BoardType = Array<Array<number | null>>;

export class Board {
  private board: BoardType;

  public static EMPTY_SPACE = null;

  constructor(initialBoard: BoardType) {
    this.board = initialBoard;
  }

  public moveLeft(): Board {
    const newBoard = [];
    for (let y = 0; y < this.board.length; y++) {
      const row = this.board[y];
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
    this.board = newBoard;
    return this;
  }

  public moveRight(): Board {
    const newBoard = [];
    for (let y = 0; y < this.board.length; y++) {
      const row = this.board[y];
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
    this.board = newBoard;
    return this;
  }

  public getBoard(): BoardType {
    return this.board;
  }
}
