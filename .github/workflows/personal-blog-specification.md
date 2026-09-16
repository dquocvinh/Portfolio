# Personal Blog / Vlog — UI/UX Master Specification
## Personal Journal / Editorial Vlog

> **Purpose:** This document is the implementation-ready UX/UI specification for adding a standalone Personal Blog/Vlog section to the existing Portfolio.
>
> **Design direction:** Calm · Personal · Warm · Minimal · Story-driven
>
> **Core idea:** The Blog should feel like a personal digital journal where the author shares things learned, places visited, new experiences, and reflections — not like a generic news/blog template.

---

# 1. Project Context

The existing project already has a Portfolio and an established design system:

- Cream / coffee / gold palette
- Playfair Display for display/editorial typography
- DM Sans for body/UI text
- Framer Motion for subtle animations
- Vite + React
- GitHub Pages deployment with Vite base `/Portfolio/`

The Blog must have its own visual identity and information architecture while remaining visually consistent with the Portfolio.

The existing implementation plan defines `/blog` and `/blog/:slug`, static JSON as the MVP data source, and a future path toward Supabase + ChatBot/RAG integration.

**Important:** Do not redesign or break the existing Portfolio.

---

# 2. Product Vision

## Blog positioning

The Blog is a:

> **Personal Journal / Editorial Vlog**

It should communicate:

- Personal experiences
- Curiosity
- Continuous learning
- Travel
- Experimentation
- Reflection
- Growth over time

The emotional feeling should be:

> “I am reading someone's real journey.”

Not:

> “I am browsing a generic content-management website.”

## Suggested editorial tagline

**Stories, lessons & moments from my journey.**

Alternative supporting line:

> A personal collection of things I've learned, places I've been, and experiences worth remembering.

---

# 3. Primary Content Categories

Keep the MVP to three primary categories:

1. **Learning**
   - Courses
   - Certifications
   - Programming
   - University
   - Skills
   - Self-learning

2. **Travel**
   - Trips
   - Places
   - Food
   - Local experiences
   - Personal travel reflections

3. **Experience**
   - Trying something new
   - Product reviews
   - Events
   - Personal experiments
   - Life reflections

Do not create too many top-level categories.

Use tags for more granular classification.

Example:

```text
Category: Learning

Tags:
#React
#Programming
#University
#SelfLearning
```

---

# 4. Information Architecture

```text
Portfolio
│
├── Home
├── About
├── Projects
├── Certificates
├── ...
│
└── Blog
    │
    ├── /blog
    │   ├── Blog Hero
    │   ├── Featured Story
    │   ├── Explore Stories
    │   ├── Search
    │   ├── Story Grid
    │   ├── Topics
    │   └── Footer
    │
    └── /blog/:slug
        ├── Reading Progress
        ├── Article Header
        ├── Cover Image
        ├── Article Content
        ├── Table of Contents
        ├── Key Takeaways
        ├── Personal Note
        ├── Author Card
        ├── Related Stories
        └── Back to Blog
```

The Blog should feel like an independent section of the website, not simply another Portfolio section.

---

# 5. Global Blog Navigation

## Desktop

The existing Navbar should include:

```text
Portfolio navigation ... | Blog
```

When inside Blog:

```text
← Portfolio
```

should provide a clear way back to the main Portfolio.

Use React Router navigation.

Do not use hardcoded full URLs.

## Mobile

Keep the existing Portfolio navigation behavior and add Blog consistently.

Avoid creating a completely separate navigation system unless the existing Navbar architecture requires it.

---

# 6. Blog Home — `/blog`

## Section order

Recommended order:

```text
1. Blog Hero
2. Featured Story
3. Explore Stories / Search
4. Story Grid
5. Explore by Topics
6. Optional Currently section
7. Footer
```

---

# 7. Blog Hero

The Hero should be compact.

Do NOT use a full-screen Hero like the main Portfolio landing page.

## Content

Suggested structure:

```text
PERSONAL JOURNAL · 2024 — 2026

Stories, lessons
& moments from my journey.

A personal collection of things I've learned,
places I've been, and experiences worth remembering.

                    ↓ Explore stories
```

## Visual direction

Use:

