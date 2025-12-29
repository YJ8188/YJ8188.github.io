function initTheme() {
  const theme = localStorage.getItem("theme") || "light";
  document.body.className = theme;

  document.querySelector(".theme-toggle")
    ?.addEventListener("click", () => {
      const next = document.body.classList.contains("dark")
        ? "light"
        : "dark";
      document.body.className = next;
      localStorage.setItem("theme", next);
    });
}

function highlightCurrentPage() {
  const page = location.pathname.split("/").pop() || "index.html";
  const map = {
    "index.html": "nav-home",
    "resume.html": "nav-resume",
    "articles.html": "nav-articles",
    "about.html": "nav-about",
    "contact.html": "nav-contact",
    "resources.html": "nav-resources",
    "tutorials.html": "nav-tutorials",
    "portfolio.html": "nav-portfolio"
  };
  const id = map[page];
  if (id) document.getElementById(id)?.classList.add("active");
}

function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  btn.onclick = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function initAll() {
  initTheme();
  highlightCurrentPage();
  initBackToTop();
}
