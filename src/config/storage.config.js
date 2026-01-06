/**
 * Configuración de rutas de Firebase Storage por creadora
 * 
 * Este archivo centraliza las rutas de almacenamiento para facilitar
 * el cambio entre diferentes creadoras de contenido.
 */

// Nombre de la creadora actual (cambiar según el proyecto)
const CREATOR_NAME = 'Michelle';

// Rutas base para cada tipo de contenido
export const STORAGE_PATHS = {
    // Galería de fotos públicas/preview
    GALLERY: `${CREATOR_NAME}/gallery`,
    
    // Fotos premium (contenido exclusivo)
    PHOTOS_PREMIUM: `${CREATOR_NAME}/fotos-premium`,
    
    // Videos gratuitos/preview
    VIDEOS_FREE: `${CREATOR_NAME}/videos-free`,
    
    // Videos premium (contenido exclusivo)
    VIDEOS_PREMIUM: `${CREATOR_NAME}/videos-premium`,
    
    // Videos de vista previa (thumbnails/trailers)
    VIDEOS_PREVIEW: `${CREATOR_NAME}/videos-preview`,
};

// Exportar también el nombre de la creadora por si se necesita
export const CREATOR = CREATOR_NAME;

// Helper para construir rutas personalizadas
export const getStoragePath = (type, subPath = '') => {
    const basePath = STORAGE_PATHS[type];
    return subPath ? `${basePath}/${subPath}` : basePath;
};

export default STORAGE_PATHS;
