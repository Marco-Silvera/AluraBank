import esUnCuil from "./validar-cuil.js";
import esMayorDeEdad from "./validar-edad.js";
import { tiposError, mensajes } from "./customErrors.js"

const campoDeFormulario = document.querySelectorAll('[required]');
const formulario = document.querySelector('[data-formulario]');

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Evita que recargue la página

    const listaRespuestas = {
        nombre: evento.target.elements["nombre"].value,
        email: evento.target.elements["email"].value,
        identificacion: evento.target.elements["identificacion"].value,
        cuil: evento.target.elements["cuil"].value,
        fecha_nacimiento: evento.target.elements["fecha_nacimiento"].value,
    }

    localStorage.setItem('registro', JSON.stringify(listaRespuestas))

    window.location.href = '../pages/abrir-cuenta-form-2.html';

});

campoDeFormulario.forEach((campo) => {
    campo.addEventListener('blur', () => verificarCampo(campo));
    campo.addEventListener('invalid', evento => evento.preventDefault());
});

function verificarCampo(campo) {

    let mensaje = '';
    campo.setCustomValidity('');

    if (campo.name == 'cuil' && campo.value.length >= 11) {
        esUnCuil(campo);
    }
    if (campo.name == 'fecha_nacimiento' && campo.value != '') {
        esMayorDeEdad(campo);
    }

    // console.log(campo.validity);
    tiposError.forEach(error => {
        if (campo.validity[error]) {
            mensaje = mensajes[campo.name][error];
            console.log(mensaje);
        }
    });

    const mensajeError = campo.parentNode.querySelector('.mensaje-error');
    const validarInputCheck = campo.checkValidity();

    if (!validarInputCheck) {
        mensajeError.textContent = mensaje;
    } else {
        mensajeError.textContent = '';
    }
}