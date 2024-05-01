import React from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { Google } from "@mui/icons-material";

const Signup = () => {

  const googleAuth = () => {
    window.open(
        `${process.env.REACT_APP_API_URL}/auth/google/callback`,
        "_self"
    );
  }
    
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <Button onClick={googleAuth}>
        <Google sx={{fontSize:"25px"}}/>
        <span>Sign Up with Google</span>
      </Button>
      <p>
        <a href='/login'>Log In</a>
      </p>
    </Container>
  )
}

export default Signup;