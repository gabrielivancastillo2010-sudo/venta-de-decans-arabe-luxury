// --- BASE DE DATOS DE PERFUMES ÁRABES ---
const products = [
    {
        id: 1,
        name: "Khamrah - Lattafa",
        category: "fiesta",
        categoryName: "Fiestas & Noche",
        img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80",
        notes: "Canela, Nuez Moscada, Dátiles, Vainilla, Habba Tonka",
        duration: "10 - 12 Horas",
        description: "Una fragancia cálida, dulce y especiada extremadamente opulenta. Ideal para destacar en eventos nocturnos.",
        prices: { '2ml': 4, '5ml': 8, '10ml': 14, '15ml': 19 }
    },
    {
        id: 2,
        name: "Club de Nuit Intense - Armaf",
        category: "trabajo",
        categoryName: "Oficina & Trabajo",
        img: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80",
        notes: "Limón, Piña, Abedul, Almizcle, Ámbar",
        duration: "8 - 10 Horas",
        description: "Un aroma amaderado especiado sofisticado, elegante e imponente. Perfecto para causar presencia profesional.",
        prices: { '2ml': 3, '5ml': 7, '10ml': 12, '15ml': 16 }
    },
    {
        id: 3,
        name: "Yara Pink - Lattafa",
        category: "diario",
        categoryName: "Uso Diario",
        img: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80",
        notes: "Orquídea, Mandarina, Gourmet Tropical, Vainilla",
        duration: "6 - 8 Horas",
        description: "Suave, cremoso, atalcado y frutal. Un perfume versátil para uso diario que aporta una sensación limpia y dulce.",
        prices: { '2ml': 3, '5ml': 6, '10ml': 10, '15ml': 14 }
    },
    {
        id: 4,
        name: "Bader Al Badoor - Oud Essential",
        category: "fiesta",
        categoryName: "Fiestas & Noche",
        img: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80",
        notes: "Oud Real, Rosa de Damasco, Azafrán, Ámbar Gris",
        duration: "12+ Horas",
        description: "Perfume árabe tradicional con notas oscuras de Oud y resinas preciosas. Un lujo inolvidable.",
        prices: { '2ml': 5, '5ml': 10, '10ml': 18, '15ml': 24 }
    },
    {
        id: 5,
        name: "Ameer Al Oudh - Lattafa",
        category: "trabajo",
        categoryName: "Oficina & Trabajo",
        img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
        notes: "Madera de Oud, Vainilla, Azúcar Quemado, Sándalo",
        duration: "8 - 10 Horas",
        description: "Cálido y amaderado con un toque dulce ahumado. Proyecta madurez y distinción en reuniones importantes.",
        prices: { '2ml': 4, '5ml': 7, '10ml': 13, '15ml': 17 }
    },
    {
        id: 6,
        name: "Fakhar Black - Lattafa",
        category: "diario",
        categoryName: "Uso Diario",
        img: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=600&q=80",
        notes: "Manzana, Jengibre, Lavanda, Ámbar, Vetiver",
        duration: "7 - 9 Horas",
        description: "Fresco, versátil y moderno. Adecuado para cualquier edad y uso diario en cualquier estación del año.",
        prices: { '2ml': 3, '5ml': 6, '10ml': 11, '15ml': 15 }
    }
];

// --- ESTADO DE LA APLICACIÓN ---
let cart = [];
let currentProduct = null;
let selectedSize = '5ml';
let carouselPosition = 0;

// --- NÚMERO DE WHATSAPP (MODIFÍCALO AQUÍ) ---
const whatsappNumber = "584120000000"; // Incluye código de país sin el signo +

// --- INICIALIZACIÓN ---
document.addEventListener("DOMContentLoaded", () => {
    renderCatalog('todos');
    renderCarousel();
});

