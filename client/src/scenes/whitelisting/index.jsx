import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { ContentCopyOutlined, DeleteOutlined } from '@mui/icons-material';


const Whitelisting = () => {
  const [wallets, setWallets] = useState([]);
  const [newWallet, setNewWallet] = useState({ name: '', address: '' });

  const handleAddWallet = () => {
    setWallets([...wallets, { ...newWallet, id: Date.now() }]);
    setNewWallet({ name: '', address: '' });
  };

  const handleCopyToClipboard = (address) => {
    navigator.clipboard.writeText(address);
  };

  const handleDeleteWallet = (id) => {
    const updatedWallets = wallets.filter((wallet) => wallet.id !== id);
    setWallets(updatedWallets);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Cryptocurrency Wallet Book</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ padding: '16px' }}>
        <Typography variant="h5" gutterBottom>
          Wallet Whitelisting
        </Typography>
        <TextField
          label="Name"
          value={newWallet.name}
          onChange={(e) => setNewWallet({ ...newWallet, name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          value={newWallet.address}
          onChange={(e) => setNewWallet({ ...newWallet, address: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddWallet}>
          Add Wallet
        </Button>
        <List style={{ marginTop: '16px' }}>
          {wallets.map((wallet) => (
            <ListItem key={wallet.id}>
              <ListItemText primary={wallet.name} secondary={wallet.address} />
              <IconButton
                edge="end"
                aria-label="copy"
                onClick={() => handleCopyToClipboard(wallet.address)}
              >
                <ContentCopyOutlined />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteWallet(wallet.id)}
              >
                <DeleteOutlined />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
};

export default Whitelisting;
