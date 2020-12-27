import React, { useState } from 'react';
import { render, Text, Box, useInput } from 'ink';
import { Board } from './board';

const board = new Board([
  [Board.EMPTY_SPACE, Board.EMPTY_SPACE, Board.EMPTY_SPACE, Board.EMPTY_SPACE],
  [Board.EMPTY_SPACE, 2, Board.EMPTY_SPACE, Board.EMPTY_SPACE],
  [Board.EMPTY_SPACE, Board.EMPTY_SPACE, 2, Board.EMPTY_SPACE],
  [Board.EMPTY_SPACE, Board.EMPTY_SPACE, Board.EMPTY_SPACE, Board.EMPTY_SPACE],
]);

const COLOR_MAP: {
  [value: number]: string;
} = {
  2: 'cyan',
  4: 'green',
  8: 'yellow',
  16: 'red',
  32: 'magenta',
};

function App() {
  const [map, setMap] = useState(board.getBoard());

  useInput((_input, key) => {
    if (key.leftArrow) {
      board.moveLeft();
    }
    if (key.rightArrow) {
      board.moveRight();
    }
    if (key.upArrow) {
      board.moveUp();
    }
    if (key.downArrow) {
      board.moveDown();
    }
    board.spawnNumber();
    setMap(board.getBoard());
  });

  return (
    <Box flexDirection={'column'} alignItems={'stretch'}>
      {map.map((row, y) => (
        <Box key={y} flexDirection={'row'} alignItems={'stretch'}>
          {row.map((col, x) => (
            <Box
              key={x}
              width={12}
              height={6}
              borderColor={'white'}
              borderStyle={'classic'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              {(() => {
                if (col === Board.EMPTY_SPACE) {
                  return <Text>-</Text>;
                }
                return <Text color={COLOR_MAP[col] ?? 'white'}>{col}</Text>;
              })()}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

render(<App />);
