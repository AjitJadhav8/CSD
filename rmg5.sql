CREATE DATABASE  IF NOT EXISTS `rmg5` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `rmg5`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: rmg5
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `master_category`
--

DROP TABLE IF EXISTS `master_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `sector` varchar(255) DEFAULT NULL,
  `industry` varchar(255) DEFAULT NULL,
  `domain` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_category`
--

LOCK TABLES `master_category` WRITE;
/*!40000 ALTER TABLE `master_category` DISABLE KEYS */;
INSERT INTO `master_category` VALUES (31,'Materials','JSW Steel Ltd.','Steel Manufacturing',0,'2025-04-04 18:01:13','2025-04-04 18:01:13'),(32,'Consumer Services','Restaurants & Food Service','Quick-Service Restaurants (QSR)',0,'2025-04-04 18:01:49','2025-04-04 18:01:49'),(33,'Technology','Software','AI',0,'2025-04-04 18:02:11','2025-04-04 18:02:11'),(34,'Technology','Software','SAP',0,'2025-04-14 10:59:47','2025-04-14 10:59:47'),(35,'Corporate E -Learning','Aptara Corp','Corporate Learning',0,'2025-04-14 11:47:46','2025-04-14 11:47:46'),(36,'Manufacturing','Century Enka Ltd.','Textile Manufacturing',0,'2025-04-15 10:36:43','2025-04-15 10:36:43');
/*!40000 ALTER TABLE `master_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_customer`
--

DROP TABLE IF EXISTS `master_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) NOT NULL,
  `customer_company_website` varchar(255) DEFAULT NULL,
  `customer_email` varchar(255) DEFAULT NULL,
  `customer_phone` varchar(15) DEFAULT NULL,
  `customer_alternate_phone` varchar(15) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `customer_city` varchar(100) DEFAULT NULL,
  `customer_state` varchar(100) DEFAULT NULL,
  `customer_pincode` varchar(10) DEFAULT NULL,
  `customer_country` varchar(100) DEFAULT NULL,
  `customer_description` text,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT '1',
  `is_new` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`customer_id`),
  KEY `master_customer_ibfk_1` (`category_id`),
  CONSTRAINT `master_customer_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `master_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_customer`
--

LOCK TABLES `master_customer` WRITE;
/*!40000 ALTER TABLE `master_customer` DISABLE KEYS */;
INSERT INTO `master_customer` VALUES (27,'JSW Steel Ltd.','','','','',31,'','','','','',0,'2025-04-04 18:03:26','2025-04-04 18:03:26',1,0),(28,'Restaurants Brand Asia Ltd.',NULL,NULL,NULL,NULL,32,NULL,NULL,NULL,NULL,NULL,0,'2025-04-04 18:04:04','2025-04-07 10:48:36',1,0),(29,'Credenca Data Solutions',NULL,NULL,NULL,NULL,33,NULL,NULL,NULL,NULL,NULL,0,'2025-04-04 18:04:35','2025-04-04 18:04:35',1,0),(30,'Prominotech','','','','',33,'','','','','',0,'2025-04-10 05:15:42','2025-04-10 05:15:42',1,0),(31,'Primus Techsystems Private Limited','','','','',34,'','','','','',0,'2025-04-14 11:01:58','2025-04-14 11:01:58',1,0),(32,'Aptara Corp','','','','',35,'','','','','',0,'2025-04-14 11:48:59','2025-04-14 11:48:59',1,0),(33,'Century Enka Ltd','','','','',36,'','','','','',0,'2025-04-15 10:37:37','2025-04-15 10:37:37',1,0);
/*!40000 ALTER TABLE `master_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_department`
--

DROP TABLE IF EXISTS `master_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_department` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_department`
--

LOCK TABLES `master_department` WRITE;
/*!40000 ALTER TABLE `master_department` DISABLE KEYS */;
/*!40000 ALTER TABLE `master_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_designation`
--

DROP TABLE IF EXISTS `master_designation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_designation` (
  `designation_id` int NOT NULL AUTO_INCREMENT,
  `designation_name` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`designation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_designation`
--

LOCK TABLES `master_designation` WRITE;
/*!40000 ALTER TABLE `master_designation` DISABLE KEYS */;
INSERT INTO `master_designation` VALUES (7,'Data Scientist',1,'2025-04-15 10:44:39','2025-04-15 10:45:35');
/*!40000 ALTER TABLE `master_designation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_project`
--

DROP TABLE IF EXISTS `master_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_project` (
  `project_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `project_name` varchar(255) DEFAULT NULL,
  `planned_start_date` date DEFAULT NULL,
  `actual_start_date` date DEFAULT NULL,
  `type_of_project_id` int DEFAULT NULL,
  `type_of_engagement_id` int DEFAULT NULL,
  `project_manager_id` int DEFAULT NULL,
  `project_status_id` int DEFAULT NULL,
  `tentative_end_date` date DEFAULT NULL,
  `project_description` text,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`),
  KEY `customer_id` (`customer_id`),
  KEY `type_of_project_id` (`type_of_project_id`),
  KEY `type_of_engagement_id` (`type_of_engagement_id`),
  KEY `project_manager_id` (`project_manager_id`),
  KEY `project_status_id` (`project_status_id`),
  CONSTRAINT `master_project_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `master_customer` (`customer_id`),
  CONSTRAINT `master_project_ibfk_2` FOREIGN KEY (`type_of_project_id`) REFERENCES `master_type_of_project` (`type_of_project_id`),
  CONSTRAINT `master_project_ibfk_3` FOREIGN KEY (`type_of_engagement_id`) REFERENCES `master_type_of_engagement` (`type_of_engagement_id`),
  CONSTRAINT `master_project_ibfk_4` FOREIGN KEY (`project_manager_id`) REFERENCES `master_user` (`user_id`),
  CONSTRAINT `master_project_ibfk_5` FOREIGN KEY (`project_status_id`) REFERENCES `master_project_status` (`project_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_project`
--

LOCK TABLES `master_project` WRITE;
/*!40000 ALTER TABLE `master_project` DISABLE KEYS */;
INSERT INTO `master_project` VALUES (16,28,'Tableau BI Project','2024-10-03','2024-10-03',2,1,37,2,'2025-12-31','',0,'2025-04-04 18:14:36','2025-04-04 18:14:36'),(17,27,'Azure and Power BI Support','2025-02-01','2025-02-01',2,1,43,2,'2025-06-30',NULL,0,'2025-04-04 18:16:29','2025-04-04 18:16:29'),(18,29,'Internal - Rahul','2025-03-25','2025-03-25',1,2,34,1,'2025-03-28',NULL,0,'2025-04-04 18:17:42','2025-04-04 18:17:42'),(19,29,'Internal - Learning','2025-04-08','2025-04-08',2,2,34,1,'2028-08-31','',0,'2025-04-08 13:05:31','2025-04-08 13:05:31'),(20,30,'WebApp','2025-04-10','2025-04-10',1,2,32,2,'2025-04-30','',0,'2025-04-10 05:16:27','2025-04-10 05:16:27'),(21,31,'HR & Finance Dashboards','2025-02-03','2025-02-03',2,1,42,2,'2025-05-16','',0,'2025-04-14 11:03:49','2025-04-14 11:03:49'),(22,29,'Internal - Learning/Sessions','2025-04-14','2025-04-14',1,2,42,2,'2025-12-31','',0,'2025-04-14 11:36:29','2025-04-14 11:36:29'),(23,32,'Storyboard Creation','2025-04-07','2025-04-07',1,2,36,2,'2025-04-21','',0,'2025-04-14 11:51:26','2025-04-14 11:51:26'),(24,33,'Inventory Predictive analytics','2025-03-17','2025-03-17',1,2,42,2,'2025-05-30','',0,'2025-04-15 10:40:30','2025-04-15 10:40:30');
/*!40000 ALTER TABLE `master_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_project_deliverables`
--

DROP TABLE IF EXISTS `master_project_deliverables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_project_deliverables` (
  `pd_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `project_id` int DEFAULT NULL,
  `project_deliverable_name` varchar(255) NOT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pd_id`),
  KEY `fk_project_deliverables_project` (`project_id`),
  KEY `fk_deliverable_customer` (`customer_id`),
  CONSTRAINT `fk_deliverable_customer` FOREIGN KEY (`customer_id`) REFERENCES `master_customer` (`customer_id`),
  CONSTRAINT `fk_project_deliverables_project` FOREIGN KEY (`project_id`) REFERENCES `master_project` (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_project_deliverables`
--

LOCK TABLES `master_project_deliverables` WRITE;
/*!40000 ALTER TABLE `master_project_deliverables` DISABLE KEYS */;
INSERT INTO `master_project_deliverables` VALUES (25,28,16,'Requirement Gathering',0,'2025-04-07 12:31:50','2025-04-07 12:31:50'),(26,28,16,'SSIS Packages',0,'2025-04-07 12:35:05','2025-04-07 12:35:05'),(27,28,16,'ETL Design',0,'2025-04-07 12:35:23','2025-04-07 12:35:23'),(28,28,16,'Deployment ',0,'2025-04-07 12:35:36','2025-04-07 12:35:36'),(29,28,16,'Performance Tuning',0,'2025-04-07 12:39:27','2025-04-07 12:39:27'),(30,28,16,'Verification and Validations',0,'2025-04-07 12:39:48','2025-04-07 12:39:48'),(31,28,16,'Tableau Workbooks',0,'2025-04-07 12:43:19','2025-04-07 12:43:19'),(32,28,16,'Tableau Server Reports/Dashboards',0,'2025-04-07 12:43:41','2025-04-07 12:43:41'),(33,28,16,'User Guides',0,'2025-04-07 12:43:57','2025-04-07 12:43:57'),(34,28,16,'Requirements Documents',0,'2025-04-07 12:44:18','2025-04-07 12:44:18'),(35,28,16,'Testing Documentation',0,'2025-04-07 12:44:36','2025-04-07 12:44:36'),(36,27,17,'PBI Dashboard',0,'2025-04-07 12:50:21','2025-04-07 12:50:21'),(37,27,17,'Deployment',0,'2025-04-07 12:51:26','2025-04-07 12:51:26'),(38,27,17,'ETL Design',0,'2025-04-07 12:51:44','2025-04-07 12:51:44'),(39,27,17,'Verification and Validations',0,'2025-04-07 12:54:56','2025-04-07 12:54:56'),(40,28,16,'Internal Meeting',0,'2025-04-07 12:58:13','2025-04-07 12:58:13'),(41,28,16,'Daily Customer Meeting',0,'2025-04-07 12:58:45','2025-04-07 12:58:45'),(42,27,17,'Requirement Gathering',0,'2025-04-07 12:59:38','2025-04-07 12:59:38'),(43,28,16,'Learning and Development',0,'2025-04-07 13:00:28','2025-04-07 13:00:28'),(44,28,16,'Knowledge Transfer and Sharing',0,'2025-04-07 13:02:00','2025-04-07 13:02:00'),(45,27,17,'Environment Setup',0,'2025-04-07 13:02:26','2025-04-07 13:02:26'),(46,28,16,'Adhoc Customer Meeting',0,'2025-04-07 13:24:11','2025-04-07 13:24:11'),(47,28,16,'Requirement Analysis',0,'2025-04-08 07:22:31','2025-04-08 07:22:31'),(48,28,16,'ETL Process Monitoring',0,'2025-04-08 07:38:15','2025-04-08 07:38:15'),(49,28,16,'Tableau Process Monitoring',0,'2025-04-08 07:38:37','2025-04-08 07:38:37'),(50,28,16,'Incident / Issue Analysis',0,'2025-04-08 07:39:14','2025-04-08 07:39:14'),(51,28,16,'Incident / Issue Resolution',0,'2025-04-08 07:39:33','2025-04-08 07:39:33'),(52,28,16,'Communication & Co-ordination',0,'2025-04-08 07:39:59','2025-04-08 07:39:59'),(53,30,20,'Del1',0,'2025-04-10 05:16:52','2025-04-10 05:16:52'),(54,31,21,'Attendance and Certification Report',0,'2025-04-14 11:33:19','2025-04-14 11:33:19'),(55,31,21,'Finance Dashboards',0,'2025-04-14 11:33:33','2025-04-14 11:33:33'),(56,32,23,'Storyboard',0,'2025-04-14 11:52:19','2025-04-14 11:52:19'),(57,29,22,'Phase 1',1,'2025-04-14 11:56:39','2025-04-14 11:57:38'),(58,29,22,'Internal Learning/ Sessions',0,'2025-04-14 11:58:04','2025-04-14 11:58:04'),(59,33,24,'Trained model, data analysis report',0,'2025-04-15 10:41:36','2025-04-15 10:41:36');
/*!40000 ALTER TABLE `master_project_deliverables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_project_phases`
--

DROP TABLE IF EXISTS `master_project_phases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_project_phases` (
  `phase_id` int NOT NULL AUTO_INCREMENT,
  `pd_id` int DEFAULT NULL,
  `project_phase_name` varchar(255) NOT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`phase_id`),
  KEY `fk_phase_deliverable` (`pd_id`),
  CONSTRAINT `fk_phase_deliverable` FOREIGN KEY (`pd_id`) REFERENCES `master_project_deliverables` (`pd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_project_phases`
--

LOCK TABLES `master_project_phases` WRITE;
/*!40000 ALTER TABLE `master_project_phases` DISABLE KEYS */;
INSERT INTO `master_project_phases` VALUES (21,25,'Requirement Gathering',0,'2025-04-07 12:32:30','2025-04-07 12:32:30'),(22,26,'Development',0,'2025-04-07 12:45:12','2025-04-07 12:45:12'),(23,27,'Development',0,'2025-04-07 12:45:22','2025-04-07 12:45:22'),(24,28,'Deployment',0,'2025-04-07 12:45:36','2025-04-07 12:45:36'),(25,29,'Support and Maintenance',0,'2025-04-07 12:46:14','2025-04-07 12:46:14'),(26,30,'Quality Assurance',0,'2025-04-07 12:46:29','2025-04-07 12:46:29'),(27,31,'Development',0,'2025-04-07 12:46:38','2025-04-07 12:46:38'),(28,32,'Support and Maintenance',0,'2025-04-07 12:47:03','2025-04-07 12:47:03'),(29,33,'Documentation',0,'2025-04-07 12:47:20','2025-04-07 12:47:35'),(30,34,'Documentation',0,'2025-04-07 12:47:48','2025-04-07 12:47:48'),(31,35,'Documentation',0,'2025-04-07 12:47:59','2025-04-07 12:47:59'),(32,36,'Development',0,'2025-04-07 12:57:25','2025-04-07 12:57:25'),(33,38,'Development',0,'2025-04-07 12:58:00','2025-04-07 12:58:00'),(34,37,'Deployment',0,'2025-04-07 12:58:21','2025-04-07 12:58:21'),(35,39,'Unit Testing',0,'2025-04-07 12:59:23','2025-04-07 12:59:23'),(36,40,'Meetings',0,'2025-04-07 12:59:34','2025-04-07 12:59:34'),(37,41,'Meetings',0,'2025-04-07 12:59:45','2025-04-07 12:59:45'),(38,43,'Learning and Development',0,'2025-04-07 13:01:15','2025-04-07 13:01:15'),(39,44,'Knowledge Transfer and Sharing',0,'2025-04-07 13:02:38','2025-04-07 13:02:38'),(40,42,'Requirement Gathering',0,'2025-04-07 13:02:52','2025-04-07 13:02:52'),(41,45,'Pre-Development',0,'2025-04-07 13:04:24','2025-04-07 13:04:24'),(42,46,'Meetings',0,'2025-04-07 13:24:56','2025-04-07 13:24:56'),(43,47,'Requirement Gathering',0,'2025-04-08 07:22:51','2025-04-08 07:22:51'),(44,48,'Support and Maintenance',0,'2025-04-08 07:40:41','2025-04-08 07:40:41'),(45,49,'Support and Maintenance',0,'2025-04-08 07:40:55','2025-04-08 07:40:55'),(46,50,'Support and Maintenance',0,'2025-04-08 07:41:07','2025-04-08 07:41:07'),(47,51,'Support and Maintenance',0,'2025-04-08 07:41:23','2025-04-08 07:41:23'),(48,52,'Support and Maintenance',0,'2025-04-08 07:41:46','2025-04-08 07:41:46'),(49,53,'Phase1',0,'2025-04-10 05:17:08','2025-04-10 05:17:08'),(50,54,' Phase 1',0,'2025-04-14 11:33:52','2025-04-14 11:33:52'),(51,55,' Phase 1',0,'2025-04-14 11:34:04','2025-04-14 11:34:04'),(52,56,' Phase 1',0,'2025-04-14 11:52:33','2025-04-14 11:52:33'),(53,58,'Phase 1',0,'2025-04-14 11:58:21','2025-04-14 11:58:21'),(54,59,'Phase 1',0,'2025-04-15 10:42:03','2025-04-15 10:42:03');
/*!40000 ALTER TABLE `master_project_phases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_project_role`
--

DROP TABLE IF EXISTS `master_project_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_project_role` (
  `project_role_id` int NOT NULL AUTO_INCREMENT,
  `project_role_name` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_project_role`
--

LOCK TABLES `master_project_role` WRITE;
/*!40000 ALTER TABLE `master_project_role` DISABLE KEYS */;
INSERT INTO `master_project_role` VALUES (10,'Project Manager',0,'2025-04-04 18:16:49','2025-04-04 18:16:49'),(11,'Tableau Developer',0,'2025-04-04 18:16:53','2025-04-04 18:16:53'),(12,'SSIS Developer',0,'2025-04-04 18:16:58','2025-04-04 18:16:58'),(13,'Business Analyst',0,'2025-04-04 18:17:10','2025-04-04 18:17:10'),(14,'Python Developer',0,'2025-04-04 18:17:16','2025-04-04 18:17:16'),(15,'Data Science Developer',0,'2025-04-04 18:17:20','2025-04-04 18:17:20'),(16,'Azure Data Engineer',0,'2025-04-04 18:17:25','2025-04-04 18:17:25'),(17,'Power BI Developer',0,'2025-04-04 18:17:31','2025-04-04 18:17:31'),(18,'Executive Assistant to CEO',0,'2025-04-04 18:29:51','2025-04-04 18:29:51'),(19,'AI Developer',0,'2025-04-14 11:54:14','2025-04-14 11:54:14'),(20,'Data Scientist',0,'2025-04-15 10:45:47','2025-04-15 10:45:47'),(21,'Internal',0,'2025-04-25 05:26:20','2025-04-25 05:26:20');
/*!40000 ALTER TABLE `master_project_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_project_status`
--

DROP TABLE IF EXISTS `master_project_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_project_status` (
  `project_status_id` int NOT NULL AUTO_INCREMENT,
  `status_name` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_project_status`
--

LOCK TABLES `master_project_status` WRITE;
/*!40000 ALTER TABLE `master_project_status` DISABLE KEYS */;
INSERT INTO `master_project_status` VALUES (1,'Initiated',0,'2025-02-19 09:56:46','2025-02-19 09:56:46'),(2,'In Progress',0,'2025-02-19 09:56:46','2025-02-19 09:56:46'),(3,'Completed',0,'2025-02-19 09:56:46','2025-02-19 09:56:46'),(4,'On Hold',0,'2025-02-19 09:56:46','2025-02-19 09:56:46');
/*!40000 ALTER TABLE `master_project_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_role`
--

DROP TABLE IF EXISTS `master_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_role`
--

LOCK TABLES `master_role` WRITE;
/*!40000 ALTER TABLE `master_role` DISABLE KEYS */;
INSERT INTO `master_role` VALUES (1,'superadmin',0,'2025-02-18 06:25:18','2025-02-18 06:25:18'),(3,'projectManager',1,'2025-03-04 04:29:39','2025-03-21 10:12:48'),(4,'employee',0,'2025-03-06 13:16:31','2025-03-06 13:16:31'),(5,'Developer',0,'2025-04-17 10:58:41','2025-04-17 10:58:41');
/*!40000 ALTER TABLE `master_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_skill`
--

DROP TABLE IF EXISTS `master_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_skill` (
  `skill_id` int NOT NULL AUTO_INCREMENT,
  `skill_name` varchar(255) DEFAULT NULL,
  `skill_category` varchar(255) DEFAULT NULL,
  `skill_description` text,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`skill_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_skill`
--

LOCK TABLES `master_skill` WRITE;
/*!40000 ALTER TABLE `master_skill` DISABLE KEYS */;
/*!40000 ALTER TABLE `master_skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_task_category`
--

DROP TABLE IF EXISTS `master_task_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_task_category` (
  `task_cat_id` int NOT NULL AUTO_INCREMENT,
  `task_category_name` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`task_cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_task_category`
--

LOCK TABLES `master_task_category` WRITE;
/*!40000 ALTER TABLE `master_task_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `master_task_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_type_of_engagement`
--

DROP TABLE IF EXISTS `master_type_of_engagement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_type_of_engagement` (
  `type_of_engagement_id` int NOT NULL AUTO_INCREMENT,
  `type_of_engagement_name` varchar(255) NOT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`type_of_engagement_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_type_of_engagement`
--

LOCK TABLES `master_type_of_engagement` WRITE;
/*!40000 ALTER TABLE `master_type_of_engagement` DISABLE KEYS */;
INSERT INTO `master_type_of_engagement` VALUES (1,'Billed',0,'2025-02-19 09:56:40','2025-02-19 09:56:40'),(2,'Not Billed',0,'2025-02-19 09:56:40','2025-02-19 09:56:40');
/*!40000 ALTER TABLE `master_type_of_engagement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_type_of_project`
--

DROP TABLE IF EXISTS `master_type_of_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_type_of_project` (
  `type_of_project_id` int NOT NULL AUTO_INCREMENT,
  `project_type_name` varchar(255) NOT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`type_of_project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_type_of_project`
--

LOCK TABLES `master_type_of_project` WRITE;
/*!40000 ALTER TABLE `master_type_of_project` DISABLE KEYS */;
INSERT INTO `master_type_of_project` VALUES (1,'POC',0,'2025-02-19 09:56:43','2025-02-19 09:56:43'),(2,'Project',0,'2025-02-19 09:56:43','2025-02-19 09:56:43');
/*!40000 ALTER TABLE `master_type_of_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_user`
--

DROP TABLE IF EXISTS `master_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_code` varchar(50) DEFAULT NULL,
  `user_first_name` varchar(100) DEFAULT NULL,
  `user_middle_name` varchar(100) DEFAULT NULL,
  `user_last_name` varchar(100) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) NOT NULL DEFAULT '123',
  `is_passport` tinyint(1) DEFAULT NULL,
  `passport_validity` date DEFAULT NULL,
  `user_current_address` text,
  `user_contact` varchar(15) DEFAULT NULL,
  `user_emergency_contact` varchar(15) DEFAULT NULL,
  `user_DOB` date DEFAULT NULL,
  `user_blood_group` varchar(5) DEFAULT NULL,
  `user_DOJ` date DEFAULT NULL,
  `is_RM` tinyint(1) DEFAULT '0',
  `is_PM` tinyint(1) DEFAULT '0',
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` bigint DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_user`
--

LOCK TABLES `master_user` WRITE;
/*!40000 ALTER TABLE `master_user` DISABLE KEYS */;
INSERT INTO `master_user` VALUES (1,'SUPER001','Super',NULL,'Admin','super@gmail.com','$2b$10$yzTqvF1sBCKrxSxrE5JhmuYdp/Z5unCyjUwaDzyhJ4Zx8O8jbYRYG',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,'2025-04-04 14:25:19','2025-04-25 06:49:38',NULL,NULL),(32,'123','Chaitanya','','Chandgude','chaitanya.chandgude@credenca.com','$2b$10$onXbuBMEu5gZxmUQERHuzenGyeQlQ1VoCw3F.3m.7/HuPWSqR5nki',NULL,NULL,'','9552635552','',NULL,'',NULL,0,1,0,'2025-04-04 17:56:07','2025-04-25 06:49:38',NULL,NULL),(33,'400138','Ajit',NULL,'Jadhav','ajit.jadhav@credenca.com','$2b$10$YPt7CHZrYFaYLM7vg.CNTumuLuoUUDxKOt7jDfZfJMpiI8RTwrJGm',NULL,NULL,NULL,'7385980604',NULL,NULL,NULL,NULL,0,0,0,'2025-04-04 17:56:55','2025-04-25 06:49:39',NULL,NULL),(34,'40014','Sushil','','Shinde','sushil.shinde@credenca.com','$2b$10$V9BWaGEmT5O1i8ccpt9YyuZI0Dly0F2nrJVy/iSy3wNeym8QS8y0O',NULL,NULL,'','8805992525','',NULL,'',NULL,0,1,0,'2025-04-04 18:01:14','2025-04-25 06:49:39',NULL,NULL),(35,'40002','Gayatri',NULL,'Pardeshi','gayatri.pardeshi@credenca.com','$2b$10$owKWyg2taYEdit6cEBHcI.nAyeoW3xQg53ArtH46Nh67HKOZ.Qs1e',NULL,NULL,'','7887459136','',NULL,'',NULL,0,0,0,'2025-04-04 18:02:09','2025-04-25 06:49:39',NULL,NULL),(36,'40001','Rahul',NULL,'Sawant','rahul.sawant@credenca.com','$2b$10$OPkC2Qm0VepiKGBbu.9JNujexfVhn9.NPFBTGCv0a.fUKSPfYbw4.',NULL,NULL,'','8830952167','',NULL,'',NULL,0,1,0,'2025-04-04 18:02:41','2025-04-25 06:49:39',NULL,NULL),(37,'400110','Atul',NULL,'Nehete','atul.nehete@credenca.com','$2b$10$WoKOqLv2zES8GoKZSJjy5eS/VRlhKboXSmElI1RSDtfT5bnLZixVy',NULL,NULL,NULL,'9657701153',NULL,NULL,NULL,NULL,0,1,0,'2025-04-04 18:03:14','2025-04-25 06:49:39','ccec35408bcca7d63a4ce53776dc931b28bb403496946e63f94234b6bd55201a',1745323108741),(38,'400095','Shushant',NULL,'Kumar','shushant.kumar02@credenca.com','$2b$10$JagpuERmzeVmNf0uj40JCOTaEcOKjqWSPugkxhKnmQxJxnmMM1fxC',NULL,NULL,NULL,'9019058141',NULL,NULL,NULL,NULL,0,0,0,'2025-04-04 18:03:42','2025-04-25 06:49:39',NULL,NULL),(39,'400080','Sandesh',NULL,'Kadam','sandesh.kadam@credenca.com','$2b$10$HWJUn0ReqVGJwx5MEVy4H.X7dhgpll/HPGuYEpRR5s0sbIRa2XjPK',NULL,NULL,NULL,'7387203758',NULL,NULL,NULL,NULL,0,0,0,'2025-04-04 18:04:10','2025-04-25 06:49:39',NULL,NULL),(40,'400062','Pratik',NULL,'Kharde','pratik.kharde@credenca.com','$2b$10$qaF1qojWdC0zra4iu8jySuk4E4Ugx9D4b8fkHfxMyKDbxtvlK1Vgu',NULL,NULL,NULL,'8983730471',NULL,NULL,NULL,NULL,0,0,0,'2025-04-04 18:04:37','2025-04-25 06:49:39',NULL,NULL),(41,'400149','Mayur',NULL,'Dighe','mayur.dighe@credenca.com','$2b$10$tZ69jl.eaflFbDs6Y6nxO.5XJjwR7cMT8BiOo8WGhhn3F8MSPQ4hK',NULL,NULL,NULL,'9623835668',NULL,NULL,NULL,NULL,0,0,0,'2025-04-04 18:05:15','2025-04-25 06:49:39',NULL,NULL),(42,'400091','Amit',NULL,'Sangrulkar','amit.sangrulkar@credenca.com','$2b$10$X38EHvlmrEVwcoBj7d4jHOWRIrOEFfMCuxHXj38kODFCUcGGS2xna',NULL,NULL,NULL,'9881069187',NULL,NULL,NULL,NULL,0,1,0,'2025-04-04 18:05:44','2025-04-25 06:49:39',NULL,NULL),(43,'400092','Amrish',NULL,'Pawar','amrish.pawar@credenca.com','$2b$10$Cs2OC4BlWQriCHUfzOC0oeP3/kF9x9wcgnA.ONn1gGg.Aw/IC9hZ6',NULL,NULL,NULL,'8639384094',NULL,NULL,NULL,NULL,0,1,0,'2025-04-04 18:06:11','2025-04-25 06:49:39',NULL,NULL),(44,'400136','Vishisht',NULL,'Goutam','vishisht.goutam@credenca.com','$2b$10$8WQNV4OFyV8jg8GQNZILWOUy1e7c3lOVnPHR6skcumyoFkR8zcWQq',NULL,NULL,NULL,'8010744003',NULL,NULL,NULL,NULL,0,0,0,'2025-04-04 18:06:36','2025-04-25 06:49:39',NULL,NULL),(45,'400094','Yash',NULL,'Vyakar','yash.vyakar@credenca.com','$2b$10$n6gD2PM4A/lUrPDKP4d07OZiP.2Rr5dsk7gc22uXuVrLx2MhLYSB.',NULL,NULL,NULL,'8857830726',NULL,NULL,NULL,NULL,0,0,0,'2025-04-04 18:07:08','2025-04-25 06:49:39',NULL,NULL),(46,'400100','Dharmanath',NULL,'Mache','dharmanath.mache@credenca.com','$2b$10$kAqesZLl4cgyCoqfpOM8a.D2Us8jjlgEkut4.bW9M9TX9/IAzS15a',NULL,NULL,NULL,'9881719851',NULL,NULL,NULL,NULL,0,0,0,'2025-04-04 18:07:34','2025-04-25 06:49:39',NULL,NULL),(47,'400075','Vidhi',NULL,'Borele','vidhi.borele@credenca.com','$2b$10$mkea8IHRWN4TBy0vmolnKeWcIA0Az45hYcZHkoIfvZU8jMNQPFfpC',NULL,NULL,NULL,'9422157605',NULL,NULL,NULL,NULL,0,0,0,'2025-04-04 18:08:07','2025-04-25 06:49:39',NULL,NULL),(48,'400056','Pallavi',NULL,'Bolij','pallavi.bolij@credenca.com','$2b$10$PB4wT9tFFQazOPmcMhYOqeC2aKZJlUzI7luZ5naJJLFEpidlaxqfC',NULL,NULL,NULL,'7894561230',NULL,NULL,NULL,NULL,0,0,0,'2025-04-04 18:08:31','2025-04-25 06:49:39',NULL,NULL),(49,'400150','Anushka',NULL,'Ingle','anushka.ingle@credenca.com','$2b$10$W4hNTFVi9HllZk3AERWBoeV9E/Y.mZZOI9SQKvidewhfG.uEn..Jq',NULL,NULL,NULL,'8421799562',NULL,NULL,NULL,NULL,0,0,0,'2025-04-04 18:08:53','2025-04-25 06:49:40',NULL,NULL),(50,'400155','Kaushal','','Chawale','kaushal.chawale@credenca.com','$2b$10$hX7sA/mRd.J7bbLKdbnyGuAp6GIqL8Sjn1FMMNU8XGXIU9q9OWwMW',NULL,NULL,NULL,'9764959709',NULL,NULL,NULL,NULL,0,0,0,'2025-04-14 10:31:59','2025-04-25 06:49:40',NULL,NULL),(51,'400156','Durvankoor',NULL,'Kawale','durvankoor.kawale@credenca.com','$2b$10$nFchEMPDHjf04YbbURLMye8cvnvdoyQK0IPg.KTyzUotBh8N8QUWu',NULL,NULL,NULL,'8530129897',NULL,NULL,NULL,NULL,0,0,0,'2025-04-14 10:33:25','2025-04-25 06:49:40',NULL,NULL),(52,'400159','Pravin',NULL,'Nalawde','pravin.nalawde@credenca.com','$2b$10$uQ406i6gQ9crWVyymzHq6eSwXEepKI0.YDSpqa94eME3P0fBAodsa',NULL,NULL,NULL,'7757946944',NULL,NULL,NULL,NULL,0,0,0,'2025-04-14 10:34:28','2025-04-25 06:49:40',NULL,NULL),(53,'400055','Rushikesh','','Thombre','rushikesh.thombre@credenca.com','$2b$10$MEslaSAYVEt7i2q/.tM4AePxPgBD2FgpHuj8FVeUaXzYCgfusxk8e',NULL,NULL,NULL,'9130626241',NULL,NULL,NULL,NULL,0,0,0,'2025-04-14 10:41:31','2025-04-25 06:49:40',NULL,NULL),(54,'400160','Aditya','','Singh','aditya.singh@credenca.com','$2b$10$2nukFC6SkPwzPAaYWP76..SgQG8dqabsXIN40z6XNi14NQnPnYszy',NULL,NULL,NULL,'7021072189',NULL,NULL,NULL,NULL,0,0,0,'2025-04-15 10:09:13','2025-04-25 06:49:40',NULL,NULL),(55,'400103','Preksha','','Bhavsar','preksha.bhavsar@credenca.com','$2b$10$px0/j7..vVFx2C7Dtyq5Vu2e2MXfCVWf.riUS9q/Z9BMIEmkLojgu',NULL,NULL,NULL,'7720045295',NULL,NULL,NULL,NULL,0,0,0,'2025-04-15 10:28:32','2025-04-25 06:49:40',NULL,NULL),(56,'400127','Karan',NULL,'Tiwari','karan.tiwari@credenca.com','$2b$10$aqc2AeUeHigR/xuNayX1eOs7E0X.w1jXPHvW2vQRBvHUXSv0FsmZi',NULL,NULL,NULL,'8394895048',NULL,NULL,NULL,NULL,0,0,0,'2025-04-15 10:30:55','2025-04-25 06:49:40',NULL,NULL),(57,'Super002','Devang','','Kolhe','dev.kolhe@gmail.com','$2b$10$ZjcDpxdO5bRilaaq3n1g3Op.IQGcNAW5W60FenFQ.PFfP5co3YNUC',NULL,NULL,'','5555555555','',NULL,'',NULL,0,0,0,'2025-04-16 05:27:47','2025-04-25 06:49:40',NULL,NULL),(58,'40099','Test','','Candidate','test@gmail.com','$2b$10$dK40sIucoY74dcBpGP5pf.XR5zN801ovN2AodMZeh6ZPeHAOcEqDy',NULL,NULL,NULL,'4562568954',NULL,NULL,NULL,NULL,0,0,0,'2025-04-25 06:47:28','2025-04-25 06:49:40',NULL,NULL);
/*!40000 ALTER TABLE `master_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_manager_history`
--

DROP TABLE IF EXISTS `project_manager_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_manager_history` (
  `history_id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `user_id` int NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`history_id`),
  KEY `project_id` (`project_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `project_manager_history_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `master_project` (`project_id`),
  CONSTRAINT `project_manager_history_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `master_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_manager_history`
--

LOCK TABLES `project_manager_history` WRITE;
/*!40000 ALTER TABLE `project_manager_history` DISABLE KEYS */;
INSERT INTO `project_manager_history` VALUES (1,16,37,'2025-04-04 23:44:36',NULL,'2025-04-25 05:20:32'),(2,17,43,'2025-04-04 23:46:29',NULL,'2025-04-25 05:20:32'),(3,18,34,'2025-04-04 23:47:42',NULL,'2025-04-25 05:20:32'),(4,19,34,'2025-04-08 18:35:31',NULL,'2025-04-25 05:20:32'),(5,20,32,'2025-04-10 10:46:27',NULL,'2025-04-25 05:20:32'),(6,21,42,'2025-04-14 16:33:49',NULL,'2025-04-25 05:20:32'),(7,22,42,'2025-04-14 17:06:29',NULL,'2025-04-25 05:20:32'),(8,23,36,'2025-04-14 17:21:26',NULL,'2025-04-25 05:20:32'),(9,24,42,'2025-04-15 16:10:30',NULL,'2025-04-25 05:20:32');
/*!40000 ALTER TABLE `project_manager_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trans_assign`
--

DROP TABLE IF EXISTS `trans_assign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trans_assign` (
  `trans_assign_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `reporting_manager_id` int DEFAULT NULL,
  `designation_id` int DEFAULT NULL,
  `is_timesheet_required` tinyint(1) DEFAULT NULL,
  `requirement` text,
  `project_id` int DEFAULT NULL,
  `project_role_id` int DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`trans_assign_id`),
  KEY `employee_id` (`employee_id`),
  KEY `reporting_manager_id` (`reporting_manager_id`),
  KEY `project_id` (`project_id`),
  KEY `project_role_id` (`project_role_id`),
  KEY `trans_assign_ibfk_designation` (`designation_id`),
  CONSTRAINT `trans_assign_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `master_user` (`user_id`),
  CONSTRAINT `trans_assign_ibfk_2` FOREIGN KEY (`reporting_manager_id`) REFERENCES `master_user` (`user_id`),
  CONSTRAINT `trans_assign_ibfk_4` FOREIGN KEY (`project_id`) REFERENCES `master_project` (`project_id`),
  CONSTRAINT `trans_assign_ibfk_5` FOREIGN KEY (`project_role_id`) REFERENCES `master_project_role` (`project_role_id`) ON DELETE CASCADE,
  CONSTRAINT `trans_assign_ibfk_designation` FOREIGN KEY (`designation_id`) REFERENCES `master_designation` (`designation_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_assign`
--

LOCK TABLES `trans_assign` WRITE;
/*!40000 ALTER TABLE `trans_assign` DISABLE KEYS */;
/*!40000 ALTER TABLE `trans_assign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trans_project_team`
--

DROP TABLE IF EXISTS `trans_project_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trans_project_team` (
  `project_team_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `project_id` int DEFAULT NULL,
  `employee_id` int DEFAULT NULL,
  `project_role_id` int DEFAULT NULL,
  `project_manager_id` int DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `allocation_status` tinyint(1) DEFAULT NULL,
  `allocation_percentage` int DEFAULT NULL,
  `billed_status` tinyint(1) DEFAULT '0',
  `billing_percentage` int DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_released` tinyint(1) DEFAULT '0',
  `released_date` date DEFAULT NULL,
  PRIMARY KEY (`project_team_id`),
  KEY `customer_id` (`customer_id`),
  KEY `project_id` (`project_id`),
  KEY `employee_id` (`employee_id`),
  KEY `project_role_id` (`project_role_id`),
  KEY `project_manager_id` (`project_manager_id`),
  CONSTRAINT `trans_project_team_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `master_customer` (`customer_id`),
  CONSTRAINT `trans_project_team_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `master_project` (`project_id`),
  CONSTRAINT `trans_project_team_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `master_user` (`user_id`),
  CONSTRAINT `trans_project_team_ibfk_4` FOREIGN KEY (`project_role_id`) REFERENCES `master_project_role` (`project_role_id`) ON DELETE CASCADE,
  CONSTRAINT `trans_project_team_ibfk_5` FOREIGN KEY (`project_manager_id`) REFERENCES `master_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_project_team`
--

LOCK TABLES `trans_project_team` WRITE;
/*!40000 ALTER TABLE `trans_project_team` DISABLE KEYS */;
INSERT INTO `trans_project_team` VALUES (38,28,16,37,10,37,'2024-10-03','2024-12-31',1,10,1,50,0,'2025-04-04 18:19:56','2025-04-04 18:19:56',0,NULL),(39,27,17,49,17,43,'2025-02-01','2025-06-30',0,0,0,0,0,'2025-04-04 18:20:54','2025-04-04 18:20:54',0,NULL),(40,28,16,38,12,37,'2024-10-03','2025-12-31',1,100,1,50,0,'2025-04-04 18:21:29','2025-04-04 18:21:29',0,NULL),(41,27,17,47,17,43,'2025-02-01','2025-06-30',1,50,1,50,0,'2025-04-04 18:22:11','2025-04-04 18:22:11',0,NULL),(42,28,16,39,11,37,'2024-10-03','2025-12-31',1,100,1,50,0,'2025-04-04 18:22:15','2025-04-04 18:22:15',0,NULL),(43,28,16,40,13,37,'2024-10-03','2025-12-31',1,70,1,50,0,'2025-04-04 18:23:03','2025-04-04 18:23:03',0,NULL),(44,27,17,46,16,43,'2025-02-01','2025-06-30',1,100,1,50,0,'2025-04-04 18:23:16','2025-04-04 18:23:16',0,NULL),(45,28,16,41,11,37,'2024-10-03','2025-12-31',0,0,0,0,0,'2025-04-04 18:23:53','2025-04-04 18:23:53',0,NULL),(46,27,17,43,10,43,'2025-02-01','2025-06-30',1,30,1,20,0,'2025-04-04 18:24:42','2025-04-04 18:24:42',0,NULL),(47,29,18,36,18,34,'2024-01-01','2025-12-31',0,0,0,0,0,'2025-04-04 18:30:24','2025-04-04 18:30:24',0,NULL),(48,30,20,32,10,32,'2025-04-10','2025-04-30',0,90,0,0,0,'2025-04-10 05:17:52','2025-04-10 05:17:52',0,NULL),(49,29,19,32,14,34,'2025-04-10','2025-04-22',0,10,0,0,0,'2025-04-10 05:18:32','2025-04-10 05:18:32',0,NULL),(50,31,21,51,17,42,'2025-04-03','2025-05-16',0,100,0,0,0,'2025-04-14 11:38:06','2025-04-14 11:38:06',0,NULL),(51,29,22,52,16,42,'2025-04-14','2025-12-31',0,100,0,0,0,'2025-04-14 11:39:37','2025-04-14 11:39:37',0,NULL),(52,32,23,50,19,36,'2025-04-07','2025-04-21',0,100,0,0,0,'2025-04-14 11:54:56','2025-04-14 11:54:56',0,NULL),(53,29,22,54,17,42,'2025-04-15','2025-12-31',0,100,0,0,0,'2025-04-15 10:10:35','2025-04-15 10:10:35',0,NULL),(54,29,22,55,19,42,'2025-04-15','2025-12-31',0,0,0,0,0,'2025-04-15 10:33:21','2025-04-15 10:33:21',0,NULL),(55,33,24,45,20,42,'2025-03-17','2025-05-30',0,50,0,0,0,'2025-04-15 10:46:44','2025-04-15 10:46:44',0,NULL),(56,33,24,56,20,42,'2025-03-17','2025-05-30',0,100,0,0,0,'2025-04-15 10:47:32','2025-04-15 10:47:32',0,NULL),(57,29,22,44,20,42,'2025-04-15','2025-12-31',0,100,0,0,0,'2025-04-15 10:51:33','2025-04-15 10:51:33',0,NULL),(59,29,22,1,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(60,29,22,32,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(61,29,22,33,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(62,29,22,34,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(63,29,22,35,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(64,29,22,36,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(65,29,22,37,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(66,29,22,38,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(67,29,22,39,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(68,29,22,40,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(69,29,22,41,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(70,29,22,42,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(71,29,22,43,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(72,29,22,45,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(73,29,22,46,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(74,29,22,47,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(75,29,22,48,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(76,29,22,49,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(77,29,22,50,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(78,29,22,51,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(79,29,22,53,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(80,29,22,56,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:27:13',0,NULL),(81,29,22,57,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 05:27:13','2025-04-25 05:30:00',1,'2025-04-25'),(90,29,22,58,21,42,'2025-04-25',NULL,0,0,0,0,0,'2025-04-25 06:47:28','2025-04-25 06:47:28',0,NULL);
/*!40000 ALTER TABLE `trans_project_team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trans_reporting_manager_history`
--

DROP TABLE IF EXISTS `trans_reporting_manager_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trans_reporting_manager_history` (
  `reporting_manager_history_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `reporting_manager_id` int DEFAULT NULL,
  `from_date` date DEFAULT NULL,
  `till_date` date DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`reporting_manager_history_id`),
  KEY `employee_id` (`employee_id`),
  KEY `reporting_manager_id` (`reporting_manager_id`),
  CONSTRAINT `trans_reporting_manager_history_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `master_user` (`user_id`),
  CONSTRAINT `trans_reporting_manager_history_ibfk_2` FOREIGN KEY (`reporting_manager_id`) REFERENCES `master_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_reporting_manager_history`
--

LOCK TABLES `trans_reporting_manager_history` WRITE;
/*!40000 ALTER TABLE `trans_reporting_manager_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `trans_reporting_manager_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trans_timesheet`
--

DROP TABLE IF EXISTS `trans_timesheet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trans_timesheet` (
  `timesheet_id` int NOT NULL AUTO_INCREMENT,
  `timesheet_date` date DEFAULT NULL,
  `user_id` int NOT NULL,
  `pd_id` int DEFAULT NULL,
  `task_description` text,
  `hours` int DEFAULT NULL,
  `minutes` int DEFAULT NULL,
  `task_status` tinyint(1) DEFAULT '0',
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `phase_id` int NOT NULL,
  PRIMARY KEY (`timesheet_id`),
  KEY `user_id` (`user_id`),
  KEY `pd_id` (`pd_id`),
  KEY `fk_timesheet_phase` (`phase_id`),
  CONSTRAINT `fk_timesheet_deliverable` FOREIGN KEY (`pd_id`) REFERENCES `master_project_deliverables` (`pd_id`),
  CONSTRAINT `fk_timesheet_phase` FOREIGN KEY (`phase_id`) REFERENCES `master_project_phases` (`phase_id`),
  CONSTRAINT `trans_timesheet_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `master_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=257 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_timesheet`
--

LOCK TABLES `trans_timesheet` WRITE;
/*!40000 ALTER TABLE `trans_timesheet` DISABLE KEYS */;
INSERT INTO `trans_timesheet` VALUES (53,'2025-04-07',40,41,'Daily Standup to discuss tasks in process ( GP task, Tableau POC, Issues raised). \nTableau Port issue meeting ',1,0,0,1,'2025-04-07 13:02:40','2025-04-07 13:02:48',37),(54,'2025-04-07',40,41,'Daily Standup to discuss tasks in process ( GP task, Tableau POC, Issues raised). \nTableau Port issue meeting ',1,0,0,0,'2025-04-07 13:02:40','2025-04-07 13:02:40',37),(55,'2025-04-07',40,40,'Client Prep meeting.\nDiscussing the GP validations and tasks to be undertaken\nPort issue updates\nGP D-1 logic discussions',2,0,0,0,'2025-04-07 13:04:13','2025-04-07 13:04:13',36),(56,'2025-04-07',40,43,'Tableau Training',1,30,0,0,'2025-04-07 13:04:55','2025-04-07 13:04:55',38),(57,'2025-04-07',40,41,'Daily task status updates to all the stakeholders',0,15,0,0,'2025-04-07 13:05:42','2025-04-07 13:05:42',37),(58,'2025-04-07',46,39,'Data Validation of Travel and Reimbursement reports and meeting with Q2t Vendor and Denish Sir',8,0,1,0,'2025-04-07 13:06:39','2025-04-07 13:06:39',35),(59,'2025-04-07',47,36,'1) Checking the data for Travel and reimbursement Dashboard with Denish Sir and Dharmanath and changing the logics.  \n2) Checking the formatting of dashboards with Anushka. \n3)  Presenting the Predictive Analysis Dashboard to Primus team. ',8,0,0,0,'2025-04-07 13:07:25','2025-04-07 13:07:25',32),(60,'2025-04-07',39,40,'Client Call Preparation',0,30,1,0,'2025-04-07 13:19:46','2025-04-07 13:19:46',36),(61,'2025-04-07',39,41,'Daily Status Update',0,30,1,0,'2025-04-07 13:20:09','2025-04-07 13:20:09',37),(62,'2025-04-07',39,30,'Monitor package & validate data',3,0,1,0,'2025-04-07 13:21:18','2025-04-07 13:21:18',26),(63,'2025-04-07',39,46,'Meeting with client for changing firewall rules for Tableau Server on 175 machine',1,0,1,0,'2025-04-07 13:25:46','2025-04-07 13:25:46',42),(64,'2025-04-07',39,30,'Validation of GP data for Agg sale test table & D-1 logic on test table',3,0,1,0,'2025-04-07 13:26:16','2025-04-07 13:26:16',26),(65,'2025-04-07',38,26,'Developed and tested the logic to provide GP data at D-1 by referring to the latest unit cost. Until now, it was based on D-2.',8,0,0,0,'2025-04-08 08:27:14','2025-04-08 08:27:14',22),(66,'2025-04-08',40,40,'1. Daily client prep\n2. Discussed the GP refresh and pain points\n3. Optimizations documentation discussion',2,0,0,0,'2025-04-08 12:24:21','2025-04-08 12:24:21',36),(67,'2025-04-08',40,30,'ETL Validations after 45 days refresh (Main package)',0,30,0,0,'2025-04-08 12:25:07','2025-04-08 12:25:07',26),(68,'2025-04-08',40,41,'Daily connect: Discussed the GP data refresh requirements and other tasks with SP and team',0,30,0,0,'2025-04-08 12:26:13','2025-04-08 12:26:13',37),(69,'2025-04-08',40,52,'Rescheduling of meetings, Status updates after each process, Monitoring of the activities in progress',1,0,0,0,'2025-04-08 12:27:37','2025-04-08 12:27:37',48),(70,'2025-04-08',40,43,'Tableau training ',1,0,0,0,'2025-04-08 12:28:16','2025-04-08 12:28:16',38),(71,'2025-04-08',46,39,'Validation of Travel data and Talent pool data with Denish sir and vidhi in Synapse notebook and in sql.\nMeetings with Sanjay sir and Q2t team for data validation.',4,30,0,0,'2025-04-08 12:29:55','2025-04-08 12:38:43',35),(72,'2025-04-08',38,26,'Refreshed GP data in the V4_2y sales table and also updated the historical data for January and February 2025 in the sales table.',8,0,0,0,'2025-04-08 13:09:35','2025-04-08 13:09:35',22),(73,'2025-04-07',38,26,'Developed and tested the logic to provide GP data at D-1 by referring to the latest unit cost. Until now, it was based on D-2.',8,0,0,0,'2025-04-08 13:13:16','2025-04-08 13:13:16',22),(74,'2025-04-08',39,40,'Client Call Preparation',0,30,1,0,'2025-04-09 04:34:45','2025-04-09 04:34:45',36),(75,'2025-04-08',39,41,'Daily Status Update',0,30,1,0,'2025-04-09 04:36:49','2025-04-09 04:36:49',37),(76,'2025-04-08',39,30,'Monitor package & validate data',2,0,1,0,'2025-04-09 05:49:26','2025-04-09 05:49:26',26),(77,'2025-04-08',39,40,'Client Call Preparation',0,30,1,1,'2025-04-09 05:50:20','2025-04-09 06:01:04',36),(78,'2025-04-08',39,31,'GP India Development, discussion & Validation',3,0,0,0,'2025-04-09 06:00:27','2025-04-09 06:00:27',27),(79,'2025-04-09',41,40,'Client Call Preparation.',0,30,1,0,'2025-04-09 12:33:33','2025-04-09 12:34:39',36),(80,'2025-04-09',41,41,'Daily Status Update.',0,30,1,0,'2025-04-09 12:34:26','2025-04-09 12:34:45',37),(81,'2025-04-09',41,43,'Checked the Dimension Tables of 175 Server on Tableau.',3,0,1,0,'2025-04-09 12:38:06','2025-04-09 12:38:19',38),(82,'2025-04-09',41,43,'Formatting of Dashboard -Sales Performance Analysis.',2,0,1,0,'2025-04-09 12:39:48','2025-04-09 12:39:48',38),(83,'2025-04-09',41,43,'Started SSIS Training, Understood the Concepts of Control flow and Data Flow Task.',2,0,0,0,'2025-04-09 12:42:04','2025-04-09 12:42:04',38),(84,'2025-04-09',40,41,'Daily standup to discuss the GP task and the validation results',0,30,0,0,'2025-04-09 13:03:52','2025-04-09 13:03:52',37),(85,'2025-04-09',40,40,'Discussed the Validation results internally and the issues which we found last night.\nDiscussed the POA based on the discussions with SP on new updates of GP data ',2,0,0,0,'2025-04-09 13:05:15','2025-04-09 13:05:15',36),(86,'2025-04-09',40,52,'New developments wrt to GP coming from SP. Discussed with SP and then with team.\nPOA for the necessary steps to be taken if we take the GP refresh based on the corrected data for December 1st, 2024, till 5th Jan 2025',1,0,0,0,'2025-04-09 13:06:54','2025-04-09 13:06:54',48),(87,'2025-04-09',40,52,'Email updates with the help of Shushant to SP wrt to Validation and the issues faced',0,30,0,0,'2025-04-09 13:07:52','2025-04-09 13:07:52',48),(88,'2025-04-08',47,36,'Validating the travel and reimbursement data with Dharam and Denish sir. ',7,0,1,0,'2025-04-09 13:13:24','2025-04-09 13:13:24',32),(89,'2025-04-09',47,36,'1) Checking for PMS Data. \n2) Validating the Travel and reimbursement Dashboard data. \n3) Checking the edited dashboards by Anushka. ',8,0,1,0,'2025-04-09 13:14:30','2025-04-09 13:14:30',32),(90,'2025-04-09',46,39,'1) Validating the PMS Dashboard data with Denish sir, Sanjay sir and vidhi.\n2) Validation of travel data to build the logic for power bi with Vidhi.\n3) Changed in Potential rating view and stored procedure to validate employee with \"Annual Talent Review\" in table for all JSW Employees.',8,0,0,0,'2025-04-09 13:16:44','2025-04-09 13:16:44',35),(91,'2025-04-09',39,40,'Client Call Preparation',0,30,1,0,'2025-04-09 13:32:48','2025-04-09 13:33:45',36),(92,'2025-04-09',39,41,'Daily Status Update',0,30,1,0,'2025-04-09 13:33:35','2025-04-09 13:33:41',37),(93,'2025-04-09',39,30,'Data validation for Sales data',2,0,1,0,'2025-04-09 13:34:26','2025-04-09 13:34:26',26),(94,'2025-04-09',38,30,'Performed analysis of the deleted records from the ZCOGS table on the source server, compared them with our staging backup, and also took a backup of all SSIS packages.\n',8,0,1,0,'2025-04-09 13:36:02','2025-04-09 13:36:02',26),(95,'2025-04-09',39,31,'Tableau Upgrade POC - Publish workbook from old version Tableau to new Tableau Server version',2,0,0,0,'2025-04-09 13:36:28','2025-04-09 13:36:28',27),(96,'2025-04-09',39,32,'Tableau Package Monitoring',1,0,1,0,'2025-04-09 13:36:57','2025-04-09 13:36:57',28),(97,'2025-04-10',47,39,'1) Understanding the Talent Management Data with Denish Sir, Swapnil Sir, Mamta Ma\'am and Rimi Ma\'am. \n2) Checking the PMS dashboard employee codes with Denish sir, Dharam and Sanjay Sir. \n3) Client Meeting on Predictive analysis Dashboard. ',8,0,1,0,'2025-04-10 12:39:15','2025-04-10 12:39:15',35),(98,'2025-04-10',46,39,'Meetings and Validation of data for PMS Dashboard, Talent Management Dashboard and for Predictive dashboard with client and vidhi, vishisht.',8,0,0,0,'2025-04-10 12:46:03','2025-04-10 12:46:03',35),(99,'2025-04-10',38,26,'Once again, we have refreshed the data for December, January, February, March, and April after the reference data for December was changed in the source server of the ZCOGS table.\n',8,0,1,0,'2025-04-10 12:52:58','2025-04-10 12:52:58',22),(100,'2025-04-10',39,31,'GP Discussion, Tableau refresh and Validation',4,0,0,0,'2025-04-10 13:19:55','2025-04-10 13:19:55',27),(101,'2025-04-10',40,41,'Discussing the wrong data load into 35 with SP and team',0,30,0,1,'2025-04-11 04:13:27','2025-04-11 04:13:48',37),(102,'2025-04-10',40,41,'Discussing the wrong data load into 35 with SP and team',0,30,0,1,'2025-04-11 04:13:30','2025-04-11 04:13:44',37),(103,'2025-04-10',40,41,'Discussing the wrong data load into 35 with SP and team',0,30,0,0,'2025-04-11 04:13:30','2025-04-11 04:13:30',37),(104,'2025-04-10',40,40,'1. Discussed Deployment of GP POA\n2. Data issues at 35. \n3. Discussed new approach to deploy GP\n4. Testing and Validations after ETL & Tableau refresh with team\n',4,0,0,0,'2025-04-11 04:16:27','2025-04-11 04:16:27',36),(105,'2025-04-10',40,52,'1. Task and Issue updates to Stakeholders (Internal & External)',0,30,0,0,'2025-04-11 04:17:12','2025-04-11 04:17:12',48),(106,'2025-04-10',41,40,'Client Call Preparation.',0,30,1,0,'2025-04-11 05:49:21','2025-04-11 05:49:21',36),(107,'2025-04-10',41,41,'Daily Status Update.',0,30,1,0,'2025-04-11 05:50:17','2025-04-11 05:50:17',37),(108,'2025-04-10',41,43,'Formatting Of Dashboard-  Product Performance Analysis.',3,0,1,0,'2025-04-11 05:51:22','2025-04-11 05:51:22',38),(109,'2025-04-10',41,43,'Understood the basic concepts of Extract and load the Data from Excel to SQL Server and Excel to CSV.',4,0,1,0,'2025-04-11 05:53:51','2025-04-11 05:53:51',38),(110,'2025-04-11',38,30,'Validated the GP refresh and analyzed alternative approaches such as standard deviation, mode, and median for eliminating outliers.',4,0,1,0,'2025-04-11 12:51:29','2025-04-11 12:55:40',26),(111,'2025-04-11',38,51,'The SOS data package had failed in the morning; it was restarted and completed successfully.',1,0,1,0,'2025-04-11 12:52:22','2025-04-11 12:52:22',47),(112,'2025-04-11',38,26,' Reviewed the existing Indonesia full-load package to implement the new GP logic.',3,0,1,0,'2025-04-11 12:55:19','2025-04-11 12:55:19',22),(113,'2025-04-11',41,40,'Client Call Preparation',0,30,1,0,'2025-04-11 13:27:25','2025-04-11 13:27:25',36),(114,'2025-04-11',41,41,'Daily Status Update',0,30,1,0,'2025-04-11 13:28:01','2025-04-11 13:28:01',37),(115,'2025-04-11',41,30,'Validations of Gp with New Logic of 20% Deviations on Production Server.',2,0,1,0,'2025-04-11 13:30:12','2025-04-11 13:30:12',26),(116,'2025-04-11',41,43,'Basic Extract and load operations on ssis.',2,0,1,0,'2025-04-11 13:31:39','2025-04-11 13:31:39',38),(117,'2025-04-11',41,43,'Checking of dimensions tables of 175 server in tableau.',3,0,1,0,'2025-04-11 13:33:30','2025-04-11 13:33:30',38),(118,'2025-04-11',39,40,'Client Call Preparation',0,30,1,0,'2025-04-11 13:56:17','2025-04-11 13:57:21',36),(119,'2025-04-11',39,41,'Daily Status Update',0,30,1,0,'2025-04-11 13:57:08','2025-04-11 13:57:18',37),(120,'2025-04-11',39,30,'Tableau Package Monitoring & Validations',3,0,1,0,'2025-04-11 13:59:12','2025-04-11 13:59:42',26),(121,'2025-04-11',39,31,'Tableau Upgrade POC - Test migrating reports from older Tableau Desktop version to newer Tableau Server',4,0,1,0,'2025-04-11 14:00:33','2025-04-11 14:00:33',27),(122,'2025-04-10',49,36,'formatted hr talent acquistion as per the requirements\n',1,0,0,0,'2025-04-14 10:55:19','2025-04-14 10:55:19',32),(123,'2025-04-14',49,36,'made changes to the hr head count as per the requirement ',3,0,1,0,'2025-04-14 10:56:14','2025-04-14 10:56:14',32),(124,'2025-04-14',49,36,'formatted hr talent acquistion as per the requirements\n',1,45,1,0,'2025-04-14 10:56:52','2025-04-14 10:56:52',32),(125,'2025-04-14',49,36,'discussed the data issues for travel management',0,30,1,0,'2025-04-14 10:59:56','2025-04-14 10:59:56',32),(126,'2025-04-14',50,56,'Creating summary, extracting key points from the summary and the extracted text.',8,30,0,0,'2025-04-14 11:58:11','2025-04-14 11:58:11',52),(127,'2025-04-14',52,58,'Watched Azure Data Factory training videos and read documentation.',8,0,0,0,'2025-04-14 11:58:39','2025-04-14 11:58:39',53),(128,'2025-04-14',51,55,'Worked in data modelling and building visuals',8,0,0,0,'2025-04-14 12:02:15','2025-04-14 12:02:15',51),(129,'2025-04-14',38,26,'Once again, we have refreshed the data for December, January, February, March, and April after the reference data for December was changed in the source server of the ZCOGS table.',8,0,1,0,'2025-04-14 12:33:53','2025-04-14 12:33:53',22),(130,'2025-04-14',41,40,'Client Call Preparation.',0,30,1,0,'2025-04-14 12:52:27','2025-04-14 12:52:27',36),(131,'2025-04-14',41,41,'Daily Status Updates',0,30,1,0,'2025-04-14 12:53:05','2025-04-14 12:53:05',37),(132,'2025-04-14',41,30,'Created test Datasource and Validate the Data from dec to feb for GP Development.',4,0,1,0,'2025-04-14 12:53:43','2025-04-14 12:53:43',26),(133,'2025-04-14',41,28,'Validation of Gp deployment on production server.',2,0,1,0,'2025-04-14 12:54:39','2025-04-14 12:54:39',24),(134,'2025-04-14',41,49,'Monitoring the issue of Indonesia data(full load) and new deployment of gp on tableau Server.',1,0,1,0,'2025-04-14 12:55:33','2025-04-14 12:55:33',45),(135,'2025-04-14',39,40,'Client Call Preparation',0,30,1,0,'2025-04-14 13:35:27','2025-04-14 13:35:27',36),(136,'2025-04-14',39,41,'Daily Status Update',0,30,1,0,'2025-04-14 13:35:58','2025-04-14 13:35:58',37),(137,'2025-04-14',39,31,'GP Development',7,0,0,0,'2025-04-14 13:36:22','2025-04-14 13:36:22',27),(138,'2025-04-14',49,36,'formatted the other dashboards',4,0,1,0,'2025-04-15 06:24:10','2025-04-15 06:24:10',32),(139,'2025-04-11',40,52,'Weekly Status report\nDiscussing the request of support on Saturday ',0,45,0,0,'2025-04-15 06:44:59','2025-04-15 06:44:59',48),(140,'2025-04-11',40,40,'Discussing Support Requested on Saturday by SP\nGP Validations\nDiscussing our findings\n',2,30,0,0,'2025-04-15 06:45:53','2025-04-15 06:45:53',36),(141,'2025-04-11',40,41,'DSM',0,30,0,0,'2025-04-15 06:46:20','2025-04-15 06:46:20',37),(142,'2025-04-14',40,41,'Discussed the GP task and its current impacts due to repetitive iterations',0,30,0,0,'2025-04-15 06:47:17','2025-04-15 06:47:17',37),(143,'2025-04-14',40,40,'Discussions with Sandesh wrt to proposal\nMayur\'s reverse KT and POA for he\'s involvement \nGP deployment discussions \nTableau POC discussions with Sandesh',3,0,0,0,'2025-04-15 06:48:10','2025-04-15 06:48:10',36),(144,'2025-04-14',40,52,'GP Deployment Activity and Progress Updates ',1,0,0,0,'2025-04-15 06:48:53','2025-04-15 06:48:53',48),(145,'2025-04-15',50,56,'Created summary from files',6,30,0,0,'2025-04-15 12:25:18','2025-04-15 12:25:18',52),(146,'2025-04-15',52,58,'Watched Azure Data Factory training videos.',8,0,0,0,'2025-04-15 12:49:04','2025-04-15 12:49:04',53),(147,'2025-04-15',39,40,'Client Call Preparation',0,30,1,0,'2025-04-15 12:57:34','2025-04-15 12:57:34',36),(148,'2025-04-15',39,41,'Daily Status Update',0,30,1,0,'2025-04-15 12:57:53','2025-04-15 12:57:53',37),(149,'2025-04-15',39,32,'Monitor package & validate data',7,0,1,0,'2025-04-15 12:58:14','2025-04-15 12:58:14',28),(150,'2025-04-15',38,26,'Started development of Indonesia GP logic for both BK and Popeyes.',8,0,0,0,'2025-04-15 13:04:48','2025-04-15 13:04:48',22),(151,'2025-04-15',56,59,'Internal DSM -30 min\nFixed null values and performed feature extraction – 7:30 hrs\"',8,0,0,0,'2025-04-15 16:15:38','2025-04-15 16:15:38',54),(152,'2025-04-15',49,36,'went through tnr dashboard ',2,0,1,0,'2025-04-16 04:35:47','2025-04-16 04:35:47',32),(153,'2025-04-15',49,36,'worked upon a data issue in predictive analysis ',1,30,1,0,'2025-04-16 04:36:23','2025-04-16 04:36:23',32),(154,'2025-04-15',49,36,'made changes to the dashboard according to the requirements ',4,0,1,0,'2025-04-16 04:37:08','2025-04-16 04:37:08',32),(155,'2025-04-15',49,36,'attended client daily standup meeting ',0,30,1,0,'2025-04-16 04:37:51','2025-04-16 04:37:51',32),(156,'2025-04-15',54,58,'Prepared for the mock interview and given mock interview on PowerBI, SQL and SSAS.',8,0,0,0,'2025-04-16 12:02:05','2025-04-16 12:02:05',53),(157,'2025-04-16',54,58,'According to yesterday\'s mock interview feedback, started preparing on SQL and SSAS.',8,0,0,0,'2025-04-16 12:03:16','2025-04-16 12:03:16',53),(158,'2025-04-16',41,40,'Client Call Preparation.',0,30,1,0,'2025-04-16 12:52:27','2025-04-16 12:52:27',36),(159,'2025-04-16',41,41,'Daily Status Updates',0,30,1,0,'2025-04-16 12:52:55','2025-04-16 12:52:55',37),(160,'2025-04-16',38,26,'Added a data cleaning step in the India GP development to handle unexpected INDS BK and Popeyes products.',2,0,1,0,'2025-04-16 12:53:20','2025-04-16 12:53:20',22),(161,'2025-04-16',38,26,'Development of Indonesia GP logic for both BK and Popeyes.',6,0,0,0,'2025-04-16 12:54:40','2025-04-16 12:54:40',22),(162,'2025-04-16',41,46,'MFA meeting for 175 and 80 server.',0,30,1,0,'2025-04-16 12:59:44','2025-04-16 12:59:44',42),(163,'2025-04-16',41,46,'Discussion on Current usage of Bis Packages and Datasources.',0,30,1,0,'2025-04-16 13:00:33','2025-04-16 13:00:33',42),(164,'2025-04-16',41,31,'hanged in the current v42y for Gp, Created the separate calculated field for quantity, gross margin ,gross margin % and cogs and hide the existing fields',3,0,1,0,'2025-04-16 13:01:38','2025-04-16 13:01:38',27),(165,'2025-04-16',41,49,'Monitoring of full refresh of new developed logic for Gross margin on local',3,0,1,0,'2025-04-16 13:02:24','2025-04-16 13:02:24',45),(166,'2025-04-16',41,28,'Deployment and validation of v42y on tableau server for additional calculated fields.',1,0,1,0,'2025-04-16 13:02:55','2025-04-16 13:02:55',24),(167,'2025-04-16',39,40,'Client Call Preparation',0,30,1,0,'2025-04-16 13:52:03','2025-04-16 13:52:03',36),(168,'2025-04-16',39,41,'Daily Status Update',0,30,1,0,'2025-04-16 13:52:20','2025-04-16 13:52:20',37),(169,'2025-04-16',39,31,'Created Quantity, COGS, Gross Margin and Gross Margin fields in Tableau for BK Sales data V4 2y data source',5,0,1,0,'2025-04-16 13:53:40','2025-04-16 13:53:40',27),(170,'2025-04-16',56,59,'Internal DSM :30 min\nWorked on extracting multiple features from structured table data, including preprocessing, logic implementation :7 HR',8,0,0,0,'2025-04-16 17:06:41','2025-04-16 17:06:41',54),(171,'2025-04-16',52,58,'Watched Azure Data Factory training videos and practiced.',8,0,0,0,'2025-04-17 04:16:29','2025-04-17 04:16:29',53),(172,'2025-04-15',40,52,'Email updates : VS studio, BIS, Delay, Daily updates',0,30,0,0,'2025-04-17 05:47:54','2025-04-17 05:47:54',48),(173,'2025-04-15',40,41,'Daily tasks review with SP and team',0,30,0,0,'2025-04-17 05:48:31','2025-04-17 05:48:31',37),(174,'2025-04-15',40,40,'Daily tasks review,\nVS task, Optimization task, Delay in packages discussions',3,0,0,0,'2025-04-17 05:49:07','2025-04-17 05:49:07',36),(175,'2025-04-16',40,41,'2FA setup\nRead only access setup & testing \nDaily status updates',1,0,0,0,'2025-04-17 05:50:07','2025-04-17 05:50:07',37),(176,'2025-04-16',40,41,'Setting up MFA (2FA) of Mayur for 175 & 80 Server \n',0,30,0,0,'2025-04-17 05:50:39','2025-04-17 05:50:39',37),(177,'2025-04-16',40,41,'Discussed BIS packages and Tableau workbooks based on BIS. We will be providing the Stats for the same ',0,30,0,0,'2025-04-17 05:51:06','2025-04-17 05:51:06',37),(178,'2025-04-16',40,41,'Discussions with PD wrt to new Unit cost logic in GP',0,30,0,0,'2025-04-17 05:52:24','2025-04-17 05:52:24',37),(179,'2025-04-16',40,41,'Daily Tasks Review Meeting with Stakeholders ',0,30,0,0,'2025-04-17 05:53:09','2025-04-17 05:53:09',37),(180,'2025-04-16',40,40,'New unit cost logic discussion and deployment \nBIS scrapping discussion\nOptimization discussions ',2,0,0,0,'2025-04-17 05:53:57','2025-04-17 05:53:57',36),(181,'2025-04-16',49,36,'tried to understand tnr dash board ',1,15,1,0,'2025-04-17 09:42:17','2025-04-17 09:42:17',32),(182,'2025-04-16',49,36,'tried to understand predictive dashboard',1,15,1,0,'2025-04-17 09:43:28','2025-04-17 09:43:28',32),(183,'2025-04-16',49,36,'tried to understand talent management dashboard ',1,15,1,0,'2025-04-17 09:43:47','2025-04-17 09:43:47',32),(184,'2025-04-16',49,36,'had an internal meeting ',2,0,1,0,'2025-04-17 09:44:05','2025-04-17 09:44:05',32),(185,'2025-04-16',49,36,'attended daily standup meeting ',1,0,1,0,'2025-04-17 09:44:29','2025-04-17 09:44:29',32),(186,'2025-04-16',49,36,'formatted tnr ',1,0,1,0,'2025-04-17 09:44:52','2025-04-17 09:44:52',32),(187,'2025-04-17',54,58,'learning SQL and SSAS',8,0,0,0,'2025-04-17 12:45:21','2025-04-17 12:45:21',53),(188,'2025-04-17',38,35,'Did documentation for new GP logic India.',2,0,0,0,'2025-04-17 12:46:02','2025-04-17 12:46:02',31),(189,'2025-04-17',38,26,'Development of Indonesia GP logic for both BK and Popeyes.\n',6,0,0,0,'2025-04-17 12:46:25','2025-04-17 12:46:25',22),(190,'2025-04-17',39,40,'Client Call Preparation',0,30,1,0,'2025-04-17 13:08:25','2025-04-17 13:08:49',36),(191,'2025-04-17',39,41,'Daily Status Update',0,30,1,0,'2025-04-17 13:09:08','2025-04-17 13:09:08',37),(192,'2025-04-17',39,34,'Stats for BIS Workbooks',2,0,0,0,'2025-04-17 13:09:43','2025-04-17 13:09:43',30),(193,'2025-04-17',52,58,'Watched Azure Databricks training videos.',8,0,0,0,'2025-04-18 04:06:07','2025-04-18 04:06:07',53),(194,'2025-04-18',38,26,'Staged the store_rent table and created a testing view for the Tableau data source.',4,0,1,0,'2025-04-18 12:29:27','2025-04-18 12:29:27',22),(195,'2025-04-18',38,26,'Created a test table for Indonesia sales using the new GP logic.\n',4,0,1,0,'2025-04-18 12:30:34','2025-04-18 12:30:34',22),(196,'2025-04-18',54,58,'Learning of SQL and SSAS',8,0,0,0,'2025-04-18 17:29:23','2025-04-18 17:29:23',53),(197,'2025-04-18',52,58,'Watched Databricks videos.',8,0,0,0,'2025-04-21 03:50:06','2025-04-21 03:50:06',53),(198,'2025-04-21',41,40,'Client Call Preparation',0,30,1,0,'2025-04-21 13:20:33','2025-04-21 13:20:33',36),(199,'2025-04-21',41,41,'Daily Status Update.',0,30,1,0,'2025-04-21 13:21:44','2025-04-21 13:21:44',37),(200,'2025-04-21',39,40,'Client Call Preparation',0,30,1,0,'2025-04-21 13:25:25','2025-04-21 13:25:25',36),(201,'2025-04-21',41,31,'Created Test Datasource for Indonesia gp_test.',2,0,1,0,'2025-04-21 13:25:30','2025-04-21 13:25:30',27),(202,'2025-04-21',39,41,'Daily Status Update',0,30,1,0,'2025-04-21 13:25:54','2025-04-21 13:25:54',37),(203,'2025-04-21',41,30,'Validation of Gp_test data of Indonesia',2,30,1,0,'2025-04-21 13:26:04','2025-04-21 13:26:04',26),(204,'2025-04-21',39,31,'Create & validate Indonesia GP Test data source',2,0,1,0,'2025-04-21 13:26:40','2025-04-21 13:26:40',27),(205,'2025-04-21',41,34,'Stats for Bis sales and proc datasources.',3,0,1,0,'2025-04-21 13:26:43','2025-04-21 13:26:43',30),(206,'2025-04-21',39,31,'India Store Rent Development ',2,0,1,0,'2025-04-21 13:27:02','2025-04-21 13:27:02',27),(207,'2025-04-21',38,26,'Created the MX_store_rent package for store_rent using reference table logic.',6,0,1,0,'2025-04-21 13:30:45','2025-04-21 13:30:45',22),(208,'2025-04-21',38,30,'Performed validation of Indonesia_GP_Test_Development.',2,0,1,0,'2025-04-21 13:31:48','2025-04-21 13:31:48',26),(209,'2025-04-22',39,40,'Client Call Preparation',0,30,1,0,'2025-04-22 13:42:36','2025-04-22 13:42:36',36),(210,'2025-04-22',39,41,'Daily Status Update',0,30,1,0,'2025-04-22 13:42:55','2025-04-22 13:42:55',37),(211,'2025-04-22',39,34,'BIS Workbooks Usage Statistics',3,0,1,0,'2025-04-22 13:44:30','2025-04-22 13:44:30',30),(212,'2025-04-22',39,46,'Discussion on BK_Store_Rent table attributes',1,0,1,0,'2025-04-22 13:45:17','2025-04-22 13:45:17',42),(213,'2025-04-22',38,34,'Created plan for optimization of DWH and BIS sale packages.',3,0,1,0,'2025-04-22 13:50:25','2025-04-22 13:50:25',30),(214,'2025-04-22',38,26,'Refreshed Indonesia test GP data for Feb, March and April till date.\n',5,0,1,0,'2025-04-22 13:51:43','2025-04-22 13:51:43',22),(215,'2025-04-21',52,58,'Learning databricks.',8,0,0,0,'2025-04-23 04:25:29','2025-04-23 04:25:29',53),(216,'2025-04-23',38,26,'Took backup of all SSIS packages from the 175 server.\n',1,0,1,0,'2025-04-24 07:11:08','2025-04-24 07:11:08',22),(217,'2025-04-23',38,41,'Attended client meeting to gather requirements related to the store_rent table.\n',2,0,1,0,'2025-04-24 07:12:44','2025-04-24 07:13:02',37),(218,'2025-04-23',38,40,'Internal meeting to discuss the requirements of the store_rent table.',2,0,1,0,'2025-04-24 07:14:02','2025-04-24 07:14:02',36),(219,'2025-04-23',38,26,'Implemented SCD Type 2 on the RF_Store table.',2,0,1,0,'2025-04-24 07:17:20','2025-04-24 07:17:20',22),(220,'2025-04-23',38,34,'Shared steps required to optimize DWH and DWH-BIS combined processes.\n',1,0,1,0,'2025-04-24 07:18:37','2025-04-24 07:18:37',30),(221,'2025-04-24',54,58,'Learning of SQL and SSAS',8,0,0,1,'2025-04-24 13:18:08','2025-04-24 13:19:36',53),(222,'2025-04-23',54,58,'Learning of SQL and SSAS',8,0,0,0,'2025-04-24 13:18:54','2025-04-24 13:18:54',53),(223,'2025-04-22',54,58,'Learning of SQL and SSAS',8,0,0,0,'2025-04-24 13:19:23','2025-04-24 13:19:23',53),(224,'2025-04-23',39,40,'Client Call Preparation',0,30,1,0,'2025-04-24 13:19:28','2025-04-24 13:19:28',36),(225,'2025-04-23',39,41,'Daily Status Update',0,30,1,1,'2025-04-24 13:19:50','2025-04-24 13:20:58',37),(226,'2025-04-23',39,41,'Daily Status Update',0,30,1,0,'2025-04-24 13:20:11','2025-04-24 13:20:11',37),(227,'2025-04-21',54,58,'Learning of SQL and SSAS',8,0,0,0,'2025-04-24 13:20:12','2025-04-24 13:20:12',53),(228,'2025-04-23',39,30,'Validation for India Net Sales with 35 server',1,0,1,0,'2025-04-24 13:20:37','2025-04-24 13:20:37',26),(229,'2025-04-23',39,35,'BIS package time Stats ',3,0,1,0,'2025-04-24 13:21:22','2025-04-24 13:21:22',31),(230,'2025-04-23',39,46,'Discussion on development for adding store rent column in  India Sales data source',1,0,1,0,'2025-04-24 13:21:48','2025-04-24 13:21:48',42),(231,'2025-04-23',39,40,'Discussion on development for adding store rent column in  India Sales data source',2,0,1,0,'2025-04-24 13:22:09','2025-04-24 13:22:17',36),(232,'2025-04-24',39,40,'Client Call Preparation',0,30,1,0,'2025-04-24 13:23:27','2025-04-24 13:23:27',36),(233,'2025-04-24',39,41,'Daily Status Update',0,30,1,0,'2025-04-24 13:23:44','2025-04-24 13:23:44',37),(234,'2025-04-24',39,31,'Addition of columns & calculated fields from BK Store Rent into India Sales data source',4,0,0,0,'2025-04-24 13:24:12','2025-04-24 13:24:12',27),(235,'2025-04-22',41,40,'Client Call Preparation',0,30,1,0,'2025-04-24 13:25:09','2025-04-24 13:25:09',36),(236,'2025-04-24',41,41,'Daily Status Update',0,30,1,0,'2025-04-24 13:25:52','2025-04-24 13:25:52',37),(237,'2025-04-22',41,41,'Daily Status Update',0,30,1,0,'2025-04-24 13:26:35','2025-04-24 13:26:35',37),(238,'2025-04-22',41,40,'Discussion on Proposal of optimization plan ',0,30,1,0,'2025-04-24 13:28:14','2025-04-24 13:28:14',36),(239,'2025-04-22',41,34,'Discussion on Proposal of optimization plan ',4,0,1,0,'2025-04-24 13:29:05','2025-04-24 13:29:05',30),(240,'2025-04-22',41,31,'Monitoring and validation  Backup of V42y Datasource on local',2,0,1,0,'2025-04-24 13:30:01','2025-04-24 13:30:01',27),(241,'2025-04-22',41,30,'Monitoring and validations of D-1 Data ',0,30,1,0,'2025-04-24 13:30:57','2025-04-24 13:30:57',26),(242,'2025-04-23',41,40,'Client Call Preparation',0,30,1,0,'2025-04-24 13:31:40','2025-04-24 13:31:40',36),(243,'2025-04-23',41,41,'Daily status update',0,30,1,0,'2025-04-24 13:32:50','2025-04-24 13:32:50',37),(244,'2025-04-24',38,28,'Deployed the MX_store_rent package.',0,30,1,0,'2025-04-24 13:33:44','2025-04-24 13:33:44',24),(245,'2025-04-23',41,30,'VAlidation and Refresh of Test  datasource for indonesia gp.',2,0,1,0,'2025-04-24 13:33:50','2025-04-24 13:33:50',26),(246,'2025-04-23',41,46,'Discussion on new development of store_rent- addition of columns in v42y datasource',1,30,1,0,'2025-04-24 13:34:46','2025-04-24 13:34:46',42),(247,'2025-04-24',38,35,'Created a new architecture diagram for DWH optimization using Microsoft Visio and Also Shared inputs such as assumptions and limitations of the new architecture in the optimization proposal.\n',6,0,1,0,'2025-04-24 13:35:31','2025-04-24 13:35:31',31),(248,'2025-04-23',41,40,'Discuss the optimize approach for addition of columns in v42y.',2,0,1,0,'2025-04-24 13:35:34','2025-04-24 13:35:34',36),(249,'2025-04-23',41,34,'Documentation of Additional calculated fields for new development ',1,30,1,0,'2025-04-24 13:36:19','2025-04-24 13:36:19',30),(250,'2025-04-23',41,49,'Monitoring and Validation of Daily transactional data.',0,30,1,0,'2025-04-24 13:37:16','2025-04-24 13:37:16',45),(251,'2025-04-24',38,26,'Created a view and renamed the table to create a test data source for Tableau.',1,30,1,0,'2025-04-24 13:37:56','2025-04-24 13:37:56',22),(252,'2025-04-24',41,40,'Client Call preparation.',0,30,1,0,'2025-04-24 13:38:16','2025-04-24 13:38:16',36),(253,'2025-04-24',41,31,'Created a new calculated fields and addition of columns of store_rent in v42y datasource.',4,0,1,0,'2025-04-24 13:38:55','2025-04-24 13:38:55',27),(254,'2025-04-24',41,30,'VAlidation of new development on test data with data given by business',3,0,1,0,'2025-04-24 13:39:30','2025-04-24 13:39:30',26),(255,'2025-04-24',41,49,'Monitoring and validation of refresh for new development of store_rent',0,30,1,0,'2025-04-24 13:40:10','2025-04-24 13:40:10',45),(256,'2025-04-25',39,26,'Test By Ajit',2,0,1,0,'2025-04-25 06:54:35','2025-04-25 06:54:35',22);
/*!40000 ALTER TABLE `trans_timesheet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trans_user_details`
--

DROP TABLE IF EXISTS `trans_user_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trans_user_details` (
  `detail_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` int DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `is_timesheet_required` tinyint(1) DEFAULT '0',
  `reporting_manager_id` int DEFAULT NULL,
  `designation_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`detail_id`),
  UNIQUE KEY `unique_user` (`user_id`),
  KEY `role_id` (`role_id`),
  KEY `department_id` (`department_id`),
  KEY `reporting_manager_id` (`reporting_manager_id`),
  KEY `trans_user_details_ibfk_5` (`designation_id`),
  CONSTRAINT `trans_user_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `master_user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `trans_user_details_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `master_role` (`role_id`),
  CONSTRAINT `trans_user_details_ibfk_3` FOREIGN KEY (`department_id`) REFERENCES `master_department` (`department_id`),
  CONSTRAINT `trans_user_details_ibfk_4` FOREIGN KEY (`reporting_manager_id`) REFERENCES `master_user` (`user_id`),
  CONSTRAINT `trans_user_details_ibfk_5` FOREIGN KEY (`designation_id`) REFERENCES `master_designation` (`designation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_user_details`
--

LOCK TABLES `trans_user_details` WRITE;
/*!40000 ALTER TABLE `trans_user_details` DISABLE KEYS */;
INSERT INTO `trans_user_details` VALUES (22,1,1,NULL,0,NULL,NULL,'2025-04-04 14:25:50','2025-04-04 14:25:50',0),(23,32,1,NULL,NULL,NULL,NULL,'2025-04-04 17:56:07','2025-04-04 17:56:28',0),(24,33,4,NULL,0,NULL,NULL,'2025-04-04 17:56:55','2025-04-04 17:56:55',0),(25,34,1,NULL,NULL,NULL,NULL,'2025-04-04 18:01:14','2025-04-04 18:30:43',0),(26,35,1,NULL,NULL,NULL,NULL,'2025-04-04 18:02:09','2025-04-04 18:30:49',0),(27,36,1,NULL,NULL,NULL,NULL,'2025-04-04 18:02:41','2025-04-04 18:30:57',0),(28,37,4,NULL,0,NULL,NULL,'2025-04-04 18:03:14','2025-04-04 18:03:14',0),(29,38,4,NULL,0,NULL,NULL,'2025-04-04 18:03:42','2025-04-04 18:03:42',0),(30,39,4,NULL,0,NULL,NULL,'2025-04-04 18:04:10','2025-04-04 18:04:10',0),(31,40,4,NULL,0,NULL,NULL,'2025-04-04 18:04:37','2025-04-04 18:04:37',0),(32,41,4,NULL,0,NULL,NULL,'2025-04-04 18:05:15','2025-04-04 18:05:15',0),(33,42,4,NULL,0,NULL,NULL,'2025-04-04 18:05:44','2025-04-04 18:05:44',0),(34,43,4,NULL,0,NULL,NULL,'2025-04-04 18:06:11','2025-04-04 18:06:11',0),(35,44,4,NULL,0,NULL,NULL,'2025-04-04 18:06:36','2025-04-04 18:06:36',0),(36,45,4,NULL,0,NULL,NULL,'2025-04-04 18:07:08','2025-04-04 18:07:08',0),(37,46,4,NULL,0,NULL,NULL,'2025-04-04 18:07:34','2025-04-04 18:07:34',0),(38,47,4,NULL,0,NULL,NULL,'2025-04-04 18:08:07','2025-04-04 18:08:07',0),(39,48,4,NULL,0,NULL,NULL,'2025-04-04 18:08:31','2025-04-04 18:08:31',0),(40,49,4,NULL,0,NULL,NULL,'2025-04-04 18:08:53','2025-04-04 18:08:53',0),(41,50,4,NULL,0,NULL,NULL,'2025-04-14 10:31:59','2025-04-14 10:31:59',0),(42,51,4,NULL,0,NULL,NULL,'2025-04-14 10:33:25','2025-04-14 10:33:25',0),(43,52,4,NULL,0,NULL,NULL,'2025-04-14 10:34:28','2025-04-14 10:34:28',0),(44,53,4,NULL,0,NULL,NULL,'2025-04-14 10:41:31','2025-04-14 10:41:31',0),(45,54,4,NULL,0,NULL,NULL,'2025-04-15 10:09:13','2025-04-15 10:09:13',0),(46,55,4,NULL,0,NULL,NULL,'2025-04-15 10:28:32','2025-04-15 10:28:32',0),(47,56,4,NULL,0,NULL,NULL,'2025-04-15 10:30:55','2025-04-15 10:30:55',0),(48,57,1,NULL,NULL,NULL,NULL,'2025-04-16 05:27:47','2025-04-16 05:27:58',0),(49,58,4,NULL,0,NULL,NULL,'2025-04-25 06:47:28','2025-04-25 06:47:28',0);
/*!40000 ALTER TABLE `trans_user_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-25 13:57:22
