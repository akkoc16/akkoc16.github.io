// Cookie banner functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        // Create banner element
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <p>Bu web sitesi, deneyiminizi geliştirmek için çerezleri kullanmaktadır. 
                Google Analytics ile site kullanımınızı anonim olarak takip ediyoruz. 
                Devam ederek çerez kullanımını kabul etmiş olursunuz.</p>
                <div class="cookie-banner-buttons">
                    <button id="accept-cookies" class="md-button md-button--primary">Kabul Et</button>
                    <button id="reject-cookies" class="md-button">Reddet</button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);

        // Add event listeners
        document.getElementById('accept-cookies').addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            banner.style.display = 'none';
            // Enable Google Analytics
            window['ga-disable-G-7T35J3H6L0'] = false;
        });

        document.getElementById('reject-cookies').addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'false');
            banner.style.display = 'none';
            // Disable Google Analytics
            window['ga-disable-G-7T35J3H6L0'] = true;
        });
    } else {
        // Set Google Analytics state based on previous choice
        window['ga-disable-G-7T35J3H6L0'] = localStorage.getItem('cookiesAccepted') === 'false';
    }
}); 