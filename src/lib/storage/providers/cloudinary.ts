import crypto from "crypto";

import type { UploadAssetInput, UploadAssetResponse, UploadService } from "@/lib/storage/types";

function createSignature(params: Record<string, string>, apiSecret: string) {
  const sorted = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return crypto.createHash("sha1").update(`${sorted}${apiSecret}`).digest("hex");
}

export function cloudinaryService(): UploadService {
  return {
    async createUpload({ fileName, fileType }: UploadAssetInput): Promise<UploadAssetResponse> {
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "demo";
      const apiKey = process.env.CLOUDINARY_API_KEY || "";
      const apiSecret = process.env.CLOUDINARY_API_SECRET || "";
      const folder = process.env.CLOUDINARY_FOLDER || "rkub";
      const timestamp = Math.floor(Date.now() / 1000).toString();

      if (!apiKey || !apiSecret) {
        throw new Error("Cloudinary API credentials are missing.");
      }

      const params = {
        folder,
        timestamp,
        public_id: fileName.replace(/\.[^/.]+$/, ""),
      };

      const signature = createSignature(params, apiSecret);

      return {
        uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        publicUrl: `https://res.cloudinary.com/${cloudName}/image/upload/${folder}/${fileName}`,
        fields: {
          api_key: apiKey,
          timestamp,
          signature,
          folder,
          public_id: params.public_id,
          file: fileType,
        },
        mode: "signed",
      };
    },
  };
}
