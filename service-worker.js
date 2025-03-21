// service-worker.js - simplified version
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // Get the URL from the request
  const url = new URL(event.request.url);
  
  // Only intercept our site's URLs
  if (url.origin === self.location.origin) {
    // Look for the query parameter
    const query = url.searchParams.get('q');
    
    if (query) {
      // Count words by splitting on whitespace
      const words = query.trim().split(/\s+/).filter(word => word.length > 0);
      
      // Decide which search engine to use
      let destination;
      if (words.length <= 3) {
        // Google for 3 words or less
        destination = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      } else {
        // Perplexity for more than 3 words
        destination = `https://www.perplexity.ai/search?q=${encodeURIComponent(query)}`;
      }
      
      // Respond with a redirect
      event.respondWith(
        Response.redirect(destination, 302)
      );
      return;
    }
  }
  
  // For all other requests, proceed normally
  event.respondWith(fetch(event.request));
});
