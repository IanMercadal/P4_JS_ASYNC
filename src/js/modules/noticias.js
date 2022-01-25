export {
    crearNoticia as crearNoticia,
    recorrerNoticia as recorrerNoticia
  };
var noticias = [];
const noticiasContainer = document.querySelector(".noticias-container");

function crearNoticia() {
    for (let j = 1; j <= 10; j++) {
        // Creamos un objeto nuevo cada vez que se recorre el array para evitar sobreescritura
        let noticia = new Object();
        noticia.titulo = `Noticia ${j}`;
        noticia.fecha = `${j}/11/2021`;
        noticia.imagen = `img/noticias/${j}.jpg`;
        noticia.texto = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu nunc dolor. Fusce dapibus gravidalorem vel molestie. Quisque viverra vehicula mauris vitae elementum.";
        noticia.prioridad = false;

        // A los elementos seleccionados le asignamos un atributo prioridad
        noticias.forEach(noticia => {
            if(noticia.titulo == "Noticia 4"){
                noticia.prioridad = true;
            }
            if(noticia.titulo == "Noticia 6"){
                noticia.prioridad = true;
            }
            if(noticia.titulo == "Noticia 9"){
                noticia.prioridad = true;
            }
        });
        noticias.push(noticia);
    }
    return noticias;
}
function recorrerNoticia(){
    
    // Si algun elemento contiene prioridad true, colocalo primero
    const NoticiasOrdenado = noticias.some(noticia => {
        if(noticia.prioridad == true){
            noticias.sort(function(a,b){return b.prioridad-a.prioridad});
        }
    })

    noticias.forEach(noticia => {

        // Por cada elemento del array le añadimos las respectivas etiquetas
        let titulo = document.createElement("h3");
        titulo.innerHTML = noticia.titulo;

        let fecha = document.createElement("p");
        fecha.innerHTML = noticia.fecha;

        let imagen = document.createElement("img");
        imagen.classList.add("imagen-noticia")
        imagen.src = noticia.imagen;

        let texto = document.createElement("p");
        texto.innerHTML = noticia.texto;

        // Creacion de elementos DOM

        // Vamos insertanto cada elemento en el DOM
        
        let divNoticia = document.createElement("div");
        divNoticia.classList.add("noticia");

        let divInfoNoticia = document.createElement("div");
        divInfoNoticia.classList.add("info-noticia");
        divInfoNoticia.appendChild(titulo);
        divInfoNoticia.appendChild(fecha);

        let divGraficoNoticia = document.createElement("div");
        divGraficoNoticia.classList.add("grafico-noticia");
        divGraficoNoticia.appendChild(imagen);
        divGraficoNoticia.appendChild(texto);

        noticiasContainer.appendChild(divNoticia);
        divNoticia.appendChild(divInfoNoticia);
        divNoticia.appendChild(divGraficoNoticia);
    });
}
