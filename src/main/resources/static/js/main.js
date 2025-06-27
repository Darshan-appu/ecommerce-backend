(function($) {
    "use strict";

    // Dropdown on mouse hover
    $(document).ready(function() {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function() {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function() {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    });


    // Related carousel
    $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });


    // Product Quantity
    $('.quantity button').on('click', function() {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });

})(jQuery);

// Function to open the chatbox
function openChatbox() {
    document.getElementById('chatbox').style.display = 'block';
}

// Function to close the chatbox
function closeChatbox() {
    document.getElementById('chatbox').style.display = 'none';
}

// Function to simulate sending a message
function sendMessage(event) {
    if (event.key === 'Enter') {
        const message = document.getElementById('userMessage').value;
        if (message.trim() !== '') {
            const messageContainer = document.createElement('div');
            messageContainer.classList.add('chat-message');
            messageContainer.innerHTML = `<span class="user">${message}</span>`;
            document.querySelector('.chatbox-content').appendChild(messageContainer);

            // Clear the input field
            document.getElementById('userMessage').value = '';

            // Scroll to the bottom
            document.querySelector('.chatbox-content').scrollTop = document.querySelector('.chatbox-content').scrollHeight;

            // Simulate bot reply
            setTimeout(() => {
                const botMessage = document.createElement('div');
                botMessage.classList.add('chat-message');
                botMessage.innerHTML = `<span class="bot">Thank you! We'll get back to you shortly with a quote.</span>`;
                document.querySelector('.chatbox-content').appendChild(botMessage);
                document.querySelector('.chatbox-content').scrollTop = document.querySelector('.chatbox-content').scrollHeight;
            }, 1500);
        }
    }
}




// Sample product data (will be replaced with API calls)
const products = [{
        id: 1,
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 129.99,
        image: "https://via.placeholder.com/300x200?text=Headphones",
        category: "electronics"
    },
    {
        id: 2,
        name: "Smart Watch",
        description: "Track your fitness and stay connected",
        price: 199.99,
        image: "https://via.placeholder.com/300x200?text=Smart+Watch",
        category: "electronics"
    },
    {
        id: 3,
        name: "Men's Casual Shirt",
        description: "Comfortable cotton shirt for everyday wear",
        price: 39.99,
        image: "https://via.placeholder.com/300x200?text=Casual+Shirt",
        category: "clothing"
    },
    {
        id: 4,
        name: "Bestselling Novel",
        description: "The latest bestseller from a renowned author",
        price: 24.99,
        image: "https://via.placeholder.com/300x200?text=Novel",
        category: "books"
    },
    {
        id: 5,
        name: "Coffee Maker",
        description: "Programmable coffee maker for perfect brews",
        price: 79.99,
        image: "https://via.placeholder.com/300x200?text=Coffee+Maker",
        category: "home"
    },
    {
        id: 6,
        name: "Wireless Earbuds",
        description: "Compact wireless earbuds with charging case",
        price: 89.99,
        image: "https://via.placeholder.com/300x200?text=Earbuds",
        category: "electronics"
    },
    {
        id: 7,
        name: "Women's Running Shoes",
        description: "Lightweight and comfortable running shoes",
        price: 119.99,
        image: "https://via.placeholder.com/300x200?text=Running+Shoes",
        category: "clothing"
    },
    {
        id: 8,
        name: "Blender",
        description: "Powerful blender for smoothies and more",
        price: 69.99,
        image: "https://via.placeholder.com/300x200?text=Blender",
        category: "home"
    }
];

// Function to render products
function renderProducts(productsToRender) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    if (productsToRender.length === 0) {
        container.innerHTML = '<p>No products found matching your criteria.</p>';
        return;
    }

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-description">${product.description}</div>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                `;

        container.appendChild(productCard);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });
}

// Function to add product to cart
function addToCart(productId) {
    // This will be implemented when we connect to the backend
    console.log(`Product ${productId} added to cart`);
    alert(`Product added to cart!`);

    // Here you would normally make an API call to the backend
    // or store the item in localStorage temporarily
}

// Filter products based on user selection
function filterProducts() {
    const categoryFilter = document.getElementById('category-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    const searchTerm = document.getElementById('search-input').value.toLowerCase();

    let filteredProducts = [...products];

    // Apply category filter
    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(product =>
            product.category === categoryFilter
        );
    }

    // Apply price filter
    if (priceFilter) {
        const [min, max] = priceFilter.split('-');

        if (max === '+') {
            filteredProducts = filteredProducts.filter(product =>
                product.price >= parseFloat(min)
            );
        } else {
            filteredProducts = filteredProducts.filter(product =>
                product.price >= parseFloat(min) && product.price <= parseFloat(max)
            );
        }
    }

    // Apply search filter
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }

    renderProducts(filteredProducts);
}

// Add event listeners to filters
document.getElementById('category-filter').addEventListener('change', filterProducts);
document.getElementById('price-filter').addEventListener('change', filterProducts);
document.getElementById('search-input').addEventListener('input', filterProducts);

// Load products when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);

    // In a real implementation, you would fetch products from your API:
    /*
    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts(products);
        })
        .catch(error => console.error('Error fetching products:', error));
    */
});
// chatgpt code
document.addEventListener("DOMContentLoaded", () => {
    const addToCartBtn = document.getElementById("addCustomizedToCart");
    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", () => {
            const item = {
                name: "Metal Sheet", // Or dynamically get from product title
                length: document.getElementById("productLength").value,
                width: document.getElementById("productWidth").value,
                thickness: document.getElementById("productThickness").value,
                quantity: parseInt(document.getElementById("productQuantity").value),
                instructions: document.getElementById("specialInstructions").value,
                price: 100 // Placeholder static price
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(item);
            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Item added to cart!");
            // Optionally close modal here with jQuery or Bootstrap JS if included
            // $('#customProductModal').modal('hide');
        });
    }
});


