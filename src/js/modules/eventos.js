import {obtenerEventos} from './API.js';

export {
    OrdenarId as OrdenarId,
    OrdenarLugar as OrdenarLugar
};

// VARIABLES GLOBALES

// let buttonSend = document.querySelector('#Enviar');
// buttonSend.addEventListener('click', CrearEventosFormulario);

//ORDERNAR EVENTOS
async function OrdenarId() {
    const eventos = await obtenerEventos();
    console.log(typeof(eventos));

}

async function OrdenarLugar() {
    const eventos = await obtenerEventos();
    console.log(eventos);
    eventos.sort((a, b) => {
        return a.lugar.localeCompare(b.lugar);
    });
}
