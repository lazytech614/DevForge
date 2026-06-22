import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap:
    //TODO: Change this to actual domain
      "https://your-domain.com/sitemap.xml",
  };
}