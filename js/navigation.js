document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'rotateY(5deg)'; // Slight rotation effect
    });

    link.addEventListener('mouseleave', () => {
        link.style.transform = 'rotateY(0deg)'; // Reset rotation
    });
});
