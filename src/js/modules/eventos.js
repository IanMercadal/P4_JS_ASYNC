export {
    CrearEventosFormulario as CrearEventosFormulario,
    OrdenarId as OrdenarId,
    OrdenarLugar as OrdenarLugar
};

// VARIABLES GLOBALES

var eventos = [];
var seccionEventos = false;
var recuentoUltimosEventos;
var section;

let buttonSend = document.querySelector('#Enviar');
buttonSend.addEventListener('click', CrearEventosFormulario);

//CREANDO LOS EVENTOS
// function CrearEventosFormulario() {

//     /*Coge los datos del formulario y le quita los espacios de las esquinas*/
//     var tituloFormulario = (document.getElementById("Titulo").value).trim();
//     var lugarFormulario = (document.getElementById("Lugar").value).trim();
//     var fechaFormulario = (document.getElementById("Fecha").value).trim();

//     validar

// }

//GENERAR LOS EVENTOS
function ComprobarEventoGenerar(array) {

    for (let index = 0; index < array.length; index++) {

        /*Si la última vez el numero de eventos ha incrementado desde la última vez que 
        generamos los eventos va a empezar el bucle con el valor del ultimo recuento*/
        if (recuentoUltimosEventos < array.length) {
            index = recuentoUltimosEventos
        }

        if (seccionEventos == false) {
            section = document.createElement("section");
            section.classList.add("prueba");
            GenerarEventos(index, section, array)
            seccionEventos = true
        } else {
            GenerarEventos(index, section, array)
            seccionEventos = false
        }
    }
    recuentoUltimosEventos = array.length
    Eliminar()
}

//ELIMINAR EVENTOS
function Eliminar() {
    var papelera = document.getElementsByClassName("papelera")

    for (let index = 0; index < papelera.length; index++) {
        papelera[index].onclick = function () {
            this.parentNode.parentNode.remove()
            eventos.splice(index, index)
        }
    }
}
/*Elimina todos los elementos html sin borrar nada de la array de eventos*/
function EliminarTodosEventos() {
    var sectionEliminar = document.getElementsByClassName("prueba")
    var recuento = 0
    var sectionEliminarRecuento = sectionEliminar.length
    while (sectionEliminarRecuento != recuento) {
        sectionEliminar[0].remove()
        recuento++
    }
}

//ORDERNAR EVENTOS
function OrdenarId() {
    eventos.sort((a, b) => {
        return a.id - b.id;
    })

    EliminarTodosEventos()
    ComprobarEventoGenerar(eventos)
}

function OrdenarLugar() {
    eventos.sort((a, b) => {
        return a.lugar.localeCompare(b.lugar);
    })

    EliminarTodosEventos()
    ComprobarEventoGenerar(eventos)
}
