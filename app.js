let closeBtn = document.querySelector(".close-btn img");

closeBtn.addEventListener("click", () => {
    let navBottom = document.querySelector(".nav-bottom");
    navBottom.style.display = "none";
});

document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.item').classList.toggle('active');
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