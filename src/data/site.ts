export const site = {
  name: 'Sam Weldon',
  tagline:
    'Sam is a senior at Columbia University studying Information Science.',
  resumeUrl: '/Resume.pdf',
};

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
  /** The email glyph is drawn larger than the logos, so it renders smaller. */
  iconClass: string;
};

export const socialLinks: SocialLink[] = [
  {
    label: 'Email',
    href: 'mailto:sam@sam-weldon.com',
    icon: '/images/email.png',
    iconClass: 'max-h-8 max-w-8',
  },
  {
    label: 'Linkedin',
    href: 'https://www.linkedin.com/in/samuel-weldon-a932431b8',
    icon: '/images/linkedin.png',
    iconClass: 'max-h-10 max-w-10',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/samweldon9393',
    icon: '/images/gh.png',
    iconClass: 'max-h-10 max-w-10',
  },
];

export type NavItem = { label: string; to: string };

export const navItems: NavItem[] = [
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/#projects' },
  { label: 'Photos', to: '/photos' },
  { label: 'Contact', to: '/#contact' },
];
