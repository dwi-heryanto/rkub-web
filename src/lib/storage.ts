import { cloudinaryService } from "@/lib/storage/providers/cloudinary";
import { placeholderService } from "@/lib/storage/providers/placeholder";
import type { StorageProvider, UploadService } from "@/lib/storage/types";

export type { StorageProvider, UploadAssetInput, UploadAssetResponse, UploadService } from "@/lib/storage/types";

export function createUploadService(provider = (process.env.STORAGE_PROVIDER as StorageProvider | undefined) || "cloudinary"): UploadService {
  if (provider === "cloudinary") return cloudinaryService();
  if (provider === "s3") return placeholderService("s3");
  return placeholderService("r2");
}
