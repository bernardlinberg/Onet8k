const $ = (sel) => document.querySelector(sel);

const overlay = document.getElementById("videoOverlay");

const setOverlay = (opacity = 0.7, blur = 5) => {
  overlay.style.background = `rgba(220,53,69,${opacity})`;
  overlay.style.backdropFilter = `blur(${blur}px)`;
  overlay.style.webkitBackdropFilter = `blur(${blur}px)`;
};

let scrollHandler = null;
const setOverlayScroll = () => {
  if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
  scrollHandler = () => {
    const scrollY = window.scrollY;
    const maxScroll = 700;
    const opacity = Math.min(scrollY / maxScroll, 0.7);
    const blur = Math.min(scrollY / 100, 10);
    overlay.style.background = `rgba(220,53,69,${opacity})`;
    overlay.style.backdropFilter = `blur(${blur}px)`;
    overlay.style.webkitBackdropFilter = `blur(${blur}px)`;
  };
  window.addEventListener("scroll", scrollHandler, { passive: true });
  scrollHandler();
};

const renderTemplate = (id) => {
  const template = document.getElementById(id);
  if (!template)
    return ($("#app").innerHTML = `<p>Template with id "${id}" not found.</p>`);
  const node = template.content.cloneNode(true);
  const app = $("#app");
  app.innerHTML = "";
  app.appendChild(template.content.cloneNode(true));
  window.scrollTo(0, 0);
};

const routes = [
  {
    path: "/",
    render: () => {
      renderTemplate("home-view");
      setOverlayScroll();
    },
  },
  {
    path: "/umOkkur",
    render: () => {
      renderTemplate("umOkkur-view");
      setOverlay(0.7, 10);
    },
  },
];

const mathRoute = () =>
  routes.find((r) => r.path === window.location.pathname) || routes[0];

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = () => {
  const route = mathRoute();
  if (scrollHandler) {
    window.removeEventListener("scroll", scrollHandler);
    scrollHandler = null;
  }
  route.render();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-link]");
    if (!a) return;
    e.preventDefault();
    navigateTo(a.getAttribute("href"));
  });
  router();
});
