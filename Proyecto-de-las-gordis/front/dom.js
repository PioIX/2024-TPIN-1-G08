// para que cuando se haga login cambie de pantalla a la principal y desaparezca el login
function changeScreen() {
    const pantallaPrincipal = document.getElementById("homeBanking");
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