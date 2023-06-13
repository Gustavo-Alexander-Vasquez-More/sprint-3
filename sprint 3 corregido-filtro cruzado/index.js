//ESTO ES PARA EL CARROUSEL DE IMAGENES//
const colocarImagenes = document.querySelector(".seccion-carrousel"); //LLAMAMOS POR CLASE AL CARROUSEL//
//CREAMOS LA FUNCION QUE CONTIENE LA PLANTILLA DEL CARROUSEL//
function InsertarImagenes(imagen) {
    //RECIBE UN PARÁMETRO QUE REPRESENTA UNA IMAGEN DEL EVENTO//
    return `<div class="carousel-item">
    <img src="${imagen.image}" class="img-carrousel d-block w-100" alt="${imagen.name}">
  </div>`;
}
//CREAMOS UNA FUNCION QUE CARGUE LAS IMAGENES AL CARROUSEL//
function cargarImagenes(elementos) {
    //RECIBE COMO PARAMETRO LOS ELEMENTOS DEL EVENTO//
    let template = ""; //CREAMOS UNA PLANTILLA TEMPLATE VACIA PARA DESPUES IR CONCATENANDO CADA IMAGEN//
    for (const elemento of elementos) {
        //HACEMOS LA ITERACION//
        template += InsertarImagenes(elemento); //CARGAMOS EN EL TEMPLATE LA FUNCION INSERTAR IMAGENES REEMPLAZANDO EL PARAMETRO POR EL ELEMENTO,
    } //QUE SE GENERA EN EL BUCLE POR ENDE LA INTERPOLACION QUEDARIA COMO CADA ELEMENTO(OBJETO) QUE ACCEDE A SU PROPIEDAD//
    //CARGAMOS LA PLANTILLA AL HTML//
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
    const carousel = document.querySelector("#carouselExampleAutoplaying"); //LLAMAMOS AL CARROUSEL AUTOPLAYING POR SU ID//
    carousel.querySelector(".carousel-item").classList.add("active"); //LLAMAMOS POR CLASE AL CARROUSEL ITEM Y LE AGREGAMOS UNA CLASE "ACTIVE PARA QUE PUEDA HACER AUTOPLAY"
    new bootstrap.Carousel(carousel, { interval: 3000 }); //Y ACA LE DAMOS LOS INTERVALOS DE REPRODUCCION//
}
cargarImagenes(data.events);
/////------------------------------------------------------------//
//VAMOS A CREAR LOS CHECKS//
let contenedorDeChecks = document.querySelector("#checkbox-id");
// Crear la plantilla para los checkboxes
const crearPlantillaChecks = (categoria) => {
  // Crear el contenedor div
  const divElement = document.createElement("div");
  divElement.classList.add("form-check", "form-check-inline");
  divElement.id = `${categoria}-div`;

  // Crear el input checkbox
  const inputElement = document.createElement("input");
  inputElement.classList.add("form-check-input");
  inputElement.type = "checkbox";
  inputElement.id = `${categoria}-input`;
  inputElement.value = categoria;

  // Crear la etiqueta label
  const labelElement = document.createElement("label");
  labelElement.classList.add("form-check-label");
  labelElement.htmlFor = `${categoria}-input`;
  labelElement.textContent = categoria;

  // Agregar los elementos al contenedor div
  divElement.appendChild(inputElement);
  divElement.appendChild(labelElement);

  return divElement;
};

// Cargar los checkboxes
const cargarChecks = (eventos) => {
    let categorias = new Set(eventos.map((objeto) => objeto.category))// el map me va acrear un array asi=[Food Fair,Museum,Costume Party,Music Concert,Race,Book Exchange,Cinema]
  categorias.forEach((elementoDelSet) => {//pero el map me va a devolver un array con las categorias repetidas//en resumen extrae la categoria de cada objeto)
    const plantillaCheck = crearPlantillaChecks(elementoDelSet);
    contenedorDeChecks.appendChild(plantillaCheck);
  });
};
cargarChecks(data.events);
//VAMOS A CREAR EL SEARCH//
const contenedorDeChecksAndSearch=document.querySelector("#box-checks");
const contenedorSeARCH=document.createElement("form")
contenedorSeARCH.classList.add("d-flex")
contenedorSeARCH.role= "Search"
contenedorSeARCH.id="search"
const inputElement=document.createElement("input");
inputElement.id="input-search"
inputElement.classList.add("form-control","me-2")
inputElement.type="search"
inputElement.placeholder= "Search event for name"
inputElement.setAttribute("aria-label", "Search");
//vamos a cargarlos//
contenedorSeARCH.appendChild(inputElement)
contenedorDeChecksAndSearch.appendChild(contenedorSeARCH);

