export const site = {
  name: 'Sam Weldon',
  role: 'Information Science',
  location: 'New York, NY',
  tagline: 'I like to write code and work with big data systems.',
  intro:
    'Senior at Columbia University studying Information Science.',
  email: 'sam@sam-weldon.com',
  resumeUrl: '/Resume.pdf',
};

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

export const socialLinks: SocialLink[] = [
  { label: 'Email', href: 'mailto:sam@sam-weldon.com', icon: '/images/email.png' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/samuel-weldon-a932431b8',
    icon: '/images/linkedin.png',
  },
  { label: 'GitHub', href: 'https://github.com/samweldon9393', icon: '/images/gh.png' },
];

export type NavItem = { label: string; to: string };

export const navItems: NavItem[] = [
  { label: 'Work', to: '/#work' },
  { label: 'About', to: '/about' },
  { label: 'Photos', to: '/photos' },
  { label: 'Contact', to: '/#contact' },
];
