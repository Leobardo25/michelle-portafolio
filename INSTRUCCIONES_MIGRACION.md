# 📋 Instrucciones de Migración - Firebase Storage Multi-Creadora

## 🎯 Objetivo
Reorganizar Firebase Storage para soportar múltiples creadoras de contenido usando la misma base de datos y storage.

## 📁 Estructura Actual vs Nueva

### Antes (Raíz):
```
Firebase Storage/
├── fotos-premium/
├── gallery/
├── videos-free/
├── videos-premium/
└── videos-preview/
```

### Después (Organizado):
```
Firebase Storage/
├── Camila/
│   ├── fotos-premium/
│   ├── gallery/
│   ├── videos-free/
│   ├── videos-premium/
│   └── videos-preview/
└── Michelle/
    ├── fotos-premium/
    ├── gallery/
    ├── videos-free/
    ├── videos-premium/
    └── videos-preview/
```

## 🚀 Pasos para la Migración

### Paso 1: Configurar Credenciales de Firebase

Necesitas autenticarte con Firebase Admin. Elige una opción:

#### Opción A: Service Account Key (Recomendado)
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona el proyecto `camila-8d151`
3. Ve a **Project Settings** (⚙️) → **Service Accounts**
4. Haz clic en **"Generate new private key"**
5. Guarda el archivo como `scripts/serviceAccountKey.json`
6. Modifica `scripts/migrateToCreatorFolders.js` línea 27:

```javascript
// Reemplaza esto:
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: firebaseConfig.storageBucket
});

// Por esto:
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: firebaseConfig.storageBucket
});
```

#### Opción B: Google Cloud CLI
```bash
# Instalar Google Cloud SDK si no lo tienes
# Luego ejecutar:
gcloud auth application-default login
```

### Paso 2: Ejecutar el Script de Migración

```bash
npm run migrate-storage
```

Este script:
- ✅ Copia todos los archivos de la raíz a `Camila/`
- ✅ Elimina los archivos originales solo después de copiarlos exitosamente
- ✅ Muestra progreso en tiempo real
- ✅ Genera un resumen al final

### Paso 3: Verificar en Firebase Console

1. Ve a Firebase Storage en la consola
2. Verifica que existe la carpeta `Camila/` con todo el contenido
3. Confirma que las carpetas en la raíz están vacías

### Paso 4: Actualizar el Proyecto de Camila (Anterior)

En el proyecto anterior de Camila, actualiza las rutas:

```javascript
// En Videos.jsx
const free = await getGalleryImages('Camila/videos-free')
const premium = await getGalleryImages('Camila/videos-premium')
const previews = await getGalleryImages('Camila/videos-preview')

// En Gallery.jsx
const freeImages = await getGalleryImages('Camila/gallery')
const premiumPhotos = await getGalleryImages('Camila/fotos-premium')
```

### Paso 5: Configurar el Proyecto de Michelle (Este)

Este proyecto ya está configurado para usar `Michelle/`. Solo necesitas:

1. **Subir el contenido de Michelle** a Firebase Storage en las carpetas:
   - `Michelle/gallery/`
   - `Michelle/fotos-premium/`
   - `Michelle/videos-free/`
   - `Michelle/videos-premium/`
   - `Michelle/videos-preview/`

2. **Verificar la configuración** en `src/config/storage.config.js`:
```javascript
const CREATOR_NAME = 'Michelle'; // ✅ Ya está configurado
```

## 📝 Archivos Creados

1. **`scripts/migrateToCreatorFolders.js`** - Script de migración
2. **`scripts/MIGRATION_README.md`** - Documentación detallada del script
3. **`src/config/storage.config.js`** - Configuración centralizada de rutas
4. **`package.json`** - Agregado comando `migrate-storage`

## ⚠️ Importante

- **NO ejecutes el script dos veces** - Ya habrá movido los archivos la primera vez
- **Haz backup manual** antes de ejecutar si quieres estar 100% seguro
- El script es **seguro** - copia primero, elimina después
- Las rutas en este proyecto (Michelle) **ya están configuradas** para usar `Michelle/`

## 🔄 Para Agregar Más Creadoras en el Futuro

1. Crea las carpetas en Firebase Storage: `NombreCreadora/`
2. Copia el proyecto Michelle
3. Cambia en `src/config/storage.config.js`:
```javascript
const CREATOR_NAME = 'NombreCreadora';
```
4. Actualiza textos, colores y contenido según la nueva creadora

## 🆘 Soporte

Si tienes problemas:
1. Revisa `scripts/MIGRATION_README.md` para troubleshooting
2. Verifica que las credenciales de Firebase sean correctas
3. Confirma que tienes permisos de Storage Admin en Firebase

---

**Estado Actual del Proyecto Michelle:**
✅ Configurado para usar rutas `Michelle/*`
✅ Script de migración listo
✅ Documentación completa
⏳ Pendiente: Subir contenido de Michelle a Firebase Storage
