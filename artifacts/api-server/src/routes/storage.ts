import { Router, type IRouter, type Request, type Response } from "express";
import { Readable } from "stream";
import { ObjectStorageService } from "../lib/objectStorage";

const router: IRouter = Router();
const objectStorageService = new ObjectStorageService();

// Cap every response body to this size, even for unranged/open-ended range
// requests. Some proxy layers in front of this server are unreliable when
// streaming very large single responses (observed failures streaming a
// ~79MB video in one shot), so we always force clients into multiple
// range requests for large files instead.
const MAX_CHUNK_SIZE = 4 * 1024 * 1024; // 4MB

/**
 * GET /storage/public-objects/*
 *
 * Serve public assets from PUBLIC_OBJECT_SEARCH_PATHS.
 * These are unconditionally public — no authentication or ACL checks.
 */
router.get("/storage/public-objects/*filePath", async (req: Request, res: Response) => {
  try {
    const raw = req.params.filePath;
    const filePath = Array.isArray(raw) ? raw.join("/") : raw;
    const file = await objectStorageService.searchPublicObject(filePath);
    if (!file) {
      res.status(404).json({ error: "File not found" });
      return;
    }

    const [metadata] = await file.getMetadata();
    const totalSize = Number(metadata.size ?? 0);

    let start = 0;
    let end = totalSize ? totalSize - 1 : 0;
    const rangeHeader = req.headers.range;
    if (rangeHeader) {
      const match = /bytes=(\d*)-(\d*)/.exec(rangeHeader);
      if (match && totalSize) {
        start = match[1] ? parseInt(match[1], 10) : 0;
        end = match[2] ? parseInt(match[2], 10) : totalSize - 1;
        end = Math.min(end, totalSize - 1);
      }
    }

    let range: { start: number; end: number } | undefined;
    if (totalSize) {
      const requestedLength = end - start + 1;
      if (rangeHeader || requestedLength > MAX_CHUNK_SIZE) {
        const cappedEnd = Math.min(end, start + MAX_CHUNK_SIZE - 1);
        range = { start, end: cappedEnd };
      }
    }

    const response = await objectStorageService.downloadObject(file, 3600, range);

    res.status(response.status);
    response.headers.forEach((value, key) => res.setHeader(key, value));

    if (response.body) {
      const nodeStream = Readable.fromWeb(response.body as ReadableStream<Uint8Array>);
      nodeStream.pipe(res);
    } else {
      res.end();
    }
  } catch (error) {
    req.log.error({ err: error }, "Error serving public object");
    res.status(500).json({ error: "Failed to serve public object" });
  }
});

export default router;
