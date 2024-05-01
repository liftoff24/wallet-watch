import React, { useState } from 'react';
import { Button, Container, TextField, Typography, Paper, Grid, Box, Card, CardMedia, CardContent, CircularProgress, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getBitcoinData } from 'state/blockchainApi';
import { CurrencyBitcoin, SouthWest, NorthEast, AccountBalanceWallet, South, North } from '@mui/icons-material';
import Loading from 'components/Loading';
import { styled } from '@mui/material';
import millify from 'millify';
import ThreatBar from 'components/ThreatBar';



const FraudDetection = () => {
  const [address, setAddress] = useState('');
  const [bitcoinData, setBitcoinData] = useState(null); // State to store Bitcoin address details
  const [prediction, setPrediction] = useState(null); // State to store prediction result
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoClick = async () => {
    try {
      setLoading(true);
      // Make an API request to retrieve Bitcoin address details
      const data = await getBitcoinData(address);
      setBitcoinData(data);

      // Prepare data for prediction
      const predictionData = {
        outbound_txs: data.address.outboundTransactions,
        inbound_txs: data.address.inboundTransactions,
        total_txs: data.address.inboundTransactions + data.address.outboundTransactions,
        btc_transacted_total: data.address.outflows + data.address.inflows,
        btc_outflows: data.address.outflows,
        btc_inflows: data.address.inflows
      };

      // Make an API request to send data for prediction
      const predictionResult = await makePrediction(predictionData);
      setPrediction(predictionResult);

      setLoading(false);
      
      // Scroll to the result section
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error.message);
    }
  };

  const makePrediction = async (predictionData) => {
    try {
      const response = await fetch('http://localhost:5001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(predictionData)
      });

      if (!response.ok) {
        throw new Error('Failed to make prediction');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error making prediction:', error.message);
      throw error;
    }
  };

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(2),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));
  
  const theme = useTheme();

  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h2" gutterBottom sx={{fontWeight: 600}}>
        Fraud Detection
      </Typography>
      <Typography variant="body1" gutterBottom sx={{paddingBottom:2}}>
        This tool uses Machine Learning to predict whether a Bitcoin Address is trustworthy or not. It takes data associated with the Address such as its transactions, balances, and overall history to make this prediction as accurate as possible. This model was built on the Elliptic Dataset.
      </Typography>
      <Typography variant="h6" gutterBottom>
        Enter BTC Address
      </Typography>
      <TextField
        label="Address"
        variant="outlined"
        fullWidth
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={handleGoClick}>
        Go
      </Button>

      <Box id="result-section" sx={{ flexGrow: 1, py: '50px' }}>
      {loading && <Loading/>}
        {bitcoinData && prediction && (
          <Container>
            
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid xs={12} sx = {{p: 5}}>
                
                    <Typography variant="h4" gutterBottom sx={{paddingBottom: 4, fontWeight: 1000}}>
                      Fraud Score
                    </Typography>
                      <div>
                        <CircularProgress thickness={10} size={100} sx={{color: theme.palette.secondary[200]}} variant="determinate" value={prediction * 100} />
                        <Typography variant="h4" gutterBottom sx={{fontWeight: 600, marginBottom:2}}>
                          {millify((prediction * 100), {precision: 2})}%
                        </Typography>
                        {prediction <= 0.25 && (
                            <Typography variant="h5" sx={{ color: 'success.main' }}>
                              Low Fraud Risk
                            </Typography>
                          )}
                          {prediction > 0.25 && prediction <= 0.50 && (
                            <Typography variant="h5" sx={{ color: 'warning.main' }}>
                              Medium Fraud Risk
                            </Typography>
                          )}
                          {prediction > 0.50 && prediction <= 0.75 && (
                            <Typography variant="h5" sx={{ color: 'warning.main' }}>
                              High Fraud Risk
                            </Typography>
                          )}
                          {prediction > 0.75 && (
                            <Typography variant="h5" sx={{ color: 'error.main' }}>
                              Very High Fraud Risk
                            </Typography>
                          )}
                      </div>
                
              </Grid>
            </Grid>
            <Typography variant="h4" gutterBottom sx={{py: 4, fontWeight: 1000}}>Address Details</Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid xs={2} sm={4} md={4}>
                <Paper sx={{p:2, m:2}} elevation={0}>
                  <Card elevation={0} style={{ margin: 10, flexBasis: '45%', boxShadow: 0 }}>
                    <CardMedia><AccountBalanceWallet fontSize='large'/></CardMedia>
                    <CardContent>
                      <Typography variant="h6">Balance</Typography>
                      <Typography variant="h4" color="textSecondary">{millify(bitcoinData.address.balance, {precision: 3})} BTC</Typography>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
              <Grid xs={2} sm={4} md={4}>
                <Paper sx={{p:2, m:2}} elevation={0}>
                  <Card elevation={0} style={{ margin: 10, flexBasis: '45%', boxShadow: 0 }}>
                    <CardMedia><SouthWest fontSize='large'/></CardMedia>
                    <CardContent>
                      <Typography variant="h6">Inbound Transactions</Typography>
                      <Typography variant="h4" color="textSecondary">{bitcoinData.address.inboundTransactions}</Typography>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
              <Grid xs={2} sm={4} md={4}>
                <Paper sx={{p:2, m:2}} elevation={0}>
                  <Card elevation={0} style={{ margin: 10, flexBasis: '45%', boxShadow: 0 }}>
                    <CardMedia><NorthEast fontSize='large'/></CardMedia>
                    <CardContent>
                      <Typography variant="h6">Outbound Transactions</Typography>
                      <Typography variant="h4" color="textSecondary">{bitcoinData.address.outboundTransactions}</Typography>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
              <Grid xs={2} sm={4} md={4}>
                <Paper sx={{p:2, m:2}} elevation={0}>
                  <Card elevation={0} style={{ margin: 10, flexBasis: '45%', boxShadow: 0 }}>
                    <CardMedia><South fontSize='large'/></CardMedia>
                    <CardContent>
                      <Typography variant="h6">Inflows</Typography>
                      <Typography variant="h4" color="textSecondary">{millify(bitcoinData.address.inflows, {precision: 5})} BTC</Typography>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
              <Grid xs={2} sm={4} md={4}>
                <Paper sx={{p:2, m:2}} elevation={0}>
                  <Card elevation={0} style={{ margin: 10, flexBasis: '45%', boxShadow: 0 }}>
                    <CardMedia><North fontSize='large'/></CardMedia>
                    <CardContent>
                      <Typography variant="h6">Outflows</Typography>
                      <Typography variant="h4" color="textSecondary">{millify(bitcoinData.address.outflows, {precision: 5})} BTC</Typography>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
              <Grid xs={2} sm={4} md={4}>
                <Paper sx={{p:2, m:2}} elevation={0}>
                  <Card elevation={0} style={{ margin: 10, flexBasis: '45%', boxShadow: 0 }}>
                    <CardMedia><CurrencyBitcoin fontSize='large'/></CardMedia>
                    <CardContent>
                      <Typography variant="h6">Receivers</Typography>
                      <Typography variant="h4" color="textSecondary">{bitcoinData.address.uniqueReceivers}</Typography>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>     
            </Grid>
            </Container>
          )}
        </Box>
    </Container>
  );
};

export default FraudDetection;
