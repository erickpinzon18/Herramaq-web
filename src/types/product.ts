// --- Tipos de Producto ---

export interface FirebaseProduct {
    id: string;
    atributos?: string[];
    createdAt?: { seconds: number; nanoseconds: number } | null;
    marca?: string;
    medidas?: string[];
    modelo?: string;
    original?: string;
    tipo?: string;
    updatedAt?: { seconds: number; nanoseconds: number } | null;
    images?: Array<{ url: string }>;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    imageUrl: string;
    images: string[];
    specs: {
        atributos?: string[];
        medidas?: string[];
        tipo?: string;
    };
    inStock: boolean;
    modelo?: string;
}

export interface ProductCardProps {
    product: Product;
    onViewDetails: (product: Product) => void;
}

export interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}
