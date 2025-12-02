import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config({ path: '.env.local' });

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log('🔧 Conectando a Firebase...');
console.log('   Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function deleteEmptyProducts() {
    console.log('🔍 Buscando productos sin nombre...\n');
    
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    
    const toDelete = [];
    
    snapshot.docs.forEach(docSnapshot => {
        const data = docSnapshot.data();
        // Si no tiene 'original' o está vacío
        if (!data.original || data.original.trim() === '') {
            toDelete.push(docSnapshot.id);
        }
    });
    
    console.log(`📊 Total productos sin nombre encontrados: ${toDelete.length}`);
    
    if (toDelete.length === 0) {
        console.log('✅ No hay productos sin nombre para eliminar');
        return;
    }
    
    console.log('\n¿Deseas eliminar estos productos? Eliminando en 3 segundos...\n');
    await new Promise(r => setTimeout(r, 3000));
    
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
    
    console.log(`\n✅ Eliminación completada. ${deleted} productos eliminados.`);
}

deleteEmptyProducts().catch(console.error);
