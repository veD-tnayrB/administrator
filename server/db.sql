CREATE DATABASE  IF NOT EXISTS `essential` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `essential`;
-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: essential
-- ------------------------------------------------------
-- Server version	8.0.36-2ubuntu3

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
-- Table structure for table `access_tokens`
--

DROP TABLE IF EXISTS `access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `access_tokens` (
  `id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `access_token` text,
  `time_updated` timestamp NULL DEFAULT NULL,
  `time_created` timestamp NULL DEFAULT NULL,
  `notifications_token` varchar(255) DEFAULT NULL,
  `timezone` varchar(45) DEFAULT 'UTC',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `access_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `access_tokens_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_tokens`
--

LOCK TABLES `access_tokens` WRITE;
/*!40000 ALTER TABLE `access_tokens` DISABLE KEYS */;
INSERT INTO `access_tokens` VALUES ('854d2d34-b35f-4d50-ac82-355aaf218315','869252b8-c1f6-40f9-ba8d-c22317d9062b','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyYXlhbm1jLmNvbnRhY3RvQGdtYWlsLmNvbSIsImlkIjoiODY5MjUyYjgtYzFmNi00MGY5LWJhOGQtYzIyMzE3ZDkwNjJiIiwiZ2VuZXJhdGVkQXQiOjE3MTY3NzUzNTgzOTAsImlhdCI6MTcxNjc3NTM1OCwiZXhwIjoxNzE2ODYxNzU4fQ.HhpnsW1x_4AL14mOjzWiy1qt28ZBC_1syxqCv0MH9mw',NULL,NULL,'evvjwDqp6sQc31StXWio-h:APA91bHjKlu9Yk4P4gVwEIWJgiRTMkJAuVGgiQz4DVsr2e-kXE9NKJkM58l-jfTF8XWgSM4EmdWFBchmq21cedILnzL0clLvp80XH5Hxe_EOCUIt6cV8ya5oU88SL_QOWP1oU-qziGC3','UTC'),('ca7adcf3-bf11-4675-9401-26f5d4bbf919','de824bdb-7a37-4f09-814f-bbdb36efaca2','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZzYW52aWNlbnRlQGJhbGVhcmVzZ3JvdXAuY29tIiwiaWQiOiJkZTgyNGJkYi03YTM3LTRmMDktODE0Zi1iYmRiMzZlZmFjYTIiLCJnZW5lcmF0ZWRBdCI6MTcxNjc3NTc3MzcxOSwiaWF0IjoxNzE2Nzc1NzczLCJleHAiOjE3MTY4NjIxNzN9.F8K5pT6afc8O7ma26hzrhGnjXN0JJTlR92LuC7yZpc0',NULL,NULL,'','America/Caracas');
/*!40000 ALTER TABLE `access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modules` (
  `id` char(36) NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `to` varchar(255) DEFAULT NULL,
  `time_created` timestamp NULL DEFAULT NULL,
  `time_updated` timestamp NULL DEFAULT NULL,
  `order` int DEFAULT NULL,
  `icon` text,
  `active` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` VALUES ('599bf2ba-aab0-11ee-a26d-543aacbde303','Users','/users',NULL,NULL,2,'<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-users-round\"><path d=\"M18 21a8 8 0 0 0-16 0\"/><circle cx=\"10\" cy=\"8\" r=\"5\"/><path d=\"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3\"/></svg>',1),('699bde79-aab0-11ee-a26d-543aacbde303','Dashboard','/dashboard',NULL,NULL,1,'<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-layout-dashboard\"><rect width=\"7\" height=\"9\" x=\"3\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"5\" x=\"14\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"9\" x=\"14\" y=\"12\" rx=\"1\"/><rect width=\"7\" height=\"5\" x=\"3\" y=\"16\" rx=\"1\"/></svg>',1),('699e17e1-aab0-11ee-a26d-543aacbde303','Notifications','/notifications',NULL,NULL,4,'<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-bell-plus\"><path d=\"M19.3 14.8C20.1 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 1 0 1.9.2 2.8.7\"/><path d=\"M10.3 21a1.94 1.94 0 0 0 3.4 0\"/><path d=\"M15 8h6\"/><path d=\"M18 5v6\"/></svg>',1),('999c13a0-aab0-11ee-a26d-543aacbde303','Profiles','/profiles',NULL,NULL,3,'<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-user-round-cog\"><path d=\"M2 21a8 8 0 0 1 10.434-7.62\"/><circle cx=\"10\" cy=\"8\" r=\"5\"/><circle cx=\"18\" cy=\"18\" r=\"3\"/><path d=\"m19.5 14.3-.4.9\"/><path d=\"m16.9 20.8-.4.9\"/><path d=\"m21.7 19.5-.9-.4\"/><path d=\"m15.2 16.9-.9-.4\"/><path d=\"m21.7 16.5-.9.4\"/><path d=\"m15.2 19.1-.9.4\"/><path d=\"m19.5 21.7-.4-.9\"/><path d=\"m16.9 15.2-.4-.9\"/></svg>',1),('999c13a0-aab0-11ee-a26d-543aeeee303','Modules','/modules',NULL,NULL,5,'<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-package\"><path d=\"m7.5 4.27 9 5.15\"/><path d=\"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z\"/><path d=\"m3.3 7 8.7 5 8.7-5\"/><path d=\"M12 22V12\"/></svg>',1);
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules_actions`
--

DROP TABLE IF EXISTS `modules_actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modules_actions` (
  `id` char(36) NOT NULL,
  `module_id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `time_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `time_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_modules_actions_moduleid` (`module_id`),
  CONSTRAINT `fk_module_id` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_modules_actions_moduleid` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules_actions`
--

LOCK TABLES `modules_actions` WRITE;
/*!40000 ALTER TABLE `modules_actions` DISABLE KEYS */;
INSERT INTO `modules_actions` VALUES ('4745c7b4-fed7-11ee-bd59-54929796d903','599bf2ba-aab0-11ee-a26d-543aacbde303','users.get','Get one user information','2024-04-20 05:35:47','2024-05-25 01:46:45'),('599c13a0-aab0-11ee-a26d-543aeeee303','999c13a0-aab0-11ee-a26d-543aeeee303','modules.update','Allow the user to create actions over a module','2024-05-26 04:26:06','2024-05-26 04:26:06'),('699bde79-aab0-11ee-a26d-543aacbde593','699bde79-aab0-11ee-a26d-543aacbde303','dashboard.get','Can see the dashboard','2024-04-25 13:35:47','2024-04-25 13:35:47'),('999c13a0-aab0-11ee-a26d-543ae32e303','999c13a0-aab0-11ee-a26d-543aeeee303','modules.list','Allow to enter the modules list','2024-05-05 02:34:41','2024-05-05 02:34:41'),('d745c7b4-fed7-11ee-bd59-54929796d903','599bf2ba-aab0-11ee-a26d-543aacbde303','users.list','Get a list of users','2024-04-20 05:35:47','2024-04-20 06:16:35'),('d745da43-fed7-11ee-bd59-54929796d903','599bf2ba-aab0-11ee-a26d-543aacbde303','users.create','Create new user','2024-04-20 05:35:47','2024-05-25 01:46:45'),('d745ff23-fed7-11ee-bd59-54929796d903','599bf2ba-aab0-11ee-a26d-543aacbde303','users.update','Edit existing user','2024-04-20 05:35:47','2024-05-25 01:46:45'),('ec3f811a-0933-47d9-9494-f84db037ae8e','999c13a0-aab0-11ee-a26d-543aeeee303','modules.create','Allow the user to create actions over a module','2024-05-26 04:53:10','2024-05-26 04:53:10'),('f97d895e-fed2-11ee-bd59-54929796d903','999c13a0-aab0-11ee-a26d-543aacbde303','profiles.get','Read one profile data','2024-04-20 05:36:45','2024-05-25 01:46:45'),('f97d895e-fed7-11ee-bd59-54929796d903','999c13a0-aab0-11ee-a26d-543aacbde303','profiles.list','Read profile data','2024-04-20 05:36:45','2024-04-20 06:16:35'),('f97d92cc-fed7-11ee-bd59-54929796d903','999c13a0-aab0-11ee-a26d-543aacbde303','profiles.create','Create new profile','2024-04-20 05:36:45','2024-05-25 01:46:45'),('f97d9490-fed7-11ee-bd59-54929796d903','999c13a0-aab0-11ee-a26d-543aacbde303','profiles.update','Edit existing profile','2024-04-20 05:36:45','2024-05-25 01:46:45'),('fc3a7582-did7-11ee-bd59-54929796d903','999c13a0-aab0-11ee-a26d-543aacbde303','profiles.get-template','Generate a excel or a csv file with the profiles','2024-04-21 15:16:26','2024-04-21 15:16:26'),('fc3a7582-did7-11ee-bd59-54929796d956','999c13a0-aab0-11ee-a26d-543aacbde303','profiles.generate-report','Generate a excel or a csv file with the profiles','2024-04-21 15:16:26','2024-04-21 15:16:26'),('fc3a7582-fed7-11ee-bd59-54929796d903','699e17e1-aab0-11ee-a26d-543aacbde303','profiles.read','Read notifications','2024-04-20 05:36:49','2024-05-25 01:46:45'),('fc3a7c83-fed7-11ee-bd59-54929796d903','699e17e1-aab0-11ee-a26d-543aacbde303','notifications.create','Create new notification','2024-04-20 05:36:49','2024-05-25 01:46:45'),('fc3a7de4-fed7-11ee-bd59-54929796d903','699e17e1-aab0-11ee-a26d-543aacbde303','notifications.update','Edit existing notification','2024-04-20 05:36:49','2024-05-25 01:46:45'),('fc6a7582-fed7-11ee-bd59-54929796d903','999c13a0-aab0-11ee-a26d-543aacbde303','profiles.import','Import profiles with excel or csv','2024-04-21 15:16:26','2024-04-21 15:16:26'),('fdd299a6-fed7-11ee-bd59-54929796d955','599bf2ba-aab0-11ee-a26d-543aacbde303','users.get-template','Get the template used to import users','2024-04-21 15:08:13','2024-04-21 15:08:13'),('fdf499a6-fed7-11ee-bd59-54929796d903','699e17e1-aab0-11ee-a26d-543aacbde303','notifications.get','Read one dashboard data','2024-04-20 05:36:52','2024-05-25 01:46:45'),('fdf699a6-f2d7-11ee-bd59-54929796d955','599bf2ba-aab0-11ee-a26d-543aacbde303','users.generate-report','Generate a excel or a csv file with the users ','2024-04-21 15:06:53','2024-04-21 15:06:53'),('fdf699a6-fed7-11ee-bd59-54929796d903','699e17e1-aab0-11ee-a26d-543aacbde303','notifications.list','Read dashboard data','2024-04-20 05:36:52','2024-04-24 13:03:03'),('fdf699a6-fed7-11ee-bd59-54929796d955','599bf2ba-aab0-11ee-a26d-543aacbde303','users.import','Import users with excel anor csv files','2024-04-21 15:05:58','2024-04-21 15:05:58'),('fdf699a6-fed7-13ee-bd35-54929796d903','699e17e1-aab0-11ee-a26d-543aacbde303','notifications.launch','Launch instanly a notification to all the accounts associated','2024-04-21 15:39:26','2024-05-25 01:46:45');
/*!40000 ALTER TABLE `modules_actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` char(36) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `icon` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `frecuency` text,
  `time_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `time_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES ('01446e79-a628-4a78-8b18-b2dd69436283','Nueva característica añadida','Nos complace anunciar que hemos añadido una nueva característica a nuestro sistema. Por favor, consulta la documentación para más detalles.','https://i.pinimg.com/564x/ea/e7/0f/eae70f35c316a431dea4e239286c27c2.jpg',NULL,'','2024-01-05 01:41:18','2024-01-05 01:41:18','2024-04-18'),('2dacce1d-e953-4920-a112-5d652fcf18b9','Actualización del sistema','Querido usuario, hemos realizado una actualización importante en el sistema. Por favor, reinicia tu sesión para ver los cambios.','https://i.pinimg.com/564x/ea/e7/0f/eae70f35c316a431dea4e239286c27c2.jpg',NULL,'','2024-01-05 01:40:23','2024-01-05 01:40:23','2024-06-01'),('ddc248d9-42c0-4000-a23a-148e0d6de0df','Cambio en la política de privacidad','Hemos actualizado nuestra política de privacidad para cumplir con las nuevas regulaciones. Por favor, revísala y acepta los nuevos términos y condiciones.',NULL,NULL,'{\"25-05-2024\":[\"22:35\"],\"26-05-2024\":[\"09:00\"],\"27-05-2024\":[\"09:00\"],\"28-05-2024\":[\"09:00\"],\"29-05-2024\":[\"09:00\"],\"30-05-2024\":[\"09:00\"]}','2024-03-10 11:56:50','2024-03-10 11:56:50','2024-06-30');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_module_permissions`
