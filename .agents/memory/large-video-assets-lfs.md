---
name: Large video assets and Git LFS
description: LFS-tracked large media files can ship as pointer stubs in production; the platform re-enforces LFS tracking on checkpoint commits, so untracking is not a viable fix.
---

If a large media file (video, etc.) under an artifact's `public/` directory is tracked by Git LFS (via `.gitattributes`), the file committed to the git tree is only a small LFS pointer, not the real bytes. Deployment builds package the app from the committed git tree, not the local working directory — so production serves a broken/missing asset even though it works fine in the dev preview (which reads the real file from disk).

**Why:** Attempting to fix this by clearing the `filter=lfs` line in `.gitattributes` does not work — Replit's automatic checkpoint/commit system re-adds the LFS tracking rule for large files during its own commit creation, overriding the edit. This is a platform-level behavior outside agent control, confirmed by repeated `git log -p -- .gitattributes` showing the LFS line reappearing across multiple checkpoint commits despite edits.

**How to apply:** Don't fight LFS re-tracking. Instead, move the large asset out of git entirely — upload it to Replit Object Storage and serve it through a small API route (`GET /storage/public-objects/*`) that streams from the bucket. Update the app to reference the new API-served URL instead of the static `/assets/...` path. This also makes it easy to add HTTP Range support for large files (needed for video seeking) via `file.createReadStream({start, end})`.
