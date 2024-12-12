export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image_url: string;
    created_at?: string;
    category?: string;
    is_available?: boolean;
    metadata?: any;
    slug?: string;
    dimensions?: string;
    material?: string;
    care_instructions?: string;
}
