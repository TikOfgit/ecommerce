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
        amount: 1500,
        currency: 'EUR',
        billing: {
          title: 'M',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
        },
        shipping: {
          title: 'M',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
        },
        hosted_payment: {
          return_url: 'https://ecommerce-flame-one.vercel.app/success',
          cancel_url: 'https://ecommerce-flame-one.vercel.app/cancel'
        },
        notification_url: 'https://ecommerce-flame-one.vercel.app/api/webhook',
        metadata: {
          customer_id: '42',
          order_id: '123456'
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${PAYPLUG_SECRET_KEY}`,
          'Content-Type': 'application/json'
        },
        validateStatus: function (status) {
          return status < 500;
        }
      }
    );

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
