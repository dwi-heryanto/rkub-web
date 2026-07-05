import { NextResponse } from "next/server";

import { createUploadService } from "@/lib/storage";

export async function POST(request: Request) {
  const body = await request.json();
  const { fileName, fileType } = body as { fileName?: string; fileType?: string };

  if (!fileName || !fileType) {
    return NextResponse.json({ error: "Missing fileName or fileType" }, { status: 400 });
  }

  try {
    const service = createUploadService();
    const upload = await service.createUpload({ fileName, fileType });

    return NextResponse.json(upload);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
