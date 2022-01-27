const url = 'http://localhost:3000/events';

// Cuando se crea un nuevo evento
export const nuevoEvento = async evento => {

    try{
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(evento),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch(error){
        console.log(error);
    }
}
// Obtiene todos los eventos
export const obtenerEventos = async () => {
    try {
        const resultado = await fetch(url);
        const eventos = await resultado.json();
        return eventos;
    } catch (error) {
        console.log(error);
    }
}

// Eliminar un evento
export const eliminarEvento = async id => {
    try {
        await fetch(`${url}/${id}`,{
            method: 'DELETE'
        });
    }catch (error) {
        console.log(error);
    }
}

// Obtiene un Eventos por su ID
export const obtenerEvento = async id => {
    try {
        const resultado = await fetch(`${url}/${id}`);
        const eventos = await resultado.json();
        return eventos;
    } catch (error) {
        console.log(error)
    }
}

// Actualiza un registro
export const editarEventos = async eventos => {
    try{
        await fetch(`${url}/${eventos.id}`,{
            method: 'PUT',
            body: JSON.stringify(eventos),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.href = 'index.html';
    }catch (error) {
        console.log(error)
    }
}