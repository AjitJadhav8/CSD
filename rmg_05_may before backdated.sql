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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_category`
--

LOCK TABLES `master_category` WRITE;
/*!40000 ALTER TABLE `master_category` DISABLE KEYS */;
INSERT INTO `master_category` VALUES (1,'Manufacturing','Textile','Fibre',0,'2025-02-17 07:46:36','2025-03-07 05:59:00'),(2,'Manufacturing','Textile','Nilon',0,'2025-02-17 07:46:36','2025-03-07 05:59:00'),(3,'Technology','Software','AI',0,'2025-02-17 07:46:36','2025-03-07 05:59:00'),(4,'Technology','Hardware','Semiconductors',0,'2025-02-17 07:46:36','2025-03-07 05:59:00'),(5,'Healthcare','Pharmaceutical','Medicines',0,'2025-02-17 07:46:36','2025-03-07 05:59:00'),(6,'Healthcare','Medical Devices','MRI Machines',0,'2025-02-17 07:46:36','2025-03-07 05:59:00'),(7,'Finance','Banking','Loans',0,'2025-02-17 07:46:36','2025-03-07 05:59:00'),(8,'Finance','Insurance','Health Insurance',0,'2025-02-17 07:46:36','2025-03-07 05:59:00'),(9,'Education','Online Learning','E-Learning Platforms',0,'2025-02-17 07:46:36','2025-03-07 05:59:00'),(10,'Retail','E-Commerce','Online Store',0,'2025-02-17 07:46:36','2025-03-07 05:59:00'),(11,'Food','Package','Bread',0,'2025-02-19 12:23:40','2025-03-07 05:59:00'),(12,'Technology','Software','ML',0,'2025-02-19 12:25:02','2025-03-07 05:59:00'),(19,'Finance','Investment','Stocks',0,'2025-03-07 06:03:36','2025-03-07 06:03:36'),(20,'Technology','IOT','Arduino',0,'2025-03-10 10:22:02','2025-03-10 10:22:02'),(21,'asddasd','asdssa','dasdas',1,'2025-03-10 10:35:08','2025-03-10 10:35:12'),(22,'Technology','IOT','UNO',0,'2025-03-12 12:41:17','2025-03-12 12:41:17'),(23,'Technology','Software','Power BI',0,'2025-03-26 08:52:16','2025-03-26 08:52:16'),(24,'Medical','Pharma','Medicines',0,'2025-03-26 08:52:36','2025-03-26 08:52:36'),(25,'Medical','Pharma','Drugs',0,'2025-03-26 09:02:26','2025-03-26 09:02:26'),(26,'Medical','Pharma','ng-select Testing New Segment',0,'2025-03-27 09:18:22','2025-03-27 09:18:22'),(27,'Medical','ng-select Testing New Indd','ng-select Testing New Seg',0,'2025-03-27 09:18:40','2025-04-03 08:46:49'),(28,'ng-select Testing New sec','ng-select Testing New Ind','ng-select Testing New name',0,'2025-03-27 09:19:03','2025-03-27 09:19:03'),(29,'Medical','Pharma','PD Test',1,'2025-04-01 10:51:46','2025-04-01 10:52:09'),(30,'Medically','ng-select Testing','NE',0,'2025-04-01 10:52:06','2025-04-16 09:34:31'),(31,'a','b','c',0,'2025-04-28 11:31:39','2025-04-28 11:31:39');
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_customer`
--

LOCK TABLES `master_customer` WRITE;
/*!40000 ALTER TABLE `master_customer` DISABLE KEYS */;
INSERT INTO `master_customer` VALUES (7,'Burger King','bking.com','bk@bk.com','1010101010','1010101010',11,'Pune','Maharashtra','411111','India','Making Burgers',0,'2025-03-07 06:00:09','2025-03-19 05:31:03',1,0),(8,'Suzlon','suzlone.com','suzlon@suzlon.com','2020202020','2020203030',3,'Dehi','Maharashtra','455555','India ','Ai related Work',0,'2025-03-07 06:01:38','2025-03-07 06:01:38',1,1),(9,'Esag','esag.com','esag@gmail.com','3030303030','6060606060',19,'Banglore','Karnataka','855665','India','Investment',0,'2025-03-07 06:04:19','2025-03-07 06:04:19',0,0),(10,'NRB','','nrb@gmail.com','8888888888','',2,'Mumbai','Maharashtra','400222','India','',0,'2025-03-10 07:11:38','2025-03-10 07:11:38',1,1),(11,'Blue Star','bs.com','bs@gmail.com','8888888888','',12,'Pune','Maharashtra','422222','India','BBB STAR',0,'2025-03-10 09:56:56','2025-03-10 09:56:56',1,1),(12,'Prominotech','promino.com','pr@gmail.com','5555555555','',3,'Pune','Mah','411045','India','SD Company',0,'2025-03-10 10:10:37','2025-03-10 10:10:37',0,1),(13,'JSW','','','','',22,'','','','','',1,'2025-03-13 15:15:21','2025-04-01 10:39:19',1,1),(15,'Credenca','','','','',22,'','','','','',1,'2025-03-21 12:19:59','2025-04-01 09:17:06',1,1),(16,'Amazon','','','','',19,'','','','','',1,'2025-03-21 12:29:10','2025-04-01 09:17:04',1,0),(17,'meta','','','','',19,'','','','','',1,'2025-03-21 12:36:29','2025-04-01 09:16:58',1,0),(18,'Primus','','','','',8,'','','','','',1,'2025-03-24 11:50:03','2025-04-01 09:16:25',1,0),(19,'Primus',NULL,NULL,NULL,NULL,22,NULL,NULL,NULL,NULL,NULL,1,'2025-03-24 11:51:11','2025-04-01 09:16:56',1,0),(20,'Suzlon','','','','',25,'','','','','',1,'2025-03-26 09:02:59','2025-04-01 09:16:54',1,0),(21,'Micro','','','','',11,'','','','','',1,'2025-03-26 11:35:23','2025-04-01 09:16:39',0,0),(22,'Art','','','','',12,'','','','','',1,'2025-03-26 12:37:12','2025-04-01 09:16:36',0,0),(23,'Les','','','','',23,'','','','','',1,'2025-03-27 08:58:01','2025-04-01 09:16:34',0,0),(24,'Boat','','','','',1,'','','','','',1,'2025-03-27 09:07:31','2025-04-01 09:16:28',1,0),(25,'Titan','','','','',10,'','','','','',0,'2025-04-01 10:37:02','2025-04-01 10:39:13',1,1),(26,'Ajit Testing customer','','','','',27,'','','','','',0,'2025-04-03 11:56:17','2025-04-16 09:19:07',0,1),(27,'das','','','','',5,'','','','','',0,'2025-04-16 09:19:38','2025-04-16 09:19:38',0,0),(28,'abc','','','','',3,'','','','','',0,'2025-04-16 12:17:40','2025-04-16 12:17:40',1,0),(29,'Credenca Data Solutions',NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,0,'2025-04-16 12:19:09','2025-04-16 12:19:09',1,0),(30,'NEW TEST','','','','',30,'','','','','',0,'2025-05-05 06:10:48','2025-05-05 06:10:48',1,1);
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
INSERT INTO `master_department` VALUES (1,'Service Deliveryy',0,'2025-02-18 05:24:13','2025-03-19 10:02:11'),(2,'Manager',0,'2025-02-18 05:25:05','2025-02-18 09:42:23'),(3,'IT',0,'2025-02-18 09:56:27','2025-02-18 09:56:27'),(5,'Developer',0,'2025-02-20 10:00:13','2025-02-20 10:00:13'),(6,'HR',0,'2025-02-20 11:53:44','2025-02-20 11:54:12'),(7,'APPLICATION',0,'2025-03-07 06:11:33','2025-03-07 06:11:33'),(8,'RMG',0,'2025-03-10 11:26:24','2025-03-10 11:26:24'),(9,'Staff',1,'2025-03-14 05:21:51','2025-03-14 05:21:54'),(10,'FO testing Dept',0,'2025-03-26 09:08:19','2025-03-26 09:08:19'),(11,'PD Testing',0,'2025-04-01 10:00:05','2025-04-01 10:00:05'),(12,'PD Test 2',1,'2025-04-01 10:05:32','2025-04-01 10:10:49'),(13,'Pd test 25',0,'2025-04-01 10:10:54','2025-04-15 09:26:21');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_designation`
--

LOCK TABLES `master_designation` WRITE;
/*!40000 ALTER TABLE `master_designation` DISABLE KEYS */;
INSERT INTO `master_designation` VALUES (1,'Software Developer',0,'2025-03-13 06:39:35','2025-03-18 11:47:14'),(2,'Data Engineer',0,'2025-03-13 06:41:44','2025-03-13 06:41:44'),(3,'Data Analyst',1,'2025-03-13 06:41:52','2025-03-13 06:41:55'),(4,'New',1,'2025-03-13 07:12:20','2025-03-13 07:14:08'),(5,'FO testing Designati',0,'2025-03-26 09:08:30','2025-04-15 09:56:14'),(6,'PD Designationn',1,'2025-04-01 10:08:40','2025-04-01 10:11:29');
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_project`
--

