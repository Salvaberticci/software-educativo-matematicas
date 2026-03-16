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

// Fraction specifics
$fraction_data = null;
$foods = ['🍕', '🍰', '🧆', '🍫', '🎂', '🥧', '🍩', '🍪', '🥨', '🥐', '🌮', '🥪'];

switch ($level['operation']) {
    case 'suma':
        $operator = '+';
        $answer = $n1 + $n2;
        break;
    case 'resta':
        if ($n1 < $n2) {
            $temp = $n1; $n1 = $n2; $n2 = $temp;
        }
        $operator = '-';
        $answer = $n1 - $n2;
        break;
    case 'multiplicacion':
        $operator = '×';
        $answer = $n1 * $n2;
        break;
    case 'division':
        $divisor = rand(max(1, $level['min_val']), $level['max_val']);
        $res = rand(1, 10);
        $n1 = $divisor * $res;
        $n2 = $divisor;
        $operator = '÷';
        $answer = $res;
        break;
    case 'fraccion_basica':
        $denom = rand(2, 8);
        $numer = rand(1, $denom - 1);
        $operator = 'fraccion';
        $answer = $numer;
        $n1 = $numer;
        $n2 = $denom;
        $fraction_data = [
            'type' => 'basica',
            'numer' => $numer,
            'denom' => $denom,
            'food' => $foods[array_rand($foods)]
        ];
        break;
    case 'fraccion_equiv':
        $denom_base = rand(2, 4);
        $numer_base = rand(1, $denom_base - 1);
        $mult = rand(2, 3);
        $denom_equiv = $denom_base * $mult;
        $numer_equiv = $numer_base * $mult;
        
        $operator = 'equiv';
        $answer = $numer_equiv;
        $n1 = $numer_base;
        $n2 = $denom_base;
        $fraction_data = [
            'type' => 'equiv',
            'numer_base' => $numer_base,
            'denom_base' => $denom_base,
            'denom_equiv' => $denom_equiv,
            'food' => $foods[array_rand($foods)]
        ];
        break;
    case 'aleatorio':
        $ops = ['suma', 'resta', 'multiplicacion', 'division', 'fraccion_basica'];
        $op = $ops[array_rand($ops)];
        if ($op === 'suma') { $operator = '+'; $answer = $n1 + $n2; }
        elseif ($op === 'resta') { 
            if ($n1 < $n2) { $t = $n1; $n1 = $n2; $n2 = $t; }
            $operator = '-'; $answer = $n1 - $n2; 
        }
        elseif ($op === 'multiplicacion') { $operator = '×'; $answer = $n1 * $n2; }
        elseif ($op === 'division') {
            $d = rand(1, 10); $r = rand(1, 10); $n1 = $d * $r; $n2 = $d; $operator = '÷'; $answer = $r;
        } else {
            $denom = rand(2, 6); $numer = rand(1, $denom - 1); $operator = 'fraccion'; $answer = $numer; $n1 = $numer; $n2 = $denom;
            $fraction_data = ['type' => 'basica', 'numer' => $numer, 'denom' => $denom, 'food' => $foods[array_rand($foods)]];
        }
        break;
}

send_json([
    'n1' => $n1,
    'n2' => $n2,
    'operator' => $operator,
    'answer' => $answer,
    'total_questions' => (int)$level['total_questions'],
    'fraction_data' => $fraction_data,
    'level_info' => [
        'story_intro' => $level['story_intro'],
        'boss_name' => $level['boss_name'],
        'boss_icon' => $level['boss_icon'],
        'theme_id' => $level['theme_id']
    ]
]);
?>
