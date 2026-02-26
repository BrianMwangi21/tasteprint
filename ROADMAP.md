# TastePrint Build Roadmap

This roadmap breaks down the entire project into modular, incremental steps. Each checkbox represents a single, focused task that builds on the previous ones.

## Phase 1: Foundation & Dependencies

### 1.1 Project Setup
- [x] Install Mongoose (`mongoose` - includes MongoDB driver) ✅ v9.2.2 installed
- [x] Install Three.js dependencies (`three`, `@react-three/fiber`, `@react-three/drei`) ✅ installed
- [x] Install OpenRouter AI SDK (`@openrouter/ai-sdk-provider`) ✅ v2.2.3 installed
- [x] Install OG image generation (`@vercel/og`) ✅ v0.9.0 installed
- [x] Install utility libraries (`nanoid`, `clsx`, `tailwind-merge`) ✅ installed
- [x] Create TypeScript types file (`types/index.ts`) ✅ created with comprehensive types
- [x] Create directory structure (app, components, lib, models, types) ✅ all directories created

### 1.2 Database Setup
- [x] Create MongoDB connection utility (`lib/mongodb.ts`) ✅ created with connection caching
- [x] Create Mongoose Analysis schema (`models/Analysis.ts`) ✅ created with full schema
- [x] Create database type definitions ✅ included in types/index.ts
- [ ] Test database connection (requires running app - will test during development)

### 1.3 Spotify OAuth Foundation
- [x] Create Spotify authentication utilities (`lib/spotify-auth.ts`) ✅ created with OAuth flow
- [x] Create `/api/auth/spotify/login` route (redirects to Spotify) ✅ created with state cookie
- [x] Create `/api/auth/spotify/callback` route (handles code exchange) ✅ created with token/user cookies
- [ ] Create token management utilities (refresh tokens)
- [ ] Add cookie-based session storage

## Phase 2: Data Fetching & Processing

### 2.1 Spotify Data Service
- [ ] Create Spotify API client wrapper (`lib/spotify.ts`)
- [ ] Create function to fetch user profile
- [ ] Create function to fetch top tracks (short, medium, long term)
- [ ] Create function to fetch top artists
- [ ] Create function to fetch recently played tracks
- [ ] Create function to fetch audio features for tracks
- [ ] Create function to fetch saved tracks count

### 2.2 Data Analysis Engine
- [ ] Create analysis processor (`lib/analysis.ts`)
- [ ] Build Genetic Helix data transformer (map audio features to DNA strands)
- [ ] Build Time Tunnel data transformer (map listening history to timeline)
- [ ] Create audio feature summary calculator
- [ ] Create genre pattern analyzer
- [ ] Create listening habit insights generator

### 2.3 AI Story Generation
- [ ] Create OpenRouter client setup (`lib/openrouter.ts`)
- [ ] Design prompt template for cosmic story generation
- [ ] Create function to generate taste narrative
- [ ] Test AI generation with sample data

## Phase 3: API Endpoints

### 3.1 Analysis Creation
- [ ] Create `/api/analyze` POST endpoint
- [ ] Implement data fetching orchestration
- [ ] Implement analysis processing
- [ ] Implement AI story generation
- [ ] Save analysis to database with nanoid
- [ ] Return public ID for redirect

### 3.2 Analysis Retrieval
- [ ] Create `/api/taste/[id]` GET endpoint
- [ ] Fetch analysis by publicId from database
- [ ] Increment view counter
- [ ] Return formatted analysis data

### 3.3 Discovery Feed
- [ ] Create `/api/feed` GET endpoint
- [ ] Implement pagination (9-12 items per page)
- [ ] Sort by newest first
- [ ] Return feed data with user info

## Phase 4: Visualizations

### 4.1 Cosmic Observatory UI Components
- [ ] Create Starfield background component (`components/ui/Starfield.tsx`)
- [ ] Create Aurora gradient background component
- [ ] Create scanner/radar UI elements
- [ ] Create loading DNA animation component (`components/ui/LoadingDNA.tsx`)
- [ ] Create cosmic typography components

