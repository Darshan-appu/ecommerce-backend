// topnav.js

document.addEventListener('DOMContentLoaded', () => {
    const topNavContainer = document.getElementById('top-navbar-placeholder');

    if (topNavContainer) {
        fetch('topnav.html')
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.text();
            })
            .then(html => {
                topNavContainer.innerHTML = html;

                // --- Search Bar Dynamic Placeholder ---
                const searchInput = topNavContainer.querySelector('.search-bar input[type="text"]');
                if (searchInput) {
                    const currentPagePath = window.location.pathname;
                    let placeholderText = "Search...";
                    let searchInputId = "customerSearch";

                    if (currentPagePath.includes('/categories')) {
                        placeholderText = "Search categories...";
                        searchInputId = "categorySearch";
                    } else if (currentPagePath.includes('/dashboard')) {
                        placeholderText = "Search dashboard...";
                        searchInputId = "dashboardSearch";
                    } else if (currentPagePath.includes('/orders')) {
                        placeholderText = "Search orders...";
                        searchInputId = "orderSearch";
                    } else if (currentPagePath.includes('/products')) {
                        placeholderText = "Search products...";
                        searchInputId = "productSearch";
                    } else if (currentPagePath.includes('/vendors')) {
                        placeholderText = "Search vendors...";
                        searchInputId = "vendorSearch";
                    }

                    searchInput.placeholder = placeholderText;
                    searchInput.id = searchInputId;

                    searchInput.addEventListener('input', (event) => {
                        console.log(`Searching on ${searchInput.id}:`, event.target.value);
                    });
                }

                // --- Admin JWT Authentication Check ---
                const token = localStorage.getItem('adminToken');
                if (!token) {
                    alert('Please login first to access the page.');
                    window.location.href = '/admin_pannel/admin-login.html';
                    return;
                }

                // --- Admin Info Display ---
                const username = localStorage.getItem('adminUsername');
                const email = localStorage.getItem('adminEmail');
                const adminDisplay = document.getElementById('adminDisplay');
                if (adminDisplay && username && email) {
                    //adminDisplay.innerText = `${username} (${email})`;
                    adminDisplay.innerText = `${username} `; // i want only username to show here so this line and commented above line
                }

                //to show profile page
                document.getElementById('adminDisplay').addEventListener('click', function() {
                    window.location.href = '../user-profile.html?role=admin';

                });

                // --- Logout Button ---
                const logoutBtn = document.getElementById('adminLogoutBtn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', () => {
                        localStorage.removeItem('adminToken');
                        localStorage.removeItem('adminUsername');
                        localStorage.removeItem('adminEmail');
                        window.location.href = '/admin_pannel/admin-login.html';
                    });
                }

                // --- Notifications ---
                const notificationBell = document.querySelector('.notification .fa-bell');
                const notificationBadge = document.querySelector('.notification .badge');
                if (notificationBell && notificationBadge) {
                    notificationBell.addEventListener('click', () => {
                        console.log('Notifications clicked!');
                    });
                }
            })
            .catch(error => {
                console.error('Error loading topnav:', error);
                topNavContainer.innerHTML = '<p>Error loading navigation.</p>';
            });
    } else {
        console.warn('Element with ID "top-navbar-placeholder" not found.');
    }
});