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
function verPedidosFecha(){

    const fecha =
    document.getElementById("fechaConsulta").value;

    const resultado =
    document.getElementById("resultadoCalendario");

    resultado.innerHTML = "";

    const pedidosDia =
    pedidos.filter(p => p.fecha === fecha);

    if(pedidosDia.length === 0){

        resultado.innerHTML =
        "<p>No hay pedidos para ese día.</p>";

        return;
    }

    let totalDia = 0;

    pedidosDia.forEach(p=>{

        totalDia += p.total;

        resultado.innerHTML += `
            <div style="
                border:1px solid #ddd;
                padding:15px;
                margin-top:10px;
                border-radius:8px;
                background:#fafafa;
            ">
                <strong>${p.cliente}</strong><br>
                Total pedido: ${p.total.toFixed(2)} €
            </div>
        `;
    });

    resultado.innerHTML += `
        <h3>
            Total del día: ${totalDia.toFixed(2)} €
        </h3>
    `;
}

async function descargarPDF(){

    const fecha =
    document.getElementById("fechaConsulta").value;

    const pedidosDia =
    pedidos.filter(p => p.fecha === fecha);

    if(pedidosDia.length === 0){

        alert("No hay pedidos para ese día");

        return;
    }

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    let y = 20;

    pdf.setFontSize(18);
    pdf.text("VENTURA",10,y);

    y += 10;

    pdf.setFontSize(12);
    pdf.text("Pedidos del día: " + fecha,10,y);

    y += 15;

    pedidosDia.forEach(p=>{

        pdf.text(
            "Cliente: " + p.cliente,
            10,
            y
        );

        y += 8;

        p.lineas.forEach(l=>{

            pdf.text(
                `${l.producto} | ${l.kg} kg | ${l.precio} €/kg | ${l.subtotal.toFixed(2)} €`,
                15,
                y
            );

            y += 8;

            if(y > 260){
                pdf.addPage();
                y = 20;
            }

        });

        pdf.text(
            "TOTAL PEDIDO: " +
            p.total.toFixed(2) + " €",
            15,
            y
        );

        y += 12;
    });

    pdf.save(
        "Pedidos_" + fecha + ".pdf"
    );
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
