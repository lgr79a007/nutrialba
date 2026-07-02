# Guía de configuración de NutriAlba

Esta guía es para dejar la app funcionando de verdad, conectada a tu Google Sheets
y publicada en internet. Son pasos que solo tú puedes hacer porque requieren tus
cuentas personales (Google y GitHub). Tómate tu tiempo, no hay prisa.

## Paso 1 — Comparte la hoja de cálculo contigo mismo

La hoja "NutriAlba" está en el Google Drive de Alba. Para que tu cuenta (la que
usarás para iniciar sesión en la app) pueda escribir en ella:

1. Abre la hoja de cálculo "NutriAlba" en Google Sheets.
2. Pulsa el botón **Compartir** (arriba a la derecha).
3. Añade tu propia cuenta de Google (la del papá) con permiso de **Editor**.
4. Guarda.

## Paso 2 — Crea el proyecto en Google Cloud Console

1. Ve a https://console.cloud.google.com/ e inicia sesión con tu cuenta de Google.
2. Arriba a la izquierda, pulsa el selector de proyectos y luego **Proyecto nuevo**.
3. Ponle de nombre, por ejemplo, `NutriAlba` y créalo.
4. Con el proyecto ya seleccionado, ve al menú (☰) → **APIs y servicios** → **Biblioteca**.
5. Busca "Google Sheets API" y pulsa **Habilitar**.

## Paso 3 — Configura la pantalla de "consentimiento" de Google

Esto es la pantalla que aparece cuando inicias sesión, para autorizar la app.

1. Menú (☰) → **APIs y servicios** → **Pantalla de consentimiento de OAuth**.
2. Tipo de usuario: **Externo** → Crear.
3. Nombre de la app: `NutriAlba`. Correo de asistencia y de contacto: el tuyo.
4. Sigue los siguientes pasos con los valores por defecto (no hace falta añadir permisos especiales) hasta guardar.
5. En la sección **Usuarios de prueba**, añade tu correo de Google (y el de Alba si
   ella también va a iniciar sesión alguna vez). Mientras la app esté en modo
   "Prueba" (lo estará, es normal para un uso familiar), solo estos correos
   podrán iniciar sesión — es una medida de seguridad de Google, no de la app.

## Paso 4 — Crea las credenciales (Client ID)

1. Menú (☰) → **APIs y servicios** → **Credenciales**.
2. **Crear credenciales** → **ID de cliente de OAuth**.
3. Tipo de aplicación: **Aplicación web**.
4. Nombre: `NutriAlba web`.
5. En **Orígenes de JavaScript autorizados**, añade:
   `https://lgr79a007.github.io`
6. Crear. Google te mostrará un **Client ID** (termina en `.apps.googleusercontent.com`).
   Cópialo.

## Paso 5 — Pega el Client ID en la app

1. Abre el archivo `js/config.js` del proyecto.
2. Sustituye el valor de `CLIENT_ID` por el que has copiado, entre comillas.
3. Guarda el archivo.

Dile a Claude Code "ya tengo el Client ID, es: xxxxx" y lo dejo puesto yo mismo si lo prefieres.

## Paso 6 — Publica la app en GitHub Pages

Esto lo podemos hacer juntos cuando llegues aquí — dime cuando tengas hecho el
Client ID y te guío para crear el repositorio `nutrialba` en tu cuenta de GitHub
y publicarlo. También puedo subir yo los archivos si me confirmas que quieres
que use tu `git` local para hacerlo.

## Paso 7 — Ábrela en la tablet

1. En Chrome de la tablet, entra en `https://lgr79a007.github.io/nutrialba/`.
2. Pulsa **Conectar con Google** e inicia sesión con tu cuenta (la que añadiste
   como usuario de prueba y como editora de la hoja).
3. Para que parezca una app de verdad: menú de Chrome (⋮) → **Añadir a pantalla
   de inicio**. Aparecerá un icono para abrirla directamente.

---

Si algo de esto no te queda claro o Google te muestra una pantalla que no
esperabas, dímelo y lo resolvemos juntos paso a paso.
