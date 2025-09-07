// Agrega un detector de eventos al formulario con el ID 'registerForm' que se activa al enviarlo.
document.getElementById('registerForm').addEventListener('submit', function(event) {
    // Previene el comportamiento predeterminado del formulario, que es recargar la página.
    event.preventDefault();

    // Crea un objeto FormData para acceder fácilmente a los datos del formulario.
    const formData = new FormData(this);
    // Obtiene los valores de cada campo del formulario.
    const name = formData.get('name');
    const lastname = formData.get('lastname');
    const email = formData.get('email');
    const username = formData.get('username');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    // Comprueba si las contraseñas ingresadas coinciden.
    if (password !== confirmPassword) {
        // Si no coinciden, muestra una alerta y detiene la ejecución.
        alert('Las contraseñas no coinciden.');
        return;
    }

    /**
     * Llamada AJAX para enviar los datos del usuario al backend para el registro.
     *
     * @param {string} url - La URL del endpoint del backend.
     * @param {object} options - Las opciones para la llamada fetch.
     * @param {string} options.method - El método HTTP (POST para crear un nuevo recurso).
     * @param {object} options.headers - Las cabeceras HTTP, especificando el tipo de contenido.
     * @param {string} options.body - El cuerpo de la solicitud, en formato JSON.
     */
    // Realiza una solicitud POST al endpoint '/register'.
    fetch('/register', {
        method: 'POST', // Método de la solicitud
        headers: {
            'Content-Type': 'application/json' // Indica que el cuerpo de la solicitud es JSON
        },
        // Parámetros enviados al backend, convertidos a una cadena JSON.
        body: JSON.stringify({
            name: name,
            lastname: lastname,
            email: email,
            username: username,
            password: password
        })
    })
    // Convierte la respuesta del servidor de JSON a un objeto JavaScript.
    .then(response => response.json())
    // Se ejecuta si la solicitud fue exitosa.
    .then(data => {
        console.log('Éxito:', data); // Muestra la respuesta del servidor en la consola.
        alert('Usuario creado exitosamente!'); // Muestra un mensaje de éxito.
    })
    // Se ejecuta si hubo un error en la solicitud.
    .catch((error) => {
        console.error('Error:', error); // Muestra el error en la consola.
        alert('Error al crear el usuario.'); // Muestra un mensaje de error.
    });
});