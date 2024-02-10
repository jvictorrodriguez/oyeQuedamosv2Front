//imports
import { host } from "./utils.js";

//Elementos del DOM
//Input Imagen
const imageUpload = document.getElementById('imageUpload');
const previewImage = document.getElementById('previewImage');
//formulario
const formularioEl= document.getElementsByTagName("form")[0];
//Input Texto
const descripcionElI= document.getElementById("description");
const checkInDateElI= document.getElementById("checkInDate");
const checkOutDateElI= document.getElementById("checkOutDate");
const placeElI= document.getElementById("place");
const priceElI= document.getElementById("price");

//Botón
const btnAltaEventoEl= document.getElementById("btnAltaEvento");

//Mensajes
const mensajeEl = document.getElementById("mensaje");

//Errores
let errorDescripcion="La descrición no puede estar vacía";
let errorFecha="La fecha no puede estar vacía";
let errorLugar="El lugar no puede estar vacío";

//Otras variables
let descripcionOK, checkInDateOK, checkOutDateOK, placeOK;


//Enlaces
// const host = "http://localhost:8080";
const urlCrearEvento = host + "/events";

//Recuperamos cookies
// Se almacena una cookie tal que así->  Authorization=Y29ycmVvMUBjb3JyZW8uZXM6UGFzc3dvcmQx
//Creamos un array de String separando por el "=". Luego la segunda posicion del array (1) es la que deseamos
let cookies = document.cookie; 
let parts = cookies.split("=");
let credenciales = parts[1];

//Gestión de la imagen
function previsualizarImagen(){
  if (this.files && this.files[0]) {
    let reader = new FileReader();

    reader.onload = function(e) {
        previewImage.src = e.target.result;
        previewImage.style.display = 'block'; // Muestra la imagen
    };

    reader.readAsDataURL(this.files[0]);
  }
}


async function altaEvento(){
//Comprobamos que los valores estén correctamente informados
descripcionOK= comprobarCampoNoVacio(errorDescripcion, descripcionElI);
checkInDateOK= comprobarCampoNoVacio(errorFecha, checkInDateElI);
checkOutDateOK= comprobarCampoNoVacio(errorFecha,checkOutDateElI);
placeOK=comprobarCampoNoVacio(errorLugar,placeElI);

if(descripcionOK&checkInDateOK&checkOutDateOK&placeOK){
  //Todas las validaciones son correctas
}else{
  //Al menos una es incorrecta. No podemos continuar
  return;
}
  
  const apiUrl = urlCrearEvento;
  const user = {
      description: descripcionElI.value,
      checkInDate: checkInDateElI.value,
      checkOutDate: checkOutDateElI.value,
      place: placeElI.value,
      price: priceElI.value
  };
    
    //Configura la llamada POST al servidor
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + credenciales,
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(user),
    };
    const response = await fetch(apiUrl, requestOptions);

    const data = await response.text();

    if (response.status==201){
        borrarDetalleFormulario();
        mensajeEl.textContent="Alta realizada correctamente";
    }
     
    
    
  }
function borrarDetalleFormulario(){
  while (formularioEl.firstChild) {
    formularioEl.removeChild(formularioEl.firstChild);
}
}
  //============= COMPROBAR CAMPOS NO VACÍOS ===============
function comprobarCampoNoVacio(mensaje,campoEl){
  if(campoEl.value.trim().length>0){
      campoEl.classList.remove("error");
      campoEl.nextElementSibling.classList.remove("mensajeError");
      campoEl.nextElementSibling.innerHTML=""
      return true;
  }
  campoEl.classList.add("error");
  campoEl.nextElementSibling.classList.add("mensajeError");
  campoEl.nextElementSibling.innerHTML=mensaje;
  return false;
}

//==================== L I S T E N E R S ====================
btnAltaEventoEl.addEventListener("click",altaEvento);
imageUpload.addEventListener("change",previsualizarImagen);
descripcionElI.addEventListener("blur", (e)=>comprobarCampoNoVacio(errorDescripcion,e.target));
checkInDateElI.addEventListener("blur",(e)=> comprobarCampoNoVacio(errorFecha, e.target));
checkOutDateElI.addEventListener("blur",(e)=> comprobarCampoNoVacio(errorFecha, e.target));
placeElI.addEventListener("blur", (e)=> comprobarCampoNoVacio(errorLugar, e.target));



