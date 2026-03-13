import { siteConfig, hasUrl } from "@/lib/site-config";

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "x" | "github" | "discord";
}

/** Build footer columns — only includes links that resolve */
export function getFooterColumns(): FooterColumn[] {
  const columns: FooterColumn[] = [
    {
      title: "Product",
      links: [
        { label: "Developers", href: siteConfig.routes.developers },
        { label: "Research", href: siteConfig.routes.research },
        { label: "Ecosystem", href: siteConfig.routes.ecosystem },
        { label: "Blog", href: siteConfig.routes.blog },
      ],
    },
  ];

  // Resources column — only add links that exist
  const resourceLinks: FooterLink[] = [];
  if (hasUrl("docs")) {
    resourceLinks.push({
      label: "Docs",
      href: siteConfig.urls.docs!,
      external: true,
    });
  }
  if (hasUrl("github")) {
    resourceLinks.push({
      label: "GitHub",
      href: siteConfig.urls.github!,
      external: true,
    });
  }
  if (hasUrl("mediaKit")) {
    resourceLinks.push({
      label: "Media kit",
      href: siteConfig.urls.mediaKit!,
      external: true,
    });
  }
  if (resourceLinks.length > 0) {
    columns.push({ title: "Resources", links: resourceLinks });
  }

  // Company column
  const companyLinks: FooterLink[] = [];
  if (hasUrl("dwalletLabs")) {
    companyLinks.push({
      label: siteConfig.parentCompany,
      href: siteConfig.urls.dwalletLabs!,
      external: true,
    });
  }
  if (hasUrl("ika")) {
    companyLinks.push({
      label: siteConfig.sisterProject,
      href: siteConfig.urls.ika!,
      external: true,
    });
  }
  if (companyLinks.length > 0) {
    columns.push({ title: "Company", links: companyLinks });
  }

  return columns;
}

/** Social links — only includes configured URLs */
export function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [];
  if (hasUrl("x")) {
    links.push({ label: "X", href: siteConfig.urls.x!, icon: "x" });
  }
  if (hasUrl("github")) {
    links.push({
      label: "GitHub",
      href: siteConfig.urls.github!,
      icon: "github",
    });
  }
  if (hasUrl("discord")) {
    links.push({
      label: "Discord",
      href: siteConfig.urls.discord!,
      icon: "discord",
    });
  }
  return links;
}

export const footerBrand = {
  name: siteConfig.name,
  tagline: siteConfig.tagline,
  footnote: `From the team behind ${siteConfig.sisterProject}`,
} as const;
