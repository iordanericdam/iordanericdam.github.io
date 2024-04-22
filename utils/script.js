document.addEventListener("DOMContentLoaded", function () {
  let productos = [];
  let cesta = [];

  const productList = document.getElementById("lista_productos");
  const select = document.querySelector("#select");
  const btnSelect = document.querySelector("#btnSelect");
  const selectCategoria = document.querySelector("#selectCategoria");
  const selectMarca = document.querySelector("#selectMarca");
  const listaCesta = document.querySelector("#lista_cesta");

  function fetchProductos() {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        productos = data.products;
        mostrarProductosEnLista(productos);
        cesta.forEach((item) => mostrarProducto(item, listaCesta));
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }

  function mostrarProductosEnLista(productos) {
    productList.innerHTML = "";
    productos.forEach((producto) => mostrarProducto(producto, productList));
  }

  function añadirProductoCesta(title, image, price) {
    const productoExistente = cesta.find(
      (producto) => producto.title === title
    );
    if (productoExistente) {
      listaCesta.textContent = "";
      cesta.forEach((item) => mostrarProductoCesta(item, listaCesta));
      productoExistente.quantity++;
    } else {
      const producto = {
        title: title,
        thumbnail: image,
        price: price,
        quantity: 1,
      };
      cesta.push(producto);
      mostrarProductoCesta(producto, listaCesta);
    }
  }

  function filtrarProductosPorCategoria(categoriaSeleccionada) {
    return productos.filter(
      (producto) => producto.category === categoriaSeleccionada
    );
  }

  function filtrarProductosPorMarca(marcaSeleccionada) {
    return productos.filter((producto) =>
      producto.brand.includes(marcaSeleccionada)
    );
  }

  function botonMas(title){
    productoExistente = cesta.find(
      (producto) => producto.title === title
    );
    productoExistente.quantity++;
    refrescarCesta()
  }

  function botonMenos(title){
    productoExistente = cesta.find(
      (producto) => producto.title === title
    );


    if (productoExistente.quantity == 1){
      Swal.fire({
        title: "¿Estás seguro que deseas eliminar el producto de la cesta?",
        text: "Podrás añadir nuevamente el producto en cualquier momento",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, elimínalo!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "¡Eliminado!",
            text: "El producto ha sido eliminado.",
            icon: "success"
          });
          productoExistente.quantity = 0;
          refrescarCesta();
        } else {
        }
      });
    } else {
      productoExistente.quantity--;
      refrescarCesta();
    }
}

  function refrescarCesta(){
    listaCesta.textContent = "";
    cesta = cesta.filter((item) => item.quantity > 0);
    cesta.forEach((item) => mostrarProductoCesta(item, listaCesta));
    
  };

  function mostrarProducto(item, container) {
    container.innerHTML += `<div class="card col-2 m-2" style="width: 18rem;">
        </br>
        <img src="${item.thumbnail}" class="card-img-top" alt="Imagen de producto">
        <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.description}</p>
            <p class="card-text">Precio: ${item.price}€</p>
            <a class="btn btn-primary" data-product-name="${item.title}" data-product-image="${item.thumbnail}" data-product-price="${item.price}">Añadir a la cesta</a>
        </div>
    </div>`;
  }

  function mostrarProductoCesta(item, container) {
    container.innerHTML += `<div class="card col-2 m-2" style="width: 18rem;">
        </br>
        <img src="${item.thumbnail}" class="card-img-top" alt="Imagen de producto">
        <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">Precio: ${item.price}€</p>
            <p class="card-text">Cantidad: ${item.quantity}</p>
        </div>
        <div class="contador">
        <a class="btn btn-secondary menos" data-product-name="${item.title}">-</a>
        <p id="numero">${item.quantity}</p>
        <a class="btn btn-secondary mas" data-product-name="${item.title}">+</a>
        </div>
    </div>`;
  }

  btnSelect.addEventListener("click", () => {
    switch (select.value) {
      case "all":
        mostrarProductosEnLista(productos);
        break;
      case "precioMinimo":
        const productosOrdenados = [...productos];
        productosOrdenados.sort((a, b) => a.price - b.price);
        mostrarProductosEnLista(productosOrdenados);
        break;
      case "categoria":
        mostrarProductosEnLista(
          filtrarProductosPorCategoria(selectCategoria.value)
        );
        break;
      case "marca":
        mostrarProductosEnLista(filtrarProductosPorMarca(selectMarca.value));
        break;
    }
  });

  select.addEventListener("change", () => {
    if (select.value === "marca") {
      selectCategoria.style.display = "none";
      selectMarca.style.display = "inline";
    } else if (select.value === "categoria") {
      selectCategoria.style.display = "inline";
      selectMarca.style.display = "none";
    } else {
      selectMarca.style.display = "none";
      selectCategoria.style.display = "none";
    }
  });

  productList.addEventListener("click", function (event) {
    if (event.target && event.target.matches("a.btn-primary")) {
      const productName = event.target.getAttribute("data-product-name");
      const productImage = event.target.getAttribute("data-product-image");
      const productPrice = event.target.getAttribute("data-product-price");
      añadirProductoCesta(productName, productImage, productPrice);
    }
  });

  listaCesta.addEventListener("click", function (event){
    if (event.target && event.target.matches("a.btn-secondary")) {
      productName = event.target.getAttribute("data-product-name");
      } if (event.target.matches("a.menos"))  {
        botonMenos(productName)
      } else if(event.target.matches("a.mas")){
        botonMas(productName)
      }
  })
  fetchProductos();
});
