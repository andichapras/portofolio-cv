import type { APIRoute } from 'astro';
import sharp from 'sharp';
import artwork from '@/assets/social-preview.svg?raw';

// Static output: Sharp runs during the build, never in the visitor's browser.
export const GET: APIRoute = async () => {
  const png = await sharp(Buffer.from(artwork)).png().toBuffer();

  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
