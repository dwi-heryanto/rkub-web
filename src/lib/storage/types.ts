export type StorageProvider = "cloudinary" | "s3" | "r2";

export interface UploadAssetInput {
  fileName: string;
  fileType: string;
}

export interface UploadAssetResponse {
  uploadUrl: string;
  publicUrl: string;
  fields?: Record<string, string>;
  mode?: "signed" | "unsigned";
}

export interface UploadService {
  createUpload(input: UploadAssetInput): Promise<UploadAssetResponse>;
}
