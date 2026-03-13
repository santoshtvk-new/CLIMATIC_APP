<p align="center">
  <img src="https://img.shields.io/badge/zero-dependencies-brightgreen?style=for-the-badge" alt="Zero Dependencies">
  <img src="https://img.shields.io/badge/size-62.8_KB-blue?style=for-the-badge" alt="Size">
  <img src="https://img.shields.io/badge/API_key-not_required-orange?style=for-the-badge" alt="No API Key">
  <img src="https://img.shields.io/badge/license-MIT-purple?style=for-the-badge" alt="MIT License">
</p>

# 🌤 Climatic Widget

**A living, breathing weather scene for your website.** Drop a single `<script>` tag and your page gets a dynamic background that reflects real-time weather, time of day, moon phase, and season — all based on the visitor's location.

No text. No API keys. No dependencies. Pure visual magic.

```html
<script src="climatic.bundle.js"></script>
```

---

## ✨ What It Does

Climatic renders a **fully animated environment** using 9 composable CSS layers. Every visual element responds to real-world conditions:

| Layer | Elements | Driven By |
|-------|----------|-----------|
| 🌅 **Sky** | Dynamic gradient (25+ color transitions) | Time of day |
| ⭐ **Stars** | 200 twinkling stars + shooting stars | Night detection |
| ☀️ **Sun / Moon** | Positioned by astronomical math | Lat/lon + time |
| 🌙 **Moon Phase** | Accurate crescent/quarter/full/new | Synodic cycle calculation |
| ☁️ **Clouds** | Drifting clouds (light/dark/storm) | Cloud cover % |
| 🌧️ **Precipitation** | Rain, snow, glass droplets | Weather code |
| ⚡ **Atmosphere** | Lightning, fog, wind streaks | Weather + wind speed |
| 🌿 **Ground** | Grass, snow cover, wet surfaces, autumn leaves | Season + weather |
| 🦉 **Creatures** | Owls (night), birds (day), fireflies (summer night) | Time + season |

---

## 🎬 Visual Scenes

Here are the possible permutations the widget generates:

### Time of Day × Weather × Season

```
Time:    dawn │ morning │ day │ afternoon │ evening │ dusk │ night
Weather: clear │ rain │ heavy_rain │ drizzle │ snow │ thunderstorm │ fog │ overcast
Season:  spring │ summer │ autumn │ winter
Moon:    new │ waxing_crescent │ first_quarter │ waxing_gibbous │ full │ waning_gibbous │ last_quarter │ waning_crescent
```

**Total unique visual combinations: 7 × 8 × 4 × 8 = 1,792 scenes**

### Example Scenes

| Scene | What You See |
|-------|-------------|
| **Spring Day** | Blue sky, golden sun with rotating rays, white clouds, green swaying grass, flying birds |
| **Summer Night** | Dark starry sky, glowing moon, fireflies floating over grass, owls with blinking eyes |
| **Rainy Evening** | Dark moody sky with red horizon, rain streaks, glass droplets on screen, wet surfaces, fireflies |
| **Winter Morning** | Pale sky, snowflakes falling, snow-covered rolling ground, faint low sun |
| **New Moon Night** | Pitch dark sky, dense twinkling stars, no moon visible, owls in grass |
| **Thunderstorm** | Dark storm clouds, rain, lightning flashes + bolts, wet ground reflections |
| **Foggy Dawn** | Soft purple-orange sky, drifting fog layers, muted landscape |
| **Autumn Afternoon** | Warm sky, fallen orange/red leaves on brown ground, birds overhead |
| **Full Moon Night** | Bright moon disc with surface craters, star field, gentle clouds, owls |

### Interactive Features

- 🔦 **Torch Cursor** — move your mouse during dark scenes and a warm flashlight follows the cursor, revealing elements through the darkness
- 🌠 **Shooting Stars** — occasional shooting stars streak across the night sky
- 💨 **Wind Response** — grass sways faster, clouds drift faster, rain angles with wind speed
- ⚡ **Lightning** — random flashes + bolt shapes during thunderstorms

---

## 🚀 Quick Start

### Option 1: CDN Link (Recommended)

Hosted on Pynfinity CDNs:

```html
<script src="https://pynfinity.com/cdn_bundles/climatic.bundle.js"></script>
```

### Option 2: Single Bundle 

Download `dist/climatic.bundle.js` (62.8 KB) and add to your page:

```html
<!DOCTYPE html>
<html>
<body>
  <!-- That's it. One line. -->
  <script src="climatic.bundle.js"></script>

  <h1>My Website</h1>
  <p>The background is now alive!</p>
</body>
</html>
```

