# 🗑️ Cómo Eliminar el Video de Firebase Storage

El video **NO se eliminó** porque el script requiere credenciales de administrador que aún no has configurado.

---

## ⚠️ Por Qué Falló

El script `deleteFirebaseFileAdmin.js` necesita el archivo:
```
serviceAccountKey.json
```

Este archivo contiene las credenciales de administrador de Firebase y **NO está** en tu proyecto todavía.

---

## 🚀 Solución Rápida: Eliminar Manualmente (30 segundos)

### Opción 1: Desde Firebase Console (MÁS RÁPIDO)

1. Ve a: https://console.firebase.google.com/
2. Selecciona: **camila-8d151**
3. Click en: **Storage** (menú lateral)
4. Navega a: `videos-free/`
5. Busca: `5f2b391ac28c105d7fe1a_source.mp4`
6. Click en **⋮** (tres puntos) → **Delete**
7. Confirma

**✅ Listo en 30 segundos**

---

## 🔑 Solución con Script (Requiere Configuración)

Si prefieres usar el script para futuras eliminaciones:

### Paso 1: Descargar Credenciales

1. Ve a: https://console.firebase.google.com/
2. Proyecto: **camila-8d151**
3. **⚙️ Settings** → **Project settings**
4. Pestaña: **Service accounts**
5. Click: **Generate new private key**
6. Se descarga: `camila-8d151-firebase-adminsdk-xxxxx.json`

### Paso 2: Configurar en el Proyecto

1. Renombra el archivo a: `serviceAccountKey.json`
2. Muévelo a: `d:\Camilla\serviceAccountKey.json`
3. Ejecuta: `npm run delete-file-admin`

**Nota:** El archivo `serviceAccountKey.json` ya está en `.gitignore` y NO se subirá a Git.

---

## 📝 Recomendación

**Usa la Opción 1** (manual desde Firebase Console) para este video específico.

Es más rápido y no requiere configuración adicional.

El script es útil si necesitas eliminar archivos frecuentemente en el futuro.
