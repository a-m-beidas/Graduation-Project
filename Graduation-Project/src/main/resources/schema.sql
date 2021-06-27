-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2021 at 08:22 AM
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
DROP TABLE IF EXISTS `alerts`;
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

DROP TABLE IF EXISTS `credentials`;
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

DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(40);

-- --------------------------------------------------------

--
-- Table structure for table `record`
--

DROP TABLE IF EXISTS `record`;
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

DROP TABLE IF EXISTS `scan`;
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
(24, '2021-06-22', 'localhost:8080', 1, 36),
(30, '2021-06-25', 'localhost:8080', 1, 36);

-- --------------------------------------------------------

--
-- Table structure for table `scan_alerts`
--

DROP TABLE IF EXISTS `scan_alerts`;
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

DROP TABLE IF EXISTS `users`;
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
(36, 1, '$2a$10$eSrx6l5B4r63Nd63zYfkLOvRbyPtWCPjH03w0Ju4hqTSFl3W1pJoW', 'bWAPP'),
(37, 0, '$2a$10$YmTz7oopIXuv5VDRvBofyOJrANrRgMoa4wTvE/BJwlFQlpOI1OcTC', 'DVIA'),
(38, 1, '$2a$10$pW8MxC3guPeznKVqknW3euWrJyU7zcKMUWjqLIV.ITlMvWaBAGd7a', 'John'),
(39, 0, '$2a$10$dpSirBSzEbhV4whJxJIfIONNLGY5LkL28esA0Ci5cj33tjAcDWtGO', 'Matt');

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
