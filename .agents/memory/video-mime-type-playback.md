---
name: Video MIME type for browser playback
description: Chrome/browsers refuse to play <video> sources served as video/quicktime even with compatible codecs; must serve as video/mp4.
---

Browsers (Chrome in particular) will not play a `<video>` element's source if the response `Content-Type` header is `video/quicktime`, even when the underlying content is standard H.264/AAC that would otherwise play fine as `video/mp4`. The container/codec compatibility does not matter — the MIME type alone gates playback.

**Why:** A `.MOV` file uploaded/served with its original `video/quicktime` content type appeared completely broken client-side (video element never loaded, no error surfaced clearly) even though the file was valid and reachable.

**How to apply:** When serving `.mov` (or any QuickTime-container) video files to a browser `<video>` tag, explicitly set/override the `Content-Type` response header to `video/mp4` regardless of the original file's reported/uploaded MIME type.