### 4.2 Genetic Audio Helix
- [ ] Create Three.js scene setup component
- [ ] Create double helix geometry generator
- [ ] Create audio orb component with glow effects
- [ ] Position orbs on helix based on audio features
- [ ] Add rotation animation
- [ ] Add hover interactions (show track info)
- [ ] Add mobile-optimized simplified version
- [ ] Optimize for performance (LOD, instancing)

### 4.3 Time Dilation Tunnel
- [ ] Create tunnel scene component
- [ ] Create track marker component (sized by frequency)
- [ ] Position markers by timestamp
- [ ] Add time-based color coding
- [ ] Implement scroll-based navigation
- [ ] Add speed/distortion effects
- [ ] Add mobile-optimized simplified version
- [ ] Optimize for performance

## Phase 5: Pages & Routing

### 5.1 Landing Page
- [ ] Design and build cosmic hero section
- [ ] Add Spotify connect CTA button
- [ ] Add preview screenshots/mockups
- [ ] Add "how it works" section
- [ ] Add footer with links

### 5.2 OAuth Callback Page
- [ ] Create `/callback` page
- [ ] Handle OAuth callback from Spotify
- [ ] Store tokens in cookies
- [ ] Redirect to analysis creation

### 5.3 Analysis Loading Page
- [ ] Create loading state page
- [ ] Add "Scanning your musical DNA..." messages
- [ ] Add animated scanner effects
- [ ] Add fun rotating messages
- [ ] Trigger analysis creation API

### 5.4 Public Analysis Page
- [ ] Create `/taste/[id]` page
- [ ] Fetch analysis data server-side
- [ ] Display Genetic Helix visualization
- [ ] Display Time Tunnel visualization
- [ ] Display AI cosmic story
- [ ] Add share buttons (Twitter/X, Copy Link)
- [ ] Add "Create Your Own" CTA

### 5.5 Discovery Feed Page
- [ ] Create `/feed` page
- [ ] Display grid of analysis cards
- [ ] Add pagination controls
- [ ] Add card hover effects
- [ ] Add "Create Yours" sticky CTA

## Phase 6: Sharing & OG Images

### 6.1 Dynamic OG Image Generation
- [ ] Create OG image template (`lib/og-image.tsx`)
- [ ] Add cosmic background design
- [ ] Add user name and TastePrint branding
- [ ] Add mini visualization preview
- [ ] Create `/api/og` route for dynamic generation
- [ ] Add OG meta tags to public analysis pages

### 6.2 Share Functionality
- [ ] Create share buttons component
- [ ] Implement Twitter/X share with pre-filled text
- [ ] Implement copy link functionality
- [ ] Add share analytics tracking

## Phase 7: Polish & Performance

### 7.1 Error Handling
- [ ] Add Spotify API error handling (rate limits)
- [ ] Add token refresh logic
- [ ] Add graceful fallbacks for missing audio features
- [ ] Add MongoDB connection error handling
- [ ] Create error boundary components

### 7.2 Performance Optimization
- [ ] Add Spotify data caching
- [ ] Optimize Three.js scenes (frustum culling, LOD)
- [ ] Add lazy loading for visualizations
- [ ] Optimize images and assets
- [ ] Add loading states for slow operations

### 7.3 Responsive Design
- [ ] Ensure mobile-first design for all pages
- [ ] Test simplified 3D on mobile devices
- [ ] Optimize touch interactions
- [ ] Ensure proper spacing on all screen sizes

### 7.4 Final Testing
- [ ] Test complete Spotify OAuth flow
- [ ] Test analysis creation end-to-end
- [ ] Test public analysis page sharing
- [ ] Test discovery feed pagination
- [ ] Test OG image generation
- [ ] Test on mobile devices
- [ ] Run lint and type checks

## Phase 8: Deployment

### 8.1 Environment Setup
- [ ] Verify all environment variables in Vercel
- [ ] Configure Spotify app redirect URIs for production
- [ ] Configure MongoDB Atlas network access
- [ ] Test production build locally

### 8.2 Vercel Deployment
- [ ] Deploy to Vercel
- [ ] Configure custom domain (if needed)
- [ ] Test production endpoints
- [ ] Monitor error logs

### 8.3 Post-Launch
- [ ] Monitor database performance
- [ ] Track analytics (views, shares)
- [ ] Gather user feedback
- [ ] Plan future enhancements
