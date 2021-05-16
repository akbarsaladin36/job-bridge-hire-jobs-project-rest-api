-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2021 at 11:41 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jobbridge`
--

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id_company` int(11) NOT NULL,
  `is_verified` enum('0','1') NOT NULL,
  `fullname_representation_company` varchar(150) NOT NULL,
  `position_representation_company` varchar(150) NOT NULL,
  `email_representation_company` varchar(150) NOT NULL,
  `password_company` varchar(250) NOT NULL,
  `company_name` varchar(150) NOT NULL,
  `company_field` varchar(150) NOT NULL,
  `company_city` varchar(250) NOT NULL,
  `company_desc` text NOT NULL,
  `company_email` varchar(150) NOT NULL,
  `company_instagram` varchar(150) NOT NULL,
  `company_phone_number` varchar(150) NOT NULL,
  `company_linkedin` varchar(150) NOT NULL,
  `company_image` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id_company`, `is_verified`, `fullname_representation_company`, `position_representation_company`, `email_representation_company`, `password_company`, `company_name`, `company_field`, `company_city`, `company_desc`, `company_email`, `company_instagram`, `company_phone_number`, `company_linkedin`, `company_image`) VALUES
(1, '0', 'Bondan Raharjo', 'CEO', 'someemail@gmail.com', '', 'Tokopedia', 'IT', 'Jakarta', 'some text here', 'company@gmail.com', '@company', '088823413243', 'company_linkedin', ''),
(5, '1', 'Admijo', 'CEO', 'timotius.nugroho.arkademy@gmail.com', '$2b$10$28FTOQMUpGFNoifDxEgecuNCDi2RIJvC34vo0hx54jVM6vTdoQW.S', 'ODROID', 'marine', 'DIY', 'lorem ipsum dolop sit amet', 'some@gmail.com', '@inscompany', '077755446', '@inscompany', '');

-- --------------------------------------------------------

--
-- Table structure for table `experience`
--

CREATE TABLE `experience` (
  `id_experience` int(11) NOT NULL,
  `id_worker` int(11) NOT NULL,
  `posistion_experience` varchar(150) NOT NULL,
  `company_name_experience` varchar(150) NOT NULL,
  `work_date_in_experience` date DEFAULT NULL,
  `work_date_out_experience` date DEFAULT NULL,
  `job_desc_experience` text NOT NULL,
  `experience_created_at` timestamp NULL DEFAULT current_timestamp(),
  `experience_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `experience`
--

