export interface LegalSubsection {
  heading: string;
  body: string;
  items?: string[];
}

export interface LegalCard {
  type: "notice" | "quote";
  body: string;
}

export interface LegalSectionData {
  id: string;
  heading: string;
  body?: string;
  items?: string[];
  subsections?: LegalSubsection[];
  card?: LegalCard;
}

export interface LegalNavItem {
  id: string;
  label: string;
}

export interface LegalBottomCta {
  headline: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface LegalPageProps {
  title: string;
  subtitle: string;
  sections: LegalSectionData[];
  navItems: LegalNavItem[];
  bottomCta: LegalBottomCta;
}

export interface LegalSectionDefinition {
  id: string;
  translationKey: string;
}
