"use client";

import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Logo from "@/components/Logo";
import { SmartLink } from "@/components/SmartLink";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  messages: {
    brand: {
      first: string;
      second: string;
    };
    statement: string;
    description: string;
    connect: string;
    product: FooterColumn;
    company: FooterColumn;
    legal: FooterColumn;
    signature: string;
    copyright: string;
  };
}

const InstagramIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[22px] h-[22px]"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[22px] h-[22px]"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const WhatsAppIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[22px] h-[22px]"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const EmailIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[22px] h-[22px]"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const socialLinks = [
  { href: "https://www.instagram.com/sifrmind", label: "Instagram", icon: InstagramIcon },
  { href: "https://www.facebook.com/share/1RuwZFnEF1", label: "Facebook", icon: FacebookIcon },
  { href: "https://wa.me/201029231051", label: "WhatsApp", icon: WhatsAppIcon },
  { href: "mailto:support@sifrmind.com", label: "Email", icon: EmailIcon },
];

export default function Footer({ messages }: FooterProps) {
  const { brand, statement, description, product, company, legal, signature } = messages;

  return (
    <footer className="rounded-t-[40px] overflow-hidden footer-glow">
      <Container>
        <div className="pt-20 pb-16">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-[42fr_19fr_19fr_20fr] gap-8 md:gap-6 items-start ltr px-4">
              {/* Left — Brand story + Social */}
              <div className="flex flex-col rtl">
                <div className="flex items-center gap-3">
                  <Logo width={64} className="shrink-0" />
                  <span className="text-xl font-bold tracking-tight text-brand">
                    {brand.first}
                    <span className="text-text-primary font-semibold">{brand.second}</span>
                  </span>
                </div>

                <p className="mt-6 text-4xl font-bold tracking-tight leading-[1.1] text-text-primary">
                  {statement}
                </p>

                <p className="mt-5 text-base text-text-secondary leading-7 max-w-[260px]">
                  {description}
                </p>

                {/* Social — icon-only */}
                <div className="mt-5 flex items-center gap-4">
                  {socialLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="text-text-muted hover:text-text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Product */}
              <div className="flex flex-col rtl">
                <h3 className="text-sm font-semibold text-text-primary mb-5">
                  {product.title}
                </h3>
                <ul className="space-y-3">
                  {product.links.map((link) => (
                    <li key={link.label}>
                      <SmartLink
                        href={link.href}
                        className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 inline-block hover-underline"
                      >
                        {link.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="flex flex-col rtl">
                <h3 className="text-sm font-semibold text-text-primary mb-5">
                  {company.title}
                </h3>
                <ul className="space-y-3">
                  {company.links.map((link) => (
                    <li key={link.label}>
                      <SmartLink
                        href={link.href}
                        className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 inline-block hover-underline"
                      >
                        {link.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div className="flex flex-col rtl">
                <h3 className="text-sm font-semibold text-text-primary mb-5">
                  {legal.title}
                </h3>
                <ul className="space-y-3">
                  {legal.links.map((link) => (
                    <li key={link.label}>
                      <SmartLink
                        href={link.href}
                        className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 inline-block hover-underline"
                      >
                        {link.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-16 pt-6 border-t border-border/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
              <p className="text-xs text-text-muted/70 italic">{signature}</p>
              <p className="text-sm text-text-secondary">{messages.copyright}</p>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </footer>
  );
}
