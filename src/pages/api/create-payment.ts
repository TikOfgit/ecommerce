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

  try {
    console.log('Starting payment creation...');

    const paymentData = {
      amount: 1500,
      currency: 'EUR',
      notification_url: 'https://ecommerce-flame-one.vercel.app/api/webhook',
      return_url: 'https://ecommerce-flame-one.vercel.app/success',
      cancel_url: 'https://ecommerce-flame-one.vercel.app/cancel',
      customer: {
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe'
      }
    };

    console.log('Payment data being sent:', JSON.stringify(paymentData, null, 2));

    const response = await axios({
      method: 'POST',
      url: 'https://api.payplug.com/v1/payments',
      headers: {
        'Authorization': `Bearer ${PAYPLUG_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      data: paymentData
    });

    console.log('PayPlug API response:', JSON.stringify(response.data, null, 2));

    return res.status(200).json({
      payment_url: response.data.hosted_payment.payment_url || response.data.hosted_payment_url
    });

  } catch (error: any) {
    console.error('PayPlug error:', error.response?.data || error.message);
    
    return res.status(400).json({
      error: true,
      message: error.response?.data?.message || error.message,
      details: error.response?.data
    });
  }
}
