import { CategoriesCollection } from "@/payload/collections/Categories";
import { ProductsCollection } from "@/payload/collections/Products";

export const payloadConfig = {
  collections: [CategoriesCollection, ProductsCollection],
  admin: {
    user: "users",
  },
  db: {
    provider: "postgres",
    url: process.env.DATABASE_URL,
  },
};
