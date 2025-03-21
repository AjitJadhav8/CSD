CREATE DATABASE  IF NOT EXISTS `rmg2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `rmg2`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: rmg2
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_category`
--

LOCK TABLES `master_category` WRITE;
/*!40000 ALTER TABLE `master_category` DISABLE KEYS */;
INSERT INTO `master_category` VALUES (1,'Manufacturing','Textile','Fibre',0,'2025-02-17 07:46:36','2025-03-07 05:59:00'),(2,'Manufacturing','Textile','Nilon',0,'2025-02-17 07:46:36','2025-03-07 05:59:00'),(3,'Technology','Software','AI',0,'2025-02-17 07:46:36','2025-03-07 05:59:00'),(4,'Technology','Hardware','Semiconductors',0,'2025-02-17 07:46:36','2025-03-07 05:59:00'),(5,'Healthcare','Pharmaceutical','Medicines',0,'2025-02-17 07:46:36','2025-03-07 05:59:00'),(6,'Healthcare','Medical Devices','MRI Machines',0,'2025-02-17 07:46:36','2025-03-07 05:59:00'),(7,'Finance','Banking','Loans',0,'2025-02-17 07:46:36','2025-03-07 05:59:00'),(8,'Finance','Insurance','Health Insurance',0,'2025-02-17 07:46:36','2025-03-07 05:59:00'),(9,'Education','Online Learning','E-Learning Platforms',0,'2025-02-17 07:46:36','2025-03-07 05:59:00'),(10,'Retail','E-Commerce','Online Store',0,'2025-02-17 07:46:36','2025-03-07 05:59:00'),(11,'Food','Package','Bread',0,'2025-02-19 12:23:40','2025-03-07 05:59:00'),(12,'Technology','Software','ML',0,'2025-02-19 12:25:02','2025-03-07 05:59:00'),(19,'Finance','Investment','Stocks',0,'2025-03-07 06:03:36','2025-03-07 06:03:36'),(20,'Technology','IOT','Arduino',0,'2025-03-10 10:22:02','2025-03-10 10:22:02'),(21,'asddasd','asdssa','dasdas',1,'2025-03-10 10:35:08','2025-03-10 10:35:12'),(22,'Technology','IOT','UNO',0,'2025-03-12 12:41:17','2025-03-12 12:41:17');
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_customer`
--

LOCK TABLES `master_customer` WRITE;
/*!40000 ALTER TABLE `master_customer` DISABLE KEYS */;
INSERT INTO `master_customer` VALUES (7,'Burger King','bking.com','bk@bk.com','1010101010','1010101010',11,'Pune','Maharashtra','411111','India','Making Burgers',0,'2025-03-07 06:00:09','2025-03-19 05:31:03',1,0),(8,'Suzlon','suzlone.com','suzlon@suzlon.com','2020202020','2020203030',3,'Dehi','Maharashtra','455555','India ','Ai related Work',0,'2025-03-07 06:01:38','2025-03-07 06:01:38',1,1),(9,'Esag','esag.com','esag@gmail.com','3030303030','6060606060',19,'Banglore','Karnataka','855665','India','Investment',0,'2025-03-07 06:04:19','2025-03-07 06:04:19',0,0),(10,'NRB','','nrb@gmail.com','8888888888','',2,'Mumbai','Maharashtra','400222','India','',0,'2025-03-10 07:11:38','2025-03-10 07:11:38',1,1),(11,'Blue Star','bs.com','bs@gmail.com','8888888888','',12,'Pune','Maharashtra','422222','India','BBB STAR',0,'2025-03-10 09:56:56','2025-03-10 09:56:56',1,1),(12,'Prominotech','promino.com','pr@gmail.com','5555555555','',3,'Pune','Mah','411045','India','SD Company',0,'2025-03-10 10:10:37','2025-03-10 10:10:37',0,1),(13,'JSW','','','','',22,'','','','','',0,'2025-03-13 15:15:21','2025-03-13 15:15:21',1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_department`
--

LOCK TABLES `master_department` WRITE;
/*!40000 ALTER TABLE `master_department` DISABLE KEYS */;
INSERT INTO `master_department` VALUES (1,'Service Deliveryy',0,'2025-02-18 05:24:13','2025-03-19 10:02:11'),(2,'Manager',0,'2025-02-18 05:25:05','2025-02-18 09:42:23'),(3,'IT',0,'2025-02-18 09:56:27','2025-02-18 09:56:27'),(5,'Developer',0,'2025-02-20 10:00:13','2025-02-20 10:00:13'),(6,'HR',0,'2025-02-20 11:53:44','2025-02-20 11:54:12'),(7,'APPLICATION',0,'2025-03-07 06:11:33','2025-03-07 06:11:33'),(8,'RMG',0,'2025-03-10 11:26:24','2025-03-10 11:26:24'),(9,'Staff',1,'2025-03-14 05:21:51','2025-03-14 05:21:54');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_designation`
--

LOCK TABLES `master_designation` WRITE;
/*!40000 ALTER TABLE `master_designation` DISABLE KEYS */;
INSERT INTO `master_designation` VALUES (1,'Software Developer',0,'2025-03-13 06:39:35','2025-03-18 11:47:14'),(2,'Data Engineer',0,'2025-03-13 06:41:44','2025-03-13 06:41:44'),(3,'Data Analyst',1,'2025-03-13 06:41:52','2025-03-13 06:41:55'),(4,'New',1,'2025-03-13 07:12:20','2025-03-13 07:14:08');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_project`
--

