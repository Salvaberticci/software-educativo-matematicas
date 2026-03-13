-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-03-2026 a las 02:53:21
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mathquest_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `audit_logs`
--

CREATE TABLE `audit_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `action_type` varchar(100) NOT NULL,
  `details` text DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `audit_logs`
--

INSERT INTO `audit_logs` (`id`, `user_id`, `action_type`, `details`, `timestamp`) VALUES
(1, 3, 'user_registered', 'Nuevo usuario registrado: salvatoreberticci19@gmail.com', '2026-01-10 18:00:36'),
(2, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-01-10 18:03:25'),
(3, 3, 'logout', NULL, '2026-01-10 18:04:17'),
(4, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-01-10 18:04:22'),
(5, 3, 'login_failed', 'Intento fallido para: asdasd@gmail.com', '2026-01-10 18:07:52'),
(6, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-01-10 18:08:00'),
(7, 3, 'child_profile_created', 'Nuevo perfil creado: Juan (Grado: 1)', '2026-01-10 18:08:12'),
(8, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-01-10 18:15:05'),
(9, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-01-10 18:20:14'),
(10, 3, 'game_session_saved', 'Niño ID: 4, Nivel ID: 1, Aciertos: 10', '2026-01-10 18:20:56'),
(11, 3, 'reward_purchased', 'Niño ID: 4 compró Reward ID: 1 (S├║per H├®roe)', '2026-01-10 18:21:06'),
(12, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-01-10 18:38:23'),
(13, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-01-10 18:54:58'),
(14, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-01-12 14:58:08'),
(15, 3, 'game_session_saved', 'Niño ID: 4, Nivel ID: 2, Aciertos: 10', '2026-01-12 14:59:10'),
(16, 3, 'logout', NULL, '2026-01-12 14:59:54'),
(17, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-01-12 20:56:03'),
(18, 3, 'logout', NULL, '2026-01-12 21:05:02'),
(19, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-01-12 21:05:07'),
(20, 3, 'logout', NULL, '2026-01-14 20:26:16'),
(21, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-01-14 20:26:26'),
(22, 3, 'logout', NULL, '2026-01-14 20:56:35'),
(23, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-01-14 20:59:07'),
(24, 3, 'game_session_saved', 'Niño ID: 4, Nivel ID: 2, Aciertos: 3', '2026-01-14 21:00:19'),
(25, 3, 'logout', NULL, '2026-01-14 21:01:57'),
(26, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-01-14 21:02:04'),
(27, 3, 'logout', NULL, '2026-01-14 21:04:03'),
(28, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-01-14 21:04:07'),
(29, 3, 'game_session_saved', 'Niño ID: 4, Nivel ID: 3, Aciertos: 8', '2026-01-14 21:04:54'),
(30, 3, 'reward_purchased', 'Niño ID: 4 compró Reward ID: 2 (Astronauta)', '2026-01-14 21:18:51'),
(31, 3, 'logout', NULL, '2026-01-14 21:20:24'),
(32, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-01-14 21:20:31'),
(33, 3, 'logout', NULL, '2026-01-14 21:26:49'),
(34, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-01-14 21:26:53'),
(35, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-01-14 21:33:09'),
(36, 3, 'logout', NULL, '2026-01-14 21:33:36'),
(37, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-01-14 21:33:40'),
(38, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-01-22 20:24:36'),
(39, 3, 'game_session_saved', 'Niño ID: 4, Nivel ID: 4, Aciertos: 6', '2026-01-22 20:25:43'),
(40, 3, 'game_session_saved', 'Niño ID: 4, Nivel ID: 4, Aciertos: 7', '2026-01-22 20:27:43'),
(41, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-02-23 17:15:27'),
(42, 3, 'logout', NULL, '2026-02-23 17:16:46'),
(43, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-02-23 17:16:51'),
(44, 4, 'user_registered', 'Nuevo usuario registrado: maria@gmail.com', '2026-02-24 23:42:31'),
(45, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-02-25 02:20:41'),
(46, 3, 'logout', NULL, '2026-02-25 02:20:54'),
(47, 4, 'login_success', 'Usuario logueado: maria@gmail.com', '2026-02-25 02:21:05'),
(48, 4, 'logout', NULL, '2026-02-25 19:41:23'),
(49, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-02-25 20:08:14'),
(50, 3, 'game_session_saved', 'Niño ID: 4, Nivel ID: 5, Aciertos: 10', '2026-02-25 20:14:13'),
(51, 3, 'game_session_saved', 'Niño ID: 4, Nivel ID: 6, Aciertos: 6', '2026-02-25 20:14:59'),
(52, 3, 'game_session_saved', 'Niño ID: 4, Nivel ID: 6, Aciertos: 8', '2026-02-25 20:16:41'),
(53, 3, 'reward_purchased', 'Niño ID: 4 compró Reward ID: 3 (Dinosaurio)', '2026-02-25 20:17:00'),
(54, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-02-25 21:29:56'),
(55, 3, 'reward_purchased', 'Niño ID: 4 compró Reward ID: 4 (Dragón Loco)', '2026-02-25 21:31:27'),
(56, 3, 'reward_purchased', 'Niño ID: 4 compró Reward ID: 5 (Fondo Espacial)', '2026-02-25 21:31:42'),
(57, 3, 'reward_purchased', 'Niño ID: 4 compró Reward ID: 6 (Corona Real)', '2026-02-25 21:31:51'),
(58, 3, 'game_session_saved', 'Niño ID: 3, Nivel ID: 1, Aciertos: 10', '2026-02-25 21:55:54'),
(59, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-02-27 20:23:35'),
(60, 3, 'child_profile_created', 'Nuevo perfil creado: Olay (Grado: 2)', '2026-02-27 20:24:15'),
(61, 3, 'game_session_saved', 'Niño ID: 6, Nivel ID: 1, Aciertos: 10', '2026-02-27 20:25:22'),
(62, 3, 'reward_purchased', 'Niño ID: 6 compró Reward ID: 1 (Súper Héroe)', '2026-02-27 20:25:50'),
(63, 3, 'logout', NULL, '2026-02-27 20:28:57'),
(64, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-02-27 20:29:09'),
(65, 3, 'logout', NULL, '2026-02-27 20:31:58'),
(66, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-02-27 20:32:06'),
(67, 3, 'logout', NULL, '2026-02-27 20:45:58'),
(68, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-02-27 20:47:07'),
(69, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-03-04 17:24:43'),
(70, 3, 'logout', NULL, '2026-03-04 17:24:55'),
(71, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-03-09 15:27:11'),
(72, 3, 'reward_purchased', 'Niño ID: 3 compró Reward ID: 1 (Súper Héroe)', '2026-03-09 15:27:35'),
(73, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-03-10 18:03:19'),
(74, 3, 'reward_purchased', 'Niño ID: 4 compró Reward ID: 1 (Pokémon: Horizontes)', '2026-03-10 18:04:34'),
(75, 3, 'reward_purchased', 'Niño ID: 4 compró Reward ID: 2 (Ben 10)', '2026-03-10 21:43:30'),
(76, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-03-10 21:47:27'),
(77, 3, 'reward_purchased', 'Niño ID: 4 compró Reward ID: 10 (Dragon Ball)', '2026-03-10 21:48:25'),
(78, 3, 'reward_purchased', 'Niño ID: 4 compró Reward ID: 6 (Avatar: La leyenda de Aang)', '2026-03-10 21:55:34'),
(79, 3, 'reward_purchased', 'Niño ID: 6 compró Reward ID: 11 (Miraculous Ladybug)', '2026-03-10 21:56:15'),
(80, 3, 'reward_purchased', 'Niño ID: 4 compró Reward ID: 4 (Los Jóvenes Titanes)', '2026-03-10 22:06:20'),
(81, 3, 'reward_purchased', 'Niño ID: 4 compró Reward ID: 5 (Sonic Prime)', '2026-03-10 22:07:49'),
(82, 3, 'reward_purchased', 'Niño ID: 4 compró Reward ID: 9 (Bob Esponja)', '2026-03-10 22:09:27'),
(83, 3, 'reward_purchased', 'Niño ID: 4 compró Reward ID: 7 (Paw Patrol)', '2026-03-10 22:10:42'),
(84, 3, 'reward_purchased', 'Niño ID: 6 compró Reward ID: 18 (Princesas de Disney)', '2026-03-10 22:11:40'),
(85, 3, 'reward_purchased', 'Niño ID: 6 compró Reward ID: 16 (El Club Winx)', '2026-03-10 22:13:03'),
(86, 3, 'reward_purchased', 'Niño ID: 6 compró Reward ID: 14 (My Little Pony)', '2026-03-10 22:20:06'),
(87, 3, 'reward_purchased', 'Niño ID: 3 compró Reward ID: 1 (Pokémon: Horizontes)', '2026-03-10 22:33:34'),
(88, 3, 'reward_purchased', 'Niño ID: 3 compró Reward ID: 2 (Ben 10)', '2026-03-10 22:34:17'),
(89, 3, 'reward_purchased', 'Niño ID: 3 compró Reward ID: 10 (Dragon Ball)', '2026-03-10 22:34:51'),
(90, 3, 'reward_purchased', 'Niño ID: 6 compró Reward ID: 15 (Barbie)', '2026-03-10 22:36:15'),
(91, 3, 'reward_purchased', 'Niño ID: 3 compró Reward ID: 8 (Jurassic World)', '2026-03-11 13:14:15'),
(92, 3, 'reward_purchased', 'Niño ID: 3 compró Reward ID: 9 (Bob Esponja)', '2026-03-11 13:14:54'),
(93, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-03-11 20:34:40'),
(94, 3, 'logout', NULL, '2026-03-11 20:45:35'),
(95, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-03-11 21:22:35'),
(96, 3, 'reward_purchased', 'Niño ID: 3 compró Reward ID: 3 (LEGO Ninjago)', '2026-03-11 21:26:46'),
(97, 3, 'reward_purchased', 'Niño ID: 3 compró Reward ID: 4 (Los Jóvenes Titanes)', '2026-03-11 21:27:16'),
(98, 3, 'game_session_saved', 'Niño ID: 6, Nivel ID: 2, Aciertos: 9', '2026-03-11 21:43:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `children`
--

CREATE TABLE `children` (
  `id` int(11) NOT NULL,
  `user_id_parent` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `grade` int(11) NOT NULL,
  `avatar_id` int(11) DEFAULT 1,
  `coins` int(11) DEFAULT 0,
  `current_level` int(11) DEFAULT 1,
  `equipped_reward_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `children`
