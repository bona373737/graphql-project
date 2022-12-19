-- MariaDB dump 10.19  Distrib 10.10.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: ojt
-- ------------------------------------------------------
-- Server version	10.10.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company` (
  `company_no` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(50) NOT NULL,
  `business_number` varchar(50) NOT NULL,
  PRIMARY KEY (`company_no`),
  UNIQUE KEY `business_number` (`business_number`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES
(1,'고려상사','8888184952'),
(2,'신라상사','7898145678'),
(14,'백제상사','1238175321'),
(15,'조선상사','4448175321'),
(16,'유진상사','9998175321');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `devices` (
  `device_no` int(11) NOT NULL AUTO_INCREMENT,
  `company_no` int(11) NOT NULL,
  `member_no` int(11) DEFAULT NULL,
  `os` varchar(50) NOT NULL,
  `device_name` varchar(255) NOT NULL,
  `reg_date` timestamp NULL DEFAULT current_timestamp(),
  `device_group` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`device_no`),
  KEY `company_no` (`company_no`),
  KEY `member_no` (`member_no`),
  CONSTRAINT `devices_ibfk_1` FOREIGN KEY (`company_no`) REFERENCES `company` (`company_no`),
  CONSTRAINT `devices_ibfk_2` FOREIGN KEY (`member_no`) REFERENCES `members` (`member_no`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES
(36,1,35,'Linux','장비EEEE','2022-12-10 10:03:18',NULL),
(37,2,37,'Window32','장비QWE','2022-12-10 17:04:54',NULL),
(38,2,39,'Window64','장비TTU','2022-12-10 17:05:13',NULL),
(39,1,35,'Window32','장비장비','2022-12-11 17:37:49',NULL),
(48,1,NULL,'Linux','ddddd','2022-12-14 08:12:33',NULL),
(49,1,NULL,'Linux','Itoms-service-DB','2022-12-14 08:14:29',NULL),
(50,1,NULL,'Linux','Itoms-service-Be','2022-12-14 08:14:32',NULL),
(51,1,NULL,'Linux','Itoms-service-Fe','2022-12-14 08:14:35',NULL),
(52,1,NULL,'Linux','Itoms-service-DB','2022-12-14 09:33:58',NULL),
(53,1,NULL,'Linux','Itoms-service-Be','2022-12-14 09:34:01',NULL),
(54,1,NULL,'Linux','Itoms-service-Fe','2022-12-14 09:34:04',NULL),
(55,1,NULL,'Linux','Itoms-service-DB','2022-12-15 05:51:13',NULL),
(56,1,NULL,'Linux','Itoms-service-Be','2022-12-15 05:51:16',NULL),
(57,1,NULL,'Linux','Itoms-service-Fe','2022-12-15 05:51:20',NULL),
(58,1,NULL,'Linux','용범','2022-12-15 06:40:51',NULL),
(59,1,NULL,'Linux','테스트장비','2022-12-15 06:40:54',NULL),
(60,1,NULL,'Linux','Itoms-service-DB','2022-12-15 06:40:57',NULL),
(61,1,NULL,'Linux','Itoms-service-DB','2022-12-16 05:47:31',NULL),
(62,2,NULL,'Linux','장비CBJ','2022-12-16 05:49:16',NULL),
(63,2,NULL,'Linux','TEW753','2022-12-16 05:50:10',NULL),
(64,1,NULL,'Linux','Itoms-service-DB','2022-12-16 05:59:01',NULL),
(65,1,NULL,'Linux','dkdek','2022-12-19 08:12:57',NULL),
(66,1,NULL,'Linux','아이톰스 웹 디바이스','2022-12-19 08:13:00',NULL),
(67,1,NULL,'Linux','용범','2022-12-19 08:13:03',NULL);
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `members` (
  `member_no` int(11) NOT NULL AUTO_INCREMENT,
  `role_no` int(11) NOT NULL,
  `company_no` int(11) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `id` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `delete_date` datetime DEFAULT NULL,
  `isavailable` tinyint(1) NOT NULL,
  PRIMARY KEY (`member_no`),
  UNIQUE KEY `id` (`id`),
  KEY `company_no` (`company_no`),
  KEY `role_no` (`role_no`),
  CONSTRAINT `members_ibfk_1` FOREIGN KEY (`company_no`) REFERENCES `company` (`company_no`),
  CONSTRAINT `members_ibfk_2` FOREIGN KEY (`role_no`) REFERENCES `role` (`role_no`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES
(2,2,1,'김미미','mimi123','CFAyBu08331qgfgpdaBFjxptVkdI4CQ0iP9d7X4/TJrgeDAWOwXieXmiR9DgMeWF6gWyPLpRO3X/YKnlzLEx9w==','2022-11-25 01:11:53',NULL,1),
(3,1,NULL,'인포플라','infofla','CFAyBu08331qgfgpdaBFjxptVkdI4CQ0iP9d7X4/TJrgeDAWOwXieXmiR9DgMeWF6gWyPLpRO3X/YKnlzLEx9w==','2022-11-25 01:15:36',NULL,1),
(35,3,1,'미미네사용자1','mimiuser1','CFAyBu08331qgfgpdaBFjxptVkdI4CQ0iP9d7X4/TJrgeDAWOwXieXmiR9DgMeWF6gWyPLpRO3X/YKnlzLEx9w==','2022-12-10 08:35:01',NULL,1),
(36,2,2,'김신라','sin123','CFAyBu08331qgfgpdaBFjxptVkdI4CQ0iP9d7X4/TJrgeDAWOwXieXmiR9DgMeWF6gWyPLpRO3X/YKnlzLEx9w==','2022-12-10 09:08:17',NULL,0),
(37,3,2,'신라네사용자1','sinuser1','CFAyBu08331qgfgpdaBFjxptVkdI4CQ0iP9d7X4/TJrgeDAWOwXieXmiR9DgMeWF6gWyPLpRO3X/YKnlzLEx9w==','2022-12-10 10:57:15',NULL,0),
(38,3,2,'신라네사용자2','sinuser2','CFAyBu08331qgfgpdaBFjxptVkdI4CQ0iP9d7X4/TJrgeDAWOwXieXmiR9DgMeWF6gWyPLpRO3X/YKnlzLEx9w==','2022-12-10 10:59:24',NULL,1),
(39,3,2,'신라네사용자3','sinuser3','CFAyBu08331qgfgpdaBFjxptVkdI4CQ0iP9d7X4/TJrgeDAWOwXieXmiR9DgMeWF6gWyPLpRO3X/YKnlzLEx9w==','2022-12-10 11:10:38',NULL,1),
(50,2,1,'sss','sss','bSwH5gTTRcVSwwmEzcWxHbZYPM1akW1Id/Owjx4gepLFCjt0+jT+yUaOzENVE+oBsm+OmVa7d0OWwvSeQ3JfKg==','2022-12-12 05:20:07',NULL,1),
(51,2,2,'신라신ㄹ','sin1444','q7SyTV8nr1qgH2JctBzyFCsc2Q3hWa4k45qsvhnE0H95Fi6VYUIIOYSk7+MxH7uQNauu4eyWqxiF7iQ6kHKAzA==','2022-12-12 05:59:13',NULL,1),
(52,2,14,'유백제','baek123','CFAyBu08331qgfgpdaBFjxptVkdI4CQ0iP9d7X4/TJrgeDAWOwXieXmiR9DgMeWF6gWyPLpRO3X/YKnlzLEx9w==','2022-12-13 04:09:00',NULL,1);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `role_no` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  PRIMARY KEY (`role_no`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES
(2,'기업관리자'),
(3,'사용자'),
(1,'사이트관리자');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-19 17:44:31
