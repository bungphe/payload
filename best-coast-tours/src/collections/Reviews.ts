import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'tour', 'rating', 'approved', 'createdAt'],
    description: 'Customer reviews and testimonials',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'customerName',
      type: 'text',
      required: true,
    },
    {
      name: 'tour',
      type: 'relationship',
      relationTo: 'tours',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      admin: {
        description: 'Rating from 1 to 5 stars',
      },
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'e.g., "San Diego, CA"',
      },
    },
    {
      name: 'date',
      type: 'date',
      admin: {
        description: 'Date of the tour',
      },
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Approve to show on website',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show on homepage',
      },
    },
  ],
}
