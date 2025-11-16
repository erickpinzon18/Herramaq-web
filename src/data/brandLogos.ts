// Diccionario de logos de marcas
// 
// INSTRUCCIONES:
// 1. Ejecuta: http://localhost:3000/api/get-all-brands
// 2. Copia el objeto "brandLogosObject" de la respuesta
// 3. Pega el contenido aquí abajo reemplazando las marcas de ejemplo
// 4. Descarga los logos y colócalos en /public/logos/
// 5. Actualiza las URLs de logoUrl con las rutas correctas

export interface BrandLogo {
    name: string;
    logoUrl: string;
    website?: string;
}


/**
 * Obtiene el logo de una marca
 * @param brandName - Nombre de la marca
 * @returns URL del logo de la marca o string vacío si no tiene logo
 */
export const getBrandLogo = (brandName: string): string => {
    if (!brandName || brandName === 'Sin marca' || brandName === 'GENÉRICA') {
        return '';
    }
    
    // Normalizar el nombre de la marca (mayúsculas, sin espacios extras)
    const normalizedBrand = brandName.trim().toUpperCase();
    
    // Buscar coincidencia exacta
    if (brandLogos[normalizedBrand]) {
        return brandLogos[normalizedBrand].logoUrl;
    }
    
    // Buscar coincidencia parcial (por si tiene espacios o variaciones)
    const partialMatch = Object.keys(brandLogos).find(key => 
        key !== 'DEFAULT' && (key.includes(normalizedBrand) || normalizedBrand.includes(key))
    );
    
    if (partialMatch) {
        return brandLogos[partialMatch].logoUrl;
    }
    
    // Si no hay coincidencia, retornar string vacío
    return '';
};

/**
 * Obtiene información completa de una marca
 * @param brandName - Nombre de la marca
 * @returns Información de la marca o datos por defecto
 */
export const getBrandInfo = (brandName: string): BrandLogo => {
    if (!brandName || brandName === 'Sin marca' || brandName === 'GENÉRICA') {
        return brandLogos['DEFAULT'];
    }
    
    const normalizedBrand = brandName.trim().toUpperCase();
    
    if (brandLogos[normalizedBrand]) {
        return brandLogos[normalizedBrand];
    }
    
    const partialMatch = Object.keys(brandLogos).find(key => 
        key.includes(normalizedBrand) || normalizedBrand.includes(key)
    );
    
    if (partialMatch && partialMatch !== 'DEFAULT') {
        return brandLogos[partialMatch];
    }
    
    return {
        name: brandName,
        logoUrl: brandLogos['DEFAULT'].logoUrl,
        website: ''
    };
};

/**
 * Obtiene todas las marcas disponibles en el diccionario
 * @returns Array con nombres de todas las marcas (excepto DEFAULT)
 */
export const getAllBrands = (): string[] => {
    return Object.keys(brandLogos).filter(brand => brand !== 'DEFAULT');
};

/**
 * Verifica si una marca tiene logo configurado
 * @param brandName - Nombre de la marca
 * @returns true si la marca tiene logo configurado, false en caso contrario
 */
export const hasBrandLogo = (brandName: string): boolean => {
    if (!brandName || brandName === 'Sin marca' || brandName === 'GENÉRICA') {
        return false;
    }
    
    const normalizedBrand = brandName.trim().toUpperCase();
    return brandLogos[normalizedBrand] !== undefined;
};