//VAMOS A AGREGAR LAS CARDS POR NODOS//
//llamamos al contenedor//
const contenedorDeCards = document.querySelector("#sec-card");
function cargarLasCards(objeto){
data.events.forEach(objeto => {
    const mainElement = document.createElement("div");
    mainElement.classList.add("card");
    mainElement.style.width = "18rem";

    const imgElement = document.createElement("img");
    imgElement.classList.add("img-cards");
    imgElement.src = objeto.image;
    imgElement.classList.add("card-img-top");
    imgElement.alt = objeto.name;

    const bodyElement = document.createElement("div");
    bodyElement.classList.add("card-body");

    const h5Element = document.createElement("h5");
    h5Element.classList.add("card-title");
    h5Element.textContent = objeto.name;

    const pElement = document.createElement("p");
    pElement.classList.add("card-text");
    pElement.textContent = objeto.description;

    const divPriceBtn = document.createElement("div");
    divPriceBtn.classList.add("price-btn");

    const pBtnElement = document.createElement("p");
    pBtnElement.classList.add("text-price");
    pBtnElement.textContent = `Price: $${objeto.price}`;

    const btnPrice = document.createElement("a");
    btnPrice.href = `./assets/pages/Details.html?id=${objeto._id}`;
    btnPrice.classList.add("btn", "btn-primary");
    btnPrice.textContent = "Details";

    divPriceBtn.appendChild(pBtnElement);
    divPriceBtn.appendChild(btnPrice);
    bodyElement.appendChild(h5Element);
    bodyElement.appendChild(pElement);
    bodyElement.appendChild(divPriceBtn);
    mainElement.appendChild(imgElement);
    mainElement.appendChild(bodyElement);

    contenedorDeCards.appendChild(mainElement);
});
}
cargarLasCards(data.events);
// Función para filtrar las tarjetas por categoría y nombre
const filtrarTarjetas = () => {
    // Obtener el valor del input de búsqueda
    const busqueda = document.getElementById('input-search').value.toLowerCase();
  
    // Obtener los checkboxes seleccionados
    const checkboxes = document.querySelectorAll('.form-check-input:checked');
    const categoriasSeleccionadas = Array.from(checkboxes).map((checkbox) => checkbox.value);
  
    // Filtrar las tarjetas por categoría y nombre
    const tarjetasFiltradas = data.events.filter((tarjeta) => {
      const categoriaCoincide = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(tarjeta.category);
      const nombreCoincide = tarjeta.name.toLowerCase().includes(busqueda);
      return categoriaCoincide && nombreCoincide;
    });
  
    // Mostrar o ocultar las tarjetas según el resultado del filtrado
    const contenedorDeCards = document.querySelector('#sec-card');
    contenedorDeCards.innerHTML = '';
    if (tarjetasFiltradas.length === 0) {
        // Mostrar cuadro de confirmación si no se encontraron resultados
        if (confirm('No se han encontrado resultados de su búsqueda. ¿Desea cargar todas las tarjetas nuevamente?')) {
          cargarLasCards(data.events);
        }
   
}
    else {
      // Mostrar las tarjetas filtradas
      tarjetasFiltradas.forEach((tarjeta) => {
        // Crear y agregar las tarjetas al contenedor
        const mainElement = document.createElement("div");
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
        btnPrice.href = `./assets/pages/Details.html?id=${tarjeta._id}`;
        btnPrice.classList.add("btn", "btn-primary");
        btnPrice.textContent = "Details";
  
        divPriceBtn.appendChild(pBtnElement);
        divPriceBtn.appendChild(btnPrice);
        bodyElement.appendChild(h5Element);
        bodyElement.appendChild(pElement);
        bodyElement.appendChild(divPriceBtn);
        mainElement.appendChild(imgElement);
        mainElement.appendChild(bodyElement);
  
        contenedorDeCards.appendChild(mainElement);
      });
    }
  };
  
  // Evento para filtrar las tarjetas al presionar Enter en el input de búsqueda
  document.getElementById('input-search').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      filtrarTarjetas();
    }
  });
  
  // Evento para filtrar las tarjetas al hacer clic en los checkboxes
  const checkboxes = document.querySelectorAll('.form-check-input');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', filtrarTarjetas);
  });