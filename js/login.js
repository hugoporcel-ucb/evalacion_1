/* ===== TechStock - Lógica de la página de login ===== */

(function () {
  if (getSession()) {
    window.location.href = "dashboard.html";
    return;
  }

  const form = document.getElementById("loginForm");
  const errorBanner = document.getElementById("loginError");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value.trim();
    const clave = document.getElementById("clave").value;

    if (login(usuario, clave)) {
      window.location.href = "dashboard.html";
    } else {
      errorBanner.classList.add("show");
    }
  });
})();
