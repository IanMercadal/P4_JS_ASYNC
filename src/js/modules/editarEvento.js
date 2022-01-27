import {obtenerEvento, editarEventos} from './API.js';
import {mostrarAlerta, validar} from './funciones.js';

(function() {

    // Campos del formulario
    const tituloInput = document.querySelector('#titulo');
    const lugarInput = document.querySelector('#lugar');
    const fechaInput = document.querySelector('#fecha');
    const imagenInput = document.querySelector('#imagen');
    const idInput = document.querySelector('#id');

    document.addEventListener('DOMContentLoaded', async () => {
        const parametrosURL = new URLSearchParams(window.location.search);
        const idEvento = parseInt(parametrosURL.get('id'));

        const evento = await obtenerEvento(idEvento);
        mostrarEvento(evento);

        // Submit al formulario
        const formulario = document.querySelector('#formulario-editar');
        formulario.addEventListener('submit', validarEvento);
    });

    function mostrarEvento(evento) {
        const {titulo, lugar, fecha, imagen, id} = evento;

        tituloInput.value = titulo;
        lugarInput.value = lugar;
        fechaInput.value = fecha;
        imagenInput.value = imagen;
        idInput.value = id;
    }

    function validarEvento(e) {
        e.preventDefault();

        const evento = {
            titulo: tituloInput.value,
            lugar: lugarInput.value,
            fecha: fechaInput.value,
            imagen: imagenInput.value,
            id: parseInt(idInput.value)
        };

        if(validar(evento)) {
            // Mostrar mensaje
            mostrarAlerta("todos los campos son obligatorios");
            return;
        }

        // Reescribre el objeto
        editarEventos(evento);
    }
})();