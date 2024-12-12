/**
 * Représente un produit dans la boutique
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Props pour les pages de produits
 */
export interface ProductPageProps {
  product: Product;
  relatedProducts?: Product[];
}
