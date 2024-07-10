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

let fila = 1
let palabraRand = ""

async function crear(){
    let palabras = await palabrasGet()
    let indiceAleatorio = Math.floor(Math.random() * palabras.length);
    palabraRand = palabras[indiceAleatorio].palabra
    palabraRand = palabraRand.toLowerCase()
    let cant_letras = palabraRand.length

    crearJuego(cant_letras)
}

let letras = []

function arrayLetrasIngresadas(){
    for (let i = 0; i < palabraRand.length; i++) {
        let letra = document.getElementById(`letra${fila}-${i+1}`).value
        letras.push(letra) 
    }

    for (let i = 0; i < letras.length; i++) {
        letras[i] = letras[i].toLowerCase()   
    }
    
    fila += 1

    return letras
}

let values = []

function revisarLetra(numLetra){ 
    if (palabraRand.includes(letras[numLetra])){
        for (let i = 0; i < palabraRand.length; i++) {
            if (i == numLetra){
                values.push(2)
            }
        }
    }
    else if (palabraRand.includes(letras[numLetra])){
        values.push(1)
    }
    else{
        values.push(0)
    }
}

function aciertos(){
    for (let i = 0; i < letras.length; i++) {
        revisarLetra(i)
    }

    letras = []
    values = []
}
//ejemplo de como acambiar color de los inputs pero claramente falta toda la logica
//input.style.backgroundColor = 'pink';

//tablas ahre
async function llenarTabla(){
    //let datos = await llamadoADatos()
    //console.log(datos);
    let htmlTabla = `<tr>
        <th>Jugador</th>
        <th>Puntaje</th>
    </tr>`
    /*
    for (let i = 0; i < datos.length; i++) {
        htmlTabla += `<tr>
            <td>${datos[i].Jugador}</td>
            <td>${datos[i].Puntaje}</td>
        </tr>`  
    }
        */
    document.getElementById("tabla1").innerHTML = htmlTabla
}

