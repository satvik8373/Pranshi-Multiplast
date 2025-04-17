// Function to inject favicons directly
function injectFavicons() {
    const faviconLinks = [
        { rel: 'icon', type: 'image/png', href: '/images/favicon/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/images/favicon/favicon.svg' },
        { rel: 'shortcut icon', href: '/images/favicon/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/favicon/apple-touch-icon.png' },
        { rel: 'manifest', href: '/images/favicon/site.webmanifest' },
        { rel: 'icon', href: '/images/favicon/favicon.ico' } // Fallback favicon
    ];

    // Remove any existing favicon links
    const existingLinks = document.head.querySelectorAll('link[rel*="icon"], link[rel="manifest"]');
    existingLinks.forEach(link => link.remove());

    // Add new favicon links
    faviconLinks.forEach(linkData => {
        const link = document.createElement('link');
        Object.keys(linkData).forEach(key => {
            link.setAttribute(key, linkData[key]);
        });
        document.head.appendChild(link);
    });
}

// Execute immediately if document is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFavicons);
} else {
    injectFavicons();
} 