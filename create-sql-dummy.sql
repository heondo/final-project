-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 14, 2019 at 11:33 AM
-- Server version: 5.7.27-0ubuntu0.18.04.1
-- PHP Version: 7.2.19-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `final-project`
--

-- --------------------------------------------------------

--
-- Table structure for table `dogs`
--

CREATE TABLE `dogs` (
  `id` int(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `size` varchar(8) NOT NULL,
  `bio` text NOT NULL,
  `user_id` int(20) NOT NULL,
  `age` int(2) NOT NULL,
  `sex` varchar(1) NOT NULL,
  `breed` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dogs`
--

INSERT INTO `dogs` (`id`, `name`, `size`, `bio`, `user_id`, `age`, `sex`, `breed`) VALUES
(5, 'Aiko', 'S', 'This is a long little biography of my dog that is however long the user wants it to be. Go go go go go.', 1, 2, 'F', 'Shiba Inu'),
(6, 'Jasmine', 'XS', 'This is a long little biography of my dog that is however long the user wants it to be. Go go go go go.', 2, 5, 'F', 'Toy Poodle'),
(7, 'Westington', 'L', 'This is a long little biography of my dog that is however long the user wants it to be. Go go go go go.', 3, 3, 'M', 'Rottweiler'),
(8, 'Bow', 'M', 'This is a long little biography of my dog that is however long the user wants it to be. Go go go go go.', 4, 4, 'M', 'Chihuahua Mix');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dogs`
--
ALTER TABLE `dogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dogs_fk0` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dogs`
--
ALTER TABLE `dogs`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `dogs`
--
ALTER TABLE `dogs`
  ADD CONSTRAINT `dogs_fk0` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
