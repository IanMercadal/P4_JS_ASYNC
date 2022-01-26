import {mostrarAlerta, validar} from './funciones.js';
import {nuevoEvento} from './API.js';

(function() {
    const formulario = document.querySelector('#Enviar');
    formulario.addEventListener('submit', validarCliente);

    function validarCliente(e) {
        e.preventDefault();

        let tituloFormulario = (document.getElementById("Titulo").value).trim();
        let lugarFormulario = (document.getElementById("Lugar").value).trim();
        let fechaFormulario = (document.getElementById("Fecha").value).trim();

        const evento = {
            tituloFormulario,
            lugarFormulario,
            fechaFormulario
        };
        if(validar(evento)) {
            mostrarAlerta("Todos los campos son obligatorios");
            return;
        }
        nuevoEvento(evento);
    }
})();