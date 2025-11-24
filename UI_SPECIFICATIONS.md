# 🎨 Zentryx UI Specifications & Mockups

**Project:** Zentryx.in - Smart Tools. Zero Effort.  
**Version:** 2.0 - Complete Redesign  
**Date:** November 24, 2025

---

## 📐 Design Specifications

### Global Specifications

#### Color Palette
- **Primary:** #3A7AFE (Electric Blue)
- **Primary Deep:** #1D4ED8 (Deep Blue)
- **Secondary:** #9333EA (Purple)
- **Accent:** #F59E0B (Gold)
- **Background:** #F8FAFC (Light)
- **Text:** #0F172A (Dark)

#### Typography
- **Font Family:** Inter (Google Fonts)
- **H1:** 42px / Semi-Bold / Line Height 1.2
- **H2:** 30px / Bold / Line Height 1.3
- **H3:** 22px / Semi-Bold / Line Height 1.4
- **Body:** 16px / Regular / Line Height 1.6
- **Caption:** 13px / Medium / Line Height 1.5

#### Spacing
- **8-point Grid:** 4, 8, 12, 16, 24, 32, 48, 64px
- **Component Padding:** 24px (cards), 16px (buttons)
- **Section Spacing:** 64-80px vertical

#### Border Radius
- **Small:** 12px (inputs, small buttons)
- **Medium:** 16px (cards, medium buttons)
- **Large:** 20-24px (large cards, hero elements)

#### Icons
- **Style:** Line icons (Lucide React)
- **Stroke Width:** 2px
- **Sizes:** 16px, 20px, 24px, 32px, 48px

---

## 🖥️ Desktop UI Specifications (1440px)

### 1. Homepage

#### Header (Sticky)
```
┌─────────────────────────────────────────────────────────────┐
│  [Z Logo] ZENTRYX          [Nav] [Nav] [Nav]  [Search Bar]  │
│  Smart Tools. Zero Effort.                    [Explore CTA] │
└─────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Height: 80px
- Background: White with backdrop blur
- Border Bottom: 1px #E5E7EB
- Logo: 48px × 48px gradient square with "Z"
- Navigation: 5 items, 16px spacing
- Search: 400px width, rounded-2xl
- CTA: Primary button, size md

#### Hero Section
```
┌─────────────────────────────────────────────────────────────┐
│                    [Animated Blob Background]                │
│                                                              │
│              [Badge: New Tools Added Weekly]                 │
│                                                              │
│           40+ Free Online Tools.                            │
│           Fast. Simple. Trusted.                            │
│                                                              │
│     Converters, Calculators, Generators & More —            │
│              All in One Place.                              │
│                                                              │
│         [━━━━━━━━━━ Search Bar ━━━━━━━━━━]                │
│                                                              │
│         [Explore All Tools]  [Top Tools]                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Height: 600px
- Background: Gradient from slate-50 via blue-50 to purple-50
- Animated Blobs: 3 blobs (blue, purple, pink) with blur-3xl
- Badge: Gradient (blue to purple), 12px text
- H1: 72px, gradient text (blue → purple → gold)
- Subheading: 24px, gray-700
- Search Bar: 800px width, 64px height, gradient border on focus
- Buttons: XL size, 16px gap

