# FitLife Gym Website

A professional, responsive business website for FitLife Gym built with modern web technologies.

## About This Project

This is a complete website I built for FitLife Gym, a fictional fitness center. The website includes 4 pages (Home, About, Services, Contact) and demonstrates modern web development practices including semantic HTML5, CSS Grid/Flexbox layouts, SASS organization, JavaScript interactivity, and accessibility best practices.

## What I Learned

### HTML5 Structure
- Used semantic tags properly (header, nav, main, section, article, footer)
- Implemented proper heading hierarchy for SEO and accessibility
- Added ARIA attributes for improved screen reader support
- Created skip links for keyboard navigation

### CSS Layouts
- Mastered CSS Grid for main page layouts (hero sections, feature grids, team displays)
- Used Flexbox for navigation menus, component alignment, and responsive adjustments
- Implemented responsive design with mobile-first approach
- Created reusable component styles with consistent spacing and typography

### SASS Organization
- Organized CSS with variables for colors, fonts, and spacing
- Created mixins for reusable styles (buttons, cards, flex utilities)
- Structured SASS with partials for maintainability
- Used nested rules for cleaner component styling

### JavaScript
- Added interactive features like mobile menu toggle, testimonial slider, service tabs
- Implemented form validation with real-time feedback
- Created FAQ accordion with keyboard accessibility
- Added smooth scrolling for navigation links
- Implemented lazy loading for images

### Accessibility
- Made the website work for everyone with proper alt text for images
- Ensured proper heading order and semantic structure
- Added keyboard navigation support throughout
- Implemented ARIA labels and roles for interactive elements
- Tested with screen readers and keyboard-only navigation

### Performance Optimization
- Optimized images with proper sizing and compression
- Implemented lazy loading for off-screen images
- Minified CSS and JavaScript for production
- Used efficient CSS selectors and properties

## Challenges & Solutions

### Challenge 1: Making the layout responsive across all devices
**Solution**: Used CSS Grid with media queries for major layout changes and Flexbox for smaller adjustments. Implemented mobile-first approach starting with single column layouts that expand on larger screens.

### Challenge 2: Creating an accessible tab interface for services
**Solution**: Used proper ARIA roles (tablist, tab, tabpanel) and keyboard navigation (arrow keys, Enter/Space). Ensured each tab panel is properly labeled and hidden from screen readers when not active.

### Challenge 3: Implementing form validation with user-friendly feedback
**Solution**: Created real-time validation with clear error messages that are announced to screen readers. Used both HTML5 validation attributes and custom JavaScript validation for complex rules.

### Challenge 4: Ensuring cross-browser compatibility
**Solution**: Tested on Chrome, Firefox, Safari, and Edge. Used feature detection and progressive enhancement. Provided fallbacks for older browsers (like IntersectionObserver for lazy loading).

## How to View This Website

### Option 1: View Online
Visit the live deployment at: [Your Deployment URL Here]

### Option 2: Run Locally
1. Download or clone the project files
2. Open the project folder in your code editor
3. Open `index.html` in your browser
4. Or use a local server (like Live Server in VS Code) for best experience

### Option 3: Build from Source
1. Clone the repository: `git clone [repository-url]`
2. Navigate to project folder: `cd fitlife-gym-website`
3. Install dependencies (if any): `npm install`
4. Compile SASS to CSS: `sass scss/main.scss css/main.css`
5. Open `index.html` in your browser

## Project Structure
