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
  if (!brandName || brandName === "Sin marca" || brandName === "GENÉRICA") {
    return "";
  }

  // Normalizar el nombre de la marca (mayúsculas, sin espacios extras)
  const normalizedBrand = brandName.trim().toUpperCase();

  // Buscar coincidencia exacta
  if (brandLogos[normalizedBrand]) {
    return brandLogos[normalizedBrand].logoUrl;
  }

  // Buscar coincidencia parcial (por si tiene espacios o variaciones)
  const partialMatch = Object.keys(brandLogos).find(
    (key) =>
      key !== "DEFAULT" &&
      (key.includes(normalizedBrand) || normalizedBrand.includes(key))
  );

  if (partialMatch) {
    return brandLogos[partialMatch].logoUrl;
  }

  // Si no hay coincidencia, retornar string vacío
  return "";
};

/**
 * Obtiene información completa de una marca
 * @param brandName - Nombre de la marca
 * @returns Información de la marca o datos por defecto
 */
export const getBrandInfo = (brandName: string): BrandLogo => {
  if (!brandName || brandName === "Sin marca" || brandName === "GENÉRICA") {
    return brandLogos["DEFAULT"];
  }

  const normalizedBrand = brandName.trim().toUpperCase();

  if (brandLogos[normalizedBrand]) {
    return brandLogos[normalizedBrand];
  }

  const partialMatch = Object.keys(brandLogos).find(
    (key) => key.includes(normalizedBrand) || normalizedBrand.includes(key)
  );

  if (partialMatch && partialMatch !== "DEFAULT") {
    return brandLogos[partialMatch];
  }

  return {
    name: brandName,
    logoUrl: brandLogos["DEFAULT"].logoUrl,
    website: "",
  };
};

/**
 * Obtiene todas las marcas disponibles en el diccionario
 * @returns Array con nombres de todas las marcas (excepto DEFAULT)
 */
export const getAllBrands = (): string[] => {
  return Object.keys(brandLogos).filter((brand) => brand !== "DEFAULT");
};

/**
 * Verifica si una marca tiene logo configurado
 * @param brandName - Nombre de la marca
 * @returns true si la marca tiene logo configurado, false en caso contrario
 */
export const hasBrandLogo = (brandName: string): boolean => {
  if (!brandName || brandName === "Sin marca" || brandName === "GENÉRICA") {
    return false;
  }

  const normalizedBrand = brandName.trim().toUpperCase();
  return brandLogos[normalizedBrand] !== undefined;
};

