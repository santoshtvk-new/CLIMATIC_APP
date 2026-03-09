/**
 * Build Script — Bundles HTML + CSS + JS into a single self-contained climatic.bundle.js
 * 
 * Run: node build.js
 * Output: dist/climatic.bundle.js (single CDN-ready file)
 * 
 * This produces a ~35KB JS file that anyone can drop into their page:
 *   <script src="climatic.bundle.js"></script>
 * 
 * Or with options:
 *   <script src="climatic.bundle.js" data-mode="background" data-opacity="0.5"></script>
 */

const fs = require('fs');
const path = require('path');

const SRC = __dirname;
const DIST = path.join(SRC, 'dist');

// Read source files
const css = fs.readFileSync(path.join(SRC, 'climatic.css'), 'utf8');
const js = fs.readFileSync(path.join(SRC, 'climatic.js'), 'utf8');
const html = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8');

// Extract just the <body> inner content (between <body> and </body>)
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
const bodyContent = bodyMatch ? bodyMatch[1] : '';

// Remove the <script src="climatic.js"></script> from body (we'll inline it)
const bodyClean = bodyContent
  .replace(/<script\s+src=["']climatic\.js["'][^>]*><\/script>/gi, '')
  .replace(/<link[^>]*climatic\.css[^>]*>/gi, '')
  .trim();

// Remove the <template> tags — we'll keep them in the body
// (templates work inside iframes)

// Escape backticks and backslashes for template literal embedding
function escapeForTemplateLiteral(str) {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

const escapedCSS = escapeForTemplateLiteral(css);
const escapedHTML = escapeForTemplateLiteral(bodyClean);
const escapedJS = escapeForTemplateLiteral(js);

// Build the bundle
const bundle = `/*! Climatic Widget v1.0.0 | github.com/user/climatic | MIT License */
/*  Single-file CDN bundle — drop this script into any page.
 *
 *  USAGE:
 *    <script src="climatic.bundle.js"></script>
 *
 *  OPTIONS (via data attributes on the script tag):
 *    data-mode="background"   → fixed fullscreen behind content (default)
 *    data-mode="inline"       → inline widget at script position
 *    data-z-index="-1"        → z-index of the widget (default: -1)
 *    data-opacity="1"         → opacity 0-1 (default: 1)
 *    data-width="100%"        → width for inline mode (default: 100%)
 *    data-height="400px"      → height for inline mode (default: 400px)
 */
(function() {
  'use strict';

  var SCRIPT = document.currentScript || document.querySelector('script[src*="climatic"]');

  var mode    = attr('data-mode')     || 'background';
  var zIndex  = attr('data-z-index')  || '-1';
  var opacity = attr('data-opacity')  || '1';
  var width   = attr('data-width')    || '100%';
  var height  = attr('data-height')   || '400px';

  function attr(name) { return SCRIPT && SCRIPT.getAttribute(name); }

  function boot() {
    // Build the full HTML document as a data URI
    var fullHTML = '<!DOCTYPE html><html><head>' +
      '<meta charset="UTF-8">' +
      '<meta name="viewport" content="width=device-width,initial-scale=1.0">' +
      '<style>' + CSS + '</style>' +
      '</head><body>' + HTML + '<scr' + 'ipt>' + JS + '</scr' + 'ipt></body></html>';

    var blob = new Blob([fullHTML], { type: 'text/html' });
    var url  = URL.createObjectURL(blob);

    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.title = 'Climatic Scene';
    iframe.setAttribute('aria-hidden', 'true');
    iframe.frameBorder = '0';

    var s = iframe.style;
    s.border   = 'none';
    s.margin   = '0';
    s.padding  = '0';
    s.overflow = 'hidden';

    if (mode === 'background') {
      s.position      = 'fixed';
      s.top           = '0';
      s.left          = '0';
      s.width         = '100vw';
      s.height        = '100vh';
      s.zIndex        = zIndex;
      s.opacity       = opacity;
      s.pointerEvents = 'none';
      document.body.insertBefore(iframe, document.body.firstChild);
    } else {
      s.width   = width;
      s.height  = height;
      s.display = 'block';
      if (SCRIPT && SCRIPT.parentNode) {
        SCRIPT.parentNode.insertBefore(iframe, SCRIPT.nextSibling);
      } else {
        document.body.appendChild(iframe);
      }
    }
  }

  // ---- Inlined Assets ----
  var CSS = \`${escapedCSS}\`;

  var HTML = \`${escapedHTML}\`;

  var JS = \`${escapedJS}\`;

  // ---- Boot ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
`;

// Write output
if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });

const outPath = path.join(DIST, 'climatic.bundle.js');
fs.writeFileSync(outPath, bundle, 'utf8');

const sizeKB = (Buffer.byteLength(bundle, 'utf8') / 1024).toFixed(1);
console.log('✓ Built dist/climatic.bundle.js (' + sizeKB + ' KB)');

// Also create a demo page
const demoLines = [
  '<!DOCTYPE html>',
  '<html lang="en">',
  '<head>',
  '  <meta charset="UTF-8">',
  '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
  '  <title>Climatic Widget Demo</title>',
  '  <style>',
  '    body { margin:0; padding:40px; font-family:"Segoe UI",system-ui,sans-serif; min-height:100vh; color:white; }',
  '    h1 { text-shadow:0 2px 10px rgba(0,0,0,0.5); }',
  '    .card { background:rgba(255,255,255,0.1); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.2); padding:24px; border-radius:12px; max-width:500px; margin-top:20px; }',
  '    code { background:rgba(0,0,0,0.3); padding:2px 6px; border-radius:4px; font-size:14px; }',
  '    pre { background:rgba(0,0,0,0.4); padding:16px; border-radius:8px; overflow-x:auto; font-size:13px; line-height:1.5; }',
  '  </style>',
  '</head>',
  '<body>',
  '  <script src="climatic.bundle.js"></script>',
  '  <h1>Climatic Widget</h1>',
  '  <div class="card">',
  '    <p>The background is a <strong>live weather scene</strong> reflecting your real-time location, weather, time of day, and moon phase.</p>',
  '    <p>Powered by a single <code>&lt;script&gt;</code> tag:</p>',
  '    <pre>&lt;script src="climatic.bundle.js"&gt;&lt;/script&gt;</pre>',
  '  </div>',
  '</body>',
  '</html>'
];

fs.writeFileSync(path.join(DIST, 'demo.html'), demoLines.join('\n'), 'utf8');
console.log('✓ Built dist/demo.html');

