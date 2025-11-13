import type { CollectionConfig } from 'payload'

export const Tours: CollectionConfig = {
  slug: 'tours',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'destinations', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },

    // Categorization
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Wine Tours', value: 'wine' },
        { label: 'City Tours', value: 'city' },
        { label: 'Brewery Tours', value: 'brewery' },
        { label: 'Custom Tours', value: 'custom' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'destinations',
      type: 'relationship',
      relationTo: 'destinations',
      hasMany: true,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },

    // Tour Details
    {
      name: 'duration',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., "4-6 hours" or "Full Day"',
      },
    },
    {
      name: 'groupSize',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., "2-14 guests"',
      },
    },
    {
      name: 'priceFrom',
      type: 'number',
      required: true,
      admin: {
        description: 'Starting price in USD',
      },
    },
    {
      name: 'priceNote',
      type: 'text',
      admin: {
        description: 'e.g., "per person" or "per group"',
      },
    },

    // Pickup Locations
    {
      name: 'pickupLocations',
      type: 'array',
      label: 'Pickup Locations',
      fields: [
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'additionalFee',
          type: 'number',
          admin: {
            description: 'Additional fee for this pickup location (if any)',
          },
        },
      ],
    },

    // Tour Details Blocks
    {
      name: 'itinerary',
      type: 'array',
      label: 'Itinerary',
      fields: [
        {
          name: 'time',
          type: 'text',
          required: true,
        },
        {
          name: 'activity',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'included',
      type: 'array',
      label: "What's Included",
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'excluded',
      type: 'array',
      label: "What's Not Included",
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },

    // Media
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Main image for tour cards and headers',
      },
    },
    {
      name: 'gallery',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: {
        description: 'Additional images for tour gallery',
      },
    },

    // Status & Features
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show on homepage',
      },
    },
    {
      name: 'popular',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Mark as popular tour',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Active', value: 'active' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },

    // SEO
    {
      name: 'metaTitle',
      type: 'text',
      admin: {
        description: 'SEO title (leave empty to use tour title)',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        description: 'SEO description',
      },
    },
  ],
}
