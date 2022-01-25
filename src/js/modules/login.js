const Correo = document.querySelector("#Correo");
const Contrasena = document.querySelector("#Contrasena");
let nameUser;

const Errores = document.querySelector("#errores");
const Resetear = document.querySelector("#Resetear");


function comprobarLocalStorage(){
    if (localStorage.getItem("Usuarios") === null) {
        var usuario = new Object();

        usuario.nombre = "admin";
        usuario.correo = "admin@gmail.com";
        usuario.contrasena = "Admin12";

        let usuarios = [];
        usuarios.push(usuario);
        localStorage.setItem("Usuarios", JSON.stringify(usuarios))
        guardar();
      }
}
comprobarLocalStorage();

function guardar() {
    let CorreoEstado = Correo.value;
    let CorreoLongitud = CorreoEstado.length;
    let ContrasenaEstado = Contrasena.value;
    let ContrasenaLongitud = ContrasenaEstado.length;
    let tipoError;

    let usuarios = localStorage.getItem("Usuarios");
    usuarios = JSON.parse(usuarios);

    usuarios.forEach(usuario => {

        if(usuario.correo == Correo.value && usuario.contrasena == Contrasena.value){
            nameUser = usuario.nombre;
            crearCookieUser();
            return;
        }
        else{
            tipoError = "desiguales";
            mostrarErrorDesigual(tipoError);
        }
    });

    // Validación correo 

    let countArroba = (CorreoEstado.match(/@/g) || []).length;

    if(CorreoEstado === null || CorreoEstado === undefined || CorreoEstado == ''){
        tipoError = "vacio"
        mostrarErrorCorreo(tipoError);
        return;
    }
    if(CorreoLongitud < 6 || CorreoLongitud > 24){
        tipoError = "longitud"
        mostrarErrorCorreo(tipoError);
        return;
    }
    if(countArroba == 0 || countArroba > 1){
        tipoError = "arroba"
        mostrarErrorCorreo(tipoError);
        return;
    }
    if(CorreoEstado.indexOf(".") == -1){
        tipoError = "punto"
        mostrarErrorCorreo(tipoError);
        return;
    }

    // Validación de contraseña

    let countNumeros = (ContrasenaEstado.match(/\d/g) || []).length;
    let countMayus = (ContrasenaEstado.match(/[A-Z]/g) || []).length;

    if(ContrasenaLongitud < 6){
        tipoError = "longitud";
        mostrarErrorContrasena(tipoError);
        return;
    }
    if(countMayus < 1){
        tipoError = "mayuscula";
        mostrarErrorContrasena(tipoError);
        return;
    }
    if(countNumeros < 2){
        tipoError = "numeros";
        mostrarErrorContrasena(tipoError);
        return;
    }
};

Resetear.addEventListener("click" ,function () {
    document.getElementById("Inciar-sesion").reset();  
})

function mostrarErrorCorreo(tipoError){
    let errorCC = document.createElement("div");

    switch (tipoError) {
        case "vacio":
            errorCC.innerHTML = "Error de correo, está vacío.";
            break;
        case "longitud":
            errorCC.innerHTML = "Error de correo, la longitud debe estar entre 6 y 24 caracteres.";
            break;
        case "arroba":
                errorCC.innerHTML = "Error de correo, debe tener @.";
                break;
        case "punto":
            errorCC.innerHTML = "Error de correo, debe tener '.' .";
            break;
        default:
            errorCC.innerHTML = "Error de contraseña.";
            break;
    }

    errorCC.classList.add("error");
    Errores.appendChild(errorCC);

    setTimeout( () => {
        errorCC.remove();
    }, 3000);
}

function mostrarErrorContrasena(tipoError){
    let errorCC = document.createElement("div");

    switch (tipoError) {
        case "longitud":
            errorCC.innerHTML = "Error de contraseña, mínimo 6 caracteres.";
            break;
        case "mayuculas":
            errorCC.innerHTML = "Error de contraseña, no contiene mayúsculas.";
            break;
        case "numeros":
            errorCC.innerHTML = "Error de contraseña, no contiene al menos 2 números.";
            break;
        default:
            errorCC.innerHTML = "Error de contraseña";
            break;
    }

    errorCC.classList.add("error");
    Errores.appendChild(errorCC);

    setTimeout( () => {
        errorCC.remove();
    }, 3000);
}

function mostrarErrorDesigual(){
    let errorCC = document.createElement("div");
    if(!document.querySelector(".error")){
        errorCC.classList.add("error");
        Errores.appendChild(errorCC);
        errorCC.innerHTML = "Error, no coincide correo o contraseña.";

        setTimeout( () => {
            errorCC.remove();
        }, 3000);
    }
    else{
        return;
    }

}

function crearCookieUser(){
    var fechaGalleta = new Date();
    fechaGalleta.setTime(fechaGalleta.getTime() + (7 * 24 * 60 * 60 * 1000));
    document.cookie = nameUser;
    window.location.replace("index.html");
}