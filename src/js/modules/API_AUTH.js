const url = 'http://localhost:3001/auth/login';

// Obtiene token
function mostrarToken() {
    let user = document.querySelector('#Correo').value;
    let password = document.querySelector('#Contrasena').value;    

    fetch('http://localhost:3001/auth/login', {
    method: 'GET',
    headers: { Authorization: 'Basic ' + btoa(user + ':' + password) }
    })
    .then(res => res.json())
    .then(data => {
        var fechaGalleta = new Date();
        fechaGalleta.setTime(fechaGalleta.getTime() + (7 * 24 * 60 * 60 * 1000));
        document.cookie=`access_token=${data.access_token}` + 'Usuario: ' + user;
        window.location.href = 'index.html';
    });
}
