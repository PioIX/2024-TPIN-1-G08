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

app.get('/traerAlimentos', async function(req,res){
    console.log(req.query) 
    if (req.query.nombre) {
        const respuesta = await MySql.realizarQuery(`SELECT * FROM Alimentos}"`)
        res.send(respuesta)
    } else {
        const respuesta = await MySql.realizarQuery("SELECT * FROM Alimentos")
        res.send(respuesta)
    }
})

app.post('/nombreDelPedido', function(req,res) {
    console.log(req.body) //Los pedidos post reciben los datos del req.body
    res.send("ok")
})

app.post('/traerAlimentos', async function(req,res) {
    console.log(req.body)
    await MySql.realizarQuery(`INSERT INTO Alimentos (id,nombre,cantidad,precio) 
    VALUES(${req.body.id}, '${req.body.nombre}', ${req.body.cantidad},${req.body.precio})`)
    res.send("ok")
})
app.delete('/borrarCompositor', async function(req, res){
    const respuesta=await MySql.realizarQuery(`DELETE FROM Compositores WHERE id =${req.body.id}`)
    console.log({respuesta})
    res.send("ok")
});
app.put('/cambiarCompositor', async function(req,res){
    console.log(req.body)
    const respuesta=await MySql.realizarQuery(`UPDATE Compositores 
    SET 
    nombre = '${req.body.nombre}',
    apellido = '${req.body.apellido}',
    pais_nacimiento = '${req.body.pais_nacimiento}'
    WHERE id = ${req.body.id};`)
    console.log({respuesta})
    res.send("ok")
}) 
//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
    console.log('Defined routes:');
    console.log('   [GET] http://localhost:3000/');
    console.log('   [GET] http://localhost:3000/usuarios');
    console.log('   [GET] http://localhost:3000/traerCompositores');
    console.log('   [POST] http://localhost:3000/agregarCompositor');
});
