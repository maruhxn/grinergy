import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://grinergy.tech",
    },
    {
      url: "https://grinergy.tech/about/ourstory",
    },
    {
      url: "https://grinergy.tech/about/history",
    },
    {
      url: "https://grinergy.tech/product",
    },
    {
      url: "https://grinergy.tech/investors",
    },
    {
      url: "https://grinergy.tech/news",
    },
    {
      url: "https://grinergy.tech/notice",
    },
    {
      url: "https://grinergy.tech/contact",
    },
  ];
}
