/* =============================================================
   CLIMATIC WIDGET — Embeddable Loader
   Drop this script into any page to inject the climatic scene
   as a background iframe with scoped styles.

   Usage:
     <script src="https://your-cdn.com/climatic/widget.js"></script>

   Or with options:
     <script src="widget.js"
       data-mode="background"
       data-z-index="-1"
       data-opacity="0.5"
       data-base-url="https://your-cdn.com/climatic/">
     </script>
   ============================================================= */

(function () {
  'use strict';

  function inject() {
    var script = document.currentScript ||
      document.querySelector('script[src*="widget.js"]');

    var mode = (script && script.getAttribute('data-mode')) || 'background';
    var zIndex = (script && script.getAttribute('data-z-index')) || '-1';
    var opacity = (script && script.getAttribute('data-opacity')) || '1';
    var baseUrl = (script && script.getAttribute('data-base-url')) || '';

    // Resolve base URL relative to script src
    if (!baseUrl && script && script.src) {
      baseUrl = script.src.substring(0, script.src.lastIndexOf('/') + 1);
    }

    var iframe = document.createElement('iframe');
    iframe.src = baseUrl + 'index.html' + window.location.search;
    iframe.setAttribute('title', 'Climatic Scene');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.setAttribute('loading', 'lazy');
    iframe.frameBorder = '0';
    iframe.allowTransparency = true;

    var styles = {
      border: 'none',
      margin: '0',
      padding: '0',
      overflow: 'hidden'
    };

    if (mode === 'background') {
      styles.position = 'fixed';
      styles.top = '0';
      styles.left = '0';
      styles.width = '100vw';
      styles.height = '100vh';
      styles.zIndex = zIndex;
      styles.opacity = opacity;
      styles.pointerEvents = 'none';
    } else {
      // Inline / contained mode
      styles.width = (script && script.getAttribute('data-width')) || '100%';
      styles.height = (script && script.getAttribute('data-height')) || '400px';
      styles.display = 'block';
    }

    Object.keys(styles).forEach(function (key) {
      iframe.style[key] = styles[key];
    });

    if (mode === 'background') {
      document.body.insertBefore(iframe, document.body.firstChild);
    } else if (script && script.parentNode) {
      script.parentNode.insertBefore(iframe, script.nextSibling);
    } else {
      document.body.appendChild(iframe);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
