document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previene el envío normal del formulario

        const formData = new FormData(form); // Captura todos los datos del formulario
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirm-password')
        };

        try {
            const response = await fetch('/devtechweb-war/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Convierte los datos a JSON
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message); // Muestra el mensaje de éxito
                form.reset(); // Limpia el formulario
                window.location.href = '/page/login.html'; // Redirecciona a la página de login
            } else {
                const error = await response.json();
                alert('Error: ' + error.message); // Muestra el mensaje de error
            }
        } catch (err) {
            console.error('Error en la solicitud:', err);
            alert('Hubo un error en el registro. Por favor, inténtalo de nuevo.');
        }
    });
});
