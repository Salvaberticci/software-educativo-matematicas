

 Plan de Desarrollo Maestro:
MathQuest
Este documento establece la especificación completa del proyecto y detalla el plan de
desarrollo modular en dos fases secuenciales: 1) Desarrollo completo del Frontend y 2)
Desarrollo completo del Backend.
- Resumen Consolidado y Requisitos Críticos
Aspecto Detalle del Requisito Cumplimiento Técnico
Pila Tecnológica PHP 8+, MySQL (PDO),
HTML, Tailwind CSS, JS
## (ES6+).
Sentencias preparadas
para seguridad.
Estilo de Diseño Estética lúdica, infantil, "de
caramelo". Uso de Tailwind
CSS y fuentes de mano (ej.
Fredoka). Mobile-First.
Botones rounded-full,
sombras 3D, colores
pastel/vibrantes.
Modelo de Seguridad Tres roles: Admin,
Padre/Tutor, Niño.
Gestión de roles y
autenticación con
password_hash().
Análisis Forense Trazabilidad total de
acciones (login, búsqueda,
modificación).
Tabla audit_logs con
user_id, action_type,
timestamp.
Lógica ERP Los procesos deben tener
una respuesta registrada y
asegurar la integridad
transaccional.
Implementación de
transacciones atómicas (ej.
Módulo 7) y funciones de
logging obligatorio.
FASE 1: Desarrollo Completo del Frontend (UI/UX)
Esta fase se centra en la construcción de la interfaz de usuario completa para cada módulo,
utilizando HTML, Tailwind CSS, y JavaScript para la interactividad visual (simulando los datos
del Backend).
Módulo F1: Login y Gestión de Perfiles (Módulo 1)

Propósito: Interfaz para la autenticación de Padres/Admin y selección del perfil del Niño.
## Elemento Descripción Visual
Pantalla de Login Centrada, con una tarjeta grande de estilo
lúdico (borde redondeado, sombra). El
logo de MathQuest debe ser prominente y
colorido.
Formulario Campos de entrada grandes para Email y
Contraseña, con íconos temáticos (ej. una
llave, un sobre). Botón "Ingresar" estilo
caramelo.
Selector de Perfil (Post-Login) Después de iniciar sesión, una pantalla
simple muestra las tarjetas de los perfiles
de los niños (ej. "Juan - 2do Grado"). Cada
tarjeta tiene un avatar y un botón grande
"Jugar Ahora".
Módulo F2: Mapa de Niveles (Módulo 2)
Propósito: Visualizar la progresión y la selección de temas.
Elemento Descripción Visual Ejemplo (Simulado en
index.html)
Diseño Disposición de los niveles
como una cuadrícula de
burbujas o rocas
flotantes sobre un fondo
de "mapa de aventura".
Ver función
renderMapView() en
index.html.
Nivel Desbloqueado Botón burbuja brillante, con
un ícono de Estrella () y
color vibrante (ej. rosa o
verde). El botón es
interactivo.

Nivel Bloqueado Botón opaco o en escala
de grises, con un gran
icono de Candado (). El


botón es visiblemente
inactivo.
Nivel Completo Botón con marca de
Verificación (✅) o icono
de trofeo.

Módulo F3: Interfaz de Juego (Módulos 3, 4 y 5)
Propósito: El entorno central de interacción y validación.
Elemento Descripción Visual Ejemplo (Simulado en
index.html)
Panel de Pregunta Tarjeta centralizada y
destacada. Los números y
operadores son de
tipografía grande (6xl) y
colores contrastantes.
Ver función
renderGameView() en
index.html.
Marcador y Monedas Contador de preguntas
(5/10) y saldo de monedas
( 125) ubicados en la
parte superior, con diseño
de burbuja o píldora.

Temporizador Una barra de progreso o
círculo de color que se
agota visualmente (verde a
rojo) para añadir un
elemento de gamificación
de tiempo.
Barra roja animada en la
parte superior.
Campo de Respuesta Campo de entrada
numérico ancho, centrado
y con borde grueso para
fácil interacción táctil.

Feedback Visual Al acertar, la pantalla debe
tener un Resplandor
Verde o una Explosión de
Estrellas/Monedas
Clase .animate-pulse y
mensaje de feedback en
checkAnswer().

(simulando Lottie/GSAP).
Módulo F4: Galería de Recompensas (Módulo 7)
Propósito: La "Tienda" donde el niño gasta sus monedas.
## Elemento Descripción Visual
Layout Una cuadrícula de tarjetas de
recompensas (avatares, fondos, medallas).
Artículos Cada tarjeta muestra el artículo, el costo
en Monedas (ícono de moneda grande), y
un botón "Comprar" estilo caramelo.
Costo Si el niño no tiene suficientes monedas, el
botón "Comprar" debe estar desactivado
y la tarjeta ligeramente opaca.
Inventario Una pestaña o sección separada para
mostrar los artículos ya adquiridos.
Módulo F5: Dashboard de Padres y Admin (Módulo 8)
Propósito: Presentación de datos de progreso, auditoría y análisis.
Elemento Descripción Visual Ejemplo (Simulado en
index.html)
Diseño Más limpio y organizado,
utilizando tarjetas para
contener los gráficos y
tablas.
Uso de bg-gray-50 para
separar los paneles de
reportes.
Gráficos Uso de Chart.js (simulado)
para mostrar el desempeño
(ej. barra de puntaje
promedio). Colores claros.
Ver función initCharts() en
index.html.
Selector de Perfil Un dropdown prominente
para cambiar entre los
Selector simulado en
renderReportsView().

