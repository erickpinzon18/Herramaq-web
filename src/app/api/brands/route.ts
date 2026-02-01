import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

// GET - Obtener todas las marcas
export async function GET() {
  try {
    const brandsRef = collection(db, "brands");
    const q = query(brandsRef, orderBy("productCount", "desc"));
    const snapshot = await getDocs(q);

    const brands = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(
      {
        success: true,
        totalBrands: brands.length,
        brands,
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Error obteniendo marcas:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error obteniendo marcas",
      },
      { status: 500 }
    );
  }
}

// POST - Actualizar logo de una marca
export async function POST(request: Request) {
  try {
    const { brandId, logoUrl } = await request.json();

    if (!brandId) {
      return NextResponse.json(
        {
          success: false,
          error: "brandId es requerido",
        },
        { status: 400 }
      );
    }

    const brandRef = doc(db, "brands", brandId);

    await updateDoc(brandRef, {
      logoUrl: logoUrl || "",
      updatedAt: Timestamp.now(),
    });

    return NextResponse.json({
      success: true,
      message: `Logo actualizado para ${brandId}`,
    });
  } catch (error) {
    console.error("Error actualizando logo:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error actualizando logo",
      },
      { status: 500 }
    );
  }
}
