-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 24, 2019 at 11:14 AM
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
-- Table structure for table `breeds`
--

CREATE TABLE `breeds` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `breeds`
--

INSERT INTO `breeds` (`id`, `name`) VALUES
(1, 'AM PIT BULL TERRIER'),
(2, 'MIXED'),
(3, 'DOBERMAN PINSCHER'),
(4, 'RAT TERRIER'),
(5, 'GER SHEPHERD'),
(6, 'POMERANIAN'),
(7, 'BEAGLE'),
(8, 'AM ESKIMO DOG'),
(9, 'COLLIE MIX'),
(10, 'SIB HUSKY'),
(11, 'BOXER'),
(12, 'AUS SHEPHERD'),
(13, 'CHIHUAHUA MIX'),
(14, 'BOXER MIX'),
(15, 'SILKY TERRIER'),
(16, 'SHIH TZU'),
(17, 'MIN PINSCHER'),
(18, 'TERRIER'),
(19, 'DACHSHUND'),
(20, 'BICHON FRISE'),
(21, 'LABRADOR RETRIEVER'),
(22, 'LAB MIX'),
(23, 'PARSON RUSSELL TERR'),
(24, 'BRITTANY SPANIEL'),
(25, 'POODLE TOY'),
(26, 'POODLE MIN'),
(27, 'BORD COLLIE MIX'),
(28, 'CHIHUAHUA'),
(29, 'GOLDEN RETRIEVER'),
(30, 'ENG SPRINGER SPANIE'),
(31, 'LHASA APSO'),
(32, 'BEARDED COLLIE'),
(33, 'LLEWELLIN SETTER'),
(34, 'LABRADOODLE'),
(35, 'AKITA'),
(36, 'TAG'),
(37, 'ROTTWEILER'),
(38, 'LHASA APSO MIX'),
(39, 'COCKER SPANIEL'),
(40, 'GER SHEPHERD MIX'),
(41, 'SIB HUSKY MIX'),
(42, 'YORKSHIRE TERR MIX'),
(43, 'ENG BULLDOG'),
(44, 'DACHSHUND MIX'),
(45, 'YORKSHIRE TERRIER'),
(46, 'POINTER'),
(47, 'COCKAPOO'),
(48, 'ENG SETTER'),
(49, 'SCHNAUZER STANDARD'),
(50, 'SHETLAND SHEEPDOG'),
(51, 'KEESHOND'),
(52, 'BASSET HOUND'),
(53, 'ITALIAN GREYHOUND'),
(54, 'BOUVIER DES FLANDRE'),
(55, 'PUG'),
(56, 'POODLE STANDARD'),
(57, 'ROTTWEILER MIX'),
(58, 'GOLDEN RETRIEV MIX'),
(59, 'BORD COLLIE'),
(60, 'SHIBA INU'),
(61, 'FOX TERRIER TOY'),
(62, 'POODLE MIX'),
(63, 'GER SHORTHAIR POINT'),
(64, 'TERRIER MIX'),
(65, 'PAPILLON'),
(66, 'AIREDALE TERRIER'),
(67, 'BEAGLE MIX'),
(68, 'GREAT DANE'),
(69, 'DALMATION MIX'),
(70, 'BOSTON TERRIER'),
(71, 'GREAT PYRENEES'),
(72, 'SHEPHERD MIX'),
(73, 'GREYHOUND'),
(74, 'BULL TERRIER'),
(75, 'WELSH CORGI CARDIGA'),
(76, 'ST BERNARD'),
(77, 'WEIMARANER'),
(78, 'CAIRN TERRIER'),
(79, 'GOLDENDOODLE'),
(80, 'BULLDOG'),
(81, 'MALTESE MIX'),
(82, 'MALTESE'),
(83, 'DALMATIAN'),
(84, 'PEEKAPOO'),
(85, 'W HGHLND WH TERRIER'),
(86, 'BERNESE MTN DOG'),
(87, 'FRENCH BULLDOG'),
(88, 'BISHON FRISE MIX'),
(89, 'AM PITT BULL MIX'),
(90, 'COLLIE'),
(91, 'ENGLISH MASTIFF'),
(92, 'MANCHESTER TERRIER'),
(93, 'MASTIFF'),
(94, 'SFT COAT WHEAT TERR'),
(95, 'COCKER SPANIEL MIX'),
(96, 'CHOW CHOW MIX'),
(97, 'CHINESE SHAR-PEI'),
(98, 'GREAT DANE MIX'),
(99, 'DOGUE DE BORDEAUX'),
(100, 'KERRY BLUE TERRIER'),
(101, 'SCHNAUZER MIN'),
(102, 'PEKINGESE'),
(103, 'SHELTAND SHEEPDOG'),
(104, 'HOUND MIX'),
(105, '.'),
(106, 'STAFFORDSHIRE TERRI'),
(107, 'CAV KING CHAR SPANI'),
(108, 'JAPANESE CHIN'),
(109, 'BULLMASTIFF'),
(110, 'ENG COCKER SPANIEL'),
(111, 'BLUE HEELER'),
(112, 'SCHNAUZER GIANT'),
(113, 'SAMOYED'),
(114, 'ARGENTINO DOGO'),
(115, 'ALAS MALAMUTE'),
(116, 'AFGHAN HOUND'),
(117, 'NEWFOUNDLAND'),
(118, 'RHODESIAN RIDGEBACK'),
(119, 'DOBERMAN MIX'),
(120, 'POODLE MED'),
(121, 'WELSH CORGI PEMBROK'),
(122, 'AUS CATTLE DOG'),
(123, 'RETRIEVER MIX'),
(124, 'SHETLAND SHEEP MIX'),
(125, 'BORDER TERRIER'),
(126, 'DINGO'),
(127, 'BLACK&TAN COONHOUND'),
(128, 'BRUSSELS GRIFFON'),
(129, 'BLUETICK COONHOUND'),
(130, 'PLOTT HOUND'),
(131, 'AM STAFF TERRIER'),
(132, 'CHES BAY RETRIEVER'),
(133, 'CHINESE CRESTED'),
(134, 'AM BULLDOG'),
(135, 'AKITA MIX'),
(136, 'WELSH TERRIER'),
(137, 'WIREHAIR PT GRIFFON'),
(138, 'CHOW CHOW'),
(139, 'SHIH TZU MIX'),
(140, 'ORI PEI'),
(141, 'COTON DE TULEAR'),
(142, 'GR SWISS MTN DOG'),
(143, 'BASENJI'),
(144, 'BELG TERVUREN'),
(145, 'POMERANIAN MIX'),
(146, 'SCHIPPERKE'),
(147, 'SCOTTISH TERRIER'),
(148, 'BELG MALINOIS'),
(149, 'BORZOI'),
(150, 'OTHER'),
(151, 'BLOODHOUND'),
(152, 'IRISH SETTER'),
(153, 'ENG POINTER'),
(154, 'CANE CORSO'),
(155, 'AUS KELPIE'),
(156, 'CHINESE FOO DOG'),
(157, 'FLAT COATED RETRIEV'),
(158, 'VIZSLA'),
(159, 'PORTUGESE WATER DOG'),
(160, 'BLACKMOUTH CUR'),
(161, 'OLD ENG BULLDOG'),
(162, 'BOYKIN SPANIEL'),
(163, 'IRISH WOLFHOUND'),
(164, 'TERRIER BRASILEIRO'),
(165, 'ENG SHEPHERD'),
(166, 'SCHNOODLE'),
(167, 'GER WIREHAIR POINTE'),
(168, 'MUNSTERLANDER SMALL'),
(169, 'HAVANESE'),
(170, 'FOX TERRIER WIRE'),
(171, 'OLD ENG SHEEPDOG'),
(172, 'FOX TERRIER SMOOTH'),
(173, 'PYRENEAN MASTIFF'),
(174, 'REDTICK COONHOUND'),
(175, 'HALLS HEELER'),
(176, 'PATTERDALE TERRIER'),
(177, 'GORDON SETTER'),
(178, 'REDBONE COONHOUND'),
(179, 'AM TOY TERRIER'),
(180, 'BELG SHEPHERD'),
(181, 'WHIPPET'),
(182, 'PUGGLE'),
(183, 'TOY FOX TERIER'),
(184, 'LOWCHEN'),
(185, 'AM BLACK&TAN COONHO'),
(186, 'ENG COONHOUND'),
(187, 'BASSET HOUND MIX'),
(188, 'TREE WALK COONHOUND'),
(189, 'SPINONE ITALIANO'),
(190, 'ENG TOY SPANIEL'),
(191, 'IRISH TERRIER'),
(192, 'FILA BRASILEIRO'),
(193, 'LAKELAND TERRIER'),
(194, 'JACK RUSSEL TERRIER'),
(195, 'NORW ELKHOUND'),
(196, 'TIBETAN TERRIER'),
(197, 'WELSH SPRINGER SPAN'),
(198, 'AM WATER SPANIEL'),
(199, 'AM FOXHOUND'),
(200, 'PUPPY'),
(201, 'CATAHOULA LEOPARD D'),
(202, 'NORFOLK TERRIER'),
(203, 'MI-KI'),
(204, 'BRIARD SHEEPDOG'),
(205, 'MORKIE'),
(206, 'NORWICH TERRIER'),
(207, 'NEAPOLITAN MASTIFF'),
(208, 'ENG FOXHOUND'),
(209, 'AINU'),
(210, 'ANATOLIAN SHEPHERD'),
(211, 'PULI'),
(212, 'NOVA SCOTIA DUCK TO'),
(213, 'ALAPAHA BLUE BULLDO'),
(214, 'AUS TERRIER'),
(215, 'TIBETAN SPANIEL'),
(216, 'CANNAN DOG'),
(217, 'PORT WIREHAIR PODENG'),
(218, 'BELG SHEEPDOG'),
(219, 'FIELD SPANIEL'),
(220, 'ALASKAN SHEPHERD'),
(221, 'CLUMBER SPANIEL'),
(222, 'LEONBERGER'),
(223, 'SARPLANINAC'),
(224, 'LAGOTTO TOMAGNOLO'),
(225, 'SKYE TERRIER'),
(226, 'SHILOH GER SHEPHERD'),
(227, 'QUEENSLAND HEELER'),
(228, 'CAROLINA DOG'),
(229, 'MASTIFF TIBETAN'),
(230, 'MAREMMA ABBRUZE'),
(231, 'BELG LAEKENOIS'),
(232, 'ENTLEBUCHER SENNEN'),
(233, 'PRESA CANARIO'),
(234, 'PETIT BASSET GRIFFO'),
(235, 'FRENCH SPANIEL'),
(236, 'GLEN OF IMAAL TERRI'),
(237, 'ICELAND DOG'),
(238, 'SUSSEX SPANIEL'),
(239, 'CURLY COATED RETRIE'),
(240, 'JINDO'),
(241, 'AFFENPINSCHER'),
(242, 'GER SPITZ'),
(243, 'JAPANESE SPITZ'),
(244, 'BEAGLE HARRIER'),
(245, 'KOMONDOR'),
(246, 'STUMPY TAIL CATTLE DO'),
(247, 'BRAQUE DU BOURBONNA'),
(248, 'PHARAOH HOUND'),
(249, 'BRAQUE FRANCAIS'),
(250, 'TRANSYLVANIAN HOUND'),
(251, 'SALUKI'),
(252, 'GER PINSCHER'),
(253, 'MULLINS FEIST'),
(254, 'DANDIE DINMONT TERR'),
(255, 'MOUNTAIN CUR'),
(256, 'BOERBOEL'),
(257, 'MIN AUS SHEPHERD'),
(258, 'PRESSA MALLORQUIN'),
(259, 'IRISH WATER SPANIEL'),
(260, 'CAUCASIAN OVTCHARKA'),
(261, 'PERRO DE PRESA CANA'),
(262, 'W SHEPHERD /GER SHEPH'),
(263, 'KUVASZ'),
(264, 'ALAS KLEE KAI'),
(265, 'OTTERHOUND'),
(266, 'MALTI-POO'),
(267, 'DUTCH SHEPHERD'),
(268, 'FEIST TREEING'),
(269, 'IRISH RED&WHITE SET'),
(270, 'BOLOGNESE'),
(271, 'CATALAN SHEEPDOG'),
(272, 'MASTIFF SPANISH'),
(273, 'THAI RIDGEBACK'),
(274, 'POLISH LOWLND SHEEP'),
(275, 'GER LONGHAIR POINT'),
(276, 'BEDLINGTON TERRIER'),
(277, 'ENG TOY TERRIER'),
(278, 'W SIBERIAN LAIKA'),
(279, 'MIN BULL TERRIER'),
(280, 'PYRENEAN SHEPHERD'),
(281, 'EURASIAN'),
(282, 'CHINOOK'),
(283, 'XOLOITZCUINTLI'),
(284, 'SEALYHAM TERRIER'),
(285, 'POLISH TATRA SHEEPDO'),
(286, 'FINNISH SPITZ'),
(287, 'TREEING CUR'),
(288, 'GRAND GRIFFON VENDE'),
(289, 'GREYHOUND SPANISH'),
(290, 'BRACCO ITALIANO'),
(291, 'CRENTSE PARTRIDGE D'),
(292, 'KING SHEPHERD'),
(293, 'TEDDY ROOSE TERRIER'),
(294, 'HELLENIC HOUND'),
(295, 'NORW BUHUND'),
(296, 'FINNISH LAPPHUND'),
(297, 'ALPINE MASTIFF'),
(298, 'PODENGO PORT MEDIO'),
(299, 'SCOTTISH DEERHOUND'),
(300, 'IBIZAN HOUND MIX'),
(301, 'BEAUCERON'),
(302, 'PERUVIAN INCA ORCHID'),
(303, 'LURCHER'),
(304, 'TENN TREE BRINDLE'),
(305, 'CHIEN FRANC BL&ORAN'),
(306, 'BLACK RUSSIAN TERRI'),
(307, 'APPENZELLER'),
(308, 'SOU RUSSIAN OVCHARK'),
(309, 'N AM AUS SHEPHERD'),
(310, 'BLACK FOREST HOUND'),
(311, 'KAI DOG'),
(312, 'MOSCOW LONGHAIR TER'),
(313, 'HOVAWART'),
(314, 'DENMARK FEIST'),
(315, 'SHILLER HOUND'),
(316, 'KARELIAN BEAR DOG'),
(317, 'KISHU'),
(318, 'SWEDISH VALLHUND'),
(319, 'BARBET'),
(320, 'CENT ASIA SHEPHARD'),
(321, 'AKBASH DOG'),
(322, 'POLISH HOUND'),
(323, 'MUNSTERLANDER LARGE'),
(324, 'BASSET GRIFFON VEND'),
(325, 'PICARDY SPANIEL'),
(326, 'DUNKER'),
(327, 'GRIFFON NIVERNAIS'),
(328, 'KOOIKERHONDJE'),
(329, 'ALPINE DACHSBRACKE'),
(330, 'PUDELPOINTER'),
(331, 'PICARDY SHEPHERD'),
(332, 'SLOVENSKY CUVAC'),
(333, 'DANISH BROHOLMER'),
(334, 'RUSSIAN TOY'),
(335, 'MIN-PEI'),
(336, 'CIRNECO DELL ETNA'),
(337, 'WATER DOG SPANISH'),
(338, 'EPAGNEUL PONT-AUDEM'),
(339, 'BASSET GRIFFON VEND?EN (PETIT)'),
(340, 'KANGAL DOG'),
(341, 'STABYHOUN'),
(342, 'Mountain Feist'),
(343, 'CANADIAN ESKIMO DOG'),
(344, 'PUMI'),
(345, 'OWCZREK PODHALAN'),
(346, 'JAMTHUND'),
(347, 'BERGAMASCO'),
(348, 'SHIBA INU'),
(349, 'ROTTWEILER'),
(352, 'NEW BREED'),
(354, 'HAROLD'),
(355, '4'),
(356, '23623'),
(357, 'FASDFSDAF'),
(358, 'MALTI-POO'),
(359, 'MALTI-POO'),
(360, 'MALTI-POO'),
(361, 'MALTI-POO'),
(362, 'MALTI-POO');

