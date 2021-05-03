-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2021 at 03:44 PM
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
-- Database: `tiketinaja`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `premiere_id` int(11) NOT NULL,
  `show_time_id` int(11) NOT NULL,
  `booking_ticket` int(11) NOT NULL,
  `booking_total_price` int(11) NOT NULL,
  `booking_payment_method` varchar(150) NOT NULL,
  `booking_status` enum('succes','failed') NOT NULL,
  `booking_updated_at` timestamp NULL DEFAULT current_timestamp(),
  `booking_created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `user_id`, `premiere_id`, `show_time_id`, `booking_ticket`, `booking_total_price`, `booking_payment_method`, `booking_status`, `booking_updated_at`, `booking_created_at`) VALUES
(1, 3, 1, 1, 3, 20, 'ovo', 'succes', '2021-04-26 05:25:22', '2021-05-26 12:25:22'),
(2, 3, 1, 2, 3, 40, 'gpay', 'succes', '2021-04-26 05:30:20', '2021-04-26 12:30:20'),
(3, 3, 1, 4, 4, 12, 'visa', 'succes', '2021-04-26 05:31:33', '2021-03-26 12:31:33'),
(4, 3, 2, 2, 4, 24, 'paypal', 'succes', '2021-04-26 05:33:52', '2021-04-26 12:33:52'),
(5, 3, 2, 2, 3, 18, 'gpay', 'succes', '2021-04-26 05:35:32', '2021-04-26 12:35:32'),
(6, 3, 1, 1, 4, 12, 'paypal', 'succes', '2021-04-26 06:47:20', '2021-04-26 13:47:20'),
(7, 3, 2, 2, 2, 12, 'Bank BRI', 'succes', '2021-04-27 00:41:44', '2021-04-27 07:41:44');

-- --------------------------------------------------------

--
-- Table structure for table `booking_seat`
--

CREATE TABLE `booking_seat` (
  `booking_seat_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `booking_seat_location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking_seat`
--

INSERT INTO `booking_seat` (`booking_seat_id`, `booking_id`, `booking_seat_location`) VALUES
(1, 1, 'A1'),
(2, 1, 'A2'),
(3, 1, 'A3'),
(4, 2, 'A6'),
(5, 2, 'B2'),
(6, 2, 'C2'),
(7, 3, 'A7'),
(8, 3, 'A6'),
(9, 3, 'B6'),
(10, 3, 'B7'),
(11, 4, 'G7'),
(12, 4, 'F6'),
(13, 4, 'E5'),
(14, 4, 'F4'),
(15, 5, 'B13'),
(16, 5, 'A14'),
(17, 5, 'D14'),
(18, 6, 'D5'),
(19, 6, 'D6'),
(20, 6, 'E6'),
(21, 6, 'E5'),
(22, 7, 'B11'),
(23, 7, 'A8');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `location_id` int(11) NOT NULL,
  `location_city` varchar(250) NOT NULL,
  `location_addres` varchar(250) NOT NULL,
  `location_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `location_update_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `location_city`, `location_addres`, `location_created_at`, `location_update_at`) VALUES
(1, 'purwokerto', 'jl.pegasan, purwokerto, jawa tengah', '2021-04-26 05:05:24', '2021-04-26 05:05:24'),
(2, 'sleman', 'jl.mangkubumi, sleman , DIY', '2021-04-26 05:05:24', '2021-04-26 05:05:24'),
(3, 'bantul', 'jl.telogo, bantul, DIY', '2021-04-26 05:05:59', '2021-04-26 05:05:59'),
(4, 'mangkulangit', 'jl.sudrajat, mangkulangit, DIY', '2021-04-28 15:44:01', '2021-04-28 15:44:01'),
(6, 'mangkulangit', 'jl.sudrajat 2, mangkulangit, DIY', '2021-04-30 12:47:54', '2021-04-30 12:47:54');

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `movie_id` int(11) NOT NULL,
  `movie_name` varchar(250) NOT NULL,
  `movie_category` varchar(100) NOT NULL,
  `movie_release_date` date NOT NULL,
  `movie_directed_by` varchar(150) NOT NULL,
  `movie_casts` varchar(150) NOT NULL,
  `movie_synopsis` varchar(250) NOT NULL,
  `movie_duration` time NOT NULL,
  `movie_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `movie_updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `movie_image` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`movie_id`, `movie_name`, `movie_category`, `movie_release_date`, `movie_directed_by`, `movie_casts`, `movie_synopsis`, `movie_duration`, `movie_created_at`, `movie_updated_at`, `movie_image`) VALUES
