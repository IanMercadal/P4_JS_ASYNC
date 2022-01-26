const noticiasContainer = document.querySelector(".noticias-container");

export async function buscarNoticias() {

    const url = 'http://localhost:3000/noticias';


        try{
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            mostrarNoticias(resultado);
        } catch (error) {
            console.log('Error')
        }
}

export function mostrarNoticias(eventos) {
        // Iterar sobre el arreglo de imagenes y construir el HTML
        eventos.forEach( evento => {
            const { titulo, imagen, texto, fecha } = evento;
    
            noticiasContainer.innerHTML += `
            <div class="noticia">
                <div class="info-noticia">
                    <h3>${titulo}</h3>
                    <p>${fecha}</p>
                </div>

                <div class="grafico-noticia">
                    <img class="imagen-noticia" src="${imagen}">
                    <p> ${texto}</p>
                </div>

            </div>
            `;
    
        });
}