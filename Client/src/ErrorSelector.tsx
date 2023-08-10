import React, { useState } from 'react';
import { TextField, Slider, Box, Typography } from '@mui/material';

interface ErrorsSelectorProps {
  errors: number;
  onChange: (errors: number) => void;
}

const ErrorsSelector: React.FC<ErrorsSelectorProps> = ({ errors, onChange }) => {
  const handleErrorChange = (value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      const numericValue = Number(value);
      if (numericValue <= 1000) {
        onChange(numericValue);
      }
    } else if (value === '') {
      onChange(0);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography variant="body1">Select Number of Errors:</Typography>
      <Slider
        value={errors}
        onChange={(e, value) => onChange(value as number)}
        min={0}
        max={10}
        step={0.5}
        marks
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => value.toString()}
      />
      <TextField
        label="Enter number of errors"
        type="number"
        value={isNaN(errors) ? '' : errors.toString()}
        onChange={(e) => handleErrorChange(e.target.value)}
        inputProps={{ min: 0, max: 1000, step: 0.5 }}
        fullWidth
      />
    </Box>
  );
};

export default ErrorsSelector;
