// Configuración de la app NutriAlba.
// CLIENT_ID: lo obtienes al crear las credenciales OAuth en Google Cloud Console.
// Mientras tenga el valor de ejemplo, la app funciona en "modo de prueba" con datos de mentira.
const CONFIG = {
  CLIENT_ID: "966170532485-ntasqis7k3if5onk2gbnec1un470no44.apps.googleusercontent.com",
  SPREADSHEET_ID: "1zOIpAHCnpYcmxUEtPJgDQVSfxNSv7bTakCRrKeDLHtI",
  HOJA_ALIMENTOS: "Alimentos",
  HOJA_REGISTRO: "Registro",
};

// La app está en modo de prueba (sin conexión real a Google) si no se ha configurado el CLIENT_ID todavía.
const MODO_PRUEBA = CONFIG.CLIENT_ID.startsWith("PON_AQUI");