// chatgpt
document.addEventListener("DOMContentLoaded", () => {
    const cartTableBody = document.getElementById("cart-table-body");
    if (!cartTableBody) return;

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let subtotal = 0;

    cartTableBody.innerHTML = "";

    cartItems.forEach((item, index) => {
        const total = item.price * item.quantity;
        subtotal += total;

        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.length || "-"}</td>
      <td>${item.width || "-"}</td>
      <td>${item.thickness || "-"}</td>
      <td>${item.quantity}</td>
      <td>${item.instructions || "None"}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>$${total.toFixed(2)}</td>
      <td><button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button></td>
    `;
        cartTableBody.appendChild(row);
    });

    const subtotalEl = document.getElementById("cart-subtotal");
    const totalEl = document.getElementById("cart-total");

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${(subtotal + 10).toFixed(2)}`; // Assuming $10 shipping
});

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
}

// heade nav js


// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    const icon = this.querySelector('i');

    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Mobile dropdown toggle
const dropdownLinks = document.querySelectorAll('.nav-link.dropdown');

dropdownLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const navItem = this.parentElement;
            navItem.classList.toggle('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-container')) {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
});

// Cart/Wishlist functionality demo
const cartBtn = document.querySelector('.cart-btn .badge');
const wishlistBtn = document.querySelector('.wishlist-btn .badge');

// Simulate adding items (demo purposes)
setTimeout(() => {
    cartBtn.textContent = '3';
    wishlistBtn.textContent = '5';
}, 2000);
// MOBILE JS DROPDOWN 

document.querySelectorAll('.dropdown-submenu > .dropdown-item').forEach(item => {
    item.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            this.parentElement.classList.toggle('active');
        }
    });
});


// chatbox js   /////////////////////////////////////////////////////////////////////////////////

// Enhanced AI Chatbot for Tiranga Aerospace
// Company data and configuration
const companyData = {
    "company": {
        "name": "Tiranga Aerospace",
        "taglines": [
            "Your Trusted Partner in Advanced Electronic Components.",
            "Powering Precision, Delivering Innovation.",
            "Quality Beyond Boundaries, Reliability Without Compromise."
        ],
        "description": "Tiranga Aerospace is a leading electronics distributor specializing in high-reliability electronic and electrical components tailored for the aerospace, military, and commercial sectors.",
        "contact": {
            "address": "No.501 4th floor GG Complex, Vidyranyapura, Bengaluru - 560097",
            "phone": "+91 80489 05416",
            "whatsapp": "+91 90350 54448",
            "email": "support@tirangaaerospace.com",
            "website": "https://www.tirangaaerospace.com"
        }
    },
    "premium_products": [
        { "name": "Wave Guide", "action": "Get customized quote", "category": "rf-components" },
        { "name": "RF Coaxial Cable", "action": "Get customized quote", "category": "rf-components" },
        { "name": "RF Terminations", "action": "Get customized quote", "category": "rf-components" },
        { "name": "Horn Antenna", "action": "Get customized quote", "category": "rf-components" },
        { "name": "Connectors", "action": "Get customized quote", "category": "rf-components" },
        { "name": "Band Pass Filters", "action": "Get customized quote", "category": "rf-components" },
        { "name": "Block Up Converter", "action": "Get customized quote", "category": "satcom" },
        { "name": "Converters", "action": "Get customized quote", "category": "satcom" }
    ],
    "featured_categories": [
        { "id": 1, "name": "Tiranga Indigenous Products", "link": "/products/indigenous" },
        { "id": 2, "name": "RF Components", "link": "/products/rf-components" },
        { "id": 3, "name": "Satcom Ground Applications", "link": "/products/satcom-ground" },
        { "id": 4, "name": "Specialized Raw Materials", "link": "/products/raw-materials" },
        { "id": 5, "name": "AMC for SATCOM Antenna & RF Components", "link": "/products/amc-satcom" }
    ]
};

// Chat state management
let chatOpened = false;
let currentLevel = 'main';
let messageHistory = [];
let userContext = {
    interests: [],
    currentTopic: null,
    previousQueries: []
};

