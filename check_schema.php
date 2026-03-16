<?php
require_once 'includes/functions.php';
$stmt = $pdo->query("DESCRIBE levels");
print_r($stmt->fetchAll(PDO::FETCH_ASSOC));
?>
