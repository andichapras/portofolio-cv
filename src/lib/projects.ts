import { getCollection } from 'astro:content';

// Use for both future listings and getStaticPaths(): draft alone does not hide a route.
export async function getPublishedProjects() {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.sort((a, b) => a.data.order - b.data.order);
}
