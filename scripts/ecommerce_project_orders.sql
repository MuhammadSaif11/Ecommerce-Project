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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `contact_number` varchar(11) NOT NULL,
  `full_address` varchar(255) NOT NULL,
  `order_status` varchar(50) NOT NULL,
  `order_total_amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,'valorant123','Muhammad Saif','123456789','karachi,Pakistan','ORDER_DELIVERED',16385.00,'2024-04-20 18:48:56','2024-04-25 19:33:57'),(3,'valorant123','Muhammad Saif','123456789','karachi,Pakistan','ORDER_DELIVERED',16385.00,'2024-04-20 18:57:55','2024-04-25 19:35:35'),(4,'valorant123','Saif','123456789','karachi,Pakistan','ORDER_DELIVERED',1398.00,'2024-04-20 19:03:29','2024-04-25 20:15:52'),(5,'whitewalker123','white walker','4289167','hyderabad, Pakistan.','ORDER_DELIVERED',11186.00,'2024-04-20 19:06:32','2024-04-25 20:19:47'),(6,'valorant123','valorant 123','111244622','karachi,Pakistan','ORDER_DELIVERED',18991.00,'2024-04-21 21:19:06','2024-04-25 20:32:11'),(7,'valorant123','valorant 123','627191825','karachi,Pakistan','ORDER_DELIVERED',1998.00,'2024-04-22 15:41:06','2024-04-25 20:12:13'),(8,'johndoe123','john doe','1245676','karachi,Pakistan','ORDER_DELIVERED',899.00,'2024-04-22 15:57:57','2024-04-25 20:07:10'),(9,'whitewalker123','white walker','11111111','karachi','ORDER_DELIVERED',3897.00,'2024-04-25 20:41:25','2024-04-25 20:42:23'),(10,'valorant123','valorant 123','24679221','hyderabad, Pakistan.','ORDER_PLACED',4799.00,'2024-05-17 17:21:31','2024-05-17 17:21:30'),(11,'testuser1','test user','12345678','hyderabad, Pakistan.','ORDER_PLACED',7697.00,'2024-05-17 17:22:50','2024-05-17 17:22:50');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-17 23:21:06
