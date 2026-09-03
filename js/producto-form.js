/* ===== TechStock - Formulario de registro/edición de producto ===== */

(function () {
  requireAuth();
  renderShell("productos", "Registrar producto");

  const params = new URLSearchParams(window.location.search);
  const editId = params.get("id");

  const form = document.getElementById("productoForm");
  const fields = {
    nombre: document.getElementById("nombre"),
    categoria: document.getElementById("categoria"),
    precio: document.getElementById("precio"),
    stock: document.getElementById("stock"),
    descripcion: document.getElementById("descripcion"),
  };

  if (editId) {
    const producto = Productos.obtener(editId);
    if (producto) {
      document.getElementById("productoId").value = producto.id;
      document.getElementById("formTitle").textContent = "Editar producto";
      document.getElementById("formModeLabel").textContent = "Editar";
      fields.nombre.value = producto.nombre;
      fields.categoria.value = producto.categoria;
      fields.precio.value = producto.precio;
      fields.stock.value = producto.stock;
      fields.descripcion.value = producto.descripcion || "";
    }
  }

  function validar() {
    let ok = true;
    const reglas = [
      [fields.nombre, fields.nombre.value.trim() !== ""],
      [fields.categoria, fields.categoria.value !== ""],
      [fields.precio, fields.precio.value !== "" && Number(fields.precio.value) >= 0],
      [fields.stock, fields.stock.value !== "" && Number(fields.stock.value) >= 0],
    ];
    reglas.forEach(([el, valido]) => {
      el.closest(".form-group").classList.toggle("invalid", !valido);
      if (!valido) ok = false;
    });
    return ok;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validar()) return;

    const data = {
      nombre: fields.nombre.value.trim(),
      categoria: fields.categoria.value,
      precio: Number(fields.precio.value),
      stock: Number(fields.stock.value),
      descripcion: fields.descripcion.value.trim(),
    };

    if (editId) {
      Productos.actualizar(editId, data);
    } else {
      Productos.crear(data);
    }

    window.location.href = "productos.html";
  });
})();
