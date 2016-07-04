"use strict";

const costo_apuesta =1; //este va a ser el valor de las apuesta. en este caso sera de 1
const apuestacolor=2;
const apuestaparidad=2;
const apuestamitad=2
const apuestapleno=2;
var tablerito = new tablero(0);// creo un tablero vacio
var jugador1 = new jugador;
var jugador2 = new jugador;
var jugadorAct = jugador1;

/**********************************/
/*          OBJETO JUGADOR       */

function jugador(){//negro, rojo, par, impar, menor, mayor, pleno
  var apostado= []
  return{
    credito: 100,
    apuesta: apostado,
    devolvercredito: function(){
      return this.credito;
    },
    devolverapuesta: function(){
      return this.apuesta;
    },
    sumarapuesta: function(tipoapuesta) {
      if (this.credito === 0){
        return alert("no posee sufieciente credito")
      }
      this.restarcredito();
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
      this.mostrarApuestas();

    },
    sumarcredito: function(costo_apuesta){
      this.credito = this.credito + costo_apuesta;
    },
    restarcredito: function(){
      this.credito= this.credito- costo_apuesta;
    },
    mostrarApuestas: function(){
      var apuestasAct= jugadorAct.devolverapuesta();
      var apuestashechas = "";
      apuestashechas = '<span> Credito = $'+jugadorAct.devolvercredito() + '</span>'
      for (var i = 0; i < apuestasAct.length; i++) {
        apuestashechas += '<span>'+apuestasAct[i].devolver_tipoapuesta()+': $'+apuestasAct[i].devolver_valorapuesta()+'</span>';
      }
      //string = string + '<span  id="ganador"></span>';
      $("#apostados").html(apuestashechas);

    },
    reiniciarapuesta: function(){
      this.apuesta = [];
    }
  }
}

/*************************************/


/*********************************/
/*          OBJETO NUMERO       */

function numero(valor, cantnum){ // tengo que agregar que la mitad para arriba sea al revez los colores
  return {
    numero: valor,
    devolver_numero: function(){
      return this.numero;
    },
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
    valor_apuesta:1, //aca seria costo apuesta
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
    },
    tirarruleta: function(){
      var cantidad = this.arreglon.length;
      return Math.floor((Math.random() * cantidad)) //calcule el numero al azart entre los que tengo
    },
    verificarapuesta: function(jugador, nro){
      var nroganador = nro;
      var objnumero = this.arreglon[nroganador];
      var string = 'ganador: '+ nroganador;
      var apuestasjugador = jugador.devolverapuesta();
      var totalganado = 0;
      for (var i = 0; i < apuestasjugador.length; i++) {
        if (apuestasjugador[i].devolver_tipoapuesta() === objnumero.color()) {
          totalganado += (apuestasjugador[i].devolver_valorapuesta() * apuestacolor);
        }
        else if (apuestasjugador[i].devolver_tipoapuesta() === objnumero.devolver_numero()) {
          totalganado += (apuestasjugador[i].devolver_valorapuesta() * apuestapleno);
        }
        else if (apuestasjugador[i].devolver_tipoapuesta() === objnumero.paroimpar()) {
          totalganado += (apuestasjugador[i].devolver_valorapuesta() * apuestaparidad);
        }
        else if (apuestasjugador[i].devolver_tipoapuesta() === objnumero.mitad()) {
          totalganado += (apuestasjugador[i].devolver_valorapuesta() * apuestamitad);
        }

      }
      jugador.sumarcredito(totalganado);
      //mostrarApuestas();
      if (jugador === jugador1) {
        var mensaje = "<span>jugador 1 gano: " + totalganado + "</span>";

      }
      else {
        var mensaje = "<span> Jugador 2 gano: " + totalganado + "</span>";
      }

      $(mensaje).appendTo("#apostados");
      jugador.reiniciarapuesta();
    }

  }
}

/**********************************/

function cargartodo(){
  var cantn = $("#cantidad").val();
  var tablerote = new tablero(cantn);
  tablerito = tablerote;
  tablerito.mostrartablero();
  jugadorAct.mostrarApuestas();
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
  apu = apu + '<button id="jugador" class="suerte col-md-6">Ir a jugador 2</button>';
  apu = apu + '<input type="button" id="suerte" class="suerte col-md-6" value="SUERTE!"></input>';
  $("#mostrarapuestas").append(apu);
  agregarapuesta();
}

function agregarapuesta(){
  $("#nrojo").on("click", function (){jugadorAct.sumarapuesta("rojo")});
  $("#nnegro").on("click", function (){jugadorAct.sumarapuesta("negro")});
  $("#npar").on("click", function (){jugadorAct.sumarapuesta("par")});
  $("#nimpar").on("click", function (){jugadorAct.sumarapuesta("impar")});
  $("#mitad1").on("click", function (){jugadorAct.sumarapuesta("primitad")});
  $("#mitad2").on("click", function (){jugadorAct.sumarapuesta("segmitad")});
  $("#jugador").on("click", function (){cambiarjugador()});
  $("#suerte").on("click", function(){
    var nro = tablerito.tirarruleta();
    $("#apostados").html("");
    var gano = '<span>el numero ganador es: ' + nro +'</span>';
    $(gano).appendTo("#apostados");
    tablerito.verificarapuesta(jugador1, nro);
    tablerito.verificarapuesta(jugador2, nro);
  });

  var arreglon = $(".numero");
  for (var i = 0; i < arreglon.length; i++) {
    asignarvalor(i, arreglon[i])
  }
}
//--------------------------------------





function asignarvalor(nro, boton){
  boton.onclick = function(){
    cargarAjugador(jugadorAct,nro);
  }
}

function cambiarjugador(){
  if (jugadorAct === jugador1){
    jugadorAct = jugador2;

    $("#jugador").html("Ir a Jugador 1");
    $("#nrojugador").html("Jugador 2");

  }
  else{
    jugadorAct = jugador1;
    $("#jugador").html("Ir a Jugador 2");
    $("#nrojugador").html("Jugador 1");
  }
  jugadorAct.mostrarApuestas();
}
