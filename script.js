// Portfolio images data
const portfolioImages = [
    { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop', title: 'Midnight Soul', category: 'Portraits' },
    { src: 'https://images.unsplash.com/photo-1449824913929-2b3a3e36f0a8?q=80&w=1000&auto=format&fit=crop', title: 'Urban Echoes', category: 'Street' },
    { src: 'https://images.unsplash.com/photo-1555685812-4b943f3db990?q=80&w=1000&auto=format&fit=crop', title: 'Neon Rain', category: 'Cinematic' },
    { src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop', title: 'Silent Hills', category: 'Cinematic' },
    { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop', title: 'The Groom', category: 'Events' },
    { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop', title: 'Product X', category: 'Commercial' },
    { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop', title: 'Raw Emotion', category: 'Portraits' },
    { src: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1000&auto=format&fit=crop', title: 'Tokyo Drift', category: 'Street' },
    { src: 'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=1000&auto=format&fit=crop', title: 'Wedding Bliss', category: 'Events' },
    { src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop', title: 'Dark Mode', category: 'Commercial' },
    { src: 'https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=1000&auto=format&fit=crop', title: 'Noir Style', category: 'Cinematic' },
    { src: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=1000&auto=format&fit=crop', title: 'Subway Life', category: 'Street' }
];

let currentImageIndex = 0;
let currentFilter = 'all';

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Portfolio filtering
function filterPortfolio(category) {
    currentFilter = category;
    const items = document.querySelectorAll('.portfolio-item');
    const buttons = document.querySelectorAll('.category-btn');
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter items
    items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

// Lightbox functionality
function openLightbox(index) {
    // Get filtered items
    const allItems = document.querySelectorAll('.portfolio-item');
    const visibleItems = Array.from(allItems).filter(item => !item.classList.contains('hidden'));
    
    // Find the actual index in the portfolioImages array
    const clickedItem = allItems[index];
    const category = clickedItem.getAttribute('data-category');
    const imgSrc = clickedItem.querySelector('img').src;
    
    // Find matching index in portfolioImages
    currentImageIndex = portfolioImages.findIndex(img => img.src === imgSrc);
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = portfolioImages[currentImageIndex].src;
    lightbox.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function nextImage() {
    // Get filtered images based on current filter
    let filteredImages = portfolioImages;
    if (currentFilter !== 'all') {
        filteredImages = portfolioImages.filter(img => img.category === currentFilter);
    }
    
    // Find current image in filtered array
    const currentInFiltered = filteredImages.findIndex(img => img.src === portfolioImages[currentImageIndex].src);
    const nextInFiltered = (currentInFiltered + 1) % filteredImages.length;
    
    // Find index in full array
    currentImageIndex = portfolioImages.findIndex(img => img.src === filteredImages[nextInFiltered].src);
    
    document.getElementById('lightbox-img').src = portfolioImages[currentImageIndex].src;
}

function prevImage() {
    // Get filtered images based on current filter
    let filteredImages = portfolioImages;
    if (currentFilter !== 'all') {
        filteredImages = portfolioImages.filter(img => img.category === currentFilter);
    }
    
    // Find current image in filtered array
    const currentInFiltered = filteredImages.findIndex(img => img.src === portfolioImages[currentImageIndex].src);
    const prevInFiltered = (currentInFiltered - 1 + filteredImages.length) % filteredImages.length;
    
    // Find index in full array
    currentImageIndex = portfolioImages.findIndex(img => img.src === filteredImages[prevInFiltered].src);
    
    document.getElementById('lightbox-img').src = portfolioImages[currentImageIndex].src;
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    }
});

// Close lightbox on background click
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    e.target.reset();
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(item);
});

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ${index * 0.2}s, transform 0.6s ${index * 0.2}s`;
    observer.observe(card);
});
