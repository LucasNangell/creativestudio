import fs from "node:fs";
import path from "node:path";

import { NextResponse } from "next/server";

const DEMO_FILES = [
  "demos/lar-dos-anjos/index.html",
  "demos/gestao-producao-grafica/index.html",
  "demos/player-video-marcadores/index.html",
  "demos/monitor-arquivos/index.html",
  "demos/vigilia-politica/index.html",
];

export async function GET() {
  const results = DEMO_FILES.map((rel) => {
    const absolute = path.join(process.cwd(), "public", rel);
    let size = 0;
    let exists = false;
    try {
      const stat = fs.statSync(absolute);
      exists = stat.isFile();
      size = stat.size;
    } catch {
      exists = false;
    }
    return { file: rel, exists, sizeBytes: size };
  });

  const ok = results.every((item) => item.exists && item.sizeBytes > 0);

  return NextResponse.json(
    {
      ok,
      cwd: process.cwd(),
      demos: results,
    },
    { status: ok ? 200 : 503 },
  );
}
