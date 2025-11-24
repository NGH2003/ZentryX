# 🎨 ZENTRYX Design System Guide

## Quick Start

### Using Colors

```tsx
// Primary Electric Blue
className="bg-[#3A7AFE] text-white"

// Purple Accent
className="bg-[#9333EA] text-white"

// Gold Highlight
className="bg-[#F59E0B] text-white"

// Using CSS variables
style={{ background: 'hsl(var(--zentryx-primary))' }}
```

### Using Buttons

```tsx
// Primary Button (Electric Blue Gradient)
<button className="btn-primary">
  Click Me
</button>

// Secondary Button (Outline)
<button className="btn-secondary">
  Learn More
</button>

// Gold Button
<button className="btn-gold">
  Important Action
</button>
```

### Using Cards

```tsx
// Standard Zentryx Card
<div className="card-zentryx">
  <h3>Card Title</h3>
  <p>Card content...</p>
</div>

// Gradient Card
<div className="card-gradient">
  <h3>Featured Content</h3>
</div>

// With Hover Lift
<div className="card-zentryx hover-lift">
  Interactive card
</div>
```

### Using Badges

```tsx
// New Badge (Green Gradient)
<span className="badge-new">New</span>

// Updated Badge (Blue Gradient)
<span className="badge-updated">Updated</span>

// Trending Badge (Orange/Red Gradient)
<span className="badge-trending">Trending</span>
```

### Using Inputs

```tsx
<input 
  type="text" 
  className="input-zentryx" 
  placeholder="Enter text..."
/>
```

### Using Animations

```tsx
// Fade in from bottom
<div className="animate-fade-in">
  Content fades in
</div>

// Fade in with upward motion
<div className="animate-fade-in-up">
  Content slides up
</div>

// Scale in
<div className="animate-scale-in">
  Content scales in
</div>

// Floating animation
<div className="animate-float">
  Gently floats
</div>

// Blob animation (for backgrounds)
<div className="animate-blob">
  Organic movement
</div>

// Pulse glow effect
<div className="animate-pulse-glow">
  Pulsing glow
</div>
```

### Using Shadows

```tsx
// Zentryx branded shadow (blue tint)
<div className="shadow-zentryx">
  Subtle blue shadow
</div>

// Large Zentryx shadow
<div className="shadow-zentryx-lg">
  Prominent blue shadow
</div>

// Glow effect
<div className="shadow-glow">
  Glowing effect
</div>

// Extra large shadow
<div className="shadow-3xl">
  Deep shadow
</div>
```

### Using Gradients

```tsx
// Primary gradient (Electric Blue)
<div className="gradient-primary">
  Blue gradient background
</div>

// Secondary gradient (Purple)
<div className="gradient-secondary">
  Purple gradient background
</div>

// Hero gradient (Multi-color)
<div className="gradient-hero">
  Blue → Purple → Gold
</div>
```

### Using Glassmorphism

```tsx
// Light glass effect
<div className="glass">
  Frosted glass look
</div>

// Dark glass effect
<div className="glass-dark">
  Dark frosted glass
</div>
```

### Using Hover Effects

```tsx
// Lift on hover
<div className="hover-lift">
  Lifts up on hover
</div>

// Glow on hover
<div className="hover-glow">
  Glows on hover
</div>
```

## Typography

```tsx
// H1 - 42px, Semi-Bold
<h1>Main Heading</h1>

// H2 - 30px, Bold
<h2>Section Heading</h2>

// H3 - 22px, Semi-Bold
<h3>Subsection Heading</h3>

// Body - 16px, Regular
<p>Body text content</p>

// Caption - 13px, Medium
<span className="caption">Small text</span>
```

## Spacing

Use the 8-point grid system:

```tsx
// Vertical spacing
<div className="space-4">  {/* 4px */}
<div className="space-8">  {/* 8px */}
<div className="space-12"> {/* 12px */}
<div className="space-16"> {/* 16px */}
<div className="space-24"> {/* 24px */}
<div className="space-32"> {/* 32px */}
<div className="space-48"> {/* 48px */}
<div className="space-64"> {/* 64px */}
```

## Component Examples

### Category Card

```tsx
<Link to="/tools?category=text">
  <div className="card-zentryx hover-lift group cursor-pointer">
    <div className="p-6">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Code className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#3A7AFE] transition-colors">
        Text Tools
      </h3>
      <p className="text-sm text-gray-600 mb-3">Transform and analyze text</p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-500">12 tools</span>
        <ArrowRight className="w-4 h-4 text-[#3A7AFE] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  </div>
</Link>
```

### Tool Card

