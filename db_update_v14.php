<?php
require_once 'includes/functions.php';

try {
    // 1. Add total_questions column to levels
    try {
        $pdo->exec("ALTER TABLE levels ADD COLUMN total_questions INT DEFAULT 10");
        echo "Column 'total_questions' added to 'levels'.\n";
    } catch (PDOException $e) {
        if ($e->getCode() == '42S21') { // Column already exists
            echo "Column 'total_questions' already exists.\n";
        } else {
            throw $e;
        }
    }

    // 2. Define the new curriculum
    // Levels: 1-4 (Suma/Resta), 5-6 (Mult), 7-8 (Fractions), 9 (Mix), 10 (Final)
    $curriculum = [
        [1,  2, 'suma',            1,  10,  7, 10],
        [2,  2, 'suma',            10, 50,  7, 10],
        [3,  2, 'resta',           1,  10,  7, 10],
        [4,  3, 'resta',           10, 50,  7, 10],
        [5,  3, 'multiplicacion',  1,  5,   7, 10],
        [6,  4, 'multiplicacion',  6,  10,  7, 10],
        [7,  4, 'fraccion_basica', 2,  6,   7, 10],
        [8,  5, 'fraccion_equiv',  2,  8,   7, 10],
        [9,  5, 'aleatorio',       1,  50,  7, 10],
        [10, 6, 'aleatorio',       1,  100, 14, 20], // 20 questions for level 10
    ];

    $stmt = $pdo->prepare("REPLACE INTO levels (id, grade, operation, min_val, max_val, target_score, total_questions) VALUES (?,?,?,?,?,?,?)");
    foreach ($curriculum as $level) {
        $stmt->execute($level);
        echo "Level {$level[0]} updated ({$level[2]}).\n";
    }

    // 3. Create/Update test user
    $testEmail = 'test@mathquest.demo';
    $passwordHash = password_hash('demo1234', PASSWORD_DEFAULT);
    
    // Check if user exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$testEmail]);
    $userId = $stmt->fetchColumn();

    if (!$userId) {
        $stmt = $pdo->prepare("INSERT INTO users (email, password_hash, role) VALUES (?, ?, 'user')");
        $stmt->execute([$testEmail, $passwordHash]);
        $userId = $pdo->lastInsertId();
        echo "Created test user: $testEmail / demo1234\n";
    } else {
        $stmt = $pdo->prepare("UPDATE users SET password_hash = ? WHERE id = ?");
        $stmt->execute([$passwordHash, $userId]);
        echo "Updated password for test user.\n";
    }

    // 4. Create/Update child profile for test user
    $stmt = $pdo->prepare("SELECT id FROM children WHERE user_id_parent = ? AND name = 'Demo Explorer'");
    $stmt->execute([$userId]);
    $childId = $stmt->fetchColumn();

    if (!$childId) {
        $stmt = $pdo->prepare("INSERT INTO children (user_id_parent, name, grade, avatar_id, current_level, coins) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$userId, 'Demo Explorer', 6, 1, 11, 9999]);
        echo "Created child profile 'Demo Explorer' with level 11 and 9999 coins.\n";
    } else {
        $stmt = $pdo->prepare("UPDATE children SET current_level = 11, coins = 9999 WHERE id = ?");
        $stmt->execute([$childId]);
        echo "Updated child profile 'Demo Explorer'.\n";
    }

    echo "Database setup complete.\n";

} catch (Exception $e) {
    die("Error: " . $e->getMessage());
}
?>
