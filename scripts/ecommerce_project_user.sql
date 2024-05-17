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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `password` varchar(80) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('johndoe123','John','Doe','$2a$10$E0SL31EAOciQR3cGmWDyUe0SiYbyY.JxgTrwO9jdxyuCoNPY3oLkG','JohnDoe123@hotmail.com','male'),('Muhammad Saif','Muhammad','Saif','$2a$10$dcqW/C2TwB2QW5dgSl0NnOz3PzU/.dsVUlQZjKd5E3h08iYSP9KzK','muhammadsaif3032@gmail.com',NULL),('saif123','Muhammad','Saif','$2a$10$RuzOAoEfrYJDpfZqywc1IezYFuUGDWLt3T/PufhbXh2hnrfvZ5/m2',NULL,NULL),('testuser1','test','user','$2a$10$JWfhxcpkXYmTQ1hRqdek1ezM32cyZ05wCZ6FmDATsy.5oZzqUR2Da','user@mail.com',NULL),('user123','user','123','$2a$10$TG6h5ykWk0ObwDJh.akSUO7.Iz9RZMx8GxUanc/4irpH.SU3dVwOq',NULL,NULL),('usertesting','user','testing','$2a$10$Kfk5LP.lq4cpRskKw44TxuHdzWbal/f2kqQwklBqYsuyfsk6fA8WG',NULL,NULL),('usertesting2','user','testing2','$2a$10$qYSY4z0lo6JRntxy3c0hg.qsW8XlRqV0l.4hOGRufO/rkSAeVK0JO',NULL,NULL),('valorant123','valorant','123','$2a$10$KyqcLKA3AfxNtn7PCQOc/ukuiQebYC/RKIe0Ag5Yxosq9abtsIqly','accv647@gmail.com','male'),('whitewalker123','White','Walker','$2a$10$wgVSduuFFlttBvvlytSpuebTK9cxFsMfG4ZcGHJBL9csN8IW2reU6','whitewalker123@gmail.com','male');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-17 23:21:08
