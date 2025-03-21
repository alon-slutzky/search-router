<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search Router</title>
    <!-- Service Worker Registration -->
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/search-router/service-worker.js', {
                    scope: '/search-router/'
                }).then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }).catch(function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }
    </script>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            line-height: 1.6;
        }
        .container {
            background-color: #f5f5f5;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            margin-top: 0;
        }
        code {
            background-color: #eee;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
        }
        .setup-steps {
            margin-top: 30px;
        }
        .setup-steps li {
            margin-bottom: 15px;
        }
        .note {
            background-color: #fffde7;
            border-left: 4px solid #ffd600;
            padding: 15px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Search Router</h1>
        <p>This service routes your searches to different search engines based on query length:</p>
        <ul>
            <li><strong>3 words or less:</strong> Google</li>
            <li><strong>More than 3 words:</strong> Perplexity.ai</li>
        </ul>

        <div class="note">
            <p>If you're seeing this page, it means you've accessed the service directly instead of through a search query.</p>
        </div>

        <div class="setup-steps">
            <h2>How to Set Up in Chrome</h2>
            <ol>
                <li>Go to Chrome Settings → Search engine → Manage search engines and site search</li>
                <li>Under "Site search" click "Add"</li>
                <li>Fill in the following details:
                    <ul>
                        <li><strong>Search engine:</strong> Smart Router</li>
                        <li><strong>Shortcut:</strong> router (or any keyword you prefer)</li>
                        <li><strong>URL:</strong> <code>https://yourserver.com/router?q=%s</code></li>
                    </ul>
                </li>
                <li>Click "Add"</li>
                <li>Optional: Make it your default search engine</li>
            </ol>
        </div>
    </div>

    <script>
        // The service worker will handle the redirect before the page even loads
        // This is just a fallback in case the service worker isn't working
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        
        if (query) {
            const words = query.trim().split(/\s+/).filter(word => word.length > 0);
            
            if (words.length <= 3) {
                window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            } else {
                window.location.href = `https://www.perplexity.ai/search?q=${encodeURIComponent(query)}`;
            }
        }
    </script>
</body>
</html>
