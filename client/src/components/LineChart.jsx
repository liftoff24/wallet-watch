import React from 'react'
import { Line } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Chart, PointElement, LineElement } from "chart.js";
import { Col, Row } from 'antd';
import { Typography, useTheme } from '@mui/material';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimeStamp = [];

  const theme = useTheme();

  for(let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory.data.history[i].price)
    coinTimeStamp.push(new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleDateString());
    // console.log(coinHistory.data.history[i]);
  }

  const data = {
    labels: coinTimeStamp,
    datasets: [
        {
            label: 'Price in USD',
            data: coinPrice,
            fill: false,
            backgroundColor: theme.palette.secondary[200],
            borderColor: theme.palette.secondary[200],
        },
    ],
  };

  const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
  };

  return (
    <>
        {/* <Row>
            <Typography variant='h3'>{coinName} Price Chart</Typography>
            <Col>
                <Typography variant='h5'>{coinHistory?.data?.change}%</Typography>
                <Typography variant='h5'>Current {coinName} Price: ${currentPrice}</Typography>
            </Col>
        </Row> */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
            <Typography variant="h4">{coinName} Price Chart</Typography>
            <Typography variant='subtitle1'>Current {coinName} Price: ${currentPrice} | {coinHistory?.data?.change}%</Typography>
        </div>
        <div style={{marginBottom: '25px'}}>
            <Line data={data} options={options}/>
        </div>

    </>
  )
}

export default LineChart