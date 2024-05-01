import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Statistic= ({ title, value }) => {
  return (
    <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Statistic;