// --- RENDERIZADO DE CATÁLOGO ---
function renderCatalog(category) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    const filtered = category === 'todos' 
        ? products 
        : products.filter(p => p.category === category);

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.img}" alt="${p.name}" onclick="openModal(${p.id})">
            <div class="product-info">
                <span class="product-tag">${p.categoryName}</span>
                <h3 class="product-title">${p.name}</h3>
                <div class="product-price-range">Decants desde $${p.prices['2ml']} USD</div>
                <button class="btn-primary" style="width: 100%;" onclick="openModal(${p.id})">
                    <i class="fas fa-eye"></i> Ver Detalles
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterCatalog(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderCatalog(category);
}

// --- CARRUSEL DE IMÁGENES ---
function renderCarousel() {
    const track = document.getElementById('carousel-track');
    track.innerHTML = '';

    products.slice(0, 5).forEach(p => {
        const card = document.createElement('div');
        card.className = 'carousel-card';
        card.onclick = () => openModal(p.id);
        card.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <h4 class="gold-text">${p.name}</h4>
            <p style="font-size: 0.8rem; color: var(--silver); margin-top: 5px;">Probar Decant</p>
        `;
        track.appendChild(card);
    });
}

function moveCarousel(direction) {
    const track = document.getElementById('carousel-track');
    const cards = document.querySelectorAll('.carousel-card');
    const totalCards = cards.length;
    
    carouselPosition += direction;
    if (carouselPosition < 0) carouselPosition = totalCards - 1;
    if (carouselPosition >= totalCards) carouselPosition = 0;

    const percentage = carouselPosition * -100;
    track.style.transform = `translateX(${percentage}%)`;
}

// --- MODAL DE DETALLES ---
function openModal(id) {
    currentProduct = products.find(p => p.id === id);
    selectedSize = '5ml'; // Tamaño por defecto

    document.getElementById('modal-img').src = currentProduct.img;
    document.getElementById('modal-title').innerText = currentProduct.name;
    document.getElementById('modal-category').innerText = currentProduct.categoryName;
    document.getElementById('modal-desc').innerText = currentProduct.description;
    document.getElementById('modal-notes').innerText = currentProduct.notes;
    document.getElementById('modal-duration').innerText = currentProduct.duration;

    // Resetear botones de tamaño
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.size === '5ml') btn.classList.add('active');
    });

    updateModalPrice();
    document.getElementById('product-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

function selectSize(size) {
    selectedSize = size;
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.size === size) btn.classList.add('active');
    });
    updateModalPrice();
}

function updateModalPrice() {
    const price = currentProduct.prices[selectedSize];
    document.getElementById('modal-price').innerText = `$${price}.00 USD`;
}

// --- CARRITO DE COMPRAS ---
function addCurrentToCart() {
    const item = {
        id: currentProduct.id,
        name: currentProduct.name,
        size: selectedSize,
        price: currentProduct.prices[selectedSize]
    };

    cart.push(item);
    updateCartUI();
    closeModal();
    toggleCart(); // Abre el carrito tras agregar
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    const count = document.getElementById('cart-count');
    const totalEl = document.getElementById('cart-total-price');

    count.innerText = cart.length;
    container.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Decant: ${item.size} - $${item.price}.00 USD</p>
            </div>
            <i class="fas fa-trash remove-item" onclick="removeFromCart(${index})"></i>
        `;
        container.appendChild(itemEl);
    });

    totalEl.innerText = `$${total}.00 USD`;
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

function closeAllPanels() {
    closeModal();
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('active');
}

// --- PEDIDO POR WHATSAPP ---
function sendWhatsAppOrder() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío. Agrega algún decant para continuar.");
        return;
    }

    let message = "✨ *NUEVO PEDIDO EN SULTAN DECANTS* ✨\n\n";
    message += "Hola, me gustaría realizar el pedido de los siguientes decants:\n\n";

    let total = 0;
    cart.forEach((item, i) => {
        message += `${i + 1}. *${item.name}*\n   - Tamaño: ${item.size}\n   - Precio: $${item.price} USD\n\n`;
        total += item.price;
    });

    message += `💰 *Total a Pagar:* $${total}.00 USD\n\n`;
    message += "Quedo a la espera de sus datos para concretar el pago y envío. ¡Gracias!";

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
}