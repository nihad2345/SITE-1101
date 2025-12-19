// Interactive features imitating stefanyas.me

// Page indicator hide on mobile
function hideIndicatorMobile() {
    setTimeout(() => {
        document.getElementById('page-indicator')?.classList.add('hide-mobile');
    }, 5000);
}

if (window.matchMedia('(max-width: 600px)').matches) {
    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', hideIndicatorMobile);
    } else {
        hideIndicatorMobile();
    }
}

// Easter egg functionality
(function() {
    const targetUrl = "https://github.com"; // You can change this to any URL

    document.getElementById('easter-egg')?.addEventListener('click', function() {
        this.classList.add('clicked');
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 500); // Wait for the animation to finish before redirecting
    });
})();

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (window.innerWidth <= 600) {
        if (e.key === 'ArrowUp') {
            const prev = document.querySelector('.arrow.prev');
            if (prev) window.location.href = prev.href;
        } else if (e.key === 'ArrowDown') {
            const next = document.querySelector('.arrow.next');
            if (next) window.location.href = next.href;
        }
    } else {
        if (e.key === 'ArrowLeft') {
            const prev = document.querySelector('.arrow.prev');
            if (prev) window.location.href = prev.href;
        } else if (e.key === 'ArrowRight') {
            const next = document.querySelector('.arrow.next');
            if (next) window.location.href = next.href;
        }
    }
});

// Swipe navigation & pull-to-refresh prevention
let touchstartX = 0;
let touchendX = 0;
let touchstartY = 0;
let touchendY = 0;
const swipeThreshold = 50;

function handleSwipe() {
    if (window.innerWidth <= 600) {
        const swipeDistance = touchendY - touchstartY;
        if (Math.abs(swipeDistance) < swipeThreshold) return;
        if (swipeDistance < 0) { // Swiped up
            const next = document.querySelector('.arrow.next');
            if (next) window.location.href = next.href;
        } else { // Swiped down
            const prev = document.querySelector('.arrow.prev');
            if (prev) window.location.href = prev.href;
        }
    } else {
        const swipeDistance = touchendX - touchstartX;
        if (Math.abs(swipeDistance) < swipeThreshold) return;
        if (swipeDistance < 0) { // Swiped left
            const next = document.querySelector('.arrow.next');
            if (next) window.location.href = next.href;
        } else { // Swiped right
            const prev = document.querySelector('.arrow.prev');
            if (prev) window.location.href = prev.href;
        }
    }
}

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
    touchstartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    touchendY = e.changedTouches[0].screenY;
    handleSwipe();
});
