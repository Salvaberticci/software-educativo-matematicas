<?php
// api/fix_rewards_encoding.php
require_once '../includes/db.php';

// Force UTF-8 connection explicitly (just in case)
$pdo->exec("SET NAMES 'utf8mb4'");
$pdo->exec("SET CHARACTER SET utf8mb4");

try {
    echo "<h1>Reparando Iconos de la Tienda de Premios...</h1>";

    // 1. Clear existing rewards to avoid duplicates (disable FK checks temporarily)
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 0");
    $pdo->exec("TRUNCATE TABLE rewards");
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 1");
    echo "<p>✅ Tabla 'rewards' limpiada.</p>";

    // 2. Insert Data with explicit emojis
    $items = [
        ['Súper Héroe', 50, '🦸‍♂️'],
        ['Astronauta', 100, '👨‍🚀'],
        ['Dinosaurio', 150, '🦖'],
        ['Dragón Loco', 200, '🐉'],
        ['Fondo Espacial', 300, '🌌'],
        ['Corona Real', 500, '👑']
    ];

    $stmt = $pdo->prepare("INSERT INTO rewards (name, cost, icon) VALUES (?, ?, ?)");
    
    foreach ($items as $item) {
        $stmt->execute($item);
        echo "<p>✅ Insertado: {$item[0]} ({$item[2]})</p>";
    }

    echo "<h3>¡Listo! La base de datos ahora tiene los iconos correctos.</h3>";
    echo "<p><a href='../index.html'>Volver al Juego</a></p>";

} catch (Exception $e) {
    echo "<h3 style='color:red'>Error: " . $e->getMessage() . "</h3>";
}
?>
