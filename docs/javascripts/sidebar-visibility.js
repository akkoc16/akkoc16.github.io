document.addEventListener('DOMContentLoaded', function() {
    const primarySidebar = document.querySelector('.md-sidebar--primary');
    const secondarySidebar = document.querySelector('.md-sidebar--secondary');
    const content = document.querySelector('.md-content');

    function toggleSidebarVisibility() {
        // Check if the current URL path starts with '/blog/' or a sub-path within blog structure
        // MkDocs creates paths like /blog/kubernetes/kubernetes-up&running/ for nested items
        const isBlogPage = window.location.pathname.includes('/blog/') ||
                           window.location.pathname.includes('/kubernetes/') ||
                           window.location.pathname.includes('/cicd/') ||
                           window.location.pathname.includes('/monitoring/') ||
                           window.location.pathname.includes('/security/');

        if (isBlogPage) {
            if (primarySidebar) {
                primarySidebar.style.display = 'block';
            }
            if (secondarySidebar) {
                secondarySidebar.style.display = 'block';
            }
            if (content) {
                content.style.marginLeft = 'var(--md-sidebar-width)';
                content.style.maxWidth = 'calc(100% - var(--md-sidebar-width))';
            }
        } else {
            if (primarySidebar) {
                primarySidebar.style.display = 'none';
            }
            if (secondarySidebar) {
                secondarySidebar.style.display = 'none';
            }
            if (content) {
                content.style.marginLeft = '0';
                content.style.maxWidth = '100%';
            }
        }
    }

    // Run on initial load
    toggleSidebarVisibility();

    // Run on navigation changes (for single-page application like behavior in MkDocs Material)
    window.addEventListener('hashchange', toggleSidebarVisibility);
    window.addEventListener('popstate', toggleSidebarVisibility); // For back/forward button

    // Observe DOM changes to re-evaluate sidebar visibility if content changes dynamically
    const observer = new MutationObserver(toggleSidebarVisibility);
    if (content) {
        observer.observe(content, { childList: true, subtree: true });
    }
}); 