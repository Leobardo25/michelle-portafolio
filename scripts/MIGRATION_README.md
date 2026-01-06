# 🔄 Script de Migración de Firebase Storage

Este script migra las carpetas de contenido de la raíz de Firebase Storage a carpetas organizadas por creadora de contenido.

## 📋 Qué hace el script

Mueve las siguientes carpetas:
- `fotos-premium/` → `Camila/fotos-premium/`
- `gallery/` → `Camila/gallery/`
- `videos-free/` → `Camila/videos-free/`
- `videos-premium/` → `Camila/videos-premium/`
- `videos-preview/` → `Camila/videos-preview/`

## 🔧 Requisitos previos

1. **Instalar Firebase Admin SDK** (ya está en el proyecto)
2. **Configurar credenciales de Firebase**

### Configurar credenciales

Tienes dos opciones:

#### Opción 1: Service Account Key (Recomendado)

1. Ve a Firebase Console → Project Settings → Service Accounts
2. Haz clic en "Generate new private key"
3. Guarda el archivo JSON descargado como `serviceAccountKey.json` en la carpeta `scripts/`
4. **IMPORTANTE:** Asegúrate de que este archivo esté en `.gitignore`

Luego modifica el script para usar el archivo:

```javascript
// En migrateToCreatorFolders.js, línea 27, reemplaza:
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: firebaseConfig.storageBucket
});

// Por:
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: firebaseConfig.storageBucket
});
```

#### Opción 2: Application Default Credentials

1. Instala Google Cloud SDK
2. Ejecuta: `gcloud auth application-default login`
3. Selecciona tu cuenta de Google asociada al proyecto Firebase

## 🚀 Cómo ejecutar el script

### 1. Agregar el comando al package.json

Ya está agregado, pero si no:

```json
{
  "scripts": {
    "migrate-storage": "node scripts/migrateToCreatorFolders.js"
  }
}
```

### 2. Ejecutar la migración

```bash
npm run migrate-storage
```

### 3. Verificar en Firebase Console

Ve a Firebase Storage y verifica que:
- Existe la carpeta `Camila/` con todas las subcarpetas
- Las carpetas originales en la raíz están vacías o eliminadas

## ⚠️ IMPORTANTE - Después de la migración

### Para el proyecto de Camila (el anterior):

Actualiza las rutas en el código para apuntar a `Camila/`:

```javascript
// En Gallery.jsx, Videos.jsx, etc.
const GALLERY_PATH = 'Camila/gallery';
const PREMIUM_PATH = 'Camila/fotos-premium';
const VIDEOS_FREE_PATH = 'Camila/videos-free';
const VIDEOS_PREMIUM_PATH = 'Camila/videos-premium';
const VIDEOS_PREVIEW_PATH = 'Camila/videos-preview';
```

### Para el proyecto de Michelle (este):

Las rutas deben apuntar a `Michelle/`:

```javascript
// En Gallery.jsx, Videos.jsx, etc.
const GALLERY_PATH = 'Michelle/gallery';
const PREMIUM_PATH = 'Michelle/fotos-premium';
const VIDEOS_FREE_PATH = 'Michelle/videos-free';
const VIDEOS_PREMIUM_PATH = 'Michelle/videos-premium';
const VIDEOS_PREVIEW_PATH = 'Michelle/videos-preview';
```

## 🔍 Verificación

El script muestra:
- ✓ Archivos copiados exitosamente
- ✗ Errores (si los hay)
- 📊 Resumen final con estadísticas

## 🛡️ Seguridad

- El script **copia primero** y **elimina después** para evitar pérdida de datos
- Si hay un error al copiar, NO se elimina el archivo original
- Todos los archivos originales permanecen hasta que la copia sea exitosa

## 🐛 Solución de problemas

### Error: "Permission denied"
- Verifica que las credenciales de Firebase tengan permisos de Storage Admin
- Asegúrate de estar autenticado correctamente

### Error: "Bucket not found"
- Verifica que el `storageBucket` en `firebase.config.js` sea correcto
- Debe ser: `camila-8d151.firebasestorage.app`

### No se encuentran archivos
- Verifica en Firebase Console que las carpetas existen en la raíz
- Los nombres deben coincidir exactamente (case-sensitive)

## 📝 Notas

- El script puede tardar varios minutos dependiendo de la cantidad de archivos
- Se recomienda hacer un backup manual antes de ejecutar
- Puedes ejecutar el script múltiples veces de forma segura (no duplicará archivos)
