import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://interfood-catering.ru";

  /* Fixed dates — update when content changes. Using new Date() causes
     search engines to re-crawl every time even if nothing changed. */
  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: "2025-06-15",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: "2025-06-10",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: "2025-06-10",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wedding`,
      lastModified: "2025-05-20",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/corporate`,
      lastModified: "2025-05-20",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: "2025-05-01",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: "2025-03-01",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: "2025-04-15",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: "2025-06-01",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: "2025-06-01",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/venues`,
      lastModified: "2025-04-01",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: "2025-05-01",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: "2025-03-15",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: "2025-06-01",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: "2025-05-01",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    /* Low-priority legal pages — still in sitemap for discoverability,
       but robots meta is noindex in their layouts */
    {
      url: `${baseUrl}/privacy`,
      lastModified: "2025-01-01",
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: "2025-01-01",
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  return pages;
}
