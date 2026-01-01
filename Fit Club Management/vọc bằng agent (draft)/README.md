# FitClub - Modern Fitness Club Landing Page

A modern, responsive fitness club landing page built with Vue 3, TypeScript, and Tailwind CSS. Features a complete single-page application with multiple sections, dedicated pages, form validation, and interactive UI components.

## 🌟 Features

### Landing Page Sections
- **Hero Section** - Full viewport height with gradient background, stats, and CTAs
- **About Section** - Two-column layout with images and feature cards
- **Trainers Section** - Grid showcase of expert trainers with hover effects
- **Pricing Section** - Three-tier pricing cards with feature lists
- **Testimonials Section** - Customer reviews with ratings
- **Contact Section** - Form with validation and contact information cards

### Additional Pages
- **Contact Page** - Dedicated full-page contact form
- **Schedule Page** - Weekly class schedule with filtering
- **404 Page** - Custom not found page with navigation

### UI Components
- **Navigation** - Fixed navbar with smooth scrolling and mobile menu
- **Footer** - Multi-column footer with social links
- **Button** - Multiple variants (default, outline, ghost) with loading states
- **Input/Textarea** - Form inputs with validation styling
- **Card** - Reusable card component with shadows
- **Toast Notifications** - Success/error/info notifications
- **Chat Widget** - Floating chat button with expandable interface

### Design Features
- Responsive design (mobile-first approach)
- Smooth animations and transitions
- Custom Tailwind color scheme
- Accessible (WCAG AA compliant)
- Form validation with error messages
- Loading states for async operations
- Hover effects on interactive elements

## 🚀 Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vue Router** - Client-side routing
- **Pinia** - State management
- **Lucide Icons** - Beautiful icon library
- **Vite** - Next-generation frontend tooling

## 📦 Project Setup

### Prerequisites
- Node.js 20.19.0 or higher
- npm or yarn

### Installation

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

## 📁 Project Structure

```
src/
├── assets/          # Static assets and global styles
├── components/      # Reusable Vue components
│   ├── layout/     # Layout components (Navigation, Footer)
│   ├── sections/   # Landing page sections
│   └── ui/         # UI components (Button, Input, Card, etc.)
├── composables/    # Vue composables (useToast)
├── lib/            # Utility functions
├── router/         # Vue Router configuration
├── stores/         # Pinia stores
├── views/          # Page components
└── main.ts         # Application entry point
```

## 🎨 Design Tokens

### Colors
- **Primary**: Blue (#3b82f6) - CTAs and brand accents
- **Muted**: Gray - Backgrounds and secondary text
- **Border**: Light gray - Subtle separators
- **Destructive**: Red - Error states

### Typography
- Headings: Bold, responsive sizes (text-4xl to text-6xl)
- Body: Regular weight, comfortable line-height
- Font: System font stack

### Spacing
- Container: Max-width 1400px
- Navigation Height: 64px
- Responsive padding: 2rem (8 on mobile scale)

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.ts` includes:
- Extended color palette
- Custom spacing values
- Container max-width
- Backdrop blur utilities

### Vue Router
- Smooth scroll behavior
- Hash-based navigation for sections
- 404 fallback route

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ✨ Key Features

### Form Validation
- Real-time validation on blur
- Clear error messages
- Email and phone format validation
- Character count for textarea
- Disabled submit until valid

### Toast Notifications
- Success, error, and info variants
- Auto-dismiss after 5 seconds
- Manual dismiss option
- Slide-in animation

### Navigation
- Smooth scroll to sections
- Active section highlighting
- Mobile hamburger menu
- Fixed position with backdrop blur

### Accessibility
- Semantic HTML5 elements
- ARIA labels for screen readers
- Keyboard navigation support
- Focus visible states
- High contrast colors

## 🎯 Pages & Routes

- `/` - Home page with all sections
- `/contact` - Dedicated contact form page
- `/schedule` - Weekly class schedule
- `*` - 404 not found page

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your own use.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icon library
- Unsplash for the placeholder images

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
