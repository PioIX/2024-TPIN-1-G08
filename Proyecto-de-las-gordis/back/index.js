var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
var MySql = require("./modulos/mysql.js")

var app = express(); //Inicializo express
var port = process.env.PORT || 3000; //Ejecuto el servidor en el puerto 3000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());


/**
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente
 */

app.get('/usuarios', async function(req,res){
    console.log(req.query) //Los pedidos get reciben los datos del req.query
    const respuesta = await MySql.realizarQuery(`SELECT * FROM Usuarios`)
    res.send(respuesta)
})

app.post('/registrarUsuarios', async function(req, res) {
    console.log(req.body);
    await MySql.realizarQuery(`INSERT INTO Usuarios (nombre, password, dni)
        VALUES ('${req.body.nombre}', '${req.body.password}', '${req.body.dni}')`);

    res.send("ok");
});

app.get('/getPalabras', async function(req, res){
    console.log(req.query)
    const respuesta = await MySql.realizarQuery(`SELECT * FROM Palabras`)
    res.send(respuesta)
})

app.post('/registrarPalabras', async function(req, res){
    console.log(req.body)
    await MySql.realizarQuery(`INSERT INTO Palabras(palabra, cant_letras, descripcion)
        VALUES('${req.body.palabra}', '${req.body.cantidadLetras}', '${req.body.definicion}')`);
    res.send("ok");
})

//tablas
app.get('/puntajes', async function(req,res){
    console.log(req.query) //Los pedidos get reciben los datos del req.query
    const respuesta = await MySql.realizarQuery(`SELECT * FROM Puntajes`)
    res.send(respuesta)
})

//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
    console.log('Defined routes:');
    console.log('   [GET] http://localhost:3000/');
    console.log('   [GET] http://localhost:3000/usuarios');
    console.log('   [POST] http://localhost:3000/registrarUsuarios');
    console.log('   [POST] http://localhost:3000/registrarPalabras');
    console.log('   [GET] http://localhost:3000/getPalabras')
    console.log('   [GET] http://localhost:3000/puntajes')
});
