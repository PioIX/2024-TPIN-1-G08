/**
 *  1- clase del objeto puntaje
 * @param {Number} idPuntaje id del puntaje xd
 * @param {Number} letrasDesacertadas cantidad de letras erradas.
 * @param {Number} promedioPuntaje promedio del puntaje
 * @param {Number} idUsuario xd
 */

var contadorPuntaje=1;
class Note {
    constructor (letrasDesacertadas, promedioPuntaje, idUsuario){
        this.idPuntaje = contadorPuntaje
        contadorPuntaje++
        this.letrasDesacertadas = letrasDesacertadas
        this.promedioPuntaje = promedioPuntaje
        this.idUsuario = idUsuario;
    }
}
