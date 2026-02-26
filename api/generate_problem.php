<?php
// api/generate_problem.php
require_once '../includes/functions.php';

check_auth();

$level_id = (int)($_GET['level_id'] ?? 0);

if ($level_id <= 0) {
    send_json(['error' => 'Level ID inválido'], 400);
}

$stmt = $pdo->prepare("SELECT * FROM levels WHERE id = ?");
$stmt->execute([$level_id]);
$level = $stmt->fetch();

if (!$level) {
    send_json(['error' => 'Nivel no encontrado'], 404);
}

$n1 = rand($level['min_val'], $level['max_val']);
$n2 = rand($level['min_val'], $level['max_val']);
$operator = '+';
$answer = 0;

switch ($level['operation']) {
    case 'suma':
        $operator = '+';
        $answer = $n1 + $n2;
        break;
    case 'resta':
        // Ensure positive result for subtraction
        if ($n1 < $n2) {
            $temp = $n1;
            $n1 = $n2;
            $n2 = $temp;
        }
        $operator = '-';
        $answer = $n1 - $n2;
        break;
    case 'multiplicacion':
        $operator = '×';
        $answer = $n1 * $n2;
        break;
}

send_json([
    'n1' => $n1,
    'n2' => $n2,
    'operator' => $operator,
    'answer' => $answer
]);
?>
