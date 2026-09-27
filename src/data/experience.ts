import type { Locale } from '@/lib/i18n';

export interface Experience {
  company: string;
  role: string;
  startYear: number;
  // A null end year represents the current position.
  endYear: number | null;
  highlights: Record<Locale, readonly string[]>;
}

// Shared facts stay separate from translated descriptions.
export const experience = [
  {
    company: 'Mandiri Utama Finance',
    role: 'Software Engineer',
    startYear: 2025,
    endYear: null,
    highlights: {
      en: [
        'End-to-end feature development, from requirements analysis to deployment.',
        'REST API design, mini-app integration, and role-based access control.',
      ],
      id: [
        'Pengembangan fitur menyeluruh, dari analisis kebutuhan hingga deployment.',
        'Desain REST API, integrasi mini-app, dan kontrol akses berbasis peran.',
      ],
    },
  },
  {
    company: 'Nusantara Duta Solusindo',
    role: 'Software Engineer',
    startYear: 2022,
    endYear: 2025,
    highlights: {
      en: [
        'Frontend and backend development, microservices, and technical client support.',
        'Performance investigation, team coordination, and mentoring junior engineers.',
      ],
      id: [
        'Pengembangan frontend dan backend, microservices, serta dukungan teknis untuk klien.',
        'Investigasi performa, koordinasi tim, dan pendampingan engineer junior.',
      ],
    },
  },
] as const satisfies readonly Experience[];