#### Category Grid (8 Categories)
```
┌──────────────────────────────────────────────────────────────┐
│              Browse by Category                              │
│   Find the perfect tool for your needs                      │
│                                                              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ [Icon]  │ │ [Icon]  │ │ [Icon]  │ │ [Icon]  │          │
│  │ Text    │ │ Image   │ │ Calc    │ │ Convert │          │
│  │ Tools   │ │ Tools   │ │ Tools   │ │ Tools   │          │
│  │ 12 tools│ │ 8 tools │ │ 10 tools│ │ 9 tools │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ [Icon]  │ │ [Icon]  │ │ [Icon]  │ │ [Icon]  │          │
│  │ Security│ │ Developer│ │ Design  │ │ Utility │          │
│  │ Tools   │ │ Tools   │ │ Tools   │ │ Tools   │          │
│  │ 6 tools │ │ 7 tools │ │ 5 tools │ │ 6 tools │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
└──────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Grid: 4 columns × 2 rows
- Gap: 24px
- Card Size: Equal width, ~280px × 200px
- Icon Container: 64px × 64px, rounded-2xl, gradient background
- Icon: 32px, white, stroke-width 2
- Card Hover: Lift -8px, border color change to blue
- Arrow: Appears on hover, slides right

#### Featured Tools (12 Tools)
```
┌──────────────────────────────────────────────────────────────┐
│                    Featured Tools                            │
│        Trusted by thousands of professionals                 │
│                                                              │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                │
│  │🔐  │ │🖼️  │ │📱  │ │🔤  │ │⚖️  │ │🎂  │                │
│  │Pass│ │Img │ │QR  │ │Text│ │Unit│ │Age │                │
│  │Gen │ │Comp│ │Gen │ │Conv│ │Conv│ │Calc│                │
│  │[Try│ │[Try│ │[Try│ │[Try│ │[Try│ │[Try│                │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘                │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                │
│  │🎨  │ │📋  │ │📝  │ │🔢  │ │🔄  │ │💰  │                │
│  │Color│ │JSON│ │Word│ │B64 │ │PNG │ │Loan│                │
│  │Pick│ │Form│ │Cnt │ │Enc │ │JPG │ │Calc│                │
│  │[Try│ │[Try│ │[Try│ │[Try│ │[Try│ │[Try│                │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘                │
└──────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Grid: 6 columns × 2 rows (desktop)
- Gap: 24px
- Card Size: ~220px × 280px
- Icon: 80px emoji, scales 110% and rotates 6° on hover
- Badge: Top-right, 12px text, gradient background
- Button: Full width, primary variant, small size
- Hover: Lift -8px, gradient overlay

#### Footer
```
┌──────────────────────────────────────────────────────────────┐
│  [Z Logo]          Tools         Company      Support        │
│  ZENTRYX           Text Tools    About        Help Center    │
│  Smart Tools.      Image Tools   Contact      Bug Report     │
│  Zero Effort.      Calculators   Privacy      Features       │
│                    Converters    Terms        Sitemap        │
│  [Description]     Security                                  │
│                    Developer                                 │
│  [Social Icons]                                              │
│                                                              │
│  ─────────────────────────────────────────────────────────  │
│  © 2025 ZENTRYX          Made with ❤️ for developers        │
└──────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Background: Gradient from #0F172A to #1E293B
- Padding: 64px vertical, 32px horizontal
- Grid: 4 columns (1 brand + 3 links)
- Logo: 48px × 48px
- Social Icons: 40px × 40px, rounded-xl, white/10 background
- Links: Animated underline on hover (blue line slides in)
- Border Top: 1px white/10

---

## 📱 Mobile UI Specifications (375px)

### Homepage Mobile

#### Header
```
┌─────────────────────────┐
│ [Z] ZENTRYX    [Menu ☰] │
└─────────────────────────┘
```

**Specifications:**
- Height: 64px
- Logo: 40px × 40px
- Hamburger: 24px × 24px
- Mobile Menu: Full-screen overlay

#### Hero Section
```
┌─────────────────────────┐
│   [Badge: New Tools]    │
│                         │
│  40+ Free Online        │
│  Tools.                 │
│  Fast. Simple.          │
│  Trusted.               │
│                         │
│  Converters,            │
│  Calculators,           │
│  Generators & More      │
│                         │
│  [━━━ Search ━━━]      │
│                         │
│  [Explore All Tools]    │
│  [Top Tools]            │
└─────────────────────────┘
```

**Specifications:**
- H1: 36px (smaller than desktop)
- Subheading: 18px
- Search: Full width minus 32px padding
- Buttons: Full width, stacked vertically, 12px gap

#### Category Grid
```
┌─────────────────────────┐
│  Browse by Category     │
│                         │
│  ┌───────────────────┐  │
│  │ [Icon] Text Tools │  │
│  │ 12 tools          │  │
│  └───────────────────┘  │
│  ┌───────────────────┐  │
│  │ [Icon] Image Tools│  │
│  │ 8 tools           │  │
│  └───────────────────┘  │
│  ┌───────────────────┐  │
│  │ [Icon] Calculators│  │
│  │ 10 tools          │  │
│  └───────────────────┘  │
└─────────────────────────┘
```

**Specifications:**
- Grid: 1 column (stacked)
- Gap: 16px
- Card: Full width minus 32px padding
- Height: Auto (content-based)

#### Featured Tools
```
┌─────────────────────────┐
│   Featured Tools        │
│                         │
│  ┌─────────┬─────────┐  │
│  │🔐 Pass  │🖼️ Img   │  │
│  │Gen [Try]│Cmp [Try]│  │
│  └─────────┴─────────┘  │
│  ┌─────────┬─────────┐  │
│  │📱 QR    │🔤 Text  │  │
│  │Gen [Try]│Cnv [Try]│  │
│  └─────────┴─────────┘  │
└─────────────────────────┘
```

**Specifications:**
- Grid: 2 columns × 6 rows
- Gap: 12px
- Card Size: ~160px × 200px
- Icon: 48px (smaller than desktop)

---

## 🎯 Component Specifications

### Button Sizes & Spacing

```
Small (sm):
┌──────────────┐
│ [Icon] Text  │  Height: 36px
└──────────────┘  Padding: 16px × 8px

Medium (md):
┌────────────────┐
│ [Icon] Text    │  Height: 48px
└────────────────┘  Padding: 24px × 12px

Large (lg):
┌──────────────────┐
│ [Icon] Text      │  Height: 56px
└──────────────────┘  Padding: 32px × 16px

Extra Large (xl):
┌────────────────────┐
│ [Icon] Text        │  Height: 72px
└────────────────────┘  Padding: 48px × 24px
```

### Category Card

```
┌─────────────────────────┐
│  ┌────────┐             │  Width: 280px (desktop)
│  │ [Icon] │             │  Height: 200px
│  │ 64×64  │             │  Padding: 24px
│  └────────┘             │  Border: 2px
│                         │  Radius: 16px
│  Text Tools             │
│  Transform and analyze  │
│  text                   │
│                         │
│  12 tools          [→]  │
└─────────────────────────┘
```

### Tool Card

```
┌─────────────────────┐
│  🔐        [Badge]  │  Width: 220px (desktop)
│  (80px emoji)       │  Height: 280px
│                     │  Padding: 24px
│  Password Generator │  Border: 2px
│  Security           │  Radius: 16px
│                     │
│  [Try Now →]        │
└─────────────────────┘
```

### Modal

```
┌─────────────────────────────────┐
│  Title                    [×]   │  Max Width: 512px (md)
│  Description                    │  Padding: 24px
│  ─────────────────────────────  │  Radius: 16px
│                                 │  Shadow: 2xl
│  Content Area                   │
│                                 │
│  ─────────────────────────────  │
│         [Cancel]  [Confirm]     │
└─────────────────────────────────┘
```

---

## 🎨 Visual Design Patterns

### Gradient Backgrounds

```css
/* Hero Section */
background: linear-gradient(135deg, 
  #F8FAFC 0%,    /* slate-50 */
  #EFF6FF 50%,   /* blue-50 */
  #FAF5FF 100%   /* purple-50 */
);

/* Primary Button */
background: linear-gradient(135deg,
  #3A7AFE 0%,    /* Electric Blue */
  #1D4ED8 100%   /* Deep Blue */
);

/* Hero Gradient */
background: linear-gradient(135deg,
  #3A7AFE 0%,    /* Blue */
  #9333EA 50%,   /* Purple */
  #F59E0B 100%   /* Gold */
);
```

### Hover Effects

```css
/* Card Hover */
transform: translateY(-8px);
border-color: #3A7AFE;
box-shadow: 0 20px 60px -15px rgba(58, 122, 254, 0.4);

/* Button Hover */
transform: scale(1.05);
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

/* Icon Hover */
transform: scale(1.1) rotate(6deg);
```

### Animations

```css
/* Fade In */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale In */
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Blob Animation */
@keyframes blob {
  0%, 100% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}
```

---

## 📊 Layout Grid System

### Desktop (1440px)
- Container: 1280px max-width
- Columns: 12
- Gutter: 24px
- Margin: 80px (left/right)

### Tablet (768px)
- Container: 100%
- Columns: 8
- Gutter: 16px
- Margin: 32px

### Mobile (375px)
- Container: 100%
- Columns: 4
- Gutter: 12px
- Margin: 16px

---

## ✅ Implementation Checklist

### Desktop UI
- [x] Header with sticky positioning
- [x] Hero section with gradient background
- [x] Animated blob backgrounds
- [x] Search bar with gradient focus
- [x] 8-category grid (4×2)
- [x] 12 featured tools (6×2)
- [x] Why Use Zentryx section
- [x] New Tools section
- [x] CTA section with gradient
- [x] Footer with 4 columns

### Mobile UI
- [x] Responsive header with hamburger
- [x] Mobile-optimized hero
- [x] Stacked category cards
- [x] 2-column tool grid
- [x] Mobile footer

### Components
- [x] Button (6 variants, 4 sizes)
- [x] CategoryCard
- [x] ToolCard (with badges)
- [x] Header (sticky)
- [x] Footer
- [x] Modal
- [x] Input

### Interactions
- [x] Hover effects on all cards
- [x] Button hover animations
- [x] Icon scale and rotate
- [x] Smooth transitions (300ms)
- [x] Focus states with rings
- [x] Mobile menu slide-in

---

## 🎯 Design Principles

1. **Consistency** - Use design system components everywhere
2. **Clarity** - Clear hierarchy and readable typography
3. **Efficiency** - Fast loading and smooth interactions
4. **Accessibility** - WCAG 2.1 AA compliant
5. **Responsiveness** - Mobile-first approach
6. **Delight** - Subtle animations and micro-interactions

---

**UI Specifications Version:** 2.0  
**Last Updated:** November 24, 2025  
**Status:** Complete and Ready for Implementation

*These specifications serve as the single source of truth for the Zentryx UI redesign.*
