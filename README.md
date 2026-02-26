# MathQuest 📚

MathQuest es un software educativo diseñado para el aprendizaje de matemáticas en niños, con una estética lúdica y gamificada (estilo "caramelo"). El sistema permite a los niños practicar operaciones matemáticas mientras ganan recompensas y desbloquean niveles, proporcionando al mismo tiempo herramientas de monitoreo para padres y administradores.

## 🚀 Características Principales

- **🎮 Gamificación**: Mapa de niveles interactivo, sistema de monedas y tienda de recompensas (avatares, fondos).
- **🛡️ Seguridad y Roles**:
  - **Niño**: Acceso al juego y recompensas.
  - **Padre/Tutor**: Monitoreo de progreso de sus hijos.
  - **Administrador**: Gestión total del sistema y auditoría.
- **🔍 Análisis Forense**: Trazabilidad completa de acciones mediante logs de auditoría (`audit_logs`).
- **💼 Lógica ERP**: Procesos transaccionales robustos y atómicos para asegurar la integridad de los datos.
- **📱 Mobile-First**: Diseño responsivo optimizado para dispositivos móviles utilizando Tailwind CSS.

## 🛠️ Stack Tecnológico

- **Backend**: PHP 8+ (PDO para base de datos).
- **Base de Datos**: MySQL.
- **Frontend**: HTML5, Tailwind CSS, JavaScript (ES6+).
- **Librerías**: Chart.js (para reportes visuales).

## 📋 Requisitos e Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Salvaberticci/software-educativo-matematicas.git
   ```

2. **Configuración de Base de Datos**:
   - Crea una base de datos llamada `mathquest_db`.
   - Importa el archivo `database.sql`.

3. **Configuración de Conexión**:
   - Edita el archivo `includes/db.php` con tus credenciales de MySQL.

4. **Ejecución**:
   - Coloca el proyecto en tu servidor local (XAMPP, WAMP, Laragon, etc.).
   - Accede a través de `http://localhost/software-educativo-matematicas`.

## 📂 Estructura del Proyecto

- `api/`: Endpoints PHP para la lógica de negocio y comunicación AJAX.
- `assets/`: Recursos estáticos (imágenes, fuentes, sonidos).
- `css/`: Estilos personalizados (además de Tailwind).
- `includes/`: Scripts de utilidad y conexión a BD.
- `js/`: Lógica del lado del cliente.
- `database.sql`: Esquema inicial de la base de datos.
