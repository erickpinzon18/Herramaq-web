import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export async function POST() {
  try {
    console.log("🔍 Buscando marcas duplicadas...");

    const brandsRef = collection(db, "brands");
    const snapshot = await getDocs(brandsRef);

    // Agrupar por nombre normalizado
    const brandsByName = new Map<
      string,
      { id: string; name: string; productCount: number }[]
    >();

    snapshot.docs.forEach((docSnap) => {
      const data = docSnap.data();
      const normalized = (data.name || docSnap.id).toUpperCase().trim();

      if (!brandsByName.has(normalized)) {
        brandsByName.set(normalized, []);
      }
      brandsByName.get(normalized)!.push({
        id: docSnap.id,
        name: data.name || docSnap.id,
        productCount: data.productCount || 0,
      });
    });

    // Encontrar duplicados y eliminar
    const duplicates: string[] = [];
    const kept: string[] = [];

    for (const [normalized, brands] of brandsByName.entries()) {
      if (brands.length > 1) {
        console.log(
          `⚠️ Duplicados encontrados para "${normalized}": ${brands.length} registros`
        );

        // Ordenar por productCount descendente, mantener el que tenga más productos
        brands.sort((a, b) => (b.productCount || 0) - (a.productCount || 0));

        // Mantener el primero (mayor productCount), eliminar el resto
        kept.push(brands[0].id);

        for (let i = 1; i < brands.length; i++) {
          duplicates.push(brands[i].id);
          await deleteDoc(doc(db, "brands", brands[i].id));
          console.log(
            `🗑️ Eliminado duplicado: ${brands[i].id} (${brands[i].productCount} productos)`
          );
        }
      }
    }

    console.log(
      `✅ Limpieza completada: ${duplicates.length} duplicados eliminados`
    );

    return NextResponse.json({
      success: true,
      message: `Se eliminaron ${duplicates.length} marcas duplicadas`,
      duplicatesRemoved: duplicates,
      brandsKept: kept,
      totalBrandsNow: snapshot.docs.length - duplicates.length,
    });
  } catch (error) {
    console.error("Error limpiando duplicados:", error);
    return NextResponse.json(
      { success: false, error: "Error al limpiar duplicados" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log("🔍 Analizando marcas duplicadas (sin eliminar)...");

    const brandsRef = collection(db, "brands");
    const snapshot = await getDocs(brandsRef);

    // Agrupar por nombre normalizado
    const brandsByName = new Map<
      string,
      { id: string; name: string; productCount: number }[]
    >();

    snapshot.docs.forEach((docSnap) => {
      const data = docSnap.data();
      const normalized = (data.name || docSnap.id).toUpperCase().trim();

      if (!brandsByName.has(normalized)) {
        brandsByName.set(normalized, []);
      }
      brandsByName.get(normalized)!.push({
        id: docSnap.id,
        name: data.name || docSnap.id,
        productCount: data.productCount || 0,
      });
    });

    // Encontrar duplicados
    const duplicates: { name: string; count: number; ids: string[] }[] = [];

    for (const [normalized, brands] of brandsByName.entries()) {
      if (brands.length > 1) {
        duplicates.push({
          name: normalized,
          count: brands.length,
          ids: brands.map((b) => b.id),
        });
      }
    }

    return NextResponse.json({
      success: true,
      totalBrands: snapshot.docs.length,
      duplicateGroups: duplicates.length,
      duplicates,
      message:
        duplicates.length > 0
          ? `Encontrados ${duplicates.length} grupos de duplicados. Usa POST para eliminarlos.`
          : "No se encontraron duplicados.",
    });
  } catch (error) {
    console.error("Error analizando duplicados:", error);
    return NextResponse.json(
      { success: false, error: "Error al analizar duplicados" },
      { status: 500 }
    );
  }
}
