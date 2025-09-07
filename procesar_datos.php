<?php
// procesar_datos.php

// Habilitar cabeceras para respuesta en JSON
header('Content-Type: application/json');

// Verificar si se recibieron datos por POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitizar los datos recibidos
    $username = isset($_POST['username']) ? trim($_POST['username']) : null;
    $password = isset($_POST['password']) ? trim($_POST['password']) : null;

    // ii) Verificación de backend
    if (empty($username) || empty($password)) {
        echo json_encode([
            "status" => "error",
            "message" => "Faltan datos obligatorios"
        ]);
        exit;
    }

    // Simulación de validación extra (ejemplo: longitud mínima)
    if (strlen($username) < 3 || strlen($password) < 6) {
        echo json_encode([
            "status" => "error",
            "message" => "Usuario o contraseña no válidos"
        ]);
        exit;
    }

    // iii) Devolver respuesta al frontend
    echo json_encode([
        "status" => "ok",
        "message" => "Datos recibidos correctamente",
        "user" => $username
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Método no permitido"
    ]);
}
