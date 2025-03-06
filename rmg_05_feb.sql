CREATE DATABASE  IF NOT EXISTS `rmg` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `rmg`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: rmg
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_category`
--

LOCK TABLES `master_category` WRITE;
/*!40000 ALTER TABLE `master_category` DISABLE KEYS */;
INSERT INTO `master_category` VALUES (1,'Manufacturing','Textile','Fibre',0,'2025-02-17 07:46:36','2025-02-17 07:46:36'),(2,'Manufacturing','Textile','Nilon',1,'2025-02-17 07:46:36','2025-02-18 04:40:03'),(3,'Technology','Software','AI',0,'2025-02-17 07:46:36','2025-02-17 07:46:36'),(4,'Technology','Hardware','Semiconductors',0,'2025-02-17 07:46:36','2025-02-17 07:46:36'),(5,'Healthcare','Pharmaceutical','Medicines',0,'2025-02-17 07:46:36','2025-02-17 07:46:36'),(6,'Healthcare','Medical Devices','MRI Machines',0,'2025-02-17 07:46:36','2025-02-17 07:46:36'),(7,'Finance','Banking','Loans',0,'2025-02-17 07:46:36','2025-02-17 07:46:36'),(8,'Finance','Insurance','Health Insurance',0,'2025-02-17 07:46:36','2025-02-17 07:46:36'),(9,'Education','Online Learning','E-Learning Platforms',0,'2025-02-17 07:46:36','2025-02-17 07:46:36'),(10,'Retail','E-Commerce','Online Store',0,'2025-02-17 07:46:36','2025-02-17 07:46:36'),(11,'Food','Package','Bread',0,'2025-02-19 12:23:40','2025-02-19 12:23:40'),(12,'Technology','Software','ML',0,'2025-02-19 12:25:02','2025-02-19 12:25:02'),(13,'Manufacturing','Iron','Domain 1',0,'2025-02-19 12:44:52','2025-02-19 12:44:52'),(14,'Manufacturing','Industry 1','Domain New',0,'2025-02-19 12:49:46','2025-02-19 12:49:46'),(15,'Technology','Software','Web Dev',0,'2025-02-19 12:50:07','2025-02-19 12:50:07'),(16,'New Cat','New Cat In 1','New Cat Dom 1',0,'2025-02-20 05:29:55','2025-02-20 05:29:55'),(17,'Healthcare','Pharmaceutical','D Pharma',0,'2025-02-20 05:35:07','2025-02-20 05:35:07'),(18,'Healthcare','Medical Devices','New med ',1,'2025-02-20 05:48:59','2025-02-20 09:10:34');
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
  UNIQUE KEY `customer_email` (`customer_email`),
  KEY `master_customer_ibfk_1` (`category_id`),
  CONSTRAINT `master_customer_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `master_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_customer`
--

