# 🎨 Zentryx Component Library

**Version:** 1.0.0  
**Design System:** Zentryx 2025  
**Framework:** React + TypeScript + Tailwind CSS

---

## 📦 Installation & Usage

### Import Components

```tsx
import { 
  Button, 
  CategoryCard, 
  ToolCard, 
  Header, 
  Footer, 
  Modal, 
  Input 
} from '@/components/zentryx';
```

---

## 🧩 Components

### 1. Button

Professional button component with multiple variants and states.

#### Props

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

#### Examples

```tsx
// Primary Button
<Button variant="primary" size="md">
  Click Me
</Button>

// Button with Icons
<Button 
  variant="primary" 
  leftIcon={<Search className="w-5 h-5" />}
  rightIcon={<ArrowRight className="w-5 h-5" />}
>
  Search Tools
</Button>

// Loading State
<Button variant="primary" isLoading>
  Processing...
</Button>

// Full Width
<Button variant="outline" fullWidth>
  Full Width Button
</Button>

// Gold CTA
<Button variant="gold" size="lg">
  Get Started
</Button>
```

#### Variants

- **primary** - Electric blue gradient (main CTAs)
- **secondary** - Purple solid (secondary actions)
- **outline** - Blue outline (tertiary actions)
- **ghost** - Transparent with blue text (subtle actions)
- **gold** - Gold solid (important CTAs)
- **danger** - Red solid (destructive actions)

#### Sizes

- **sm** - Small (px-4 py-2, text-sm)
- **md** - Medium (px-6 py-3, text-base) - Default
- **lg** - Large (px-8 py-4, text-lg)
- **xl** - Extra Large (px-12 py-6, text-xl)

---

### 2. CategoryCard

Card component for displaying tool categories.

#### Props

```typescript
interface CategoryCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  toolCount: number;
  gradient: string;
  href: string;
  className?: string;
}
```

#### Example

```tsx
import { Code } from 'lucide-react';

<CategoryCard
  name="Text Tools"
  description="Transform and analyze text"
  icon={Code}
  toolCount={12}
  gradient="from-blue-500 to-cyan-500"
  href="/tools?category=text"
/>
```

#### Gradient Options

```tsx
// Blue
gradient="from-blue-500 to-cyan-500"

// Purple
gradient="from-purple-500 to-pink-500"

// Green
gradient="from-green-500 to-emerald-500"

// Orange
gradient="from-orange-500 to-red-500"

// Indigo
gradient="from-indigo-500 to-blue-500"

// Yellow
gradient="from-yellow-500 to-orange-500"

// Pink
gradient="from-pink-500 to-rose-500"

// Teal
gradient="from-teal-500 to-cyan-500"
```

---

### 3. ToolCard

Card component for displaying individual tools.

#### Props

```typescript
interface ToolCardProps {
  name: string;
  description?: string;
  icon: string; // Emoji
  category: string;
  badge?: 'new' | 'updated' | 'trending' | null;
  href: string;
  featured?: boolean;
  className?: string;
}
```

#### Examples

```tsx
// Standard Tool Card
<ToolCard
  name="Password Generator"
  description="Generate secure passwords with custom settings"
  icon="🔐"
  category="Security"
  badge="trending"
  href="/tools/password-generator"
/>

// Featured Tool Card
<ToolCard
  name="Image Compressor"
  description="Compress images without losing quality"
  icon="🖼️"
  category="Image"
  badge="new"
  href="/tools/image-compressor"
  featured={true}
/>

// Simple Tool Card (no description)
<ToolCard
  name="QR Code Generator"
  icon="📱"
  category="Generators"
  href="/tools/qr-generator"
/>
```

#### Badge Types

- **new** - Green gradient (recently added tools)
- **updated** - Blue gradient (recently updated tools)
- **trending** - Orange/red gradient (popular tools)
- **null** - No badge

---

### 4. Header

Sticky header with navigation, search, and mobile menu.

#### Props

None (uses BrandingContext for dynamic content)

#### Example

```tsx
import { Header } from '@/components/zentryx';

function App() {
  return (
    <div>
      <Header />
      {/* Page content */}
    </div>
  );
}
```

#### Features

- ✅ Sticky positioning
- ✅ Backdrop blur effect
- ✅ Responsive navigation
- ✅ Search bar with gradient focus
- ✅ Mobile hamburger menu
- ✅ CTA button
- ✅ Dynamic branding from context

---

### 5. Footer

Professional footer with links and social icons.

#### Props

None (uses BrandingContext for dynamic content)

#### Example

```tsx
import { Footer } from '@/components/zentryx';

function App() {
  return (
    <div>
      {/* Page content */}
      <Footer />
    </div>
  );
}
```

#### Features

- ✅ 4-column layout (responsive)
- ✅ Brand section with logo
- ✅ Social media links
- ✅ Navigation columns
- ✅ Animated link underlines
- ✅ Copyright and attribution
- ✅ Gradient background

---

### 6. Modal

Flexible modal/dialog component.

#### Props

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  footer?: React.ReactNode;
}
```

#### Examples

```tsx
import { useState } from 'react';
import { Modal, Button } from '@/components/zentryx';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Welcome to Zentryx"
        description="Discover 40+ free online tools"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Get Started
            </Button>
          </>
        }
      >
        <p>Modal content goes here...</p>
      </Modal>
    </>
  );
}
```

#### Features

- ✅ Backdrop overlay with blur
- ✅ Multiple sizes (sm, md, lg, xl, full)
- ✅ Close on Escape key
- ✅ Close on overlay click (optional)
- ✅ Body scroll lock
- ✅ Header and footer sections
- ✅ Smooth animations

---

### 7. Input

Form input component with label, error states, and icons.

#### Props

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}
```