-- --------------------------------------------------------

--
-- Table structure for table `dogs`
--

CREATE TABLE `dogs` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `num_dates` smallint(5) UNSIGNED NOT NULL,
  `weight` tinyint(3) UNSIGNED NOT NULL,
  `bio` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `ig_url` varchar(60) NOT NULL,
  `birth` varchar(20) NOT NULL,
  `sex` enum('M','F','NA') NOT NULL,
  `fixed` tinyint(1) NOT NULL,
  `breed` int(10) UNSIGNED NOT NULL,
  `energy_lvl` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dogs`
--

INSERT INTO `dogs` (`id`, `name`, `num_dates`, `weight`, `bio`, `user_id`, `ig_url`, `birth`, `sex`, `fixed`, `breed`, `energy_lvl`) VALUES
(5, 'Aiko', 15, 15, 'This is a long little biography of my dog that is however long the user wants it to be. Go go go go go.', 1, '', '1505026800', 'F', 1, 326, 1),
(6, 'Jasmine', 3, 7, 'This is a long little biography of my dog that is however long the user wants it to be. Go go go go go.', 2, '', '1489132800', 'NA', 1, 25, 0),
(7, 'Westington', 6, 70, 'This is a long little biography of my dog that is however long the user wants it to be. Go go go go go.', 3, '', '1470812400', 'M', 1, 349, 2),
(8, 'Bow', 0, 35, 'This is a long little biography of my dog that is however long the user wants it to be. Go go go go go.', 4, '', '1392451200', 'M', 0, 13, 0),
(10, 'Tudor', 5, 13, 'This is a bio for the dog that has two dogs. And this is in fact the second dog believe it or not', 2, 'instagram.com', '1571263155', 'M', 1, 251, 2),
(11, 'Steve', 0, 55, 'This time for sure will work', 1, 'https://gramagram.com/', '946767408', 'M', 1, 42, 0),
(21, 'heondo', 0, 2, 'fgsdgfdgfddsdgdfgdf', 1, 'http://heondo.com', '1570489479', 'M', 1, 356, 0),
(22, 'd', 0, 1, 'dafasdfsdafasdfsd', 1, 'http://heondo.com', '1570407201', 'NA', 1, 357, 1),
(23, 'heondo', 0, 12, 'fdffffdgfgdfgddgf', 1, 'http://heondo.com', '1570395342', 'F', 1, 2, 0),
(24, 'heondo', 0, 2, 'cvgnbcvbvbvbvcb', 1, 'http://heondo.com', '1570591535', 'F', 1, 1, 1),
(25, 'newest dog', 0, 250, 'Golden retriever is the best', 2, 'http://link.com', '1412193282', 'F', 1, 29, 0),
(26, 'newest dog', 0, 250, 'Golden retriever is the best', 2, 'http://link.com', '1412193282', 'M', 1, 29, 0),
(27, 'newest dog', 0, 250, 'Golden retriever is the best', 2, 'http://link.com', '1412193282', 'M', 1, 29, 0),
(28, 'newest dog', 0, 123, 'dfdsfsdfsdfsdsdfsdfsdf', 23, 'http://link.com', '1570564807', 'F', 1, 4, 0),
(29, 'junior', 0, 12, 'dddddddddddddddddddddddddddd', 23, 'http://link.com', '1571083397', 'F', 1, 13, 1),
(30, 'junior', 0, 12, 'dddddddddddddddddddddddddddd', 23, 'http://link.com', '1571083397', 'F', 1, 13, 1),
(31, 'junior', 0, 12, 'dddddddddddddddddddddddddddd', 23, 'http://link.com', '1571083397', 'F', 1, 13, 1),
(32, 'junior', 0, 12, 'dddddddddddddddddddddddddddd', 23, 'http://link.com', '1571083397', 'F', 1, 13, 1),
(33, 'junior', 0, 23, 'rdedcdddddddddddddddddddddddddddddddddddddddddd', 23, 'http://link.com', '1570570735', 'F', 1, 358, 0),
(34, 'junior', 0, 23, 'rdedcdddddddddddddddddddddddddddddddddddddddddd', 23, 'http://link.com', '1570570735', 'F', 1, 359, 0),
(35, 'junior', 0, 23, 'rdedcdddddddddddddddddddddddddddddddddddddddddd', 23, 'http://link.com', '1570570735', 'F', 1, 360, 0),
(36, 'junior', 0, 23, 'rdedcdddddddddddddddddddddddddddddddddddddddddd', 23, 'http://link.com', '1570570735', 'F', 1, 361, 0),
(37, 'junior', 0, 23, 'rdedcdddddddddddddddddddddddddddddddddddddddddd', 23, 'http://link.com', '1570570735', 'F', 1, 362, 0),
(38, 'newest dog 2355', 0, 12, 'erefafsdfsdfasdfasdfasdf', 24, 'http://link.com', '1571348738', 'F', 1, 21, 0);

-- --------------------------------------------------------

--
-- Table structure for table `dog_images`
--

CREATE TABLE `dog_images` (
  `id` int(11) NOT NULL,
  `dog_id` int(11) NOT NULL,
  `url` varchar(256) NOT NULL,
  `sort_ord` tinyint(1) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dog_images`
