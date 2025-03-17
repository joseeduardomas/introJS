

let formulario = document.getElementById('comentarioForm');
let campoComentario = document.getElementById('comentarioField');
let campoAutorComentario = document.getElementById('autorComentarioField');
let cantidadActual = localStorage.cantidadActual ? parseInt(localStorage.cantidadActual) : 0;
let prefijoID = 'com';
let contenedorRender = document.getElementById('listaComentariosAgredados');

formulario.onsubmit = (event) => {
    event.preventDefault();
    console.log('Se realizo submit.');
    console.log('');

    let valorComentario = campoComentario.value;
    let autorComentario = campoAutorComentario.value;

    //Se limpia los campos para que no se repita la misma información
    campoComentario.value = '';
    campoAutorComentario.value = '';


    //Se almacena con localStorage
    //let comentariosActuales = localStorage.getItem("comentarios");
    addElementoToComendario(valorComentario, autorComentario);
};


function addElementoToComendario(comentario, autor = null){
    let horaFecha = new Date();
    let fechaTxt = horaFecha.toLocaleDateString();
    let horaText = horaFecha.toLocaleTimeString();

    let valorAlmacenar = {
        comentario: comentario,
        autor:autor,
        fecha:fechaTxt,
        hora:horaText,
    };

    localStorage.setItem('cantidadActual', (cantidadActual + 1))
    localStorage.setItem(prefijoID + cantidadActual, JSON.stringify(valorAlmacenar));
    cantidadActual = cantidadActual + 1;

    let actualidad = contenedorRender.innerHTML;
    contenedorRender.innerHTML = actualidad + generateElementTxt(comentario, autor, fechaTxt, horaText, cantidadActual);
}

function removeElementoFromComentarios(id){
    localStorage.removeItem(prefijoID + id);
    console.log('ID:',id);
    document.getElementById(prefijoID + id).remove();
}

function generateElementTxt(comentario, autor = null, fecha, hora, id){
    if(!autor) {
        autor = 'Anonimo';
    }

    let elemento = `
       <div class="toast mx-auto show" id="${prefijoID}${id}">
        <div class="toast-header">
          <strong class="me-auto">${autor}</strong>
          <small>${fecha} - ${hora}</small>
         
          <button type="button" class="btn-close" onclick="removeElementoFromComentarios(${id})"></button>
        </div>
        <div class="toast-body">
          <p>${comentario}</p>
        </div>
      </div>
    `;

    return elemento;
}


function renderElements() {
    let txtGlobal = '';
    for (let i = 0; i < cantidadActual; i++) {
        let jsonComentario = JSON.parse(localStorage.getItem(prefijoID + i));

        if(jsonComentario) {
            //let childTemporal = document.createElement('div');

            let comentario = jsonComentario.comentario;
            let autor = jsonComentario.autor;
            let fecha = jsonComentario.fecha;
            let hora = jsonComentario.hora;

            txtGlobal += generateElementTxt(comentario, autor, fecha, hora, i);
            //contenedorRender.appendChild(childTemporal.firstChild);
        }
    }

    contenedorRender.innerHTML = txtGlobal;
}


renderElements();