```tsx
<div className="card-gradient hover-lift group cursor-pointer">
  <div className="p-6">
    <div className="flex items-start justify-between mb-4">
      <div className="text-5xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
        🔐
      </div>
      <Badge className="badge-trending text-xs">
        Trending
      </Badge>
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#3A7AFE] transition-colors">
      Password Generator
    </h3>
    <p className="text-sm text-gray-600 mb-4">Security</p>
    <Button size="sm" className="w-full bg-gradient-to-r from-[#3A7AFE] to-[#1D4ED8] text-white hover:shadow-lg transition-all">
      Try Now
      <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
  </div>
</div>
```

### Feature Card

```tsx
<div className="card-zentryx text-center group">
  <div className="p-8">
    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
      <Zap className="w-10 h-10 text-white" />
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-3">Fast</h3>
    <p className="text-gray-600 leading-relaxed">
      Instant load, no ads disturbance. Lightning-fast performance for all your tools.
    </p>
  </div>
</div>
```

### Search Bar

```tsx
<div className="relative group">
  <div className="absolute -inset-1 bg-gradient-to-r from-[#3A7AFE] via-[#9333EA] to-[#F59E0B] rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
  <div className="relative bg-white rounded-2xl shadow-2xl p-2">
    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 z-10" />
    <Input
      type="search"
      placeholder="Search tools..."
      className="pl-16 pr-6 py-7 text-lg rounded-xl border-0 focus:ring-4 focus:ring-[#3A7AFE]/30 bg-white"
    />
  </div>
</div>
```

### CTA Section

```tsx
<section className="py-20 px-4 bg-gradient-to-r from-[#3A7AFE] via-[#9333EA] to-[#F59E0B]">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
      Ready to boost your productivity?
    </h2>
    <p className="text-xl mb-10 text-white/90">
      Join thousands of developers and creators who use our tools daily
    </p>
    <div className="flex gap-4 justify-center">
      <Button className="bg-white text-[#3A7AFE] hover:bg-gray-100 px-12 py-7 rounded-xl text-lg font-bold">
        Get Started Free
      </Button>
      <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-12 py-7 rounded-xl text-lg font-bold">
        Learn More
      </Button>
    </div>
  </div>
</section>
```

## Color Reference

### Primary Colors
- **Electric Blue:** `#3A7AFE` / `hsl(217, 91%, 60%)`
- **Deep Blue:** `#1D4ED8` / `hsl(221, 83%, 53%)`

### Secondary Colors
- **Purple Accent:** `#9333EA` / `hsl(271, 76%, 53%)`
- **Gold Highlight:** `#F59E0B` / `hsl(38, 92%, 50%)`

### Neutrals
- **Light Background:** `#F8FAFC` / `hsl(210, 40%, 98%)`
- **Border Grey:** `#CBD5E1` / `hsl(214, 32%, 91%)`
- **Dark Text:** `#0F172A` / `hsl(222, 47%, 11%)`
- **Secondary Text:** `#475569` / `hsl(215, 16%, 47%)`

### Status Colors
- **Success:** `#10B981` / `hsl(142, 71%, 45%)`
- **Warning:** `#F97316` / `hsl(25, 95%, 53%)`
- **Danger:** `#EF4444` / `hsl(0, 72%, 51%)`

## Best Practices

### 1. Use Consistent Spacing
Always use the 8-point grid system for margins and padding.

### 2. Maintain Visual Hierarchy
- Use larger text and bolder weights for important content
- Use color strategically to draw attention
- Maintain consistent spacing between sections

### 3. Optimize Performance
- Use CSS transforms for animations (GPU-accelerated)
- Avoid excessive animations on mobile
- Use `will-change` sparingly

### 4. Ensure Accessibility
- Maintain color contrast ratios (WCAG AA minimum)
- Provide focus states for interactive elements
- Use semantic HTML

### 5. Responsive Design
- Mobile-first approach
- Test on multiple screen sizes
- Use responsive utilities from Tailwind

## Animation Timing

- **Fast:** 200-300ms (hover states, small transitions)
- **Medium:** 300-500ms (card animations, fades)
- **Slow:** 500-800ms (page transitions, complex animations)

## Z-Index Scale

```
1    - Subtle overlays
10   - Dropdowns, tooltips
100  - Modals, dialogs
1000 - Notifications, toasts
```

## Breakpoints

```
sm:  640px  - Small tablets
md:  768px  - Tablets
lg:  1024px - Laptops
xl:  1280px - Desktops
2xl: 1536px - Large screens
```

---

**Remember:** Consistency is key! Use these components and utilities to maintain a cohesive design across the entire application.
