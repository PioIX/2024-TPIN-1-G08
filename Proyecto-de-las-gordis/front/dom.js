// para que cuando se haga login cambie de pantalla a la principal y desaparezca el login
function changeScreen() {
    const pantallaPrincipal = document.getElementById("pantallaPrincipal");
    const login = document.getElementById("login");
    if(pantallaPrincipal.style.display !== "none") {
        pantallaPrincipal.style.display = "none";
        login.style.display = "";
    }
    else {
        pantallaPrincipal.style.display = "";
        login.style.display = "none";
    }
}

function getUsuario(){
    const usuario = document.getElementById("username").value
    return usuario
}

function getPassword(){
    const password = document.getElementById("password").value
    return password
}

function getDni(){
    const dni = document.getElementById("dni").value
    return dni
}