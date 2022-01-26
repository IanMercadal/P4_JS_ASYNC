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
        window.location.href = 'index.html';
    } catch(error){
        console.log(error);
    }
}