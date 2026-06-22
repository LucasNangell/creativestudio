import pathlib
base = pathlib.Path(r"d:/Antigravity/Backup/VideoPlayer/portfolio-imports/web/player-video-marcadores/source")

def rewrite_utf8(path, content):
    (base / path).write_text(content, encoding="utf-8")
    print("rewrote", path)

for rel in ["src/lib/demo/mock-store.ts", "src/components/demo-banner.tsx"]:
    p = base / rel
    data = p.read_bytes()
    if b"\x00" in data:
        p.write_text(data.decode("utf-16-le"), encoding="utf-8")
        print("converted", rel)
    else:
        print("already utf8", rel)
