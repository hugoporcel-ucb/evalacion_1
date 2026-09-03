/* ===== TechStock - Listado de ventas (enlazado a productos) ===== */

(function () {
  requireAuth();
  renderShell("ventas", "Ventas");

  const body = document.getElementById("salesBody");
  const searchInput = document.getElementById("searchInput");
  const resultCount = document.getElementById("resultCount");

  function render(filtro) {
    const q = (filtro || "").toLowerCase();
    const ventas = Ventas.listar()
      .map((v) => ({ ...v, producto: Productos.obtener(v.productoId) }))
      .filter(
        (v) =>
          v.cliente.toLowerCase().includes(q) ||
          (v.producto && v.producto.nombre.toLowerCase().includes(q))
      )
      .sort((a, b) => (a.fecha < b.fecha ? 1 : -1));

    resultCount.textContent = `${ventas.length} venta(s)`;

    body.innerHTML =
      ventas
        .map(
          (v) => `
        <tr>
          <td>${v.producto ? v.producto.nombre : `<span class="text-muted">(producto eliminado)</span>`}</td>
          <td>${v.cliente}</td>
          <td>${v.cantidad}</td>
          <td>Bs. ${v.precioUnitario.toLocaleString("es-BO")}</td>
          <td><strong>Bs. ${v.total.toLocaleString("es-BO")}</strong></td>
          <td>${v.fecha}</td>
          <td class="text-right">
            <div class="row-actions" style="justify-content:flex-end;">
              <button class="btn btn-danger btn-sm" data-id="${v.id}" data-producto="${v.productoId}" data-cantidad="${v.cantidad}" data-action="delete">Eliminar</button>
            </div>
          </td>
        </tr>`
        )
        .join("") || `<tr><td colspan="7" class="empty-state">No se encontraron ventas.</td></tr>`;

    body.querySelectorAll('[data-action="delete"]').forEach((btn) => {
      btn.addEventListener("click", function () {
        if (confirm("¿Eliminar esta venta? El stock del producto será restituido.")) {
          const id = this.getAttribute("data-id");
          const productoId = this.getAttribute("data-producto");
          const cantidad = Number(this.getAttribute("data-cantidad"));
          Ventas.eliminar(id);
          Productos.ajustarStock(productoId, cantidad);
          render(searchInput.value);
        }
      });
    });
  }

  searchInput.addEventListener("input", () => render(searchInput.value));
  render("");
})();
