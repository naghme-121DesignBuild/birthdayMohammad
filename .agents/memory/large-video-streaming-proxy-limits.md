---
name: Large video streaming through the deployment proxy
description: Two production-only failure modes for serving large video files that don't reproduce in dev — moov atom position and single-response streaming size limits.
---

Two distinct issues can make a large video file (tens of MB) fail to play only in production, even after confirming the file itself is valid and served with correct headers/MIME type in the dev preview:

1. **`moov` atom position ("faststart").** If an MP4/MOV file was exported with its `moov` (metadata) atom at the end of the file instead of the front, browsers requesting early byte ranges never receive the metadata needed to initialize playback (`readyState` stays 0, `duration` is `NaN`), even though the file plays fine in a native player. Fix: remux with `ffmpeg -c copy -movflags +faststart` before serving.

2. **Single-response streaming through the production edge proxy.** Streaming an entire large file (~79MB observed) in one HTTP response — whether via an unranged `GET` or an open-ended `Range: bytes=0-` request — reliably failed with a 500 in production while working fine in the dev preview. The dev environment doesn't have the same edge-proxy path as the deployed app.

**Why:** Both issues are silent/hard to diagnose because curl/ffprobe against the dev URL succeed, masking the real production-only failure; the symptom in the browser is just "video never loads," with no clear client-side error.

**How to apply:** When serving large video through a custom route (e.g. an Object Storage proxy endpoint), always cap the response body to a small fixed chunk size (e.g. 4MB) regardless of what Range was requested, forcing the browser into many small range requests instead of one large streamed response. Verify production behavior directly with `curl -D -` against the deployed URL (not just the dev preview) for both unranged and open-ended-range requests before considering a video-serving fix complete.
