# PARTE IV: PRODUCTO FINAL

**Universidad Politécnica Territorial de Trujillo (UPTT)**
**Proyecto Sociotecnológico — Ingeniería en Informática**

> **Título del Proyecto:** MathQuest — Software Educativo Gamificado para el Aprendizaje de Matemáticas en Educación Primaria
> **Autor:** Salvatore Berticci
> **Período:** Trimestre II — 2026

---

## 4.1 FICHA TÉCNICA DEL PRODUCTO

| Campo | Descripción |
|---|---|
| **Nombre del Producto** | MathQuest — Software Educativo Gamificado |
| **Versión** | v26.0 (Producción) |
| **Tipo de Aplicación** | Aplicación Web SPA (Single-Page Application) |
| **Propósito** | Reforzar el aprendizaje matemático en niños de educación primaria (2° a 6° grado) mediante mecánicas de videojuego |
| **Plataforma de Implementación** | Servidor Local (XAMPP / Apache) — Acceso vía Navegador Web |
| **Lenguajes de Programación** | PHP 8.2 (Backend), JavaScript ES6+ (Frontend), SQL (Base de datos), HTML5 / CSS3 (Interfaz) |
| **Frameworks y Librerías** | TailwindCSS (utilidades CSS · CDN), Chart.js (gráficas), tsParticles v2 (efectos visuales), SweetAlert2 (diálogos), Canvas Confetti (animaciones), Google Fonts — Fredoka (tipografía) |
| **Motor de Base de Datos** | MariaDB 10.4 (compatible MySQL) · Codificación: `utf8mb4_unicode_ci` |
| **Servidor Web** | Apache 2.4 (XAMPP) |
| **Abstracción de BD** | PDO (PHP Data Objects) con `ERRMODE_EXCEPTION` y `EMULATE_PREPARES = false` |
| **Arquitectura** | Cliente–Servidor · API REST · MVC implícito |

### Requerimientos de Sistema

#### Hardware Mínimo

| Componente | Especificación Mínima |
|---|---|
| Procesador | Intel Core i3 o equivalente (1.5 GHz) |
| Memoria RAM | 2 GB |
| Almacenamiento | 500 MB disponibles |
| Pantalla | 1024 × 768 px |
| Conexión de Red | Red local (LAN) o acceso a `localhost` |

#### Software Mínimo

| Componente | Especificación |
|---|---|
| Sistema Operativo | Windows 7/10/11, Linux Ubuntu 18.04+, macOS 10.14+ |
| Servidor | XAMPP 8.2+ (Apache + MySQL/MariaDB + PHP) |
| Navegador Web | Google Chrome 90+, Firefox 88+, Edge 90+ |
| Gestor de BD | phpMyAdmin (incluido en XAMPP) |

### Módulos Principales del Sistema

| N° | Módulo | Descripción |
|---|---|---|
| M-01 | **Autenticación y Sesiones** | Registro, inicio de sesión, cierre de sesión, verificación de sesión activa. Roles: `admin` / `parent`. |
| M-02 | **Motor de Juego** | Generación dinámica de problemas matemáticos, temporizador configurable, validación anti-trampa. |
| M-03 | **Mapa de Aventura** | Hub de navegación con 10 niveles progresivos y sistema de desbloqueo. |
| M-04 | **Sistema de Progresión** | Gestión de monedas, actualización de nivel, historial de sesiones de juego. |
| M-05 | **Bazar Mágico** | Tienda de recompensas temáticas con filtro por género de avatar y transacciones atómicas. |
| M-06 | **Sistema de Temas (Skins)** | Aplicación de temas visuales y musicales al equipar una recompensa. |
| M-07 | **Arena PvP Local** | Modo multijugador en pantalla dividida con sistema de vidas, estadísticas y música dedicada. |
| M-08 | **Panel de Padres** | Dashboard con estadísticas de rendimiento, historial de actividad y recomendaciones de refuerzo. |
| M-09 | **Panel de Administración** | Gestión de usuarios, configuración global, estadísticas del sistema y auditoría. |
| M-10 | **Registro de Auditoría** | Log automático de todas las acciones críticas en la tabla `audit_logs`. |

### Seguridad y Soporte

