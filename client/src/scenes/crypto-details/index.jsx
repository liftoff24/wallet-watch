import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';

import { Container, Typography, Grid, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link} from '@mui/material';
import Loading from 'components/Loading';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from 'services/cryptoApi';
import LineChart from 'components/LineChart';


const CryptoDetails = () => {
    const { coinId } = useParams();
    const [timeperiod, setTimeperiod] = useState('7d');
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
    const { data: coinHistory } = useGetCryptoHistoryQuery({coinId, timeperiod})
    const cryptoDetails = data?.data?.coin;

    if(isFetching) return <Loading/>;

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];

    return (
        <>
        <Container maxWidth="md" style={{ marginTop: '50px' }}>
            <Grid container className="coin-detail-container">
            <Grid item xs={12} className="coin-header-container">
                <Typography variant="h2" align="center" gutterBottom>
                    {cryptoDetails.name} Price
                </Typography>
                <Typography align="center">
                    {cryptoDetails.name} live price in USD. View value statistics, market cap, and supply.
                </Typography>
            </Grid>
            <Grid item xs={12} className="select-timeperiod">
                <Select sx={{marginTop:"25px", marginBottom:"25px"}}
                    native
                    defaultValue="7d"
                    onChange={(value) => setTimeperiod(value.target.value)}
                >
                    {time.map((date) => (
                        <option key={date} value={date}>
                            {date}
                        </option>
                    ))}
                </Select>
                
                {/* Line Chart */}
                <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName = {cryptoDetails.name}/>

            </Grid>
            <Grid container spacing={2} className="stats-container">
                <Grid item xs={12} sm={6}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><Typography variant="h6">Statistic</Typography></TableCell>
                                    <TableCell><Typography variant="h6">Value</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stats.map(({ title, value, icon }) => (
                                    <TableRow key={title}>
                                        <TableCell>
                                            {icon} {title}
                                        </TableCell>
                                        <TableCell>{value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><Typography variant="h6">Other Statistic</Typography></TableCell>
                                    <TableCell><Typography variant="h6">Value</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {genericStats.map(({ title, value, icon }) => (
                                    <TableRow key={title}>
                                        <TableCell>{icon} {title}</TableCell>
                                        <TableCell>{value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Grid>
        <Grid container sx={{marginTop:"25px"}} spacing={3} className="coin-desc-link">
            <Grid item xs={12} sm={6} className="coin-desc">
                <Typography variant="h3" className="coin-details-heading" sx={{marginBottom:'25px'}}>
                    What is {cryptoDetails.name}
                </Typography>
                <Typography variant="body1">
                    {HTMLReactParser(cryptoDetails.description)}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} className="coin-links" style={{ textAlign: 'right' }}>
                <Typography variant="h3" className="coin-details-heading" sx={{marginBottom:'25px'}}>
                    {cryptoDetails.name} Links
                </Typography>
                <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {cryptoDetails.links.map((link) => (
                            <TableRow key={link.name}>
                                <TableCell>
                                    <Typography variant="subtitle1" className="link-name">
                                        {link.type}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{textAlign:'right'}}>
                                    <Link href={link.url} target="_blank" rel="noreferrer">
                                        {link.name}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>
        </Grid>
        </Container>
        </>
    )
}

export default CryptoDetails