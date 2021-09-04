//Función que chequea si hay información en la Session Storage
//si hay info no hace nada y la página continúa normalmente
//si no hay redirige automáticamente la página al login (index)
//Es decir que si no iniciaste sesion en index.html no te deja hacer nada más
//hasta que lo hagas
function checkLogin() {
    if (localStorage.getItem("user") === null) {
        window.location = "index.html"; 
    }
}
checkLogin()

//Función que "cierra sesión" vaciando el Local Storage
function logOut() {
    localStorage.clear()
}

