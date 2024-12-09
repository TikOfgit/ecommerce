import type { NextApiRequest, NextApiResponse } from 'next';

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
    // Create payment data
    const data = {
      amount: 1500,
      currency: 'EUR',
      billing: {
        first_name: "John",
        last_name: "Doe",
        email: "customer@example.net",
      },
      shipping: {
        first_name: "John",
        last_name: "Doe",
        email: "customer@example.net",
      },
      hosted_payment: {
        return_url: `${baseUrl}/success`,
        cancel_url: `${baseUrl}/cancel`
      }
    };

    // Make the request to PayPlug
    const response = await fetch('https://api.payplug.com/v1/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAYPLUG_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Get the response data
    const responseData = await response.json();

    // Log for debugging
    console.log('PayPlug API Response:', responseData);

    if (!response.ok) {
      throw new Error(responseData.message || 'Payment creation failed');
    }

    // Return the payment URL
    return res.status(200).json({
      payment_url: responseData.hosted_payment_url
    });

  } catch (error: any) {
    console.error('PayPlug error:', error);
    return res.status(400).json({
      message: 'Error creating payment',
      error: error.message
    });
  }
}
