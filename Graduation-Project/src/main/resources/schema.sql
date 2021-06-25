-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2021 at 09:55 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crawler`
--

-- --------------------------------------------------------

--
-- Table structure for table `alerts`
--
SET FOREIGN_KEY_CHECKS=0;
drop table if exists alerts;
drop table if exists credentials;
drop table if exists hibernate_sequence;
drop table if exists record;
drop table if exists scan;
drop table if exists scan_alerts;
drop table if exists users;
SET FOREIGN_KEY_CHECKS=1;
CREATE TABLE `alerts` (
  `id` int(11) NOT NULL,
  `method` varchar(255) DEFAULT NULL,
  `parameter` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `severity` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `alerts`
--

INSERT INTO `alerts` (`id`, `method`, `parameter`, `path`, `severity`, `type`) VALUES
(25, 'POST', 'login', '/user_new.php', 1, 'Reflected cross site scripting'),
(26, 'POST', 'password', '/user_new.php', 2, 'Reflected cross site scripting'),
(27, 'POST', 'password_conf', '/user_new.php', 3, 'Reflected cross site scripting'),
(28, 'POST', 'login', '/login.php', 2, 'Reflected cross site scripting'),
(29, 'POST', 'password', '/login.php', 1, 'Reflected cross site scripting'),
(31, 'POST', 'login', '/user_new.php', 1, 'Reflected cross site scripting'),
(32, 'POST', 'password', '/user_new.php', 2, 'Reflected cross site scripting'),
(33, 'POST', 'password_conf', '/user_new.php', 3, 'Reflected cross site scripting'),
(34, 'POST', 'login', '/login.php', 2, 'Reflected cross site scripting');

-- --------------------------------------------------------

--
-- Table structure for table `credentials`
--

CREATE TABLE `credentials` (
  `id` int(11) NOT NULL,
  `loginurl` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(36);

-- --------------------------------------------------------

--
-- Table structure for table `record`
--

CREATE TABLE `record` (
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `record`
--

INSERT INTO `record` (`url`) VALUES
('http://localhost:8080'),
('http://localhost:8080/info.php'),
('http://localhost:8080/login.php'),
('http://localhost:8080/training.php'),
('http://localhost:8080/user_new.php');

-- --------------------------------------------------------

--
-- Table structure for table `scan`
--

CREATE TABLE `scan` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `targeturl` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `scan`
--

INSERT INTO `scan` (`id`, `date`, `targeturl`, `type`, `user_id`) VALUES
(24, '2021-06-22', 'localhost:8080', 1, 1),
(30, '2021-06-25', 'localhost:8080', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `scan_alerts`
--

CREATE TABLE `scan_alerts` (
  `scan_id` int(11) NOT NULL,
  `alerts_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `scan_alerts`
--

