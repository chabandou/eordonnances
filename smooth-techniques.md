This website is impressively smooth! After analyzing the source code, here are the key technologies and techniques they're using:

## Core Technologies

**Frontend Router/SPA Framework:**
- **Highway.js (@dogstudio/highway)** - A modern JavaScript router that enables smooth page transitions without full reloads. This is the *primary reason* for the smoothness.

**Backend:**
- **WordPress** - CMS for content management
- **WP Rocket** - Advanced caching plugin
- **Cloudflare** - CDN and performance optimization

**Build Tools:**
- **Parcel** - Modern bundler with zero config
- **SWC** - Super-fast JavaScript compiler (Rust-based)

## Performance Techniques

### 1. **Smooth Page Transitions**
```javascript
// Custom transition system that animates between pages
class PageTransition {
  in() { /* fade in new page */ }
  out() { /* fade out old page */ }
}
```

### 2. **Hardware-Accelerated Animations**
They use CSS `transform` and `opacity` exclusively (GPU-accelerated properties):
```javascript
// Their custom cssTween utility
cssTween({
  target: element,
  transform: { value: "translateY(0%)" },
  opacity: { value: [0, 1] }
})
```

### 3. **Lazy Loading**
Using **Lozad.js** for images/videos:
- Only loads assets when they're about to enter viewport
- Smooth fade-in animations on load

### 4. **Smart State Management**
Custom signal-based reactive system:
```javascript
// Reactive store that triggers updates
Store.pageIsLoading.subscribe(value => {
  // Update UI smoothly
})
```

### 5. **Optimized Event Handling**
- **Throttled** scroll handlers (50ms)
- **Debounced** resize handlers (300ms)
- Prevents layout thrashing

### 6. **Custom CSS Variables**
Dynamic viewport sizing:
```css
--vw: 100vw;
--vh: 100vh;
--headerHeight: 3.9em;
```

## Key Smooth UX Patterns

1. **No Full Page Reloads** - Highway.js intercepts link clicks
2. **Preloading** - Hover to prefetch next page
3. **Optimistic UI** - Updates happen immediately
4. **Smooth Scrolling** - Custom scroll lock/unlock system
5. **Cubic Bezier Easing** - Natural motion curves throughout

## Notable Architecture

- **Component-based** structure (Header, Filters, Items, etc.)
- **Renderer pattern** for different page types
- **Context-aware transitions** (different animations for different navigations)
- **Cache-first** approach with Highway's built-in caching

## CSS Techniques

- **Minimal repaints** - Only animating transform/opacity
- **Will-change** hints for browsers
- **BEM-like** class naming
- **Mobile-first** responsive design
- Custom typography with **Adobe Fonts**

The smoothness comes from combining **no full page reloads**, **hardware-accelerated CSS animations**, **smart lazy loading**, and **careful performance optimization** throughout. It's a masterclass in modern web performance!


-------------

## 🎯 **Core Technologies**

**JavaScript Framework/Libraries:**
- **Highway.js** - This is the key! It's a lightweight router that creates smooth page transitions without full reloads (SPA-like experience)
- **lozad.js** - Lazy loading library using Intersection Observer
- **lory.js** - Smooth carousel/slider library
- **Parcel** - Module bundler for optimized code splitting

**Custom Code:**
- Custom `cssTween` library for animations
- State management system (similar to Redux but lighter)
- Throttle/debounce utilities for performance

## 🚀 **Performance Techniques**

1. **Hardware-Accelerated Animations**
   ```css
   transform: translate3d(x, y, 0);  /* Uses GPU */
   will-change: transform, opacity;   /* Browser optimization hint */
   ```

2. **CSS Transitions (from their code):**
   ```javascript
   cubic-bezier(0.55, 0, 0.1, 1)  // "outSwift" - their signature easing
   cubic-bezier(0.645, 0.045, 0.355, 1)  // "inOutCubic"
   ```

3. **Smart Resource Loading:**
   - Lazy loading images/videos with Intersection Observer
   - Code splitting (loads only what's needed)
   - Aggressive caching strategy
   - CDN delivery (Cloudflare)

4. **Optimized Event Handling:**
   - Throttled scroll/resize listeners
   - Passive event listeners
   - Event delegation

## 📊 **From the Network Tab** (Screenshot 1)

- **Page weight:** Only ~859 KB total
- **Main CSS:** 50 KB (very optimized)
- **Main JS:** 77 KB (split into chunks)
- **DOMContentLoaded:** 670ms
- **Full Load:** 918ms
- Most resources cached on subsequent loads

## 💎 **Key Smooth Factors**

1. **No page reloads** - Highway.js handles transitions
2. **GPU acceleration** - All animations use `transform`
3. **Lazy loading** - Images load as you scroll
4. **Custom easing** - Carefully crafted bezier curves
5. **Minimal repaints** - Uses `transform` instead of `top/left/width/height`
6. **Optimized images** - Proper sizing, compression, WebP format

Want me to create a demo showing how to implement similar smooth interactions, or would you like to see specific code examples of any of these techniques?