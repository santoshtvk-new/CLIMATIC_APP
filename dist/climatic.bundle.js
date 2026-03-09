/*! Climatic Widget v1.0.0 | github.com/user/climatic | MIT License */
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
  var CSS = `/* =============================================================
   CLIMATIC WIDGET — Pure CSS Visual Engine
   All weather, time, and seasonal visuals via CSS layers.
   JS drives state via CSS custom properties on :root.
   ============================================================= */

/* ---------- Custom Properties (defaults = clear day, spring) ---------- */
:root {
  /* Sky */
  --sky-top: #1e90ff;
  --sky-mid: #87CEEB;
  --sky-bottom: #b0e0e6;
  /* Ambient light */
  --ambient: 1;
  /* Stars */
  --stars-opacity: 0;
  /* Celestial positions (% of viewport) */
  --sun-x: 50%;
  --sun-y: 30%;
  --sun-opacity: 1;
  --sun-scale: 1;
  --moon-x: 50%;
  --moon-y: 30%;
  --moon-opacity: 0;
  --moon-scale: 1;
  /* Clouds */
  --cloud-opacity: 0;
  --cloud-color: rgba(255,255,255,0.9);
  --cloud-speed: 40s;
  /* Precipitation */
  --rain-opacity: 0;
  --snow-opacity: 0;
  /* Lightning */
  --lightning-opacity: 0;
  /* Fog */
  --fog-opacity: 0;
  /* Wind */
  --wind-opacity: 0;
  --wind-speed: 3s;
  --wind-angle: 15deg;
  /* Ground */
  --ground-color-1: #4CAF50;
  --ground-color-2: #388E3C;
  --ground-color-3: #2E7D32;
  --ground-height: 18%;
  /* Creatures */
  --owl-opacity: 0;
  --bird-opacity: 1;
  --firefly-opacity: 0;
  /* Wet surface */
  --wet-opacity: 0;
  /* Snow ground */
  --snow-ground-opacity: 0;
  /* Fallen leaves */
  --leaves-opacity: 0;
  /* Sun color temp */
  --sun-hue: 0deg;
  --sun-warmth: 1;
  /* Torch / flashlight */
  --torch-x: -9999px;
  --torch-y: -9999px;
  --torch-radius: 250px;
  --torch-intensity: 0;
}

/* ---------- Reset & Base ---------- */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
}

#climatic-scene {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transition: opacity 3s ease;
}

/* ====================== LAYER 1: SKY ====================== */
.sky {
  background: linear-gradient(
    180deg,
    var(--sky-top) 0%,
    var(--sky-mid) 45%,
    var(--sky-bottom) 100%
  );
  transition: background 4s ease;
  z-index: 1;
}

/* Horizon glow (dawn/dusk) */
.sky::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: radial-gradient(
    ellipse at 50% 100%,
    var(--sky-bottom) 0%,
    transparent 70%
  );
  opacity: 0.5;
}

/* ====================== LAYER 2: STARS ====================== */
.stars {
  z-index: 2;
  opacity: var(--stars-opacity);
  transition: opacity 4s ease;
}

.star {
  position: absolute;
  border-radius: 50%;
  background: white;
  animation: twinkle var(--twinkle-dur, 3s) ease-in-out infinite alternate;
  animation-delay: var(--twinkle-delay, 0s);
}

.star.small { width: 2px; height: 2px; }
.star.medium { width: 3px; height: 3px; }
.star.large {
  width: 4px;
  height: 4px;
  box-shadow: 0 0 6px 1px rgba(255,255,255,0.5);
}

@keyframes twinkle {
  0% { opacity: 0.2; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1.2); }
}

/* Shooting star */
.shooting-star {
  position: absolute;
  width: 3px;
  height: 3px;
  background: white;
  border-radius: 50%;
  opacity: 0;
  animation: shoot 1.5s ease-out forwards;
  box-shadow: 0 0 8px 2px rgba(255,255,255,0.6);
}

.shooting-star::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 100%;
  width: 60px;
  height: 1px;
  background: linear-gradient(to left, white, transparent);
  transform: translateY(-50%);
}

@keyframes shoot {
  0% { opacity: 1; transform: translate(0,0) rotate(-30deg); }
  100% { opacity: 0; transform: translate(-300px, 200px) rotate(-30deg); }
}

/* ====================== LAYER 3: CELESTIAL BODIES ====================== */
.celestial {
  z-index: 3;
}

.sun {
  position: absolute;
  width: 120px;
  height: 120px;
  left: var(--sun-x);
  top: var(--sun-y);
  transform: translate(-50%, -50%);
  opacity: var(--sun-opacity);
  transition: left 60s linear, top 60s linear, opacity 3s ease;
  filter: drop-shadow(0 0 30px rgba(255,215,0,0.6));
}

.sun svg {
  width: 100%;
  height: 100%;
}

.sun-rays {
  animation: rotate-rays 20s linear infinite;
  transform-origin: 50px 50px;
}

@keyframes rotate-rays {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Sun color warmth (redder at horizon) */
.sun svg circle:nth-child(3) {
  transition: fill 3s ease;
}

.moon {
  position: absolute;
  width: 100px;
  height: 100px;
  left: var(--moon-x);
  top: var(--moon-y);
  transform: translate(-50%, -50%);
  opacity: var(--moon-opacity);
  transition: left 60s linear, top 60s linear, opacity 3s ease;
  filter: drop-shadow(0 0 20px rgba(200,210,255,0.4));
}

.moon svg {
  width: 100%;
  height: 100%;
}

/* ====================== LAYER 4: CLOUDS ====================== */
.clouds {
  z-index: 4;
}

.cloud {
  position: absolute;
  color: var(--cloud-color);
  opacity: var(--cloud-opacity);
  animation: cloud-drift var(--cloud-speed) linear infinite;
  transition: opacity 3s ease, color 3s ease;
}

.cloud svg {
  width: 100%;
  height: 100%;
  filter: blur(1px);
}

.cloud.cloud-sm { width: 120px; height: 60px; }
.cloud.cloud-md { width: 200px; height: 100px; }
.cloud.cloud-lg { width: 300px; height: 140px; }

@keyframes cloud-drift {
  0% { transform: translateX(-120%); }
  100% { transform: translateX(calc(100vw + 120%)); }
}

/* Dark clouds for storms */
.cloud.storm {
  color: rgba(60, 60, 75, 0.95);
  filter: none;
}

/* ====================== LAYER 5: PRECIPITATION ====================== */
.precipitation {
  z-index: 5;
}

/* --- Rain --- */
.raindrop {
  position: absolute;
  width: 2px;
  background: linear-gradient(to bottom, transparent, rgba(174, 194, 224, 0.6));
  opacity: var(--rain-opacity);
  animation: rain-fall var(--rain-speed, 0.8s) linear infinite;
  animation-delay: var(--rain-delay, 0s);
}

@keyframes rain-fall {
  0% {
    transform: translateY(-100%) translateX(0);
    opacity: 0;
  }
  10% { opacity: var(--rain-opacity); }
  90% { opacity: var(--rain-opacity); }
  100% {
    transform: translateY(100vh) translateX(calc(var(--wind-offset, 0) * 1px));
    opacity: 0;
  }
}

/* Rain splash at ground */
.rain-splash {
  position: absolute;
  bottom: var(--ground-height);
  width: 6px;
  height: 3px;
  border-radius: 50%;
  background: rgba(174, 194, 224, 0.4);
  opacity: 0;
  animation: splash 0.6s ease-out forwards;
}

@keyframes splash {
  0% { transform: scale(0); opacity: 0.8; }
  100% { transform: scale(3, 1); opacity: 0; }
}

/* --- Snow --- */
.snowflake {
  position: absolute;
  border-radius: 50%;
  background: white;
  opacity: var(--snow-opacity);
  animation: snowfall var(--snow-speed, 5s) linear infinite;
  animation-delay: var(--snow-delay, 0s);
  box-shadow: 0 0 4px rgba(255,255,255,0.6);
}

@keyframes snowfall {
  0% {
    transform: translateY(-5%) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% { opacity: var(--snow-opacity); }
  90% { opacity: var(--snow-opacity); }
  100% {
    transform: translateY(100vh) translateX(calc(var(--sway, 30) * 1px)) rotate(360deg);
    opacity: 0;
  }
}

/* ====================== LAYER 6: LIGHTNING ====================== */
.lightning {
  z-index: 6;
  pointer-events: none;
}

.lightning-flash {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,0.3);
  opacity: 0;
  animation: flash 0.15s ease-out forwards;
}

@keyframes flash {
  0% { opacity: 0; }
  10% { opacity: 0.9; }
  20% { opacity: 0.2; }
  30% { opacity: 0.8; }
  50% { opacity: 0; }
  100% { opacity: 0; }
}

/* Lightning bolt shape */
.lightning-bolt {
  position: absolute;
  width: 4px;
  opacity: 0;
  animation: bolt-flash 0.3s ease-out forwards;
}

.lightning-bolt svg {
  width: 100%;
  height: 100%;
}

@keyframes bolt-flash {
  0% { opacity: 0; }
  5% { opacity: 1; }
  15% { opacity: 0.3; }
  25% { opacity: 1; }
  40% { opacity: 0; }
  100% { opacity: 0; }
}

/* ====================== LAYER 7: ATMOSPHERE ====================== */
.atmosphere {
  z-index: 7;
}

/* Fog overlay */
.fog-layer {
  position: absolute;
  width: 200%;
  height: 100%;
  opacity: var(--fog-opacity);
  background:
    linear-gradient(90deg,
      transparent 0%,
      rgba(200,200,210,0.3) 20%,
      rgba(200,200,210,0.5) 50%,
      rgba(200,200,210,0.3) 80%,
      transparent 100%
    );
  animation: fog-drift 30s linear infinite;
  transition: opacity 4s ease;
}

.fog-layer:nth-child(2) {
  animation-delay: -15s;
  opacity: calc(var(--fog-opacity) * 0.7);
  top: 10%;
}

@keyframes fog-drift {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
}

/* Wind streaks */
.wind-streak {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
  opacity: var(--wind-opacity);
  transform: rotate(var(--wind-angle));
  animation: wind-blow var(--wind-speed) linear infinite;
}

@keyframes wind-blow {
  0% { transform: translateX(-100%) rotate(var(--wind-angle)); opacity: 0; }
  20% { opacity: var(--wind-opacity); }
  80% { opacity: var(--wind-opacity); }
  100% { transform: translateX(100vw) rotate(var(--wind-angle)); opacity: 0; }
}

/* ====================== LAYER 8: GROUND ====================== */
.ground {
  z-index: 8;
  top: auto;
  bottom: 0;
  height: var(--ground-height);
}

.ground-surface {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    var(--ground-color-1) 0%,
    var(--ground-color-2) 50%,
    var(--ground-color-3) 100%
  );
  transition: background 4s ease;
}

/* Grass blades */
.grass-container {
  position: absolute;
  width: 100%;
  bottom: 100%;
  height: 45px;
  overflow: visible;
}

.grass-blade {
  position: absolute;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to top, var(--ground-color-1), #66BB6A);
  border-radius: 50% 50% 0 0;
  transform-origin: bottom center;
  animation: grass-sway var(--grass-speed, 3s) ease-in-out infinite alternate;
  animation-delay: var(--grass-delay, 0s);
}

@keyframes grass-sway {
  0% { transform: rotate(-5deg); }
  100% { transform: rotate(5deg); }
}

/* Snow cover on ground */
.snow-ground {
  position: absolute;
  width: 100%;
  height: 120%;
  top: -20%;
  background: linear-gradient(
    180deg,
    rgba(255,255,255,0.95) 0%,
    rgba(240,245,255,0.9) 30%,
    rgba(220,230,245,0.85) 100%
  );
  opacity: var(--snow-ground-opacity);
  transition: opacity 4s ease;
  border-radius: 60% 60% 0 0 / 20% 20% 0 0;
}

/* Undulating snow hills */
.snow-ground::before {
  content: '';
  position: absolute;
  top: -15px;
  left: -5%;
  width: 110%;
  height: 30px;
  background: radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.95) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.9) 0%, transparent 45%),
              radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.95) 0%, transparent 50%);
}

/* Wet surface (rain) */
.wet-surface {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(100,130,180,0.3) 100%
  );
  opacity: var(--wet-opacity);
  transition: opacity 3s ease;
}

/* Reflective puddles */
.wet-surface::before {
  content: '';
  position: absolute;
  bottom: 10%;
  left: 15%;
  width: 25%;
  height: 8px;
  background: rgba(150,180,220,0.4);
  border-radius: 50%;
  box-shadow:
    60vw 5px 0 2px rgba(150,180,220,0.3),
    30vw -8px 0 4px rgba(150,180,220,0.25);
}

/* Fallen autumn leaves */
.fallen-leaves {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: var(--leaves-opacity);
  transition: opacity 3s ease;
}

.fallen-leaf {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 0 50%;
  transform: rotate(var(--leaf-rot, 45deg));
}

/* ====================== LAYER 9: CREATURES ====================== */
.creatures {
  z-index: 9;
}

/* Owls */
.owl {
  position: absolute;
  opacity: var(--owl-opacity);
  transition: opacity 4s ease;
}

#owl-1 {
  width: 50px;
  bottom: var(--ground-height);
  right: 12%;
  transform: translateY(-10px);
}

#owl-2 {
  width: 38px;
  bottom: var(--ground-height);
  right: 8%;
  transform: translateY(-5px);
}

.owl svg {
  width: 100%;
  height: auto;
}

/* Owl eye blink */
.owl svg circle:nth-child(5),
.owl svg circle:nth-child(6) {
  animation: owl-blink 3s ease-in-out infinite;
}

@keyframes owl-blink {
  0%, 90%, 100% { opacity: 1}
  95% { opacity: 0}
}

/* Birds */
.bird {
  position: absolute;
  opacity: var(--bird-opacity);
  color: rgba(0,0,0,0.6);
  transition: opacity 4s ease;
}

.bird svg {
  width: 100%;
  height: auto;
}

#bird-1 {
  width: 30px;
  top: 18%;
  animation: bird-fly 18s linear infinite;
}

#bird-2 {
  width: 22px;
  top: 22%;
  animation: bird-fly 22s linear infinite;
  animation-delay: -7s;
}

#bird-3 {
  width: 26px;
  top: 15%;
  animation: bird-fly 25s linear infinite;
  animation-delay: -14s;
}

@keyframes bird-fly {
  0% { left: -10%; transform: translateY(0); }
  25% { transform: translateY(-15px); }
  50% { transform: translateY(5px); }
  75% { transform: translateY(-8px); }
  100% { left: 110%; transform: translateY(0); }
}

/* Bird wing flap */
.bird svg path {
  animation: wing-flap 0.4s ease-in-out infinite alternate;
}

@keyframes wing-flap {
  0% { d: path("M0,10 Q10,2 20,10 Q30,2 40,10"); }
  100% { d: path("M0,10 Q10,14 20,10 Q30,14 40,10"); }
}

/* Fireflies */
.fireflies {
  opacity: var(--firefly-opacity);
  transition: opacity 4s ease;
}

.firefly {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #FFEB3B;
  box-shadow: 0 0 8px 3px rgba(255,235,59,0.5);
  animation:
    firefly-float var(--ff-dur, 6s) ease-in-out infinite alternate,
    firefly-glow 2s ease-in-out infinite alternate;
  animation-delay: var(--ff-delay, 0s);
}

@keyframes firefly-float {
  0% { transform: translate(0, 0); }
  33% { transform: translate(var(--ff-dx1, 20px), var(--ff-dy1, -15px)); }
  66% { transform: translate(var(--ff-dx2, -10px), var(--ff-dy2, 10px)); }
  100% { transform: translate(var(--ff-dx3, 15px), var(--ff-dy3, -20px)); }
}

@keyframes firefly-glow {
  0% { opacity: 0.2; box-shadow: 0 0 4px 1px rgba(255,235,59,0.3); }
  100% { opacity: 1; box-shadow: 0 0 12px 4px rgba(255,235,59,0.6); }
}

/* ====================== RAIN GLASS EFFECT ====================== */
/* Glass droplets overlay for rainy scenarios */
.glass-drop {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle at 35% 35%,
    rgba(255,255,255,0.3),
    rgba(255,255,255,0.1) 50%,
    transparent
  );
  border: 1px solid rgba(255,255,255,0.15);
  box-shadow: inset 0 0 3px rgba(255,255,255,0.1);
  opacity: var(--rain-opacity);
  animation: glass-drip var(--drip-dur, 8s) ease-in infinite;
  animation-delay: var(--drip-delay, 0s);
}

@keyframes glass-drip {
  0% { transform: translateY(0); border-radius: 50%; }
  70% { transform: translateY(0); border-radius: 50%; opacity: var(--rain-opacity); }
  85% { border-radius: 50% 50% 40% 40%; }
  100% { transform: translateY(100vh); opacity: 0; border-radius: 50% 50% 30% 30%; }
}

/* Water trail from glass drops */
.glass-drop::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 40%;
  width: 1px;
  height: 0;
  background: linear-gradient(to bottom, rgba(255,255,255,0.15), transparent);
  animation: drip-trail var(--drip-dur, 8s) ease-in infinite;
  animation-delay: var(--drip-delay, 0s);
}

@keyframes drip-trail {
  0%, 70% { height: 0; }
  100% { height: 40px; }
}

/* ====================== GLOBAL AMBIENT OVERLAY ====================== */
/* Darkness overlay for night / evening — capped at 0.6 so elements stay visible */
/* Torch cursor punches a radial hole in the darkness */
#climatic-scene::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 20, calc(min(1 - var(--ambient), 0.6)));
  z-index: 10;
  pointer-events: none;
  transition: background 4s ease;
  /* Torch punch-through: radial gradient masks a circle around cursor */
  -webkit-mask-image: radial-gradient(
    circle var(--torch-radius) at var(--torch-x) var(--torch-y),
    transparent 0%,
    transparent calc(100% * var(--torch-intensity) * 0.3),
    rgba(0,0,0, calc(1 - var(--torch-intensity) * 0.7)) calc(100% * var(--torch-intensity) * 0.6),
    black 100%
  );
  mask-image: radial-gradient(
    circle var(--torch-radius) at var(--torch-x) var(--torch-y),
    transparent 0%,
    transparent calc(100% * var(--torch-intensity) * 0.3),
    rgba(0,0,0, calc(1 - var(--torch-intensity) * 0.7)) calc(100% * var(--torch-intensity) * 0.6),
    black 100%
  );
}

/* Torch glow — warm light spot that follows cursor */
.torch-glow {
  position: absolute;
  width: calc(var(--torch-radius) * 2.5);
  height: calc(var(--torch-radius) * 2.5);
  left: var(--torch-x);
  top: var(--torch-y);
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    rgba(255, 240, 180, calc(0.12 * var(--torch-intensity))) 0%,
    rgba(255, 220, 140, calc(0.06 * var(--torch-intensity))) 30%,
    transparent 70%
  );
  z-index: 11;
  pointer-events: none;
  opacity: var(--torch-intensity);
  transition: opacity 0.5s ease;
}

/* ====================== RESPONSIVE ====================== */
@media (max-width: 600px) {
  .sun { width: 80px; height: 80px; }
  .moon { width: 70px; height: 70px; }
  .cloud.cloud-lg { width: 180px; height: 90px; }
  .grass-blade { width: 2px; }
  #owl-1 { width: 35px; }
  #owl-2 { width: 28px; }
  .bird svg { width: 80%; }
}
`;

  var HTML = `<div id="climatic-scene">
    <!-- Layer 1: Sky (gradient background via CSS custom props) -->
    <div class="layer sky"></div>

    <!-- Layer 2: Stars -->
    <div class="layer stars" id="stars-layer"></div>

    <!-- Layer 3: Celestial body -->
    <div class="layer celestial">
      <div class="sun" id="sun">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FFF7AE"/>
              <stop offset="40%" stop-color="#FFD700"/>
              <stop offset="100%" stop-color="#FFA500" stop-opacity="0"/>
            </radialGradient>
            <filter id="sunBlur">
              <feGaussianBlur stdDeviation="2"/>
            </filter>
          </defs>
          <circle cx="50" cy="50" r="48" fill="url(#sunGlow)" filter="url(#sunBlur)"/>
          <circle cx="50" cy="50" r="22" fill="#FFE066"/>
          <!-- Sun rays -->
          <g class="sun-rays" opacity="0.6">
            <line x1="50" y1="2" x2="50" y2="18" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
            <line x1="50" y1="82" x2="50" y2="98" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
            <line x1="2" y1="50" x2="18" y2="50" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
            <line x1="82" y1="50" x2="98" y2="50" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
            <line x1="16" y1="16" x2="26" y2="26" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
            <line x1="74" y1="74" x2="84" y2="84" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
            <line x1="84" y1="16" x2="74" y2="26" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
            <line x1="16" y1="84" x2="26" y2="74" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
          </g>
        </svg>
      </div>
      <div class="moon" id="moon">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="rgba(220,230,255,0.4)"/>
              <stop offset="100%" stop-color="rgba(220,230,255,0)" />
            </radialGradient>
            <radialGradient id="moonSurface" cx="40%" cy="40%" r="55%">
              <stop offset="0%" stop-color="#F5F5F0"/>
              <stop offset="50%" stop-color="#E8EAED"/>
              <stop offset="100%" stop-color="#C0C4C8"/>
            </radialGradient>
            <clipPath id="moonClip">
              <circle cx="50" cy="50" r="24"/>
            </clipPath>
          </defs>
          <!-- Outer glow -->
          <circle cx="50" cy="50" r="46" fill="url(#moonGlow)"/>
          <!-- Moon disc (bright part) -->
          <circle cx="50" cy="50" r="24" fill="url(#moonSurface)"/>
          <!-- Craters on bright surface -->
          <circle cx="42" cy="42" r="3" fill="#D0D2D6" opacity="0.5" clip-path="url(#moonClip)"/>
          <circle cx="58" cy="55" r="4" fill="#D0D2D6" opacity="0.4" clip-path="url(#moonClip)"/>
          <circle cx="48" cy="62" r="2.5" fill="#D0D2D6" opacity="0.35" clip-path="url(#moonClip)"/>
          <circle cx="38" cy="53" r="2" fill="#D0D2D6" opacity="0.3" clip-path="url(#moonClip)"/>
          <!-- Shadow circle (moved by JS to create phase) -->
          <circle id="moonShadow" cx="50" cy="50" r="24" fill="#0a0a1a" opacity="0.95" clip-path="url(#moonClip)"/>
        </svg>
      </div>
    </div>

    <!-- Layer 4: Clouds -->
    <div class="layer clouds" id="clouds-layer"></div>

    <!-- Layer 5: Precipitation (rain / snow) -->
    <div class="layer precipitation" id="precip-layer"></div>

    <!-- Layer 6: Lightning -->
    <div class="layer lightning" id="lightning-layer"></div>

    <!-- Layer 7: Atmospheric (fog, wind streaks, heat shimmer) -->
    <div class="layer atmosphere" id="atmosphere-layer"></div>

    <!-- Layer 8: Ground / Foreground -->
    <div class="layer ground" id="ground-layer">
      <div class="ground-surface"></div>
      <!-- Grass blades generated by JS for spring/summer -->
      <div class="grass-container" id="grass-container"></div>
      <!-- Snow cover for winter -->
      <div class="snow-ground" id="snow-ground"></div>
      <!-- Autumn leaves on ground -->
      <div class="fallen-leaves" id="fallen-leaves"></div>
      <!-- Wet surface for rain -->
      <div class="wet-surface" id="wet-surface"></div>
    </div>

    <!-- Layer 9: Creatures / decorations -->
    <div class="layer creatures" id="creatures-layer">
      <!-- Owl SVG  -->
      <div class="owl" id="owl-1">
        <svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="30" cy="40" rx="20" ry="25" fill="#3E2723"/>
          <ellipse cx="30" cy="38" rx="18" ry="22" fill="#4E342E"/>
          <!-- Ears -->
          <polygon points="14,20 10,8 22,18" fill="#3E2723"/>
          <polygon points="46,20 50,8 38,18" fill="#3E2723"/>
          <!-- Eyes -->
          <circle cx="22" cy="34" r="8" fill="#FFF9C4"/>
          <circle cx="38" cy="34" r="8" fill="#FFF9C4"/>
          <circle cx="22" cy="34" r="4" fill="#1A1A1A"/>
          <circle cx="38" cy="34" r="4" fill="#1A1A1A"/>
          <circle cx="23" cy="33" r="1.5" fill="white"/>
          <circle cx="39" cy="33" r="1.5" fill="white"/>
          <!-- Beak -->
          <polygon points="30,40 27,44 33,44" fill="#FF8F00"/>
          <!-- Feet -->
          <path d="M22,63 L18,68 M22,63 L22,68 M22,63 L26,68" stroke="#5D4037" stroke-width="1.5" fill="none"/>
          <path d="M38,63 L34,68 M38,63 L38,68 M38,63 L42,68" stroke="#5D4037" stroke-width="1.5" fill="none"/>
        </svg>
      </div>
      <div class="owl" id="owl-2">
        <svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="30" cy="40" rx="16" ry="20" fill="#3E2723"/>
          <ellipse cx="30" cy="38" rx="14" ry="18" fill="#5D4037"/>
          <polygon points="16,24 13,14 23,22" fill="#3E2723"/>
          <polygon points="44,24 47,14 37,22" fill="#3E2723"/>
          <circle cx="24" cy="34" r="6" fill="#FFF9C4"/>
          <circle cx="36" cy="34" r="6" fill="#FFF9C4"/>
          <circle cx="24" cy="34" r="3" fill="#1A1A1A"/>
          <circle cx="36" cy="34" r="3" fill="#1A1A1A"/>
          <circle cx="25" cy="33" r="1" fill="white"/>
          <circle cx="37" cy="33" r="1" fill="white"/>
          <polygon points="30,39 28,42 32,42" fill="#FF8F00"/>
        </svg>
      </div>
      <!-- Bird silhouettes -->
      <div class="bird" id="bird-1">
        <svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,10 Q10,0 20,10 Q30,0 40,10" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="bird" id="bird-2">
        <svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,10 Q10,0 20,10 Q30,0 40,10" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="bird" id="bird-3">
        <svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,10 Q10,0 20,10 Q30,0 40,10" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
        </svg>
      </div>
      <!-- Fireflies container (summer nights) -->
      <div class="fireflies" id="fireflies-container"></div>
    </div>

    <!-- Torch glow (follows cursor at night) -->
    <div class="torch-glow" id="torch-glow"></div>
  </div>

  <!-- Cloud SVG template (cloned by JS) -->
  <template id="cloud-template">
    <div class="cloud">
      <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="70" cy="60" rx="50" ry="30" fill="currentColor"/>
        <ellipse cx="120" cy="55" rx="40" ry="28" fill="currentColor"/>
        <ellipse cx="95" cy="40" rx="45" ry="32" fill="currentColor"/>
        <ellipse cx="55" cy="55" rx="30" ry="22" fill="currentColor"/>
        <ellipse cx="140" cy="62" rx="30" ry="20" fill="currentColor"/>
      </svg>
    </div>
  </template>`;

  var JS = `/* =============================================================
   CLIMATIC WIDGET — Core Logic Engine
   Geolocation → Weather API → Sun/Moon math → Scene Compositor
   Zero dependencies. Pure vanilla JS.
   ============================================================= */

(function () {
  'use strict';

  // ---- CONSTANTS ----
  const WEATHER_POLL_MS = 15 * 60 * 1000; // 15 min
  const ASTRO_TICK_MS = 60 * 1000;        // 1 min
  const PARTICLE_TICK_MS = 50;            // 50 ms
  const DEG = Math.PI / 180;
  const RAD = 180 / Math.PI;

  // WMO Weather Codes → internal enum
  const WMO = {
    0: 'clear', 1: 'clear', 2: 'partly_cloudy', 3: 'overcast',
    45: 'fog', 48: 'fog',
    51: 'drizzle', 53: 'drizzle', 55: 'drizzle',
    56: 'freezing_drizzle', 57: 'freezing_drizzle',
    61: 'rain', 63: 'rain', 65: 'heavy_rain',
    66: 'freezing_rain', 67: 'freezing_rain',
    71: 'snow', 73: 'snow', 75: 'heavy_snow',
    77: 'snow_grains',
    80: 'rain_showers', 81: 'rain_showers', 82: 'heavy_rain',
    85: 'snow_showers', 86: 'snow_showers',
    95: 'thunderstorm', 96: 'thunderstorm', 99: 'thunderstorm'
  };

  // ---- STATE ----
  let state = {
    lat: 0, lon: 0,
    weather: 'clear',
    weatherCode: 0,
    cloudCover: 0,
    windSpeed: 0,
    temp: 20,
    timeOfDay: 'day',      // dawn, morning, day, afternoon, evening, dusk, night
    sunElevation: 45,
    sunAzimuth: 180,
    moonElevation: -10,
    moonAzimuth: 0,
    moonPhase: 0.5,        // 0 = new, 0.5 = full, 1 = new again
    season: 'spring',
    ready: false
  };

  // ---- DOM REFS ----
  const root = document.documentElement;
  const scene = document.getElementById('climatic-scene');
  const starsLayer = document.getElementById('stars-layer');
  const cloudsLayer = document.getElementById('clouds-layer');
  const precipLayer = document.getElementById('precip-layer');
  const lightningLayer = document.getElementById('lightning-layer');
  const atmosphereLayer = document.getElementById('atmosphere-layer');
  const grassContainer = document.getElementById('grass-container');
  const creaturesLayer = document.getElementById('creatures-layer');
  const firefliesContainer = document.getElementById('fireflies-container');

  // ---- QUERY PARAM OVERRIDES (for testing) ----
  function getOverrides() {
    const p = new URLSearchParams(window.location.search);
    return {
      time: p.get('time'),
      weather: p.get('weather'),
      season: p.get('season'),
      moonphase: p.get('moonphase'),
      lat: p.get('lat') ? parseFloat(p.get('lat')) : null,
      lon: p.get('lon') ? parseFloat(p.get('lon')) : null
    };
  }

  const overrides = getOverrides();

  // ============================================================
  //  GEOLOCATION
  // ============================================================
  function getLocation() {
    return new Promise((resolve) => {
      if (overrides.lat !== null && overrides.lon !== null) {
        resolve({ lat: overrides.lat, lon: overrides.lon });
        return;
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
          () => fallbackLocation(resolve),
          { timeout: 8000, maximumAge: 300000 }
        );
      } else {
        fallbackLocation(resolve);
      }
    });
  }

  function fallbackLocation(resolve) {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(d => resolve({ lat: d.latitude || 28.6, lon: d.longitude || 77.2 }))
      .catch(() => resolve({ lat: 28.6, lon: 77.2 })); // Delhi fallback
  }

  // ============================================================
  //  WEATHER API (Open-Meteo)
  // ============================================================
  async function fetchWeather(lat, lon) {
    try {
      const url = \`https://api.open-meteo.com/v1/forecast?latitude=\${lat}&longitude=\${lon}\` +
        \`&current_weather=true&hourly=cloudcover&timezone=auto\`;
      const res = await fetch(url);
      const data = await res.json();
      const cw = data.current_weather;
      const hourIdx = new Date().getHours();
      state.weatherCode = cw.weathercode;
      state.weather = WMO[cw.weathercode] || 'clear';
      state.windSpeed = cw.windspeed || 0;
      state.temp = cw.temperature || 20;
      state.cloudCover = data.hourly?.cloudcover?.[hourIdx] ?? 0;
    } catch (e) {
      console.warn('Weather fetch failed, using defaults', e);
    }
  }

  // ============================================================
  //  SUN POSITION (Solar Position Algorithm — simplified)
  // ============================================================
  function sunPosition(lat, lon, date) {
    const dayOfYear = getDayOfYear(date);
    const hours = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;

    // Solar declination
    const declination = 23.45 * Math.sin(DEG * (360 / 365) * (dayOfYear - 81));

    // Equation of time (approximate)
    const B = (360 / 365) * (dayOfYear - 81) * DEG;
    const EoT = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);

    // True solar time
    const solarNoon = 12 - lon / 15 - EoT / 60 + getTimezoneOffsetHours(date);
    const hourAngle = 15 * (hours - solarNoon);

    // Elevation
    const elevation = RAD * Math.asin(
      Math.sin(lat * DEG) * Math.sin(declination * DEG) +
      Math.cos(lat * DEG) * Math.cos(declination * DEG) * Math.cos(hourAngle * DEG)
    );

    // Azimuth
    let azimuth = RAD * Math.acos(
      (Math.sin(declination * DEG) - Math.sin(lat * DEG) * Math.sin(elevation * DEG)) /
      (Math.cos(lat * DEG) * Math.cos(elevation * DEG))
    );
    if (hourAngle > 0) azimuth = 360 - azimuth;

    return { elevation, azimuth };
  }

  function getTimezoneOffsetHours(date) {
    return -date.getTimezoneOffset() / 60;
  }

  function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    return Math.floor((date - start) / 86400000);
  }

  // ============================================================
  //  MOON PHASE & POSITION
  // ============================================================
  function moonPhase(date) {
    // Known new moon: Jan 6, 2000 18:14 UTC
    const knownNew = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
    const synodic = 29.53058867;
    const daysSince = (date.getTime() - knownNew.getTime()) / 86400000;
    const phase = ((daysSince % synodic) + synodic) % synodic;
    return phase / synodic; // 0 = new, 0.5 = full, 1 = new
  }

  function moonPosition(lat, lon, date) {
    // Simplified geocentric lunar position
    const dayOfYear = getDayOfYear(date);
    const hours = date.getHours() + date.getMinutes() / 60;
    const phase = moonPhase(date);

    // Moon rises ~50 min later each day, roughly opposite sun at full moon
    const moonHourAngle = (hours - 12) * 15 + phase * 360 - lon;
    const declination = 23.45 * Math.sin(DEG * (360 / 365) * (dayOfYear - 81)) * -Math.cos(phase * Math.PI * 2);

    // Rough elevation
    const elevation = RAD * Math.asin(
      Math.sin(lat * DEG) * Math.sin(declination * DEG) +
      Math.cos(lat * DEG) * Math.cos(declination * DEG) * Math.cos(moonHourAngle * DEG)
    );

    // Rough azimuth
    let azimuth = (moonHourAngle + 180) % 360;

    return { elevation: Math.max(-90, Math.min(90, elevation)), azimuth };
  }

  // ============================================================
  //  SEASON DETECTION
  // ============================================================
  function detectSeason(lat, date) {
    const month = date.getMonth(); // 0-11
    const isNorthern = lat >= 0;
    if (isNorthern) {
      if (month >= 2 && month <= 4) return 'spring';
      if (month >= 5 && month <= 7) return 'summer';
      if (month >= 8 && month <= 10) return 'autumn';
      return 'winter';
    } else {
      if (month >= 2 && month <= 4) return 'autumn';
      if (month >= 5 && month <= 7) return 'winter';
      if (month >= 8 && month <= 10) return 'spring';
      return 'summer';
    }
  }

  // ============================================================
  //  TIME OF DAY
  // ============================================================
  function getTimeOfDay(sunElev) {
    if (overrides.time) return overrides.time;
    if (sunElev > 30) return 'day';
    if (sunElev > 15) return 'afternoon';
    if (sunElev > 5) return 'morning';
    if (sunElev > -1) return 'dawn';
    if (sunElev > -6) return 'dusk';
    if (sunElev > -12) return 'evening';
    return 'night';
  }

  // ============================================================
  //  APPLY OVERRIDES
  // ============================================================
  function applyOverrides() {
    if (overrides.weather) state.weather = overrides.weather;
    if (overrides.season) state.season = overrides.season;
    if (overrides.time) state.timeOfDay = overrides.time;
    if (overrides.moonphase) {
      const mp = {
        'new': 0, 'waxing_crescent': 0.125, 'first_quarter': 0.25,
        'waxing_gibbous': 0.375, 'full': 0.5, 'waning_gibbous': 0.625,
        'last_quarter': 0.75, 'waning_crescent': 0.875
      };
      state.moonPhase = mp[overrides.moonphase] ?? 0.5;
    }
    // Force time overrides to adjust sun elevation for rendering
    if (overrides.time) {
      const timeElevMap = {
        'dawn': 2, 'morning': 20, 'day': 50, 'afternoon': 35,
        'evening': -8, 'dusk': -3, 'night': -30
      };
      state.sunElevation = timeElevMap[overrides.time] ?? 50;
      // If night/evening/dusk, show moon
      if (['night', 'evening', 'dusk'].includes(overrides.time)) {
        state.moonElevation = 40;
      } else {
        state.moonElevation = -10;
      }
    }
  }

  // ============================================================
  //  SCENE COMPOSITOR — Sets CSS custom properties
  // ============================================================
  function compositeScene() {
    const tod = state.timeOfDay;
    const weather = state.weather;
    const season = state.season;
    const phase = state.moonPhase;

    // ---- SKY COLORS ----
    const skyThemes = {
      dawn:      { top: '#2c1654', mid: '#b44e75', bottom: '#f7a94e' },
      morning:   { top: '#4a90d9', mid: '#87CEEB', bottom: '#f0e6c0' },
      day:       { top: '#1e90ff', mid: '#87CEEB', bottom: '#b0e0e6' },
      afternoon: { top: '#2878c8', mid: '#6bb3d9', bottom: '#d4a96a' },
      evening:   { top: '#1a1040', mid: '#3a2060', bottom: '#c45030' },
      dusk:      { top: '#1e1040', mid: '#6b3a6b', bottom: '#e87040' },
      night:     { top: '#0a0a1a', mid: '#0f0f2a', bottom: '#151530' }
    };

    let sky = skyThemes[tod] || skyThemes.day;

    // Cloudy skies are greyer
    if (state.cloudCover > 60 || ['overcast', 'fog'].includes(weather)) {
      sky = mixSky(sky, { top: '#5a5a6a', mid: '#7a7a8a', bottom: '#8a8a9a' }, 0.5);
    }

    setVar('--sky-top', sky.top);
    setVar('--sky-mid', sky.mid);
    setVar('--sky-bottom', sky.bottom);

    // ---- AMBIENT ----
    const ambientMap = {
      dawn: 0.55, morning: 0.85, day: 1, afternoon: 0.9,
      evening: 0.25, dusk: 0.4, night: 0.1
    };
    let ambient = ambientMap[tod] ?? 1;
    if (state.cloudCover > 70) ambient *= 0.85;
    if (['rain', 'heavy_rain', 'thunderstorm'].includes(weather)) ambient *= 0.75;
    if (weather === 'fog') ambient *= 0.8;
    setVar('--ambient', clamp(ambient, 0.05, 1));

    // ---- STARS ----
    const isNight = ['night', 'evening', 'dusk'].includes(tod);
    let starsVis = isNight ? 1 : 0;
    if (state.cloudCover > 50) starsVis *= 0.3;
    if (state.cloudCover > 80) starsVis *= 0.1;
    setVar('--stars-opacity', starsVis);

    // ---- SUN ----
    if (state.sunElevation > -1) {
      const sunScreenX = ((state.sunAzimuth - 90) / 180) * 100;
      const sunScreenY = 100 - ((state.sunElevation / 90) * 85);
      setVar('--sun-x', clamp(sunScreenX, 5, 95) + '%');
      setVar('--sun-y', clamp(sunScreenY, 5, 85) + '%');
      setVar('--sun-opacity', state.sunElevation > 0 ? 1 : clamp(state.sunElevation + 1, 0, 1));
      // Warmer sun near horizon
      const warm = state.sunElevation < 15 ? 1 : 0;
      setVar('--sun-warmth', warm);
    } else {
      setVar('--sun-opacity', 0);
    }

    // Sun scale (larger near horizon)
    const sunScale = state.sunElevation < 10 ? 1.3 : 1;
    setVar('--sun-scale', sunScale);

    // ---- MOON ----
    if (state.moonElevation > -5) {
      const moonScreenX = ((state.moonAzimuth - 90) / 180) * 100;
      const moonScreenY = 100 - ((state.moonElevation / 90) * 80);
      setVar('--moon-x', clamp(moonScreenX, 5, 95) + '%');
      setVar('--moon-y', clamp(moonScreenY, 5, 85) + '%');
      // Hide moon during bright day
      const moonVis = isNight ? 1 : (tod === 'morning' || tod === 'dawn' ? 0.3 : 0);
      setVar('--moon-opacity', clamp(moonVis, 0, 1));

      // Moon phase shape via SVG mask ellipse
      updateMoonPhase(phase);
    } else {
      setVar('--moon-opacity', 0);
    }

    // ---- CLOUDS ----
    const cloudWeathers = ['partly_cloudy', 'overcast', 'rain', 'heavy_rain', 'drizzle',
      'thunderstorm', 'snow', 'heavy_snow', 'rain_showers', 'snow_showers',
      'freezing_rain', 'freezing_drizzle', 'snow_grains'];
    if (cloudWeathers.includes(weather) || state.cloudCover > 30) {
      const cloudOp = weather === 'overcast' ? 0.95 :
        weather === 'thunderstorm' ? 0.98 :
          Math.min(state.cloudCover / 100, 0.9);
      setVar('--cloud-opacity', cloudOp);

      // Dark clouds
      if (['thunderstorm', 'heavy_rain'].includes(weather)) {
        setVar('--cloud-color', 'rgba(40,40,55,0.95)');
      } else if (isNight) {
        setVar('--cloud-color', 'rgba(30,30,50,0.7)');
      } else {
        setVar('--cloud-color', 'rgba(255,255,255,0.85)');
      }

      const speed = state.windSpeed > 20 ? '15s' : state.windSpeed > 10 ? '25s' : '40s';
      setVar('--cloud-speed', speed);
    } else {
      setVar('--cloud-opacity', 0);
    }

    // ---- RAIN ----
    const rainWeathers = ['rain', 'heavy_rain', 'drizzle', 'rain_showers', 'freezing_rain', 'freezing_drizzle'];
    if (rainWeathers.includes(weather)) {
      const intensity = ['heavy_rain'].includes(weather) ? 0.9 : ['drizzle'].includes(weather) ? 0.4 : 0.7;
      setVar('--rain-opacity', intensity);
      setVar('--wet-opacity', 0.6);
    } else {
      setVar('--rain-opacity', 0);
      setVar('--wet-opacity', 0);
    }

    // ---- SNOW ----
    const snowWeathers = ['snow', 'heavy_snow', 'snow_showers', 'snow_grains'];
    if (snowWeathers.includes(weather)) {
      const intensity = ['heavy_snow'].includes(weather) ? 0.9 : 0.6;
      setVar('--snow-opacity', intensity);
      setVar('--snow-ground-opacity', 0.9);
    } else {
      setVar('--snow-opacity', 0);
      setVar('--snow-ground-opacity', season === 'winter' ? 0.5 : 0);
    }

    // ---- LIGHTNING ----
    setVar('--lightning-opacity', weather === 'thunderstorm' ? 1 : 0);

    // ---- FOG ----
    setVar('--fog-opacity', weather === 'fog' ? 0.7 : 0);

    // ---- WIND ----
    if (state.windSpeed > 8) {
      setVar('--wind-opacity', Math.min(state.windSpeed / 40, 0.5));
      setVar('--wind-speed', Math.max(1, 5 - state.windSpeed / 10) + 's');
      setVar('--wind-angle', (state.windSpeed > 20 ? 25 : 15) + 'deg');
    } else {
      setVar('--wind-opacity', 0);
    }

    // ---- GROUND ----
    const groundThemes = {
      spring: { c1: '#4CAF50', c2: '#388E3C', c3: '#2E7D32' },
      summer: { c1: '#558B2F', c2: '#33691E', c3: '#1B5E20' },
      autumn: { c1: '#8D6E63', c2: '#6D4C41', c3: '#4E342E' },
      winter: { c1: '#78909C', c2: '#546E7A', c3: '#455A64' }
    };

    let ground = groundThemes[season] || groundThemes.spring;
    if (isNight) {
      ground = darkenGround(ground, 0.4);
    } else if (tod === 'evening' || tod === 'dusk') {
      ground = darkenGround(ground, 0.6);
    }
    setVar('--ground-color-1', ground.c1);
    setVar('--ground-color-2', ground.c2);
    setVar('--ground-color-3', ground.c3);

    // ---- CREATURES ----
    setVar('--owl-opacity', isNight ? 0.9 : 0);
    setVar('--bird-opacity', !isNight && tod !== 'evening' ? 0.7 : 0);
    setVar('--firefly-opacity', isNight && (season === 'summer' || season === 'spring') ? 0.8 : 0);

    // ---- LEAVES ----
    setVar('--leaves-opacity', season === 'autumn' ? 0.7 : 0);
  }

  // ============================================================
  //  MOON PHASE SVG UPDATE
  // ============================================================
  function updateMoonPhase(phase) {
    const moonShadow = document.getElementById('moonShadow');
    if (!moonShadow) return;

    // phase: 0 = new moon, 0.5 = full moon, 1 = new moon again
    // Strategy: slide a dark circle (same r=24) horizontally.
    // At new moon (phase=0): shadow cx=50 (covers entire disc)
    // At full moon (phase=0.5): shadow cx pushed far off (disc fully visible)
    //
    // Waxing (0→0.5): shadow slides LEFT to reveal right side first
    // Waning (0.5→1): shadow slides RIGHT to cover from right side

    const R = 24;
    // norm: 0 = fully dark (new), 1 = fully bright (full)
    const norm = phase <= 0.5 ? phase * 2 : (1 - phase) * 2;

    // Shadow offset: 0 at new moon → 2*R at full moon
    const offset = norm * R * 2;

    if (phase <= 0.5) {
      // Waxing: shadow moves left (revealing right side)
      moonShadow.setAttribute('cx', 50 - offset);
    } else {
      // Waning: shadow moves right (covering from right)
      moonShadow.setAttribute('cx', 50 + offset);
    }

    // Dim the overall glow for darker phases
    const glowOpacity = 0.15 + norm * 0.85;
    const moonSvg = document.querySelector('.moon svg');
    if (moonSvg) {
      moonSvg.style.opacity = glowOpacity;
    }

    // At new moon, make shadow fully opaque; near full, slightly softer edge
    moonShadow.setAttribute('opacity', norm > 0.9 ? '0' : '0.95');
  }

  // ============================================================
  //  PARTICLE GENERATORS
  // ============================================================

  // --- Stars (one-time generation) ---
  function generateStars() {
    const count = 200;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      const size = Math.random() < 0.1 ? 'large' : Math.random() < 0.4 ? 'medium' : 'small';
      star.className = \`star \${size}\`;
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 80 + '%'; // Keep above ground
      star.style.setProperty('--twinkle-dur', (2 + Math.random() * 4) + 's');
      star.style.setProperty('--twinkle-delay', (Math.random() * 5) + 's');
      frag.appendChild(star);
    }
    starsLayer.appendChild(frag);
  }

  // --- Clouds ---
  let cloudsGenerated = false;
  function generateClouds() {
    if (cloudsGenerated) return;
    cloudsGenerated = true;
    const template = document.getElementById('cloud-template');
    if (!template) return;
    const count = 6;
    for (let i = 0; i < count; i++) {
      const clone = template.content.cloneNode(true);
      const cloud = clone.querySelector('.cloud');
      const sizes = ['cloud-sm', 'cloud-md', 'cloud-lg'];
      cloud.classList.add(sizes[i % 3]);
      cloud.style.top = (5 + Math.random() * 30) + '%';
      cloud.style.animationDelay = -(Math.random() * 40) + 's';
      cloud.style.animationDirection = i % 2 === 0 ? 'normal' : 'normal';
      cloud.style.opacity = 0.6 + Math.random() * 0.4;
      cloudsLayer.appendChild(cloud);
    }
  }

  // --- Rain particles ---
  let rainParticles = [];
  function manageRain() {
    const isRaining = parseFloat(getVar('--rain-opacity')) > 0;
    if (isRaining && rainParticles.length < 120) {
      addRainDrops(120 - rainParticles.length);
    } else if (!isRaining && rainParticles.length > 0) {
      clearParticles(rainParticles, precipLayer);
    }
  }

  function addRainDrops(count) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.height = (15 + Math.random() * 25) + 'px';
      drop.style.setProperty('--rain-speed', (0.4 + Math.random() * 0.6) + 's');
      drop.style.setProperty('--rain-delay', (Math.random() * 2) + 's');
      drop.style.setProperty('--wind-offset', (state.windSpeed > 10 ? 20 + Math.random() * 30 : 0));
      frag.appendChild(drop);
      rainParticles.push(drop);
    }
    precipLayer.appendChild(frag);

    // Glass drops
    addGlassDrops(12);
  }

  // Glass rain drops (on-glass effect)
  let glassDrops = [];
  function addGlassDrops(count) {
    if (glassDrops.length >= count) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count - glassDrops.length; i++) {
      const drop = document.createElement('div');
      drop.className = 'glass-drop';
      drop.style.left = (5 + Math.random() * 90) + '%';
      drop.style.top = (Math.random() * 30) + '%';
      const s = 4 + Math.random() * 10;
      drop.style.width = s + 'px';
      drop.style.height = (s * 1.2) + 'px';
      drop.style.setProperty('--drip-dur', (6 + Math.random() * 8) + 's');
      drop.style.setProperty('--drip-delay', (Math.random() * 10) + 's');
      frag.appendChild(drop);
      glassDrops.push(drop);
    }
    precipLayer.appendChild(frag);
  }

  // --- Snow particles ---
  let snowParticles = [];
  function manageSnow() {
    const isSnowing = parseFloat(getVar('--snow-opacity')) > 0;
    if (isSnowing && snowParticles.length < 80) {
      addSnowFlakes(80 - snowParticles.length);
    } else if (!isSnowing && snowParticles.length > 0) {
      clearParticles(snowParticles, precipLayer);
    }
  }

  function addSnowFlakes(count) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const flake = document.createElement('div');
      flake.className = 'snowflake';
      flake.style.left = Math.random() * 100 + '%';
      const s = 3 + Math.random() * 6;
      flake.style.width = s + 'px';
      flake.style.height = s + 'px';
      flake.style.setProperty('--snow-speed', (4 + Math.random() * 6) + 's');
      flake.style.setProperty('--snow-delay', (Math.random() * 6) + 's');
      flake.style.setProperty('--sway', (-30 + Math.random() * 60));
      frag.appendChild(flake);
      snowParticles.push(flake);
    }
    precipLayer.appendChild(frag);
  }

  // --- Grass ---
  function generateGrass() {
    const count = 100;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const blade = document.createElement('div');
      blade.className = 'grass-blade';
      blade.style.left = (i / count) * 100 + '%';
      blade.style.height = (15 + Math.random() * 30) + 'px';
      blade.style.setProperty('--grass-speed', (2 + Math.random() * 3) + 's');
      blade.style.setProperty('--grass-delay', (Math.random() * 2) + 's');
      // Wind-affected sway
      if (state.windSpeed > 10) {
        blade.style.animationDuration = Math.max(0.5, 3 - state.windSpeed / 15) + 's';
      }
      frag.appendChild(blade);
    }
    grassContainer.appendChild(frag);
  }

  // --- Wind streaks ---
  let windStreaks = [];
  function manageWind() {
    const showWind = parseFloat(getVar('--wind-opacity')) > 0;
    if (showWind && windStreaks.length < 15) {
      const frag = document.createDocumentFragment();
      for (let i = 0; i < 15; i++) {
        const streak = document.createElement('div');
        streak.className = 'wind-streak';
        streak.style.top = (10 + Math.random() * 70) + '%';
        streak.style.width = (50 + Math.random() * 150) + 'px';
        streak.style.animationDelay = -(Math.random() * 5) + 's';
        frag.appendChild(streak);
        windStreaks.push(streak);
      }
      atmosphereLayer.appendChild(frag);
    } else if (!showWind && windStreaks.length > 0) {
      clearParticles(windStreaks, atmosphereLayer);
    }
  }

  // --- Fog ---
  let fogLayers = [];
  function manageFog() {
    const showFog = parseFloat(getVar('--fog-opacity')) > 0;
    if (showFog && fogLayers.length < 2) {
      for (let i = 0; i < 2; i++) {
        const fog = document.createElement('div');
        fog.className = 'fog-layer';
        fog.style.animationDelay = -(i * 15) + 's';
        atmosphereLayer.appendChild(fog);
        fogLayers.push(fog);
      }
    } else if (!showFog && fogLayers.length > 0) {
      clearParticles(fogLayers, atmosphereLayer);
    }
  }

  // --- Lightning ---
  let lightningInterval = null;
  function manageLightning() {
    const active = state.weather === 'thunderstorm';
    if (active && !lightningInterval) {
      lightningInterval = setInterval(() => {
        if (Math.random() < 0.3) triggerLightning();
      }, 3000);
    } else if (!active && lightningInterval) {
      clearInterval(lightningInterval);
      lightningInterval = null;
    }
  }

  function triggerLightning() {
    const flash = document.createElement('div');
    flash.className = 'lightning-flash';
    lightningLayer.appendChild(flash);
    setTimeout(() => flash.remove(), 500);

    // Bolt
    if (Math.random() < 0.5) {
      const bolt = document.createElement('div');
      bolt.className = 'lightning-bolt';
      bolt.style.left = (20 + Math.random() * 60) + '%';
      bolt.style.top = '5%';
      bolt.style.width = '3px';
      bolt.style.height = (20 + Math.random() * 30) + '%';
      bolt.innerHTML = \`<svg viewBox="0 0 10 100" preserveAspectRatio="none">
        <polyline points="5,0 3,30 7,35 2,65 8,70 4,100"
          fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="2"/>
      </svg>\`;
      lightningLayer.appendChild(bolt);
      setTimeout(() => bolt.remove(), 600);
    }
  }

  // --- Fireflies ---
  let fireflies = [];
  function manageFireflies() {
    const show = parseFloat(getVar('--firefly-opacity')) > 0;
    if (show && fireflies.length < 20) {
      const frag = document.createDocumentFragment();
      for (let i = 0; i < 20; i++) {
        const ff = document.createElement('div');
        ff.className = 'firefly';
        ff.style.left = (10 + Math.random() * 80) + '%';
        ff.style.top = (40 + Math.random() * 45) + '%';
        ff.style.setProperty('--ff-dur', (4 + Math.random() * 5) + 's');
        ff.style.setProperty('--ff-delay', (Math.random() * 4) + 's');
        ff.style.setProperty('--ff-dx1', (-20 + Math.random() * 40) + 'px');
        ff.style.setProperty('--ff-dy1', (-15 + Math.random() * 30) + 'px');
        ff.style.setProperty('--ff-dx2', (-25 + Math.random() * 50) + 'px');
        ff.style.setProperty('--ff-dy2', (-10 + Math.random() * 20) + 'px');
        ff.style.setProperty('--ff-dx3', (-15 + Math.random() * 30) + 'px');
        ff.style.setProperty('--ff-dy3', (-20 + Math.random() * 40) + 'px');
        frag.appendChild(ff);
        fireflies.push(ff);
      }
      firefliesContainer.appendChild(frag);
    } else if (!show && fireflies.length > 0) {
      clearParticles(fireflies, firefliesContainer);
    }
  }

  // --- Fallen leaves (autumn) ---
  let leavesGenerated = false;
  function generateFallenLeaves() {
    if (leavesGenerated) return;
    leavesGenerated = true;
    const container = document.getElementById('fallen-leaves');
    if (!container) return;
    const colors = ['#D84315', '#E65100', '#BF360C', '#F57F17', '#FF8F00', '#6D4C41'];
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 30; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'fallen-leaf';
      leaf.style.left = Math.random() * 100 + '%';
      leaf.style.bottom = Math.random() * 40 + '%';
      leaf.style.background = colors[Math.floor(Math.random() * colors.length)];
      leaf.style.setProperty('--leaf-rot', (Math.random() * 360) + 'deg');
      leaf.style.width = (6 + Math.random() * 10) + 'px';
      leaf.style.height = leaf.style.width;
      frag.appendChild(leaf);
    }
    container.appendChild(frag);
  }

  // --- Shooting star (occasional) ---
  function maybeShootingStar() {
    if (parseFloat(getVar('--stars-opacity')) > 0.3 && Math.random() < 0.15) {
      const star = document.createElement('div');
      star.className = 'shooting-star';
      star.style.left = (20 + Math.random() * 60) + '%';
      star.style.top = (5 + Math.random() * 30) + '%';
      starsLayer.appendChild(star);
      setTimeout(() => star.remove(), 2000);
    }
  }

  // ============================================================
  //  UTILITY
  // ============================================================
  function setVar(name, value) {
    root.style.setProperty(name, value);
  }

  function getVar(name) {
    return getComputedStyle(root).getPropertyValue(name).trim();
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function mixSky(a, b, t) {
    return {
      top: mixColor(a.top, b.top, t),
      mid: mixColor(a.mid, b.mid, t),
      bottom: mixColor(a.bottom, b.bottom, t)
    };
  }

  function mixColor(hex1, hex2, t) {
    const r1 = parseInt(hex1.slice(1, 3), 16), g1 = parseInt(hex1.slice(3, 5), 16), b1 = parseInt(hex1.slice(5, 7), 16);
    const r2 = parseInt(hex2.slice(1, 3), 16), g2 = parseInt(hex2.slice(3, 5), 16), b2 = parseInt(hex2.slice(5, 7), 16);
    const r = Math.round(r1 + (r2 - r1) * t), g = Math.round(g1 + (g2 - g1) * t), b = Math.round(b1 + (b2 - b1) * t);
    return \`#\${r.toString(16).padStart(2, '0')}\${g.toString(16).padStart(2, '0')}\${b.toString(16).padStart(2, '0')}\`;
  }

  function darkenGround(ground, factor) {
    return {
      c1: darkenHex(ground.c1, factor),
      c2: darkenHex(ground.c2, factor),
      c3: darkenHex(ground.c3, factor)
    };
  }

  function darkenHex(hex, factor) {
    const r = Math.round(parseInt(hex.slice(1, 3), 16) * factor);
    const g = Math.round(parseInt(hex.slice(3, 5), 16) * factor);
    const b = Math.round(parseInt(hex.slice(5, 7), 16) * factor);
    return \`#\${r.toString(16).padStart(2, '0')}\${g.toString(16).padStart(2, '0')}\${b.toString(16).padStart(2, '0')}\`;
  }

  function clearParticles(arr, container) {
    arr.forEach(el => el.remove());
    arr.length = 0;
  }

  // ============================================================
  //  TORCH / FLASHLIGHT CURSOR
  // ============================================================
  function initTorch() {
    let torchActive = false;

    scene.style.cursor = 'default';

    scene.addEventListener('mousemove', function (e) {
      const rect = scene.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setVar('--torch-x', x + 'px');
      setVar('--torch-y', y + 'px');

      // Only activate torch in dark scenes
      const ambient = parseFloat(getVar('--ambient')) || 1;
      if (ambient < 0.5) {
        if (!torchActive) {
          torchActive = true;
          // Fade in smoothly
          setVar('--torch-intensity', '1');
        }
      } else {
        if (torchActive) {
          torchActive = false;
          setVar('--torch-intensity', '0');
        }
      }
    });

    scene.addEventListener('mouseleave', function () {
      torchActive = false;
      setVar('--torch-intensity', '0');
      setVar('--torch-x', '-9999px');
      setVar('--torch-y', '-9999px');
    });

    // Enable pointer events on scene for mouse tracking
    scene.style.pointerEvents = 'auto';
  }

  // ============================================================
  //  MAIN LOOP
  // ============================================================
  async function init() {
    // 1. Get location
    const loc = await getLocation();
    state.lat = loc.lat;
    state.lon = loc.lon;

    // 2. Fetch weather
    await fetchWeather(state.lat, state.lon);

    // 3. Compute astronomy
    updateAstronomy();

    // 4. Detect season
    state.season = overrides.season || detectSeason(state.lat, new Date());

    // 5. Apply overrides
    applyOverrides();

    // 6. Generate static elements
    generateStars();
    generateClouds();
    generateGrass();
    if (state.season === 'autumn') generateFallenLeaves();

    // 7. First composite
    compositeScene();

    // 8. Manage dynamic particles
    manageAllParticles();

    state.ready = true;

    // 9. Schedule updates
    setInterval(async () => {
      await fetchWeather(state.lat, state.lon);
      applyOverrides();
      compositeScene();
      manageAllParticles();
    }, WEATHER_POLL_MS);

    setInterval(() => {
      updateAstronomy();
      applyOverrides();
      compositeScene();
    }, ASTRO_TICK_MS);

    // Shooting stars every 10s
    setInterval(maybeShootingStar, 10000);

    // 10. Torch / flashlight cursor effect
    initTorch();
  }

  function updateAstronomy() {
    const now = new Date();
    const sun = sunPosition(state.lat, state.lon, now);
    state.sunElevation = sun.elevation;
    state.sunAzimuth = sun.azimuth;

    const moon = moonPosition(state.lat, state.lon, now);
    state.moonElevation = moon.elevation;
    state.moonAzimuth = moon.azimuth;
    state.moonPhase = moonPhase(now);

    state.timeOfDay = getTimeOfDay(sun.elevation);
  }

  function manageAllParticles() {
    manageRain();
    manageSnow();
    manageWind();
    manageFog();
    manageLightning();
    manageFireflies();
  }

  // ---- GO ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
`;

  // ---- Boot ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
