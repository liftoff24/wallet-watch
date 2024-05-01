import React, { useState, useEffect } from 'react'
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Row, Col, Input } from 'antd';
import { Card, CardContent, Typography, CardMedia, Container, InputBase, IconButton } from '@mui/material'
import Loading from 'components/Loading';
import FlexBetween from 'components/FlexBetween';
import { Search } from '@mui/icons-material';

import { useGetCryptosQuery } from 'services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 :100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

    setCryptos(filteredData);

  }, [cryptosList, searchTerm]);
  
  if(isFetching) return <Loading/>;

  return (
    <>
    <Container sx={{ margin: '20px' }}>
      
      {!simplified && (
        <div className="search-crypto">
          <InputBase sx= {{ marginRight: '8px', border: '1px solid #ccc', borderRadius: '9px', gap:"3rem", p:"0.1rem 1.5rem", marginBottom:'20px' }} placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
          <IconButton>
            <Search />
          </IconButton>
        </div>
      )}
      
      <Row gutter={[32,32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card color = 'white' sx={{display: 'flex',
                    justifyContent: 'space-between',
                    padding: 2,
                    transition: 'transform 0.2s ease-in-out',
                    height: 230,
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }}}>
                <CardContent>
                  <Typography variant="h5">{`${currency.rank}. ${currency.name}`}</Typography>
                  <p>Price: {millify(currency.price)}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily Change: {millify(currency.change)}%</p>
                </CardContent>
                <CardMedia component="img" src={currency.iconUrl} alt={currency.name} sx = {{width: 40,
                    height: 40,
                    objectFit: 'contain', 
                    marginRight: 2,
                    alignSelf: 'flex-start' }} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>  
    </>
  )
}

export default Cryptocurrencies