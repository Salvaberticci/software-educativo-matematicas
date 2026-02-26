<?php
// api/add_child.php
require_once '../includes/functions.php';

check_auth();

$name = $_POST['name'] ?? '';
$grade = (int)($_POST['grade'] ?? 1);
$avatar_id = (int)($_POST['avatar_id'] ?? 1);

if (empty($name)) {
    send_json(['error' => 'El nombre es requerido'], 400);
}

try {
    $stmt = $pdo->prepare("INSERT INTO children (user_id_parent, name, grade, avatar_id) VALUES (?, ?, ?, ?)");
    $stmt->execute([$_SESSION['user_id'], $name, $grade, $avatar_id]);
    
    $child_id = $pdo->lastInsertId();
    
    log_action('child_profile_created', "Nuevo perfil creado: {$name} (Grado: {$grade})", $_SESSION['user_id']);

    // Fetch the updated list of children
    $stmt = $pdo->prepare("SELECT id, name, grade, avatar_id, coins, current_level FROM children WHERE user_id_parent = ?");
    $stmt->execute([$_SESSION['user_id']]);
    $children = $stmt->fetchAll();

    send_json([
        'success' => true,
        'message' => "¡Perfil de {$name} creado con éxito!",
        'children' => $children
    ]);

} catch (Exception $e) {
    send_json(['error' => 'Error al crear el perfil: ' . $e->getMessage()], 500);
}
?>