- Cream background
- Editorial whitespace
- Playfair Display heading
- DM Sans supporting copy
- Very subtle ambient background
- Optional paper/grain texture
- Thin editorial dividers

Avoid:

- Huge gradients
- Excessive glassmorphism
- Neon effects
- Excessive motion
- SaaS/dashboard visual language

The Hero should feel calm and intimate.

---

# 8. Featured Story

Place one featured article immediately after the Hero.

## Desktop layout

Recommended ratio:

```text
┌─────────────────────────┬─────────────────────────┐
│                         │ FEATURED                │
│                         │                         │
│       COVER IMAGE       │ Article title           │
│                         │                         │
│                         │ Short description       │
│                         │                         │
│                         │ Date · Read time        │
│                         │                         │
│                         │ Read story →            │
└─────────────────────────┴─────────────────────────┘
```

Approximate:

- 55% image
- 45% content

## Mobile

Stack vertically:

```text
IMAGE

FEATURED
Category

Title

Excerpt

Date · Read time

Read story →
```

## Interaction

On hover:

- Image scale: approximately `1.03`
- Arrow moves slightly right
- Very subtle card/content transition

Do not over-animate.

---

# 9. Explore Stories

Use a combination of category filters and search.

## Category tabs

```text
EXPLORE STORIES

[ All ] [ Learning ] [ Travel ] [ Experience ]
```

Active state should be visually clear but subtle.

Recommended interaction:

- Animated underline or pill background
- Layout transition
- Content fade/slide

On mobile:

```text
[All] [Learning] [Travel] [Experience] →
```

Use horizontal scrolling rather than wrapping into multiple rows.

---

# 10. Search

Search should feel editorial and lightweight.

```text
┌──────────────────────────────────────────┐
│ 🔍  Search stories...                    │
└──────────────────────────────────────────┘
```

Search fields:

- title
- excerpt
- tags
- category

Use client-side search for MVP.

Recommended debounce:

```text
200–300ms
```

Search results should update without page reload.

Example:

```text
12 stories

Search results for "react"
```

Empty result:

```text
No stories found.

Try another keyword or explore all stories.
```

---

# 11. Story Grid

Use a responsive grid.

Desktop:

```text
3 columns
```

Tablet:

```text
2 columns
```

Mobile:

```text
1 column
```

Each card should contain only useful metadata.

Recommended:

```text
COVER IMAGE

CATEGORY · DATE · READ TIME

Title

Short excerpt
```

Do not overload cards with:

- author
- updated date
- location
- views
- likes
- certificate issuer
- multiple metadata rows

Detailed metadata belongs on the article page.

---

# 12. Blog Card

Create a reusable:

```text
BlogCard
```

Suggested structure:

```text
┌──────────────────────────────┐
│                              │
│          COVER IMAGE         │
│                              │
└──────────────────────────────┘

TRAVEL · MAY 24, 2026 · 6 MIN READ

A Weekend That Made
Me Slow Down

Some experiences don't need
to be extraordinary...
```

## Hover

- Image `scale(1.03)`
- Small arrow appears or moves
- Slight elevation
- Keep transition around 200–400ms

Avoid large transforms.

---

# 13. Category Badge

Create reusable:

```text
CategoryBadge
```

Suggested visual language:

- Learning → coffee tone
- Travel → warm gold
- Experience → neutral taupe

The exact colors must use the existing project design tokens whenever available.

Do not introduce unrelated colors.

---

# 14. Explore by Topics

Instead of a traditional “Tag Cloud”, use:

```text
EXPLORE BY TOPICS

#University
#Programming
#React
#Travel
#SelfLearning
#Productivity
#Technology
#Life
```

Show approximately 5–8 popular tags.

Clicking a tag filters the story list.

Do not make the tags visually random in size like a traditional tag cloud.

---

# 15. Optional Signature Feature — Currently

This feature is recommended because it gives the Blog a strong personal identity.

Example:

```text
CURRENTLY

📖 Learning
React & System Design

📍 Exploring
Ho Chi Minh City

🎧 Listening
...

💭 Thinking about
What makes a meaningful career?
```

Keep it short.

This should feel like a journal snapshot, not a dashboard.

