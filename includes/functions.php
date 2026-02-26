<?php
// includes/functions.php
require_once 'db.php';

session_start();

/**
 * Log an action for forensic analysis.
 */
function log_action($action_type, $details = null, $user_id = null) {
    global $pdo;
    
    // Default to logged-in user if not provided
    if ($user_id === null && isset($_SESSION['user_id'])) {
        $user_id = $_SESSION['user_id'];
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO audit_logs (user_id, action_type, details) VALUES (?, ?, ?)");
        $stmt->execute([$user_id, $action_type, $details]);
    } catch (Exception $e) {
        // Silently fail or log to error_log
        error_log("Failed to log action: " . $e->getMessage());
    }
}

/**
 * Handle JSON responses.
 */
function send_json($data, $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Check if the user is logged in.
 */
function check_auth() {
    if (!isset($_SESSION['user_id'])) {
        send_json(['error' => 'Unauthorized'], 401);
    }
}

/**
 * Check if the user is an admin.
 */
function check_admin() {
    check_auth();
    if ($_SESSION['role'] !== 'admin') {
        send_json(['error' => 'Forbidden'], 403);
    }
}
?>
