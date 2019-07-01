-- --------------------------------------------------------
-- Host:                         181.129.103.142
-- Versión del servidor:         5.7.26-0ubuntu0.18.04.1 - (Ubuntu)
-- SO del servidor:              Linux
-- HeidiSQL Versión:             10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para admin_mv1
CREATE DATABASE IF NOT EXISTS `admin_mv1` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `admin_mv1`;

-- Volcando estructura para tabla admin_mv1.accounts
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) DEFAULT NULL,
  `identification_type` int(11) DEFAULT NULL,
  `identification_number` varchar(50) DEFAULT NULL,
  `names` varchar(250) NOT NULL,
  `address_principal` int(11) DEFAULT NULL,
  `address_invoices` int(11) DEFAULT NULL,
  `audit_enabled` int(1) DEFAULT '0',
  `phone` varchar(50) DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_accounts_identification_number` (`identification_number`),
  KEY `FK_accounts_identification_type` (`identification_type`),
  KEY `FK_accounts_id` (`id`),
  KEY `FK_accounts_name` (`names`),
  KEY `FK_accounts_address_principal` (`address_principal`),
  KEY `FK_accounts_audit_enabled` (`audit_enabled`),
  KEY `FK_accounts_type` (`type`),
  KEY `FK_accounts_addresses_2` (`address_invoices`),
  CONSTRAINT `FK_accounts_addresses` FOREIGN KEY (`address_principal`) REFERENCES `addresses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_accounts_addresses_2` FOREIGN KEY (`address_invoices`) REFERENCES `addresses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_accounts_identification_type` FOREIGN KEY (`identification_type`) REFERENCES `types_identifications` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_accounts_type` FOREIGN KEY (`type`) REFERENCES `types_accounts` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.accounts: ~0 rows (aproximadamente)