It can be implemented as a small editorial section near the bottom of `/blog`.

---

# 16. Article Detail — `/blog/:slug`

The article page is the primary reading experience.

Prioritize:

1. readability
2. typography
3. whitespace
4. image quality
5. navigation
6. personal voice

---

# 17. Article Header

Recommended:

```text
TRAVEL

What Traveling Alone
Taught Me About Myself

Sometimes leaving familiar places
is the fastest way to understand
where you actually belong.

JUNE 12, 2026 · 8 MIN READ
```

Use:

- Playfair Display for title
- DM Sans for subtitle/meta
- Large editorial spacing
- Category label above title

Desktop title:

```text
~64–80px
```

Mobile:

```text
~40–48px
```

Do not hardcode exact values if the existing responsive design tokens dictate different values.

---

# 18. Cover Image

Place the article cover below the header.

Desktop:

- wide
- high-quality
- generous vertical spacing

Mobile:

- maintain aspect ratio
- avoid excessive cropping
- preserve focal point

Use semantic `alt` text.

---

# 19. Reading Progress

Create:

```text
ReadingProgressBar
```

Fixed to the top of the viewport.

Requirements:

- Thin
- Subtle
- Progress from 0% to 100%
- Track article content, not entire page
- Respect reduced-motion preferences where relevant

---

# 20. Article Content Layout

Desktop:

```text
                    ARTICLE

             ┌─────────────────┐
             │                 │
             │     CONTENT     │
             │     ~740px      │
             │                 │
             └─────────────────┘

                         TABLE OF CONTENTS
```

Recommended content width:

```text
720–760px
```

Do not make body text full-width.

## Typography

Body:

- DM Sans
- comfortable line height
- approximately `1.7–1.85`

Headings:

- Playfair Display or existing display font

Paragraph spacing should be generous.

---

# 21. Table of Contents

Desktop only if there is enough room.

Structure:

```text
ON THIS PAGE

01 Introduction
02 Why I Went
03 What Happened
04 What I Learned
05 Final Thoughts
```

Behavior:

- sticky on desktop
- active heading highlighted while scrolling
- clicking heading smoothly scrolls to section
- mobile can collapse into a simple expandable TOC

Do not display TOC if an article is too short to benefit from it.

---

# 22. Article Content Styling

Create:

```text
PostContent
```

with a dedicated:

```text
.blog-prose
```

style system.

Style:

- h1
- h2
- h3
- p
- ul
- ol
- blockquote
- links
- images
- captions
- code
- inline code
- tables if needed
- horizontal rules

Images should:

- have rounded corners only if consistent with the Portfolio
- use appropriate spacing
- never exceed content width
- support captions

Blockquotes should feel editorial, not like default browser styling.

---

# 23. Key Takeaways

Add a reusable section:

```text
KEY TAKEAWAYS

01
You don't need to know the whole
journey before taking the first step.

02
Small experiences often teach more
than carefully planned ones.

03
...
```

This is valuable both for human readers and future ChatBot/RAG use.

Add to data model:

```json
"keyTakeaways": [
  "..."
]
```

---

# 24. Personal Note

Near the end of the article:

```text
A PERSONAL NOTE

I wrote this because...

Sometimes I forget how much
I've changed until I look back
at the experiences that shaped me.

— Minh
```

This is an important part of the Personal Journal identity.

It should feel personal but not overly decorative.

---

# 25. Author Card

Suggested structure:

```text
┌────────────────────────────────────────┐
│                                        │
│ [Avatar]                               │
│                                        │
│ Written by Minh                        │
│ Student · Developer · Curious          │
│                                        │
│ I write about things I learn,          │
│ places I go and things I try.          │
│                                        │
│ View Portfolio →                       │
└────────────────────────────────────────┘
```

Reuse the author's existing Portfolio identity and assets where possible.

Do not duplicate profile data in multiple unrelated files if it already exists in the project.

---

# 26. Related Stories

At the bottom:

```text
YOU MAY ALSO LIKE
```

Show 2–3 related posts.

Simple relevance algorithm for MVP:

```text
same category
    ↓
matching tags
    ↓
recent posts
```

