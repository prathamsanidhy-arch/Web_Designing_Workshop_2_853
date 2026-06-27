document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Hero Slider Logic ---
    const slides = document.querySelector('.slides');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    const totalSlides = 5;

    slides.classList.add('auto-animate');

    function updateSlider() {
        slides.classList.remove('auto-animate');
        const offset = -currentSlide * 20; 
        slides.style.transform = `translateX(${offset}%)`;
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : totalSlides - 1;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide < totalSlides - 1) ? currentSlide + 1 : 0;
        updateSlider();
    });

    
    const navAll = document.querySelector('.nav-all');
    const sideDrawer = document.getElementById('side-drawer');
    const overlay = document.getElementById('overlay');
    const closeSideDrawer = document.getElementById('close-side-drawer');

    function toggleSideDrawer(open) {
        if (open) {
            sideDrawer.classList.add('open');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            sideDrawer.classList.remove('open');
            if (!cartDrawer.classList.contains('open')) {
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    }

    navAll.addEventListener('click', () => toggleSideDrawer(true));
    closeSideDrawer.addEventListener('click', () => toggleSideDrawer(false));
    overlay.addEventListener('click', () => {
        toggleSideDrawer(false);
        toggleCartDrawer(false);
    });

   
    const cartBtn = document.getElementById('cart-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCartDrawer = document.getElementById('close-cart-drawer');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartVal = document.getElementById('cart-val');
    const cartTotalPrice = document.getElementById('cart-total-price');

    let cart = [];

    function toggleCartDrawer(open) {
        if (open) {
            cartDrawer.classList.add('open');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            cartDrawer.classList.remove('open');
            if (!sideDrawer.classList.contains('open')) {
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    }

    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCartDrawer(true);
    });
    closeCartDrawer.addEventListener('click', () => toggleCartDrawer(false));

    function updateCartUI() {
        cartVal.textContent = cart.length;
        
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
            cartTotalPrice.textContent = '₹0';
            return;
        }

        let html = '';
        let total = 0;
        cart.forEach((item, index) => {
            html += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="cart-item-info">
                        <h4>${item.title}</h4>
                        <p class="price">₹${item.price.toLocaleString()}</p>
                        <span class="remove-btn" onclick="removeFromCart(${index})">Delete</span>
                    </div>
                </div>
            `;
            total += item.price;
        });
        cartItemsList.innerHTML = html;
        cartTotalPrice.textContent = `₹${total.toLocaleString()}`;
    }

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCartUI();
    };

    function addToCart(title, price, image) {
        cart.push({ title, price, image });
        updateCartUI();
        toggleCartDrawer(true);
        
        // Brief animation for cart icon
        const icon = document.getElementById('cart-btn');
        icon.style.transform = 'scale(1.2)';
        setTimeout(() => icon.style.transform = 'scale(1)', 200);
    }

    // Attach to products
    document.querySelectorAll('.shop-now, .grid-item, .scroller-item').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            // Mock data extraction
            const title = el.querySelector('h2, h3, p')?.textContent || 'Amazon Product';
            const priceStr = el.querySelector('.price-amount')?.textContent.replace(/,/g, '') || '999';
            const price = parseInt(priceStr);
            const image = el.querySelector('img')?.src || '';
            
            addToCart(title, price, image);
        });
    });

    // --- 4. Search Simulation Logic ---
    const searchBtn = document.getElementById('search-btn');
    const searchQuery = document.getElementById('search-query');
    const searchResults = document.getElementById('search-results');
    const mainGrid = document.getElementById('main-grid');
    const heroSlider = document.querySelector('.hero-slider');
    const scrollerSections = document.querySelectorAll('.scroller-section');

    function performSearch() {
        const query = searchQuery.value.trim();
        if (!query) return;

        // Hide main content
        mainGrid.classList.add('hidden');
        heroSlider.classList.add('hidden');
        scrollerSections.forEach(s => s.classList.add('hidden'));

        // Show results
        searchResults.classList.add('active');
        searchResults.innerHTML = `
            <div style="margin-bottom: 20px;">
                <a href="#" id="back-home" style="color: #007185;">&lt; Back to home</a>
                <h2 style="margin-top: 10px;">Results for "${query}"</h2>
            </div>
            <div class="results-grid">
                ${generateMockResults(query)}
            </div>
        `;

        document.getElementById('back-home').addEventListener('click', (e) => {
            e.preventDefault();
            resetHome();
        });
    }

    function resetHome() {
        searchResults.classList.remove('active');
        mainGrid.classList.remove('hidden');
        heroSlider.classList.remove('hidden');
        scrollerSections.forEach(s => s.classList.remove('hidden'));
        searchQuery.value = '';
    }

    function generateMockResults(query) {
        let items = '';
        for (let i = 1; i <= 8; i++) {
            items += `
                <div class="category-card">
                    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop" style="width:100%; height:200px; object-fit:contain;">
                    <h3 style="font-size: 1rem; margin: 10px 0;">${query} Premium Edition - Item ${i}</h3>
                    <div class="rating" style="color: #ffa41c;">
                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                    </div>
                    <p style="font-weight:bold; font-size: 1.2rem; margin: 5px 0;">₹${(999 * i).toLocaleString()}</p>
                    <button class="sign-in-btn" onclick="addToCart('${query} Item ${i}', ${999 * i}, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop')">Add to Cart</button>
                </div>
            `;
        }
        return items;
    }

    searchBtn.addEventListener('click', performSearch);
    searchQuery.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    // Make login buttons functional
    document.querySelectorAll('.sign-in-btn').forEach(btn => {
        if (btn.textContent.includes('Sign in')) {
            btn.addEventListener('click', () => {
                window.location.href = 'login.html';
            });
        }
    });

    console.log('Advanced Amazon Prototype Initialized.');
});
