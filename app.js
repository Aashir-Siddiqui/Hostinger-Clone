document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const menuItem = document.querySelector(".item");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        menuItem.classList.toggle("active");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const top = document.querySelector(".top");

    function toggleTopButton() {
        if (window.scrollY > 0) {
            top.style.display = "block";
        } else {
            top.style.display = "none";
        }
    }

    window.addEventListener("scroll", toggleTopButton);

    top.addEventListener("click", () => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
    });

    toggleTopButton();
});

document.addEventListener("DOMContentLoaded", () => {
    const timeButton = document.querySelector(".btn2");

    function updateTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        hours = hours.toString().padStart(2, "0");
        const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
        timeButton.textContent = timeString;
    }

    updateTime();

    setInterval(updateTime, 1000);
});

document.addEventListener("DOMContentLoaded", () => {
    const closeBtn = document.querySelector(".close-btn img");
    const navBottom = document.querySelector(".nav-bottom");
    const head = document.querySelector("#head");

    closeBtn.addEventListener("click", () => {
        navBottom.style.display = "none";
        if (window.innerWidth <= 780) {
            head.style.margin = "65px 20px 0px 20px";
        }
    });
});

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

function scrollShadow() {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 0) {
        navbar.classList.add("boxShadow");
    } else {
        navbar.classList.remove("boxShadow");
    }
}
window.addEventListener('scroll', scrollShadow);

function setupPagination(containerSelector, itemsSelector, dotsSelector) {
    const container = document.querySelector(containerSelector);
    const itemsContainer = document.querySelector(itemsSelector);
    const items = document.querySelectorAll(`${itemsSelector} > *`);
    const dots = document.querySelectorAll(`${dotsSelector} .dot`);

    function showItem(index) {

        items.forEach(item => {
            item.classList.remove('active');
            item.classList.add('inactive');
        });
        dots.forEach(dot => dot.classList.remove('active'));

        items[index].classList.add('active');
        items[index].classList.remove('inactive');
        dots[index].classList.add('active');

        itemsContainer.style.transform = `translateX(-${index * 100}%)`;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showItem(index);
        });
    });

    let touchStartX = 0;
    let touchEndX = 0;

    itemsContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    itemsContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const currentIndex = Math.round(Math.abs(parseInt(itemsContainer.style.transform.replace(/[^0-9-]/g, '') || 0) / 100));
        if (touchStartX - touchEndX > 50 && currentIndex < items.length - 1) {
            showItem(currentIndex + 1);
        } else if (touchEndX - touchStartX > 50 && currentIndex > 0) {
            showItem(currentIndex - 1);
        }
    });

    showItem(0);
}

setupPagination('.widget-container', '.widget', '.widget-container .pagination-dots');
setupPagination('.peoples-container', '.peoples-cards', '.peoples-container .pagination-dots');
setupPagination('.pricing-container', '.pricing-table', '.pricing-container .pagination-dots');