-- Database migration to create global_settings table
CREATE TABLE IF NOT EXISTS global_settings (
    setting_key VARCHAR(50) PRIMARY KEY,
    setting_value VARCHAR(255) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default values
INSERT IGNORE INTO global_settings (setting_key, setting_value) VALUES 
('game_timer_sec', '20'),
('base_reward_price', '200');
