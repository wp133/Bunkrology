(function () {
  const NAV_ITEMS = [
    {
      key: "map",
      href: "map.html",
      outline:
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-map" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"/></svg>',
      filled:
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-map-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.598-.49L10.5.99 5.598.01a.5.5 0 0 0-.196 0l-5 1A.5.5 0 0 0 0 1.5v14a.5.5 0 0 0 .598.49l4.902-.98 4.902.98a.5.5 0 0 0 .196 0l5-1A.5.5 0 0 0 16 14.5zM5 14.09V1.11l.5-.1.5.1v12.98l-.402-.08a.5.5 0 0 0-.196 0zm5 .8V1.91l.402.08a.5.5 0 0 0 .196 0L11 1.91v12.98l-.5.1z"/></svg>'
    },
    {
      key: "people",
      href: "friends.html",
      outline:
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16"><path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/></svg>',
      filled:
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16"><path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/></svg>'
    },
    {
      key: "trophy",
      href: "kategorie.html",
      outline:
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trophy" viewBox="0 0 16 16"><path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935M3.504 1q.01.775.056 1.469c.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.5.5 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667q.045-.694.056-1.469z"/></svg>',
      filled:
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trophy-fill" viewBox="0 0 16 16"><path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935"/></svg>'
    }
  ];

  function getCurrentPageKey() {
    const fileName = window.location.pathname.split("/").pop().toLowerCase();

    if (fileName === "map.html") return "map";
    if (fileName === "friends.html" || fileName === "main.html") return "people";
    if (fileName === "kategorie.html" || /^category_\d+\.html$/.test(fileName)) return "trophy";

    return null;
  }

  function injectStyles() {
    if (document.getElementById("app-nav-style")) return;

    const style = document.createElement("style");
    style.id = "app-nav-style";
    style.textContent = [
      "body.app-nav-enabled { padding-bottom: 40px; }",
      "body.app-nav-enabled.app-nav-map { padding-bottom: 0; }",
      ".app-nav {",
      "  position: fixed;",
      "  left: 0;",
      "  right: 0;",
      "  bottom: 0;",
      "  height: 40px;",
      "  display: grid;",
      "  grid-template-columns: repeat(3, minmax(0, 1fr));",
      "  background: rgba(10, 35, 85, 0.95);",
      "  border-top: 1px solid rgba(255, 255, 255, 0.28);",
      "  z-index: 3500;",
      "  backdrop-filter: blur(6px);",
      "}",
      ".app-nav__item {",
      "  display: flex;",
      "  align-items: center;",
      "  justify-content: center;",
      "  color: #eaf2ff;",
      "  text-decoration: none;",
      "  border-right: 1px solid rgba(255, 255, 255, 0.2);",
      "}",
      ".app-nav__item:last-child { border-right: 0; }",
      ".app-nav__item svg { width: 16px; height: 16px; }",
      ".app-nav__item.active {",
      "  color: #ffffff;",
      "  background: rgba(118, 212, 255, 0.18);",
      "}",
      "@media (max-width: 991px) {",
      "  body.app-nav-map .map-options { bottom: 52px !important; }",
      "  body.app-nav-map #measure-hint { bottom: 96px !important; }",
      "  body.app-nav-enabled .friends-button { bottom: 52px !important; }",
      "  body.app-nav-enabled .friends-panel { bottom: 94px !important; }",
      "}",
      "@media (min-width: 992px) {",
      "  body.app-nav-enabled {",
      "    padding-top: 20px;",
      "    padding-bottom: 0;",
      "  }",
      "  body.app-nav-enabled.app-nav-map { padding-top: 0; }",
      "  .app-nav {",
      "    top: 0;",
      "    bottom: auto;",
      "    height: 20px;",
      "    border-top: 0;",
      "    border-bottom: 1px solid rgba(255, 255, 255, 0.28);",
      "  }",
      "  body.app-nav-map .map-options { top: 28px !important; }",
      "  body.app-nav-map .leaflet-top { top: 22px; }",
      "}"]
      .join("\n");

    document.head.appendChild(style);
  }

  function renderNav(currentKey) {
    if (document.querySelector(".app-nav")) return;

    const nav = document.createElement("nav");
    nav.className = "app-nav";

    NAV_ITEMS.forEach(function (item) {
      const link = document.createElement("a");
      const isActive = item.key === currentKey;

      link.className = "app-nav__item" + (isActive ? " active" : "");
      link.href = item.href;
      link.innerHTML = isActive ? item.filled : item.outline;

      nav.appendChild(link);
    });

    document.body.appendChild(nav);
  }

  function initAppNav() {
    injectStyles();

    const currentKey = getCurrentPageKey();
    document.body.classList.add("app-nav-enabled");

    if (currentKey === "map") {
      document.body.classList.add("app-nav-map");
    }

    renderNav(currentKey);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAppNav);
  } else {
    initAppNav();
  }
})();
