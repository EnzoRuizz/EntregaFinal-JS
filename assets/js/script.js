let stock = [];

$(()=>{
      $.getJSON("../assets/data/stock.json",(respuesta)=>{
        stock = respuesta;
    

    //  Push productos
    let productos = [];
    productos.push(new Producto(stock[0]));
    productos.push(new Producto(stock[1]));
    productos.push(new Producto(stock[2]));
    productos.push(new Producto(stock[3]));
    productos.push(new Producto(stock[4]));
    productos.push(new Producto(stock[5]));
    productos.push(new Producto(stock[6]));
    productos.push(new Producto(stock[7]));
    productos.push(new Producto(stock[8]));
    //////  Variables  /////////

    let containerMain = document.getElementById('generarCards');
    const btnCompra = document.getElementsByClassName('comprar');
    let containerCarrito = document.getElementById('lista-carrito');
    let btnCarrito = document.getElementsByClassName('irCarrito');
    const seleccionados = [];

    $(document).ready(function() {

      checkStorage();
    
    })
    // Revisar el storage
    function checkStorage() {
      if ($.isEmptyObject(carrito) === true) {
        console.log("El Local Storage se encuentra vacío");
      } else {
        let almacenados = JSON.parse(localStorage.getItem("carrito"));
        console.log ("El Local Storage esta lleno")
        for (const item of almacenados) {
        seleccionados.push(new Producto(item));
        
        }
        console.log(`${seleccionados} se encuentra en Local Storage`)
        generarCarrito();
      }
    }
    // Crear una card por cada producto
    for(let producto of productos){
        crearCard(producto);
    }

    // Enventos
    // Evento para agregar al carrito a travez del button
    for (const boton of btnCompra) {
      boton.onclick =  agregarProducto;
    }
    $(btnCarrito).click(function(){
      sincronizarStorage();
    })

    /////////////  Funciones  /////////////
    // Crear card con el producto
    function crearCard(producto){
        let div = document.createElement("div");
        div.id  = `ID ${producto.id}`;
        div.className = ('col-lg-3 col-md-6', 'animate__animated animate__flip animate__delay-5s')
        div.style = "width: 18rem"
        div.innerHTML = ` <div class="card m-3">
                                      <div class="card-body">
                                        <img src="${producto.imagen}" class="card-img-top p-3 img-fluid" alt="${producto.nombre}" >
                                        <h2 class="card-title nombre">${producto.nombre}</h2>
                                        <p class="card-text texto">Precio: $${producto.precio}</p>
                                        <button id="${producto.id}" class="comprar btn btn-dark">COMPRAR</button>
                                      </div>
                                    </div>`
      
        containerMain.appendChild(div);
    }
    // Agregar producto al carrito
    function agregarProducto(e){
      $(e.target).text ("Añadir otro");
      let producto = seleccionados.find(producto => producto.id == e.target.id);
      if (producto != undefined) {
      producto.addCantidad();
      } else {
      let seleccionado = stock.find(producto => producto.id == e.target.id);
      seleccionados.push(new Producto(seleccionado));
      }
      generarCarrito();
    }   

    // Generar Carrito
    function generarCarrito(){
      // Generar informacion dentro del carrito
      removeCarritoPrevio();
      for (const producto of seleccionados) {
        const row = document.createElement('tr');
                row.innerHTML = 
                    `<td>  
                        <img src="${producto.imagen}" width=50>
                      </td>
                      <td>${producto.nombre}</td>
                      <td>${producto.getTotal()}</td>
                      <td>${producto.cantidad}</td>
                      <td>
                      <a href="#"><i id="${producto.id}" class="fa fa-trash fa-2x btnDelete"></i></a>
                      </td>
                      `;
                containerCarrito.appendChild(row);

                $(".btnDelete").click(function (e) { 
                  console.log("se elimino un item del carrito")
                  eliminarDelete(e.target.id);
                  generarCarrito();
                })
      sincronizarStorage();
      }
    }
      
    // Eliminar el carrito anterior
    function removeCarritoPrevio(){
      containerCarrito.innerHTML = '';
      localStorage = null; 
    }


    function eliminarDelete(id){
      const objeto = seleccionados.find(x => x.id == id);
        if(objeto.cantidad == 1){
          const idObj  = seleccionados.indexOf(objeto);
          seleccionados.splice(idObj, 1);
          console.log(seleccionados);
        } else {
          objeto.resCantidad();
          console.log(seleccionados);
        }
      }
   
    // Sincronizar storage
    function sincronizarStorage() {
      localStorage.setItem('carrito', JSON.stringify(seleccionados));
    }
  })
})

/////

// Animacion carrito

$('.fa-shopping-cart').hover(function () {
  $('#carrito').show();
  if ($("#lista-carrito").is(":empty"))
          $("#encabezado").hide();
      else
          $("#encabezado").show();
});

$('#carrito').mouseleave(function(){
  $(this).hide();
});

