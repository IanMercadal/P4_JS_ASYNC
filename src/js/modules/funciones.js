export function mostrarAlerta(mensaje) {
    const alerta = document.querySelector(".error");

    if(!alerta){
        let alerta = document.createElement('p');
        alerta.classList.add('error');

        alerta.innerHTML = `Error de ${mensaje}`;

        const formulario = document.querySelector('#FormularioEventos');
        formulario.appendChild(alerta);

        setTimeout(function() {
            alerta.remove();
        }, 3000);
    }
}
export function validar(obj) {
    return !Object.values(obj).every(input => input !== '');
}