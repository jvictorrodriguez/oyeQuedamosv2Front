//Imports
import { host } from './utils.js';

//Elementos del DOM
const usuarioEl=document.getElementById("usuario");
const eventsListEl = document.getElementById("events-list");

//Enlaces
// const host = 'http://localhost:8080';
// localhost:8080/events/11
const detalleEvento = host+"/events/"


//Recuperamos cookies
// Se almacena una cookie tal que así->  Authorization=Y29ycmVvMUBjb3JyZW8uZXM6UGFzc3dvcmQx
//Creamos un array de String separando por el "=". Luego la segunda posicion del array (1) es la que deseamos
let cookies = document.cookie; 
let parts = cookies.split("=");
let credenciales = parts[1];



function muestraDatos(events){
  eventsListEl.innerHTML="";
  events.forEach(event => {
    const idEvento = event.id;
    

    let imagenEl = document.createElement("img");
    imagenEl.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Barbados_beach.jpg/250px-Barbados_beach.jpg";
    imagenEl.alt = "imagen";

    const eventItemEl = document.createElement("li");
    eventItemEl.classList.add("event-item");

    let labelCreadorEl = document.createElement("label");
    labelCreadorEl.innerText="Creador";
    
    let userFullnameEl = document.createElement("p");
    userFullnameEl.innerText= event.creator.fullName;
    
    let labelDescripcionEl = document.createElement("label");
    labelDescripcionEl.innerText="Descripción";

    let descriptionEl = document.createElement("a");
    descriptionEl.href=detalleEvento+idEvento;
    descriptionEl.innerText= event.description;

    
    let labelFechaLlegadaEl = document.createElement("label");
    labelFechaLlegadaEl.innerText="Fecha Llegada";

    let fechaCheckInEl = document.createElement("p");
    fechaCheckInEl.innerText= event.checkInDate;
    
    let labelFechaSalidaEl = document.createElement("label");
    labelFechaSalidaEl.innerText="Fecha Salida";

    let fechaCheckOutEl = document.createElement("p");
    fechaCheckOutEl.innerText= event.checkOutDate;
    
    let labelLugarEl = document.createElement("label");
    labelLugarEl.innerText="Lugar";

    let lugarEl = document.createElement("p");
    lugarEl.innerText= event.place;

    let labelEstadoEl = document.createElement("label");
    labelEstadoEl.innerText="Estado";

    let statusEl = document.createElement("p");
    statusEl.innerText= event.status;

    eventsListEl.appendChild(eventItemEl);
    eventItemEl.appendChild(imagenEl);
    eventItemEl.appendChild(labelDescripcionEl);
    eventItemEl.appendChild(descriptionEl);
   
    eventItemEl.appendChild(labelCreadorEl);
    eventItemEl.appendChild(userFullnameEl);
    
    eventItemEl.appendChild(labelFechaLlegadaEl);
    eventItemEl.appendChild(fechaCheckInEl);

    eventItemEl.appendChild(labelFechaSalidaEl);
    eventItemEl.appendChild(fechaCheckOutEl);
    eventItemEl.appendChild(labelLugarEl);
    eventItemEl.appendChild(lugarEl);
    eventItemEl.appendChild(labelEstadoEl);
    eventItemEl.appendChild(statusEl);
    
  });
}
    
async function obtenUsuario(){
      const apiUrl = host + "/api/v1/user/signIn";

        //Configura la llamada POST al servidor
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + credenciales
        },
        body: JSON.stringify(),
      };
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.text();
      // usuarioEl.innerHTML=data;
      return data;
}
async function obtenDatos() {
    const apiUrl= host +"/events/all";

    const requestOptions = {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + credenciales
          },
          body: JSON.stringify(),
        };

    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    return data;
}

async function init() {
  const usuario = await obtenUsuario();
  // usuarioEl.innerHTML=usuario;
  const events = await obtenDatos();
    muestraDatos(events);
    console.log(events);
}

init();  