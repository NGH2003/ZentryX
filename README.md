# ZENTRYX - Smart Tools. Zero Effort.

![ZENTRYX](https://img.shields.io/badge/ZENTRYX-40%2B%20Tools-3A7AFE?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)

**ZENTRYX** is a comprehensive collection of 40+ free online tools designed for developers, designers, and everyday users. Fast. Simple. Trusted.

🌐 **Live Site**: [https://zentryx.in](https://zentryx.in)  
📦 **Repository**: [https://github.com/NGH2003/toolbox-zenith-web](https://github.com/NGH2003/toolbox-zenith-web)

---

## ✨ Features

- **40+ Free Tools** - Password generators, calculators, converters, color pickers, QR code generators, and more
- **Beautiful UI** - Modern, responsive design with smooth animations and glassmorphism effects
- **Zero Signup Required** - All tools are instantly accessible without registration
- **Fast & Lightweight** - Optimized performance with Vite and React
- **SEO Optimized** - Comprehensive meta tags and structured data for better discoverability
- **Dark Mode Ready** - Theme support with next-themes
- **Mobile Responsive** - Works seamlessly on all devices

---

## 🛠️ Tech Stack

This project is built with modern web technologies:

- **Framework**: [React](https://react.dev/) 18.3.1
- **Build Tool**: [Vite](https://vitejs.dev/) 5.4.1
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.5.3
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 3.4.11
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Routing**: [React Router](https://reactrouter.com/) 6.26.2
- **Animations**: [Framer Motion](https://www.framer.com/motion/) 12.23.24
- **Icons**: [Lucide React](https://lucide.dev/) 0.462.0
- **Backend**: [Supabase](https://supabase.com/) 2.58.0
- **State Management**: [TanStack Query](https://tanstack.com/query) 5.56.2

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NGH2003/toolbox-zenith-web.git
   cd toolbox-zenith-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

---

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

---

## 📂 Project Structure

```
zentryx-tools/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   │   ├── zentryx/    # Custom ZENTRYX components
│   │   └── ui/         # shadcn/ui components
│   ├── contexts/        # React contexts (Branding, Auth, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── lib/             # Utility functions
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles & design system
├── index.html           # HTML template with SEO meta tags
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── vite.config.ts       # Vite configuration
```

---

## 🎨 Design System

ZENTRYX uses a comprehensive design system with:

- **Color Palette**: Primary (#3A7AFE), Secondary (#9333EA), Accent (#10B981)
- **Typography**: Inter font family with multiple weights
- **Spacing**: Consistent spacing scale
- **Components**: Pre-built, reusable components with variants
- **Animations**: Smooth transitions and micro-interactions

See `src/index.css` for the complete design system.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Hosted on [Cloudflare Pages](https://pages.cloudflare.com/)

---

## 📧 Contact

For questions, feedback, or support:

- **Website**: [https://zentryx.in/contact](https://zentryx.in/contact)
- **Email**: support@zentryx.in
- **GitHub**: [@NGH2003](https://github.com/NGH2003)

---

<div align="center">
  <strong>Made with ❤️ by the ZENTRYX Team</strong>
  <br>
  <sub>Smart Tools. Zero Effort.</sub>
</div>
