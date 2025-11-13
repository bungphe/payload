import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'tour', 'preferredDate', 'status', 'createdAt'],
    description: 'Tour inquiry submissions from the website',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // Allow public submissions
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'tour',
      type: 'relationship',
      relationTo: 'tours',
      admin: {
        description: 'The tour they are inquiring about',
      },
    },
    {
      name: 'preferredDate',
      type: 'date',
      required: true,
      admin: {
        description: "Customer's preferred tour date",
      },
    },
    {
      name: 'numberOfGuests',
      type: 'number',
      required: true,
      min: 1,
    },
    {
      name: 'pickupLocation',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      admin: {
        description: 'Internal notes (not visible to customer)',
      },
    },
  ],
}
