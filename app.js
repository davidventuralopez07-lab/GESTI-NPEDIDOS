let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let productos = JSON.parse(localStorage.getItem("productos")) || [];

function guardarClientes() {
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

console.log("Aplicación iniciada");
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

function agregarCliente() {

    const nombre = document.getElementById("nombreCliente").value;
    const direccion = document.getElementById("direccionCliente").value;

    if (!nombre || !direccion) {
        alert("Completa todos los campos");
        return;
    }

    clientes.push({
        nombre,
        direccion
    });

    guardarDatos();
    renderClientes();

    document.getElementById("nombreCliente").value = "";
    document.getElementById("direccionCliente").value = "";
}

function eliminarCliente(index) {

    clientes.splice(index, 1);

    guardarDatos();
    renderClientes();
}

function borrarTodosClientes() {

    if (!confirm("¿Seguro que quieres borrar todos los clientes?")) {
        return;
    }

    clientes = [];

    guardarDatos();
    renderClientes();
}

window.onload = function() {
    renderClientes();
};
