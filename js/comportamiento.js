"use strict";

$(document).ready(function(){
CargarAjax("html/carousel.html");

  // código de inicialización de eventos
  function MostrarContenido(data) {
    $("#infoamostrar").html(data);
    $("#guardar").on("click", function(){
      cargarprod();
    })
  }

  function MostrarError(jqXHR, textStatus, errorThrown) {
    alert("imposible cargar pagina");
    $("#infoamostrar").html("servidor caido");
  }

  function CargarAjax(direccion) {
    // body...

    $.ajax(
      {
        type:"GET",
        url:direccion,
        success: MostrarContenido,
        dataType: "html",
        error: MostrarError
      }
    );
  }

  $("#quienessomos").on("click", function(){ CargarAjax("../html/nosotros.html")});
  $("#artistica").on("click", function(){CargarAjax("../html/materialesartistica.html")});
  $("#articulose").on("click", function(){CargarAjax("../html/articulose.html")});
  $("#articuloso").on("click", function(){CargarAjax("../html/articuloso.html")});
  $("#contacto").on("click", function(){CargarAjax("../html/contacto.html")});
  $("#kescolar").on("click", function(){CargarAjax("../html/kescolar.html")});
  $("#kdibujo").on("click", function(){CargarAjax("../html/kdibujo.html")});
  $("#kpinceles").on("click", function(){CargarAjax("../html/kpinceles.html")});
  $("#destacado").on("click", function(){CargarAjax("../html/kdestacado.html")});
  $("#salvador").on("click", function(){CargarAjax("../html/carousel.html")});
});

function mostrarprod(){
  var grupo = 124;
  $.ajax({
    method: "GET",
    dataType: 'JSON',
    url: "http://web-unicen.herokuapp.com/api/group/" + grupo,
    success:function (prod){
      crearTabla(prod);
    },
    error:function(jqxml, status, errorThrown){
      console.log(errorThrown);
    }
  });
}

function cargarprod(){
  var grupo = 124; //yo soy el 12
  var prod = {
    codigo: "",
    producto: "",
    precio: ""
  };
  prod.codigo = $("#codprod").val();
  prod.producto = $("#producto").val();
  prod.precio = $("#precio").val();
  var informacion = {
    "group": grupo,
    "thing": prod
  };

  $.ajax({
    method: "POST",
    dataType: 'JSON',
    data: JSON.stringify(informacion),
    contentType: "application/json; charset=utf-8",
    url: "http://web-unicen.herokuapp.com/api/create",
    success: function(resultData){
    console.log(resultData); //a ver que muestra
      alert ("se cargo correctamente");
    },
    error:function(jqxml, status, errorThrown){
      alert ("fallo la carga al servidor");
    }
  });
}