INSERT INTO `experience` (`id_experience`, `id_worker`, `posistion_experience`, `company_name_experience`, `work_date_in_experience`, `work_date_out_experience`, `job_desc_experience`, `experience_created_at`, `experience_updated_at`) VALUES
(1, 1, 'Manager', 'GoNeng', '2021-03-02', '2021-05-04', 'lorem', '2021-05-11 14:53:52', NULL),
(2, 1, 'Junior Programer', 'Jasaraharja', '2020-12-01', '2021-01-13', 'ipsum', '2021-05-11 14:53:52', NULL),
(3, 1, 'senior android developer', 'tokopedia', '2019-01-01', '2021-02-03', 'lorem ipsum dolor sit amet', '2021-05-15 09:39:54', NULL),
(4, 5, 'senior android developer', 'tokopedia', '2019-01-01', '2021-02-03', 'lorem ipsum dolor sit amet', '2021-05-15 09:40:59', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `portofolio`
--

CREATE TABLE `portofolio` (
  `id_portofolio` int(11) NOT NULL,
  `id_worker` int(11) NOT NULL,
  `app_name_portofolio` varchar(150) NOT NULL,
  `app_desc_portofolio` text NOT NULL,
  `link_public_portofolio` varchar(150) NOT NULL,
  `link_repository_portofolio` varchar(150) NOT NULL,
  `company_name_portofolio` varchar(150) NOT NULL,
  `type_portofolio` enum('mobile','web') NOT NULL,
  `image_portofolio` varchar(150) NOT NULL,
  `portofolio_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `potofolio_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `portofolio`
--

INSERT INTO `portofolio` (`id_portofolio`, `id_worker`, `app_name_portofolio`, `app_desc_portofolio`, `link_public_portofolio`, `link_repository_portofolio`, `company_name_portofolio`, `type_portofolio`, `image_portofolio`, `portofolio_created_at`, `potofolio_updated_at`) VALUES
(1, 1, 'GoClaim', 'some text here', 'http://', 'http://', 'GoNeng', 'mobile', '', '2021-05-11 14:51:35', NULL),
(2, 1, 'GoDosen', 'some text here', 'http://', 'http://', 'GoNeng', 'web', '', '2021-05-11 14:52:13', NULL),
(4, 1, 'axioo', 'lorem ipsum ', 'http://', 'http://', 'GoNeng', 'mobile', '2021-05-15T09-04-05.529Zsquid.jpg', '2021-05-15 09:04:05', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `skill` (
  `id_skill` int(11) NOT NULL,
  `id_worker` int(11) NOT NULL,
  `name_skill` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `skill`
--

INSERT INTO `skill` (`id_skill`, `id_worker`, `name_skill`) VALUES
(5, 5, 'python'),
(6, 5, 'php'),
(7, 5, 'typescript'),
(48, 1, 'Python'),
(49, 1, 'Ruby'),
(50, 1, 'Php'),
(51, 1, 'CSS');

-- --------------------------------------------------------

--
-- Table structure for table `worker`
--

CREATE TABLE `worker` (
  `id_worker` int(11) NOT NULL,
  `is_verified` enum('0','1') NOT NULL,
  `fullname_worker` varchar(150) NOT NULL,
  `work_preference_worker` enum('part-time','full-time') NOT NULL,
  `role_worker` varchar(150) NOT NULL,
  `number_of_skills_worker` int(11) NOT NULL,
  `instagram_worker` varchar(150) NOT NULL,
  `address_worker` varchar(150) NOT NULL,
  `city_worker` varchar(150) NOT NULL,
  `email_worker` varchar(150) NOT NULL,
  `github_worker` varchar(150) NOT NULL,
  `phone_number_worker` varchar(13) NOT NULL,
  `password_worker` varchar(250) NOT NULL,
  `image_worker` varchar(150) NOT NULL,
  `description_worker` varchar(250) NOT NULL,
  `worker_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `worker_updatetd_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `worker`
--

INSERT INTO `worker` (`id_worker`, `is_verified`, `fullname_worker`, `work_preference_worker`, `role_worker`, `number_of_skills_worker`, `instagram_worker`, `address_worker`, `city_worker`, `email_worker`, `github_worker`, `phone_number_worker`, `password_worker`, `image_worker`, `description_worker`, `worker_created_at`, `worker_updatetd_at`) VALUES
(1, '1', 'prapto', 'full-time', 'Android Dev', 4, '@anyNone', 'jl.cendrawasih, sleman, DIY', 'DIY', 'none@gmail.com', 'any-worker', '082234567128', '', '2021-05-15T09-11-24.313Zgta.jpg', 'lorem ipsum ndolop sir amet', '2021-05-11 14:49:14', '2021-05-15 09:11:24'),
(5, '1', 'Nugroho', 'full-time', 'Android Dev', 3, '@nn', 'jl.pegasan, DIY', 'DIY', 'timotius.nugroho.arkademy@gmail.com', 'nn-nn', '088882', '$2b$10$h.IIHkytU.9R8yYLbskU8eL4jWM9RGUDTaPlD8.qpmXsFfw1BfnU6', '', 'lorem ipsum dolor sit amet', '2021-05-12 14:56:56', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id_company`);

--
-- Indexes for table `experience`
--
ALTER TABLE `experience`
  ADD PRIMARY KEY (`id_experience`);

--
-- Indexes for table `portofolio`
--
ALTER TABLE `portofolio`
  ADD PRIMARY KEY (`id_portofolio`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`id_skill`);

--
-- Indexes for table `worker`
--
ALTER TABLE `worker`
  ADD PRIMARY KEY (`id_worker`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id_company` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `experience`
--
ALTER TABLE `experience`
  MODIFY `id_experience` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `portofolio`
--
ALTER TABLE `portofolio`
  MODIFY `id_portofolio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `skill`
--
ALTER TABLE `skill`
  MODIFY `id_skill` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `worker`
--
ALTER TABLE `worker`
  MODIFY `id_worker` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