LOCK TABLES `master_project` WRITE;
/*!40000 ALTER TABLE `master_project` DISABLE KEYS */;
INSERT INTO `master_project` VALUES (4,7,'BK-ETL','2025-03-01','2025-03-03',2,2,7,1,'2025-03-31','ETL PROCESS',0,'2025-03-07 06:13:13','2025-04-30 10:28:08'),(5,8,'Revam','2025-03-01','2025-03-05',1,2,7,1,'2025-03-20','Re structure',0,'2025-03-07 06:14:02','2025-05-02 09:20:17'),(6,10,'Databricks + PBI','2024-12-02','2025-01-02',2,1,7,2,'2025-03-31','',0,'2025-03-10 07:14:03','2025-03-10 07:14:03'),(7,11,'BS1','2025-03-01','2025-03-03',1,2,9,1,'2025-03-28','',1,'2025-03-19 12:05:02','2025-03-19 12:06:14'),(8,11,'BS1','2025-03-08','2025-03-10',2,1,9,1,'2025-03-29','',1,'2025-03-19 12:06:58','2025-03-19 12:08:24'),(9,11,'BS2','2025-03-01','2025-03-03',2,1,9,1,'2025-03-29',NULL,0,'2025-03-19 12:07:28','2025-03-19 12:07:28'),(10,8,'Suzlon-Validation','2025-03-01','2025-03-06',1,1,7,1,'2025-03-22','',0,'2025-03-21 13:07:03','2025-03-21 13:07:03'),(11,11,'BS3','2025-03-08','2025-03-10',1,1,7,1,'2025-03-29','',0,'2025-03-26 09:15:07','2025-03-26 13:21:40'),(12,24,'Bass','2025-03-01','2025-03-03',2,1,7,1,'2025-03-28','',0,'2025-03-27 10:01:47','2025-03-27 10:01:57'),(13,25,'Lens Site','2025-04-04','2025-04-01',1,2,7,1,'2025-04-30','',0,'2025-04-01 10:55:46','2025-04-01 10:57:45'),(14,26,'UI Project Test','2025-04-01','2025-04-04',1,2,27,1,'2025-03-30','',0,'2025-04-03 12:36:47','2025-04-03 12:37:06'),(15,26,'UI Project 2','2025-04-09','2025-04-18',1,1,27,1,'2025-04-10',NULL,0,'2025-04-03 12:39:06','2025-04-03 12:39:06'),(16,26,'NEW AJIT TESTING','2025-04-01','2025-04-05',2,1,6,2,'2025-04-22','OKOK',0,'2025-04-14 11:35:41','2025-04-16 05:13:59'),(17,12,'Aj Project','2025-04-01','2025-04-01',1,1,42,2,'2025-04-17','',0,'2025-04-16 09:01:52','2025-05-05 05:34:47'),(22,29,'Internal - Learning/Sessions','2025-04-14','2025-04-14',1,2,42,2,'2025-12-31','',0,'2025-04-14 06:06:29','2025-05-05 05:39:08'),(23,29,'Cred Project2','2025-04-01','2025-04-02',2,2,31,1,'2025-04-23','',0,'2025-04-22 09:23:04','2025-04-22 11:01:13'),(24,29,'Cred3','2025-04-02','2025-04-05',1,1,25,1,'2025-04-22','',0,'2025-04-22 12:33:03','2025-04-23 05:49:32'),(25,30,'New Projecttt','2025-05-01','2025-05-03',1,1,7,1,'2025-05-07','',0,'2025-05-05 06:11:29','2025-05-05 06:11:29');
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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_project_deliverables`
--

LOCK TABLES `master_project_deliverables` WRITE;
/*!40000 ALTER TABLE `master_project_deliverables` DISABLE KEYS */;
INSERT INTO `master_project_deliverables` VALUES (9,NULL,NULL,'development deliverable 1',0,'2025-03-21 06:47:04','2025-03-21 06:47:04'),(10,NULL,NULL,'suzlon deliverable 1',0,'2025-03-24 06:14:48','2025-03-24 06:14:48'),(11,NULL,NULL,'FO testing Deliverable 1',0,'2025-03-26 09:14:06','2025-03-26 09:14:06'),(12,NULL,NULL,'Ng-Select Deliverable',0,'2025-03-27 10:16:00','2025-03-27 10:16:00'),(13,NULL,NULL,'Mg select test 2 del',0,'2025-03-27 10:29:26','2025-03-27 10:29:26'),(14,7,4,'31 DEL',1,'2025-03-31 10:38:34','2025-03-31 10:38:55'),(15,8,5,'31 DEL',0,'2025-03-31 10:39:08','2025-03-31 10:39:08'),(16,7,4,'BK DEel 1',0,'2025-03-31 12:01:31','2025-03-31 12:01:31'),(17,8,10,'Suz Val Del 1',1,'2025-03-31 12:03:29','2025-04-01 12:21:37'),(18,7,4,'BK ETL Deliverable 2',0,'2025-04-01 07:09:49','2025-04-01 07:09:49'),(19,24,12,'Bass del 1',1,'2025-04-01 09:02:42','2025-04-01 12:22:21'),(20,25,13,'Titan Deliverable 1',0,'2025-04-01 12:21:00','2025-04-01 12:21:00'),(21,8,10,'Procurement ssis BKKK',0,'2025-04-02 12:59:20','2025-04-03 09:50:49'),(22,8,5,'aaa',0,'2025-04-03 09:56:41','2025-04-03 09:56:41'),(23,8,5,'DEl 21',0,'2025-04-03 10:00:43','2025-04-03 10:01:08'),(24,7,4,'UI Test',0,'2025-04-04 09:49:58','2025-04-04 09:49:58'),(25,11,9,'DEl 1',0,'2025-04-14 04:42:30','2025-04-14 04:42:30'),(26,26,16,'Del 1',0,'2025-04-14 11:36:18','2025-04-14 11:36:18'),(27,26,16,'NEW MANAGER TESTg',0,'2025-04-15 04:55:02','2025-04-15 06:41:50'),(28,26,16,'New DELl',0,'2025-04-15 06:55:13','2025-04-15 06:56:08'),(29,26,16,'c',0,'2025-04-15 06:55:59','2025-04-15 12:44:26'),(30,8,10,'LAst Testing',0,'2025-04-15 06:58:06','2025-04-15 11:47:09'),(31,26,16,'16558a',0,'2025-04-16 05:15:20','2025-04-16 05:15:20'),(32,29,23,'abv',0,'2025-04-22 11:02:45','2025-04-22 11:02:45'),(33,29,24,'Del 1',0,'2025-04-23 05:47:21','2025-04-23 05:47:21'),(34,10,6,'1',0,'2025-04-24 09:18:49','2025-04-24 09:18:49'),(35,29,22,'Demo del 1',0,'2025-05-02 10:35:56','2025-05-02 10:35:56'),(36,30,25,'DEL1',0,'2025-05-05 06:11:46','2025-05-05 06:11:46');
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_project_phases`
--

