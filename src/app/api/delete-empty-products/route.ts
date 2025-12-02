import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';

export async function DELETE() {
    try {
        console.log('🔍 Buscando productos sin nombre...');
        
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);
        
        const toDelete: string[] = [];
        
        snapshot.docs.forEach(docSnapshot => {
            const data = docSnapshot.data();
            // Si no tiene 'original' o está vacío
            if (!data.original || data.original.trim() === '') {
                toDelete.push(docSnapshot.id);
            }
        });
        
        console.log(`📊 Total productos sin nombre: ${toDelete.length}`);
        
        if (toDelete.length === 0) {
            return NextResponse.json({ 
                success: true, 
                message: 'No hay productos sin nombre para eliminar',
                deleted: 0 
            });
        }
        
        // Eliminar en lotes de 500 (límite de Firebase)
        const batchSize = 500;
        let deleted = 0;
        
        for (let i = 0; i < toDelete.length; i += batchSize) {
            const batch = writeBatch(db);
            const batchIds = toDelete.slice(i, i + batchSize);
            
            batchIds.forEach(id => {
                batch.delete(doc(db, 'products', id));
            });
            
            await batch.commit();
            deleted += batchIds.length;
            console.log(`🗑️ Eliminados ${deleted}/${toDelete.length}`);
        }
        
        return NextResponse.json({ 
            success: true, 
            message: `Eliminados ${deleted} productos sin nombre`,
            deleted 
        });
        
    } catch (error) {
        console.error('❌ Error eliminando productos:', error);
        return NextResponse.json({ 
            success: false, 
            error: 'Error eliminando productos' 
        }, { status: 500 });
    }
}

// También GET para ver cuántos hay sin eliminar
export async function GET() {
    try {
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);
        
        const emptyProducts: { id: string; marca: string }[] = [];
        
        snapshot.docs.forEach(docSnapshot => {
            const data = docSnapshot.data();
            if (!data.original || data.original.trim() === '') {
                emptyProducts.push({
                    id: docSnapshot.id,
                    marca: data.marca || 'Sin marca'
                });
            }
        });
        
        return NextResponse.json({ 
            total: emptyProducts.length,
            products: emptyProducts.slice(0, 20) // Solo mostrar los primeros 20
        });
        
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}
