<?php
// api/buy_reward.php
require_once '../includes/functions.php';

check_auth();

$child_id = (int)($_POST['child_id'] ?? 0);
$reward_id = (int)($_POST['reward_id'] ?? 0);

if ($child_id <= 0 || $reward_id <= 0) {
    send_json(['error' => 'Datos inválidos'], 400);
}

try {
    $pdo->beginTransaction();

    // 1. Check Reward Cost
    $stmt = $pdo->prepare("SELECT * FROM rewards WHERE id = ?");
    $stmt->execute([$reward_id]);
    $reward = $stmt->fetch();
    
    if (!$reward) {
        throw new Exception('Recompensa no encontrada');
    }

    // 2. Check Child Coins
    $stmt = $pdo->prepare("SELECT coins FROM children WHERE id = ?");
    $stmt->execute([$child_id]);
    $child = $stmt->fetch();

    if ($child['coins'] < $reward['cost']) {
        throw new Exception('Monedas insuficientes');
    }

    // 3. Subtract Coins
    $stmt = $pdo->prepare("UPDATE children SET coins = coins - ? WHERE id = ?");
    $stmt->execute([$reward['cost'], $child_id]);

    // 4. Add to Inventory
    $stmt = $pdo->prepare("INSERT INTO child_inventory (child_id, reward_id) VALUES (?, ?)");
    $stmt->execute([$child_id, $reward_id]);

    log_action('reward_purchased', "Niño ID: {$child_id} compró Reward ID: {$reward_id} ({$reward['name']})");

    $pdo->commit();

    send_json([
        'success' => true,
        'new_balance' => $child['coins'] - $reward['cost']
    ]);

} catch (Exception $e) {
    $pdo->rollBack();
    send_json(['error' => $e->getMessage()], 400);
}
?>
