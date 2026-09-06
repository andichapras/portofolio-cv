export const siteConfig = {
	name: 'Andicha Eka Prastya',
	role: 'Software Engineer & System Analyst',
	title: 'Andicha Eka Prastya | Software Engineer & System Analyst',
	description:
		'Portfolio of Andicha Eka Prastya, a Software Engineer and System Analyst based in Jakarta, Indonesia.',
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
