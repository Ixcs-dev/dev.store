<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>.DevTech - Registro</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#3498db',
                        secondary: '#2ecc71',
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gray-100">
    <header class="bg-white shadow-md" x-data="{ isOpen: false }">
        <nav class="container mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
                <a href="/index.html" class="text-2xl font-bold">.DevTech</a>
                <div class="hidden md:flex items-center space-x-6">
                    <a href="/index.html" class="text-gray-600 hover:text-red-600">Inicio</a>
                    <a href="/page/product.html" class="text-gray-600 hover:text-red-600">Productos</a>
                    <a href="/page/nosotros.html" class="text-gray-600 hover:text-red-600">Nosotros</a>
                    <a href="/page/login.html" class="text-gray-600 hover:text-red-600">Login</a>
                </div>
                <button @click="isOpen = !isOpen" class="md:hidden text-gray-600 hover:text-red-600" id="mobile-menu-button">
                    <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            <div class="md:hidden" x-show="isOpen">
                <a href="/index.html" class="block py-2 text-gray-600 hover:text-red-600">Inicio</a>
                <a href="/page/product.html" class="block py-2 text-gray-600 hover:text-red-600">Productos</a>
                <a href="/page/nosotros.html" class="block py-2 text-gray-600 hover:text-red-600">Nosotros</a>
                <a href="/page/login.html" class="block py-2 text-gray-600 hover:text-red-600">Login</a>
            </div>
        </nav>
    </header>

    <main class="container mx-auto mt-8 px-4">
        <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
            <div class="px-6 py-8">
                <h2 class="text-center text-3xl font-bold text-gray-700 mb-4">Registro</h2>
                <% if (request.getAttribute("errorMessage") != null) { %>
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span class="block sm:inline"><%= request.getAttribute("errorMessage") %></span>
                    </div>
                <% } %>
                <form id="registration-form" action="../Registro" method="POST">
                    <input type="hidden" name="csrfToken" value="${sessionScope.csrfToken}">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Nombre completo</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" name="name" placeholder="Nombre completo" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Correo electrónico</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" name="email" placeholder="Correo electrónico" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Contraseña</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" name="password" placeholder="******************" required>
                        <div id="password-strength" class="mt-2 text-sm"></div>
                        <p class="mt-1 text-xs text-gray-600">La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales.</p>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="confirmpassword">Confirmar contraseña</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="confirmpassword" type="password" name="confirmpassword" placeholder="******************" required>
                    </div>
                    <div class="flex items-center justify-between">
                        <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Registrarse
                        </button>
                        <a class="inline-block align-baseline font-bold text-sm text-red-600 hover:text-red-800" href="login.html">¿Ya tienes una cuenta? Inicia sesión</a>
                    </div>
                </form>
            </div>
        </div>
    </main>

    <footer class="bg-black text-white py-8">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 class="text-xl font-semibold mb-4">.DevTech</h3>
                    <p>Tu tienda de confianza para gadgets y accesorios tecnológicos.</p>
                </div>
                <div>
                    <h3 class="text-xl font-semibold mb-4">Enlaces rápidos</h3>
                    <ul class="space-y-2">
                        <li><a href
="#" class="hover:text-red-600">Inicio</a></li>
                        <li><a href="#" class="hover:text-red-600">Nosotros</a></li>
                        <li><a href="#" class="hover:text-red-600">Productos</a></li>
                        <li><a href="#" class="hover:text-red-600">Contacto</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-xl font-semibold mb-4">Contacto</h3>
                    <p>Email: info@devtech.com</p>
                    <p>Teléfono: (123) 456-7890</p>
                    <p>Dirección: Calle Tecnología 123, Ciudad Tech</p>
                </div>
            </div>
            <div class="mt-8 text-center">
                <p>&copy; 2024 .DevTech Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

    <script>
    document.getElementById('password').addEventListener('input', function (e) {
        var password = e.target.value;
        var strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[A-Z]/)) strength++;
        if (password.match(/[a-z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^A-Za-z0-9]/)) strength++;

        var strengthMeter = document.getElementById('password-strength');
        switch (strength) {
            case 0:
            case 1:
                strengthMeter.textContent = 'Muy débil';
                strengthMeter.className = 'mt-2 text-sm text-red-500';
                break;
            case 2:
                strengthMeter.textContent = 'Débil';
                strengthMeter.className = 'mt-2 text-sm text-orange-500';
                break;
            case 3:
                strengthMeter.textContent = 'Medio';
                strengthMeter.className = 'mt-2 text-sm text-yellow-500';
                break;
            case 4:
                strengthMeter.textContent = 'Fuerte';
                strengthMeter.className = 'mt-2 text-sm text-green-500';
                break;
            case 5:
                strengthMeter.textContent = 'Muy fuerte';
                strengthMeter.className = 'mt-2 text-sm text-green-700';
                break;
        }
    });
    
    function handleRegister() {
        
    }
    </script>
</body>
</html>

