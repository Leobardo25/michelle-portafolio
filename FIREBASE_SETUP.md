# Guía de Configuración Firebase Storage

## 📁 Estructura de Carpetas en Firebase Storage

Para optimizar el consumo de bandwidth y reducir costos, debes subir todo el contenido multimedia a Firebase Storage con la siguiente estructura:

```
firebase-storage/
├── gallery/                    # Fotos gratis (ya configurado)
│   └── [tus fotos gratis]
│
├── videos-free/               # Videos gratis (ya configurado)
│   └── [tus videos gratis]
│
├── videos-premium/            # ⚠️ NUEVO - Videos premium
│   ├── premium1.mp4
│   ├── premium2.mp4
│   ├── premium3.mp4
│   ├── premium4.mp4
│   └── thumbnails/           # Opcional: thumbnails para preview
│       ├── premium1.jpg
│       ├── premium2.jpg
│       ├── premium3.jpg
│       └── premium4.jpg
│
└── photos-premium/           # ⚠️ NUEVO - Fotos premium
    ├── p1.png (o convertir a .webp)
    ├── p2.png
    ├── p3.png
    ├── p4.png
    ├── p5.png
    ├── p6.png
    ├── p7.png
    ├── p8.png
    ├── p9.png
    └── p10.png
```

---

## 🚀 Pasos para Migrar Contenido

### 1. Subir Videos Premium a Firebase

**Desde la carpeta local:** `d:\Camilla\public\videos\premium\`

**Destino en Firebase:** `videos-premium/`

**Archivos a subir:**
- `premium1.mp4` (21.68 MB)
- `premium2.mp4` (16.78 MB)
- `premium3.mp4` (20.00 MB)
- `premium4.mp4` (si existe)

**Cómo subir:**
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Ve a **Storage** en el menú lateral
4. Crea la carpeta `videos-premium`
5. Arrastra los archivos `.mp4` a esa carpeta

### 2. Subir Fotos Premium a Firebase

**Desde la carpeta local:** `d:\Camilla\public\photos\premium\`

**Destino en Firebase:** `photos-premium/`

**Archivos a subir:**
- `p1.png` hasta `p10.png`

**Recomendación:** Antes de subir, convierte las imágenes PNG a WebP para reducir tamaño en 70-80%

### 3. (Opcional) Crear Thumbnails para Videos

Para reducir aún más el bandwidth, puedes crear thumbnails (imágenes estáticas) de los videos:

**Herramientas:**
- FFmpeg: `ffmpeg -i premium1.mp4 -ss 00:00:03 -vframes 1 -vf scale=480:-1 premium1.jpg`
- O usar cualquier editor de video para exportar un frame

**Subir a:** `videos-premium/thumbnails/`

---

## 🗑️ Limpieza de Archivos Locales

**Después de subir todo a Firebase, ELIMINA estos archivos locales para reducir el tamaño del deploy:**

```bash
# Eliminar videos premium de /public/
rm -rf d:\Camilla\public\videos\premium\

# Eliminar fotos premium de /public/ (si decides subirlas a Firebase)
rm -rf d:\Camilla\public\photos\premium\
```

Esto reducirá el tamaño del deploy de Netlify de ~60 MB a ~2-3 MB.

---

## 💰 Estimación de Costos

### Con 500 visitas/mes (sin optimizaciones):
- **Firebase Storage:** ~$5.70/mes
- **Netlify:** $0 (solo sirve HTML/CSS/JS)

### Con 500 visitas/mes (con optimizaciones implementadas):
- **Firebase Storage:** $0 (dentro del free tier de 30 GB/mes)
- **Netlify:** $0

### Optimizaciones implementadas:
✅ Videos NO se reproducen automáticamente en hover (ahorra ~80 MB por visita)
✅ Lazy loading mejorado para imágenes
✅ Cache headers configurados en Netlify
✅ Preload solo metadata de videos

---

## 🔧 Cambios Realizados en el Código

### `Videos.jsx`
- ✅ Ahora carga videos premium desde Firebase Storage
- ✅ Eliminado autoplay en hover
- ✅ Agregado botón de play visible
- ✅ Preload solo metadata (`preload="metadata"`)

### `Gallery.jsx`
- ✅ Lazy loading mejorado con `rootMargin: '50px'`
- ✅ Imágenes solo se cargan cuando están cerca del viewport
- ✅ Agregado `decoding="async"` para mejor performance

### `netlify.toml`
- ✅ Headers de cache para reducir descargas repetidas
- ✅ Assets inmutables cacheados por 1 año
- ✅ Multimedia cacheado por 30 días

---

## 📊 Monitoreo

Después de implementar estos cambios, monitorea:

1. **Firebase Console → Storage → Usage**
   - Verifica que el bandwidth se mantenga bajo 30 GB/mes

2. **Netlify Dashboard → Bandwidth**
   - Debe reducirse a ~100-200 MB/mes (solo código de la app)

---

## ⚠️ Importante

- **NO** elimines los archivos de `/public/` hasta confirmar que todo funciona desde Firebase
- Prueba la página después de subir los archivos a Firebase
- Si algo falla, los videos tienen fallback a las URLs locales

---

## 🎯 Próximos Pasos Opcionales

Para reducir aún más el consumo:

1. **Comprimir videos:**
   ```bash
   ffmpeg -i input.mp4 -vcodec h264 -crf 28 -preset slow output.mp4
   ```

2. **Convertir imágenes a WebP:**
   ```bash
   cwebp input.png -q 80 -o output.webp
   ```

3. **Implementar Progressive Web App (PWA)** para cachear contenido en el navegador del usuario
