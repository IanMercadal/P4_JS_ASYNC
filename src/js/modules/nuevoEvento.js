import {mostrarAlerta, validar} from './funciones.js';
import {nuevoEvento} from './API.js';

(function() {
    const formulario = document.querySelector('#Enviar');
    formulario.addEventListener('click', validarEvento);

    function validarEvento(e) {
        e.preventDefault();

        let titulo = (document.getElementById("Titulo").value).trim();
        let imagen = (document.getElementById("imagen").value).trim();
        let lugar = (document.getElementById("Lugar").value).trim();
        let fecha = (document.getElementById("Fecha").value).trim();

        const evento = {
            titulo,
            imagen,
            lugar,
            fecha
        };
        if(validar(evento)) {
            mostrarAlerta("Todos los campos son obligatorios");
            return;
        }
        nuevoEvento(evento);
    }
})();