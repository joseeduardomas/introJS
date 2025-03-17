

let contenedorRender = document.getElementById('listaTipoDeDatos');

function addElementoToComendario(valor){
    let actualidad = contenedorRender.innerHTML;
    contenedorRender.innerHTML = actualidad + generateElementTxt(valor);
}


function generateElementTxt(valor){
	let tipoDato = typeof(valor);
    let elemento = `
       <div class="toast mx-auto show">
        <div class="toast-header">
          <strong class="me-auto">Valor a evaluar : <i>${valor}</i></strong>
          <small>${tipoDato}</small>         
        </div>
      </div>
    `;
	
	console.log("El valor " + valor + " es un tipo de dato : " + tipoDato);
    return elemento;
}


addElementoToComendario(42);
addElementoToComendario('Veinticinco');
addElementoToComendario(-666);
addElementoToComendario(true);
addElementoToComendario(0);
addElementoToComendario('');
addElementoToComendario('');
addElementoToComendario(null);
addElementoToComendario(undefined);
addElementoToComendario(false);
addElementoToComendario(NaN);
addElementoToComendario((2/0));
