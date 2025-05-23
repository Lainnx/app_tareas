<?php

// Datos de acceso a la Base de Datos
// $host = "localhost";
$host = "127.0.0.1";
$database = "tareas";
$port = 3307;
$user = "root";
$password = "root";


try {
    $conn = new PDO ("mysql:host=$host;port=$port;dbname=$database;", $user, $password );
    echo "Conectados !!";

    // Demo de la coneión exitosa
    // foreach ($conn -> query("SELECT * FROM usuarios") as $fila) {
    //     echo "<pre>";
    //     print_r ($fila);
    //     echo "</pre>";
    // }

} catch (PDOException $e) {
    echo $e->getMessage();
}

