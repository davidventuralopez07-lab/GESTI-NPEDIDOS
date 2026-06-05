let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let productos = JSON.parse(localStorage.getItem("productos")) || [];

function guardarClientes() {
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

console.log("Aplicación iniciada");
