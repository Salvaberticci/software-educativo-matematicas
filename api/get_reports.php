<?php
// api/get_reports.php
require_once '../includes/functions.php';

check_auth();

$child_id = (int)($_GET['child_id'] ?? 0);

// Admin can see everything, Parent can only see their children's logs
if ($_SESSION['role'] === 'parent') {
    // Audit logs for the parent's account actions
    $stmt = $pdo->prepare("SELECT action_type, details, timestamp FROM audit_logs WHERE user_id = ? ORDER BY timestamp DESC LIMIT 20");
    $stmt->execute([$_SESSION['user_id']]);
    $logs = $stmt->fetchAll();

    // Stats for specific child
    if ($child_id > 0) {
        // Verify child belongs to parent
        $stmt = $pdo->prepare("SELECT id FROM children WHERE id = ? AND user_id_parent = ?");
        $stmt->execute([$child_id, $_SESSION['user_id']]);
        if (!$stmt->fetch()) {
            send_json(['error' => 'No autorizado'], 403);
        }

        // Sessions stats
        $stmt = $pdo->prepare("SELECT 
            COALESCE(AVG(score_correct/score_total), 0) as avg_score, 
            COALESCE(AVG(time_sec), 0) as avg_time,
            COALESCE(SUM(score_correct), 0) as total_hits,
            COALESCE(SUM(score_total - score_correct), 0) as total_errors
            FROM game_sessions WHERE child_id = ?");
        $stmt->execute([$child_id]);
        $stats = $stmt->fetch();

        // Get current coins for the child to sync frontend
        $stmt = $pdo->prepare("SELECT coins FROM children WHERE id = ?");
        $stmt->execute([$child_id]);
        $child_info = $stmt->fetch();
        if ($child_info) {
            $stats['current_coins'] = $child_info['coins'];
        }

        // Weekly history
        $stmt = $pdo->prepare("SELECT DATE(timestamp) as date, AVG(score_correct) as avg_correct 
                               FROM game_sessions WHERE child_id = ? 
                               GROUP BY DATE(timestamp) ORDER BY date ASC LIMIT 7");
        $stmt->execute([$child_id]);
        $history = $stmt->fetchAll();

        // New Detailed Diagnostics (Hits/Errors per Level)
        $stmt = $pdo->prepare("SELECT 
            level_id,
            SUM(score_correct) as total_hits,
            SUM(score_total - score_correct) as total_errors,
            COUNT(*) as sessions_count
            FROM game_sessions
            WHERE child_id = ?
            GROUP BY level_id
            ORDER BY level_id ASC");
        $stmt->execute([$child_id]);
        $diagnostics = $stmt->fetchAll();

        send_json([
            'logs' => $logs,
            'stats' => $stats,
            'history' => $history,
            'diagnostics' => $diagnostics
        ]);
    } else {
        send_json(['logs' => $logs]);
    }
} elseif ($_SESSION['role'] === 'admin') {
    // Admin gets all logs and a list of all children
    $stmt = $pdo->query("SELECT al.action_type, al.details, al.timestamp, u.email 
                         FROM audit_logs al 
                         LEFT JOIN users u ON al.user_id = u.id 
                         ORDER BY al.timestamp DESC LIMIT 50");
    $logs = $stmt->fetchAll();

    $stmt = $pdo->query("SELECT id, name FROM children");
    $children = $stmt->fetchAll();

    send_json([
        'logs' => $logs,
        'children' => $children
    ]);
}
?>
