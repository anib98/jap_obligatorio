//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

//Agrega al HTML el saludo al usuario inghresado junto con el nombre que fue guardado en el Local storage
document.getElementById("profile").innerHTML = "Hola" + " " + localStorage.getItem("user") + "!";

});

//Función que se ejecuta luego de hacer click en el botón Submit en index.html
//Guarda el username ingresado en un localstorage
function saveLocalStorage() {
    var usuario = document.getElementById("user").value;
    localStorage.setItem("user", usuario);
}


//Otra forma de hacer lo mismo
//function saveLocalStorage() {
//  var usuario = document.getElementById("user").value;
//  localStorage.setItem("user", JSON.stringify({nombreKey: usuario}) );
//}

