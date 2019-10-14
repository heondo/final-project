-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 14, 2019 at 11:44 AM
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

-- --------------------------------------------------------

--
-- Table structure for table `dog_images`
--

CREATE TABLE `dog_images` (
  `id` int(20) NOT NULL,
  `dog_id` int(20) NOT NULL,
  `url` varchar(256) NOT NULL,
  `primary` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dog_images`
--

INSERT INTO `dog_images` (`id`, `dog_id`, `url`, `primary`) VALUES
(1, 5, 'https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/08/shiba-inu-detail.jpg?bust=1535566568&width=355', 1),
(2, 5, 'https://www.k9web.com/wp-content/uploads/2019/01/shiba-inu.jpg', 0),
(3, 6, 'https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2016/07/Miniature-Poodle-e1534277248978.jpg', 0),
(4, 6, 'https://www.loveyourdog.com/wp-content/uploads/2019/04/Toy-Poodle.jpg', 1),
(5, 7, 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12225014/Rottweiler-MP.jpg', 1),
(6, 7, 'https://vetstreet-brightspot.s3.amazonaws.com/a5/16f550a7fb11e0a0d50050568d634f/file/Rottweiler-2-645mk062811.jpg', 0),
(7, 8, 'https://thesmartcanine.com/wp-content/uploads/2019/05/chipin-chihuahua-mix.jpg', 1),
(8, 8, 'https://thesmartcanine.com/wp-content/uploads/2019/02/chihuahua-dachshund-mix-looks.jpg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `playdate`
--

CREATE TABLE `playdate` (
  `id` int(20) NOT NULL,
  `location` varchar(256) NOT NULL,
  `time` datetime NOT NULL,
  `user_id` int(20) NOT NULL,
  `dog_id` int(20) NOT NULL,
  `scheduled` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `num_dates` int(5) NOT NULL,
  `location` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `num_dates`, `location`) VALUES
(1, 'Adison Lay', 3, 'Irvine, CA'),
(2, 'John Smith', 0, 'Orange, CA'),
(3, 'Heondo Kim', 1, 'Tustin, CA'),
(4, 'Harrison Ford', 10, 'Tustin, CA');

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
-- Indexes for table `dog_images`
--
ALTER TABLE `dog_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dog_images_fk0` (`dog_id`);

--
-- Indexes for table `playdate`
--
ALTER TABLE `playdate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `playdate_fk0` (`user_id`),
  ADD KEY `playdate_fk1` (`dog_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dogs`
--
ALTER TABLE `dogs`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `dog_images`
--
ALTER TABLE `dog_images`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `playdate`
--
ALTER TABLE `playdate`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `dogs`
--
ALTER TABLE `dogs`
  ADD CONSTRAINT `dogs_fk0` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `dog_images`
--
ALTER TABLE `dog_images`
  ADD CONSTRAINT `dog_images_fk0` FOREIGN KEY (`dog_id`) REFERENCES `dogs` (`id`);

--
-- Constraints for table `playdate`
--
ALTER TABLE `playdate`
  ADD CONSTRAINT `playdate_fk0` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `playdate_fk1` FOREIGN KEY (`dog_id`) REFERENCES `dogs` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
