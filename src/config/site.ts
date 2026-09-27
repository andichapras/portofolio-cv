export const siteConfig = {
  name: 'Andicha Eka Prastya',
  role: 'Software Engineer',
  title: 'Andicha Eka Prastya | Software Engineer — System Analysis & Design',
  description:
    'Portfolio of Andicha Eka Prastya, a Software Engineer focused on requirements analysis and system design, based in Jakarta, Indonesia.',
  language: 'en',
  locale: 'en_US',
  location: 'Jakarta, Indonesia',
  email: 'andichapras@gmail.com',
  socials: {
    github: 'https://github.com/andichapras',
    linkedin: 'https://www.linkedin.com/in/andichapras',
  },
} as const;

export type SiteConfig = typeof siteConfig;
