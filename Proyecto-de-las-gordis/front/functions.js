var usuarioLogueadoId = 0

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

async function enviarPalabra() {
    let palabraExistente = await palbras
    let cantidadLetras = getUsuario();
    let palabra = getPassword();
    let definicion = getDni();

    // Verificar si el usuario ya existe
    for (let i = 0; i < usuariosExistentes.length; i++) {
        if (dni == usuariosExistentes[i].dni) {
            alert("Este usuario ya existe. Aprete el boton ingresar");
            return;
        }
}
}

async function botonLogOut () {
    usuarioLogueadoId = 0
    changeScreen() 
    document.getElementById("username").value = ""
    document.getElementById("password").value = ""
    document.getElementById("dni").value = ""

    let palabraExistente = await palabras()//cambiar
    let cantidadLetras = getCantidadLetras();
    let palabra = getPalabra();
    let definicion = getDefinicion();
    let usuarioAdmin = login()
}