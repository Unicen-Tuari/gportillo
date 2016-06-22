"use strict";

$(document).ready(function(){
CargarAjax("html/carousel.html");

  // código de inicialización de eventos
  function MostrarContenido(data) {
    $("#infoamostrar").html(data);
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
  $("#articulose").on("click", function(){CargarAjax("../html/articulose.html")});
  $("#articuloso").on("click", function(){CargarAjax("../html/articuloso.html")});
  $("#contacto").on("click", function(){CargarAjax("../html/contacto.html")});
  $("#acuarelas").on("click", function(){CargarAjax("../html/acuarelas.html")});
  $("#acrilicos").on("click", function(){CargarAjax("../html/acrilicos.html")});
  $("#pinceles").on("click", function(){CargarAjax("../html/pinceles.html")});
  $(".logo")[0].on("click", function(){CargarAjax("../html/carousel.html")});
});


/*------------------------------------------------------*/
/*agregar elementos a la lista de articulos*/
function Agregarart() {
  var textoart = document.getElementById("art"); // Obtengo el campo de texto con la tarea
  var lista = document.getElementById("listaDeart"); // Obtengo la lista de tareas
  var cantidad = lista.length;
  var item = document.createElement("li"); //Creo un nuevo item para la lista
  item.innerHTML = textoart.value; //Completo el item con el texto de la tarea
  lista.insertBefore(item, lista.getElementsByTagName("li")[cantidad]); //pongo el articulo al final

}

/*---------------------FIN--AGREGAR---------------------*/

/*------------------------------------------------------*/
/*--------------------Contato---------------------------*/


/*---------------------FIN--CONTACTO--------------------*/
