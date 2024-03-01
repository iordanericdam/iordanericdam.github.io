document.addEventListener("DOMContentLoaded", function () {
  let inputNombre = document.querySelector("#inputNombre");
  let inputApellidos = document.querySelector("#inputApellidos");
  let inputCorreo = document.querySelector("#inputCorreo");
  let selectDepartamento = document.querySelector("#selectDepartamento");
  let boton = document.querySelector("#guardarDatos");
  let lista = document.querySelector("#listaUsuarios");
  let listaIT = document.querySelector("#listaUsuariosIT");
  let listaMarketing = document.querySelector("#listaUsuariosMarketing");
  let listaVentas = document.querySelector("#listaUsuariosVentas");
  let listaAdministracion = document.querySelector(
    "#listaUsuariosAdministracion"
  );
  let datosUsuarios = [];

  let contadorIT = document.querySelector("#contadorIT");
  let contadorMarketing = document.querySelector("#contadorMarketing");
  let contadorVentas = document.querySelector("#contadorVentas");
  let contadorAdm = document.querySelector("#contadorAdministracion");

  boton.addEventListener("click", (e) => {
    if (
      inputNombre.value.length > 0 &&
      inputApellidos.value.length > 0 &&
      inputCorreo.value.length > 0
    ) {
      /* parrafoNombre.textContent = inputNombre.value;
      parrafoApellidos.textContent = inputApellidos.value;
      parrafoCorreo.textContent = inputCorreo.value;
      pDepartamento.textContent = selectDepartamento.value; */

      /* let nodo = document.createElement("li");
      nodo.textContent = `${inputNombre.value} ${inputApellidos.value}`;
      nodo.className = "animate__animated animate__backInLeft list-group-item";
      lista.append(nodo); */

      const nuevoUsuario = {
        nombre: inputNombre.value,
        apellidos: inputApellidos.value,
        correo: inputCorreo.value,
        departamento: selectDepartamento.value,
      };

      datosUsuarios.push(nuevoUsuario);
      mostrarUsuarios();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Usuario añadido correctamente",
        showConfirmButton: false,
        timer: 1500,
      });

      inputNombre.value = "";
      inputApellidos.value = "";
      inputCorreo.value = "";
    } else {
      Swal.fire({
        title: "Error!",
        text: "Debes introducir todos los datos",
        icon: "error",
        confirmButtonText: "Volver",
        timer: 1500,
      });
    }

    function mostrarUsuarios() {
      lista.innerHTML = "";
      datosUsuarios.forEach((usuario, index) => {
        const li = document.createElement("li");
        li.textContent = `Usuario ${index + 1}: ${usuario.nombre} ${
          usuario.apellidos
        }`;
        lista.appendChild(li);
        li.classList.add(
          "animate__animated",
          "animate__backInLeft",
          "list-group-item"
        );
      });
    }
    /*IT  */
    const empladosIT = datosUsuarios.filter(
      (usuario) => usuario.departamento === "IT"
    );
    let numeroResultadosIT = empladosIT.length;
    contadorIT.textContent = numeroResultadosIT;

    function mostrarUsuariosIT() {
      listaUsuariosIT.innerHTML = "";

      empladosIT.forEach((usuario, index) => {
        const li = document.createElement("li");
        li.textContent = ` Nombre: ${usuario.nombre} ${usuario.apellidos} Correo: ${usuario.correo}`;
        listaUsuariosIT.appendChild(li);
        li.classList.add("list-group-item");
      });
    }
    mostrarUsuariosIT();
    /* Ventas */
    const empladosVentas = datosUsuarios.filter(
      (usuario) => usuario.departamento === "Ventas"
    );
    let numeroResultadosVentas = empladosVentas.length;
    contadorVentas.textContent = numeroResultadosVentas;

    function mostrarUsuariosVentas() {
      listaUsuariosVentas.innerHTML = "";

      empladosVentas.forEach((usuario, index) => {
        const li = document.createElement("li");
        li.textContent = ` Nombre: ${usuario.nombre} ${usuario.apellidos} Correo: ${usuario.correo}`;
        listaUsuariosVentas.appendChild(li);
        li.classList.add("list-group-item");
      });
    }
    mostrarUsuariosVentas();
    /* Marketing*/
    const empladosMarketing = datosUsuarios.filter(
      (usuario) => usuario.departamento === "Marketing"
    );
    let numeroResultadosMarketing = empladosMarketing.length;
    contadorMarketing.textContent = numeroResultadosMarketing;

    function mostrarUsuariosMarketing() {
      listaUsuariosMarketing.innerHTML = "";

      empladosMarketing.forEach((usuario, index) => {
        const li = document.createElement("li");
        li.textContent = ` Nombre: ${usuario.nombre} ${usuario.apellidos} Correo: ${usuario.correo}`;
        listaUsuariosMarketing.appendChild(li);
        li.classList.add("list-group-item");
      });
    }
    mostrarUsuariosMarketing();

    /* Administracion*/
    const empladosAdministracion = datosUsuarios.filter(
      (usuario) => usuario.departamento === "Administracion"
    );
    let numeroResultadosAdministracion = empladosAdministracion.length;
    contadorAdministracion.textContent = numeroResultadosAdministracion;

    function mostrarUsuariosAdministracion() {
      listaUsuariosAdministracion.innerHTML = "";

      empladosAdministracion.forEach((usuario, index) => {
        const li = document.createElement("li");
        li.textContent = ` Nombre: ${usuario.nombre} ${usuario.apellidos} Correo: ${usuario.correo}`;
        listaUsuariosAdministracion.appendChild(li);
        li.classList.add("list-group-item");
      });
    }

    mostrarUsuariosAdministracion();
  });
});
