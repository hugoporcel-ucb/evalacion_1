/* ===== TechStock - Capa de datos (localStorage) =====
   Simula una base de datos en el navegador para productos, ventas y usuarios. */

const DB_KEYS = {
  PRODUCTOS: "ts_productos",
  VENTAS: "ts_ventas",
  USERS: "ts_users",
};

function seedDatabase() {
  if (!localStorage.getItem(DB_KEYS.PRODUCTOS)) {
    const productos = [
      { id: 1, nombre: "Laptop Lenovo IdeaPad 3", categoria: "Computadoras", precio: 3200, stock: 12, descripcion: "15.6\" Ryzen 5, 8GB RAM, 512GB SSD" },
      { id: 2, nombre: "Mouse Logitech M170", categoria: "Accesorios", precio: 45, stock: 40, descripcion: "Mouse inalámbrico" },
      { id: 3, nombre: "Monitor Samsung 24\"", categoria: "Monitores", precio: 780, stock: 8, descripcion: "Monitor Full HD 75Hz" },
      { id: 4, nombre: "Teclado Mecánico Redragon", categoria: "Accesorios", precio: 150, stock: 20, descripcion: "Teclado mecánico RGB" },
      { id: 5, nombre: "Disco SSD Kingston 480GB", categoria: "Almacenamiento", precio: 220, stock: 25, descripcion: "SSD SATA III" },
      { id: 6, nombre: "Impresora HP DeskJet 2775", categoria: "Impresoras", precio: 480, stock: 3, descripcion: "Multifuncional a color" },
    ];
    localStorage.setItem(DB_KEYS.PRODUCTOS, JSON.stringify(productos));
  }

  if (!localStorage.getItem(DB_KEYS.VENTAS)) {
    const ventas = [
      { id: 1, productoId: 1, cliente: "Juan Pérez", cantidad: 1, precioUnitario: 3200, total: 3200, fecha: "2026-08-20" },
      { id: 2, productoId: 3, cliente: "María López", cantidad: 2, precioUnitario: 780, total: 1560, fecha: "2026-08-25" },
      { id: 3, productoId: 2, cliente: "Carlos Rojas", cantidad: 3, precioUnitario: 45, total: 135, fecha: "2026-08-29" },
    ];
    localStorage.setItem(DB_KEYS.VENTAS, JSON.stringify(ventas));
  }

  if (!localStorage.getItem(DB_KEYS.USERS)) {
    const users = [{ usuario: "admin", clave: "admin123", nombre: "Administrador" }];
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
  }
}

function getAll(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function saveAll(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

function nextId(items) {
  return items.reduce((max, it) => Math.max(max, it.id), 0) + 1;
}

/* ---- Productos ---- */
const Productos = {
  listar() {
    return getAll(DB_KEYS.PRODUCTOS);
  },
  obtener(id) {
    return this.listar().find((p) => p.id === Number(id));
  },
  crear(producto) {
    const items = this.listar();
    producto.id = nextId(items);
    items.push(producto);
    saveAll(DB_KEYS.PRODUCTOS, items);
    return producto;
  },
  actualizar(id, cambios) {
    const items = this.listar().map((p) => (p.id === Number(id) ? { ...p, ...cambios, id: p.id } : p));
    saveAll(DB_KEYS.PRODUCTOS, items);
  },
  eliminar(id) {
    const items = this.listar().filter((p) => p.id !== Number(id));
    saveAll(DB_KEYS.PRODUCTOS, items);
  },
  ajustarStock(id, delta) {
    const items = this.listar().map((p) =>
      p.id === Number(id) ? { ...p, stock: Math.max(0, p.stock + delta) } : p
    );
    saveAll(DB_KEYS.PRODUCTOS, items);
  },
};

/* ---- Ventas ---- */
const Ventas = {
  listar() {
    return getAll(DB_KEYS.VENTAS);
  },
  obtener(id) {
    return this.listar().find((v) => v.id === Number(id));
  },
  crear(venta) {
    const items = this.listar();
    venta.id = nextId(items);
    items.push(venta);
    saveAll(DB_KEYS.VENTAS, items);
    return venta;
  },
  eliminar(id) {
    const items = this.listar().filter((v) => v.id !== Number(id));
    saveAll(DB_KEYS.VENTAS, items);
  },
};

/* ---- Usuarios ---- */
const Usuarios = {
  listar() {
    return getAll(DB_KEYS.USERS);
  },
  validar(usuario, clave) {
    return this.listar().find((u) => u.usuario === usuario && u.clave === clave);
  },
};

seedDatabase();
