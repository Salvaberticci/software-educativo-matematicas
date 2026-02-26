<?php
// api/setup_theme_system.php
require_once '../includes/db.php';

try {
    echo "<h1>Configurando Sistema de Temas...</h1>";

    // 1. Add columns to 'rewards' table if they don't exist
    try {
        $pdo->exec("ALTER TABLE rewards ADD COLUMN theme_class VARCHAR(50) DEFAULT NULL");
        echo "<p>✅ Columna 'theme_class' añadida a 'rewards'.</p>";
    } catch (PDOException $e) { /* Column likely exists */ }

    try {
        $pdo->exec("ALTER TABLE rewards ADD COLUMN bgm_file VARCHAR(50) DEFAULT NULL");
        echo "<p>✅ Columna 'bgm_file' añadida a 'rewards'.</p>";
    } catch (PDOException $e) { /* Column likely exists */ }

    // 2. Add 'equipped_reward_id' to 'children' table
    try {
        $pdo->exec("ALTER TABLE children ADD COLUMN equipped_reward_id INT DEFAULT NULL");
        $pdo->exec("ALTER TABLE children ADD CONSTRAINT fk_equipped_reward FOREIGN KEY (equipped_reward_id) REFERENCES rewards(id) ON DELETE SET NULL");
        echo "<p>✅ Columna 'equipped_reward_id' añadida a 'children'.</p>";
    } catch (PDOException $e) { /* Column likely exists */ }

    // 3. Update existing rewards with Theme Data
    $updates = [
        'Súper Héroe' => ['theme_class' => 'theme-hero', 'bgm_file' => 'hero.mp3'],
        'Astronauta' => ['theme_class' => 'theme-space', 'bgm_file' => 'space.mp3'],
        'Fondo Espacial' => ['theme_class' => 'theme-space', 'bgm_file' => 'space.mp3'],
        'Dinosaurio' => ['theme_class' => 'theme-dino', 'bgm_file' => 'dino.mp3'],
        'Dragón Loco' => ['theme_class' => 'theme-fantasy', 'bgm_file' => 'fantasy.mp3'],
        'Corona Real' => ['theme_class' => 'theme-royal', 'bgm_file' => 'royal.mp3']
    ];

    $stmt = $pdo->prepare("UPDATE rewards SET theme_class = ?, bgm_file = ? WHERE name = ?");

    foreach ($updates as $name => $data) {
        $stmt->execute([$data['theme_class'], $data['bgm_file'], $name]);
        echo "<p>🎨 Tema actualizado para: $name</p>";
    }

    echo "<h3>¡Base de datos lista para la magia! 🪄</h3>";

} catch (PDOException $e) {
    echo "<h3 style='color:red'>Error: " . $e->getMessage() . "</h3>";
}
?>
