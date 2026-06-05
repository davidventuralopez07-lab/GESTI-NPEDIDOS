function actualizarSelects(){

    const listaClientes =
    document.getElementById("listaClientes");

    const selectProducto =
    document.getElementById("pedidoProducto");

    if(listaClientes){

        listaClientes.innerHTML = "";

        clientes.forEach(cliente=>{

            listaClientes.innerHTML += `
            <option value="${cliente.nombre}">
            `;
        });
    }

    if(selectProducto){

        selectProducto.innerHTML = "";

        productos.forEach((producto,index)=>{

            selectProducto.innerHTML += `
            <option value="${index}">
            ${producto.nombre}
            </option>
            `;
        });
    }
}
function verPedidosFecha(){

    const fecha =
    document.getElementById("fechaConsulta").value;

    const resultado =
    document.getElementById("resultadoCalendario");

    resultado.innerHTML = "";

    const pedidosDia =
    pedidos.filter(
        p => p.fecha === fecha
    );

    if(pedidosDia.length === 0){

        resultado.innerHTML =
        "<h3>No hay pedidos para esa fecha</h3>";

        return;
    }

    let html = "";

    let totalDia = 0;

    pedidosDia.forEach(pedido=>{

        totalDia += pedido.total;

        html += `
        <div style="
            border:1px solid #ddd;
            padding:15px;
            margin-bottom:15px;
            border-radius:10px;
            background:white;
        ">
            <h3>${pedido.cliente}</h3>
        `;

        pedido.lineas.forEach(linea=>{

            html += `
            <p>
            ${linea.producto}
            -
            ${linea.kg} kg
            -
            ${linea.subtotal.toFixed(2)} €
            </p>
            `;
        });

        html += `
            <strong>
            Total pedido:
            ${pedido.total.toFixed(2)} €
            </strong>
        </div>
        `;
    });

    html += `
    <h2>
    Total del día:
    ${totalDia.toFixed(2)} €
    </h2>
    `;

    resultado.innerHTML = html;
}async function descargarPDF(){

    const fecha =
    document.getElementById("fechaConsulta").value;

    const pedidosDia =
    pedidos.filter(
        p => p.fecha === fecha
    );

    if(pedidosDia.length === 0){

        alert("No hay pedidos");

        return;
    }

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    let y = 20;

    pdf.setFontSize(18);
    pdf.text("VENTURA",10,y);

    y += 10;

    pdf.setFontSize(12);
    pdf.text(
        "Pedidos del día: " + fecha,
        10,
        y
    );

    y += 15;

    pedidosDia.forEach(pedido=>{

        pdf.text(
            "Cliente: " + pedido.cliente,
            10,
            y
        );

        y += 8;

        pedido.lineas.forEach(linea=>{

            pdf.text(
                `${linea.producto} | ${linea.kg}kg | ${linea.subtotal.toFixed(2)}€`,
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
            "TOTAL: " +
            pedido.total.toFixed(2) +
            " €",
            15,
            y
        );

        y += 15;
    });

    pdf.save(
        "Pedidos_" + fecha + ".pdf"
    );
}
