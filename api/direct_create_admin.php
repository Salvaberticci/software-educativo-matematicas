<?php
// api/direct_create_admin.php
require_once '../includes/functions.php';

$email = 'admin@candyquest.demo';
$password = 'admin1234';

try {
    // Check if exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        die("El usuario administrador $email ya existe.");
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (email, password_hash, role) VALUES (?, ?, 'admin')");
    $stmt->execute([$email, $hash]);
    
    echo "<h1>¡Éxito!</h1>";
    echo "<p>Usuario Administrador creado:</p>";
    echo "<ul><li><strong>Email:</strong> $email</li><li><strong>Password:</strong> $password</li></ul>";
    echo "<p><a href='../index.html'>Ir al Login</a></p>";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
