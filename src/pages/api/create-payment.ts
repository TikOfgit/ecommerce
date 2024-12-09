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
    const response = await axios.post(
      'https://api.payplug.com/v1/payments',
      {
        amount: 1500, // 15.00 EUR
        currency: 'EUR',
        notification_url: `${process.env.NEXT_PUBLIC_URL}/api/webhook`,
        return_url: `${process.env.NEXT_PUBLIC_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
        metadata: {
          product_id: '123',
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${PAYPLUG_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('PayPlug error:', error);
    return res.status(500).json({ message: 'Error creating payment' });
  }
}
