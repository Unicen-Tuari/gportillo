"use estrict";

var saldo = 100;
var numeroApuesta = -1;
var numeroRuleta = -1;
var ganadoseguidos = 0;

document.getElementById('saldo').innerHTML='$' + saldo;

function cargarSaldo(){
  document.getElementById('saldo').innerHTML=saldo;
}

function selectNro(nro){
  document.getElementById('numero').value=nro;
}

function aumentarSaldo(){
  if (ganadoseguidos == 2){
    saldo += 15;
    ganadoseguidos == 0;
  }
  else{
    saldo +=10;
  }

}

function disminuyeSaldo(){
  saldo -=1;
}

function spinRuleta(){
  return Math.floor((Math.random() * 9))
}
function obtenernro(boton){
  if (numeroApuesta != -1){
  document.getElementsByName('numero')[numeroApuesta].style.background = "buttonface";
  }
  numeroApuesta = parseInt(boton.value)
  document.getElementsByName('numero')[numeroApuesta].style.background = "orange";
}

function tirarRuleta(){
  //numeroApuesta = document.getElementById("numero").value;
  if (numeroApuesta == "-1" ){
    alert('ERROR: No se selecciono ningun numero');
    return;
  }
  if (saldo < 1){
    alert ("tu saldo es insuficinete para seguir jugando");
    return;
  }

  numeroRuleta = spinRuleta();
  document.getElementById('ruleta').innerHTML=numeroRuleta;

  if (numeroApuesta == numeroRuleta){
    alert ('Ganaste!');

    ganadoseguidos += 1; //si sale dos veces seguidas ganador gana 5 mas
    aumentarSaldo();
  }
  else{
    disminuyeSaldo();
    ganadoseguidos = 0; // es para volver a 0 el contador de ganados seguidos
    alert("Perdiste");
  }

  console.log ('Apostaste al: ' + numeroApuesta);
  console.log ("en la ruleta, salio el: " + numeroRuleta);
  console.log ('Saldo' + saldo);
  document.getElementById('saldofinal').innerHTML='$' + saldo;
  document.getElementsByName('tirar')[1].disabled = false; //activo el boton  tirar de nuevo una vez que lo aprete tirar
  document.getElementsByName('tirar')[0].disabled = true; //desactivo el boton tirar

}
function actualizarTablero(){
  document.getElementsByName('tirar')[1].disabled = true; //desactivo el boton  tirar de nuevo una vez que lo apreto
  document.getElementsByName('tirar')[0].disabled = false; //activo el boton tirar
  document.getElementsByName('numero')[numeroApuesta].style.background = "buttonface";
  document.getElementById('saldo').innerHTML='$' + saldo;
  document.getElementById('saldofinal').innerHTML="";
  document.getElementById('ruleta').innerHTML="";

  numeroApuesta = -1;
}
