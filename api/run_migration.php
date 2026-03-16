<?php
// api/run_migration.php
require_once '../includes/functions.php';
check_admin();

try {
    $sql = file_get_contents('../sql/migration_settings.sql');
    $pdo->exec($sql);
    echo json_encode(['success' => true, 'message' => 'Migración aplicada con éxito']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
