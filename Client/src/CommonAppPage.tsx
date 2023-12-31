import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegionSelector from './RegionSelector';
import ErrorsSelector from './ErrorSelector';
import SeedInput from './SeedInput';
import UserDataTable from './UserTable';

interface User {
  id: number;
  fullName: string;
  addressString: string;
  phoneNumber: string;
}

const CommonAppPage: React.FC = () => {
  const [region, setRegion] = useState<number>(0);
  const [mistakesRate, setMistakesRate] = useState<number>(0);
  const [seed, setSeed] = useState<number>(2);
  const [usersData, setUsersData] = useState<User[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://peabody28.com:1025/api/users', {
        params: {
          region,
          mistakesRate,
          seed,
          pageNumber,
        },
      });
      
      const newUsersData = pageNumber === 1 ? response.data : [...usersData, ...response.data];
      setUsersData(newUsersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRegionChange = (selectedRegionIndex: number) => {
    setRegion(selectedRegionIndex);
    setUsersData([]);
    setPageNumber(1);
  };

  const handleErrorsChange = (value: number) => {
    setMistakesRate(value);
    setUsersData([]);
    setPageNumber(1);
  };

  const handleSeedChange = (value: number) => {
    setSeed(value);
    setUsersData([]);
    setPageNumber(1);
  };

  const handleRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 10000);
    setSeed(randomSeed);
    setUsersData([]);
    setPageNumber(1);
  };

  const handleLoadMore = () => {
    setPageNumber(pageNumber + 1);
  };

  const handleExportCSV = async () => {
    try {
      const response = await axios.post('http://peabody28.com:1025/api/users/get-csv', usersData);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (mistakesRate === 0 && event.key === 'Backspace') {
        event.preventDefault();
      }
    };

    fetchData();
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pageNumber, region, mistakesRate, seed]);

  return (
    <div>
      <RegionSelector selectedRegionIndex={region} onChange={handleRegionChange} />
      <ErrorsSelector errors={mistakesRate} onChange={handleErrorsChange} />
      <SeedInput seed={seed} onChange={handleSeedChange} onRandomClick={handleRandomSeed} />
      <UserDataTable users={usersData} onLoadMore={handleLoadMore} onExportCSV={handleExportCSV} />
    </div>
  );
};

export default CommonAppPage;