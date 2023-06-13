//ESTO ES PARA EL carrusel
const colocarImagenes = document.querySelector(".seccion-carrousel");

function InsertarImagenes(imagen) {
    return `<div class="carousel-item">
    <img src="${imagen.image}" class="img-carrousel d-block w-100" alt="${imagen.name}">
  </div>`;
}

function cargarImagenes(elementos) {
    let template = "";
    for (const elemento of elementos) {
    template += InsertarImagenes(elemento);
}
    colocarImagenes.innerHTML = `
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div class="carousel-inner">
        ${template}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
        </button>
    </div>`;
// Inicializar el carrusel con autoplay
    const carousel = document.querySelector("#carouselExampleAutoplaying");
    carousel.querySelector(".carousel-item").classList.add("active");
    new bootstrap.Carousel(carousel, { interval: 3000 });
}
cargarImagenes(data.events);

//VAMOS A CARGAR LAS CARDS//
//primero llamamos a la seccion contenedora//
let contenedorDeCards = document.querySelector("#sec-card-past");
let contenedorDeChecks = document.querySelector("#checkbox-id");
let $inputSearch = document.querySelector("#input-search");

// Función para crear el nodo de cada tarjeta
let crearNodoTarjeta = (tarjeta) => {
  const mainElement = document.createElement("main");
  mainElement.classList.add("card");
  mainElement.style.width = "18rem";

  const imgElement = document.createElement("img");
  imgElement.classList.add("img-cards");
  imgElement.src = tarjeta.image;
  imgElement.classList.add("card-img-top");
  imgElement.alt = tarjeta.name;

  const bodyElement = document.createElement("div");
  bodyElement.classList.add("card-body");

  const h5Element = document.createElement("h5");
  h5Element.classList.add("card-title");
  h5Element.textContent = tarjeta.name;

  const pElement = document.createElement("p");
  pElement.classList.add("card-text");
  pElement.textContent = tarjeta.description;

  const divPriceBtn = document.createElement("div");
  divPriceBtn.classList.add("price-btn");

  const pBtnElement = document.createElement("p");
  pBtnElement.classList.add("text-price");
  pBtnElement.textContent = `Price: $${tarjeta.price}`;

  const btnPrice = document.createElement("a");
  btnPrice.href = `../pages/Details.html?id=${tarjeta._id}`;
  btnPrice.classList.add("btn", "btn-primary");
  btnPrice.textContent = "Details";

  divPriceBtn.appendChild(pBtnElement);
  divPriceBtn.appendChild(btnPrice);
  bodyElement.appendChild(h5Element);
  bodyElement.appendChild(pElement);
  bodyElement.appendChild(divPriceBtn);
  mainElement.appendChild(imgElement);
  mainElement.appendChild(bodyElement);

  return mainElement;
};

// Función para cargar las tarjetas iniciales
let cargarLosDatos = (eventos) => {
  contenedorDeCards.innerHTML = "";

  let fechaBase = new Date(data.currentDate);

  eventos.forEach((evento) => {
    let fechaEvento = new Date(evento.date);

    if (fechaEvento < fechaBase) {
      const tarjetaNode = crearNodoTarjeta(evento);
      contenedorDeCards.appendChild(tarjetaNode);
    }
  });
  
  if (contenedorDeCards.children.length === 0) {
    const confirmacion = confirm('No se han encontrado resultados de su búsqueda. ¿Desea cargar todas las tarjetas nuevamente?');
    if (confirmacion) {
      cargarLosDatos(data.events);
    }
  }
};

// Función para crear el nodo de cada checkbox
let crearNodoCheckbox = (checks) => {
  const divElement = document.createElement("div");
  divElement.classList.add("form-check", "form-check-inline");
  divElement.id = `${checks}-div`;

  const inputElement = document.createElement("input");
  inputElement.classList.add("form-check-input");
  inputElement.type = "checkbox";
  inputElement.id = `${checks}-input`;
  inputElement.value = checks;

  const labelElement = document.createElement("label");
  labelElement.classList.add("form-check-label");
  labelElement.htmlFor = `${checks}-input`;
  labelElement.textContent = checks;

  divElement.appendChild(inputElement);
  divElement.appendChild(labelElement);

  return divElement;
};

// Función para cargar los checkboxes
let cargarLosChekcs = (eventos) => {
  contenedorDeChecks.innerHTML = "";

  let categorias = Array.from(new Set(eventos.map((objeto) => objeto.category)));

  categorias.forEach((category) => {
    const checkboxNode = crearNodoCheckbox(category);
    contenedorDeChecks.appendChild(checkboxNode);
  });
};

// Función para filtrar las tarjetas
let filtrarTarjetas = () => {
  const busqueda = $inputSearch.value.toLowerCase().trim();
  const checkboxes = document.querySelectorAll("#checkbox-id input[type=checkbox]:checked");
  const categoriasSeleccionadas = Array.from(checkboxes).map((checkbox) => checkbox.value);

  const tarjetasFiltradas = data.events.filter((tarjeta) => {
    const categoriaCoincide = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(tarjeta.category);
    const nombreCoincide = tarjeta.name.toLowerCase().includes(busqueda);
    return categoriaCoincide && nombreCoincide;
  });

  cargarLosDatos(tarjetasFiltradas);
};

// Cargar las tarjetas iniciales y los checkboxes
cargarLosDatos(data.events);
cargarLosChekcs(data.events);

// Añadir event listener para filtrar las tarjetas al cambiar los checkboxes
contenedorDeChecks.addEventListener("change", filtrarTarjetas);

// Añadir event listener para filtrar las tarjetas al ingresar texto en el input de búsqueda
$inputSearch.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    filtrarTarjetas();
  }
});