| Aspecto | Implementación |
|---|---|
| **Autenticación** | Sesiones PHP con `session_start()` + verificación en cada endpoint |
| **Cifrado de contraseñas** | `password_hash($pass, PASSWORD_DEFAULT)` — algoritmo bcrypt |
| **Prevención de SQL Injection** | PDO Prepared Statements en el 100% de las consultas |
| **Control de Acceso** | Funciones `check_auth()` y `check_admin()` aplicadas en todos los endpoints |
| **Anti-Trampa** | Validación cruzada de puntaje en servidor: aciertos ≤ total, total ≤ DB máximo, tiempo mínimo por pregunta |
| **Integridad Referencial** | Claves foráneas con `ON DELETE CASCADE` / `ON DELETE SET NULL` en toda la BD |
| **Atomicidad de Transacciones** | `beginTransaction()` / `commit()` / `rollBack()` en todas las operaciones de escritura múltiple |
| **Soporte Técnico** | Repositorio público en GitHub: `github.com/Salvaberticci/software-educativo-matematicas` |

---

## 4.2 MODELADO LÓGICO (ARQUITECTURA)

### 4.2.1 Diagramas de Casos de Uso

El sistema reconoce tres actores principales derivados del código fuente:

```
                           ┌─────────────────────────────────────────────┐
                           │             SISTEMA MATHQUEST                │
                           │                                              │
  ┌──────────┐             │  ● Registrarse                               │
  │  PADRE   │────────────►│  ● Iniciar / Cerrar Sesión                   │
  │ (parent) │             │  ● Gestionar perfiles de hijos               │
  └──────────┘             │  ● Ver Dashboard de Progreso                 │
                           │  ● Ver Historial de Actividad                │
                           │                                              │
  ┌──────────┐             │  ● Jugar Nivel (Motor de Ejercicios)         │
  │  NIÑO    │────────────►│  ● Navegar Mapa de Aventura                  │
  │ (child   │             │  ● Comprar / Equipar Recompensas             │
  │  profile)│             │  ● Desafiar en Arena PvP                     │
  └──────────┘             │  ● Ganar Monedas y Subir de Nivel            │
                           │                                              │
  ┌──────────┐             │  ● Gestionar Usuarios (CRUD)                 │
  │  ADMIN   │────────────►│  ● Ver Estadísticas Globales                 │
  │          │             │  ● Configurar Parámetros (tiempo, precios)   │
  └──────────┘             │  ● Auditar Registros del Sistema             │
                           └─────────────────────────────────────────────┘
```

#### Caso de Uso — CU-01: Iniciar Sesión

| Campo | Descripción |
|---|---|
| **Actor** | Padre / Administrador |
| **Precondición** | El usuario existe en la tabla `users` |
| **Flujo Principal** | 1. Usuario ingresa email + contraseña → 2. Sistema valida con `password_verify()` → 3. Se crea `$_SESSION` → 4. Se carga lista de hijos con tema equipado (JOIN `rewards`) → 5. Redirige al módulo correspondiente según rol |
| **Flujo Alternativo** | Credenciales inválidas → log en `audit_logs` (`login_failed`) → Error HTTP 401 |
| **Postcondición** | Sesión PHP activa con `user_id` y `role` |

#### Caso de Uso — CU-02: Resolver Nivel de Juego

| Campo | Descripción |
|---|---|
| **Actor** | Niño (perfil) |
| **Precondición** | Nivel desbloqueado (`current_level >= level_id`) |
| **Flujo Principal** | 1. Frontend solicita problema → `generate_problem.php` → 2. BD retorna parámetros del nivel → 3. Se genera operación aleatoria válida → 4. Niño responde → 5. `save_score.php` valida puntaje → 6. Se actualizan monedas y nivel en BD → 7. Se registra sesión en `game_sessions` |
| **Flujo Alternativo** | Puntaje inválido / velocidad sospechosa → Error 400 + log `cheat_attempt` |
| **Postcondición** | Monedas incrementadas; nivel desbloqueado si `score_correct >= target_score` |

---

### 4.2.2 Diagramas de Flujo por Módulo

#### Flujo M-01: Autenticación

```
[INICIO]
    │
    ▼
¿Campos vacíos?──SÍ──► HTTP 400: "Campos requeridos"
    │NO
    ▼
¿Email válido? ──NO──► HTTP 400: "Email no válido"
    │SÍ
    ▼
SELECT users WHERE email = ?  (Prepared Statement)
    │
    ▼
¿Usuario existe?──NO──► HTTP 401: "Credenciales inválidas" + log_action('login_failed')
    │SÍ
    ▼
password_verify($input, $hash)
    │
    ▼
¿Hash válido?──NO──► HTTP 401: "Credenciales inválidas" + log_action('login_failed')
    │SÍ
    ▼
$_SESSION['user_id'] = $id
$_SESSION['role']    = $role
log_action('login_success')
    │
    ▼
¿role === 'admin'?──SÍ──► render('adminDashboard')
    │NO
    ▼
render('profileSelection')
    │
[FIN]
```

