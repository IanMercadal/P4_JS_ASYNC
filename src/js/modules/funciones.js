export function mostrarAlerta(mensaje) {
    const alerta = document.querySelector(".error");

    if(!alerta){
        let alerta = document.createElement('p');
        alerta.classList.add('error');

        alerta.innerHTML = `Error de ${mensaje}`;

        const formulario = document.querySelector('#FormularioEventos');

        if(!formulario) {
            const errores = document.querySelector('#errores');
            errores.appendChild(alerta);
        } else {
            formulario.appendChild(alerta);
        }

        setTimeout(function() {
            alerta.remove();
        }, 3000);
    }
}
export function validar(obj) {
    return !Object.values(obj).every(input => input !== '');
}