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
      path.indexOf("/api/") !== 0
    );
  }

  function rewriteRootPath(path) {
    if (!isInternalRootPath(path)) return path;
    var parts = path.split("#");
    var pathPart = parts[0];
    var hash = parts[1] ? "#" + parts[1] : "";
    var querySplit = pathPart.split("?");
    var pathname = querySplit[0];
    var query = querySplit[1] ? "?" + querySplit[1] : "";

    if (pathname === "/" || pathname === "/index.html") {
      return base + "/index.html" + query + hash;
    }

    if (pathname.endsWith(".html")) {
      return base + pathname + query + hash;
    }

    if (pathname.endsWith("/")) {
      return base + pathname.slice(0, -1) + "/index.html" + query + hash;
    }

    return base + pathname + "/index.html" + query + hash;
  }

  function rewriteFetchUrl(url) {
    if (typeof url !== "string") return url;
    if (url.indexOf("http://demo.local") === 0 || url.indexOf("https://demo.local") === 0) {
      return url.replace(/^https?:\/\/demo\.local\/api\/v1/, "");
    }
    if (url.indexOf("/_next/") === 0) return base + url;
    if (url.indexOf("/api/") === 0) return base + url;
    return url;
  }

  function goUnavailable(requestedPath) {
    location.href =
      UNAVAILABLE +
      "&path=" +
      encodeURIComponent(requestedPath || location.pathname);
  }

  function navigateInternal(href) {
    var target = rewriteRootPath(href);
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

    if (method === "POST") {
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

      if (href.charAt(0) === "/" && isInternalRootPath(href)) {
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
      if (typeof url === "string" && isInternalRootPath(url)) {
        url = rewriteRootPath(url);
      }
      return pushState(state, title, url);
    };

    var replaceState = window.history.replaceState.bind(window.history);
    window.history.replaceState = function (state, title, url) {
      if (typeof url === "string" && isInternalRootPath(url)) {
        url = rewriteRootPath(url);
      }
      return replaceState(state, title, url);
    };
  }

  try {
    var loc = window.location;
    var assign = loc.assign.bind(loc);
    var replace = loc.replace.bind(loc);

    loc.assign = function (url) {
      if (typeof url === "string" && url.charAt(0) === "/" && isInternalRootPath(url)) {
        navigateInternal(url);
        return;
      }
      return assign(url);
    };

    loc.replace = function (url) {
      if (typeof url === "string" && url.charAt(0) === "/" && isInternalRootPath(url)) {
        navigateInternal(url);
        return;
      }
      return replace(url);
    };
  } catch (e) {
    /* location methods may be read-only in some browsers */
  }

  if (isInternalRootPath(location.pathname)) {
    navigateInternal(location.pathname + location.search + location.hash);
  }
})();
