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
//VAMOS A CREAR LAS CARDS//
//primero llamamos a la seccion contenedora//
let contenedorDECards=document.querySelector("#sec-card");
//creamos la plantilla//
let crearPlantilla= (tarjets)=>{
    return`<main class="card" style="width: 18rem;">
    <img class="img-cards" src="${tarjets.image}" class="card-img-top" alt="${tarjets.name}">
    <div class="card-body">
        <h5 class="card-title">${tarjets.name}</h5>
        <p class="card-text">${tarjets.description}</p>
        <div class="price-btn">
        <p class="text-price">Price: $${tarjets.price}</p>
        <a href="./assets/pages/Details.html?id=${tarjets._id}" class="btn btn-primary">Details</a>  
        </div>
    </div>
    </main>` 
}
//creamos una funcion que carge datos a la funcion crear plantilla//
let cargarLosDatos=(evento)=>{
let template=""; //creamos la maqueta que va a estar vacia para despues llenarla con los datos//
evento.forEach(Objeto=> { //recorremos cada objeto del evento//
    template+=crearPlantilla(Objeto); // ahora cada objeto va a cargarse en la funcion crear plantilla y a su vez se almacena en template//
});
contenedorDECards.innerHTML=template; //ahora mandamos la info que esta guardada en la maqueta a nuestro html//
}
cargarLosDatos(data.events); //llamamos la funcion para que se ejecute con los parametros que acceden a la data//
//VAMOS A INTENTAR CARGAR LOS CHECKBOX//
let contenedorDeChecks=document.querySelector("#checkbox-id")
//creamos la plantilla de los checks//
let PlantillaDeLosChecks= (checks)=>{
return `<div class="form-check form-check-inline" id="${checks}-div">
    <input class="form-check-input" type="checkbox" id="${checks}-input" value="${checks}">
    <label class="form-check-label" for="${checks}-input">${checks}</label>
    </div>`;
}
//creamos la funcion cargas los checks//
let cargarLosChekcs= (evento)=>{
let template="";
let ArraySinRepetir= new Set(evento.map(objeto=>objeto.category)); //yo estoy mapeandoo el evento y lo cargo en una nueva variable el map me esta
console.log(ArraySinRepetir)//devolviendo un nuevo array//
ArraySinRepetir.forEach(category=>{ //aqui usamos category porque el array que estamos haciendop forEach tiene el array category mas no un objeto//
template+=PlantillaDeLosChecks(category); //se cargan  los array de category en la plantilla de checks y a su vez se guarda en template//
})
contenedorDeChecks.innerHTML=template; //ahora guardamos lo de template y lo mandamos a nuestro html//
}
cargarLosChekcs(data.events); //ejecutamos la funcion y accedemos al array de datos//

//VAMOS A FILTRAR LOS CHECKS PARA QUE SEAN DINAMICOS//
//Añadimos un escuchador de eventos a los checks//
contenedorDeChecks.addEventListener('change', event => {
//necesitamos filtrar las cards por los check que esten en checked//
let checkbox=Array.from(document.querySelectorAll("#checkbox-id input[type=checkbox]:checked")).map(check=>check.value);
//estamos guardando en la variable checkbox los checbox que esten en checked y la convertimos a array para poder acceder a los metodos de array//
if(checkbox.length == 0){
cargarLosDatos(data.events);
}
else{
const filtrados=data.events.filter((elemento)=>checkbox.includes(elemento.category));
cargarLosDatos(filtrados);    
}
}); 
//CREAMOS UN FILTER PARA EL SEARCH://
let $inputSearch = document.querySelector("#input-search");
$inputSearch.addEventListener("keyup", search => {
const filtrados = data.events.filter(elemento =>
        elemento.category.toLowerCase().includes(search.target.value.toLowerCase().trim())
      );
  cargarLosDatos(filtrados);
});