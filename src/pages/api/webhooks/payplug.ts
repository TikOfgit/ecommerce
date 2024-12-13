import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    console.log('Invalid method:', req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const event = req.body;
    console.log('Received PayPlug webhook:', event);

    // Vérifier la signature du webhook (à implémenter)
    // TODO: Ajouter la vérification de la signature

    // Traiter différents types d'événements
    switch (event.type) {
      case 'payment_succeeded':
        console.log('Payment succeeded:', event.data);
        // TODO: Mettre à jour le statut de la commande dans la base de données
        break;
      case 'payment_failed':
        console.log('Payment failed:', event.data);
        // TODO: Gérer l'échec du paiement
        break;
      default:
        console.log('Unhandled event type:', event.type);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ message: 'Webhook error', error: error.message });
  }
}
