let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let productos = JSON.parse(localStorage.getItem("productos")) || [];

/* =========================
   GUARDAR DATOS
========================= */

function guardarClientes() {
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

/* =========================
   CLIENTES
========================= */

function agregarCliente() {

    const nombre = document.getElementById("clienteNombre").value.trim();
    const direccion = document.getElementById("clienteDireccion").value.trim();

    if (nombre === "" || direccion === "") {
        alert("Completa todos los campos");
        return;
    }

    clientes.push({
        nombre: nombre,
        direccion: direccion
    });

    guardarClientes();
    renderClientes();

    document.getElementById("clienteNombre").value = "";
    document.getElementById("clienteDireccion").value = "";
}

function renderClientes() {

    const tabla = document.getElementById("tablaClientes");

    if (!tabla) return;

    tabla.innerHTML = "";

    clientes.forEach((cliente, index) => {

        tabla.innerHTML += `
        <tr>
            <td>${cliente.nombre}</td>
            <td>${cliente.direccion}</td>
            <td>
                <button class="delete" onclick="eliminarCliente(${index})">
                    X
                </button>
            </td>
        </tr>
        `;
    });
}

function eliminarCliente(index) {

    clientes.splice(index, 1);

    guardarClientes();
    renderClientes();
}

function borrarClientes() {

    if (!confirm("¿Borrar todos los clientes?")) return;

    clientes = [];

    guardarClientes();
    renderClientes();
}

/* =========================
   PRODUCTOS
========================= */

function agregarProducto() {

    const nombre = document.getElementById("productoNombre").value.trim();
    const precio = parseFloat(
        document.getElementById("productoPrecio").value
    );

    if (nombre === "" || isNaN(precio)) {
        alert("Completa todos los campos");
        return;
    }

    productos.push({
        nombre: nombre,
        precio: precio
    });

    guardarProductos();
    renderProductos();

    document.getElementById("productoNombre").value = "";
    document.getElementById("productoPrecio").value = "";
}

function renderProductos() {

    const tabla = document.getElementById("tablaProductos");

    if (!tabla) return;

    tabla.innerHTML = "";

    productos.forEach((producto, index) => {

        tabla.innerHTML += `
        <tr>
            <td>${producto.nombre}</td>
            <td>${producto.precio.toFixed(2)} €</td>
            <td>
                <button class="delete" onclick="eliminarProducto(${index})">
                    X
                </button>
            </td>
        </tr>
        `;
    });
}

function eliminarProducto(index) {

    productos.splice(index, 1);

    guardarProductos();
    renderProductos();
}

function borrarProductos() {

    if (!confirm("¿Borrar todos los productos?")) return;

    productos = [];

    guardarProductos();
    renderProductos();
}

/* =========================
   NAVEGACIÓN
========================= */

function mostrar(sectionId) {

    document.querySelectorAll(".section")
        .forEach(section => {
            section.classList.remove("active");
        });

    const destino = document.getElementById(sectionId);

    if (destino) {
        destino.classList.add("active");
    }
}

/* =========================
   INICIO
========================= */

window.onload = function () {

    renderClientes();
    renderProductos();
};
