let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

let pedidoActual = [];

/* =========================
   NAVEGACIÓN
========================= */

function mostrar(sectionId){

    document.querySelectorAll(".section")
    .forEach(section=>{
        section.classList.remove("active");
    });

    document
    .getElementById(sectionId)
    .classList.add("active");
}

/* =========================
   GUARDAR DATOS
========================= */

function guardarClientes(){
    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );
}

function guardarProductos(){
    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );
}

function guardarPedidos(){
    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );
}

/* =========================
   CLIENTES
========================= */

function agregarCliente(){

    const nombre =
    document.getElementById("clienteNombre").value.trim();

    const direccion =
    document.getElementById("clienteDireccion").value.trim();

    if(nombre === "" || direccion === ""){
        alert("Completa todos los campos");
        return;
    }

    clientes.push({
        nombre,
        direccion
    });

    guardarClientes();

    renderClientes();

    actualizarSelects();

    document.getElementById("clienteNombre").value = "";
    document.getElementById("clienteDireccion").value = "";
}

function renderClientes(){

    const tabla =
    document.getElementById("tablaClientes");

    if(!tabla) return;

    tabla.innerHTML = "";

    clientes.forEach((cliente,index)=>{

        tabla.innerHTML += `
        <tr>
            <td>${cliente.nombre}</td>
            <td>${cliente.direccion}</td>
            <td>
                <button
                class="delete"
                onclick="eliminarCliente(${index})">
                X
                </button>
            </td>
        </tr>
        `;
    });
}

function eliminarCliente(index){

    clientes.splice(index,1);

    guardarClientes();

    renderClientes();

    actualizarSelects();
}

function borrarClientes(){

    if(!confirm("¿Borrar todos los clientes?")) return;

    clientes = [];

    guardarClientes();

    renderClientes();

    actualizarSelects();
}

/* =========================
   PRODUCTOS
========================= */

function agregarProducto(){

    const nombre =
    document.getElementById("productoNombre").value.trim();

    const precio =
    parseFloat(
        document.getElementById("productoPrecio").value
    );

    if(nombre === "" || isNaN(precio)){
        alert("Completa todos los campos");
        return;
    }

    productos.push({
        nombre,
        precio
    });

    guardarProductos();

    renderProductos();

    actualizarSelects();

    document.getElementById("productoNombre").value = "";
    document.getElementById("productoPrecio").value = "";
}

function renderProductos(){

    const tabla =
    document.getElementById("tablaProductos");

    if(!tabla) return;

    tabla.innerHTML = "";

    productos.forEach((producto,index)=>{

        tabla.innerHTML += `
        <tr>
            <td>${producto.nombre}</td>
            <td>${producto.precio.toFixed(2)} €</td>
            <td>
                <button
                class="delete"
                onclick="eliminarProducto(${index})">
                X
                </button>
            </td>
        </tr>
        `;
    });
}

function eliminarProducto(index){

    productos.splice(index,1);

    guardarProductos();

    renderProductos();

    actualizarSelects();
}

function borrarProductos(){

    if(!confirm("¿Borrar todos los productos?")) return;

    productos = [];

    guardarProductos();

    renderProductos();

    actualizarSelects();
}

/* =========================
   SELECTS PEDIDOS
========================= */

function actualizarSelects(){

    const selectCliente =
    document.getElementById("pedidoCliente");

    const selectProducto =
    document.getElementById("pedidoProducto");

    if(!selectCliente || !selectProducto) return;

    selectCliente.innerHTML = "";
    selectProducto.innerHTML = "";

    clientes.forEach((cliente,index)=>{

        selectCliente.innerHTML += `
        <option value="${index}">
        ${cliente.nombre}
        </option>
        `;
    });

    productos.forEach((producto,index)=>{

        selectProducto.innerHTML += `
        <option value="${index}">
        ${producto.nombre}
        </option>
        `;
    });
}

/* =========================
   PEDIDOS
========================= */

function agregarLineaPedido(){

    const productoIndex =
    document.getElementById("pedidoProducto").value;

    const kg =
    parseFloat(
        document.getElementById("pedidoKg").value
    );

    if(isNaN(kg) || kg <= 0){
        alert("Introduce los kilos");
        return;
    }

    const producto =
    productos[productoIndex];

    if(!producto){
        alert("No hay productos");
        return;
    }

    const subtotal =
    producto.precio * kg;

    pedidoActual.push({
        producto: producto.nombre,
        kg,
        precio: producto.precio,
        subtotal
    });

    renderPedidoActual();

    document.getElementById("pedidoKg").value = "";
}

function renderPedidoActual(){

    const tabla =
    document.getElementById("lineasPedido");

    if(!tabla) return;

    tabla.innerHTML = "";

    let total = 0;

    pedidoActual.forEach(linea=>{

        total += linea.subtotal;

        tabla.innerHTML += `
        <tr>
            <td>${linea.producto}</td>
            <td>${linea.kg}</td>
            <td>${linea.precio.toFixed(2)} €</td>
            <td>${linea.subtotal.toFixed(2)} €</td>
        </tr>
        `;
    });

    document.getElementById("totalPedido")
    .textContent =
    total.toFixed(2);
}

function guardarPedido(){

    const fecha =
    document.getElementById("pedidoFecha").value;

    const clienteIndex =
    document.getElementById("pedidoCliente").value;

    if(!fecha){
        alert("Selecciona una fecha");
        return;
    }

    if(pedidoActual.length === 0){
        alert("Añade productos");
        return;
    }

    let total = 0;

    pedidoActual.forEach(linea=>{
        total += linea.subtotal;
    });

    pedidos.push({
        fecha,
        cliente:
        clientes[clienteIndex].nombre,
        lineas:[...pedidoActual],
        total
    });

    guardarPedidos();

    pedidoActual = [];

    renderPedidoActual();

    renderPedidos();

    alert("Pedido guardado");
}

function renderPedidos(){

    const tabla =
    document.getElementById("tablaPedidos");

    if(!tabla) return;

    tabla.innerHTML = "";

    pedidos.forEach(pedido=>{

        tabla.innerHTML += `
        <tr>
            <td>${pedido.fecha}</td>
            <td>${pedido.cliente}</td>
            <td>${pedido.total.toFixed(2)} €</td>
        </tr>
        `;
    });
}

/* =========================
   INICIO
========================= */

window.onload = function(){

    renderClientes();

    renderProductos();

    actualizarSelects();

    renderPedidos();

};