Do not require AI for related posts.

Do not show the current article in related results.

---

# 27. Share

Primary actions:

```text
[ Copy link ] [ LinkedIn ] [ X ]
```

On mobile:

```text
[ ↗ Share ]
```

Use the native Web Share API where supported.

Copy link should provide a small success feedback:

```text
Link copied
```

Avoid large toast notifications.

---

# 28. Back to Blog

Provide a clear action near the end or header:

```text
← Back to Blog
```

Use React Router navigation.

Avoid browser-history-only navigation for this primary action.

---

# 29. Responsive Behavior

## Desktop

- editorial two-column article layout when appropriate
- sticky TOC
- 3-column story grid
- large typography
- generous whitespace

## Tablet

- 2-column story grid
- reduce Hero typography
- TOC may remain if space allows

## Mobile

- 1-column story grid
- horizontal category scrolling
- compact navigation
- no persistent side TOC
- readable article width
- large tap targets
- share via native share where supported

Never sacrifice readability to preserve desktop layout.

---

# 30. Animation System

Use Framer Motion consistently with the existing Portfolio.

## Page entrance

Subtle:

```text
opacity: 0 → 1
```

## Hero

Small vertical entrance:

```text
y: 20 → 0
```

## Story cards

Use staggered entrance:

```text
card 1: 0ms
card 2: 80ms
card 3: 160ms
...
```

## Hover

Image:

```text
scale: 1 → 1.03
```

Arrow:

```text
x: 0 → 4
```

## Filter transitions

Use:

- opacity
- layout animation
- small translate

Avoid:

- dramatic page transitions
- large rotations
- bouncing UI
- unnecessary parallax

Overall motion personality:

> calm, premium, editorial

Respect:

```text
prefers-reduced-motion
```

---

# 31. Color / Design System

Continue using the existing design tokens.

Base:

```text
Cream
Sand
Coffee
Gold
Taupe
White
```

Existing direction:

- Background → cream
- Secondary sections → sand
- Cards → white with subtle transparency
- Hover → coffee
- Featured accents → gold

Do not introduce a completely new visual system.

Avoid excessive glassmorphism.

Cards should feel like:

> paper / editorial surface

rather than:

> floating SaaS panels

---

# 32. Typography

Use existing project font definitions.

## Display

```text
Playfair Display
```

For:

- page title
- article title
- editorial headings

## Body/UI

```text
DM Sans
```

For:

- paragraphs
- metadata
- navigation
- buttons
- filters
- search

Maintain a clear typographic hierarchy.

---

# 33. Data Model

MVP can continue using static JSON.

Recommended structure:

```json
{
  "id": "string",
  "slug": "string",

  "title": "string",
  "subtitle": "string",
  "excerpt": "string",

  "content": "string",

  "category": "learning | travel | experience",
  "tags": ["string"],

  "coverImage": "string",

  "date": "YYYY-MM-DD",
  "updatedAt": "YYYY-MM-DD",

  "readTime": 5,

  "featured": false,

  "keyTakeaways": [
    "string"
  ],

  "personalNote": "string",

  "metadata": {
    "location": "string",
    "certName": "string",
    "certIssuer": "string"
  }
}
```

Do not make all metadata mandatory.

Travel posts may use:

```text
location
```

Learning posts may use:

```text
certName
certIssuer
```

Experience posts may use neither.

---

# 34. Content Source Strategy

## MVP

Use:

```text
src/data/blog/posts.json
```

Advantages:

- no backend
- simple GitHub Pages deployment
- easy development
- easy migration later

## Future

Potential architecture:

```text
React Frontend
       ↓
Supabase
       ↓
PostgreSQL
       ↓
Render Backend
       ↓
ChatBot / RAG
```

Do not implement the database unless explicitly requested.

Keep the data model migration-friendly.

---

# 35. Component Architecture

Recommended:

