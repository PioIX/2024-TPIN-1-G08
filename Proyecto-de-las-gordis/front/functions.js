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

    let 
}

async function botonLogOut () {
    usuarioLogueadoId = 0
    changeScreen() 
    document.getElementById("username").value = ""
    document.getElementById("password").value = ""
    document.getElementById("dni").value = ""
}

let values = []

async function revisarPalabra(palabra){
    palabra = "letra"
    let letra1 = document.getElementById("letra1-1").value
    let letra2 = document.getElementById("letra1-2").value
    let letra3 = document.getElementById("letra1-3").value
    let letra4 = document.getElementById("letra1-4").value
    let letra5 = document.getElementById("letra1-5").value

    letra1 = letra1.toLowerCase()
    letra2 = letra2.toLowerCase()
    letra3 = letra3.toLowerCase()
    letra4 = letra4.toLowerCase()
    letra5 = letra5.toLowerCase()

    let letras = [letra1, letra2, letra3, letra4, letra5]
    
    for (let i = 0; i < palabra.length; i++) {

        if (palabra[i] == letras[0]){
            if(i == 0){
                values.push(2)
            }
            else if(i != 0){
                values.push(1)
            }
            else{
                values.push(0)
            }
        }
        else if (palabra[i] == letra2){
            if(i == 1){
                values.push(2)
            }
            else if(i != 1){
                values.push(1)
            }
            else{
                values.push(0)
            }
        }
        else if (palabra[i] == letra3){
            if(i == 2){
                values.push(2)
            }
            else if(i != 2){
                values.push(1)
            }
            else{
                values.push(0)
            }
        }
        else if (palabra[i] == letra4){
            if(i == 3){
                values.push(2)
            }
            else if(i != 3){
                values.push(1)
            }
            else{
                values.push(0)
            }
        }
        else if (palabra[i] == letra5){
            if(i == 4){
                values.push(2)
            }
            else if(i != 4){
                values.push(1)
            }
            else{
                values.push(0)
            }
        }
    }
    console.log(values)
}
