document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.item').classList.toggle('active');
});

// Close button for nav-bottom
let closeBtn = document.querySelector(".close-btn img");
closeBtn.addEventListener("click", () => {
    let navBottom = document.querySelector(".nav-bottom");
    navBottom.style.display = "none";
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle img');
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            toggle.style.transform = 'rotate(0deg)';
        } else {
            answer.style.display = 'block';
            toggle.style.transform = 'rotate(180deg)';
        }
    });
});

// Navbar shadow on scroll
function scrollShadow() {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 0) {
        navbar.classList.add("boxShadow");
    } else {
        navbar.classList.remove("boxShadow");
    }
}
window.addEventListener('scroll', scrollShadow);

// Pagination for Partner, Peoples, and Pricing
function setupPagination(containerSelector, itemsSelector, dotsSelector) {
    const container = document.querySelector(containerSelector);
    const itemsContainer = document.querySelector(itemsSelector);
    const items = document.querySelectorAll(`${itemsSelector} > *`);
    const dots = document.querySelectorAll(`${dotsSelector} .dot`);

    if (!container || !itemsContainer || !dots.length || !items.length) {
        console.error('Pagination setup failed:', {
            container: !!container,
            itemsContainer: !!itemsContainer,
            dots: dots.length,
            items: items.length,
            containerSelector,
            itemsSelector,
            dotsSelector
        });
        return;
    }

    function showItem(index) {
        if (index < 0 || index >= items.length) {
            console.warn('Invalid index:', index);
            return;
        }

        console.log('Showing item:', index); // Debug

        // Remove active from all
        items.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active to current
        items[index].classList.add('active');
        dots[index].classList.add('active');

        // Slide
        itemsContainer.style.transform = `translateX(-${index * 90}%)`;
    }

    // Set click events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            console.log('Dot clicked:', index); // Debug
            showItem(index);
        });
    });

    // Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    itemsContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    itemsContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const currentIndex = Math.abs(parseInt(itemsContainer.style.transform.replace(/[^0-9-]/g, '') / 100) || 0);
        if (touchStartX - touchEndX > 50 && currentIndex < items.length - 1) {
            showItem(currentIndex + 1);
        } else if (touchEndX - touchStartX > 50 && currentIndex > 0) {
            showItem(currentIndex - 1);
        }
    });

    // Initialize
    showItem(0);
}

// Initialize pagination
setupPagination('.widget-container', '.widget', '.widget-container .pagination-dots');
setupPagination('.peoples-container', '.peoples-cards', '.peoples-container .pagination-dots');
setupPagination('.pricing-container', '.pricing-table', '.pricing-container .pagination-dots');