// Enhanced suggestion system
const suggestionTree = {
    main: [{
            label: '🛍️ Our Products',
            value: 'products',
            type: 'company',
            keywords: ['product', 'components', 'parts', 'equipment'],
            description: 'Explore our aerospace component catalog'
        },
        {
            label: '📋 Get Quote',
            value: 'quote',
            type: 'company',
            keywords: ['quote', 'price', 'cost', 'pricing', 'estimate'],
            description: 'Request customized pricing'
        },
        {
            label: '📞 Contact Us',
            value: 'contact',
            type: 'company',
            keywords: ['contact', 'phone', 'email', 'address', 'location'],
            description: 'Get in touch with our team'
        },
        {
            label: '🏢 About Company',
            value: 'about',
            type: 'company',
            keywords: ['about', 'company', 'tiranga', 'aerospace', 'who'],
            description: 'Learn about Tiranga Aerospace'
        },
        {
            label: '🔧 Technical Support',
            value: 'support',
            type: 'company',
            keywords: ['support', 'help', 'technical', 'assistance', 'maintenance'],
            description: 'Get technical assistance'
        },
        {
            label: '💬 General Chat',
            value: 'general',
            type: 'general',
            keywords: ['chat', 'talk', 'discuss', 'question'],
            description: 'Ask me anything!'
        }
    ],
    products: [{
            label: '📡 RF Components',
            value: 'rf-components',
            type: 'product',
            keywords: ['rf', 'radio frequency', 'waveguide', 'coaxial', 'antenna'],
            description: 'Radio frequency components and accessories'
        },
        {
            label: '🛰️ Satcom Ground Applications',
            value: 'satcom',
            type: 'product',
            keywords: ['satcom', 'satellite', 'communication', 'ground', 'converter'],
            description: 'Satellite communication ground equipment'
        },
        {
            label: '🔧 Specialized Raw Materials',
            value: 'raw-materials',
            type: 'product',
            keywords: ['materials', 'raw', 'alloy', 'composite', 'polymer'],
            description: 'High-grade aerospace materials'
        },
        {
            label: '🇮🇳 Indigenous Products',
            value: 'indigenous',
            type: 'product',
            keywords: ['indigenous', 'made in india', 'domestic', 'local'],
            description: 'Proudly made in India solutions'
        },
        {
            label: '🔧 AMC Services',
            value: 'amc',
            type: 'product',
            keywords: ['amc', 'maintenance', 'service', 'repair', 'contract'],
            description: 'Annual maintenance contracts'
        },
        {
            label: '⬅️ Back to Main Menu',
            value: 'main',
            type: 'navigation',
            keywords: ['back', 'main', 'menu', 'home'],
            description: 'Return to main options'
        }
    ],
    'rf-components': [
        { label: '📐 Wave Guides', value: 'waveguide-details', type: 'product-detail' },
        { label: '🔌 RF Coaxial Cables', value: 'coaxial-details', type: 'product-detail' },
        { label: '🔚 RF Terminations', value: 'termination-details', type: 'product-detail' },
        { label: '📡 Horn Antennas', value: 'antenna-details', type: 'product-detail' },
        { label: '🔗 Connectors', value: 'connector-details', type: 'product-detail' },
        { label: '📊 Band Pass Filters', value: 'filter-details', type: 'product-detail' },
        { label: '📋 Get RF Components Quote', value: 'rf-quote', type: 'action' },
        { label: '⬅️ Back to Products', value: 'products', type: 'navigation' }
    ],
    satcom: [
        { label: '📤 Block Up Converters', value: 'buc-details', type: 'product-detail' },
        { label: '📥 Low Noise Amplifiers', value: 'lna-details', type: 'product-detail' },
        { label: '📡 Satellite Modems', value: 'modem-details', type: 'product-detail' },
        { label: '🎛️ Antenna Control Systems', value: 'control-details', type: 'product-detail' },
        { label: '📋 Get Satcom Quote', value: 'satcom-quote', type: 'action' },
        { label: '⬅️ Back to Products', value: 'products', type: 'navigation' }
    ]
};

// Intelligent suggestion matching
function getSmartSuggestions(userInput, currentContext = 'main') {
    const input = userInput.toLowerCase();
    const contextSuggestions = suggestionTree[currentContext] || suggestionTree.main;

    // Score suggestions based on keyword matching
    const scoredSuggestions = contextSuggestions.map(suggestion => {
        let score = 0;

        if (suggestion.keywords) {
            suggestion.keywords.forEach(keyword => {
                if (input.includes(keyword)) {
                    score += keyword.length; // Longer matches get higher scores
                }
            });
        }

        // Boost score for exact label matches
        if (input.includes(suggestion.label.toLowerCase().replace(/[🔧📋📞🏢🛍️💬📡🛰️🇮🇳⬅️📐🔌🔚🔗📊📤📥🎛️]/g, '').trim())) {
            score += 10;
        }

        return {...suggestion, score };
    });

    // Sort by score and return top suggestions
    const topSuggestions = scoredSuggestions
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 4);

    // If no matches found, return default suggestions for current context
    if (topSuggestions.length === 0) {
        return contextSuggestions.slice(0, 4);
    }

    // Add navigation options if not present
    const hasNavigation = topSuggestions.some(s => s.type === 'navigation');
    if (!hasNavigation && currentContext !== 'main') {
        topSuggestions.push({
            label: '⬅️ Back',
            value: 'main',
            type: 'navigation',
            score: 0
        });
    }

    return topSuggestions;
}

// Enhanced message handling with context awareness
function analyzeUserInput(message) {
    const analysis = {
        intent: 'unknown',
        entities: [],
        sentiment: 'neutral',
        suggestedActions: []
    };

    const lowerMessage = message.toLowerCase();

    // Intent detection
    if (lowerMessage.match(/\b(hi|hello|hey|greetings|namaste)\b/)) {
        analysis.intent = 'greeting';
    } else if (lowerMessage.match(/\b(quote|price|cost|pricing)\b/)) {
        analysis.intent = 'quote';
    } else if (lowerMessage.match(/\b(product|component|equipment)\b/)) {
        analysis.intent = 'product_inquiry';
    } else if (lowerMessage.match(/\b(contact|phone|email|address)\b/)) {
        analysis.intent = 'contact';
    } else if (lowerMessage.match(/\b(help|support|assistance)\b/)) {
        analysis.intent = 'support';
    }

    // Entity extraction (product mentions)
    companyData.premium_products.forEach(product => {
        if (lowerMessage.includes(product.name.toLowerCase())) {
            analysis.entities.push({
                type: 'product',
                value: product.name,
                category: product.category
            });
        }
    });

    return analysis;
}

// Global functions for chat functionality
function toggleChat() {
    console.log('toggleChat called!');

    const widget = document.getElementById('chatWidget');
    const badge = document.querySelector('.notification-badge');

    if (!widget) {
        console.error('Chat widget not found!');
        return;
    }

    const isOpen = widget.classList.contains('open');

    if (isOpen) {
        widget.classList.remove('open');
        chatOpened = false;
    } else {
        widget.classList.add('open');
        chatOpened = true;

        if (badge) {
            badge.style.display = 'none';
        }

        // Initialize chat if needed
        const messagesContainer = document.getElementById('chatMessages');
        if (messagesContainer && messagesContainer.children.length <= 2) {
            initializeChat();
        }
    }

    // Track event
    if (typeof trackChatbotEvent === 'function') {
        trackChatbotEvent(isOpen ? 'chat_closed' : 'chat_opened');
    }
}

