var usuarioLogueadoId = 0
changeScreen()
async function login() {
    let user = getUsuario();
    let password = getPassword();
    let dni = +getDni();

    let usuariosExistentes = await usuariosDB();

    for (let i = 0; i < usuariosExistentes.length; i++) {
        if (usuariosExistentes[i].nombre == user || usuariosExistentes[i].dni == dni) {
            if (usuariosExistentes[i].password == password) {
                usuarioLogueadoId = usuariosExistentes[i].id_usuario;
                changeScreen();
                return; // Salir de la función después de un inicio de sesión exitoso
            } else {
                alert("La contraseña es incorrecta");
                return; // Salir de la función después de un error de contraseña
            }
        }
    }

    // Si ningún usuario coincide, muestra el mensaje de error
    alert("Ese usuario no existe. Inicie el registro");
}

async function Reglas() {
    alert(
        "Estamos chelo en este sector"
    )
}

async function registro() {
    let usuariosExistentes = await usuariosDB();
    let user = getUsuario();
    let password = getPassword();
    let dni = getDni();

    // Verificar si el usuario ya existe
    for (let i = 0; i < usuariosExistentes.length; i++) {
        if (dni == usuariosExistentes[i].dni) {
            alert("Este usuario ya existe. Aprete el boton ingresar");
            return;
        }
    }

    // Si no existe, registrar nuevo usuario
    let operacion = await registroUsuarios(user, password, dni);

    if (operacion === true) {
        let usuariosExistentesActual = await usuariosDB();
        usuarioLogueadoId = usuariosExistentesActual[usuariosExistentesActual.length - 1].id_usuario;
        changeScreen();
    } else {
        alert("Hubo un error en el ingreso de datos");
    }
}
async function enviarPalabrasFuncion(){
    let palabraExistente = await palabrasGet()
    let cantidadLetras = getCantidadLetras();
    let palabra = getPalabra();
    let definicion = getDefinicion();
    for(let i = 0; i<palabrasExistentes; i++){ //crear funcion palabrasExistentes
        if(palabrasExistentes[i].palabra == palabra){
            alert("esta palabra ya existe")
        }
    }
}

async function botonLogOut() {
    usuarioLogueadoId = 0
    screenLogin()   
    document.getElementById("username").value = ""
    document.getElementById("password").value = ""
    document.getElementById("dni").value = ""
}

async function revisarPalabra(palabra){
    let letra1 = document.getElementById("letra1-1").innerHTML
    let letra2 = document.getElementById("letra1-2").innerHTML
    let letra3 = document.getElementById("letra1-3").innerHTML
    let letra4 = document.getElementById("letra1-4").innerHTML
    let letra5 = document.getElementById("letra1-5").innerHTML

    for (let i = 0; i < palabra.length; i++) {
        if (palabra[i] == letra1){
            
        }
        
    }
}

//ejemplo de como acambiar color de los inputs pero claramente falta toda la logica
//input.style.backgroundColor = 'pink';
