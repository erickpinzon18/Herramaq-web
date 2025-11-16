import { QueryDocumentSnapshot } from 'firebase/firestore';
import { Product, FirebaseProduct } from '@/types/product';

// Convertir producto de Firebase al formato de la UI
export const convertFirebaseProduct = (doc: QueryDocumentSnapshot): Product => {
    const data = doc.data() as FirebaseProduct;
    const brand = data.marca || 'Sin marca';
    const tipo = data.tipo || 'Herramienta';
    
    // Extraer URLs de imágenes desde Firebase
    const firebaseImages = data.images?.map(img => img.url).filter(url => url) || [];
    const placeholderImage = `https://placehold.co/600x600/1e3a8a/ffffff?text=${encodeURIComponent(tipo)}`;
    
    // Si hay imágenes reales, usarlas; de lo contrario, usar placeholder
    const images = firebaseImages.length > 0 ? firebaseImages : [placeholderImage];
    
    return {
        id: doc.id,
        name: data.original || 'Producto sin nombre',
        description: `${tipo}${data.modelo ? ` - Modelo: ${data.modelo}` : ''}`,
        category: tipo,
        brand: brand,
        imageUrl: images[0], // Primera imagen como principal
        images: images,
        specs: {
            atributos: data.atributos,
            medidas: data.medidas,
            tipo: tipo,
        },
        inStock: true,
        modelo: data.modelo,
    };
};
