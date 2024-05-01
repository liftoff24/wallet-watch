import React, { useEffect, useState } from 'react';
import { CircularProgress, styled } from '@mui/material';

const StyledThreatBar = styled('div')(({ theme }) => ({
  position: 'relative',
  width: 150, // Increase the width for a bigger bar
  height: 75, // Increase the height for a bigger bar
  '& .MuiCircularProgress-circle': {
    strokeLinecap: 'round',
  },
  '& .overlay': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontSize: 16, 
    fontWeight: 'bold', 
    color: (props) => {
      const percentage = Math.round(props.progress);
      if (percentage >= 50) {
        return '#FF0000'; 
      } else if (percentage <= 30) {
        return '#00FF00'; 
      } else {
        return '#FFFF00'; 
      }
    },
  },
}));

const ThreatBar = ({ prediction }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(prediction);
    }, 500); 

    return () => {
      clearTimeout(timer);
    };
  }, [prediction]);

  return (
    <StyledThreatBar progress={progress}>
      <CircularProgress
        variant="determinate"
        value={progress}
        size={100}
        thickness={3}
        startAngle={-90}
        endAngle={90}
      />
      <div className="overlay">
        <span>{`${Math.round(progress)}%`}</span>
      </div>
    </StyledThreatBar>
  );
};

export default ThreatBar;
