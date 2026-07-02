// Lógica principal de la app: pintar la pantalla, gestionar la selección
// de fecha/comida/alimentos, iniciar sesión con Google y guardar el registro.

const MOMENTOS_DEL_DIA = [
  { id: "Desayuno", etiqueta: "Desayuno", icono: "🌅" },
  { id: "Media mañana", etiqueta: "Media mañana", icono: "🍎" },
  { id: "Almuerzo", etiqueta: "Almuerzo", icono: "🍽️" },
  { id: "Merienda", etiqueta: "Merienda", icono: "🍪" },
  { id: "Cena", etiqueta: "Cena", icono: "🌙" },
];

// Icono por defecto para cada grupo de alimentos. Si aparece un grupo nuevo
// en la hoja "Alimentos" que no esté en esta lista, se usa el icono genérico.
const ICONOS_POR_GRUPO = {
  frutas: "🍎",
  verduras: "🥦",
  hortalizas: "🥦",
  lácteos: "🥛",
  lacteos: "🥛",
  cereales: "🍞",
  "pan y cereales": "🍞",
  proteínas: "🍗",
  proteinas: "🍗",
  carnes: "🍗",
  pescado: "🐟",
  pescados: "🐟",
  huevos: "🥚",
  legumbres: "🍲",
  dulces: "🍪",
  bebidas: "🥤",
  frutos_secos: "🥜",
  "frutos secos": "🥜",
  grasas: "🍯",
};

const ICONO_GENERICO = "🍽️";

const MENSAJES_GUARDADO = [
  "¡Genial! Ya lo he apuntado en tu diario 🌸",
  "¡Qué rico! Registrado con éxito ✨",
  "¡Miau! Comida guardada, lo has hecho genial 🐾",
];

// Datos de mentira para poder ver la app funcionando sin conectar con Google todavía.
const ALIMENTOS_DE_PRUEBA = [
  { alimento: "Manzana", grupo: "Frutas", esNuevo: false },
  { alimento: "Fresas", grupo: "Frutas", esNuevo: true },
  { alimento: "Plátano", grupo: "Frutas", esNuevo: false },
  { alimento: "Brócoli", grupo: "Verduras", esNuevo: false },
  { alimento: "Zanahoria", grupo: "Verduras", esNuevo: false },
  { alimento: "Leche", grupo: "Lácteos", esNuevo: false },
  { alimento: "Yogur", grupo: "Lácteos", esNuevo: false },
  { alimento: "Queso", grupo: "Lácteos", esNuevo: false },
  { alimento: "Pan integral", grupo: "Cereales", esNuevo: false },
  { alimento: "Pollo", grupo: "Proteínas", esNuevo: false },
  { alimento: "Lentejas", grupo: "Legumbres", esNuevo: true },
];

const estado = {
  fecha: new Date().toISOString().slice(0, 10),
  momento: MOMENTOS_DEL_DIA[0].id,
  alimentos: [],
  seleccionados: new Set(),
  token: null,
};

const els = {
  pantallaLogin: document.getElementById("pantalla-login"),
  pantallaApp: document.getElementById("pantalla-app"),
  btnLogin: document.getElementById("btn-login"),
  avisoPrueba: document.getElementById("aviso-prueba"),
  inputFecha: document.getElementById("input-fecha"),
  listaMomentos: document.getElementById("lista-momentos"),
  listaAlimentos: document.getElementById("lista-alimentos"),
  btnGuardar: document.getElementById("btn-guardar"),
  mensajeEstado: document.getElementById("mensaje-estado"),
  contadorSeleccion: document.getElementById("contador-seleccion"),
};

function iniciar() {
  els.inputFecha.value = estado.fecha;
  els.inputFecha.max = new Date().toISOString().slice(0, 10);
  els.inputFecha.addEventListener("change", (e) => {
    estado.fecha = e.target.value;
  });

  pintarMomentos();
  els.btnGuardar.addEventListener("click", guardarSeleccion);

  if (MODO_PRUEBA) {
    els.avisoPrueba.classList.remove("oculto");
    els.btnLogin.textContent = "Entrar en modo de prueba";
    els.btnLogin.addEventListener("click", () => entrarConDatos(ALIMENTOS_DE_PRUEBA, "modo-prueba"));
    return;
  }

  els.btnLogin.addEventListener("click", solicitarAcceso);
  intentarAccesoSilencioso();
}

// --- Inicio de sesión con Google (Google Identity Services) ---

let clienteToken = null;

function crearClienteToken(callback) {
  return google.accounts.oauth2.initTokenClient({
    client_id: CONFIG.CLIENT_ID,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    callback,
  });
}

function intentarAccesoSilencioso() {
  // Si el navegador ya tiene sesión y permiso concedido, entra sin mostrar nada.
  clienteToken = crearClienteToken(async (respuesta) => {
    if (respuesta && respuesta.access_token) {
      await entrarConToken(respuesta.access_token);
    }
  });
  try {
    clienteToken.requestAccessToken({ prompt: "none" });
  } catch (error) {
    // Si falla el intento silencioso, simplemente se queda en la pantalla de login.
  }
}