function initializeChat() {
    const messagesContainer = document.getElementById('chatMessages');
    if (!messagesContainer) return;

    // Clear existing messages except welcome message
    const existingMessages = messagesContainer.querySelectorAll('.message:not(.welcome-message)');
    existingMessages.forEach(msg => msg.remove());

    const welcomeMessage = `
        <div class="welcome-intro">
            <h3>Welcome to Tiranga Aerospace! 👋</h3>
            <p>I'm your AI assistant specialized in aerospace components. I can help you with:</p>
            <ul style="margin: 10px 0; padding-left: 20px; font-size: 14px;">
                <li>🔍 Finding the right components</li>
                <li>💰 Getting customized quotes</li>
                <li>📞 Connecting you with our experts</li>
                <li>🛠️ Technical support information</li>
            </ul>
            <p>How can I assist you today?</p>
        </div>
    `;

    addMessage(welcomeMessage, 'bot', false);
    showSuggestions(suggestionTree.main);
}

function addMessage(content, sender = 'bot', showTime = true) {
    const messagesContainer = document.getElementById('chatMessages');
    if (!messagesContainer) {
        console.error('Chat messages container not found!');
        return;
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${sender}`;

    if (sender === 'bot') {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">${content}</div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
        `;
    }

    if (showTime) {
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messageDiv.appendChild(timeDiv);
    }

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Store in history
    messageHistory.push({ content, sender, timestamp: new Date() });
}

