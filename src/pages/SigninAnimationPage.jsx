import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // For animated cart icon

const SigningInPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%', height: '100vh', padding: '20px' }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <ShoppingCartIcon
          sx={{
            fontSize: 50,
            animation: 'spin 2s linear infinite', // Custom CSS for spinning animation
          }}
        />
        <Typography variant="h6">Signing In...</Typography>
      </Box>

      {/* Custom CSS for spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default SigningInPage;
