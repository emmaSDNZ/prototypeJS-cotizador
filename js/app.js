//CONSTRUCTORES

function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}


//realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function(){

    /*
    1=americano 1.15
    2=asiatico 1.05
    3=europeo 1.35 
    */
    let cantidad;
    const base = 2000;

   console.log(this.marca);

   switch (this.marca) {
    case '1':
        cantidad = base * 1.15
        break;
    case '2':
        cantidad = base * 1.05
        break;
    case '3':
        cantidad = base * 1.35
        break;
   
    default:
        break;
   }
   ;

   //leer el año
   const diferencia = new Date().getFullYear()- this.year;

   //por cada año se aumenta unm 3%

   cantidad -= ((diferencia * 3) * cantidad ) /100;
   
   /* 
   si el seguro es basico = * 30%
   si el seguro es completo = *50%

   */
  if(this.tipo === 'basico'){
    cantidad *= 1.30;
  }else {
    cantidad *= 1.50;
  }
  console.log(cantidad);
  return cantidad
   
}

function UI(){}

//llena las opciones de los años
UI.prototype.llenarOpciones = ()=>{

    const max = new Date().getFullYear() ;
   
    const min = max - 20

    const selectYear = document.querySelector('#year')

    for( let i = max; i> min; i--){
        let option = document.createElement('option')
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
} 

UI.prototype.mostrarMensaje = function(mensaje, tipo){

    const div = document.createElement('div')

    if(tipo === "error"){
        div.classList.add('error');
    }else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10')
    div.textContent = mensaje;

    //inyectamos al html
    const formulario = document.querySelector('#cotizar-seguro') 
    formulario.insertBefore(div, document.querySelector('#resultado'))

    setTimeout(()=> {
        div.remove()
    }, 2000)

}

UI.prototype.mostrarResultado = (total, seguro) =>{
    

    
    // creamos el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10')

    div.innerHTML = `
    <p class='header>Tu Resumen </p>
    
    <p class='font-bold'>Total: $ ${total}</p>
    `
    const resultadoDiv = document.querySelector('#resultado')
   

    //mostramos spinner
    const spinner = document.querySelector('#cargando')
    spinner.style.display = 'block'
    setTimeout(()=> {
        spinner.style.display = 'none' //se borra el spinner, pero se muestra el resultado
        resultadoDiv.appendChild(div)
    }, 2000)
  
}


//instanciamos UI
const ui = new UI()
console.log(ui);

document.addEventListener("DOMContentLoaded", function(){  
    //apenas se renderiza la pagina, llego el select con los años
    ui.llenarOpciones(); 
 })

 //funciones
eventListener()


 function eventListener(){

    const formulario = document.querySelector('#cotizar-seguro') 
    console.log(formulario);
    formulario.addEventListener('submit', cotizarSeguro);
 }

function cotizarSeguro(e){
    e.preventDefault();

    //leer marca seleccionada
    const marca = document.querySelector('#marca').value;
    

    //leer el año seleccionado
    const year = document.querySelector('#year').value;


    //leer tipo de cobertura
    //#input[name="tipo"]:checked' me muestra el checked solo si esta seleccionado
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca ==='' || year ==='' || tipo ===''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error')
        return 
    }
    ui.mostrarMensaje('Cotizando...', 'exito')

    //ocultar cotizaciones previas
    const resultados = document.querySelector('#resultado div');

    if(resultados != null){
        resultados.remove();
    }

    //instancaimos el seguro
    const seguro = new Seguro(marca, year, tipo);
    
    const total  = seguro.cotizarSeguro()

    //utilizamos prototype que me hace la cotizacion 
    ui.mostrarResultado(total, seguro)
    console.log(seguro);
}



