<?php
// api/set_admin.php
require_once '../includes/functions.php';

// This is a temporary utility script for the developer. 
// It promotes the current session user to 'admin'.

check_auth();

try {
    $stmt = $pdo->prepare("UPDATE users SET role = 'admin' WHERE id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    
    $_SESSION['role'] = 'admin'; // Update session immediately
    
    echo json_encode([
        'success' => true, 
        'message' => '¡Felicidades! Ahora eres Administrador. Recarga la página para ver los cambios.'
    ]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
