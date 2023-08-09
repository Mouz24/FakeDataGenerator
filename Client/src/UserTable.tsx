import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

interface User {
  id: number;
  fullName: string;
  addressString: string;
  phoneNumber: string;
}

interface UserDataTableProps {
  users: User[];
  onLoadMore: () => void;
  onExportCSV: () => void;
}

const StyledButton = styled(Button)`
  margin-top: 12px;
`;

const UserDataTable: React.FC<UserDataTableProps> = ({ users, onLoadMore, onExportCSV }) => {
  return (
    <div>
      <TableContainer component={Paper} sx={{marginTop: '10px'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.addressString}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{display: 'flex', gap: '20px'}}>
      <StyledButton variant="outlined" onClick={onLoadMore}>
        Load More
      </StyledButton>
      <StyledButton variant="outlined" onClick={onExportCSV}>
        Export to CSV
      </StyledButton>
      </Box>
    </div>
  );
};

export default UserDataTable;
