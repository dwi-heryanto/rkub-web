import type { UploadAssetInput, UploadAssetResponse, UploadService } from "@/lib/storage/types";

export function placeholderService(provider: "s3" | "r2"): UploadService {
  return {
    async createUpload({ fileName }: UploadAssetInput): Promise<UploadAssetResponse> {
      return {
        uploadUrl: `https://${provider}.example.com/upload/${fileName}`,
        publicUrl: `https://${provider}.example.com/public/${fileName}`,
        mode: "unsigned",
      };
    },
  };
}
