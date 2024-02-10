//imports
import { esUnPasswordValido, esUnEmailValido, host} from "./utils.js";

//Elementos del DOM
//Inputs
const emailEl= document.getElementById("email");
const firstnameEl= document.getElementById("firstname");
const lastnameEl= document.getElementById("lastname");
const dobEl=document.getElementById("dob");
const passwordEl= document.getElementById("password");
const password2El= document.getElementById("password2");

//mensajes
const errorEmailEl = document.getElementById("errorEmail");
const errorPasswordEl= document.getElementById("errorPassword");
const errorPassword2El= document.getElementById("errorPassword2");
const mensajeConexionEl=document.getElementById("mensajeRegistro");

//mensajesServidor

//Botones
const registroEl= document.getElementById("registro");
const backEl= document.getElementById("back");

//Otras variables
let email;
let password, password2;
let response;
let emailOk, nombreOk, apellidosOk, fechaOk, passwordOk, password2Ok;

//Enlaces
// const host = 'http://localhost:8080';
const host = window.hostAddress;
const urlAltaUsuario =  host + "/api/v1/user/signUp";
const login="index.html";

//==================== F U N C I O N E S ====================
//============= COMPROBAR EMAIL ===============
function comprobarEmail(){
    email=emailEl.value;
    if(esUnEmailValido(email)){
        emailEl.classList.remove("error");
        errorEmailEl.innerHTML="";
        return true;
    }
    emailEl.classList.add("error");
    errorEmailEl.innerHTML="Email no válido";
    return false;
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
//============= COMPROBAR PASSWORD ===============
function comprobarPassword(){
    password=passwordEl.value;
    if(esUnPasswordValido(password)){
        passwordEl.classList.remove("error");
        errorPasswordEl.innerHTML="";
        return true;
    }
    passwordEl.classList.add("error");
    errorPasswordEl.innerHTML="Debe contener al menos 8 caracteres y una mayúscula y una minúscula";
    return false;
  }

//============= COMPROBAR PASSWORD 2 ===============
function comprobarPassword2(){
    password= passwordEl.value;
    password2= password2El.value;
    if(password==password2){
        errorPassword2El.classList.remove("mensajeError");
        password2El.classList.remove("error");
        errorPassword2El.innerHTML="";
        return true;
    }
    errorPassword2El.classList.add("mensajeError");
    password2El.classList.add("error");
    errorPassword2El.innerHTML="Las contraseñas no son iguales";
    return false;
}

//============= ALTA DE USUARIO  ===============
async function altaUsuario(){

    //Comprobamos que los campos estén correctamente informados
    // emailOk, nombreOk, apellidosOk, fechaOk, passwordOk;
    
    emailOk= comprobarEmail();
    nombreOk= comprobarCampoNoVacio("Nombre no puede estar vacío",firstnameEl);
    apellidosOk= comprobarCampoNoVacio("Apellido no puede estar vacío",lastnameEl);
    fechaOk= comprobarCampoNoVacio("La fecha no puede quedar vacía",dobEl);
    passwordOk= comprobarPassword();
    password2Ok= comprobarPassword2();

    if(emailOk&nombreOk&apellidosOk&fechaOk&passwordOk&password2Ok){
            //Todas las validaciones son correctas
    }else{
            //Almenos una validación no es correcta. Salimos de la función
    return;
    }
  
    //Definimos los datos del objeto
    const user = {
        email: emailEl.value,
        fullName: firstnameEl.value +" " + lastnameEl.value,
        dob: dobEl.value,
        password: passwordEl.value
    };

    //Preparamos la petición
    const requestOptions = {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    };
    try{

        response = await fetch(urlAltaUsuario,requestOptions);
        switch(response.status){
            case 201: mensajeConexionEl.textContent=  "Usuario Creado. Acceda desde el login";
            setTimeout(() => {
                atras();
            },  3000); //
                    break;
            case 400: mensajeConexionEl.textContent =  await response.text();
                    break;
        }

    } catch (error) {

        mensajeConexionEl.textContent = "Error de conexión con el servidor. " +  error.message;
    }
}

  //============= FUNCIÓN ATRÁS ===============
function atras(){
   window.open(login);
}

//==================== L I S T E N E R S ====================
emailEl.addEventListener("blur", comprobarEmail);
passwordEl.addEventListener("blur", comprobarPassword);
password2El.addEventListener("blur",comprobarPassword2);
firstnameEl.addEventListener("blur", (e)=>comprobarCampoNoVacio("Nombre no puede estar vacío",e.target));
lastnameEl.addEventListener("blur", (e)=>comprobarCampoNoVacio("Apellido no puede estar vacío",e.target));
dobEl.addEventListener("blur", (e)=>comprobarCampoNoVacio("La fecha no puede quedar vacía",e.target));
registroEl.addEventListener("click",altaUsuario);
backEl.addEventListener("click",atras);