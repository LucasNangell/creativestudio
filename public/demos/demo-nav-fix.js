(function () {
  var script = document.currentScript;
  var base = (script && script.getAttribute("data-base")) || "";
  if (!base) {
    var match = location.pathname.match(/^(\/demos\/[^/]+)/);
    base = match ? match[1] : "";
  }
  if (!base) return;

  var UNAVAILABLE =
    "/demos/indisponivel.html?demo=" + encodeURIComponent(base + "/");

  function isInternalRootPath(path) {
    return (
      path.charAt(0) === "/" &&
      path.indexOf(base) !== 0 &&
      path.indexOf("/demos/") !== 0 &&
      path.indexOf("/api/") !== 0 &&
      path.indexOf("/_next/") !== 0
    );
  }

  function toIndexHtml(pathname) {
    if (!pathname || pathname.endsWith(".html") || pathname.indexOf("/_next/") !== -1) {
      return pathname;
    }
    if (pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }
    if (pathname === base) {
      return base + "/index.html";
    }
    return pathname + "/index.html";
  }

  /** Converte /entrar ou /demos/foo/entrar/ → caminho estático com index.html */
  function resolveDemoPath(href) {
    var parts = href.split("#");
    var pathPart = parts[0];
    var hash = parts[1] ? "#" + parts[1] : "";
    var querySplit = pathPart.split("?");
    var pathname = querySplit[0];
    var query = querySplit[1] ? "?" + querySplit[1] : "";

    if (isInternalRootPath(pathname)) {
      if (pathname === "/" || pathname === "/index.html") {
        pathname = base + "/index.html";
      } else if (pathname.endsWith(".html")) {
        pathname = base + pathname;
      } else {
        pathname = toIndexHtml(base + (pathname.endsWith("/") ? pathname.slice(0, -1) : pathname));
      }
    } else if (pathname.indexOf(base) === 0) {
      pathname = toIndexHtml(pathname);
    }

    return pathname + query + hash;
  }

  function needsDemoNavigation(href) {
    if (!href || href.charAt(0) !== "/") return false;
    var pathname = href.split("#")[0].split("?")[0];
    if (pathname.indexOf("/_next/") !== -1) return false;
    if (pathname.endsWith(".html")) return false;
    if (isInternalRootPath(pathname)) return true;
    if (pathname.indexOf(base) === 0) return true;
    return false;
  }

  function rewriteFetchUrl(url) {
    if (typeof url !== "string") return url;
    if (url.indexOf("http://demo.local") === 0 || url.indexOf("https://demo.local") === 0) {
      return url.replace(/^https?:\/\/demo\.local\/api\/v1/, "");
    }
    if (url.indexOf("/_next/") === 0) return base + url;
    if (url.indexOf("/api/") === 0) return base + url;

    try {
      var parsed = new URL(url, location.origin);
      if (parsed.origin === location.origin && needsDemoNavigation(parsed.pathname)) {
        return resolveDemoPath(parsed.pathname + parsed.search) + parsed.hash;
      }
    } catch (e) {
      /* ignore */
    }

    return url;
  }

  function goUnavailable(requestedPath) {
    location.href =
      UNAVAILABLE +
      "&path=" +
      encodeURIComponent(requestedPath || location.pathname);
  }

  function navigateInternal(href) {
    var target = resolveDemoPath(href);
    fetch(target, { method: "GET", cache: "no-store", credentials: "same-origin" })
      .then(function (res) {
        if (res.ok) {
          location.href = target;
        } else {
          goUnavailable(href);
        }
      })
      .catch(function () {
        goUnavailable(href);
      });
  }

  function mockApiFetch(url, init) {
    var path = url;
    try {
      path = new URL(url, location.origin).pathname;
    } catch (e) {
      return null;
    }

    if (
      path.indexOf("/public/") !== 0 &&
      path.indexOf("/donor/") !== 0 &&
      path.indexOf("/auth/") !== 0
    ) {
      return null;
    }

    var method = ((init && init.method) || "GET").toUpperCase();
    var body = { ok: true, demo: true };

    if (method === "POST" && path.indexOf("/auth/donor/login") === 0) {
      body = {
        accessToken: "demo-token-ficticio-sem-valor-real",
        donor: {
          id: "donor-demo-001",
          full_name: "Maria Exemplo",
          email: "doador@empresa-demo.com",
        },
      };
    } else if (method === "POST") {
      body = {
        ok: true,
        status: "ok",
        message: "Operação simulada com sucesso (demonstração).",
        id: "demo-" + Date.now(),
      };
    } else if (path.indexOf("/public/animals") === 0) {
      body = [];
    } else if (path.indexOf("/public/mural") === 0) {
      body = [];
    } else if (path.indexOf("/public/plans") === 0 || path.indexOf("/public/donation") === 0) {
      body = [];
    } else if (path.indexOf("/donor/") === 0) {
      body = {};
    } else if (path.indexOf("/auth/") === 0) {
      body = { detail: "Não autenticado" };
    }

    return Promise.resolve(
      new Response(JSON.stringify(body), {
        status: method === "GET" && path.indexOf("/auth/") === 0 ? 401 : 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
  }

  document.addEventListener(
    "click",
    function (event) {
      var anchor =
        event.target && event.target.closest
          ? event.target.closest("a[href]")
          : null;
      if (!anchor) return;

      var href = anchor.getAttribute("href");
      if (
        !href ||
        href.indexOf("http://") === 0 ||
        href.indexOf("https://") === 0 ||
        href.indexOf("mailto:") === 0 ||
        href.indexOf("tel:") === 0 ||
        href.charAt(0) === "#"
      ) {
        return;
      }

      if (needsDemoNavigation(href)) {
        event.preventDefault();
        event.stopPropagation();
        navigateInternal(href);
      }
    },
    true,
  );

  if (window.fetch) {
    var nativeFetch = window.fetch.bind(window);
    window.fetch = function (input, init) {
      var url = typeof input === "string" ? input : input && input.url ? input.url : "";
      var rewritten = rewriteFetchUrl(url);

      if (rewritten !== url) {
        var mocked = mockApiFetch(rewritten, init);
        if (mocked) return mocked;
        return nativeFetch(rewritten, init);
      }

      var mockedDirect = mockApiFetch(url, init);
      if (mockedDirect) return mockedDirect;

      if (typeof input === "string") {
        return nativeFetch(rewriteFetchUrl(input), init);
      }
      if (input && input.url) {
        var nextUrl = rewriteFetchUrl(input.url);
        if (nextUrl !== input.url) {
          return nativeFetch(nextUrl, init);
        }
      }
      return nativeFetch(input, init);
    };
  }

  if (window.history && window.history.pushState) {
    var pushState = window.history.pushState.bind(window.history);
    window.history.pushState = function (state, title, url) {
      if (typeof url === "string" && needsDemoNavigation(url.split("#")[0].split("?")[0])) {
        navigateInternal(url);
        return;
      }
      return pushState(state, title, url);
    };

    var replaceState = window.history.replaceState.bind(window.history);
    window.history.replaceState = function (state, title, url) {
      if (typeof url === "string" && needsDemoNavigation(url.split("#")[0].split("?")[0])) {
        navigateInternal(url);
        return;
      }
      return replaceState(state, title, url);
    };
  }

  try {
    var loc = window.location;
    var assign = loc.assign.bind(loc);
    var replace = loc.replace.bind(loc);

    loc.assign = function (url) {
      if (typeof url === "string" && needsDemoNavigation(url.split("#")[0].split("?")[0])) {
        navigateInternal(url);
        return;
      }
      return assign(url);
    };

    loc.replace = function (url) {
      if (typeof url === "string" && needsDemoNavigation(url.split("#")[0].split("?")[0])) {
        navigateInternal(url);
        return;
      }
      return replace(url);
    };
  } catch (e) {
    /* location methods may be read-only in some browsers */
  }

  if (needsDemoNavigation(location.pathname)) {
    navigateInternal(location.pathname + location.search + location.hash);
  }
})();
