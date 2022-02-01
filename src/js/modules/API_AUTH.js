import {obtenerNoticias} from './API.js';
import {mostrarAlerta} from './funciones.js';

const url = 'http://localhost:3001/auth/login';

const botonEnviar = document.querySelector('#Enviar');
botonEnviar.addEventListener('click', mostrarToken);

// Obtiene token
function mostrarToken() {
    let user = document.querySelector('#Correo').value;
    let password = document.querySelector('#Contrasena').value; 
    let indice = user.indexOf(".");
    let extraida = user.substring(indice);

    let countArroba = (user.match(/@/g) || []).length;
    
    // Validaciones
    
    // 1. Campos vacios
    if(user === '' || password === '') {
        mostrarAlerta('Los campos deben estar rellenados');
        return;
    }

    // 2. Contar arrobas
    if(countArroba == 0 || countArroba > 1){
        mostrarAlerta("arroba");
        return;
    }

    // 3. Contiene punto
    if(user.indexOf(".") == -1){
        mostrarAlerta("punto");
        return;
    }

    // 4. Contiene algo tras el punto
    if(extraida == '.') {
        mostrarAlerta("dominio correo");
        return;
    }

    fetch(url, {
        method: 'GET',
        headers: { Authorization: 'Basic ' + btoa(user + ':' + password) }
    })
    .then(function(respuesta){
        if(respuesta.status !== 200){
            mostrarAlerta('Login incorrecto')
        } else{
            return respuesta.json()
        }
    })
    .then(data => {
        var fechaGalleta = new Date();
        fechaGalleta.setTime(fechaGalleta.getTime() + (7 * 24 * 60 * 60 * 1000));
        document.cookie=`access_token=${data.access_token}` + 'Usuario: ' + user;
        obtenerNoticias(data);
        window.location.href = 'index.html';
    });
}

// function validarStatus(respuesta) {
//     if(respuesta.status !== 200) {
//         mostrarAlerta('Erro de inicio de sesión');
//         return;
//     }
//     respuesta.json()
// }
