async function usuariosDB() {
    //Llamo a un pedido Get del servidor
    const response = await fetch('http://localhost:3000/usuarios',{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          },
    })

    console.log(response)
    const datos = await response.json() 
    return(datos)
}

async function registroUsuarios() {
    //Armo un objeto para mandarlo como formato JSON
    const data = {
        nombre: getUsuario(),
        password: getPassword(),
        dni: getDni()
    }

    //Envio un pedido POST con un JSON en el body
    const response = await fetch('http://localhost:3000/registrarUsuarios',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(data),
    })
    return true
}

async function palabrasGet(){
    const response = await fetch('http://localhost:3000/getPalabras',{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          },
    })

    console.log(response)
    const datos = await response.json() 
    return(datos) 
}

async function enviarPalabraFetch(palabra, cantidadLetras, definicion){
    const data = {
        palabra: palabra,
        cantidadLetras: cantidadLetras,
        definicion: definicion
    }
    const response = await fetch('http://localhost:3000/registrarPalabras',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(data),
    })
    return true
}

