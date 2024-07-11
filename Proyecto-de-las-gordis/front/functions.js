var usuarioLogueadoId = 0
let fila = 1
let palabraRand = ""
let defRand = ""
let values = []
let letras = []


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
    localStorage.clear();
    location.href = "index.html";
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
    defRand = palabras[indiceAleatorio].descripcion
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

function revisarLetra() {
    let countRand = {};  // Para contar ocurrencias de cada letra en la palabra aleatoria
    let countChecked = {};  // Para contar las ocurrencias de letras ya verificadas
    let correctPositions = new Array(palabraRand.length).fill(false); // Para marcar posiciones correctas

    // Contar las ocurrencias de cada letra en la palabra aleatoria
    for (let char of palabraRand) {
        countRand[char] = (countRand[char] || 0) + 1;
    }

    // Primera pasada: verificar letras en la posición correcta
    for (let i = 0; i < letras.length; i++) {
        if (palabraRand[i] === letras[i]) {
            correctPositions[i] = true;
            countChecked[letras[i]] = (countChecked[letras[i]] || 0) + 1;
            let input = document.getElementById(`letra${fila}-${i + 1}`);
            input.style.backgroundColor = '#becbbd'; // Correcta en la posición correcta
            values.push(2);
        }
    }

    // Segunda pasada: verificar letras en la posición incorrecta
    for (let i = 0; i < letras.length; i++) {
        if (!correctPositions[i]) { // Solo verificar si no está en la posición correcta
            let letra = letras[i];
            let input = document.getElementById(`letra${fila}-${i + 1}`);
            if (palabraRand.includes(letra) && (countChecked[letra] || 0) < countRand[letra]) {
                input.style.backgroundColor = '#FFBEEF'; // Correcta pero en la posición incorrecta
                values.push(1);
                countChecked[letra] = (countChecked[letra] || 0) + 1;
            } else {
                input.style.backgroundColor = '#797373'; // Incorrecta
                values.push(0);
            }
        }
    }
}

function aciertos() {
    arrayLetrasIngresadas()

    revisarLetra()

    letras = [];

    let puntaje = 0
    for (let i = 0; i < values.length; i++) {
        if (values[i] == 2){
            puntaje += 1
        }
        else if (values[i] == 1){
            puntaje += 0.5
        }
    }

    console.log(values)

    if (puntaje == values.length) {
        console.log("Termino el juego");
        const espacio = `
            <p>Felicidades has acertado la palabra
            Su definicion era: ${defRand}
            Para volver al juego presiona el boton de abajo
            </p>
            <a href="index.html" onclick="changeScreen()"> 
                <button id="volveraprincipal" class="btn btn-primary btn-lg btn-block form-check-control">Volver al juego</button>
            </a>
        `;
        
        document.getElementById("definicion").innerHTML = espacio;
        
    }
    

    enviarPuntaje(puntaje) //Manda un post a la base de datos con el puntaje del jugador

    fila += 1; // Incrementar la fila solo después de procesar y actualizar los colores
    values = [] //Reinicia values asi puede seguir con la otra fila
}

async function promedioPuntaje(){
    let datos = await getPuntajes();

    const agrupadosPorJugador = datos.reduce((acc, dato) => {
        const { id_usuario, aciertos } = dato;
        if (!acc[id_usuario]) {
            acc[id_usuario] = [];
        }
        acc[id_usuario].push(aciertos);
        return acc;
    }, {});

    // Calcular promedio de aciertos por jugador
    const promediosPorJugador = Object.entries(agrupadosPorJugador).map(([id_usuario, aciertosArray]) => {
        const totalAciertos = aciertosArray.reduce((sum, aciertos) => sum + aciertos, 0);
        const promedioAciertos = totalAciertos / aciertosArray.length;
        return {
            id_usuario,
            promedioAciertos
        };
    });

    return promediosPorJugador;
}

//El resultado es un array de objetos donde cada objeto contiene id_usuario y promedioAciertos para cada jugador.
//Debería funcionar bien y debería servir para el html

//ejemplo de como acambiar color de los inputs pero claramente falta toda la logica
//input.style.backgroundColor = 'pink';




