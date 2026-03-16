<?php
// api/equip_reward.php
require_once '../includes/db.php';
require_once '../includes/functions.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['error' => 'Método no permitido'], 405);
}

// 1. Validate Input
$child_id = isset($_POST['child_id']) ? intval($_POST['child_id']) : 0;
$reward_id = isset($_POST['reward_id']) ? intval($_POST['reward_id']) : 0;

if ($child_id <= 0) {
    send_json(['error' => 'Datos inválidos'], 400);
}

try {
    if ($reward_id === 0) {
        // UNEQUIP LOGIC
        $update = $pdo->prepare("UPDATE children SET equipped_reward_id = NULL WHERE id = ?");
        $update->execute([$child_id]);
        
        send_json([
            'success' => true,
            'message' => '¡Estilo por defecto restaurado!',
            'theme' => [
                'icon' => null,
                'theme_class' => null,
                'bgm_file' => null
            ]
        ]);
    }

    // 2. Security Check: Does the child actually OWN this item?
    $check = $pdo->prepare("SELECT id FROM child_inventory WHERE child_id = ? AND reward_id = ?");
    $check->execute([$child_id, $reward_id]);
    
    if (!$check->fetch()) {
        send_json(['error' => '¡No tienes este premio! Debes comprarlo primero.'], 403);
    }

    // 3. Update the Child's equipped item
    $update = $pdo->prepare("UPDATE children SET equipped_reward_id = ? WHERE id = ?");
    $update->execute([$reward_id, $child_id]);

    // 4. Fetch the new Theme Data to return immediately
    $stmt = $pdo->prepare("SELECT icon, theme_class, bgm_file FROM rewards WHERE id = ?");
    $stmt->execute([$reward_id]);
    $theme = $stmt->fetch(PDO::FETCH_ASSOC);

    send_json([
        'success' => true, 
        'message' => '¡Avatar equipado!',
        'theme' => $theme
    ]);

} catch (Exception $e) {
    log_action($child_id, 'equip_error', $e->getMessage());
    send_json(['error' => 'Error al equipar el item'], 500);
}
?>
