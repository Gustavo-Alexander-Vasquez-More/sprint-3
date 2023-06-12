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

//CARGAR LA CARD FILTRADA//
let $ContenedorCardDetails=document.querySelector("#card-filter-details")

const params= new URLSearchParams(location.search)
const id= params.get("id");
const eventoEncontrado= data.events.find(elemento=> elemento._id==id)

$ContenedorCardDetails.innerHTML = `<img src="${eventoEncontrado.image}" class="card-img-top" alt="${eventoEncontrado.name}">
<div class="card-body" id="card-body-details">
<h5 class="card-title">${eventoEncontrado.name}</h5>
<p class="card-text">Date: ${eventoEncontrado.date}</p>
<p class="card-text">Description: ${eventoEncontrado.description}</p>
<p class="card-text">Place: ${eventoEncontrado.place}</p>
<p class="card-text">Capacity: ${eventoEncontrado.capacity}</p>
<p class="card-text">Assistance: ${eventoEncontrado.assistance}</p>
<p class="card-text">Price: ${eventoEncontrado.price}</p>
</div>`;