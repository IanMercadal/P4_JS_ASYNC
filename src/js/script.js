// IMPORTS
import {
    crearNoticia,
    recorrerNoticia
} from './modules/noticias.js';

import {
    CrearEventosIniciales,
    CrearEventosFormulario,
    OrdenarId,
    OrdenarLugar
} from './modules/eventos.js';

// VARIABLES GLOBALES

/*Creamos las variables globales primeramente, estas variables
nos permitirán acceder manipular desde cualquier punto sus clases, funciones, etc.
*/
const inicio = document.getElementById("inicio-menu");
const eventos = document.getElementById("eventos-menu");
const noticiasMenu = document.getElementById("noticias-menu");
const calendario = document.getElementById("calendario-menu");
const login = document.getElementById("login-menu");
const register = document.getElementById("register-menu");
const botonScrollTop = document.getElementById("boton-scroll-up");
const hamburger = document.getElementById("hamburger");

const columnaIzquierda = document.querySelector('.columna-izquierda');
var overlayActivo = false;

window.onload = function () {

    Cookies();
    CrearEventosIniciales();
    hamburgerMenu();

    if (columnaIzquierda) {
        crearNoticia();
        recorrerNoticia();
        Calendario();
        allowScrollIntoView();
        userName();
    }

    if (columnaIzquierda == null) {

        document.getElementById("IntroducirEvento").onclick = function () {
            on()
            overlayActivo = true
        }

        document.getElementById("CerrarEvento").onclick = function () {
            if (overlayActivo == true) {
                off()
                overlayActivo = false
            }
        }

        document.getElementById("Enviar").addEventListener("click", function (event) {
            event.preventDefault()
            CrearEventosFormulario()
            document.getElementById("Resetear").click()
        });

        document.getElementById("OrdenarId").onclick = function () {
            OrdenarId()
        }

        document.getElementById("OrdenarLugar").onclick = function () {
            OrdenarLugar()
        }
    }
}

//INDICE

function hamburgerMenu() {

    if (ventana.matches) {

        // Si la ventana coincide con la resolución, aplicale hidden o al contrario

        inicio.classList.add("hidden");
        eventos.classList.add("hidden");
        noticiasMenu.classList.add("hidden");
        calendario.classList.add("hidden");
        login.classList.add("hidden");
        register.classList.add("hidden");

        hamburger.classList.remove('hidden');

        hamburger.onclick = function () {
            MostrarMenu()
        }
    } else {
        inicio.classList.remove("hidden");
        eventos.classList.remove("hidden");
        noticiasMenu.classList.remove("hidden");
        calendario.classList.remove("hidden");
        login.classList.remove("hidden");
        register.classList.remove("hidden");

        hamburger.classList.add('hidden');
    }
}
var ventana = window.matchMedia("(max-width: 768px)");
hamburgerMenu(ventana); // llamamos a la función y pasamos por paramentro la variable ventana
ventana.addListener(hamburgerMenu); // Le añadimos un listener para que compruebe los cambios

function MostrarMenu() {
    // Esta función solo se aplica a hamburger menu
    inicio.classList.remove("hidden");
    eventos.classList.remove("hidden");
    noticiasMenu.classList.remove("hidden");
    calendario.classList.remove("hidden");
    login.classList.remove("hidden");
    register.classList.remove("hidden");

    hamburger.removeAttribute("onclick", "MostrarMenu");
    hamburger.setAttribute("onclick", "OcultarMenu()");

    hamburger.onclick = function () {
        OcultarMenu()
    }
}

function OcultarMenu() {
    // Solo para menu
    inicio.classList.add("hidden");
    eventos.classList.add("hidden");
    noticiasMenu.classList.add("hidden");
    calendario.classList.add("hidden");
    login.classList.add("hidden");
    register.classList.add("hidden");

    hamburger.removeAttribute("onclick", "OcultarMenu");
    hamburger.setAttribute("onclick", "MostrarMenu()");

    hamburger.onclick = function () {
        MostrarMenu()
    }
}

//CALENDARIO

