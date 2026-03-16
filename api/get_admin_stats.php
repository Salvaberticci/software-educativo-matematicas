<?php
// api/get_admin_stats.php
require_once '../includes/functions.php';

check_auth();

// Strictly check for admin role
if ($_SESSION['role'] !== 'admin') {
    send_json(['error' => 'Acceso denegado. Se requiere rol de administrador.'], 403);
}

try {
    // 1. General Totals
    $total_users = $pdo->query("SELECT COUNT(*) FROM users WHERE role = 'parent'")->fetchColumn();
    $total_children = $pdo->query("SELECT COUNT(*) FROM children")->fetchColumn();
    $total_sessions = $pdo->query("SELECT COUNT(*) FROM game_sessions")->fetchColumn();
    
    // 2. Global Performance
    $stmt = $pdo->query("SELECT 
        COALESCE(SUM(score_correct), 0) as hits, 
        COALESCE(SUM(score_total - score_correct), 0) as errors,
        COALESCE(AVG(time_sec), 0) as avg_time
        FROM game_sessions");
    $global_stats = $stmt->fetch();

    // 3. Level Distribution (How many children per level)
    $stmt = $pdo->query("SELECT current_level, COUNT(*) as count FROM children GROUP BY current_level ORDER BY current_level ASC");
    $level_dist = $stmt->fetchAll();

    // 4. User List (Parents and their children count)
    $stmt = $pdo->query("SELECT u.id, u.email, u.created_at, COUNT(c.id) as children_count 
                         FROM users u 
                         LEFT JOIN children c ON u.id = c.user_id_parent 
                         WHERE u.role = 'parent'
                         GROUP BY u.id 
                         ORDER BY u.created_at DESC LIMIT 50");
    $users_list = $stmt->fetchAll();

    // 5. Recent Activity (Master Audit)
    $stmt = $pdo->query("SELECT al.*, u.email 
                         FROM audit_logs al 
                         LEFT JOIN users u ON al.user_id = u.id 
                         ORDER BY al.timestamp DESC LIMIT 30");
    $master_logs = $stmt->fetchAll();

    send_json([
        'success' => true,
        'totals' => [
            'users' => $total_users,
            'children' => $total_children,
            'sessions' => $total_sessions
        ],
        'performance' => $global_stats,
        'level_distribution' => $level_dist,
        'users' => $users_list,
        'logs' => $master_logs
    ]);

} catch (Exception $e) {
    send_json(['error' => 'Error al obtener estadísticas: ' . $e->getMessage()], 500);
}
