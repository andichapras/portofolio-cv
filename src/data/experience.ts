export interface Experience {
  company: string;
  role: string;
  startYear: number;
  // A null end year represents the current position.
  endYear: number | null;
  highlights: readonly string[];
}

// Owner-confirmed years; months and per-project stacks are not yet supplied.
export const experience = [
  {
    company: 'Mandiri Utama Finance',
    role: 'Software Engineer',
    startYear: 2025,
    endYear: null,
    highlights: [
      'End-to-end feature development, from requirements analysis to deployment.',
      'REST API design, mini-app integration, and role-based access control.',
    ],
  },
  {
    company: 'Nusantara Duta Solusindo',
    role: 'Software Engineer',
    startYear: 2022,
    endYear: 2025,
    highlights: [
      'Frontend and backend development, microservices, and technical client support.',
      'Performance investigation, team coordination, and mentoring junior engineers.',
    ],
  },
] as const satisfies readonly Experience[];