#### Examples

```tsx
import { Search, Mail } from 'lucide-react';
import { Input } from '@/components/zentryx';

// Basic Input
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  required
/>

// Input with Icon
<Input
  label="Search"
  type="search"
  placeholder="Search tools..."
  leftIcon={<Search className="w-5 h-5" />}
/>

// Input with Error
<Input
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
/>

// Input with Helper Text
<Input
  label="Username"
  type="text"
  helperText="Choose a unique username"
/>

// Full Width Input
<Input
  label="Full Name"
  type="text"
  fullWidth
/>
```

#### Features

- ✅ Label with required indicator
- ✅ Error states with red border
- ✅ Helper text
- ✅ Left and right icons
- ✅ Focus ring effect
- ✅ Disabled state
- ✅ Full accessibility

---

## 🎨 Design Tokens

### Colors

```typescript
// Primary
const primary = '#3A7AFE';      // Electric Blue
const primaryDeep = '#1D4ED8';  // Deep Blue

// Secondary
const secondary = '#9333EA';    // Purple

// Accent
const gold = '#F59E0B';         // Gold

// Neutrals
const bgLight = '#F8FAFC';      // Light Background
const borderGrey = '#CBD5E1';   // Border Grey
const textDark = '#0F172A';     // Dark Text
const textSecondary = '#475569'; // Secondary Text

// Status
const success = '#10B981';      // Green
const warning = '#F97316';      // Orange
const danger = '#EF4444';       // Red
```

### Typography

```css
/* Font Family */
font-family: 'Inter', system-ui, -apple-system, sans-serif;

/* Font Sizes */
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 30px;
--text-4xl: 36px;
--text-5xl: 42px;

/* Font Weights */
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Spacing

```css
/* 8-point grid */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
```

### Border Radius

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-2xl: 24px;
--radius-full: 9999px;
```

### Shadows

```css
/* Zentryx Shadows */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Brand Shadows */
--shadow-zentryx: 0 10px 40px -10px rgba(58, 122, 254, 0.3);
--shadow-zentryx-lg: 0 20px 60px -15px rgba(58, 122, 254, 0.4);
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

---

## ♿ Accessibility

All components follow WCAG 2.1 AA standards:

- ✅ Proper color contrast ratios
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ ARIA labels and roles
- ✅ Screen reader friendly
- ✅ Semantic HTML

---

## 🎯 Best Practices

### Component Usage

```tsx
// ✅ Good - Using design system components
import { Button, ToolCard } from '@/components/zentryx';

<Button variant="primary" size="lg">
  Get Started
</Button>

// ❌ Bad - Creating custom styled buttons
<button className="bg-blue-500 px-4 py-2 rounded">
  Get Started
</button>
```

### Consistent Spacing

```tsx
// ✅ Good - Using 8-point grid
<div className="space-y-4">  {/* 16px */}
<div className="space-y-6">  {/* 24px */}
<div className="space-y-8">  {/* 32px */}

// ❌ Bad - Random spacing
<div className="space-y-5">  {/* 20px - not on grid */}
```

### Color Usage

```tsx
// ✅ Good - Using brand colors
<div className="bg-[#3A7AFE] text-white">

// ❌ Bad - Using arbitrary colors
<div className="bg-blue-400 text-white">
```

---

## 📚 Examples

### Complete Page Layout

```tsx
import { Header, Footer, Button, ToolCard } from '@/components/zentryx';

function ToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">
          All Tools
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ToolCard
            name="Password Generator"
            icon="🔐"
            category="Security"
            badge="trending"
            href="/tools/password-generator"
          />
          {/* More tools... */}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
```

### Form with Validation

```tsx
import { useState } from 'react';
import { Input, Button, Modal } from '@/components/zentryx';
import { Mail, Lock } from 'lucide-react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  return (
    <form className="space-y-6 max-w-md mx-auto p-8">
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        leftIcon={<Mail className="w-5 h-5" />}
        error={errors.email}
        required
        fullWidth
      />
      
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        leftIcon={<Lock className="w-5 h-5" />}
        error={errors.password}
        required
        fullWidth
      />
      
      <Button variant="primary" size="lg" fullWidth>
        Sign In
      </Button>
    </form>
  );
}
```

---

## 🚀 Performance

All components are optimized for performance:

- ✅ Tree-shakeable exports
- ✅ Minimal re-renders
- ✅ CSS-in-JS avoided (uses Tailwind)
- ✅ Lazy loading ready
- ✅ No external dependencies (except Lucide icons)

---

## 📦 Component Checklist

- [x] Button - All variants and sizes
- [x] CategoryCard - With gradient icons
- [x] ToolCard - With badges and featured variant
- [x] Header - Sticky with navigation
- [x] Footer - 4-column layout
- [x] Modal - With overlay and animations
- [x] Input - With label, error, and icons
- [ ] Textarea - Coming soon
- [ ] Select - Coming soon
- [ ] Checkbox - Coming soon
- [ ] Radio - Coming soon
- [ ] Switch - Coming soon
- [ ] Dropdown - Coming soon
- [ ] Tooltip - Coming soon
- [ ] Toast - Coming soon
- [ ] Tabs - Coming soon

---

**Component Library Version:** 1.0.0  
**Last Updated:** November 24, 2025  
**Maintained by:** Zentryx Team

*For questions or contributions, please refer to the main documentation.*
