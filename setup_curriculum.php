<?php
require_once 'includes/functions.php';

// ===================================================
// FASE 14: Update levels with new curriculum
// ===================================================
// Level structure:
// 1-2: Sumas (easy/medium)
// 3-4: Restas (easy/medium)
// 5-6: Multiplicaciones (tables 1-5 / 6-10)
// 7-8: Fracciones básicas / equivalentes
// 9:   Sumas+Restas combinadas
// 10:  Gran desafío (mix all)

$levels = [
    [1, 2, 'suma',            1,  10, 7],
    [2, 2, 'suma',            10, 50, 7],
    [3, 2, 'resta',           1,  10, 7],
    [4, 3, 'resta',           10, 50, 7],
    [5, 3, 'multiplicacion',  1,  5,  7],
    [6, 4, 'multiplicacion',  5,  10, 7],
    [7, 4, 'fraccion_basica', 2,  6,  7],
    [8, 5, 'fraccion_equiv',  2,  8,  7],
    [9, 5, 'aleatorio',       10, 50, 7],
    [10,6, 'aleatorio',       10,100, 7],
];

foreach ($levels as $l) {
    $stmt = $pdo->prepare("INSERT INTO levels (id, grade, operation, min_val, max_val, target_score) VALUES (?,?,?,?,?,?) ON DUPLICATE KEY UPDATE grade=VALUES(grade), operation=VALUES(operation), min_val=VALUES(min_val), max_val=VALUES(max_val), target_score=VALUES(target_score)");
    $stmt->execute($l);
    echo "Updated level {$l[0]}: {$l[2]}\n";
}

// ===================================================
// Create test user (admin/demo) if not exists
// ===================================================
$testEmail = 'test@mathquest.demo';
$testPass  = password_hash('demo1234', PASSWORD_DEFAULT);

$check = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$check->execute([$testEmail]);
$existing = $check->fetchColumn();

if (!$existing) {
    $stmt = $pdo->prepare("INSERT INTO users (email, password_hash) VALUES (?, ?)");
    $stmt->execute([$testEmail, $testPass]);
    $userId = $pdo->lastInsertId();

    // Create demo child with access to all levels (current_level = 11 means all unlocked)
    $stmt = $pdo->prepare("INSERT INTO children (user_id_parent, name, grade, avatar_id, current_level, coins) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$userId, 'Demo Explorer', 6, 1, 11, 9999]);
    echo "Created test user: test@mathquest.demo / demo1234\n";
    echo "Demo child 'Demo Explorer' with all 10 levels unlocked and 9999 coins.\n";
} else {
    // Update existing to have all levels unlocked
    $stmt = $pdo->prepare("UPDATE children SET current_level = 11, coins = 9999 WHERE user_id = ?");
    $stmt->execute([$existing]);
    echo "Updated existing test user to have all levels unlocked.\n";
}

echo "Done.\n";
?>
