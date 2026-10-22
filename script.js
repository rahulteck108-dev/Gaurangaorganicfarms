/* ─────────────────────────────────────────────
   GAURANGA ORGANIC FARM - MOCK DATA & LOGIC
────────────────────────────────────────────── */

let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener("DOMContentLoaded", async () => {
    updateCartUI();
    await fetchProducts();
    renderProducts('all');
    setupFilters();
    setupSearch();
    setupCartDrawer();
    setupScrollSpy();
});

async function fetchProducts() {
    try {
        const response = await fetch('https://gaurangaorganicfarms.onrender.com/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        products = await response.json();
    } catch (error) {
        console.error('Error loading products from backend:', error);
        // Fallback mock data if server isn't running
        products = [
            { id: 1, title: "Fresh Desi Tomatoes", category: "vegetables", price: 60, unit: "/ kg", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1200&auto=format&fit=crop&q=100" },
            { id: 2, title: "Pure A2 Gir Cow Milk", category: "dairy", price: 90, unit: "/ liter", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&auto=format&fit=crop&q=100" },
            { id: 3, title: "Organic Spinach (Palak)", category: "vegetables", price: 40, unit: "/ bunch", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=1200&auto=format&fit=crop&q=100" },
            { id: 4, title: "Farm Fresh Mangoes", category: "fruits", price: 250, unit: "/ dozen", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=1200&auto=format&fit=crop&q=100" },
            { id: 6, title: "Organic Potatoes", category: "vegetables", price: 45, unit: "/ kg", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=1200&auto=format&fit=crop&q=100" },
            { id: 7, title: "Farm Fresh Carrots", category: "vegetables", price: 55, unit: "/ kg", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=1200&auto=format&fit=crop&q=100" },
            { id: 8, title: "Organic Red Onions", category: "vegetables", price: 35, unit: "/ kg", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=1200&auto=format&fit=crop&q=100" },
            { id: 9, title: "Sweet Apples", category: "fruits", price: 180, unit: "/ kg", image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=1200&auto=format&fit=crop&q=100" },
            { id: 10, title: "Ripe Bananas", category: "fruits", price: 60, unit: "/ dozen", image: "images/ripe_bananas.png" },
            { id: 11, title: "Fresh White Butter (Makhan)", category: "dairy", price: 600, unit: "/ kg", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=1200&auto=format&fit=crop&q=100" },
            { id: 12, title: "Traditional Farm Curd (Dahi)", category: "dairy", price: 120, unit: "/ kg", image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=1200&auto=format&fit=crop&q=100" },
            { id: 13, title: "A2 Paneer (Cottage Cheese)", category: "dairy", price: 450, unit: "/ kg", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=1200&auto=format&fit=crop&q=100" },
            { id: 14, title: "Fresh Watermelon", category: "fruits", price: 40, unit: "/ kg", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200&auto=format&fit=crop&q=100" },
            { id: 15, title: "Organic Green Peas", category: "vegetables", price: 90, unit: "/ kg", image: "images/organic_green_peas.png" },
            { id: 16, title: "Organic Cabbage", category: "vegetables", price: 30, unit: "/ kg", image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=1200&auto=format&fit=crop&q=100" },
            { id: 17, title: "Fresh Broccoli", category: "vegetables", price: 80, unit: "/ kg", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=1200&auto=format&fit=crop&q=100" },
            { id: 18, title: "Organic Lemons", category: "fruits", price: 50, unit: "/ kg", image: "https://images.unsplash.com/photo-1590502593747-42298799482d?w=1200&auto=format&fit=crop&q=100" },
            { id: 19, title: "Farm Fresh Oranges", category: "fruits", price: 120, unit: "/ dozen", image: "https://images.unsplash.com/photo-1549888834-3ec93abae044?w=1200&auto=format&fit=crop&q=100" },
            { id: 20, title: "Sweet Papaya", category: "fruits", price: 40, unit: "/ kg", image: "https://images.unsplash.com/photo-1617112848504-f2bb177119dc?w=1200&auto=format&fit=crop&q=100" },
            { id: 21, title: "Organic Garlic", category: "vegetables", price: 150, unit: "/ kg", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&auto=format&fit=crop&q=100" },
            { id: 22, title: "Organic Cauliflower", category: "vegetables", price: 60, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Fresh%20Organic%20Cauliflower?width=400&height=300&nologo=true" },
            { id: 23, title: "Farm Fresh Eggplant", category: "vegetables", price: 40, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Farm%20Fresh%20Eggplant?width=400&height=300&nologo=true" },
            { id: 24, title: "Organic Bell Peppers", category: "vegetables", price: 120, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Bell%20Peppers?width=400&height=300&nologo=true" },
            { id: 25, title: "Fresh Green Chilies", category: "vegetables", price: 80, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Fresh%20Green%20Chilies?width=400&height=300&nologo=true" },
            { id: 26, title: "Organic Ginger", category: "vegetables", price: 150, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Ginger%20Root?width=400&height=300&nologo=true" },
            { id: 27, title: "Fresh Coriander", category: "vegetables", price: 20, unit: "/ bunch", image: "https://image.pollinations.ai/prompt/Fresh%20Coriander%20Leaves?width=400&height=300&nologo=true" },
            { id: 28, title: "Organic Mint Leaves", category: "vegetables", price: 15, unit: "/ bunch", image: "https://image.pollinations.ai/prompt/Organic%20Mint%20Leaves?width=400&height=300&nologo=true" },
            { id: 29, title: "Farm Fresh Radish", category: "vegetables", price: 30, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Farm%20Fresh%20Radish?width=400&height=300&nologo=true" },
            { id: 30, title: "Organic Beetroot", category: "vegetables", price: 50, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Beetroot?width=400&height=300&nologo=true" },
            { id: 31, title: "Fresh Bitter Gourd", category: "vegetables", price: 60, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Fresh%20Bitter%20Gourd?width=400&height=300&nologo=true" },
            { id: 32, title: "Organic Bottle Gourd", category: "vegetables", price: 40, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Bottle%20Gourd?width=400&height=300&nologo=true" },
            { id: 33, title: "Farm Fresh Ridge Gourd", category: "vegetables", price: 45, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Fresh%20Ridge%20Gourd?width=400&height=300&nologo=true" },
            { id: 34, title: "Organic Lady Finger", category: "vegetables", price: 55, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Lady%20Finger%20Okra?width=400&height=300&nologo=true" },
            { id: 35, title: "Fresh Cucumber", category: "vegetables", price: 35, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Fresh%20Cucumber?width=400&height=300&nologo=true" },
            { id: 36, title: "Organic Pumpkin", category: "vegetables", price: 25, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Pumpkin?width=400&height=300&nologo=true" },
            { id: 37, title: "Farm Fresh Sweet Potato", category: "vegetables", price: 40, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Farm%20Fresh%20Sweet%20Potato?width=400&height=300&nologo=true" },
            { id: 38, title: "Organic Pomegranate", category: "fruits", price: 150, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Pomegranate?width=400&height=300&nologo=true" },
            { id: 39, title: "Fresh Guava", category: "fruits", price: 80, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Fresh%20Guava?width=400&height=300&nologo=true" },
            { id: 40, title: "Farm Fresh Grapes", category: "fruits", price: 120, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Farm%20Fresh%20Grapes?width=400&height=300&nologo=true" },
            { id: 41, title: "Organic Pineapple", category: "fruits", price: 90, unit: "/ piece", image: "https://image.pollinations.ai/prompt/Organic%20Pineapple?width=400&height=300&nologo=true" },
            { id: 42, title: "Fresh Strawberries", category: "fruits", price: 200, unit: "/ box", image: "https://image.pollinations.ai/prompt/Fresh%20Strawberries?width=400&height=300&nologo=true" },
            { id: 43, title: "Organic Blueberries", category: "fruits", price: 350, unit: "/ box", image: "https://image.pollinations.ai/prompt/Organic%20Blueberries?width=400&height=300&nologo=true" },
            { id: 44, title: "Farm Fresh Kiwi", category: "fruits", price: 180, unit: "/ box", image: "https://image.pollinations.ai/prompt/Farm%20Fresh%20Kiwi?width=400&height=300&nologo=true" },
            { id: 45, title: "Organic Cherries", category: "fruits", price: 400, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Cherries?width=400&height=300&nologo=true" },
            { id: 46, title: "Fresh Peach", category: "fruits", price: 160, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Fresh%20Peach?width=400&height=300&nologo=true" },
            { id: 47, title: "Organic Plum", category: "fruits", price: 140, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Plum?width=400&height=300&nologo=true" },
            { id: 48, title: "Farm Fresh Pear", category: "fruits", price: 120, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Farm%20Fresh%20Pear?width=400&height=300&nologo=true" },
            { id: 49, title: "Organic Lychee", category: "fruits", price: 250, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Lychee?width=400&height=300&nologo=true" },
            { id: 50, title: "Fresh Custard Apple", category: "fruits", price: 100, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Fresh%20Custard%20Apple?width=400&height=300&nologo=true" },
            { id: 51, title: "Farm Fresh Chikoo", category: "fruits", price: 80, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Farm%20Fresh%20Sapodilla%20Chikoo?width=400&height=300&nologo=true" },
            { id: 52, title: "Organic Dragon Fruit", category: "fruits", price: 220, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Dragon%20Fruit?width=400&height=300&nologo=true" },
            { id: 53, title: "Fresh Muskmelon", category: "fruits", price: 60, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Fresh%20Muskmelon?width=400&height=300&nologo=true" },
            { id: 54, title: "Organic Figs (Anjeer)", category: "fruits", price: 300, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Figs?width=400&height=300&nologo=true" },
            { id: 55, title: "Farm Fresh Avocado", category: "fruits", price: 400, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Farm%20Fresh%20Avocado?width=400&height=300&nologo=true" }
        ];
    }
}

function setupCartDrawer() {
    const cartIcon = document.querySelector(".cart-icon");
    // Prevent default link behavior if we want a drawer on index.html
    // But checkout.html is already linked. Let's make the cart icon in navbar open a drawer
    // and provide a checkout button inside the drawer.
    
    // For now, let's just make the cart count dynamic
    updateCartUI();
}

function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.querySelector(".cart-count");
    if (cartCountElement) {
        cartCountElement.innerText = totalCount;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartCount', totalCount); // Keep for compatibility if needed
}

function setupSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            searchInput.classList.toggle('active');
            if (searchInput.classList.contains('active')) {
                searchInput.focus();
            }
        });

        searchInput.addEventListener('input', (e) => {
            const activeFilterBtn = document.querySelector('.filter-btn.active');
            const currentFilter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
            renderProducts(currentFilter, e.target.value);
            
            if (e.target.value.trim() !== "") {
                const shopSection = document.getElementById('shop');
                if (shopSection) shopSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

function renderProducts(filter, searchQuery = "") {
    const container = document.getElementById("products-container");
    if (!container) return;
    
    container.innerHTML = "";

    let filtered = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(p => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
    }

    if (filtered.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-light); font-size: 1.2rem; padding: 2rem;">No fresh products found matching your search. Try another keyword!</p>`;
        return;
    }

    filtered.forEach(product => {
        const cartItem = cart.find(item => item.id === product.id);
        const quantity = cartItem ? cartItem.quantity : 0;

        const card = document.createElement("div");
        card.className = "product-card";
        card.style.transformStyle = "preserve-3d";

        card.innerHTML = `
            <div class="product-image" style="background-image: url('${product.image}'); background-size: cover; background-position: center; transform: translateZ(30px);">
                <span class="organic-tag" style="transform: translateZ(40px);">100% Organic</span>
            </div>
            <div class="product-info" style="transform: translateZ(30px);">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">₹${product.price} <span>${product.unit}</span></div>
                <div class="product-actions" style="margin-top: 1rem;">
                    ${quantity > 0 ? `
                        <div class="quantity-controls" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem; justify-content: center;">
                            <button class="qty-btn" onclick="reduceQuantity(${product.id})" style="background: var(--bg-light); border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; color: var(--primary);"><i class="fas fa-minus"></i></button>
                            <span style="font-weight: 600; font-size: 1.1rem; min-width: 20px; text-align: center;">${quantity}</span>
                            <button class="qty-btn" onclick="addToCart(${product.id})" style="background: var(--bg-light); border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; color: var(--primary);"><i class="fas fa-plus"></i></button>
                        </div>
                    ` : `
                        <button class="add-to-cart" onclick="addToCart(${product.id})" style="width: 100%;">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    `}
                    <button class="buy-now" onclick="buyNow(${product.id})" style="width: 100%; margin-top: 0.5rem;">
                        <i class="fas fa-bolt"></i> Buy Now
                    </button>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".product-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
            scale: 1.05
        });
    }
}

function setupFilters() {
    const btns = document.querySelectorAll(".filter-btn");
    btns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            btns.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            const searchInput = document.getElementById('search-input');
            renderProducts(e.target.getAttribute("data-filter"), searchInput ? searchInput.value : "");
        });
    });
}

function setupScrollSpy() {
    const sections = document.querySelectorAll('header[id], section[id], div[id="contact"]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });
}

window.addToCart = function (productOrId) {
    let product = typeof productOrId === 'object' ? productOrId : products.find(p => p.id === productOrId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            unit: product.unit || '',
            quantity: 1
        });
    }

    updateCartUI();
    refreshCurrentView();

    // Animation
    const cartIcon = document.querySelector(".cart-icon i");
    if (cartIcon) {
        cartIcon.style.transform = "scale(1.3)";
        cartIcon.style.color = "var(--accent)";
        setTimeout(() => {
            cartIcon.style.transform = "scale(1)";
            cartIcon.style.color = "var(--text-main)";
        }, 300);
    }
};

window.reduceQuantity = function (productId) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity--;
        if (existingItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        updateCartUI();
        refreshCurrentView();
    }
};

function refreshCurrentView() {
    const activeFilterBtn = document.querySelector('.filter-btn.active');
    const filter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
    const searchInput = document.getElementById('search-input');
    renderProducts(filter, searchInput ? searchInput.value : "");
}

window.buyNow = function (productOrId) {
    let product = typeof productOrId === 'object' ? productOrId : products.find(p => p.id === productOrId);
    if (product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            // Already in cart, maybe just redirect or increment
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                unit: product.unit || '',
                quantity: 1
            });
        }
        updateCartUI();
        window.location.href = "checkout.html";
    }
};

