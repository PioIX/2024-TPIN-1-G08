var usuarioLogueadoId = 0
let fila = 1
let palabraRand = ""
let values = []
let letras = []

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
    let palabraExistente = await palabrasGet();
    let palabra = getPalabra();
    let cantidadLetras = getCantidadLetras();
    let definicion = GetDefinicion();
    
    for(let i = 0; i< palabraExistente.length;i++){
        if( palabra == palabraExistente[i].palabra){
            alert("Esta palabra ya existe")
            return false;
        }
    }
    if( await enviarPalabraFetch(palabra, cantidadLetras, definicion) == true){
        alert("la palabra se envio correctamente")
        return true;   
    } else {
        alert("algo salio mal")
        return false;
    }
}

async function botonLogOut() {
    usuarioLogueadoId = 0
    screenLogin()   
    document.getElementById("username").value = ""
    document.getElementById("password").value = ""
    document.getElementById("dni").value = ""
}

async function botonLogOutAdmin () {
    usuarioLogueadoId = 0
    changeScreenAdmin() 
    document.getElementById("username").value = ""
    document.getElementById("password").value = ""
    document.getElementById("dni").value = ""
}

async function crear(){
    let palabras = await palabrasGet()
    let indiceAleatorio = Math.floor(Math.random() * palabras.length);
    palabraRand = palabras[indiceAleatorio].palabra
    palabraRand = palabraRand.toLowerCase()
    let cant_letras = palabraRand.length

    crearJuego(cant_letras)
}

function arrayLetrasIngresadas() {
    letras = [];
    for (let i = 0; i < palabraRand.length; i++) {
        let letra = document.getElementById(`letra${fila}-${i + 1}`).value;
        letras.push(letra.toLowerCase());
    }

    return letras;
}

function revisarLetra(numLetra) {
    let input = document.getElementById(`letra${fila}-${numLetra + 1}`);
    let letra = letras[numLetra];
    let countRand = {};  // Para contar ocurrencias de cada letra en la palabra aleatoria
    let countChecked = {};  // Para contar las ocurrencias de letras ya verificadas

    // Contar las ocurrencias de cada letra en la palabra aleatoria
    for (let char of palabraRand) {
        countRand[char] = (countRand[char] || 0) + 1;
    }

    // Contar las letras ya verificadas
    for (let i = 0; i < numLetra; i++) {
        let checkedLetra = letras[i];
        countChecked[checkedLetra] = (countChecked[checkedLetra] || 0) + 1;
    }

    if (palabraRand[numLetra] === letra) {
        input.style.backgroundColor = '#becbbd'; // Correcta en la posición correcta
        values.push(2);
    } else if (palabraRand.includes(letra) && (countChecked[letra] || 0) < countRand[letra]) {
        input.style.backgroundColor = '#FFBEEF'; // Correcta pero en la posición incorrecta
        values.push(1);
    } else {
        input.style.backgroundColor = '#797373'; // Incorrecta
        values.push(0);
    }

    // Actualizar el contador de letras verificadas
    countChecked[letra] = (countChecked[letra] || 0) + 1;
}


function promedioPuntaje(){
     
}

function aciertos() {
    arrayLetrasIngresadas()

    for (let i = 0; i < letras.length; i++) {
        revisarLetra(i);
    }
    letras = [];
    fila += 1; // Incrementar la fila solo después de procesar y actualizar los colores
}


//ejemplo de como acambiar color de los inputs pero claramente falta toda la logica
//input.style.backgroundColor = 'pink';