LOCK TABLES `master_customer` WRITE;
/*!40000 ALTER TABLE `master_customer` DISABLE KEYS */;
INSERT INTO `master_customer` VALUES (1,'Customer1','a','a','a','a',1,'a','a','a','a','a',0,'2025-02-17 14:20:07','2025-02-26 09:34:18',1,0),(2,'Customer2','aa','aa','aa','aa',2,'a','a','a','a','a',0,'2025-02-17 14:21:22','2025-02-26 09:34:29',1,1),(4,'Customer3','ccc','c@gmail.com','4589856545','4589856545',1,'vv','vv','xs','kk','sasd',0,'2025-02-17 14:24:33','2025-02-26 09:34:29',1,1),(5,'Customr3 ','c','c','c','c',5,'c','c','c','c','c',0,'2025-02-20 05:29:09','2025-02-26 09:34:29',0,0),(6,'Ajit','','ajit@gmail.com','8545256540','555555',16,'Nashik','Maharashtra','411045','India','',0,'2025-02-20 09:27:58','2025-02-20 09:27:58',1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_department`
--

LOCK TABLES `master_department` WRITE;
/*!40000 ALTER TABLE `master_department` DISABLE KEYS */;
INSERT INTO `master_department` VALUES (1,'Service Delivery',0,'2025-02-18 05:24:13','2025-02-18 05:24:13'),(2,'Manager',1,'2025-02-18 05:25:05','2025-02-18 09:42:23'),(3,'IT',0,'2025-02-18 09:56:27','2025-02-18 09:56:27'),(4,'Manager',0,'2025-02-19 10:47:40','2025-02-19 10:47:40'),(5,'Developer',0,'2025-02-20 10:00:13','2025-02-20 10:00:13'),(6,'HR',1,'2025-02-20 11:53:44','2025-02-20 11:54:12');
/*!40000 ALTER TABLE `master_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_position`
--

DROP TABLE IF EXISTS `master_position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_position` (
  `position_id` int NOT NULL AUTO_INCREMENT,
  `position_name` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`position_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_position`
--

LOCK TABLES `master_position` WRITE;
/*!40000 ALTER TABLE `master_position` DISABLE KEYS */;
INSERT INTO `master_position` VALUES (1,'Intern',0,'2025-02-18 05:30:28','2025-02-18 05:30:28'),(2,'WEB DEV',1,'2025-02-18 09:46:22','2025-02-18 09:46:32'),(3,'Full Stack Developer',0,'2025-02-20 10:04:10','2025-02-20 10:04:10');
/*!40000 ALTER TABLE `master_position` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_project`
--

LOCK TABLES `master_project` WRITE;
/*!40000 ALTER TABLE `master_project` DISABLE KEYS */;
INSERT INTO `master_project` VALUES (1,1,'C1 P1','2025-02-02','2025-02-28',1,1,1,1,'2025-02-28','OKOKOK',0,'2025-02-19 05:56:00','2025-02-19 08:30:26'),(2,6,'a','2025-02-04','2025-02-19',1,2,2,1,'2025-02-28','',0,'2025-02-20 12:42:25','2025-02-20 12:42:25'),(3,6,'Project 2','2025-02-01','2025-02-12',2,1,2,2,'2025-02-28','',0,'2025-02-28 06:55:33','2025-02-28 06:55:33');
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
  KEY `customer_id` (`customer_id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `master_project_deliverables_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `master_customer` (`customer_id`),
  CONSTRAINT `master_project_deliverables_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `master_project` (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_project_deliverables`
--

LOCK TABLES `master_project_deliverables` WRITE;
/*!40000 ALTER TABLE `master_project_deliverables` DISABLE KEYS */;
INSERT INTO `master_project_deliverables` VALUES (1,1,1,'deliverable 1',0,'2025-02-19 07:13:56','2025-02-19 07:13:56'),(2,1,2,'a prject del 1',0,'2025-02-28 07:03:44','2025-02-28 07:03:44');
/*!40000 ALTER TABLE `master_project_deliverables` ENABLE KEYS */;
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
INSERT INTO `master_project_status` VALUES (1,'Initiated',0,'2025-02-19 04:26:46','2025-02-19 04:26:46'),(2,'In Progress',0,'2025-02-19 04:26:46','2025-02-19 04:26:46'),(3,'Completed',0,'2025-02-19 04:26:46','2025-02-19 04:26:46'),(4,'On Hold',0,'2025-02-19 04:26:46','2025-02-19 04:26:46');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_role`
--

LOCK TABLES `master_role` WRITE;
/*!40000 ALTER TABLE `master_role` DISABLE KEYS */;
INSERT INTO `master_role` VALUES (1,'superadmin',0,'2025-02-18 06:25:18','2025-02-18 06:25:18'),(2,'admin',0,'2025-02-18 06:25:18','2025-02-18 06:25:18'),(3,'projectManager',0,'2025-03-04 04:29:39','2025-03-04 04:29:39');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_skill`
--

LOCK TABLES `master_skill` WRITE;
/*!40000 ALTER TABLE `master_skill` DISABLE KEYS */;
INSERT INTO `master_skill` VALUES (1,'React','technical','ES6, Arrow',0,'2025-02-18 05:57:27','2025-02-18 05:57:27'),(2,'Angualr','soft-skill','aaa',1,'2025-02-18 09:54:06','2025-02-18 09:54:18'),(3,'Angular','technical','Angular ES6, Node',0,'2025-02-20 10:10:36','2025-02-20 10:10:36');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_task_category`
--

LOCK TABLES `master_task_category` WRITE;
/*!40000 ALTER TABLE `master_task_category` DISABLE KEYS */;
INSERT INTO `master_task_category` VALUES (1,'New Task',0,'2025-02-19 09:49:31','2025-02-19 09:49:31'),(2,'task 2',1,'2025-02-19 09:53:27','2025-02-19 09:53:56'),(3,'Task 2',0,'2025-02-20 11:26:32','2025-02-20 11:26:32'),(4,'aa',0,'2025-02-28 07:00:02','2025-02-28 07:00:02');
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
INSERT INTO `master_type_of_engagement` VALUES (1,'Billed',0,'2025-02-19 04:26:40','2025-02-19 04:26:40'),(2,'Not Billed',0,'2025-02-19 04:26:40','2025-02-19 04:26:40');
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
INSERT INTO `master_type_of_project` VALUES (1,'POC',0,'2025-02-19 04:26:43','2025-02-19 04:26:43'),(2,'Project',0,'2025-02-19 04:26:43','2025-02-19 04:26:43');
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
  `role_id` int DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` bigint DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_code` (`user_code`),
  UNIQUE KEY `user_email` (`user_email`),
  KEY `role_id` (`role_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `master_user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `master_role` (`role_id`),
  CONSTRAINT `master_user_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `master_department` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_user`
--

LOCK TABLES `master_user` WRITE;
/*!40000 ALTER TABLE `master_user` DISABLE KEYS */;
INSERT INTO `master_user` VALUES (1,'44','Ajit','Navnath','Jadhav','ajitjadhav30april@gmail.com','555',0,NULL,'Baner, Pune','4898589858','4898589858','2001-07-08','AB+','2025-02-17',1,1,0,'2025-02-18 07:22:01','2025-02-26 10:53:03',NULL,NULL),(2,'45','Abhi','sac','Joshi','ab@gmail.com','',1,'2028-12-18','Pune','4444','4444','2002-01-01','A+','2025-02-10',1,1,0,'2025-02-18 10:28:40','2025-02-18 10:28:40',NULL,NULL),(3,'444','Mayur','','Dighe ','m@gmail.com','',0,NULL,'','5289546856','5256485952','2025-02-13','O-','2025-02-21',2,1,0,'2025-02-20 10:58:27','2025-02-20 10:58:27',NULL,NULL),(4,'4444','Jon','','Don','s@gmail.com','',1,'2025-02-27','','8888888888','7777777777','2025-02-04','AB-','2025-02-11',1,3,0,'2025-02-20 11:01:47','2025-02-20 11:01:47',NULL,NULL),(5,'21','Project','','Manager 1','manager@gmail.com','123',0,NULL,'Pune','5656565656','6565656565','2019-12-30','A+','2025-02-01',3,4,0,'2025-03-04 05:22:52','2025-03-04 05:25:16',NULL,NULL);
/*!40000 ALTER TABLE `master_user` ENABLE KEYS */;
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
  `position_id` int DEFAULT NULL,
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
  KEY `position_id` (`position_id`),
  KEY `project_id` (`project_id`),
  KEY `project_role_id` (`project_role_id`),
  CONSTRAINT `trans_assign_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `master_user` (`user_id`),
  CONSTRAINT `trans_assign_ibfk_2` FOREIGN KEY (`reporting_manager_id`) REFERENCES `master_user` (`user_id`),
  CONSTRAINT `trans_assign_ibfk_3` FOREIGN KEY (`position_id`) REFERENCES `master_position` (`position_id`),
  CONSTRAINT `trans_assign_ibfk_4` FOREIGN KEY (`project_id`) REFERENCES `master_project` (`project_id`),
  CONSTRAINT `trans_assign_ibfk_5` FOREIGN KEY (`project_role_id`) REFERENCES `master_position` (`position_id`)
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
  `allocation_status` varchar(50) DEFAULT NULL,
  `allocation_percentage` int DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_team_id`),
  KEY `customer_id` (`customer_id`),
  KEY `project_id` (`project_id`),
  KEY `employee_id` (`employee_id`),
  KEY `project_role_id` (`project_role_id`),
  KEY `project_manager_id` (`project_manager_id`),
  CONSTRAINT `trans_project_team_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `master_customer` (`customer_id`),
  CONSTRAINT `trans_project_team_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `master_project` (`project_id`),
  CONSTRAINT `trans_project_team_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `master_user` (`user_id`),
  CONSTRAINT `trans_project_team_ibfk_4` FOREIGN KEY (`project_role_id`) REFERENCES `master_position` (`position_id`),
  CONSTRAINT `trans_project_team_ibfk_5` FOREIGN KEY (`project_manager_id`) REFERENCES `master_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_project_team`
--

LOCK TABLES `trans_project_team` WRITE;
/*!40000 ALTER TABLE `trans_project_team` DISABLE KEYS */;
INSERT INTO `trans_project_team` VALUES (1,6,3,4,3,5,'2025-03-02','2025-03-29','Employee',100,1,'2025-03-04 12:46:26','2025-03-05 05:32:21'),(2,1,1,2,1,5,'2025-03-01','2025-03-29','Employee',60,0,'2025-03-05 06:46:15','2025-03-05 06:46:15'),(3,6,3,3,1,4,'2025-03-01','2025-03-29','Employee',40,0,'2025-03-05 06:47:53','2025-03-05 06:47:53'),(4,6,3,2,3,4,'2025-03-01','2025-03-29','Employee',30,0,'2025-03-05 07:06:55','2025-03-05 07:06:55'),(5,1,1,3,1,5,'2025-03-01','2025-03-30','Shadow',60,0,'2025-03-05 07:30:34','2025-03-05 07:30:34'),(6,1,1,2,3,4,'2025-03-01','2025-03-30','Shadow',10,1,'2025-03-05 09:27:57','2025-03-05 09:30:05'),(7,1,1,2,1,4,'2025-03-01','2025-03-29','Employee',10,1,'2025-03-05 09:31:09','2025-03-05 10:18:29'),(8,1,1,2,1,5,'2025-03-01','2025-03-29','Shadow',10,1,'2025-03-05 10:19:26','2025-03-05 10:26:04');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_reporting_manager_history`
--

LOCK TABLES `trans_reporting_manager_history` WRITE;
/*!40000 ALTER TABLE `trans_reporting_manager_history` DISABLE KEYS */;
INSERT INTO `trans_reporting_manager_history` VALUES (1,1,2,'2025-02-19','2025-02-19',0,'2025-02-18 12:33:05','2025-02-18 14:03:59');
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
  `pd_id` int NOT NULL,
  `task_cat_id` int DEFAULT NULL,
  `task_description` text,
  `hours` int DEFAULT NULL,
  `minutes` int DEFAULT NULL,
  `task_status` tinyint(1) DEFAULT '0',
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`timesheet_id`),
  KEY `user_id` (`user_id`),
  KEY `pd_id` (`pd_id`),
  KEY `fk_task_category` (`task_cat_id`),
  CONSTRAINT `fk_task_category` FOREIGN KEY (`task_cat_id`) REFERENCES `master_task_category` (`task_cat_id`) ON DELETE CASCADE,
  CONSTRAINT `trans_timesheet_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `master_user` (`user_id`),
  CONSTRAINT `trans_timesheet_ibfk_2` FOREIGN KEY (`pd_id`) REFERENCES `master_project_deliverables` (`pd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_timesheet`
--

LOCK TABLES `trans_timesheet` WRITE;
/*!40000 ALTER TABLE `trans_timesheet` DISABLE KEYS */;
INSERT INTO `trans_timesheet` VALUES (1,'2025-02-25',1,1,1,'25 - 1',13,30,1,0,'2025-02-28 07:06:54','2025-02-28 07:06:54'),(2,'2025-02-25',1,1,3,'25 - 2',13,45,1,0,'2025-02-28 07:07:22','2025-02-28 07:07:22'),(3,'2025-02-25',1,2,4,'25-3',14,30,1,0,'2025-02-28 07:07:49','2025-02-28 07:07:49'),(4,'2025-02-28',1,2,3,'28  - 2',7,30,1,0,'2025-02-28 07:08:14','2025-02-28 07:08:14'),(5,'2025-02-28',1,2,3,'28-2',15,30,1,0,'2025-02-28 07:08:38','2025-02-28 07:08:38'),(6,'2025-02-28',1,1,1,'ADADS',10,15,0,0,'2025-02-28 09:18:58','2025-02-28 09:18:58'),(7,'2025-03-02',1,2,3,'asc',12,15,1,0,'2025-03-03 05:26:50','2025-03-03 05:26:50'),(8,'2025-03-03',1,2,1,'aaaa',11,15,1,0,'2025-03-03 06:35:50','2025-03-03 06:35:50'),(9,'2025-03-03',1,1,4,'aaaa',7,30,1,1,'2025-03-03 06:48:03','2025-03-03 06:50:21'),(10,'2025-03-02',1,1,1,'asdasd',11,15,1,0,'2025-03-03 06:49:46','2025-03-03 06:49:46'),(11,'2025-03-03',1,2,3,'OK',2,30,1,0,'2025-03-03 09:40:45','2025-03-03 09:40:45'),(12,'2025-03-03',1,2,1,'OK',8,30,1,0,'2025-03-03 09:53:03','2025-03-03 09:53:03'),(13,'2025-03-04',1,2,3,'OK',11,30,1,0,'2025-03-04 05:06:14','2025-03-04 05:06:14');
/*!40000 ALTER TABLE `trans_timesheet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-05 16:16:51
