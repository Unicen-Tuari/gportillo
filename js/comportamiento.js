"use strict";

$(document).ready(function(){
    // código de inicialización de eventos
    function MostrarContenido(data) {
      alert("entro al mostrar");
      $("#infoamostrar").html(data);
      /*dentro de infoamostrar quiero poner la foto del local y un escrito abajo*/
      alert("deberia haber escrito en el html");
    }
    function MostrarError(jqXHR, textStatus, errorThrown) {
      alert("imposible cargar pagina");
      $("#infoamostrar").html("servidor caido");
    }

    function CargarAjax() {
      // body...
      $.ajax(
        {
          type:"GET",
          url:"html/nosotros.html",
          success: function(data){
            alert("entro al mostrar");
            $("#infoamostrar").html(data);
            /*dentro de infoamostrar quiero poner la foto del local y un escrito abajo*/
            alert("deberia haber escrito en el html");
          },
          dataType: "html",
          error: MostrarError
        }
      );
        }
    $("#quienessomos").on("click", CargarAjax);
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