(1, 'Jumaji', 'Action, Comedy', '2021-02-03', 'kang dir-1', 'kang casting-1', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content her', '01:02:00', '2021-04-26 04:59:54', '2021-04-30 13:49:53', '2021-04-30T13-49-53.713Z250px-Jumanji_Welcome_to_the_Jungle_Poster.jpg'),
(2, 'Spiderman', 'Action, Comedy', '2021-01-02', 'kang dir-2', 'kang casting-2', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content her', '03:02:00', '2021-04-26 04:59:54', '2021-04-30 13:51:48', '2021-04-30T13-51-48.324Zg4.png'),
(3, 'Jhon Wick', 'Action', '2021-04-02', 'kang dir-3', 'kang casting-3', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content her', '03:01:00', '2021-04-26 05:01:48', '2021-04-30 13:52:43', '2021-04-30T13-52-43.824Zg6.png'),
(4, 'Tenet', 'Action, slice of life', '2021-05-02', 'kang dir-4', 'kang casting-4', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content her', '01:01:00', '2021-04-26 05:48:25', '2021-04-30 13:54:00', '2021-04-30T13-54-00.058Zg9.png'),
(5, 'Lion King', 'Action, slice of life, drama', '2021-05-02', 'kang dir-5', 'kang casting-5', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content her', '01:31:00', '2021-04-26 05:50:22', '2021-04-30 13:54:47', '2021-04-30T13-54-47.665Zg5.png'),
(6, 'Makan BANG !', 'Action, slice of life, comedy', '2021-05-02', 'kang dir-6', 'kang casting-6', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content her', '01:12:00', '2021-04-26 05:51:20', '2021-04-30 13:56:30', '2021-04-30T13-56-30.553Zmakan_bang.jpg'),
(7, 'Cyber Punk 2077', 'Action, Comedy', '2021-05-02', 'kang dir-7', 'kang casting-7', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content her', '01:12:00', '2021-04-26 05:52:23', '2021-04-30 13:58:05', '2021-04-30T13-58-05.613Zcyber.jpg'),
(19, 'Nichijou', 'Comedy, scile of life', '2021-01-03', 'kang dir-8', 'kang casting-8', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content her', '23:12:00', '2021-04-28 23:17:49', '2021-04-30 13:59:58', '2021-04-30T13-59-58.313Znichijou.jpg'),
(20, 'Tilik', 'Comedy, drama', '2021-02-03', 'kang dir-9', 'kang casting-9', 'mangan opo lek ?', '03:12:00', '2021-04-29 04:56:25', '2021-04-30 14:03:24', '2021-04-30T14-03-24.491Ztilik.jpg'),
(21, 'dawdwx-2', 'sasa', '2021-02-03', 'dir-2', 'kang casting-1', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content her', '01:02:00', '2021-04-29 05:23:21', '2021-04-29 05:27:15', '2021-04-29T05-27-15.224Zg6.png');

-- --------------------------------------------------------

--
-- Table structure for table `premiere`
--

CREATE TABLE `premiere` (
  `premiere_id` int(11) NOT NULL,
  `movie_id` varchar(150) NOT NULL,
  `location_id` int(11) NOT NULL,
  `premiere_name` varchar(250) NOT NULL,
  `premiere_price` int(11) NOT NULL,
  `premiere_logo` varchar(150) NOT NULL,
  `premiere_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `premiere_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `premiere`
--

INSERT INTO `premiere` (`premiere_id`, `movie_id`, `location_id`, `premiere_name`, `premiere_price`, `premiere_logo`, `premiere_created_at`, `premiere_updated_at`) VALUES
(1, '1', 1, 'copter.id', 3, '2021-04-30T13-41-23.136Zlogo_2.png', '2021-04-26 05:10:01', '2021-04-30 13:41:23'),
(2, '1', 2, 'odroid.id', 6, '2021-04-30T13-42-24.022Zlogo_3.png', '2021-04-26 05:10:01', '2021-04-30 13:42:24'),
(3, '1', 3, 'pixhawk.id', 10, '2021-04-30T13-43-45.638Zlogo_4.png', '2021-04-26 05:11:09', '2021-04-30 13:43:45'),
(10, '2', 4, 'odroid.id', 12, '2021-04-30T13-45-08.322Zlogo_3.png', '2021-04-30 12:43:50', '2021-04-30 13:45:08'),
(11, '1', 4, 'odroid.id', 12, '2021-04-30T13-45-41.542Zlogo_3.png', '2021-04-30 12:46:12', '2021-04-30 13:45:41');

-- --------------------------------------------------------

--
-- Table structure for table `show_time`
--

CREATE TABLE `show_time` (
  `show_time_id` int(11) NOT NULL,
  `show_time_date` date NOT NULL,
  `show_time_clock` varchar(100) NOT NULL,
  `show_time_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `show_time_updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `premiere_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `show_time`
--

INSERT INTO `show_time` (`show_time_id`, `show_time_date`, `show_time_clock`, `show_time_created_at`, `show_time_updated_at`, `premiere_id`) VALUES
(1, '2021-04-22', '09:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 1),
(2, '2021-04-15', '08:00 am', '2021-04-26 05:17:47', '2021-04-26 05:17:47', 2),
(3, '2021-04-22', '10:00 am', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 1),
(4, '2021-04-22', '08:00 pm', '2021-04-26 05:18:47', '2021-04-26 05:18:47', 1),
(5, '2021-07-07', '12:00 pm', '2021-04-28 23:56:42', '2021-04-28 23:58:25', 2),
(7, '2021-07-08', '12:00', '2021-05-03 02:45:06', '2021-05-03 02:45:06', 20);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_role` enum('basic','admin') NOT NULL,
  `user_verification` enum('pending','succes') NOT NULL,
  `user_name` varchar(150) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `user_phone_number` varchar(13) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_profile_image` varchar(150) NOT NULL,
  `user_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_role`, `user_verification`, `user_name`, `user_email`, `user_phone_number`, `user_password`, `user_profile_image`, `user_created_at`, `user_updated_at`) VALUES
(1, 'basic', 'succes', 'timo', 'timo@gmail.com', '1235343627182', '2123', '', '2021-04-27 11:10:31', NULL),
(2, 'basic', 'succes', 'nugo', 'nugo@gmail.com', '088237213782', '$2b$10$ZGRVtkRYm4fYUTxNxFCbhOqUpfHKHQvpioRf8JXpf0kuOClv0sdoG', '', '2021-04-27 11:14:33', NULL),
(5, 'basic', 'pending', 'admin2', 'admin2@gmail.com', '0838232', '$2b$10$BdlrIR9pho0VLLJEfrVNIuPVXjmhcj0JNH72yFeiFGyha73hw8fIW', '', '2021-04-29 07:56:06', NULL),
(6, 'basic', 'succes', 'ext2', 'ext@gmail.com', '083323231', '$2b$10$VkFTl3qKDKSEDLdM1xpvz.TggnKIwx1Y5hdcTyWA6..YJj.W1Ywta', '', '2021-04-29 12:19:09', NULL),
(15, 'admin', 'succes', 'Admin Legend', 'timotiusnugroho999@gmail.com', '1213', '$2b$10$MKbcou./t/KD3HFgPckl8OEf/sXmQhU6W3M//BKX.4PyrE9x8U.7K', '2021-05-03T13-36-11.854Zpp.png', '2021-05-03 10:18:45', NULL),
(19, 'basic', 'succes', 'Samiro Legend 2', 'timotius.nugroho.arkademy@gmail.com', '665645', '$2b$10$STR6bMSCcvGYWEKZGxCiV.Fb.dGNdSxWFd4CLRcu1OlMwbV9Bu8Cy', '2021-05-03T13-33-43.591Zpp.png', '2021-05-03 20:06:49', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `booking_seat`
--
ALTER TABLE `booking_seat`
  ADD PRIMARY KEY (`booking_seat_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`movie_id`);

--
-- Indexes for table `premiere`
--
ALTER TABLE `premiere`
  ADD PRIMARY KEY (`premiere_id`);

--
-- Indexes for table `show_time`
--
ALTER TABLE `show_time`
  ADD PRIMARY KEY (`show_time_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `booking_seat`
--
ALTER TABLE `booking_seat`
  MODIFY `booking_seat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `premiere`
--
ALTER TABLE `premiere`
  MODIFY `premiere_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `show_time`
--
ALTER TABLE `show_time`
  MODIFY `show_time_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
