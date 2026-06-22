export type GeoInfo = {
  country: string | null;
  region: string | null;
  city: string | null;
};

const geoCache = new Map<string, GeoInfo>();

function isPrivateIp(ip: string): boolean {
  if (ip === "unknown" || ip === "::1") return true;
  if (ip.startsWith("127.")) return true;
  if (ip.startsWith("10.")) return true;
  if (ip.startsWith("192.168.")) return true;
  if (ip.startsWith("172.")) {
    const second = Number(ip.split(".")[1]);
    return second >= 16 && second <= 31;
  }
  return false;
}

export async function resolveGeoFromIp(
  ip: string,
  cfCountry?: string | null,
): Promise<GeoInfo> {
  if (isPrivateIp(ip)) {
    return { country: "Local", region: null, city: null };
  }

  if (cfCountry && cfCountry !== "XX") {
    return { country: cfCountry, region: null, city: null };
  }

  const cached = geoCache.get(ip);
  if (cached) return cached;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const response = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,regionName,city`,
      { signal: controller.signal, cache: "no-store" },
    );

    clearTimeout(timeout);

    if (!response.ok) {
      return { country: null, region: null, city: null };
    }

    const data = (await response.json()) as {
      status?: string;
      country?: string;
      regionName?: string;
      city?: string;
    };

    if (data.status === "success") {
      const info: GeoInfo = {
        country: data.country ?? null,
        region: data.regionName ?? null,
        city: data.city ?? null,
      };
      geoCache.set(ip, info);
      return info;
    }
  } catch {
    /* geo lookup is best-effort */
  }

  return { country: null, region: null, city: null };
}
