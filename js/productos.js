/* ===== TechStock - Listado de productos ===== */

(function () {
  requireAuth();
  renderShell("productos", "Productos");

  const body = document.getElementById("productsBody");
  const searchInput = document.getElementById("searchInput");
  const resultCount = document.getElementById("resultCount");

  function estadoBadge(stock) {
    if (stock === 0) return `<span class="badge badge-danger">Sin stock</span>`;
    if (stock <= 5) return `<span class="badge badge-warn">Stock bajo</span>`;
    return `<span class="badge badge-ok">Disponible</span>`;
  }

  function render(filtro) {
    const productos = Productos.listar().filter((p) => {
      const q = (filtro || "").toLowerCase();
      return p.nombre.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q);
    });

    resultCount.textContent = `${productos.length} producto(s)`;

    body.innerHTML =
      productos
        .map(
          (p) => `
        <tr>
          <td>
            <div style="font-weight:600;">${p.nombre}</div>
            <div class="text-muted" style="font-size:12px;">${p.descripcion || ""}</div>
          </td>
          <td>${p.categoria}</td>
          <td>Bs. ${p.precio.toLocaleString("es-BO")}</td>
          <td>${p.stock}</td>
          <td>${estadoBadge(p.stock)}</td>
          <td class="text-right">
            <div class="row-actions" style="justify-content:flex-end;">
              <a class="btn btn-secondary btn-sm" href="producto-form.html?id=${p.id}">Editar</a>
              <button class="btn btn-danger btn-sm" data-id="${p.id}" data-action="delete">Eliminar</button>
            </div>
          </td>
        </tr>`
        )
        .join("") || `<tr><td colspan="6" class="empty-state">No se encontraron productos.</td></tr>`;

    body.querySelectorAll('[data-action="delete"]').forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        const producto = Productos.obtener(id);
        const tieneVentas = Ventas.listar().some((v) => v.productoId === Number(id));
        if (tieneVentas) {
          alert("No se puede eliminar: este producto tiene ventas registradas.");
          return;
        }
        if (confirm(`¿Eliminar el producto "${producto.nombre}"?`)) {
          Productos.eliminar(id);
          render(searchInput.value);
        }
      });
    });
  }

  searchInput.addEventListener("input", () => render(searchInput.value));
  render("");
})();
