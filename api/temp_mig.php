<?php
$pdo = new PDO('mysql:host=localhost;dbname=mathquest_db', 'root', '');
$sql = file_get_contents('c:/xampp/htdocs/software-educativo-matematicas/sql/migration_settings.sql');
$pdo->exec($sql);
echo 'Migration successful';
?>
