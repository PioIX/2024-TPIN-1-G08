var usuarioLogueadoId = 0

function analizarLogin(usuario, contraseña) {
    for (let i = 0; i < users.length; i++) {
        if (usuario == users[i].nombreUsuario) {
            if (contraseña == users[i].contraseña) {
                return usuarioLogueadoId = users[i].idUsuario;
            }
            else {
                return 0
            }
        }
    }
    return -1
}

//7
function botonIngresar() {
    let res = analizarLogin(getUser(), getPassword())
    if (res >= 1) {
        changeScreen()
    }
    else {
        if (res == 0) {
            alert("Error: contraseña incorrecta.")
        }
        else {
            alert("Error: el usuario no existe")
        }
    }
}

//8 
function nuevoUsuario(usuario, contraseña) {
    let creado = true

    let resultado = analizarLogin(usuario, contraseña);
    if (resultado == -1) {
        users.push(new User(usuario, contraseña))
            alert("Usuario creado")
            return true
    }
    else {
        return false
    }
}
    
//9
function botonRegistrarse() {
    let crearUser = nuevoUsuario(getUser(), getPassword())
    if (crearUser == true) {
        botonIngresar(getUser(), getPassword())
    }
    else {
        alert("Error: usuario no creado")
    }
}
