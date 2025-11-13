# Best Coast Tours - Project Structure Plan

## 🎯 Project Overview

Rebuild bestcoasttours.com using Next.js 15 + PayloadCMS 3 + MongoDB

## 📁 Proposed URL Structure (Based on Current Site)

### Public Pages

```
/                                    → Homepage
/tours                               → All tours listing (replaces /all-tours)
/tours/[category]                    → Tours by category (wine, city, brewery)
/tours/[category]/[slug]             → Individual tour detail
/destinations                        → All destinations
/destinations/[slug]                 → Destination detail (LA, SD, Temecula, OC)
/about                               → About page
/contact                             → Contact page
/blog                                → Blog listing
/blog/[slug]                         → Blog post detail
```

### Alternative: Keep Old URL Structure

```
/temecula-wine-tours                 → Wine tours category
/temecula-wine-tours/[tour-slug]     → Individual wine tour
/san-diego                           → San Diego tours
/san-diego/[tour-slug]               → Individual SD tour
/los-angeles                         → LA tours
/los-angeles/[tour-slug]             → Individual LA tour
/branch/[destination]                → Destination pages
/tourbycity/[tour-slug]              → Tours by city
/all-tours                           → All tours
/blog                                → Blog
/blog/[slug]                         → Blog post
```

## 🗂️ Payload Collections

### 1. Tours Collection

```typescript
{
  slug: 'tours',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'description', type: 'textarea' },
    { name: 'content', type: 'richText' }, // Full tour details

    // Categorization
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Wine Tours', value: 'wine' },
        { label: 'City Tours', value: 'city' },
        { label: 'Brewery Tours', value: 'brewery' },
        { label: 'Custom Tours', value: 'custom' }
      ]
    },
    {
      name: 'destinations',
      type: 'relationship',
      relationTo: 'destinations',
      hasMany: true
    },

    // Tour Details
    { name: 'duration', type: 'text' }, // "4-6 hours"
    { name: 'groupSize', type: 'text' }, // "2-14 guests"
    { name: 'priceFrom', type: 'number' },
    { name: 'priceNote', type: 'text' }, // "per person" or "per group"

    // Pickup Locations
    {
      name: 'pickupLocations',
      type: 'array',
      fields: [
        { name: 'city', type: 'text' },
        { name: 'additionalFee', type: 'number' }
      ]
    },

    // Tour Details Blocks
    {
      name: 'itinerary',
      type: 'array',
      fields: [
        { name: 'time', type: 'text' },
        { name: 'activity', type: 'text' },
        { name: 'description', type: 'textarea' }
      ]
    },
    {
      name: 'included',
      type: 'array',
      fields: [{ name: 'item', type: 'text' }]
    },
    {
      name: 'excluded',
      type: 'array',
      fields: [{ name: 'item', type: 'text' }]
    },

    // Media
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },

    // SEO & Status
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'popular', type: 'checkbox', defaultValue: false },
    { name: 'status', type: 'select', options: ['draft', 'active', 'archived'] },
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' },
  ]
}
```

### 2. Destinations Collection

```typescript
{
  slug: 'destinations',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'description', type: 'richText' },
    { name: 'shortDescription', type: 'textarea' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
    {
      name: 'attractions',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'description', type: 'textarea' }
      ]
    },
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' },
  ]
}
```

### 3. Inquiries Collection

```typescript
{
  slug: 'inquiries',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'tour', 'date', 'status', 'createdAt']
  },
  fields: [
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'tour', type: 'relationship', relationTo: 'tours' },
    { name: 'preferredDate', type: 'date' },
    { name: 'numberOfGuests', type: 'number' },
    { name: 'pickupLocation', type: 'text' },
    { name: 'message', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Cancelled', value: 'cancelled' }
      ],
      defaultValue: 'new'
    },
    { name: 'adminNotes', type: 'textarea' }
  ]
}
```

### 4. Reviews/Testimonials Collection

```typescript
{
  slug: 'reviews',
  admin: {
    useAsTitle: 'customerName'
  },
  fields: [
    { name: 'customerName', type: 'text', required: true },
    { name: 'tour', type: 'relationship', relationTo: 'tours' },
    { name: 'rating', type: 'number', min: 1, max: 5, required: true },
    { name: 'comment', type: 'textarea', required: true },
    { name: 'location', type: 'text' }, // "San Diego, CA"
    { name: 'date', type: 'date' },
    { name: 'approved', type: 'checkbox', defaultValue: false },
    { name: 'featured', type: 'checkbox', defaultValue: false }
  ]
}
```

### 5. Blog Posts Collection

```typescript
{
  slug: 'posts',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'excerpt', type: 'textarea' },
    { name: 'content', type: 'richText' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'author', type: 'text', defaultValue: 'Best Coast Tours' },
    { name: 'publishedAt', type: 'date' },
    { name: 'categories', type: 'relationship', relationTo: 'categories', hasMany: true },
    { name: 'relatedTours', type: 'relationship', relationTo: 'tours', hasMany: true },
    { name: 'status', type: 'select', options: ['draft', 'published'] },
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' },
  ]
}
```

### 6. Categories Collection (for blog)

```typescript
{
  slug: 'categories',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'description', type: 'textarea' }
  ]
}
```