### Option 3: Multi-File Setup

For more control:

```
access-from-pynfinity-server (https://pynfinity.com/cdn_bundles/climatic_app)/
├── index.html
├── climatic.css
├── climatic.js
└── widget.js
```

Then embed from any page:

```html
<script src="https://pynfinity.com/cdn_bundles/climatic_app/widget.js"></script>
```

---

## ⚙️ Configuration

Customize via `data-*` attributes on the script tag:

```html
<script src="climatic.bundle.js"
  data-mode="background"
  data-z-index="-1"
  data-opacity="0.5">
</script>
```

### Available Options

| Attribute | Values | Default | Description |
|-----------|--------|---------|-------------|
| `data-mode` | `background`, `inline` | `background` | Fixed fullscreen behind content, or inline block element |
| `data-z-index` | Any integer | `-1` | CSS z-index of the widget layer |
| `data-opacity` | `0` to `1` | `1` | Overall opacity (useful for subtle backgrounds) |
| `data-width` | CSS length | `100%` | Width in inline mode |
| `data-height` | CSS length | `400px` | Height in inline mode |

### Background Mode

Widget covers the full viewport behind your content. Your page content sits on top:

```html
<script src="climatic.bundle.js" data-mode="background" data-opacity="0.6"></script>
```

### Inline Widget Mode

Widget renders as a block element at the script's position:

```html
<div class="hero-section">
  <script src="climatic.bundle.js" data-mode="inline" data-height="500px"></script>
</div>
```

---

## 🧪 Testing & Overrides

Force any scene combination via URL query parameters — perfect for testing, demos, or screenshots:

```
index.html?time=night&weather=rain&season=winter&moonphase=full
```

### Override Parameters

| Param | Values | Example |
|-------|--------|---------|
| `time` | `dawn`, `morning`, `day`, `afternoon`, `evening`, `dusk`, `night` | `?time=night` |
| `weather` | `clear`, `rain`, `heavy_rain`, `snow`, `drizzle`, `thunderstorm`, `fog`, `overcast` | `?weather=snow` |
| `season` | `spring`, `summer`, `autumn`, `winter` | `?season=winter` |
| `moonphase` | `new`, `waxing_crescent`, `first_quarter`, `waxing_gibbous`, `full`, `waning_gibbous`, `last_quarter`, `waning_crescent` | `?moonphase=full` |
| `lat` | Latitude (-90 to 90) | `?lat=40.7` |
| `lon` | Longitude (-180 to 180) | `?lon=-74` |

### Recipe Book — Try These URLs

