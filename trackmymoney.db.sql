-- MySQL dump 10.13  Distrib 5.5.31, for debian-linux-gnu (i686)
--
-- Host: localhost    Database: trackmymoney
-- ------------------------------------------------------
-- Server version	5.5.31-0ubuntu0.12.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria` (
  `ID_categoria` bigint(20) NOT NULL AUTO_INCREMENT,
  `descrizione` varchar(45) DEFAULT '',
  PRIMARY KEY (`ID_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'casa'),(2,'tempolibero'),(3,'abbigliamento'),(4,'alimentazione'),(5,'pagamenti'),(6,'macchina'),(7,'vacanze'),(8,'altro');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `elencospese`
--

DROP TABLE IF EXISTS `elencospese`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `elencospese` (
  `ID_elencospesa` bigint(20) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(45) DEFAULT NULL,
  `sottocategoria` varchar(45) DEFAULT NULL,
  `data` datetime DEFAULT NULL,
  `descrizione` varchar(45) DEFAULT '',
  `importo` float DEFAULT '0',
  PRIMARY KEY (`ID_elencospesa`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `entrate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entrate` (
  `ID_entrata` bigint(20) NOT NULL AUTO_INCREMENT,
  `mese` int(11) DEFAULT '0',
  `anno` int(11) DEFAULT '0',
  `entrata` float DEFAULT '0',
  PRIMARY KEY (`ID_entrata`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entrate`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login` (
  `ID_login` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) DEFAULT NULL,
  `password` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`ID_login`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (1,'admin','admin');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sottocategoria`
--

DROP TABLE IF EXISTS `sottocategoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sottocategoria` (
  `ID_sottocategoria` bigint(20) NOT NULL AUTO_INCREMENT,
  `ID_categoria` bigint(20) DEFAULT NULL,
  `descrizione` varchar(45) DEFAULT '',
  PRIMARY KEY (`ID_sottocategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sottocategoria`
--

LOCK TABLES `sottocategoria` WRITE;
/*!40000 ALTER TABLE `sottocategoria` DISABLE KEYS */;
INSERT INTO `sottocategoria` VALUES (1,1,'mobili'),(2,1,'arredamento'),(3,1,'riparazione'),(4,1,'altro'),(5,2,'sport'),(6,2,'concerto'),(7,2,'cinema'),(8,2,'altro'),(9,3,'calzature'),(10,3,'vestiti'),(11,3,'accessori'),(12,3,'altro'),(13,4,'spesa'),(14,5,'internet'),(15,5,'telefono'),(16,5,'altro'),(17,6,'benzina'),(18,6,'rata'),(19,6,'assicurazione'),(20,6,'bollo'),(21,6,'altro'),(22,7,'trasporto'),(23,7,'hotel'),(24,7,'souvenir'),(25,7,'altro'),(26,8,'altro'),(27,8,'giornali'),(28,2,'libri');
/*!40000 ALTER TABLE `sottocategoria` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-11-28 21:59:13