#### Flujo M-02: Guardar Puntaje (save_score.php)

```
[INICIO]
    │
    ▼
check_auth() ──FALLA──► HTTP 401
    │OK
    ▼
Recibir: child_id, level_id, score_correct, score_total, time_sec
    │
    ▼
SELECT target_score, total_questions FROM levels WHERE id = ?
    │
    ▼
¿score_correct > score_total? ──SÍ──► HTTP 400: "Puntaje inválido"
    │NO
    ▼
¿score_total > DB total_questions? ──SÍ──► HTTP 400: "Total excesivo"
    │NO
    ▼
¿time_sec < score_total * 0.5? ──SÍ──► HTTP 400: "Speed Hack" + log
    │NO
    ▼
beginTransaction()
    │
    ├── INSERT game_sessions (...)
    ├── UPDATE children SET coins = coins + (score_correct * 5)
    └── ¿score_correct >= target_score?
           │SÍ
           └── UPDATE children SET current_level = current_level + 1
                (solo si current_level === level_id)
    │
    ▼
commit()  ◄──── Si cualquier paso falla: rollBack() + HTTP 500
    │
    ▼
HTTP 200: { success, coins_earned, passed }
    │
[FIN]
```

#### Flujo M-05: Compra de Recompensa (buy_reward.php)

```
[INICIO]
    │
    ▼
check_auth() ──FALLA──► HTTP 401
    │OK
    ▼
¿child_id o reward_id inválidos? ──SÍ──► HTTP 400
    │NO
    ▼
beginTransaction()
    │
    ├── SELECT cost FROM rewards WHERE id = reward_id
    │      └── ¿No existe? ──► Exception('Recompensa no encontrada')
    │
    ├── SELECT coins FROM children WHERE id = child_id
    │      └── ¿coins < cost? ──► Exception('Monedas insuficientes')
    │
    ├── UPDATE children SET coins = coins - cost
    └── INSERT INTO child_inventory (child_id, reward_id)
    │
    ▼
commit() ◄──── Si falla: rollBack() + HTTP 400
    │
    ▼
HTTP 200: { success, new_balance }
    │
[FIN]
```

![[Diagrama de Arquitectura General del Sistema]](./img/arquitectura_sistema.png)

---

## 4.3 DESARROLLO BAJO METODOLOGÍA ÁGIL (SCRUM)

### 4.3.1 Planificación — Sprint Planning

El desarrollo de MathQuest se organizó en **sprints de 1–2 semanas** con las siguientes prioridades:

| Sprint | Objetivo | Épicas |
|---|---|---|
| **Sprint 1** | Núcleo del sistema | Autenticación, roles, gestión de perfiles de niños |
| **Sprint 2** | Motor de juego | Generador de problemas, validación anti-trampa, guardado de puntajes |
| **Sprint 3** | Mapa y progresión | Mapa de aventura, desbloqueo de niveles, sistema de monedas |
| **Sprint 4** | Bazar y temas | Tienda de recompensas, sistema de equipamiento, partículas temáticas |
| **Sprint 5** | Panel y reportes | Dashboard de padres, gráficas Chart.js, historial de actividad |
| **Sprint 6** | Administración | Panel admin, gestión de usuarios, auditoría, configuración global |
| **Sprint 7** | Jefes y narrativa | Ilustraciones de jefes, intro narrativa, layout de batalla dual |
| **Sprint 8** | PvP y pulido | Arena PvP local, audio PvP, estadísticas finales, ajuste de UI |

**Artefactos de Planificación:**
- **Product Backlog:** Lista de requerimientos funcionales priorizada por impacto pedagógico.
- **Definition of Done:** Endpoint funcional + prueba manual exitosa + commit en rama `main`.
- **Story Points:** Estimación por complejidad (1 = trivial → 8 = complejo, nuevas entidades de BD).

---

### 4.3.2 Ejecución del Desarrollo

#### Estructura de la API REST

