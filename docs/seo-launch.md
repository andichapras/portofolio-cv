# Search and discoverability checklist

## Canonical domain

Use `https://www.andichapras.com` as the primary origin. A read-only HTTP inspection confirmed
that the apex domain redirects to www with status 308, and www responds with status 200.
Keep that redirect in Vercel; do not add an opposite redirect in DNS or application code.

Astro's `site` controls canonical, language-alternate, structured-data, social-image, robots,
and sitemap URLs. Astro and `vercel.json` both select trailing slashes for page URLs.
Files such as PDFs, PNGs, and XML sitemaps retain their extensions without an added slash.

## Local verification before deployment

Run these manually in PowerShell from `D:\Project\portofolio-cv`, in order:

1. Install the declared dependencies and synchronize `bun.lock`:

   ```powershell
   bun install
   ```

   Expect a successful install. Review and include the resulting lockfile changes with the
   source changes. Do not deploy an updated manifest with an outdated frozen lockfile.
   Do not broadly trust dependencies if a lifecycle-script warning appears; inspect it first.

2. Apply the repository's formatting rules, then verify them:

   ```powershell
   bun run --bun format
   bun run --bun format:check
   ```

   The first command modifies formatting. Review the diff afterward. The check should report
   that files follow Prettier style.

3. Check behavioral regressions:

   ```powershell
   bun run --bun test
   ```

   Expect all tests to pass, including canonical normalization, reciprocal language URLs,
   profile identity, project ordering, and safe JSON-LD serialization.

4. Type-check and generate the static site:

   ```powershell
   bun run --bun build
   ```

   This script already runs Astro checks. Expect no errors and generated output including
   `dist/robots.txt`, `dist/sitemap-index.xml`, sitemap entries, and `dist/social-preview.png`.

5. Inspect the build locally:

   ```powershell
   bun run --bun preview
   ```

   Use the URL printed by Astro. Check both languages, project breadcrumbs, CV actions,
   and the sharing image at `/social-preview.png`. Ensure every line of image text is visible;
   font rendering can differ between local and hosted builds. Stop with `Ctrl+C` when finished.

If a command fails, share the command and relevant error output, without tokens, credentials,
private environment variables, or unrelated sensitive logs. Build and hosted behavior remain
unverified until these checks have supporting results.

## After manual deployment to Vercel

- Open `/robots.txt` and `/sitemap-index.xml` on the primary domain. Follow the sitemap's child
  XML link and confirm that only public page URLs are listed, with both languages and no 404.
- Check `/`, `/id/`, `/projects/`, and one project in each language. They should respond with
  HTTP 200; a nonexistent route should return an actual HTTP 404, not a homepage rewrite.
- Inspect page source, not just the browser DOM. Confirm one canonical using www, language
  alternatives for the equivalent page, and valid JSON-LD. Indonesian pages self-canonicalize
  to `/id/.../`, not their English counterparts.
- Confirm HTTP redirects to HTTPS and apex redirects to www while preserving paths. Check
  slash normalization on a project route, without loops or unnecessary redirect chains.
- Open `/social-preview.png` and check its appearance. Validate a shared link with LinkedIn
  Post Inspector or another platform debugger; old previews may be cached by that platform.
- Validate the homepage and a project page with Google's Rich Results Test. Use Schema.org
  Validator for generic schema types that do not correspond to Google rich-result features.
  Valid structured data does not guarantee a special search appearance.
- Keep preview deployments protected or non-indexable in Vercel. Check the response headers
  as well as HTML: production must not have an unintended `X-Robots-Tag: noindex`. `robots.txt`
  is not an access-control mechanism. This code does not change dashboard protection settings.
- Check Vercel firewall/bot settings do not challenge legitimate search crawlers. Do not
  disable security globally merely to make a crawler test pass.

## Search Console and Bing

1. Add a Domain property for `andichapras.com` in Google Search Console. It covers www,
   apex, and both language paths. Add the supplied verification TXT record to the authoritative
   DNS provider (JagoanHosting if it still hosts the domain's DNS). Keep existing records.
2. Submit `https://www.andichapras.com/sitemap-index.xml`.
3. Inspect the English homepage, Indonesian homepage, and main project URLs. Use the live
   test and request indexing after confirming the deployed pages are correct. Submission
   is a discovery signal, not a promise or deadline for indexing.
4. Verify the site with Bing Webmaster Tools and submit the same sitemap.
5. Review indexing reports, queries, impressions, and clicks. Compare them over time, not
   immediately after deployment. Vercel Analytics is useful for visits but does not replace
   Search Console's indexing and search-query reports.

## Content and GEO

The most useful next investment is evidence, not keyword repetition:

- Keep the name, role, employment dates, and public links consistent with the CV and LinkedIn.
- Expand AROA and MUF Super Web App with approved examples of the problem, constraints,
  decisions, personal contribution, collaboration, and outcome. Keep shared ownership clear.
- Publish measured outcomes only when evidence and disclosure permission exist. Do not
  publish employer screenshots, FSDs, source code, or customer data without approval.
- Link the website from GitHub and LinkedIn. Relevant, genuine references are preferable
  to bought links or automatically generated low-value articles.
- For freelance discovery, add a focused capabilities page after confirming the services
  actually offered, with relevant case studies and a clear contact path.
- Keep project content available as HTML; the PDF CV complements it rather than replacing it.
- Preserve accurate distinctions between completed work, experiments, and planned features.

Google's AI search features use the same core SEO foundations. No special AI schema or
`llms.txt` is required by Google. Other services have their own policies; crawler access alone
does not guarantee retrieval, a citation, or a recommendation. The permissive `robots.txt`
does not distinguish search crawling from training usage; revisit provider-specific policies
if you want a separate training opt-out later.

## Performance monitoring

Use PageSpeed Insights for diagnostic lab results and Vercel Speed Insights/Search Console
for available real-user data. Aim for LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1 at the 75th
percentile. A new or low-traffic domain may not have enough field data yet. A local score
is not proof of field performance or search ranking.

## Official references

- [Astro sitemap integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [Google canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Google AI features and websites](https://developers.google.com/search/docs/appearance/ai-features)
- [Search Console verification](https://support.google.com/webmasters/answer/9008080)
- [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [Vercel project configuration](https://vercel.com/docs/project-configuration)
