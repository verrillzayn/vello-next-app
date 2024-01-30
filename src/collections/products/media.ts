import { User } from "../../payload-types";
import { Access, CollectionConfig } from "payload/types";

const isAdminOrAccessToImages =
  (): Access =>
  async ({ req }) => {
    const user = req.user as User | undefined;

    if (!user) return false;
    if (user.role === "admin") return true;

    return {
      user: {
        equals: req.user.id,
      },
    };
  };

export const Media: CollectionConfig = {
  slug: "media",
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return { ...data, user: req.user.id };
      },
    ],
  },
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  access: {
    read: async ({ req }) => {
      const referer = req.headers.referer;

      if (!referer?.includes("sell") || !req.user) {
        return true;
      }

      return await isAdminOrAccessToImages()({ req });
    },
    delete: isAdminOrAccessToImages(), //this is secara teknikal passing req sama kaya  ({req}) => isAdminOrAccessToImages()({req})
    update: isAdminOrAccessToImages(),
  },
  upload: {
    staticURL: "/media",
    staticDir: "media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        height: undefined,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
    ],
    mimeTypes: ["image/*"],
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
  ],
};
