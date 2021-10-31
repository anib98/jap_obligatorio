//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.getElementById("username").innerHTML = localStorage.getItem("user");

var dzoptions = {
    url:"/",
    autoQueue: false
};
var myDropzone = new Dropzone("div#file-upload", dzoptions);

function saveProfile() {
    var name = document.getElementById("name").value;
    localStorage.setItem("name", name);

    var surname = document.getElementById("surname").value;
    localStorage.setItem("surname", surname);

    var age = document.getElementById("age").value;
    localStorage.setItem("age", age);

    var email = document.getElementById("email").value;
    localStorage.setItem("email", email);

    var phone = document.getElementById("phone").value;
    localStorage.setItem("phone", phone);
}

document.addEventListener("DOMContentLoaded", function (e) {
    
});