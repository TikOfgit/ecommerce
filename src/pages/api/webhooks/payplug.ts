import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

// Interface pour typer les événements PayPlug
interface PayPlugEvent {
  type: 'payment_succeeded' | 'payment_failed' | 'payment_pending' | 'payment_expired';
  data: {
    id: string;
    object: string;
    amount: number;
    currency: string;
    paid: boolean;
    metadata: {
      customer_id: string;
      order_items: string;
    };
    billing: {
      first_name: string;
      last_name: string;
      email: string;
    };
  };
}

function verifyPayPlugSignature(payload: string, signature: string, secretKey: string): boolean {
  try {
    const hmac = crypto.createHmac('sha256', secretKey);
    const expectedSignature = hmac.update(payload).digest('hex');
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    console.log('Invalid method:', req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const signature = req.headers['payplug-signature'];

  if (!signature || typeof signature !== 'string') {
    console.error('Missing PayPlug signature');
    return res.status(401).json({ message: 'Missing signature' });
  }

  const rawBody = JSON.stringify(req.body);
  const secretKey = process.env.NEXT_PUBLIC_PAYPLUG_API_KEY;

  if (!secretKey) {
    console.error('Missing PayPlug API key in environment variables');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  // Vérifier la signature du webhook
  if (!verifyPayPlugSignature(rawBody, signature, secretKey)) {
    console.error('Invalid PayPlug signature');
    return res.status(401).json({ message: 'Invalid signature' });
  }

  try {
    const event = req.body as PayPlugEvent;
    console.log('Received PayPlug webhook:', {
      type: event.type,
      paymentId: event.data.id,
      amount: event.data.amount,
      customer: event.data.billing
    });

    // Traiter différents types d'événements
    switch (event.type) {
      case 'payment_succeeded':
        console.log('Payment succeeded:', {
          amount: event.data.amount / 100, // Convertir les centimes en euros
          customer: `${event.data.billing.first_name} ${event.data.billing.last_name}`,
          email: event.data.billing.email,
          items: JSON.parse(event.data.metadata.order_items)
        });
        // TODO: Mettre à jour le statut de la commande dans la base de données
        // TODO: Envoyer un email de confirmation au client
        break;

      case 'payment_failed':
        console.log('Payment failed:', {
          paymentId: event.data.id,
          customer: `${event.data.billing.first_name} ${event.data.billing.last_name}`,
          email: event.data.billing.email
        });
        // TODO: Mettre à jour le statut de la commande
        // TODO: Envoyer une notification d'échec
        break;

      case 'payment_pending':
        console.log('Payment pending:', event.data.id);
        // TODO: Mettre à jour le statut de la commande en attente
        break;

      case 'payment_expired':
        console.log('Payment expired:', event.data.id);
        // TODO: Nettoyer la commande expirée
        break;

      default:
        console.log('Unhandled event type:', event.type);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ 
      message: 'Webhook error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
