import { rotateLeft, rotateRight } from '../util';

describe('Utilities', () => {
  describe('rotate 2d array left', () => {
    it('Should rotate a 2d array left', () => {
      expect(
        rotateLeft([
          [1, 2, 3, 4],
          [1, 2, 3, 4],
          [1, 2, 3, 4],
          [1, 2, 3, 4],
        ]),
      ).toEqual([
        [4, 4, 4, 4],
        [3, 3, 3, 3],
        [2, 2, 2, 2],
        [1, 1, 1, 1],
      ]);
    });
  });

  describe('rotate 2d array right', () => {
    it('Should rotate a 2d array right', () => {
      expect(
        rotateRight([
          [1, 2, 3, 4],
          [1, 2, 3, 4],
          [1, 2, 3, 4],
          [1, 2, 3, 4],
        ]),
      ).toEqual([
        [1, 1, 1, 1],
        [2, 2, 2, 2],
        [3, 3, 3, 3],
        [4, 4, 4, 4],
      ]);
    });
  });
});