perfiles de los hijos (solo
para el Padre).
Tablas de Datos Brutos Secciones con tablas que
muestran los datos de la
BD (game_sessions y
audit_logs), cumpliendo el
requisito de mostrar "toda
la información".
Tabla HTML con sesiones
de juego en
renderReportsView().
FASE 2: Desarrollo Completo del Backend y Lógica
(PHP/MySQL)
Esta fase se centra en implementar la lógica de servidor, la seguridad y la persistencia de
datos para cada módulo, asegurando el cumplimiento de la lógica ERP y el Análisis Forense.
Módulo B1: Autenticación, Roles y Logs (Módulo 1 & 6)
Arquitectura: Configuración de la conexión PHP PDO y estructura de tablas fundamentales.
Requisito Crítico Lógica PHP / MySQL
Conexión Segura Usar PDO para la conexión con la base de
datos MySQL.
Tablas users (id, email, password_hash, role),
children (id, user_id_parent, grade,
avatar_id), audit_logs (todos los campos
forenses).
Login PHP usa password_verify() para
autenticación. La sesión PHP debe
almacenar el user_id y el role.
Función de Logging Crear una función log_action($user_id,
$type, $details) que inserte
inmediatamente un registro en audit_logs
ante cualquier intento de login,
modificación o proceso crítico.
Módulo B2: Generación de Contenido y Datos Maestros (Módulos 2 &

## 3)
Arquitectura: El backend define el contenido y el proceso de generación de problemas.
Requisito Crítico Lógica PHP / MySQL
Tabla de Niveles levels (id, grade, operation, min_val,
max_val, target_score). Maestro de Datos
administrable por el Admin.
Endpoint de Generación Crear api/generate_problem.php. Este
script recibe el level_id y ejecuta la lógica
de generación con rand(), asegurando que
cumpla con los límites de min_val y
max_val.
Seguridad PHP debe validar que el level_id recibido
por AJAX sea un entero y exista en la BD
(prevención de inyección).
Lógica de Problema Implementar la lógica para asegurar la
integridad de los problemas (ej. para
restas: num1 >= num2; para divisiones:
num1 % num2 == 0).
Módulo B3: Motor de Juego y Persistencia (Módulos 5 & 6)
Arquitectura: Manejo de la sesión de juego, validación de puntaje y registro forense.
Requisito Crítico Lógica PHP / MySQL
Tabla de Sesiones game_sessions (id, child_id, level_id,
score_correct, score_total, time_sec,
timestamp).
Endpoint de Guardado api/save_score.php. Recibe datos de la
sesión (vía AJAX).
Lógica ERP y Seguridad 1. Sanitización: Limpiar todos los datos de
entrada. 2. Revalidación: PHP debe
revalidar que los puntajes no sean
excesivamente altos o fraudulentos. 3. Log:

Llamar a log_action() para registrar la
finalización de la sesión antes de guardar.
Desbloqueo Si score_correct >= target_score para un
nivel, actualizar la tabla de niños para
marcar el siguiente nivel como
desbloqueado.
Módulo B4: Transacciones y Recompensas (Módulo 7)
Arquitectura: Gestión de la economía virtual y el cumplimiento transaccional.
Requisito Crítico Lógica PHP / MySQL
Tablas rewards (catálogo de avatares/ítems,
costo), child_inventory (child_id,
reward_id).
Monedas La tabla children debe tener la columna
coins. Las monedas se actualizan vía AJAX
cada vez que se acierta una pregunta.
Endpoint de Compra api/buy_reward.php. Recibe child_id y
reward_id.
Lógica ERP (Transacción Atómica) El proceso de compra debe usar
Transacciones MySQL: 1. Verificar coins
disponibles. 2. Iniciar Transacción. 3.
Restar monedas. 4. Insertar en
child_inventory. 5. Confirmar/Rollback. 6.
Llamar a log_action() registrando la
transacción.
Módulo B5: Consultas y Reportes (Módulo 8)
Arquitectura: PHP debe ejecutar consultas complejas para generar los informes solicitados.
Requisito Crítico Lógica PHP / MySQL
Consultas para Padres PHP debe filtrar todas las consultas por el
user_id del Padre logueado para mostrar

solo los datos de sus hijos.
Consulta Completa (ERP) Crear endpoints para el Admin que
permitan descargar o renderizar los datos
sin resumen (ej. SELECT * FROM
audit_logs ORDER BY timestamp DESC).
Consultas Agregadas Consultas SQL para calcular el promedio
de aciertos (AVG), el tiempo de respuesta
promedio (AVG(time_sec)), y el progreso
por nivel para alimentar los gráficos de
## Chart.js.
Seguridad del Reporte PHP debe asegurar que el Admin no pueda
ejecutar consultas SQL arbitrarias; solo las
consultas predefinidas deben estar
disponibles.
