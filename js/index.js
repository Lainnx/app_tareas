// Capturar el objeto formulario
const formLogin = document.forms["formLogin"] || "No";

if (formLogin != "No") {
  formLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById("errorUsuario").textContent = "";
    document.getElementById("errorPassword").textContent = "";

    let nombre = formLogin["nombre"].value.trim();
    // Pendiente: Corregir el nombre
    let password = formLogin["password"].value.trim();

    const mensajeError = "Contenido requerido";
    if (nombre === "" && password === "") {
      document.getElementById("errorUsuario").textContent = mensajeError;
      document.getElementById("errorPassword").textContent = mensajeError;
      return;
    }
    if (nombre === "") {
      document.getElementById("errorUsuario").textContent = mensajeError;
      return;
    }
    if (password === "") {
      document.getElementById("errorPassword").textContent = mensajeError;
      return;
    }

    // Comprobación por REGEX
    // Enviar datos a acceso.php
    const datos = new URLSearchParams();
    datos.append("nombre", nombre);
    datos.append("password", password);

    fetch("../controlador/login.php", {
      method: "POST",
      body: datos.toString(),
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    })
      .then((respuesta) => respuesta.text())
      .then((data) => {
        console.log(data);

        if (data == "UsuarioInexistente" || data == "PasswordIncorrecto") {
          document.getElementById("errorPassword").textContent =
            "Usuario o contraseña incorrectos";
          return;
        }

        // alert(`Usuario ${nombre} creado c {orrectamente`)
        window.location.href = "../colores.php";
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  });
}

// Capturar el objeto formulario
const formNewUser = document.forms["formNewUser"] || "No";

if (formNewUser != "No") {
  formNewUser.addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById("errorUsuario").textContent = "";
    document.getElementById("errorPassword").textContent = "";
    document.getElementById("errorEmail").textContent = "";

    let nombre = formNewUser["nombre"].value.trim();
    // Pendiente: Corregir el nombre
    let password = formNewUser["password"].value.trim();
    let password2 = formNewUser["password2"].value.trim();
    let idioma = formNewUser["idioma"].value;
    let email = formNewUser["email"].value.trim();

    // console.log(nombre, password, password2, idioma, email);

    const mensajeError = "Contenido requerido";
    if (nombre === "" && password === "" && password2 === "" && email === "") {
      document.getElementById("errorUsuario").textContent = mensajeError;
      document.getElementById("errorPassword").textContent = mensajeError;
      document.getElementById("errorEmail").textContent = mensajeError;
      return;
    }
    if (nombre === "") {
      document.getElementById("errorUsuario").textContent = mensajeError;
      return;
    }
    if (password === "" || password2 === "") {
      document.getElementById("errorPassword").textContent = mensajeError;
      return;
    }
    if (email === "") {
      document.getElementById("errorEmail").textContent = mensajeError;
      return;
    }

    // Si las dos contraseñas no coinciden
    if (password !== password2) {
      document.getElementById("errorPassword").textContent =
        "Las contraseñas no coinciden";
      return;
    }

    // Comprobación por REGEX

    // Enviar datos a acceso.php
    const datos = new URLSearchParams();
    datos.append("nombre", nombre);
    datos.append("password", password);
    datos.append("password2", password2);
    datos.append("email", email);
    datos.append("idioma", idioma);

    fetch("../controlador/acceso.php", {
      method: "POST",
      body: datos.toString(),
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    })
      .then((respuesta) => respuesta.text())
      .then((data) => {
        console.log(data);
        // alert(`Usuario ${nombre} creado correctamente`)
        window.location.href = "../email.php";
      })
      .catch((error) => {
        console.log("Error: ", error);
      });// Acaba el fetch
      
  }); // acaba el AddEventlistener
} // acaba el if

// Capturar el objeto formulario
const formReset = document.forms["formReset"] || "No";

if (formReset != "No") {
  formReset.addEventListener("submit", (event) => {
    event.preventDefault();

     document.querySelector('#errorEmail').textContent = ""

  // Obtener el valor dentro del input
    let email = formReset["email"].value.trim();

  // Construimos el objeto para enviar al php
    const datos = new URLSearchParams();
    datos.append("email", email);

  // Envíamos la información a
    fetch("../controlador/comprobar-email.php", {
      method: "POST",
      body: datos.toString(),
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    })
      .then((respuesta) => respuesta.text())
      .then((data) => {
        console.log(data);

        if (data == "error_1") {
          document.querySelector('#errorEmail').textContent = "Error : email no registrado"   
             }
        // alert(`Email:  ${data} creado correctamente`)
        // window.location.href = "../email.php";
        // window.location.href = "index.php?formulario=reset&error=1";
      })
      .catch((error) => {
        console.log("Error: ", error);
      });

    
  });
}

// Capturar el objeto formulario
const formRestablecer = document.forms["formRestablecer"] || "No";

if (formRestablecer != "No") {
  formRestablecer.addEventListener("submit", (event) => {
    event.preventDefault();

    alert("Aqui")
    document.getElementById("errorPassword").textContent = "";
  
    let password1 = formRestablecer["password1"].value.trim();
    let password2 = formRestablecer["password2"].value.trim();

    const mensajeError = "Contenido requerido";
    if (password1 === "" && password2 === "") {
      document.getElementById("errorPassword").textContent = mensajeError;
      return;
    }

    if (password1 === "" || password2 === "") {
      document.getElementById("errorPassword").textContent = mensajeError;
      return;
    }

    // Si las dos contraseñas no coinciden
    if (password1 !== password2) {
      document.getElementById("errorPassword").textContent =
        "Las contraseñas no coinciden";
      return;
    }

    // Comprobación por REGEX

    // Enviar datos a acceso.php
    const datos = new URLSearchParams();
    datos.append("password", password1);

    fetch("../controlador/nueva-pass.php", {
      method: "POST",
      body: datos.toString(),
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    })
      .then((respuesta) => respuesta.text())
      .then((data) => {
        console.log(data);
        // alert(`Usuario ${nombre} creado correctamente`)
        // window.location.href = "../index.php";
      })
      .catch((error) => {
        console.log("Error: ", error);
      });// Acaba el fetch
      
  }); // acaba el AddEventlistener
} // acaba el if