--

DROP TABLE IF EXISTS `profile_module_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile_module_permissions` (
  `profile_id` char(36) NOT NULL,
  `module_id` char(36) NOT NULL,
  `action_id` char(36) NOT NULL,
  PRIMARY KEY (`profile_id`,`module_id`,`action_id`),
  KEY `module_id` (`module_id`),
  KEY `fk_action_id` (`action_id`),
  CONSTRAINT `fk_action_id` FOREIGN KEY (`action_id`) REFERENCES `modules_actions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `profile_module_permissions_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`),
  CONSTRAINT `profile_module_permissions_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_module_permissions`
--

LOCK TABLES `profile_module_permissions` WRITE;
/*!40000 ALTER TABLE `profile_module_permissions` DISABLE KEYS */;
INSERT INTO `profile_module_permissions` VALUES ('0502b4cd-aabb-11ee-a26d-543aacbde303','599bf2ba-aab0-11ee-a26d-543aacbde303','4745c7b4-fed7-11ee-bd59-54929796d903'),('0502b4cd-aabb-11ee-a26d-543aacbde303','599bf2ba-aab0-11ee-a26d-543aacbde303','d745c7b4-fed7-11ee-bd59-54929796d903'),('0502b4cd-aabb-11ee-a26d-543aacbde303','599bf2ba-aab0-11ee-a26d-543aacbde303','d745da43-fed7-11ee-bd59-54929796d903'),('0502b4cd-aabb-11ee-a26d-543aacbde303','599bf2ba-aab0-11ee-a26d-543aacbde303','d745ff23-fed7-11ee-bd59-54929796d903'),('0502b4cd-aabb-11ee-a26d-543aacbde303','599bf2ba-aab0-11ee-a26d-543aacbde303','fdd299a6-fed7-11ee-bd59-54929796d955'),('0502b4cd-aabb-11ee-a26d-543aacbde303','599bf2ba-aab0-11ee-a26d-543aacbde303','fdf699a6-f2d7-11ee-bd59-54929796d955'),('0502b4cd-aabb-11ee-a26d-543aacbde303','599bf2ba-aab0-11ee-a26d-543aacbde303','fdf699a6-fed7-11ee-bd59-54929796d955'),('0502bf3a-aabb-11ee-a26d-543aacbde303','599bf2ba-aab0-11ee-a26d-543aacbde303','4745c7b4-fed7-11ee-bd59-54929796d903'),('0502bf3a-aabb-11ee-a26d-543aacbde303','599bf2ba-aab0-11ee-a26d-543aacbde303','d745c7b4-fed7-11ee-bd59-54929796d903'),('0502bf3a-aabb-11ee-a26d-543aacbde303','599bf2ba-aab0-11ee-a26d-543aacbde303','d745da43-fed7-11ee-bd59-54929796d903'),('0502bf3a-aabb-11ee-a26d-543aacbde303','599bf2ba-aab0-11ee-a26d-543aacbde303','d745ff23-fed7-11ee-bd59-54929796d903'),('0502bf3a-aabb-11ee-a26d-543aacbde303','599bf2ba-aab0-11ee-a26d-543aacbde303','fdd299a6-fed7-11ee-bd59-54929796d955'),('0502bf3a-aabb-11ee-a26d-543aacbde303','599bf2ba-aab0-11ee-a26d-543aacbde303','fdf699a6-f2d7-11ee-bd59-54929796d955'),('0502bf3a-aabb-11ee-a26d-543aacbde303','599bf2ba-aab0-11ee-a26d-543aacbde303','fdf699a6-fed7-11ee-bd59-54929796d955'),('0502b4cd-aabb-11ee-a26d-543aacbde303','699bde79-aab0-11ee-a26d-543aacbde303','699bde79-aab0-11ee-a26d-543aacbde593'),('0502bf3a-aabb-11ee-a26d-543aacbde303','699bde79-aab0-11ee-a26d-543aacbde303','699bde79-aab0-11ee-a26d-543aacbde593'),('0502c19a-aabb-11ee-a26d-543aacbde303','699bde79-aab0-11ee-a26d-543aacbde303','699bde79-aab0-11ee-a26d-543aacbde593'),('0502b4cd-aabb-11ee-a26d-543aacbde303','699e17e1-aab0-11ee-a26d-543aacbde303','fc3a7582-fed7-11ee-bd59-54929796d903'),('0502b4cd-aabb-11ee-a26d-543aacbde303','699e17e1-aab0-11ee-a26d-543aacbde303','fc3a7c83-fed7-11ee-bd59-54929796d903'),('0502b4cd-aabb-11ee-a26d-543aacbde303','699e17e1-aab0-11ee-a26d-543aacbde303','fc3a7de4-fed7-11ee-bd59-54929796d903'),('0502b4cd-aabb-11ee-a26d-543aacbde303','699e17e1-aab0-11ee-a26d-543aacbde303','fdf499a6-fed7-11ee-bd59-54929796d903'),('0502b4cd-aabb-11ee-a26d-543aacbde303','699e17e1-aab0-11ee-a26d-543aacbde303','fdf699a6-fed7-11ee-bd59-54929796d903'),('0502b4cd-aabb-11ee-a26d-543aacbde303','699e17e1-aab0-11ee-a26d-543aacbde303','fdf699a6-fed7-13ee-bd35-54929796d903'),('0502bf3a-aabb-11ee-a26d-543aacbde303','699e17e1-aab0-11ee-a26d-543aacbde303','fc3a7582-fed7-11ee-bd59-54929796d903'),('0502bf3a-aabb-11ee-a26d-543aacbde303','699e17e1-aab0-11ee-a26d-543aacbde303','fc3a7c83-fed7-11ee-bd59-54929796d903'),('0502bf3a-aabb-11ee-a26d-543aacbde303','699e17e1-aab0-11ee-a26d-543aacbde303','fc3a7de4-fed7-11ee-bd59-54929796d903'),('0502bf3a-aabb-11ee-a26d-543aacbde303','699e17e1-aab0-11ee-a26d-543aacbde303','fdf499a6-fed7-11ee-bd59-54929796d903'),('0502bf3a-aabb-11ee-a26d-543aacbde303','699e17e1-aab0-11ee-a26d-543aacbde303','fdf699a6-fed7-11ee-bd59-54929796d903'),('0502bf3a-aabb-11ee-a26d-543aacbde303','699e17e1-aab0-11ee-a26d-543aacbde303','fdf699a6-fed7-13ee-bd35-54929796d903'),('0502c19a-aabb-11ee-a26d-543aacbde303','699e17e1-aab0-11ee-a26d-543aacbde303','fc3a7582-fed7-11ee-bd59-54929796d903'),('0502c19a-aabb-11ee-a26d-543aacbde303','699e17e1-aab0-11ee-a26d-543aacbde303','fc3a7de4-fed7-11ee-bd59-54929796d903'),('0502c19a-aabb-11ee-a26d-543aacbde303','699e17e1-aab0-11ee-a26d-543aacbde303','fdf499a6-fed7-11ee-bd59-54929796d903'),('0502c19a-aabb-11ee-a26d-543aacbde303','699e17e1-aab0-11ee-a26d-543aacbde303','fdf699a6-fed7-11ee-bd59-54929796d903'),('0502b4cd-aabb-11ee-a26d-543aacbde303','999c13a0-aab0-11ee-a26d-543aacbde303','f97d895e-fed2-11ee-bd59-54929796d903'),('0502b4cd-aabb-11ee-a26d-543aacbde303','999c13a0-aab0-11ee-a26d-543aacbde303','f97d895e-fed7-11ee-bd59-54929796d903'),('0502b4cd-aabb-11ee-a26d-543aacbde303','999c13a0-aab0-11ee-a26d-543aacbde303','f97d92cc-fed7-11ee-bd59-54929796d903'),('0502b4cd-aabb-11ee-a26d-543aacbde303','999c13a0-aab0-11ee-a26d-543aacbde303','f97d9490-fed7-11ee-bd59-54929796d903'),('0502b4cd-aabb-11ee-a26d-543aacbde303','999c13a0-aab0-11ee-a26d-543aacbde303','fc3a7582-did7-11ee-bd59-54929796d903'),('0502b4cd-aabb-11ee-a26d-543aacbde303','999c13a0-aab0-11ee-a26d-543aacbde303','fc3a7582-did7-11ee-bd59-54929796d956'),('0502b4cd-aabb-11ee-a26d-543aacbde303','999c13a0-aab0-11ee-a26d-543aacbde303','fc6a7582-fed7-11ee-bd59-54929796d903'),('0502bf3a-aabb-11ee-a26d-543aacbde303','999c13a0-aab0-11ee-a26d-543aacbde303','f97d895e-fed2-11ee-bd59-54929796d903'),('0502bf3a-aabb-11ee-a26d-543aacbde303','999c13a0-aab0-11ee-a26d-543aacbde303','f97d895e-fed7-11ee-bd59-54929796d903'),('0502bf3a-aabb-11ee-a26d-543aacbde303','999c13a0-aab0-11ee-a26d-543aacbde303','f97d92cc-fed7-11ee-bd59-54929796d903'),('0502bf3a-aabb-11ee-a26d-543aacbde303','999c13a0-aab0-11ee-a26d-543aacbde303','f97d9490-fed7-11ee-bd59-54929796d903'),('0502bf3a-aabb-11ee-a26d-543aacbde303','999c13a0-aab0-11ee-a26d-543aacbde303','fc3a7582-did7-11ee-bd59-54929796d903'),('0502bf3a-aabb-11ee-a26d-543aacbde303','999c13a0-aab0-11ee-a26d-543aacbde303','fc3a7582-did7-11ee-bd59-54929796d956'),('0502bf3a-aabb-11ee-a26d-543aacbde303','999c13a0-aab0-11ee-a26d-543aacbde303','fc6a7582-fed7-11ee-bd59-54929796d903'),('0502c19a-aabb-11ee-a26d-543aacbde303','999c13a0-aab0-11ee-a26d-543aacbde303','f97d895e-fed2-11ee-bd59-54929796d903'),('0502c19a-aabb-11ee-a26d-543aacbde303','999c13a0-aab0-11ee-a26d-543aacbde303','f97d895e-fed7-11ee-bd59-54929796d903'),('0502c19a-aabb-11ee-a26d-543aacbde303','999c13a0-aab0-11ee-a26d-543aacbde303','fc3a7582-did7-11ee-bd59-54929796d903'),('0502bf3a-aabb-11ee-a26d-543aacbde303','999c13a0-aab0-11ee-a26d-543aeeee303','599c13a0-aab0-11ee-a26d-543aeeee303'),('0502bf3a-aabb-11ee-a26d-543aacbde303','999c13a0-aab0-11ee-a26d-543aeeee303','999c13a0-aab0-11ee-a26d-543ae32e303');
/*!40000 ALTER TABLE `profile_module_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `id` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `time_created` timestamp NULL DEFAULT NULL,
  `time_updated` timestamp NULL DEFAULT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES ('0502b4cd-aabb-11ee-a26d-543aacbde303','Admin','Tiene acceso total y control sobre todas las funcionalidades del sistema.','2023-12-31 00:28:30','2023-12-31 00:28:30',1),('0502bf3a-aabb-11ee-a26d-543aacbde303','Developer','Acceso a herramientas y funcionalidades de desarrollo, con capacidades para modificar y crear módulos. Mismos permisos que admin pero con funcionalidades de mantenimiento y gestion','2023-12-31 00:28:30','2023-12-31 00:28:30',1),('0502c19a-aabb-11ee-a26d-543aacbde303','User','Acceso estándar a las funcionalidades del sistema con permisos limitados.','2023-12-31 00:28:30','2023-12-31 00:28:30',1);
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles_notifications`
--

DROP TABLE IF EXISTS `profiles_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles_notifications` (
  `profile_id` char(36) NOT NULL,
  `notification_id` char(36) NOT NULL,
  `id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_profiles_notifications_profile` (`profile_id`),
  KEY `fk_profiles_notifications_notification` (`notification_id`),
  CONSTRAINT `fk_profiles_notifications_notification` FOREIGN KEY (`notification_id`) REFERENCES `notifications` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_profiles_notifications_profile` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `profiles_notifications_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `profiles_notifications_ibfk_2` FOREIGN KEY (`notification_id`) REFERENCES `notifications` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles_notifications`
--

LOCK TABLES `profiles_notifications` WRITE;
/*!40000 ALTER TABLE `profiles_notifications` DISABLE KEYS */;
INSERT INTO `profiles_notifications` VALUES ('0502b4cd-aabb-11ee-a26d-543aacbde303','ddc248d9-42c0-4000-a23a-148e0d6de0df','a3772b81-c1dc-477c-adfd-e90360bc9f8c');
/*!40000 ALTER TABLE `profiles_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `totals`
--

DROP TABLE IF EXISTS `totals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `totals` (
  `users` int DEFAULT '0',
  `notifications` int DEFAULT '0',
  `profiles` int DEFAULT '0',
  `id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `totals`
--

LOCK TABLES `totals` WRITE;
/*!40000 ALTER TABLE `totals` DISABLE KEYS */;
INSERT INTO `totals` VALUES (24,2,3,'19ca14e7-ace5-4d3b-8a6f-36ec768e9c9r');
/*!40000 ALTER TABLE `totals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `last_names` varchar(255) DEFAULT NULL,
  `names` varchar(255) DEFAULT NULL,
  `time_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `time_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `password` varchar(32) DEFAULT NULL,
  `profile_img` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('6426a807-aa61-4d38-b388-71e95e3d88f6',1,'jrodriguez@balearesgroup.com','Rodriguez','Julio','2024-05-27 02:03:19','2024-05-27 02:03:41','ed0b50b5f5f208b10c5a299b1788c244','https://avatars.githubusercontent.com/u/7352361?v=4'),('869252b8-c1f6-40f9-ba8d-c22317d9062b',1,'bcaballero@balearesgroup.com','Caballero','Bryant','2024-03-27 02:03:19','2024-05-27 02:18:21','ed0b50b5f5f208b10c5a299b1788c244','https://avatars.githubusercontent.com/u/90587911?v=4'),('9920c776-1c31-4d04-a616-b09cf14a86e9',1,'jguidi@balearesgroup.com','Guidi','Juan','2024-04-27 02:15:55','2024-05-27 02:18:21','ed0b50b5f5f208b10c5a299b1788c244','https://media-mia3-1.cdn.whatsapp.net/v/t61.24694-24/309646926_719550366189499_8834063398460153986_n.jpg?ccb=11-4&oh=01_Q5AaIHOarBSvtEhYkjHGaC8F3mE52XGpLDmsdAK8XxNgXNDx&oe=66608D7C&_nc_sid=e6ed6c&_nc_cat=100'),('c748695b-3009-4014-8335-c1ada3fde990',1,'mrodriguez@balearesgroup.com','Rodriguez','Moises','2024-02-27 02:00:04','2024-05-27 02:18:53','ed0b50b5f5f208b10c5a299b1788c244','https://avatars.githubusercontent.com/u/27926784?v=4'),('de824bdb-7a37-4f09-814f-bbdb36efaca2',1,'fsanvicente@balearesgroup.com','Sanvicente','Francisco','2024-03-27 02:06:54','2024-05-27 02:18:21','ed0b50b5f5f208b10c5a299b1788c244','https://avatars.githubusercontent.com/u/64644109?v=4');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_notifications`
--

DROP TABLE IF EXISTS `users_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_notifications` (
  `id` char(36) NOT NULL,
  `notification_id` char(36) DEFAULT NULL,
  `user_id` char(36) DEFAULT NULL,
  `time_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `time_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_users_notifications_user` (`user_id`),
  KEY `fk_users_notifications_notification` (`notification_id`),
  CONSTRAINT `fk_users_notifications_notification` FOREIGN KEY (`notification_id`) REFERENCES `notifications` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_users_notifications_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_notifications`
--

LOCK TABLES `users_notifications` WRITE;
/*!40000 ALTER TABLE `users_notifications` DISABLE KEYS */;
INSERT INTO `users_notifications` VALUES ('92186858-95fb-4a93-9ee3-5c10f68029c1','01446e79-a628-4a78-8b18-b2dd69436283','869252b8-c1f6-40f9-ba8d-c22317d9062b','2024-05-27 02:13:15','2024-05-27 02:13:15'),('cefb43a6-af58-44a7-bab5-6413bd1e6e8d','ddc248d9-42c0-4000-a23a-148e0d6de0df','869252b8-c1f6-40f9-ba8d-c22317d9062b','2024-05-27 02:13:54','2024-05-27 02:13:54');
/*!40000 ALTER TABLE `users_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_profiles`
--

DROP TABLE IF EXISTS `users_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_profiles` (
  `user_id` char(36) NOT NULL,
  `profile_id` char(36) NOT NULL,
  PRIMARY KEY (`user_id`,`profile_id`),
  KEY `profile_id` (`profile_id`),
  CONSTRAINT `users_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `users_profiles_ibfk_2` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_profiles`
--

LOCK TABLES `users_profiles` WRITE;
/*!40000 ALTER TABLE `users_profiles` DISABLE KEYS */;
INSERT INTO `users_profiles` VALUES ('9920c776-1c31-4d04-a616-b09cf14a86e9','0502b4cd-aabb-11ee-a26d-543aacbde303'),('6426a807-aa61-4d38-b388-71e95e3d88f6','0502bf3a-aabb-11ee-a26d-543aacbde303'),('869252b8-c1f6-40f9-ba8d-c22317d9062b','0502bf3a-aabb-11ee-a26d-543aacbde303'),('c748695b-3009-4014-8335-c1ada3fde990','0502bf3a-aabb-11ee-a26d-543aacbde303'),('de824bdb-7a37-4f09-814f-bbdb36efaca2','0502bf3a-aabb-11ee-a26d-543aacbde303');
/*!40000 ALTER TABLE `users_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_widgets`
--

DROP TABLE IF EXISTS `users_widgets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_widgets` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `widget_id` char(36) NOT NULL,
  `column_position` int NOT NULL,
  `row_position` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `widget_id` (`widget_id`),
  CONSTRAINT `users_widgets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_widgets_ibfk_2` FOREIGN KEY (`widget_id`) REFERENCES `widgets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_widgets`
--

LOCK TABLES `users_widgets` WRITE;
/*!40000 ALTER TABLE `users_widgets` DISABLE KEYS */;
INSERT INTO `users_widgets` VALUES ('22472053-935e-430b-ad4e-4bb0b7cba3e5','9920c776-1c31-4d04-a616-b09cf14a86e9','10264c81-a092-41ab-8937-c05957b2e544',0,1),('2b4fc20a-f53d-474a-8b31-164f58bcebdb','de824bdb-7a37-4f09-814f-bbdb36efaca2','e53bcab0-a571-4b4e-89e0-4356e18086dd',0,0),('32032505-a322-4e20-8c01-2bab66ab2a67','6426a807-aa61-4d38-b388-71e95e3d88f6','4018f013-8202-4531-a07b-a4c7c944f9ab',9,2),('3ec64313-9cf4-4764-a95d-78d4911e6768','de824bdb-7a37-4f09-814f-bbdb36efaca2','069bb9a5-16c2-4c1b-8c7f-7349738cc492',0,2),('3f9bca06-8bd0-4b8e-b2aa-c36ee3ba410b','de824bdb-7a37-4f09-814f-bbdb36efaca2','10264c81-a092-41ab-8937-c05957b2e544',0,1),('3fc69465-22b3-470e-8bc7-70fb15ffb685','9920c776-1c31-4d04-a616-b09cf14a86e9','e53bcab0-a571-4b4e-89e0-4356e18086dd',0,0),('40fed64e-1e0e-488c-b668-5b43b8be50d5','9920c776-1c31-4d04-a616-b09cf14a86e9','4018f013-8202-4531-a07b-a4c7c944f9ab',0,2),('4b9ea93c-e477-44b1-9d28-a787c2b87aab','c748695b-3009-4014-8335-c1ada3fde990','10264c81-a092-41ab-8937-c05957b2e544',0,1),('59123ed6-8baa-4a30-93f4-3f39307336f0','c748695b-3009-4014-8335-c1ada3fde990','069bb9a5-16c2-4c1b-8c7f-7349738cc492',6,2),('731ca9b2-9855-4a74-b009-f6d97251141f','c748695b-3009-4014-8335-c1ada3fde990','4018f013-8202-4531-a07b-a4c7c944f9ab',0,2),('87dfc03f-b333-4075-b4c7-a7f95175a945','6426a807-aa61-4d38-b388-71e95e3d88f6','10264c81-a092-41ab-8937-c05957b2e544',0,1),('a0c4c544-b2aa-4711-b6e6-de56e6aefbc3','6426a807-aa61-4d38-b388-71e95e3d88f6','069bb9a5-16c2-4c1b-8c7f-7349738cc492',0,2),('a47eaa2c-ed66-4ce8-b015-e10a376fb11a','de824bdb-7a37-4f09-814f-bbdb36efaca2','4018f013-8202-4531-a07b-a4c7c944f9ab',9,2),('aeeb4adf-fa42-41d0-b5c6-74fc77f80921','869252b8-c1f6-40f9-ba8d-c22317d9062b','069bb9a5-16c2-4c1b-8c7f-7349738cc492',0,2),('be003550-c189-4be3-8c62-81f099a5a7d5','869252b8-c1f6-40f9-ba8d-c22317d9062b','4018f013-8202-4531-a07b-a4c7c944f9ab',9,2),('c0dba826-99c0-4831-80a7-b7d5fa6d2696','c748695b-3009-4014-8335-c1ada3fde990','e53bcab0-a571-4b4e-89e0-4356e18086dd',0,0),('c88720ff-aa2b-451c-aad5-4053efe2f7b7','869252b8-c1f6-40f9-ba8d-c22317d9062b','10264c81-a092-41ab-8937-c05957b2e544',0,1),('d020fdb8-60bc-47a2-a869-3c3fef191dce','6426a807-aa61-4d38-b388-71e95e3d88f6','e53bcab0-a571-4b4e-89e0-4356e18086dd',0,0),('e769f679-146a-4887-aa30-aa8c39205e46','9920c776-1c31-4d04-a616-b09cf14a86e9','069bb9a5-16c2-4c1b-8c7f-7349738cc492',6,2),('ef824734-aa43-46b2-b06a-1d60c6a461ec','869252b8-c1f6-40f9-ba8d-c22317d9062b','e53bcab0-a571-4b4e-89e0-4356e18086dd',0,0);
/*!40000 ALTER TABLE `users_widgets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `widgets`
--

DROP TABLE IF EXISTS `widgets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `widgets` (
  `id` char(36) NOT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `identifier` varchar(255) DEFAULT NULL,
  `metadata` text,
  `order` int DEFAULT NULL,
  `time_updated` timestamp NULL DEFAULT NULL,
  `time_created` timestamp NULL DEFAULT NULL,
  `width` int NOT NULL DEFAULT '1',
  `height` int NOT NULL DEFAULT '1',
  `name` varchar(45) DEFAULT 'Widget-n',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `widgets`
--

LOCK TABLES `widgets` WRITE;
/*!40000 ALTER TABLE `widgets` DISABLE KEYS */;
INSERT INTO `widgets` VALUES ('069bb9a5-16c2-4c1b-8c7f-7349738cc492',1,'registered-users','',2,'2023-11-26 08:19:08','2023-11-26 08:19:08',6,3,'Registerd users dashboard'),('10264c81-a092-41ab-8937-c05957b2e544',1,'totals','',1,'2023-12-05 02:45:10','2023-12-05 02:45:10',12,1,'Totals counter'),('4018f013-8202-4531-a07b-a4c7c944f9ab',1,'online-users','',3,'2023-11-28 22:40:13','2023-11-28 22:40:13',3,3,'Online users comparator'),('e53bcab0-a571-4b4e-89e0-4356e18086dd',1,'welcome','',0,'2023-11-26 08:21:44','2023-11-26 08:21:44',12,1,'Welcome');
/*!40000 ALTER TABLE `widgets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `widgets_profiles`
--

DROP TABLE IF EXISTS `widgets_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `widgets_profiles` (
  `id` char(36) NOT NULL,
  `widget_id` char(36) NOT NULL,
  `profile_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_widget_profile` (`widget_id`,`profile_id`),
  KEY `fk_profile_id` (`profile_id`),
  CONSTRAINT `fk_profile_id` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_widget_id` FOREIGN KEY (`widget_id`) REFERENCES `widgets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `widgets_profiles`
--

LOCK TABLES `widgets_profiles` WRITE;
/*!40000 ALTER TABLE `widgets_profiles` DISABLE KEYS */;
INSERT INTO `widgets_profiles` VALUES ('e53bcab0-a571-4b4e-89e0-4356e18086dd','e53bcab0-a571-4b4e-89e0-4356e18086dd','0502b4cd-aabb-11ee-a26d-543aacbde303');
/*!40000 ALTER TABLE `widgets_profiles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-26 22:19:43
