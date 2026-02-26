<?php
// api/auth.php
require_once '../includes/functions.php';

$action = $_GET['action'] ?? 'login';

if ($action === 'login') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($email) || empty($password)) {
        send_json(['error' => 'Email y contraseña son requeridos'], 400);
    }

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];
        $_SESSION['email'] = $user['email'];

        log_action('login_success', "Usuario logueado: {$email}");

        // Fetch children with Equipped Theme Data
        $sql = "SELECT c.*, r.icon as theme_icon, r.theme_class, r.bgm_file 
                FROM children c 
                LEFT JOIN rewards r ON c.equipped_reward_id = r.id 
                WHERE c.user_id_parent = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$user['id']]);
        $children = $stmt->fetchAll(PDO::FETCH_ASSOC);

        send_json([
            'success' => true,
            'user' => [
                'email' => $user['email'],
                'role' => $user['role']
            ],
            'children' => $children
        ]);
    } else {
        log_action('login_failed', "Intento fallido para: {$email}");
        send_json(['error' => 'Credenciales inválidas'], 401);
    }
}

if ($action === 'register') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($email) || empty($password)) {
        send_json(['error' => 'Email y contraseña son requeridos'], 400);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        send_json(['error' => 'Email no válido'], 400);
    }

    // Check if user exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        send_json(['error' => 'El correo ya está registrado'], 400);
    }

    try {
        $pdo->beginTransaction();

        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (email, password_hash, role) VALUES (?, ?, 'parent')");
        $stmt->execute([$email, $hash]);
        $user_id = $pdo->lastInsertId();

        // Create a default child profile for the new parent so they can start playing immediately
        $stmt = $pdo->prepare("INSERT INTO children (user_id_parent, name, grade) VALUES (?, 'Explorador', 1)");
        $stmt->execute([$user_id]);

        log_action('user_registered', "Nuevo usuario registrado: {$email}", $user_id);

        $pdo->commit();

        send_json(['success' => true, 'message' => 'Registro exitoso. ¡Ahora puedes iniciar sesión!']);
    } catch (Exception $e) {
        $pdo->rollBack();
        send_json(['error' => 'Error al registrar: ' . $e->getMessage()], 500);
    }
}

if ($action === 'check') {
    if (isset($_SESSION['user_id'])) {
        // Fetch children
        // Fetch children with Equipped Theme Data
        $sql = "SELECT c.*, r.icon as theme_icon, r.theme_class, r.bgm_file 
                FROM children c 
                LEFT JOIN rewards r ON c.equipped_reward_id = r.id 
                WHERE c.user_id_parent = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$_SESSION['user_id']]);
        $children = $stmt->fetchAll(PDO::FETCH_ASSOC);

        send_json([
            'success' => true,
            'user' => [
                'email' => $_SESSION['email'],
                'role' => $_SESSION['role']
            ],
            'children' => $children
        ]);
    } else {
        send_json(['success' => false, 'error' => 'No session active'], 401);
    }
}

if ($action === 'logout') {
    log_action('logout');
    session_destroy();
    send_json(['success' => true]);
}
?>
