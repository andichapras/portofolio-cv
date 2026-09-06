# Updating the downloadable CV

Store the public PDF at:

```text
public/cv/andicha-eka-prastya-cv.pdf
```

The homepage download button appears in **Start a conversation**, below the email
and above the social links. Astro serves this file at `/cv/andicha-eka-prastya-cv.pdf`.
No React component or extra dependency is needed.

## First setup

1. In File Explorer, copy the approved PDF into `public/cv/`.
2. Rename the copied file to `andicha-eka-prastya-cv.pdf`.
3. Refresh the homepage on the running dev server. If the availability state is
   cached, restart the dev server manually.
4. Click **Download CV** and open the downloaded PDF to verify its contents.

The source PDF has not been copied by the agent. Until it is present at the expected
path, the button is disabled rather than linking to a missing file.

## Future updates

Replace the PDF using the same filename. Keep private drafts and older versions
outside `public/`, because files in this directory can be downloaded publicly.
Review phone numbers, addresses, and other personal details before publishing.

From `D:\Project\portofolio-cv`, run `npm.cmd run build` to check types and create
the updated static site. Then deploy it manually. Replacing a local file alone
does not update a previously deployed website. Verify the downloaded PDF again
after deployment; refresh or clear hosting caches if an old version is served.

The file-existence check runs during page rendering/build, so rebuild after adding
or removing the PDF. Browser settings may open a PDF instead of immediately saving it.
