//Variables Globales
export const host = 'https://oyequedamosv2-production.up.railway.app';

export function esUnEmailValido(email){
   
    //Expresión regular que comprueba que se trate de un correo con formato válido     //origen https://medium.com/@jgratereaux/validar-correos-electr%C3%B3nicos-con-expresiones-regulares-7914751b6018
    let regexp = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    //Comprobamos el email recibido con la expresión regular
    return regexp.test(email);
}

export function esUnPasswordValido(password){
    // let password= passwordEl.value;
    let regexp=/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    // Comprobar si tiene al menos 8 caracteres y contienen una mayúscula y una minúscula
    return (regexp.test(password));
}

// 
    
export function muestraDatosExp(data, elementoPadre){
  let eventosValores=["id","description","status","checkInDate","checkOutDate","place","price"];
  let listaOpcionesValores =["id","mail","price","place"];

  eventosValores.forEach(campo=>{
  // Concatenar el nombre del campo con el valor correspondiente
  let etiquetaCampo = campo;
  let valorCampo = data[campo];
  crearElementosDom(elementoPadre, "p", etiquetaCampo, valorCampo, etiquetaCampo);
  });
  
  crearElementoSummaryYDetail(elementoPadre,"p","Lista de Opciones",data.optionList,listaOpcionesValores);
}


export function crearElementoSummaryYDetail(elementoPadre, tipoElemento, cabecera, lista, valores) {
  // Crear un elemento 'details' principal para contener todos los registros
  let elementoCabeceraPrincipal = document.createElement("summary");
  let elementoPrincipal = document.createElement("details");
  elementoCabeceraPrincipal.textContent = cabecera;
  elementoPrincipal.appendChild(elementoCabeceraPrincipal);
  
  elementoPadre.appendChild(elementoPrincipal);
  
  lista.forEach(registro => {
      // Crear un nuevo elemento 'details' para cada registro
      let elementoDetalleRegistro = document.createElement("details");
      let elementoCabeceraRegistro = document.createElement("summary");
      // Puedes personalizar el texto de la cabecera aquí, por ejemplo, usando el ID
      elementoCabeceraRegistro.textContent = `ID: ${registro.id}`;
      elementoDetalleRegistro.appendChild(elementoCabeceraRegistro);
      elementoPrincipal.appendChild(elementoDetalleRegistro);

      valores.forEach(campo => {
          crearElementosDom(elementoDetalleRegistro, tipoElemento, registro["id"], registro[campo], campo);
          // elementoP.textContent = `${campo}: ${registro[campo]}`;
      });
  });
}


export function crearElementosDom(elementoPadre, tipoElemento, id, textContent, etiqueta) {
  let elementoHijo = document.createElement(tipoElemento);
  elementoHijo.textContent = etiqueta + ":" + textContent;
  elementoHijo.id = etiqueta  + id;
  elementoPadre.appendChild(elementoHijo);
}