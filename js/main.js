document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Set active link based on current URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Populate generic product page if on product.html
    if (window.location.pathname.includes('product.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('name') || 'Elegant Gold Necklace';
        const price = urlParams.get('price') || '$299';
        const img = urlParams.get('img') || 'images/necklace_1.png';

        const titleEl = document.getElementById('product-title');
        const priceEl = document.getElementById('product-price');
        const imgEl = document.getElementById('product-image');
        const breadcrumbEl = document.getElementById('breadcrumb-name');

        if(titleEl) titleEl.textContent = name;
        if(priceEl) priceEl.textContent = price;
        if(imgEl) imgEl.src = img;
        if(breadcrumbEl) breadcrumbEl.textContent = name;
    }
});
