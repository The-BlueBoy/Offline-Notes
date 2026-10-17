# Offline-Notes
It's a PWA Website.

OFFLINE NOTES PWA — SLE PROJECT

Files:
- index.html          Main website structure
- style.css           Responsive design and styling
- app.js              Notes functionality and service-worker registration
- manifest.json       PWA application details and icons
- service-worker.js   Caching lifecycle and offline fetch handling
- icons/              App icons used by the manifest

HOW TO RUN
1. Extract this ZIP folder.
2. Open the folder in Visual Studio Code.
3. Run it through a local development server, such as the VS Code Live Server extension.
   Do not open index.html directly using file://; service workers require HTTPS or localhost.
4. Visit the local URL, such as http://127.0.0.1:5500/.
5. Reload once and check DevTools > Application to see the Manifest, Service Workers, and Cache Storage.
6. To test offline, first load the app online. In Chrome DevTools > Network, select Offline and reload.
   The cached app shell should still load. Notes are saved in localStorage on that browser/device.

HOW EACH NOTICE REQUIREMENT IS MET
1. manifest.json: name, short_name, start_url, display mode, theme/background colors, and icons.
2. Service worker registration: app.js calls navigator.serviceWorker.register().
3. Cache API: service-worker.js caches essential files during the install event.
4. Fetch event: service-worker.js checks the cache first, then tries the network, and uses the cached
   index.html for offline page navigation.

NOTES
- Service workers work on localhost or HTTPS, not by directly opening a file:// page.
- The optional Google Fonts import is decorative; the app does not depend on it to work.
- Notes are stored locally in your browser using localStorage; they are not synced across devices.
- For deployment, upload all files while preserving the folder structure to an HTTPS host.
OFFLINE NOTES PWA — SLE PROJECT

Files:
- index.html          Main website structure
- style.css           Responsive design and styling
- app.js              Notes functionality and service-worker registration
- manifest.json       PWA application details and icons
- service-worker.js   Caching lifecycle and offline fetch handling
- icons/              App icons used by the manifest

HOW TO RUN
1. Extract this ZIP folder.
2. Open the folder in Visual Studio Code.
3. Run it through a local development server, such as the VS Code Live Server extension.
   Do not open index.html directly using file://; service workers require HTTPS or localhost.
4. Visit the local URL, such as http://127.0.0.1:5500/.
5. Reload once and check DevTools > Application to see the Manifest, Service Workers, and Cache Storage.
6. To test offline, first load the app online. In Chrome DevTools > Network, select Offline and reload.
   The cached app shell should still load. Notes are saved in localStorage on that browser/device.

HOW EACH NOTICE REQUIREMENT IS MET
1. manifest.json: name, short_name, start_url, display mode, theme/background colors, and icons.
2. Service worker registration: app.js calls navigator.serviceWorker.register().
3. Cache API: service-worker.js caches essential files during the install event.
4. Fetch event: service-worker.js checks the cache first, then tries the network, and uses the cached
   index.html for offline page navigation.

NOTES
- Service workers work on localhost or HTTPS, not by directly opening a file:// page.
- The optional Google Fonts import is decorative; the app does not depend on it to work.
- Notes are stored locally in your browser using localStorage; they are not synced across devices.
- For deployment, upload all files while preserving the folder structure to an HTTPS host.