LOCK TABLES `master_project` WRITE;
/*!40000 ALTER TABLE `master_project` DISABLE KEYS */;
INSERT INTO `master_project` VALUES (4,7,'BK-ETL','2025-03-01','2025-03-03',2,2,7,1,'2025-03-31','ETL PROCESS',0,'2025-03-07 06:13:13','2025-03-19 06:52:44'),(5,8,'Revam','2025-03-08','2025-03-05',1,2,7,1,'2025-03-20','Re structure',0,'2025-03-07 06:14:02','2025-03-07 06:14:02'),(6,10,'Databricks + PBI','2024-12-02','2025-01-02',2,1,7,2,'2025-03-31','',0,'2025-03-10 07:14:03','2025-03-10 07:14:03');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_project_deliverables`
--

LOCK TABLES `master_project_deliverables` WRITE;
/*!40000 ALTER TABLE `master_project_deliverables` DISABLE KEYS */;
INSERT INTO `master_project_deliverables` VALUES (3,7,4,'RND Table',0,'2025-03-07 06:14:42','2025-03-07 06:14:42'),(4,7,4,'Vaidation',0,'2025-03-07 06:14:57','2025-03-07 06:14:57'),(5,8,5,'RND Project',0,'2025-03-07 06:15:15','2025-03-07 06:15:15'),(6,8,5,'Meetings',0,'2025-03-07 06:15:22','2025-03-07 06:15:22'),(7,8,5,'Development',0,'2025-03-14 05:17:22','2025-03-14 05:17:22');
/*!40000 ALTER TABLE `master_project_deliverables` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_project_role`
--

LOCK TABLES `master_project_role` WRITE;
/*!40000 ALTER TABLE `master_project_role` DISABLE KEYS */;
INSERT INTO `master_project_role` VALUES (4,'Angular Developer',1,'2025-03-07 06:11:56','2025-03-13 06:37:47'),(5,'Intern - developer',0,'2025-03-07 07:24:56','2025-03-18 11:18:31'),(6,'Full Stack Developer',0,'2025-03-13 06:37:21','2025-03-13 06:37:21'),(7,'React Developer',0,'2025-03-14 05:22:55','2025-03-14 05:22:55');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_role`
--

LOCK TABLES `master_role` WRITE;
/*!40000 ALTER TABLE `master_role` DISABLE KEYS */;
INSERT INTO `master_role` VALUES (1,'superadmin',0,'2025-02-18 06:25:18','2025-02-18 06:25:18'),(2,'admin',0,'2025-02-18 06:25:18','2025-02-18 06:25:18'),(3,'projectManager',0,'2025-03-04 04:29:39','2025-03-04 04:29:39'),(4,'employee',0,'2025-03-06 13:16:31','2025-03-06 13:16:31');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_skill`
--

