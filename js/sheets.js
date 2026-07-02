// Funciones que hablan directamente con la API de Google Sheets.
// Todas reciben el "token" (el permiso de acceso obtenido tras iniciar sesión con Google).

// Convierte el valor de una celda de fecha (puede venir como número de serie de
// Sheets o como texto) a formato "AAAA-MM-DD" para poder compararla con estado.fecha.
function normalizarFechaCelda(valor) {
  if (typeof valor === "number") {
    const milisegundos = Math.round((valor - 25569) * 86400 * 1000);
    return new Date(milisegundos).toISOString().slice(0, 10);
  }
  const texto = String(valor || "");
  const coincide = texto.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return coincide ? coincide[0] : texto;
}

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

  // Devuelve los alimentos ya registrados en la hoja "Registro" para una fecha y un momento del día.
  async obtenerRegistroDelDia(token, fecha, momento) {
    const rango = `${CONFIG.HOJA_REGISTRO}!A2:C`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SPREADSHEET_ID}/values/${encodeURIComponent(rango)}?valueRenderOption=UNFORMATTED_VALUE`;

    const respuesta = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!respuesta.ok) {
      throw new Error(`No se pudo comprobar el registro existente (código ${respuesta.status})`);
    }

    const datos = await respuesta.json();
    const filas = datos.values || [];

    return filas
      .filter((fila) => normalizarFechaCelda(fila[0]) === fecha && fila[1] === momento)
      .map((fila) => fila[2])
      .filter(Boolean);
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
