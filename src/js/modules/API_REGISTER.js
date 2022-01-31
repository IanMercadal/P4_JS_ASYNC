const url = 'http://localhost:3001/auth/register';

const nuevoUsuario = async usuario => {

    try{
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch(error){
        console.log(error);
    }
}

export function insertarUsuario() {
    let email = (document.getElementById("Correo").value).trim();
    let password = (document.getElementById("Contrasena").value).trim();

    const usuario = {
        email,
        password
    };
    nuevoUsuario(usuario);
}