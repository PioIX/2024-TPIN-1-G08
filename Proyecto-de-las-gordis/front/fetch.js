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
<<<<<<< HEAD

async function palabrasGet(){
    const response = await fetch('http://localhost:3000/palabras',{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          },
    })

    console.log(response)
    const datos = await response.json() 
    return(datos) 
}

=======
/*async function palabrasGet(){
    const response = await fetch('http://localhost:3000/usuarios',{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    console.log(response)
    const datos = await response.json()
    return(datos)
}
>>>>>>> 924ee6c14e672fb4f451c9124c3e6a6f6c260648*/
async function enviarPalabra(){
    const data = {
        palabra: getPalabra(),
        cantidadLetras: getCantidadLetras(),
        definicion: GetDefinicion()
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