DELETE FROM `accounts`;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` (`id`, `type`, `identification_type`, `identification_number`, `names`, `address_principal`, `address_invoices`, `audit_enabled`, `phone`, `mobile`, `created`, `updated`) VALUES
	(4, 1, 1, '1035429360', 'ANDRES FELIPE GOMEZ MAYA', 15, NULL, 0, '(04) 274-5002', '(300) 547-3082', '2019-06-28 10:26:52', '2019-06-28 10:26:52');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.accounts_addresses
CREATE TABLE IF NOT EXISTS `accounts_addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` int(11) DEFAULT NULL,
  `address` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_accounts_addresses_accounts` (`account`),
  KEY `FK_accounts_addresses_addresses` (`address`),
  CONSTRAINT `FK_accounts_addresses_accounts` FOREIGN KEY (`account`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_accounts_addresses_addresses` FOREIGN KEY (`address`) REFERENCES `addresses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.accounts_addresses: ~2 rows (aproximadamente)
DELETE FROM `accounts_addresses`;
/*!40000 ALTER TABLE `accounts_addresses` DISABLE KEYS */;
INSERT INTO `accounts_addresses` (`id`, `account`, `address`) VALUES
	(11, 4, 15),
	(12, 4, 18);
/*!40000 ALTER TABLE `accounts_addresses` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.accounts_calendar
CREATE TABLE IF NOT EXISTS `accounts_calendar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` int(1) NOT NULL,
  `calendar` int(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_calendar_clients_clients` (`account`),
  KEY `FK_calendar_clients_calendar` (`calendar`),
  CONSTRAINT `FK_calendar_clients_calendar` FOREIGN KEY (`calendar`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_calendar_clients_clients` FOREIGN KEY (`account`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.accounts_calendar: ~0 rows (aproximadamente)
DELETE FROM `accounts_calendar`;
/*!40000 ALTER TABLE `accounts_calendar` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_calendar` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.accounts_contacts
CREATE TABLE IF NOT EXISTS `accounts_contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` int(11) NOT NULL,
  `contact` int(11) NOT NULL,
  `type_contact` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_crew_clients_clients` (`account`),
  KEY `FK_crew_clients_contacts` (`contact`),
  KEY `FK_crew_clients_types_contacts` (`type_contact`),
  CONSTRAINT `accounts_contacts_ibfk_1` FOREIGN KEY (`account`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `accounts_contacts_ibfk_2` FOREIGN KEY (`contact`) REFERENCES `contacts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `accounts_contacts_ibfk_3` FOREIGN KEY (`type_contact`) REFERENCES `types_contacts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.accounts_contacts: ~1 rows (aproximadamente)
DELETE FROM `accounts_contacts`;
/*!40000 ALTER TABLE `accounts_contacts` DISABLE KEYS */;
INSERT INTO `accounts_contacts` (`id`, `account`, `contact`, `type_contact`) VALUES
	(13, 4, 1, 1);
/*!40000 ALTER TABLE `accounts_contacts` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.accounts_invoices
CREATE TABLE IF NOT EXISTS `accounts_invoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` int(11) NOT NULL,
  `contract` int(11) NOT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `validity` datetime NOT NULL,
  `status` int(11) NOT NULL,
  `total` float DEFAULT NULL,
  `values` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_invoices_clients_af_clients` (`account`),
  KEY `FK_invoices_clients_af_contracts_clients` (`contract`),
  KEY `FK_af_invoices_clients_status_invoices` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.accounts_invoices: ~0 rows (aproximadamente)
DELETE FROM `accounts_invoices`;
/*!40000 ALTER TABLE `accounts_invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_invoices` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.accounts_users
CREATE TABLE IF NOT EXISTS `accounts_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `account` int(11) NOT NULL,
  `permissions` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_af_users_clients_af_clients` (`account`),
  KEY `FK_af_users_clients_users` (`user`),
  KEY `FK_af_users_clients_permissions` (`permissions`),
  KEY `id` (`id`),
  CONSTRAINT `FK_accounts_users_accounts` FOREIGN KEY (`account`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_accounts_users_permissions` FOREIGN KEY (`permissions`) REFERENCES `permissions` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_accounts_users_users` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.accounts_users: ~0 rows (aproximadamente)
DELETE FROM `accounts_users`;
/*!40000 ALTER TABLE `accounts_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_users` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.account_users_pending
CREATE TABLE IF NOT EXISTS `account_users_pending` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` int(11) NOT NULL,
  `user_create` int(11) NOT NULL,
  `names` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `second_surname` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `mobile` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `hash` varchar(250) NOT NULL,
  `permissions` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_af_users_clients_pending_af_clients` (`account`),
  KEY `FK_af_users_clients_pending_users` (`user_create`),
  KEY `FK_af_users_clients_pending_permissions` (`permissions`),
  CONSTRAINT `FK_af_users_clients_pending_af_clients` FOREIGN KEY (`account`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_af_users_clients_pending_permissions` FOREIGN KEY (`permissions`) REFERENCES `permissions` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_af_users_clients_pending_users` FOREIGN KEY (`user_create`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.account_users_pending: ~0 rows (aproximadamente)
DELETE FROM `account_users_pending`;
/*!40000 ALTER TABLE `account_users_pending` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_users_pending` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.addresses
CREATE TABLE IF NOT EXISTS `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address_input` varchar(250) NOT NULL,
  `display_name` varchar(250) NOT NULL,
  `department` int(11) DEFAULT NULL,
  `city` int(11) DEFAULT NULL,
  `type_road` int(11) DEFAULT NULL,
  `number_a` int(5) DEFAULT NULL,
  `letter_a` int(11) DEFAULT NULL,
  `quadrant_a` int(11) DEFAULT NULL,
  `number_b` int(5) DEFAULT NULL,
  `letter_b` int(11) DEFAULT NULL,
  `quadrant_b` int(11) DEFAULT NULL,
  `number_c` int(5) DEFAULT NULL,
  `postal_code` varchar(6) DEFAULT NULL,
  `additional_information` varchar(150) DEFAULT NULL,
  `lon` double DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `completo` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_addresses_geo_citys` (`city`),
  KEY `FK_addresses_geo_departments` (`department`),
  KEY `FK_addresses_types_roads` (`type_road`),
  KEY `FK_addresses_types_letters_addresses` (`letter_a`),
  KEY `FK_addresses_types_quadrants` (`quadrant_a`),
  KEY `FK_addresses_types_letters_addresses_2` (`letter_b`),
  KEY `FK_addresses_types_quadrants_2` (`quadrant_b`),
  CONSTRAINT `FK_addresses_geo_citys` FOREIGN KEY (`city`) REFERENCES `geo_citys` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_addresses_geo_departments` FOREIGN KEY (`department`) REFERENCES `geo_departments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_addresses_types_letters_addresses` FOREIGN KEY (`letter_a`) REFERENCES `types_letters_addresses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_addresses_types_letters_addresses_2` FOREIGN KEY (`letter_b`) REFERENCES `types_letters_addresses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_addresses_types_quadrants` FOREIGN KEY (`quadrant_a`) REFERENCES `types_quadrants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_addresses_types_quadrants_2` FOREIGN KEY (`quadrant_b`) REFERENCES `types_quadrants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_addresses_types_roads` FOREIGN KEY (`type_road`) REFERENCES `types_roads` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.addresses: ~9 rows (aproximadamente)
DELETE FROM `addresses`;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` (`id`, `address_input`, `display_name`, `department`, `city`, `type_road`, `number_a`, `letter_a`, `quadrant_a`, `number_b`, `letter_b`, `quadrant_b`, `number_c`, `postal_code`, `additional_information`, `lon`, `lat`, `completo`) VALUES
	(7, 'CL 33AA # 80B - 34 INT 301, Medellín, ANTIOQUIA', 'Calle 33 AA # 80 B - 34 INT 301, Medellín, ANTIOQUIA', 2, 547, 15, 33, 2, NULL, 80, 7, NULL, 34, '050031', 'INT 301', -75.60206, 6.24005, '{"name": "Calle 33AA 80B-34, 050031 Medellín, Colombia", "address": {"locality": "Medellín", "postalCode": "050031", "addressLine": "Calle 33AA 80B-34", "adminDistrict": "Antioquia", "countryRegion": "Colombia", "formattedAddress": "Calle 33AA 80B-34, 050031 Medellín, Colombia"}, "bestView": {"crs": {"id": "LatLon", "bounds": [90, 180, -90, -180]}, "width": 0.002261799999999426, "bounds": [6.2389258000000005, -75.6009291, 6.2411742, -75.60319089999999], "center": {"altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "altitudeReference": -1}, "height": -0.0022484000000000393, "_northWest": {"altitude": 0, "latitude": 6.2389258000000005, "longitude": -75.60319089999999, "altitudeReference": -1}, "_southEast": {"altitude": 0, "latitude": 6.2411742, "longitude": -75.6009291, "altitudeReference": -1}}, "location": {"name": "Calle 33AA 80B-34, 050031 Medellín, Colombia", "altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "altitudeReference": -1}, "locations": [{"altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "precision": "Rooftop", "altitudeReference": -1}, {"altitude": 0, "latitude": 6.23999, "longitude": -75.60206, "precision": "Rooftop", "altitudeReference": -1}], "matchCode": "Good", "entityType": "Address", "matchConfidence": "High"}'),
	(9, 'CL 33AA # 80B - 34 INT 101, Medellín, ANTIOQUIA', 'Calle 33 AA # 80 B - 34 INT 101, Medellín, ANTIOQUIA', 2, 547, 15, 33, 2, NULL, 80, 7, NULL, 34, '050031', 'INT 101', -75.60206, 6.24005, '{"name": "Calle 33AA 80B-34, 050031 Medellín, Colombia", "address": {"locality": "Medellín", "postalCode": "050031", "addressLine": "Calle 33AA 80B-34", "adminDistrict": "Antioquia", "countryRegion": "Colombia", "formattedAddress": "Calle 33AA 80B-34, 050031 Medellín, Colombia"}, "bestView": {"crs": {"id": "LatLon", "bounds": [90, 180, -90, -180]}, "width": 0.002261799999999426, "bounds": [6.2389258000000005, -75.6009291, 6.2411742, -75.60319089999999], "center": {"altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "altitudeReference": -1}, "height": -0.0022484000000000393}, "location": {"name": "Calle 33AA 80B-34, 050031 Medellín, Colombia", "altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "altitudeReference": -1}, "locations": [{"altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "precision": "Rooftop", "altitudeReference": -1}, {"altitude": 0, "latitude": 6.23999, "longitude": -75.60206, "precision": "Rooftop", "altitudeReference": -1}], "matchCode": "Good", "entityType": "Address", "matchConfidence": "High"}'),
	(10, 'CL 33AA # 80B - 34 INT 201, Medellín, ANTIOQUIA', 'Calle 33 AA # 80 B - 34 INT 201, Medellín, ANTIOQUIA', 2, 547, 15, 33, 2, NULL, 80, 7, NULL, 34, '050031', 'INT 201', -75.60206, 6.24005, '{"name": "Calle 33AA 80B-34, 050031 Medellín, Colombia", "address": {"locality": "Medellín", "postalCode": "050031", "addressLine": "Calle 33AA 80B-34", "adminDistrict": "Antioquia", "countryRegion": "Colombia", "formattedAddress": "Calle 33AA 80B-34, 050031 Medellín, Colombia"}, "bestView": {"crs": {"id": "LatLon", "bounds": [90, 180, -90, -180]}, "width": 0.002261799999999426, "bounds": [6.2389258000000005, -75.6009291, 6.2411742, -75.60319089999999], "center": {"altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "altitudeReference": -1}, "height": -0.0022484000000000393}, "location": {"name": "Calle 33AA 80B-34, 050031 Medellín, Colombia", "altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "altitudeReference": -1}, "locations": [{"altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "precision": "Rooftop", "altitudeReference": -1}, {"altitude": 0, "latitude": 6.23999, "longitude": -75.60206, "precision": "Rooftop", "altitudeReference": -1}], "matchCode": "Good", "entityType": "Address", "matchConfidence": "High"}'),
	(11, 'CL 33AA # 80B - 34, Medellín, ANTIOQUIA', 'Calle 33 AA # 80 B - 34, Medellín, ANTIOQUIA', 2, 547, 15, 33, 2, NULL, 80, 7, NULL, 34, '050031', NULL, -75.60206, 6.24005, '{"name": "Calle 33AA 80B-34, 050031 Medellín, Colombia", "address": {"locality": "Medellín", "postalCode": "050031", "addressLine": "Calle 33AA 80B-34", "adminDistrict": "Antioquia", "countryRegion": "Colombia", "formattedAddress": "Calle 33AA 80B-34, 050031 Medellín, Colombia"}, "bestView": {"crs": {"id": "LatLon", "bounds": [90, 180, -90, -180]}, "width": 0.002261799999999426, "bounds": [6.2389258000000005, -75.6009291, 6.2411742, -75.60319089999999], "center": {"altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "altitudeReference": -1}, "height": -0.0022484000000000393}, "location": {"name": "Calle 33AA 80B-34, 050031 Medellín, Colombia", "altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "altitudeReference": -1}, "locations": [{"altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "precision": "Rooftop", "altitudeReference": -1}, {"altitude": 0, "latitude": 6.23999, "longitude": -75.60206, "precision": "Rooftop", "altitudeReference": -1}], "matchCode": "Good", "entityType": "Address", "matchConfidence": "High"}'),
	(12, 'KR 50A # 36 - 43, Itagüí, ANTIOQUIA', 'Carrera 50 A # 36 - 43, Itagüí, ANTIOQUIA', 2, 437, 16, 50, 1, NULL, 36, NULL, NULL, 43, '055413', '', -75.6202266, 6.1673344, '{"name": "Carrera 50A 36-43, 055413 Itagüí, Colombia", "address": {"locality": "Itagüí", "postalCode": "055413", "addressLine": "Carrera 50A 36-43", "adminDistrict": "Antioquia", "countryRegion": "Colombia", "formattedAddress": "Carrera 50A 36-43, 055413 Itagüí, Colombia"}, "bestView": {"crs": {"id": "LatLon", "bounds": [90, 180, -90, -180]}, "width": 0.002261399999994751, "bounds": [6.1662102, -75.61909589999999, 6.1684585, -75.6213573], "center": {"altitude": 0, "latitude": 6.16733435, "longitude": -75.6202266, "altitudeReference": -1}, "height": -0.002248299999999759}, "location": {"name": "Carrera 50A 36-43, 055413 Itagüí, Colombia", "altitude": 0, "latitude": 6.1673344, "longitude": -75.6202266, "altitudeReference": -1}, "locations": [{"altitude": 0, "latitude": 6.1673344, "longitude": -75.6202266, "precision": "Interpolation", "altitudeReference": -1}, {"altitude": 0, "latitude": 6.1672368, "longitude": -75.6201329, "precision": "Interpolation", "altitudeReference": -1}], "matchCode": "Good", "entityType": "Address", "matchConfidence": "High"}'),
	(13, 'CL 33AA Norte # 80B - 34 INT 301, MEDELLÍN, ANTIOQUIA', 'Calle 33 AA Norte # 80 B - 34 INT 301, MEDELLÍN, ANTIOQUIA', 2, 547, 15, 33, 2, 2, 80, 7, NULL, 34, '050031', 'INT 301', -75.60206, 6.24005, '{"name": "Calle 33AA 80B-34, 050031 Medellín, Colombia", "address": {"locality": "Medellín", "postalCode": "050031", "addressLine": "Calle 33AA 80B-34", "adminDistrict": "Antioquia", "countryRegion": "Colombia", "formattedAddress": "Calle 33AA 80B-34, 050031 Medellín, Colombia"}, "bestView": {"crs": {"id": "LatLon", "bounds": [90, 180, -90, -180]}, "width": 0.002261799999999426, "bounds": [6.2389258000000005, -75.6009291, 6.2411742, -75.60319089999999], "center": {"altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "altitudeReference": -1}, "height": -0.0022484000000000393}, "location": {"name": "Calle 33AA 80B-34, 050031 Medellín, Colombia", "altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "altitudeReference": -1}, "locations": [{"altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "precision": "Rooftop", "altitudeReference": -1}, {"altitude": 0, "latitude": 6.23999, "longitude": -75.60206, "precision": "Rooftop", "altitudeReference": -1}], "matchCode": "Good", "entityType": "Address", "matchConfidence": "High"}'),
	(14, 'CL 33AA Este # 80B - 34, MEDELLÍN, ANTIOQUIA', 'Calle 33 AA Este # 80 B - 34, MEDELLÍN, ANTIOQUIA', 2, 547, 15, 33, 2, 1, 80, 7, NULL, 34, '050031', NULL, -75.60206, 6.24005, '{"name": "Calle 33AA 80B-34, 050031 Medellín, Colombia", "address": {"locality": "Medellín", "postalCode": "050031", "addressLine": "Calle 33AA 80B-34", "adminDistrict": "Antioquia", "countryRegion": "Colombia", "formattedAddress": "Calle 33AA 80B-34, 050031 Medellín, Colombia"}, "bestView": {"crs": {"id": "LatLon", "bounds": [90, 180, -90, -180]}, "width": 0.002261799999999426, "bounds": [6.2389258000000005, -75.6009291, 6.2411742, -75.60319089999999], "center": {"altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "altitudeReference": -1}, "height": -0.0022484000000000393}, "location": {"name": "Calle 33AA 80B-34, 050031 Medellín, Colombia", "altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "altitudeReference": -1}, "locations": [{"altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "precision": "Rooftop", "altitudeReference": -1}, {"altitude": 0, "latitude": 6.23999, "longitude": -75.60206, "precision": "Rooftop", "altitudeReference": -1}], "matchCode": "Good", "entityType": "Address", "matchConfidence": "High"}'),
	(15, 'KR 50A # 43 - 44, ITAGÜÍ, ANTIOQUIA', 'Carrera 50 A # 43 - 44, ITAGÜÍ, ANTIOQUIA', 2, 437, 16, 50, 1, NULL, 43, NULL, NULL, 44, '055412', NULL, -75.6143725, 6.1700676, '{"name": "Carrera 50A 43-44, 055412 Itagüí, Colombia", "address": {"locality": "Itagüí", "postalCode": "055412", "addressLine": "Carrera 50A 43-44", "adminDistrict": "Antioquia", "countryRegion": "Colombia", "formattedAddress": "Carrera 50A 43-44, 055412 Itagüí, Colombia"}, "bestView": {"crs": {"id": "LatLon", "bounds": [90, 180, -90, -180]}, "width": 0.002261400000008962, "bounds": [6.1689434, -75.6132418, 6.1711917, -75.6155032], "center": {"altitude": 0, "latitude": 6.17006755, "longitude": -75.6143725, "altitudeReference": -1}, "height": -0.002248299999999759}, "location": {"name": "Carrera 50A 43-44, 055412 Itagüí, Colombia", "altitude": 0, "latitude": 6.1700676, "longitude": -75.6143725, "altitudeReference": -1}, "locations": [{"altitude": 0, "latitude": 6.1700676, "longitude": -75.6143725, "precision": "Interpolation", "altitudeReference": -1}, {"altitude": 0, "latitude": 6.1701929, "longitude": -75.6144227, "precision": "Interpolation", "altitudeReference": -1}], "matchCode": "Good", "entityType": "Address", "matchConfidence": "High"}'),
	(16, 'CL 33AA # 80B - 32, MEDELLÍN, ANTIOQUIA', 'Calle 33 AA # 80 B - 32, MEDELLÍN, ANTIOQUIA', 2, 547, 15, 33, 2, NULL, 80, 7, NULL, 32, '050031', NULL, -75.601987, 6.2401216, '{"name": "Calle 33AA 80B-32, 050031 Medellín, Colombia", "address": {"locality": "Medellín", "postalCode": "050031", "addressLine": "Calle 33AA 80B-32", "adminDistrict": "Antioquia", "countryRegion": "Colombia", "formattedAddress": "Calle 33AA 80B-32, 050031 Medellín, Colombia"}, "bestView": {"crs": {"id": "LatLon", "bounds": [90, 180, -90, -180]}, "width": 0.002261700000005362, "bounds": [6.238997399999999, -75.60085619999998, 6.2412457, -75.6031179], "center": {"altitude": 0, "latitude": 6.24012155, "longitude": -75.60198704999999, "altitudeReference": -1}, "height": -0.002248300000000647}, "location": {"name": "Calle 33AA 80B-32, 050031 Medellín, Colombia", "altitude": 0, "latitude": 6.2401216, "longitude": -75.601987, "altitudeReference": -1}, "locations": [{"altitude": 0, "latitude": 6.2401216, "longitude": -75.601987, "precision": "Interpolation", "altitudeReference": -1}, {"altitude": 0, "latitude": 6.2399867, "longitude": -75.6019837, "precision": "Interpolation", "altitudeReference": -1}], "matchCode": "Good", "entityType": "Address", "matchConfidence": "High"}'),
	(17, 'CL 33AA # 80AB - 34 INT 301, MEDELLÍN, ANTIOQUIA', 'Calle 33 AA # 80 AB - 34 INT 301, MEDELLÍN, ANTIOQUIA', 2, 547, 15, 33, 2, NULL, 80, 4, NULL, 34, '050031', 'INT 301', -75.6013022, 6.2401414, '{"name": "Calle 33AA 80A-34, 050031 Medellín, Colombia", "address": {"locality": "Medellín", "postalCode": "050031", "addressLine": "Calle 33AA 80A-34", "adminDistrict": "Antioquia", "countryRegion": "Colombia", "formattedAddress": "Calle 33AA 80A-34, 050031 Medellín, Colombia"}, "bestView": {"crs": {"id": "LatLon", "bounds": [90, 180, -90, -180]}, "width": 0.002261700000005362, "bounds": [6.2390172, -75.6001713, 6.2412655, -75.60243300000002], "center": {"altitude": 0, "latitude": 6.24014135, "longitude": -75.60130215000001, "altitudeReference": -1}, "height": -0.002248299999999759}, "location": {"name": "Calle 33AA 80A-34, 050031 Medellín, Colombia", "altitude": 0, "latitude": 6.2401414, "longitude": -75.6013022, "altitudeReference": -1}, "locations": [{"altitude": 0, "latitude": 6.2401414, "longitude": -75.6013022, "precision": "Interpolation", "altitudeReference": -1}, {"altitude": 0, "latitude": 6.2400065, "longitude": -75.601299, "precision": "Interpolation", "altitudeReference": -1}], "matchCode": "Good", "entityType": "Address", "matchConfidence": "High"}'),
	(18, 'CL 33A # 80B - 34 INT 301, Medellín, ANTIOQUIA', 'Calle 33 A # 80 B - 34 INT 301, Medellín, ANTIOQUIA', 2, 547, 15, 33, 1, NULL, 80, 7, NULL, 34, '050031', 'INT 301', -75.60206, 6.24005, '{"name": "Calle 33AA 80B-34, 050031 Medellín, Colombia", "address": {"locality": "Medellín", "postalCode": "050031", "addressLine": "Calle 33AA 80B-34", "adminDistrict": "Antioquia", "countryRegion": "Colombia", "formattedAddress": "Calle 33AA 80B-34, 050031 Medellín, Colombia"}, "bestView": {"crs": {"id": "LatLon", "bounds": [90, 180, -90, -180]}, "width": 0.002261799999999426, "bounds": [6.2389258000000005, -75.6009291, 6.2411742, -75.60319089999999], "center": {"altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "altitudeReference": -1}, "height": -0.0022484000000000393}, "location": {"name": "Calle 33AA 80B-34, 050031 Medellín, Colombia", "altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "altitudeReference": -1}, "locations": [{"altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "precision": "Rooftop", "altitudeReference": -1}, {"altitude": 0, "latitude": 6.23999, "longitude": -75.60206, "precision": "Rooftop", "altitudeReference": -1}], "matchCode": "Good", "entityType": "Address", "matchConfidence": "High"}'),
	(19, 'CL 33A # 80B - 34 INT 201, Medellín, ANTIOQUIA', 'Calle 33 A # 80 B - 34 INT 201, Medellín, ANTIOQUIA', 2, 547, 15, 33, 1, NULL, 80, 7, NULL, 34, '050031', 'INT 201', -75.60206, 6.24005, '{"name": "Calle 33AA 80B-34, 050031 Medellín, Colombia", "address": {"locality": "Medellín", "postalCode": "050031", "addressLine": "Calle 33AA 80B-34", "adminDistrict": "Antioquia", "countryRegion": "Colombia", "formattedAddress": "Calle 33AA 80B-34, 050031 Medellín, Colombia"}, "bestView": {"crs": {"id": "LatLon", "bounds": [90, 180, -90, -180]}, "width": 0.002261799999999426, "bounds": [6.2389258000000005, -75.6009291, 6.2411742, -75.60319089999999], "center": {"altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "altitudeReference": -1}, "height": -0.0022484000000000393}, "location": {"name": "Calle 33AA 80B-34, 050031 Medellín, Colombia", "altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "altitudeReference": -1}, "locations": [{"altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "precision": "Rooftop", "altitudeReference": -1}, {"altitude": 0, "latitude": 6.23999, "longitude": -75.60206, "precision": "Rooftop", "altitudeReference": -1}], "matchCode": "Good", "entityType": "Address", "matchConfidence": "High"}'),
	(20, 'CL 55AA # 80B - 34, MEDELLÍN, ANTIOQUIA', 'Calle 55 AA # 80 B - 34, MEDELLÍN, ANTIOQUIA', 2, 547, 15, 55, 2, NULL, 80, 7, NULL, 34, '050031', NULL, -75.60206, 6.24005, '{"name": "Calle 33AA 80B-34, 050031 Medellín, Colombia", "address": {"locality": "Medellín", "postalCode": "050031", "addressLine": "Calle 33AA 80B-34", "adminDistrict": "Antioquia", "countryRegion": "Colombia", "formattedAddress": "Calle 33AA 80B-34, 050031 Medellín, Colombia"}, "bestView": {"crs": {"id": "LatLon", "bounds": [90, 180, -90, -180]}, "width": 0.002261799999999426, "bounds": [6.2389258000000005, -75.6009291, 6.2411742, -75.60319089999999], "center": {"altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "altitudeReference": -1}, "height": -0.0022484000000000393}, "location": {"name": "Calle 33AA 80B-34, 050031 Medellín, Colombia", "altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "altitudeReference": -1}, "locations": [{"altitude": 0, "latitude": 6.24005, "longitude": -75.60206, "precision": "Rooftop", "altitudeReference": -1}, {"altitude": 0, "latitude": 6.23999, "longitude": -75.60206, "precision": "Rooftop", "altitudeReference": -1}], "matchCode": "Ambiguous", "entityType": "Address", "matchConfidence": "Medium"}');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.addresses_inventories
CREATE TABLE IF NOT EXISTS `addresses_inventories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` int(11) DEFAULT NULL,
  `resource` int(11) DEFAULT NULL,
  `quantity` double NOT NULL,
  `notes` text,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_geo_inventories_addresses` (`address`),
  KEY `FK_geo_inventories_inventories_resources` (`resource`),
  CONSTRAINT `FK_geo_inventories_addresses` FOREIGN KEY (`address`) REFERENCES `addresses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_geo_inventories_inventories_resources` FOREIGN KEY (`resource`) REFERENCES `inventories_resources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.addresses_inventories: ~4 rows (aproximadamente)
DELETE FROM `addresses_inventories`;
/*!40000 ALTER TABLE `addresses_inventories` DISABLE KEYS */;
INSERT INTO `addresses_inventories` (`id`, `address`, `resource`, `quantity`, `notes`, `created`, `updated`) VALUES
	(1, 15, 2, 45, NULL, '2019-06-20 09:41:03', '2019-06-25 09:41:03'),
	(2, 15, 3, 154, NULL, '2019-06-20 09:41:03', '2019-06-29 15:28:28'),
	(3, 12, 2, 10, NULL, '2019-06-20 09:41:03', '2019-06-29 23:14:41'),
	(4, 12, 3, 25, NULL, '2019-06-20 09:41:03', '2019-06-29 15:28:28');
/*!40000 ALTER TABLE `addresses_inventories` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.banks
CREATE TABLE IF NOT EXISTS `banks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `admin` varchar(50) DEFAULT NULL,
  `name` varchar(250) NOT NULL,
  `nit` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.banks: ~25 rows (aproximadamente)
DELETE FROM `banks`;
/*!40000 ALTER TABLE `banks` DISABLE KEYS */;
INSERT INTO `banks` (`id`, `code`, `admin`, `name`, `nit`) VALUES
	(5, '1', 'Delegatura para Intermediarios Financieros Uno', 'Banco de Bogotá', '860002964-4'),
	(6, '2', 'Delegatura para Intermediarios Financieros Uno', 'Banco Popular S.A.', '860007738-9'),
	(7, '6', 'Delegatura para Intermediarios Financieros Uno', 'ITAÚ CORPBANCA COLOMBIA S.A. podrá utilizar cualquiera de las siguientes siglas ITAÚ; BANCO CORPBANCA; o CORPBANCA', '890903937-0'),
	(8, '7', 'Delegatura para Intermediarios Financieros Uno', 'Bancolombia S.A. o Banco de Colombia S.A. o Bancolombia', '890903938-8'),
	(9, '9', 'Delegatura para Intermediarios Financieros Dos', 'Citibank-Colombia - Expresión Citibank', '860051135-4'),
	(10, '12', 'Delegatura para Intermediarios Financieros Uno', 'BANCO GNB SUDAMERIS S.A.  Quien podrá utilizar el nombre BANCO GNB SUDAMERIS o SUDAMERIS, seguidos o no de las expresiones sociedad anónima o la sigla S.A.', '860050750-1'),
	(11, '13', 'Delegatura para Intermediarios Financieros Uno', 'Banco Bilbao Vizcaya Argentaria Colombia S.A. podrá utilizar el nombre BBVA Colombia ( Antes Banco Ganadero S.A. o BBVA Banco Ganadero)', '860003020-1'),
	(12, '23', 'Delegatura para Intermediarios Financieros Uno', 'Banco  de  Occidente S.A.', '890300279-4'),
	(13, '30', 'Delegatura para Intermediarios Financieros Uno', 'BANCO CAJA SOCIAL S.A.  Y podrá usar el nombre BANCO CAJA SOCIAL', '860007335-4'),
	(14, '39', 'Delegatura para Intermediarios Financieros Uno', 'Banco Davivienda S.A. "Banco Davivienda" o "Davivienda"', '860034313-7'),
	(15, '42', 'Delegatura para Intermediarios Financieros Uno', '"SCOTIABANK COLPATRIA S.A." y podrá utilizar cualquiera de los siguientes nombres abreviados o siglas: "BANCO COLPATRIA", "SCOTIABANK", "SCOTIABANK COLPATRIA", "COLPATRIA SCOTIABANK",  "COLPATRIA MULTIBANCA", "MULTIBANCA COLPATRIA"', '860034594-1'),
	(16, '43', 'Delegatura para Intermediarios Financieros Dos', 'Banco Agrario de Colombia S.A. -Banagrario-', '800037800-8'),
	(17, '49', 'Delegatura para Intermediarios Financieros Uno', 'Banco Comercial AV Villas S.A. o Banco de Ahorro y Vivienda AV Villas, Banco AV Villas o AV Villas', '860035827-5'),
	(18, '51', 'Delegatura para Intermediarios Financieros Dos', 'Banco ProCredit Colombia S.A. siglas "BPCC", "PROCREDIT" o "BANCO PROCREDIT"', '900200960-9'),
	(19, '52', 'Delegatura para Intermediarios Financieros Dos', 'Banco de las Microfinanzas -Bancamía S.A.', '900215071-1'),
	(20, '53', 'Delegatura para Intermediarios Financieros Dos', 'Banco W S.A.', '900378212-2'),
	(21, '54', 'Delegatura para Intermediarios Financieros Uno', 'Banco Coomeva S.A.  - Sigla "BANCOOMEVA"', '900406150-5'),
	(22, '55', 'Delegatura para Intermediarios Financieros Dos', 'Banco Finandina S.A. o Finandina Establecimiento Bancario. Sigla FINANDINA.', '860051894-6'),
	(23, '56', 'Delegatura para Intermediarios Financieros Dos', 'Banco Falabella S.A.', '900047981-8'),
	(24, '57', 'Delegatura para Intermediarios Financieros Dos', 'Banco Pichincha S.A.', '890200756-7'),
	(25, '58', 'Delegatura para Intermediarios Financieros Dos', 'El Banco Cooperativo Coopcentral  Sigla: COOPCENTRAL', '890203088-9'),
	(26, '59', 'Delegatura para Intermediarios Financieros Dos', 'BANCO SANTANDER DE NEGOCIOS COLOMBIA S. A', '900628110-3'),
	(27, '60', 'Delegatura para Intermediarios Financieros Dos', '"BANCO MUNDO MUJER S.A."  Denominación de "MUNDO MUJER EL BANCO DE LA COMUNIDAD " o "MUNDO MUJER" ', '900768933-8'),
	(28, '61', 'Delegatura para Intermediarios Financieros Dos', '"BANCO MULTIBANK S.A."  Sigla: "MULTIBANK S.A." o "MULTIBANK"', '860024414-1'),
	(29, '62', 'Delegatura para Intermediarios Financieros Dos', 'BANCO COMPARTIR S.A. Sigla: "BANCOMPARTIR S.A."', '860025971-5'),
	(30, '63', 'Delegatura para Intermediarios Financieros Dos', 'BANCO SERFINANZA S.A.', '860043186-6');
/*!40000 ALTER TABLE `banks` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.contacts
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identification_type` int(11) DEFAULT NULL,
  `identification_number` varchar(50) NOT NULL,
  `gender` int(11) DEFAULT NULL,
  `names` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `second_surname` varchar(50) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `address` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_contacts_types_identifications` (`identification_type`),
  KEY `FK_contacts_addresses` (`address`),
  KEY `FK_contacts_types_genders` (`gender`),
  CONSTRAINT `FK_contacts_addresses` FOREIGN KEY (`address`) REFERENCES `addresses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_contacts_identification_types` FOREIGN KEY (`identification_type`) REFERENCES `types_identifications` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_contacts_types_genders` FOREIGN KEY (`gender`) REFERENCES `types_genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.contacts: ~2 rows (aproximadamente)
DELETE FROM `contacts`;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` (`id`, `identification_type`, `identification_number`, `gender`, `names`, `surname`, `second_surname`, `birthday`, `phone`, `mobile`, `email`, `address`) VALUES
	(1, 1, '1035429360', 1, 'ANDRES FELIPE', 'GOMEZ', 'MAYA', '1993-02-10', '(04) 274-5002', '(300) 547-3082', 'feliphegomez@gmail.com', 7),
	(2, 1, '10354293601', 1, 'ANDRES FELIPE', 'GOMEZ', 'MAYA', '1993-02-10', '(04) 274-5002', '(300) 254-3082', 'feliphegomez@gmail.com', 11);
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.departments
CREATE TABLE IF NOT EXISTS `departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dept_name` (`name`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.departments: ~4 rows (aproximadamente)
DELETE FROM `departments`;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` (`id`, `name`) VALUES
	(2, 'Departamento Administrativo'),
	(6, 'Departamento Comercial'),
	(7, 'Departamento de Operaciones'),
	(5, 'Gestión Humana');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.departments_manager
CREATE TABLE IF NOT EXISTS `departments_manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department` int(11) NOT NULL,
  `employee` int(11) NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_departments_manager_departments` (`department`),
  KEY `FK_departments_manager_employees` (`employee`),
  CONSTRAINT `FK_departments_manager_departments` FOREIGN KEY (`department`) REFERENCES `departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_departments_manager_employees` FOREIGN KEY (`employee`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.departments_manager: ~0 rows (aproximadamente)
DELETE FROM `departments_manager`;
/*!40000 ALTER TABLE `departments_manager` DISABLE KEYS */;
/*!40000 ALTER TABLE `departments_manager` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.employees
CREATE TABLE IF NOT EXISTS `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identification_type` int(11) DEFAULT NULL,
  `identification_number` varchar(50) DEFAULT NULL,
  `identification_date_expedition` date DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `second_name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `second_surname` varchar(50) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `blood_type` int(11) DEFAULT NULL,
  `blood_rh` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `number_phone` varchar(50) DEFAULT NULL,
  `number_mobile` varchar(50) DEFAULT NULL,
  `company_date_entry` date DEFAULT NULL,
  `company_date_out` date DEFAULT NULL,
  `company_mail` varchar(50) DEFAULT NULL,
  `company_number_phone` varchar(50) DEFAULT NULL,
  `company_number_mobile` varchar(50) DEFAULT NULL,
  `avatar` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `eps` int(11) DEFAULT NULL,
  `arl` int(11) DEFAULT NULL,
  `pension_fund` int(11) DEFAULT NULL,
  `compensation_fund` int(11) DEFAULT NULL,
  `severance_fund` int(11) DEFAULT NULL,
  `address` int(11) DEFAULT NULL,
  `observations` text,
  `bank` int(11) DEFAULT NULL,
  `bank_type` int(11) DEFAULT NULL,
  `bank_number` varchar(50) DEFAULT NULL,
  `eps_active` int(11) DEFAULT '0',
  `arl_active` int(11) DEFAULT '0',
  `pension_fund_active` int(11) DEFAULT '0',
  `compensation_fund_active` int(11) DEFAULT '0',
  `gender` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_persons_arl` (`arl`),
  KEY `FK_persons_blood_rhs` (`blood_rh`),
  KEY `FK_persons_blood_types` (`blood_type`),
  KEY `FK_persons_compensation_funds` (`compensation_fund`),
  KEY `FK_persons_eps` (`eps`),
  KEY `FK_persons_identification_types` (`identification_type`),
  KEY `FK_persons_pension_funds` (`pension_fund`),
  KEY `FK_persons_status_employee` (`status`),
  KEY `FK_persons_severance_funds` (`severance_fund`),
  KEY `FK_employees_pictures` (`avatar`),
  KEY `FK_employees_banks` (`bank`),
  KEY `FK_employees_types_genders` (`gender`),
  KEY `FK_employees_addresses` (`address`),
  KEY `FK_employees_types_banks` (`bank_type`),
  CONSTRAINT `FK_employees_addresses` FOREIGN KEY (`address`) REFERENCES `addresses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_arls` FOREIGN KEY (`arl`) REFERENCES `types_arls` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_banks` FOREIGN KEY (`bank`) REFERENCES `banks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_pictures` FOREIGN KEY (`avatar`) REFERENCES `pictures` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_types_banks` FOREIGN KEY (`bank_type`) REFERENCES `types_banks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_types_genders` FOREIGN KEY (`gender`) REFERENCES `types_genders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`eps`) REFERENCES `types_eps` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_10` FOREIGN KEY (`identification_type`) REFERENCES `types_identifications` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`compensation_fund`) REFERENCES `funds_compensations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_3` FOREIGN KEY (`pension_fund`) REFERENCES `funds_pensions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_4` FOREIGN KEY (`severance_fund`) REFERENCES `funds_severances` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_7` FOREIGN KEY (`status`) REFERENCES `status_employees` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_8` FOREIGN KEY (`blood_type`) REFERENCES `types_bloods` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_9` FOREIGN KEY (`blood_rh`) REFERENCES `types_bloods_rhs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.employees: ~1 rows (aproximadamente)
DELETE FROM `employees`;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` (`id`, `identification_type`, `identification_number`, `identification_date_expedition`, `first_name`, `second_name`, `surname`, `second_surname`, `birthdate`, `blood_type`, `blood_rh`, `email`, `number_phone`, `number_mobile`, `company_date_entry`, `company_date_out`, `company_mail`, `company_number_phone`, `company_number_mobile`, `avatar`, `status`, `eps`, `arl`, `pension_fund`, `compensation_fund`, `severance_fund`, `address`, `observations`, `bank`, `bank_type`, `bank_number`, `eps_active`, `arl_active`, `pension_fund_active`, `compensation_fund_active`, `gender`) VALUES
	(3, 1, '1035429360', '2011-02-11', 'Andres', 'Felipe', 'Gomez', 'Maya', '1993-02-10', 4, 2, 'feliphegomez@gmail.com', '(04) 274-5002', '(300) 547-3082', NULL, NULL, NULL, NULL, NULL, NULL, 1, 4, 9, 1, 3, 1, 18, NULL, 8, 1, '154254', 1, 0, 0, 0, 1);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.employees_calendar
CREATE TABLE IF NOT EXISTS `employees_calendar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee` int(11) NOT NULL,
  `calendar` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_calendar_employees_employees` (`employee`),
  KEY `FK_calendar_employees_calendar` (`calendar`),
  CONSTRAINT `FK_calendar_employees_calendar` FOREIGN KEY (`calendar`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_calendar_employees_employees` FOREIGN KEY (`employee`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.employees_calendar: ~3 rows (aproximadamente)
DELETE FROM `employees_calendar`;
/*!40000 ALTER TABLE `employees_calendar` DISABLE KEYS */;
INSERT INTO `employees_calendar` (`id`, `employee`, `calendar`) VALUES
	(1, 3, 1),
	(2, 3, 2),
	(3, 3, 3);
/*!40000 ALTER TABLE `employees_calendar` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.employees_contacts
CREATE TABLE IF NOT EXISTS `employees_contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee` int(11) NOT NULL,
  `contact` int(11) NOT NULL,
  `type_contact` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_contacts_employees_employees` (`employee`),
  KEY `FK_contacts_employees_contacts` (`contact`),
  KEY `FK_crew_employees_types_contacts` (`type_contact`),
  CONSTRAINT `FK_employees_contacts_contacts` FOREIGN KEY (`contact`) REFERENCES `contacts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_contacts_employees` FOREIGN KEY (`employee`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_contacts_types_contacts` FOREIGN KEY (`type_contact`) REFERENCES `types_contacts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.employees_contacts: ~0 rows (aproximadamente)
DELETE FROM `employees_contacts`;
/*!40000 ALTER TABLE `employees_contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees_contacts` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.employees_department
CREATE TABLE IF NOT EXISTS `employees_department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee` int(11) DEFAULT NULL,
  `from_date` date DEFAULT NULL,
  `to_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_employees_department_employees` (`employee`),
  KEY `id` (`id`),
  CONSTRAINT `FK_employees_department_employees` FOREIGN KEY (`employee`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.employees_department: ~0 rows (aproximadamente)
DELETE FROM `employees_department`;
/*!40000 ALTER TABLE `employees_department` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees_department` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.employees_family
CREATE TABLE IF NOT EXISTS `employees_family` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee` int(11) NOT NULL,
  `contact` int(11) NOT NULL,
  `type_contact` int(11),
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_contacts_employees_employees` (`employee`),
  KEY `FK_contacts_employees_contacts` (`contact`),
  KEY `FK_crew_employees_types_contacts` (`type_contact`),
  CONSTRAINT `FK_employees_family_contacts` FOREIGN KEY (`contact`) REFERENCES `contacts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_family_employees` FOREIGN KEY (`employee`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_family_types_contacts` FOREIGN KEY (`type_contact`) REFERENCES `types_contacts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.employees_family: ~1 rows (aproximadamente)
DELETE FROM `employees_family`;
/*!40000 ALTER TABLE `employees_family` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees_family` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.employees_titles
CREATE TABLE IF NOT EXISTS `employees_titles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_employees_titles_employees` (`employee`),
  CONSTRAINT `FK_employees_titles_employees` FOREIGN KEY (`employee`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.employees_titles: ~0 rows (aproximadamente)
DELETE FROM `employees_titles`;
/*!40000 ALTER TABLE `employees_titles` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees_titles` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.events
CREATE TABLE IF NOT EXISTS `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `all_day` int(1) DEFAULT '0',
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `type` int(11) DEFAULT NULL,
  `request` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_calendar_requests` (`request`),
  KEY `FK_events_status_events` (`status`),
  KEY `FK_events_types_events` (`type`),
  CONSTRAINT `FK_calendar_requests` FOREIGN KEY (`request`) REFERENCES `requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_events_status_events` FOREIGN KEY (`status`) REFERENCES `status_events` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_events_types_events` FOREIGN KEY (`type`) REFERENCES `types_events` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.events: ~2 rows (aproximadamente)
DELETE FROM `events`;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` (`id`, `title`, `all_day`, `start`, `end`, `type`, `request`, `status`) VALUES
	(1, 'Requirement Gathering', 0, '2018-11-01 19:00:00', '2018-11-27 08:46:40', 1, NULL, 1),
	(2, 'Showcasing', 0, '2019-02-09 06:00:00', '2019-02-10 15:20:00', 2, NULL, 1),
	(3, 'Warranty Period', 0, '2019-05-09 19:53:20', '2019-08-10 10:46:40', 3, NULL, 1);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.events_groups
CREATE TABLE IF NOT EXISTS `events_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.events_groups: ~0 rows (aproximadamente)
DELETE FROM `events_groups`;
/*!40000 ALTER TABLE `events_groups` DISABLE KEYS */;
INSERT INTO `events_groups` (`id`, `name`) VALUES
	(1, 'Personal Autorizado para Visitas Tecnicas');
/*!40000 ALTER TABLE `events_groups` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.events_staff_employees
CREATE TABLE IF NOT EXISTS `events_staff_employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group` int(11) NOT NULL,
  `employee` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_events_staff_employees_events_groups` (`group`),
  KEY `FK_events_staff_employees_employees` (`employee`),
  CONSTRAINT `FK_events_staff_employees_employees` FOREIGN KEY (`employee`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_events_staff_employees_events_groups` FOREIGN KEY (`group`) REFERENCES `events_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.events_staff_employees: ~0 rows (aproximadamente)
DELETE FROM `events_staff_employees`;
/*!40000 ALTER TABLE `events_staff_employees` DISABLE KEYS */;
INSERT INTO `events_staff_employees` (`id`, `group`, `employee`) VALUES
	(1, 1, 3);
/*!40000 ALTER TABLE `events_staff_employees` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.funds_compensations
CREATE TABLE IF NOT EXISTS `funds_compensations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `nit` varchar(50) NOT NULL,
  `admin` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.funds_compensations: ~43 rows (aproximadamente)
DELETE FROM `funds_compensations`;
/*!40000 ALTER TABLE `funds_compensations` DISABLE KEYS */;
INSERT INTO `funds_compensations` (`id`, `code`, `nit`, `admin`, `name`) VALUES
	(1, 'CCF02', '890900840-1', 'Camacol', 'Comfamiliar Camacol'),
	(2, 'CCF03', '890900842-6', 'Comfenalco Antioquia CCF', 'Comfenalco Antioquia'),
	(3, 'CCF04', '890900841-9', 'Caja de Compensación Familiar de Antioquia', 'Comfama'),
	(4, 'CCF05', '890102044-1', 'Caja de Compensación Familiar Cajacopi Atlántico', 'Cajacopi Atlántico'),
	(5, 'CCF06', '890102002-2', 'Combarranquilla', 'Combarranquilla'),
	(6, 'CCF07', '890101994-9', 'Comfamiliar Atlántico', 'Comfamiliar Atlántico'),
	(7, 'CCF08', '890480023-7', 'Comfenalco Cartagena', 'Comfenalco Cartagena'),
	(8, 'CCF09', '890480110-1', 'Caja de Compensación Familiar de Cartagena', 'Comfamiliar Cartagena'),
	(9, 'CCF10', '891800213-8', 'Comfaboy', 'Comfaboy'),
	(10, 'CCF11', '890806490-5', 'CCF de Caldas', 'Confamiliares'),
	(11, 'CCF13', '891190047-2', 'Comfaca', 'Comfaca'),
	(12, 'CCF14', '891500182-0', 'Comfacauca', 'Comfacauca'),
	(13, 'CCF15', '892399989-8', 'Comfacor', 'Comfacesar'),
	(14, 'CCF16', '891080005-1', 'Comfacor', 'Comfacor'),
	(15, 'CCF21', '860013570-3', 'Cafam', 'Cafam'),
	(16, 'CCF22', '860007336-1', 'Colsubsidio', 'Colsubsidio'),
	(17, 'CCF24', '860066942-7', 'Caja de Compensación Familiar Compensar', 'Compensar'),
	(18, 'CCF26', '860045904-7', 'Comfacundi', 'Comfacundi'),
	(19, 'CCF29', '891600091-8', 'CCF del Chocó', 'Comfachocó'),
	(20, 'CCF30', '892115006-5', 'Caja de Compensación Familiar de La Guajira', 'Comfamiliar Guajira'),
	(21, 'CCF32', '891180008-2', 'Comfamiliar del Huila', 'Comfamiliar Huila'),
	(22, 'CCF33', '891780093-3', 'CCF del Magdalena', 'Cajamag'),
	(23, 'CCF34', '892000146-3', 'Cofrem Meta', 'Cofrem'),
	(24, 'CCF35', '891280008-1', 'CCF de Nariño', 'Comfamiliar Nariño'),
	(25, 'CCF36', '890500675-6', 'Caja de Compensación Familiar del Oriente', 'Comfaoriente'),
	(26, 'CCF37', '890500516-3', 'Caja de Comp. Familiar Comfanorte', 'Comfanorte'),
	(27, 'CCF38', '890270275-5', 'Caja de Comp. Familiar de Barrancabermeja Cafaba', 'Cafaba'),
	(28, 'CCF39', '890200106-1', 'Cajasan ', 'Cajasan'),
	(29, 'CCF40', '890201578-7', 'Comfenalco Santander', 'Comfenalco Santander'),
	(30, 'CCF41', '892200015-5', 'Caja de Compensación Familiar del Sucre', 'Comfasucre'),
	(31, 'CCF43', '890000381-0', 'Comfenalco Quindío', 'Comfenalco Quindío'),
	(32, 'CCF44', '891480000-1', 'Comfamiliar Risaralda', 'Comfamiliar Risaralda'),
	(33, 'CCF46', '890704737-0', 'CCF del Sur del Tolima Cafasur ', 'Cafasur'),
	(34, 'CCF48', '800211025-1', 'Comfatolima ', 'Comfatolima'),
	(35, 'CCF50', '890700148-4', 'Comfenalco –Tolima', 'Comfenalco Tolima'),
	(36, 'CCF56', '890303093-5', 'Comfenalco Valle', 'Comfenalco Valle'),
	(37, 'CCF57', '890303208-5', 'Comfandi ', 'Comfandi'),
	(38, 'CCF63', '891200337-8', 'Caja de Compensación Familiar del Putumayo', 'Comfamiliar Putumayo'),
	(39, 'CCF64', '892400320-5', 'Cajasai ', 'Cajasai'),
	(40, 'CCF65', '800003122-6', 'Caja de Comp Familiar del Amazonas Cafamaz', 'Cafamaz'),
	(41, 'CCF67', '800219488-4', 'Comfiar Caja de Compensacion Familiar de Arauca', 'Comfiar'),
	(42, 'CCF68', '800231969-4', 'Comcaja', 'Comcaja'),
	(43, 'CCF69', '844003392-8', 'Comfacasanare', 'Comfacasanare');
/*!40000 ALTER TABLE `funds_compensations` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.funds_pensions
CREATE TABLE IF NOT EXISTS `funds_pensions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `nit` varchar(50) DEFAULT NULL,
  `admin` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.funds_pensions: ~9 rows (aproximadamente)
DELETE FROM `funds_pensions`;
/*!40000 ALTER TABLE `funds_pensions` DISABLE KEYS */;
INSERT INTO `funds_pensions` (`id`, `code`, `nit`, `admin`, `name`) VALUES
	(1, '230201', '800229739-0', 'Protección', 'Protección'),
	(2, '230301', '800224808-8', 'Porvenir', 'Porvenir'),
	(3, '230901', '800253055-2', 'Old Mutual Fondo de Pensiones Obligatorias', 'Old Mutual'),
	(4, '230904', '830125132-2', 'Old Mutual Fondo Alternativo de Pensiones', 'Old Mutual Alternativo'),
	(5, '231001', '800227940-6', 'Colfondos', 'Colfondos'),
	(6, '25-2', '860007379-8', 'Caja de Auxilios y de Prestaciones de ACDAC', 'Caxdac'),
	(7, '25-3', '899999734-7', 'Fondo de Previsión Social del Congreso', 'Fonprecon'),
	(8, '25-7', '800216278-0', 'Pensiones de Antioquia', 'Pensiones de Antioquia'),
	(9, '25-14', '900336004-7', 'Administradora Colombiana de Pensiones Colpensiones', 'Colpensiones');
/*!40000 ALTER TABLE `funds_pensions` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.funds_severances
CREATE TABLE IF NOT EXISTS `funds_severances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `nit` varchar(50) NOT NULL,
  `admin` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.funds_severances: ~5 rows (aproximadamente)
DELETE FROM `funds_severances`;
/*!40000 ALTER TABLE `funds_severances` DISABLE KEYS */;
INSERT INTO `funds_severances` (`id`, `code`, `nit`, `admin`, `name`) VALUES
	(1, '230201', '800229739-0', 'Protección', 'Protección'),
	(2, '230301', '800224808-8', 'Porvenir', 'Porvenir'),
	(3, '230901', '800253055-2', 'Old Mutual Fondo de Pensiones Obligatorias', 'Old Mutual'),
	(4, '231001', '800227940-6', 'Colfondos', 'Colfondos'),
	(5, '270000', '899999284-4', 'Fondo Nacional del Ahorro', 'FNA Ahorro');
/*!40000 ALTER TABLE `funds_severances` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.geo_citys
CREATE TABLE IF NOT EXISTS `geo_citys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `department` int(2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `departamento_id` (`department`),
  KEY `id` (`id`),
  CONSTRAINT `FK_geo_citys_geo_departments` FOREIGN KEY (`department`) REFERENCES `geo_departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1101 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.geo_citys: ~1.100 rows (aproximadamente)
DELETE FROM `geo_citys`;
/*!40000 ALTER TABLE `geo_citys` DISABLE KEYS */;
INSERT INTO `geo_citys` (`id`, `name`, `department`) VALUES
	(1, 'Abriaquí', 2),
	(2, 'Acacías', 21),
	(3, 'Acandí', 13),
	(4, 'Acevedo', 18),
	(5, 'Achí', 6),
	(6, 'Agrado', 18),
	(7, 'Agua de Dios', 15),
	(8, 'Aguachica', 12),
	(9, 'Aguada', 28),
	(10, 'Aguadas', 8),
	(11, 'Aguazul', 10),
	(12, 'Agustín Codazzi', 12),
	(13, 'Aipe', 18),
	(14, 'Albania', 9),
	(15, 'Albania', 19),
	(16, 'Albania', 28),
	(17, 'Albán', 15),
	(18, 'Albán (San José)', 22),
	(19, 'Alcalá', 31),
	(20, 'Alejandria', 2),
	(21, 'Algarrobo', 20),
	(22, 'Algeciras', 18),
	(23, 'Almaguer', 11),
	(24, 'Almeida', 7),
	(25, 'Alpujarra', 30),
	(26, 'Altamira', 18),
	(27, 'Alto Baudó (Pie de Pato)', 13),
	(28, 'Altos del Rosario', 6),
	(29, 'Alvarado', 30),
	(30, 'Amagá', 2),
	(31, 'Amalfi', 2),
	(32, 'Ambalema', 30),
	(33, 'Anapoima', 15),
	(34, 'Ancuya', 22),
	(35, 'Andalucía', 31),
	(36, 'Andes', 2),
	(37, 'Angelópolis', 2),
	(38, 'Angostura', 2),
	(39, 'Anolaima', 15),
	(40, 'Anorí', 2),
	(41, 'Anserma', 8),
	(42, 'Ansermanuevo', 31),
	(43, 'Anzoátegui', 30),
	(44, 'Anzá', 2),
	(45, 'Apartadó', 2),
	(46, 'Apulo', 15),
	(47, 'Apía', 26),
	(48, 'Aquitania', 7),
	(49, 'Aracataca', 20),
	(50, 'Aranzazu', 8),
	(51, 'Aratoca', 28),
	(52, 'Arauca', 3),
	(53, 'Arauquita', 3),
	(54, 'Arbeláez', 15),
	(55, 'Arboleda (Berruecos)', 22),
	(56, 'Arboledas', 23),
	(57, 'Arboletes', 2),
	(58, 'Arcabuco', 7),
	(59, 'Arenal', 6),
	(60, 'Argelia', 2),
	(61, 'Argelia', 11),
	(62, 'Argelia', 31),
	(63, 'Ariguaní (El Difícil)', 20),
	(64, 'Arjona', 6),
	(65, 'Armenia', 2),
	(66, 'Armenia', 25),
	(67, 'Armero (Guayabal)', 30),
	(68, 'Arroyohondo', 6),
	(69, 'Astrea', 12),
	(70, 'Ataco', 30),
	(71, 'Atrato (Yuto)', 13),
	(72, 'Ayapel', 14),
	(73, 'Bagadó', 13),
	(74, 'Bahía Solano (Mútis)', 13),
	(75, 'Bajo Baudó (Pizarro)', 13),
	(76, 'Balboa', 11),
	(77, 'Balboa', 26),
	(78, 'Baranoa', 4),
	(79, 'Baraya', 18),
	(80, 'Barbacoas', 22),
	(81, 'Barbosa', 2),
	(82, 'Barbosa', 28),
	(83, 'Barichara', 28),
	(84, 'Barranca de Upía', 21),
	(85, 'Barrancabermeja', 28),
	(86, 'Barrancas', 19),
	(87, 'Barranco de Loba', 6),
	(88, 'Barranquilla', 4),
	(89, 'Becerríl', 12),
	(90, 'Belalcázar', 8),
	(91, 'Bello', 2),
	(92, 'Belmira', 2),
	(93, 'Beltrán', 15),
	(94, 'Belén', 7),
	(95, 'Belén', 22),
	(96, 'Belén de Bajirá', 13),
	(97, 'Belén de Umbría', 26),
	(98, 'Belén de los Andaquíes', 9),
	(99, 'Berbeo', 7),
	(100, 'Betania', 2),
	(101, 'Beteitiva', 7),
	(102, 'Betulia', 2),
	(103, 'Betulia', 28),
	(104, 'Bituima', 15),
	(105, 'Boavita', 7),
	(106, 'Bochalema', 23),
	(107, 'Bogotá D.C.', 5),
	(108, 'Bojacá', 15),
	(109, 'Bojayá (Bellavista)', 13),
	(110, 'Bolívar', 2),
	(111, 'Bolívar', 11),
	(112, 'Bolívar', 28),
	(113, 'Bolívar', 31),
	(114, 'Bosconia', 12),
	(115, 'Boyacá', 7),
	(116, 'Briceño', 2),
	(117, 'Briceño', 7),
	(118, 'Bucaramanga', 28),
	(119, 'Bucarasica', 23),
	(120, 'Buenaventura', 31),
	(121, 'Buenavista', 7),
	(122, 'Buenavista', 14),
	(123, 'Buenavista', 25),
	(124, 'Buenavista', 29),
	(125, 'Buenos Aires', 11),
	(126, 'Buesaco', 22),
	(127, 'Buga', 31),
	(128, 'Bugalagrande', 31),
	(129, 'Burítica', 2),
	(130, 'Busbanza', 7),
	(131, 'Cabrera', 15),
	(132, 'Cabrera', 28),
	(133, 'Cabuyaro', 21),
	(134, 'Cachipay', 15),
	(135, 'Caicedo', 2),
	(136, 'Caicedonia', 31),
	(137, 'Caimito', 29),
	(138, 'Cajamarca', 30),
	(139, 'Cajibío', 11),
	(140, 'Cajicá', 15),
	(141, 'Calamar', 6),
	(142, 'Calamar', 17),
	(143, 'Calarcá', 25),
	(144, 'Caldas', 2),
	(145, 'Caldas', 7),
	(146, 'Caldono', 11),
	(147, 'California', 28),
	(148, 'Calima (Darién)', 31),
	(149, 'Caloto', 11),
	(150, 'Calí', 31),
	(151, 'Campamento', 2),
	(152, 'Campo de la Cruz', 4),
	(153, 'Campoalegre', 18),
	(154, 'Campohermoso', 7),
	(155, 'Canalete', 14),
	(156, 'Candelaria', 4),
	(157, 'Candelaria', 31),
	(158, 'Cantagallo', 6),
	(159, 'Cantón de San Pablo', 13),
	(160, 'Caparrapí', 15),
	(161, 'Capitanejo', 28),
	(162, 'Caracolí', 2),
	(163, 'Caramanta', 2),
	(164, 'Carcasí', 28),
	(165, 'Carepa', 2),
	(166, 'Carmen de Apicalá', 30),
	(167, 'Carmen de Carupa', 15),
	(168, 'Carmen de Viboral', 2),
	(169, 'Carmen del Darién (CURBARADÓ)', 13),
	(170, 'Carolina', 2),
	(171, 'Cartagena', 6),
	(172, 'Cartagena del Chairá', 9),
	(173, 'Cartago', 31),
	(174, 'Carurú', 32),
	(175, 'Casabianca', 30),
	(176, 'Castilla la Nueva', 21),
	(177, 'Caucasia', 2),
	(178, 'Cañasgordas', 2),
	(179, 'Cepita', 28),
	(180, 'Cereté', 14),
	(181, 'Cerinza', 7),
	(182, 'Cerrito', 28),
	(183, 'Cerro San Antonio', 20),
	(184, 'Chachaguí', 22),
	(185, 'Chaguaní', 15),
	(186, 'Chalán', 29),
	(187, 'Chaparral', 30),
	(188, 'Charalá', 28),
	(189, 'Charta', 28),
	(190, 'Chigorodó', 2),
	(191, 'Chima', 28),
	(192, 'Chimichagua', 12),
	(193, 'Chimá', 14),
	(194, 'Chinavita', 7),
	(195, 'Chinchiná', 8),
	(196, 'Chinácota', 23),
	(197, 'Chinú', 14),
	(198, 'Chipaque', 15),
	(199, 'Chipatá', 28),
	(200, 'Chiquinquirá', 7),
	(201, 'Chiriguaná', 12),
	(202, 'Chiscas', 7),
	(203, 'Chita', 7),
	(204, 'Chitagá', 23),
	(205, 'Chitaraque', 7),
	(206, 'Chivatá', 7),
	(207, 'Chivolo', 20),
	(208, 'Choachí', 15),
	(209, 'Chocontá', 15),
	(210, 'Chámeza', 10),
	(211, 'Chía', 15),
	(212, 'Chíquiza', 7),
	(213, 'Chívor', 7),
	(214, 'Cicuco', 6),
	(215, 'Cimitarra', 28),
	(216, 'Circasia', 25),
	(217, 'Cisneros', 2),
	(218, 'Ciénaga', 7),
	(219, 'Ciénaga', 20),
	(220, 'Ciénaga de Oro', 14),
	(221, 'Clemencia', 6),
	(222, 'Cocorná', 2),
	(223, 'Coello', 30),
	(224, 'Cogua', 15),
	(225, 'Colombia', 18),
	(226, 'Colosó (Ricaurte)', 29),
	(227, 'Colón', 24),
	(228, 'Colón (Génova)', 22),
	(229, 'Concepción', 2),
	(230, 'Concepción', 28),
	(231, 'Concordia', 2),
	(232, 'Concordia', 20),
	(233, 'Condoto', 13),
	(234, 'Confines', 28),
	(235, 'Consaca', 22),
	(236, 'Contadero', 22),
	(237, 'Contratación', 28),
	(238, 'Convención', 23),
	(239, 'Copacabana', 2),
	(240, 'Coper', 7),
	(241, 'Cordobá', 25),
	(242, 'Corinto', 11),
	(243, 'Coromoro', 28),
	(244, 'Corozal', 29),
	(245, 'Corrales', 7),
	(246, 'Cota', 15),
	(247, 'Cotorra', 14),
	(248, 'Covarachía', 7),
	(249, 'Coveñas', 29),
	(250, 'Coyaima', 30),
	(251, 'Cravo Norte', 3),
	(252, 'Cuaspud (Carlosama)', 22),
	(253, 'Cubarral', 21),
	(254, 'Cubará', 7),
	(255, 'Cucaita', 7),
	(256, 'Cucunubá', 15),
	(257, 'Cucutilla', 23),
	(258, 'Cuitiva', 7),
	(259, 'Cumaral', 21),
	(260, 'Cumaribo', 33),
	(261, 'Cumbal', 22),
	(262, 'Cumbitara', 22),
	(263, 'Cunday', 30),
	(264, 'Curillo', 9),
	(265, 'Curití', 28),
	(266, 'Curumaní', 12),
	(267, 'Cáceres', 2),
	(268, 'Cáchira', 23),
	(269, 'Cácota', 23),
	(270, 'Cáqueza', 15),
	(271, 'Cértegui', 13),
	(272, 'Cómbita', 7),
	(273, 'Córdoba', 6),
	(274, 'Córdoba', 22),
	(275, 'Cúcuta', 23),
	(276, 'Dabeiba', 2),
	(277, 'Dagua', 31),
	(278, 'Dibulla', 19),
	(279, 'Distracción', 19),
	(280, 'Dolores', 30),
	(281, 'Don Matías', 2),
	(282, 'Dos Quebradas', 26),
	(283, 'Duitama', 7),
	(284, 'Durania', 23),
	(285, 'Ebéjico', 2),
	(286, 'El Bagre', 2),
	(287, 'El Banco', 20),
	(288, 'El Cairo', 31),
	(289, 'El Calvario', 21),
	(290, 'El Carmen', 23),
	(291, 'El Carmen', 28),
	(292, 'El Carmen de Atrato', 13),
	(293, 'El Carmen de Bolívar', 6),
	(294, 'El Castillo', 21),
	(295, 'El Cerrito', 31),
	(296, 'El Charco', 22),
	(297, 'El Cocuy', 7),
	(298, 'El Colegio', 15),
	(299, 'El Copey', 12),
	(300, 'El Doncello', 9),
	(301, 'El Dorado', 21),
	(302, 'El Dovio', 31),
	(303, 'El Espino', 7),
	(304, 'El Guacamayo', 28),
	(305, 'El Guamo', 6),
	(306, 'El Molino', 19),
	(307, 'El Paso', 12),
	(308, 'El Paujil', 9),
	(309, 'El Peñol', 22),
	(310, 'El Peñon', 6),
	(311, 'El Peñon', 28),
	(312, 'El Peñón', 15),
	(313, 'El Piñon', 20),
	(314, 'El Playón', 28),
	(315, 'El Retorno', 17),
	(316, 'El Retén', 20),
	(317, 'El Roble', 29),
	(318, 'El Rosal', 15),
	(319, 'El Rosario', 22),
	(320, 'El Tablón de Gómez', 22),
	(321, 'El Tambo', 11),
	(322, 'El Tambo', 22),
	(323, 'El Tarra', 23),
	(324, 'El Zulia', 23),
	(325, 'El Águila', 31),
	(326, 'Elías', 18),
	(327, 'Encino', 28),
	(328, 'Enciso', 28),
	(329, 'Entrerríos', 2),
	(330, 'Envigado', 2),
	(331, 'Espinal', 30),
	(332, 'Facatativá', 15),
	(333, 'Falan', 30),
	(334, 'Filadelfia', 8),
	(335, 'Filandia', 25),
	(336, 'Firavitoba', 7),
	(337, 'Flandes', 30),
	(338, 'Florencia', 9),
	(339, 'Florencia', 11),
	(340, 'Floresta', 7),
	(341, 'Florida', 31),
	(342, 'Floridablanca', 28),
	(343, 'Florián', 28),
	(344, 'Fonseca', 19),
	(345, 'Fortúl', 3),
	(346, 'Fosca', 15),
	(347, 'Francisco Pizarro', 22),
	(348, 'Fredonia', 2),
	(349, 'Fresno', 30),
	(350, 'Frontino', 2),
	(351, 'Fuente de Oro', 21),
	(352, 'Fundación', 20),
	(353, 'Funes', 22),
	(354, 'Funza', 15),
	(355, 'Fusagasugá', 15),
	(356, 'Fómeque', 15),
	(357, 'Fúquene', 15),
	(358, 'Gachalá', 15),
	(359, 'Gachancipá', 15),
	(360, 'Gachantivá', 7),
	(361, 'Gachetá', 15),
	(362, 'Galapa', 4),
	(363, 'Galeras (Nueva Granada)', 29),
	(364, 'Galán', 28),
	(365, 'Gama', 15),
	(366, 'Gamarra', 12),
	(367, 'Garagoa', 7),
	(368, 'Garzón', 18),
	(369, 'Gigante', 18),
	(370, 'Ginebra', 31),
	(371, 'Giraldo', 2),
	(372, 'Girardot', 15),
	(373, 'Girardota', 2),
	(374, 'Girón', 28),
	(375, 'Gonzalez', 12),
	(376, 'Gramalote', 23),
	(377, 'Granada', 2),
	(378, 'Granada', 15),
	(379, 'Granada', 21),
	(380, 'Guaca', 28),
	(381, 'Guacamayas', 7),
	(382, 'Guacarí', 31),
	(383, 'Guachavés', 22),
	(384, 'Guachené', 11),
	(385, 'Guachetá', 15),
	(386, 'Guachucal', 22),
	(387, 'Guadalupe', 2),
	(388, 'Guadalupe', 18),
	(389, 'Guadalupe', 28),
	(390, 'Guaduas', 15),
	(391, 'Guaitarilla', 22),
	(392, 'Gualmatán', 22),
	(393, 'Guamal', 20),
	(394, 'Guamal', 21),
	(395, 'Guamo', 30),
	(396, 'Guapota', 28),
	(397, 'Guapí', 11),
	(398, 'Guaranda', 29),
	(399, 'Guarne', 2),
	(400, 'Guasca', 15),
	(401, 'Guatapé', 2),
	(402, 'Guataquí', 15),
	(403, 'Guatavita', 15),
	(404, 'Guateque', 7),
	(405, 'Guavatá', 28),
	(406, 'Guayabal de Siquima', 15),
	(407, 'Guayabetal', 15),
	(408, 'Guayatá', 7),
	(409, 'Guepsa', 28),
	(410, 'Guicán', 7),
	(411, 'Gutiérrez', 15),
	(412, 'Guática', 26),
	(413, 'Gámbita', 28),
	(414, 'Gámeza', 7),
	(415, 'Génova', 25),
	(416, 'Gómez Plata', 2),
	(417, 'Hacarí', 23),
	(418, 'Hatillo de Loba', 6),
	(419, 'Hato', 28),
	(420, 'Hato Corozal', 10),
	(421, 'Hatonuevo', 19),
	(422, 'Heliconia', 2),
	(423, 'Herrán', 23),
	(424, 'Herveo', 30),
	(425, 'Hispania', 2),
	(426, 'Hobo', 18),
	(427, 'Honda', 30),
	(428, 'Ibagué', 30),
	(429, 'Icononzo', 30),
	(430, 'Iles', 22),
	(431, 'Imúes', 22),
	(432, 'Inzá', 11),
	(433, 'Inírida', 16),
	(434, 'Ipiales', 22),
	(435, 'Isnos', 18),
	(436, 'Istmina', 13),
	(437, 'Itagüí', 2),
	(438, 'Ituango', 2),
	(439, 'Izá', 7),
	(440, 'Jambaló', 11),
	(441, 'Jamundí', 31),
	(442, 'Jardín', 2),
	(443, 'Jenesano', 7),
	(444, 'Jericó', 2),
	(445, 'Jericó', 7),
	(446, 'Jerusalén', 15),
	(447, 'Jesús María', 28),
	(448, 'Jordán', 28),
	(449, 'Juan de Acosta', 4),
	(450, 'Junín', 15),
	(451, 'Juradó', 13),
	(452, 'La Apartada y La Frontera', 14),
	(453, 'La Argentina', 18),
	(454, 'La Belleza', 28),
	(455, 'La Calera', 15),
	(456, 'La Capilla', 7),
	(457, 'La Ceja', 2),
	(458, 'La Celia', 26),
	(459, 'La Cruz', 22),
	(460, 'La Cumbre', 31),
	(461, 'La Dorada', 8),
	(462, 'La Esperanza', 23),
	(463, 'La Estrella', 2),
	(464, 'La Florida', 22),
	(465, 'La Gloria', 12),
	(466, 'La Jagua de Ibirico', 12),
	(467, 'La Jagua del Pilar', 19),
	(468, 'La Llanada', 22),
	(469, 'La Macarena', 21),
	(470, 'La Merced', 8),
	(471, 'La Mesa', 15),
	(472, 'La Montañita', 9),
	(473, 'La Palma', 15),
	(474, 'La Paz', 28),
	(475, 'La Paz (Robles)', 12),
	(476, 'La Peña', 15),
	(477, 'La Pintada', 2),
	(478, 'La Plata', 18),
	(479, 'La Playa', 23),
	(480, 'La Primavera', 33),
	(481, 'La Salina', 10),
	(482, 'La Sierra', 11),
	(483, 'La Tebaida', 25),
	(484, 'La Tola', 22),
	(485, 'La Unión', 2),
	(486, 'La Unión', 22),
	(487, 'La Unión', 29),
	(488, 'La Unión', 31),
	(489, 'La Uvita', 7),
	(490, 'La Vega', 11),
	(491, 'La Vega', 15),
	(492, 'La Victoria', 7),
	(493, 'La Victoria', 8),
	(494, 'La Victoria', 31),
	(495, 'La Virginia', 26),
	(496, 'Labateca', 23),
	(497, 'Labranzagrande', 7),
	(498, 'Landázuri', 28),
	(499, 'Lebrija', 28),
	(500, 'Leiva', 22),
	(501, 'Lejanías', 21),
	(502, 'Lenguazaque', 15),
	(503, 'Leticia', 1),
	(504, 'Liborina', 2),
	(505, 'Linares', 22),
	(506, 'Lloró', 13),
	(507, 'Lorica', 14),
	(508, 'Los Córdobas', 14),
	(509, 'Los Palmitos', 29),
	(510, 'Los Patios', 23),
	(511, 'Los Santos', 28),
	(512, 'Lourdes', 23),
	(513, 'Luruaco', 4),
	(514, 'Lérida', 30),
	(515, 'Líbano', 30),
	(516, 'López (Micay)', 11),
	(517, 'Macanal', 7),
	(518, 'Macaravita', 28),
	(519, 'Maceo', 2),
	(520, 'Machetá', 15),
	(521, 'Madrid', 15),
	(522, 'Magangué', 6),
	(523, 'Magüi (Payán)', 22),
	(524, 'Mahates', 6),
	(525, 'Maicao', 19),
	(526, 'Majagual', 29),
	(527, 'Malambo', 4),
	(528, 'Mallama (Piedrancha)', 22),
	(529, 'Manatí', 4),
	(530, 'Manaure', 19),
	(531, 'Manaure Balcón del Cesar', 12),
	(532, 'Manizales', 8),
	(533, 'Manta', 15),
	(534, 'Manzanares', 8),
	(535, 'Maní', 10),
	(536, 'Mapiripan', 21),
	(537, 'Margarita', 6),
	(538, 'Marinilla', 2),
	(539, 'Maripí', 7),
	(540, 'Mariquita', 30),
	(541, 'Marmato', 8),
	(542, 'Marquetalia', 8),
	(543, 'Marsella', 26),
	(544, 'Marulanda', 8),
	(545, 'María la Baja', 6),
	(546, 'Matanza', 28),
	(547, 'Medellín', 2),
	(548, 'Medina', 15),
	(549, 'Medio Atrato', 13),
	(550, 'Medio Baudó', 13),
	(551, 'Medio San Juan (ANDAGOYA)', 13),
	(552, 'Melgar', 30),
	(553, 'Mercaderes', 11),
	(554, 'Mesetas', 21),
	(555, 'Milán', 9),
	(556, 'Miraflores', 7),
	(557, 'Miraflores', 17),
	(558, 'Miranda', 11),
	(559, 'Mistrató', 26),
	(560, 'Mitú', 32),
	(561, 'Mocoa', 24),
	(562, 'Mogotes', 28),
	(563, 'Molagavita', 28),
	(564, 'Momil', 14),
	(565, 'Mompós', 6),
	(566, 'Mongua', 7),
	(567, 'Monguí', 7),
	(568, 'Moniquirá', 7),
	(569, 'Montebello', 2),
	(570, 'Montecristo', 6),
	(571, 'Montelíbano', 14),
	(572, 'Montenegro', 25),
	(573, 'Monteria', 14),
	(574, 'Monterrey', 10),
	(575, 'Morales', 6),
	(576, 'Morales', 11),
	(577, 'Morelia', 9),
	(578, 'Morroa', 29),
	(579, 'Mosquera', 15),
	(580, 'Mosquera', 22),
	(581, 'Motavita', 7),
	(582, 'Moñitos', 14),
	(583, 'Murillo', 30),
	(584, 'Murindó', 2),
	(585, 'Mutatá', 2),
	(586, 'Mutiscua', 23),
	(587, 'Muzo', 7),
	(588, 'Málaga', 28),
	(589, 'Nariño', 2),
	(590, 'Nariño', 15),
	(591, 'Nariño', 22),
	(592, 'Natagaima', 30),
	(593, 'Nechí', 2),
	(594, 'Necoclí', 2),
	(595, 'Neira', 8),
	(596, 'Neiva', 18),
	(597, 'Nemocón', 15),
	(598, 'Nilo', 15),
	(599, 'Nimaima', 15),
	(600, 'Nobsa', 7),
	(601, 'Nocaima', 15),
	(602, 'Norcasia', 8),
	(603, 'Norosí', 6),
	(604, 'Novita', 13),
	(605, 'Nueva Granada', 20),
	(606, 'Nuevo Colón', 7),
	(607, 'Nunchía', 10),
	(608, 'Nuquí', 13),
	(609, 'Nátaga', 18),
	(610, 'Obando', 31),
	(611, 'Ocamonte', 28),
	(612, 'Ocaña', 23),
	(613, 'Oiba', 28),
	(614, 'Oicatá', 7),
	(615, 'Olaya', 2),
	(616, 'Olaya Herrera', 22),
	(617, 'Onzaga', 28),
	(618, 'Oporapa', 18),
	(619, 'Orito', 24),
	(620, 'Orocué', 10),
	(621, 'Ortega', 30),
	(622, 'Ospina', 22),
	(623, 'Otanche', 7),
	(624, 'Ovejas', 29),
	(625, 'Pachavita', 7),
	(626, 'Pacho', 15),
	(627, 'Padilla', 11),
	(628, 'Paicol', 18),
	(629, 'Pailitas', 12),
	(630, 'Paime', 15),
	(631, 'Paipa', 7),
	(632, 'Pajarito', 7),
	(633, 'Palermo', 18),
	(634, 'Palestina', 8),
	(635, 'Palestina', 18),
	(636, 'Palmar', 28),
	(637, 'Palmar de Varela', 4),
	(638, 'Palmas del Socorro', 28),
	(639, 'Palmira', 31),
	(640, 'Palmito', 29),
	(641, 'Palocabildo', 30),
	(642, 'Pamplona', 23),
	(643, 'Pamplonita', 23),
	(644, 'Pandi', 15),
	(645, 'Panqueba', 7),
	(646, 'Paratebueno', 15),
	(647, 'Pasca', 15),
	(648, 'Patía (El Bordo)', 11),
	(649, 'Pauna', 7),
	(650, 'Paya', 7),
	(651, 'Paz de Ariporo', 10),
	(652, 'Paz de Río', 7),
	(653, 'Pedraza', 20),
	(654, 'Pelaya', 12),
	(655, 'Pensilvania', 8),
	(656, 'Peque', 2),
	(657, 'Pereira', 26),
	(658, 'Pesca', 7),
	(659, 'Peñol', 2),
	(660, 'Piamonte', 11),
	(661, 'Pie de Cuesta', 28),
	(662, 'Piedras', 30),
	(663, 'Piendamó', 11),
	(664, 'Pijao', 25),
	(665, 'Pijiño', 20),
	(666, 'Pinchote', 28),
	(667, 'Pinillos', 6),
	(668, 'Piojo', 4),
	(669, 'Pisva', 7),
	(670, 'Pital', 18),
	(671, 'Pitalito', 18),
	(672, 'Pivijay', 20),
	(673, 'Planadas', 30),
	(674, 'Planeta Rica', 14),
	(675, 'Plato', 20),
	(676, 'Policarpa', 22),
	(677, 'Polonuevo', 4),
	(678, 'Ponedera', 4),
	(679, 'Popayán', 11),
	(680, 'Pore', 10),
	(681, 'Potosí', 22),
	(682, 'Pradera', 31),
	(683, 'Prado', 30),
	(684, 'Providencia', 22),
	(685, 'Providencia', 27),
	(686, 'Pueblo Bello', 12),
	(687, 'Pueblo Nuevo', 14),
	(688, 'Pueblo Rico', 26),
	(689, 'Pueblorrico', 2),
	(690, 'Puebloviejo', 20),
	(691, 'Puente Nacional', 28),
	(692, 'Puerres', 22),
	(693, 'Puerto Asís', 24),
	(694, 'Puerto Berrío', 2),
	(695, 'Puerto Boyacá', 7),
	(696, 'Puerto Caicedo', 24),
	(697, 'Puerto Carreño', 33),
	(698, 'Puerto Colombia', 4),
	(699, 'Puerto Concordia', 21),
	(700, 'Puerto Escondido', 14),
	(701, 'Puerto Gaitán', 21),
	(702, 'Puerto Guzmán', 24),
	(703, 'Puerto Leguízamo', 24),
	(704, 'Puerto Libertador', 14),
	(705, 'Puerto Lleras', 21),
	(706, 'Puerto López', 21),
	(707, 'Puerto Nare', 2),
	(708, 'Puerto Nariño', 1),
	(709, 'Puerto Parra', 28),
	(710, 'Puerto Rico', 9),
	(711, 'Puerto Rico', 21),
	(712, 'Puerto Rondón', 3),
	(713, 'Puerto Salgar', 15),
	(714, 'Puerto Santander', 23),
	(715, 'Puerto Tejada', 11),
	(716, 'Puerto Triunfo', 2),
	(717, 'Puerto Wilches', 28),
	(718, 'Pulí', 15),
	(719, 'Pupiales', 22),
	(720, 'Puracé (Coconuco)', 11),
	(721, 'Purificación', 30),
	(722, 'Purísima', 14),
	(723, 'Pácora', 8),
	(724, 'Páez', 7),
	(725, 'Páez (Belalcazar)', 11),
	(726, 'Páramo', 28),
	(727, 'Quebradanegra', 15),
	(728, 'Quetame', 15),
	(729, 'Quibdó', 13),
	(730, 'Quimbaya', 25),
	(731, 'Quinchía', 26),
	(732, 'Quipama', 7),
	(733, 'Quipile', 15),
	(734, 'Ragonvalia', 23),
	(735, 'Ramiriquí', 7),
	(736, 'Recetor', 10),
	(737, 'Regidor', 6),
	(738, 'Remedios', 2),
	(739, 'Remolino', 20),
	(740, 'Repelón', 4),
	(741, 'Restrepo', 21),
	(742, 'Restrepo', 31),
	(743, 'Retiro', 2),
	(744, 'Ricaurte', 15),
	(745, 'Ricaurte', 22),
	(746, 'Rio Negro', 28),
	(747, 'Rioblanco', 30),
	(748, 'Riofrío', 31),
	(749, 'Riohacha', 19),
	(750, 'Risaralda', 8),
	(751, 'Rivera', 18),
	(752, 'Roberto Payán (San José)', 22),
	(753, 'Roldanillo', 31),
	(754, 'Roncesvalles', 30),
	(755, 'Rondón', 7),
	(756, 'Rosas', 11),
	(757, 'Rovira', 30),
	(758, 'Ráquira', 7),
	(759, 'Río Iró', 13),
	(760, 'Río Quito', 13),
	(761, 'Río Sucio', 8),
	(762, 'Río Viejo', 6),
	(763, 'Río de oro', 12),
	(764, 'Ríonegro', 2),
	(765, 'Ríosucio', 13),
	(766, 'Sabana de Torres', 28),
	(767, 'Sabanagrande', 4),
	(768, 'Sabanalarga', 2),
	(769, 'Sabanalarga', 4),
	(770, 'Sabanalarga', 10),
	(771, 'Sabanas de San Angel (SAN ANGEL)', 20),
	(772, 'Sabaneta', 2),
	(773, 'Saboyá', 7),
	(774, 'Sahagún', 14),
	(775, 'Saladoblanco', 18),
	(776, 'Salamina', 8),
	(777, 'Salamina', 20),
	(778, 'Salazar', 23),
	(779, 'Saldaña', 30),
	(780, 'Salento', 25),
	(781, 'Salgar', 2),
	(782, 'Samacá', 7),
	(783, 'Samaniego', 22),
	(784, 'Samaná', 8),
	(785, 'Sampués', 29),
	(786, 'San Agustín', 18),
	(787, 'San Alberto', 12),
	(788, 'San Andrés', 28),
	(789, 'San Andrés Sotavento', 14),
	(790, 'San Andrés de Cuerquía', 2),
	(791, 'San Antero', 14),
	(792, 'San Antonio', 30),
	(793, 'San Antonio de Tequendama', 15),
	(794, 'San Benito', 28),
	(795, 'San Benito Abad', 29),
	(796, 'San Bernardo', 15),
	(797, 'San Bernardo', 22),
	(798, 'San Bernardo del Viento', 14),
	(799, 'San Calixto', 23),
	(800, 'San Carlos', 2),
	(801, 'San Carlos', 14),
	(802, 'San Carlos de Guaroa', 21),
	(803, 'San Cayetano', 15),
	(804, 'San Cayetano', 23),
	(805, 'San Cristobal', 6),
	(806, 'San Diego', 12),
	(807, 'San Eduardo', 7),
	(808, 'San Estanislao', 6),
	(809, 'San Fernando', 6),
	(810, 'San Francisco', 2),
	(811, 'San Francisco', 15),
	(812, 'San Francisco', 24),
	(813, 'San Gíl', 28),
	(814, 'San Jacinto', 6),
	(815, 'San Jacinto del Cauca', 6),
	(816, 'San Jerónimo', 2),
	(817, 'San Joaquín', 28),
	(818, 'San José', 8),
	(819, 'San José de Miranda', 28),
	(820, 'San José de Montaña', 2),
	(821, 'San José de Pare', 7),
	(822, 'San José de Uré', 14),
	(823, 'San José del Fragua', 9),
	(824, 'San José del Guaviare', 17),
	(825, 'San José del Palmar', 13),
	(826, 'San Juan de Arama', 21),
	(827, 'San Juan de Betulia', 29),
	(828, 'San Juan de Nepomuceno', 6),
	(829, 'San Juan de Pasto', 22),
	(830, 'San Juan de Río Seco', 15),
	(831, 'San Juan de Urabá', 2),
	(832, 'San Juan del Cesar', 19),
	(833, 'San Juanito', 21),
	(834, 'San Lorenzo', 22),
	(835, 'San Luis', 30),
	(836, 'San Luís', 2),
	(837, 'San Luís de Gaceno', 7),
	(838, 'San Luís de Palenque', 10),
	(839, 'San Marcos', 29),
	(840, 'San Martín', 12),
	(841, 'San Martín', 21),
	(842, 'San Martín de Loba', 6),
	(843, 'San Mateo', 7),
	(844, 'San Miguel', 28),
	(845, 'San Miguel', 24),
	(846, 'San Miguel de Sema', 7),
	(847, 'San Onofre', 29),
	(848, 'San Pablo', 6),
	(849, 'San Pablo', 22),
	(850, 'San Pablo de Borbur', 7),
	(851, 'San Pedro', 2),
	(852, 'San Pedro', 29),
	(853, 'San Pedro', 31),
	(854, 'San Pedro de Cartago', 22),
	(855, 'San Pedro de Urabá', 2),
	(856, 'San Pelayo', 14),
	(857, 'San Rafael', 2),
	(858, 'San Roque', 2),
	(859, 'San Sebastián', 11),
	(860, 'San Sebastián de Buenavista', 20),
	(861, 'San Vicente', 2),
	(862, 'San Vicente del Caguán', 9),
	(863, 'San Vicente del Chucurí', 28),
	(864, 'San Zenón', 20),
	(865, 'Sandoná', 22),
	(866, 'Santa Ana', 20),
	(867, 'Santa Bárbara', 2),
	(868, 'Santa Bárbara', 28),
	(869, 'Santa Bárbara (Iscuandé)', 22),
	(870, 'Santa Bárbara de Pinto', 20),
	(871, 'Santa Catalina', 6),
	(872, 'Santa Fé de Antioquia', 2),
	(873, 'Santa Genoveva de Docorodó', 13),
	(874, 'Santa Helena del Opón', 28),
	(875, 'Santa Isabel', 30),
	(876, 'Santa Lucía', 4),
	(877, 'Santa Marta', 20),
	(878, 'Santa María', 7),
	(879, 'Santa María', 18),
	(880, 'Santa Rosa', 6),
	(881, 'Santa Rosa', 11),
	(882, 'Santa Rosa de Cabal', 26),
	(883, 'Santa Rosa de Osos', 2),
	(884, 'Santa Rosa de Viterbo', 7),
	(885, 'Santa Rosa del Sur', 6),
	(886, 'Santa Rosalía', 33),
	(887, 'Santa Sofía', 7),
	(888, 'Santana', 7),
	(889, 'Santander de Quilichao', 11),
	(890, 'Santiago', 23),
	(891, 'Santiago', 24),
	(892, 'Santo Domingo', 2),
	(893, 'Santo Tomás', 4),
	(894, 'Santuario', 2),
	(895, 'Santuario', 26),
	(896, 'Sapuyes', 22),
	(897, 'Saravena', 3),
	(898, 'Sardinata', 23),
	(899, 'Sasaima', 15),
	(900, 'Sativanorte', 7),
	(901, 'Sativasur', 7),
	(902, 'Segovia', 2),
	(903, 'Sesquilé', 15),
	(904, 'Sevilla', 31),
	(905, 'Siachoque', 7),
	(906, 'Sibaté', 15),
	(907, 'Sibundoy', 24),
	(908, 'Silos', 23),
	(909, 'Silvania', 15),
	(910, 'Silvia', 11),
	(911, 'Simacota', 28),
	(912, 'Simijaca', 15),
	(913, 'Simití', 6),
	(914, 'Sincelejo', 29),
	(915, 'Sincé', 29),
	(916, 'Sipí', 13),
	(917, 'Sitionuevo', 20),
	(918, 'Soacha', 15),
	(919, 'Soatá', 7),
	(920, 'Socha', 7),
	(921, 'Socorro', 28),
	(922, 'Socotá', 7),
	(923, 'Sogamoso', 7),
	(924, 'Solano', 9),
	(925, 'Soledad', 4),
	(926, 'Solita', 9),
	(927, 'Somondoco', 7),
	(928, 'Sonsón', 2),
	(929, 'Sopetrán', 2),
	(930, 'Soplaviento', 6),
	(931, 'Sopó', 15),
	(932, 'Sora', 7),
	(933, 'Soracá', 7),
	(934, 'Sotaquirá', 7),
	(935, 'Sotara (Paispamba)', 11),
	(936, 'Sotomayor (Los Andes)', 22),
	(937, 'Suaita', 28),
	(938, 'Suan', 4),
	(939, 'Suaza', 18),
	(940, 'Subachoque', 15),
	(941, 'Sucre', 11),
	(942, 'Sucre', 28),
	(943, 'Sucre', 29),
	(944, 'Suesca', 15),
	(945, 'Supatá', 15),
	(946, 'Supía', 8),
	(947, 'Suratá', 28),
	(948, 'Susa', 15),
	(949, 'Susacón', 7),
	(950, 'Sutamarchán', 7),
	(951, 'Sutatausa', 15),
	(952, 'Sutatenza', 7),
	(953, 'Suárez', 11),
	(954, 'Suárez', 30),
	(955, 'Sácama', 10),
	(956, 'Sáchica', 7),
	(957, 'Tabio', 15),
	(958, 'Tadó', 13),
	(959, 'Talaigua Nuevo', 6),
	(960, 'Tamalameque', 12),
	(961, 'Tame', 3),
	(962, 'Taminango', 22),
	(963, 'Tangua', 22),
	(964, 'Taraira', 32),
	(965, 'Tarazá', 2),
	(966, 'Tarqui', 18),
	(967, 'Tarso', 2),
	(968, 'Tasco', 7),
	(969, 'Tauramena', 10),
	(970, 'Tausa', 15),
	(971, 'Tello', 18),
	(972, 'Tena', 15),
	(973, 'Tenerife', 20),
	(974, 'Tenjo', 15),
	(975, 'Tenza', 7),
	(976, 'Teorama', 23),
	(977, 'Teruel', 18),
	(978, 'Tesalia', 18),
	(979, 'Tibacuy', 15),
	(980, 'Tibaná', 7),
	(981, 'Tibasosa', 7),
	(982, 'Tibirita', 15),
	(983, 'Tibú', 23),
	(984, 'Tierralta', 14),
	(985, 'Timaná', 18),
	(986, 'Timbiquí', 11),
	(987, 'Timbío', 11),
	(988, 'Tinjacá', 7),
	(989, 'Tipacoque', 7),
	(990, 'Tiquisio (Puerto Rico)', 6),
	(991, 'Titiribí', 2),
	(992, 'Toca', 7),
	(993, 'Tocaima', 15),
	(994, 'Tocancipá', 15),
	(995, 'Toguí', 7),
	(996, 'Toledo', 2),
	(997, 'Toledo', 23),
	(998, 'Tolú', 29),
	(999, 'Tolú Viejo', 29),
	(1000, 'Tona', 28),
	(1001, 'Topagá', 7),
	(1002, 'Topaipí', 15),
	(1003, 'Toribío', 11),
	(1004, 'Toro', 31),
	(1005, 'Tota', 7),
	(1006, 'Totoró', 11),
	(1007, 'Trinidad', 10),
	(1008, 'Trujillo', 31),
	(1009, 'Tubará', 4),
	(1010, 'Tuchín', 14),
	(1011, 'Tulúa', 31),
	(1012, 'Tumaco', 22),
	(1013, 'Tunja', 7),
	(1014, 'Tunungua', 7),
	(1015, 'Turbaco', 6),
	(1016, 'Turbaná', 6),
	(1017, 'Turbo', 2),
	(1018, 'Turmequé', 7),
	(1019, 'Tuta', 7),
	(1020, 'Tutasá', 7),
	(1021, 'Támara', 10),
	(1022, 'Támesis', 2),
	(1023, 'Túquerres', 22),
	(1024, 'Ubalá', 15),
	(1025, 'Ubaque', 15),
	(1026, 'Ubaté', 15),
	(1027, 'Ulloa', 31),
	(1028, 'Une', 15),
	(1029, 'Unguía', 13),
	(1030, 'Unión Panamericana (ÁNIMAS)', 13),
	(1031, 'Uramita', 2),
	(1032, 'Uribe', 21),
	(1033, 'Uribia', 19),
	(1034, 'Urrao', 2),
	(1035, 'Urumita', 19),
	(1036, 'Usiacuri', 4),
	(1037, 'Valdivia', 2),
	(1038, 'Valencia', 14),
	(1039, 'Valle de San José', 28),
	(1040, 'Valle de San Juan', 30),
	(1041, 'Valle del Guamuez', 24),
	(1042, 'Valledupar', 12),
	(1043, 'Valparaiso', 2),
	(1044, 'Valparaiso', 9),
	(1045, 'Vegachí', 2),
	(1046, 'Venadillo', 30),
	(1047, 'Venecia', 2),
	(1048, 'Venecia (Ospina Pérez)', 15),
	(1049, 'Ventaquemada', 7),
	(1050, 'Vergara', 15),
	(1051, 'Versalles', 31),
	(1052, 'Vetas', 28),
	(1053, 'Viani', 15),
	(1054, 'Vigía del Fuerte', 2),
	(1055, 'Vijes', 31),
	(1056, 'Villa Caro', 23),
	(1057, 'Villa Rica', 11),
	(1058, 'Villa de Leiva', 7),
	(1059, 'Villa del Rosario', 23),
	(1060, 'Villagarzón', 24),
	(1061, 'Villagómez', 15),
	(1062, 'Villahermosa', 30),
	(1063, 'Villamaría', 8),
	(1064, 'Villanueva', 6),
	(1065, 'Villanueva', 19),
	(1066, 'Villanueva', 28),
	(1067, 'Villanueva', 10),
	(1068, 'Villapinzón', 15),
	(1069, 'Villarrica', 30),
	(1070, 'Villavicencio', 21),
	(1071, 'Villavieja', 18),
	(1072, 'Villeta', 15),
	(1073, 'Viotá', 15),
	(1074, 'Viracachá', 7),
	(1075, 'Vista Hermosa', 21),
	(1076, 'Viterbo', 8),
	(1077, 'Vélez', 28),
	(1078, 'Yacopí', 15),
	(1079, 'Yacuanquer', 22),
	(1080, 'Yaguará', 18),
	(1081, 'Yalí', 2),
	(1082, 'Yarumal', 2),
	(1083, 'Yolombó', 2),
	(1084, 'Yondó (Casabe)', 2),
	(1085, 'Yopal', 10),
	(1086, 'Yotoco', 31),
	(1087, 'Yumbo', 31),
	(1088, 'Zambrano', 6),
	(1089, 'Zapatoca', 28),
	(1090, 'Zapayán (PUNTA DE PIEDRAS)', 20),
	(1091, 'Zaragoza', 2),
	(1092, 'Zarzal', 31),
	(1093, 'Zetaquirá', 7),
	(1094, 'Zipacón', 15),
	(1095, 'Zipaquirá', 15),
	(1096, 'Zona Bananera (PRADO - SEVILLA)', 20),
	(1097, 'Ábrego', 23),
	(1098, 'Íquira', 18),
	(1099, 'Úmbita', 7),
	(1100, 'Útica', 15);
/*!40000 ALTER TABLE `geo_citys` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.geo_departments
CREATE TABLE IF NOT EXISTS `geo_departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.geo_departments: ~33 rows (aproximadamente)
DELETE FROM `geo_departments`;
/*!40000 ALTER TABLE `geo_departments` DISABLE KEYS */;
INSERT INTO `geo_departments` (`id`, `code`, `name`) VALUES
	(1, '29', 'AMAZONAS'),
	(2, '1', 'ANTIOQUIA'),
	(3, '25', 'ARAUCA'),
	(4, '2', 'ATLÁNTICO'),
	(5, '3', 'BOGOTÁ, D.C.'),
	(6, '4', 'BOLÍVAR'),
	(7, '5', 'BOYACÁ'),
	(8, '6', 'CALDAS'),
	(9, '7', 'CAQUETÁ'),
	(10, '26', 'CASANARE'),
	(11, '8', 'CAUCA'),
	(12, '9', 'CESAR'),
	(13, '12', 'CHOCÓ'),
	(14, '10', 'CÓRDOBA'),
	(15, '11', 'CUNDINAMARCA'),
	(16, '30', 'GUAINÍA'),
	(17, '31', 'GUAVIARE'),
	(18, '13', 'HUILA'),
	(19, '14', 'LA GUAJIRA'),
	(20, '15', 'MAGDALENA'),
	(21, '16', 'META'),
	(22, '17', 'NARIÑO'),
	(23, '18', 'NORTE DE SANTANDER'),
	(24, '27', 'PUTUMAYO'),
	(25, '19', 'QUINDIO'),
	(26, '20', 'RISARALDA'),
	(27, '28', 'SAN ANDRÉS Y  PROVIDENCIA'),
	(28, '21', 'SANTANDER'),
	(29, '22', 'SUCRE'),
	(30, '23', 'TOLIMA'),
	(31, '24', 'VALLE DEL CAUCA'),
	(32, '32', 'VAUPÉS'),
	(33, '33', 'VICHADA');
/*!40000 ALTER TABLE `geo_departments` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.inventories
CREATE TABLE IF NOT EXISTS `inventories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.inventories: ~2 rows (aproximadamente)
DELETE FROM `inventories`;
/*!40000 ALTER TABLE `inventories` DISABLE KEYS */;
INSERT INTO `inventories` (`id`, `name`) VALUES
	(1, 'Sin Parametrizar'),
	(2, 'Todos los recursos');
/*!40000 ALTER TABLE `inventories` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.inventories_resources
CREATE TABLE IF NOT EXISTS `inventories_resources` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `inventory` int(11) DEFAULT NULL,
  `name` varchar(250) NOT NULL,
  `price` float NOT NULL DEFAULT '0',
  `medition` int(11) DEFAULT NULL,
  `update_limit` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_inventories_resources_inventories` (`inventory`),
  KEY `FK_inventories_resources_types_meditions` (`medition`),
  CONSTRAINT `FK_inventories_resources_inventories` FOREIGN KEY (`inventory`) REFERENCES `inventories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_inventories_resources_types_meditions` FOREIGN KEY (`medition`) REFERENCES `types_meditions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.inventories_resources: ~2 rows (aproximadamente)
DELETE FROM `inventories_resources`;
/*!40000 ALTER TABLE `inventories_resources` DISABLE KEYS */;
INSERT INTO `inventories_resources` (`id`, `inventory`, `name`, `price`, `medition`, `update_limit`) VALUES
	(1, 2, 'Recurso 1 - No se a ingresado', 1000, 1, NULL),
	(2, 2, 'Recurso 2 - Detectado - Fuera de Fecha', 2000, 1, '{"day": 0, "year": 0, "hours": 0, "month": 0, "minutes": 0, "seconds": 0, "milliseconds": 1}'),
	(3, 2, 'Recurso 2 - Detectado - Fecha OK', 2500, 1, '{"day": 0, "year": 1, "hours": 0, "month": 0, "minutes": 0, "seconds": 0, "milliseconds": 0}');
/*!40000 ALTER TABLE `inventories_resources` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `data` json NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.permissions: ~1 rows (aproximadamente)
DELETE FROM `permissions`;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` (`id`, `name`, `data`) VALUES
	(1, 'Default', '{"accounts": {"view": true, "change": true, "create": true, "delete": true}, "calendar": {"view": true, "change": true, "create": true, "delete": true}, "contacts": {"view": true, "change": true, "create": true, "delete": true}, "requests": {"view": true, "change": true, "create": true, "delete": true}, "addresses": {"view": true, "change": true, "create": true, "delete": true}, "employees": {"view": true, "change": true, "create": true, "delete": true}, "inventary": {"view": true, "change": true, "create": true, "delete": true}, "quotations": {"view": true, "change": true, "create": true, "delete": true}}');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.pictures
CREATE TABLE IF NOT EXISTS `pictures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `size` int(32) NOT NULL,
  `data` mediumblob NOT NULL,
  `type` varchar(50) NOT NULL,
  `create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla admin_mv1.pictures: ~2 rows (aproximadamente)
DELETE FROM `pictures`;
/*!40000 ALTER TABLE `pictures` DISABLE KEYS */;
INSERT INTO `pictures` (`id`, `name`, `size`, `data`, `type`, `create`) VALUES
INSERT INTO `pictures` (`id`, `name`, `size`, `data`, `type`, `create`) VALUES
/*!40000 ALTER TABLE `pictures` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.quotations
CREATE TABLE IF NOT EXISTS `quotations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` int(11) NOT NULL,
  `request` int(11) NOT NULL,
  `values` json NOT NULL,
  `status` int(1) DEFAULT '0',
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `validity` int(4) DEFAULT '0',
  `accept` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_quotations_clients_clients` (`account`),
  KEY `FK_quotations_clients_accounts_clients` (`request`),
  KEY `FK_quotations_clients_status_quotations` (`status`),
  CONSTRAINT `FK_af_quotations_af_requests` FOREIGN KEY (`request`) REFERENCES `requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `quotations_ibfk_1` FOREIGN KEY (`status`) REFERENCES `status_quotations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `quotations_ibfk_3` FOREIGN KEY (`account`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.quotations: ~0 rows (aproximadamente)
DELETE FROM `quotations`;
/*!40000 ALTER TABLE `quotations` DISABLE KEYS */;
/*!40000 ALTER TABLE `quotations` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.repeats_services
CREATE TABLE IF NOT EXISTS `repeats_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `code` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.repeats_services: ~6 rows (aproximadamente)
DELETE FROM `repeats_services`;
/*!40000 ALTER TABLE `repeats_services` DISABLE KEYS */;
INSERT INTO `repeats_services` (`id`, `name`, `code`) VALUES
	(1, 'SIN REPETICION', 'NONE'),
	(2, '1 VEZ X MES', 'PMES'),
	(3, '1 VEZ X CATORCENA', 'PCAT'),
	(4, '1 VEZ X QUINCENA', 'PQUI'),
	(5, '1 VEZ X SEMANA', 'PSEM'),
	(6, '1 VEZ X DECADA', 'PDDD');
/*!40000 ALTER TABLE `repeats_services` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.requests
CREATE TABLE IF NOT EXISTS `requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) unsigned DEFAULT '1',
  `account` int(11) NOT NULL,
  `contact` int(11) DEFAULT NULL,
  `request_notes` mediumtext,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_requests_accounts` (`account`),
  KEY `FK_requests_contacts` (`contact`),
  KEY `FK_requests_status_requests` (`status`),
  CONSTRAINT `FK_requests_accounts` FOREIGN KEY (`account`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_requests_contacts` FOREIGN KEY (`contact`) REFERENCES `contacts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_requests_status_requests` FOREIGN KEY (`status`) REFERENCES `status_requests` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.requests: ~0 rows (aproximadamente)
DELETE FROM `requests`;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` (`id`, `status`, `account`, `contact`, `request_notes`, `created`, `updated`) VALUES
	(9, 1, 4, 1, 'Esta es una solicitud de pruebas creadas por el desarrollador, no debe ser manipulada bajo ninguna circunstancia.\r\n\r\nThis is a request for tests created by the developer, should not be manipulated under any circumstances.', '2019-06-29 14:52:58', '2019-06-29 16:44:21'),
	(10, 1, 4, 1, '', '2019-06-29 23:06:15', '2019-06-29 23:06:15');
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.requests_activity
CREATE TABLE IF NOT EXISTS `requests_activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `request` int(11) NOT NULL,
  `comment` mediumtext,
  `code` json DEFAULT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_id` (`id`),
  KEY `id` (`id`),
  KEY `FK_requests_activity_requests` (`request`),
  CONSTRAINT `FK_requests_activity_requests` FOREIGN KEY (`request`) REFERENCES `requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.requests_activity: ~2 rows (aproximadamente)
DELETE FROM `requests_activity`;
/*!40000 ALTER TABLE `requests_activity` DISABLE KEYS */;
/*!40000 ALTER TABLE `requests_activity` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.requests_addresses
CREATE TABLE IF NOT EXISTS `requests_addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `request` int(11) NOT NULL,
  `address` int(11) NOT NULL,
  `calendar` int(11) DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_requests_addresses_addresses` (`address`),
  KEY `FK_requests_addresses_requests` (`request`),
  KEY `FK_requests_addresses_events` (`calendar`),
  CONSTRAINT `FK_requests_addresses_addresses` FOREIGN KEY (`address`) REFERENCES `addresses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_requests_addresses_events` FOREIGN KEY (`calendar`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_requests_addresses_requests` FOREIGN KEY (`request`) REFERENCES `requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.requests_addresses: ~3 rows (aproximadamente)
DELETE FROM `requests_addresses`;
/*!40000 ALTER TABLE `requests_addresses` DISABLE KEYS */;
INSERT INTO `requests_addresses` (`id`, `request`, `address`, `calendar`, `created`, `updated`) VALUES
	(21, 9, 15, NULL, '2019-06-29 14:52:58', '2019-06-29 14:52:58'),
	(22, 10, 15, NULL, '2019-06-29 23:06:15', '2019-06-29 23:06:15'),
	(23, 10, 18, NULL, '2019-06-29 23:06:15', '2019-06-29 23:06:15');
/*!40000 ALTER TABLE `requests_addresses` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.requests_addresses_services
CREATE TABLE IF NOT EXISTS `requests_addresses_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `request_address` int(11) NOT NULL,
  `service` int(11) DEFAULT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_requests_addresses_services_requests_addresses` (`request_address`),
  KEY `FK_requests_addresses_services_services` (`service`),
  CONSTRAINT `FK_requests_addresses_services_requests_addresses` FOREIGN KEY (`request_address`) REFERENCES `requests_addresses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_requests_addresses_services_services` FOREIGN KEY (`service`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.requests_addresses_services: ~13 rows (aproximadamente)
DELETE FROM `requests_addresses_services`;
/*!40000 ALTER TABLE `requests_addresses_services` DISABLE KEYS */;
INSERT INTO `requests_addresses_services` (`id`, `request_address`, `service`, `created`, `updated`) VALUES
	(56, 21, 1, '2019-06-29 14:52:58', '2019-06-29 14:52:58'),
	(57, 21, 3, '2019-06-29 14:52:58', '2019-06-29 14:52:58'),
	(58, 21, 5, '2019-06-29 14:52:58', '2019-06-29 14:52:58'),
	(59, 21, 4, '2019-06-29 14:52:58', '2019-06-29 14:52:58'),
	(60, 21, 6, '2019-06-29 14:52:58', '2019-06-29 14:52:58'),
	(61, 22, 3, '2019-06-29 23:06:15', '2019-06-29 23:06:15'),
	(62, 22, 4, '2019-06-29 23:06:15', '2019-06-29 23:06:15'),
	(63, 22, 5, '2019-06-29 23:06:15', '2019-06-29 23:06:15'),
	(64, 22, 6, '2019-06-29 23:06:15', '2019-06-29 23:06:15'),
	(65, 23, 4, '2019-06-29 23:06:16', '2019-06-29 23:06:16'),
	(66, 23, 3, '2019-06-29 23:06:16', '2019-06-29 23:06:16'),
	(67, 23, 5, '2019-06-29 23:06:16', '2019-06-29 23:06:16'),
	(68, 23, 6, '2019-06-29 23:06:16', '2019-06-29 23:06:16');
/*!40000 ALTER TABLE `requests_addresses_services` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.salaries
CREATE TABLE IF NOT EXISTS `salaries` (
  `id` int(11) NOT NULL,
  `employee` int(11) NOT NULL,
  `salary` int(11) NOT NULL,
  `from_date` date DEFAULT NULL,
  `to_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_salaries_employees` (`employee`),
  CONSTRAINT `FK_salaries_employees` FOREIGN KEY (`employee`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.salaries: ~0 rows (aproximadamente)
DELETE FROM `salaries`;
/*!40000 ALTER TABLE `salaries` DISABLE KEYS */;
/*!40000 ALTER TABLE `salaries` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.services
CREATE TABLE IF NOT EXISTS `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `inventary_required` int(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.services: ~6 rows (aproximadamente)
DELETE FROM `services`;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` (`id`, `name`, `description`, `price`, `inventary_required`) VALUES
	(1, 'Producto 1', 'Descripcion simple sobre el producto', 1000, 0),
	(2, 'Producto 2', 'Descripcion simple sobre el servicio', 2000, 0),
	(3, 'Servicio 1 - SIN INV', 'Descripcion simple sobre el servicio', 5000, 0),
	(4, 'Servicio 2 - Parametrizado [Servicio sin parametrizar]', 'Descripcion simple sobre el servicio', 20000, 1),
	(5, 'Servicio 3 - Parametrizado [Servicio parametrizado] {Recurso sin parametrizar}', 'Descripcion simple sobre el servicio', 25000, 1),
	(6, 'Servicio 4 - Parametrizado [Servicio parametrizado] {Recurso parametrizado}', 'Descripcion simple sobre el servicio', 50000, 1);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.services_inventories_required
CREATE TABLE IF NOT EXISTS `services_inventories_required` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_services_inventary_required_services` (`service`),
  KEY `FK_services_inventories_required_types_inventories` (`type`),
  CONSTRAINT `FK_services_inventary_required_services` FOREIGN KEY (`service`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_services_inventories_required_types_inventories` FOREIGN KEY (`type`) REFERENCES `inventories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.services_inventories_required: ~2 rows (aproximadamente)
DELETE FROM `services_inventories_required`;
/*!40000 ALTER TABLE `services_inventories_required` DISABLE KEYS */;
INSERT INTO `services_inventories_required` (`id`, `service`, `type`) VALUES
	(2, 6, 2),
	(5, 5, 1);
/*!40000 ALTER TABLE `services_inventories_required` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.status_employees
CREATE TABLE IF NOT EXISTS `status_employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.status_employees: ~6 rows (aproximadamente)
DELETE FROM `status_employees`;
/*!40000 ALTER TABLE `status_employees` DISABLE KEYS */;
INSERT INTO `status_employees` (`id`, `name`) VALUES
	(1, 'Aspirante'),
	(2, 'Esperando Documentos'),
	(3, 'Confirmando Información'),
	(4, 'Esperando Firma'),
	(5, 'Activo'),
	(6, 'En Vacaciones'),
	(7, 'Retirado');
/*!40000 ALTER TABLE `status_employees` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.status_events
CREATE TABLE IF NOT EXISTS `status_events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.status_events: ~0 rows (aproximadamente)
DELETE FROM `status_events`;
/*!40000 ALTER TABLE `status_events` DISABLE KEYS */;
INSERT INTO `status_events` (`id`, `name`) VALUES
	(1, 'Esperando Asignacion de personal');
/*!40000 ALTER TABLE `status_events` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.status_invoices
CREATE TABLE IF NOT EXISTS `status_invoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.status_invoices: ~0 rows (aproximadamente)
DELETE FROM `status_invoices`;
/*!40000 ALTER TABLE `status_invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `status_invoices` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.status_quotations
CREATE TABLE IF NOT EXISTS `status_quotations` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `request_status_continue` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.status_quotations: ~3 rows (aproximadamente)
DELETE FROM `status_quotations`;
/*!40000 ALTER TABLE `status_quotations` DISABLE KEYS */;
INSERT INTO `status_quotations` (`id`, `name`, `request_status_continue`) VALUES
	(0, 'Pre-Aprobado', 4),
	(1, 'Aprobado', 5),
	(2, 'No Aprobada', 9);
/*!40000 ALTER TABLE `status_quotations` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.status_requests
CREATE TABLE IF NOT EXISTS `status_requests` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.status_requests: ~8 rows (aproximadamente)
DELETE FROM `status_requests`;
/*!40000 ALTER TABLE `status_requests` DISABLE KEYS */;
INSERT INTO `status_requests` (`id`, `name`) VALUES
	(7, 'Cancelada'),
	(9, 'Completada'),
	(5, 'En Progreso'),
	(3, 'Esperando Propuesta'),
	(4, 'Esperando Respuesta Cliente'),
	(2, 'Esperando Visita'),
	(8, 'Re Activada'),
	(1, 'Solicitud Generada'),
	(6, 'Suspendida');
/*!40000 ALTER TABLE `status_requests` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.sys_config_options
CREATE TABLE IF NOT EXISTS `sys_config_options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `result` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE name` (`name`),
  KEY `id` (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.sys_config_options: ~2 rows (aproximadamente)
DELETE FROM `sys_config_options`;
/*!40000 ALTER TABLE `sys_config_options` DISABLE KEYS */;
INSERT INTO `sys_config_options` (`id`, `name`, `result`) VALUES
	(1, 'proposalLetter', 'Medellin, {dayCreate} de {monthCreate} de {yearCreate} \r\n\r\n\r\nSeñor(a):\r\n{ContactFullName}\r\n{FullNameClient}\r\n{CityClient}, {DepartmentClient}\r\n\r\n\r\nAsunto: Respuesta Solicitud {NumberReq}.\r\n\r\n\r\nCordial saludo,\r\n\r\nNos permitimos dar respuesta a tu solicitud {NumberReq} para los Servicios: {LabelsServices}, la siguiente propuesta está registrada bajo el número {NumberRef}.\r\n\r\nEn Monteverde, contamos con la experiencia certificada de más de {YearsCompany} años en Servicios de {LabelsServices}, con infraestructura y equipo humano altamente capacitados para apoyar la Gestión de Proyectos Ambientales y Forestales. Nuestro compromiso es dar cumplimiento a la ley, aportar valor estético y generar conciencia en el cuidado de nuestros recursos naturales, teniendo en cuenta por encima de todo la seguridad tanto de nuestro personal, nuestros clientes y la comunidad en general.\r\n\r\nAgradeciendo su interés y con el fin de entablar relaciones comerciales de mutuo beneficio.\r\n\r\nCordialmente,\r\n'),
	(2, 'TermsAndConditions', 'TERMINOS Y CONDICIONES SERVICIOS AMBIENTALES Y FORESTALES MONTEVERDE LTDA. \r\n\r\nSERVICIOS AMBIENTALES Y FORESTALES MONTEVERDE LTDA, Con el objetivo de  brindarle un mejor servicio y atender a sus solicitudes en tiempo y forma ha establecido los siguientes términos y condiciones, por favor lea cuidadosamente y de surgir cualquier inquietud por favor infórmelo de manera inmediata para efectos de ser resuelta. \r\n \r\nCotizaciones: Las cotizaciones escritas tendrán vigencia de hasta 90 días corridos según como se indique en la parte inferior del total, dentro de los cuales quedarán sujetas a modificaciones con previo aviso o podrá ser anulada anticipadamente mediante una notificación por escrito o digitalmente (SMS/EMAIL/MENSAJERIA INSTANTANEA). Una vez transcurrido el tiempo establecido los precios están sujetos a cambio sin previo aviso. En la cotización usted encontrará expresamente descritos y desglosados todos los servicios y/o productos que le ofreceremos, el tipo de medición para trabajo y el costo. Cualquier servicio que no haya sido cotizado no será efectuado. En caso de requerir un servicio adicional a los especificados deberá informarlo para efectos de ingresarlo en la respectiva cotización.  \r\n \r\nTotal Medida: La medición total del servicio es un estimado para el inicio del proyecto. Esta propuesta está sujeta a cambios ya que depende de la medición real en sitio, la cual se realiza una vez contratado el servicio. \r\n\r\nCotización de servicio mensual: Todos los servicios mensuales tienen un mínimo de 3 meses de contratación.\r\n \r\nSi desea contratar nuestros servicios deberá realizar un depósito mínimo del 10% del costo total incluyendo el IVA que establece su cotización y enviarnos copia de su comprobante de pago a xxxx@monteverdeltda.com. Esta cantidad no es reembolsable. A partir de la fecha del primer depósito se iniciará  la primera fase de las actividades acordadas.\r\n \r\nPropuestas de Diseño: Se entregará al cliente una propuesta de diseño realizada por un profesional y de acuerdo con las especificaciones y requerimientos que haya solicitado por escrito/verbal. En caso de que el cliente no esté satisfecho con la propuesta presentada, podrá solicitar una nueva propuesta indicando los cambios que desea realizar. El cliente puede seleccionar un diseño y solicitar modificaciones en color, ubicación de módulos y cambios de imágenes. Si el cliente solicita una tercera propuesta, ésta tendrá un costo adicional del 10% del total de la cotización. En todo caso se le recuerda al cliente que de acuerdo con la política de privacidad no deberá difundir ni utilizar para su propio beneficio ninguno de los diseños expuestos, puesto que hacen parte de la propiedad intelectual de la compañía. \r\n\r\nResponsabilidades del Cliente: \r\n - Verificar que sus datos en la cotización sean los correctos e incluya todos los servicios que solicita. En caso de requerir alguna modificación, comunicarlo lo más pronto posible. \r\n - Enviar las fotografías e imágenes con buena resolución y que no excedan los 2400px.\r\n - Enviar los documentos en formatos especiales en caso de ser solicitados así por Servicios Ambientales y Forestales Monteverde LTDA.\r\n - Revisar la ortografía y la gramática de todos los textos que nos envíe.\r\n - Todo el contenido textual y gráfico recibido del cliente es responsabilidad del mismo. Servicios Ambientales y Forestales Monteverde LTDA no se hace responsable en caso de plagio.\r\n - Si desea cancelar o cambiar un servicio frecuente, por favor haga su solicitud con 15 días hábiles de anticipación; de lo contrario se generará un costo por el apoyo en este proceso.\r\n \r\n3. Solución de inconvenientes: El tiempo de respuesta sobre un inconveniente es de 48 horas de lunes a viernes de 8:00 am a 5:00 pm y la solución del mismo dependerá de su índole. Servicios Ambientales y Forestales Monteverde LTDA no asegura el tiempo de solución de un problema relacionado con un tema en específico puesto que esto depende de las actuaciones e indagaciones que deban llevarse a cabo. \r\n\r\nCon las respectivas firmas de los documentos requeridos para la prestación del servicio y contratación, el cliente expresa que leyó cuidadosamente los términos y condiciones aquí expresados y que no tiene inconveniente con los mismos, es decir, los acepta en su totalidad. Servicios Ambientales y Forestales Monteverde LTDA no se hace responsable en caso de existir algún reparo con respecto a los términos y condiciones aquí expresados, luego de surtido el proceso de contratación. ');
/*!40000 ALTER TABLE `sys_config_options` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.sys_log_auth
CREATE TABLE IF NOT EXISTS `sys_log_auth` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `host` text NOT NULL,
  `real_ip` text NOT NULL,
  `forwarded_for` text NOT NULL,
  `user_agent` text NOT NULL,
  `accept` text,
  `referer` text,
  `cookie` text,
  `server_address` text,
  `server_name` text,
  `server_port` text,
  `remote_address` text,
  `script_filename` text,
  `redirect_url` varchar(250) DEFAULT NULL,
  `request_method` varchar(10) DEFAULT NULL,
  `request_uri` varchar(250) DEFAULT NULL,
  `time` text,
  `time_float` text,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `redirect_url` (`redirect_url`),
  KEY `request_uri` (`request_uri`),
  KEY `request_method` (`request_method`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.sys_log_auth: ~0 rows (aproximadamente)
DELETE FROM `sys_log_auth`;
/*!40000 ALTER TABLE `sys_log_auth` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_log_auth` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.sys_options
CREATE TABLE IF NOT EXISTS `sys_options` (
  `option_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `option_name` varchar(191) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `option_value` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `autoload` int(11) DEFAULT '0',
  PRIMARY KEY (`option_id`),
  UNIQUE KEY `option_name` (`option_name`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.sys_options: ~35 rows (aproximadamente)
DELETE FROM `sys_options`;
/*!40000 ALTER TABLE `sys_options` DISABLE KEYS */;
INSERT INTO `sys_options` (`option_id`, `option_name`, `option_value`, `autoload`) VALUES
	(1, 'site_url', 'http://monteverde.dataservix.com/', 1),
	(2, 'site_name_sm', 'CMS', 1),
	(3, 'site_name_md', 'Sistema de gestión de contenidos', 1),
	(4, 'site_name_lg', 'Sistema de gestión de contenidos by FelipheGomez', 1),
	(5, 'site_description', 'Sistema de gestión de contenidos creado por Andres Felipe Gomez Maya o FelipheGomez.', 1),
	(6, 'home_path', 'http://monteverde.dataservix.com/', 1),
	(7, 'admin_path', 'http://monteverde.dataservix.com/admin/', 1),
	(8, 'login_path', 'http://monteverde.dataservix.com/ingresemos.html', 1),
	(9, 'use_smilies', '1', 1),
	(10, 'admin_email', 'webmaster@ltsolucion.com', 1),
	(11, 'mailserver_url', 'mail.example.com', 1),
	(12, 'mailserver_login', 'login@example.com', 1),
	(13, 'mailserver_pass', 'password', 1),
	(14, 'mailserver_port', '110', 1),
	(15, 'default_category', '1', 1),
	(16, 'posts_per_page', '10', 1),
	(17, 'date_format', 'j F, Y', 1),
	(18, 'time_format', 'g:i a', 1),
	(19, 'links_updated_date_format', 'j F, Y g:i a', 1),
	(20, 'comment_moderation', '0', 1),
	(21, 'active_plugins', '{"name":"demo","config":"demo.php"}', 1),
	(22, 'default_email_category', '1', 1),
	(23, 'comment_registration', '0', 1),
	(24, 'upload_url_path', '', 1),
	(25, 'image_default_link_type', 'none', 1),
	(26, 'image_default_size', '', 1),
	(27, 'image_default_align', '', 1),
	(28, 'page_comments', '0', 1),
	(29, 'comments_per_page', '50', 1),
	(30, 'comment_order', 'asc', 1),
	(31, 'timezone_string', 'America/Bogota', 1),
	(32, 'default_post_format', '0', 1),
	(33, 'site_icon', '444', 1),
	(34, 'current_theme', 'Unique', 1),
	(35, 'admin_theme', 'Glace', 1);
/*!40000 ALTER TABLE `sys_options` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.sys_routes
CREATE TABLE IF NOT EXISTS `sys_routes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `plugin` varchar(50) NOT NULL,
  `module` varchar(50) NOT NULL,
  `section` varchar(50) NOT NULL,
  `id_route` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `theme` varchar(50) DEFAULT 'none',
  `session_required` int(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `url` (`url`),
  KEY `module` (`module`),
  KEY `section` (`section`),
  KEY `id` (`id`),
  KEY `plugin` (`plugin`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.sys_routes: 7 rows
DELETE FROM `sys_routes`;
/*!40000 ALTER TABLE `sys_routes` DISABLE KEYS */;
INSERT INTO `sys_routes` (`id`, `url`, `plugin`, `module`, `section`, `id_route`, `created_at`, `update_at`, `theme`, `session_required`) VALUES
	(2, '/logout.html', 'system', 'login', 'logout', 'none', '2019-03-15 10:45:26', '2019-04-02 08:04:28', 'garden_care', 1),
	(4, '/#/', 'crm', 'dashboard', 'home_clients', 'none', '2019-02-06 14:34:21', '2019-04-02 08:04:22', 'garden_care', 0),
	(5, '/index.html', 'crm', 'dashboard', 'home_clients', 'none', '2019-02-06 14:34:21', '2019-04-02 08:04:12', 'garden_care', 0),
	(1, '/ingresemos.html', 'system', 'login', 'login', 'none', '2019-03-15 10:45:26', '2019-04-02 07:57:10', 'Glance', 0),
	(3, '/', 'crm', 'dashboard', 'home_clients', 'none', '2019-02-06 14:34:21', '2019-04-02 07:58:00', 'garden_care', 0),
	(6, '/comercial/', 'crm', 'dashboard', 'agent', 'none', '2019-02-06 14:34:21', '2019-04-02 07:51:21', 'shoppy', 1),
	(7, '/backoffice/', 'crm', 'dashboard', 'admin', 'none', '2019-02-06 14:34:21', '2019-04-02 07:51:17', 'Glance', 1);
/*!40000 ALTER TABLE `sys_routes` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.sys_url_redirects
CREATE TABLE IF NOT EXISTS `sys_url_redirects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `module` varchar(50) NOT NULL,
  `section` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `url` (`url`),
  KEY `module` (`module`),
  KEY `section` (`section`),
  KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.sys_url_redirects: 8 rows
DELETE FROM `sys_url_redirects`;
/*!40000 ALTER TABLE `sys_url_redirects` DISABLE KEYS */;
INSERT INTO `sys_url_redirects` (`id`, `url`, `module`, `section`, `created_at`, `update_at`) VALUES
	(1, '/out', 'login', 'out', '2019-02-06 14:38:43', '2019-06-11 15:09:12'),
	(2, '/index.html', 'micuenta', 'dashboard', '2019-02-11 06:37:19', '2019-06-11 15:09:13'),
	(3, '/CustomerPortal/dashboard', 'CustomerPortal', 'dashboard', '2019-02-11 06:44:54', '2019-06-11 15:09:15'),
	(4, '/CustomerPortal/companies/{id}', 'CustomerPortal', 'companies', '2019-02-11 16:59:03', '2019-06-11 15:09:21'),
	(5, '/CustomerPortal/company_view/', 'CustomerPortal', 'company_view', '2019-02-14 08:35:08', '2019-06-11 15:09:23'),
	(6, '/micuenta/companies/', 'micuenta', 'companies', '2019-02-14 10:12:52', '2019-06-11 15:09:24'),
	(7, '/micuenta/dashboard/', 'micuenta', 'dashboard', '2019-02-15 05:32:51', '2019-06-11 15:09:26'),
	(8, '/', 'micuenta', 'dashboard', '2019-02-20 10:54:37', '2019-06-11 15:09:28');
/*!40000 ALTER TABLE `sys_url_redirects` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.tasks
CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee` int(11) DEFAULT NULL,
  `title` varchar(250) NOT NULL,
  `type` int(11) DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `dataObj` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_tasks_employees` (`employee`),
  KEY `FK_tasks_types_tasks` (`type`),
  CONSTRAINT `FK_tasks_employees` FOREIGN KEY (`employee`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_tasks_types_tasks` FOREIGN KEY (`type`) REFERENCES `types_tasks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.tasks: ~0 rows (aproximadamente)
DELETE FROM `tasks`;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_accounts
CREATE TABLE IF NOT EXISTS `types_accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_accounts: ~4 rows (aproximadamente)
DELETE FROM `types_accounts`;
/*!40000 ALTER TABLE `types_accounts` DISABLE KEYS */;
INSERT INTO `types_accounts` (`id`, `name`) VALUES
	(4, 'Empresa sector publico'),
	(3, 'Establecimiento de Comercio'),
	(2, 'Persona Jurídica'),
	(1, 'Persona Natural');
/*!40000 ALTER TABLE `types_accounts` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_arls
CREATE TABLE IF NOT EXISTS `types_arls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL DEFAULT '',
  `nit` varchar(50) DEFAULT NULL,
  `admin` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`),
  KEY `code_key` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_arls: ~11 rows (aproximadamente)
DELETE FROM `types_arls`;
/*!40000 ALTER TABLE `types_arls` DISABLE KEYS */;
INSERT INTO `types_arls` (`id`, `code`, `nit`, `admin`, `name`) VALUES
	(1, 'NONE', NULL, '', 'Ninguna'),
	(2, '14-4', '860002183-9', 'A.R.L. Seguros de Vida Colpatria S.A.', 'Colpatria ARP'),
	(3, '14-7', '860002503-2', 'Compañía de Seguros Bolívar S.A.', 'Seguros Bolívar'),
	(4, '14-8', '860022137-5', 'Seguros de Vida Aurora', 'Seguros de Vida Aurora'),
	(5, '14-17', '860503617-3', 'ARP Alfa', 'Alfa'),
	(6, '14-18', '860008645-7', 'Liberty Seguros de Vida S.A.', 'Liberty'),
	(7, '14-23', '860011153-6', 'Positiva Compañía de Seguros', 'Positiva Compañía de Seguros'),
	(8, '14-25', '800226175-3', 'Colmena Riesgos Profesionales', 'Colmena'),
	(9, '14-28', '800256161-9', 'ARL Sura', 'ARP Sura (Antes Suratep)'),
	(10, '14-29', '830008686-1', 'La Equidad Seguros de Vida', 'La Equidad Seguros'),
	(11, '14-30', '830054904-6', 'Mapfre Colombia Vida Seguros S.A', 'Mapfre Colombia Vida Seguros S.A.');
/*!40000 ALTER TABLE `types_arls` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_banks
CREATE TABLE IF NOT EXISTS `types_banks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_banks: ~2 rows (aproximadamente)
DELETE FROM `types_banks`;
/*!40000 ALTER TABLE `types_banks` DISABLE KEYS */;
INSERT INTO `types_banks` (`id`, `name`) VALUES
	(1, 'AHORROS'),
	(2, 'CORRIENTE');
/*!40000 ALTER TABLE `types_banks` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_bloods
CREATE TABLE IF NOT EXISTS `types_bloods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_bloods: ~4 rows (aproximadamente)
DELETE FROM `types_bloods`;
/*!40000 ALTER TABLE `types_bloods` DISABLE KEYS */;
INSERT INTO `types_bloods` (`id`, `name`) VALUES
	(1, 'A'),
	(2, 'B'),
	(3, 'AB'),
	(4, 'O');
/*!40000 ALTER TABLE `types_bloods` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_bloods_rhs
CREATE TABLE IF NOT EXISTS `types_bloods_rhs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_bloods_rhs: ~3 rows (aproximadamente)
DELETE FROM `types_bloods_rhs`;
/*!40000 ALTER TABLE `types_bloods_rhs` DISABLE KEYS */;
INSERT INTO `types_bloods_rhs` (`id`, `name`) VALUES
	(1, 'NEGATIVO (-)'),
	(2, 'POSITIVO (+)'),
	(3, '----');
/*!40000 ALTER TABLE `types_bloods_rhs` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_charges
CREATE TABLE IF NOT EXISTS `types_charges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `code` int(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_code` (`code`),
  KEY `KEY_code` (`code`),
  KEY `KEY_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=329 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_charges: ~328 rows (aproximadamente)
DELETE FROM `types_charges`;
/*!40000 ALTER TABLE `types_charges` DISABLE KEYS */;
INSERT INTO `types_charges` (`id`, `name`, `code`) VALUES
	(1, 'Abogado', 21014),
	(2, 'Abogado Especialista', 21024),
	(3, 'Abogado Especialista Sectorial', 21044),
	(4, 'Abogado Jefe', 21034),
	(5, 'Actor', 51033),
	(6, 'Administrador', 8024),
	(7, 'Administrador de Redes y Recursos de Informática', 11084),
	(8, 'Administrador Jefe', 8044),
	(9, 'Almacenista (Código Transitorio)', 22),
	(10, 'Almacenista Jefe', 9013),
	(11, 'Analista Central de Presupuesto', 7034),
	(12, 'Analista de Asuntos Audiovisuales', 35034),
	(13, 'Analista de Colocación y Seguimiento de Pasantías', 25014),
	(14, 'Analista de Higiene y Seguridad Industrial', 34094),
	(15, 'Analista de Información y Control Estudiantil', 2023),
	(16, 'Analista de Información y Control Estudiantil Jefe', 2044),
	(17, 'Analista de Laboratorio de Protección Ambiental', 34063),
	(18, 'Analista de Nómina', 48024),
	(19, 'Analista de Organización y Sistemas', 15034),
	(20, 'Analista de Presupuesto', 7024),
	(21, 'Analista de Recursos Humanos', 10034),
	(22, 'Analista de Registro y Control Estadístico', 15063),
	(23, 'Analista de Registro y Ctrl. Estadístico Jefe', 15074),
	(24, 'Analista Especialista de Recursos Humanos', 10444),
	(25, 'Analista Financiero', 47084),
	(26, 'Analista Programador de Sistemas', 11054),
	(27, 'Animador Cultural', 53074),
	(28, 'Archivista', 5023),
	(29, 'Archivista Jefe', 5034),
	(30, 'Arquitecto', 37024),
	(31, 'Arreglista Musical', 50164),
	(32, 'Asesor Artístico', 53044),
	(33, 'Asistente Administrativo', 8013),
	(34, 'Asistente Agropecuario', 58013),
	(35, 'Asistente de Almacén (Código Transitorio)', 32),
	(36, 'Asistente de Anatomía y Patología', 22032),
	(37, 'Asistente de Asuntos Audiovisuales', 35012),
	(38, 'Asistente de Asuntos Literarios', 38033),
	(39, 'Asistente de Biblioteca', 3023),
	(40, 'Asistente de Biología', 22063),
	(41, 'Asistente de Botánica', 22093),
	(42, 'Asistente de Cámara', 35102),
	(43, 'Asistente de Campo', 27052),
	(44, 'Asistente de Contabilidad', 6012),
	(45, 'Asistente de Costos de Obras', 12013),
	(46, 'Asistente de Director de Orfeón Universitario', 50042),
	(47, 'Asistente de Entomología', 22043),
	(48, 'Asistente de Especialista en Información', 3053),
	(49, 'Asistente de farmacia', 57013),
	(50, 'Asistente de Hidrometeorología', 56063),
	(51, 'Asistente de Histología', 22052),
	(52, 'Asistente de Información y Control Estudiantil', 2012),
	(53, 'Asistente de Investigación en Ciencias Básicas, Naturales y Aplicadas', 27034),
	(54, 'Asistente de Investigación en Ciencias Sociales', 27044),
	(55, 'Asistente de Laboratorio', 22023),
	(56, 'Asistente de Laboratorio Clínico', 22103),
	(57, 'Asistente de Laboratorio de Computación', 11033),
	(58, 'Asistente de Laboratorio de Idiomas', 40013),
	(59, 'Asistente de Mantenimiento de Equipos y Redes de Informática', 11023),
	(60, 'Asistente de Nómina', 48013),
	(61, 'Asistente de Organización Cultural', 53023),
	(62, 'Asistente de Preescolar', 36013),
	(63, 'Asistente de Presupuesto', 7013),
	(64, 'Asistente de Previsión y Desarrollo Social', 33023),
	(65, 'Asistente de Producción de Radiodifusora', 46034),
	(66, 'Asistente de Protocolo', 20013),
	(67, 'Asistente de Psicólogo (Código Transitorio)', 12),
	(68, 'Asistente de Publicaciones', 19022),
	(69, 'Asistente de Publicidad y Mercadeo', 20083),
	(70, 'Asistente de Recursos Humanos', 10013),
	(71, 'Asistente de Seguro de Transporte Automotor', 23013),
	(72, 'Asistente de Seguros', 23023),
	(73, 'Asistente de Tesorería', 47033),
	(74, 'Asistente de Topografía', 37042),
	(75, 'Asistente de Veterinaria', 55013),
	(76, 'Asistente de Zootecnia', 55033),
	(77, 'Asistente Ejecutivo de Egreamigos', 8064),
	(78, 'Asistente Ejecutivo de Estudios para Graduados', 26014),
	(79, 'Asistente Ejecutivo de Relaciones Interinstitucionales', 20044),
	(80, 'Asistente Financiero', 47073),
	(81, 'Atrilero', 50022),
	(82, 'Auditor', 49024),
	(83, 'Auxiliar de Archivo', 5012),
	(84, 'Auxiliar de Biblioteca', 3012),
	(85, 'Auxiliar de Laboratorio', 22012),
	(86, 'Auxiliar de Registro y Estadísticas de Servicios Asistenciales', 32012),
	(87, 'Auxiliar de Servicios para el Arte', 53012),
	(88, 'Ayudante de Taller de Artes del Fuego', 52052),
	(89, 'Bioanalista', 22074),
	(90, 'Bombero', 59012),
	(91, 'Bombero Inspector', 59023),
	(92, 'Bombero Jefe', 59033),
	(93, 'Cajero', 47012),
	(94, 'Cajero Jefe', 47023),
	(95, 'Calígrafo', 18012),
	(96, 'Camarógrafo', 35042),
	(97, 'Capellán', 44014),
	(98, 'Capitan de Buque', 54024),
	(99, 'Cartógrafo', 37064),
	(100, 'Citotecnólogo', 31013),
	(101, 'Comandante del Cuerpo de Bomberos', 59074),
	(102, 'Comprador', 9023),
	(103, 'Comprador Jefe', 9044),
	(104, 'Concertino', 50114),
	(105, 'Consultor de Información y Control Estudiantil', 2054),
	(106, 'Contabilista', 6023),
	(107, 'Contador', 6034),
	(108, 'Contador Jefe', 6044),
	(109, 'Coordinador Académico', 36054),
	(110, 'Coordinador Administrativo', 8054),
	(111, 'Coordinador de Asuntos Literarios', 38054),
	(112, 'Coordinador de Biblioteca', 3044),
	(113, 'Coordinador de Centro de Estudios en Artes', 53094),
	(114, 'Coordinador de Cine Club', 53104),
	(115, 'Coordinador de Deporte', 17024),
	(116, 'Coordinador de Pasantías y Actividades Complementarias', 25034),
	(117, 'Coordinador de Preescolar', 36034),
	(118, 'Coordinador de Producción de Radiodifusora', 46074),
	(119, 'Coordinador de Publicaciones', 19054),
	(120, 'Coordinador de Desarrollo de Servicios Estudiantiles', 33064),
	(121, 'Coordinador del Programa de Asistencia Médica Estudiantil', 28064),
	(122, 'Coordinador General de Deporte', 17034),
	(123, 'Coordinador Sectorial de Cultura', 53054),
	(124, 'Coralista Líder de Cuerdas', 50012),
	(125, 'Corrector de Publicaciones', 19034),
	(126, 'Curador', 52034),
	(127, 'Diagramador', 18023),
	(128, 'Dibujante', 18043),
	(129, 'Dibujante Ilustrador', 18063),
	(130, 'Dibujante Ilustrador Jefe', 18073),
	(131, 'Dibujante Jefe', 18053),
	(132, 'Dietista', 39024),
	(133, 'Director de Agrupación Musical', 50124),
	(134, 'Director de Ballet o Danza', 51054),
	(135, 'Director de Coral', 50134),
	(136, 'Director de Orfeón Universitario', 50154),
	(137, 'Director de Orquesta', 50144),
	(138, 'Director de Teatro', 51074),
	(139, 'Director de Titeres y Marionetas', 51064),
	(140, 'Director Educativo', 36064),
	(141, 'Diseñador Curricular', 24024),
	(142, 'Diseñador Gráfico', 18033),
	(143, 'Docente de Artes Auditivas', 50104),
	(144, 'Docente de Artes Plásticas', 52044),
	(145, 'Docente de Aula', 36074),
	(146, 'Docente de Preescolar', 36024),
	(147, 'Docente en Artes Escénicas', 51044),
	(148, 'Documentalista de Bienes Inmuebles', 16023),
	(149, 'Ecónomo', 39042),
	(150, 'Editor de Asuntos Audiovisuales', 35073),
	(151, 'Editor Histórico', 38014),
	(152, 'Enfermera (o)', 32023),
	(153, 'Enfermera (o) Instrumentista', 32064),
	(154, 'Enfermera Comunitaria', 32054),
	(155, 'Enfermera (o) Jefe', 32034),
	(156, 'Entrenador Deportivo', 17014),
	(157, 'Especialista de Sistemas de Informática', 11064),
	(158, 'Especialista en Asistencia Técnica Institucional', 43014),
	(159, 'Especialista en Asuntos Literarios', 38044),
	(160, 'Especialista en Información', 3064),
	(161, 'Especialista en Información Jefe', 3074),
	(162, 'Especialista en Mtto. de Equipos de Computación', 11074),
	(163, 'Especialista en Pasantías y Actividades Complementarias', 25024),
	(164, 'Especialista Organizacional', 15084),
	(165, 'Evaluador Curricular', 24014),
	(166, 'Expendedor de Material Didáctico', 19012),
	(167, 'Facilitador de Desarrollo de Recursos Humanos', 10024),
	(168, 'Facilitador de Desarrollo en Artes Auditivas', 50083),
	(169, 'Facilitador de Desarrollo en Artes Escénicas', 51023),
	(170, 'Facilitador de Desarrollo en Artes Plásticas', 52023),
	(171, 'Facilitador de Desarrollo en Asuntos Literarios', 38023),
	(172, 'Farmacéutico', 57024),
	(173, 'Fisioterapeuta', 28033),
	(174, 'Fotógrafo', 35052),
	(175, 'Fotolitógrafo', 19062),
	(176, 'Gerente de Promoción y Administración de Espacios y Patrimonio Cultural', 53064),
	(177, 'Higienista Dental', 30012),
	(178, 'Ingeniero Agrónomo', 58034),
	(179, 'Ingeniero Agrónomo Jefe', 58044),
	(180, 'Ingeniero de Proyectos', 12094),
	(181, 'Ingeniero Forestal', 56024),
	(182, 'Inspector de Control de Pérdidas', 34022),
	(183, 'Inspector de Higiene y Control de Precios de Alimentos', 39013),
	(184, 'Inspector de Obras', 12034),
	(185, 'Inspector de Protección Ambiental', 34053),
	(186, 'Inspector de Seguridad Industrial e Higiene Ocupacional', 34013),
	(187, 'Inspector General de los Servicios Bomberiles', 59064),
	(188, 'Instructor de Desarrollo en Artes Auditivas', 50032),
	(189, 'Instructor de Desarrollo en Artes Escénicas', 51012),
	(190, 'Instructor de Desarrollo en Artes Plásticas', 52012),
	(191, 'Instrumentista Académico', 50073),
	(192, 'Instrumentista Académico Líder de Cuerdas', 50094),
	(193, 'Instrumentista Folklórico', 50052),
	(194, 'Interprete Vocal', 50063),
	(195, 'Investigador en Ciencias Básicas, Naturales y Aplicadas', 27014),
	(196, 'Investigador en Ciencias Sociales', 27024),
	(197, 'Investigador Ocupacional', 24034),
	(198, 'Jefe Central de Información y Control Estudiantil', 2074),
	(199, 'Jefe Central de Presupuesto', 7054),
	(200, 'Jefe Central de Recursos Humanos', 10064),
	(201, 'Jefe de Análisis y Control Financiero', 47054),
	(202, 'Jefe de Análisis y Procesamiento de Compras', 9033),
	(203, 'Jefe de Artes', 53084),
	(204, 'Jefe de Asesoramiento, Apoyo y Orientación', 4044),
	(205, 'Jefe de Asistencia Socio-económica Estudiantil', 33044),
	(206, 'Jefe de Contabilidad', 6054),
	(207, 'Jefe de Control Previo y/o Posterior', 49034),
	(208, 'Jefe de Correo', 29023),
	(209, 'Jefe de Emisión de Pagos', 47044),
	(210, 'Jefe de Fotografía', 35064),
	(211, 'Jefe de Información y Control Estudiantil', 2064),
	(212, 'Jefe de Informática', 11104),
	(213, 'Jefe de Inventarios', 16043),
	(214, 'Jefe de Mantenimiento y Reparaciones', 12044),
	(215, 'Jefe de Nómina', 48034),
	(216, 'Jefe de Obras', 12064),
	(217, 'Jefe de Operaciones Bomberiles', 59043),
	(218, 'Jefe de Organización y Sistemas', 15044),
	(219, 'Jefe de Planes Operativos y Estratégicos', 15054),
	(220, 'Jefe de Prensa', 20074),
	(221, 'Jefe de Prevención, Investigación e Inspección de Incendios', 59053),
	(222, 'Jefe de Producción de Audiovisuales', 35084),
	(223, 'Jefe de Protección Ambiental', 34074),
	(224, 'Jefe de Protección y Seguridad', 34044),
	(225, 'Jefe de Protocolo', 20024),
	(226, 'Jefe de Proyectos Arquitectónicos y de Ingeniería', 37034),
	(227, 'Jefe de Recursos Humanos', 10054),
	(228, 'Jefe de Relaciones Interinstitucionales', 20094),
	(229, 'Jefe de Relaciones Públicas', 20064),
	(230, 'Jefe de Salud Integral', 28074),
	(231, 'Jefe de Sección de Informática', 11094),
	(232, 'Jefe de Seguridad Industrial e Higiene Ocupacional', 34084),
	(233, 'Jefe de Seguros', 23034),
	(234, 'Jefe de Servicios Generales', 14024),
	(235, 'Jefe de Taller Automotor', 13023),
	(236, 'Jefe de Taller Metalmecánico', 12084),
	(237, 'Jefe de Talleres de Obras', 12054),
	(238, 'Jefe de Tesorería', 47064),
	(239, 'Jefe de Tráfico', 13033),
	(240, 'Jefe de Unidades Nutricionales', 39034),
	(241, 'Jefe Sectorial de Compras', 9054),
	(242, 'Jefe Sectorial de Presupuesto', 7044),
	(243, 'Kinesiólogo', 28082),
	(244, 'Locutor', 46043),
	(245, 'Luminotécnico', 35093),
	(246, 'Maquetista', 37053),
	(247, 'Maquinista de Buque', 54013),
	(248, 'Mecánico Dental', 30033),
	(249, 'Médico Especialista', 28054),
	(250, 'Médico General', 28044),
	(251, 'Médico Jefe', 28094),
	(252, 'Médico Veterinario', 55044),
	(253, 'Microfilmador', 5042),
	(254, 'Musicalizador', 46012),
	(255, 'Odontólogo', 30024),
	(256, 'Oficial de Correo', 29012),
	(257, 'Oficinista', 1022),
	(258, 'Operador de Audio', 46022),
	(259, 'Operador de Computación', 11012),
	(260, 'Operador de Equipos de Telecomunicaciones', 45022),
	(261, 'Operador de Máquina de Reproducción (Código Transitorio)', 72),
	(262, 'Orientador', 4014),
	(263, 'Periodista', 20054),
	(264, 'Planificador', 15014),
	(265, 'Planificador Central', 15024),
	(266, 'Planificador de Información y Control Estudiantil', 2034),
	(267, 'Programador de Sistemas', 11043),
	(268, 'Promotor Cultural', 53034),
	(269, 'Promotor de Cursos', 43023),
	(270, 'Promotor de Relaciones Públicas e Interinstitucionales', 20034),
	(271, 'Promotor Social', 33013),
	(272, 'Promotor Vendedor de Material Didáctico', 19072),
	(273, 'Psicólogo', 4024),
	(274, 'Psicólogo Jefe', 4034),
	(275, 'Psicopedagogo', 36084),
	(276, 'Recepcionista', 1012),
	(277, 'Registrador de Bienes', 16012),
	(278, 'Revisor de Contraloría', 49013),
	(279, 'Secretaria (o)', 1032),
	(280, 'Secretaria (o) Bilingüe', 1042),
	(281, 'Secretaria (o) Ejecutiva (o)', 1053),
	(282, 'Secretaria (o) Ejecutiva (o) Bilingüe', 1063),
	(283, 'Serigrafista', 52062),
	(284, 'Serigrafista Principal', 52074),
	(285, 'Soplador de Vidrio', 22123),
	(286, 'Soplador de Vidrio Jefe', 22133),
	(287, 'Sub-director Educativo', 36044),
	(288, 'Supervisor de Asuntos Audiovisuales', 35024),
	(289, 'Supervisor de Biblioteca', 3034),
	(290, 'Supervisor de Carpintería (Código Transitorio)', 52),
	(291, 'Supervisor de Costos de Obras', 12074),
	(292, 'Supervisor de Laboratorio', 22084),
	(293, 'Supervisor de Operaciones de Radiodifusora', 46063),
	(294, 'Supervisor de Pintores (Código Transitorio)', 42),
	(295, 'Supervisor de Protección y Seguridad', 34032),
	(296, 'Supervisor de Registro y Apoyo Asistencial', 32043),
	(297, 'Supervisor de Registro y Control de Bienes', 16033),
	(298, 'Supervisor de Servicios (Código Transitorio)', 92),
	(299, 'Supervisor de Servicios de Mantenimiento', 12023),
	(300, 'Supervisor de Servicios Generales', 14014),
	(301, 'Supervisor de Taller de Publicaciones', 19043),
	(302, 'Supervisor de Transporte', 13012),
	(303, 'Supervisor del Programa Asistencia Médica Estudiantil', 8033),
	(304, 'Tallador de Diamantes', 56043),
	(305, 'Taquillero (Código Transitorio)', 82),
	(306, 'Taxidermista', 22113),
	(307, 'Técnico Acuicultor', 55023),
	(308, 'Técnico Agropecuario', 58023),
	(309, 'Técnico de Electromedicina', 28023),
	(310, 'Técnico de Equipos de Telecomunicaciones', 45033),
	(311, 'Técnico de Geología y Minas', 56033),
	(312, 'Técnico de Grabación de Radiodifusora', 46053),
	(313, 'Técnico de Petróleo', 56053),
	(314, 'Técnico de Taller de Micromecánica', 42043),
	(315, 'Técnico en Telemática', 11113),
	(316, 'Técnico Electricista', 42013),
	(317, 'Técnico Electromecánico', 42033),
	(318, 'Técnico Electromecánico de Equipos Odontológicos', 42023),
	(319, 'Técnico Forestal', 56013),
	(320, 'Técnico Plomero (Código Transitorio)', 62),
	(321, 'Técnico Químico', 41013),
	(322, 'Técnico Radiólogo', 28013),
	(323, 'Telefonista', 45012),
	(324, 'Topógrafo', 37013),
	(325, 'Trabajador Social', 33054),
	(326, 'Trabajador Social Jefe', 33034),
	(327, 'Traductor', 40024),
	(328, 'Zootecnista', 55054);
/*!40000 ALTER TABLE `types_charges` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_contacts
CREATE TABLE IF NOT EXISTS `types_contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=365 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_contacts: ~360 rows (aproximadamente)
DELETE FROM `types_contacts`;
/*!40000 ALTER TABLE `types_contacts` DISABLE KEYS */;
INSERT INTO `types_contacts` (`id`, `name`) VALUES
	(36, 'Abogado'),
	(37, 'Abogado Especialista'),
	(38, 'Abogado Especialista Sectorial'),
	(39, 'Abogado Jefe'),
	(2, 'Abuela'),
	(3, 'Abuelo'),
	(40, 'Actor'),
	(41, 'Administrador'),
	(42, 'Administrador de Redes y Recursos de Informática'),
	(43, 'Administrador Jefe'),
	(44, 'Almacenista (Código Transitorio)'),
	(45, 'Almacenista Jefe'),
	(46, 'Analista Central de Presupuesto'),
	(47, 'Analista de Asuntos Audiovisuales'),
	(48, 'Analista de Colocación y Seguimiento de Pasantías'),
	(49, 'Analista de Higiene y Seguridad Industrial'),
	(50, 'Analista de Información y Control Estudiantil'),
	(51, 'Analista de Información y Control Estudiantil Jefe'),
	(52, 'Analista de Laboratorio de Protección Ambiental'),
	(53, 'Analista de Nómina'),
	(54, 'Analista de Organización y Sistemas'),
	(55, 'Analista de Presupuesto'),
	(56, 'Analista de Recursos Humanos'),
	(57, 'Analista de Registro y Control Estadístico'),
	(58, 'Analista de Registro y Ctrl. Estadístico Jefe'),
	(59, 'Analista Especialista de Recursos Humanos'),
	(60, 'Analista Financiero'),
	(61, 'Analista Programador de Sistemas'),
	(62, 'Animador Cultural'),
	(63, 'Archivista'),
	(64, 'Archivista Jefe'),
	(65, 'Arquitecto'),
	(66, 'Arreglista Musical'),
	(67, 'Asesor Artístico'),
	(68, 'Asistente Administrativo'),
	(69, 'Asistente Agropecuario'),
	(70, 'Asistente de Almacén (Código Transitorio)'),
	(71, 'Asistente de Anatomía y Patología'),
	(72, 'Asistente de Asuntos Audiovisuales'),
	(73, 'Asistente de Asuntos Literarios'),
	(74, 'Asistente de Biblioteca'),
	(75, 'Asistente de Biología'),
	(76, 'Asistente de Botánica'),
	(77, 'Asistente de Cámara'),
	(78, 'Asistente de Campo'),
	(79, 'Asistente de Contabilidad'),
	(80, 'Asistente de Costos de Obras'),
	(81, 'Asistente de Director de Orfeón Universitario'),
	(82, 'Asistente de Entomología'),
	(83, 'Asistente de Especialista en Información'),
	(84, 'Asistente de farmacia'),
	(85, 'Asistente de Hidrometeorología'),
	(86, 'Asistente de Histología'),
	(87, 'Asistente de Información y Control Estudiantil'),
	(88, 'Asistente de Investigación en Ciencias Básicas, Naturales y Aplicadas'),
	(89, 'Asistente de Investigación en Ciencias Sociales'),
	(90, 'Asistente de Laboratorio'),
	(91, 'Asistente de Laboratorio Clínico'),
	(92, 'Asistente de Laboratorio de Computación'),
	(93, 'Asistente de Laboratorio de Idiomas'),
	(94, 'Asistente de Mantenimiento de Equipos y Redes de Informática'),
	(95, 'Asistente de Nómina'),
	(96, 'Asistente de Organización Cultural'),
	(97, 'Asistente de Preescolar'),
	(98, 'Asistente de Presupuesto'),
	(99, 'Asistente de Previsión y Desarrollo Social'),
	(100, 'Asistente de Producción de Radiodifusora'),
	(101, 'Asistente de Protocolo'),
	(102, 'Asistente de Psicólogo (Código Transitorio)'),
	(103, 'Asistente de Publicaciones'),
	(104, 'Asistente de Publicidad y Mercadeo'),
	(105, 'Asistente de Recursos Humanos'),
	(106, 'Asistente de Seguro de Transporte Automotor'),
	(107, 'Asistente de Seguros'),
	(108, 'Asistente de Tesorería'),
	(109, 'Asistente de Topografía'),
	(110, 'Asistente de Veterinaria'),
	(111, 'Asistente de Zootecnia'),
	(112, 'Asistente Ejecutivo de Egreamigos'),
	(113, 'Asistente Ejecutivo de Estudios para Graduados'),
	(114, 'Asistente Ejecutivo de Relaciones Interinstitucionales'),
	(115, 'Asistente Financiero'),
	(116, 'Atrilero'),
	(117, 'Auditor'),
	(118, 'Auxiliar de Archivo'),
	(119, 'Auxiliar de Biblioteca'),
	(120, 'Auxiliar de Laboratorio'),
	(121, 'Auxiliar de Registro y Estadísticas de Servicios Asistenciales'),
	(122, 'Auxiliar de Servicios para el Arte'),
	(123, 'Ayudante de Taller de Artes del Fuego'),
	(124, 'Bioanalista'),
	(4, 'Bisabuela'),
	(5, 'Bisabuelo'),
	(125, 'Bombero'),
	(126, 'Bombero Inspector'),
	(127, 'Bombero Jefe'),
	(128, 'Cajero'),
	(129, 'Cajero Jefe'),
	(130, 'Calígrafo'),
	(131, 'Camarógrafo'),
	(132, 'Capellán'),
	(133, 'Capitan de Buque'),
	(134, 'Cartógrafo'),
	(135, 'Citotecnólogo'),
	(136, 'Comandante del Cuerpo de Bomberos'),
	(137, 'Comprador'),
	(138, 'Comprador Jefe'),
	(139, 'Concertino'),
	(140, 'Consultor de Información y Control Estudiantil'),
	(141, 'Contabilista'),
	(142, 'Contador'),
	(143, 'Contador Jefe'),
	(144, 'Coordinador Académico'),
	(145, 'Coordinador Administrativo'),
	(146, 'Coordinador de Asuntos Literarios'),
	(147, 'Coordinador de Biblioteca'),
	(148, 'Coordinador de Centro de Estudios en Artes'),
	(149, 'Coordinador de Cine Club'),
	(150, 'Coordinador de Deporte'),
	(155, 'Coordinador de Desarrollo de Servicios Estudiantiles'),
	(151, 'Coordinador de Pasantías y Actividades Complementarias'),
	(152, 'Coordinador de Preescolar'),
	(153, 'Coordinador de Producción de Radiodifusora'),
	(154, 'Coordinador de Publicaciones'),
	(156, 'Coordinador del Programa de Asistencia Médica Estudiantil'),
	(157, 'Coordinador General de Deporte'),
	(158, 'Coordinador Sectorial de Cultura'),
	(159, 'Coralista Líder de Cuerdas'),
	(160, 'Corrector de Publicaciones'),
	(6, 'Cuñada'),
	(7, 'Cuñado'),
	(161, 'Curador'),
	(162, 'Diagramador'),
	(163, 'Dibujante'),
	(164, 'Dibujante Ilustrador'),
	(165, 'Dibujante Ilustrador Jefe'),
	(166, 'Dibujante Jefe'),
	(167, 'Dietista'),
	(168, 'Director de Agrupación Musical'),
	(169, 'Director de Ballet o Danza'),
	(170, 'Director de Coral'),
	(171, 'Director de Orfeón Universitario'),
	(172, 'Director de Orquesta'),
	(173, 'Director de Teatro'),
	(174, 'Director de Titeres y Marionetas'),
	(175, 'Director Educativo'),
	(176, 'Diseñador Curricular'),
	(177, 'Diseñador Gráfico'),
	(178, 'Docente de Artes Auditivas'),
	(179, 'Docente de Artes Plásticas'),
	(180, 'Docente de Aula'),
	(181, 'Docente de Preescolar'),
	(182, 'Docente en Artes Escénicas'),
	(183, 'Documentalista de Bienes Inmuebles'),
	(184, 'Ecónomo'),
	(185, 'Editor de Asuntos Audiovisuales'),
	(186, 'Editor Histórico'),
	(187, 'Enfermera (o)'),
	(188, 'Enfermera (o) Instrumentista'),
	(190, 'Enfermera (o) Jefe'),
	(189, 'Enfermera Comunitaria'),
	(191, 'Entrenador Deportivo'),
	(192, 'Especialista de Sistemas de Informática'),
	(193, 'Especialista en Asistencia Técnica Institucional'),
	(194, 'Especialista en Asuntos Literarios'),
	(195, 'Especialista en Información'),
	(196, 'Especialista en Información Jefe'),
	(197, 'Especialista en Mtto. de Equipos de Computación'),
	(198, 'Especialista en Pasantías y Actividades Complementarias'),
	(199, 'Especialista Organizacional'),
	(200, 'Evaluador Curricular'),
	(201, 'Expendedor de Material Didáctico'),
	(202, 'Facilitador de Desarrollo de Recursos Humanos'),
	(203, 'Facilitador de Desarrollo en Artes Auditivas'),
	(204, 'Facilitador de Desarrollo en Artes Escénicas'),
	(205, 'Facilitador de Desarrollo en Artes Plásticas'),
	(206, 'Facilitador de Desarrollo en Asuntos Literarios'),
	(207, 'Farmacéutico'),
	(208, 'Fisioterapeuta'),
	(209, 'Fotógrafo'),
	(210, 'Fotolitógrafo'),
	(211, 'Gerente de Promoción y Administración de Espacios y Patrimonio Cultural'),
	(9, 'Hermana'),
	(8, 'Hermano'),
	(212, 'Higienista Dental'),
	(11, 'Hija'),
	(10, 'Hijo'),
	(213, 'Ingeniero Agrónomo'),
	(214, 'Ingeniero Agrónomo Jefe'),
	(215, 'Ingeniero de Proyectos'),
	(216, 'Ingeniero Forestal'),
	(217, 'Inspector de Control de Pérdidas'),
	(218, 'Inspector de Higiene y Control de Precios de Alimentos'),
	(219, 'Inspector de Obras'),
	(220, 'Inspector de Protección Ambiental'),
	(221, 'Inspector de Seguridad Industrial e Higiene Ocupacional'),
	(222, 'Inspector General de los Servicios Bomberiles'),
	(223, 'Instructor de Desarrollo en Artes Auditivas'),
	(224, 'Instructor de Desarrollo en Artes Escénicas'),
	(225, 'Instructor de Desarrollo en Artes Plásticas'),
	(226, 'Instrumentista Académico'),
	(227, 'Instrumentista Académico Líder de Cuerdas'),
	(228, 'Instrumentista Folklórico'),
	(229, 'Interprete Vocal'),
	(230, 'Investigador en Ciencias Básicas, Naturales y Aplicadas'),
	(231, 'Investigador en Ciencias Sociales'),
	(232, 'Investigador Ocupacional'),
	(233, 'Jefe Central de Información y Control Estudiantil'),
	(234, 'Jefe Central de Presupuesto'),
	(235, 'Jefe Central de Recursos Humanos'),
	(236, 'Jefe de Análisis y Control Financiero'),
	(237, 'Jefe de Análisis y Procesamiento de Compras'),
	(238, 'Jefe de Artes'),
	(239, 'Jefe de Asesoramiento, Apoyo y Orientación'),
	(240, 'Jefe de Asistencia Socio-económica Estudiantil'),
	(241, 'Jefe de Contabilidad'),
	(242, 'Jefe de Control Previo y/o Posterior'),
	(243, 'Jefe de Correo'),
	(244, 'Jefe de Emisión de Pagos'),
	(245, 'Jefe de Fotografía'),
	(246, 'Jefe de Información y Control Estudiantil'),
	(247, 'Jefe de Informática'),
	(248, 'Jefe de Inventarios'),
	(249, 'Jefe de Mantenimiento y Reparaciones'),
	(250, 'Jefe de Nómina'),
	(251, 'Jefe de Obras'),
	(252, 'Jefe de Operaciones Bomberiles'),
	(253, 'Jefe de Organización y Sistemas'),
	(254, 'Jefe de Planes Operativos y Estratégicos'),
	(255, 'Jefe de Prensa'),
	(256, 'Jefe de Prevención, Investigación e Inspección de Incendios'),
	(257, 'Jefe de Producción de Audiovisuales'),
	(258, 'Jefe de Protección Ambiental'),
	(259, 'Jefe de Protección y Seguridad'),
	(260, 'Jefe de Protocolo'),
	(261, 'Jefe de Proyectos Arquitectónicos y de Ingeniería'),
	(262, 'Jefe de Recursos Humanos'),
	(263, 'Jefe de Relaciones Interinstitucionales'),
	(264, 'Jefe de Relaciones Públicas'),
	(265, 'Jefe de Salud Integral'),
	(266, 'Jefe de Sección de Informática'),
	(267, 'Jefe de Seguridad Industrial e Higiene Ocupacional'),
	(268, 'Jefe de Seguros'),
	(269, 'Jefe de Servicios Generales'),
	(270, 'Jefe de Taller Automotor'),
	(271, 'Jefe de Taller Metalmecánico'),
	(272, 'Jefe de Talleres de Obras'),
	(273, 'Jefe de Tesorería'),
	(274, 'Jefe de Tráfico'),
	(275, 'Jefe de Unidades Nutricionales'),
	(276, 'Jefe Sectorial de Compras'),
	(277, 'Jefe Sectorial de Presupuesto'),
	(278, 'Kinesiólogo'),
	(279, 'Locutor'),
	(280, 'Luminotécnico'),
	(12, 'Madrastra'),
	(13, 'Madre'),
	(281, 'Maquetista'),
	(282, 'Maquinista de Buque'),
	(283, 'Mecánico Dental'),
	(284, 'Médico Especialista'),
	(285, 'Médico General'),
	(286, 'Médico Jefe'),
	(287, 'Médico Veterinario'),
	(288, 'Microfilmador'),
	(289, 'Musicalizador'),
	(14, 'Nieta'),
	(15, 'Nieto'),
	(16, 'Nuera'),
	(290, 'Odontólogo'),
	(291, 'Oficial de Correo'),
	(292, 'Oficinista'),
	(293, 'Operador de Audio'),
	(294, 'Operador de Computación'),
	(295, 'Operador de Equipos de Telecomunicaciones'),
	(296, 'Operador de Máquina de Reproducción (Código Transitorio)'),
	(297, 'Orientador'),
	(17, 'Padrastro'),
	(18, 'Padre'),
	(298, 'Periodista'),
	(299, 'Planificador'),
	(300, 'Planificador Central'),
	(301, 'Planificador de Información y Control Estudiantil'),
	(19, 'Prima'),
	(20, 'Prima segunda'),
	(21, 'Primo'),
	(22, 'Primo segundo'),
	(302, 'Programador de Sistemas'),
	(303, 'Promotor Cultural'),
	(304, 'Promotor de Cursos'),
	(305, 'Promotor de Relaciones Públicas e Interinstitucionales'),
	(306, 'Promotor Social'),
	(307, 'Promotor Vendedor de Material Didáctico'),
	(308, 'Psicólogo'),
	(309, 'Psicólogo Jefe'),
	(310, 'Psicopedagogo'),
	(311, 'Recepcionista'),
	(312, 'Registrador de Bienes'),
	(313, 'Revisor de Contraloría'),
	(314, 'Secretaria (o)'),
	(315, 'Secretaria (o) Bilingüe'),
	(316, 'Secretaria (o) Ejecutiva (o)'),
	(317, 'Secretaria (o) Ejecutiva (o) Bilingüe'),
	(318, 'Serigrafista'),
	(319, 'Serigrafista Principal'),
	(23, 'Sobrina'),
	(24, 'Sobrino'),
	(320, 'Soplador de Vidrio'),
	(321, 'Soplador de Vidrio Jefe'),
	(322, 'Sub-director Educativo'),
	(25, 'Suegra'),
	(26, 'Suegro'),
	(323, 'Supervisor de Asuntos Audiovisuales'),
	(324, 'Supervisor de Biblioteca'),
	(325, 'Supervisor de Carpintería (Código Transitorio)'),
	(326, 'Supervisor de Costos de Obras'),
	(327, 'Supervisor de Laboratorio'),
	(328, 'Supervisor de Operaciones de Radiodifusora'),
	(329, 'Supervisor de Pintores (Código Transitorio)'),
	(330, 'Supervisor de Protección y Seguridad'),
	(331, 'Supervisor de Registro y Apoyo Asistencial'),
	(332, 'Supervisor de Registro y Control de Bienes'),
	(333, 'Supervisor de Servicios (Código Transitorio)'),
	(334, 'Supervisor de Servicios de Mantenimiento'),
	(335, 'Supervisor de Servicios Generales'),
	(336, 'Supervisor de Taller de Publicaciones'),
	(337, 'Supervisor de Transporte'),
	(338, 'Supervisor del Programa Asistencia Médica Estudiantil'),
	(339, 'Tallador de Diamantes'),
	(340, 'Taquillero (Código Transitorio)'),
	(27, 'Tatarabuela'),
	(28, 'Tatarabuelo'),
	(29, 'Tataranieta'),
	(30, 'Tataranieto'),
	(341, 'Taxidermista'),
	(342, 'Técnico Acuicultor'),
	(343, 'Técnico Agropecuario'),
	(344, 'Técnico de Electromedicina'),
	(345, 'Técnico de Equipos de Telecomunicaciones'),
	(346, 'Técnico de Geología y Minas'),
	(347, 'Técnico de Grabación de Radiodifusora'),
	(348, 'Técnico de Petróleo'),
	(349, 'Técnico de Taller de Micromecánica'),
	(351, 'Técnico Electricista'),
	(352, 'Técnico Electromecánico'),
	(353, 'Técnico Electromecánico de Equipos Odontológicos'),
	(350, 'Técnico en Telemática'),
	(354, 'Técnico Forestal'),
	(355, 'Técnico Plomero (Código Transitorio)'),
	(356, 'Técnico Químico'),
	(357, 'Técnico Radiólogo'),
	(358, 'Telefonista'),
	(31, 'Tía'),
	(32, 'Tía abuela'),
	(33, 'Tío'),
	(34, 'Tío abuelo'),
	(1, 'Titular'),
	(359, 'Topógrafo'),
	(360, 'Trabajador Social'),
	(362, 'Trabajador Social Jefe'),
	(363, 'Traductor'),
	(35, 'Yerno'),
	(364, 'Zootecnista');
/*!40000 ALTER TABLE `types_contacts` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_eps
CREATE TABLE IF NOT EXISTS `types_eps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL DEFAULT '',
  `nit` varchar(50) DEFAULT '',
  `admin` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`),
  KEY `code_key` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_eps: ~54 rows (aproximadamente)
DELETE FROM `types_eps`;
/*!40000 ALTER TABLE `types_eps` DISABLE KEYS */;
INSERT INTO `types_eps` (`id`, `code`, `nit`, `admin`, `name`) VALUES
	(1, 'EAS016', '890904996-1', 'Empresas Públicas de Medellín Departamento Médico', 'Empresas Públicas de Medellín Departamento Médico'),
	(2, 'EAS027', '800112806-2', 'Fondo de Pasivo Social de Ferrocarriles', 'Fondo de Ferrocarriles Nacionales de Colombia (EPS)'),
	(3, 'EPS001', '830113831-0', 'Aliansalud EPS', 'Aliansalud EPS (Antes Colmédica)'),
	(4, 'EPS002', '800130907-4', 'Salud Total S.A.', 'Salud Total'),
	(5, 'EPS003', '800140949-6', 'Cafesalud EPS', 'Cafesalud'),
	(6, 'EPS005', '800251440-6', 'E.P.S Sanitas', 'Sanitas'),
	(7, 'EPS008', '860066942-7', 'Compensar Entidad Promotora de Salud', 'Compensar'),
	(8, 'EPS010', '800088702-2', 'EPS Sura', 'EPS Sura'),
	(9, 'EPS012', '890303093-5', 'Comfenalco Valle EPS', 'Comfenalco Valle'),
	(10, 'EPS016', '805000427-1', 'Coomeva EPS', 'Coomeva'),
	(11, 'EPS017', '830003564-7', 'Famisanar', 'Famisanar'),
	(12, 'EPS018', '805001157-2', 'Servicio Occidental de Salud S.O.S. S.A.', 'S.O.S. Servicio Occidental de Salud S.A.'),
	(13, 'EPS023', '830009783-0', 'Cruz Blanca S.A', 'Cruz Blanca'),
	(14, 'EPS033', '830074184-5', 'Saludvida S.A EPS', 'Saludvida'),
	(15, 'EPS037', '900156264-2', 'Nueva EPS', 'Nueva E.P.S.'),
	(16, 'MIN001', '900462447-5', 'Fondo de Solidaridad y Garantía Fosyga', 'Fosyga'),
	(17, 'MIN002', '900462447-5', 'Fondo de Solidaridad y Garantía Fosyga', 'Fosyga Régimen de Excepción'),
	(18, 'MIN003', '900462447-5', 'Fondo de Solidaridad y Garantía Fosyga', 'Fosyga Residente Exterior o Régimen Subsidiado'),
	(19, 'RES005', '890102257-3', 'Universidad del Atlántico', 'Universidad del Atlántico'),
	(20, 'RES006', '890203183-0', 'Universidad Industrial de Santander', 'Universidad Industrial de Santander'),
	(21, 'RES007', '890399010-6', 'Universidad del Valle', 'Universidad del Valle'),
	(22, 'RES008', '899999063-3', 'Universidad Nacional de Colombia', 'Universidad Nacional de Colombia'),
	(23, 'RES009', '891500319-2', 'Universidad del Cauca', 'Universidad del Cauca'),
	(24, 'RES011', '890980040-8', 'Universidad de Antioquia', 'Universidad de Antioquia'),
	(25, 'RES012', '891080031-3', 'Universidad de Córdoba', 'Universidad de Córdoba'),
	(26, 'RES014', '891800330-1', 'Universidad Pedagógica y Tecnológica de Colombia - UPTC', 'Universidad Pedagógica - UPTC'),
	(27, 'EPSC03', '8001409496', 'Cafesalud Entidad  Promotora de Salud S.A', 'Cafesalud- Movilidad'),
	(28, 'EPSC22', '899999107', 'Entidad Administradora de Régimen Subsidiado Convida', 'Convida'),
	(29, 'EPSC25', '891856000', 'Capresoca EPS', 'Capresoca'),
	(30, 'EPSC34', '900298372', 'Capital Salud EPSS S.A.S.', 'Capital Salud'),
	(31, 'EPSIC1', '824001398', 'Asociación de Cabildos Indígenas del Cesar “Dusakawi”', 'Dusakawi'),
	(32, 'EPSIC2', '812002376', 'Asociación de Cabildos Indígenas del Resguardo Indígena Zenú de San Andrés de Sotavento Córdoba - Sucre "Manexka"', 'Manexka'),
	(33, 'EPSIC3', '817001773', 'Asociación Indígena del Cauca - A.I.C.', 'A.I.C.'),
	(34, 'EPSIC4', '839000495', 'Entidad Promotora de Salud Anas Wayuu EPSI', 'Anas Wayuu'),
	(35, 'EPSIC5', '837000084', 'Entidad Promotora de Salud Mallamas EPSI', 'Mallamas'),
	(36, 'EPSIC6', '809008362', 'Entidad Promotora de Salud Pijaosalud EPSI', 'Pijaosalud'),
	(37, 'ESSC02', '811004055', 'Empresa Mutual para el desarrollo integral de la salud E.S.S. Emdisalud ESS', 'Emdisalud'),
	(38, 'ESSC07', '806008394', 'Asociación Mutual Ser Empresa Solidaría de Salud ESS', 'Mutual Ser'),
	(39, 'ESSC18', '814000337', 'Asociación Mutual Empresa Solidaria de Salud de Nariño E.S.S. Emssanar E.S.S.', 'Emssanar'),
	(40, 'ESSC24', '800249241', 'Cooperativa de Salud y Desarrollo Integral de la Zona Sur Oriental de Cartagena  b aLtda.  Coosalud E.S.S.', 'Coosalud'),
	(41, 'ESSC33', '804002105', 'Cooperativa de Salud Comunitaria "Comparta"', 'Comparta'),
	(42, 'ESSC62', '817000248', 'Asociación Mutual La Esperanza Asmet Salud', 'Asmet Salud'),
	(43, 'ESSC76', '818000140', 'Asociación Mutual Barrios Unidos de Quibdó E.S.S. AMBUQ', 'Ambuq'),
	(44, 'ESSC91', '832000760', 'Entidad Cooperativa Solidaria de Salud Ecoopsos', 'Ecoopsos'),
	(45, 'EPS 040', '900604350', 'Caja de Compensación Familiar de Antioquía - Comfama - Hoy Savia Salud EPS', 'Savia Salud'),
	(46, 'CCFC09', '891800213', 'Comfaboy EPS-CCF de Boyacá', 'Comfaboy'),
	(47, 'CCFC15', '891080005', 'Comfacor EPS – CCF de Córdoba', 'Comfacor'),
	(48, 'CCFC20', '891600091', 'Comfachoco – CCF del Chocó', 'Comfachoco'),
	(49, 'CCFC23', '892115006', 'Caja de Compensación Familiar de La Guajira', 'Comfamiliar Guajira'),
	(50, 'CCFC24', '891180008', 'Comfamiliar Huila EPS – CCF', 'Comfamilar Huila'),
	(51, 'CCFC27', '891280008', 'Comfamiliar de Nariño EPS – CCF', 'Comfamiliar de Nariño'),
	(52, 'CCFC33', '892200015', 'Comfasucre EPS-CCF de Sucre', 'Comfasucre'),
	(53, 'CCFC53', '860045904', 'Comfacundi - CCF de Cundinamarca', 'Comfacundi'),
	(54, 'CCFC55', '890102044', 'Cajacopi Atlántico  - CCF', 'Cajacopi Atlántico');
/*!40000 ALTER TABLE `types_eps` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_events
CREATE TABLE IF NOT EXISTS `types_events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `colorClass` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_events: ~3 rows (aproximadamente)
DELETE FROM `types_events`;
/*!40000 ALTER TABLE `types_events` DISABLE KEYS */;
INSERT INTO `types_events` (`id`, `name`, `colorClass`) VALUES
	(1, 'Visita Técnica', 'Blue'),
	(2, 'Entrega de Productos', 'Green'),
	(3, 'Gestión Administrativa', 'Gray');
/*!40000 ALTER TABLE `types_events` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_genders
CREATE TABLE IF NOT EXISTS `types_genders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_genders: ~2 rows (aproximadamente)
DELETE FROM `types_genders`;
/*!40000 ALTER TABLE `types_genders` DISABLE KEYS */;
INSERT INTO `types_genders` (`id`, `name`) VALUES
	(1, 'Hombre'),
	(2, 'Mujer'),
	(3, 'Sin expecificar');
/*!40000 ALTER TABLE `types_genders` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_identifications
CREATE TABLE IF NOT EXISTS `types_identifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `code` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_identifications: ~10 rows (aproximadamente)
DELETE FROM `types_identifications`;
/*!40000 ALTER TABLE `types_identifications` DISABLE KEYS */;
INSERT INTO `types_identifications` (`id`, `name`, `code`) VALUES
	(1, 'Cédula de Ciudadanía', 'CC'),
	(2, 'Número de Identificación Tributaria', 'NIT'),
	(3, 'Tarjeta Pasaporte', 'TP'),
	(4, 'Tarjeta de Identidad', 'TI'),
	(5, 'Cédula de Identidad', 'CI'),
	(6, 'Registro Civil', 'RC'),
	(7, 'Cédula de Extranjería', 'CE'),
	(8, 'Carné de Identidad', 'CI'),
	(9, 'Documento Nacional de Identidad', 'DNI'),
	(10, 'Documento Único de Identidad', 'DUI'),
	(11, 'Identificación Oficial', 'ID');
/*!40000 ALTER TABLE `types_identifications` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_letters_addresses
CREATE TABLE IF NOT EXISTS `types_letters_addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=183 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_letters_addresses: ~174 rows (aproximadamente)
DELETE FROM `types_letters_addresses`;
/*!40000 ALTER TABLE `types_letters_addresses` DISABLE KEYS */;
INSERT INTO `types_letters_addresses` (`id`, `name`) VALUES
	(1, 'A'),
	(2, 'AA'),
	(3, 'AAA'),
	(4, 'AB'),
	(5, 'AC'),
	(6, 'AF'),
	(7, 'B'),
	(8, 'BB'),
	(9, 'BBB'),
	(10, 'BC'),
	(11, 'BD'),
	(12, 'BE'),
	(13, 'C'),
	(14, 'CC'),
	(15, 'CCC'),
	(16, 'D'),
	(17, 'DA'),
	(18, 'DB'),
	(19, 'DD'),
	(20, 'DDD'),
	(21, 'E'),
	(22, 'EE'),
	(23, 'EEE'),
	(24, 'F'),
	(25, 'FF'),
	(26, 'FFF'),
	(27, 'G'),
	(28, 'GG'),
	(29, 'GGG'),
	(30, 'H'),
	(31, 'HA'),
	(32, 'HB'),
	(33, 'HC'),
	(34, 'HD'),
	(35, 'HE'),
	(36, 'HF'),
	(37, 'HG'),
	(38, 'I'),
	(39, 'IA'),
	(40, 'IB'),
	(41, 'IC'),
	(42, 'ID'),
	(43, 'IE'),
	(44, 'IF'),
	(45, 'IG'),
	(46, 'J'),
	(47, 'JA'),
	(48, 'JB'),
	(49, 'JC'),
	(50, 'JD'),
	(51, 'JE'),
	(52, 'JF'),
	(53, 'JG'),
	(54, 'K'),
	(55, 'KA'),
	(56, 'KB'),
	(57, 'KC'),
	(58, 'KD'),
	(59, 'KE'),
	(60, 'KF'),
	(61, 'KG'),
	(62, 'L'),
	(63, 'LA'),
	(64, 'LB'),
	(65, 'LC'),
	(66, 'LD'),
	(67, 'LE'),
	(68, 'LF'),
	(69, 'LG'),
	(70, 'M'),
	(71, 'MA'),
	(72, 'MB'),
	(73, 'MC'),
	(74, 'MD'),
	(75, 'ME'),
	(76, 'MF'),
	(77, 'MG'),
	(78, 'N'),
	(79, 'NA'),
	(80, 'NB'),
	(81, 'NC'),
	(82, 'ND'),
	(83, 'NE'),
	(84, 'NF'),
	(85, 'NG'),
	(86, 'O'),
	(87, 'OA'),
	(88, 'OB'),
	(89, 'OC'),
	(90, 'OD'),
	(91, 'OE'),
	(92, 'OF'),
	(93, 'OG'),
	(94, 'P'),
	(95, 'PA'),
	(96, 'PB'),
	(97, 'PC'),
	(98, 'PD'),
	(99, 'PE'),
	(100, 'PF'),
	(101, 'PG'),
	(102, 'Q'),
	(103, 'QA'),
	(104, 'QB'),
	(105, 'QC'),
	(106, 'QD'),
	(107, 'QE'),
	(108, 'QF'),
	(109, 'QG'),
	(110, 'R'),
	(111, 'RA'),
	(112, 'RB'),
	(113, 'RC'),
	(114, 'RD'),
	(115, 'RE'),
	(116, 'RF'),
	(117, 'RG'),
	(118, 'S'),
	(119, 'SA'),
	(120, 'SB'),
	(121, 'SC'),
	(122, 'SD'),
	(123, 'SE'),
	(124, 'SF'),
	(125, 'SG'),
	(126, 'T'),
	(127, 'TA'),
	(128, 'TB'),
	(129, 'TC'),
	(130, 'TD'),
	(131, 'TE'),
	(132, 'TF'),
	(133, 'TG'),
	(134, 'U'),
	(135, 'UA'),
	(136, 'UB'),
	(137, 'UC'),
	(138, 'UD'),
	(139, 'UE'),
	(140, 'UF'),
	(141, 'UG'),
	(142, 'V'),
	(143, 'VA'),
	(144, 'VB'),
	(145, 'VC'),
	(146, 'VD'),
	(147, 'VE'),
	(148, 'VE'),
	(149, 'VF'),
	(150, 'VG'),
	(151, 'W'),
	(152, 'WA'),
	(153, 'WB'),
	(154, 'WC'),
	(155, 'WD'),
	(156, 'WE'),
	(157, 'WF'),
	(158, 'WG'),
	(159, 'X'),
	(160, 'XA'),
	(161, 'XB'),
	(162, 'XC'),
	(163, 'XD'),
	(164, 'XE'),
	(165, 'XF'),
	(166, 'XG'),
	(167, 'Y'),
	(168, 'YA'),
	(169, 'YB'),
	(170, 'YC'),
	(171, 'YD'),
	(172, 'YE'),
	(173, 'YF'),
	(174, 'YG'),
	(175, 'Z'),
	(176, 'ZA'),
	(177, 'ZB'),
	(178, 'ZC'),
	(179, 'ZD'),
	(180, 'ZE'),
	(181, 'ZF'),
	(182, 'ZG');
/*!40000 ALTER TABLE `types_letters_addresses` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_meditions
CREATE TABLE IF NOT EXISTS `types_meditions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `code` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.types_meditions: ~0 rows (aproximadamente)
DELETE FROM `types_meditions`;
/*!40000 ALTER TABLE `types_meditions` DISABLE KEYS */;
INSERT INTO `types_meditions` (`id`, `name`, `code`) VALUES
	(1, 'Medicion 1', 'DEMO');
/*!40000 ALTER TABLE `types_meditions` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_quadrants
CREATE TABLE IF NOT EXISTS `types_quadrants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.types_quadrants: ~4 rows (aproximadamente)
DELETE FROM `types_quadrants`;
/*!40000 ALTER TABLE `types_quadrants` DISABLE KEYS */;
INSERT INTO `types_quadrants` (`id`, `name`) VALUES
	(1, 'Este'),
	(2, 'Norte'),
	(3, 'Oeste'),
	(4, 'Sur');
/*!40000 ALTER TABLE `types_quadrants` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_roads
CREATE TABLE IF NOT EXISTS `types_roads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `code` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_roads: ~64 rows (aproximadamente)
DELETE FROM `types_roads`;
/*!40000 ALTER TABLE `types_roads` DISABLE KEYS */;
INSERT INTO `types_roads` (`id`, `name`, `code`) VALUES
	(1, 'Administración', 'AD'),
	(2, 'Aeropuerto', 'AE'),
	(3, 'Agrupación', 'AG'),
	(4, 'Altillo', 'AL'),
	(5, 'Apartamento', 'AP'),
	(6, 'Autopista', 'AU'),
	(7, 'Avenida', 'AV'),
	(8, 'Avenida Calle', 'AC'),
	(9, 'Avenida Carrera', 'AK'),
	(10, 'Barrio', 'BR'),
	(11, 'Bis', 'BIS'),
	(12, 'Bloque', 'BQ'),
	(13, 'Bodega', 'BG'),
	(14, 'Bulevar', 'BL'),
	(15, 'Calle', 'CL'),
	(16, 'Carrera', 'KR'),
	(17, 'Carretera', 'CT'),
	(18, 'Casa', 'CS'),
	(19, 'Célula', 'CU'),
	(20, 'Centro Comercial', 'CE'),
	(21, 'Circular', 'CQ'),
	(22, 'Circunvalar', 'CV'),
	(23, 'Ciudadela', 'CD'),
	(24, 'Conjunto Residencial', 'CO'),
	(25, 'Consultorio', 'CN'),
	(26, 'Cuentas Corridas', 'CC'),
	(27, 'Deposito', 'DP'),
	(28, 'Deposito Sótano', 'DS'),
	(29, 'Diagonal', 'DG'),
	(30, 'Edificio', 'ED'),
	(31, 'Entrada', 'EN'),
	(32, 'Esquina', 'EQ'),
	(33, 'Etapa', 'ET'),
	(34, 'Estación', 'ES'),
	(35, 'Exterior', 'EX'),
	(36, 'Este', 'ESTE'),
	(37, 'Finca', 'FI'),
	(38, 'Garaje', 'GA'),
	(39, 'Garaje Sótano', 'GS'),
	(40, 'Interior', 'IN'),
	(41, 'Kilómetro', 'KM'),
	(42, 'Local', 'LC'),
	(43, 'Local Mezzanine', 'LM'),
	(44, 'Lote', 'LT'),
	(45, 'Manzana', 'MZ'),
	(46, 'Mezzanine', 'MN'),
	(47, 'Módulo', 'MD'),
	(48, 'Norte', 'NORTE'),
	(49, 'Oeste', 'OESTE'),
	(50, 'Oficina', 'OF'),
	(51, 'Parque', 'PQ'),
	(52, 'Parqueadero', 'PA'),
	(53, 'Pasaje', 'PJ'),
	(54, 'Paseo', 'PS'),
	(55, 'Peatonal', 'PT'),
	(56, 'Pent-House', 'PN'),
	(57, 'Piso', 'PI'),
	(58, 'Planta', 'PL'),
	(59, 'Predio', 'PD'),
	(60, 'Portería', 'PR'),
	(61, 'Puesto', 'PU'),
	(62, 'Round Point (Glorieta)', 'RP'),
	(63, 'Semisótano', 'SS'),
	(64, 'Sótano', 'SO'),
	(65, 'Sector', 'SC'),
	(66, 'Suite', 'ST'),
	(67, 'Supermanzana', 'SM'),
	(68, 'Sur', 'SUR'),
	(69, 'Terraza', 'TZ'),
	(70, 'Torre', 'TO'),
	(71, 'Transversal', 'TV'),
	(72, 'Troncal', 'TC'),
	(73, 'Unidad', 'UN'),
	(74, 'Unidad Residencial ', 'UL'),
	(75, 'Urbanización', 'UR'),
	(76, 'Variante', 'VT'),
	(77, 'Vía', 'VI'),
	(78, 'Zona', 'ZN');
/*!40000 ALTER TABLE `types_roads` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_tasks
CREATE TABLE IF NOT EXISTS `types_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.types_tasks: ~5 rows (aproximadamente)
DELETE FROM `types_tasks`;
/*!40000 ALTER TABLE `types_tasks` DISABLE KEYS */;
INSERT INTO `types_tasks` (`id`, `name`) VALUES
	(1, 'Visita en sitio'),
	(2, 'Agendar Visita'),
	(3, 'Enviar Productos/Servicios'),
	(4, 'Crear Inventario'),
	(5, 'Comunicarme con cliente');
/*!40000 ALTER TABLE `types_tasks` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `names` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `second_surname` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `mail` varchar(150) NOT NULL,
  `permissions` int(11) NOT NULL,
  `password` text NOT NULL,
  `avatar` int(11) DEFAULT NULL,
  `registered` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `id` (`id`),
  KEY `FK_users_permissions` (`permissions`),
  KEY `FK_users_pictures` (`avatar`),
  CONSTRAINT `FK_users_permissions` FOREIGN KEY (`permissions`) REFERENCES `permissions` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_users_pictures` FOREIGN KEY (`avatar`) REFERENCES `pictures` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.users: ~0 rows (aproximadamente)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `names`, `surname`, `second_surname`, `phone`, `mobile`, `mail`, `permissions`, `password`, `avatar`, `registered`, `updated`) VALUES
	(1, 'admin', 'Andres Felipe', 'Gomez', 'Maya', '2745002', '3005473082', 'soporte@monteverdeltda.com', 1, '1035429360', 2, '2019-02-01 19:40:59', '2019-06-11 16:15:11');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;