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
    const paymentData = {
      amount: 1500,
      currency: 'EUR',
      notification_url: `${baseUrl}/api/webhook`,
      return_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,
      metadata: {
        order_id: 'TEST-001'
      }
    };

    console.log('Sending payment data:', paymentData);

    const response = await axios({
      method: 'post',
      url: 'https://api.payplug.com/v1/payments',
      data: paymentData,
      headers: {
        'Authorization': `Bearer ${PAYPLUG_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('PayPlug response:', response.data);
    
    if (response.data && response.data.hosted_payment_url) {
      return res.status(200).json({
        payment_url: response.data.hosted_payment_url
      });
    } else {
      throw new Error('No payment URL in response');
    }
  } catch (error: any) {
    console.error('PayPlug error details:', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
      message: error.message
    });

    return res.status(error.response?.status || 500).json({
      message: 'Error creating payment',
      error: error.response?.data || error.message
    });
  }
}
