import axios from "axios";

export async function getBitcoinData(address) {
  try {
    let data = JSON.stringify({
      "query": `query MyQuery {
        bitcoin {
          addressStats(address: {is: "${address}"}) {
            address {
              address
              annotation
              balance(in: USD)
              inboundTransactions
              inflows
              outboundTransactions
              outflows
              uniqueReceivers
              uniqueSenders
            }
          }
        }
      }`,
      "variables": "{}"
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://graphql.bitquery.io',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.BLOCKCHAIN_API,
        'Authorization': 'Bearer ory_at_gwT81eBtc2e9t-NH_D1qDpopojF44lwb3pmZtZVDiX4.ZjQhu4Kc2i0RP-3ICMsesNYQwkPnuDTvZ_FcsOmVWwc'
      },
      data: data
    };

    const response = await axios.request(config);
    // console.log(JSON.stringify(response.data)); // Log the response data
    return response.data.data.bitcoin.addressStats[0];
  } catch (error) {
    console.error('Error fetching Bitcoin data:', error.message);
    throw new Error('Unable to retrieve Bitcoin data');
  }
}
