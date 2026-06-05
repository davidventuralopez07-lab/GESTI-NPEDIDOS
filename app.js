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
