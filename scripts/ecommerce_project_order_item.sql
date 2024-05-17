-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ecommerce_project
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `order_item_id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `quantity` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (7,2,15,2,'2024-04-20 18:48:56','2024-04-20 18:48:56'),(8,2,24,1,'2024-04-20 18:48:56','2024-04-20 18:48:56'),(9,2,13,2,'2024-04-20 18:48:56','2024-04-20 18:48:56'),(10,2,32,1,'2024-04-20 18:48:56','2024-04-20 18:48:56'),(11,2,25,1,'2024-04-20 18:48:56','2024-04-20 18:48:56'),(12,2,28,1,'2024-04-20 18:48:56','2024-04-20 18:48:56'),(13,3,15,2,'2024-04-20 18:57:54','2024-04-20 18:57:54'),(14,3,24,1,'2024-04-20 18:57:54','2024-04-20 18:57:54'),(15,3,13,2,'2024-04-20 18:57:54','2024-04-20 18:57:54'),(16,3,32,1,'2024-04-20 18:57:54','2024-04-20 18:57:54'),(17,3,25,1,'2024-04-20 18:57:54','2024-04-20 18:57:54'),(18,3,28,1,'2024-04-20 18:57:54','2024-04-20 18:57:54'),(19,4,16,2,'2024-04-20 19:03:28','2024-04-20 19:03:28'),(20,5,15,3,'2024-04-20 19:06:31','2024-04-20 19:06:31'),(21,5,27,1,'2024-04-20 19:06:31','2024-04-20 19:06:31'),(22,5,32,1,'2024-04-20 19:06:31','2024-04-20 19:06:31'),(23,6,30,1,'2024-04-21 21:19:06','2024-04-21 21:19:06'),(24,6,25,1,'2024-04-21 21:19:06','2024-04-21 21:19:06'),(25,6,31,1,'2024-04-21 21:19:06','2024-04-21 21:19:06'),(26,7,25,2,'2024-04-22 15:41:05','2024-04-22 15:41:05'),(27,8,18,1,'2024-04-22 15:57:56','2024-04-22 15:57:56'),(28,9,13,1,'2024-04-25 20:41:24','2024-04-25 20:41:24'),(29,9,16,3,'2024-04-25 20:41:24','2024-04-25 20:41:24'),(30,10,27,1,'2024-05-17 17:21:30','2024-05-17 17:21:30'),(31,10,13,2,'2024-05-17 17:21:30','2024-05-17 17:21:30'),(32,11,14,1,'2024-05-17 17:22:50','2024-05-17 17:22:50'),(33,11,16,2,'2024-05-17 17:22:50','2024-05-17 17:22:50'),(34,11,15,1,'2024-05-17 17:22:50','2024-05-17 17:22:50');
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-17 23:21:07
