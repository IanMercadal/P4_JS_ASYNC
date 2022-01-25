const Nombre = document.querySelector("#Nombre");
const Correo = document.querySelector("#Correo");
const Contrasena = document.querySelector("#Contrasena");
const RepetirContrasena = document.querySelector("#RepetirContrasena");

//VARIABLES DEL FORMULARIO
var nombreEstado
var nombreTamano

var correoEstado
var correoTamano

var contrasenaEstado = ""
var contrasenaTamano

var repetirContraEstado = ""
var repetirContraTamano

//VARIABLES LAS CONTRASEÑAS
var oculto1 = false
var oculto2 = false

var primeravez1 = true
var primeravez2 = true

//VARIABLES DEL CORREO
var correoIgual //Usada para comprobar que el correo tenga el mismo valor
var regExp = /^[a-zA-Z]{1}[a-z]+[@]{1}[a-z]{5,10}[.]{1}[a-z]{3}$/

//Array donde se guardaran los objetos con los datos del formulario
var usuarios = []


window.onload = function () {
    UsuariosBase()

    /* Comprueba al salir del campo que se cumplen los requisitos,
    sino cambia el color al borde*/
    document.getElementById("Nombre").onblur = function () {
        ColorError(ComprobarNombre(), Nombre)
    }

    document.getElementById("Correo").onblur = function () {
        ColorError(ComprobarEmail(), Correo)
    }
    
    //OCULTAR/MOSTRAR COTRASEÑA 1

    document.getElementById("Contrasena").onfocus = function () {
        if (primeravez1 == true) {
            contrasenaEstado = (Contrasena.value).trim()
            contrasenaTamano = contrasenaEstado.length
            primeravez1 = false
        }
        MostrarFormulario(contrasenaEstado, Contrasena)
    }

    document.getElementById("Contrasena").onblur = function () {
        contrasenaEstado = (Contrasena.value).trim()
        contrasenaTamano = contrasenaEstado.length
        OcultarFormulario(contrasenaTamano, Contrasena)
        ComprobarContra()
    }

    document.getElementById("contrasena1").onmousedown = function () {
        if (primeravez1 == true) {
            contrasenaEstado = (Contrasena.value).trim()
            contrasenaTamano = contrasenaEstado.length
            primeravez1 = false
        }
        MostrarFormulario(contrasenaEstado, Contrasena)
    }

    document.getElementById("contrasena1").onmouseup = function () {
        OcultarFormulario(contrasenaTamano, Contrasena)
    }

    
    //OCULTAR/MOSTRAR COTRASEÑA 2

    document.getElementById("RepetirContrasena").onfocus = function () {
        if (primeravez2 == true) {
            repetirContraEstado = (RepetirContrasena.value).trim()
            repetirContraTamano = repetirContraEstado.length
            primeravez2 = false
        }
        MostrarFormulario(repetirContraEstado, RepetirContrasena)
    }

    document.getElementById("RepetirContrasena").onblur = function () {
        repetirContraEstado = (RepetirContrasena.value).trim()
        repetirContraTamano = repetirContraEstado.length
        OcultarFormulario(repetirContraTamano, RepetirContrasena)
        ComprobarContra()
    }

    document.getElementById("contrasena2").onmousedown = function () {
        if (primeravez2 == true) {
            repetirContraEstado = (RepetirContrasena.value).trim()
            repetirContraTamano = repetirContraEstado.length
            primeravez2 = false
        }
        MostrarFormulario(repetirContraEstado, RepetirContrasena)
    }

    document.getElementById("contrasena2").onmouseup = function () {
        OcultarFormulario(repetirContraTamano, RepetirContrasena)
    }

    // Validar la información que se envia al formulario
    document.getElementById("Enviar").onclick = function (event) {
        event.preventDefault()
        if (ComprobarNombre() == false) {
            Mostrar("Ha habido un error en el Nombre")
            ColorError(ComprobarNombre(), Nombre)

        } else if (ComprobarEmail() == false) {
            Mostrar("Ha habido un error en el Correo")
            ColorError(ComprobarEmail(), Correo)

        } else if (ComprobarContra() == false) {
            Mostrar("Ha habido un error en la Contraseña")
            ColorError(ComprobarContra(), RepetirContrasena)

        } else {
            IntroducirDatos()
            document.getElementById("Resetear").click()
        }
    }

    //Cuando se resetea el formulario que los valores de contraseña sean por defecto
    document.getElementById("Resetear").onclick = function () {
        primeravez1 = true
        primeravez2 = true
    }
}