INSERT INTO `scan_alerts` (`scan_id`, `alerts_id`) VALUES
(24, 25),
(24, 26),
(24, 27),
(24, 28),
(24, 29),
(30, 31),
(30, 32),
(30, 33),
(30, 34);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `token_in_database` int(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `token_in_database`, `password`, `username`) VALUES
(1, 1, '$2a$10$zQn/43m0gIYj.mMtXtXt7uu0N/AHMVRJMLtkzJvJBqAyA5SmJeXd2', 'John'),
(2, 0, '$2a$10$XjYwyy6neEnQMPej2aQWGODIPJt/NqaYitSNBYkSjsqO1w6QU1xkK', 'Matt'),
(3, 0, '$2a$10$JggTNqmK6nP.ZcYBAATDYuYQVK2V381IMhH2rmkvPkoXMUXplvgoq', 'Blake'),
(4, 0, '$2a$10$Ynjwjvufnd36crTNh5WqKuIa3cBGLvY.6sgsRUBoItdaHcAgISWE.', 'Candelaria'),
(5, 0, '$2a$10$Zxqegsin.HEz2RLiA/UBTeBzhPTSOGVYDT5aZOq/JC7qtv59D9cAS', 'Leonia'),
(6, 0, '$2a$10$/EnJiP8bNB.aG7zdCMgepOqcJFccJGoDcMIFBh3vfVdUpSHWB4Fom', 'Vanda'),
(7, 0, '$2a$10$bQHWANkK2qwbIdCRF5ytReEBjFIHBXYP6OTrbA9ectz54EodU4A66', 'Maya'),
(8, 0, '$2a$10$ImhpX2eEUsJkf59GF8.ZJuu1z.V4lkxBGbKtbVQo7atlpSDBzn9h2', 'Tiera'),
(9, 0, '$2a$10$KZgSh3nvXuQI5cBvarOFqu/Uz35F3Ko/iYFPnB3B2i8adZoL5c2FC', 'Neil'),
(10, 0, '$2a$10$121kuMODZSMGPLrwdFTS4.oIX5IbC5yKn.9xeEhWBAUwxJF.qT2b2', 'Providencia'),
(11, 0, '$2a$10$DhEcVjDB8lozMXav85CchuAGlRmhyFsxEBsa/TlolU/wN6TvODfuS', 'Truman'),
(12, 0, '$2a$10$Yc6vNf/T3TRiKP8hToyJpeP8Lc.2JX5HZJoXOfbN/rfc725a/gjwy', 'Pamila'),
(13, 0, '$2a$10$DqLYFrJrSB8jBuDuOeZKW.PJrZ5GhHTfYMTcXLpxEgMuFjce8Ayzq', 'Keshia'),
(14, 0, '$2a$10$Uz1GI4GWI6tH2PZS5R1.ge7ilikwwMgGiCUaWWIIcd9NnOTWJ2Fny', 'Hermelinda'),
(15, 0, '$2a$10$fkuQt3UaDxxJ6UqomNPRN.Ay11sZXlk81ELpQtfbUmy3Z1Ha6PZna', 'Milford'),
(16, 0, '$2a$10$5hR2mwWynUR.P4nIxvrgbulwMpy2XmsP.bYmGwxzWnaxCC1mbbyBK', 'Cristopher'),
(17, 0, '$2a$10$64qPBaqwm7idUIY26V61eOoFUTyz4axOcuSDlSN2tart.UiZpAfvO', 'Kareem'),
(18, 0, '$2a$10$FQvUUzVbXEbtxtAruUrW9eM5Ijxs0ax.9FlIObF36KA6Vzz9DtSde', 'Guy'),
(19, 0, '$2a$10$5PnTXQ9gavdTzHGMqZ3J6uj3..bO7622bVpcOEl7TlonT58mc8UVq', 'Su'),
(20, 0, '$2a$10$H50GynGs3fTBd9.3xgooO.f9X5P71YJY0erKJQhI4AEzZ1qNAK5.i', 'Mariano'),
(21, 0, '$2a$10$vKRHPMhLcgdkQNorzJmZ3uoryZwvI2H279Wym7UYbAs3xO3QZqk22', 'Dayle'),
(22, 0, '$2a$10$iISxg5sWcR6rmfoxX9V8juH4p7XifDxlIhDPQ6kbB4jMdDniil5X6', 'Boyd'),
(23, 0, '$2a$10$Twf9e.Qo4zj.5sH9uX/iDuTySjW..Vy.EhjkzodVZGCc.GHVbcAqq', 'Janeth');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alerts`
--
ALTER TABLE `alerts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `credentials`
--
ALTER TABLE `credentials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `record`
--
ALTER TABLE `record`
  ADD PRIMARY KEY (`url`);

--
-- Indexes for table `scan`
--
ALTER TABLE `scan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scan_alerts`
--
ALTER TABLE `scan_alerts`
  ADD UNIQUE KEY `UK_cg6psnto6y8ww008w8yrtk8fh` (`alerts_id`),
  ADD KEY `FKer6h5i33k8q9i56if4y79018f` (`scan_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `scan_alerts`
--
ALTER TABLE `scan_alerts`
  ADD CONSTRAINT `FK9j2xx8hul4ydnp2hujlct70ms` FOREIGN KEY (`alerts_id`) REFERENCES `alerts` (`id`),
  ADD CONSTRAINT `FKer6h5i33k8q9i56if4y79018f` FOREIGN KEY (`scan_id`) REFERENCES `scan` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
