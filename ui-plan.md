# Vibes TV – Mobile App UI Plan

This app will have **6 screens**:

1. **Tabs (Bottom Navigation)**

   - Home
   - Movies
   - TV Shows

2. **Movies Detail Screen**
3. **TV Shows Detail Screen**
4. **Search Screen**

---

## Global UI Patterns

- **Header (Tabs screens):**

  - Left: App logo
  - Right: Search icon

- **Bottom Navigation:**

  - Absolute dock style tab bar

- **Loading states:** Skeleton screens
- **Fallbacks:** Offline screen, 404 (not found) screen

---

## 1. Home Screen (Tab)

```
 -------------------------------------------------
| Logo                              [Search Icon] |
 -------------------------------------------------
| [Trending Movies Carousel   >>>]                |
| [Trending TV Shows Carousel >>>]                |
| Genres: [Action] [Drama] [Comedy] ...           |
| TV Genres: [Sitcom] [Crime] [Sci-Fi] ...        |
 -------------------------------------------------
|      [ Home ]  [ Movies ]  [ TV ] (Bottom Tabs) |
 -------------------------------------------------
```

---

## 2. Movies Screen (Tab)

```
 -------------------------------------------------
| Logo                              [Search Icon] |
 -------------------------------------------------
| Popular Movies    [Card -> Card -> Card >>>]    |
| Now Playing       [Card -> Card -> Card >>>]    |
| Upcoming Movies   [Card -> Card -> Card >>>]    |
| Top Rated         [Card -> Card -> Card >>>]    |
| By Genre: Action  [Card -> Card -> ... Load >]  |
| By Genre: Drama   [Card -> Card -> ... Load >]  |
 -------------------------------------------------
|      [ Home ]  [ Movies ]  [ TV ] (Bottom Tabs) |
 -------------------------------------------------
```

---

## 3. TV Shows Screen (Tab)

```
 -------------------------------------------------
| Logo                              [Search Icon] |
 -------------------------------------------------
| Popular TV Shows  [Card -> Card -> Card >>>]    |
| Airing Today      [Card -> Card -> Card >>>]    |
| On The Air        [Card -> Card -> Card >>>]    |
| Top Rated         [Card -> Card -> Card >>>]    |
| By Genre: Sitcom  [Card -> Card -> ... Load >]  |
| By Genre: Crime   [Card -> Card -> ... Load >]  |
 -------------------------------------------------
|      [ Home ]  [ Movies ]  [ TV ] (Bottom Tabs) |
 -------------------------------------------------
```

---

## 4. Movie Detail Screen

```
 -------------------------------------------------
| [< Back]                    [♥ Fav] [↗ Share] |
 -------------------------------------------------
| [Backdrop Image with Gradient Overlay]          |
 -------------------------------------------------
| [Poster]   Title (2024)                         |
|            ⭐ 8.5 (1200 votes)                   |
|            120min | PG-13                       |
| Genres: [Action] [Thriller] [Sci-Fi]            |
 -------------------------------------------------
| Overview / Plot (text block)                    |
 -------------------------------------------------
| Cast: [Actor1] [Actor2] [Actor3] >>>            |
| Crew: Director, Writer, Producer                |
 -------------------------------------------------
| Trailers & Videos (thumbnails)                  |
| Similar Movies (cards scroll)                   |
| User Reviews                                    |
| Technical Details: Budget, Revenue, Studios     |
 -------------------------------------------------
```

---

## 5. TV Show Detail Screen

```
 -------------------------------------------------
| [< Back]                    [♥ Fav] [↗ Share] |
 -------------------------------------------------
| [Backdrop Image with Gradient Overlay]          |
 -------------------------------------------------
| [Poster]   Title (2023)                         |
|            ⭐ 7.9 (850 votes)                    |
|            45min | 3 Seasons (24 Episodes)      |
| Status: Ongoing                                 |
| Genres: [Drama] [Mystery]                       |
 -------------------------------------------------
| Overview / Plot (text block)                    |
 -------------------------------------------------
| Seasons (collapsible list)                      |
| Cast: [Actor1] [Actor2] [Actor3] >>>            |
| Crew: Creators, Producers                       |
 -------------------------------------------------
| Trailers & Videos (thumbnails)                  |
| Similar Shows (cards scroll)                    |
| User Reviews                                    |
| Network: Netflix / HBO / etc.                   |
 -------------------------------------------------
```

---

## 6. Search Screen

```
 -------------------------------------------------
| [< Back]         [App Logo]         [Filter]   |
 -------------------------------------------------
| [ Search Input Field ......... ]  [Type Toggle]|
| (All | Movies | TV Shows)                       |
 -------------------------------------------------
| Results (Grid/List Toggle)                      |
| [Card][Card][Card]                              |
| [Card][Card][Card]                              |
| Count: 120 results                              |
 -------------------------------------------------
| Empty State: "No Results Found"                 |
| Suggestions: Try other keywords                 |
 -------------------------------------------------
```

---

## Extra Suggestions

1. Use skeletons while loading lists/details. - use simmer animation
2. Offline screen for no network state.
3. 404 screen for invalid routes.
4. Server Busy or error ui in screens (tmdb sometimes stay down)
5. error ui in screens
6. use that default theme color pallet added in tailwind config css
