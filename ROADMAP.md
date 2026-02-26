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

### 1.3 Spotify OAuth Foundation
- [x] Create Spotify authentication utilities (`lib/spotify-auth.ts`) ✅ created with OAuth flow
- [x] Create `/api/auth/spotify/login` route (redirects to Spotify) ✅ created with state cookie
- [x] Create `/api/auth/spotify/callback` route (handles code exchange) ✅ created with token/user cookies
- [x] Create token management utilities (refresh tokens) ✅ added to spotify-auth.ts
- [x] Add cookie-based session storage ✅ created lib/session.ts

## Phase 2: Data Fetching & Processing

### 2.1 Spotify Data Service
- [x] Create Spotify API client wrapper (`lib/spotify.ts`) ✅ created with full API methods
- [x] Create function to fetch user profile ✅ included in wrapper
- [x] Create function to fetch top tracks (short, medium, long term) ✅ included in wrapper
- [x] Create function to fetch top artists ✅ included in wrapper
- [x] Create function to fetch recently played tracks ✅ included in wrapper
- [x] Create function to fetch audio features for tracks ✅ included in wrapper
- [x] Create function to fetch saved tracks count ✅ included in wrapper

### 2.2 Data Analysis Engine
- [x] Create analysis processor (`lib/analysis.ts`) ✅ created with Genetic Helix and Time Tunnel processors
- [x] Build Genetic Helix data transformer (map audio features to DNA strands) ✅ implemented in processor
- [x] Build Time Tunnel data transformer (map listening history to timeline) ✅ implemented in processor
- [x] Create audio feature summary calculator ✅ included in processor
- [x] Create genre pattern analyzer ✅ included in processor
- [x] Create listening habit insights generator ✅ included in processor

### 2.3 AI Story Generation
- [x] Create OpenRouter client setup (`lib/openrouter.ts`) ✅ created with Claude 3.5 Sonnet
- [x] Design prompt template for cosmic story generation ✅ designed with cosmic/astronomical metaphors
- [x] Create function to generate taste narrative ✅ implemented generateTasteStory()
- [ ] Test AI generation with sample data (will test during integration)

## Phase 3: API Endpoints

### 3.1 Analysis Creation
- [x] Create `/api/analyze` POST endpoint ✅ created with full orchestration
- [x] Implement data fetching orchestration ✅ using getAllUserData()
- [x] Implement analysis processing ✅ using AnalysisProcessor
- [x] Implement AI story generation ✅ using generateTasteStory()
- [x] Save analysis to database with nanoid ✅ saved to MongoDB
- [x] Return public ID for redirect ✅ returns publicId and redirectUrl

### 3.2 Analysis Retrieval
- [x] Create `/api/taste/[id]` GET endpoint ✅ created with view counter
- [x] Fetch analysis by publicId from database ✅ implemented
- [x] Increment view counter ✅ increments and updates lastViewedAt
- [x] Return formatted analysis data ✅ returns clean response

### 3.3 Discovery Feed
- [x] Create `/api/feed` GET endpoint ✅ created with pagination
- [x] Implement pagination (9-12 items per page) ✅ default 12 items
- [x] Sort by newest first ✅ sorted by createdAt desc
- [x] Return feed data with user info ✅ returns formatted preview data

## Phase 4: Visualizations

### 4.1 Cosmic Observatory UI Components
- [x] Create Starfield background component (`components/ui/Starfield.tsx`) ✅ created with 1000+ animated stars
- [x] Create Aurora gradient background component ✅ created with animated gradients
- [x] Create scanner/radar UI elements ✅ created ScannerUI and RadarUI components
- [x] Create loading DNA animation component (`components/ui/LoadingDNA.tsx`) ✅ created with rotating messages
- [x] Create cosmic typography components ✅ created CosmicText, GlowingText, NeonText, OrbitText, ScannerText

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
