document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("nombre").innerHTML = localStorage.getItem("name");

    document.getElementById("apellido").innerHTML = localStorage.getItem("surname");

    document.getElementById("edad").innerHTML = localStorage.getItem("age");

    document.getElementById("correo").innerHTML = localStorage.getItem("email");

    document.getElementById("telefono").innerHTML = localStorage.getItem("phone");
});