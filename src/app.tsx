import React, { useState } from 'react';
import { Text, Box, useInput, Static } from 'ink';
import Board from './board';
import Game from './game';

const game = new Game();
game.reset();

const COLOR_MAP: {
  [value: number]: string;
} = {
  2: 'cyan',
  4: 'cyanBright',
  8: 'green',
  16: 'greenBright',
  32: 'magenta',
  64: 'magentaBright',
  128: 'yellow',
  256: 'yellowBright',
  512: 'blue',
  1024: 'blueBright',
  2048: 'red',
  4096: 'redBright',
};

export default function App(): JSX.Element {
  const [map, setMap] = useState(game.board.getBoard());

  useInput((input, key) => {
    if (input === 'q') {
      return process.exit(0);
    }
    if (key.leftArrow) {
      game.moveLeft();
    } else if (key.rightArrow) {
      game.moveRight();
    } else if (key.upArrow) {
      game.moveUp();
    } else if (key.downArrow) {
      game.moveDown();
    }
    if (game.isGameOver()) {
      return process.exit(0);
    }
    setMap(game.board.getBoard());
  });

  return (
    <Box>
      <Static
        items={[
          'Instructions:',
          'Press Q to Quit',
          'Use arrow keys to move board',
        ]}
      >
        {item => <Text key={item}>{item}</Text>}
      </Static>
      <Box marginTop={2} flexDirection={'column'} alignItems={'stretch'}>
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
    </Box>
  );
}
