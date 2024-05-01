import React, { useState } from 'react'
import { Row, Col } from 'antd';
import moment from 'moment';
import Loading from 'components/Loading';
import { Container, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography, Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

import { useGetCryptoNewsQuery } from 'services/cryptoNewsApi';
import { useGetCryptosQuery } from 'services/cryptoApi';


const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12});
  const { data } = useGetCryptosQuery(100);

  if(!cryptoNews?.value) return <Loading/>;


  return (
    <>
    <Container sx={{ margin: '20px' }}>

      {!simplified && (
        <Col span={24}>
          <Box sx={{ minWidth: 120, paddingBottom: 4}}>
            <FormControl sx={{ width: 120 }}>
              <InputLabel>Cryptocurrency</InputLabel>
              <Select
                label="Cryptocurrency"
                value={newsCategory}
                onChange={(event) => setNewsCategory(event.target.value)}
              >
                <MenuItem value="Cryptocurrency">All</MenuItem>
                {data?.data?.coins.map((coin) => (
                  <MenuItem key={coin.name} value={coin.name}>
                    {coin.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Col>
      )}

      <Row gutter = {[24,24]}>

        {cryptoNews.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card sx={{ maxWidth:345}}>
            <a href={news.url} target="_blank" rel="noreferrer">
              <CardHeader
                avatar={
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                }
                title = {news.name}
                subheader = {moment(news.datePublished).startOf('ss').fromNow()}
              />
              <CardMedia
                component="img"
                height="100"
                image={news?.image?.thumbnail?.contentUrl || demoImage}
                alt="News Image"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {news.description > 100
                    ? `?${news.description.substring(0, 100)}...`
                    : news.description
                  }
                </Typography>
              </CardContent>
            </a>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  )
}

export default News