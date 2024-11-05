// generadorCurp.js

// Función para generar el CURP
const generarCurp = (nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, entidadFederativaNacimiento, sexo) => {
    const primerLetraNombre = nombre.charAt(0).toUpperCase();
    const primerVocalPaterno = encontrarPrimeraVocal(apellidoPaterno);
    const primerLetraMaterno = apellidoMaterno.charAt(0).toUpperCase();
    const primerLetraEntidad = entidadFederativaNacimiento.substring(0, 2).toUpperCase();
    const dosUltimosDigitosAño = fechaNacimiento.substring(2, 4);
    const mes = fechaNacimiento.substring(5, 7);
    const dia = fechaNacimiento.substring(8, 10);
    const sexoAbreviado = sexo === 'masculino' ? 'H' : 'M';

    const curp = primerLetraApellido + primerVocalPaterno + primerLetraMaterno + primerLetraNombre + dosUltimosDigitosAño + mes + dia + sexoAbreviado + primerLetraEntidad;
    
    return curp;
}

// Función auxiliar para encontrar la primera vocal en un apellido
const encontrarPrimeraVocal = (apellido) => {
    for (let i = 0; i < apellido.length; i++) {
        const letra = apellido.charAt(i).toUpperCase();
        if (letra === 'A' || letra === 'E' || letra === 'I' || letra === 'O' || letra === 'U') {
            return letra;
        }
    }
    return ''; // En caso de no encontrar ninguna vocal
}

module.exports = { generarCurp };
