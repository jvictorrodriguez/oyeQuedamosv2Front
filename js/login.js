//imports
import { esUnPasswordValido, esUnEmailValido, host } from "./utils.js";
// window.hostAddress = 'https://oyequedamosv2-production.up.railway.app';


//Elementos del DOM
//Inputs
const casillaEmailEl = document.getElementById("inputEmail");
const casillaPasswordEl = document.getElementById("inputPassword");
const emailEl=document.getElementById("email");
const passwordEl=document.getElementById("password");
const eyeEl=document.getElementById("eye");

//Button
const entrarEl=document.getElementById("entrar");

//mensajes
const errorEmailEl= document.getElementById("errorEmail");
const errorPasswordEl= document.getElementById("errorPassword");
const mensajeConexionEl = document.getElementById("mensajeLogin");

//Otras variables
let email, password;
let emailOK, passwordOK;
let response;

//Enlaces
const registroEl= document.getElementById("registro");
const registro="./registro.html";
const main="./main.html";
const host = window.hostAddress;
const urlLogin  = host + "/api/v1/user/signIn"
// const host = 'http://localhost:8080';

//==================== F U N C I O N E S ====================
// Función que muestra/oculta el password
// También cambia el icono mostrar/ocultar
function mostrarOcultarPassword(){
    if(passwordEl.type ==="password") {
        passwordEl.type = "text";
        eyeEl.innerHTML="visibility_off"
    }else{
        passwordEl.type ="password"
        eyeEl.innerHTML="visibility"
    }
}
//============= COMPROBAR EMAIL ===============
function comprobarEmail(){
  email=emailEl.value;
  if(esUnEmailValido(email)){
      casillaEmailEl.classList.remove("error");
      errorEmailEl.innerHTML="";
      return true;
  }
  casillaEmailEl.classList.add("error");
  errorEmailEl.innerHTML="Email no válido";
  return false;
}
//============= COMPROBAR PASSWORD ===============
function comprobarPassword(){
  password=passwordEl.value;
  if(esUnPasswordValido(password)){
      casillaPasswordEl.classList.remove("error");
      errorPasswordEl.innerHTML="";
      return true;
  }
  casillaPasswordEl.classList.add("error");
  errorPasswordEl.innerHTML="Debe contener al menos 8 caracteres y una mayúscula y una minúscula";
  return false;
}
//============= IR A REGISTRO  ===============
function irARegistro(){
  //Abre la ventana para registra un nuevo usuario
    window.open(registro);
}

//============= IR A MAIN  ===============
function irAMain(){
  //Abre la ventana principal una vez el usuario está registrado
  window.open(main);
}


//============= FUNCIÓN ENTRARFUNCTION ===============
async function entrarFunction() {
  //Comprobamos los campos email y password. Si alguno no es correcto salimos
  mensajeConexionEl.textContent="";
  emailOK= comprobarEmail();
  passwordOK= comprobarPassword();
  if(emailOK && passwordOK){
  //Los campos están correctamente informados
  }else{
    return;
  }
    
     
  //La función btoa() crea una cadena ASCII codificada en base 64 a partir de una "cadena" de datos
  const credenciales = btoa(emailEl.value + ":" + passwordEl.value);


  //Conectamos con el servidor
  //Preparamos la petición
    const requestOptions = {
      method: "POST",
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + credenciales
      },
      body: JSON.stringify(),
    };

    try{
  
        response= await fetch(urlLogin, requestOptions);

        switch(response.status){
          case 200: mensajeConexionEl.textContent=  "Hola " + await response.text();
                  //Guardamos cookie de las credenciales
                  document.cookie ="Authorization="+credenciales + ";path=/"
                  setTimeout(function(){
                      mensajeConexionEl.innerHTML= "";
                      irAMain();
                  }, 2000);
                  break;
          case 401: mensajeConexionEl.textContent = "Contraseña y/o usuario no válidos";
                  break;
          } 
  
    }catch (error) {

      mensajeConexionEl.textContent = "Error de conexión con el servidor. " +  error.message;
    }
}

//==================== L I S T E N E R S ====================
eyeEl.addEventListener("click", mostrarOcultarPassword);
emailEl.addEventListener("blur",  comprobarEmail);
passwordEl.addEventListener("blur", comprobarPassword);
registroEl.addEventListener("click", irARegistro);
entrarEl.addEventListener("click",entrarFunction);

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        entrarFunction();
    }
});