//Comprueba que el correo cumpla los requisitos de la expresión regular y el correo no sea igual
function ComprobarEmail() {
    correoEstado = Correo.value
    correoIgual = true
    usuarios.forEach(ValidarEmail);
    if (correoEstado.match(regExp) && correoIgual != false) {
        return true
    } else {
        return false
    }
}

// Valida que el correo que se envia no sea uno que ya este guardado
function ValidarEmail(correoUsuario) {
    if (correoUsuario.correo == correoEstado) {
        correoIgual = false
    }
}

//Comprueba que el nombre no este vacio y tenga menos de 15 caracteres
function ComprobarNombre() {
    nombreEstado = (Nombre.value).trim()
    nombreTamano = nombreEstado.length
    if (nombreTamano > 15 || nombreEstado == "") {
        return false;
    } else {
        return true;
    }
}

/* Valida que la contraseña cumpla todo lo necesario entre ello que las dos contraseñas
sean iguales y en caso de no ser así informa de error en la zona que esta mal*/
function ComprobarContra() {

    if (ValidarContra() == true) {
        Contrasena.classList.remove("errorInput")
        if (contrasenaEstado != repetirContraEstado) {
            RepetirContrasena.classList.add("errorInput")
            return false
        } else {
            RepetirContrasena.classList.remove("errorInput")
            return true
        }
    } else {
        Contrasena.classList.add("errorInput")
        return false
    }
}

/* Valida que la contraseña cumpla con el minimo de caracteres que necesita*/
function ValidarContra() {
    var countNumeros = (contrasenaEstado.match(/\d/g) || []).length;
    var countMayus = (contrasenaEstado.match(/[A-Z]/g) || []).length;

    if (contrasenaTamano < 6 || countMayus < 1 || countNumeros < 2 || contrasenaEstado == "") {
        return false
    } else {
        return true
    }
}

// Muestra un mensaje en la web a través del texto que se envie
function Mostrar(mensaje) {
    var salida = document.getElementById("salida")
    salida.innerHTML = mensaje
}

/* Se pasa el validador que envia un true o false y el campo al que
se quiere añadir el error y entonces se le aplica o elimina*/
function ColorError(validador, campo) {
    if (validador == false) {
        campo.classList.add("errorInput")
    } else {
        campo.classList.remove("errorInput")
    }
}

/* Se envia el tamaño de la contraseña y el campo del formulario en el que se quiere
introducir, se aplica en ocultar la contraseña*/
function OcultarFormulario(tamano, formulario) {
    var mensaje = "";
    for (let index = 0; index < tamano; index++) {
        mensaje += "*"
    }
    formulario.value = mensaje
}

/* Coge el valor que tenga la palabra y lo muestra, se utiliza para mostrar la contraseña*/
function MostrarFormulario(palabra, formulario) {
    formulario.value = palabra
}

function IntroducirDatos() {
    //Reiniciar las variables que necesitan un reinicio
    primeravez1 = true
    primeravez2 = true

    //Crea el objeto con los datos del usuario
    var usuario = new Object();
    usuario.nombre = nombreEstado
    usuario.correo = correoEstado
    usuario.contrasena = contrasenaEstado
    usuarios.push(usuario);
    localStorage.setItem("Usuarios", JSON.stringify(usuarios))
    Mostrar("El registro se ha realizado de forma correcta")
}

// Crea el usuario por defecto de la web
function UsuariosBase() {
    var usuario = new Object();
    usuario.nombre = "admin"
    usuario.correo = "admin@gmail.com"
    usuario.contrasena = "Admin12"
    usuarios.push(usuario);
}
