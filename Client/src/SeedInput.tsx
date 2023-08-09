import { Box, Button, TextField, styled } from '@mui/material';
import React from 'react';

interface SeedInputProps {
  seed: number;
  onChange: (seed: number) => void;
  onRandomClick: () => void;
}

const StyledBox = styled(Box)({
  display: 'flex',
  marginTop: '10px',
  gap: '10px',
  alignItems: 'center'
});

const StyledTextField = styled(TextField)`
  flex-grow: 1;
`;

const SeedInput: React.FC<SeedInputProps> = ({ seed, onChange, onRandomClick }) => {
  const handleSeedChange = (value: string) => {
    if (/^\d+$/.test(value)) {
      onChange(Number(value));
    } else if (value === '') {
      onChange(0);
    }
  };

  return (
    <StyledBox sx={{width: 300}}>
      <StyledTextField
        label="Seed"
        value={isNaN(seed) ? '' : seed.toString()}
        onChange={(e) => handleSeedChange(e.target.value)}
        fullWidth
        inputProps={{ min: 0}}
      />
      <Button variant="outlined" onClick={onRandomClick} size='medium' style={{ flexShrink: 0 }}>
        Random
      </Button>
    </StyledBox>
  );
};

export default SeedInput;
