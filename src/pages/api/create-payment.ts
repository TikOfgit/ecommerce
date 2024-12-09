import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const PAYPLUG_SECRET_KEY = 'sk_test_yugCPCAfcjcBYWEX2UlQw';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const baseUrl = 'https://ecommerce-flame-one.vercel.app';

  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.payplug.com/v1/payments',
      data: {
        amount: 1500,
        currency: 'EUR',
        return_url: `${baseUrl}/success`,
        cancel_url: `${baseUrl}/cancel`,
        notification_url: `${baseUrl}/api/webhook`
      },
      headers: {
        'Authorization': `Bearer ${PAYPLUG_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      validateStatus: null
    });

    if (response.status !== 201 && response.status !== 200) {
      console.error('PayPlug error response:', response.data);
      return res.status(response.status).json({
        message: 'Error from PayPlug',
        error: response.data
      });
    }

    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error('PayPlug error:', error.response?.data || error.message);
    return res.status(500).json({
      message: 'Error creating payment',
      error: error.response?.data || error.message
    });
  }
}
