import { Metadata } from "next";

export const getMetaData = ({
  description = "Turn waste into wealth with Admin - the ultimate recycling and pickup service platform",
  ...r
}: Metadata): Metadata => {
  const metaDescription =
    description ||
    "Turn waste into wealth with Admin - the ultimate recycling and pickup service platform";

  return {
    title: {
      default: "Admin",
      template: "%s | Admin",
    },
    description: metaDescription,
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "Admin",
    },
    formatDetection: {
      telephone: false,
    },
    openGraph: {
      type: "website",
      siteName: "Admin",
      title: "Admin",
      description: metaDescription,
    },
    twitter: {
      card: "summary",
      title: "Admin",
      description: metaDescription,
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png" },
        { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      ],
      shortcut: ["/apple-touch-icon.png"],
    },
    other: {
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "apple-mobile-web-app-title": "Admin",
      "application-name": "Admin",
      "msapplication-TileColor": "#548235",
      "msapplication-config": "/browserconfig.xml",
      "theme-color": "#548235",
    },
    ...r,
  };
};
