const noticiasContainer = document.querySelector("#eventos");

export async function buscarEventos() {

    const url = 'http://localhost:3000/events';


        try{
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            mostrarEventos(resultado);
        } catch (error) {
            console.log('Error')
        }
}

export function mostrarEventos(eventos) {
        // Iterar sobre el arreglo de imagenes y construir el HTML
        eventos.forEach( evento => {
            const { titulo, imagen, lugar, fecha } = evento;
    
            noticiasContainer.innerHTML += `
            <div class="evento">
                <div class="info-evento">
                    <h3>${titulo}</h3>
                </div>

                <div class="grafico-evento">
                    <img class="imagen-evento" src="${imagen}">
                    <div class="grafico-evento-texto">
                        <p>${lugar}</p>
                        <p>${fecha}</p>
                    </div>
                </div>

            </div>
            `;
        });
}