// Funciones que hablan directamente con la API de Google Sheets.
// Todas reciben el "token" (el permiso de acceso obtenido tras iniciar sesión con Google).

const SheetsAPI = {
  // Lee la hoja "Alimentos" y la convierte en una lista de objetos fáciles de usar.
  async obtenerAlimentos(token) {
    const rango = `${CONFIG.HOJA_ALIMENTOS}!A2:E`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SPREADSHEET_ID}/values/${encodeURIComponent(rango)}`;

    const respuesta = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!respuesta.ok) {
      throw new Error(`No se pudo leer la lista de alimentos (código ${respuesta.status})`);
    }

    const datos = await respuesta.json();
    const filas = datos.values || [];

    return filas
      .filter((fila) => fila[0]) // ignora filas sin nombre de alimento
      .map((fila) => ({
        alimento: fila[0] || "",
        grupo: fila[1] || "Otros",
        tipo: fila[2] || "",
        subtipo: fila[3] || "",
        esNuevo: (fila[4] || "").trim().toLowerCase() === "si" || (fila[4] || "").trim().toLowerCase() === "sí",
      }));
  },

  // Añade una o varias filas nuevas a la hoja "Registro".
  async guardarRegistro(token, filas) {
    const rango = `${CONFIG.HOJA_REGISTRO}!A:C`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SPREADSHEET_ID}/values/${encodeURIComponent(rango)}:append?valueInputOption=USER_ENTERED`;

    const respuesta = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: filas }),
    });

    if (!respuesta.ok) {
      throw new Error(`No se pudo guardar el registro (código ${respuesta.status})`);
    }

    return respuesta.json();
  },
};
