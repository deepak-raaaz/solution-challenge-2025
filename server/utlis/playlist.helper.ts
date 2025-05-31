import { NextFunction } from "express";
import { redis } from "./redis";
import { ValidationError } from "./ErrorHandler";

export const thumbnailGenerateRequest = async (id: string, next: NextFunction) => {
    // Check if thumbnail generation is locked
    if (await redis.get(`thumbnail_generate_lock:${id}`)) {
        throw new ValidationError("Thumbnail generation is locked due to the limit exceeded.")
        
    }

    const thumbnailRequestKey = `thumbnail_request_count:${id}`;
    let thumbnailRequestCount = parseInt((await redis.get(thumbnailRequestKey)) || "0");

    // Check if request limit is exceeded
    if (thumbnailRequestCount >= 2) {
        await redis.set(`thumbnail_generate_lock:${id}`, "locked", "EX", 86400 * 30); // Lock for 30 days
        throw new ValidationError(
                "Too many thumbnail requests! Please wait 30 days before requesting a new thumbnail image."

        );
    }

    // Increment request count
    await redis.set(thumbnailRequestKey, (thumbnailRequestCount + 1).toString(), "EX", 86400 * 30);
};