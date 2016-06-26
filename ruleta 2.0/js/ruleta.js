"use strict";

var apuestas = [];
var costo_apuesta =1; //este va a ser el valor de las apuesta. en este caso sera de 1

/**********************************/
/*          OBJETO JUGADOR       */

function jugador(){
  var apostado= []
  return{
    credito: 100,
    apuesta: apostado,
    getCredit: function(){
      return this.credito;
    },
    getapuesta: function(){
      this.apuesta;
    },
    sumarapuesta: function(apuesta) {
      this.apuesta.push(apuesta)
    },
    aumentarCredito: function(monto){
      this.credito = this.credito + monto;
    },
    disminuirCredito: function(){
      this.credito--;
    }
  }
}

/*************************************/


/*********************************/
/*          OBJETO NUMERO       */

function numero(valor, cantnum){ // tengo que agregar que la mitad para arriba sea al revez los colores
  return {
    numero: valor,
    paroimpar:function () {
      if(this.numero === 0){
        return "es cero"
      }
      else if (this.numero % 2 === 0) {
        return "par";
      }
      else {
        return "impar";
      }
    },
    color: function(){
      if (this.numero === 0){
        return "verde"
      }
      else if (this.paroimpar() === "par"){
        return "rojo"
      }
      else{
        return "negro"
      }
    }
  }
}

/********************************/


/**********************************/
/*          OBJETO APUESTA       */
function apuesta(tipo, costo_apuesta){
  return {
    valor_apuesta:costo_apuesta,
    tipo_apuesta:tipo,
    aumentar_apuesta: function () {
      this.valor_apuesta= this.valor_apuesta + costo_apuesta
    },
    devolver_valorapuesta: function () {
      return this.valor_apuesta
    },
    devolver_tipoapuesta: function () {
      return this.tipo_apuesta
    }
  }
}
/**********************************/

/**********************************/
/*          OBJETO TABLERO       */

function tablero(cantnum) {
  var arrenum = [];
  for (var i = 0; i < cantnum; i++) {
    var num = new numero(i, cantnum);  //creamos los objetos numeros
    arrenum.push(num);        //los agregamos en el arreglo

  }
  return{
    arreglon: arrenum,
    mostrartablero: function() {
      $("#cant").css("display", "none");
      $("#ocultar").css("display", "block");
      mostrarnumeros(this.arreglon);
    }
  }
}

function cargartodo(){
  var cantn = $("#cantidad").val();
  var tablerito = new tablero(cantn);
  tablerito.mostrartablero();
  
}

$("#entrar").on("click", function(){cargartodo()});

/***************************************************/
function mostrarnumeros(arreglon) {
  for (var i = 0; i < arreglon.length; i++) {
    var agregarclase= '<input type="button" class="'+arreglon[i].color()+' numero col-md-4 " value="'+i+'"></input>'
    $("#mostrarnumeros").append(agregarclase)
  }

}
