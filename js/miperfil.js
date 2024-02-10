import { esUnPasswordValido,host } from "./utils.js";

//Elementos del DOM
//Mis Datos
const emailEl= document.getElementById("email");
const passwordEl = document.getElementById("password");
const fullnameEl = document.getElementById("fullname");
const accionesUsuarioEl= document.getElementById("accionesUsuario");

//Persona
const detalleEl=document.getElementById("detalle");
//más dentro dentro de function muestraDatos

//Mensajes
const mensajeEl=document.getElementById("mensajeConexion");
const mensajeMisDatosEl = document.getElementById("mensajeMisDatos");
const mensajeDatosPersonaEl = document.getElementById("mensajeDatosPersonas");
const mensajeConexionEl= document.getElementById("mensajeConexion");


//Enlaces
// const host =             "http://localhost:8080";
const urlObtenerUsuario = host + "/api/v1/user";
const urlPersona=         host+ "/person";

//Recuperamos cookies
// Se almacena una cookie tal que así->  Authorization=Y29ycmVvMUBjb3JyZW8uZXM6UGFzc3dvcmQx
//Creamos un array de String separando por el "=". Luego la segunda posicion del array (1) es la que deseamos
let cookies = document.cookie; 
let parts = cookies.split("=");
let credenciales = parts[1];



//*************** INICIO DEL PROGRAMA */

init();


//==================== FUNCIONES ==================== */

async function init() {
  //Obtiene los datos del usuario
  const datosUsuarioYAcompanantes = await obtenDatos();
  //Los muestra por pantalla
  muestraDatos(datosUsuarioYAcompanantes);
  //Prepara el registro de añadir nuevas personas
  anadirUnaLinea();
}

