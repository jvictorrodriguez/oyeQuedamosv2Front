//imports
import { getDatos } from "./utils.js";
//Elementos del DOM
const obtenerEl= document.getElementById("obtener");
const elementoPadre=document.getElementById("info");

//Mensajes



//Enlaces
const host =             "http://localhost:8080";
const urlObtenerEvento = host + "/events/search";
const urlObtenerListaEventos = host + "/events/all";


// //Recuperamos cookies
// // Se almacena una cookie tal que así->  Authorization=Y29ycmVvMUBjb3JyZW8uZXM6UGFzc3dvcmQx
// //Creamos un array de String separando por el "=". Luego la segunda posicion del array (1) es la que deseamos
// let cookies = document.cookie; 
// let parts = cookies.split("=");
// let credenciales = parts[1];

async function init(){
    // const archivoJson= await obtenerDatos(urlObtenerListaEventos,"GET");
    // const archivoJson= await obtenerDatos(urlObtenerEvento,"POST");
    //Creamos el objeto
    const dto={
        email: "correo1@correo.es",
        id:1
    }
    const archivoJson= await getDatos(urlObtenerEvento,"POST",dto)
    // const archivoJson= await obtenerDatos(urlObtenerEvento,"POST");
    
    console.log(archivoJson);
    muestraDatos(archivoJson);
}


// export function muestraDatosExp(data){

//     let eventosValores=["id","description","status","checkInDate","checkOutDate","place","price"];
//     let listaOpcionesValores =["id","mail","price","place"];


//     eventosValores.forEach(campo=>{
//     // Concatenar el nombre del campo con el valor correspondiente
//     let etiquetaCampo = campo;
//     let valorCampo = data[campo];
//     crearElementosDom(elementoPadre, "p", etiquetaCampo, valorCampo, etiquetaCampo);
//     });
    
//     crearElementoSummaryYDetail(elementoPadre,"p","Lista de Opciones",data.optionList,listaOpcionesValores);
// }


// export function crearElementoSummaryYDetail(elementoPadre, tipoElemento, cabecera, lista, valores) {
//     // Crear un elemento 'details' principal para contener todos los registros
//     let elementoCabeceraPrincipal = document.createElement("summary");
//     let elementoPrincipal = document.createElement("details");
//     elementoCabeceraPrincipal.textContent = cabecera;
//     elementoPrincipal.appendChild(elementoCabeceraPrincipal);
    
//     elementoPadre.appendChild(elementoPrincipal);
    
//     lista.forEach(registro => {
//         // Crear un nuevo elemento 'details' para cada registro
//         let elementoDetalleRegistro = document.createElement("details");
//         let elementoCabeceraRegistro = document.createElement("summary");
//         // Puedes personalizar el texto de la cabecera aquí, por ejemplo, usando el ID
//         elementoCabeceraRegistro.textContent = `ID: ${registro.id}`;
//         elementoDetalleRegistro.appendChild(elementoCabeceraRegistro);
//         elementoPrincipal.appendChild(elementoDetalleRegistro);

//         valores.forEach(campo => {
//             crearElementosDom(elementoDetalleRegistro, tipoElemento, registro["id"], registro[campo], campo);
//             // elementoP.textContent = `${campo}: ${registro[campo]}`;
//         });
//     });
// }


// export function crearElementosDom(elementoPadre, tipoElemento, id, textContent, etiqueta) {
//     let elementoHijo = document.createElement(tipoElemento);
//     elementoHijo.textContent = etiqueta + ":" + textContent;
//     elementoHijo.id = etiqueta  + id;
//     elementoPadre.appendChild(elementoHijo);
// }



// export function crearElementoSummaryYDetail(elementoPadre, tipoElemento, cabecera, lista, valores) {
//     let elementoDetalle = document.createElement("details");
//     let elementoCabecera = document.createElement("summary");
//     elementoCabecera.textContent = cabecera;
//     elementoDetalle.appendChild(elementoCabecera);
//     elementoPadre.appendChild(elementoDetalle);

//     lista.forEach(registro => {
//         valores.forEach(campo => {
//             crearElementosDom(elementoDetalle, tipoElemento, registro[campo], registro[campo], campo);
//         });
//     });
// }


// export async function getDatos(apiUrl,metodo, objeto){

// let requestOptions;
// switch (metodo) {
//     case "GET":
//         requestOptions = {
//             method: metodo,
//             headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Basic ' + credenciales
//             },
//         };
//        break;
//     case "POST":
//         requestOptions = {
//             method: metodo,
//             headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Basic ' + credenciales
//             },
//             body: JSON.stringify(objeto),
//         };
//        break;
//     default:
//        console.log("Método erróneo");
//    }

   

//    const response = await fetch(apiUrl, requestOptions);
// //    return response;
//    const data = await response.json();
//    return data;
// }




// async function obtenerDatos(apiUrl,metodo) {
   

//     //Construir el objeto
//     let email="correo1@correo.es"
//     let idEvento=1

//     const dto={
//         email: email,
//         id:idEvento
//     }
    
//     // const response= await getDatos(apiUrl,"POST",dto);
//     // const data = await response.json();
//     // return data;
//     return await getDatos(apiUrl,"POST",dto);
//     //devuelve el json
// }


//==================== L I S T E N E R S ====================
obtenerEl.addEventListener("click", init);
