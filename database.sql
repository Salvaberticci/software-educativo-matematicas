-- MathQuest Database Schema
CREATE DATABASE IF NOT EXISTS mathquest_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mathquest_db;

-- 1. Users Table (Parents/Admins)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'parent') DEFAULT 'parent',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Children Table
CREATE TABLE IF NOT EXISTS children (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id_parent INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    grade INT NOT NULL,
    avatar_id INT DEFAULT 1,
    coins INT DEFAULT 0,
    current_level INT DEFAULT 1,
    FOREIGN KEY (user_id_parent) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Levels Table (Master Data)
CREATE TABLE IF NOT EXISTS levels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    grade INT NOT NULL,
    operation VARCHAR(20) NOT NULL, -- 'suma', 'resta', 'multiplicacion'
    min_val INT NOT NULL,
    max_val INT NOT NULL,
    target_score INT DEFAULT 7,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Game Sessions Table
CREATE TABLE IF NOT EXISTS game_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    child_id INT NOT NULL,
    level_id INT NOT NULL,
    score_correct INT NOT NULL,
    score_total INT NOT NULL,
    time_sec INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
    FOREIGN KEY (level_id) REFERENCES levels(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Audit Logs Table (Forensic Analysis)
CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL, -- Can be null for system actions or failed logins
    action_type VARCHAR(100) NOT NULL,
    details TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 6. Rewards Catalog Table
CREATE TABLE IF NOT EXISTS rewards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cost INT NOT NULL,
    icon VARCHAR(10) NOT NULL,
    category VARCHAR(50) DEFAULT 'avatar'
) ENGINE=InnoDB;

-- 7. Child Inventory Table
CREATE TABLE IF NOT EXISTS child_inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    child_id INT NOT NULL,
    reward_id INT NOT NULL,
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
    FOREIGN KEY (reward_id) REFERENCES rewards(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Initial Seed Data
INSERT INTO users (email, password_hash, role) VALUES 
('admin@mathquest.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'), -- password: password
('papa@ejemplo.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'parent');

INSERT INTO children (user_id_parent, name, grade) VALUES 
(2, 'Juan', 2),
(2, 'Sofia', 1);

INSERT INTO levels (grade, operation, min_val, max_val, target_score) VALUES 
(1, 'suma', 1, 10, 7),
(1, 'resta', 1, 10, 7),
(2, 'suma', 5, 20, 7),
(2, 'resta', 5, 20, 7),
(3, 'multiplicacion', 1, 5, 7),
(3, 'multiplicacion', 1, 10, 7);

INSERT INTO rewards (name, cost, icon) VALUES 
('Súper Héroe', 50, '🦸‍♂️'),
('Astronauta', 100, '👨‍🚀'),
('Dinosaurio', 150, 'Rex'),
('Dragón Loco', 200, '🐉'),
('Fondo Espacial', 300, '🌌'),
('Corona Real', 500, '👑');