function showSuggestions(suggestions) {
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'suggestions';

    suggestions.forEach(suggestion => {
        const btn = document.createElement('button');
        btn.className = 'suggestion-btn';
        btn.innerHTML = suggestion.label;
        if (suggestion.description) {
            btn.title = suggestion.description;
        }
        btn.onclick = () => handleSuggestionClick(suggestion);
        suggestionsDiv.appendChild(btn);
    });

    const messageDiv = document.createElement('div');
    messageDiv.className = 'message message-bot suggestions-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-lightbulb"></i>
        </div>
        <div class="message-content"></div>
    `;
    messageDiv.querySelector('.message-content').appendChild(suggestionsDiv);

    document.getElementById('chatMessages').appendChild(messageDiv);
    document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
}

function handleSuggestionClick(suggestion) {
    // Add user message
    addMessage(suggestion.label, 'user');

    // Update context
    userContext.currentTopic = suggestion.value;
    if (!userContext.interests.includes(suggestion.type)) {
        userContext.interests.push(suggestion.type);
    }

    // Show typing indicator
    showTypingIndicator();

    setTimeout(() => {
        hideTypingIndicator();
        handleBotResponse(suggestion);
    }, 1200);
}

function handleBotResponse(suggestion) {
    switch (suggestion.value) {
        case 'products':
            addMessage(`
                <div class="product-overview">
                    <h4>🛍️ Our Product Portfolio</h4>
                    <p>Tiranga Aerospace offers comprehensive solutions across five key categories:</p>
                    <div style="margin: 15px 0;">
                        <p><strong>🎯 Which area interests you most?</strong></p>
                        <small style="color: #666;">Click on any category below to explore specific products and solutions.</small>
                    </div>
                </div>
            `);
            showSuggestions(suggestionTree.products);
            currentLevel = 'products';
            break;

        case 'quote':
            addMessage(`
                <div class="quote-info">
                    <h4>📋 Get Your Customized Quote</h4>
                    <p>Great choice! Our team provides detailed, competitive quotes tailored to your specific requirements.</p>
                    <div class="contact-highlight" style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
                        <p><strong>📞 Immediate Response:</strong> +91 80489 05416</p>
                        <p><strong>📱 WhatsApp:</strong> +91 90350 54448</p>
                        <p><strong>✉️ Email:</strong> support@tirangaaerospace.com</p>
                    </div>
                    <p><em>Pro tip: Specify the product category you're interested in for faster processing!</em></p>
                </div>
            `);
            showSuggestions([
                { label: '📡 Quote for RF Components', value: 'rf-quote', type: 'action' },
                { label: '🛰️ Quote for Satcom Products', value: 'satcom-quote', type: 'action' },
                { label: '🇮🇳 Quote for Indigenous Products', value: 'indigenous-quote', type: 'action' },
                { label: '🛍️ Browse Products First', value: 'products', type: 'company' },
                { label: '⬅️ Main Menu', value: 'main', type: 'navigation' }
            ]);
            break;

        case 'contact':
            addMessage(`
                <div class="contact-details">
                    <h4>📞 Contact Tiranga Aerospace</h4>
                    <div class="contact-grid" style="display: grid; gap: 10px; margin: 15px 0;">
                        <div class="contact-item">
                            <strong>🏢 Headquarters:</strong><br>
                            No.501 4th floor GG Complex<br>
                            Vidyranyapura, Bengaluru - 560097
                        </div>
                        <div class="contact-item">
                            <strong>📞 Sales & Support:</strong> +91 80489 05416<br>
                            <strong>📱 WhatsApp:</strong> +91 90350 54448<br>
                            <strong>✉️ Email:</strong> support@tirangaaerospace.com<br>
                            <strong>🌐 Website:</strong> www.tirangaaerospace.com
                        </div>
                    </div>
                    <p><em>Our team is ready to assist you with technical queries and custom solutions!</em></p>
                </div>
            `);
            showSuggestions([
                { label: '📋 Request Quote', value: 'quote', type: 'company' },
                { label: '🛍️ View Products', value: 'products', type: 'company' },
                { label: '🔧 Technical Support', value: 'support', type: 'company' },
                { label: '⬅️ Main Menu', value: 'main', type: 'navigation' }
            ]);
            break;

        case 'about':
            addMessage(`
                <div class="company-info">
                    <h4>🏢 About Tiranga Aerospace</h4>
                    <p><strong>Leading Electronics Distributor</strong> specializing in high-reliability components for aerospace, military, and commercial sectors.</p>
                    
                    <div style="margin: 15px 0;">
                        <h5>🎯 Our Mission</h5>
                        <p><em>"Powering Precision, Delivering Innovation"</em></p>
                        
                        <h5>🌟 Our Promise</h5>
                        <p><em>"Quality Beyond Boundaries, Reliability Without Compromise"</em></p>
                        
                        <h5>🔧 Core Expertise</h5>
                        <ul style="margin: 10px 0; padding-left: 20px;">
                            <li>High-reliability electronic components</li>
                            <li>Aerospace-grade solutions</li>
                            <li>Military specification products</li>
                            <li>Commercial sector applications</li>
                        </ul>
                    </div>
                </div>
            `);
            showSuggestions([
                { label: '🛍️ Explore Our Products', value: 'products', type: 'company' },
                { label: '📞 Contact Our Team', value: 'contact', type: 'company' },
                { label: '📋 Get Quote', value: 'quote', type: 'company' },
                { label: '⬅️ Main Menu', value: 'main', type: 'navigation' }
            ]);
            break;

        case 'support':
            addMessage(`
                <div class="support-info">
                    <h4>🔧 Technical Support Services</h4>
                    <p>Our expert team provides comprehensive technical assistance:</p>
                    <ul style="margin: 15px 0; padding-left: 20px;">
                        <li>🔍 Product selection guidance</li>
                        <li>📋 Technical specifications</li>
                        <li>🛠️ Installation support</li>
                        <li>🔧 Maintenance contracts (AMC)</li>
                        <li>📞 Remote troubleshooting</li>
                        <li>⚡ Emergency repair services</li>
                    </ul>
                    <p><strong>For immediate technical support:</strong></p>
                    <p>📞 Call: +91 80489 05416 | 📱 WhatsApp: +91 90350 54448</p>
                </div>
            `);
            showSuggestions([
                { label: '🔧 AMC Services', value: 'amc', type: 'product' },
                { label: '📞 Contact Support Team', value: 'contact', type: 'company' },
                { label: '🛍️ Browse Products', value: 'products', type: 'company' },
                { label: '⬅️ Main Menu', value: 'main', type: 'navigation' }
            ]);
            break;

        case 'general':
            addMessage(`
                <div class="general-chat">
                    <h4>💬 Let's Chat!</h4>
                    <p>I'm here to help with any questions you might have! You can ask me about:</p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>🔧 Technical aerospace topics</li>
                        <li>🛍️ Our products and services</li>
                        <li>🌐 General information</li>
                        <li>💡 Industry insights</li>
                    </ul>
                    <p>What would you like to discuss? 😊</p>
                </div>
            `);
            showSuggestions([
                { label: '🛍️ Our Products', value: 'products', type: 'company' },
                { label: '🔧 Technical Questions', value: 'support', type: 'company' },
                { label: '⬅️ Back to Main Menu', value: 'main', type: 'navigation' }
            ]);
            break;

        case 'main':
            addMessage("How can I help you today? Choose from the options below or type your question:");
            showSuggestions(suggestionTree.main);
            currentLevel = 'main';
            break;

            // Product categories with detailed information
        case 'rf-components':
            addMessage(`
                <div class="product-category">
                    <h4>📡 RF Components Portfolio</h4>
                    <p>Our comprehensive RF component solutions include:</p>
                    <div class="product-grid" style="margin: 15px 0;">
                        <div class="product-item">
                            <strong>📐 Wave Guides</strong> - Precision engineered for optimal signal transmission
                        </div>
                        <div class="product-item">
                            <strong>🔌 RF Coaxial Cables</strong> - High-performance, low-loss cables
                        </div>
                        <div class="product-item">
                            <strong>🔚 RF Terminations</strong> - Reliable signal termination solutions
                        </div>
                        <div class="product-item">
                            <strong>📡 Horn Antennas</strong> - Directional antennas for various frequencies
                        </div>
                        <div class="product-item">
                            <strong>🔗 Connectors</strong> - Aerospace-grade RF connectors
                        </div>
                        <div class="product-item">
                            <strong>📊 Band Pass Filters</strong> - Frequency-selective components
                        </div>
                    </div>
                    <p><em>All components meet stringent aerospace and military specifications.</em></p>
                </div>
            `);
            showSuggestions(suggestionTree['rf-components']);
            currentLevel = 'rf-components';
            break;

        case 'satcom':
            addMessage(`
                <div class="product-category">
                    <h4>🛰️ Satcom Ground Applications</h4>
                    <p>Complete ground-based satellite communication solutions:</p>
                    <div class="product-grid" style="margin: 15px 0;">
                        <div class="product-item">
                            <strong>📤 Block Up Converters (BUC)</strong> - High-power uplink amplification
                        </div>
                        <div class="product-item">
                            <strong>📥 Low Noise Amplifiers (LNA)</strong> - Ultra-low noise signal amplification
                        </div>
                        <div class="product-item">
                            <strong>📡 Satellite Modems</strong> - Advanced digital communication
                        </div>
                        <div class="product-item">
                            <strong>🎛️ Antenna Control Systems</strong> - Precision tracking and positioning
                        </div>
                    </div>
                    <p><em>Designed for reliable 24/7 satellite communication operations.</em></p>
                </div>
            `);
            showSuggestions(suggestionTree.satcom);
            currentLevel = 'satcom';
            break;

            // Handle all other cases with enhanced responses
        default:
            handleAdvancedResponse(suggestion);
            break;
    }
}

function handleAdvancedResponse(suggestion) {
    const responses = {
        'raw-materials': `
            <div class="product-category">
                <h4>🔧 Specialized Raw Materials</h4>
                <p>High-grade materials for aerospace manufacturing:</p>
                <ul style="margin: 15px 0; padding-left: 20px;">
                    <li><strong>Specialty Alloys</strong> - Titanium, Inconel, and advanced steel alloys</li>
                    <li><strong>Advanced Composites</strong> - Carbon fiber and ceramic matrix composites</li>
                    <li><strong>High-Performance Polymers</strong> - PEEK, PEI, and fluoropolymers</li>
                    <li><strong>Thermal Management Materials</strong> - Heat sinks and thermal interface materials</li>
                </ul>
                <p><em>All materials are tested and certified for aerospace applications.</em></p>
            </div>
        `,
        'indigenous': `
            <div class="product-category">
                <h4>🇮🇳 Tiranga Indigenous Products</h4>
                <p>Proudly designed and manufactured in India under the Make in India initiative:</p>
                <ul style="margin: 15px 0; padding-left: 20px;">
                    <li><strong>Airborne Electronics</strong> - Flight control and navigation systems</li>
                    <li><strong>Communication Systems</strong> - Secure military communication equipment</li>
                    <li><strong>Avionics Components</strong> - Display systems and control interfaces</li>
                    <li><strong>Custom Solutions</strong> - Tailored to specific requirements</li>
                </ul>
                <p><em>Developed to meet rigorous international standards while supporting local manufacturing.</em></p>
            </div>
        `,
        'amc': `
            <div class="product-category">
                <h4>🔧 Annual Maintenance Contracts (AMC)</h4>
                <p>Comprehensive maintenance services for your critical systems:</p>
                <div style="margin: 15px 0;">
                    <h5>📋 Service Inclusions:</h5>
                    <ul style="padding-left: 20px;">
                        <li>🔍 Preventive Maintenance - Scheduled inspections and servicing</li>
                        <li>⚡ Emergency Repairs - 24/7 emergency response</li>
                        <li>📈 Performance Optimization - System tuning and calibration</li>
                        <li>🔄 System Upgrades - Hardware and software updates</li>
                        <li>📊 Performance Reports - Detailed maintenance logs</li>
                    </ul>
                    <h5>⏰ Service Levels:</h5>
                    <ul style="padding-left: 20px;">
                        <li>🟢 Standard AMC - Quarterly maintenance</li>
                        <li>🟡 Premium AMC - Monthly maintenance + priority support</li>
                        <li>🔴 Critical AMC - 24/7 monitoring + immediate response</li>
                    </ul>
                </div>
            </div>
        `
    };

    if (responses[suggestion.value]) {
        addMessage(responses[suggestion.value]);
        showSuggestions([
            { label: '📋 Get Quote', value: 'quote', type: 'company' },
            { label: '🛍️ Other Products', value: 'products', type: 'company' },
            { label: '📞 Contact Us', value: 'contact', type: 'company' },
            { label: '⬅️ Main Menu', value: 'main', type: 'navigation' }
        ]);
    } else {
        // Handle specific product detail requests
        handleProductDetails(suggestion);
    }
}

function handleProductDetails(suggestion) {
    const productDetails = {
        'waveguide-details': {
            title: '📐 Wave Guide Components',
            content: `
                <div class="product-detail">
                    <h4>📐 Precision Wave Guide Solutions</h4>
                    <p><strong>Technical Specifications:</strong></p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>Frequency Range: 1 GHz - 110 GHz</li>
                        <li>Materials: Aluminum, Copper, Brass</li>
                        <li>Standards: MIL-DTL, IEC, IEEE</li>
                        <li>Custom fabrication available</li>
                    </ul>
                    <p><strong>Applications:</strong> Radar systems, Satellite communications, Test equipment</p>
                </div>
            `
        },
        'coaxial-details': {
            title: '🔌 RF Coaxial Cable Systems',
            content: `
                <div class="product-detail">
                    <h4>🔌 High-Performance RF Coaxial Cables</h4>
                    <p><strong>Key Features:</strong></p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>Low Loss: Up to 50 GHz</li>
                        <li>Impedance: 50Ω, 75Ω options</li>
                        <li>Temperature Range: -65°C to +200°C</li>
                        <li>Flexible and semi-rigid variants</li>
                    </ul>
                    <p><strong>Certifications:</strong> MIL-C-17, RG series compliance</p>
                </div>
            `
        },
        'buc-details': {
            title: '📤 Block Up Converter Systems',
            content: `
                <div class="product-detail">
                    <h4>📤 Advanced Block Up Converters</h4>
                    <p><strong>Performance Specifications:</strong></p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>Power Output: 1W to 400W</li>
                        <li>Frequency: C, X, Ku, Ka bands</li>
                        <li>Phase Noise: Better than -80 dBc/Hz</li>
                        <li>Indoor/Outdoor configurations</li>
                    </ul>
                    <p><strong>Applications:</strong> VSAT terminals, Teleports, Mobile satcom</p>
                </div>
            `
        }
    };

    if (productDetails[suggestion.value]) {
        addMessage(productDetails[suggestion.value].content);
        showSuggestions([
            { label: '📋 Get Detailed Quote', value: 'quote', type: 'action' },
            { label: '🔧 Technical Support', value: 'support', type: 'company' },
            { label: '📞 Speak to Expert', value: 'contact', type: 'company' },
            { label: '⬅️ Back to Products', value: currentLevel === 'rf-components' ? 'rf-components' : 'satcom', type: 'navigation' }
        ]);
    }
}

function sendMessage(predefinedMessage = null) {
    const input = document.getElementById('messageInput');
    const message = predefinedMessage || input.value.trim();

    if (!message) return;

    // Add user message
    addMessage(message, 'user');

    // Clear input if it was typed
    if (!predefinedMessage) {
        input.value = '';
    }

    // Analyze user input
    const analysis = analyzeUserInput(message);
    userContext.previousQueries.push(message);

    // Show typing indicator
    showTypingIndicator();

    setTimeout(() => {
        hideTypingIndicator();
        handleUserMessage(message, analysis);
    }, 1500);

    // Track event
    if (typeof trackChatbotEvent === 'function') {
        trackChatbotEvent('message_sent', message);
    }
}

function handleUserMessage(message, analysis) {
    const lowerMessage = message.toLowerCase();

    // Handle greetings
    if (analysis.intent === 'greeting') {
        const hour = new Date().getHours();
        let greeting = hour < 12 ? "Good morning!" : hour < 17 ? "Good afternoon!" : "Good evening!";

        addMessage(`
            <div class="greeting-response">
                <h4>${greeting} Welcome to Tiranga Aerospace! 👋</h4>
                <p>I'm your AI assistant specializing in aerospace components and solutions.</p>
                <p>How can I help you explore our advanced electronic components today?</p>
            </div>
        `);
        showSuggestions(getSmartSuggestions(message, currentLevel));
        return;
    }

    // Handle specific product mentions
    if (analysis.entities.length > 0) {
        const productEntity = analysis.entities.find(e => e.type === 'product');
        if (productEntity) {
            addMessage(`
                <div class="product-mention">
                    <h4>Great choice! ${productEntity.value}</h4>
                    <p>You're interested in our ${productEntity.value}. This is one of our premium components!</p>
                    <p>Would you like to:</p>
                </div>
            `);
            showSuggestions([
                { label: `📋 Get ${productEntity.value} Quote`, value: 'quote', type: 'action' },
                { label: `📡 ${productEntity.category.toUpperCase()} Category`, value: productEntity.category, type: 'product' },
                { label: '🔧 Technical Specifications', value: 'support', type: 'company' },
                { label: '📞 Speak to Expert', value: 'contact', type: 'company' }
            ]);
            return;
        }
    }

    // Handle intent-based responses
    switch (analysis.intent) {
        case 'quote':
            addMessage(`
                <div class="quote-response">
                    <h4>📋 Let's Get You a Quote!</h4>
                    <p>I'd be happy to help you get pricing information. For the most accurate quote, please specify:</p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>🔧 Which product category interests you?</li>
                        <li>📊 Quantity requirements</li>
                        <li>📅 Timeline for delivery</li>
                    </ul>
                    <p><strong>For immediate assistance:</strong></p>
                    <p>📞 +91 80489 05416 | 📱 WhatsApp: +91 90350 54448</p>
                </div>
            `);
            showSuggestions(getSmartSuggestions('quote products', 'main'));
            break;

        case 'product_inquiry':
            addMessage(`
                <div class="product-inquiry">
                    <h4>🛍️ Our Product Portfolio</h4>
                    <p>Excellent! You're asking about our products. We specialize in high-reliability components for:</p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>🚁 Aerospace applications</li>
                        <li>🛡️ Military systems</li>
                        <li>🏭 Commercial sectors</li>
                    </ul>
                    <p>Which category would you like to explore?</p>
                </div>
            `);
            showSuggestions(suggestionTree.products);
            break;

        case 'contact':
            addMessage(`
                <div class="contact-response">
                    <h4>📞 Ready to Connect!</h4>
                    <p>Perfect! Here's how you can reach our expert team:</p>
                    <div class="contact-options" style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
                        <p><strong>🏢 Office:</strong> Bengaluru, India</p>
                        <p><strong>📞 Direct Line:</strong> +91 80489 05416</p>
                        <p><strong>📱 WhatsApp:</strong> +91 90350 54448 (Quick response)</p>
                        <p><strong>✉️ Email:</strong> support@tirangaaerospace.com</p>
                    </div>
                    <p>What would you like to discuss with our team?</p>
                </div>
            `);
            showSuggestions([
                { label: '📋 Request Quote', value: 'quote', type: 'company' },
                { label: '🔧 Technical Support', value: 'support', type: 'company' },
                { label: '🛍️ Product Information', value: 'products', type: 'company' },
                { label: '🏢 Company Information', value: 'about', type: 'company' }
            ]);
            break;

        case 'support':
            addMessage(`
                <div class="support-response">
                    <h4>🔧 Technical Support Available!</h4>
                    <p>Our technical team is here to help! We provide:</p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>🔍 Product selection guidance</li>
                        <li>📋 Technical specifications</li>
                        <li>🛠️ Installation support</li>
                        <li>🔧 Maintenance services</li>
                    </ul>
                    <p><strong>For immediate technical assistance:</strong><br>
                    📞 +91 80489 05416 or 📱 WhatsApp: +91 90350 54448</p>
                </div>
            `);
            showSuggestions([
                { label: '🔧 AMC Services', value: 'amc', type: 'product' },
                { label: '📞 Contact Support', value: 'contact', type: 'company' },
                { label: '🛍️ Browse Products', value: 'products', type: 'company' },
                { label: '⬅️ Main Menu', value: 'main', type: 'navigation' }
            ]);
            break;

        default:
            // Use smart suggestions based on input
            const smartSuggestions = getSmartSuggestions(message, currentLevel);

            if (smartSuggestions.length > 0) {
                addMessage(`
                    <div class="smart-response">
                        <h4>💡 I can help with that!</h4>
                        <p>Based on your question "${message}", here are some relevant options:</p>
                        <p><em>Or feel free to ask me anything about aerospace components, pricing, or technical specifications!</em></p>
                    </div>
                `);
                showSuggestions(smartSuggestions);
            } else {
                handleGeneralQuestion(message);
            }
            break;
    }
}

async function handleGeneralQuestion(question) {
    try {
        // This would connect to your backend API
        const response = await fetch('/api/general-chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: question,
                context: userContext,
                history: messageHistory.slice(-5) // Send recent history for context
            })
        });

        if (response.ok) {
            const data = await response.json();
            addMessage(data.answer);

            // Show contextual suggestions
            const contextualSuggestions = getSmartSuggestions(question, currentLevel);
            if (contextualSuggestions.length > 0) {
                showSuggestions(contextualSuggestions);
            }
        } else {
            throw new Error('API not available');
        }
    } catch (error) {
        // Enhanced fallback response
        addMessage(`
            <div class="general-fallback">
                <h4>🤔 That's an interesting question!</h4>
                <p>I'm primarily specialized in Tiranga Aerospace's products and services, but I'd love to help you find what you're looking for.</p>
                <p>Here are some ways I can assist you better:</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>🔍 Search our product catalog</li>
                    <li>💰 Get pricing information</li>
                    <li>🔧 Connect you with technical experts</li>
                    <li>📞 Direct you to the right team member</li>
                </ul>
                <p>What specific information can I help you find? 😊</p>
            </div>
        `);
    }

    showSuggestions([
        { label: '🛍️ Browse Products', value: 'products', type: 'company' },
        { label: '📋 Get Quote', value: 'quote', type: 'company' },
        { label: '📞 Contact Expert', value: 'contact', type: 'company' },
        { label: '🔧 Technical Support', value: 'support', type: 'company' }
    ]);
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message message-bot';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="typing-indicator">
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Utility functions for website navigation
function scrollToFooter() {
    const footer = document.querySelector('footer') || document.querySelector('.footer');
    if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
        addMessage("📍 Scrolled to footer section!", 'bot');
    }
}

function scrollToBody() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    addMessage("🔝 Back to top!", 'bot');
}

// Enhanced event tracking
function trackChatbotEvent(action, label = '') {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: 'Chatbot',
            event_label: label,
            custom_map: {
                user_context: JSON.stringify(userContext)
            }
        });
    }

    // Console log for debugging
    console.log(`Chatbot Event: ${action}`, label);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced AI Chatbot Widget loaded successfully!');

    // Check if all required elements exist
    const widget = document.getElementById('chatWidget');
    const messages = document.getElementById('chatMessages');
    const input = document.getElementById('messageInput');
    const badge = document.querySelector('.notification-badge');

    if (!widget || !messages || !input) {
        console.error('Required chat elements not found. Please check your HTML structure.');
        return;
    }

    // Add click event listener to the AI button
    const aiButton = document.querySelector('.ai-logo-btn');
    if (aiButton) {
        aiButton.addEventListener('click', function(e) {
            e.preventDefault();
            toggleChat();
        });
    }

    // Add input event listener for smart suggestions
    input.addEventListener('input', function() {
        const value = this.value.trim();
        if (value.length > 2) {
            // Could show live suggestions here
            console.log('User typing:', value);
        }
    });

    // Show notification badge after a delay
    setTimeout(() => {
        if (badge && !chatOpened) {
            badge.style.display = 'block';
            badge.textContent = '!';
        }
    }, 5000);
});

// Make functions globally available
window.toggleChat = toggleChat;
window.sendMessage = sendMessage;
window.handleKeyPress = handleKeyPress;
window.scrollToFooter = scrollToFooter;
window.scrollToBody = scrollToBody;
window.trackChatbotEvent = trackChatbotEvent;

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleChat,
        sendMessage,
        analyzeUserInput,
        getSmartSuggestions,
        companyData
    };
}



// login js

document.addEventListener("DOMContentLoaded", function() {
    // Select the form and input elements
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginMessageDiv = document.getElementById("loginMessage");

    // Check if the login form element exists before trying to add an event listener
    if (loginForm) {
        // Add an event listener for the form submission
        loginForm.addEventListener("submit", async function(event) { // Use async for await
            event.preventDefault(); // Prevent the default form submission (page reload)

            const email = emailInput.value;
            const password = passwordInput.value;

            // Clear previous messages and set default error color
            loginMessageDiv.textContent = "";
            loginMessageDiv.style.color = "red";

            // Basic client-side validation for email format
            if (!email.includes('@')) {
                loginMessageDiv.textContent = "Please include an '@' in the email address.";
                return; // Stop the function if validation fails
            }

            // Construct the request body as a JSON object
            const loginData = {
                email: email,
                password: password
            };

            // !!! IMPORTANT: Replace with your actual login API endpoint !!!
            const API_ENDPOINT = "https://ecommerce-backend-hoig.onrender.com/api/login"; // Example URL

            try {
                // Make the API call using fetch
                const res = await fetch(API_ENDPOINT, {
                    method: "POST", // Usually POST for login
                    headers: {
                        "Content-Type": "application/json",
                        // Add any other necessary headers, e.g., for CSRF tokens or API keys
                    },
                    body: JSON.stringify(loginData), // Send the data as a JSON string
                });

                // Check if the response status is OK (2xx success)
                if (!res.ok) {
                    // If response is not OK, try to parse an error message from the body
                    let errorMessage = `Login failed. Status: ${res.status}`;
                    try {
                        const errorData = await res.json();
                        if (errorData && errorData.message) {
                            errorMessage = errorData.message; // Use backend's error message
                        }
                    } catch (e) {
                        // If parsing JSON error fails, use a generic message
                        console.error("Failed to parse error response JSON:", e);
                    }
                    throw new Error(errorMessage); // Throw an error to be caught by the .catch block
                }

                // Parse the JSON body for successful responses
                const data = await res.json();

                // Check if the token exists in the parsed data (adjust 'data.token' and 'data.username' based on your API's actual response structure)
                if (data && data.token) {
                    console.log("Login successful, token:", data.token);
                    // Store user data in localStorage (e.g., token, username)
                    localStorage.setItem("loggedInUsername", data.username || email); // Store username if available, else email
                    localStorage.setItem("authToken", data.token);

                    // Display success message and redirect
                    loginMessageDiv.textContent = "Login successful! Redirecting...";
                    loginMessageDiv.style.color = "green"; // Set to a success color
                    window.location.href = "index.html"; // Redirect to your main application page
                } else {
                    // If no token is found in the successful response, treat as an unexpected server response
                    console.log("Login response did not contain expected token:", data);
                    loginMessageDiv.textContent = "Login failed: Invalid server response. Please try again.";
                }

            } catch (error) {
                // Catch any errors during the fetch operation or from the `throw new Error` above
                console.error("Login error:", error);
                // Display the error message to the the user
                loginMessageDiv.textContent = error.message || "An unexpected error occurred while logging in.";
            }
        });
    } else {
        // This console.error will fire if the loginForm element isn't found in the HTML.
        // If you see this, double-check your login.html for <form id="loginForm">
        console.error("Login form with ID 'loginForm' not found. Ensure the ID is correct in login.html.");
    }

    // If your main.js also contains Owl Carousel initialization, it would go here.
    // Example (uncomment if you have an Owl Carousel on your page and jQuery is loaded):
    // if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
    //     $('.your-carousel-element-selector').owlCarousel({
    //         loop: true,
    //         margin: 10,
    //         nav: true,
    //         // ... other Owl Carousel options
    //     });
    // }
});


// end of login js