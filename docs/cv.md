# Updating the downloadable CV

Store the public PDF at:

```text
public/cv/andicha-eka-prastya-cv.pdf
```

The homepage **View CV** and **Download CV** buttons appear in the introduction and in
**Start a conversation**, below the contact links and above the social links.
Astro serves this file at `/cv/andicha-eka-prastya-cv.pdf`.
No React component or extra dependency is needed.

## First setup

1. In File Explorer, copy the approved PDF into `public/cv/`.
2. Rename the copied file to `andicha-eka-prastya-cv.pdf`.
3. Refresh the homepage on the running dev server. If the availability state is
   cached, restart the dev server manually.
4. Click **View CV** to open the PDF in a new tab, then **Download CV** and open the
   downloaded PDF to verify its contents. Preview behavior depends on browser settings.

The public PDF has been supplied by the project owner. If it is removed, the view
link is omitted and the download button is disabled rather than linking to a missing file.

## Future updates

Replace the PDF using the same filename. Keep private drafts and older versions
outside `public/`, because files in this directory can be downloaded publicly.
Review phone numbers, addresses, and other personal details before publishing.

From `D:\Project\portofolio-cv`, run `bun run --bun build` to check types and create
the updated static site. Then deploy it manually. Replacing a local file alone
does not update a previously deployed website. Verify the downloaded PDF again
after deployment; refresh or clear hosting caches if an old version is served.

The file-existence check runs during page rendering/build, so rebuild after adding
or removing the PDF. Browser settings may open a PDF instead of immediately saving it.
