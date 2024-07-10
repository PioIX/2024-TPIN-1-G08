// para que cuando se haga login cambie de pantalla a la principal y desaparezca el login
// el botón de logout arranca oculto 
document.getElementById("logout").style.display = "none";
document.getElementById("reglas").style.display = "none";

function changeScreen() {
    const pantallaPrincipal = document.getElementById("pantallaPrincipal");
    const login = document.getElementById("login");
    const logout = document.getElementById("logout");
    const reglas = document.getElementById("reglas");
    const pantallaJuego = document.getElementById("juegos")

    let usernamePiketeras = document.getElementById("username").value
    let contraseñaPiketeras = document.getElementById("password").value
    let dniPiketeras = document.getElementById("dni").value
    if(usernamePiketeras == "piketeras" && contraseñaPiketeras == "ositopipi" && dniPiketeras == "12345678"){
        location.href = "http://127.0.0.1:5500/Proyecto-de-las-gordis/front/usuarioAdmin.html"//cambia a usuario admin
    }else if (pantallaPrincipal.style.display !== "none") {
        // Ocultar pantalla principal y logout
        pantallaPrincipal.style.display = "none";
        logout.style.display = "none";
        reglas.style.display = "none";
        login.style.display = ""; // Mostrar botón de login si es necesario

    } else {
        // Mostrar pantalla principal y logout
        pantallaPrincipal.style.display = "";
        logout.style.display = ""; // Mostrar botón de logout
        reglas.style.display = "";
        login.style.display = "none"; // Ocultar botón de login si es necesario
        pantallaJuego.style.display = "none"
    }
}

function screenLogin() {
    const pantallaPrincipal = document.getElementById("pantallaPrincipal");
    const login = document.getElementById("login");
    const logout = document.getElementById("logout");
    const reglas = document.getElementById("reglas");
    const pantallaJuego = document.getElementById("juegos")

    login.style.display = "block"
    pantallaPrincipal.style.display = "none";
    logout.style.display = "none";
    reglas.style.display = "none";
    pantallaJuego.style.display = "none"
}

function screenJugar() {
    const pantallaPrincipal = document.getElementById("pantallaPrincipal")
    const pantallaJuego = document.getElementById("juegos")

    if (pantallaJuego.style.display == "none") {
        pantallaJuego.style.display = "block"
        pantallaPrincipal.style.display = "none"
    } else {
        pantallaJuego.style.display = "none"
        pantallaPrincipal.style.display = "block"
    }
}

function changeScreenAdmin(){
    location.href = "http://127.0.0.1:5500/Proyecto-de-las-gordis/front/index.html"
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

function getCantidadLetras(){
    const cantidadLetras = document.getElementById("cantidadLetras").value
    return cantidadLetras
}

function getPalabra(){
    const palabra = document.getElementById("palabra").value
    return palabra
}

function GetDefinicion() {
    const definicion = document.getElementById("definicion").value
    return definicion
}

// funcion para llenar la tabla del wordle segun palabras
// falta integrar lo de q agarre de la cantidad de letras a partir de la palabra que se vaya a jugar no se como ja
function crearJuego(cant_letras) {
    const juegosContainer = document.getElementById('juegos');
    juegosContainer.innerHTML = '';

    for (let i = 1; i <= 5; i++) {
        const fila = document.createElement('div');
        fila.id = `fila${i}`;
        fila.className = 'fila';

        for (let j = 1; j <= cant_letras; j++) {
            const input = document.createElement('input');
            input.id = `letra${i}-${j}`;
            input.className = 'cuad';
            fila.appendChild(input);
        }
        juegosContainer.appendChild(fila);
    }
}