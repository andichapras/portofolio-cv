import { getCollection } from 'astro:content';

// Share publication filtering across cards, listings, language links, and static routes.
export async function getPublishedProjects() {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.sort((a, b) => a.data.order - b.data.order);
}
