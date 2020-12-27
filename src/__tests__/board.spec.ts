import { Board, BoardType } from '../board';

const EMPTY = Board.EMPTY_SPACE;

function makeEmptyBoard(): BoardType {
  return [
    [EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY],
  ];
}

describe('2048', () => {
  describe('Moving the board right', () => {
    it('should do nothing with empty rows', () => {
      const board = new Board(makeEmptyBoard());
      board.moveRight();
      expect(board.getBoard()).toEqual(makeEmptyBoard());
    });
    it('should move single number rows over to the edge', () => {
      const map = makeEmptyBoard();
      map[0][2] = 2;
      map[2][1] = 2;
      const board = new Board(map);
      board.moveRight();
      expect(board.getBoard()).toEqual([
        [EMPTY, EMPTY, EMPTY, 2],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, 2],
        [EMPTY, EMPTY, EMPTY, EMPTY],
      ]);
    });
    it('should combine two of the same numbers together alone in a row', () => {
      const map = [
        [EMPTY, 2, 2, EMPTY],
        [EMPTY, EMPTY, 2, 2],
        [2, EMPTY, EMPTY, 2],
        [EMPTY, EMPTY, EMPTY, EMPTY],
      ];
      const board = new Board(map);
      board.moveRight();
      expect(board.getBoard()).toEqual([
        [EMPTY, EMPTY, EMPTY, 4],
        [EMPTY, EMPTY, EMPTY, 4],
        [EMPTY, EMPTY, EMPTY, 4],
        [EMPTY, EMPTY, EMPTY, EMPTY],
      ]);
    });
    it('should combine two of the rightmost same numbers together but only two at a time', () => {
      const map = [
        [EMPTY, 2, 2, 2],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [2, 2, EMPTY, 2],
      ];
      const board = new Board(map);
      board.moveRight();
      expect(board.getBoard()).toEqual([
        [EMPTY, EMPTY, 2, 4],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, 2, 4],
      ]);
    });
    it('should just shift numbers if no matches', () => {
      const map = [
        [4, EMPTY, 2, 4],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [4, 2, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
      ];
      const board = new Board(map);
      board.moveRight();
      expect(board.getBoard()).toEqual([
        [EMPTY, 4, 2, 4],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, 4, 2],
        [EMPTY, EMPTY, EMPTY, EMPTY],
      ]);
    });
  });

  describe('Moving the board left', () => {
    it('should do nothing with empty rows', () => {
      const board = new Board(makeEmptyBoard());
      board.moveLeft();
      expect(board.getBoard()).toEqual(makeEmptyBoard());
    });
    it('should move single number rows over to the edge', () => {
      const board = new Board([
        [EMPTY, 2, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, 2],
        [EMPTY, EMPTY, EMPTY, EMPTY],
      ]);
      board.moveLeft();
      expect(board.getBoard()).toEqual([
        [2, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [2, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
      ]);
    });
    it('should combine two of the same numbers together alone in a row', () => {
      const map = [
        [EMPTY, 2, 2, EMPTY],
        [EMPTY, EMPTY, 2, 2],
        [2, EMPTY, EMPTY, 2],
        [EMPTY, EMPTY, EMPTY, EMPTY],
      ];
      const board = new Board(map);
      board.moveLeft();
      expect(board.getBoard()).toEqual([
        [4, EMPTY, EMPTY, EMPTY],
        [4, EMPTY, EMPTY, EMPTY],
        [4, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
      ]);
    });
    it('should combine two of the leftmost same numbers together but only two at a time', () => {
      const map = [
        [EMPTY, 2, 2, 2],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [2, 2, EMPTY, 2],
      ];
      const board = new Board(map);
      board.moveLeft();
      expect(board.getBoard()).toEqual([
        [4, 2, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [4, 2, EMPTY, EMPTY],
      ]);
    });
    it('should just shift numbers if no matches', () => {
      const map = [
        [4, EMPTY, 2, 4],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [4, 2, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
      ];
      const board = new Board(map);
      board.moveLeft();
      expect(board.getBoard()).toEqual([
        [4, 2, 4, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [4, 2, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
      ]);
    });
  });

  describe('Moving the board up', () => {
    it('should do nothing with empty rows', () => {
      const board = new Board(makeEmptyBoard());
      board.moveUp();
      expect(board.getBoard()).toEqual(makeEmptyBoard());
    });
    it('should move single number rows over to the edge', () => {
      const board = new Board([
        [EMPTY, 2, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, 2],
        [EMPTY, EMPTY, EMPTY, EMPTY],
      ]);
      board.moveUp();
      expect(board.getBoard()).toEqual([
        [EMPTY, 2, EMPTY, 2],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
      ]);
    });
    it('should combine two of the same numbers together alone in a column', () => {
      const map = [
        [EMPTY, 2, EMPTY, 4],
        [EMPTY, 2, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, 4],
      ];
      const board = new Board(map);
      board.moveUp();
      expect(board.getBoard()).toEqual([
        [EMPTY, 4, EMPTY, 8],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
      ]);
    });
    it('should combine two of the topmost same numbers together but only two at a time', () => {
      const map = [
        [EMPTY, 2, 4, EMPTY],
        [EMPTY, 2, 4, EMPTY],
        [EMPTY, EMPTY, 4, EMPTY],
        [EMPTY, 2, EMPTY, EMPTY],
      ];
      const board = new Board(map);
      board.moveUp();
      expect(board.getBoard()).toEqual([
        [EMPTY, 4, 8, EMPTY],
        [EMPTY, 2, 4, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
      ]);
    });
    it('should just shift numbers if no matches', () => {
      const map = [
        [EMPTY, 4, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, 2],
        [EMPTY, 2, EMPTY, EMPTY],
        [EMPTY, 4, EMPTY, 4],
      ];
      const board = new Board(map);
      board.moveUp();
      expect(board.getBoard()).toEqual([
        [EMPTY, 4, EMPTY, 2],
        [EMPTY, 2, EMPTY, 4],
        [EMPTY, 4, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
      ]);
    });
  });

  describe('Moving the board down', () => {
    it('should do nothing with empty rows', () => {
      const board = new Board(makeEmptyBoard());
      board.moveDown();
      expect(board.getBoard()).toEqual(makeEmptyBoard());
    });
    it('should move single number rows over to the edge', () => {
      const board = new Board([
        [EMPTY, 2, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, 2],
        [EMPTY, EMPTY, EMPTY, EMPTY],
      ]);
      board.moveDown();
      expect(board.getBoard()).toEqual([
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, 2, EMPTY, 2],
      ]);
    });
    it('should combine two of the same numbers together alone in a column', () => {
      const map = [
        [EMPTY, 2, EMPTY, 4],
        [EMPTY, 2, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, 4],
      ];
      const board = new Board(map);
      board.moveDown();
      expect(board.getBoard()).toEqual([
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, 4, EMPTY, 8],
      ]);
    });
    it('should combine two of the bottommost same numbers together but only two at a time', () => {
      const map = [
        [EMPTY, 2, 4, EMPTY],
        [EMPTY, 2, 4, EMPTY],
        [EMPTY, EMPTY, 4, EMPTY],
        [EMPTY, 2, EMPTY, EMPTY],
      ];
      const board = new Board(map);
      board.moveDown();
      expect(board.getBoard()).toEqual([
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, 2, 4, EMPTY],
        [EMPTY, 4, 8, EMPTY],
      ]);
    });
    it('should just shift numbers if no matches', () => {
      const map = [
        [EMPTY, 4, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, 2],
        [EMPTY, 2, EMPTY, EMPTY],
        [EMPTY, 4, EMPTY, 4],
      ];
      const board = new Board(map);
      board.moveDown();
      expect(board.getBoard()).toEqual([
        [EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, 4, EMPTY, EMPTY],
        [EMPTY, 2, EMPTY, 2],
        [EMPTY, 4, EMPTY, 4],
      ]);
    });
  });
});
