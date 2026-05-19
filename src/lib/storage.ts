export type StorageProvider = "cloudinary" | "s3" | "r2";

export interface UploadAssetInput {
  fileName: string;
  fileType: string;
}

export interface UploadAssetResponse {
  uploadUrl: string;
  publicUrl: string;
}

export interface UploadService {
  createUpload(input: UploadAssetInput): Promise<UploadAssetResponse>;
}

function cloudinaryService(): UploadService {
  return {
    async createUpload({ fileName }) {
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "demo";
      return {
        uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        publicUrl: `https://res.cloudinary.com/${cloudName}/image/upload/${fileName}`,
      };
    },
  };
}

function placeholderService(provider: "s3" | "r2"): UploadService {
  return {
    async createUpload({ fileName }) {
      return {
        uploadUrl: `https://${provider}.example.com/upload/${fileName}`,
        publicUrl: `https://${provider}.example.com/public/${fileName}`,
      };
    },
  };
}

export function createUploadService(provider = (process.env.STORAGE_PROVIDER as StorageProvider | undefined) || "cloudinary") {
  if (provider === "cloudinary") return cloudinaryService();
  if (provider === "s3") return placeholderService("s3");
  return placeholderService("r2");
}
