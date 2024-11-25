document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    const loginButton = document.getElementById('login-button');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        loginButton.disabled = true;
        loginButton.textContent = 'Iniciando sesión...';

        const formData = new FormData(form);
        fetch('/login', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Inicio de sesión exitoso! ID de usuario: ' + data.userId);
                window.location.href = '/index.html';
            } else {
                alert('Error en el inicio de sesión: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error durante el inicio de sesión');
        })
        .finally(() => {
            loginButton.disabled = false;
            loginButton.textContent = 'Iniciar Sesión';
        });
    });
});