Todos los módulos backend se implementaron como endpoints PHP independientes que reciben parámetros vía `$_POST` / `$_GET` y retornan JSON estandarizado a través de la función `send_json()`:

```php
// includes/functions.php
function send_json($data, $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}
```

#### Frontend SPA (Single-Page Application)

La interfaz completa reside en **`js/app.js`** (~2,634 líneas). El sistema de vistas es un diccionario de funciones que retornan templates HTML:

```javascript
// Patrón de renderizado (app.js)
const views = {
    login:           () => `<div>...</div>`,
    levelMap:        () => `<div>...</div>`,
    pvpArena:        () => `<div>...</div>`,
    rewards:         () => `<div>...</div>`,
    dashboard:       () => `<div>...</div>`,
    adminDashboard:  () => `<div>...</div>`,
};

function render(viewName) {
    document.getElementById('app').innerHTML = views[viewName]();
    attachListeners(viewName);
}
```

#### Conexión a la Base de Datos (PDO)

```php
// includes/db.php
$dsn = "mysql:host=localhost;dbname=mathquest_db;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,  // Prepared statements reales
];
$pdo = new PDO($dsn, $user, $pass, $options);
```

---

### 4.3.3 Fase de Pruebas (Testing)

Las pruebas se realizaron en **tres niveles**:

| Nivel | Tipo | Herramienta | Frecuencia |
|---|---|---|---|
| **Unitario** | Validación de lógica interna por función | Revisión manual de código | Por cada commit |
| **Integración** | Verificación de flujo endpoint → BD → respuesta JSON | Navegador + DevTools (Network) | Por cada sprint |
| **Sistema** | Simulación completa de flujos de usuario | Prueba manual en XAMPP | Cierre de sprint |

---

## 4.4 VALIDACIÓN TÉCNICA

### 4.4.1 Pruebas de Caja Negra

Las pruebas de caja negra evalúan el comportamiento del sistema **desde la perspectiva del usuario**, sin conocimiento de la implementación interna.

---

#### CNI-01: Validación del Formulario de Registro (`api/auth.php`)

**Descripción:** Verificar que el sistema rechaza entradas inválidas y registra correctamente entradas válidas.

| ID | Escenario | Datos de Entrada | Respuesta HTTP Esperada | Resultado Esperado |
|---|---|---|---|---|
| CNI-01-A | Registro exitoso | `email: nuevo@test.com` / `pass: abc123` | `200 OK` | `{"success": true, "message": "Registro exitoso..."}` |
| CNI-01-B | Campos vacíos | `email: ""` / `pass: ""` | `400 Bad Request` | `{"error": "Email y contraseña son requeridos"}` |
| CNI-01-C | Email malformado | `email: "noEsEmail"` / `pass: "123"` | `400 Bad Request` | `{"error": "Email no válido"}` |
| CNI-01-D | Email duplicado | `email: "salvatoreberticci19@gmail.com"` | `400 Bad Request` | `{"error": "No puedes usar este correo porque ya un usuario ya lo tiene registrado"}` |

**Criterio de Aceptación:** El sistema nunca crea registros duplicados. En caso de éxito, se crean simultáneamente el usuario y su perfil de niño por defecto.

![[Pantalla: Formulario de Registro con mensaje de error de email duplicado]](./img/registro_email_duplicado.png)

---

#### CNI-02: Compra de Recompensa en el Bazar Mágico (`api/buy_reward.php`)

**Descripción:** Verificar que el sistema controla correctamente la economía de monedas.

| ID | Escenario | Monedas del Niño | Costo del Ítem | Respuesta HTTP | Resultado Esperado |
|---|---|---|---|---|---|
| CNI-02-A | Compra exitosa | 200 | 50 | `200 OK` | `{"success": true, "new_balance": 150}` · Ítem en inventario |
| CNI-02-B | Saldo insuficiente | 30 | 100 | `400 Bad Request` | `{"error": "Monedas insuficientes"}` · Sin cambios en BD |
| CNI-02-C | Recompensa inexistente | 999 | N/A | `400 Bad Request` | `{"error": "Recompensa no encontrada"}` |

**Criterio de Aceptación:** Las monedas y el inventario SOLO cambian si la transacción completa es exitosa (principio de atomicidad). Un fallo a mitad de proceso revierte todos los cambios.

![[Pantalla: Bazar Mágico con alerta de saldo insuficiente]](./img/bazar_saldo_insuficiente.png)

---

#### CNI-03: Historial de Progreso en el Dashboard de Padres (`api/get_reports.php`)

