/**
 * Script para obtener todas las marcas únicas de Firebase
 * 
 * Este script te ayudará a saber qué marcas tienes en tu base de datos
 * para que puedas agregar sus logos en brandLogos.ts
 * 
 * Para ejecutar:
 * 1. Copia este código en la consola del navegador cuando estés en tu app
 * 2. O agrégalo temporalmente a alguna página y ejecútalo
 */

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function getAllUniqueBrands(): Promise<string[]> {
    try {
        console.log('🔍 Obteniendo todas las marcas de Firebase...');
        
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);
        
        const brands = new Set<string>();
        
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            if (data.marca && data.marca !== 'GENÉRICA') {
                brands.add(data.marca);
            }
        });
        
        const sortedBrands = Array.from(brands).sort();
        
        console.log('✅ Marcas únicas encontradas:', sortedBrands.length);
        console.log('📋 Lista de marcas:');
        sortedBrands.forEach((brand, index) => {
            console.log(`${index + 1}. ${brand}`);
        });
        
        // Generar código para copiar a brandLogos.ts
        console.log('\n📝 Código para agregar a brandLogos.ts:');
        console.log('// Copia esto en brandLogos.ts:\n');
        
        sortedBrands.forEach(brand => {
            const normalizedBrand = brand.toUpperCase();
            console.log(`'${normalizedBrand}': {
    name: '${brand}',
    logoUrl: '/logos/${brand.toLowerCase().replace(/\s+/g, '-')}.png',
    website: ''
},`);
        });
        
        return sortedBrands;
    } catch (error) {
        console.error('❌ Error obteniendo marcas:', error);
        return [];
    }
}

// Para usar en la consola del navegador o en un componente temporal:
// import { getAllUniqueBrands } from '@/utils/getBrands';
// getAllUniqueBrands();