```text
src/
├── pages/
│   ├── BlogPage.tsx
│   └── BlogPostPage.tsx
│
├── components/
│   └── blog/
│       ├── BlogHero.tsx
│       ├── FeaturedPost.tsx
│       ├── CategoryFilter.tsx
│       ├── SearchBar.tsx
│       ├── BlogCard.tsx
│       ├── CategoryBadge.tsx
│       ├── TagList.tsx
│       ├── CurrentlySection.tsx
│       ├── PostHeader.tsx
│       ├── PostContent.tsx
│       ├── TableOfContents.tsx
│       ├── ReadingProgressBar.tsx
│       ├── KeyTakeaways.tsx
│       ├── PersonalNote.tsx
│       ├── AuthorCard.tsx
│       ├── ShareButtons.tsx
│       └── RelatedPosts.tsx
│
├── data/
│   └── blog/
│       └── posts.json
│
└── types/
    └── blog.ts
```

Keep components focused.

Do not create giant page components containing all Blog logic.

---

# 36. Routing

Use React Router.

Required routes:

```text
/          → Portfolio
/blog      → BlogPage
/blog/:slug → BlogPostPage
```

The project currently needs `react-router-dom` if it is not already installed.

Because deployment uses GitHub Pages, ensure SPA routing works with the existing Vite base path:

```text
/Portfolio/
```

If using BrowserRouter, preserve the required GitHub Pages fallback/404 strategy.

Do not break existing Portfolio routes.

---

# 37. Loading States

For future dynamic data compatibility, define loading UI even if JSON loads immediately.

Example:

```text
Skeleton image
Skeleton title
Skeleton metadata
Skeleton excerpt
```

Do not use a large spinner as the primary loading experience.

---

# 38. Empty States

No posts:

```text
No stories yet.

I'm still writing the next chapter.
```

No search results:

```text
No stories found.

Try another keyword or explore all stories.
```

No category results:

```text
Nothing here yet.

More stories are coming soon.
```

Empty states should maintain the personal tone.

---

# 39. Error States

If a slug does not exist:

```text
Story not found.

This page may have moved or the story
hasn't been published yet.

← Back to Blog
```

Do not expose raw JavaScript errors to users.

---

# 40. Accessibility

Must support:

- semantic HTML
- proper heading hierarchy
- alt text for images
- keyboard navigation
- visible focus states
- accessible buttons
- sufficient contrast
- reduced motion
- meaningful link labels
- no interaction relying solely on hover

Category filters should use actual buttons.

Navigation should use actual links.

---

# 41. SEO

Each article should have dynamic metadata where the existing project architecture allows.

For `/blog/:slug`:

- `<title>`
- description
- canonical URL where appropriate
- Open Graph title
- Open Graph description
- Open Graph image

Use the article title and excerpt.

Do not expose internal implementation details in metadata.

---

# 42. Performance

Optimize:

- image loading
- unnecessary re-renders
- large article assets
- animations

Use lazy loading for non-critical images where appropriate.

The Blog should remain fast on mobile networks.

Do not add heavy dependencies unless they solve a real requirement.

---

# 43. MVP Scope

Implement first:

```text
✓ /blog
✓ /blog/:slug
✓ Blog Hero
✓ Featured Story
✓ Category Filter
✓ Search
✓ Blog Cards
✓ Article Header
✓ Article Content
✓ Reading Progress
✓ Table of Contents
✓ Key Takeaways
✓ Personal Note
✓ Author Card
✓ Related Stories
✓ Share
✓ Responsive design
✓ Loading / empty / error states
✓ Accessibility basics
✓ SEO basics
```

---

# 44. Phase 2

Do NOT implement unless requested:

```text
○ Supabase
○ CMS/Admin
○ Comments
○ Likes
○ View counter
○ Newsletter
○ Timeline / My Journey
○ Advanced Currently system
○ Dark mode
○ AI semantic search
○ ChatBot integration
○ RAG pipeline
```

---

# 45. Design Principles

The implementation must follow these principles:

## 1. Personal over generic

The site should feel authored by a person.

## 2. Editorial over dashboard

Prioritize typography, imagery, whitespace and storytelling.

## 3. Calm over flashy

Animations should support comprehension.

## 4. Content over decoration

Never add visual effects that compete with article content.

## 5. Consistency over reinvention

Reuse the existing Portfolio design system.

## 6. Mobile-first readability

Article reading experience is more important than preserving desktop composition.

## 7. Future-ready data

