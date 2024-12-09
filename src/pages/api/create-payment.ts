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
        payment_method: {
          type: 'card'
        },
        hosted_payment: {
          return_url: `${baseUrl}/success`,
          cancel_url: `${baseUrl}/cancel`
        },
        notification_url: `${baseUrl}/api/webhook`,
        metadata: {
          order_id: 'TEST-001'
        },
        save_card: false,
        force_3ds: true,
        allow_save_card: false,
        initiator: 'PAYER'
      },
      headers: {
        'Authorization': `Bearer ${PAYPLUG_SECRET_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('PayPlug response:', response.data);
    return res.status(200).json(response.data);
  } catch (error: any) {
    // Log the complete error response
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
