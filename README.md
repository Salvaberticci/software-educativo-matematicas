# 🧮 MathQuest — ¡Aprender Matemáticas es una Aventura!

> **Software Educativo Gamificado** diseñado para niños de primaria. MathQuest convierte el aprendizaje de las matemáticas en una aventura RPG donde los estudiantes progresan por niveles, derrotan jefes, ganan monedas y personalizan su experiencia con temas de sus series favoritas.

[![PHP](https://img.shields.io/badge/PHP-8.2-blue?logo=php)](https://www.php.net/)
[![MariaDB](https://img.shields.io/badge/MariaDB-10.4-orange?logo=mariadb)](https://mariadb.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-CDN-teal?logo=tailwindcss)](https://tailwindcss.com/)
[![XAMPP](https://img.shields.io/badge/Servidor-XAMPP-FB7A24?logo=apache)](https://www.apachefriends.org/)

---

## 📋 Tabla de Contenidos

1. [Descripción General](#-descripción-general)
2. [Características Principales](#-características-principales)
3. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
4. [Arquitectura del Sistema](#-arquitectura-del-sistema)
5. [Instalación y Ejecución](#-instalación-y-ejecución)
6. [Estructura de la Base de Datos](#-estructura-de-la-base-de-datos)
7. [Calidad y Validación de Software](#-calidad-y-validación-de-software)
8. [Galería de Capturas](#-galería-de-capturas)
9. [Contribución y Licencia](#-contribución-y-licencia)

---

## 🌟 Descripción General

**MathQuest** es una aplicación web educativa tipo SPA (Single-Page Application) orientada a estudiantes de educación primaria (grados 2°–6°). Su objetivo es reforzar el pensamiento matemático mediante mecánicas de videojuego:

- El niño **explora un mapa de aventura** y desbloquea niveles progresivos.
- Cada nivel presenta un **jefe antagonista** con historia narrativa.
- Resolver ejercicios correctamente otorga **monedas** que pueden canjearse en el **Bazar Mágico** por temas (skins) de sus caricaturas favoritas.
- Los padres/tutores tienen acceso a un **Panel de Control** con estadísticas detalladas del progreso de sus hijos.
- Un **administrador del sistema** puede configurar parámetros globales y auditar toda la actividad.

---

## ✨ Características Principales

### 🎮 Sistema de Juego
- **10 Niveles Progresivos** que cubren: Suma, Resta, Multiplicación, División, Fracciones Básicas y Ejercicios Combinados.
- **Sistema de Jefes Finales** con ilustraciones personalizadas estilo "Paper Mario" y narrativa introductoria por nivel.
- **Generador Dinámico de Problemas** con lógica anti-trampa (validación de puntaje vs. base de datos y velocidad mínima).
- **Fracciones Visuales con Comida** (pizzas, pasteles, etc.) para aprendizaje concreto e intuitivo.
- **Arena PvP Local** (Jugador vs. Jugador en un mismo dispositivo) con música épica independiente y panel de estadísticas al final de la partida.

### 🏆 Sistema de Progresión y Economía
- **Monedas** ganadas por cada respuesta correcta (5 monedas/acierto).
- **Bazar Mágico** con 20 recompensas temáticas únicas (10 para niños, 10 para niñas), filtradas automáticamente por avatar.
- **Sistema de Equipamiento de Temas**: cada tema modifica el fondo, la paleta de colores, las partículas animadas y la música de fondo.

### 📊 Panel de Padres y Administración
- **Dashboard de Progreso** con gráfico de rendimiento (Aciertos vs. Fallas) usando Chart.js.
- **Historial de Actividad** con auditoría completa de cada sesión de juego.
- **Panel de Administrador** con estadísticas globales del sistema, gestión de usuarios y configuración de parámetros (tiempo de juego, precios).
- **Registro de Auditoría** (`audit_logs`) de todas las acciones críticas del sistema.

### 🎵 Sistema de Audio
- Música de fondo (BGM) dinámica que cambia según el tema equipado.
- Efectos de sonido para respuestas correctas, incorrectas, victoria y PvP.
- Control de activar/desactivar sonido persistente entre sesiones.

### 🔒 Seguridad
- Contraseñas almacenadas con `password_hash()` de PHP (bcrypt).
- Sistema de sesiones PHP con verificación en cada endpoint.
- Todas las consultas SQL usan **prepared statements con PDO** para prevenir inyección SQL.
- Validación anti-trampa en el servidor para puntajes y velocidad de respuesta.
- Control de acceso por rol (`admin` / `parent`).

---

## 🛠️ Tecnologías Utilizadas

| Capa | Tecnología | Versión | Propósito |
|------|-----------|---------|-----------|
| **Frontend** | HTML5 + CSS3 | — | Estructura y estilos base |
| **Frontend** | JavaScript (ES6+) | — | Lógica SPA, renderizado dinámico |
| **Frontend** | Tailwind CSS | CDN | Sistema de utilidades CSS |
| **Frontend** | Chart.js | CDN | Gráficos de rendimiento |
| **Frontend** | tsParticles v2 | CDN | Efectos de partículas por tema |
| **Frontend** | SweetAlert2 | CDN | Modales y diálogos premium |
| **Frontend** | canvas-confetti | CDN | Animación de confeti en victorias |
| **Backend** | PHP | 8.2 | API REST, lógica de negocio |
| **Backend** | PDO (PHP) | — | Abstracción de base de datos |
| **Base de Datos** | MariaDB / MySQL | 10.4 | Persistencia de datos |
| **Servidor** | Apache (XAMPP) | — | Servidor local de desarrollo |
| **Tipografía** | Google Fonts (Fredoka) | — | Tipografía amigable infantil |

---

## 🏛️ Arquitectura del Sistema

```
mathquest/
├── index.html              # SPA principal - punto de entrada
├── about.html              # Página informativa estática
├── js/
│   └── app.js              # Toda la lógica frontend (SPA, vistas, audio, PvP)
├── css/
│   └── style.css           # Sistema de diseño "Candy" personalizado
├── api/                    # Endpoints REST en PHP
│   ├── auth.php            # Login, Registro, Logout, Check Session
│   ├── generate_problem.php # Generación dinámica de ejercicios
│   ├── save_score.php      # Guardado de sesiones + anti-trampa
│   ├── get_reports.php     # Estadísticas del dashboard
│   ├── get_rewards.php     # Catálogo del Bazar Mágico
│   ├── buy_reward.php      # Compra de recompensas (transaccional)
│   ├── equip_reward.php    # Equipar/desequipar temas
│   ├── add_child.php       # Gestión de perfiles de niños
│   ├── get_admin_stats.php # Estadísticas globales para admin
│   └── admin_actions.php   # Acciones administrativas y configuración
├── includes/
│   ├── db.php              # Configuración de la conexión PDO
│   └── functions.php       # Funciones reutilizables (auth, log, json)
├── assets/
│   ├── img/                # Imágenes (mapa, avatares, jefes, fondos)
│   └── sounds/             # Archivos de audio (.mp3)
└── sql/
    └── mathquest_db.sql    # Schema completo de la base de datos
```

**Flujo de comunicación:**
```
Navegador (app.js)  ──fetch()──►  api/*.php  ──PDO──►  MariaDB
       ◄──── JSON ─────────────────────────────────────────────
```

---

## 🚀 Instalación y Ejecución

### Requisitos Previos

- [XAMPP](https://www.apachefriends.org/) (o equivalente con Apache + PHP 8.x + MariaDB)
- Navegador web moderno (Chrome, Firefox, Edge)
- Git (opcional)

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/Salvaberticci/software-educativo-matematicas.git
```

Coloca la carpeta clonada dentro de `C:\xampp\htdocs\` (Windows) o `/opt/lampp/htdocs/` (Linux).

### Paso 2: Iniciar los Servicios de XAMPP

1. Abre el **Panel de Control de XAMPP**.
2. Inicia los módulos **Apache** y **MySQL**.
3. Verifica que ambos estén en color verde.

### Paso 3: Crear la Base de Datos

1. Abre tu navegador y ve a `http://localhost/phpmyadmin`.
2. Haz clic en **Nueva** (panel izquierdo).
3. Crea una base de datos llamada exactamente: `mathquest_db` (codificación: `utf8mb4_unicode_ci`).
4. Selecciona la base de datos `mathquest_db` y ve a la pestaña **Importar**.
5. Selecciona el archivo `sql/mathquest_db.sql` del proyecto y haz clic en **Continuar**.

### Paso 4: Configurar la Conexión (si es necesario)

Abre `includes/db.php` y verifica/ajusta las credenciales:

```php
$host = 'localhost';
$db   = 'mathquest_db';
$user = 'root';   // Tu usuario de MySQL
$pass = '';       // Tu contraseña de MySQL (vacía por defecto en XAMPP)
```

### Paso 5: Ejecutar la Aplicación

Abre tu navegador y navega a:

```
http://localhost/software-educativo-matematicas/
```

### Cuentas de Prueba Incluidas

| Rol | Email | Contraseña | Descripción |
|-----|-------|-----------|-------------|
| **Admin** | `admin@mathquest.com` | `admin123` | Panel de administración completo |
| **Padre** | `test@mathquest.demo` | `test1234` | Cuenta con niño de prueba (todos los niveles desbloqueados) |
| **Tester** | `tester@candyquest.demo` | *(ver DB)* | Cuenta con historial extenso para estadísticas |

> [!NOTE]
> Para acceder al panel de administración, inicia sesión con la cuenta admin. El sistema te redirigirá automáticamente al Dashboard Administrativo.

---

## 🗄️ Estructura de la Base de Datos

### Diagrama de Entidad-Relación

```
users (1) ────< children (N) ────< game_sessions (N)
                    │                    │
                    │                    └── levels (1)
                    │
                    ├──── child_inventory (N) ──── rewards (1)
                    │
                    └── [equipped_reward_id] ──── rewards (1)

audit_logs (N) ──── users (1)
global_settings (independiente)
```

### Tablas Principales

| Tabla | Descripción | Claves |
|-------|-------------|--------|
| `users` | Cuentas de padres y administradores | PK: `id`, UNIQUE: `email` |
| `children` | Perfiles de niños vinculados a un padre | PK: `id`, FK: `user_id_parent → users.id` |
| `levels` | Configuración de los 10 niveles del juego | PK: `id` |
| `rewards` | Catálogo de temas/skins del Bazar Mágico | PK: `id` |
| `game_sessions` | Historial de partidas y puntajes | PK: `id`, FK: `child_id`, `level_id` |
| `child_inventory` | Inventario de recompensas adquiridas | PK: `id`, FK: `child_id`, `reward_id` |
| `audit_logs` | Registro de auditoría de acciones del sistema | PK: `id` |
| `global_settings` | Parámetros globales configurables por el admin | PK: `setting_key` |

---

## 🧪 Calidad y Validación de Software

### Introducción

La integridad y confiabilidad de un software educativo son críticas: los datos de progreso de los niños deben ser precisos, las transacciones de monedas deben ser atómicas, y el sistema debe resistir intentos de manipulación. MathQuest implementa múltiples capas de validación tanto en el cliente (frontend) como en el servidor (backend).

---

### 🔍 Pruebas de Caja Blanca (White-Box Testing)

Las pruebas de caja blanca evalúan la **lógica interna del código**, verificando rutas de ejecución, condiciones y flujos de control. El tester tiene conocimiento pleno del código fuente.

#### Caso WB-01: Validación Anti-Trampa en `save_score.php`

**Archivo:** `api/save_score.php` — Líneas 29–42

**Descripción:** El sistema verifica que el puntaje enviado por el cliente sea matemáticamente coherente y que el tiempo empleado sea físicamente posible.

```php
// Ruta 1: Puntaje imposible (aciertos > total)
if ($score_correct > $score_total) {
    send_json(['error' => 'Puntaje inválido: Aciertos > Total'], 400);
}

// Ruta 2: Total excede el máximo definido en la BD para ese nivel
if ($score_total > $db_total) {
    send_json(['error' => 'Puntaje inválido: Total excesivo'], 400);
}

// Ruta 3: Velocidad sospechosa (menos de 0.5 seg por pregunta)
if ($score_total > 0 && $time_sec < ($score_total * 0.5)) {
    log_action('cheat_attempt', "Posible trampa detectada...");
    send_json(['error' => '¡Demasiado rápido!'], 400);
}
```

**Casos de prueba:**

| Entrada | `score_correct` | `score_total` | `time_sec` | Resultado Esperado |
|---------|----------------|--------------|-----------|-------------------|
| Normal válido | 8 | 10 | 120 | HTTP 200 — Guardado exitoso |
| Aciertos > Total | 11 | 10 | 90 | HTTP 400 — Error validación |
| Total > DB máximo | 5 | 25 | 200 | HTTP 400 — Error validación |
| Speed Hack | 10 | 10 | 2 | HTTP 400 — Trampa detectada + log |

---

#### Caso WB-02: Flujo de Registro con Transacción Atómica en `auth.php`

**Archivo:** `api/auth.php` — Líneas 49–88

**Descripción:** El registro de un nuevo usuario crea simultáneamente un perfil de niño predeterminado en una sola transacción. Si cualquier paso falla, **toda la operación se revierte** (rollback), garantizando consistencia.

```php
// Ruta 1: Email con formato inválido
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { /* Rechazo 400 */ }

// Ruta 2: Email ya registrado
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
if ($stmt->fetch()) { /* Rechazo 400 */ }

// Ruta 3: Registro exitoso (transaccional)
$pdo->beginTransaction();
// ... INSERT users ...
// ... INSERT children (perfil por defecto) ...
$pdo->commit();

// Ruta 4: Error en BD → rollback garantizado
catch (Exception $e) {
    $pdo->rollBack();
}
```

**Flujo de decisión verificado:**
- `email vacío` → Error 400
- `email inválido` → Error 400
- `email duplicado` → Error 400 (mensaje específico)
- `éxito` → Transacción completa con registro de auditoría

---

#### Caso WB-03: Generación de Problemas Matemáticos por Tipo de Operación

**Archivo:** `api/generate_problem.php` — Líneas 30–111

**Descripción:** El generador contiene un `switch` con 7 ramas que producen distintos tipos de ejercicios. Se verifica que cada rama genere respuestas aritméticamente correctas y que las ramas de fracción produzcan siempre un numerador < denominador (fracción propia).

```php
case 'resta':
    // Garantiza que n1 >= n2 para evitar resultados negativos
    if ($n1 < $n2) { $temp = $n1; $n1 = $n2; $n2 = $temp; }
    $answer = $n1 - $n2; // Siempre >= 0

case 'fraccion_basica':
    $denom = rand(2, 8);
    $numer = rand(1, $denom - 1); // Garantiza: numer < denom
```

**Invariantes verificados:**
- `resta`: `answer` siempre ≥ 0
- `division`: El divisor nunca es 0 (`rand(max(1, min_val), max_val)`)
- `fraccion_basica`: `numer` ∈ [1, denom-1] siempre
- `aleatorio`: Multiplicación cappada a rango 1–10 para niños

---

### ⬛ Pruebas de Caja Negra (Black-Box Testing)

Las pruebas de caja negra evalúan el comportamiento del sistema **desde la perspectiva del usuario final**, sin conocimiento de la implementación interna.

#### Caso BB-01: Registro de Nuevo Usuario

**Flujo:** El padre accede a la pantalla de registro, completa el formulario y crea su cuenta.

| Escenario | Email | Contraseña | Resultado Esperado |
|-----------|-------|-----------|-------------------|
| ✅ Registro exitoso | `nuevo@email.com` | `pass123` | Mensaje de éxito + redirección al login |
| ❌ Campos vacíos | *(vacío)* | *(vacío)* | Alerta: "Email y contraseña son requeridos" |
| ❌ Email inválido | `no-es-email` | `pass123` | Alerta: "Email no válido" |
| ❌ Email duplicado | `existente@email.com` | `pass123` | Alerta: "No puedes usar este correo porque ya un usuario ya lo tiene registrado" |

**Postcondición de éxito:** El nuevo usuario puede iniciar sesión inmediatamente y ya tiene un perfil de niño llamado "Explorador" creado automáticamente.

---

#### Caso BB-02: Flujo Completo de Compra de Recompensa en el Bazar Mágico

**Flujo:** El niño navega al Bazar, selecciona una recompensa y la compra.

| Escenario | Monedas del Niño | Costo de Recompensa | Resultado Esperado |
|-----------|----------------|-------------------|-------------------|
| ✅ Compra exitosa | 200 | 50 | Recompensa añadida al inventario, saldo actualizado a 150 |
| ❌ Fondos insuficientes | 30 | 50 | Alerta SweetAlert2: "Monedas insuficientes" |
| ❌ Recompensa ya poseída | — | — | El botón muestra "✓ Equipar" en lugar de "Comprar" |

**Postcondición de éxito:** La recompensa aparece en el inventario del niño y puede ser equipada inmediatamente, cambiando la música de fondo y el estilo visual de la interfaz.

---

#### Caso BB-03: Finalización de un Nivel (Aprobado vs. Reprobado)

**Flujo:** El niño juega un nivel y el sistema calcula si pasó o no.

| Escenario | Aciertos | Total Preguntas | Umbral (`target_score`) | Resultado Esperado |
|-----------|----------|----------------|------------------------|-------------------|
| ✅ Aprobado | 8 | 10 | 7 | ¡Victoria! Confeti + monedas otorgadas + nivel desbloqueado |
| ❌ Reprobado | 5 | 10 | 7 | Animación de pérdida + monedas parciales + nivel no avanza |
| ✅ Aprobado (Nivel 10) | 15 | 20 | 14 | Victoria épica + Gran Dragón derrotado |

**Monedas otorgadas:** `aciertos × 5` independientemente de si pasa o no.

---

### 🔐 Protocolos de Integridad de Base de Datos

La base de datos implementa múltiples restricciones para garantizar que los datos sean siempre coherentes y que no existan registros huérfanos ni inconsistencias.

#### Protocolo ID-01: Claves Foráneas con Acciones Referenciales

El esquema define relaciones con acciones en cascada que mantienen la integridad automáticamente:

```sql
-- Al eliminar un usuario, sus hijos se eliminan en cascada
ALTER TABLE children
  ADD CONSTRAINT children_ibfk_1 
  FOREIGN KEY (user_id_parent) REFERENCES users(id) ON DELETE CASCADE;

-- Al eliminar un niño, su inventario se elimina en cascada
ALTER TABLE child_inventory
  ADD CONSTRAINT child_inventory_ibfk_1 
  FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE;

-- Si se elimina una recompensa equipada, el campo vuelve a NULL
ALTER TABLE children
  ADD CONSTRAINT fk_equipped_reward 
  FOREIGN KEY (equipped_reward_id) REFERENCES rewards(id) ON DELETE SET NULL;
```

**Efecto:** Nunca existirá un perfil de niño sin padre, ni un ítem de inventario sin un niño válido. La eliminación es segura y consistente.

---

#### Protocolo ID-02: Restricción de Unicidad de Email y Transacciones Atómicas

```sql
-- Garantiza que no puedan existir dos usuarios con el mismo correo
ALTER TABLE users
  ADD UNIQUE KEY email (email);
```

En el código PHP, todas las operaciones críticas que involucran múltiples tablas se envuelven en **transacciones PDO**:

```php
// Compra de recompensa: descuento de monedas + registro de inventario
$pdo->beginTransaction();
// UPDATE children SET coins = coins - ? ...
// INSERT INTO child_inventory ...
$pdo->commit(); // Solo si AMBAS operaciones son exitosas
// Si cualquiera falla → $pdo->rollBack()
```

**Efecto:** Es imposible que un niño pierda monedas sin recibir la recompensa, o que reciba una recompensa sin que se le descuenten las monedas.

---

## 📸 Galería de Capturas

### Pantalla de Inicio de Sesión
![Pantalla de Login con diseño candy y logo institucional](./assets/img/screenshots/01_login.png)

*Pantalla de acceso con diseño "candy" y branding institucional.*

---

### Mapa de Aventura (Hub Principal)
![Mapa de aventura con 10 nodos de nivel y personaje del jugador](./assets/img/screenshots/02_adventure_map.png)

*El mapa de aventura muestra los 10 niveles y la posición actual del personaje.*

---

### Batalla contra Jefe Final
![Pantalla de batalla con layout de libro: jefe a la izquierda, ejercicio a la derecha](./assets/img/screenshots/03_boss_battle.png)

*Layout de libro: ilustración del jefe y el ejercicio matemático en pantalla dividida.*

---

### Bazar Mágico (Tienda de Recompensas)
![Tienda con temas temáticos para niños y niñas, mostrando precios en monedas](./assets/img/screenshots/04_bazar.png)

*El Bazar Mágico muestra recompensas filtradas por el género del avatar seleccionado.*

---

### Panel de Progreso para Padres
![Dashboard con gráfico de aciertos vs fallas, estadísticas por nivel y recomendaciones](./assets/img/screenshots/05_dashboard.png)

*Dashboard del padre con gráfico de rendimiento Chart.js y análisis de áreas de refuerzo.*

---

### Arena PvP Local
![Pantalla dividida PvP con barras de vida, ecuación central y botones de respuesta por jugador](./assets/img/screenshots/06_pvp_arena.png)

*Modo PvP: pantalla dividida con barras de vida y controles independientes por teclado.*

---

### Panel de Administración
![Panel admin con estadísticas globales del sistema y gestión de usuarios](./assets/img/screenshots/07_admin_panel.png)

*Panel del administrador con estadísticas globales y gestión de cuentas.*

---

## 🤝 Contribución y Licencia

### Cómo Contribuir

1. Haz un **fork** del repositorio.
2. Crea una rama descriptiva: `git checkout -b feature/nueva-funcionalidad`
3. Realiza tus cambios y haz commit: `git commit -m "feat: descripción del cambio"`
4. Sube los cambios: `git push origin feature/nueva-funcionalidad`
5. Abre un **Pull Request** detallando los cambios realizados.

### Guía de Estilo de Commits

Seguimos la convención [Conventional Commits](https://www.conventionalcommits.org/):

| Prefijo | Uso |
|---------|-----|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de bug |
| `style:` | Cambios de estilo/UI sin lógica |
| `chore:` | Tareas de mantenimiento |
| `docs:` | Cambios en documentación |

### Licencia

Este proyecto fue desarrollado como **software educativo sin fines de lucro**. Todos los derechos reservados © 2026 — MathQuest Team.

El código se comparte para fines académicos y educativos. Si deseas utilizarlo en un entorno de producción o con fines comerciales, por favor contacta al autor original.

---

<div align="center">

**Hecho con ❤️ para hacer las matemáticas divertidas**

🧮 *"Cada problema resuelto es una batalla ganada"* ⚔️

</div>
