// ========================================
// AMR Pharmacovigilance Dashboard - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    initializeSidebar();
    initializeLocationTabs();
    initializeSearch();
    addAnimations();
});

// Sidebar Toggle for Mobile
function initializeSidebar() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('open');
            if (overlay) {
                overlay.classList.toggle('active');
            }
        });

        if (overlay) {
            overlay.addEventListener('click', function () {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            });
        }
    }

    // Navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Remove active from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active to clicked link
            this.classList.add('active');
        });
    });
}

// Location Tabs Functionality
function initializeLocationTabs() {
    const locationTabs = document.querySelectorAll('.location-tab');

    locationTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active from all tabs
            locationTabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            this.classList.add('active');

            // Here you would typically load data for the selected location
            const location = this.textContent.trim();
            console.log(`Loading data for: ${location}`);

            // Simulate loading animation
            showLoadingState();
            setTimeout(() => hideLoadingState(), 800);
        });
    });
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.nav-search input');

    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            const query = e.target.value.toLowerCase();
            // Implement search logic here
            console.log(`Searching for: ${query}`);
        });

        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });
    }
}

function performSearch(query) {
    console.log(`Performing search: ${query}`);
    // Implement actual search functionality
}

// Loading States
function showLoadingState() {
    const cards = document.querySelectorAll('.stat-card, .risk-alert, .registry-table tbody tr');
    cards.forEach(card => {
        card.style.opacity = '0.5';
        card.style.transition = 'opacity 0.3s ease';
    });
}

function hideLoadingState() {
    const cards = document.querySelectorAll('.stat-card, .risk-alert, .registry-table tbody tr');
    cards.forEach(card => {
        card.style.opacity = '1';
    });
}

// Add Entrance Animations
function addAnimations() {
    // Animate stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });

    // Animate panels
    const panels = document.querySelectorAll('.map-section, .risk-panel, .registry-panel');
    panels.forEach((panel, index) => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(20px)';

        setTimeout(() => {
            panel.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
        }, 500 + (index * 150));
    });
}

// Export Button Functionality
document.addEventListener('click', function (e) {
    if (e.target.closest('.btn-export')) {
        handleExport();
    }
});

function handleExport() {
    // Show export animation
    const btn = document.querySelector('.btn-export');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i class="bi bi-arrow-clockwise spin"></i> Generating...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<i class="bi bi-check-lg"></i> Ready!';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    }, 2000);

    console.log('Generating export report...');
}

// Add spin animation for loading
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .spin {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(style);

// Map Controls (placeholder)
document.addEventListener('click', function (e) {
    if (e.target.closest('.zoom-btn')) {
        const btn = e.target.closest('.zoom-btn');
        const action = btn.querySelector('i').classList.contains('bi-plus') ? 'in' : 'out';
        console.log(`Zoom ${action}`);
    }
});

// Notification Button
document.addEventListener('click', function (e) {
    if (e.target.closest('.btn-notification')) {
        console.log('Opening notifications...');
        // Implement notification panel
    }
});
