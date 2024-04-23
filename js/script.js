/*
Programa para comprar productos de almacen
*/

let maestroCategorias = [
    { id: 1, nombre: "almacen"  },
    { id: 2, nombre: "kiosco"  },
    { id: 3, nombre: "indumentaria"  },
    { id: 4, nombre: "lacteos"  }
];

let listaProductos = [
    { id: 1, nombre: "Harina", categoria: 1, stock: 3, precio: 7300, rutaImagen: "harina.jpeg" },
    { id: 2, nombre: "Fideos", categoria: 1, stock: 8, precio: 5600, rutaImagen: "fideos.jpg" },
    { id: 3, nombre: "Arroz", categoria: 1, stock: 2, precio: 5000, rutaImagen: "arroz.jpg" },
    { id: 4, nombre: "Coca Cola 2l", categoria: 1, stock: 4, precio: 4500, rutaImagen: "coca-cola-dosl.jpg.jpg" },

    { id: 5, nombre: "Coca cola 1/2l", categoria: 2, stock: 1, precio: 2800, rutaImagen: "coca-cola-mediol.jpg" },
    { id: 6, nombre: "Alfajor", categoria: 2, stock: 7, precio: 2650, rutaImagen: "alfajor.jpg" },
    { id: 7, nombre: "Chocolate", categoria: 2, stock: 7, precio: 2650, rutaImagen: "chocolate.jpg" },
    { id: 8, nombre: "Galletitas", categoria: 2, stock: 3, precio: 7300, rutaImagen: "galletitas.jpeg" },

    { id: 9, nombre: "Short", categoria: 3, stock: 8, precio: 5600, rutaImagen: "short.jpg" },
    { id: 10, nombre: "Zapatillas", categoria: 3, stock: 2, precio: 5000, rutaImagen: "zapatillas.jpg" },
    { id: 11, nombre: "Remera", categoria: 3, stock: 4, precio: 4500, rutaImagen: "remera.jpg" },
    { id: 12, nombre: "Campera", categoria: 3, stock: 1, precio: 2800, rutaImagen: "campera.jpg" },

    { id: 13, nombre: "Leche", categoria: 4, stock: 7, precio: 2650, rutaImagen: "leche.jpg" },
    { id: 14, nombre: "Yogurt", categoria: 4, stock: 7, precio: 2650, rutaImagen: "yogurt.jpg" },
    { id: 14, nombre: "Manteca", categoria: 4, stock: 7, precio: 2650, rutaImagen: "manteca.jpg" },
    { id: 15, nombre: "Salchichas", categoria: 4, stock: 7, precio: 2650, rutaImagen: "Salchichas.jpg" },
];

generarMenu (maestroCategorias, listaProductos);

function generarMenu(mCategorias, lProductos) {
    let opcion;
    let salidaCategoria = false;
    let monto = 0;
    let total = 0;

   

    var lProductosxCategoria = "";
    /*var algo = filtrarProductosxCategoria(2).forEach(producto => {
        lProductosxCategoria += `El Producto seleccionado es ${producto.nombre}.`;
    });*/

    //alert(lProductosxCategoria);
    let carrito = [];
    do {
        
        let mensajeSalida = armarMensajeCategoria(mCategorias);    
        let seleccion  = Number(prompt(mensajeSalida));

        //let resultadoValidacion = ValidarDatos(seleccion);
        if (seleccion == 0)
        {
            //let resultado = prompt("Error/es:\n" + resultadoValidacion + "\n\n1 - para volver a calcular.\n0 - para Salir.");
            
            if(carrito.length === 0)
                alert("No hay productos en el carrito");
            else
                alert(mostrarResultadoFinal(carrito));
            
            salidaCategoria = false;
        }
        else if(existeCategoria(maestroCategorias, seleccion))
        {
            alert("No existe la categoria que ha seleccionado.");
            salidaCategoria = true;
        }
        else
        {
            let categoria = filtrarCategoria(maestroCategorias, seleccion);
            let mensajeSalidaProductos = armarMensajeProducto(listaProductos, categoria);    
            let seleccionProducto  = Number(prompt(mensajeSalidaProductos));
            
            if(listaProductos.findIndex(producto => producto.categoria === categoria[0].id && producto.id === seleccionProducto) === -1)
            {
                alert("No existe el producto para esta Categoria")
            }
            else
            {
                let posicionProductoEnCarrito = carrito.findIndex(producto => producto.id === seleccionProducto)
                let validaStock = true;
                if (posicionProductoEnCarrito !== -1) {
                    if (carrito[posicionProductoEnCarrito].stock === 0)
                    {
                        validaStock = false;
                        alert("Producto sin stock, seleccione otro."); 
                    }
                }
                if(validaStock)
                    carrito = AgregarProductoAlCarrito(carrito, listaProductos, seleccionProducto);
                
                    //Agrego una sola unidad, deberia pedirle al cliente la cantidad de productos
            }
            salidaCategoria = true;

        }

    } while (salidaCategoria)
}