export const brandLogos: Record<string, BrandLogo> = {
    'GENÉRICO': {
        name: 'GENÉRICO',
        logoUrl: '',
        website: ''
        // 760 productos
    },
    'CLEVELAND': {
        name: 'CLEVELAND',
        logoUrl: 'https://image.jimcdn.com/app/cms/image/transf/none/path/s46d81afa783674fe/image/ia532dd2ee2116af2/version/1636852387/image.png',
        website: ''
        // 684 productos
    },
    'TMX': {
        name: 'TMX',
        logoUrl: 'https://hvhindustrial.com/images/frontend_images/brands/1762146547toolmex-tmx-logo-new.png',
        website: ''
        // 576 productos
    },
    'ROYCO': {
        name: 'ROYCO',
        logoUrl: 'https://carburoycobalto.mx/wp-content/uploads/2020/04/OSGROYCO-300x300.png',
        website: ''
        // 404 productos
    },
    'AUSTROMEX': {
        name: 'AUSTROMEX',
        logoUrl: 'https://todoferreteria.com.mx/wp-content/uploads/2017/06/Austromex.png',
        website: ''
        // 300 productos
    },
    'VERTEX': {
        name: 'VERTEX',
        logoUrl: 'https://tradetoolscia.com.pe/wp-content/uploads/2025/05/LOGO-VERTEX-1024x339.png',
        website: ''
        // 228 productos
    },
    'MASTER-C': {
        name: 'MASTER-C',
        logoUrl: 'https://www.cmaster.mx/wp-content/uploads/2022/12/Logo-CMaster.png',
        website: ''
        // 216 productos
    },
    'TENAZIT': {
        name: 'TENAZIT',
        logoUrl: 'https://www.austromex.com.mx/austromex/marca/tenazit.png',
        website: ''
        // 211 productos
    },
    'TIALN': {
        name: 'TIALN',
        logoUrl: '',
        website: ''
        // 192 productos
    },
    'BONDHUS': {
        name: 'BONDHUS',
        logoUrl: 'https://hausoftools.com/cdn/shop/articles/Bondhus_logo_720x.png?v=1540413976',
        website: ''
        // 116 productos
    },
    'BISON': {
        name: 'BISON',
        logoUrl: 'https://www.bison.com.mx/assets/img/bison.png',
        website: ''
        // 112 productos
    },
    'VOLKEL': {
        name: 'VOLKEL',
        logoUrl: 'https://ce8dc832c.cloudimg.io/v7/_cs_/2021/06/60b5ce3b78c3c/volkel_logo.png?ci_sign=3b55b83d1f494cee10d4d3493b8b5dc52fde0aa4',
        website: ''
        // 91 productos
    },
    'INSIZE': {
        name: 'INSIZE',
        logoUrl: 'https://www.miasa.com.mx/wp-content/uploads/2017/02/16-3-e1572547904251.jpg',
        website: ''
        // 85 productos
    },
    'FENES': {
        name: 'FENES',
        logoUrl: 'https://comercialtmch.cl/img/qs/fenes.png',
        website: ''
        // 78 productos
    },
    'USA': {
        name: 'USA',
        logoUrl: '',
        website: ''
        // 76 productos
    },
    'IZAR': {
        name: 'IZAR',
        logoUrl: 'https://www.niagara-solution-provider.store/fileadmin/bilder/logo/tridium/Logo--Niagara_4--EPS1.png',
        website: ''
        // 75 productos
    },
    'MITUTOYO': {
        name: 'MITUTOYO',
        logoUrl: 'https://fesepsa.com.pe/wp-content/uploads/2023/05/1.-Mitutoyo-Logo-en-PNG.png',
        website: ''
        // 72 productos
    },
    'NIAGARA': {
        name: 'NIAGARA',
        logoUrl: 'https://honeywell.scene7.com/is/image/honeywell/powered%20by%20niagara%20framework-transparent%20logo',
        website: ''
        // 71 productos
    },
    'URREA': {
        name: 'URREA',
        logoUrl: 'https://0201.nccdn.net/1_2/000/000/0ac/784/png_urrea.png',
        website: ''
        // 64 productos
    },
    'GREENFIELD': {
        name: 'GREENFIELD',
        logoUrl: 'https://www.herramientasacz.com.mx/image/cache/data/GREENFIELD-200x200.jpg',
        website: ''
        // 62 productos
    },
    'LENOX': {
        name: 'LENOX',
        logoUrl: 'https://www.lenoxhr.com/wp-content/uploads/2022/03/lenox-logo.png',
        website: ''
        // 60 productos
    },
    'NICHOLSON': {
        name: 'NICHOLSON',
        logoUrl: 'https://sigasa.com.mx/cdn/shop/collections/Nicholson_Logo_283x142.jpg?v=1462381098',
        website: ''
        // 54 productos
    },
    'DREMEL': {
        name: 'DREMEL',
        logoUrl: 'https://www.dremel.com/images/dremel-logo--baafa617e8f24f53ae1f4a8e3a5a9e61.png?imgWidth=800&scale=1',
        website: ''
        // 50 productos
    },
    'CALMET': {
        name: 'CALMET',
        logoUrl: 'https://www.calmet.com.pl/images/szablon/calmet-smart-calibration-devices-logo.png',
        website: ''
        // 48 productos
    },
    'INCOR': {
        name: 'INCOR',
        logoUrl: 'https://www.herramientasacz.com.mx/image/cache/data/INCOR-600x315.jpg',
        website: ''
        // 47 productos
    },
    'NACHI': {
        name: 'NACHI',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Nachi-Fujikoshi_Corp._Logo.svg/2560px-Nachi-Fujikoshi_Corp._Logo.svg.png',
        website: ''
        // 43 productos
    },
    'TRAUB': {
        name: 'TRAUB',
        logoUrl: 'https://cdn.cncmachines.com/logos/brand-logos/1662689204160',
        website: ''
        // 43 productos
    },
    'DESTACO': {
        name: 'DESTACO',
        logoUrl: 'https://herramientasserra.com.mx/wp-content/uploads/2018/03/DESTACO-2c-1024x258.png',
        website: ''
        // 37 productos
    },
    'FANDELI': {
        name: 'FANDELI',
        logoUrl: 'https://ferreteraermita.com.mx/wp-content/uploads/2016/03/fandeli-logo.jpg',
        website: ''
        // 37 productos
    },
    'LOC-LINE': {
        name: 'LOC-LINE',
        logoUrl: 'https://store.tannerherramientas.com/website/image/product.brand/95/logo',
        website: ''
        // 36 productos
    },
    'POLAND': {
        name: 'POLAND',
        logoUrl: '',
        website: ''
        // 35 productos
    },
    'P&B': {
        name: 'P&B',
        logoUrl: '',
        website: ''
        // 33 productos
    },
    'JACOBS': {
        name: 'JACOBS',
        logoUrl: 'https://store.tannerherramientas.com/website/image/product.brand/61/logo',
        website: ''
        // 31 productos
    },
    'YG': {
        name: 'YG',
        logoUrl: 'https://store.tannerherramientas.com/website/image/product.brand/45/logo',
        website: ''
        // 30 productos
    },
    'FANDHER': {
        name: 'FANDHER',
        logoUrl: 'https://store.tannerherramientas.com/website/image/product.brand/111/logo',
        website: ''
        // 28 productos
    },
    'Y&B': {
        name: 'Y&B',
        logoUrl: '',
        website: ''
        // 24 productos
    },
    'MA-FORD': {
        name: 'MA-FORD',
        logoUrl: 'https://hertool.com.mx/wp-content/uploads/2017/04/MAFord.png',
        website: ''
        // 23 productos
    },
    'BOSCH': {
        name: 'BOSCH',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Bosch_logo.png',
        website: ''
        // 22 productos
    },
    'LMT': {
        name: 'LMT',
        logoUrl: 'https://getlogovector.com/wp-content/uploads/2020/04/lmt-tools-logo-vector.png',
        website: ''
        // 21 productos
    },
    'NOGA': {
        name: 'NOGA',
        logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDo5lBasl2quKnB60Sy1d2ma8ous-W_Ed4Ow&s',
        website: ''
        // 21 productos
    },
    'BRICK': {
        name: 'BRICK',
        logoUrl: '',
        website: ''
        // 18 productos
    },
    'FELO': {
        name: 'FELO',
        logoUrl: '',
        website: ''
        // 17 productos
    },
    'STARRETT': {
        name: 'STARRETT',
        logoUrl: 'https://hecortindustrial.com/wp-content/uploads/2024/12/logo-starret.png',
        website: ''
        // 17 productos
    },
    'GLOBUS': {
        name: 'GLOBUS',
        logoUrl: 'https://www.touramerica.ie/wp-content/uploads/2022/12/globus-logo.png',
        website: ''
        // 17 productos
    },
    'HY-PRO': {
        name: 'HY-PRO',
        logoUrl: '',
        website: ''
        // 16 productos
    },
    'REGAL': {
        name: 'REGAL',
        logoUrl: '',
        website: ''
        // 15 productos
    },
    'GUANGLU': {
        name: 'GUANGLU',
        logoUrl: '',
        website: ''
        // 15 productos
    },
    '3M': {
        name: '3M',
        logoUrl: '',
        website: ''
        // 13 productos
    },
    'WEILER': {
        name: 'WEILER',
        logoUrl: '',
        website: ''
        // 12 productos
    },
    'PALBIT': {
        name: 'PALBIT',
        logoUrl: '',
        website: ''
        // 11 productos
    },
    'CABEL': {
        name: 'CABEL',
        logoUrl: '',
        website: ''
        // 10 productos
    },
    'IZARTOOL': {
        name: 'IZARTOOL',
        logoUrl: 'https://www.metalia.es/data/empresas/Izar/imgs/Logo.jpg',
        website: ''
        // 10 productos
    },
    'OSG': {
        name: 'OSG',
        logoUrl: '',
        website: ''
        // 10 productos
    },
    'TTC': {
        name: 'TTC',
        logoUrl: '',
        website: ''
        // 9 productos
    },
    'KEO': {
        name: 'KEO',
        logoUrl: '',
        website: ''
        // 9 productos
    },
    'EDGE': {
        name: 'EDGE',
        logoUrl: '',
        website: ''
        // 9 productos
    },
    'COBRA-C': {
        name: 'COBRA-C',
        logoUrl: '',
        website: ''
        // 8 productos
    },
    'MOLDEX': {
        name: 'MOLDEX',
        logoUrl: '',
        website: ''
        // 8 productos
    },
    'DORMER': {
        name: 'DORMER',
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/dormer.svg',
        website: ''
        // 8 productos
    },
    'SATURNO': {
        name: 'SATURNO',
        logoUrl: '',
        website: ''
        // 8 productos
    },
    'STARRET': {
        name: 'STARRET',
        logoUrl: '',
        website: ''
        // 8 productos
    },
    'FENNES': {
        name: 'FENNES',
        logoUrl: '',
        website: ''
        // 8 productos
    },
    'TUNGALOY': {
        name: 'TUNGALOY',
        logoUrl: '',
        website: ''
        // 8 productos
    },
    'VISE-GRIP': {
        name: 'VISE-GRIP',
        logoUrl: '',
        website: ''
        // 8 productos
    },
    'TULMEX': {
        name: 'TULMEX',
        logoUrl: '',
        website: ''
        // 8 productos
    },
    'OSG-ROYCO': {
        name: 'OSG-ROYCO',
        logoUrl: 'https://carburoycobalto.mx/wp-content/uploads/2020/04/OSGROYCO-300x300.png',
        website: ''
        // 7 productos
    },
    'MASTER-CUT': {
        name: 'MASTER-CUT',
        logoUrl: '',
        website: ''
        // 7 productos
    },
    'MICRO-100': {
        name: 'MICRO-100',
        logoUrl: 'https://store.tannerherramientas.com/website/image/product.brand/139/logo',
        website: ''
        // 7 productos
    },
    'SHAVIV': {
        name: 'SHAVIV',
        logoUrl: '',
        website: ''
        // 6 productos
    },
    'MARKAL': {
        name: 'MARKAL',
        logoUrl: '',
        website: ''
        // 6 productos
    },
    'BOEHLERIT': {
        name: 'BOEHLERIT',
        logoUrl: '',
        website: ''
        // 6 productos
    },
    'GLG': {
        name: 'GLG',
        logoUrl: '',
        website: ''
        // 6 productos
    },
    'ALFRA': {
        name: 'ALFRA',
        logoUrl: '',
        website: ''
        // 6 productos
    },
    'BESSEY': {
        name: 'BESSEY',
        logoUrl: '',
        website: ''
        // 6 productos
    },
    'JYRSA': {
        name: 'JYRSA',
        logoUrl: '',
        website: ''
        // 6 productos
    },
    'WINCO': {
        name: 'WINCO',
        logoUrl: '',
        website: ''
        // 6 productos
    },
    'DERMA-C': {
        name: 'DERMA-C',
        logoUrl: '',
        website: ''
        // 6 productos
    },
    'MILWAUKEE': {
        name: 'MILWAUKEE',
        logoUrl: '',
        website: ''
        // 6 productos
    },
    'FORZA': {
        name: 'FORZA',
        logoUrl: '',
        website: ''
        // 5 productos
    },
    'REGIA': {
        name: 'REGIA',
        logoUrl: '',
        website: ''
        // 5 productos
    },
    'TAP-MAGIC': {
        name: 'TAP-MAGIC',
        logoUrl: '',
        website: ''
        // 5 productos
    },
    'TENFLEX': {
        name: 'TENFLEX',
        logoUrl: '',
        website: ''
        // 5 productos
    },
    'COLLET': {
        name: 'COLLET',
        logoUrl: '',
        website: ''
        // 5 productos
    },
    'BORIDE': {
        name: 'BORIDE',
        logoUrl: '',
        website: ''
        // 5 productos
    },
    'VALLORBE': {
        name: 'VALLORBE',
        logoUrl: '',
        website: ''
        // 5 productos
    },
    'HYPRO': {
        name: 'HYPRO',
        logoUrl: '',
        website: ''
        // 5 productos
    },
    'STANLEY': {
        name: 'STANLEY',
        logoUrl: '',
        website: ''
        // 4 productos
    },
    'LFA': {
        name: 'LFA',
        logoUrl: '',
        website: ''
        // 4 productos
    },
    'VICE-GRIP': {
        name: 'VICE-GRIP',
        logoUrl: '',
        website: ''
        // 4 productos
    },
    'NEMESIS': {
        name: 'NEMESIS',
        logoUrl: '',
        website: ''
        // 4 productos
    },
    'SHOWA': {
        name: 'SHOWA',
        logoUrl: '',
        website: ''
        // 4 productos
    },
    'CRAFTSMAN': {
        name: 'CRAFTSMAN',
        logoUrl: '',
        website: ''
        // 4 productos
    },
    'HANSON': {
        name: 'HANSON',
        logoUrl: '',
        website: ''
        // 4 productos
    },
    'TOOLMEX': {
        name: 'TOOLMEX',
        logoUrl: '',
        website: ''
        // 4 productos
    },
    'TENEZIT': {
        name: 'TENEZIT',
        logoUrl: '',
        website: ''
        // 4 productos
    },
    'ARF': {
        name: 'ARF',
        logoUrl: '',
        website: ''
        // 4 productos
    },
    'BESDIA': {
        name: 'BESDIA',
        logoUrl: '',
        website: ''
        // 4 productos
    },
    'CORRADI': {
        name: 'CORRADI',
        logoUrl: '',
        website: ''
        // 4 productos
    },
    'GROZ': {
        name: 'GROZ',
        logoUrl: '',
        website: ''
        // 4 productos
    },
    'MARAGA': {
        name: 'MARAGA',
        logoUrl: '',
        website: ''
        // 4 productos
    },
    'DERMA-CARE': {
        name: 'DERMA-CARE',
        logoUrl: '',
        website: ''
        // 3 productos
    },
    'SANDFLEX': {
        name: 'SANDFLEX',
        logoUrl: '',
        website: ''
        // 3 productos
    },
    'WIHA': {
        name: 'WIHA',
        logoUrl: '',
        website: ''
        // 3 productos
    },
    'CHICAGO-LATROBE': {
        name: 'CHICAGO-LATROBE',
        logoUrl: '',
        website: ''
        // 3 productos
    },
    'CINASA': {
        name: 'CINASA',
        logoUrl: '',
        website: ''
        // 3 productos
    },
    'RADIANS': {
        name: 'RADIANS',
        logoUrl: '',
        website: ''
        // 3 productos
    },
    'WURTH': {
        name: 'WURTH',
        logoUrl: '',
        website: ''
        // 3 productos
    },
    'SANDVIK': {
        name: 'SANDVIK',
        logoUrl: '',
        website: ''
        // 3 productos
    },
    'GESSWEIN': {
        name: 'GESSWEIN',
        logoUrl: 'https://www.floodsupply.com/wp-content/uploads/2019/01/manufacturer-gesswein-logo.jpg',
        website: ''
        // 3 productos
    },
    'KOREA': {
        name: 'KOREA',
        logoUrl: '',
        website: ''
        // 3 productos
    },
    'BULLDOG': {
        name: 'BULLDOG',
        logoUrl: '',
        website: ''
        // 3 productos
    },
    'GEAR-WRENCH': {
        name: 'GEAR-WRENCH',
        logoUrl: '',
        website: ''
        // 3 productos
    },
    'HENKEL': {
        name: 'HENKEL',
        logoUrl: '',
        website: ''
        // 3 productos
    },
    'KORLOY': {
        name: 'KORLOY',
        logoUrl: '',
        website: ''
        // 3 productos
    },
    'DYKEM': {
        name: 'DYKEM',
        logoUrl: '',
        website: ''
        // 3 productos
    },
    'GEARWRENCH': {
        name: 'GEARWRENCH',
        logoUrl: '',
        website: ''
        // 3 productos
    },
    'IRWIN': {
        name: 'IRWIN',
        logoUrl: '',
        website: ''
        // 3 productos
    },
    'ACESA': {
        name: 'ACESA',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'INFRA': {
        name: 'INFRA',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'NU-TREAD': {
        name: 'NU-TREAD',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'DIAGER': {
        name: 'DIAGER',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'ROYCO-HYPRO': {
        name: 'ROYCO-HYPRO',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'PLY-50': {
        name: 'PLY-50',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'ZCCCT': {
        name: 'ZCCCT',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'OTMT': {
        name: 'OTMT',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'SURTEK': {
        name: 'SURTEK',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'HOUT': {
        name: 'HOUT',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'WESTON': {
        name: 'WESTON',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'MSA': {
        name: 'MSA',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'AUSTRODIAM': {
        name: 'AUSTRODIAM',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'SHINWA': {
        name: 'SHINWA',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'KARLEN': {
        name: 'KARLEN',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'BRITE-MARK': {
        name: 'BRITE-MARK',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'SANTUL': {
        name: 'SANTUL',
        logoUrl: 'https://www.expercom.mx/storage/images/brand/ai5DauuDTQIhIWSX8agiLDarnnu1FBK5VxzHPYln.png',
        website: ''
        // 2 productos
    },
    'TYROLIT': {
        name: 'TYROLIT',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'KIPP': {
        name: 'KIPP',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'PROTO': {
        name: 'PROTO',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'FOWLER': {
        name: 'FOWLER',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'TUK': {
        name: 'TUK',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'DISSTON': {
        name: 'DISSTON',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'EXTECH': {
        name: 'EXTECH',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'GOLD-P': {
        name: 'GOLD-P',
        logoUrl: '',
        website: ''
        // 2 productos
    },
    'PIP': {
        name: 'PIP',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'LODESTAR': {
        name: 'LODESTAR',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'LLAMBRICH': {
        name: 'LLAMBRICH',
        logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQXvd4CD0razacwH_LQLG9hfIFTGbf0IBEcQ&s',
        website: ''
        // 1 productos
    },
    'PFERD': {
        name: 'PFERD',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'HUM': {
        name: 'HUM',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'MEILER': {
        name: 'MEILER',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'SOLA': {
        name: 'SOLA',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'WILTON': {
        name: 'WILTON',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'PERMATEX': {
        name: 'PERMATEX',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'IRIMO': {
        name: 'IRIMO',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'UNIBIT': {
        name: 'UNIBIT',
        logoUrl: 'https://www.goldenstatelumber.com/wp-content/uploads/2020/10/irwin-tools-logo-color_500px.png',
        website: ''
        // 1 productos
    },
    'T&O': {
        name: 'T&O',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'KLINGSPOR': {
        name: 'KLINGSPOR',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'JOINVILLE': {
        name: 'JOINVILLE',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'PENTEL': {
        name: 'PENTEL',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'SHOOWA': {
        name: 'SHOOWA',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'MITSUBISHI': {
        name: 'MITSUBISHI',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'MAPA': {
        name: 'MAPA',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'KLEIN-TOOLS': {
        name: 'KLEIN-TOOLS',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'TRUEBLUE': {
        name: 'TRUEBLUE',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'ARMSTRONG': {
        name: 'ARMSTRONG',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'TMX-POLAND': {
        name: 'TMX-POLAND',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'DEWALT': {
        name: 'DEWALT',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'DIXI': {
        name: 'DIXI',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'SOBA': {
        name: 'SOBA',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'DALO': {
        name: 'DALO',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'L-GOLDEN': {
        name: 'L-GOLDEN',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'DIACAR': {
        name: 'DIACAR',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'HECORT': {
        name: 'HECORT',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'SINO': {
        name: 'SINO',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'GROZZ': {
        name: 'GROZZ',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'MAG-LITE': {
        name: 'MAG-LITE',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'STACK-ON': {
        name: 'STACK-ON',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'MAG-MET': {
        name: 'MAG-MET',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'GARANT': {
        name: 'GARANT',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'POWER-GRIP': {
        name: 'POWER-GRIP',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'ROYCO-HY-PRO': {
        name: 'ROYCO-HY-PRO',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'RATAN': {
        name: 'RATAN',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'INDICOL': {
        name: 'INDICOL',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'OKILA': {
        name: 'OKILA',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'SCHRADER': {
        name: 'SCHRADER',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'MAKITA': {
        name: 'MAKITA',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'WIKUS': {
        name: 'WIKUS',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'EXCEL': {
        name: 'EXCEL',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'TUFF': {
        name: 'TUFF',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'WOODRUFF': {
        name: 'WOODRUFF',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'JW-WINCO': {
        name: 'JW-WINCO',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'LISLE': {
        name: 'LISLE',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'KEY-BAK': {
        name: 'KEY-BAK',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'CREWS': {
        name: 'CREWS',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'BRUBAKER': {
        name: 'BRUBAKER',
        logoUrl: 'https://www.floodsupply.com/wp-content/uploads/2019/01/manufacturer-brubaker-tool-logo.jpg',
        website: ''
        // 1 productos
    },
    'TESA': {
        name: 'TESA',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'JACOBBS': {
        name: 'JACOBBS',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'GIMBEL': {
        name: 'GIMBEL',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'FATPOL': {
        name: 'FATPOL',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'SIMONS': {
        name: 'SIMONS',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'COBRA-CARBIDE': {
        name: 'COBRA-CARBIDE',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'NU-TRED': {
        name: 'NU-TRED',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'TOOLCRAFT': {
        name: 'TOOLCRAFT',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'MAGNETS SOURCES': {
        name: 'MAGNETS SOURCES',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'VDR': {
        name: 'VDR',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'TRUPER': {
        name: 'TRUPER',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'PROTOO': {
        name: 'PROTOO',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'ROYAL': {
        name: 'ROYAL',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'LMT-FETTE': {
        name: 'LMT-FETTE',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'LEDLENSER': {
        name: 'LEDLENSER',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'HI-POWER': {
        name: 'HI-POWER',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'EASY-CUT': {
        name: 'EASY-CUT',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'KENNAMETAL': {
        name: 'KENNAMETAL',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'W-40': {
        name: 'W-40',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'PICK-LITE': {
        name: 'PICK-LITE',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'AMBIDERM': {
        name: 'AMBIDERM',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'SWANSON': {
        name: 'SWANSON',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'VERMONT': {
        name: 'VERMONT',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'GOODYEAR': {
        name: 'GOODYEAR',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'FENEX': {
        name: 'FENEX',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'HYPRO-ROYCO': {
        name: 'HYPRO-ROYCO',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'BEST': {
        name: 'BEST',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'SLUGGER': {
        name: 'SLUGGER',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'NISSEN': {
        name: 'NISSEN',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'AMANA': {
        name: 'AMANA',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'CRAWFORD': {
        name: 'CRAWFORD',
        logoUrl: 'https://web-files.crawco.com/extranet/branding/PNG/Crawford/Final_Crawford_Logo_287C_6.13.png',
        website: ''
        // 1 productos
    },
    'PALMERA': {
        name: 'PALMERA',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'GUAN-GLU': {
        name: 'GUAN-GLU',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'CRUCELEGUI': {
        name: 'CRUCELEGUI',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'HOWARD': {
        name: 'HOWARD',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    'DIAGUER': {
        name: 'DIAGUER',
        logoUrl: '',
        website: ''
        // 1 productos
    },
    // Logo por defecto para marcas sin logo específico
    'DEFAULT': {
        name: 'DEFAULT',
        logoUrl: 'https://placehold.co/200x80/1e3a8a/ffffff?text=Logo',
        website: ''
    }
};