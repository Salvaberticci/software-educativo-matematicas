<?php
// api/get_rewards.php
require_once '../includes/functions.php';

check_auth();

$child_id = isset($_GET['child_id']) ? intval($_GET['child_id']) : 0;

if ($child_id > 0) {
    // Return rewards with ownership status for a specific child
    $sql = "SELECT r.*, 
            CASE WHEN i.id IS NOT NULL THEN 1 ELSE 0 END as owned,
            CASE WHEN c.equipped_reward_id = r.id THEN 1 ELSE 0 END as equipped
            FROM rewards r 
            LEFT JOIN child_inventory i ON r.id = i.reward_id AND i.child_id = ?
            LEFT JOIN children c ON c.id = ?
            ORDER BY r.cost ASC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$child_id, $child_id]);
} else {
    // Fallback for general catalog (no specific child)
    $stmt = $pdo->query("SELECT *, 0 as owned, 0 as equipped FROM rewards ORDER BY cost ASC");
}

$rewards = $stmt->fetchAll(PDO::FETCH_ASSOC);

send_json([
    'success' => true,
    'rewards' => $rewards
]);
?>