**Descripción:** Verificar que el panel muestra estadísticas precisas y actualizadas.

| ID | Escenario | Condición | Resultado Esperado |
|---|---|---|---|
| CNI-03-A | Primer acceso (sin datos) | `game_sessions` vacía para el niño | Panel muestra "0 sesiones" y gráfico en cero |
| CNI-03-B | Con historial de partidas | 5 sesiones registradas en niveles 1-3 | Gráfico de aciertos/errores reflejando la media real |
| CNI-03-C | Acceso sin autenticación | Sin sesión PHP activa | HTTP 401: `{"error": "Unauthorized"}` |

**Criterio de Aceptación:** Los datos del gráfico (Chart.js Doughnut) coinciden exactamente con los valores de `SUM(score_correct)` y `SUM(score_total - score_correct)` de la base de datos.

![[Pantalla: Dashboard de padre con gráfico de rendimiento]](./img/dashboard_grafico_rendimiento.png)

---

### 4.4.2 Pruebas de Caja Blanca

Las pruebas de caja blanca evalúan la **lógica interna del código**, verificando caminos de ejecución, condiciones de borde y decisiones de flujo.

---

#### CBI-01: Árbol de Decisión del Módulo Anti-Trampa (`api/save_score.php`, líneas 29–42)

**Descripción:** Verificar que las tres guardas de seguridad (aciertos, total, tiempo) funcionan de forma independiente y correcta.

```php
// GARDA 1: Coherencia aritmética
if ($score_correct > $score_total) {
    send_json(['error' => 'Puntaje inválido: Aciertos > Total'], 400);
}

// GARDA 2: Validación contra el máximo de la BD
if ($score_total > $db_total) {
    send_json(['error' => 'Puntaje inválido: Total excesivo'], 400);
}

// GARDA 3: Detección de speed hack (< 0.5 seg/pregunta)
if ($score_total > 0 && $time_sec < ($score_total * 0.5)) {
    log_action('cheat_attempt', "Posible trampa detectada...");
    send_json(['error' => '¡Demasiado rápido!'], 400);
}
```

**Tabla de Verdad — Caminos de Ejecución:**

| Caso | `correct > total` | `total > db_total` | `time < total*0.5` | Camino Ejecutado | Resultado |
|---|---|---|---|---|---|
| **A** | FALSO | FALSO | FALSO | Líneas 44-71 (lógica normal) | HTTP 200 ✅ |
| **B** | VERDADERO | — | — | Garda 1 → Detención | HTTP 400 ❌ |
| **C** | FALSO | VERDADERO | — | Garda 2 → Detención | HTTP 400 ❌ |
| **D** | FALSO | FALSO | VERDADERO | Garda 3 → log + Detención | HTTP 400 ❌ + log |

**Cobertura de Ramas:** 4/4 caminos verificados (100%).

---

#### CBI-02: Lógica de Generación de Problemas por Operación (`api/generate_problem.php`, líneas 30–111)

**Descripción:** Verificar que cada rama del `switch` produce resultados matemáticamente válidos y sin condiciones de error (ej. división por cero, fracciones impropias).

```php
switch ($level['operation']) {
    case 'resta':
        // Invariante: n1 siempre >= n2 → answer >= 0
        if ($n1 < $n2) { $temp = $n1; $n1 = $n2; $n2 = $temp; }
        $answer = $n1 - $n2;
        break;

    case 'division':
        // Invariante: divisor siempre >= 1 → sin división por cero
        $divisor = rand(max(1, $level['min_val']), $level['max_val']);
        $n1 = $divisor * rand(1,10); $answer = $n1 / $divisor;
        break;

    case 'fraccion_basica':
        $denom = rand(2, 8);
        $numer = rand(1, $denom - 1); // Invariante: numer < denom → fracción propia,
        break;
}
```

**Verificación de Invariantes por Rama:**

| Operación | Invariante Verificada | Condición de Borde Cubierta |
|---|---|---|
| `suma` | `answer = n1 + n2` siempre ≥ 0 (rango positivo) | Suma de mínimos: `1 + 1 = 2` |
| `resta` | `n1 >= n2` garantizado por swap → `answer >= 0` | `n1 == n2` → `answer = 0` ✅ |
| `multiplicacion` | Rango cappado: `n1, n2 ∈ [1,10]` | Producto máx: `10×10 = 100` |
| `division` | `divisor >= max(1, min_val)` → sin `/0` | `min_val = 1`, `divisor = 1` ✅ |
| `fraccion_basica` | `numer ∈ [1, denom-1]` → fracción propia siempre | `denom = 2` → `numer = 1` (única opción ✅) |

