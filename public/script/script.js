document.addEventListener("DOMContentLoaded", function() {
    const faqSections = document.querySelectorAll('.faq_ans');
    
    faqSections.forEach(function(faq) {
        const plusIcon = faq.querySelector('.bar img');
        const answerDiv = faq.querySelector('.answer');
        const minusIcon = faq.querySelector('.neg');

        answerDiv.style.display = 'none';
        plusIcon.addEventListener('click', function() {
            if (answerDiv.style.display === 'none') {
                answerDiv.style.display = 'flex';
                plusIcon.src = '/images/Button Minus.png';
            }
        });
        minusIcon.addEventListener('click', function() {
            if (answerDiv.style.display === 'flex') {
                answerDiv.style.display = 'none';
                plusIcon.src = '/images/Button Circle.png';
            }
        });
    });
});


const card = document.querySelector('.review-card');

card.addEventListener('mouseenter', function () {
    document.addEventListener('mousemove', updateMultiColorGlow);
});

card.addEventListener('mouseleave', function () {
    card.style.background = 'black'; // Reset to black when cursor leaves
    document.removeEventListener('mousemove', updateMultiColorGlow);
});

function updateMultiColorGlow(e) {
    // Get the mouse position relative to the card
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create a multi-color radial gradient at the mouse position
    card.style.background = `
        radial-gradient(circle at ${x}px ${y}px, 
        rgba(255, 0, 0, 0.8) 0px,     /* Red */
        rgba(255, 165, 0, 0.8) 20px,  /* Orange */
        rgba(0, 255, 0, 0.8) 40px,    /* Green */
        rgba(0, 0, 255, 0.8) 60px,    /* Blue */
        rgba(128, 0, 128, 0.8) 80px,  /* Purple */
        transparent 100px)
    `;
}

