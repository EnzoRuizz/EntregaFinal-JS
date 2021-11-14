//// Carrito ////
let contenedor = "";
let resumen = "";
let resumenTotal = "";

// Json almacenados
let almacenados = JSON.parse(localStorage.getItem("carrito"));
console.log(almacenados);

if ($.isEmptyObject(almacenados) === true) {
    console.log("vacio");
}


let containerCarrito = document.getElementById('tabla-carrito');
let containerResumen = document.getElementById('resumen');
let containerTr = document.getElementById('tfoot');


let subtotalProducto = almacenados.map( img => img.cantidad * img.precio);
console.log(almacenados);
let subtotal = subtotalProducto.reduce( (a,b) => (a + b) );
console.log(subtotalProducto);
console.log(subtotal);

let total = subtotal + 250

// Datos al carrito


for (const producto of almacenados) {
    contenedor = document.createElement("tr");
    contenedor.innerHTML = `
    <td>${producto.nombre}</td>
    <td>${producto.cantidad}</td>
    <td>${producto.cantidad * producto.precio}</td>
    `
    containerCarrito.appendChild(contenedor);

}

// Subtotal
resumen = document.createElement("tr");
resumen.innerHTML = `<th scope="row">Subtotal</th>
<td>$${subtotal}</td>
</tr>`
containerResumen.prepend(resumen);

// Total
resumenTotal = document.createElement("tr");
resumenTotal.innerHTML = `<th scope="row">Total</th>
<td>$${total}</td>
</tr>
`
containerTr.appendChild(resumenTotal);