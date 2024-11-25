// main.js

// Function to update the cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const mobileCartCount = document.getElementById('mobile-cart-count');
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cartItems.length;
    if (cartCount) cartCount.textContent = count;
    if (mobileCartCount) mobileCartCount.textContent = count;
}

// Function to add a product to the cart
function addToCart(productId, productName, price, quantity, color, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.id === productId && item.color === color);
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ id: productId, name: productName, price: parseFloat(price), quantity: quantity, color: color, image: image });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderMiniCart();
}

// Function to remove a product from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
    renderMiniCart();
}

// Function to render the cart items
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = cart.map((item, index) => `
            <div class="flex items-center justify-between border-b py-4">
                <div class="flex items-center">
                    <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-md mr-4">
                    <div>
                        <h3 class="font-semibold">${item.name}</h3>
                        <p class="text-gray-600">Color: ${item.color}</p>
                        <p class="text-gray-600">Cantidad: ${item.quantity}</p>
                    </div>
                </div>
                <div class="flex items-center">
                    <p class="font-semibold mr-4">$${(item.price * item.quantity).toFixed(2)}</p>
                    <button onclick="removeFromCart(${index})" class="text-red-600 hover:text-red-800">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');

        // Update total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const cartTotal = document.getElementById('cart-total');
        if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

// Function to render the mini cart
function renderMiniCart() {
    const miniCartContainer = document.getElementById('mini-cart');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (miniCartContainer) {
        miniCartContainer.innerHTML = `
            <div class="bg-white w-80 p-4 shadow-lg rounded-lg">
                <h2 class="text-lg font-bold mb-4">Carrito</h2>
                ${cart.map((item, index) => `
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center">
                            <img src="${item.image}" alt="${item.name}" class="w-10 h-10 object-cover rounded-md mr-2">
                            <div>
                                <p class="font-semibold">${item.name}</p>
                                <p class="text-sm text-gray-600">Cantidad: ${item.quantity}</p>
                            </div>
                        </div>
                        <p class="font-semibold">$${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                `).join('')}
                <div class="mt-4 flex justify-between items-center">
                    <span class="font-bold">Total:</span>
                    <span class="font-bold">$${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
                </div>
                <a href="./page/carrito.html" class="mt-4 block w-full bg-red-600 text-white text-center px-4 py-2 rounded-lg hover:bg-opacity-80">
                    Ver carrito completo
                </a>
            </div>
        `;
    }
}

// Function to toggle the mini cart
function toggleMiniCart() {
    const miniCart = document.getElementById('mini-cart');
    if (miniCart) {
        miniCart.classList.toggle('hidden');
        if (!miniCart.classList.contains('hidden')) {
            renderMiniCart();
        }
    }
}

// Function to handle form submission
function handleCheckout(event) {
    event.preventDefault();
    const form = event.target;
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    const formData = new FormData(form);
    const orderData = Object.fromEntries(formData.entries());

    // Simulating an API call
    console.log('Order submitted:', orderData);
    alert('Thank you for your order! We will process it shortly.');

    // Clear the cart after successful order
    localStorage.removeItem('cart');
    updateCartCount();

    // Redirect to homepage
    window.location.href = '/index.html';
}

// Function to filter products
function filterProducts() {
    const searchInput = document.getElementById('product-search');
    const categorySelect = document.getElementById('category-filter');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const productContainer = document.getElementById('product-container');

    if (searchInput && categorySelect && priceRange && priceValue && productContainer) {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;
        const maxPrice = parseInt(priceRange.value);

        priceValue.textContent = `$${maxPrice}`;

        const products = productContainer.querySelectorAll('.product-item');
        products.forEach(product => {
            const name = product.querySelector('h2').textContent.toLowerCase();
            const category = product.dataset.category;
            const price = parseFloat(product.dataset.price);

            const matchesSearch = name.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
            const matchesPrice = price <= maxPrice;

            if (matchesSearch && matchesCategory && matchesPrice) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
}

// Function to change the main product image
function changeMainImage(imageSrc) {
    const mainImage = document.getElementById('main-product-image');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
}

// Function to initialize the product page
function initProductPage() {
    const addToCartButton = document.getElementById('add-to-cart-button');
    const quantityInput = document.getElementById('quantity');
    const colorSelect = document.getElementById('color');
    const thumbnails = document.querySelectorAll('.product-thumbnail');

    if (addToCartButton) {
        addToCartButton.addEventListener('click', function(event) {
            event.preventDefault();
            const quantity = parseInt(quantityInput.value);
            const color = colorSelect.value;
            const mainImage = document.getElementById('main-product-image');
            const productName = document.querySelector('h1').textContent;
            const price = parseFloat(document.querySelector('.text-2xl.font-bold').textContent.replace('$', ''));
            addToCart('xyz123', productName, price, quantity, color, mainImage.src);
        });
    }

    if (quantityInput) {
        quantityInput.addEventListener('change', function() {
            if (this.value < 1) this.value = 1;
        });
    }

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            changeMainImage(this.src);
        });
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    
    updateCartCount();
    renderCart();
    initProductPage();

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productId = button.dataset.productId;
            const productName = button.dataset.productName;
            const price = button.dataset.price;
            const quantity = 1; // Default quantity
            const color = 'Default'; // Default color
            const image = button.closest('.product-item').querySelector('img').src;
            addToCart(productId, productName, price, quantity, color, image);
        });
    });

    // Set up product filter listeners
    const searchInput = document.getElementById('product-search');
    const categorySelect = document.getElementById('category-filter');
    const priceRange = document.getElementById('price-range');

    if (searchInput && categorySelect && priceRange) {
        searchInput.addEventListener('input', filterProducts);
        categorySelect.addEventListener('change', filterProducts);
        priceRange.addEventListener('input', filterProducts);
        
        // Initial filter application
        filterProducts();
    }

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Cart icon click event
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', toggleMiniCart);
    }
});

console.log('JavaScript functionality added successfully!');