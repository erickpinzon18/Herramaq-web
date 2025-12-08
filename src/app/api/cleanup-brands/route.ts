import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, writeBatch, doc } from 'firebase/firestore';

// Marcas a cambiar a GENÉRICO (quitar marca pero mantener productos)
const BRANDS_TO_GENERIC = [
    'TIALN',
    'MASTER-C',
    'MOLDEX',
    'NIAGARA',
    'USA',
    'POLAND',
    'DORMER',
    'ARF',
    'CRAWFORD',
    'ALFRA',
    'CRUCELEGUI',
];

// Marcas a unificar: { marcaVieja: marcaNueva }
const BRANDS_TO_UNIFY: Record<string, string> = {
    'ROYCO': 'OSG', // Unificar ROYCO -> OSG
};

export async function GET() {
    return NextResponse.json({
        message: 'Script de limpieza de marcas',
        description: 'Usa POST para ejecutar la limpieza',
        brandsToGeneric: BRANDS_TO_GENERIC,
        brandsToUnify: BRANDS_TO_UNIFY,
        note: '✅ Los productos NO se eliminan, solo se cambia la marca a GENÉRICO',
    });
}

export async function POST(request: Request) {
    try {
        const { action, dryRun = true } = await request.json();

        if (action === 'preview') {
            return await previewChanges();
        }

        if (action === 'execute') {
            if (dryRun) {
                return NextResponse.json({
                    error: 'Para ejecutar, envía dryRun: false',
                    message: 'Primero usa action: "preview" para ver los cambios'
                }, { status: 400 });
            }
            return await executeCleanup();
        }

        return NextResponse.json({
            error: 'Acción no válida',
            validActions: ['preview', 'execute'],
            example: {
                preview: { action: 'preview' },
                execute: { action: 'execute', dryRun: false }
            }
        }, { status: 400 });

    } catch (error) {
        console.error('Error en cleanup:', error);
        return NextResponse.json({ error: 'Error en el servidor', details: String(error) }, { status: 500 });
    }
}

async function previewChanges() {
    const productsRef = collection(db, 'products');
    const results: Record<string, { count: number; action: string; sampleProducts: string[] }> = {};

    // Contar productos a cambiar a GENÉRICO
    for (const brand of BRANDS_TO_GENERIC) {
        const q = query(productsRef, where('marca', '==', brand));
        const snapshot = await getDocs(q);
        
        results[brand] = {
            count: snapshot.size,
            action: 'CAMBIAR A GENÉRICO',
            sampleProducts: snapshot.docs.slice(0, 3).map(doc => {
                const data = doc.data();
                return `${doc.id}: ${data.tipo || 'Sin tipo'} - ${data.modelo || 'Sin modelo'}`;
            })
        };
    }

    // Contar productos a unificar
    for (const [oldBrand, newBrand] of Object.entries(BRANDS_TO_UNIFY)) {
        const q = query(productsRef, where('marca', '==', oldBrand));
        const snapshot = await getDocs(q);
        
        results[oldBrand] = {
            count: snapshot.size,
            action: `UNIFICAR -> ${newBrand}`,
            sampleProducts: snapshot.docs.slice(0, 3).map(doc => {
                const data = doc.data();
                return `${doc.id}: ${data.tipo || 'Sin tipo'} - ${data.modelo || 'Sin modelo'}`;
            })
        };
    }

    const totalToGeneric = Object.entries(results)
        .filter(([_, v]) => v.action === 'CAMBIAR A GENÉRICO')
        .reduce((sum, [_, v]) => sum + v.count, 0);

    const totalToUnify = Object.entries(results)
        .filter(([_, v]) => v.action.startsWith('UNIFICAR'))
        .reduce((sum, [_, v]) => sum + v.count, 0);

    return NextResponse.json({
        message: '📋 Vista previa de cambios',
        summary: {
            productosACambiarAGenerico: totalToGeneric,
            productosAUnificar: totalToUnify,
            totalAfectados: totalToGeneric + totalToUnify
        },
        details: results,
        nextStep: 'Para ejecutar, envía POST con { action: "execute", dryRun: false }'
    });
}

async function executeCleanup() {
    const productsRef = collection(db, 'products');
    const results = {
        changedToGeneric: {} as Record<string, number>,
        unified: {} as Record<string, number>,
        errors: [] as string[]
    };

    // Cambiar productos a GENÉRICO (NO eliminar)
    for (const brand of BRANDS_TO_GENERIC) {
        try {
            const q = query(productsRef, where('marca', '==', brand));
            const snapshot = await getDocs(q);
            
            let changedCount = 0;
            let batchCount = 0;
            let batch = writeBatch(db);
            
            for (const docSnapshot of snapshot.docs) {
                batch.update(doc(db, 'products', docSnapshot.id), { marca: 'GENÉRICO' });
                changedCount++;
                batchCount++;
                
                // Firestore batch tiene límite de 500 operaciones
                if (batchCount >= 500) {
                    await batch.commit();
                    batch = writeBatch(db);
                    batchCount = 0;
                    console.log(`🔄 Cambiados ${changedCount} productos de ${brand} -> GENÉRICO`);
                }
            }
            
            // Commit final del batch
            if (batchCount > 0) {
                await batch.commit();
            }
            
            results.changedToGeneric[brand] = changedCount;
            console.log(`✅ ${brand} -> GENÉRICO: ${changedCount} productos actualizados`);
        } catch (error) {
            results.errors.push(`Error cambiando ${brand}: ${String(error)}`);
            console.error(`❌ Error con ${brand}:`, error);
        }
    }

    // Unificar marcas
    for (const [oldBrand, newBrand] of Object.entries(BRANDS_TO_UNIFY)) {
        try {
            const q = query(productsRef, where('marca', '==', oldBrand));
            const snapshot = await getDocs(q);
            
            let unifiedCount = 0;
            let batchCount = 0;
            let batch = writeBatch(db);
            
            for (const docSnapshot of snapshot.docs) {
                batch.update(doc(db, 'products', docSnapshot.id), { marca: newBrand });
                unifiedCount++;
                batchCount++;
                
                // Firestore batch tiene límite de 500 operaciones
                if (batchCount >= 500) {
                    await batch.commit();
                    batch = writeBatch(db);
                    batchCount = 0;
                    console.log(`🔄 Unificados ${unifiedCount} productos de ${oldBrand} -> ${newBrand}`);
                }
            }
            
            // Commit final del batch
            if (batchCount > 0) {
                await batch.commit();
            }
            
            results.unified[`${oldBrand} -> ${newBrand}`] = unifiedCount;
            console.log(`✅ ${oldBrand} -> ${newBrand}: ${unifiedCount} productos unificados`);
        } catch (error) {
            results.errors.push(`Error unificando ${oldBrand}: ${String(error)}`);
            console.error(`❌ Error con ${oldBrand}:`, error);
        }
    }

    const totalChanged = Object.values(results.changedToGeneric).reduce((a, b) => a + b, 0);
    const totalUnified = Object.values(results.unified).reduce((a, b) => a + b, 0);

    return NextResponse.json({
        message: '✅ Limpieza completada',
        summary: {
            productosCambiadosAGenerico: totalChanged,
            productosUnificados: totalUnified,
            errores: results.errors.length
        },
        details: results,
        timestamp: new Date().toISOString()
    });
}
