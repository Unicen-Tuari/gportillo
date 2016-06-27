"use strict";

var apuestas = [];
const costo_apuesta =1; //este va a ser el valor de las apuesta. en este caso sera de 1
var jugador1 = new jugador;
var jugador2 = new jugador;
var jugadorAct = 1;

/**********************************/
/*          OBJETO JUGADOR       */

function jugador(){//negro, rojo, par, impar, menor, mayor, pleno
  var apostado= []
  return{
    credito: 100,
    apuesta: apostado,
    getCredit: function(){
      return this.credito;
    },
    getapuesta: function(){
      return this.apuesta;
    },
    sumarapuesta: function(tipoapuesta) {
      var noesta=true;
      for (var i = 0; i < this.apuesta.length; i++) {
        if (this.apuesta[i].devolver_tipoapuesta() === tipoapuesta){
          this.apuesta[i].aumentar_apuesta();
          noesta=false;
        }
      }
      if (noesta){
        var ojeto = new apuesta(tipoapuesta)
        this.apuesta.push(ojeto)
      }
    },

    aumentarCredito: function(costo_apuesta){
      this.credito = this.credito + costo_apuesta;
    },
    disminuirCredito: function(){
      this.credito= this.credito- costo_apuesta;
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
    },
    mitad: function(){
      if (this.numero > cantnum/2) {
        return 'Segunda mitad';
      }
      else {
        return 'Primera mitad';
      }
    }
  }
}

/********************************/


/**********************************/
/*          OBJETO APUESTA       */
function apuesta(tipo, costo_apuesta){
  return {
    valor_apuesta:1,
    tipo_apuesta:tipo,
    aumentar_apuesta: function () {
      this.valor_apuesta = this.valor_apuesta + 1;
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
    },
    gettablero: function(){
      return this.arreglon;
    }
  }
}

/**********************************/

function cargartodo(){
  var cantn = $("#cantidad").val();
  var tablerito = new tablero(cantn);
  tablerito.mostrartablero();
}

$("#entrar").on("click", function(){cargartodo()});

function mostrarnumeros(arreglon) {
  var fin = arreglon.length;
  var final = fin -1;
  var medio = Math.floor(fin /2);
  var otromedio = medio +1;
  for (var i = 0; i < fin; i++) {
    var agregarclase= '<input type="button" class="'+arreglon[i].color()+' numero col-md-4 " value="'+i+'"></input>'
    $("#mostrarnumeros").append(agregarclase)
  }
  var apu = '<input type="button" id="nrojo" class="rojo col-md-6" value="rojo"></input>';
  apu = apu + '<input type="button" id="nnegro" class="negro col-md-6" value="negro"></input>';
  apu = apu + '<input type="button" id="npar" class="pares col-md-6" value="pares"></input>';
  apu = apu + '<input type="button" id="nimpar" class="impares col-md-6" value="impares"></input>';
  apu = apu + '<input type="button" id="mitad1" class="primitad col-md-6" value="'+"1-"+medio+'"></input>';
  apu = apu + '<input type="button" id="mitad2" class="segmitad col-md-6" value="'+otromedio+'-'+final+'"></input>';
  apu = apu + '<input type="button" id="jugador" class="suerte col-md-6" value="Jugador 2"></input>';
  apu = apu + '<input type="button" id="suerte" class="suerte col-md-6" value="SUERTE!"></input>';
  $("#mostrarapuestas").append(apu);
  agregarapuesta();
}

function agregarapuesta(){
  $("#nrojo").on("click", function (){cargarAjugador(jugadorAct, "rojo")});
  $("#nnegro").on("click", function (){cargarAjugador(jugadorAct, "negro")});
  $("#npar").on("click", function (){cargarAjugador(jugadorAct, "par")});
  $("#nimpar").on("click", function (){cargarAjugador(jugadorAct, "impar")});
  $("#mitad1").on("click", function (){cargarAjugador(jugadorAct, "primitad")});
  $("#mitad2").on("click", function (){cargarAjugador(jugadorAct, "segmitad")});
  $("#jugador").on("click", function (){cambiarjugador()});

  var arreglon = $(".numero");
  for (var i = 0; i < arreglon.length; i++) {
    asignarvalor(i, arreglon[i])
  }
}
function asignarvalor(nro, boton){
  boton.onclick = function(){
    cargarAjugador(jugadorAct,nro);
  }
}

function cargarAjugador(jugador, tapuesta){
  if (jugador === 1){
    jugador1.sumarapuesta(tapuesta)
  }
  else{
    jugador2.sumarapuesta(tapuesta)
  }
}

function cambiarjugador(){
  if (jugadorAct === 1){
    jugadorAct = 2;
    $("#nrojugador").html("Jugador 1")
    document.getElementById('jugador').value= "Jugador 2"
  }
  else{
    jugadorAct = 1;
    $("#nrojugador").html("Jugador 2")
    document.getElementById('jugador').value= "Jugador 1"
  }
}
