import pathlib
base = pathlib.Path(r"d:/Antigravity/Backup/VideoPlayer/portfolio-imports/web/player-video-marcadores/source")

def fix(path):
    p = base / path
    if not p.exists():
        print("missing", path)
        return
    data = p.read_bytes()
    if len(data) >= 2 and data[0] == 0xFF and data[1] == 0xFE:
        p.write_text(data.decode("utf-16-le"), encoding="utf-8")
        print("fixed", path)
    else:
        print("ok", path)

for rel in [
    "src/lib/demo/mock-store.ts",
    "src/components/demo-banner.tsx",
    "src/lib/api.ts",
    "src/app/layout.tsx",
]:
    fix(rel)

next_cfg = """import type { NextConfig } from \"next\";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? \"\";

const nextConfig: NextConfig = {
  output: \"export\",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  transpilePackages: [\"video.js\"]
};

export default nextConfig;
"""
(base / "next.config.ts").write_text(next_cfg, encoding="utf-8")
print("wrote next.config.ts")
