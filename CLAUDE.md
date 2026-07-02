# CLAUDE.md — Contexto y guías de trabajo

## Este proyecto: App de registro de comidas de Alba

### Qué es
Una app web sencilla para que mi hija Alba (9 años) registre lo que come cada día: desayuno, media mañana, almuerzo, merienda y cena.

### Usuarios
- **Alba**: usa la app para registrar sus comidas. No es necesario que tenga login como tal. La interfaz debe ser visual, simple y agradable para una niña de su edad.

### Funcionalidades requeridas
- Registrar lo que se come en cada momento del día (desayuno, media mañana, almuerzo, merienda, cena)
- Los datos deben guardarse en **Google Sheets** (gratis, accesible desde cualquier dispositivo)

### Decisiones técnicas ya tomadas
- **Tipo de app**: web (funciona en móvil y ordenador sin instalar nada)
- **Base de datos**: Google Sheets, a través de la API de Google.
- **Idioma de la interfaz**: español

### Detalles de la base de datos
- **Nombre**: NutriAlba
- **Ubicación**: En Google Drive, "Mi unidad/Nutrición"
- **Estructura**:
  - **Hoja "Registro"**: Ésta es la hoja en donde debes escribir datos. Sirve para almacenar la información que proporciona el usuario a través de la app. Incluye las columnas:
    - "Fecha": Día que indica el usuario al registrar la comida
    - "Comida": Tipo de comida que registra el usuario. Puede ser "Desayuno", "Media mañana", "Almuerzo", "Merienda" o "Cena"
    - "Alimento": El alimento que registra el usuario. La lista de alimentos válidos vienen de otra hoja del archivo
  - **Hoja "Alimentos"**: Esta hoja es para que leas datos. Sirve para que la app pueda tener un listado de los alimentos que el usuario puede registrar. Incluye las siguientes columnas:
    - "Alimento": Nombre del alimento. Esto es lo que el usuario debe visualizar para elegir
    - "Grupo": Grupo alimenticio al que pertenece
    - "Tipo": Tipo de alimento
    - "Subtipo": Subtipo de alimento
    - ¿Es nuevo?: Campo tipo "Si"/"No" que indica si es un alimento que el usuario está intentando incorporar a su dieta
  - **Hoja "AlimentosGrupos"**: Debes ignorar esta hoja
  - **Hoja "AlimentosTipos"**: Debes ignorar esta hoja
  - **Hoja "AlimentosSubtipos"**: Debes ignorar esta hoja

### Lo que NO debe incluir
- Registro de calorías ni información nutricional
- Sistema de login con contraseña (es de uso familiar y de confianza)
- Notificaciones o recordatorios (al menos en esta primera versión)

### Estado del proyecto
🟡 En inicio — aún no hay código. Empezamos desde cero.

---

## Quién soy

Soy técnico de sistemas con experiencia en gestión de proyectos de software y en coordinación de equipos de programadores. Entiendo los conceptos generales de tecnología y sistemas, pero **no soy programador** y no comprendo gran parte del código fuente en detalle.

Todos los proyectos que desarrollamos aquí son **para uso personal**, no para entornos de producción empresarial ni para terceros.

---

## Cómo debes comunicarte conmigo

- Explica siempre **qué hace** el código, no solo cómo está escrito.
- Usa **lenguaje claro y directo**, sin jerga técnica innecesaria. Si necesitas usar un término técnico, explícalo brevemente.
- Cuando propongas varias opciones, indícame cuál recomiendas y **por qué**, sin que yo tenga que elegir a ciegas.
- Si algo puede salir mal o tiene riesgos, **avísame antes** de ejecutarlo.
- Prefiero que me expliques el resultado esperado antes de que hagas cambios en los archivos.

---

## Antes de escribir código

1. **Entiende el objetivo completo** antes de empezar. Si algo no está claro, pregúntame antes de asumir.
2. **Propón un plan** resumido de lo que vas a hacer y espera mi confirmación si el cambio es significativo.
3. Usa la **solución más simple posible** que resuelva el problema. No añadas complejidad que no sea necesaria para uso personal.
4. Elige tecnologías y librerías **conocidas, estables y bien documentadas**. Evita dependencias exóticas o poco mantenidas.
5. Si el proyecto ya tiene una estructura o estilo definido, **respétalo y sé consistente**.

---

## Al escribir código

- Escribe código **limpio y legible**, con nombres de variables y funciones en español o en inglés, pero siempre de forma coherente dentro del mismo proyecto.
- Añade **comentarios en español** en las partes importantes, especialmente en lógica que no sea obvia.
- Organiza el código en **funciones pequeñas con un propósito claro** cada una.
- No dejes código comentado ni funciones sin usar ("código muerto").
- Si modificas un archivo existente, toca **solo lo necesario**. No reorganices todo el archivo si no hace falta.

---

## Revisión antes de entregar

Antes de darme el resultado como finalizado, comprueba siempre:

- [ ] ¿El código hace exactamente lo que pedí?
- [ ] ¿Hay errores obvios, variables sin definir o imports que faltan?
- [ ] ¿Funciona en el sistema operativo que estoy usando (indica cuál es si es relevante)?
- [ ] ¿Las rutas de archivos y nombres son correctos?
- [ ] ¿El código es fácil de entender para alguien no técnico?
- [ ] ¿He dejado algún dato sensible (contraseñas, claves API) escrito directamente en el código?

---

## Testing y verificación

- Antes de que yo pruebe algo, dime **exactamente qué pasos seguir** para verificar que funciona.
- Indícame **qué debería ver** si va bien y **qué mensajes de error** podrían aparecer si algo falla.
- Para proyectos con más de una funcionalidad, dame una **lista de pruebas básicas** que pueda hacer yo mismo sin saber programar.
- Si añades tests automáticos, explícame cómo ejecutarlos y qué significan los resultados.
- Cuando algo falla, **diagnostica el problema paso a paso** en lugar de reescribir todo desde cero.

---

## Gestión de archivos y cambios

- Antes de modificar o borrar un archivo importante, **avísame y pide confirmación**.
- Si el proyecto usa Git, haz commits con mensajes claros en español que expliquen qué cambió y por qué.
- Mantén una estructura de carpetas **ordenada y predecible**. Si vas a reorganizar algo, explícame el motivo.
- Los archivos de configuración sensibles (claves, contraseñas, tokens) nunca deben incluirse en el código. Usa archivos `.env` y asegúrate de que estén en `.gitignore`.

---

## Prioridades para proyectos personales

1. **Que funcione**: el objetivo principal es que haga lo que necesito.
2. **Que sea fácil de usar y mantener**: prefiero algo sencillo que pueda entender y modificar con ayuda.
3. **Que sea seguro en lo básico**: aunque sea personal, no quiero exponer datos ni crear vulnerabilidades evidentes.
4. **Rendimiento**: no es prioritario para uso personal, pero avísame si algo puede ser notablemente lento.

---

## Lo que NO quiero

- Que asumas que entiendo el código sin explicármelo.
- Que hagas cambios grandes sin avisarme antes.
- Que uses librerías o herramientas innecesariamente complejas para lo que es un proyecto personal.
- Que me des opciones sin recomendarme cuál elegir.
- Código sin comentarios en partes que no son evidentes.