Keep the JSON schema compatible with a future Supabase/RAG migration.

---

# 46. Acceptance Criteria

The implementation is considered successful when:

## Navigation

- [ ] Navbar contains Blog
- [ ] Blog navigates to `/blog`
- [ ] Blog can navigate back to Portfolio
- [ ] Existing Portfolio navigation still works

## Blog Home

- [ ] Hero renders correctly
- [ ] Featured post renders correctly
- [ ] Category filters work
- [ ] Search works
- [ ] Tags can filter content
- [ ] Story cards are responsive
- [ ] Empty states work

## Article

- [ ] `/blog/:slug` resolves correctly
- [ ] Invalid slug shows a friendly error/not-found state
- [ ] Reading progress works
- [ ] Article typography is readable
- [ ] TOC works
- [ ] Active TOC heading updates
- [ ] Key Takeaways render when available
- [ ] Personal Note renders when available
- [ ] Related posts work
- [ ] Share/copy-link works
- [ ] Back to Blog works

## Responsive

- [ ] Desktop works
- [ ] Tablet works
- [ ] Mobile works
- [ ] No horizontal overflow
- [ ] Touch targets are usable

## Accessibility

- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] Images have alt text
- [ ] Heading hierarchy is correct
- [ ] Reduced motion is respected

## Deployment

- [ ] `npm run build` succeeds
- [ ] TypeScript/Vite errors are resolved
- [ ] GitHub Pages routing works
- [ ] Existing Portfolio remains functional

---

# 47. Implementation Guidance for the Coding Agent

Before coding:

1. Inspect the existing project structure.
2. Inspect the current Navbar.
3. Inspect existing design tokens/colors.
4. Inspect typography configuration.
5. Inspect existing Framer Motion patterns.
6. Inspect existing responsive breakpoints.
7. Inspect the current Vite `base` configuration.
8. Inspect existing routing before installing/replacing dependencies.
9. Reuse existing components where appropriate.
10. Do not overwrite unrelated Portfolio functionality.

Then implement the Blog incrementally.

Recommended order:

```text
1. Types + data
2. Routing
3. Blog Home shell
4. Blog Hero
5. Featured Story
6. Filters + Search
7. Blog Cards
8. Article route
9. Article Header
10. Post Content
11. Reading Progress
12. TOC
13. Key Takeaways
14. Personal Note
15. Author Card
16. Related Posts
17. Share
18. Responsive polish
19. Accessibility
20. SEO
21. Build verification
```

---

# 48. Important Constraints

Do not:

- redesign the entire Portfolio
- replace the existing design system
- introduce unnecessary UI libraries
- add a database for MVP
- add authentication
- add a CMS
- add excessive animation
- use generic stock-blog styling
- make the article full-width
- overload cards with metadata
- break GitHub Pages deployment

The result should look like a carefully designed personal editorial website.

---

# 49. Final Creative Direction

The final experience should feel like:

```text
            PERSONAL JOURNAL

Stories, lessons
& moments from my journey.

────────────────────────────────────

FEATURED STORY

[          beautiful image          ]

A story worth remembering.

────────────────────────────────────

EXPLORE STORIES

[ All ] [ Learning ] [ Travel ] [ Experience ]

[ Search stories... ]

────────────────────────────────────

STORIES

[ Story ]       [ Story ]       [ Story ]

[ Story ]       [ Story ]       [ Story ]

────────────────────────────────────

EXPLORE BY TOPICS

#Learning  #Travel  #React  #Life ...

────────────────────────────────────

CURRENTLY

Learning · Exploring · Thinking

────────────────────────────────────

Footer
```

And an article:

```text
             TRAVEL

       What Traveling Alone
       Taught Me About Myself

     A short personal introduction.

          JUNE 12, 2026
            8 MIN READ

             [IMAGE]

          ARTICLE CONTENT

       ───────────────────

          KEY TAKEAWAYS

       ───────────────────

          A PERSONAL NOTE

       ───────────────────

          WRITTEN BY MINH

       ───────────────────

          YOU MAY ALSO LIKE
```

**Success criterion:**

> When someone visits the Blog, they should feel that they are entering a personal archive of someone's journey — not a generic blog template.

