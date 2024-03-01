document.addEventListener("DOMContentLoaded", function () {
  let botonInput1 = document.querySelector("input#input1");
  let botonInput2 = document.querySelector("input#input2");
  let botonOperar = document.querySelector("#boton");
  let parrafoResultado = document.querySelector("#parrafoResultado");
  let opcionOperar = document.querySelector("#opcionOperar");
  let resultado;

  botonOperar.addEventListener("click", (e) => {
    operar();
  });

  opcionOperar.addEventListener("change", (e) => {
    operar();
  });

  function operar() {
    let operacion = Number(opcionOperar.value);

    switch (operacion) {
      case 1:
        resultado = Number(botonInput1.value) + Number(botonInput2.value);
        console.log("opcion 1");
        break;
      case 2:
        resultado = Number(botonInput1.value) - Number(botonInput2.value);
        console.log("opcion 2");
        break;
      case 3:
        resultado = Number(botonInput1.value) * Number(botonInput2.value);
        console.log("opcion 3");
        break;
      case 4:
        resultado = Number(botonInput1.value) / Number(botonInput2.value);
        console.log("opcion 4");
        break;
    }
    parrafoResultado.textContent = resultado;
  }
});

/* let parrafo = document.querySelectorAll("p");
  
  parrafo.forEach((item, index) => {
    item.textContent = "Cargando parrafo " + (index + 1);
  }); */
