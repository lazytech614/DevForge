import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    //TODO: Change this to actual domain

  return [
    {
      url:
        "https://your-domain.com",
      priority: 1,
    },

    {
      url:
        "https://your-domain.com/tools/prisma-visualizer",
      priority: 0.9,
    },

    {
      url:
        "https://your-domain.com/tools/sql-explainer",
      priority: 0.9,
    },

    {
      url:
        "https://your-domain.com/tools/rate-limiter",
      priority: 0.9,
    },
  ];
}