--

INSERT INTO `dog_images` (`id`, `dog_id`, `url`, `sort_ord`) VALUES
(1, 5, 'https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/08/shiba-inu-detail.jpg?bust=1535566568&width=355', 0),
(2, 5, 'https://www.k9web.com/wp-content/uploads/2019/01/shiba-inu.jpg', 1),
(3, 6, 'https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2016/07/Miniature-Poodle-e1534277248978.jpg', 1),
(4, 6, 'https://www.loveyourdog.com/wp-content/uploads/2019/04/Toy-Poodle.jpg', 0),
(5, 7, 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12225014/Rottweiler-MP.jpg', 0),
(6, 7, 'https://vetstreet-brightspot.s3.amazonaws.com/a5/16f550a7fb11e0a0d50050568d634f/file/Rottweiler-2-645mk062811.jpg', 1),
(7, 8, 'https://thesmartcanine.com/wp-content/uploads/2019/05/chipin-chihuahua-mix.jpg', 0),
(8, 8, 'https://thesmartcanine.com/wp-content/uploads/2019/02/chihuahua-dachshund-mix-looks.jpg', 1),
(9, 11, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/EOlgQaD.jpg', 0),
(10, 11, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/evbIIyE.jpg', 1),
(21, 21, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/this-wallpaper-is-not-available-4k-3840%C3%972160.jpg', 0),
(22, 22, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/this-wallpaper-is-not-available-4k-3840%C3%972160.jpg', 0),
(23, 23, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/ios-13-stock-wallpaper-3840x2160_949874-mm-90.jpg', 0),
(24, 23, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/dragon-s-journey-2880x1800_7678-mm-90.jpg', 1),
(25, 24, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/dragon-s-journey-2880x1800_7678-mm-90.jpg', 0),
(26, 25, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/dragon-s-journey-2880x1800_7678-mm-90.jpg', 0),
(27, 26, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/dragon-s-journey-2880x1800_7678-mm-90.jpg', 0),
(28, 27, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/dragon-s-journey-2880x1800_7678-mm-90.jpg', 0),
(29, 28, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/dragon-s-journey-2880x1800_7678-mm-90.jpg', 0),
(30, 28, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/GvojAhH.png', 1),
(31, 28, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/this-wallpaper-is-not-available-4k-3840%C3%972160.jpg', 2),
(32, 29, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/this-wallpaper-is-not-available-4k-3840%C3%972160.jpg', 0),
(33, 30, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/this-wallpaper-is-not-available-4k-3840%C3%972160.jpg', 0),
(34, 31, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/this-wallpaper-is-not-available-4k-3840%C3%972160.jpg', 0),
(35, 32, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/this-wallpaper-is-not-available-4k-3840%C3%972160.jpg', 0),
(36, 33, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/q25fqaeoaqt31.jpg', 0),
(37, 33, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/zmylmfcv2kq31.jpg', 1),
(38, 33, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/6oYJ8Tr.jpg', 2),
(39, 34, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/q25fqaeoaqt31.jpg', 0),
(40, 34, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/zmylmfcv2kq31.jpg', 1),
(41, 34, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/6oYJ8Tr.jpg', 2),
(42, 35, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/q25fqaeoaqt31.jpg', 0),
(43, 35, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/zmylmfcv2kq31.jpg', 1),
(44, 35, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/6oYJ8Tr.jpg', 2),
(45, 36, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/q25fqaeoaqt31.jpg', 0),
(46, 36, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/zmylmfcv2kq31.jpg', 1),
(47, 36, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/6oYJ8Tr.jpg', 2),
(48, 37, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/q25fqaeoaqt31.jpg', 0),
(49, 37, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/zmylmfcv2kq31.jpg', 1),
(50, 37, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/6oYJ8Tr.jpg', 2),
(51, 38, 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/6oYJ8Tr.jpg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `playdates`
--

CREATE TABLE `playdates` (
  `id` int(10) UNSIGNED NOT NULL,
  `dog_id` int(10) UNSIGNED NOT NULL,
  `date` varchar(30) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `display_address` varchar(255) NOT NULL,
  `confirmed` tinyint(1) NOT NULL,
  `dog_2_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `playdates`
--

INSERT INTO `playdates` (`id`, `dog_id`, `date`, `lat`, `lng`, `display_address`, `confirmed`, `dog_2_id`) VALUES
(13, 38, '1571870211', 33.6845673, -117.82650490000003, 'Irvine, CA, USA', 0, NULL),
(14, 38, '1571870214', 33.6845673, -117.82650490000003, 'Irvine, CA, USA', 0, NULL),
(15, 38, '1571870253', 33.6790596, -117.74441059999998, '5th St, Irvine, CA 92618, USA', 1, 5),
(16, 38, '1571872494', 33.6845673, -117.82650490000003, 'Irvine, CA, USA', 0, NULL),
(17, 38, '1571872494', 33.6845673, -117.82650490000003, 'Irvine, CA, USA', 0, NULL),
(18, 38, '1571872561', 33.6845673, -117.82650490000003, 'Irvine, CA, USA', 0, NULL),
(19, 38, '1570042800', 33.6845673, -117.82650490000003, 'Irvine, CA, USA', 1, 5),
(20, 5, '1571870253', 33.65101609999999, -117.74391029999998, '670 Spectrum Center Dr, Irvine, CA 92618, USA', 1, 38),
(21, 5, '1572548400', 33.65101609999999, -117.74391029999998, '670 Spectrum Center Dr, Irvine, CA 92618, USA', 0, NULL),
(22, 11, '1571870253', 37.6818688, -121.76847320000002, 'Livermore, CA, USA', 1, 7),
(23, 11, '1572548400', 37.6818688, -121.76847320000002, 'Livermore, CA, USA', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `id` int(10) UNSIGNED NOT NULL,
  `playdate_id` int(10) UNSIGNED NOT NULL,
  `dog_id` int(10) UNSIGNED NOT NULL,
  `accepted` tinyint(1) DEFAULT NULL,
  `created_time` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first` varchar(30) NOT NULL,
  `last` varchar(20) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `display_address` varchar(60) NOT NULL,
  `bio` text NOT NULL,
  `image` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `first`, `last`, `lat`, `lng`, `display_address`, `bio`, `image`) VALUES
(1, 'lay-adison@gmail.com', '1', 'Adison', 'Lay', 33.6845673, -117.82650490000003, 'Irvine, CA', 'My name is adison lay what is up and i need to write a lot of stuff to make this bio page have a purpose in the first place', 'https://icon-library.net/images/person-image-icon/person-image-icon-7.jpg'),
(2, 'john', '1', 'John', 'Smith', 37.7749295, -122.41941550000001, 'San Francisco, CA', 'My name is adison lay what is up and i need to write a lot of stuff to make this bio page have a purpose in the first place', 'https://icon-library.net/images/person-image-icon/person-image-icon-7.jpg'),
(3, 'kim-heondo@gmail.com', '1', 'Heondo', 'Kim', 33.74200049999999, -117.82363909999998, 'Tustin, CA', 'My name is adison lay what is up and i need to write a lot of stuff to make this bio page have a purpose in the first place', 'https://icon-library.net/images/person-image-icon/person-image-icon-7.jpg'),
(4, 'harrisonford@gmail.com', '1', 'Harrison', 'Ford', 34.0522342, -118.2436849, 'Los Angeles, CA', 'My name is adison lay what is up and i need to write a lot of stuff to make this bio page have a purpose in the first place', 'https://icon-library.net/images/person-image-icon/person-image-icon-7.jpg'),
(5, 'test', '1', 'user', 'name', 33.7174708, -117.83114280000001, 'Orange County, CA', 'my biooooooooooo', 'https://image.shutterstock.com/image-vector/person-icon-260nw-282598823.jpg'),
(6, 'fake@gmail.com', '$2b$10$SBGBVUXM98gFRx1OVHVMveC.DEUeko1Wq3gBVDdx4C3bmL2na6hc6', 'heondo', 'kim', 35.4675602, -97.51642759999999, 'Oklahoma City, OK, USA', 'dddddddddd', 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/this-wallpaper-is-not-available-4k-3840%C3%972160.jpg'),
(23, 'hi@hi.com', '$2b$10$sABOQ2.zuYz6iTBqJX6WN.TrO/UmLKwzeBH1vGS/HloNQeVZ1.fai', 'hi', 'what', 34.1231551, 123.1251614, 'irvine california babeeeeee', 'hi', 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/this-wallpaper-is-not-available-4k-3840%C3%972160.jpg'),
(24, 'fakedfadsdccc@gmail.com', '$2a$10$KS7XP.o02gdFeMnb54mk0OxGsFoQAq1mIZ/.gLlE/R/OYkHE4rE76', 'er', 'guy', 33.4672256, -117.69810139999998, 'Dana Point, CA, USA', 'aefsdfsdfsdafsfsdf', 'https://final-project-dog-images.s3.us-east-2.amazonaws.com/this-wallpaper-is-not-available-4k-3840%C3%972160.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `breeds`
--
ALTER TABLE `breeds`
  ADD PRIMARY KEY (`id`);

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
  ADD UNIQUE KEY `dog_image_order` (`dog_id`,`sort_ord`);

--
-- Indexes for table `playdates`
--
ALTER TABLE `playdates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `breeds`
--
ALTER TABLE `breeds`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=363;
--
-- AUTO_INCREMENT for table `dogs`
--
ALTER TABLE `dogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT for table `dog_images`
--
ALTER TABLE `dog_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
--
-- AUTO_INCREMENT for table `playdates`
--
ALTER TABLE `playdates`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
