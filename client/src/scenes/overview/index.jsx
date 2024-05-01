import React from 'react'
import millify from 'millify';
import { Row, Col } from 'antd';
import Statistic from 'components/Statistic';
import Loading from 'components/Loading';
import { Typography, Container, Link, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useGetCryptosQuery } from 'services/cryptoApi';
import Cryptocurrencies from 'scenes/cryptocurrencies';
import News from 'scenes/news';

const Overview = () => {

    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;
    const navigate = useNavigate();

    // console.log(data);

    if(isFetching) return <Loading/>;

    return (
        <>
            <Container sx={{ marginTop: '40px' }}>
                <Typography variant="h3" sx={{ marginBottom: '40px' }}>Global Crypto Stats</Typography>
                <Row>
                    <Col span = {12}><Statistic title="Total Cryptocurrencies" value={globalStats.total}/></Col>
                    <Col span = {12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/></Col>
                    <Col span = {12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}/></Col>
                    <Col span = {12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)}/></Col>
                    <Col span = {12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/></Col>
                    
                </Row>
                <div className = "home-heading-container" >
                    <Typography sx={{ marginTop: '40px' }} variant="h4" className="home-title">Top 10 Cryptocurrencies in the World</Typography>
                    <Typography sx={{ marginTop: '20px', marginBottom:'20px'  }} variant="h5" className="show-more"><Button variant="outlined" color="inherit" onClick={() => {
                                        navigate('/cryptocurrencies');                                       
                                    }}>Show More</Button></Typography>
                </div>
                <Cryptocurrencies simplified />
                <div className = "home-heading-container" >
                    <Typography sx={{ marginTop: '40px' }} variant="h4" className="home-title">Latest Crypto News</Typography>
                    <Typography sx={{ marginTop: '20px', marginBottom:'20px' }} variant="h5" className="show-more"><Button variant="outlined" color="inherit" onClick={() => {
                                        navigate('/news');                                       
                                    }}>Show More</Button></Typography>
                </div>
                <News simplified />
            </Container>
        </>
    )
}

export default Overview