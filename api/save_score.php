<?php
// api/save_score.php
require_once '../includes/functions.php';

check_auth();

$child_id = (int)($_POST['child_id'] ?? 0);
$level_id = (int)($_POST['level_id'] ?? 0);
$score_correct = (int)($_POST['score_correct'] ?? 0);
$score_total = (int)($_POST['score_total'] ?? 0);
$time_sec = (int)($_POST['time_sec'] ?? 0);

if ($child_id <= 0 || $level_id <= 0) {
    send_json(['error' => 'Datos inválidos'], 400);
}

try {
    // 0. Fetch Level Data
    $stmt = $pdo->prepare("SELECT target_score, total_questions FROM levels WHERE id = ?");
    $stmt->execute([$level_id]);
    $level = $stmt->fetch();

    if (!$level) {
        send_json(['error' => 'Nivel no encontrado'], 404);
    }

    $db_total = (int)$level['total_questions'];

    // Security & Anti-Cheat Validation
    if ($score_correct > $score_total) {
        send_json(['error' => 'Puntaje inválido: Aciertos > Total'], 400);
    }

    if ($score_total > $db_total) {
        send_json(['error' => 'Puntaje inválido: Total excesivo'], 400);
    }

    // Basic time validation (e.g., minimum 0.5 sec per question for the fast kids)
    if ($score_total > 0 && $time_sec < ($score_total * 0.5)) {
         log_action('cheat_attempt', "Posible trampa detectada (Speedhack). Child: $child_id, Time: $time_sec");
         send_json(['error' => '¡Demasiado rápido! Tómate tu tiempo.'], 400);
    }

    $pdo->beginTransaction();

    // 1. Save Session
    $stmt = $pdo->prepare("INSERT INTO game_sessions (child_id, level_id, score_correct, score_total, time_sec) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$child_id, $level_id, $score_correct, $score_total, $time_sec]);

    // 3. Update Coins (5 coins per correct answer)
    $coins_earned = $score_correct * 5;
    $stmt = $pdo->prepare("UPDATE children SET coins = coins + ? WHERE id = ?");
    $stmt->execute([$coins_earned, $child_id]);

    // 4. Update Level Progression if target met
    $passed = $score_correct >= ($level['target_score'] ?? 7);
    if ($passed) {
        // Simple logic: increment current_level if it matches the completed level
        $stmt = $pdo->prepare("UPDATE children SET current_level = current_level + 1 WHERE id = ? AND current_level = ?");
        $stmt->execute([$child_id, $level_id]);
    }

    log_action('game_session_saved', "Niño ID: {$child_id}, Nivel ID: {$level_id}, Aciertos: {$score_correct}");

    $pdo->commit();

    send_json([
        'success' => true,
        'coins_earned' => $coins_earned,
        'passed' => $passed
    ]);

} catch (Exception $e) {
    $pdo->rollBack();
    send_json(['error' => 'Error al guardar el progreso: ' . $e->getMessage()], 500);
}
?>
