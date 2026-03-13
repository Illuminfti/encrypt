import { siteConfig, hasUrl } from "@/lib/site-config";

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavCTA {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

/** Main nav links — only includes routes/URLs that exist */
export function getNavItems(): NavItem[] {
  const items: NavItem[] = [
    { label: "Research", href: siteConfig.routes.research },
    { label: "Developers", href: siteConfig.routes.developers },
    { label: "Ecosystem", href: siteConfig.routes.ecosystem },
    { label: "Blog", href: siteConfig.routes.blog },
  ];

  if (hasUrl("docs")) {
    items.push({
      label: "Docs",
      href: siteConfig.urls.docs!,
      external: true,
    });
  }

  return items;
}

/** Nav CTA buttons */
export function getNavCTAs(): NavCTA[] {
  return [
    {
      label: "Read Research",
      href: siteConfig.routes.research,
      variant: "secondary",
    },
    {
      label: "Build on Encrypt",
      href: siteConfig.routes.developers,
      variant: "primary",
    },
  ];
}
