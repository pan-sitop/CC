export const TRIVIA_QUESTIONS = [
  {
      question: "En la segmentación semántica de HTML5, ¿qué etiqueta es la más adecuada para englobar el contenido principal y único de un documento?",
      options: ["<section>", "<div>", "<main>", "<article>"],
      answer: 2, 
  },
  {
      question: "¿Qué etiqueta semántica se utiliza para representar un contenido independiente que podría ser distribuido por sí solo, como una noticia o un post de un blog?",
      options: ["<section>", "<article>", "<aside>", "<header>"],
      answer: 1, 
  },
  {
      question: "En formularios HTML, ¿qué atributo de la etiqueta `<input>` se usa para definir el tipo de dato que se va a introducir (texto, contraseña, email, etc.)?",
      options: ["kind", "class", "type", "format"],
      answer: 2,
  },
  {
      question: "¿Qué etiqueta se utiliza para agrupar visualmente elementos relacionados dentro de un formulario y suele ir acompañada de `<legend>`?",
      options: ["<group>", "<fieldset>", "<form-group>", "<section>"],
      answer: 1,
  },
  {
      question: "¿Qué atributo en HTML5 asegura que el usuario no pueda enviar el formulario si un campo está vacío?",
      options: ["required", "mandatory", "validate", "important"],
      answer: 0,
  },
  {
      question: "¿Cuál es el valor por defecto de la propiedad 'position' en CSS, que hace que el elemento siga el flujo normal del documento?",
      options: ["relative", "absolute", "static", "fixed"],
      answer: 2,
  },
  {
      question: "¿Qué valor de 'position' elimina por completo al elemento del flujo normal del documento, posicionándolo relativo a su ancestro posicionado más cercano?",
      options: ["relative", "absolute", "sticky", "fixed"],
      answer: 1,
  },
  {
      question: "¿Qué valor de 'position' permite que un elemento se desplace con el scroll hasta cierto punto y luego se quede 'pegado' en la pantalla?",
      options: ["fixed", "absolute", "relative", "sticky"],
      answer: 3,
  },
  {
      question: "En el Box Model, si width es 100px, border es 5px, padding es 10px y margin es 20px (box-sizing: content-box), ¿cuánto espacio TOTAL ocupa horizontalmente el elemento en la pantalla?",
      options: ["100px", "130px", "170px", "150px"],
      answer: 2, 
  },
  {
      question: "Para que un contenedor Flex alinee sus elementos a los extremos (uno al inicio, otro al final) de su eje principal, usamos:",
      options: ["justify-content: space-around;", "align-items: flex-end;", "justify-content: space-between;", "align-content: stretch;"],
      answer: 2,
  },
  {
      question: "Lee el siguiente fragmento HTML:\n```html\n<a href='https://google.com' target='_blank'>Ir a Google</a>\n```\n¿Qué hace el atributo target='_blank'?",
      options: ["Abre el link en modo incógnito", "Abre el link en una nueva pestaña o ventana", "Evita que la página actual cargue caché", "Descarga el contenido de la web"],
      answer: 1,
  },
  {
      question: "En Flexbox, ¿qué propiedad permite alinear los elementos en el eje transversal (cross axis) dentro de un contenedor de una sola línea?",
      options: ["justify-content", "align-content", "align-items", "flex-wrap"],
      answer: 2,
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
      question: "¿Qué unidad CSS es recomendada para el tamaño de fuente porque respeta las preferencias del usuario configuradas en su navegador?",
      options: ["px", "rem", "vh", "pt"],
      answer: 1,
  }
];

export const TIEBREAKER_QUESTION = {
    question: "PREGUNTA DE MUERTE SÚBITA (Desempate Final):\nEn Flexbox, ¿cuál es la principal diferencia entre `align-items` y `align-content`?",
    options: [
        "`align-items` alinea elementos en el eje principal, `align-content` en el transversal.",
        "`align-items` afecta a los elementos en su línea actual, mientras que `align-content` distribuye el espacio libre entre múltiples líneas cuando hay `flex-wrap: wrap`.",
        "Son exactamente lo mismo, solo es una sintaxis distinta introducida en HTML5.",
        "`align-content` solo funciona si el `flex-direction` es `column`."
    ],
    answer: 1, 
};
