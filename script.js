document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const name = formData.get('name');
    const lastname = formData.get('lastname');
    const email = formData.get('email');
    const username = formData.get('username');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    /**
     * AJAX call to send user data to the backend for registration.
     *
     * @param {string} url - The URL of the backend endpoint.
     * @param {object} options - The options for the fetch call.
     * @param {string} options.method - The HTTP method.
     * @param {object} options.headers - The HTTP headers.
     * @param {string} options.body - The request body, in JSON format.
     */
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // Parameters sent to the backend
        body: JSON.stringify({
            name: name,
            lastname: lastname,
            email: email,
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Usuario creado exitosamente!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error al crear el usuario.');
    });
});