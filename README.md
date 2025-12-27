# eOrdonnances

A web application designed to help junior doctors quickly find appropriate medications and disease information organized by medical specialty.

## Overview

**eOrdonnances** provides a specialty-based interface for medical professionals to browse diseases, view treatment recommendations, and access diagnostic information. The application covers 9 major medical specialties including Cardiology, Dermatology, Neurology, Gastroenterology, and more.

**Version**: 0.1.0  
**Language**: French (UI & Medical Terminology)  
**Status**: Active Development

## Features

### Core Features ✅
- **Specialty-Based Disease Browsing** - Navigate 9 medical specialties with interactive cards
- **Disease Search & Filtering** - Search by disease name and filter by specialty
- **Disease Management** - View, add, and delete diseases with detailed information
- **Medication Database** - Browse medications with French pharmaceutical data
- **Dark/Light Theme** - Toggle between themes with persistent state
- **Responsive Design** - Mobile-first layout with desktop navigation sidebar
- **Print Functionality** - Print-optimized view for disease information
- **Pagination** - Browse diseases with 25 items per page

### Specialties Covered
- 🫀 Cardiologie (Cardiology)
- 🧠 Neurologie (Neurology)
- 🫁 Pneumologie (Pulmonology)
- 🩹 Dermatologie (Dermatology)
- 🔗 Gastro-entérologie (Gastroenterology)
- 🏥 Urologie (Urology)
- 👶 Gynéco-Obstétrique (Gynecology)
- 👂 Oto-rhino-laryngologie (ENT/ORL)
- 🚑 Urgences (Emergency Medicine)

### Planned Features 🚀
- User authentication
- User profiles & favorites
- Advanced medication filtering
- PDF export functionality
- API documentation
- Comprehensive testing
- Automated deployment pipeline

## Tech Stack

### Frontend
- **Next.js 14.1.0** - React framework with App Router
- **React 18** - UI library with hooks
- **Tailwind CSS 3.3.0** - Utility-first styling
- **Framer Motion 11.0.14** - Smooth animations
- **React Hook Form 7.51.5** - Form state management
- **Heroicons React 2.0.18** - Icon library

### Backend
- **Node.js** - Runtime environment
- **MongoDB** with **Mongoose 8.1.3** - NoSQL database & ODM
- **Nodemailer 6.9.13** - Email service

### Development
- **ESLint 8** - Code linting
- **TypeScript** - Type checking (configuration ready)
- **PostCSS 8** - CSS transformation
- **Tailwind CSS** - CSS framework

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB instance (local or Atlas)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eordonnances
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   DB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/eordonnances
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Navigation
- **Home** - View medical specialties
- **Recherchez (Search)** - Search diseases by name or specialty
- **Ajouter (Add)** - Create new disease entries
- **Theme Toggle** - Switch between dark and light modes

### Searching for Diseases
1. Click "Recherchez" or a specialty card
2. Use the search bar to find diseases by name
3. Filter by specialty using the dropdown
4. Click a disease to view full details

### Adding a Disease
1. Click "Ajouter" in the navigation
2. Fill in disease information:
   - Disease name
   - Medical specialty
   - Definition/description
   - Medications (Rx)
   - Diagnostic information (Dx)
3. Submit to save to database

## Project Structure

```
eordonnances/
├── app/
│   ├── api/                    # API Routes
│   │   ├── disease/           # Disease CRUD operations
│   │   ├── medications/       # Medication endpoints
│   │   └── mdcDB/             # Medication database
│   ├── ui/                     # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── SpecialtyCards.jsx
│   │   ├── ThemeContext.jsx
│   │   └── icons/             # Medical specialty icons
│   ├── diseases/              # Disease pages
│   ├── libs/                  # Utility functions
│   ├── layout.js              # Root layout
│   └── page.jsx               # Home page
├── models/                    # Mongoose schemas
│   ├── diseaseModel.js
│   ├── medicationModel.js
│   └── DDxModel.js
├── public/                    # Static assets (SVGs)
├── .env                       # Environment variables
├── next.config.mjs            # Next.js configuration
├── tailwind.config.js         # Tailwind customization
└── package.json              # Dependencies
```

## API Endpoints

### Diseases

**GET /api/disease**
- Retrieve paginated disease list
- Query params: `page`, `q` (search), `specialty`
- Returns: Array of diseases with pagination

**POST /api/disease**
- Create new disease (currently disabled)
- Body: Disease object with name, specialty, definition

**DELETE /api/disease**
- Delete disease by ID
- Query param: `id`

### Medications

**GET /api/medications/[name]**
- Search medications by name
- Returns: Medication details

**GET /api/mdcDB**
- Access medication database

## Data Models

### Disease
```javascript
{
  disease: {
    name: String,
    specialty: String,
    definition: String
  },
  Rx: Mixed,              // Medications/prescriptions
  Dx: [ObjectId],        // Diagnostic references
  DDx: ObjectId          // Differential diagnosis
}
```

### Medication
Schema prepared for expansion with:
- CIS codes
- Pharmaceutical forms
- Administration routes
- Pricing information
- Composition details

## Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Theme System

The application uses CSS custom properties for theming:
- Light mode: Clean white backgrounds with dark text
- Dark mode: Dark backgrounds with light text
- Theme state persists across sessions
- Specialty cards have dedicated color schemes

Toggle theme using the icon in the top navigation.

## Database Connection

MongoDB connection is established via Mongoose in `app/libs/mongodb.js`. The application:
- Connects to MongoDB on each API request
- Uses mongoose model caching to prevent duplicate model creation
- Logs connection status to console

Connection string should be stored in `.env.local`:
```env
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/database
```

## Performance Optimizations

- Static generation with 60-second revalidation for home page
- Aggregation pipeline for efficient database queries
- CSS-in-JS for dynamic styling
- Debounced search input (10ms)
- Image optimization through SVG assets

## Known Limitations & Future Improvements

### Current Limitations
- No user authentication system
- Medication model not fully implemented
- Limited error handling
- No input validation on API endpoints
- No test coverage
- Database connection pooling not implemented

### Recommended Improvements
- [ ] Implement authentication (JWT/OAuth)
- [ ] Add comprehensive error handling
- [ ] Input validation with Zod or Joi
- [ ] Database connection pooling
- [ ] Unit and integration tests (Jest)
- [ ] API rate limiting
- [ ] Add search result caching (Redis)
- [ ] Implement differential diagnosis relationships
- [ ] Create mobile native app version

## Environment Variables

Required for development:
```env
DB_URL=mongodb://connection-string
```

Optional (prepared for future use):
```env
POSTGRES_URL=          # For Vercel Postgres
NODEMAILER_USER=       # For email functionality
NODEMAILER_PASSWORD=   # For email functionality
```

## Deployment

### Recommended Platforms
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Self-hosted (AWS, DigitalOcean, etc.)**

### Pre-deployment Checklist
- [ ] Environment variables configured
- [ ] MongoDB backup strategy in place
- [ ] Error monitoring set up (Sentry)
- [ ] Analytics integrated
- [ ] Security headers configured
- [ ] Database indexes optimized

## Contributing

To contribute to eOrdonnances:
1. Create a feature branch (`git checkout -b feature/YourFeature`)
2. Make your changes
3. Commit (`git commit -m 'Add YourFeature'`)
4. Push to branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is private and maintained for medical education purposes.

## Support & Contact

For issues, questions, or suggestions, please create an issue in the project repository.

---

**Last Updated**: December 2025  
**Next Priority Features**: User authentication, comprehensive testing, API documentation