---

#### CBI-03: Flujo de Transacción Atómica en el Registro (`api/auth.php`, líneas 68–88)

**Descripción:** Verificar que la creación del usuario y su perfil de niño ocurren **atómicamente** o no ocurren en absoluto.

```php
try {
    $pdo->beginTransaction();                          // INICIO TRANSACCIÓN

    // Paso 1: Crear cuenta de usuario
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (email, password_hash, role)
                           VALUES (?, ?, 'parent')");
    $stmt->execute([$email, $hash]);
    $user_id = $pdo->lastInsertId();

    // Paso 2: Crear perfil de niño predeterminado
    $stmt = $pdo->prepare("INSERT INTO children (user_id_parent, name, grade)
                           VALUES (?, 'Explorador', 1)");
    $stmt->execute([$user_id]);

    log_action('user_registered', "Nuevo usuario: {$email}", $user_id);

    $pdo->commit();                                    // CIERRE EXITOSO

} catch (Exception $e) {
    $pdo->rollBack();                                  // REVERTIR TODO
    send_json(['error' => 'Error al registrar: ' . $e->getMessage()], 500);
}
```

**Escenarios de Prueba:**

| Escenario | Condición Forzada | Comportamiento Esperado | Verificación en BD |
|---|---|---|---|
| **Éxito total** | Sin errores | commit() ejecutado | 1 fila en `users` + 1 fila en `children` |
| **Fallo en Paso 1** | Email duplicado (UNIQUE KEY viola) | `PDOException` → rollBack() | BD sin cambios |
| **Fallo en Paso 2** | Violación FK (user_id no existe) | `PDOException` → rollBack() | BD sin cambios (incluyendo `users`) |

**Garantía:** Es imposible crear un usuario sin su perfil de niño, o un perfil de niño huérfano.

---

### 4.4.3 Protocolos de Integridad de Base de Datos

#### Protocolo BD-01: Restricciones Referenciales (Claves Foráneas)

El esquema de la base de datos (`sql/mathquest_db.sql`) define relaciones con acciones referenciales específicas para cada caso:

```sql
-- Acción: CASCADE — Al eliminar un padre, sus hijos se eliminan
ALTER TABLE children
  ADD CONSTRAINT children_ibfk_1
  FOREIGN KEY (user_id_parent) REFERENCES users(id) ON DELETE CASCADE;

-- Acción: SET NULL — Si se elimina una recompensa equipada, el campo queda en NULL
-- (el niño no pierde su perfil, solo pierde la referencia al tema)
ALTER TABLE children
  ADD CONSTRAINT fk_equipped_reward
  FOREIGN KEY (equipped_reward_id) REFERENCES rewards(id) ON DELETE SET NULL;

-- Acción: CASCADE — Al eliminar un niño, su inventario desaparece
ALTER TABLE child_inventory
  ADD CONSTRAINT child_inventory_ibfk_1
  FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE;

-- Acción: CASCADE — Al eliminar un niño, sus sesiones de juego se eliminan
ALTER TABLE game_sessions
  ADD CONSTRAINT game_sessions_ibfk_1
  FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE;
```

**Efecto:** El motor de base de datos (InnoDB) garantiza que **nunca existirán registros huérfanos**. La consistencia es verificada en el nivel más bajo del sistema.

---

#### Protocolo BD-02: Restricción de Unicidad y Prevención de Duplicados

```sql
-- Garantiza un email único por usuario en toda la plataforma
ALTER TABLE users
  ADD UNIQUE KEY email (email);
```

Esta restricción opera en **dos niveles complementarios**:

1. **Nivel Aplicación (PHP):** `api/auth.php` consulta explícitamente si el email existe antes de intentar insertar → mensaje de error amigable al usuario.
2. **Nivel Base de Datos (MariaDB):** La clave `UNIQUE KEY` rechaza la inserción con `PDOException` si la validación de la app falla → el `rollBack()` preserva la integridad.

---

#### Protocolo BD-03: Prevención de Inyección SQL (100% Prepared Statements)

**Todas** las consultas en el sistema usan el patrón PDO Prepared Statement. No existe ninguna consulta construida por concatenación de strings:

