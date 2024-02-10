//Imports
import { esUnEmailValido, muestraDatosExp, host } from "./utils.js";


//Elementos del DOM
const emailEl=document.getElementById("email");
const idEventoEl= document.getElementById("idEvento");
const btnBuscarEl=document.getElementById("btnBuscar");
const eventoEl=document.getElementById("evento");
const btnSuscribirmeEl=document.getElementById("btnSuscribir")

//Mensajes
const mensajeEl=document.getElementById("mensaje");


//Enlaces
const urlObtenerEvento = host + "/events/search";
const urlSuscribirme =      host + "/events/addUserToEvent";

//Otras variables
let response;
let evento, eventoObjeto;

//Recuperamos cookies
// Se almacena una cookie tal que así->  Authorization=Y29ycmVvMUBjb3JyZW8uZXM6UGFzc3dvcmQx
//Creamos un array de String separando por el "=". Luego la segunda posicion del array (1) es la que deseamos
let cookies = document.cookie; 
let parts = cookies.split("=");
let credenciales = parts[1];


async function buscarEvento(){

  let eventosValores=["id","description","status","checkInDate","checkOutDate","place","price"];
  let listaOpcionesValores =["id","mail","price","place"];

    let mapEtiqEvento = new Map([
        ["id","id"],
        ["description","Descripción"],
        ["status","Estado"],
        ["checkInDate","Fecha de Entrada"],
        ["checkOutDate","Fecha de Salida"],
        ["place","Lugar"],
        ["price","Precio"],
    ]);


    




    //Borra estructura del DOM si ya se hubiese mostrado
    while (eventoEl.firstChild) {
        eventoEl.removeChild(eventoEl.firstChild);
    }

    if(esUnEmailValido(emailEl.value) && !idEventoEl.value==""){
        try{    
            response= await obtenerDatos();

            switch(response.status){
            case 200: evento = await response.json();
                break;
            
            case 400: mensajeEl="No se han encontrado datos";
                break;
            }

        }catch (error) {
            console.log(error.message);
        }

        if(evento==null){
            mensajeEl.textContent="No se han encontrado resultados"
        }else{
            mensajeEl.textContent="";
            muestraDatos(evento);
            console.log(evento)    ;
            // muestraDatos2(eventoEl, mapEtiqEvento, evento);
            muestraDatosExp(evento,eventoEl);
        }
    }
}

async function obtenerDatos() {
    const dto={
        email: emailEl.value,
        id:idEventoEl.value
    }
    const requestOptions = {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + credenciales
        },
        body: JSON.stringify(dto),
    };
    let response = await fetch(urlObtenerEvento,requestOptions);
    return response;
}
    
async function suscribirme(){
const apiUrl= urlSuscribirme  +"/"+idEventoEl.value;

    const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + credenciales
    },

    body: JSON.stringify(),
    };

    const response = await fetch(apiUrl, requestOptions);
    const data = await response.text();
}


function comprobarEmail(){
    let email=emailEl.value;
    if(!esUnEmailValido(email)){
        mensajeEl.innerText="El email no es válido";
        console.log("El email no es válido");
    }
}
function borrarErrores(){
    mensajeEl.innerText="";
}
//==================== L I S T E N E R S ====================
emailEl.addEventListener("blur",comprobarEmail);
emailEl.addEventListener("focus",borrarErrores);
eventoEl.addEventListener("focus",borrarErrores);
btnBuscarEl.addEventListener("click",buscarEvento);





