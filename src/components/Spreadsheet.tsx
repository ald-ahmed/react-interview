import { Box, Flex, Input } from '@chakra-ui/react';
import _ from 'lodash';
import React, { createRef, useRef, useState } from 'react';

import Cell from 'components/Cell';
import { getCellContent, isProtected } from 'utils';
import { INITIAL_CELL_VALUE, NUM_COLUMNS, NUM_ROWS } from '../utils/config';

const dollarFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const Spreadsheet: React.FC = () => {
  const [cellState, setCellState] = useState(
    _.times(NUM_ROWS, (row) => _.times(NUM_COLUMNS, (col) => getCellContent(row, col))),
  );

  const cellRefs = _.times(NUM_ROWS, (row) => _.times(NUM_COLUMNS, (col) => createRef()));

  const parseNewValue = (newValue) => {
    if (newValue == INITIAL_CELL_VALUE) {
      return newValue;
    }
    const formattedDollarValue = dollarFormatter.format(newValue);
    const isValidDollarValue = formattedDollarValue.indexOf('NaN') === -1;

    return isValidDollarValue ? formattedDollarValue : newValue;
  };

  const handleArrowKey = (e, rowIdx, columnIdx) => {
    try {
      if (e.keyCode == '38') {
        // up arrow
        cellRefs[rowIdx - 1][columnIdx].current.focus();
      } else if (e.keyCode == '40') {
        // down arrow
        cellRefs[rowIdx + 1][columnIdx].current.focus();
      } else if (e.keyCode == '37') {
        // left arrow
        cellRefs[rowIdx][columnIdx - 1].current.focus();
      } else if (e.keyCode == '39') {
        // right arrow
        cellRefs[rowIdx][columnIdx + 1].current.focus();
      }
    } catch (error) {
      // expected error logged when going out of bounds
      console.error(error);
    }
  };

  return (
    <Box width="full">
      {cellState.map((row, rowIdx) => {
        return (
          <Flex key={String(rowIdx)}>
            {row.map((cellValue, columnIdx) => (
              <Cell
                key={`${rowIdx}/${columnIdx}`}
                isProtected={isProtected(rowIdx, columnIdx)}
                onKeyUp={(e) => handleArrowKey(e, rowIdx, columnIdx)}
                innerRef={cellRefs[rowIdx][columnIdx]}
                value={cellValue}
                onChange={(newValue: string) => {
                  const newRow = [
                    ...cellState[rowIdx].slice(0, columnIdx),
                    parseNewValue(newValue),
                    ...cellState[rowIdx].slice(columnIdx + 1),
                  ];
                  setCellState([
                    ...cellState.slice(0, rowIdx),
                    newRow,
                    ...cellState.slice(rowIdx + 1),
                  ]);
                }}
              />
            ))}
          </Flex>
        );
      })}
    </Box>
  );
};

export default Spreadsheet;
