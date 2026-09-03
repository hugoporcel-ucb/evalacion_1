/* ===== TechStock - Sidebar y topbar compartidos ===== */

function renderShell(activePage, pageTitle) {
  const session = getSession();
  const initials = session ? session.nombre.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() : "?";

  const links = [
    { key: "dashboard", href: "dashboard.html", icon: "🏠", label: "Dashboard" },
    { key: "productos", href: "productos.html", icon: "📦", label: "Productos" },
    { key: "ventas", href: "ventas.html", icon: "🧾", label: "Ventas" },
  ];

  const navHtml = links
    .map(
      (l) =>
        `<a href="${l.href}" class="${l.key === activePage ? "active" : ""}">
          <span class="nav-icon">${l.icon}</span><span class="label-text">${l.label}</span>
        </a>`
    )
    .join("");

  document.getElementById("sidebar").innerHTML = `
    <div class="brand"><span class="logo-badge">TS</span><span>TechStock</span></div>
    <div class="nav-group-label">Menú</div>
    <nav>${navHtml}</nav>
    <div class="sidebar-footer">TechStock &copy; 2026<br/>Módulo 1 · Evaluación GIT</div>
  `;

  document.getElementById("topbar").innerHTML = `
    <h2>${pageTitle}</h2>
    <div class="user-box">
      <div style="text-align:right; line-height:1.2;">
        <div style="font-size:13.5px; font-weight:600;">${session ? session.nombre : ""}</div>
        <a href="#" id="logoutLink" style="font-size:12px; color:#667085;">Cerrar sesión</a>
      </div>
      <div class="avatar">${initials}</div>
    </div>
  `;

  document.getElementById("logoutLink").addEventListener("click", function (e) {
    e.preventDefault();
    logout();
  });
}
