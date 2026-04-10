export const TRIVIA_QUESTIONS = [
  {
      question: "¿Cuál de estos selectores CSS tiene la MAYOR especificidad absoluta?",
      options: ["Dos IDs: #nav #logo", "Un estilo en línea (style='...')", "Una clase y cien etiquetas: .header p p ...", "La pseudo-clase :root"],
      answer: 1, 
  },
  {
      question: "En el Box Model, si width es 100px, border es 5px, padding es 10px y margin es 20px (box-sizing: content-box), ¿cuánto espacio TOTAL ocupa horizontalmente el elemento en la pantalla?",
      options: ["100px", "130px", "170px", "150px"],
      answer: 2, 
  },
  {
      question: "¿Qué valor de 'position' elimina por completo al elemento del flujo normal del documento, posicionándolo relativo a su ancestro posicionado más cercano?",
      options: ["relative", "absolute", "sticky", "fixed"],
      answer: 1,
  },
  {
      question: "Para que un contenedor Flex alinee sus elementos a los extremos (uno al inicio, otro al final) de su eje principal, usamos:",
      options: ["justify-content: space-around;", "align-items: flex-end;", "justify-content: space-between;", "align-content: stretch;"],
      answer: 2,
  },
  {
      question: "¿Cuál de las siguientes etiquetas HMTL NO tiene valor semántico por sí sola?",
      options: ["<article>", "<main>", "<span>", "<figure>"],
      answer: 2,
  },
  {
      question: "En CSS, ¿qué unidad relativa se basa directamente en el tamaño de fuente del elemento raíz (<html>)?",
      options: ["em", "rem", "vh", "%"],
      answer: 1,
  },
  {
      question: "Si queremos diseñar pensando primero en celulares ('Mobile First'), ¿qué tipo de Media Query usamos usualmente?",
      options: ["@media (max-width: 768px)", "@media (min-width: 768px)", "@media screen and (print)", "@import url()"],
      answer: 1,
  },
  {
      question: "En Flexbox, ¿qué propiedad permite cambiar el orden visual de un ítem sin cambiar el HTML?",
      options: ["z-index", "flex-direction", "order", "flex-grow"],
      answer: 2,
  },
  {
      question: "¿Cuál es el comportamiento por defecto de la propiedad 'flex-wrap' en un contenedor flex?",
      options: ["wrap", "nowrap", "wrap-reverse", "auto"],
      answer: 1,
  },
  {
      question: "¿Qué propiedad en CSS Grid se usa para construir explícitamente el layout nombrando áreas específicas de la cuadrícula?",
      options: ["grid-template-areas", "grid-area-names", "grid-template-columns", "grid-auto-flow"],
      answer: 0,
  },
  // Bloques de código
  {
      question: "Lee el siguiente fragmento HTML:\n```html\n<a href='https://google.com' target='_blank'>Ir a Google</a>\n```\n¿Qué hace el atributo target='_blank'?",
      options: ["Abre el link en modo incógnito", "Abre el link en una nueva pestaña o ventana", "Evita que la página actual cargue caché", "Descarga el contenido de la web"],
      answer: 1,
  },
  {
      question: "¿Qué color tendrá el texto dentro del párrafo según este código CSS?\n```css\np { color: red; }\n#alerta { color: blue; }\np.texto-importante { color: green !important; }\n```\n```html\n<p id='alerta' class='texto-importante'>¡Cuidado!</p>\n```",
      options: ["Rojo", "Verde", "Azul", "Negro (Default)"],
      answer: 1,
  },
  {
      question: "En el siguiente contenedor Flexbox, ¿qué ocurrirá con los elementos?\n```css\n.container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n```",
      options: ["Se alinearán horizontalmente en el centro", "Se apilarán verticalmente y se centrarán horizontalmente dentro del contenedor", "Se estirarán para ocupar todo el ancho", "Se posicionarán en las cuatro esquinas"],
      answer: 1,
  },
  {
      question: "Analiza el siguiente Box Model:\n```css\n.caja {\n  box-sizing: border-box;\n  width: 200px;\n  padding: 20px;\n  border: 5px solid black;\n}\n```\n¿Cuál es el ancho real del ÁREA DE CONTENIDO (donde va el texto)?",
      options: ["200px", "150px", "250px", "240px"],
      answer: 1,
  },
  {
      question: "Si aplicamos este CSS a un contenedor, ¿qué efecto visual lograremos?\n```css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}\n```",
      options: ["Una sola columna con 3 filas iguales", "3 columnas de igual ancho con un espacio de 10px entre ellas", "3 columnas que ocupan cada una 10px de ancho", "Un diseño flexbox que salta de línea cada 10px"],
      answer: 1,
  }
];

export const TIEBREAKER_QUESTION = {
    question: "PREGUNTA DE MUERTE SÚBITA (Desempate Final):\nEn CSS Grid, si usamos:\n```css\ngrid-template-columns: minmax(100px, 1fr) 2fr;\n```\n¿Qué le estamos diciendo al navegador sobre la primera columna?",
    options: [
        "Que ocupa mínimo 100px y siempre crecerá igual que la segunda",
        "Que ocupa exactamente 100px estáticos y la otra el resto",
        "Que nunca será más pequeña que 100px, pero si hay espacio extra crecerá ocupando la mitad (1fr) de lo que crezca la segunda (2fr)",
        "Que ocupará el 100% del espacio, reemplazando a '1fr'"
    ],
    answer: 2, 
};
