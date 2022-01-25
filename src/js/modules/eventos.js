export {
    CrearEventosIniciales as CrearEventosIniciales,
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

/*Crea los eventos basicos a través de datos al azar y si existe la columna izquierda
(que solo existe en el index) va a crear los 3 eventosd de index y si no crea los eventos
para Eventos.html*/
function CrearEventosIniciales() {
    for (let index = 1; index < 7; index++) {
        var evento = new Object();
        var dia = Math.floor(Math.random() * 21)
        if (dia == 0) {
            dia = 1
        }
        evento.id = Math.floor(Math.random() * 1000000);
        evento.titulo = "Concierto en " + eventoLugar[index]
        evento.imagen = "img/eventos/iniciales/" + index + ".jpg"
        evento.lugar = eventoLugar[index]
        evento.fecha = "0" + index + "/" + String(dia).padStart(2, "0") + "/2021";
        eventos.push(evento)
    }

    if (columnaIzquierda) {
        for (let index = 0; index < 3; index++) {
            var eventosIndex = eventos.sort((a, b) => {
                return b.fecha - a.fecha
            })
            GenerarEventosIndex(index, eventosIndex)
        }
    }
    if (!columnaIzquierda) {
        ComprobarEventoGenerar(eventos)
    }
}

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

function GenerarEventos(index, section, array) {

    //Creando los elementos iniciales
    var articulo = document.createElement("article");
    articulo.classList.add("articulo");

    //Introduciendo los datos de los eventos
    var titulo = document.createElement("h3");
    titulo.innerHTML = array[index].titulo

    var img = document.createElement("img");
    img.src = array[index].imagen;
    img.classList.add("imagen-evento");

    var lugar = document.createElement("p");
    lugar.innerHTML = array[index].lugar

    var fecha = document.createElement("p");
    fecha.innerHTML = array[index].fecha

    //Creando las secciones de los eventos
    var figureTitulo = document.createElement("figure");
    figureTitulo.appendChild(titulo)

    var figureGrafico = document.createElement("figure");
    figureGrafico.appendChild(img)

    var figureTexto = document.createElement("figure");
    figureTexto.classList.add("texto");
    figureTexto.appendChild(lugar)
    figureTexto.appendChild(fecha)

    articulo.appendChild(figureTitulo)
    articulo.appendChild(figureGrafico)
    articulo.appendChild(figureTexto)

    //Eventos especiales
    var figureEventos = document.createElement("figure");
    figureEventos.classList.add("eventosEspeciales");

    var papelera = document.createElement("img")
    papelera.src = "img/iconos/papelera.svg"
    papelera.classList.add("papelera");
    figureEventos.appendChild(papelera)

    var editar = document.createElement("img")
    editar.src = "img/iconos/editar.svg"
    editar.classList.add("editar");
    figureEventos.appendChild(editar)

    articulo.appendChild(figureEventos)
    section.appendChild(articulo)
    salida.appendChild(section);
}

function GenerarEventosIndex(index, array) {

    //Creando los elementos iniciales
    var salidaindex = document.getElementById("eventos")
    var articulo = document.createElement("article");
    articulo.classList.add("evento");

    //Introduciendo los datos de los eventos
    var titulo = document.createElement("h3");
    titulo.innerHTML = array[index].titulo

    var img = document.createElement("img");
    img.src = array[index].imagen
    img.classList.add("imagen-evento");

    var lugar = document.createElement("p");
    lugar.innerHTML = array[index].lugar

    var fecha = document.createElement("p");
    fecha.innerHTML = array[index].fecha

    //Creando las secciones de los eventos
    var figureTitulo = document.createElement("div");
    figureTitulo.classList.add("info-evento");
    figureTitulo.appendChild(titulo)

    var figureGrafico = document.createElement("div");
    figureGrafico.classList.add("grafico-evento");
    figureGrafico.appendChild(img)

    var figureTexto = document.createElement("div");
    figureTexto.classList.add("grafico-evento-texto");
    figureTexto.appendChild(lugar)
    figureTexto.appendChild(fecha)

    articulo.appendChild(figureTitulo)
    figureGrafico.appendChild(figureTexto)
    articulo.appendChild(figureGrafico)

    salidaindex.appendChild(articulo);

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
