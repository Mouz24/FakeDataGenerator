import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SingleAppPage from './CommonAppPage';
import { Box } from '@mui/material';
import { HashRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <HashRouter>
    <Box sx={{paddingLeft: '20px', paddingRight:'20px'}}>
          <Routes>
            <Route path="/" element={<SingleAppPage/>} />
          </Routes>
    </Box>
    </HashRouter>
  );
};

export default App;
