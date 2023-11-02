-- MySQL dump 10.13  Distrib 8.2.0, for Linux (x86_64)
--
-- Host: localhost    Database: devices
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `maximumHourlyEnergyConsumption` varchar(255) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ae7154510495c7ddda951b07a07` (`user_id`),
  CONSTRAINT `FK_ae7154510495c7ddda951b07a07` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device`
--

LOCK TABLES `device` WRITE;
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
INSERT INTO `device` VALUES ('29705ebf-b6eb-46e0-bf5f-e380d4c8b8ad','Wind Farm Energy Monitor','Monitor for a wind farm\'s energy output.','123 Windy Way, Windville','0 kWh (generation device)','https://www.datocms-assets.com/53444/1659950043-dewesoft-wind-turbine-monitoring.png?auto=format&w=800&dpr=1.5',NULL),('2f182706-da22-43ff-b8c5-b8088e63acdc','Microwave','Microwave oven for heating and cooking food.','789 Kitchenette Lane','1 kWh','https://i5.walmartimages.com/seo/Mainstays-0-7-cu-ft-Countertop-Microwave-Oven-700-Watts-Black-New_0a982c74-197f-418d-b11b-84b7e2bbed2f.25ce9d5b7c11df7f5690617465e4cdbc.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',NULL),('38c169ea-c4d7-4249-939c-0aa42fc57043','Solar Inverter Monitor','Monitor for solar inverter performance.','101 Green Street, Solarville','2 kWh','https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/92936cb30687926818d309538dd46a8b.jpg?imageView2/2/w/800/q/70',NULL),('63f2f3b2-005d-4344-9043-0990e29aae00','Air Conditioner','Air conditioning unit for cooling a room.','222 Cool Breeze Street','2.5 kWh','https://www.lg.com/levant_en/images/air-conditioning-units/md07547825/gallery/D-1.jpg',NULL),('67591a16-fdae-4832-84f1-7926cc1be69d','Home Energy Monitor','Smart meter for a residential home.','456 Elm Avenue, Suburbiad','3 kWh','https://www.elitecheu.com/cdn/shop/products/6391ace427ade714b70fb966024ae804_404x402.jpg?v=1661414298',NULL),('6f5da279-7a46-46b7-bb6b-63a0ac8902dc','Washing Machine','Smart washing machine for laundry.','101 Laundry Room Road','1.5 kWh','https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_80545476?x=960&y=720&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=960&ey=720&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=960&cdy=720',NULL);
/*!40000 ALTER TABLE `device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` varchar(36) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('57c541d1-2c03-4e0a-9ff3-ed8800f134c4'),('ca285026-9489-45ad-825d-f241b7acec03'),('ertyui');
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

-- Dump completed on 2023-11-02 17:00:37