LOCK TABLES `master_project_phases` WRITE;
/*!40000 ALTER TABLE `master_project_phases` DISABLE KEYS */;
INSERT INTO `master_project_phases` VALUES (1,NULL,'Development',1,'2025-03-21 05:11:34','2025-03-21 06:46:44'),(2,NULL,'Development',0,'2025-03-21 06:12:12','2025-03-21 06:12:12'),(3,NULL,'suzlon phase 1',0,'2025-03-21 06:45:06','2025-03-21 06:45:06'),(4,NULL,'Suzlon-Validation Phase 1',0,'2025-03-24 09:47:13','2025-03-24 09:47:13'),(5,NULL,'Phase 2 testing',0,'2025-03-25 12:56:29','2025-03-25 12:56:29'),(6,NULL,'Phase 3 Testing',0,'2025-03-26 06:12:11','2025-03-26 06:12:11'),(7,NULL,'FO Testing Phase',0,'2025-03-26 09:13:44','2025-03-26 09:13:44'),(8,NULL,'Ng-Select Phase',0,'2025-03-27 10:15:38','2025-03-27 10:15:38'),(9,NULL,'ng select 2 Phase test',0,'2025-03-27 10:30:57','2025-03-27 10:30:57'),(10,16,'Bk Del 1 Phase 1',0,'2025-03-31 12:01:56','2025-03-31 12:01:56'),(11,17,'Suz Val DEl 1 Phase 1',0,'2025-03-31 12:03:51','2025-03-31 12:03:51'),(12,15,'new revam phase',1,'2025-03-31 13:29:44','2025-04-01 12:21:29'),(13,17,'Suz Val Del Phase1',1,'2025-04-01 09:02:20','2025-04-01 09:25:48'),(14,19,'Bass del1 phase1',1,'2025-04-01 09:11:59','2025-04-01 09:18:08'),(15,20,'Titan Deliverable 1 Phase 1',0,'2025-04-01 12:21:22','2025-04-01 12:21:22'),(16,15,'DDevelopment22',0,'2025-04-02 12:59:39','2025-04-03 09:24:09'),(17,16,'asfasd',0,'2025-04-03 09:57:58','2025-04-03 09:58:09'),(18,23,'New Phase Test Edit',0,'2025-04-03 10:01:27','2025-04-03 10:01:38'),(19,15,'UI Test',0,'2025-04-03 13:25:20','2025-04-03 13:25:20'),(20,18,'ui test',0,'2025-04-04 09:56:28','2025-04-04 09:56:28'),(21,25,'Phase 1',0,'2025-04-14 04:42:43','2025-04-14 04:42:43'),(22,26,'aj phase 1',0,'2025-04-14 11:36:34','2025-04-14 11:36:34'),(23,27,'New Phase',0,'2025-04-15 04:56:58','2025-04-15 13:02:00'),(24,16,'A',0,'2025-04-15 06:58:18','2025-04-15 11:32:08'),(25,18,'kbkj',0,'2025-04-16 05:15:47','2025-04-16 09:35:10'),(26,33,'T1',0,'2025-04-23 05:47:32','2025-04-23 05:47:32'),(27,35,'Demo task 1',0,'2025-05-02 10:36:08','2025-05-02 10:36:08'),(28,36,'Task1',0,'2025-05-05 06:11:59','2025-05-05 06:11:59');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_project_role`
--

LOCK TABLES `master_project_role` WRITE;
/*!40000 ALTER TABLE `master_project_role` DISABLE KEYS */;
INSERT INTO `master_project_role` VALUES (4,'Angular Developer',1,'2025-03-07 06:11:56','2025-03-13 06:37:47'),(5,'Intern - developer',0,'2025-03-07 07:24:56','2025-03-18 11:18:31'),(6,'Full Stack Developer',0,'2025-03-13 06:37:21','2025-03-13 06:37:21'),(7,'React Developer',0,'2025-03-14 05:22:55','2025-03-14 05:22:55'),(8,'FO testing Project Role',1,'2025-03-26 09:08:41','2025-04-01 10:11:50'),(9,'PD TEST ROLE Namee',0,'2025-04-01 10:11:38','2025-04-15 09:56:27'),(10,'Internal',0,'2025-04-24 12:32:53','2025-04-24 12:32:53');
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
INSERT INTO `master_skill` VALUES (4,'Angular','technical','ES6',0,'2025-03-07 06:12:12','2025-03-07 06:12:12'),(5,'React Js','technical','ReactJs React Native',0,'2025-03-14 05:23:21','2025-03-18 11:56:59'),(6,'FO testing Skill','soft-skill',NULL,1,'2025-03-26 09:08:55','2025-04-01 10:13:19'),(7,'PD Test Skilll','other','PD TEST SKILL Descriptionn',0,'2025-04-01 10:12:14','2025-04-15 09:56:50');
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
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_user`
--

