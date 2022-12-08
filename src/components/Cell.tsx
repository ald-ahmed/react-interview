import { Input, Box, Text } from '@chakra-ui/react';
import React, { useCallback, useRef, useState } from 'react';

interface Props {
  value: string;
  // prevent editing row or column headers
  isProtected: boolean;
  onChange: (newValue: string) => void;
  onKeyUp;
  ref;
}

export const WrappedCell = React.forwardRef((props: Props, ref) => {
  return <Cell {...props} ref={ref} />;
});

const Cell: React.FC<Props> = ({ value, isProtected = false, onChange, onKeyUp, ref }) => {
  const [tempValue, setTempValue] = useState(null);

  const onBlurHandler = () => {
    onChange(tempValue || value);
    setTempValue(null);
  };

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      setTempValue(ev.target.value);
    },
    [onChange],
  );

  return (
    <Box>
      <Input
        value={tempValue || value}
        isReadOnly={isProtected}
        variant={isProtected ? 'filled' : 'outline'}
        borderRadius={0}
        width="full"
        // use onBlur to allow editing the value before committing it
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
        onKeyUp={onKeyUp}
        ref={ref}
      />
    </Box>
  );
};

export default Cell;
