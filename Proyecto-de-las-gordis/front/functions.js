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
/*async function mostrarTabla(){
        // Obtener la referencia del elemento body
    let body = document.getElementsByTagName("body")[0];

    // Crea un elemento <table> y un elemento <tbody>
    let tabla = document.createElement("table");
    let tblBody = document.createElement("tbody");

    // Crea las celdas
    for (let i = 0; i < palabraExistente.length; i++) {
        // Crea las hileras de la tabla
        let hilera = document.createElement("tr");

        for (let j = 0; j < palabraExistente.length; j++) {
        // Crea un elemento <td> y un nodo de texto, haz que el nodo de
        // texto sea el contenido de <td>, ubica el elemento <td> al final
        // de la hilera de la tabla
        let celda = document.createElement("td");
        /*let textoCelda = document.createTextNode(
            "celda en la hilera " + i + ", columna " + j,
        );
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
        }

        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
    }

    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
}*/

async function botonLogOutAdmin () {
    usuarioLogueadoId = 0
    changeScreenAdmin() 
    document.getElementById("username").value = ""
    document.getElementById("password").value = ""
    document.getElementById("dni").value = ""
}
let fila = 1
let palabraRand = ""
let values = []

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
    values = []

    return letras
}

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

function promedioPuntaje(){
     
}

function aciertos(){
    for (let i = 0; i < letras.length; i++) {
        revisarLetra(i)
    }

    letras = []
}
//ejemplo de como acambiar color de los inputs pero claramente falta toda la logica
//input.style.backgroundColor = 'pink';

