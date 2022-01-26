export {
    CrearEventosFormulario as CrearEventosFormulario,
    OrdenarId as OrdenarId,
    OrdenarLugar as OrdenarLugar
};

// VARIABLES GLOBALES
const columnaIzquierda = document.querySelector('.columna-izquierda');

var eventos = [];
var eventoLugar = ["", "South Park", "París", "Oporto", "Berlín", "Taipéi", "Puerto Príncipe"];
var carpetaImagenes = ["deportes/", "musica/", "arte/", "sociales/"]
var seccionEventos = false;
var recuentoUltimosEventos;
var section;

//CREANDO LOS EVENTOS
function CrearEventosFormulario() {

    /*Coge los datos del formulario y le quita los espacios de las esquinas*/
    var tituloFormulario = (document.getElementById("Titulo").value).trim();
    var lugarFormulario = (document.getElementById("Lugar").value).trim();
    var fechaFormulario = (document.getElementById("Fecha").value).trim();

    /*Si el formulario esta relleno crea un evento y añade los datos y los mete en la
    array, en caso contrario mostrara un mensaje de error*/
    var datosFormulario = ComprobarFormulario(tituloFormulario, lugarFormulario, fechaFormulario)
    if (datosFormulario == true) {
        var evento = new Object();
        evento.id = Math.floor(Math.random() * 1000000);
        evento.titulo = tituloFormulario

        if (document.getElementById("deportes").checked == true) {
            evento.imagen = "img/eventos/deportes/" + Math.floor(Math.random() * 3)+ ".jpg";
        } else if (document.getElementById("musica").checked == true) {
            evento.imagen = "img/eventos/musica/" + Math.floor(Math.random() * 3)+ ".jpg";
        } else if (document.getElementById("arte").checked == true) {
            evento.imagen = "img/eventos/arte/" + Math.floor(Math.random() * 3)+ ".jpg";
        } else if (document.getElementById("sociales").checked == true) {
            evento.imagen = "img/eventos/sociales/" + Math.floor(Math.random() * 3) + ".jpg";
        } else {
            evento.imagen = "img/eventos/"+carpetaImagenes[Math.floor(Math.random() * 3)] + Math.floor(Math.random() * 2) + ".jpg";
        }

        evento.lugar = lugarFormulario
        evento.fecha = fechaFormulario
        eventos.push(evento);
        ComprobarEventoGenerar(eventos);
    } else {
        alert("No has introducido todos los datos!")
    }
}

/*Comprueba si el formulario ha sido rellenado o no*/
function ComprobarFormulario(titulo, lugar, fecha) {
    if (titulo != "" && lugar != "" && fecha != "") {
        return true
    } else {
        return false
    }
}

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
