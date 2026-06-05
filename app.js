let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let productos = JSON.parse(localStorage.getItem("productos")) || [];

function guardarClientes() {
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

/* CLIENTES */

function agregarCliente() {

    const nombre = document.getElementById("clienteNombre");
    const direccion = document.getElementById("clienteDireccion");

    if (!nombre || !direccion) return;

    if (nombre.value.trim() === "" || direccion.value.trim() === "") {
        alert("Completa todos los campos");
        return;
    }

    clientes.push({
        nombre: nombre.value,
        direccion: direccion.value
    });

    guardarClientes();
    renderClientes();

    nombre.value = "";
    direccion.value = "";
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
                <button onclick="eliminarCliente(${index})">
                    ❌
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

/* PRODUCTOS */

function agregarProducto() {

    const nombre = document.getElementById("productoNombre");
    const precio = document.getElementById("productoPrecio");

    if (!nombre || !precio) return;

    if (nombre.value.trim() === "" || precio.value.trim() === "") {
        alert("Completa todos los campos");
        return;
    }

    productos.push({
        nombre: nombre.value,
        precio: parseFloat(precio.value)
    });

    guardarProductos();
    renderProductos();

    nombre.value = "";
    precio.value = "";
}

function renderProductos() {

    const tabla = document.getElementById("tablaProductos");

    if (!tabla) return;

    tabla.innerHTML = "";

    productos.forEach((producto, index) => {

        tabla.innerHTML += `
        <tr>
            <td>${producto.nombre}</td>
            <td>${producto.precio} €</td>
            <td>
                <button onclick="eliminarProducto(${index})">
                    ❌
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

/* CAMBIO DE PESTAÑAS */

function showSection(sectionId) {

    document.querySelectorAll(".panel, .section")
        .forEach(seccion => {
            seccion.classList.remove("active");
        });

    const destino = document.getElementById(sectionId);

    if (destino) {
        destino.classList.add("active");
    }
}

/* INICIO */

window.onload = function () {

    renderClientes();
    renderProductos();
};