```php
// ✅ CORRECTO — Usado en todo el sistema
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);   // El driver separa código SQL de datos

// ❌ INSEGURO — Patrón que NO existe en el código
// $pdo->query("SELECT * FROM users WHERE email = '$email'");
```

Con `PDO::ATTR_EMULATE_PREPARES = false` (configurado en `includes/db.php`), los **prepared statements son nativos** del servidor MariaDB, garantizando separación total entre instrucciones SQL y datos del usuario.

---

## 4.5 MATRIZ DE CUMPLIMIENTO DE REQUERIMIENTOS

| N° | Requerimiento Funcional (RF) | Módulo / Archivo Implementador | Estado |
|---|---|---|---|
| RF-01 | Registro y autenticación de usuarios con roles diferenciados | `api/auth.php` — Roles: `admin` / `parent` | ✅ Cumplido (100%) |
| RF-02 | Gestión de perfiles de niños (Crear, Ver, Seleccionar) | `api/add_child.php` + `views.profileSelection` | ✅ Cumplido (100%) |
| RF-03 | Generación dinámica de problemas matemáticos (suma, resta, multiplicación, división, fracciones) | `api/generate_problem.php` | ✅ Cumplido (100%) |
| RF-04 | Sistema de progresión por niveles (desbloqueo secuencial, 10 niveles) | `api/save_score.php` + tabla `levels` | ✅ Cumplido (100%) |
| RF-05 | Sistema de economía virtual (monedas por aciertos) | `api/save_score.php` — 5 monedas/acierto | ✅ Cumplido (100%) |
| RF-06 | Tienda de recompensas con transacciones verificadas | `api/buy_reward.php` — Transacción PDO | ✅ Cumplido (100%) |
| RF-07 | Sistema de temas visuales y musicales equipables | `api/equip_reward.php` + `applyTheme()` en `app.js` | ✅ Cumplido (100%) |
| RF-08 | Dashboard de progreso para padres con gráficas | `api/get_reports.php` + Chart.js Doughnut | ✅ Cumplido (100%) |
| RF-09 | Panel de administración con gestión de usuarios | `api/admin_actions.php` + `api/get_admin_stats.php` | ✅ Cumplido (100%) |
| RF-10 | Registro de auditoría de acciones críticas | `includes/functions.php` → `log_action()` + tabla `audit_logs` | ✅ Cumplido (100%) |
| RF-11 | Configuración global de parámetros del juego | `api/admin_actions.php` + tabla `global_settings` | ✅ Cumplido (100%) |
| RF-12 | Persistencia de datos con integridad referencial | Claves foráneas InnoDB en `mathquest_db.sql` | ✅ Cumplido (100%) |
| RF-13 | Cifrado seguro de contraseñas | `password_hash()` bcrypt en `api/auth.php` | ✅ Cumplido (100%) |
| RF-14 | Prevención de inyección SQL | PDO Prepared Statements en el 100% de consultas | ✅ Cumplido (100%) |
| RF-15 | Sistema de narrativa y jefes por nivel | Tabla `levels` con campos `story_intro`, `boss_name`, `boss_icon` | ✅ Cumplido (100%) |
| RF-16 | Modo PvP local multijugador (pantalla dividida) | `views.pvpArena` + `initPvpMode()` en `app.js` | ✅ Cumplido (100%) |
| RF-17 | Sistema de fracciones con visualización gráfica | `generate_problem.php` + SVG/canvas en `app.js` | ✅ Cumplido (100%) |
| RF-18 | Control de acceso por rol en todos los endpoints | `check_auth()` / `check_admin()` en `functions.php` | ✅ Cumplido (100%) |
| RF-19 | Sistema de audio dinámico por tema equipado | `sounds` object + `applyTheme()` en `app.js` | ✅ Cumplido (100%) |
| RF-20 | Validación anti-trampa en el servidor | Guardas de puntaje/tiempo en `save_score.php` | ✅ Cumplido (100%) |

**Tasa de Cumplimiento Global: 20/20 Requerimientos — 100%**

---

## 4.6 MEMORIA DESCRIPTIVA DE RECURSOS

### 4.6.1 Cuadro de Valoración de Herramientas