### 7. Media Collection (built-in)

- Tour photos
- Destination photos
- Blog images
- Gallery images

### 8. Pages Collection (Flexible Pages)

```typescript
{
  slug: 'pages',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        { slug: 'hero', fields: [...] },
        { slug: 'content', fields: [...] },
        { slug: 'callToAction', fields: [...] },
        { slug: 'featuredTours', fields: [...] },
        { slug: 'testimonials', fields: [...] },
        { slug: 'gallery', fields: [...] }
      ]
    },
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' },
  ]
}
```

## 🌍 Globals

### Site Settings

```typescript
{
  slug: 'settings',
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Best Coast Tours' },
    { name: 'siteDescription', type: 'textarea' },
    { name: 'contactEmail', type: 'email' },
    { name: 'contactPhone', type: 'text' },
    { name: 'address', type: 'textarea' },
    { name: 'socialMedia', type: 'group', fields: [
      { name: 'facebook', type: 'text' },
      { name: 'instagram', type: 'text' },
      { name: 'twitter', type: 'text' },
      { name: 'yelp', type: 'text' }
    ]},
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'favicon', type: 'upload', relationTo: 'media' }
  ]
}
```

### Header Navigation

```typescript
{
  slug: 'header',
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'link', type: 'text' },
        {
          name: 'submenu',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'link', type: 'text' }
          ]
        }
      ]
    }
  ]
}
```

### Footer

```typescript
{
  slug: 'footer',
  fields: [
    { name: 'copyrightText', type: 'text' },
    {
      name: 'footerColumns',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' }
          ]
        }
      ]
    }
  ]
}
```

## 🎨 Frontend Structure

```
src/
├── app/
│   ├── (frontend)/
│   │   ├── page.tsx                          # Homepage
│   │   ├── tours/
│   │   │   ├── page.tsx                      # Tours listing
│   │   │   ├── [category]/
│   │   │   │   ├── page.tsx                  # Tours by category
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx              # Tour detail
│   │   ├── destinations/
│   │   │   ├── page.tsx                      # Destinations listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx                  # Destination detail
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── blog/
│   │       ├── page.tsx                      # Blog listing
│   │       └── [slug]/
│   │           └── page.tsx                  # Blog post
│   └── (payload)/
│       ├── admin/[[...segments]]/route.ts    # Admin panel
│       └── api/[...slug]/route.ts            # API routes
├── collections/
│   ├── Tours.ts
│   ├── Destinations.ts
│   ├── Inquiries.ts
│   ├── Reviews.ts
│   ├── Posts.ts
│   ├── Categories.ts
│   ├── Pages.ts
│   ├── Media.ts
│   └── Users.ts
├── globals/
│   ├── Settings.ts
│   ├── Header.ts
│   └── Footer.ts
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── TourCard.tsx
│   ├── InquiryForm.tsx
│   ├── ReviewCard.tsx
│   └── ...
├── blocks/                                   # Layout builder blocks
│   ├── Hero/
│   ├── Content/
│   ├── FeaturedTours/
│   ├── Testimonials/
│   └── Gallery/
└── payload.config.ts
```

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: PayloadCMS 3.x
- **Database**: MongoDB
- **Styling**: TailwindCSS + shadcn/ui
- **Forms**: React Hook Form
- **Image Optimization**: Next/Image + Sharp
- **Deployment**: Self-hosted (Docker ready)

## 📝 Key Features

### Homepage

- Hero section with CTA
- Featured tours carousel
- Tour categories grid
- Testimonials/Reviews section
- Instagram feed / Gallery
- Newsletter signup

### Tour Pages

- Tour filtering (category, destination, price)
- Tour search
- Grid/List view toggle
- Tour cards with images, price, rating

### Tour Detail Page

- Hero with image gallery
- Tour description
- Itinerary timeline
- Included/Excluded items
- Pricing details
- Pickup locations
- Inquiry form
- Related tours
- Reviews section

### Destination Pages

- Hero section
- Destination description
- Attractions list
- Available tours in destination
- Gallery

### Contact Page

- Contact form (saves to Inquiries collection)
- Contact info
- Map (optional)
- Social links

### Blog

- Blog listing with categories
- Blog post detail
- Related posts
- Related tours CTA

## 🔧 Admin Panel Features

- Dashboard with latest inquiries
- Tour management (CRUD)
- Inquiry management with status tracking
- Review moderation
- Media library
- Content management
- Site settings
- User management

## 📧 Email Notifications (Future)

- Inquiry confirmation email to customer
- Inquiry notification email to admin
- (Optional) Booking confirmations

## 🎯 SEO Features

- Meta tags per page/tour/destination
- Sitemap generation
- Robots.txt
- Open Graph images
- JSON-LD structured data for tours
- Image optimization

## 🔐 Security

- Secure admin panel
- Rate limiting on forms
- CSRF protection
- Input validation
- File upload restrictions

---

## Next Steps

1. ✅ Confirm URL structure
2. ✅ Confirm required features
3. ⬜ Setup project
4. ⬜ Configure collections
5. ⬜ Build frontend components
6. ⬜ Migrate content
7. ⬜ Testing
8. ⬜ Deployment