```bash
# 🌸 Spring morning with birds
?time=morning&weather=clear&season=spring

# 🌧️ Rainy evening with fireflies
?time=evening&weather=rain

# ❄️ Heavy snowfall at dawn
?time=dawn&weather=snow&season=winter

# ⚡ Night thunderstorm
?time=night&weather=thunderstorm

# 🌑 New moon — pure darkness + stars
?time=night&weather=clear&moonphase=new

# 🌕 Full moon with fog
?time=night&weather=fog&moonphase=full

# 🍂 Autumn afternoon, light overcast
?time=afternoon&weather=overcast&season=autumn

# 🌅 Sunset / dusk with clear sky
?time=dusk&weather=clear
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│                  Your Page                  │
│                                             │
│  <script src="climatic.bundle.js">          │
│       │                                     │
│       ▼                                     │
│  ┌─── iframe (Blob URL) ──────────────────┐ │
│  │                                        │ │
│  │  ┌── climatic.js ───────────────────┐  │ │
│  │  │  Geolocation (browser / IP)      │  │ │
│  │  │  Open-Meteo Weather API          │  │ │
│  │  │  Sun position (solar algorithm)  │  │ │
│  │  │  Moon phase (synodic cycle)      │  │ │
│  │  │  Season detection (lat + month)  │  │ │
│  │  │          │                       │  │ │
│  │  │          ▼                       │  │ │
│  │  │  Scene Compositor                │  │ │
│  │  │  (sets CSS custom properties)    │  │ │
│  │  └──────────┬───────────────────────┘  │ │
│  │             │                          │ │
│  │             ▼                          │ │
│  │  ┌── climatic.css ──────────────┐      │ │
│  │  │  Layer 1: Sky gradient       │      │ │
│  │  │  Layer 2: Star field         │      │ │
│  │  │  Layer 3: Sun / Moon         │      │ │
│  │  │  Layer 4: Clouds             │      │ │
│  │  │  Layer 5: Rain / Snow        │      │ │
│  │  │  Layer 6: Lightning          │      │ │
│  │  │  Layer 7: Fog / Wind         │      │ │
│  │  │  Layer 8: Ground / Grass     │      │ │
│  │  │  Layer 9: Owls / Birds       │      │ │
│  │  │  Layer 10: Darkness overlay  │      │ │
│  │  │  Layer 11: Torch glow        │      │ │
│  │  └──────────────────────────────┘      │ │
│  └────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### Key Design Decisions

| Decision | Why |
|----------|-----|
| **Zero dependencies** | No npm, no build tools required to use — just a `<script>` tag |
| **Iframe isolation** | Widget CSS and JS never conflict with host page styles |
| **Open-Meteo API** | Free weather data, no API key, no signup, CORS-enabled |
| **CSS custom properties** | All 50+ visual parameters driven by JS → CSS vars for smooth transitions |
| **Blob URL** | Bundle creates iframe from inline content — no server round-trip |
| **SVG elements** | Sun, moon, owls, birds rendered as crisp SVG at any resolution |

### Data Flow

1. **Location** → `navigator.geolocation` with IP fallback (`ipapi.co`)
2. **Weather** → [Open-Meteo API](https://open-meteo.com/) (refreshes every 15 min)
3. **Sun position** → Calculated from lat/lon/time using simplified solar algorithm
4. **Moon phase** → Synodic cycle math from known new moon reference date
5. **Season** → Derived from latitude (hemisphere) + month
6. **Compositor** → Maps all data to CSS custom properties
7. **Renderer** → CSS transitions + animations handle all visuals at 60fps

---

## 📁 File Structure

```
CLIMATIC_APP/
├── index.html          # Main HTML — SVG definitions + 9 layer containers
├── climatic.css         # Visual engine — all animations & effects (~18 KB)
├── climatic.js          # Logic engine — API, astronomy, compositor (~34 KB)
├── widget.js            # Embeddable loader for multi-file hosting
├── build.js             # Bundler script (node build.js)
├── dist/
│   ├── climatic.bundle.js   # ⭐ Single-file CDN bundle (62.8 KB)
│   └── demo.html            # Demo page showing the bundle in action
└── README.md
```

---

## 🔧 Development

### Run Locally

```bash
# Serve the files (any static server works)
npx http-server -p 8765 --cors -c-1

# Open in browser
open http://localhost:8765
```

### Build the Bundle

After editing source files:

```bash
node build.js
# → dist/climatic.bundle.js (62.8 KB)
# → dist/demo.html
```

### Test Specific Scenes

```bash
# Open with overrides
http://localhost:8765/index.html?time=night&weather=snow&season=winter&moonphase=full
```

---

## 🌍 Hosting & CDN

### GitHub Pages

```bash
# Push dist/ to gh-pages
git subtree push --prefix dist origin gh-pages
```

Then use: `https://YOUR_USER.github.io/CLIMATIC_APP/climatic.bundle.js`

### jsDelivr (free CDN for GitHub repos)

```html
<script src="https://cdn.jsdelivr.net/gh/YOUR_USER/CLIMATIC_APP@latest/dist/climatic.bundle.js"></script>
```

### npm

```bash
npm publish
```

Then use via unpkg:

```html
<script src="https://unpkg.com/climatic-widget/dist/climatic.bundle.js"></script>
```

### Other Platforms

| Platform | Deploy | URL |
|----------|--------|-----|
| Vercel | `vercel deploy dist/` | `*.vercel.app/climatic.bundle.js` |
| Netlify | Drag-drop `dist/` | `*.netlify.app/climatic.bundle.js` |
| Cloudflare Pages | Connect repo | `*.pages.dev/climatic.bundle.js` |
| S3 + CloudFront | Upload `dist/` | Custom domain |

---

## 🎨 All Visual Elements Reference

### Sky Gradients (7 time phases)

| Time | Sky Top | Sky Mid | Sky Bottom |
|------|---------|---------|------------|
| Dawn | Deep purple `#2c1654` | Rose `#b44e75` | Amber `#f7a94e` |
| Morning | Warm blue `#4a90d9` | Light blue `#87CEEB` | Cream `#f0e6c0` |
| Day | Bright blue `#1e90ff` | Sky blue `#87CEEB` | Powder `#b0e0e6` |
| Afternoon | Medium blue `#2878c8` | Steel blue `#6bb3d9` | Gold `#d4a96a` |
| Evening | Dark indigo `#1a1040` | Plum `#3a2060` | Ember `#c45030` |
| Dusk | Deep purple `#1e1040` | Mauve `#6b3a6b` | Sunset `#e87040` |
| Night | Near black `#0a0a1a` | Dark navy `#0f0f2a` | Dark blue `#151530` |