export const brandLogos: Record<string, BrandLogo> = {
  GENÉRICO: {
    name: "GENÉRICO",
    logoUrl: "",
    website: "",
    // 760 productos
  },
  CLEVELAND: {
    name: "CLEVELAND",
    logoUrl:
      "https://image.jimcdn.com/app/cms/image/transf/none/path/s46d81afa783674fe/image/ia532dd2ee2116af2/version/1636852387/image.png",
    website: "",
    // 684 productos
  },
  TMX: {
    name: "TMX",
    logoUrl:
      "https://hvhindustrial.com/images/frontend_images/brands/1762146547toolmex-tmx-logo-new.png",
    website: "",
    // 576 productos
  },
  ROYCO: {
    name: "ROYCO",
    logoUrl:
      "https://carburoycobalto.mx/wp-content/uploads/2020/04/OSGROYCO-300x300.png",
    website: "",
    // 404 productos
  },
  AUSTROMEX: {
    name: "AUSTROMEX",
    logoUrl:
      "https://todoferreteria.com.mx/wp-content/uploads/2017/06/Austromex.png",
    website: "",
    // 300 productos
  },
  VERTEX: {
    name: "VERTEX",
    logoUrl:
      "https://tradetoolscia.com.pe/wp-content/uploads/2025/05/LOGO-VERTEX-1024x339.png",
    website: "",
    // 228 productos
  },
  "MASTER-C": {
    name: "MASTER-C",
    logoUrl:
      "https://mastercut.com.mx/wp-content/uploads/2023/11/Proveedores-de-herramientas-de-corte-para-aleaciones-de-alta-temperatura-Queretaro.png",
    website: "",
    // 216 productos
  },
  TENAZIT: {
    name: "TENAZIT",
    logoUrl: "https://www.austromex.com.mx/austromex/marca/tenazit.png",
    website: "",
    // 211 productos
  },
  TIALN: {
    name: "TIALN",
    logoUrl: "",
    website: "",
    // 192 productos
  },
  BONDHUS: {
    name: "BONDHUS",
    logoUrl:
      "https://hausoftools.com/cdn/shop/articles/Bondhus_logo_720x.png?v=1540413976",
    website: "",
    // 116 productos
  },
  BISON: {
    name: "BISON",
    logoUrl: "",
    website: "",
    // 112 productos
  },
  VOLKEL: {
    name: "VOLKEL",
    logoUrl:
      "https://ce8dc832c.cloudimg.io/v7/_cs_/2021/06/60b5ce3b78c3c/volkel_logo.png?ci_sign=3b55b83d1f494cee10d4d3493b8b5dc52fde0aa4",
    website: "",
    // 91 productos
  },
  INSIZE: {
    name: "INSIZE",
    logoUrl:
      "https://www.miasa.com.mx/wp-content/uploads/2017/02/16-3-e1572547904251.jpg",
    website: "",
    // 85 productos
  },
  FENES: {
    name: "FENES",
    logoUrl: "https://comercialtmch.cl/img/qs/fenes.png",
    website: "",
    // 78 productos
  },
  USA: {
    name: "USA",
    logoUrl: "",
    website: "",
    // 76 productos
  },
  IZAR: {
    name: "IZAR",
    logoUrl:
      "https://www.niagara-solution-provider.store/fileadmin/bilder/logo/tridium/Logo--Niagara_4--EPS1.png",
    website: "",
    // 75 productos
  },
  MITUTOYO: {
    name: "MITUTOYO",
    logoUrl:
      "https://fesepsa.com.pe/wp-content/uploads/2023/05/1.-Mitutoyo-Logo-en-PNG.png",
    website: "",
    // 72 productos
  },
  NIAGARA: {
    name: "NIAGARA",
    logoUrl: "",
    website: "",
    // 71 productos
  },
  URREA: {
    name: "URREA",
    logoUrl: "https://0201.nccdn.net/1_2/000/000/0ac/784/png_urrea.png",
    website: "",
    // 64 productos
  },
  GREENFIELD: {
    name: "GREENFIELD",
    logoUrl:
      "https://www.herramientasacz.com.mx/image/cache/data/GREENFIELD-200x200.jpg",
    website: "",
    // 62 productos
  },
  LENOX: {
    name: "LENOX",
    logoUrl: "",
    website: "",
    // 60 productos
  },
  NICHOLSON: {
    name: "NICHOLSON",
    logoUrl:
      "https://sigasa.com.mx/cdn/shop/collections/Nicholson_Logo_283x142.jpg?v=1462381098",
    website: "",
    // 54 productos
  },
  DREMEL: {
    name: "DREMEL",
    logoUrl:
      "https://www.dremel.com/images/dremel-logo--baafa617e8f24f53ae1f4a8e3a5a9e61.png?imgWidth=800&scale=1",
    website: "",
    // 50 productos
  },
  CALMET: {
    name: "CALMET",
    logoUrl: "https://www.crm.calmet.com.mx/Images/CalmetFAAZ.png",
    website: "",
    // 48 productos
  },
  INCOR: {
    name: "INCOR",
    logoUrl:
      "https://www.herramientasacz.com.mx/image/cache/data/INCOR-600x315.jpg",
    website: "",
    // 47 productos
  },
  NACHI: {
    name: "NACHI",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Nachi-Fujikoshi_Corp._Logo.svg/2560px-Nachi-Fujikoshi_Corp._Logo.svg.png",
    website: "",
    // 43 productos
  },
  TRAUB: {
    name: "TRAUB",
    logoUrl: "https://cdn.cncmachines.com/logos/brand-logos/1662689204160",
    website: "",
    // 43 productos
  },
  DESTACO: {
    name: "DESTACO",
    logoUrl:
      "https://herramientasserra.com.mx/wp-content/uploads/2018/03/DESTACO-2c-1024x258.png",
    website: "",
    // 37 productos
  },
  FANDELI: {
    name: "FANDELI",
    logoUrl:
      "https://ferreteraermita.com.mx/wp-content/uploads/2016/03/fandeli-logo.jpg",
    website: "",
    // 37 productos
  },
  "LOC-LINE": {
    name: "LOC-LINE",
    logoUrl:
      "https://store.tannerherramientas.com/website/image/product.brand/95/logo",
    website: "",
    // 36 productos
  },
  POLAND: {
    name: "POLAND",
    logoUrl: "",
    website: "",
    // 35 productos
  },
  "P&B": {
    name: "P&B",
    logoUrl:
      "data:image/png;base64,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",
    website: "",
    // 33 productos
  },
  JACOBS: {
    name: "JACOBS",
    logoUrl:
      "https://store.tannerherramientas.com/website/image/product.brand/61/logo",
    website: "",
    // 31 productos
  },
  YG: {
    name: "YG",
    logoUrl:
      "https://store.tannerherramientas.com/website/image/product.brand/45/logo",
    website: "",
    // 30 productos
  },
  FANDHER: {
    name: "FANDHER",
    logoUrl:
      "https://store.tannerherramientas.com/website/image/product.brand/111/logo",
    website: "",
    // 28 productos
  },
  "Y&B": {
    name: "Y&B",
    logoUrl: "",
    website: "",
    // 24 productos
  },
  "MA-FORD": {
    name: "MA-FORD",
    logoUrl: "https://hertool.com.mx/wp-content/uploads/2017/04/MAFord.png",
    website: "",
    // 23 productos
  },
  BOSCH: {
    name: "BOSCH",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/Bosch_logo.png",
    website: "",
    // 22 productos
  },
  LMT: {
    name: "LMT",
    logoUrl:
      "https://getlogovector.com/wp-content/uploads/2020/04/lmt-tools-logo-vector.png",
    website: "",
    // 21 productos
  },
  NOGA: {
    name: "NOGA",
    logoUrl: "",
    website: "",
    // 21 productos
  },
  BRICK: {
    name: "BRICK",
    logoUrl: "",
    website: "",
    // 18 productos
  },
  FELO: {
    name: "FELO",
    logoUrl:
      "https://i0.wp.com/www.felosofia.com/wp-content/uploads/2024/11/Felo-Logo_Yellow-1.jpg?fit=1179%2C528&ssl=1",
    website: "",
    // 17 productos
  },
  STARRETT: {
    name: "STARRETT",
    logoUrl:
      "https://hecortindustrial.com/wp-content/uploads/2024/12/logo-starret.png",
    website: "",
    // 17 productos
  },
  GLOBUS: {
    name: "GLOBUS",
    logoUrl: "",
    website: "",
    // 17 productos
  },
  "HY-PRO": {
    name: "HY-PRO",
    logoUrl: "",
    website: "",
    // 16 productos
  },
  REGAL: {
    name: "REGAL",
    logoUrl:
      "https://images.squarespace-cdn.com/content/v1/5e8b4a50d1d00f419f600f8c/1600200523433-956L1LAZ3BNCO8UOJ3MW/REGAL.jpg",
    website: "",
    // 15 productos
  },
  GUANGLU: {
    name: "GUANGLU",
    logoUrl:
      "https://proinmar.cl/administracion/_imagen11133/ftsymgns/photo_m_img/original/im11_66e4a0d616b843_83033233.png",
    website: "",
    // 15 productos
  },
  "3M": {
    name: "3M",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/3M_wordmark.svg/640px-3M_wordmark.svg.png",
    website: "",
    // 13 productos
  },
  WEILER: {
    name: "WEILER",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjC_O0vqPDLyv7_roKEAiLri5VLzR-xVgRzA&s",
    website: "",
    // 12 productos
  },
  PALBIT: {
    name: "PALBIT",
    logoUrl:
      "https://img.directindustry.es/images_di/company/40532/photo-g/1384.jpg",
    website: "",
    // 11 productos
  },
  CABEL: {
    name: "CABEL",
    logoUrl:
      "https://cabel.mx/wp-content/uploads/2023/01/LOGO-Cabel-completo.png",
    website: "",
    // 10 productos
  },
  IZARTOOL: {
    name: "IZARTOOL",
    logoUrl: "https://www.metalia.es/data/empresas/Izar/imgs/Logo.jpg",
    website: "",
    // 10 productos
  },
  OSG: {
    name: "OSG",
    logoUrl: "https://www.osg.co.jp/brand/common/imgs/osg_logo.png",
    website: "",
    // 10 productos
  },
  TTC: {
    name: "TTC",
    logoUrl: "",
    website: "",
    // 9 productos
  },
  KEO: {
    name: "KEO",
    logoUrl:
      "https://www.archcuttingtools.com/wp-content/uploads/2024/02/KEO.png",
    website: "",
    // 9 productos
  },
  EDGE: {
    name: "EDGE",
    logoUrl: "",
    website: "",
    // 9 productos
  },
  "COBRA-C": {
    name: "COBRA-C",
    logoUrl: "",
    website: "",
    // 8 productos
  },
  MOLDEX: {
    name: "MOLDEX",
    logoUrl: "",
    website: "",
    // 8 productos
  },
  DORMER: {
    name: "DORMER",
    logoUrl: "https://cdn.worldvectorlogo.com/logos/dormer.svg",
    website: "",
    // 8 productos
  },
  SATURNO: {
    name: "SATURNO",
    logoUrl: "",
    website: "",
    // 8 productos
  },
  STARRET: {
    name: "STARRET",
    logoUrl:
      "https://hecortindustrial.com/wp-content/uploads/2024/12/logo-starret.png",
    website: "",
    // 8 productos
  },
  FENNES: {
    name: "FENNES",
    logoUrl: "",
    website: "",
    // 8 productos
  },
  TUNGALOY: {
    name: "TUNGALOY",
    logoUrl: "https://tungaloy.com/wpdata/wp-content/uploads/logo_tungaloy.jpg",
    website: "",
    // 8 productos
  },
  "VISE-GRIP": {
    name: "VISE-GRIP",
    logoUrl: "https://cdn.worldvectorlogo.com/logos/vise-grip.svg",
    website: "",
    // 8 productos
  },
  TULMEX: {
    name: "TULMEX",
    logoUrl:
      "https://www.kleintools.com.mx/sites/default/files/content-assets/logotipo_tulmex_stack.jpg",
    website: "",
    // 8 productos
  },
  "OSG-ROYCO": {
    name: "OSG-ROYCO",
    logoUrl:
      "https://carburoycobalto.mx/wp-content/uploads/2020/04/OSGROYCO-300x300.png",
    website: "",
    // 7 productos
  },
  "MASTER-CUT": {
    name: "MASTER-CUT",
    logoUrl:
      "https://mastercut.com.mx/wp-content/uploads/2023/11/Proveedores-de-herramientas-de-corte-para-aleaciones-de-alta-temperatura-Queretaro.png",
    website: "",
    // 7 productos
  },
  "MICRO-100": {
    name: "MICRO-100",
    logoUrl:
      "https://store.tannerherramientas.com/website/image/product.brand/139/logo",
    website: "",
    // 7 productos
  },
  SHAVIV: {
    name: "SHAVIV",
    logoUrl:
      "https://cdn.shopify.com/s/files/1/0612/2920/3670/files/shaviv-logo-vector.png?v=1742482094",
    website: "",
    // 6 productos
  },
  MARKAL: {
    name: "MARKAL",
    logoUrl:
      "https://www.hepsa.mx/image/cache/catalog/marcas/markal-logo-600x315..jpg",
    website: "",
    // 6 productos
  },
  BOEHLERIT: {
    name: "BOEHLERIT",
    logoUrl:
      "https://www.boehlerit.com.mx/fileadmin/templates/assets/images/logo.jpg",
    website: "",
    // 6 productos
  },
  GLG: {
    name: "GLG",
    logoUrl: "https://www.glg.org/wp-content/uploads/2018/08/LOGO-GLG.png",
    website: "",
    // 6 productos
  },
  ALFRA: {
    name: "ALFRA",
    logoUrl: "https://www.alfra.com/images/logo-alfra.png",
    website: "",
    // 6 productos
  },
  BESSEY: {
    name: "BESSEY",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTePL7SMioaleYsN6YFfRtlocl3FV_-ruM9jw&s",
    website: "",
    // 6 productos
  },
  JYRSA: {
    name: "JYRSA",
    logoUrl:
      "https://jyrsa.com/wp-content/uploads/2024/10/Logo-JYRSA-negro-03.jpg",
    website: "",
    // 6 productos
  },
  WINCO: {
    name: "WINCO",
    logoUrl:
      "https://surtiloza.mx/wp-content/uploads/2021/08/winco-logo-e1627947495580.jpg",
    website: "",
    // 6 productos
  },
  "DERMA-C": {
    name: "DERMA-C",
    logoUrl:
      "https://dermacare.mx/wp-content/uploads/2025/03/Logo-Dermacare.png",
    website: "",
    // 6 productos
  },
  MILWAUKEE: {
    name: "MILWAUKEE",
    logoUrl:
      "https://1000marcas.net/wp-content/uploads/2020/10/Milwaukee-logo.jpg",
    website: "",
    // 6 productos
  },
  FORZA: {
    name: "FORZA",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMuQvh8P-p5eU4Yd3lc_sb2RwT7OcTX7caUQ&s",
    website: "",
    // 5 productos
  },
  REGIA: {
    name: "REGIA",
    logoUrl:
      "https://www.regia.mx/cdn/shop/files/LgRegiaNVO_png_1251X364_dc74271a-05fe-4191-9d0f-bee73f5d0ff2_390x.png?v=1674666297",
    website: "",
    // 5 productos
  },
  "TAP-MAGIC": {
    name: "TAP-MAGIC",
    logoUrl:
      "https://www.dhtools.com.mx/wp-content/uploads/2020/01/TAP-MAGIC-LOGO.jpg",
    website: "",
    // 5 productos
  },
  TENFLEX: {
    name: "TENFLEX",
    logoUrl:
      "https://acdn-us.mitiendanube.com/stores/001/026/864/themes/common/logo-1276758361-1764589307-fbd98e66baec94e6d3f6933f9a7cda861764589307.png?0",
    website: "",
    // 5 productos
  },
  COLLET: {
    name: "COLLET",
    logoUrl: "",
    website: "",
    // 5 productos
  },
  BORIDE: {
    name: "BORIDE",
    logoUrl: "https://i.ytimg.com/vi/hpm7PhKqGXM/mqdefault.jpg",
    website: "",
    // 5 productos
  },
  VALLORBE: {
    name: "VALLORBE",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDOAmFmADGcD08Z2I78AnAOYxjEiubChNhgg&s",
    website: "",
    // 5 productos
  },
  HYPRO: {
    name: "HYPRO",
    logoUrl: "",
    website: "",
    // 5 productos
  },
  STANLEY: {
    name: "STANLEY",
    logoUrl:
      "https://1000marcas.net/wp-content/uploads/2022/06/Stanley-Logo.jpg",
    website: "",
    // 4 productos
  },
  LFA: {
    name: "LFA",
    logoUrl: "",
    website: "",
    // 4 productos
  },
  "VICE-GRIP": {
    name: "VICE-GRIP",
    logoUrl: "https://cdn.worldvectorlogo.com/logos/vise-grip.svg",
    website: "",
    // 4 productos
  },
  NEMESIS: {
    name: "NEMESIS",
    logoUrl: "",
    website: "",
    // 4 productos
  },
  SHOWA: {
    name: "SHOWA",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/SHOWA_Corporation_company_logo.svg/2560px-SHOWA_Corporation_company_logo.svg.png",
    website: "",
    // 4 productos
  },
  CRAFTSMAN: {
    name: "CRAFTSMAN",
    logoUrl:
      "https://i.pinimg.com/736x/36/53/13/3653136cc13dc034ff3932841006a0c9.jpg",
    website: "",
    // 4 productos
  },
  HANSON: {
    name: "HANSON",
    logoUrl:
      "https://m.media-amazon.com/images/I/51i94nH982L._AC_UF894,1000_QL80_.jpg",
    website: "",
    // 4 productos
  },
  TOOLMEX: {
    name: "TOOLMEX",
    logoUrl:
      "https://sumicali.com/cdn/shop/collections/toolmex-sumicali.png?v=1716415407",
    website: "",
    // 4 productos
  },
  TENEZIT: {
    name: "TENEZIT",
    logoUrl: "https://www.austromex.com.mx/austromex/marca/tenazit.png",
    website: "",
    // 4 productos
  },
  "TENAZIT ": {
    name: "TENAZIT",
    logoUrl: "https://www.austromex.com.mx/austromex/marca/tenazit.png",
    website: "",
    // 4 productos
  },
  ARF: {
    name: "ARF",
    logoUrl: "",
    website: "",
    // 4 productos
  },
  BESDIA: {
    name: "BESDIA",
    logoUrl: "https://rodavigo.net/datos/logos-marcas-png/besdia.png",
    website: "",
    // 4 productos
  },
  CORRADI: {
    name: "CORRADI",
    logoUrl: "",
    website: "",
    // 4 productos
  },
  GROZ: {
    name: "GROZ",
    logoUrl:
      "https://images.seeklogo.com/logo-png/34/1/groz-tools-logo-png_seeklogo-345145.png",
    website: "",
    // 4 productos
  },
  MARAGA: {
    name: "MARAGA",
    logoUrl:
      "https://maraga.vtexassets.com/assets/vtex.file-manager-graphql/images/f82214e5-4fe0-4e08-99a8-0b59358269c0___fa8794e99c65c0279753a9491236bfaf.png",
    website: "",
    // 4 productos
  },
  "DERMA-CARE": {
    name: "DERMA-CARE",
    logoUrl:
      "https://dermacare.mx/wp-content/uploads/2025/03/Logo-Dermacare.png",
    website: "",
    // 3 productos
  },
  SANDFLEX: {
    name: "SANDFLEX",
    logoUrl: "",
    website: "",
    // 3 productos
  },
  WIHA: {
    name: "WIHA",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7plpoC0i1lHtdAG1YpVsQRaa5-z569yiyLQ&s",
    website: "",
    // 3 productos
  },
  "CHICAGO-LATROBE": {
    name: "CHICAGO-LATROBE",
    logoUrl:
      "https://www.herramientaslugocastro.mx/esp/wp-content/uploads/2021/07/LATROBE.png",
    website: "",
    // 3 productos
  },
  CINASA: {
    name: "CINASA",
    logoUrl:
      "https://lirp.cdn-website.com/c8477a5d/dms3rep/multi/opt/CINASA-640w.jpg",
    website: "",
    // 3 productos
  },
  RADIANS: {
    name: "RADIANS",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYGvjoDMeqW2tVZZIHnQBhC3G-g1oN7ZdVYg&s",
    website: "",
    // 3 productos
  },
  WURTH: {
    name: "WURTH",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xW-nMg2s_Kf84RPV_W2dbJkCtnDqWSDPKA&s",
    website: "",
    // 3 productos
  },
  SANDVIK: {
    name: "SANDVIK",
    logoUrl:
      "https://m.media-amazon.com/images/I/71K5o4Hr0SL._AC_UF894,1000_QL80_.jpg",
    website: "",
    // 3 productos
  },
  GESSWEIN: {
    name: "GESSWEIN",
    logoUrl:
      "https://www.floodsupply.com/wp-content/uploads/2019/01/manufacturer-gesswein-logo.jpg",
    website: "",
    // 3 productos
  },
  KOREA: {
    name: "KOREA",
    logoUrl: "",
    website: "",
    // 3 productos
  },
  BULLDOG: {
    name: "BULLDOG",
    logoUrl: "",
    website: "",
    // 3 productos
  },
  "GEAR-WRENCH": {
    name: "GEAR-WRENCH",
    logoUrl:
      "https://www.dhtools.com.mx/wp-content/uploads/2020/01/GEW-LOGO-500x400.jpg",
    website: "",
    // 3 productos
  },
  HENKEL: {
    name: "HENKEL",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReCSKcI6gO-imRU-oHKJn6844zi20MVukSsA&s",
    website: "",
    // 3 productos
  },
  KORLOY: {
    name: "KORLOY",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9EbYZB1BBpY-62_SYeQhszvYXcM0X0WBO8g&s",
    website: "",
    // 3 productos
  },
  DYKEM: {
    name: "DYKEM",
    logoUrl:
      "https://getvectorlogo.com/wp-content/uploads/2019/02/dykem-brand-vector-logo.png",
    website: "",
    // 3 productos
  },
  GEARWRENCH: {
    name: "GEARWRENCH",
    logoUrl:
      "https://www.dhtools.com.mx/wp-content/uploads/2020/01/GEW-LOGO-500x400.jpg",
    website: "",
    // 3 productos
  },
  IRWIN: {
    name: "IRWIN",
    logoUrl:
      "https://www.goldenstatelumber.com/wp-content/uploads/2020/10/irwin-tools-logo-color_500px.png",
    website: "",
    // 3 productos
  },
  ACESA: {
    name: "ACESA",
    logoUrl: "https://cdn.worldvectorlogo.com/logos/acesa-51690.svg",
    website: "",
    // 2 productos
  },
  INFRA: {
    name: "INFRA",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  "NU-TREAD": {
    name: "NU-TREAD",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  DIAGER: {
    name: "DIAGER",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  "ROYCO-HYPRO": {
    name: "ROYCO-HYPRO",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  "PLY-50": {
    name: "PLY-50",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  ZCCCT: {
    name: "ZCCCT",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  OTMT: {
    name: "OTMT",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  SURTEK: {
    name: "SURTEK",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  HOUT: {
    name: "HOUT",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  WESTON: {
    name: "WESTON",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  MSA: {
    name: "MSA",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  AUSTRODIAM: {
    name: "AUSTRODIAM",
    logoUrl:
      "https://store.tannerherramientas.com/website/image/product.brand/117/logo",
    website: "",
    // 2 productos
  },
  SHINWA: {
    name: "SHINWA",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  KARLEN: {
    name: "KARLEN",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  "BRITE-MARK": {
    name: "BRITE-MARK",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  SANTUL: {
    name: "SANTUL",
    logoUrl:
      "https://www.expercom.mx/storage/images/brand/ai5DauuDTQIhIWSX8agiLDarnnu1FBK5VxzHPYln.png",
    website: "",
    // 2 productos
  },
  TYROLIT: {
    name: "TYROLIT",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  KIPP: {
    name: "KIPP",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  PROTO: {
    name: "PROTO",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  FOWLER: {
    name: "FOWLER",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  TUK: {
    name: "TUK",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  DISSTON: {
    name: "DISSTON",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  EXTECH: {
    name: "EXTECH",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  "GOLD-P": {
    name: "GOLD-P",
    logoUrl: "",
    website: "",
    // 2 productos
  },
  PIP: {
    name: "PIP",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  LODESTAR: {
    name: "LODESTAR",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  LLAMBRICH: {
    name: "LLAMBRICH",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQXvd4CD0razacwH_LQLG9hfIFTGbf0IBEcQ&s",
    website: "",
    // 1 productos
  },
  PFERD: {
    name: "PFERD",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  HUM: {
    name: "HUM",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  MEILER: {
    name: "MEILER",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  SOLA: {
    name: "SOLA",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  WILTON: {
    name: "WILTON",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  PERMATEX: {
    name: "PERMATEX",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  IRIMO: {
    name: "IRIMO",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  UNIBIT: {
    name: "UNIBIT",
    logoUrl:
      "https://www.goldenstatelumber.com/wp-content/uploads/2020/10/irwin-tools-logo-color_500px.png",
    website: "",
    // 1 productos
  },
  "T&O": {
    name: "T&O",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  KLINGSPOR: {
    name: "KLINGSPOR",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  JOINVILLE: {
    name: "JOINVILLE",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  PENTEL: {
    name: "PENTEL",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  SHOOWA: {
    name: "SHOOWA",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  MITSUBISHI: {
    name: "MITSUBISHI",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  MAPA: {
    name: "MAPA",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  "KLEIN-TOOLS": {
    name: "KLEIN-TOOLS",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  TRUEBLUE: {
    name: "TRUEBLUE",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  ARMSTRONG: {
    name: "ARMSTRONG",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  "TMX-POLAND": {
    name: "TMX-POLAND",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  DEWALT: {
    name: "DEWALT",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  DIXI: {
    name: "DIXI",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  SOBA: {
    name: "SOBA",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  DALO: {
    name: "DALO",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  "L-GOLDEN": {
    name: "L-GOLDEN",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  DIACAR: {
    name: "DIACAR",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  HECORT: {
    name: "HECORT",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  SINO: {
    name: "SINO",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  GROZZ: {
    name: "GROZZ",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  "MAG-LITE": {
    name: "MAG-LITE",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  "STACK-ON": {
    name: "STACK-ON",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  "MAG-MET": {
    name: "MAG-MET",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  GARANT: {
    name: "GARANT",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  "POWER-GRIP": {
    name: "POWER-GRIP",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  "ROYCO-HY-PRO": {
    name: "ROYCO-HY-PRO",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  RATAN: {
    name: "RATAN",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  INDICOL: {
    name: "INDICOL",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  OKILA: {
    name: "OKILA",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  SCHRADER: {
    name: "SCHRADER",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  MAKITA: {
    name: "MAKITA",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  WIKUS: {
    name: "WIKUS",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  EXCEL: {
    name: "EXCEL",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  TUFF: {
    name: "TUFF",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  WOODRUFF: {
    name: "WOODRUFF",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  "JW-WINCO": {
    name: "JW-WINCO",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  LISLE: {
    name: "LISLE",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  "KEY-BAK": {
    name: "KEY-BAK",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  CREWS: {
    name: "CREWS",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  BRUBAKER: {
    name: "BRUBAKER",
    logoUrl:
      "https://www.floodsupply.com/wp-content/uploads/2019/01/manufacturer-brubaker-tool-logo.jpg",
    website: "",
    // 1 productos
  },
  TESA: {
    name: "TESA",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  JACOBBS: {
    name: "JACOBBS",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  GIMBEL: {
    name: "GIMBEL",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  FATPOL: {
    name: "FATPOL",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  SIMONS: {
    name: "SIMONS",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  "COBRA-CARBIDE": {
    name: "COBRA-CARBIDE",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  "NU-TRED": {
    name: "NU-TRED",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  TOOLCRAFT: {
    name: "TOOLCRAFT",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  "MAGNETS SOURCES": {
    name: "MAGNETS SOURCES",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  VDR: {
    name: "VDR",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  TRUPER: {
    name: "TRUPER",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  PROTOO: {
    name: "PROTOO",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  ROYAL: {
    name: "ROYAL",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  "LMT-FETTE": {
    name: "LMT-FETTE",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  LEDLENSER: {
    name: "LEDLENSER",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  "HI-POWER": {
    name: "HI-POWER",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  "EASY-CUT": {
    name: "EASY-CUT",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  KENNAMETAL: {
    name: "KENNAMETAL",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  "W-40": {
    name: "W-40",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  "PICK-LITE": {
    name: "PICK-LITE",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  AMBIDERM: {
    name: "AMBIDERM",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  SWANSON: {
    name: "SWANSON",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  VERMONT: {
    name: "VERMONT",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  GOODYEAR: {
    name: "GOODYEAR",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  FENEX: {
    name: "FENEX",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  "HYPRO-ROYCO": {
    name: "HYPRO-ROYCO",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  BEST: {
    name: "BEST",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  SLUGGER: {
    name: "SLUGGER",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  NISSEN: {
    name: "NISSEN",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  AMANA: {
    name: "AMANA",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  CRAWFORD: {
    name: "CRAWFORD",
    logoUrl:
      "https://web-files.crawco.com/extranet/branding/PNG/Crawford/Final_Crawford_Logo_287C_6.13.png",
    website: "",
    // 1 productos
  },
  PALMERA: {
    name: "PALMERA",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  "GUAN-GLU": {
    name: "GUAN-GLU",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  CRUCELEGUI: {
    name: "CRUCELEGUI",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  HOWARD: {
    name: "HOWARD",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  DIAGUER: {
    name: "DIAGUER",
    logoUrl: "",
    website: "",
    // 1 productos
  },
  // Logo por defecto para marcas sin logo específico
  DEFAULT: {
    name: "DEFAULT",
    logoUrl: "https://placehold.co/200x80/1e3a8a/ffffff?text=Logo",
    website: "",
  },
};
