import { User } from "../../payload-types";
import { PRODUCT_CATEGORIES } from "../../config";
import { Access, CollectionConfig } from "payload/types";

const isAdminOrHasAccess =
  (): Access =>
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined;

    if (!user) return false;
    // if(user.role === 'admin') return true

    // this is where the is the product is owned by user logic...
    return true;
  };

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: isAdminOrHasAccess(),
    update: isAdminOrHasAccess(),
    delete: isAdminOrHasAccess(),
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Product details",
    },
    {
      name: "price",
      label: "price in Rp",
      min: 0,
      max: 99999999,
      type: "number",
      required: true,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
      required: true,
    },
    {
      name: "product_files",
      label: "Product file(s)",
      type: "relationship",
      required: true,
      relationTo: "product_files",
      hasMany: false,
      access: {
        create: ({ req }) => req.user.role === "admin",
        read: ({ req }) => req.user.role === "admin",
        update: ({ req }) => req.user.role === "admin",
      },
    },
    {
      name: "approvedForSale",
      label: "product Status",
      type: "select",
      defaultValue: "pending",
      options: [
        {
          label: "Pending verification",
          value: "pending",
        },
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Denied",
          value: "denied",
        },
      ],
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        update: () => false,
        read: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "stripeId",
      access: {
        create: () => false,
        update: () => false,
        read: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },

    {
      name: "images",
      type: "array",
      label: "Products images",
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
