"use strict";

$(document).ready(function(){
  CargarAjax("html/carousel.html");

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

//funcion cargar ajax
// código de inicialización de eventos
function MostrarContenido(data) {
  $("#infoamostrar").html(data);

  var tabla=$("#contenido")
  if (tabla.length === 1) {
    cargarprod();
  }
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



//get del servidor
function cargararticulos(prod){
  var articulos= "";
  for (var i = 0; i < prod.information.length; i++){
    articulos += '<tr>';
    articulos +=  '<td>' + prod.information[i]["thing"].codigo + '</td>';
    articulos +=  '<td>' + prod.information[i]["thing"].producto + '</td>';
    articulos +=  '<td>' + prod.information[i]["thing"].precio + '</td>';
    articulos +=  '<td><button class="btn botelim" ><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> </button> </td>'
  }
  $("#contenido").html(articulos); //cargo el html
  var eliminar= $(".botelim");
  for (var i = 0; i < botelim.length; i++) {
    elimprod(botonlim[i],prod.information[i]["_id"]) //le agrego la funcion de eliminar a cada boton
  }
}

function elimprod(boton,id) {
  $(boton).on("click",function(){
    borrarprod(id)}  )
  }

  function borrarprod(producto) {
    var id=producto;
    $.ajax({
      url:"http://web-unicen.herokuapp.com/api/delete/" + id,
      method:"DELETE",
      success: function(resultData){
        console.log(resultData);
        cargararticulos();
      },
      error:function(jqxml, status, errorThrown){
        alert('Error!');
        console.log(errorThrown);
      }
    });
  }

  function mostrarprod(){
    var grupo = 124;
    $.ajax({
      method: "GET",
      dataType: 'JSON',
      url: "http://web-unicen.herokuapp.com/api/group/" + grupo,
      success:function (prod){
        console.log(prod);
        cargararticulos(prod);
      },
      error:function(jqxml, status, errorThrown){
        console.log(errorThrown);
      }
    });
  }




  ////


  /// anda joya el cargar al servidor
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

  // hasta aca esta jotita
