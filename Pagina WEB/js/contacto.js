"use estrict";

function EnviarDatos(){ /*aca se enviarian los datos al correo de la artistica, pero en este caso borramos*/
  document.getElementsById('nombre').innerHTML="";
  document.getElementsByName('apellido').innerHTML="";
  document.getElementsByName('correo').innerHTML="";
  document.getElementsByName('comentario').innerHTML="";

}
