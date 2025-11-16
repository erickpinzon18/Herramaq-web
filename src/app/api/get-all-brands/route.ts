import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
    try {
        console.log('🔍 Iniciando búsqueda de todas las marcas...');
        
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);
        
        // Contador de productos por marca
        const brandCount: Record<string, number> = {};
        
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            if (data.marca && data.marca !== 'GENÉRICA' && data.marca !== 'Sin marca') {
                const brand = data.marca;
                brandCount[brand] = (brandCount[brand] || 0) + 1;
            }
        });
        
        // Ordenar marcas por cantidad de productos (mayor a menor)
        const sortedBrandsByCount = Object.entries(brandCount)
            .sort(([, countA], [, countB]) => countB - countA)
            .map(([brand, count]) => ({ brand, count }));
        
        const totalBrands = sortedBrandsByCount.length;
        const totalProducts = Object.values(brandCount).reduce((sum, count) => sum + count, 0);
        
        console.log(`✅ Total marcas únicas encontradas: ${totalBrands}`);
        console.log(`📦 Total productos con marca: ${totalProducts}`);
        console.log('🏆 Top 10 marcas:', sortedBrandsByCount.slice(0, 10));
        
        // Generar objeto para brandLogos.ts ordenado por cantidad
        const brandLogosObject: Record<string, { name: string; logoUrl: string; website: string; productCount: number }> = {};
        
        sortedBrandsByCount.forEach(({ brand, count }) => {
            const normalizedKey = brand.toUpperCase().trim();
            
            brandLogosObject[normalizedKey] = {
                name: brand,
                logoUrl: '',
                website: '',
                productCount: count
            };
        });
        
        return NextResponse.json({
            success: true,
            totalBrands: totalBrands,
            totalProducts: totalProducts,
            brandsByCount: sortedBrandsByCount,
            brandLogosObject: brandLogosObject,
            message: 'Copia el objeto "brandLogosObject" y pégalo en src/data/brandLogos.ts'
        });
        
    } catch (error) {
        console.error('❌ Error obteniendo marcas:', error);
        return NextResponse.json({
            success: false,
            error: 'Error obteniendo marcas',
            details: error
        }, { status: 500 });
    }
}