async function obtenDatos() {
  const apiUrl= urlObtenerUsuario;

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

//Muestra los datos del USUARIO y dibuja el HTML de las Personas
function muestraDatos(datos){

  //USUARIO:  Muestra los datos del usuario. Email y nombre completo
  emailEl.innerText=datos.email;
  fullnameEl.innerText=datos.fullName;
  
  //PERSONAS:   Muestra la tabla de los acompañantes  >>>>>>>>>Se añaden LISTENERS
  datos.companions.forEach(person => {
    //Guardamos el id de la persona para el fácil acceso por registro
    const id= person.id;
    //Creamos los elementos
    let rowEl=document.createElement("tr");
    let nameEl= document.createElement("td");
    let dobEl=document.createElement("td");
    
    let accionesEl = document.createElement("td");
    let iconoModificar = document.createElement("i");
    let iconoBorrar = document.createElement("i");

    //Asignamos atributos a los elementos 
    nameEl.innerText=person.name;
    nameEl.id=`name${id}`;
    dobEl.innerHTML=person.dob;
    dobEl.id=`dob${id}`;
        //Asignamos innerHTML y la clase para que muestre los iconos
    iconoModificar.innerHTML="Edit";
    iconoModificar.className = "material-symbols-outlined";
    iconoModificar.id=`modificar.${id}`;
        //Asignamos innerHTML Y la clase para que muestre los iconos
    iconoBorrar.innerHTML="Delete";
    iconoBorrar.className = "material-symbols-outlined";
    iconoBorrar.id=`borrar.${id}`;id;

    //Colgamos del DOM los nuevos elementos
    detalleEl.appendChild(rowEl);
    rowEl.appendChild(nameEl);
    rowEl.appendChild(dobEl);
    accionesEl.appendChild(iconoModificar);
    accionesEl.appendChild(iconoBorrar);
    rowEl.appendChild(accionesEl);

    //Añadimos listenes a los botones editar y borrar de cada registro
    iconoModificar.addEventListener("click", () => editarPersona(id));
    iconoBorrar.addEventListener("click", () => borrarPersona(id));
  });
}
// Añade una línea editable para añadir más Personas Se añaden LISTENERS
function anadirUnaLinea(){
  //Creamos los elementos
    let rowEl=document.createElement("tr");
    let nameEl= document.createElement("td");
    let dobEl=document.createElement("td");
    let accionesEl = document.createElement("td");
    let iconoAnadir = document.createElement("i");

    //Asignamos atributos a los elementos 
    nameEl.id="nameNuevo";
    nameEl.innerText="";
    nameEl.setAttribute("contenteditable", "true");
        dobEl.id="dobNuevo";
    dobEl.innerHTML="";
    dobEl.setAttribute("contenteditable", "true");
    iconoAnadir.className = "material-symbols-outlined";
    iconoAnadir.innerHTML="Save";
    
    //Colgamos los elementos del DOM
    detalleEl.appendChild(rowEl);
    rowEl.appendChild(nameEl);
    rowEl.appendChild(dobEl);
    accionesEl.appendChild(iconoAnadir);
    rowEl.appendChild(accionesEl);

    //Añadimos los listeners
    iconoAnadir.addEventListener("click", altaPersonaEnBaseDatos);
    nameEl.addEventListener("click",borrarMensajes);
    dobEl.addEventListener("click",borrarMensajes);
}

//Borrar los mensajes mostrados en el HTML
function borrarMensajes(){
  mensajeDatosPersonaEl.innerText="";
}
////===========================================================================U S U A R I O
//************  MODIFICAR USUARIO  ************* */
function editarUsuario(){
  //Si hacemos clic sobre el lápiz habilita los campos para editar
  if(accionesUsuarioEl.innerText === "Edit"){
    habilitarCamposParaEditarUsuario();
    mensajeMisDatosEl.innerText="";
  } else {
    //Si hacemos clic sobre el disquete deshabilita los campos y actualiza los datos en el servidor
    deshabilitarCamposTrasEditarUsuario();
    updateUsuario();
  }
 }

 async function updateUsuario(){
  const apiUrl= urlObtenerUsuario;

  let email= emailEl.innerText;
  let password = passwordEl.innerText;
  let fullName= fullnameEl.innerText;
  
  //Comprobamos que el password cumpla los requisitos
  if(!esUnPasswordValido(password)){
    mensajeMisDatosEl.innerHTML="El password no es válido";
    habilitarCamposParaEditarUsuario();
    return;
  }
  mensajeMisDatosEl.innerHTML="";

  //Creamos el objeto del usuario actualizado
  const user = {
    email: email,
    fullName: fullName,
    password: password
  }
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + credenciales
    },

    body: JSON.stringify(user),
  };

  //Conectamos con el servidor
  const response = await fetch(apiUrl, requestOptions);
  //Si la respuesta el 204 actualizamos las cookies
  if(response.status==204){
    //Actualzamos la cookie con la nueva contraseña
   actualizarCookie(email, password);
    setTimeout(() => {
      mensajeEl.innerHTML="";
  }, 1000);
    //Mostramos el mensaje durante el tiempo establecido 1s
    mensajeEl.classList.toggle("error");
    mensajeEl.innerHTML="Se han guardado los cambios";
  }
 }

function actualizarCookie(email, password){
  const credenciales = btoa(email + ":" + password);
  document.cookie ="Authorization="+credenciales + ";path=/"
}

 function habilitarCamposParaEditarUsuario(){
    //borramos los asteriscos del password
    passwordEl.innerText=""; 
    //Habilitamos modificaciones en Password y FullName
    fullnameEl.setAttribute("contenteditable", "true");
     passwordEl.setAttribute("contenteditable", "true");
     fullnameEl.classList.toggle("editable");
     passwordEl.classList.toggle("editable");
     fullnameEl.classList.toggle("no-editable");
     passwordEl.classList.toggle("no-editable");
     //Cambiamos iconos
     accionesUsuarioEl.innerText = "Save";  
   
 }
 function deshabilitarCamposTrasEditarUsuario(){
  fullnameEl.setAttribute("contenteditable", "false");
  passwordEl.setAttribute("contenteditable", "false");
  fullnameEl.classList.toggle("editable");
  passwordEl.classList.toggle("editable");
  fullnameEl.classList.toggle("no-editable");
  passwordEl.classList.toggle("no-editable");
  //Cambiamos iconos
  accionesUsuarioEl.innerText = "Edit";
 }
//===========================================================================FIN MODIFICAR USUARIO

