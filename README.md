# Vibes TV - OTT Application

A modern OTT (Over-The-Top) streaming application built with React Native, Expo, and TMDB API. Features include browsing latest movies and TV shows, search functionality, trending content, and detailed movie information.

## Features

- 🎬 **Latest Movies & TV Shows** - Browse recently released content with pagination
- 🔥 **Trending Content** - Discover what's trending daily and weekly
- 🎭 **Popular Content** - Explore popular movies and TV shows
- 📺 **Upcoming Content** - See what's coming soon to theaters and streaming
- 🔍 **Search Functionality** - Search across movies and TV shows with real-time results
- 📱 **Movie Details** - Detailed information about movies including cast, budget, and more
- ♻️ **Optimized Caching** - React Query for efficient data fetching and caching
- 🎨 **Modern UI** - Beautiful dark theme with smooth animations

## Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **TypeScript** - Type safety and better developer experience
- **React Query** - Data fetching, caching, and synchronization
- **NativeWind** - Tailwind CSS for React Native
- **Expo Router** - File-based routing
- **React Native Reanimated** - Smooth animations
- **TMDB API** - Movie and TV show data

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- TMDB API Key

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd vibes-tv
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Get TMDB API Key**
   - Go to [TMDB website](https://www.themoviedb.org/)
   - Create an account and verify your email
   - Go to Settings → API
   - Request an API key (choose "Developer" option)
   - Copy your API Read Access Token

4. **Configure Environment Variables**

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and add your TMDB API token:

   ```
   EXPO_PUBLIC_TMDB_API_TOKEN=your_actual_api_token_here
   ```

5. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

6. **Run on device/simulator**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press 'i' for iOS simulator, 'a' for Android emulator

## API Features

### Movies

- Latest movies with pagination
- Popular movies with pagination
- Upcoming movies with pagination
- Trending movies (daily/weekly)
- Movie details with full information
- Movie search with pagination

### TV Shows

- Latest TV shows with pagination
- Popular TV shows with pagination
- Currently airing TV shows
- On-the-air TV shows
- Trending TV shows (daily/weekly)
- TV show search with pagination

### Search

- Multi-search across movies and TV shows
- Real-time search with debouncing
- Pagination support
- Filter by media type

## Optimization Features

### React Query Caching Strategy

- **Trending Content**: 30-minute stale time (changes frequently)
- **Popular Content**: 10-minute stale time (moderate changes)
- **Latest Content**: 5-minute stale time (frequent updates)
- **Upcoming Content**: 15-minute stale time (slow changes)
- **Movie Details**: 1-hour stale time (rarely changes)
- **Search Results**: 5-minute stale time (dynamic content)

### Performance Optimizations

- Infinite query pagination for large datasets
- Image optimization with fallbacks
- Debounced search (500ms delay)
- Lazy loading of content
- Efficient FlatList rendering
- Background refetch on network reconnection

## UI/UX Features

- **Dark Theme**: Optimized for OLED displays
- **Smooth Animations**: React Native Reanimated for 60fps animations
- **Pull-to-Refresh**: Refresh content with gesture
- **Loading States**: Skeleton loaders for better UX
- **Error Handling**: Graceful error states with retry options
- **Responsive Design**: Works on different screen sizes
