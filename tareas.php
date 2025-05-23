<?php

error_reporting(0);
session_start(); // -> $_SESSION
$_SESSION['token'] = bin2hex(random_bytes(64));
// print_r($_SESSION);
if (!isset($_SESSION['id_usuario'])) {
    header('location: index.php');
}


// include 'connection.php';
// require 'connection.php';
// include_once 'connection.php';

// Llamar a la conexión una vez
require_once 'controlador/connection.php';

// 1. Definir la sentencia (query)
$select = "SELECT * FROM tareas WHERE id_usuario = ?;";
// 2. Preparación
$select_pre = $conn->prepare($select);
// 3. Ejecución
$select_pre->execute(array($_SESSION['id_usuario']));
// 4. Obtención de los valores
$array_filas = $select_pre->fetchAll();

// foreach ($array_filas as $fila) {
//     echo "<pre>";
//     print_r ($fila);
//     echo "</pre>";
// }

function backgroundColor($fila){
    $color = "blue";

    if($fila["estado"] === "COMPLETADA"){
        $color = "green";
    }elseif($fila["estado"]==="EN PROCESO"){
        $color = "yellow";
    }elseif($fila["estado"]==="PENDIENTE"){
        $color = "red";
    }
    return $color;
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
<?php include_once 'modulos/meta.php';?>
    <title>Colores</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
<?php include_once 'modulos/header.php';?>
    <main>
        <section>
            <h2>Tareas</h2>

            <?php foreach ($array_filas as $fila) : ?>
                
                <div style="background-color: <?php backgroundColor($fila); ?>color:'black';">
                    <p> <?= htmlspecialchars($fila['usuario'], ENT_QUOTES, "UTF-8")   ?> </p>
                    <span class="icons">
                        <a href="tareas.php?id=<?= $fila['id_tarea'] ?>&usuario=<?= $fila['nombre'] ?>&estado=<?= $fila['estado'] ?>" title="Modificar valores">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a>
                        <form action="delete.php" method="POST">
                            <input type="hidden" name="quitar" id="quitar" value="<?= $fila['id_tarea'] ?>">
                        <button title="Eliminar tarea"> <i class="fa-solid fa-trash-can"></i></button>
                        </form>
                        <!-- <a href="delete.php?id=" title="Eliminar elemento"> -->
                           
                        </a>

                    </span>
                </div>

            <?php endforeach ?>
        </section>
        <section >

            <?php if ($_GET) : ?>
                <!-- Formulario para actualizar los datos -->
                <h2>Modifica tus datos</h2>
                <form action="update.php" method="post" class="formTareas">
                    <input type="hidden" name="id_color" value="<?= $_GET['id'] ?>">
                    <fieldset>
                        <div>
                            <label for="usuario">Nombre del usuario</label>
                            <input type="text" id="usuario" name="usuario" value="<?= $_GET['usuario'] ?>" maxlength="50">
                        </div>
                        <div>
                            <label for="estado">Nombre del color:</label>
                            <input type="radio" id="estado" name="estado" value="<?= $_GET['estado'] ?>" maxlength="10">
                        </div>
                        <div>
                            <button type="submit">Enviar datos</button>
                            <button type="reset">Borrar formulario</button> 
                        </div>
                    </fieldset>

                </form>
<!-- 44444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444 -->
            <?php else : ?>
                <!-- Formulario para insertar los datos -->

                <h2>Pon aquí tus datos</h2>
                <!-- Linea comentada para que los datos no vayan directamente a insert.php  -->
                <!-- <form action="insert.php" method="post"> -->
                    <form name="formInsert" class="formColores">
<input type="hidden" name="id_usuario" value="<?= $_SESSION['id_usuario'] ?>">
                    <input type="hidden" name="token" value="<?= $_SESSION['token'] ?>">
                    
                    <input type="text" name="web" style="display:none">
                    <fieldset>
                        <div>
                            <label for="usuario">Nombre del usuario</label>
                            <input type="text" id="usuario" name="usuario">
                            <p id="errorUsuario"></p>
                        </div>
                        <div>
                            <label for="color">Nombre del color:</label>
                            <input type="text" id="color" name="color">
                            <p id="errorColor"></p>
                        </div>
                        <div>
                            <button type="submit">Enviar datos</button>
                            <button type="reset">Limpiar formulario</button>
                        </div>
                    </fieldset>

                </form>

            <?php endif ?>



                <?php if ($_SESSION['error']) : ?>
                    <p>Se ha producido un error</p>
                <?php endif; ?>

        </section>
    </main>

    <script src="js/colores.js"></script>
</body>

</html>
<?php
$_SESSION['error'] = false;