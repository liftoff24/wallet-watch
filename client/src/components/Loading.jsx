import React from 'react';
import { CircularProgress, Container } from '@mui/material';

const Loading = () => {
  return (
    <Container sx={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </div>
    </Container>
  )
}

export default Loading