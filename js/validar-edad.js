export default function esMayorDeEdad(campo) {
    const fechaNacimiento = new Date(campo.value);

    if (!validarEdad(fechaNacimiento)) {
        campo.setCustomValidity("Debes ser mayor de 18 años para registrarte.");
    }
}

function validarEdad(fecha) {
    const fechaActual = new Date();
    const fechaMas18 = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());

    return fechaActual >= fechaMas18;
}