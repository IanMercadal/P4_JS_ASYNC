import {obtenerEventos, eliminarEventos} from './API.js';

(function(){
    const listado = document.querySelector('#listado-eventos');

    document.addEventListener('DOMContentLoaded', mostrarEventos);

    // listado.addEventListener('click', confirmarEliminar);

    async function mostrarEventos() {
        const eventos = await obtenerEventos();
        
        eventos.forEach(evento => {
            const {titulo, imagen, lugar, fecha} = evento;

            const divEvento = document.createElement('div');
            divEvento.classList.add('articulo');

            let tituloDiv = document.createElement('h3');
            let imagenDiv = document.createElement('img');
            let lugarDiv = document.createElement('div');
            let fechaDiv = document.createElement('div');

            tituloDiv.innerHTML = titulo;
            imagenDiv.innerHTML = imagen;
            lugarDiv.innerHTML = lugar;
            fechaDiv.innerHTML = fecha;

            divEvento.appendChild(tituloDiv);
            divEvento.appendChild(imagenDiv);
            divEvento.appendChild(lugarDiv);
            divEvento.appendChild(fechaDiv);

            console.log(divEvento)
            listado.appendChild(divEvento);
        })
    }

    function confirmarEliminar(e) {
        if(e.target.classList.contains('eliminar')) {
            const eventoId = parseInt(e.target.dataset.evento);
            const confirmar = confirm('¿Deseas eliminar este evento?');

            if(confirmar) {
                eliminarEventos(eventoId)
            }
        }
    }
})();