//************  P E R S O N A S ************* */
//***        MODIFICAR PERSONAS */
function editarPersona(id){
  //Comprobamos el valor del icono si es Modificar o Guardar
  if(document.getElementById("modificar."+id).innerText === "Edit"){
    habilitarCamposParaEditarPersona(id);
    borrarMensajes();
  } else {
    deshabilitarCamposTrasEditarPersona(id);
    updatePersonaEnBaseDatos(id,"PUT");
  }
}
function habilitarCamposParaEditarPersona(id){
  let nameEl= document.getElementById("name"+id);
  let dobEl= document.getElementById("dob"+id);
  let modificarEl=document.getElementById("modificar."+id);

  //Habilitamos modificaciones en name y dob
   nameEl.setAttribute("contenteditable", "true");
   dobEl.setAttribute("contenteditable", "true");
   nameEl.classList.toggle("editable");
   dobEl.classList.toggle("editable");
   nameEl.classList.toggle("no-editable");
   dobEl.classList.toggle("no-editable");
   //Cambiamos iconos
   modificarEl.innerText = "Save";  
 
}
function deshabilitarCamposTrasEditarPersona(id){
  let nameEl= document.getElementById("name"+id);
  let dobEl= document.getElementById("dob"+id);
  let modificarEl=document.getElementById("modificar."+id);

  //Deshabilitamos modificaciones en name y dob
  nameEl.setAttribute("contenteditable", "false");
  dobEl.setAttribute("contenteditable", "false");
  nameEl.classList.toggle("editable");
  dobEl.classList.toggle("editable");
  nameEl.classList.toggle("no-editable");
  dobEl.classList.toggle("no-editable");
  //Cambiamos iconos
  modificarEl.innerText = "Edit";  
  
}
async function updatePersonaEnBaseDatos(id,metodo) {
    const apiUrl= urlPersona;

    let name= document.getElementById("name"+id).innerText;
    let dob= document.getElementById("dob"+id).innerText;

    if(name=="" || dob==""){
      mensajeDatosPersonaEl.innerText="Los datos no pueden estar vacíos";
      setTimeout(() => {
        mensajeEl.innerHTML="";
        editarPersona(id);
    }, 3000);
 
      return;
    }

    const persona = {
      id: id,
      name: name,
      dob: dob
    }
    const requestOptions = {
      method: metodo,
      // method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + credenciales
      },
  
      body: JSON.stringify(persona),
    };
    const response = await fetch(apiUrl, requestOptions);
    if(response.status==204){
      setTimeout(() => {
        mensajeEl.innerHTML="";
    }, 1000);
    mensajeEl.classList.toggle("error");
    mensajeEl.innerHTML="Se han guardado los cambios";
    }   else if(response.status==400){
    mensajeEl.innerHTML="La fecha debe introducirse en el formato aaaa-mm-dd";
  }
}
//********* FIN MODIFICAR ************************** */

//***        BORRAR PERSONAS */
//Cambiamos el atributo STATUS de Active a DELETED
async function borrarPersona(id) {
    const apiUrl= urlPersona+"/"+id;

    let name= document.getElementById("name"+id).innerText;
    let dob= document.getElementById("dob"+id).innerText;
  
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + credenciales
      }
    };
    const response = await fetch(apiUrl, requestOptions);
    if(response.status==204){
      window.location.reload();
    }
    //No devuelve datos porque la respuesta es 204 No Content
    // const data = await response.text();
    // console.log(data);
}

//***        ALTA PERSONAS */
async function altaPersonaEnBaseDatos() {
  let name= document.getElementById("nameNuevo").innerText;
  let dob= document.getElementById("dobNuevo").innerText;

  if(name=="" || dob==""){
    mensajeDatosPersonaEl.innerText="Los datos no pueden estar vacíos";
    return;
  }
  
  const apiUrl= urlPersona;

  const persona = {
    name: name,
    dob: dob
  }
  const requestOptions = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + credenciales
    },

    body: JSON.stringify(persona),
  };
  const response = await fetch(apiUrl, requestOptions);
  if(response.status==204){
    mensajeEl.innerHTML="Persona dada de alta correctamente";
  }else if(response.status==400){
    mensajeEl.innerHTML="La fecha debe introducirse en el formato aaaa-mm-dd";
  }
  //No devuelve datos porque la respuesta es 204 No Content
  const data = await response.text();

  if(response.status==201){
    setTimeout(() => {
    window.location.reload();
  }, 1000);
  mensajeConexionEl.innerHTML="Alta realizada correctamente";
  }
}


//==================== L I S T E N E R S ====================
accionesUsuarioEl.addEventListener("click", editarUsuario);



  