### Ground Themes (4 seasons)

| Season | Colors | Special |
|--------|--------|---------|
| 🌸 Spring | Vibrant greens | Swaying grass blades |
| ☀️ Summer | Deep greens | Dense grass + fireflies at night |
| 🍂 Autumn | Warm browns | Scattered fallen leaves (orange, red, amber) |
| ❄️ Winter | Cool greys | Snow-covered rolling hills |

### Creatures

| Creature | When | Behavior |
|----------|------|----------|
| 🦉 Owls (×2) | Night / evening / dusk | Perched on ground, eyes blink periodically |
| 🐦 Birds (×3) | Day / morning / afternoon | Fly across screen with wing-flap animation |
| 🔥 Fireflies (×20) | Summer + spring nights | Float with random paths, pulsing yellow glow |

### Weather Effects

| Effect | Trigger | Visuals |
|--------|---------|---------|
| ☁️ Clouds | Cloud cover > 30% | 6 drifting clouds (small/medium/large), speed varies with wind |
| 🌧️ Rain | Rain weather codes | 120 falling drops + glass droplets on screen + wet ground + puddles |
| ❄️ Snow | Snow weather codes | 80 falling snowflakes with sway + snow-covered ground |
| ⚡ Lightning | Thunderstorm | Full-screen white flashes + SVG bolt shapes |
| 🌫️ Fog | Fog weather code | 2 drifting translucent layers |
| 💨 Wind | Wind speed > 8 km/h | Angled white streaks, faster cloud/grass animation |
| 🌠 Shooting stars | Night + clear sky | Random streaks with glowing trail |

---

## 📐 API Reference

### CSS Custom Properties

The scene compositor sets these on `:root`. You can read or override them:

```css
/* Sky */
--sky-top, --sky-mid, --sky-bottom    /* Gradient colors */
--ambient                             /* 0.05 (darkest) → 1 (brightest) */

/* Stars */
--stars-opacity                       /* 0 (day) → 1 (night) */

/* Sun */
--sun-x, --sun-y                      /* Position as % */
--sun-opacity                         /* 0 or 1 */
--sun-scale, --sun-warmth             /* Size + color temp */

/* Moon */
--moon-x, --moon-y                    /* Position as % */
--moon-opacity                        /* 0 or 1 */

/* Clouds */
--cloud-opacity, --cloud-color        /* Visibility + tint */
--cloud-speed                         /* Drift animation duration */

/* Precipitation */
--rain-opacity, --snow-opacity        /* 0 or 0.4-0.9 */

/* Atmosphere */
--fog-opacity, --wind-opacity         /* 0 or driven by data */
--lightning-opacity                   /* 0 or 1 */

/* Ground */
--ground-color-1/2/3                  /* Gradient stops */
--ground-height                       /* Default 18% */
--snow-ground-opacity, --wet-opacity  /* Surface conditions */

/* Creatures */
--owl-opacity, --bird-opacity         /* 0 or 0.7-0.9 */
--firefly-opacity                     /* 0 or 0.8 */

/* Torch (cursor flashlight) */
--torch-x, --torch-y                  /* Cursor position */
--torch-radius                        /* Light radius (250px) */
--torch-intensity                     /* 0 (off) or 1 (on) */
```

---

## 🤝 Contributing

1. Fork the repo
2. Edit source files (`index.html`, `climatic.css`, `climatic.js`)
3. Test with `npx http-server -p 8765` and URL overrides
4. Rebuild the bundle: `node build.js`
5. Submit a PR

### Ideas for Contributions

- [ ] Additional creatures (frogs, crickets sound-waves)
- [ ] Northern lights / aurora for high latitudes
- [ ] Sunrise/sunset color transitions with more granularity
- [ ] Touch support for torch effect on mobile
- [ ] WebGL/Canvas mode for higher performance
- [ ] City skyline ground option
- [ ] Sound effects / ambient audio toggle

---

## 📄 License

MIT — free for personal and commercial use.

---

<p align="center">
  <strong>Built with vanilla HTML, CSS, JS, and SVG.</strong><br>
  Zero build tools. Zero frameworks. Zero API keys.<br><br>
  <em>Just weather, math, and pixels.</em>
</p>



## 🌐 Website

- 🔗 Visit: [pynfinity](https://pynfinity.com)
- 🧑‍💻 Author: [santoshtvk](https://www.linkedin.com/in/santoshtvk/)

