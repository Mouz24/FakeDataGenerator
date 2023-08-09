import React from 'react';
import { Select, MenuItem, FormControl } from '@mui/material';

interface RegionSelectorProps {
  selectedRegionIndex: number;
  onChange: (regionIndex: number) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ selectedRegionIndex, onChange }) => {
  const regions = ['Russia', 'USA', 'Poland'];

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
    <Select value={selectedRegionIndex} onChange={(e) => onChange(Number(e.target.value))}>
      {regions.map((region, index) => (
        <MenuItem key={index} value={index}>
          {region}
        </MenuItem>
      ))}
    </Select>
    </FormControl>
  );
};

export default RegionSelector;