--

INSERT INTO `children` (`id`, `user_id_parent`, `name`, `grade`, `avatar_id`, `coins`, `current_level`, `equipped_reward_id`) VALUES
(1, 2, 'Juan', 2, 1, 0, 1, NULL),
(2, 2, 'Sofia', 1, 1, 0, 1, NULL),
(3, 3, 'Explorador', 1, 1, 150, 2, 4),
(4, 3, 'Juan', 1, 1, 800, 7, 7),
(5, 4, 'Explorador', 1, 1, 0, 1, NULL),
(6, 3, 'Olay', 2, 2, 1795, 3, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `child_inventory`
--

CREATE TABLE `child_inventory` (
  `id` int(11) NOT NULL,
  `child_id` int(11) NOT NULL,
  `reward_id` int(11) NOT NULL,
  `purchased_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `child_inventory`
--

INSERT INTO `child_inventory` (`id`, `child_id`, `reward_id`, `purchased_at`) VALUES
(9, 4, 1, '2026-03-10 18:04:34'),
(10, 4, 2, '2026-03-10 21:43:30'),
(11, 4, 10, '2026-03-10 21:48:25'),
(12, 4, 6, '2026-03-10 21:55:34'),
(13, 6, 11, '2026-03-10 21:56:15'),
(14, 4, 4, '2026-03-10 22:06:20'),
(15, 4, 5, '2026-03-10 22:07:49'),
(16, 4, 9, '2026-03-10 22:09:27'),
(17, 4, 7, '2026-03-10 22:10:42'),
(18, 6, 18, '2026-03-10 22:11:40'),
(19, 6, 16, '2026-03-10 22:13:03'),
(20, 6, 14, '2026-03-10 22:20:06'),
(21, 3, 1, '2026-03-10 22:33:34'),
(22, 3, 2, '2026-03-10 22:34:17'),
(23, 3, 10, '2026-03-10 22:34:51'),
(24, 6, 15, '2026-03-10 22:36:15'),
(25, 3, 8, '2026-03-11 13:14:15'),
(26, 3, 9, '2026-03-11 13:14:54'),
(27, 3, 3, '2026-03-11 21:26:46'),
(28, 3, 4, '2026-03-11 21:27:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `game_sessions`
--

CREATE TABLE `game_sessions` (
  `id` int(11) NOT NULL,
  `child_id` int(11) NOT NULL,
  `level_id` int(11) NOT NULL,
  `score_correct` int(11) NOT NULL,
  `score_total` int(11) NOT NULL,
  `time_sec` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `game_sessions`
--

INSERT INTO `game_sessions` (`id`, `child_id`, `level_id`, `score_correct`, `score_total`, `time_sec`, `timestamp`) VALUES
(1, 4, 1, 10, 10, 38, '2026-01-10 18:20:56'),
(2, 4, 2, 10, 10, 48, '2026-01-12 14:59:10'),
(3, 4, 2, 3, 10, 26, '2026-01-14 21:00:18'),
(4, 4, 3, 8, 10, 44, '2026-01-14 21:04:54'),
(5, 4, 4, 6, 10, 59, '2026-01-22 20:25:43'),
(6, 4, 4, 7, 10, 51, '2026-01-22 20:27:43'),
(7, 4, 5, 10, 10, 29, '2026-02-25 20:14:13'),
(8, 4, 6, 6, 10, 41, '2026-02-25 20:14:59'),
(9, 4, 6, 8, 10, 42, '2026-02-25 20:16:41'),
(10, 1, 3, 8, 10, 58, '2026-02-20 02:52:45'),
(11, 1, 3, 6, 10, 48, '2026-02-21 02:52:45'),
(12, 1, 3, 10, 10, 119, '2026-02-22 02:52:45'),
(13, 1, 3, 6, 10, 68, '2026-02-22 02:52:45'),
(14, 1, 1, 7, 10, 108, '2026-02-22 02:52:45'),
(15, 1, 3, 9, 10, 92, '2026-02-23 02:52:45'),
(16, 1, 3, 10, 10, 70, '2026-02-23 02:52:45'),
(17, 1, 1, 8, 10, 91, '2026-02-23 02:52:45'),
(18, 1, 1, 10, 10, 50, '2026-02-24 02:52:45'),
(19, 1, 1, 7, 10, 52, '2026-02-25 02:52:45'),
(20, 1, 3, 10, 10, 82, '2026-02-25 02:52:45'),
(21, 1, 1, 7, 10, 74, '2026-02-25 02:52:45'),
(22, 1, 3, 8, 10, 72, '2026-02-26 02:52:45'),
(23, 1, 1, 8, 10, 75, '2026-02-26 02:52:45'),
(24, 1, 2, 9, 10, 55, '2026-02-26 02:52:45'),
(25, 2, 2, 4, 10, 46, '2026-02-20 02:52:45'),
(26, 2, 3, 9, 10, 43, '2026-02-21 02:52:45'),
(27, 2, 3, 5, 10, 54, '2026-02-21 02:52:45'),
(28, 2, 2, 6, 10, 38, '2026-02-22 02:52:45'),
(29, 2, 1, 9, 10, 106, '2026-02-23 02:52:45'),
(30, 2, 3, 10, 10, 91, '2026-02-24 02:52:45'),
(31, 2, 1, 9, 10, 55, '2026-02-24 02:52:45'),
(32, 2, 1, 10, 10, 77, '2026-02-25 02:52:45'),
(33, 2, 1, 7, 10, 95, '2026-02-25 02:52:45'),
(34, 2, 1, 7, 10, 42, '2026-02-26 02:52:45'),
(35, 2, 2, 10, 10, 107, '2026-02-26 02:52:45'),
(36, 2, 3, 8, 10, 72, '2026-02-26 02:52:45'),
(37, 3, 2, 4, 10, 91, '2026-02-20 02:52:45'),
(38, 3, 3, 10, 10, 37, '2026-02-21 02:52:45'),
(39, 3, 1, 9, 10, 79, '2026-02-21 02:52:45'),
(40, 3, 1, 7, 10, 111, '2026-02-21 02:52:45'),
(41, 3, 3, 9, 10, 98, '2026-02-22 02:52:45'),
(42, 3, 3, 8, 10, 118, '2026-02-22 02:52:45'),
(43, 3, 3, 9, 10, 84, '2026-02-23 02:52:45'),
(44, 3, 1, 8, 10, 44, '2026-02-24 02:52:45'),
(45, 3, 1, 10, 10, 32, '2026-02-24 02:52:45'),
(46, 3, 2, 6, 10, 96, '2026-02-24 02:52:45'),
(47, 3, 2, 9, 10, 34, '2026-02-25 02:52:45'),
(48, 3, 2, 10, 10, 38, '2026-02-25 02:52:45'),
(49, 3, 3, 9, 10, 109, '2026-02-26 02:52:45'),
(50, 4, 1, 6, 10, 118, '2026-02-20 02:52:45'),
(51, 4, 2, 9, 10, 108, '2026-02-20 02:52:45'),
(52, 4, 3, 9, 10, 65, '2026-02-21 02:52:45'),
(53, 4, 3, 10, 10, 77, '2026-02-21 02:52:45'),
(54, 4, 2, 10, 10, 30, '2026-02-22 02:52:45'),
(55, 4, 3, 6, 10, 105, '2026-02-23 02:52:45'),
(56, 4, 1, 7, 10, 103, '2026-02-24 02:52:45'),
(57, 4, 1, 9, 10, 57, '2026-02-25 02:52:45'),
(58, 4, 3, 10, 10, 111, '2026-02-25 02:52:45'),
(59, 4, 2, 7, 10, 61, '2026-02-25 02:52:45'),
(60, 4, 1, 10, 10, 108, '2026-02-26 02:52:45'),
(61, 5, 3, 10, 10, 47, '2026-02-20 02:52:45'),
(62, 5, 3, 10, 10, 59, '2026-02-21 02:52:45'),
(63, 5, 3, 10, 10, 62, '2026-02-21 02:52:45'),
(64, 5, 3, 10, 10, 91, '2026-02-21 02:52:45'),
(65, 5, 2, 6, 10, 114, '2026-02-22 02:52:45'),
(66, 5, 2, 8, 10, 71, '2026-02-23 02:52:45'),
(67, 5, 1, 8, 10, 78, '2026-02-23 02:52:45'),
(68, 5, 3, 7, 10, 48, '2026-02-24 02:52:45'),
(69, 5, 1, 8, 10, 81, '2026-02-24 02:52:45'),
(70, 5, 2, 10, 10, 103, '2026-02-25 02:52:45'),
(71, 5, 2, 8, 10, 104, '2026-02-25 02:52:45'),
(72, 5, 1, 10, 10, 85, '2026-02-26 02:52:45'),
(73, 3, 1, 10, 10, 40, '2026-02-25 21:55:54'),
(74, 6, 1, 10, 10, 32, '2026-02-27 20:25:22'),
(75, 6, 2, 9, 10, 28, '2026-03-11 21:43:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `levels`
--

CREATE TABLE `levels` (
  `id` int(11) NOT NULL,
  `grade` int(11) NOT NULL,
  `operation` varchar(20) NOT NULL,
  `min_val` int(11) NOT NULL,
  `max_val` int(11) NOT NULL,
  `target_score` int(11) DEFAULT 7,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `levels`
--

INSERT INTO `levels` (`id`, `grade`, `operation`, `min_val`, `max_val`, `target_score`, `created_at`) VALUES
(1, 1, 'suma', 1, 10, 7, '2026-01-10 17:52:38'),
(2, 1, 'resta', 1, 10, 7, '2026-01-10 17:52:38'),
(3, 2, 'suma', 5, 20, 7, '2026-01-10 17:52:38'),
(4, 2, 'resta', 5, 20, 7, '2026-01-10 17:52:38'),
(5, 3, 'multiplicacion', 1, 5, 7, '2026-01-10 17:52:38'),
(6, 3, 'multiplicacion', 1, 10, 7, '2026-01-10 17:52:38'),
(7, 4, 'multiplicacion', 5, 12, 7, '2026-03-11 21:14:19'),
(8, 4, 'division', 2, 10, 7, '2026-03-11 21:14:19'),
(9, 5, 'division', 5, 20, 7, '2026-03-11 21:14:19'),
(10, 6, 'aleatorio', 10, 50, 7, '2026-03-11 21:14:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rewards`
--

CREATE TABLE `rewards` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `cost` int(11) NOT NULL,
  `icon` varchar(150) DEFAULT NULL,
  `category` varchar(50) DEFAULT 'avatar',
  `target_avatar_id` int(11) DEFAULT 0,
  `theme_class` varchar(50) DEFAULT NULL,
  `bgm_file` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `rewards`
--

INSERT INTO `rewards` (`id`, `name`, `cost`, `icon`, `category`, `target_avatar_id`, `theme_class`, `bgm_file`) VALUES
(1, 'Pokémon: Horizontes', 50, 'icon_pokemon.png', 'avatar', 1, 'theme-pokemon', 'bgm_pokemon.mp3'),
(2, 'Ben 10', 100, 'icon_ben10.png', 'avatar', 1, 'theme-ben10', 'bgm_ben10.mp3'),
(3, 'LEGO Ninjago', 150, 'icon_ninjago.png', 'avatar', 1, 'theme-ninjago', 'bgm_ninjago.mp3'),
(4, 'Los Jóvenes Titanes', 200, 'icon_teentitans.png', 'avatar', 1, 'theme-teentitans', 'bgm_teentitans.mp3'),
(5, 'Sonic Prime', 250, 'icon_sonic.png', 'avatar', 1, 'theme-sonic', 'bgm_sonic.mp3'),
(6, 'Avatar: La leyenda de Aang', 300, 'icon_avatar.png', 'avatar', 1, 'theme-avatar', 'bgm_avatar.mp3'),
(7, 'Paw Patrol', 350, 'icon_pawpatrol.png', 'avatar', 1, 'theme-pawpatrol', 'bgm_pawpatrol.mp3'),
(8, 'Jurassic World', 400, 'icon_jurassic.png', 'avatar', 1, 'theme-jurassic', 'bgm_jurassic.mp3'),
(9, 'Bob Esponja', 450, 'icon_spongebob.png', 'avatar', 1, 'theme-spongebob', 'bgm_spongebob.mp3'),
(10, 'Dragon Ball', 500, 'icon_dragonball.png', 'avatar', 1, 'theme-dragonball', 'bgm_dragonball.mp3'),
(11, 'Miraculous Ladybug', 50, 'icon_ladybug.png', 'avatar', 2, 'theme-ladybug', 'bgm_ladybug.mp3'),
(12, 'Gabby\'s Dollhouse', 100, 'icon_gabby.png', 'avatar', 2, 'theme-gabby', 'bgm_gabby.mp3'),
(13, 'Bluey', 150, 'icon_bluey.png', 'avatar', 2, 'theme-bluey', 'bgm_bluey.mp3'),
(14, 'My Little Pony', 200, 'icon_mlp.png', 'avatar', 2, 'theme-mlp', 'bgm_mlp.mp3'),
(15, 'Barbie', 250, 'icon_barbie.png', 'avatar', 2, 'theme-barbie', 'bgm_barbie.mp3'),
(16, 'El Club Winx', 300, 'icon_winx.png', 'avatar', 2, 'theme-winx', 'bgm_winx.mp3'),
(17, 'Peppa Pig', 350, 'icon_peppa.png', 'avatar', 2, 'theme-peppa', 'bgm_peppa.mp3'),
(18, 'Princesas de Disney', 400, 'icon_disneyprincess.png', 'avatar', 2, 'theme-disneyprincess', 'bgm_disneyprincess.mp3'),
(19, 'Princesita Sofía', 450, 'icon_sofia.png', 'avatar', 2, 'theme-sofia', 'bgm_sofia.mp3'),
(20, 'Masha y el Oso', 500, 'icon_masha.png', 'avatar', 2, 'theme-masha', 'bgm_masha.mp3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','parent') DEFAULT 'parent',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password_hash`, `role`, `created_at`) VALUES
(1, 'admin@mathquest.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '2026-01-10 17:52:38'),
(2, 'papa@ejemplo.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'parent', '2026-01-10 17:52:38'),
(3, 'salvatoreberticci19@gmail.com', '$2y$10$r8ePNamCIV58b8M0JO4dwOyb3WtmxJcFTz3D5n/tofEg/bKtgZp5O', 'parent', '2026-01-10 18:00:36'),
(4, 'maria@gmail.com', '$2y$10$dVuHuiAIdcWGeOtiGL/U1u.eRTFyGMqCRegh5ZWH8AOd1fF0SdKee', 'parent', '2026-02-24 23:42:31');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `children`
--
ALTER TABLE `children`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id_parent` (`user_id_parent`),
  ADD KEY `fk_equipped_reward` (`equipped_reward_id`);

--
-- Indices de la tabla `child_inventory`
--
ALTER TABLE `child_inventory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `child_id` (`child_id`),
  ADD KEY `reward_id` (`reward_id`);

--
-- Indices de la tabla `game_sessions`
--
ALTER TABLE `game_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `child_id` (`child_id`),
  ADD KEY `level_id` (`level_id`);

--
-- Indices de la tabla `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rewards`
--
ALTER TABLE `rewards`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT de la tabla `children`
--
ALTER TABLE `children`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `child_inventory`
--
ALTER TABLE `child_inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `game_sessions`
--
ALTER TABLE `game_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT de la tabla `levels`
--
ALTER TABLE `levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `rewards`
--
ALTER TABLE `rewards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `children`
--
ALTER TABLE `children`
  ADD CONSTRAINT `children_ibfk_1` FOREIGN KEY (`user_id_parent`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_equipped_reward` FOREIGN KEY (`equipped_reward_id`) REFERENCES `rewards` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `child_inventory`
--
ALTER TABLE `child_inventory`
  ADD CONSTRAINT `child_inventory_ibfk_1` FOREIGN KEY (`child_id`) REFERENCES `children` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `child_inventory_ibfk_2` FOREIGN KEY (`reward_id`) REFERENCES `rewards` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `game_sessions`
--
ALTER TABLE `game_sessions`
  ADD CONSTRAINT `game_sessions_ibfk_1` FOREIGN KEY (`child_id`) REFERENCES `children` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `game_sessions_ibfk_2` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
