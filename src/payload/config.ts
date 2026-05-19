import { CategoriesCollection } from "@/payload/collections/Categories";
import { FaqsCollection } from "@/payload/collections/Faqs";
import { HomepageCollection } from "@/payload/collections/Homepage";
import { MediaCollection } from "@/payload/collections/Media";
import { ProductsCollection } from "@/payload/collections/Products";
import { SiteSettingsCollection } from "@/payload/collections/SiteSettings";
import { TestimonialsCollection } from "@/payload/collections/Testimonials";

export const payloadConfig = {
  collections: [
    CategoriesCollection,
    ProductsCollection,
    MediaCollection,
    HomepageCollection,
    TestimonialsCollection,
    FaqsCollection,
    SiteSettingsCollection,
  ],
  admin: {
    user: "users",
  },
  db: {
    provider: "postgres",
    url: process.env.DATABASE_URL,
  },
};
