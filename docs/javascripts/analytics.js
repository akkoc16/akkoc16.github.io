/* Google Analytics 4 Configuration */
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

/* Page View Tracking */
document.addEventListener("DOMContentLoaded", function() {
  gtag('config', 'G-7T35J3H6L0', {
    'page_title' : document.title,
    'page_location': window.location.href,
    'page_path': window.location.pathname
  });
});

/* Outbound Link Tracking */
document.addEventListener("click", function(e) {
  if (e.target.tagName === 'A' && e.target.hostname !== window.location.hostname) {
    gtag('event', 'click', {
      'event_category': 'outbound',
      'event_label': e.target.href,
      'transport_type': 'beacon'
    });
  }
});

/* Search Tracking */
document.addEventListener("keyup", function(e) {
  if (e.target.matches('.md-search__input')) {
    gtag('event', 'search', {
      'search_term': e.target.value
    });
  }
}); 