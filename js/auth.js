/* ===== TechStock - Autenticación (simulada con sessionStorage) ===== */

const SESSION_KEY = "ts_session";

function login(usuario, clave) {
  const user = Usuarios.validar(usuario, clave);
  if (!user) return false;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ usuario: user.usuario, nombre: user.nombre }));
  return true;
}

function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  window.location.href = "login.html";
}

function getSession() {
  const raw = sessionStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

function requireAuth() {
  if (!getSession()) {
    window.location.href = "login.html";
  }
}
