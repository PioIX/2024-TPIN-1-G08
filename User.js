/**
 *  2- clase del usuario
 * @param {Number} idUsuario 
 * @param {String} nombreUsuario 
 * @param {String} contraseña 
 */

var contadorUser= 1;
class User {
    constructor (nombreUsuario, contraseña){
        this.idUsuario = contadorUser
        contadorUser++
        this.nombreUsuario = nombreUsuario
        this.contraseña = contraseña;
    }
}
/*
const users = [
    new User ("sofia cariglino", "qwerty"),
    new User ("ailín hardt", "1234"),
    new User ("mati marchesi", "marchesi2"),
    new User ("1", "1"),
];

*/
