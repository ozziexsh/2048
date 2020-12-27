import Board from './board';

export default class Game {
  public board: Board;

  constructor(board?: Board) {
    this.board = board ?? new Board();
  }

  public reset(): Game {
    this.board = new Board(Board.getInitialBoard());
    return this;
  }

  public moveRight(): Game {
    return this.move(() => this.board.moveRight());
  }

  public moveLeft(): Game {
    return this.move(() => this.board.moveLeft());
  }

  public moveUp(): Game {
    return this.move(() => this.board.moveUp());
  }

  public moveDown(): Game {
    return this.move(() => this.board.moveDown());
  }

  private move(move: () => void): Game {
    const oldBoard = [...this.board.getBoard()];
    move();
    if (!this.isSameBoard(oldBoard, this.board.getBoard())) {
      this.board.spawnNumber();
    }
    return this;
  }

  public isGameOver(): boolean {
    return !this.board.canMove();
  }

  private isSameBoard<T>(arr1: T[][], arr2: T[][]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let y = 0; y < arr1.length; y++) {
      if (arr1[y].length !== arr2[y].length) {
        return false;
      }
      for (let x = 0; x < arr1[y].length; x++) {
        if (arr1[y][x] !== arr2[y][x]) {
          return false;
        }
      }
    }
    return true;
  }
}
