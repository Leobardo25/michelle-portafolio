# 🔑 Configuración de Firebase Admin SDK

Para eliminar archivos de Firebase Storage usando scripts, necesitas configurar **Firebase Admin SDK** con credenciales de administrador.

---

## 📋 Pasos para Configurar

### 1. Obtener las Credenciales de Service Account

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: **camila-8d151**
3. Click en el ícono de **⚙️ (Settings)** → **Project settings**
4. Ve a la pestaña **Service accounts**
5. Click en **Generate new private key**
6. Se descargará un archivo JSON (ej: `camila-8d151-firebase-adminsdk-xxxxx.json`)

### 2. Guardar las Credenciales en el Proyecto

1. **Renombra** el archivo descargado a: `serviceAccountKey.json`
2. **Mueve** el archivo a la raíz del proyecto:
   ```
   d:\Camilla\serviceAccountKey.json
   ```

### 3. Agregar al .gitignore

⚠️ **MUY IMPORTANTE:** Este archivo contiene credenciales sensibles y **NO debe subirse a Git**.

Abre `.gitignore` y agrega:
```
# Firebase Admin credentials
serviceAccountKey.json
```

---

## 🚀 Uso del Script

### Eliminar un Archivo Específico

1. Edita `scripts/deleteFirebaseFileAdmin.js`
2. Cambia la línea:
   ```javascript
   const fileToDelete = 'videos-free/NOMBRE_DEL_ARCHIVO.mp4';
   ```

3. Ejecuta:
   ```bash
   npm run delete-file-admin
   ```

### Ejemplo: Eliminar el Video Actual

El script ya está configurado para eliminar:
```
videos-free/5f2b391ac28c105d7fe1a_source.mp4
```

Solo ejecuta:
```bash
npm run delete-file-admin
```

---

## 📁 Estructura del Proyecto

```
d:\Camilla/
├── serviceAccountKey.json          ⚠️ NO SUBIR A GIT
├── scripts/
│   ├── deleteFirebaseFile.js       (versión cliente - no funciona)
│   └── deleteFirebaseFileAdmin.js  ✅ (versión admin - funciona)
├── .gitignore                      (debe incluir serviceAccountKey.json)
└── package.json
```

---

## 🔒 Seguridad

### ⚠️ IMPORTANTE:

1. **NUNCA** subas `serviceAccountKey.json` a Git
2. **NUNCA** compartas este archivo públicamente
3. Este archivo da **acceso total** a tu proyecto Firebase
4. Si lo expones accidentalmente:
   - Ve a Firebase Console → Service accounts
   - Revoca la clave comprometida
   - Genera una nueva

### Verificar que NO esté en Git:

```bash
git status
# serviceAccountKey.json NO debe aparecer en la lista
```

---

## 🐛 Solución de Problemas

### Error: "Cannot find module 'serviceAccountKey.json'"

**Causa:** El archivo no está en la raíz del proyecto.

**Solución:**
1. Verifica que el archivo esté en: `d:\Camilla\serviceAccountKey.json`
2. Verifica que el nombre sea exactamente: `serviceAccountKey.json`

### Error: "credential-internal-error"

**Causa:** El archivo JSON está corrupto o es inválido.

**Solución:**
1. Descarga nuevamente el archivo desde Firebase Console
2. Asegúrate de que sea un archivo JSON válido

### Error: "storage/unauthorized"

**Causa:** Las credenciales no tienen permisos suficientes.

**Solución:**
1. Verifica que descargaste el archivo desde la sección correcta (Service accounts)
2. Regenera la clave desde Firebase Console

---

## 📝 Comandos Disponibles

```bash
# Eliminar archivo con Firebase Admin (requiere serviceAccountKey.json)
npm run delete-file-admin

# Eliminar archivo con cliente (no funciona - requiere auth)
npm run delete-file
```

---

## ✅ Checklist

Antes de ejecutar el script:

- [ ] Descargué el archivo de credenciales desde Firebase Console
- [ ] Renombré el archivo a `serviceAccountKey.json`
- [ ] Moví el archivo a la raíz del proyecto (`d:\Camilla\`)
- [ ] Agregué `serviceAccountKey.json` al `.gitignore`
- [ ] Verifiqué que NO esté en Git con `git status`
- [ ] Edité el script con la ruta del archivo a eliminar
- [ ] Ejecuté `npm run delete-file-admin`

---

## 🎯 Resultado Esperado

```bash
PS D:\Camilla> npm run delete-file-admin

> camilla-landing@0.0.0 delete-file-admin
> node scripts/deleteFirebaseFileAdmin.js

✅ Firebase Admin inicializado correctamente

🗑️  Eliminando archivo: videos-free/5f2b391ac28c105d7fe1a_source.mp4

✅ Archivo eliminado exitosamente: videos-free/5f2b391ac28c105d7fe1a_source.mp4

✅ Proceso completado exitosamente
```
