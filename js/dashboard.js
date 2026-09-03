/* ===== TechStock - Lógica del dashboard ===== */

(function () {
  requireAuth();
  renderShell("dashboard", "Dashboard");

  const productos = Productos.listar();
  const ventas = Ventas.listar();

  const totalProductos = productos.length;
  const totalUnidades = productos.reduce((sum, p) => sum + p.stock, 0);
  const stockBajo = productos.filter((p) => p.stock <= 5);
  const ingresos = ventas.reduce((sum, v) => sum + v.total, 0);

  const cards = [
    { icon: "📦", bg: "#eef3ff", color: "#2b4a8f", value: totalProductos, label: "Productos registrados" },
    { icon: "🧾", bg: "#e7f8f1", color: "#0f9d6f", value: ventas.length, label: "Ventas registradas" },
    { icon: "💰", bg: "#fef3e2", color: "#b5720b", value: `Bs. ${ingresos.toLocaleString("es-BO")}`, label: "Ingresos totales" },
    { icon: "⚠️", bg: "#fdeceb", color: "#e5484d", value: stockBajo.length, label: "Productos con stock bajo" },
  ];

  document.getElementById("statCards").innerHTML = cards
    .map(
      (c) => `
      <div class="stat-card">
        <div class="stat-icon" style="background:${c.bg}; color:${c.color};">${c.icon}</div>
        <div class="stat-value">${c.value}</div>
        <div class="stat-label">${c.label}</div>
      </div>`
    )
    .join("");

  const recentSales = [...ventas].sort((a, b) => (a.fecha < b.fecha ? 1 : -1)).slice(0, 5);
  const salesRows = recentSales
    .map((v) => {
      const producto = Productos.obtener(v.productoId);
      return `<tr>
        <td>${producto ? producto.nombre : "(producto eliminado)"}</td>
        <td>${v.cliente}</td>
        <td>${v.cantidad}</td>
        <td>Bs. ${v.total.toLocaleString("es-BO")}</td>
        <td>${v.fecha}</td>
      </tr>`;
    })
    .join("");
  document.getElementById("recentSalesBody").innerHTML =
    salesRows || `<tr><td colspan="5" class="empty-state">Aún no hay ventas registradas.</td></tr>`;

  const lowStockRows = stockBajo
    .map(
      (p) => `<tr>
        <td>${p.nombre}</td>
        <td>${p.categoria}</td>
        <td><span class="badge ${p.stock === 0 ? "badge-danger" : "badge-warn"}">${p.stock} und.</span></td>
      </tr>`
    )
    .join("");
  document.getElementById("lowStockBody").innerHTML =
    lowStockRows || `<tr><td colspan="3" class="empty-state">Todos los productos tienen stock saludable.</td></tr>`;
})();
