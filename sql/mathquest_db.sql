-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-03-2026 a las 18:29:36
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
(98, 3, 'game_session_saved', 'Niño ID: 6, Nivel ID: 2, Aciertos: 9', '2026-03-11 21:43:58'),
(99, 3, 'logout', NULL, '2026-03-13 18:40:36'),
(100, NULL, 'logout', NULL, '2026-03-13 18:40:36'),
(101, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-03-13 18:43:00'),
(102, 3, 'reward_purchased', 'Niño ID: 6 compró Reward ID: 19 (Princesita Sofía)', '2026-03-13 18:46:45'),
(103, 3, 'logout', NULL, '2026-03-13 18:54:11'),
(104, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-03-13 18:56:16'),
(105, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-03-13 18:58:22'),
(106, 3, 'reward_purchased', 'Niño ID: 4 compró Reward ID: 3 (LEGO Ninjago)', '2026-03-13 19:00:03'),
(107, 3, 'reward_purchased', 'Niño ID: 4 compró Reward ID: 8 (Jurassic World)', '2026-03-13 19:00:36'),
(108, 3, 'reward_purchased', 'Niño ID: 6 compró Reward ID: 12 (Gabby\'s Dollhouse)', '2026-03-13 19:01:13'),
(109, 3, 'reward_purchased', 'Niño ID: 6 compró Reward ID: 13 (Bluey)', '2026-03-13 19:01:22'),
(110, 3, 'reward_purchased', 'Niño ID: 6 compró Reward ID: 17 (Peppa Pig)', '2026-03-13 19:01:56'),
(111, 3, 'reward_purchased', 'Niño ID: 6 compró Reward ID: 20 (Masha y el Oso)', '2026-03-13 19:02:21'),
(112, 2, 'logout', NULL, '2026-03-16 17:36:45'),
(113, NULL, 'login_failed', 'Intento fallido para: test@mathquest.demo', '2026-03-16 17:37:07'),
(114, 5, 'login_success', 'Usuario logueado: test@mathquest.demo', '2026-03-16 17:37:14'),
(115, 5, 'game_session_saved', 'Niño ID: 7, Nivel ID: 9, Aciertos: 2', '2026-03-16 17:38:43'),
(116, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-03-16 18:37:25'),
(117, NULL, 'login_failed', 'Intento fallido para: admin@candyquest.demo', '2026-03-16 18:49:03'),
(118, NULL, 'login_failed', 'Intento fallido para: admin@candyquest.demo', '2026-03-16 18:49:09'),
(119, NULL, 'login_failed', 'Intento fallido para: admin@candyquest.demo', '2026-03-16 18:49:17'),
(120, NULL, 'login_failed', 'Intento fallido para: admin@candyquest.demo', '2026-03-16 18:50:00'),
(121, 1, 'login_success', 'Usuario logueado: admin@mathquest.com', '2026-03-16 18:50:25'),
(122, 1, 'logout', NULL, '2026-03-16 18:51:24'),
(123, 6, 'login_success', 'Usuario logueado: admin@candyquest.demo', '2026-03-16 18:51:30'),
(124, 6, 'child_profile_created', 'Nuevo perfil creado: prueba (Grado: 1)', '2026-03-16 18:51:38'),
(125, 6, 'admin_update_settings', 'Admin actualizó los ajustes globales', '2026-03-16 19:09:30'),
(126, 6, 'logout', NULL, '2026-03-16 19:09:37'),
(127, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-03-16 19:10:07'),
(128, 3, 'logout', NULL, '2026-03-16 19:10:10'),
(129, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-03-16 19:10:16'),
(130, 3, 'logout', NULL, '2026-03-16 19:10:18'),
(131, 4, 'login_success', 'Usuario logueado: maria@gmail.com', '2026-03-16 19:10:47'),
(132, 4, 'logout', NULL, '2026-03-16 19:18:07'),
(133, 8, 'login_success', 'Usuario logueado: tester@candyquest.demo', '2026-03-16 19:18:15'),
(134, 8, 'game_session_saved', 'Niño ID: 9, Nivel ID: 8, Aciertos: 0', '2026-03-16 20:18:20'),
(135, 8, 'game_session_saved', 'Niño ID: 9, Nivel ID: 5, Aciertos: 9', '2026-03-16 20:40:23'),
(136, 8, 'game_session_saved', 'Niño ID: 9, Nivel ID: 8, Aciertos: 0', '2026-03-16 21:01:34'),
(137, 8, 'game_session_saved', 'Niño ID: 9, Nivel ID: 8, Aciertos: 9', '2026-03-16 21:13:42'),
(138, 8, 'game_session_saved', 'Niño ID: 9, Nivel ID: 5, Aciertos: 8', '2026-03-16 21:14:42'),
(139, 8, 'game_session_saved', 'Niño ID: 9, Nivel ID: 4, Aciertos: 7', '2026-03-16 21:16:22'),
(140, 8, 'game_session_saved', 'Niño ID: 9, Nivel ID: 10, Aciertos: 16', '2026-03-16 21:20:08'),
(141, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-03-16 21:23:48'),
(142, 3, 'logout', NULL, '2026-03-16 21:23:52'),
(143, NULL, 'login_failed', 'Intento fallido para: test@mathquest.demo', '2026-03-16 21:23:59'),
(144, NULL, 'login_failed', 'Intento fallido para: test@mathquest.demo', '2026-03-16 21:24:06'),
(145, 5, 'login_success', 'Usuario logueado: test@mathquest.demo', '2026-03-16 21:25:04'),
(146, 5, 'logout', NULL, '2026-03-16 21:59:56'),
(147, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-03-16 22:00:01'),
(148, 3, 'logout', NULL, '2026-03-16 22:00:03'),
(149, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-03-16 22:00:21'),
(150, 3, 'game_session_saved', 'Niño ID: 3, Nivel ID: 1, Aciertos: 9', '2026-03-16 22:01:50'),
(151, 3, 'game_session_saved', 'Niño ID: 3, Nivel ID: 1, Aciertos: 10', '2026-03-16 22:02:32'),
(152, 3, 'logout', NULL, '2026-03-16 22:03:21'),
(153, 1, 'login_success', 'Usuario logueado: admin@mathquest.com', '2026-03-16 22:03:39'),
(154, 1, 'logout', NULL, '2026-03-16 22:03:58'),
(155, 3, 'login_success', 'Usuario logueado: salvatoreberticci19@gmail.com', '2026-03-16 22:05:57'),
(156, 3, 'game_session_saved', 'Niño ID: 3, Nivel ID: 2, Aciertos: 9', '2026-03-16 22:07:29'),
(157, 3, 'game_session_saved', 'Niño ID: 3, Nivel ID: 3, Aciertos: 10', '2026-03-16 22:08:36'),
(158, 3, 'reward_purchased', 'Niño ID: 3 compró Reward ID: 5 (Sonic Prime)', '2026-03-16 22:49:36'),
(159, 3, 'logout', NULL, '2026-03-17 16:27:11'),
(160, NULL, 'logout', NULL, '2026-03-17 16:27:11');

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
(3, 3, 'Explorador', 1, 1, 257, 4, 5),
(4, 3, 'Juan', 1, 1, 250, 7, 3),
(5, 4, 'Explorador', 1, 1, 0, 1, NULL),
(6, 3, 'Olay', 2, 2, 245, 3, NULL),
(7, 5, 'Demo Explorer', 6, 1, 9999, 11, NULL),
(8, 6, 'prueba', 1, 1, 0, 1, NULL),
(9, 8, 'Super Tester', 6, 1, 10244, 20, 1);

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
(28, 3, 4, '2026-03-11 21:27:16'),
(29, 6, 19, '2026-03-13 18:46:45'),
(30, 4, 3, '2026-03-13 19:00:03'),
(31, 4, 8, '2026-03-13 19:00:36'),
(32, 6, 12, '2026-03-13 19:01:13'),
(33, 6, 13, '2026-03-13 19:01:22'),
(34, 6, 17, '2026-03-13 19:01:56'),
(35, 6, 20, '2026-03-13 19:02:21'),
(36, 9, 1, '2026-03-16 19:12:20'),
(37, 9, 2, '2026-03-16 19:12:20'),
(38, 9, 3, '2026-03-16 19:12:20'),
(39, 9, 4, '2026-03-16 19:12:20'),
(40, 9, 5, '2026-03-16 19:12:20'),
(41, 9, 6, '2026-03-16 19:12:20'),
(42, 9, 7, '2026-03-16 19:12:20'),
(43, 9, 8, '2026-03-16 19:12:20'),
(44, 9, 9, '2026-03-16 19:12:20'),
(45, 9, 10, '2026-03-16 19:12:20'),
(46, 9, 11, '2026-03-16 19:12:20'),
(47, 9, 12, '2026-03-16 19:12:20'),
(48, 9, 13, '2026-03-16 19:12:20'),
(49, 9, 14, '2026-03-16 19:12:20'),
(50, 9, 15, '2026-03-16 19:12:20'),
(51, 9, 16, '2026-03-16 19:12:20'),
(52, 9, 17, '2026-03-16 19:12:20'),
(53, 9, 18, '2026-03-16 19:12:20'),
(54, 9, 19, '2026-03-16 19:12:20'),
(55, 9, 20, '2026-03-16 19:12:20'),
(56, 3, 5, '2026-03-16 22:49:36');

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
(77, 9, 1, 9, 10, 54, '2026-03-15 00:20:23'),
(78, 9, 1, 10, 10, 48, '2026-03-17 00:20:23'),
(79, 9, 1, 8, 10, 33, '2026-03-17 00:20:23'),
(80, 9, 1, 10, 10, 35, '2026-03-16 00:20:23'),
(81, 9, 1, 8, 10, 24, '2026-03-10 00:20:23'),
(82, 9, 2, 9, 10, 51, '2026-03-17 00:20:23'),
(83, 9, 2, 6, 10, 56, '2026-03-14 00:20:23'),
(84, 9, 2, 7, 10, 48, '2026-03-11 00:20:23'),
(85, 9, 2, 7, 10, 43, '2026-03-10 00:20:23'),
(86, 9, 2, 7, 10, 39, '2026-03-11 00:20:23'),
(87, 9, 3, 5, 10, 44, '2026-03-17 00:20:23'),
(88, 9, 3, 5, 10, 23, '2026-03-14 00:20:23'),
(89, 9, 3, 5, 10, 30, '2026-03-12 00:20:23'),
(90, 9, 4, 3, 10, 37, '2026-03-17 00:20:23'),
(91, 9, 4, 4, 10, 41, '2026-03-17 00:20:23'),
(92, 9, 4, 4, 10, 45, '2026-03-10 00:20:23'),
(93, 9, 4, 2, 10, 21, '2026-03-14 00:20:23'),
(94, 9, 5, 5, 10, 40, '2026-03-16 00:20:23'),
(95, 9, 5, 7, 10, 49, '2026-03-13 00:20:23'),
(96, 9, 5, 4, 10, 19, '2026-03-17 00:20:23'),
(97, 9, 5, 5, 10, 15, '2026-03-11 00:20:23'),
(98, 9, 5, 7, 10, 37, '2026-03-17 00:20:23'),
(99, 9, 6, 1, 10, 15, '2026-03-13 00:20:23'),
(100, 9, 6, 3, 10, 46, '2026-03-17 00:20:23'),
(101, 9, 6, 2, 10, 26, '2026-03-10 00:20:23'),
(102, 9, 6, 4, 10, 16, '2026-03-13 00:20:23'),
(103, 9, 7, 4, 10, 37, '2026-03-17 00:20:23'),
(104, 9, 7, 4, 10, 44, '2026-03-16 00:20:23'),
(105, 9, 7, 6, 10, 35, '2026-03-11 00:20:23'),
(106, 9, 7, 4, 10, 58, '2026-03-13 00:20:23'),
(107, 9, 8, 0, 10, 221, '2026-03-16 20:18:20'),
(108, 9, 5, 9, 10, 46, '2026-03-16 20:40:23'),
(109, 9, 8, 0, 10, 164, '2026-03-16 21:01:34'),
(110, 9, 8, 9, 10, 113, '2026-03-16 21:13:42'),
(111, 9, 5, 8, 10, 33, '2026-03-16 21:14:42'),
(112, 9, 4, 7, 10, 94, '2026-03-16 21:16:22'),
(113, 9, 10, 16, 20, 219, '2026-03-16 21:20:08'),
(114, 3, 1, 9, 10, 37, '2026-03-16 22:01:50'),
(115, 3, 1, 10, 10, 35, '2026-03-16 22:02:31'),
(116, 3, 2, 9, 10, 63, '2026-03-16 22:07:29'),
(117, 3, 3, 10, 10, 32, '2026-03-16 22:08:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `global_settings`
--

CREATE TABLE `global_settings` (
  `setting_key` varchar(50) NOT NULL,
  `setting_value` varchar(255) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `global_settings`
--

INSERT INTO `global_settings` (`setting_key`, `setting_value`, `updated_at`) VALUES
('base_reward_price', '200', '2026-03-16 19:04:58'),
('game_timer_sec', '20', '2026-03-16 19:04:58');

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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_questions` int(11) DEFAULT 10,
  `story_intro` text DEFAULT NULL,
  `boss_name` varchar(50) DEFAULT NULL,
  `boss_icon` varchar(50) DEFAULT NULL,
  `theme_id` varchar(30) DEFAULT 'forest'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `levels`
--

INSERT INTO `levels` (`id`, `grade`, `operation`, `min_val`, `max_val`, `target_score`, `created_at`, `total_questions`, `story_intro`, `boss_name`, `boss_icon`, `theme_id`) VALUES
(1, 2, 'suma', 1, 10, 7, '2026-03-16 17:40:59', 10, '¡Bienvenido al Bosque de las Sumas! El Duende Sumón ha escondido tus dulces. Resuelve estas sumas para recuperarlos.', 'Duende Sumón', 'boss_duende.png', 'forest'),
(2, 2, 'suma', 10, 50, 7, '2026-03-16 17:40:59', 10, 'El Gran Dragón de los Números está bloqueando el puente. ¡Necesitamos sumas poderosas para pasar!', 'Dragón Numérico', 'boss_dragon.png', 'lava'),
(3, 2, 'resta', 1, 10, 7, '2026-03-16 17:40:59', 10, '¡Oh no! El Mago Restador está desapareciendo las manzanas de la aldea. ¡Ayúdanos!', 'Mago Restador', 'boss_mago.png', 'magic'),
(4, 3, 'resta', 10, 50, 7, '2026-03-16 17:40:59', 10, NULL, NULL, NULL, 'forest'),
(5, 3, 'multiplicacion', 1, 5, 7, '2026-03-16 17:40:59', 10, 'La Reina Multiplicadora ha triplicado los problemas en el Reino de los Caramelos.', 'Reina Multiplicadora', 'boss_reina.png', 'candy'),
(6, 4, 'multiplicacion', 6, 10, 7, '2026-03-16 17:40:59', 10, NULL, NULL, NULL, 'forest'),
(7, 4, 'fraccion_basica', 2, 6, 7, '2026-03-16 17:40:59', 10, '¡Alerta de Pizza! El Chef Caos está cortando las pizzas de forma extraña. ¡Asegura las fracciones!', 'Chef Caos', 'boss_chef.png', 'pizzeria'),
(8, 5, 'fraccion_equiv', 2, 8, 7, '2026-03-16 17:40:59', 10, NULL, NULL, NULL, 'forest'),
(9, 5, 'aleatorio', 1, 50, 7, '2026-03-16 17:40:59', 10, NULL, NULL, NULL, 'forest'),
(10, 6, 'aleatorio', 1, 100, 14, '2026-03-16 17:40:59', 20, 'Has llegado al coraz¾n del Castillo Matemßtico. El Gran Drag¾n custodia el tesoro final. Solo el mßs sabio podrß derrotarlo.', 'Gran Drag¾n', 'boss_dragon.png', 'royal');

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
(1, 'Pokémon: Horizontes', 17, 'icon_pokemon.png', 'avatar', 1, 'theme-pokemon', 'bgm_pokemon.mp3'),
(2, 'Ben 10', 33, 'icon_ben10.png', 'avatar', 1, 'theme-ben10', 'bgm_ben10.mp3'),
(3, 'LEGO Ninjago', 50, 'icon_ninjago.png', 'avatar', 1, 'theme-ninjago', 'bgm_ninjago.mp3'),
(4, 'Los Jóvenes Titanes', 67, 'icon_teentitans.png', 'avatar', 1, 'theme-teentitans', 'bgm_teentitans.mp3'),
(5, 'Sonic Prime', 83, 'icon_sonic.png', 'avatar', 1, 'theme-sonic', 'bgm_sonic.mp3'),
(6, 'Avatar: La leyenda de Aang', 100, 'icon_avatar.png', 'avatar', 1, 'theme-avatar', 'bgm_avatar.mp3'),
(7, 'Paw Patrol', 117, 'icon_pawpatrol.png', 'avatar', 1, 'theme-pawpatrol', 'bgm_pawpatrol.mp3'),
(8, 'Jurassic World', 133, 'icon_jurassic.png', 'avatar', 1, 'theme-jurassic', 'bgm_jurassic.mp3'),
(9, 'Bob Esponja', 150, 'icon_spongebob.png', 'avatar', 1, 'theme-spongebob', 'bgm_spongebob.mp3'),
(10, 'Dragon Ball', 167, 'icon_dragonball.png', 'avatar', 1, 'theme-dragonball', 'bgm_dragonball.mp3'),
(11, 'Miraculous Ladybug', 17, 'icon_ladybug.png', 'avatar', 2, 'theme-ladybug', 'bgm_ladybug.mp3'),
(12, 'Gabby\'s Dollhouse', 33, 'icon_gabby.png', 'avatar', 2, 'theme-gabby', 'bgm_gabby.mp3'),
(13, 'Bluey', 50, 'icon_bluey.png', 'avatar', 2, 'theme-bluey', 'bgm_bluey.mp3'),
(14, 'My Little Pony', 67, 'icon_mlp.png', 'avatar', 2, 'theme-mlp', 'bgm_mlp.mp3'),
(15, 'Barbie', 83, 'icon_barbie.png', 'avatar', 2, 'theme-barbie', 'bgm_barbie.mp3'),
(16, 'El Club Winx', 100, 'icon_winx.png', 'avatar', 2, 'theme-winx', 'bgm_winx.mp3'),
(17, 'Peppa Pig', 117, 'icon_peppa.png', 'avatar', 2, 'theme-peppa', 'bgm_peppa.mp3'),
(18, 'Princesas de Disney', 133, 'icon_disneyprincess.png', 'avatar', 2, 'theme-disneyprincess', 'bgm_disneyprincess.mp3'),
(19, 'Princesita Sofía', 150, 'icon_sofia.png', 'avatar', 2, 'theme-sofia', 'bgm_sofia.mp3'),
(20, 'Masha y el Oso', 167, 'icon_masha.png', 'avatar', 2, 'theme-masha', 'bgm_masha.mp3');

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
(1, 'admin@mathquest.com', '$2y$10$fOFbOVquP7fIizuwQksm8O0bKc46wKVX9zY047Up9Ito.loEEoyX.', 'admin', '2026-01-10 17:52:38'),
(2, 'papa@ejemplo.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'parent', '2026-01-10 17:52:38'),
(3, 'salvatoreberticci19@gmail.com', '$2y$10$r8ePNamCIV58b8M0JO4dwOyb3WtmxJcFTz3D5n/tofEg/bKtgZp5O', 'parent', '2026-01-10 18:00:36'),
(4, 'maria@gmail.com', '$2y$10$dVuHuiAIdcWGeOtiGL/U1u.eRTFyGMqCRegh5ZWH8AOd1fF0SdKee', 'parent', '2026-02-24 23:42:31'),
(5, 'test@mathquest.demo', '$2y$10$DXIhom37U1tU..E6CQCdu.P9enVspCetuEXb8x4rvxK/aZlZruQH.', 'parent', '2026-03-16 17:29:52'),
(6, 'admin@candyquest.demo', '$2y$10$qp5HbcEH5Eg3c.M4xblKgepi9Z/eyMvJVNhSTJVM9xIx0JmJz91iS', 'admin', '2026-03-16 18:51:15'),
(8, 'tester@candyquest.demo', '$2y$10$L9jGOpZnCupFB.jp45oXLO1Pi9FuhdfuzZQfY9tWFpUOEh6QAKKSm', 'parent', '2026-03-16 19:12:20');

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
-- Indices de la tabla `global_settings`
--
ALTER TABLE `global_settings`
  ADD PRIMARY KEY (`setting_key`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT de la tabla `children`
--
ALTER TABLE `children`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `child_inventory`
--
ALTER TABLE `child_inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `game_sessions`
--
ALTER TABLE `game_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
