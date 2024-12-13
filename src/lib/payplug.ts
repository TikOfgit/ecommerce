import { CartItem } from '../types/cart';

const PAYPLUG_API_KEY = process.env.NEXT_PUBLIC_PAYPLUG_API_KEY;
const PAYPLUG_API_URL = 'https://api.payplug.com/v1';

interface CreatePaymentResponse {
  id: string;
  hosted_payment: {
    payment_url: string;
  };
}

function getSiteURL() {
  // En développement
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  // En production, utiliser l'URL configurée sur Vercel
  return process.env.NEXT_PUBLIC_URL || 'https://lachabroderie.vercel.app';
}

export async function createPayment(
  cart: CartItem[],
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  },
  total: number
) {
  console.log('Creating payment with PayPlug...', { cart, customerInfo, total });
  const siteURL = getSiteURL();
  console.log('Using site URL:', siteURL);

  try {
    const response = await fetch(`${PAYPLUG_API_URL}/payments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAYPLUG_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(total * 100), // Convert to cents
        currency: 'EUR',
        notification_url: `${siteURL}/api/webhooks/payplug`,
        hosted_payment: {
          return_url: `${siteURL}/success`,
          cancel_url: `${siteURL}/cancel`,
        },
        customer: {
          first_name: customerInfo.firstName,
          last_name: customerInfo.lastName,
          email: customerInfo.email,
          address1: customerInfo.address,
          city: customerInfo.city,
          postcode: customerInfo.postalCode,
          country: 'FR',
        },
        metadata: {
          customer_id: customerInfo.email,
          order_items: JSON.stringify(cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })))
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('PayPlug API error:', errorData);
      throw new Error(`PayPlug API error: ${response.status}`);
    }

    const data = await response.json() as CreatePaymentResponse;
    console.log('Payment created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
}
