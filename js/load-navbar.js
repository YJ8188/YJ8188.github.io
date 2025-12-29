document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("navbar-container").innerHTML = html;
      initAll(); // 👈 关键
    })
    .catch(err => console.error("导航加载失败", err));
});
