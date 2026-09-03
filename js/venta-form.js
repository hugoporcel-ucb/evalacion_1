/* ===== TechStock - Formulario de registro de venta ===== */

(function () {
  requireAuth();
  renderShell("ventas", "Registrar venta");

  const form = document.getElementById("ventaForm");
  const productoSelect = document.getElementById("productoId");
  const clienteInput = document.getElementById("cliente");
  const cantidadInput = document.getElementById("cantidad");
  const fechaInput = document.getElementById("fecha");
  const stockInfo = document.getElementById("stockInfo");
  const totalPreview = document.getElementById("totalPreview");
  const stockError = document.getElementById("stockError");

  const productos = Productos.listar();

  productoSelect.innerHTML =
    `<option value="">Seleccione...</option>` +
    productos
      .map((p) => `<option value="${p.id}" ${p.stock === 0 ? "disabled" : ""}>${p.nombre} — Bs. ${p.precio} (stock: ${p.stock})</option>`)
      .join("");

  fechaInput.value = new Date().toISOString().slice(0, 10);

  function productoActual() {
    return Productos.obtener(productoSelect.value);
  }

  function actualizarPreview() {
    const producto = productoActual();
    const cantidad = Number(cantidadInput.value) || 0;
    if (producto) {
      stockInfo.textContent = `Stock disponible: ${producto.stock} unidad(es)`;
      totalPreview.textContent = `Bs. ${(producto.precio * cantidad).toLocaleString("es-BO")}`;
    } else {
      stockInfo.textContent = "";
      totalPreview.textContent = "Bs. 0";
    }
  }

  productoSelect.addEventListener("change", actualizarPreview);
  cantidadInput.addEventListener("input", actualizarPreview);

  function validar() {
    let ok = true;
    stockError.classList.remove("show");

    const producto = productoActual();
    const cantidad = Number(cantidadInput.value);

    const reglas = [
      [productoSelect, productoSelect.value !== ""],
      [clienteInput, clienteInput.value.trim() !== ""],
      [cantidadInput, cantidad > 0 && producto && cantidad <= producto.stock],
      [fechaInput, fechaInput.value !== ""],
    ];

    reglas.forEach(([el, valido]) => {
      el.closest(".form-group").classList.toggle("invalid", !valido);
      if (!valido) ok = false;
    });

    if (producto && cantidad > producto.stock) {
      stockError.classList.add("show");
    }

    return ok;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validar()) return;

    const producto = productoActual();
    const cantidad = Number(cantidadInput.value);
    const total = producto.precio * cantidad;

    Ventas.crear({
      productoId: producto.id,
      cliente: clienteInput.value.trim(),
      cantidad,
      precioUnitario: producto.precio,
      total,
      fecha: fechaInput.value,
    });

    Productos.ajustarStock(producto.id, -cantidad);

    window.location.href = "ventas.html";
  });
})();
