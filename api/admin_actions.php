<?php
// api/admin_actions.php
require_once '../includes/functions.php';
check_admin();

$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($action === 'create_user') {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
        
        if (empty($email) || empty($password)) {
            send_json(['success' => false, 'error' => 'Email y contraseña son requeridos']);
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            send_json(['success' => false, 'error' => 'Email inválido']);
        }

        try {
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            if ($stmt->fetch()) {
                send_json(['success' => false, 'error' => 'El correo electrónico ya está registrado']);
            }

            $password_hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO users (email, password_hash) VALUES (?, ?)");
            $stmt->execute([$email, $password_hash]);

            log_action('admin_create_user', "Admin creó al usuario: $email");
            send_json(['success' => true, 'message' => "Usuario $email creado con éxito"]);

        } catch (Exception $e) {
            send_json(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    if ($action === 'delete_user') {
        $user_id = $_POST['user_id'] ?? null;
        if (!$user_id) send_json(['success' => false, 'error' => 'ID de usuario requerido']);

        try {
            // Check if we are trying to delete ourselves or an admin (optional security)
            $stmt = $pdo->prepare("SELECT email, role FROM users WHERE id = ?");
            $stmt->execute([$user_id]);
            $user = $stmt->fetch();

            if (!$user) send_json(['success' => false, 'error' => 'Usuario no encontrado']);
            if ($user['role'] === 'admin') send_json(['success' => false, 'error' => 'No puedes eliminar a un administrador']);

            $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
            $stmt->execute([$user_id]);

            log_action('admin_delete_user', "Admin eliminó al usuario: " . $user['email']);
            send_json(['success' => true, 'message' => "Usuario eliminado"]);

        } catch (Exception $e) {
            send_json(['success' => false, 'error' => $e->getMessage()]);
        }
    }
}
?>
