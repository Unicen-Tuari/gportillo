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
      if (this.numero % 2 === 0) {
        return "par";
      }
      else {
        return "impar";
      }
    },
    color: function(){
      if (this.valor == 0)
      return"verde"
      else if (this.paridad = "par")
      return "rojo"
      else
      return "negro"
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
      CargarAjax: function() {
        // body...

        $.ajax(
          {
            type:"GET",
            url:"../html/jugador.html",
            success: function(datos){
              $("#mostrarapuestas").innerHTML = datos;
            },
            dataType: "html",
            error: function(){
              alert ("error")
               }
          }
        );
      }
    }
  }

  function cargartodo(){
    var cantn = $("#cantidad").value;
    var tablerito = new tablero(cantn);
    tablerito.CargarAjax();
  }

  $("#entrar").on("click", function(){cargartodo()});