function mostrarResultadoFinal(carrito) {
    var mensaje = "Productos Seleccionados, Su carrito tiene:\n\n";
    var total = 0;
    carrito.forEach(seleccionado => {
        mensaje += `${seleccionado.unidades} unidades del producto ${seleccionado.nombre} con un Subtotal de ${seleccionado.subtotal}.\n`;

        total += seleccionado.subtotal;
    });

    mensaje += `\nTotal: ${total}`;
    return mensaje;
}

function armarMensajeProducto(lProductos, categoria) {
    var mensaje = `Seleccione un numero de producto de la categoria ${categoria[0].nombre}.\n\n`;
    lProductos.filter(producto => producto.categoria === categoria[0].id).forEach(producto => {
        mensaje += `Seleccione ${producto.id} para el producto ${producto.nombre}.\n`;
    });

    return mensaje += "\n0 - Para salir sin seleccionar producto.\n";
}

function armarMensajeCategoria(mCategorias) {
    var mensaje = "Seleccione un numero de categoria de producto\n\n";
    mCategorias.forEach(categoria => {
        mensaje += `Seleccione ${categoria.id} para la categoria ${categoria.nombre}.\n`;
    });

    return mensaje += "\n0 - Para mostrar carrito y salir.\n";
}

function filtrarCategoria(mCategorias, idCategoria) {
    return mCategorias.filter(categoria => categoria.id === idCategoria);
}

function filtrarProductosxCategoria(lProductos, seleccion) {
    return lProductos.filter(producto => producto.categoria === seleccion);
}

function existeCategoria(mCategorias, idCategoria) {
    let categoriaSel = mCategorias.filter(categoria => categoria.id === idCategoria);

    if(categoriaSel.length === 0)
        return true;
    else
        return false;
}

function AgregarProductoAlCarrito(carrito, listaProductos, seleccionProducto) {
    let productoBuscado = listaProductos.find(producto => producto.id === seleccionProducto)
    let posicionProductoEnCarrito = carrito.findIndex(producto => producto.id === seleccionProducto)
    
    if (posicionProductoEnCarrito !== -1) {
        carrito[posicionProductoEnCarrito].unidades++;
        carrito[posicionProductoEnCarrito].stock--;
        carrito[posicionProductoEnCarrito].subtotal = carrito[posicionProductoEnCarrito].precioUnitario * carrito[posicionProductoEnCarrito].unidades;
    } else {
        carrito.push({
            id: productoBuscado.id,
            nombre: productoBuscado.nombre,
            precioUnitario: productoBuscado.precio,
            unidades: 1,
            stock: productoBuscado.stock - 1, //el stock deberia modificarse en la lista de productos, pero para este ejemplo lo hago en el carrito
            subtotal: productoBuscado.precio
        })
    }

    return carrito;
}
function ValidarDatos(){

}