LOCK TABLES `master_skill` WRITE;
/*!40000 ALTER TABLE `master_skill` DISABLE KEYS */;
INSERT INTO `master_skill` VALUES (4,'Angular','technical','ES6',0,'2025-03-07 06:12:12','2025-03-07 06:12:12'),(5,'React Js','technical','ReactJs React Native',0,'2025-03-14 05:23:21','2025-03-18 11:56:59');
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
INSERT INTO `master_task_category` VALUES (5,'Developement',0,'2025-03-07 06:15:39','2025-03-07 06:15:39'),(6,'RND',0,'2025-03-07 06:15:43','2025-03-07 06:15:43'),(7,'Maintenance',0,'2025-03-07 06:15:57','2025-03-07 06:15:57'),(8,'Support',0,'2025-03-07 06:16:02','2025-03-07 06:16:02'),(9,'Testing',0,'2025-03-14 05:24:05','2025-03-14 05:24:05');
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
  `is_RM` tinyint(1) DEFAULT '0',
  `is_PM` tinyint(1) DEFAULT '0',
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` bigint DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_code` (`user_code`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_user`
--

LOCK TABLES `master_user` WRITE;
/*!40000 ALTER TABLE `master_user` DISABLE KEYS */;
INSERT INTO `master_user` VALUES (6,'01','Ajit','Navnath','Jadhav','ajit30april@gmail.com','123',0,NULL,'Pune','1010101010','1010100101','2001-07-08','AB+','2025-03-01',0,0,0,'2025-03-07 05:55:39','2025-03-07 05:55:39',NULL,NULL),(7,'02','Chaitanya','','Chandgude','chaitanya@gmail.com','123',0,NULL,'Pune','4040506050','1020305056','2005-01-04','AB+','2025-03-01',0,0,0,'2025-03-07 06:10:17','2025-03-07 06:10:17',NULL,NULL),(8,'03','Devang','','Kolhe','deva@gmail.com','123',0,NULL,'Pune','8585858585','8585858588','2003-01-01','B-','2025-03-01',0,0,0,'2025-03-07 07:23:39','2025-03-07 07:23:39',NULL,NULL),(9,'04','Sharad','','Yadav','sharad@gmail.com','123',1,'2028-11-01','Baner, Pune','9856589658','5254569856','2000-01-01','AB+','2025-03-01',0,0,0,'2025-03-12 07:19:29','2025-03-12 07:19:29',NULL,NULL),(10,'05','Sandesh','','Kadam','sandesh@gmail.com','123',NULL,NULL,'','2259586935','','2004-02-03','','2025-03-28',0,0,0,'2025-03-13 10:44:00','2025-03-13 13:42:01',NULL,NULL),(11,'06','Vijay','','Pawar','vijay@gmail.com','123',NULL,NULL,'','5566445588','',NULL,'',NULL,0,0,1,'2025-03-13 10:58:14','2025-03-13 11:57:54',NULL,NULL),(13,'07','Vijay','','Pawarr','vijayp@gmail.com','123',NULL,NULL,'Baner, Pune','4565898569','','2003-01-03','AB+','2025-03-21',0,0,0,'2025-03-13 11:58:36','2025-03-13 13:34:48',NULL,NULL),(14,'40013','Sushil','','Shinde','sushil.shinde@credenca.com','123',NULL,NULL,'','8888888889','',NULL,'',NULL,0,0,0,'2025-03-13 13:58:10','2025-03-18 12:34:48',NULL,NULL),(15,'40012','Nitin','','Kukreja','nitin@gmail.com','123',NULL,NULL,'','8959682506','',NULL,'',NULL,0,0,1,'2025-03-14 05:20:39','2025-03-14 05:21:25',NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_project_team`
--

LOCK TABLES `trans_project_team` WRITE;
/*!40000 ALTER TABLE `trans_project_team` DISABLE KEYS */;
INSERT INTO `trans_project_team` VALUES (15,7,4,6,4,7,'2025-03-01','2025-03-30',1,100,1,100,1,'2025-03-07 06:16:43','2025-03-10 07:04:16'),(16,8,5,8,5,7,'2025-03-01','2025-03-21',1,50,1,50,1,'2025-03-07 07:25:31','2025-03-10 07:53:01'),(17,7,4,8,5,7,'2025-02-27','2025-03-13',1,30,1,100,0,'2025-03-10 07:05:38','2025-03-19 10:30:10'),(18,7,4,6,6,7,'2025-03-01','2025-03-22',1,50,1,50,0,'2025-03-13 15:29:13','2025-03-13 15:29:13');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_reporting_manager_history`
--

LOCK TABLES `trans_reporting_manager_history` WRITE;
/*!40000 ALTER TABLE `trans_reporting_manager_history` DISABLE KEYS */;
INSERT INTO `trans_reporting_manager_history` VALUES (2,6,14,'2025-03-01','2025-03-31',0,'2025-03-18 12:14:22','2025-03-18 12:14:22');
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_timesheet`
--

LOCK TABLES `trans_timesheet` WRITE;
/*!40000 ALTER TABLE `trans_timesheet` DISABLE KEYS */;
INSERT INTO `trans_timesheet` VALUES (16,'2025-03-07',6,3,6,'DONE RND',2,30,1,0,'2025-03-07 06:18:15','2025-03-07 06:18:15'),(17,'2025-03-13',6,4,6,'OKOK',6,30,1,0,'2025-03-13 15:32:13','2025-03-13 15:32:13'),(18,'2025-03-13',6,3,6,'NONO',5,45,0,0,'2025-03-13 15:33:48','2025-03-13 15:33:48');
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_user_details`
--

LOCK TABLES `trans_user_details` WRITE;
/*!40000 ALTER TABLE `trans_user_details` DISABLE KEYS */;
INSERT INTO `trans_user_details` VALUES (1,6,1,5,0,NULL,NULL,'2025-03-12 05:38:41','2025-03-12 05:38:41'),(2,7,3,2,0,NULL,NULL,'2025-03-12 05:38:41','2025-03-12 05:38:41'),(3,8,4,5,0,NULL,NULL,'2025-03-12 05:38:41','2025-03-12 05:38:41'),(4,9,1,2,1,7,NULL,'2025-03-12 10:05:47','2025-03-12 10:05:47'),(5,11,NULL,NULL,NULL,NULL,NULL,'2025-03-13 11:21:51','2025-03-13 11:21:51'),(8,13,NULL,5,1,7,1,'2025-03-13 11:59:31','2025-03-18 06:34:20'),(11,10,NULL,NULL,NULL,NULL,1,'2025-03-13 13:42:01','2025-03-13 13:42:01'),(12,15,1,3,1,7,1,'2025-03-14 05:20:59','2025-03-14 05:21:11'),(13,14,1,NULL,NULL,NULL,NULL,'2025-03-14 05:31:33','2025-03-14 05:31:33');
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

-- Dump completed on 2025-03-19 17:11:48