| N° | Herramienta / Recurso | Versión Utilizada | Categoría | Tipo de Licencia | Costo | Función en el Proyecto |
|---|---|---|---|---|---|---|
| 1 | **Visual Studio Code** | 1.87+ | IDE / Editor de Código | Open Source (MIT) | Gratuito | Escritura y depuración del código PHP, JavaScript, HTML y CSS |
| 2 | **XAMPP** | 8.2.x | Servidor de Desarrollo | Freeware | Gratuito | Provee Apache (servidor web), PHP y MariaDB en entorno local |
| 3 | **Apache HTTP Server** | 2.4.x | Servidor Web | Open Source (Apache 2.0) | Gratuito | Procesamiento de peticiones HTTP y servicio de la aplicación |
| 4 | **PHP** | 8.2.4 | Lenguaje de Backend | Open Source (PHP License) | Gratuito | Lógica de negocio, API REST, gestión de sesiones y BD |
| 5 | **MariaDB / MySQL** | 10.4.28 | Motor de Base de Datos | Open Source (GPL v2) | Gratuito | Almacenamiento persistente de datos del sistema |
| 6 | **phpMyAdmin** | 5.2.1 | Gestor de BD (GUI) | Open Source (GPL v2) | Gratuito | Administración visual de la base de datos durante desarrollo |
| 7 | **Git** | 2.43+ | Control de Versiones | Open Source (GPL v2) | Gratuito | Gestión de versiones, historial de cambios y ramas de desarrollo |
| 8 | **GitHub** | — | Repositorio Remoto | Freeware (plan gratuito) | Gratuito | Hospedaje del repositorio y colaboración (backup, historial) |
| 9 | **TailwindCSS** | CDN v3 | Framework CSS | Open Source (MIT) | Gratuito | Sistema de utilidades CSS para construcción rápida de la UI |
| 10 | **Chart.js** | CDN | Librería de Gráficas | Open Source (MIT) | Gratuito | Generación de gráficos de rendimiento en el dashboard |
| 11 | **tsParticles** | CDN v2 | Librería de Efectos | Open Source (MIT) | Gratuito | Animaciones de partículas temáticas por recompensa equipada |
| 12 | **SweetAlert2** | CDN v11 | Librería UI | Open Source (MIT) | Gratuito | Modales, confirmaciones y alertas con diseño premium |
| 13 | **Canvas Confetti** | CDN v1.6 | Librería de Animación | Open Source (ISC) | Gratuito | Animación de confeti en victorias y fin de partida PvP |
| 14 | **Google Fonts (Fredoka)** | CDN | Tipografía Web | Open Source (OFL-1.1) | Gratuito | Tipografía amigable e infantil en toda la interfaz |

### 4.6.2 Resumen de Inversión en Herramientas

| Tipo | Cantidad | Costo Total |
|---|---|---|
| Open Source | 11 herramientas | $0.00 |
| Freeware | 3 herramientas | $0.00 |
| **TOTAL** | **14 herramientas** | **$0.00 USD** |

> El proyecto fue desarrollado **íntegramente con herramientas gratuitas y de código abierto**, lo que lo convierte en una solución educativa accesible y replicable sin ninguna inversión en licencias de software.

---

## 4.7 CONCLUSIONES TÉCNICAS

1. **Arquitectura Sólida:** La separación en módulos (`api/`, `includes/`, `js/`, `css/`) facilita el mantenimiento y la escalabilidad del sistema. El patrón SPA en el frontend elimina recargas de página, mejorando la experiencia del usuario infantil.

2. **Seguridad Verificada:** El sistema implementa múltiples capas de protección (PDO, bcrypt, sesiones, roles, anti-trampa) que garantizan la integridad de los datos educativos y la resistencia ante ataques comunes.

3. **Integridad de Datos:** Las claves foráneas InnoDB con acciones `CASCADE` y `SET NULL` aseguran que la base de datos nunca contendrá registros inconsistentes, independientemente de errores en la capa de aplicación.

4. **Cumplimiento Total:** Los 20 requerimientos funcionales identificados fueron implementados satisfactoriamente, alcanzando una **tasa de cumplimiento del 100%** sin dependencias de software propietario.

5. **Viabilidad Pedagógica:** La gamificación (jefes, monedas, temas, PvP) aplicada sobre contenido curricular real (operaciones matemáticas de 2° a 6° grado) constituye un modelo probado de motivación extrínseca que incrementa el tiempo de práctica voluntaria del estudiante.

---

*Documento generado como parte del Proyecto Sociotecnológico — UPTT · Trimestre II · 2026*
*Repositorio: https://github.com/Salvaberticci/software-educativo-matematicas*