function Calendario() {
    var salida = document.querySelector("#calendario")

    var mes = document.createElement("figure")
    mes.classList.add("mes")

    var nombreMes = document.createElement("h3")
    nombreMes.innerHTML = "Noviembre 2021"
    mes.appendChild(nombreMes)

    var semana = document.createElement("ul")
    semana.classList.add("semana")

    var diasDeMes = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]

    for (let index = 0; index < diasDeMes.length; index++) {
        var diaSemana = document.createElement("li")
        diaSemana.innerHTML = diasDeMes[index]
        semana.appendChild(diaSemana)
    }

    var dias = document.createElement("ul")
    dias.classList.add("dias")

    for (let index = 1; index < 31; index++) {
        var dia = document.createElement("li")

        if (index == 1) {
            var enlace = document.createElement("a")
            enlace.href = "eventos.html"
            enlace.innerHTML = index;
            dia.appendChild(enlace)
        } else {
            dia.innerHTML = index
        }
        dias.appendChild(dia)
    }

    salida.appendChild(mes)
    salida.appendChild(semana)
    salida.appendChild(dias)
}


// SCROLL INTO VIEW

/*
Primeramente debemos comprobar si la página es index o eventos,
un modo sería comprobar si un elemento exclusivo de index existe, de otro modo,
no insertará la función a los respectivos elementos
*/

function allowScrollIntoView() {
    //const columnaIzquierda = document.querySelector('.columna-izquierda');

    if (columnaIzquierda) {
        eventos.onclick = function () {
            scrollIntoViewMenu(this.id)
        }
        noticiasMenu.onclick = function () {
            scrollIntoViewMenu(this.id)
        }
        calendario.onclick = function () {
            scrollIntoViewMenu(this.id)
        }
        botonScrollTop.onclick = function () {
            scrollIntoViewMenu(this.id)
        }
    }
}

function scrollIntoViewMenu($id) {

    const nav = document.querySelector(".menu");
    const eventos = document.getElementById("eventos");
    const noticias = document.getElementById("noticias");
    const calendario = document.getElementById("calendario");

    if ($id == "boton-scroll-up") {
        nav.scrollIntoView({
            behavior: 'smooth'
        });
    }
    if ($id == "eventos-menu") {
        eventos.scrollIntoView({
            behavior: 'smooth'
        });
    }
    if ($id == "noticias-menu") {
        noticias.scrollIntoView({
            behavior: 'smooth'
        });
    }
    if ($id == "calendario-menu") {
        calendario.scrollIntoView({
            behavior: 'smooth'
        });
    }
    if ($id == "boton-scroll-up") {
        nav.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

//COOKIES
function Cookies() {

    var galleta = document.cookie;
    if (galleta == "") {
        setTimeout(function () {
            // alert("Acepta la cookie");
            const body = document.getElementsByTagName("body");
            let cookieOverlay = document.createElement("button");
            let cookieOverlayText = document.createElement("p");
            let cookieParent = document.createElement("div");

            cookieOverlay.classList.add('cookieOverlay');
            cookieParent.classList.add('cookieParent');
            cookieOverlayText.classList.add('botonCookie');
            cookieOverlay.setAttribute("onclick", "aceptarCookie()");
            cookieOverlayText.innerHTML = "Aceptar Cookie";

            document.body.appendChild(cookieParent);
            cookieParent.appendChild(cookieOverlay);
            cookieOverlay.appendChild(cookieOverlayText);

            cookieOverlay.onclick = function () {
                aceptarCookie()
            }
        }, 3000)
    }
}

function aceptarCookie() {
    let cookieParent = document.querySelector(".cookieParent");
    var fechaGalleta = new Date();
    fechaGalleta.setTime(fechaGalleta.getTime() + (7 * 24 * 60 * 60 * 1000));
    document.cookie = "expires=" + fechaGalleta.toUTCString() + ";"
    document.body.removeChild(cookieParent);
};

//OVERLAY
/*Mostrar el formulario*/
function on() {
    document.getElementById("formulario").id = "overlay";
}

/*Esconder el formulario*/
function off() {
    document.getElementById("overlay").id = "formulario";
}

function userName(){
    let userName = document.querySelector("#user-name")
    let userNameInfo = document.createElement("h2")

    if(document.cookie !== null){
        userNameInfo.innerHTML = "Hola " + document.cookie;
        userName.appendChild(userNameInfo);
    }
}