function muestraDatos(event){
    let optionList = [
        "id", "description", "status", "checkInDate",
        "checkOutDate", "place", "price", "creator.email", "creator.fullName"
    ];

    optionList.forEach(valor=>{
        console.log(event.valor);
    })

    // Crea un nuevo párrafo para cada propiedad del objeto event
    let descriptionEl = document.createElement("p");
    let creatorDetailsDiv = document.createElement("div");
    let emailEl = document.createElement("p");
    let fullNameEl = document.createElement("p");
    let checkInDateEl = document.createElement("p");
    let checkOutDateEl = document.createElement("p");
    let placeEl = document.createElement("p");
    let priceEl = document.createElement("p");
    let statusEl = document.createElement("p");
    
    
    // Asignamos atributos a los elementos 
    descriptionEl.textContent = `Descripción: ${event.description}`;
    emailEl.textContent = `Email: ${event.creator.email}`;
    fullNameEl.textContent = `Nombre: ${event.creator.fullName}`;
    checkInDateEl.textContent = `Fecha Entrada: ${event.checkInDate}`;
    checkOutDateEl.textContent = `Fecha Salida: ${event.checkOutDate}`;
    placeEl.textContent = `Lugar: ${event.place}`;
    priceEl.textContent = `Precio: ${event.price}`;
    // statusEl.textContent = `Estado: ${event.status}`;
    
    //Suscriptores
    let detailsElSubscribers = document.createElement("details");
    let summaryElSubscribers = document.createElement("summary");
    summaryElSubscribers.textContent = `Usuarios suscritos ${event.subscribers.length}`;
    
    
    
    //Recorre la lista de suscriptores y crea los elementos p
    event.subscribers.forEach(subscriber => {
        let fullNameP = document.createElement("p");
        fullNameP.textContent = `Nombre: ${subscriber.fullName}`;
        detailsElSubscribers.appendChild(fullNameP);
        });
    
    // Colgamos del DOM los nuevos elementos
    eventoEl.appendChild(detailsElSubscribers);
    detailsElSubscribers.appendChild(summaryElSubscribers);
    eventoEl.appendChild(descriptionEl);
    eventoEl.appendChild(checkInDateEl);
    eventoEl.appendChild(checkOutDateEl);
    eventoEl.appendChild(placeEl);
    eventoEl.appendChild(priceEl);
    
    
    
    
    // Recorre la lista de opciones y crea los elementos details y summary
    event.optionList.forEach((option, index) => {
        // Crear el contenedor principal para cada opción
        let detailsElOption = document.createElement("details");
        let summaryElOption = document.createElement("summary");
        summaryElOption.textContent = `Opción (${index + 1}) Usuarios: ${event.subscribers.length} Personas: ${option.peopleList.length}`;
        detailsElOption.appendChild(summaryElOption);
    
        // Agregar descripción, usuario creador, precio, fechas, etc.
        let descriptionP = document.createElement("p");
        descriptionP.textContent = `Descripción: ${option.description}`;
        detailsElOption.appendChild(descriptionP);
    
        let mailCreatorP = document.createElement("p");
        mailCreatorP.textContent = `Usuario Creador: ${option.mail}`;
        detailsElOption.appendChild(mailCreatorP);
    
        let priceP = document.createElement("p");
        priceP.textContent = `Precio: ${option.price}`;
        detailsElOption.appendChild(priceP);
    
        let checkInDateP = document.createElement("p");
        checkInDateP.textContent = `Fecha Entrada: ${option.checkInDate}`;
        detailsElOption.appendChild(checkInDateP);
    
        let checkOutDateP = document.createElement("p");
        checkOutDateP.textContent = `Fecha Salida: ${option.checkOutDate}`;
        detailsElOption.appendChild(checkOutDateP);
    
        // Muestra los posts
        let detailsElPosts = document.createElement("details");
        let summaryElPosts = document.createElement("summary");
        summaryElPosts.textContent = `Posts (${option.postList.length})`;
        detailsElPosts.appendChild(summaryElPosts);
        detailsElOption.appendChild(detailsElPosts);
    
        // Recorre la lista de posts y crea los elementos p
        option.postList.forEach(post => {
            let postDescriptionP = document.createElement("p");
            postDescriptionP.textContent = `${post.email}: ${post.description}`;
            detailsElPosts.appendChild(postDescriptionP);
        });
    
        // Muestra los participantes por opción
        let detailsElParticipants = document.createElement("details");
        let summaryElParticipants = document.createElement("summary");
        summaryElParticipants.textContent = `Participantes (${option.peopleList.length})`;
        detailsElParticipants.appendChild(summaryElParticipants);
        detailsElOption.appendChild(detailsElParticipants);
    
        // Recorre la lista de participantes y crea los elementos p
        option.peopleList.forEach(person => {
            let personNameP = document.createElement("p");
            personNameP.textContent = `Nombre: ${person.name}`;
            detailsElParticipants.appendChild(personNameP);
        });
    
        let btnApuntarmeEl= document.createElement("button");
        btnApuntarmeEl.textContent="Apuntarme!";
        btnApuntarmeEl.id= `opcion${option.id}`;
        detailsElOption.appendChild(btnApuntarmeEl);
        
    
        // Agregar el contenedor de la opción al contenedor principal de opciones
        eventoEl.appendChild(detailsElOption);
    
    //==================== L I S T E N E R S ====================
        btnApuntarmeEl.addEventListener("click",suscribirme)
    });
    
    
    
    }