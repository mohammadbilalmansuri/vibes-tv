# Vibes TV Design Architecture

this app will have four screens

1. Main Screen - this will have three tabs - home tab, movies tab, tv shows tab
2. Movies Detail Screen
3. TV Shows Detail Screen
4. Search Screen

## Each screen ui design idea

1. Main Screen
   - **Header**: app logo (left), search icon (right)
   - **Bottom**: absolute tab navigation dock style
   - **Home tab ui**:
     - horizontal scrollable list of trending movies - at a time one movie card view like hotstar (auto-rotating carousel)
     - horizontal scrollable list of trending tv shows - at a time one movie card view like hotstar (auto-rotating carousel)
     - movie genre list
     - tv shows genre list
   - **Movies tab ui**:
     - popular movies list - horizontal scrollable list
     - now playing movies list - horizontal scrollable list
     - upcoming movies list - horizontal scrollable list
     - top rated movies list - horizontal scrollable list
     - multiple sections by genre - horizontal scrollable list - with load more functionality
   - **TV shows tab ui**:
     - popular tv shows list - horizontal scrollable list
     - airing today tv shows list - horizontal scrollable list
     - on the air tv shows list - horizontal scrollable list
     - top rated tv shows list - horizontal scrollable list
     - multiple sections by genre - horizontal scrollable list - with load more functionality

2. Movies Detail Screen
   - **Header**: back button (left), share and favorite icons (right)
   - **Hero section**: backdrop image with gradient overlay
   - **Content section**:
     - movie poster image (left) and basic info (right)
     - movie title and release date
     - rating stars/score with vote count
     - runtime and certification (PG, R, etc.)
     - genre chips/tags
     - movie overview/plot
     - cast carousel (top 10 actors with photos)
     - crew highlights (director, writer, producer)
     - trailers and videos section
     - similar/recommended movies
     - user reviews section
     - technical details (budget, revenue, production companies)

3. TV Shows Detail Screen
   - **Header**: back button (left), share and favorite icons (right)
   - **Hero section**: backdrop image with gradient overlay
   - **Content section**:
     - tv show poster image (left) and basic info (right)
     - tv show title and first air date
     - rating stars/score with vote count
     - episode runtime and total episodes/seasons
     - status (ongoing, ended, cancelled)
     - genre chips/tags
     - tv show overview/plot
     - seasons and episodes list (collapsible)
     - cast carousel (main cast with photos)
     - crew highlights (creators, producers)
     - trailers and videos section
     - similar/recommended shows
     - user reviews section
     - network/streaming info

4. Search Screen
   - **Header**: back button (left), app logo (center), filter icon (right)
   - **Search section**:
     - search input field (debounced) with filter media type toggle (All, Movies, TV Shows)
   - **Results section**:
     - search results in grid/list view with toggle option
     - "No results" state with suggestions
     - search result count display

## Other ui's

1. **Loading States**: Add skeleton screens and loading indicators
2. **Error States**: Network error, content not found, tmdb, server is down, etc.
3. **Empty States**: No content available, no search results
4. **Offline View**: Offline warning when app opens and no internet connection is detected
