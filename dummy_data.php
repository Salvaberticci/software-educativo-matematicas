<?php
require_once 'includes/db.php';
try {
    // Check if children exist
    $stmt = $pdo->query("SELECT id FROM children");
    $children = $stmt->fetchAll(PDO::FETCH_COLUMN);

    if (empty($children)) {
        echo "No children found.\n";
        exit;
    }

    // Insert dummy game sessions for the last 7 days
    foreach ($children as $child_id) {
        $levels = [1, 2, 3];
        for ($i = 0; $i < 7; $i++) {
            // Random amount of sessions per day (1 to 3)
            $num_sessions = rand(1, 3);
            for ($j = 0; $j < $num_sessions; $j++) {
                $level_id = $levels[array_rand($levels)];
                $score_total = 10;
                // Trending upwards as days get closer to today
                $base_score = 4 + ($i * 0.5);
                $score_correct = rand(round(min($base_score, 8)), 10);
                $time_sec = rand(30, 120);

                // Past dates
                $date = date('Y-m-d H:i:s', strtotime('-' . (6 - $i) . ' days'));

                $stmt = $pdo->prepare("INSERT INTO game_sessions (child_id, level_id, score_correct, score_total, time_sec, timestamp) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt->execute([$child_id, $level_id, $score_correct, $score_total, $time_sec, $date]);
            }
        }
    }
    echo "Dummy data inserted successfully.\n";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>