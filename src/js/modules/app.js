import {obtenerEventos, eliminarEvento} from './API.js';

(function(){

    const listado = document.querySelector('#listado-eventos');
    document.addEventListener('DOMContentLoaded', mostrarEventos);

    let eventosPagina = document.querySelector('#eventosPagina');

    // listado.addEventListener('click', confirmarEliminar);

    async function mostrarEventos() {
        const eventos = await obtenerEventos();
        
        eventos.forEach(evento => {
            const {titulo, imagen, lugar, fecha} = evento;

            const divEvento = document.createElement('div');
            divEvento.classList.add('articulo');

            let tituloDiv = document.createElement('h3');
            let imagenDiv = document.createElement('img');
            imagenDiv.classList.add('imagen-evento');
            let infoDiv = document.createElement('div');
            infoDiv.classList.add('texto');
            let lugarDiv = document.createElement('p');
            let fechaDiv = document.createElement('p');

            tituloDiv.innerHTML = titulo;
            imagenDiv.src = imagen;
            lugarDiv.innerHTML = lugar;
            fechaDiv.innerHTML = fecha;

            divEvento.appendChild(tituloDiv);
            divEvento.appendChild(imagenDiv);
            infoDiv.appendChild(lugarDiv);
            infoDiv.appendChild(fechaDiv);
            divEvento.appendChild(infoDiv);

            if(eventosPagina) {
                let EliminarButton = document.createElement('button');
                EliminarButton.setAttribute('id','EliminarEvento');
                EliminarButton.innerHTML = 'Borrar';
                EliminarButton.addEventListener('click', confirmarEliminar);
                divEvento.appendChild(EliminarButton);

                let EditarButton = document.createElement('button');
                EditarButton.setAttribute('id','EditarEvento');
                EditarButton.innerHTML = 'Editar';
                EditarButton.addEventListener('click', confirmarEliminar);
                divEvento.appendChild(EditarButton);
            }
            listado.appendChild(divEvento);
        })
    }
    function confirmarEliminar(e) {
        if(e.target.classList.contains('eliminar')) {
            const eventoId = parseInt(e.target.dataset.evento);
            const confirmar = confirm('¿Deseas eliminar este evento?');

            if(confirmar) {
                eliminarEvento(eventoId);
            }
        }
    }
})();