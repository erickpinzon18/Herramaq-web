import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

export async function POST(request: Request) {
    try {
        const { brandName, logoUrl } = await request.json();

        if (!brandName || !logoUrl) {
            return NextResponse.json(
                { error: 'Brand name and logo URL are required' },
                { status: 400 }
            );
        }

        // Verificar que la marca existe en la BD
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('marca', '==', brandName), limit(1));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return NextResponse.json(
                { error: 'Brand not found in database' },
                { status: 404 }
            );
        }

        // Devolver instrucciones para actualizar brandLogos.ts
        return NextResponse.json({
            success: true,
            message: 'Add this to your brandLogos.ts file:',
            code: `{
    name: '${brandName}',
    logoUrl: '${logoUrl}',
    website: '',
},`,
            instructions: [
                '1. Open /src/data/brandLogos.ts',
                '2. Find the brandLogos array',
                '3. Add the code above to the array',
                '4. Save the file',
                '5. The logo will appear automatically on the product pages'
            ]
        });
    } catch (error) {
        console.error('Error updating brand logo:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