function solicitarAcceso() {
  clienteToken = crearClienteToken(async (respuesta) => {
    if (respuesta && respuesta.access_token) {
      await entrarConToken(respuesta.access_token);
    } else {
      mostrarError("No se ha podido iniciar sesión con Google. Inténtalo de nuevo.");
    }
  });
  clienteToken.requestAccessToken({ prompt: "" });
}

async function entrarConToken(token) {
  estado.token = token;
  try {
    const alimentos = await SheetsAPI.obtenerAlimentos(token);
    entrarConDatos(alimentos, "google");
  } catch (error) {
    mostrarError("No se pudo leer la lista de alimentos desde Google Sheets. Revisa tu conexión e inténtalo de nuevo.");
  }
}

function entrarConDatos(alimentos, origen) {
  estado.alimentos = alimentos;
  estado.origen = origen;
  els.pantallaLogin.classList.add("oculto");
  els.pantallaApp.classList.remove("oculto");
  pintarAlimentos();
}

// --- Pintado de la interfaz ---

function pintarMomentos() {
  els.listaMomentos.innerHTML = "";
  MOMENTOS_DEL_DIA.forEach((momento) => {
    const boton = document.createElement("button");
    boton.className = "tarjeta-momento" + (momento.id === estado.momento ? " seleccionado" : "");
    boton.innerHTML = `<span class="icono-momento">${momento.icono}</span><span>${momento.etiqueta}</span>`;
    boton.addEventListener("click", () => {
      estado.momento = momento.id;
      pintarMomentos();
    });
    els.listaMomentos.appendChild(boton);
  });
}

function iconoParaGrupo(grupo) {
  const clave = (grupo || "").trim().toLowerCase();
  return ICONOS_POR_GRUPO[clave] || ICONO_GENERICO;
}

function pintarAlimentos() {
  els.listaAlimentos.innerHTML = "";

  const grupos = new Map();
  estado.alimentos.forEach((alimento) => {
    if (!grupos.has(alimento.grupo)) grupos.set(alimento.grupo, []);
    grupos.get(alimento.grupo).push(alimento);
  });

  grupos.forEach((alimentosDelGrupo, nombreGrupo) => {
    const seccion = document.createElement("section");
    seccion.className = "grupo-alimentos";

    const titulo = document.createElement("p");
    titulo.className = "titulo-grupo";
    titulo.textContent = nombreGrupo;
    seccion.appendChild(titulo);

    const grid = document.createElement("div");
    grid.className = "grid-alimentos";

    alimentosDelGrupo.forEach((alimento) => {
      const tarjeta = document.createElement("button");
      tarjeta.className = "tarjeta-alimento";
      tarjeta.innerHTML = `
        ${alimento.esNuevo ? '<span class="insignia-nuevo">nuevo</span>' : ""}
        <span class="icono-alimento">${iconoParaGrupo(alimento.grupo)}</span>
        <span>${alimento.alimento}</span>
      `;
      tarjeta.addEventListener("click", () => alternarSeleccion(alimento.alimento, tarjeta));
      grid.appendChild(tarjeta);
    });

    seccion.appendChild(grid);
    els.listaAlimentos.appendChild(seccion);
  });
}

function alternarSeleccion(nombreAlimento, tarjeta) {
  if (estado.seleccionados.has(nombreAlimento)) {
    estado.seleccionados.delete(nombreAlimento);
    tarjeta.classList.remove("seleccionado");
  } else {
    estado.seleccionados.add(nombreAlimento);
    tarjeta.classList.add("seleccionado");
  }
  actualizarContador();
}

function actualizarContador() {
  const n = estado.seleccionados.size;
  els.contadorSeleccion.textContent = n === 0 ? "" : `${n} ${n === 1 ? "alimento elegido" : "alimentos elegidos"}`;
  els.btnGuardar.disabled = n === 0;
}

// --- Guardado ---

async function guardarSeleccion() {
  if (estado.seleccionados.size === 0) return;

  els.btnGuardar.disabled = true;
  els.btnGuardar.textContent = "Guardando...";

  const filas = Array.from(estado.seleccionados).map((alimento) => [estado.fecha, estado.momento, alimento]);

  try {
    if (estado.origen === "google") {
      await SheetsAPI.guardarRegistro(estado.token, filas);
    }
    mostrarExito();
    estado.seleccionados.clear();
    pintarAlimentos();
    actualizarContador();
  } catch (error) {
    mostrarError("No se pudo guardar el registro. Comprueba tu conexión e inténtalo de nuevo.");
  } finally {
    els.btnGuardar.disabled = estado.seleccionados.size === 0;
    els.btnGuardar.textContent = "Guardar comida";
  }
}

function mostrarExito() {
  const mensaje = MENSAJES_GUARDADO[Math.floor(Math.random() * MENSAJES_GUARDADO.length)];
  els.mensajeEstado.textContent = mensaje;
  els.mensajeEstado.className = "mensaje-estado exito";
  setTimeout(() => {
    els.mensajeEstado.textContent = "";
    els.mensajeEstado.className = "mensaje-estado";
  }, 3500);
}

function mostrarError(texto) {
  els.mensajeEstado.textContent = texto;
  els.mensajeEstado.className = "mensaje-estado error";
}

document.addEventListener("DOMContentLoaded", iniciar);
