import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  setDoc,
  Timestamp,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { brandLogos } from "@/data/brandLogos";

export async function GET() {
  try {
    console.log("🚀 Iniciando migración de marcas a Firestore...");

    const brandsRef = collection(db, "brands");
    const productsRef = collection(db, "products");
    const results: { name: string; status: string; productCount?: number }[] =
      [];

    // Obtener todas las marcas del objeto brandLogos (excepto DEFAULT)
    const brandEntries = Object.entries(brandLogos).filter(
      ([key]) => key !== "DEFAULT"
    );

    console.log(`📋 Encontradas ${brandEntries.length} marcas para migrar`);

    for (const [key, brand] of brandEntries) {
      try {
        // Obtener conteo de productos para esta marca
        const productQuery = query(
          productsRef,
          where("marca", "==", brand.name)
        );
        const countSnapshot = await getCountFromServer(productQuery);
        const productCount = countSnapshot.data().count;

        // Crear documento en colección brands
        const brandDoc = {
          id: key,
          name: brand.name,
          logoUrl: brand.logoUrl || "",
          website: brand.website || "",
          productCount: productCount,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        };

        await setDoc(doc(brandsRef, key), brandDoc);

        results.push({
          name: brand.name,
          status: "success",
          productCount: productCount,
        });

        console.log(`✅ Migrada: ${brand.name} (${productCount} productos)`);
      } catch (error) {
        console.error(`❌ Error migrando ${brand.name}:`, error);
        results.push({
          name: brand.name,
          status: "error",
        });
      }
    }

    const successful = results.filter((r) => r.status === "success").length;
    const failed = results.filter((r) => r.status === "error").length;

    console.log(
      `\n🏁 Migración completada: ${successful} exitosas, ${failed} fallidas`
    );

    return NextResponse.json({
      success: true,
      message: `Migración completada: ${successful} marcas migradas, ${failed} errores`,
      totalBrands: brandEntries.length,
      successful,
      failed,
      results: results.slice(0, 20), // Solo mostrar primeras 20 para no saturar respuesta
    });
  } catch (error) {
    console.error("❌ Error en migración:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error durante la migración",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