LOCK TABLES `master_user` WRITE;
/*!40000 ALTER TABLE `master_user` DISABLE KEYS */;
INSERT INTO `master_user` VALUES (6,'01','Ajit','Navnath','Jadhav','ajitjadhav30april@gmail.com','$2b$10$xt6cyE5.bBzv/R9f6klB3eLSsxmETfohRS60.kXrvaxzZmFzb1lcK',NULL,NULL,'Pune','1010101010','1010100101','2001-07-08','AB+','2025-03-01',1,1,0,'2025-03-07 05:55:39','2025-05-05 07:02:01',NULL,NULL),(7,'02','Chaitanya','','Chandgude','chaitanya@gmail.com','$2b$10$3wESSQ4P4NcquDzP41U95e7aOI2yEwn177rvxxF6IawVTj1OL3Ski',0,NULL,'Pune','4040506050','1020305056','2005-01-04','AB+','2025-03-01',1,1,0,'2025-03-07 06:10:17','2025-04-17 12:28:33',NULL,NULL),(8,'03','Devang','','Kolhe','deva@gmail.com','$2b$10$CC16YxZUU2rrTeidHnEhd.1nlTxwqFXNHEO0nHoH7rDg6jcVdGwiO',NULL,NULL,'Pune','8585858585','8585858588','2003-01-01','B-','2025-03-01',0,0,0,'2025-03-07 07:23:39','2025-04-17 12:28:33',NULL,NULL),(9,'04','Sharad','','Yadav','sharad@gmail.com','$2b$10$iZVsyq2HjZEKWnDkkN3kuugxOl2s/S5.n.Upx/QaHlLRl8dmiuBtm',1,'2028-11-01','Baner, Pune','9856589658','5254569856','2000-01-01','AB+','2025-03-01',1,1,0,'2025-03-12 07:19:29','2025-04-17 12:28:33',NULL,NULL),(10,'05','Sandesh','','Kadam','sandesh@gmail.com','$2b$10$fJ2KRIPktGSxsiVJIXRn5eYCYkzcRXyYgT2btc0PUssp6YIZweK7i',NULL,NULL,'','2259586935','','2004-02-03','','2025-03-28',0,0,1,'2025-03-13 10:44:00','2025-04-17 12:28:33',NULL,NULL),(11,'06','Vijay','','Pawar','vijay@gmail.com','$2b$10$XIAtBeh.nlVCTQdw9zCpjeMj3BgDX.3SzNOQhmz1a2kcPGgWhEeOO',NULL,NULL,'','5566445588','',NULL,'',NULL,0,0,1,'2025-03-13 10:58:14','2025-04-17 12:28:33',NULL,NULL),(13,'07','Vijay','','Pawarr','vijayp@gmail.com','$2b$10$0V/0fikr2Tulvhc3ju7rh.YsZLnyT6NaVTwFj18A.g9OrHcxMwimu',NULL,NULL,'Banerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr, Pune','4565898569','','2003-01-03','AB+','2025-03-21',0,0,0,'2025-03-13 11:58:36','2025-04-22 09:05:42',NULL,NULL),(14,'40013','Sushil','','Shinde','sushil.shinde@credenca.com','$2b$10$3capk1uJcacz1V1SvF6C.uvdz47ftF7npJ7BoBf3/2/tkUD/lWR5S',NULL,NULL,'','8888888889','',NULL,'',NULL,0,0,1,'2025-03-13 13:58:10','2025-04-17 12:28:33',NULL,NULL),(15,'40012','Nitin','','Kukreja','nitin@gmail.com','$2b$10$Qa3llDbDgckmjA6i4UY2d.qu.1EF2rzclOcEb9UMclfYlYv.3CVF.',NULL,NULL,'','8959682506','',NULL,'',NULL,0,0,1,'2025-03-14 05:20:39','2025-04-17 12:28:34',NULL,NULL),(16,'10','Atul','','Nehte','atul@credenca.com','$2b$10$mPpUVhlVvEAvczZ9E0VdLuEUjjwD0NPr05og3C7SrfuG5h9ZRBPxC',NULL,NULL,'','4569856578','',NULL,'',NULL,0,0,1,'2025-03-19 13:31:26','2025-04-17 12:28:34',NULL,NULL),(17,'45','Rohit',NULL,'Sharma','r@gmail.com','$2b$10$PdZ51ZXes/jodW7Cg40fceXUp5SJneObQ.05FX6.gwZ33s9ZsB6ZS',NULL,NULL,'','7889526547','',NULL,'',NULL,0,0,1,'2025-03-19 13:34:28','2025-04-17 12:28:34',NULL,NULL),(18,'411','Ajittt','','Jadhav','qa@gmail.com','$2b$10$824Wc9uL9FGNfupL.wnn3ePOtAreeHnIGdgU7k9VdbxVRtMxVj3gO',NULL,NULL,NULL,'1564566566',NULL,NULL,NULL,NULL,0,0,1,'2025-03-21 12:06:15','2025-04-17 12:28:34',NULL,NULL),(20,'4111','sss','','sss','qa1@gmail.com','$2b$10$tvtDRQt1JPFD1Tx4pZgPnuWMnZe3Ljb3Lsmk1MqkCOVH5xTXvaSLO',NULL,NULL,NULL,'8956856225',NULL,NULL,NULL,NULL,0,0,1,'2025-03-24 04:12:10','2025-04-17 12:28:34',NULL,NULL),(21,'4111','aaa',NULL,'bbb','411@gmail.com','$2b$10$cZvX/1Hs4Xm5Mpc5JgQIrOkMDYisD8E0cil6lctqjbANaWFv6qquq',NULL,NULL,'','4589956554','',NULL,'',NULL,0,0,0,'2025-03-24 04:19:34','2025-04-23 10:44:06',NULL,NULL),(22,'41114','dsf','','sfdf','41@gmail.com','$2b$10$lu8v9VuOy1EXVOVNZe6DSuQw/yWuavoYYiNkYxf.yryrr1YYL2S3W',NULL,NULL,'','8959856585','',NULL,'',NULL,0,0,0,'2025-03-24 04:20:10','2025-05-05 05:39:08',NULL,NULL),(23,'411030','Damodar','','Jivrajani','damodar@gmail.com','$2b$10$NbRsEHp3dk0yg5D6hYRmH.eUd/58ZgLCFEzi16LZBxKGu5U991vbi',NULL,NULL,'','8987589856','',NULL,'',NULL,0,0,0,'2025-03-26 05:04:39','2025-04-17 12:28:34',NULL,NULL),(24,'411029','Karan','','Mehta','karan@gmail.com','$2b$10$HpvAgP4S/49jzII40HhTAeU/GZm.ijs07gBrYJ6uap8pHx8I556Ea',NULL,NULL,'','6578956589','',NULL,'',NULL,0,0,0,'2025-03-26 09:09:28','2025-04-17 12:28:34',NULL,NULL),(25,'411031','Vishal ','','Patil','vishal@gmail.com','$2b$10$0bJEPaRtgriD2rRuwOL2O.SimftblxFwDnzL0gJg38XwTYpLyt.PO',NULL,NULL,'','9858685896','',NULL,'',NULL,0,1,0,'2025-04-01 09:56:57','2025-04-23 05:49:32',NULL,NULL),(26,'411076','Akshay','','Kulkarni','aksha@gmailc.om','$2b$10$Uthn/wjRnwt6MmsdRcRlJeNW9W.C/w378FTSOw80d/lF1miqwyPY.',NULL,NULL,'','5689859868','',NULL,'',NULL,0,0,0,'2025-04-03 04:38:24','2025-04-23 05:46:01',NULL,NULL),(27,'411077','Test','','Employee','test@gmail.com','$2b$10$eivtyNW.eJ/hadKrdf0HOe8j900h9SHnj6Nytrdxbzm32qBFGgRxe',NULL,NULL,NULL,'8888888888',NULL,NULL,NULL,NULL,0,1,0,'2025-04-03 05:00:19','2025-04-17 12:28:35',NULL,NULL),(28,'411078','Test','new','Employee 2','test2@gmail.com','$2b$10$2ETaGOmgxma8i5HbvvIoOe06x/AOUPlLHgTVMaYlwxIhvtYwYe/h.',NULL,NULL,'','4598652656','',NULL,'',NULL,0,0,0,'2025-04-03 05:05:11','2025-04-30 10:28:08','2035e660b7847671c3c70dc3ab91a473f592ca61ddb92dd80a66c48116a5bd7d',1745327772819),(29,'454','TEST','','DEMO','t@gmail.com','$2b$10$.xF5uTkcUIFRYQPrGvMC1ucMVBCfIYN0EGrCjAqFKzTFnSqgIDfJ2',NULL,NULL,NULL,'4578986515',NULL,NULL,NULL,NULL,0,0,0,'2025-04-03 10:04:52','2025-04-17 12:28:35',NULL,NULL),(30,'4444','Test','','Role','role@gmail.com','$2b$10$mTUZD/nb66Wq9b9bxT9gAexz6LYZQbYq4IWMmiNvQfANTA/eoccKG',NULL,NULL,'','5689585987','',NULL,'',NULL,0,0,0,'2025-04-03 10:34:21','2025-04-17 12:28:35',NULL,NULL),(31,'444','Test','','Password','pass@gmail.com','$2b$10$AgmqUOs4lDY7U8k8oUpZBuPVLRflqoKJ9sKwDw.2l2BtynoAcpIfy',NULL,NULL,'','6589856589','',NULL,'',NULL,0,1,0,'2025-04-03 10:59:41','2025-04-22 11:01:14',NULL,NULL),(32,'123','adsffaaaa','','asddd','asas@g.commm','$2b$10$4qPoP24/LM2khmGthQo7jOwOY5y5j1ydLfIsTlYE5Mt4JFeWkIffe',1,'2025-04-30','Baner, Pune','5655656650','8598652565','2001-07-08','AB+','2025-04-17',0,0,0,'2025-04-11 04:59:06','2025-04-17 12:28:35',NULL,NULL),(42,'400091','Amit',NULL,'Sangrulkar','amit.sangrulkar@credenca.com','$2b$10$FGIyOFXKSl40ZgmqyxXIU.W6P8OkxAHazdryGWlnL8q61IvQ7Y5T6',NULL,NULL,'','9881069187','',NULL,'',NULL,0,1,0,'2025-04-04 12:35:44','2025-05-05 04:20:19',NULL,NULL),(43,'5555','ABC','','XYZ','abc@gmail.comm','$2b$10$AomD1i8k32S6Q986QsE9iuL6bKzaClGr/QAyE/i.zSNZfZOmqp/1e',NULL,NULL,NULL,'5289564585',NULL,NULL,NULL,NULL,0,0,0,'2025-04-16 12:30:24','2025-04-17 12:28:35',NULL,NULL),(44,'666','Testing','','Int','ab@gmail.com','$2b$10$Ei.ZN1HNY8Ujyq.QEYwlpuy5d8AVhq/ai8snW/QzTQ6MJ/MqhpfRa',NULL,NULL,NULL,'5689586526',NULL,NULL,NULL,NULL,0,0,0,'2025-04-16 12:33:54','2025-04-17 12:28:36',NULL,NULL),(45,'7777','Abhi','','Jadhav','abhi@gmail.com','$2b$10$peFVpY3NG3tLu8eR6F83Lu84xdWRIjZrK7SMk9GvY9cOcWrKi1Jxe',NULL,NULL,NULL,'4589856589',NULL,NULL,NULL,NULL,0,0,0,'2025-04-17 05:00:01','2025-04-22 09:27:05',NULL,NULL),(46,'456','Sumit','','Jadhav','a@gmail.com','$2b$10$sXtg5/Z05UnpTqdzjMOM6.8KuiFKQfS7CmDnnlForaTQpgjin/s8q',NULL,NULL,NULL,'4565898565',NULL,NULL,NULL,NULL,0,0,0,'2025-04-17 05:08:19','2025-04-22 11:01:14',NULL,NULL),(47,'4566','Last','','Testing','last@gmail.com','$2b$10$PM6nF201UKUA6SEjMSExpuN0wElh81R1c3hMzviMy99DjZpcBpBka',NULL,NULL,NULL,'5689856589',NULL,NULL,NULL,NULL,0,0,1,'2025-05-05 04:03:12','2025-05-05 04:16:14',NULL,NULL),(48,'4555','Abc','','KKK','k@gmail.com','$2b$10$Wsf.BraASx80sZyBBbX7S./7qHmR9YFImW0PzFyLJuYQJVfXoZRwK',NULL,NULL,NULL,'6565898565',NULL,NULL,NULL,NULL,0,0,1,'2025-05-05 04:04:58','2025-05-05 04:16:11',NULL,NULL),(49,'55656','j','','jj','j@gmail.com','$2b$10$xG6Z4d6gM2ZZz7b6XKo5kOXvfCaQHRZiB.7bwwZwm2PPz.lG50MlC',NULL,NULL,NULL,'6525657548',NULL,NULL,NULL,NULL,0,0,1,'2025-05-05 04:06:19','2025-05-05 04:16:08',NULL,NULL),(50,'4566','last','','testing','last@gmail.com','$2b$10$kqnDnSgnxujA4GpcFu9C/O12RV.QRTskVgwkLu9f9sXoxBZORIH/S',NULL,NULL,NULL,'4565456545',NULL,NULL,NULL,NULL,0,0,0,'2025-05-05 04:16:35','2025-05-05 04:16:35',NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_manager_history`
--

LOCK TABLES `project_manager_history` WRITE;
/*!40000 ALTER TABLE `project_manager_history` DISABLE KEYS */;
INSERT INTO `project_manager_history` VALUES (1,22,13,'2025-04-22 14:34:51','2025-04-22 14:35:42','2025-04-22 09:04:51'),(2,22,22,'2025-04-22 14:35:42','2025-05-05 11:09:08','2025-04-22 09:05:42'),(3,23,45,'2025-04-22 14:53:04','2025-04-22 14:57:05','2025-04-22 09:23:04'),(4,23,46,'2025-04-22 14:57:05','2025-04-22 16:31:13','2025-04-22 09:27:05'),(5,23,31,'2025-04-22 16:31:14',NULL,'2025-04-22 11:01:14'),(6,4,28,'2025-04-22 17:43:55','2025-04-30 15:58:08','2025-04-22 12:13:55'),(7,24,9,'2025-04-22 18:03:03','2025-04-23 11:19:32','2025-04-22 12:33:03'),(8,5,7,'2025-03-07 11:44:02','2025-05-02 12:31:57','2025-04-22 12:41:39'),(9,6,7,'2025-03-10 12:44:03',NULL,'2025-04-22 12:41:39'),(10,9,9,'2025-03-19 17:37:28',NULL,'2025-04-22 12:41:39'),(11,10,7,'2025-03-21 18:37:03',NULL,'2025-04-22 12:41:39'),(12,11,7,'2025-03-26 14:45:07',NULL,'2025-04-22 12:41:39'),(13,12,7,'2025-03-27 15:31:47',NULL,'2025-04-22 12:41:39'),(14,13,7,'2025-04-01 16:25:46',NULL,'2025-04-22 12:41:39'),(15,14,27,'2025-04-03 18:06:47',NULL,'2025-04-22 12:41:39'),(16,15,27,'2025-04-03 18:09:06',NULL,'2025-04-22 12:41:39'),(17,16,6,'2025-04-14 17:05:41',NULL,'2025-04-22 12:41:39'),(18,17,6,'2025-04-16 14:31:52','2025-05-05 11:04:47','2025-04-22 12:41:39'),(23,24,25,'2025-04-23 11:19:32',NULL,'2025-04-23 05:49:32'),(24,4,7,'2025-04-30 15:58:08',NULL,'2025-04-30 10:28:08'),(25,5,22,'2025-05-02 12:31:57','2025-05-02 14:50:17','2025-05-02 07:01:57'),(26,5,7,'2025-05-02 14:50:17',NULL,'2025-05-02 09:20:17'),(27,17,42,'2025-05-05 11:04:47',NULL,'2025-05-05 05:34:47'),(28,22,42,'2025-05-05 11:09:08',NULL,'2025-05-05 05:39:08'),(29,25,7,'2025-05-05 11:41:29',NULL,'2025-05-05 06:11:29');
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
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_project_team`
--

LOCK TABLES `trans_project_team` WRITE;
/*!40000 ALTER TABLE `trans_project_team` DISABLE KEYS */;
INSERT INTO `trans_project_team` VALUES (15,7,4,6,4,7,'2025-03-01','2025-03-30',1,100,1,100,1,'2025-03-07 06:16:43','2025-03-10 07:04:16',0,NULL),(16,8,5,8,5,7,'2025-03-01','2025-03-21',1,50,1,50,1,'2025-03-07 07:25:31','2025-03-10 07:53:01',0,NULL),(17,7,4,8,5,7,'2025-02-27','2025-03-13',1,30,1,100,0,'2025-03-10 07:05:38','2025-03-19 10:30:10',0,NULL),(18,7,4,6,6,7,'2025-03-01','2025-03-22',1,50,1,50,0,'2025-03-13 15:29:13','2025-03-13 15:29:13',0,NULL),(19,7,4,13,5,7,'2025-03-07','2025-03-21',1,30,1,30,0,'2025-03-24 03:42:46','2025-03-24 03:42:46',0,NULL),(20,8,5,8,6,7,'2025-02-28','2025-03-21',1,50,1,60,0,'2025-03-24 04:31:18','2025-03-25 09:27:12',0,NULL),(21,7,4,18,5,7,'2025-03-01','2025-03-08',1,20,1,40,0,'2025-03-24 04:37:22','2025-03-24 04:37:22',0,NULL),(22,8,5,6,6,7,'2025-03-01','2025-03-29',1,40,1,50,0,'2025-03-24 06:14:19','2025-04-23 12:12:34',1,'2025-04-23'),(23,7,4,21,6,7,'2025-03-15','2025-03-21',1,20,0,20,0,'2025-03-25 09:33:10','2025-03-25 09:33:10',0,NULL),(24,8,10,21,5,7,'2025-03-08','2025-03-15',1,40,0,20,0,'2025-03-25 09:55:14','2025-04-23 10:18:26',1,'2025-04-23'),(25,7,4,22,6,7,'2025-03-01','2025-03-12',1,0,0,0,0,'2025-03-25 10:05:36','2025-03-25 10:05:36',0,NULL),(26,8,10,22,5,7,'2025-03-07','2025-03-22',0,0,0,0,0,'2025-03-25 10:15:36','2025-03-25 10:15:36',0,NULL),(27,8,10,18,7,7,'2025-03-07','2025-03-27',1,40,1,20,0,'2025-03-25 10:17:48','2025-03-25 10:17:48',0,NULL),(28,7,4,24,6,7,'2025-03-06','2025-03-28',0,0,0,0,0,'2025-03-27 05:07:41','2025-03-27 07:05:55',0,NULL),(29,8,10,9,5,7,'2025-03-11','2025-03-29',0,0,0,0,0,'2025-03-27 05:12:41','2025-03-27 07:04:16',0,NULL),(30,11,9,23,8,9,'2025-03-05','2025-03-26',1,10,0,10,0,'2025-03-27 05:17:24','2025-03-27 05:52:09',0,NULL),(31,11,11,24,6,7,'2025-03-08','2025-03-28',0,0,0,0,0,'2025-03-27 07:07:36','2025-03-27 07:07:36',0,NULL),(32,24,12,18,5,7,'2025-03-01','2025-03-21',0,0,0,0,0,'2025-03-28 04:36:34','2025-03-28 04:36:34',0,NULL),(33,25,13,25,9,7,'2025-04-01','2025-04-29',0,20,0,0,0,'2025-04-02 05:14:18','2025-04-04 08:19:22',0,NULL),(34,8,10,25,5,7,'2025-04-01','2025-04-30',1,10,1,40,0,'2025-04-02 06:39:17','2025-04-02 10:06:39',0,NULL),(35,8,5,25,5,7,'2025-04-04','2025-04-11',1,20,1,100,0,'2025-04-04 06:18:07','2025-04-04 06:18:07',0,NULL),(36,26,15,26,5,27,'2025-04-01','2025-04-25',0,0,0,0,1,'2025-04-04 06:50:41','2025-04-04 07:30:51',0,NULL),(37,26,15,25,5,27,'2025-04-01','2025-04-24',1,50,0,0,0,'2025-04-04 07:31:41','2025-04-04 08:19:08',0,NULL),(38,11,11,7,6,9,'2025-04-01','2025-04-16',1,30,1,30,0,'2025-04-14 04:42:06','2025-04-15 12:24:06',0,NULL),(39,26,16,8,5,6,'2025-04-04','2025-04-24',0,10,0,0,0,'2025-04-16 05:05:49','2025-04-23 13:14:48',1,'2025-04-23'),(40,29,22,43,5,NULL,'2025-04-16',NULL,0,0,0,0,0,'2025-04-16 12:30:24','2025-04-16 12:30:24',0,NULL),(41,29,22,44,5,42,'2025-04-16',NULL,0,0,0,0,0,'2025-04-16 12:33:54','2025-04-16 12:33:54',0,NULL),(42,7,4,44,7,7,'2025-04-11','2025-04-25',1,90,1,100,0,'2025-04-16 12:53:01','2025-04-16 12:54:17',0,NULL),(43,8,5,44,6,7,'2025-04-01','2025-04-18',1,10,1,100,0,'2025-04-16 12:54:39','2025-04-16 12:54:39',0,NULL),(44,29,22,45,5,42,'2025-04-17',NULL,0,0,0,0,0,'2025-04-17 05:00:01','2025-04-17 05:00:01',0,NULL),(45,29,22,46,5,42,'2025-04-17',NULL,0,0,0,0,0,'2025-04-17 05:08:19','2025-04-17 05:08:19',0,NULL),(46,29,23,13,5,45,'2025-04-10','2025-04-16',0,10,0,0,0,'2025-04-22 09:25:13','2025-04-22 09:25:33',0,NULL),(47,29,23,23,6,45,'2025-04-01','2025-04-25',0,10,0,0,0,'2025-04-22 09:25:57','2025-04-22 09:25:57',0,NULL),(48,29,23,21,7,31,'2025-04-01','2025-04-24',0,30,0,0,0,'2025-04-22 11:49:15','2025-04-23 09:09:41',1,'2025-04-23'),(49,29,24,26,5,9,'2025-04-17','2025-04-24',0,20,0,0,0,'2025-04-23 05:43:38','2025-04-23 07:20:18',1,'2025-04-23'),(50,11,11,21,5,7,'2025-04-08','2025-04-24',1,80,0,0,0,'2025-04-23 10:19:31','2025-04-23 10:19:31',0,NULL),(51,26,16,43,9,6,'2025-04-03','2025-04-18',1,30,1,40,0,'2025-04-23 13:20:09','2025-04-23 13:20:09',0,NULL),(52,29,22,6,10,42,'2025-04-24',NULL,0,0,0,0,0,'2025-04-24 13:05:41','2025-04-24 13:05:41',0,NULL),(53,29,22,7,10,42,'2025-04-24',NULL,0,0,0,0,0,'2025-04-24 13:05:41','2025-04-24 13:05:41',0,NULL),(54,29,22,8,10,42,'2025-04-24',NULL,0,0,0,0,0,'2025-04-24 13:05:41','2025-04-24 13:05:41',0,NULL),(55,29,22,9,10,42,'2025-04-24',NULL,0,0,0,0,0,'2025-04-24 13:05:41','2025-04-24 13:05:41',0,NULL),(56,29,22,13,10,42,'2025-04-24',NULL,0,0,0,0,0,'2025-04-24 13:05:41','2025-04-24 13:05:41',0,NULL),(57,29,22,21,10,42,'2025-04-24',NULL,0,0,0,0,0,'2025-04-24 13:05:41','2025-04-24 13:05:41',0,NULL),(58,29,22,22,10,42,'2025-04-24',NULL,0,0,0,0,0,'2025-04-24 13:05:41','2025-04-24 13:05:41',0,NULL),(59,29,22,23,10,42,'2025-04-24',NULL,0,0,0,0,0,'2025-04-24 13:05:41','2025-04-24 13:05:41',0,NULL),(60,29,22,24,10,42,'2025-04-24',NULL,0,0,0,0,0,'2025-04-24 13:05:41','2025-04-24 13:05:41',0,NULL),(61,29,22,25,10,42,'2025-04-24',NULL,0,0,0,0,0,'2025-04-24 13:05:41','2025-04-24 13:05:41',0,NULL),(62,29,22,26,10,42,'2025-04-24',NULL,0,0,0,0,0,'2025-04-24 13:05:41','2025-04-24 13:05:41',0,NULL),(63,29,22,27,10,42,'2025-04-24',NULL,0,0,0,0,0,'2025-04-24 13:05:41','2025-04-24 13:05:41',0,NULL),(64,29,22,28,10,42,'2025-04-24',NULL,0,0,0,0,0,'2025-04-24 13:05:41','2025-04-24 13:05:41',0,NULL),(65,29,22,29,10,42,'2025-04-24',NULL,0,0,0,0,0,'2025-04-24 13:05:41','2025-04-24 13:05:41',0,NULL),(66,29,22,30,10,42,'2025-04-24',NULL,0,0,0,0,0,'2025-04-24 13:05:41','2025-04-24 13:05:41',0,NULL),(67,29,22,31,10,42,'2025-04-24',NULL,0,0,0,0,0,'2025-04-24 13:05:41','2025-04-24 13:05:41',0,NULL),(68,29,22,32,10,42,'2025-04-24',NULL,0,0,0,0,0,'2025-04-24 13:05:41','2025-04-24 13:05:41',0,NULL),(69,29,22,42,10,42,'2025-04-24',NULL,0,0,0,0,0,'2025-04-24 13:05:41','2025-04-24 13:05:41',0,NULL),(73,29,22,50,10,42,'2025-05-05',NULL,0,0,0,0,0,'2025-05-05 04:16:35','2025-05-05 04:16:35',0,NULL),(74,30,25,6,6,7,'2025-05-01','2025-05-30',1,20,1,20,0,'2025-05-05 06:12:51','2025-05-05 06:13:36',1,'2025-05-05');
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
INSERT INTO `trans_reporting_manager_history` VALUES (2,6,14,'2025-03-01','2025-03-31',0,'2025-03-18 12:14:22','2025-03-18 12:14:22'),(3,6,7,'2025-04-05','2025-04-19',0,'2025-04-04 05:21:14','2025-04-04 05:21:14');
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
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_timesheet`
--

LOCK TABLES `trans_timesheet` WRITE;
/*!40000 ALTER TABLE `trans_timesheet` DISABLE KEYS */;
INSERT INTO `trans_timesheet` VALUES (19,'2025-03-21',6,9,NULL,4,45,1,0,'2025-03-21 09:26:38','2025-03-21 09:26:38',2),(20,'2025-03-21',6,9,NULL,3,30,1,0,'2025-03-21 09:27:44','2025-03-21 09:27:44',2),(21,'2025-03-21',6,9,'OK',5,30,1,0,'2025-03-21 09:32:29','2025-03-21 09:32:29',2),(22,'2025-03-21',8,9,'OK',4,30,1,0,'2025-03-21 10:46:45','2025-03-21 10:46:45',2),(23,'2025-03-24',6,10,'OKK',3,45,0,0,'2025-03-24 06:15:09','2025-03-24 06:15:09',3),(24,'2025-03-25',13,9,'BK Desc',4,30,0,0,'2025-03-25 07:34:57','2025-03-25 07:34:57',2),(25,'2025-03-25',6,9,'Ok bk ',3,30,1,0,'2025-03-25 08:59:48','2025-03-25 08:59:48',2),(26,'2025-03-25',6,10,'Suzlon check',3,30,0,0,'2025-03-25 09:01:40','2025-03-25 09:01:40',3),(27,'2025-03-25',6,10,'sss',3,30,1,0,'2025-03-25 09:03:41','2025-03-25 09:03:41',3),(28,'2025-03-25',6,10,'OKOKOK',4,45,0,0,'2025-03-25 09:46:22','2025-03-25 09:46:22',3),(29,'2025-03-25',6,9,'jbhb',2,30,0,0,'2025-03-25 10:51:40','2025-03-25 10:51:40',2),(30,'2025-03-25',6,9,'kaskdglk',3,15,0,0,'2025-03-25 10:54:03','2025-03-25 10:54:03',2),(31,'2025-03-26',6,9,'My bk task Description',0,30,0,0,'2025-03-26 04:48:08','2025-03-26 04:48:08',2),(32,'2025-03-26',6,10,'OKOK',2,15,0,0,'2025-03-26 04:48:58','2025-03-26 04:48:58',3),(33,'2025-03-26',6,9,'m',1,15,0,0,'2025-03-26 04:50:09','2025-03-26 04:50:09',2),(34,'2025-03-26',6,9,'OO',2,0,0,0,'2025-03-26 04:53:53','2025-03-26 04:53:53',2),(35,'2025-03-27',6,9,'OKOK',0,30,0,0,'2025-03-27 11:14:58','2025-03-27 11:14:58',2),(36,'2025-03-27',6,10,'Completee',3,15,1,0,'2025-03-27 11:15:31','2025-03-31 06:22:36',3),(37,'2025-03-28',6,9,'Testing',0,30,0,0,'2025-03-28 04:35:24','2025-03-28 04:35:24',2),(38,'2025-03-28',6,9,'Testing 2',1,0,1,0,'2025-03-28 04:35:54','2025-03-28 04:35:54',2),(39,'2025-03-28',6,9,'Testing edit date',1,30,0,0,'2025-03-28 09:36:36','2025-03-31 06:43:32',2),(40,'2025-03-29',6,10,'Edit Testing',1,0,1,0,'2025-03-31 05:38:41','2025-03-31 05:56:04',3),(41,'2025-03-31',6,9,'Testing editing ',1,0,0,0,'2025-03-31 06:21:31','2025-03-31 06:58:18',2),(42,'2025-03-31',6,10,'Test',2,15,0,0,'2025-03-31 06:58:37','2025-03-31 06:58:37',3),(43,'2025-03-31',6,9,'OKOK',4,0,0,0,'2025-03-31 06:59:28','2025-03-31 06:59:28',2),(44,'2025-03-31',6,9,'OKOK',3,0,0,0,'2025-03-31 07:04:05','2025-03-31 07:04:05',2),(45,'2025-03-31',6,16,'OKOK',3,15,0,0,'2025-03-31 13:03:46','2025-03-31 13:28:49',10),(46,'2025-04-01',6,15,'OKOK',2,0,1,0,'2025-04-01 03:55:06','2025-04-01 04:21:30',12),(47,'2025-04-01',6,16,'OKK',2,30,1,0,'2025-04-01 03:55:33','2025-04-01 11:23:09',10),(48,'2025-04-01',6,16,'PD TEST ',3,0,0,1,'2025-04-01 11:25:42','2025-04-01 11:25:48',10),(49,'2025-04-03',6,16,'ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',1,0,1,0,'2025-04-03 10:31:31','2025-04-03 10:31:31',10),(50,'2025-04-04',6,16,'ccccccccccccccccccakssndfklasckonasj cksmsckjsokvkmsmsovk skdckscok snkas cokmakcnkoas x okskj noka sc koana',3,0,1,0,'2025-04-04 08:55:12','2025-04-04 10:21:16',10),(51,'2025-04-04',6,16,'asdm askdnf\nlalsnflasmdfkp\nlklasnfkamsf',2,0,0,0,'2025-04-04 11:05:49','2025-04-04 11:05:49',10),(52,'2025-04-04',6,15,'m ,m',2,0,1,0,'2025-04-04 11:06:11','2025-04-04 11:06:11',16),(53,'2025-04-07',6,16,'ok',2,0,1,0,'2025-04-07 12:41:38','2025-04-07 12:41:38',10),(54,'2025-04-08',6,16,'OK',2,0,1,0,'2025-04-08 03:57:39','2025-04-08 03:57:39',17),(55,'2025-04-08',6,16,'OKAAY',3,0,1,0,'2025-04-08 05:24:47','2025-04-08 05:24:47',17),(56,'2025-04-10',6,16,'OKOKOK',2,0,0,0,'2025-04-10 12:30:04','2025-04-10 12:30:04',10),(57,'2025-04-11',6,16,'aa',4,0,0,0,'2025-04-11 04:25:29','2025-04-11 04:25:29',10),(58,'2025-04-11',6,15,'zax',4,30,0,0,'2025-04-11 04:25:56','2025-04-11 04:25:56',19),(59,'2025-04-14',7,25,'asd',3,0,0,1,'2025-04-14 05:00:47','2025-04-14 05:32:00',21),(60,'2025-04-14',7,25,'ads',4,15,1,0,'2025-04-14 05:09:58','2025-04-14 05:32:07',21),(61,'2025-04-14',7,25,'a',2,0,1,0,'2025-04-14 05:25:09','2025-04-14 05:25:09',21),(62,'2025-04-14',7,25,'n',3,30,0,0,'2025-04-14 05:25:30','2025-04-14 05:25:30',21),(63,'2025-04-14',7,25,'asd',2,0,1,1,'2025-04-14 05:30:54','2025-04-14 09:23:17',21),(64,'2025-04-14',6,18,'dsfs',8,45,1,1,'2025-04-14 05:34:27','2025-04-14 05:54:04',20),(65,'2025-04-14',6,23,'asdd',8,45,0,1,'2025-04-14 05:34:43','2025-04-14 06:09:03',18),(66,'2025-04-14',6,18,'dsa',8,45,1,1,'2025-04-14 05:34:58','2025-04-14 06:10:11',20),(67,'2025-04-14',6,18,'s',2,45,0,1,'2025-04-14 05:54:18','2025-04-14 06:25:55',20),(68,'2025-04-14',6,15,'as',8,0,0,1,'2025-04-14 06:25:10','2025-04-14 12:30:21',16),(69,'2025-04-14',6,18,'sa',8,0,0,1,'2025-04-14 07:18:44','2025-04-14 12:30:25',20),(70,'2025-04-14',7,25,'asd',3,0,1,0,'2025-04-14 08:39:20','2025-04-14 08:39:20',21),(71,'2025-04-14',7,25,'asdsdf',3,0,1,0,'2025-04-14 08:39:44','2025-04-14 08:39:44',21),(72,'2025-04-14',7,25,'asdsdf',5,0,1,1,'2025-04-14 08:40:00','2025-04-14 09:23:22',21),(73,'2025-04-14',6,15,'as',8,0,0,0,'2025-04-14 12:28:55','2025-04-14 12:28:55',16),(74,'2025-04-14',6,15,'zax',4,30,0,0,'2025-04-14 12:29:42','2025-04-14 12:29:42',19),(75,'2025-04-14',6,15,'as',8,0,0,0,'2025-04-14 12:30:09','2025-04-14 12:30:09',19),(76,'2025-04-14',7,25,'asrsgsaf',2,0,1,0,'2025-04-14 12:54:40','2025-04-14 12:54:40',21),(77,'2025-04-14',6,18,'asd',3,0,1,0,'2025-04-15 10:06:13','2025-04-15 12:14:27',20),(78,'2025-04-15',6,15,'aa',4,0,0,0,'2025-04-15 12:14:47','2025-04-15 12:15:46',19),(79,'2025-04-16',6,15,'aa',4,0,0,0,'2025-04-16 05:25:41','2025-04-16 05:25:41',19),(80,'2025-04-16',6,18,'asd',3,45,1,0,'2025-04-16 06:09:26','2025-04-16 06:09:54',20),(81,'2025-04-21',6,15,'pk',4,0,0,0,'2025-04-22 04:26:46','2025-04-22 04:26:46',16),(82,'2025-04-21',6,16,'asod',2,0,1,0,'2025-04-22 04:27:14','2025-04-22 04:27:14',10),(83,'2025-04-22',6,16,'l',2,0,0,0,'2025-04-22 12:18:12','2025-04-22 12:18:12',10),(84,'2025-04-23',26,33,'Sharad Is Manager',6,0,0,0,'2025-04-23 05:48:15','2025-04-23 05:48:15',26),(85,'2025-04-23',6,16,'za',2,0,0,0,'2025-04-23 12:13:19','2025-04-23 12:13:19',10),(86,'2025-04-23',8,26,'as',1,0,0,0,'2025-04-23 13:14:01','2025-04-23 13:14:01',22),(87,'2025-04-23',8,26,'as',1,0,1,0,'2025-04-23 13:14:08','2025-04-23 13:14:08',22),(88,'2025-04-24',8,15,'a',4,0,1,0,'2025-04-24 04:00:12','2025-04-24 04:00:12',16),(89,'2025-04-28',6,16,'OK\n',2,0,1,0,'2025-04-28 08:38:06','2025-04-28 08:38:06',10),(90,'2025-04-29',6,16,'ok',2,0,0,0,'2025-04-29 08:39:24','2025-04-29 08:39:24',10),(91,'2025-04-29',6,16,'ok',2,0,0,0,'2025-04-29 08:39:40','2025-04-29 08:39:40',10),(92,'2025-04-30',6,16,'OK',2,0,0,0,'2025-04-30 10:25:53','2025-04-30 10:25:53',10),(93,'2025-04-30',6,16,'ppp',2,0,0,0,'2025-04-30 10:26:26','2025-04-30 10:26:26',10),(94,'2025-04-30',6,16,'ok',1,15,0,0,'2025-04-30 10:26:48','2025-04-30 10:26:48',17),(95,'2025-04-30',6,16,'ads',2,45,1,0,'2025-05-02 07:36:12','2025-05-02 07:36:12',10),(96,'2025-05-02',6,16,'TEST\n',1,0,0,0,'2025-05-02 10:25:25','2025-05-02 10:25:25',10),(97,'2025-05-02',6,16,'Test Second',3,30,0,0,'2025-05-02 10:33:04','2025-05-02 10:33:04',10),(98,'2025-05-02',6,35,'Credenca project First',2,0,1,0,'2025-05-02 10:36:31','2025-05-02 10:36:31',27),(99,'2025-05-05',50,35,'wsd',1,0,1,0,'2025-05-05 04:17:31','2025-05-05 04:17:31',27),(100,'2025-05-05',6,16,'TEST',3,0,1,0,'2025-05-05 04:59:47','2025-05-05 04:59:47',17),(101,'2025-05-05',6,16,'TEST2',3,0,1,0,'2025-05-05 05:00:05','2025-05-05 05:00:05',17),(102,'2025-05-02',6,16,'Test Second',3,0,0,0,'2025-05-05 05:00:20','2025-05-05 05:00:20',10),(103,'2025-05-05',6,36,'OKKKK',2,0,1,0,'2025-05-05 06:13:24','2025-05-05 06:13:24',28);
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_user_details`
--

LOCK TABLES `trans_user_details` WRITE;
/*!40000 ALTER TABLE `trans_user_details` DISABLE KEYS */;
INSERT INTO `trans_user_details` VALUES (1,6,5,5,NULL,7,NULL,'2025-03-12 05:38:41','2025-04-17 10:59:25',0),(2,7,3,2,0,NULL,NULL,'2025-03-12 05:38:41','2025-03-12 05:38:41',0),(3,8,4,5,NULL,7,NULL,'2025-03-12 05:38:41','2025-03-19 12:57:57',0),(4,9,1,2,1,7,NULL,'2025-03-12 10:05:47','2025-03-12 10:05:47',0),(5,11,NULL,NULL,NULL,NULL,NULL,'2025-03-13 11:21:51','2025-03-13 11:21:51',0),(8,13,4,5,1,7,1,'2025-03-13 11:59:31','2025-03-25 07:34:22',0),(11,10,NULL,NULL,NULL,13,1,'2025-03-13 13:42:01','2025-03-19 13:25:47',1),(12,15,1,3,1,7,1,'2025-03-14 05:20:59','2025-03-14 05:21:11',0),(13,14,1,NULL,NULL,10,NULL,'2025-03-14 05:31:33','2025-03-19 13:13:35',1),(14,16,NULL,NULL,NULL,6,NULL,'2025-03-19 13:31:46','2025-03-19 13:32:10',1),(15,17,NULL,NULL,NULL,6,NULL,'2025-03-19 13:35:25','2025-03-19 13:36:52',1),(16,22,4,NULL,NULL,7,NULL,'2025-03-24 10:19:03','2025-03-25 06:41:25',0),(17,23,4,NULL,NULL,NULL,NULL,'2025-03-26 05:04:46','2025-03-26 05:04:46',0),(18,24,NULL,1,1,7,1,'2025-03-27 08:46:04','2025-03-27 08:46:04',0),(19,25,4,NULL,NULL,7,NULL,'2025-04-01 09:58:03','2025-04-01 09:58:03',0),(20,30,4,NULL,0,NULL,NULL,'2025-04-03 10:34:21','2025-04-03 10:35:45',0),(21,31,4,1,NULL,NULL,NULL,'2025-04-03 10:59:41','2025-04-16 10:24:59',0),(22,32,4,3,1,6,1,'2025-04-11 04:59:06','2025-04-16 10:00:50',0),(23,43,4,NULL,0,NULL,NULL,'2025-04-16 12:30:24','2025-04-16 12:30:24',0),(24,44,4,NULL,0,NULL,NULL,'2025-04-16 12:33:54','2025-04-16 12:33:54',0),(25,45,4,NULL,0,NULL,NULL,'2025-04-17 05:00:01','2025-04-17 05:00:01',0),(26,46,4,NULL,0,NULL,NULL,'2025-04-17 05:08:19','2025-04-17 05:08:19',0),(27,42,4,NULL,NULL,NULL,NULL,'2025-04-17 07:30:43','2025-04-17 07:30:43',0),(28,28,4,NULL,NULL,NULL,NULL,'2025-04-22 12:14:59','2025-04-22 12:14:59',0),(29,26,4,NULL,NULL,NULL,NULL,'2025-04-23 05:46:01','2025-04-23 05:46:01',0),(30,21,4,NULL,NULL,NULL,NULL,'2025-04-23 10:44:06','2025-04-23 10:44:06',0),(31,47,4,NULL,0,NULL,NULL,'2025-05-05 04:03:12','2025-05-05 04:16:14',1),(32,48,4,NULL,0,NULL,NULL,'2025-05-05 04:04:59','2025-05-05 04:16:11',1),(33,49,4,NULL,0,NULL,NULL,'2025-05-05 04:06:19','2025-05-05 04:16:08',1),(34,50,4,NULL,0,NULL,NULL,'2025-05-05 04:16:35','2025-05-05 04:16:35',0);
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

-- Dump completed on 2025-05-05 15:16:16
