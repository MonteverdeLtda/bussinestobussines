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

-- Volcando estructura para tabla admin_mv1.accounts
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) DEFAULT NULL,
  `identification_type` int(11) DEFAULT NULL,
  `identification_number` varchar(50) DEFAULT NULL,
  `names` varchar(250) NOT NULL,
  `address_principal` varchar(250) NOT NULL,
  `address_principal_department` int(11) DEFAULT NULL,
  `address_principal_city` int(11) DEFAULT NULL,
  `address_invoices` varchar(250) DEFAULT NULL,
  `address_invoices_department` int(11) DEFAULT NULL,
  `address_invoices_city` int(11) DEFAULT NULL,
  `represent_legal` int(11) DEFAULT NULL,
  `contact` int(11) DEFAULT NULL,
  `audit_enabled` int(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_accounts_identification_number` (`identification_number`),
  KEY `FK_accounts_contact` (`contact`),
  KEY `FK_accounts_represent_legal` (`represent_legal`),
  KEY `FK_accounts_identification_type` (`identification_type`),
  KEY `FK_accounts_address_principal_department` (`address_principal_department`),
  KEY `FK_accounts_address_invoices_department` (`address_invoices_department`),
  KEY `FK_accounts_address_principal_city` (`address_principal_city`),
  KEY `FK_accounts_address_invoices_city` (`address_invoices_city`),
  KEY `FK_accounts_id` (`id`),
  KEY `FK_accounts_name` (`names`),
  KEY `FK_accounts_address_principal` (`address_principal`),
  KEY `FK_accounts_address_invoices` (`address_invoices`),
  KEY `FK_accounts_audit_enabled` (`audit_enabled`),
  KEY `FK_accounts_type` (`type`),
  CONSTRAINT `FK_accounts_address_invoices_city` FOREIGN KEY (`address_invoices_city`) REFERENCES `geo_citys` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_accounts_address_invoices_department` FOREIGN KEY (`address_invoices_department`) REFERENCES `geo_departments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_accounts_address_principal_city` FOREIGN KEY (`address_principal_city`) REFERENCES `geo_citys` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_accounts_address_principal_department` FOREIGN KEY (`address_principal_department`) REFERENCES `geo_departments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_accounts_identification_type` FOREIGN KEY (`identification_type`) REFERENCES `types_identifications` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_accounts_type` FOREIGN KEY (`type`) REFERENCES `types_accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.accounts: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
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
  CONSTRAINT `FK_accounts_addresses_accounts` FOREIGN KEY (`account`) REFERENCES `accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_accounts_addresses_addresses` FOREIGN KEY (`address`) REFERENCES `addresses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.accounts_addresses: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `accounts_addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_addresses` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.accounts_calendar
CREATE TABLE IF NOT EXISTS `accounts_calendar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client` int(1) NOT NULL,
  `calendar` int(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_calendar_clients_clients` (`client`),
  KEY `FK_calendar_clients_calendar` (`calendar`),
  CONSTRAINT `FK_calendar_clients_calendar` FOREIGN KEY (`calendar`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_calendar_clients_clients` FOREIGN KEY (`client`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.accounts_calendar: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `accounts_calendar` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_calendar` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.accounts_contacts
CREATE TABLE IF NOT EXISTS `accounts_contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client` int(11) NOT NULL,
  `contact` int(11) NOT NULL,
  `type_contact` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_crew_clients_clients` (`client`),
  KEY `FK_crew_clients_contacts` (`contact`),
  KEY `FK_crew_clients_types_contacts` (`type_contact`),
  CONSTRAINT `accounts_contacts_ibfk_1` FOREIGN KEY (`client`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `accounts_contacts_ibfk_2` FOREIGN KEY (`contact`) REFERENCES `contacts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `accounts_contacts_ibfk_3` FOREIGN KEY (`type_contact`) REFERENCES `types_contacts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.accounts_contacts: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `accounts_contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_contacts` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.accounts_invoices
CREATE TABLE IF NOT EXISTS `accounts_invoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client` int(11) NOT NULL,
  `contract` int(11) NOT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `validity` datetime NOT NULL,
  `status` int(11) NOT NULL,
  `total` float DEFAULT NULL,
  `values` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_invoices_clients_af_clients` (`client`),
  KEY `FK_invoices_clients_af_contracts_clients` (`contract`),
  KEY `FK_af_invoices_clients_status_invoices` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.accounts_invoices: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `accounts_invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_invoices` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.addresses
CREATE TABLE IF NOT EXISTS `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `place_id` int(11) NOT NULL,
  `place_rank` double NOT NULL,
  `address_input` varchar(250) NOT NULL,
  `display_name` varchar(250) NOT NULL,
  `city` int(11) NOT NULL,
  `department` int(11) NOT NULL,
  `lat` double NOT NULL,
  `lon` double NOT NULL,
  `completo` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_place_id` (`place_id`),
  KEY `FK_addresses_geo_citys` (`city`),
  KEY `FK_addresses_geo_departments` (`department`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.addresses: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.contacts
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identification_type` int(11) DEFAULT NULL,
  `identification_number` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `second_name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) NOT NULL,
  `second_surname` varchar(50) DEFAULT NULL,
  `birthdaydate` date DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `phone_mobile` varchar(20) DEFAULT NULL,
  `mail` varchar(200) DEFAULT NULL,
  `department` int(11) DEFAULT NULL,
  `city` int(11) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_contacts_types_identifications` (`identification_type`),
  KEY `FK_contacts_geo_departments` (`department`),
  KEY `FK_contacts_geo_citys` (`city`),
  CONSTRAINT `FK_contacts_geo_citys` FOREIGN KEY (`city`) REFERENCES `geo_citys` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_contacts_geo_departments` FOREIGN KEY (`department`) REFERENCES `geo_departments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_contacts_identification_types` FOREIGN KEY (`identification_type`) REFERENCES `types_identifications` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.contacts: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.crew_technical_visits
CREATE TABLE IF NOT EXISTS `crew_technical_visits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee` (`employee`),
  KEY `id` (`id`),
  KEY `FK_contacts_employees_employees` (`employee`),
  CONSTRAINT `crew_technical_visits_ibfk_2` FOREIGN KEY (`employee`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.crew_technical_visits: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `crew_technical_visits` DISABLE KEYS */;
/*!40000 ALTER TABLE `crew_technical_visits` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.employees
CREATE TABLE IF NOT EXISTS `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `second_name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `second_surname` varchar(50) DEFAULT NULL,
  `identification_type` int(11) DEFAULT NULL,
  `identification_number` varchar(50) DEFAULT NULL,
  `identification_date_expedition` date DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `blood_type` int(11) DEFAULT NULL,
  `blood_rh` int(11) DEFAULT NULL,
  `mail` varchar(50) DEFAULT NULL,
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
  `department` int(11) DEFAULT NULL,
  `city` int(11) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `geo_address` varchar(100) DEFAULT NULL,
  `observations` text,
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
  KEY `FK_employees_geo_departments` (`department`),
  KEY `FK_employees_geo_citys` (`city`),
  KEY `FK_employees_pictures` (`avatar`),
  CONSTRAINT `FK_employees_arls` FOREIGN KEY (`arl`) REFERENCES `types_arls` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_pictures` FOREIGN KEY (`avatar`) REFERENCES `pictures` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`eps`) REFERENCES `types_eps` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_10` FOREIGN KEY (`identification_type`) REFERENCES `types_identifications` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`compensation_fund`) REFERENCES `funds_compensations` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_3` FOREIGN KEY (`pension_fund`) REFERENCES `funds_pensions` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_4` FOREIGN KEY (`severance_fund`) REFERENCES `funds_severances` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_5` FOREIGN KEY (`city`) REFERENCES `geo_citys` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_6` FOREIGN KEY (`department`) REFERENCES `geo_departments` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_7` FOREIGN KEY (`status`) REFERENCES `status_employees` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_8` FOREIGN KEY (`blood_type`) REFERENCES `types_bloods` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_9` FOREIGN KEY (`blood_rh`) REFERENCES `types_bloods_rhs` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.employees: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.employees_calendar: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `employees_calendar` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees_calendar` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.employees_contacts
CREATE TABLE IF NOT EXISTS `employees_contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee` int(11) NOT NULL,
  `contact` int(11) NOT NULL,
  `type_contact` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_contacts_employees_employees` (`employee`),
  KEY `FK_contacts_employees_contacts` (`contact`),
  KEY `FK_crew_employees_types_contacts` (`type_contact`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.employees_contacts: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `employees_contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees_contacts` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.events
CREATE TABLE IF NOT EXISTS `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `all_day` int(1) DEFAULT '0',
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `type` int(11) NOT NULL,
  `request` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_calendar_types_calendars` (`type`),
  KEY `FK_calendar_requests` (`request`),
  CONSTRAINT `FK_calendar_requests` FOREIGN KEY (`request`) REFERENCES `requests` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_calendar_types_calendars` FOREIGN KEY (`type`) REFERENCES `types_events` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.events: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
/*!40000 ALTER TABLE `events` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.funds_compensations
CREATE TABLE IF NOT EXISTS `funds_compensations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.funds_compensations: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `funds_compensations` DISABLE KEYS */;
INSERT IGNORE INTO `funds_compensations` (`id`, `code`, `name`) VALUES
	(1, 'C001', 'COMFAMA'),
	(2, 'C002', 'COMFENALCO');
/*!40000 ALTER TABLE `funds_compensations` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.funds_pensions
CREATE TABLE IF NOT EXISTS `funds_pensions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.funds_pensions: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `funds_pensions` DISABLE KEYS */;
INSERT IGNORE INTO `funds_pensions` (`id`, `code`, `name`) VALUES
	(2, 'FUND001', 'PROTECCION');
/*!40000 ALTER TABLE `funds_pensions` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.funds_severances
CREATE TABLE IF NOT EXISTS `funds_severances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.funds_severances: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `funds_severances` DISABLE KEYS */;
INSERT IGNORE INTO `funds_severances` (`id`, `code`, `name`) VALUES
	(1, 'NN', 'Ninguna'),
	(2, 'FS001', 'Primera'),
	(3, 'FS002', 'PROTECCION');
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
/*!40000 ALTER TABLE `geo_citys` DISABLE KEYS */;
INSERT IGNORE INTO `geo_citys` (`id`, `name`, `department`) VALUES
	(1, 'Abriaquí', 5),
	(2, 'Acacías', 50),
	(3, 'Acandí', 27),
	(4, 'Acevedo', 41),
	(5, 'Achí', 13),
	(6, 'Agrado', 41),
	(7, 'Agua de Dios', 25),
	(8, 'Aguachica', 20),
	(9, 'Aguada', 68),
	(10, 'Aguadas', 17),
	(11, 'Aguazul', 85),
	(12, 'Agustín Codazzi', 20),
	(13, 'Aipe', 41),
	(14, 'Albania', 18),
	(15, 'Albania', 44),
	(16, 'Albania', 68),
	(17, 'Albán', 25),
	(18, 'Albán (San José)', 52),
	(19, 'Alcalá', 76),
	(20, 'Alejandria', 5),
	(21, 'Algarrobo', 47),
	(22, 'Algeciras', 41),
	(23, 'Almaguer', 19),
	(24, 'Almeida', 15),
	(25, 'Alpujarra', 73),
	(26, 'Altamira', 41),
	(27, 'Alto Baudó (Pie de Pato)', 27),
	(28, 'Altos del Rosario', 13),
	(29, 'Alvarado', 73),
	(30, 'Amagá', 5),
	(31, 'Amalfi', 5),
	(32, 'Ambalema', 73),
	(33, 'Anapoima', 25),
	(34, 'Ancuya', 52),
	(35, 'Andalucía', 76),
	(36, 'Andes', 5),
	(37, 'Angelópolis', 5),
	(38, 'Angostura', 5),
	(39, 'Anolaima', 25),
	(40, 'Anorí', 5),
	(41, 'Anserma', 17),
	(42, 'Ansermanuevo', 76),
	(43, 'Anzoátegui', 73),
	(44, 'Anzá', 5),
	(45, 'Apartadó', 5),
	(46, 'Apulo', 25),
	(47, 'Apía', 66),
	(48, 'Aquitania', 15),
	(49, 'Aracataca', 47),
	(50, 'Aranzazu', 17),
	(51, 'Aratoca', 68),
	(52, 'Arauca', 81),
	(53, 'Arauquita', 81),
	(54, 'Arbeláez', 25),
	(55, 'Arboleda (Berruecos)', 52),
	(56, 'Arboledas', 54),
	(57, 'Arboletes', 5),
	(58, 'Arcabuco', 15),
	(59, 'Arenal', 13),
	(60, 'Argelia', 5),
	(61, 'Argelia', 19),
	(62, 'Argelia', 76),
	(63, 'Ariguaní (El Difícil)', 47),
	(64, 'Arjona', 13),
	(65, 'Armenia', 5),
	(66, 'Armenia', 63),
	(67, 'Armero (Guayabal)', 73),
	(68, 'Arroyohondo', 13),
	(69, 'Astrea', 20),
	(70, 'Ataco', 73),
	(71, 'Atrato (Yuto)', 27),
	(72, 'Ayapel', 23),
	(73, 'Bagadó', 27),
	(74, 'Bahía Solano (Mútis)', 27),
	(75, 'Bajo Baudó (Pizarro)', 27),
	(76, 'Balboa', 19),
	(77, 'Balboa', 66),
	(78, 'Baranoa', 8),
	(79, 'Baraya', 41),
	(80, 'Barbacoas', 52),
	(81, 'Barbosa', 5),
	(82, 'Barbosa', 68),
	(83, 'Barichara', 68),
	(84, 'Barranca de Upía', 50),
	(85, 'Barrancabermeja', 68),
	(86, 'Barrancas', 44),
	(87, 'Barranco de Loba', 13),
	(88, 'Barranquilla', 8),
	(89, 'Becerríl', 20),
	(90, 'Belalcázar', 17),
	(91, 'Bello', 5),
	(92, 'Belmira', 5),
	(93, 'Beltrán', 25),
	(94, 'Belén', 15),
	(95, 'Belén', 52),
	(96, 'Belén de Bajirá', 27),
	(97, 'Belén de Umbría', 66),
	(98, 'Belén de los Andaquíes', 18),
	(99, 'Berbeo', 15),
	(100, 'Betania', 5),
	(101, 'Beteitiva', 15),
	(102, 'Betulia', 5),
	(103, 'Betulia', 68),
	(104, 'Bituima', 25),
	(105, 'Boavita', 15),
	(106, 'Bochalema', 54),
	(107, 'Bogotá D.C.', 11),
	(108, 'Bojacá', 25),
	(109, 'Bojayá (Bellavista)', 27),
	(110, 'Bolívar', 5),
	(111, 'Bolívar', 19),
	(112, 'Bolívar', 68),
	(113, 'Bolívar', 76),
	(114, 'Bosconia', 20),
	(115, 'Boyacá', 15),
	(116, 'Briceño', 5),
	(117, 'Briceño', 15),
	(118, 'Bucaramanga', 68),
	(119, 'Bucarasica', 54),
	(120, 'Buenaventura', 76),
	(121, 'Buenavista', 15),
	(122, 'Buenavista', 23),
	(123, 'Buenavista', 63),
	(124, 'Buenavista', 70),
	(125, 'Buenos Aires', 19),
	(126, 'Buesaco', 52),
	(127, 'Buga', 76),
	(128, 'Bugalagrande', 76),
	(129, 'Burítica', 5),
	(130, 'Busbanza', 15),
	(131, 'Cabrera', 25),
	(132, 'Cabrera', 68),
	(133, 'Cabuyaro', 50),
	(134, 'Cachipay', 25),
	(135, 'Caicedo', 5),
	(136, 'Caicedonia', 76),
	(137, 'Caimito', 70),
	(138, 'Cajamarca', 73),
	(139, 'Cajibío', 19),
	(140, 'Cajicá', 25),
	(141, 'Calamar', 13),
	(142, 'Calamar', 95),
	(143, 'Calarcá', 63),
	(144, 'Caldas', 5),
	(145, 'Caldas', 15),
	(146, 'Caldono', 19),
	(147, 'California', 68),
	(148, 'Calima (Darién)', 76),
	(149, 'Caloto', 19),
	(150, 'Calí', 76),
	(151, 'Campamento', 5),
	(152, 'Campo de la Cruz', 8),
	(153, 'Campoalegre', 41),
	(154, 'Campohermoso', 15),
	(155, 'Canalete', 23),
	(156, 'Candelaria', 8),
	(157, 'Candelaria', 76),
	(158, 'Cantagallo', 13),
	(159, 'Cantón de San Pablo', 27),
	(160, 'Caparrapí', 25),
	(161, 'Capitanejo', 68),
	(162, 'Caracolí', 5),
	(163, 'Caramanta', 5),
	(164, 'Carcasí', 68),
	(165, 'Carepa', 5),
	(166, 'Carmen de Apicalá', 73),
	(167, 'Carmen de Carupa', 25),
	(168, 'Carmen de Viboral', 5),
	(169, 'Carmen del Darién (CURBARADÓ)', 27),
	(170, 'Carolina', 5),
	(171, 'Cartagena', 13),
	(172, 'Cartagena del Chairá', 18),
	(173, 'Cartago', 76),
	(174, 'Carurú', 97),
	(175, 'Casabianca', 73),
	(176, 'Castilla la Nueva', 50),
	(177, 'Caucasia', 5),
	(178, 'Cañasgordas', 5),
	(179, 'Cepita', 68),
	(180, 'Cereté', 23),
	(181, 'Cerinza', 15),
	(182, 'Cerrito', 68),
	(183, 'Cerro San Antonio', 47),
	(184, 'Chachaguí', 52),
	(185, 'Chaguaní', 25),
	(186, 'Chalán', 70),
	(187, 'Chaparral', 73),
	(188, 'Charalá', 68),
	(189, 'Charta', 68),
	(190, 'Chigorodó', 5),
	(191, 'Chima', 68),
	(192, 'Chimichagua', 20),
	(193, 'Chimá', 23),
	(194, 'Chinavita', 15),
	(195, 'Chinchiná', 17),
	(196, 'Chinácota', 54),
	(197, 'Chinú', 23),
	(198, 'Chipaque', 25),
	(199, 'Chipatá', 68),
	(200, 'Chiquinquirá', 15),
	(201, 'Chiriguaná', 20),
	(202, 'Chiscas', 15),
	(203, 'Chita', 15),
	(204, 'Chitagá', 54),
	(205, 'Chitaraque', 15),
	(206, 'Chivatá', 15),
	(207, 'Chivolo', 47),
	(208, 'Choachí', 25),
	(209, 'Chocontá', 25),
	(210, 'Chámeza', 85),
	(211, 'Chía', 25),
	(212, 'Chíquiza', 15),
	(213, 'Chívor', 15),
	(214, 'Cicuco', 13),
	(215, 'Cimitarra', 68),
	(216, 'Circasia', 63),
	(217, 'Cisneros', 5),
	(218, 'Ciénaga', 15),
	(219, 'Ciénaga', 47),
	(220, 'Ciénaga de Oro', 23),
	(221, 'Clemencia', 13),
	(222, 'Cocorná', 5),
	(223, 'Coello', 73),
	(224, 'Cogua', 25),
	(225, 'Colombia', 41),
	(226, 'Colosó (Ricaurte)', 70),
	(227, 'Colón', 86),
	(228, 'Colón (Génova)', 52),
	(229, 'Concepción', 5),
	(230, 'Concepción', 68),
	(231, 'Concordia', 5),
	(232, 'Concordia', 47),
	(233, 'Condoto', 27),
	(234, 'Confines', 68),
	(235, 'Consaca', 52),
	(236, 'Contadero', 52),
	(237, 'Contratación', 68),
	(238, 'Convención', 54),
	(239, 'Copacabana', 5),
	(240, 'Coper', 15),
	(241, 'Cordobá', 63),
	(242, 'Corinto', 19),
	(243, 'Coromoro', 68),
	(244, 'Corozal', 70),
	(245, 'Corrales', 15),
	(246, 'Cota', 25),
	(247, 'Cotorra', 23),
	(248, 'Covarachía', 15),
	(249, 'Coveñas', 70),
	(250, 'Coyaima', 73),
	(251, 'Cravo Norte', 81),
	(252, 'Cuaspud (Carlosama)', 52),
	(253, 'Cubarral', 50),
	(254, 'Cubará', 15),
	(255, 'Cucaita', 15),
	(256, 'Cucunubá', 25),
	(257, 'Cucutilla', 54),
	(258, 'Cuitiva', 15),
	(259, 'Cumaral', 50),
	(260, 'Cumaribo', 99),
	(261, 'Cumbal', 52),
	(262, 'Cumbitara', 52),
	(263, 'Cunday', 73),
	(264, 'Curillo', 18),
	(265, 'Curití', 68),
	(266, 'Curumaní', 20),
	(267, 'Cáceres', 5),
	(268, 'Cáchira', 54),
	(269, 'Cácota', 54),
	(270, 'Cáqueza', 25),
	(271, 'Cértegui', 27),
	(272, 'Cómbita', 15),
	(273, 'Córdoba', 13),
	(274, 'Córdoba', 52),
	(275, 'Cúcuta', 54),
	(276, 'Dabeiba', 5),
	(277, 'Dagua', 76),
	(278, 'Dibulla', 44),
	(279, 'Distracción', 44),
	(280, 'Dolores', 73),
	(281, 'Don Matías', 5),
	(282, 'Dos Quebradas', 66),
	(283, 'Duitama', 15),
	(284, 'Durania', 54),
	(285, 'Ebéjico', 5),
	(286, 'El Bagre', 5),
	(287, 'El Banco', 47),
	(288, 'El Cairo', 76),
	(289, 'El Calvario', 50),
	(290, 'El Carmen', 54),
	(291, 'El Carmen', 68),
	(292, 'El Carmen de Atrato', 27),
	(293, 'El Carmen de Bolívar', 13),
	(294, 'El Castillo', 50),
	(295, 'El Cerrito', 76),
	(296, 'El Charco', 52),
	(297, 'El Cocuy', 15),
	(298, 'El Colegio', 25),
	(299, 'El Copey', 20),
	(300, 'El Doncello', 18),
	(301, 'El Dorado', 50),
	(302, 'El Dovio', 76),
	(303, 'El Espino', 15),
	(304, 'El Guacamayo', 68),
	(305, 'El Guamo', 13),
	(306, 'El Molino', 44),
	(307, 'El Paso', 20),
	(308, 'El Paujil', 18),
	(309, 'El Peñol', 52),
	(310, 'El Peñon', 13),
	(311, 'El Peñon', 68),
	(312, 'El Peñón', 25),
	(313, 'El Piñon', 47),
	(314, 'El Playón', 68),
	(315, 'El Retorno', 95),
	(316, 'El Retén', 47),
	(317, 'El Roble', 70),
	(318, 'El Rosal', 25),
	(319, 'El Rosario', 52),
	(320, 'El Tablón de Gómez', 52),
	(321, 'El Tambo', 19),
	(322, 'El Tambo', 52),
	(323, 'El Tarra', 54),
	(324, 'El Zulia', 54),
	(325, 'El Águila', 76),
	(326, 'Elías', 41),
	(327, 'Encino', 68),
	(328, 'Enciso', 68),
	(329, 'Entrerríos', 5),
	(330, 'Envigado', 5),
	(331, 'Espinal', 73),
	(332, 'Facatativá', 25),
	(333, 'Falan', 73),
	(334, 'Filadelfia', 17),
	(335, 'Filandia', 63),
	(336, 'Firavitoba', 15),
	(337, 'Flandes', 73),
	(338, 'Florencia', 18),
	(339, 'Florencia', 19),
	(340, 'Floresta', 15),
	(341, 'Florida', 76),
	(342, 'Floridablanca', 68),
	(343, 'Florián', 68),
	(344, 'Fonseca', 44),
	(345, 'Fortúl', 81),
	(346, 'Fosca', 25),
	(347, 'Francisco Pizarro', 52),
	(348, 'Fredonia', 5),
	(349, 'Fresno', 73),
	(350, 'Frontino', 5),
	(351, 'Fuente de Oro', 50),
	(352, 'Fundación', 47),
	(353, 'Funes', 52),
	(354, 'Funza', 25),
	(355, 'Fusagasugá', 25),
	(356, 'Fómeque', 25),
	(357, 'Fúquene', 25),
	(358, 'Gachalá', 25),
	(359, 'Gachancipá', 25),
	(360, 'Gachantivá', 15),
	(361, 'Gachetá', 25),
	(362, 'Galapa', 8),
	(363, 'Galeras (Nueva Granada)', 70),
	(364, 'Galán', 68),
	(365, 'Gama', 25),
	(366, 'Gamarra', 20),
	(367, 'Garagoa', 15),
	(368, 'Garzón', 41),
	(369, 'Gigante', 41),
	(370, 'Ginebra', 76),
	(371, 'Giraldo', 5),
	(372, 'Girardot', 25),
	(373, 'Girardota', 5),
	(374, 'Girón', 68),
	(375, 'Gonzalez', 20),
	(376, 'Gramalote', 54),
	(377, 'Granada', 5),
	(378, 'Granada', 25),
	(379, 'Granada', 50),
	(380, 'Guaca', 68),
	(381, 'Guacamayas', 15),
	(382, 'Guacarí', 76),
	(383, 'Guachavés', 52),
	(384, 'Guachené', 19),
	(385, 'Guachetá', 25),
	(386, 'Guachucal', 52),
	(387, 'Guadalupe', 5),
	(388, 'Guadalupe', 41),
	(389, 'Guadalupe', 68),
	(390, 'Guaduas', 25),
	(391, 'Guaitarilla', 52),
	(392, 'Gualmatán', 52),
	(393, 'Guamal', 47),
	(394, 'Guamal', 50),
	(395, 'Guamo', 73),
	(396, 'Guapota', 68),
	(397, 'Guapí', 19),
	(398, 'Guaranda', 70),
	(399, 'Guarne', 5),
	(400, 'Guasca', 25),
	(401, 'Guatapé', 5),
	(402, 'Guataquí', 25),
	(403, 'Guatavita', 25),
	(404, 'Guateque', 15),
	(405, 'Guavatá', 68),
	(406, 'Guayabal de Siquima', 25),
	(407, 'Guayabetal', 25),
	(408, 'Guayatá', 15),
	(409, 'Guepsa', 68),
	(410, 'Guicán', 15),
	(411, 'Gutiérrez', 25),
	(412, 'Guática', 66),
	(413, 'Gámbita', 68),
	(414, 'Gámeza', 15),
	(415, 'Génova', 63),
	(416, 'Gómez Plata', 5),
	(417, 'Hacarí', 54),
	(418, 'Hatillo de Loba', 13),
	(419, 'Hato', 68),
	(420, 'Hato Corozal', 85),
	(421, 'Hatonuevo', 44),
	(422, 'Heliconia', 5),
	(423, 'Herrán', 54),
	(424, 'Herveo', 73),
	(425, 'Hispania', 5),
	(426, 'Hobo', 41),
	(427, 'Honda', 73),
	(428, 'Ibagué', 73),
	(429, 'Icononzo', 73),
	(430, 'Iles', 52),
	(431, 'Imúes', 52),
	(432, 'Inzá', 19),
	(433, 'Inírida', 94),
	(434, 'Ipiales', 52),
	(435, 'Isnos', 41),
	(436, 'Istmina', 27),
	(437, 'Itagüí', 5),
	(438, 'Ituango', 5),
	(439, 'Izá', 15),
	(440, 'Jambaló', 19),
	(441, 'Jamundí', 76),
	(442, 'Jardín', 5),
	(443, 'Jenesano', 15),
	(444, 'Jericó', 5),
	(445, 'Jericó', 15),
	(446, 'Jerusalén', 25),
	(447, 'Jesús María', 68),
	(448, 'Jordán', 68),
	(449, 'Juan de Acosta', 8),
	(450, 'Junín', 25),
	(451, 'Juradó', 27),
	(452, 'La Apartada y La Frontera', 23),
	(453, 'La Argentina', 41),
	(454, 'La Belleza', 68),
	(455, 'La Calera', 25),
	(456, 'La Capilla', 15),
	(457, 'La Ceja', 5),
	(458, 'La Celia', 66),
	(459, 'La Cruz', 52),
	(460, 'La Cumbre', 76),
	(461, 'La Dorada', 17),
	(462, 'La Esperanza', 54),
	(463, 'La Estrella', 5),
	(464, 'La Florida', 52),
	(465, 'La Gloria', 20),
	(466, 'La Jagua de Ibirico', 20),
	(467, 'La Jagua del Pilar', 44),
	(468, 'La Llanada', 52),
	(469, 'La Macarena', 50),
	(470, 'La Merced', 17),
	(471, 'La Mesa', 25),
	(472, 'La Montañita', 18),
	(473, 'La Palma', 25),
	(474, 'La Paz', 68),
	(475, 'La Paz (Robles)', 20),
	(476, 'La Peña', 25),
	(477, 'La Pintada', 5),
	(478, 'La Plata', 41),
	(479, 'La Playa', 54),
	(480, 'La Primavera', 99),
	(481, 'La Salina', 85),
	(482, 'La Sierra', 19),
	(483, 'La Tebaida', 63),
	(484, 'La Tola', 52),
	(485, 'La Unión', 5),
	(486, 'La Unión', 52),
	(487, 'La Unión', 70),
	(488, 'La Unión', 76),
	(489, 'La Uvita', 15),
	(490, 'La Vega', 19),
	(491, 'La Vega', 25),
	(492, 'La Victoria', 15),
	(493, 'La Victoria', 17),
	(494, 'La Victoria', 76),
	(495, 'La Virginia', 66),
	(496, 'Labateca', 54),
	(497, 'Labranzagrande', 15),
	(498, 'Landázuri', 68),
	(499, 'Lebrija', 68),
	(500, 'Leiva', 52),
	(501, 'Lejanías', 50),
	(502, 'Lenguazaque', 25),
	(503, 'Leticia', 91),
	(504, 'Liborina', 5),
	(505, 'Linares', 52),
	(506, 'Lloró', 27),
	(507, 'Lorica', 23),
	(508, 'Los Córdobas', 23),
	(509, 'Los Palmitos', 70),
	(510, 'Los Patios', 54),
	(511, 'Los Santos', 68),
	(512, 'Lourdes', 54),
	(513, 'Luruaco', 8),
	(514, 'Lérida', 73),
	(515, 'Líbano', 73),
	(516, 'López (Micay)', 19),
	(517, 'Macanal', 15),
	(518, 'Macaravita', 68),
	(519, 'Maceo', 5),
	(520, 'Machetá', 25),
	(521, 'Madrid', 25),
	(522, 'Magangué', 13),
	(523, 'Magüi (Payán)', 52),
	(524, 'Mahates', 13),
	(525, 'Maicao', 44),
	(526, 'Majagual', 70),
	(527, 'Malambo', 8),
	(528, 'Mallama (Piedrancha)', 52),
	(529, 'Manatí', 8),
	(530, 'Manaure', 44),
	(531, 'Manaure Balcón del Cesar', 20),
	(532, 'Manizales', 17),
	(533, 'Manta', 25),
	(534, 'Manzanares', 17),
	(535, 'Maní', 85),
	(536, 'Mapiripan', 50),
	(537, 'Margarita', 13),
	(538, 'Marinilla', 5),
	(539, 'Maripí', 15),
	(540, 'Mariquita', 73),
	(541, 'Marmato', 17),
	(542, 'Marquetalia', 17),
	(543, 'Marsella', 66),
	(544, 'Marulanda', 17),
	(545, 'María la Baja', 13),
	(546, 'Matanza', 68),
	(547, 'Medellín', 5),
	(548, 'Medina', 25),
	(549, 'Medio Atrato', 27),
	(550, 'Medio Baudó', 27),
	(551, 'Medio San Juan (ANDAGOYA)', 27),
	(552, 'Melgar', 73),
	(553, 'Mercaderes', 19),
	(554, 'Mesetas', 50),
	(555, 'Milán', 18),
	(556, 'Miraflores', 15),
	(557, 'Miraflores', 95),
	(558, 'Miranda', 19),
	(559, 'Mistrató', 66),
	(560, 'Mitú', 97),
	(561, 'Mocoa', 86),
	(562, 'Mogotes', 68),
	(563, 'Molagavita', 68),
	(564, 'Momil', 23),
	(565, 'Mompós', 13),
	(566, 'Mongua', 15),
	(567, 'Monguí', 15),
	(568, 'Moniquirá', 15),
	(569, 'Montebello', 5),
	(570, 'Montecristo', 13),
	(571, 'Montelíbano', 23),
	(572, 'Montenegro', 63),
	(573, 'Monteria', 23),
	(574, 'Monterrey', 85),
	(575, 'Morales', 13),
	(576, 'Morales', 19),
	(577, 'Morelia', 18),
	(578, 'Morroa', 70),
	(579, 'Mosquera', 25),
	(580, 'Mosquera', 52),
	(581, 'Motavita', 15),
	(582, 'Moñitos', 23),
	(583, 'Murillo', 73),
	(584, 'Murindó', 5),
	(585, 'Mutatá', 5),
	(586, 'Mutiscua', 54),
	(587, 'Muzo', 15),
	(588, 'Málaga', 68),
	(589, 'Nariño', 5),
	(590, 'Nariño', 25),
	(591, 'Nariño', 52),
	(592, 'Natagaima', 73),
	(593, 'Nechí', 5),
	(594, 'Necoclí', 5),
	(595, 'Neira', 17),
	(596, 'Neiva', 41),
	(597, 'Nemocón', 25),
	(598, 'Nilo', 25),
	(599, 'Nimaima', 25),
	(600, 'Nobsa', 15),
	(601, 'Nocaima', 25),
	(602, 'Norcasia', 17),
	(603, 'Norosí', 13),
	(604, 'Novita', 27),
	(605, 'Nueva Granada', 47),
	(606, 'Nuevo Colón', 15),
	(607, 'Nunchía', 85),
	(608, 'Nuquí', 27),
	(609, 'Nátaga', 41),
	(610, 'Obando', 76),
	(611, 'Ocamonte', 68),
	(612, 'Ocaña', 54),
	(613, 'Oiba', 68),
	(614, 'Oicatá', 15),
	(615, 'Olaya', 5),
	(616, 'Olaya Herrera', 52),
	(617, 'Onzaga', 68),
	(618, 'Oporapa', 41),
	(619, 'Orito', 86),
	(620, 'Orocué', 85),
	(621, 'Ortega', 73),
	(622, 'Ospina', 52),
	(623, 'Otanche', 15),
	(624, 'Ovejas', 70),
	(625, 'Pachavita', 15),
	(626, 'Pacho', 25),
	(627, 'Padilla', 19),
	(628, 'Paicol', 41),
	(629, 'Pailitas', 20),
	(630, 'Paime', 25),
	(631, 'Paipa', 15),
	(632, 'Pajarito', 15),
	(633, 'Palermo', 41),
	(634, 'Palestina', 17),
	(635, 'Palestina', 41),
	(636, 'Palmar', 68),
	(637, 'Palmar de Varela', 8),
	(638, 'Palmas del Socorro', 68),
	(639, 'Palmira', 76),
	(640, 'Palmito', 70),
	(641, 'Palocabildo', 73),
	(642, 'Pamplona', 54),
	(643, 'Pamplonita', 54),
	(644, 'Pandi', 25),
	(645, 'Panqueba', 15),
	(646, 'Paratebueno', 25),
	(647, 'Pasca', 25),
	(648, 'Patía (El Bordo)', 19),
	(649, 'Pauna', 15),
	(650, 'Paya', 15),
	(651, 'Paz de Ariporo', 85),
	(652, 'Paz de Río', 15),
	(653, 'Pedraza', 47),
	(654, 'Pelaya', 20),
	(655, 'Pensilvania', 17),
	(656, 'Peque', 5),
	(657, 'Pereira', 66),
	(658, 'Pesca', 15),
	(659, 'Peñol', 5),
	(660, 'Piamonte', 19),
	(661, 'Pie de Cuesta', 68),
	(662, 'Piedras', 73),
	(663, 'Piendamó', 19),
	(664, 'Pijao', 63),
	(665, 'Pijiño', 47),
	(666, 'Pinchote', 68),
	(667, 'Pinillos', 13),
	(668, 'Piojo', 8),
	(669, 'Pisva', 15),
	(670, 'Pital', 41),
	(671, 'Pitalito', 41),
	(672, 'Pivijay', 47),
	(673, 'Planadas', 73),
	(674, 'Planeta Rica', 23),
	(675, 'Plato', 47),
	(676, 'Policarpa', 52),
	(677, 'Polonuevo', 8),
	(678, 'Ponedera', 8),
	(679, 'Popayán', 19),
	(680, 'Pore', 85),
	(681, 'Potosí', 52),
	(682, 'Pradera', 76),
	(683, 'Prado', 73),
	(684, 'Providencia', 52),
	(685, 'Providencia', 88),
	(686, 'Pueblo Bello', 20),
	(687, 'Pueblo Nuevo', 23),
	(688, 'Pueblo Rico', 66),
	(689, 'Pueblorrico', 5),
	(690, 'Puebloviejo', 47),
	(691, 'Puente Nacional', 68),
	(692, 'Puerres', 52),
	(693, 'Puerto Asís', 86),
	(694, 'Puerto Berrío', 5),
	(695, 'Puerto Boyacá', 15),
	(696, 'Puerto Caicedo', 86),
	(697, 'Puerto Carreño', 99),
	(698, 'Puerto Colombia', 8),
	(699, 'Puerto Concordia', 50),
	(700, 'Puerto Escondido', 23),
	(701, 'Puerto Gaitán', 50),
	(702, 'Puerto Guzmán', 86),
	(703, 'Puerto Leguízamo', 86),
	(704, 'Puerto Libertador', 23),
	(705, 'Puerto Lleras', 50),
	(706, 'Puerto López', 50),
	(707, 'Puerto Nare', 5),
	(708, 'Puerto Nariño', 91),
	(709, 'Puerto Parra', 68),
	(710, 'Puerto Rico', 18),
	(711, 'Puerto Rico', 50),
	(712, 'Puerto Rondón', 81),
	(713, 'Puerto Salgar', 25),
	(714, 'Puerto Santander', 54),
	(715, 'Puerto Tejada', 19),
	(716, 'Puerto Triunfo', 5),
	(717, 'Puerto Wilches', 68),
	(718, 'Pulí', 25),
	(719, 'Pupiales', 52),
	(720, 'Puracé (Coconuco)', 19),
	(721, 'Purificación', 73),
	(722, 'Purísima', 23),
	(723, 'Pácora', 17),
	(724, 'Páez', 15),
	(725, 'Páez (Belalcazar)', 19),
	(726, 'Páramo', 68),
	(727, 'Quebradanegra', 25),
	(728, 'Quetame', 25),
	(729, 'Quibdó', 27),
	(730, 'Quimbaya', 63),
	(731, 'Quinchía', 66),
	(732, 'Quipama', 15),
	(733, 'Quipile', 25),
	(734, 'Ragonvalia', 54),
	(735, 'Ramiriquí', 15),
	(736, 'Recetor', 85),
	(737, 'Regidor', 13),
	(738, 'Remedios', 5),
	(739, 'Remolino', 47),
	(740, 'Repelón', 8),
	(741, 'Restrepo', 50),
	(742, 'Restrepo', 76),
	(743, 'Retiro', 5),
	(744, 'Ricaurte', 25),
	(745, 'Ricaurte', 52),
	(746, 'Rio Negro', 68),
	(747, 'Rioblanco', 73),
	(748, 'Riofrío', 76),
	(749, 'Riohacha', 44),
	(750, 'Risaralda', 17),
	(751, 'Rivera', 41),
	(752, 'Roberto Payán (San José)', 52),
	(753, 'Roldanillo', 76),
	(754, 'Roncesvalles', 73),
	(755, 'Rondón', 15),
	(756, 'Rosas', 19),
	(757, 'Rovira', 73),
	(758, 'Ráquira', 15),
	(759, 'Río Iró', 27),
	(760, 'Río Quito', 27),
	(761, 'Río Sucio', 17),
	(762, 'Río Viejo', 13),
	(763, 'Río de oro', 20),
	(764, 'Ríonegro', 5),
	(765, 'Ríosucio', 27),
	(766, 'Sabana de Torres', 68),
	(767, 'Sabanagrande', 8),
	(768, 'Sabanalarga', 5),
	(769, 'Sabanalarga', 8),
	(770, 'Sabanalarga', 85),
	(771, 'Sabanas de San Angel (SAN ANGEL)', 47),
	(772, 'Sabaneta', 5),
	(773, 'Saboyá', 15),
	(774, 'Sahagún', 23),
	(775, 'Saladoblanco', 41),
	(776, 'Salamina', 17),
	(777, 'Salamina', 47),
	(778, 'Salazar', 54),
	(779, 'Saldaña', 73),
	(780, 'Salento', 63),
	(781, 'Salgar', 5),
	(782, 'Samacá', 15),
	(783, 'Samaniego', 52),
	(784, 'Samaná', 17),
	(785, 'Sampués', 70),
	(786, 'San Agustín', 41),
	(787, 'San Alberto', 20),
	(788, 'San Andrés', 68),
	(789, 'San Andrés Sotavento', 23),
	(790, 'San Andrés de Cuerquía', 5),
	(791, 'San Antero', 23),
	(792, 'San Antonio', 73),
	(793, 'San Antonio de Tequendama', 25),
	(794, 'San Benito', 68),
	(795, 'San Benito Abad', 70),
	(796, 'San Bernardo', 25),
	(797, 'San Bernardo', 52),
	(798, 'San Bernardo del Viento', 23),
	(799, 'San Calixto', 54),
	(800, 'San Carlos', 5),
	(801, 'San Carlos', 23),
	(802, 'San Carlos de Guaroa', 50),
	(803, 'San Cayetano', 25),
	(804, 'San Cayetano', 54),
	(805, 'San Cristobal', 13),
	(806, 'San Diego', 20),
	(807, 'San Eduardo', 15),
	(808, 'San Estanislao', 13),
	(809, 'San Fernando', 13),
	(810, 'San Francisco', 5),
	(811, 'San Francisco', 25),
	(812, 'San Francisco', 86),
	(813, 'San Gíl', 68),
	(814, 'San Jacinto', 13),
	(815, 'San Jacinto del Cauca', 13),
	(816, 'San Jerónimo', 5),
	(817, 'San Joaquín', 68),
	(818, 'San José', 17),
	(819, 'San José de Miranda', 68),
	(820, 'San José de Montaña', 5),
	(821, 'San José de Pare', 15),
	(822, 'San José de Uré', 23),
	(823, 'San José del Fragua', 18),
	(824, 'San José del Guaviare', 95),
	(825, 'San José del Palmar', 27),
	(826, 'San Juan de Arama', 50),
	(827, 'San Juan de Betulia', 70),
	(828, 'San Juan de Nepomuceno', 13),
	(829, 'San Juan de Pasto', 52),
	(830, 'San Juan de Río Seco', 25),
	(831, 'San Juan de Urabá', 5),
	(832, 'San Juan del Cesar', 44),
	(833, 'San Juanito', 50),
	(834, 'San Lorenzo', 52),
	(835, 'San Luis', 73),
	(836, 'San Luís', 5),
	(837, 'San Luís de Gaceno', 15),
	(838, 'San Luís de Palenque', 85),
	(839, 'San Marcos', 70),
	(840, 'San Martín', 20),
	(841, 'San Martín', 50),
	(842, 'San Martín de Loba', 13),
	(843, 'San Mateo', 15),
	(844, 'San Miguel', 68),
	(845, 'San Miguel', 86),
	(846, 'San Miguel de Sema', 15),
	(847, 'San Onofre', 70),
	(848, 'San Pablo', 13),
	(849, 'San Pablo', 52),
	(850, 'San Pablo de Borbur', 15),
	(851, 'San Pedro', 5),
	(852, 'San Pedro', 70),
	(853, 'San Pedro', 76),
	(854, 'San Pedro de Cartago', 52),
	(855, 'San Pedro de Urabá', 5),
	(856, 'San Pelayo', 23),
	(857, 'San Rafael', 5),
	(858, 'San Roque', 5),
	(859, 'San Sebastián', 19),
	(860, 'San Sebastián de Buenavista', 47),
	(861, 'San Vicente', 5),
	(862, 'San Vicente del Caguán', 18),
	(863, 'San Vicente del Chucurí', 68),
	(864, 'San Zenón', 47),
	(865, 'Sandoná', 52),
	(866, 'Santa Ana', 47),
	(867, 'Santa Bárbara', 5),
	(868, 'Santa Bárbara', 68),
	(869, 'Santa Bárbara (Iscuandé)', 52),
	(870, 'Santa Bárbara de Pinto', 47),
	(871, 'Santa Catalina', 13),
	(872, 'Santa Fé de Antioquia', 5),
	(873, 'Santa Genoveva de Docorodó', 27),
	(874, 'Santa Helena del Opón', 68),
	(875, 'Santa Isabel', 73),
	(876, 'Santa Lucía', 8),
	(877, 'Santa Marta', 47),
	(878, 'Santa María', 15),
	(879, 'Santa María', 41),
	(880, 'Santa Rosa', 13),
	(881, 'Santa Rosa', 19),
	(882, 'Santa Rosa de Cabal', 66),
	(883, 'Santa Rosa de Osos', 5),
	(884, 'Santa Rosa de Viterbo', 15),
	(885, 'Santa Rosa del Sur', 13),
	(886, 'Santa Rosalía', 99),
	(887, 'Santa Sofía', 15),
	(888, 'Santana', 15),
	(889, 'Santander de Quilichao', 19),
	(890, 'Santiago', 54),
	(891, 'Santiago', 86),
	(892, 'Santo Domingo', 5),
	(893, 'Santo Tomás', 8),
	(894, 'Santuario', 5),
	(895, 'Santuario', 66),
	(896, 'Sapuyes', 52),
	(897, 'Saravena', 81),
	(898, 'Sardinata', 54),
	(899, 'Sasaima', 25),
	(900, 'Sativanorte', 15),
	(901, 'Sativasur', 15),
	(902, 'Segovia', 5),
	(903, 'Sesquilé', 25),
	(904, 'Sevilla', 76),
	(905, 'Siachoque', 15),
	(906, 'Sibaté', 25),
	(907, 'Sibundoy', 86),
	(908, 'Silos', 54),
	(909, 'Silvania', 25),
	(910, 'Silvia', 19),
	(911, 'Simacota', 68),
	(912, 'Simijaca', 25),
	(913, 'Simití', 13),
	(914, 'Sincelejo', 70),
	(915, 'Sincé', 70),
	(916, 'Sipí', 27),
	(917, 'Sitionuevo', 47),
	(918, 'Soacha', 25),
	(919, 'Soatá', 15),
	(920, 'Socha', 15),
	(921, 'Socorro', 68),
	(922, 'Socotá', 15),
	(923, 'Sogamoso', 15),
	(924, 'Solano', 18),
	(925, 'Soledad', 8),
	(926, 'Solita', 18),
	(927, 'Somondoco', 15),
	(928, 'Sonsón', 5),
	(929, 'Sopetrán', 5),
	(930, 'Soplaviento', 13),
	(931, 'Sopó', 25),
	(932, 'Sora', 15),
	(933, 'Soracá', 15),
	(934, 'Sotaquirá', 15),
	(935, 'Sotara (Paispamba)', 19),
	(936, 'Sotomayor (Los Andes)', 52),
	(937, 'Suaita', 68),
	(938, 'Suan', 8),
	(939, 'Suaza', 41),
	(940, 'Subachoque', 25),
	(941, 'Sucre', 19),
	(942, 'Sucre', 68),
	(943, 'Sucre', 70),
	(944, 'Suesca', 25),
	(945, 'Supatá', 25),
	(946, 'Supía', 17),
	(947, 'Suratá', 68),
	(948, 'Susa', 25),
	(949, 'Susacón', 15),
	(950, 'Sutamarchán', 15),
	(951, 'Sutatausa', 25),
	(952, 'Sutatenza', 15),
	(953, 'Suárez', 19),
	(954, 'Suárez', 73),
	(955, 'Sácama', 85),
	(956, 'Sáchica', 15),
	(957, 'Tabio', 25),
	(958, 'Tadó', 27),
	(959, 'Talaigua Nuevo', 13),
	(960, 'Tamalameque', 20),
	(961, 'Tame', 81),
	(962, 'Taminango', 52),
	(963, 'Tangua', 52),
	(964, 'Taraira', 97),
	(965, 'Tarazá', 5),
	(966, 'Tarqui', 41),
	(967, 'Tarso', 5),
	(968, 'Tasco', 15),
	(969, 'Tauramena', 85),
	(970, 'Tausa', 25),
	(971, 'Tello', 41),
	(972, 'Tena', 25),
	(973, 'Tenerife', 47),
	(974, 'Tenjo', 25),
	(975, 'Tenza', 15),
	(976, 'Teorama', 54),
	(977, 'Teruel', 41),
	(978, 'Tesalia', 41),
	(979, 'Tibacuy', 25),
	(980, 'Tibaná', 15),
	(981, 'Tibasosa', 15),
	(982, 'Tibirita', 25),
	(983, 'Tibú', 54),
	(984, 'Tierralta', 23),
	(985, 'Timaná', 41),
	(986, 'Timbiquí', 19),
	(987, 'Timbío', 19),
	(988, 'Tinjacá', 15),
	(989, 'Tipacoque', 15),
	(990, 'Tiquisio (Puerto Rico)', 13),
	(991, 'Titiribí', 5),
	(992, 'Toca', 15),
	(993, 'Tocaima', 25),
	(994, 'Tocancipá', 25),
	(995, 'Toguí', 15),
	(996, 'Toledo', 5),
	(997, 'Toledo', 54),
	(998, 'Tolú', 70),
	(999, 'Tolú Viejo', 70),
	(1000, 'Tona', 68),
	(1001, 'Topagá', 15),
	(1002, 'Topaipí', 25),
	(1003, 'Toribío', 19),
	(1004, 'Toro', 76),
	(1005, 'Tota', 15),
	(1006, 'Totoró', 19),
	(1007, 'Trinidad', 85),
	(1008, 'Trujillo', 76),
	(1009, 'Tubará', 8),
	(1010, 'Tuchín', 23),
	(1011, 'Tulúa', 76),
	(1012, 'Tumaco', 52),
	(1013, 'Tunja', 15),
	(1014, 'Tunungua', 15),
	(1015, 'Turbaco', 13),
	(1016, 'Turbaná', 13),
	(1017, 'Turbo', 5),
	(1018, 'Turmequé', 15),
	(1019, 'Tuta', 15),
	(1020, 'Tutasá', 15),
	(1021, 'Támara', 85),
	(1022, 'Támesis', 5),
	(1023, 'Túquerres', 52),
	(1024, 'Ubalá', 25),
	(1025, 'Ubaque', 25),
	(1026, 'Ubaté', 25),
	(1027, 'Ulloa', 76),
	(1028, 'Une', 25),
	(1029, 'Unguía', 27),
	(1030, 'Unión Panamericana (ÁNIMAS)', 27),
	(1031, 'Uramita', 5),
	(1032, 'Uribe', 50),
	(1033, 'Uribia', 44),
	(1034, 'Urrao', 5),
	(1035, 'Urumita', 44),
	(1036, 'Usiacuri', 8),
	(1037, 'Valdivia', 5),
	(1038, 'Valencia', 23),
	(1039, 'Valle de San José', 68),
	(1040, 'Valle de San Juan', 73),
	(1041, 'Valle del Guamuez', 86),
	(1042, 'Valledupar', 20),
	(1043, 'Valparaiso', 5),
	(1044, 'Valparaiso', 18),
	(1045, 'Vegachí', 5),
	(1046, 'Venadillo', 73),
	(1047, 'Venecia', 5),
	(1048, 'Venecia (Ospina Pérez)', 25),
	(1049, 'Ventaquemada', 15),
	(1050, 'Vergara', 25),
	(1051, 'Versalles', 76),
	(1052, 'Vetas', 68),
	(1053, 'Viani', 25),
	(1054, 'Vigía del Fuerte', 5),
	(1055, 'Vijes', 76),
	(1056, 'Villa Caro', 54),
	(1057, 'Villa Rica', 19),
	(1058, 'Villa de Leiva', 15),
	(1059, 'Villa del Rosario', 54),
	(1060, 'Villagarzón', 86),
	(1061, 'Villagómez', 25),
	(1062, 'Villahermosa', 73),
	(1063, 'Villamaría', 17),
	(1064, 'Villanueva', 13),
	(1065, 'Villanueva', 44),
	(1066, 'Villanueva', 68),
	(1067, 'Villanueva', 85),
	(1068, 'Villapinzón', 25),
	(1069, 'Villarrica', 73),
	(1070, 'Villavicencio', 50),
	(1071, 'Villavieja', 41),
	(1072, 'Villeta', 25),
	(1073, 'Viotá', 25),
	(1074, 'Viracachá', 15),
	(1075, 'Vista Hermosa', 50),
	(1076, 'Viterbo', 17),
	(1077, 'Vélez', 68),
	(1078, 'Yacopí', 25),
	(1079, 'Yacuanquer', 52),
	(1080, 'Yaguará', 41),
	(1081, 'Yalí', 5),
	(1082, 'Yarumal', 5),
	(1083, 'Yolombó', 5),
	(1084, 'Yondó (Casabe)', 5),
	(1085, 'Yopal', 85),
	(1086, 'Yotoco', 76),
	(1087, 'Yumbo', 76),
	(1088, 'Zambrano', 13),
	(1089, 'Zapatoca', 68),
	(1090, 'Zapayán (PUNTA DE PIEDRAS)', 47),
	(1091, 'Zaragoza', 5),
	(1092, 'Zarzal', 76),
	(1093, 'Zetaquirá', 15),
	(1094, 'Zipacón', 25),
	(1095, 'Zipaquirá', 25),
	(1096, 'Zona Bananera (PRADO - SEVILLA)', 47),
	(1097, 'Ábrego', 54),
	(1098, 'Íquira', 41),
	(1099, 'Úmbita', 15),
	(1100, 'Útica', 25);
/*!40000 ALTER TABLE `geo_citys` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.geo_departments
CREATE TABLE IF NOT EXISTS `geo_departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.geo_departments: ~33 rows (aproximadamente)
/*!40000 ALTER TABLE `geo_departments` DISABLE KEYS */;
INSERT IGNORE INTO `geo_departments` (`id`, `code`, `name`) VALUES
	(5, '1', 'ANTIOQUIA'),
	(8, '2', 'ATLÁNTICO'),
	(11, '3', 'BOGOTÁ, D.C.'),
	(13, '4', 'BOLÍVAR'),
	(15, '5', 'BOYACÁ'),
	(17, '6', 'CALDAS'),
	(18, '7', 'CAQUETÁ'),
	(19, '8', 'CAUCA'),
	(20, '9', 'CESAR'),
	(23, '10', 'CÓRDOBA'),
	(25, '11', 'CUNDINAMARCA'),
	(27, '12', 'CHOCÓ'),
	(41, '13', 'HUILA'),
	(44, '14', 'LA GUAJIRA'),
	(47, '15', 'MAGDALENA'),
	(50, '16', 'META'),
	(52, '17', 'NARIÑO'),
	(54, '18', 'NORTE DE SANTANDER'),
	(63, '19', 'QUINDIO'),
	(66, '20', 'RISARALDA'),
	(68, '21', 'SANTANDER'),
	(70, '22', 'SUCRE'),
	(73, '23', 'TOLIMA'),
	(76, '24', 'VALLE DEL CAUCA'),
	(81, '25', 'ARAUCA'),
	(85, '26', 'CASANARE'),
	(86, '27', 'PUTUMAYO'),
	(88, '28', 'SAN ANDRÉS Y  PROVIDENCIA'),
	(91, '29', 'AMAZONAS'),
	(94, '30', 'GUAINÍA'),
	(95, '31', 'GUAVIARE'),
	(97, '32', 'VAUPÉS'),
	(99, '33', 'VICHADA');
/*!40000 ALTER TABLE `geo_departments` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `data` json NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.permissions: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT IGNORE INTO `permissions` (`id`, `name`, `data`) VALUES
	(1, 'Default', '{"users": {"view": true, "change": false, "create": false, "delete": false}, "routes": {"view": true, "change": false, "create": false, "delete": false}}'),
	(2, 'Master', '{"users": {"view": true, "change": true, "create": true, "delete": true}, "routes": {"view": false, "change": false, "create": false, "delete": false}, "settings": {"view": false, "change": false, "create": false, "delete": false}, "dashboard": {"view": true, "change": false, "create": false, "delete": false}}'),
	(3, 'Admin', '{"accounts": {"view": true, "change": true, "create": true, "delete": true}, "calendar": {"view": true, "change": true, "create": true, "delete": true}, "contacts": {"view": true, "change": true, "create": true, "delete": true}, "requests": {"view": true, "change": true, "create": true, "delete": true}, "addresses": {"view": true, "change": true, "create": true, "delete": true}, "employees": {"view": true, "change": true, "create": true, "delete": true}, "inventary": {"view": true, "change": true, "create": true, "delete": true}, "quotations": {"view": true, "change": true, "create": true, "delete": true}}'),
	(4, 'Administracion del Portal de Clientes', '{"users": {"view": false, "change": false, "create": true, "delete": false}, "routes": {"view": false, "change": false, "create": false, "delete": false}, "settings": {"view": false, "change": false, "create": false, "delete": false}, "dashboard": {"view": false, "change": false, "create": false, "delete": false}, "front-clients": {"view": true, "change": true, "create": true, "delete": true}}'),
	(5, 'Admin Backup', '{"users": {"view": true, "change": true, "create": true, "delete": true}, "routes": {"view": true, "change": true, "create": true, "delete": true}, "settings": {"view": true, "change": true, "create": true, "delete": true}, "dashboard": {"view": true}}');
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
/*!40000 ALTER TABLE `pictures` DISABLE KEYS */;
INSERT IGNORE INTO `pictures` (`id`, `name`, `size`, `data`, `type`, `create`) VALUES
INSERT IGNORE INTO `pictures` (`id`, `name`, `size`, `data`, `type`, `create`) VALUES
/*!40000 ALTER TABLE `pictures` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.quotations
CREATE TABLE IF NOT EXISTS `quotations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client` int(11) NOT NULL,
  `request` int(11) NOT NULL,
  `values` json NOT NULL,
  `status` int(1) DEFAULT '0',
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `validity` int(4) DEFAULT '0',
  `accept` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_quotations_clients_clients` (`client`),
  KEY `FK_quotations_clients_accounts_clients` (`request`),
  KEY `FK_quotations_clients_status_quotations` (`status`),
  CONSTRAINT `FK_af_quotations_af_requests` FOREIGN KEY (`request`) REFERENCES `requests` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `quotations_ibfk_1` FOREIGN KEY (`status`) REFERENCES `status_quotations` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `quotations_ibfk_3` FOREIGN KEY (`client`) REFERENCES `accounts` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.quotations: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `quotations` DISABLE KEYS */;
INSERT IGNORE INTO `quotations` (`id`, `client`, `request`, `values`, `status`, `created`, `updated`, `validity`, `accept`) VALUES
	(1, 1, 100005, '[{"lat": "6.6319059", "lon": "-76.0645908480599", "city": {"id": 1, "name": "Abriaquí", "department": 5}, "address": "Parque principal, Abriaquí, Occidente, Antioquia, Colombia", "services": [{"id": 11, "name": "Diseño de paisajes", "price": 1542000, "repeat": {"id": 1, "code": "NONE", "name": "SIN REPETICION"}, "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet tincidunt risus gravida euismod. Mauris ultricies, enim non dignissim auctor, quam dui blandit turpis, quis elementum quam quam non ante. Aliquam diam dolor, hendrerit et consequat ut,", "type_medition": 1}], "department": {"id": 5, "code": "1", "name": "ANTIOQUIA"}, "address_geo": "6.6319059,-76.0645908480599"}]', 0, '2019-05-07 20:01:42', '2019-06-10 12:25:12', 15, NULL),
	(2, 1, 100012, '[{"lat": "6.6319059", "lon": "-76.0645908480599", "city": {"id": 1, "name": "Abriaquí", "department": 5}, "address": "Parque principal, Abriaquí, Occidente, Antioquia, Colombia", "services": [{"id": 11, "name": "Diseño de paisajes", "price": 1542000, "repeat": {"id": 1, "code": "NONE", "name": "SIN REPETICION"}, "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet tincidunt risus gravida euismod. Mauris ultricies, enim non dignissim auctor, quam dui blandit turpis, quis elementum quam quam non ante. Aliquam diam dolor, hendrerit et consequat ut,", "type_medition": 1}], "department": {"id": 5, "code": "1", "name": "ANTIOQUIA"}, "address_geo": "6.6319059,-76.0645908480599"}]', 1, '2019-05-07 20:01:42', '2019-05-27 16:14:22', 15, '2019-05-27 21:12:57');
/*!40000 ALTER TABLE `quotations` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.repeats_services
CREATE TABLE IF NOT EXISTS `repeats_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `code` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.repeats_services: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `repeats_services` DISABLE KEYS */;
INSERT IGNORE INTO `repeats_services` (`id`, `name`, `code`) VALUES
	(1, 'SIN REPETICION', 'NONE'),
	(5, '1 VEZ X MES', 'PMES'),
	(6, '1 VEZ X CATORCENA', 'PCAT'),
	(7, '1 VEZ X QUINCENA', 'PQUI'),
	(8, '1 VEZ X SEMANA', 'PSEM'),
	(9, '1 VEZ X DECADA', 'PDDD');
/*!40000 ALTER TABLE `repeats_services` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.requests
CREATE TABLE IF NOT EXISTS `requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) unsigned DEFAULT '1',
  `account` int(11) NOT NULL,
  `contact` int(11) DEFAULT NULL,
  `addresses` json NOT NULL,
  `request_notes` mediumtext,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_requests_contacts` (`contact`),
  KEY `FK_requests_status_requests` (`status`),
  KEY `FK_requests_accounts` (`account`),
  CONSTRAINT `FK_requests_accounts` FOREIGN KEY (`account`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_requests_contacts` FOREIGN KEY (`contact`) REFERENCES `contacts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_requests_status_requests` FOREIGN KEY (`status`) REFERENCES `status_requests` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=100023 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.requests: ~8 rows (aproximadamente)
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT IGNORE INTO `requests` (`id`, `status`, `account`, `contact`, `addresses`, `request_notes`, `created`, `updated`) VALUES
	(100001, 1, 1, 3, '[{"id": 29, "lat": 6.2406042, "lon": -75.5864629, "city": {"id": 547, "name": "Medellín", "department": 5}, "completo": {"lat": "6.2406042", "lon": "-75.5864629", "icon": "https://nominatim.openstreetmap.org/images/mapicons/money_bank2.p.20.png", "type": "bank", "osm_id": 2391467030, "address": {"bank": "Banco de Bogota Unicentro", "city": "Medellín", "road": "Carrera 66A", "state": "Antioquia", "county": "Zona Urbana Medellín", "suburb": "Comuna 11 - Laureles-Estadio", "country": "Colombia", "postcode": "0500", "country_code": "co", "neighbourhood": "Los Conquistadores", "state_district": "Valle de Aburrá"}, "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "category": "amenity", "osm_type": "node", "place_id": 24677292, "importance": 0.30100000000000005, "place_rank": 30, "boundingbox": ["6.2405542", "6.2406542", "-75.5865129", "-75.5864129"], "namedetails": {"name": "Banco de Bogota Unicentro"}, "display_name": "Banco de Bogota Unicentro, Carrera 66A, Los Conquistadores, Comuna 11 - Laureles-Estadio, Zona Urbana Medellín, Medellín, Valle de Aburrá, Antioquia, 0500, Colombia", "polygonpoints": [[-75.5864629, 6.2406542], [-75.58642754466094, 6.240639555339059], [-75.5864129, 6.2406042], [-75.58642754466094, 6.240568844660941], [-75.5864629, 6.2405542], [-75.58649825533907, 6.240568844660941], [-75.5865129, 6.2406042], [-75.58649825533907, 6.240639555339059]]}, "place_id": 24677292, "services": [{"id": 8, "name": "Roceria", "price": 1000, "repeat": {"id": 6, "code": "PCAT", "name": "1 VEZ X CATORCENA"}, "description": "Uno de los factores que inciden en la seguridad vial, es el crecimiento desmedido de la vegetación en las márgenes de nuestra vía. Por esta razón, realizamos tareas diarias de rocería con nuestros colaboradores del área de influencia del proyecto, buscando que la señalización vertical se encuentre despejada y limpia. El objetivo es entregarles a nuestros usuarios una vía limpia para una circulación con mayor seguridad.", "type_medition": {"id": 2, "code": "M2", "name": "Metro cuadrado"}}], "department": {"id": 5, "code": "1", "name": "ANTIOQUIA"}, "place_rank": 30, "display_name": "Banco de Bogota Unicentro, Carrera 66A, Los Conquistadores, Comuna 11 - Laureles-Estadio, Zona Urbana Medellín, Medellín, Valle de Aburrá, Antioquia, 0500, Colombia", "services_ids": [8], "address_input": "Banco"}]', 'Toda la información, incluyendo precios, servicios, características, opciones, planos y disponibilidad están sujetos a cambio sin previo aviso.\n\n', '2019-06-07 20:55:31', '2019-06-11 15:46:49'),
	(100002, 4, 1, 1, '[{"id": 18, "lat": 6.2560494, "lon": -75.5826914129741, "city": {"id": 547, "name": "Medellín", "department": 5}, "completo": {"lat": "6.2560494", "lon": "-75.5826914129741", "icon": "https://nominatim.openstreetmap.org/images/mapicons/shopping_supermarket.p.20.png", "type": "supermarket", "osm_id": 571136747, "address": {"city": "Medellín", "road": "Carrera 66", "state": "Antioquia", "county": "Zona Urbana Medellín", "suburb": "Comuna 11 - Laureles-Estadio", "country": "Colombia", "postcode": "0500", "supermarket": "éxito", "country_code": "co", "neighbourhood": "Suramericana", "state_district": "Valle de Aburrá"}, "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "category": "shop", "osm_type": "way", "place_id": 194519206, "importance": 0.201, "place_rank": 30, "boundingbox": ["6.2559635", "6.2561353", "-75.5827793", "-75.5826035"], "display_name": "éxito, Carrera 66, Suramericana, Comuna 11 - Laureles-Estadio, Zona Urbana Medellín, Medellín, Valle de Aburrá, Antioquia, 0500, Colombia", "polygonpoints": [["-75.5827793", "6.2560193"], ["-75.5826572", "6.2559635"], ["-75.5826035", "6.2560795"], ["-75.5827257", "6.2561353"], ["-75.5827793", "6.2560193"]]}, "place_id": 194519206, "services": [{"id": 11, "name": "Diseño de paisajes", "price": 1542000, "repeat": {"id": 9, "code": "PDDD", "name": "PRIMERO DE CADA DIEZ DIAS"}, "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet tincidunt risus gravida euismod. Mauris ultricies, enim non dignissim auctor, quam dui blandit turpis, quis elementum quam quam non ante. Aliquam diam dolor, hendrerit et consequat ut,", "type_medition": {"id": 1, "code": "M", "name": "Metro Líneal"}}], "department": {"id": 5, "code": "1", "name": "ANTIOQUIA"}, "place_rank": 30, "display_name": "éxito, Carrera 66, Suramericana, Comuna 11 - Laureles-Estadio, Zona Urbana Medellín, Medellín, Valle de Aburrá, Antioquia, 0500, Colombia", "services_ids": [11], "address_input": "exito"}, {"id": 16, "lat": 6.1818154, "lon": -75.5693252008214, "city": {"id": 437, "name": "Itagüí", "department": 5}, "completo": {"lat": "6.1818154", "lon": "-75.5693252008214", "icon": "https://nominatim.openstreetmap.org/images/mapicons/shopping_supermarket.p.20.png", "type": "supermarket", "osm_id": 308290614, "address": {"city": "Medellín", "road": "Calle 20 Sur", "state": "Antioquia", "county": "Zona Urbana Medellín", "country": "Colombia", "postcode": "50022", "supermarket": "Carulla San Lucas", "country_code": "co", "house_number": "27-124", "neighbourhood": "El Diamante No. 2", "state_district": "Valle de Aburrá"}, "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "category": "shop", "osm_type": "way", "place_id": 146467214, "importance": 0.201, "place_rank": 30, "boundingbox": ["6.1816319", "6.1819903", "-75.5695672", "-75.5690807"], "display_name": "Carulla San Lucas, 27-124, Calle 20 Sur, El Diamante No. 2, Medellín, Zona Urbana Medellín, Medellín, Valle de Aburrá, Antioquia, 50022, Colombia", "polygonpoints": [["-75.5695672", "6.1816981"], ["-75.5691531", "6.1816319"], ["-75.5691183", "6.1817168"], ["-75.5690807", "6.181914"], ["-75.5694403", "6.1819755"], ["-75.5695266", "6.1819903"], ["-75.5695672", "6.1816981"]]}, "place_id": 146467214, "services": [{"id": 5, "name": "Reforestacion", "price": 0, "repeat": {"id": 9, "code": "PDDD", "name": "PRIMERO DE CADA DIEZ DIAS"}, "description": "", "type_medition": {"id": 1, "code": "M", "name": "Metro Líneal"}}, {"id": 6, "name": "Poda de arboles", "price": 0, "repeat": {"id": 5, "code": "PMES", "name": "PRIMERO DE CADA MES"}, "description": "", "type_medition": {"id": 1, "code": "M", "name": "Metro Líneal"}}, {"id": 7, "name": "Tala de arboles", "price": 0, "repeat": {"id": 5, "code": "PMES", "name": "PRIMERO DE CADA MES"}, "description": "", "type_medition": {"id": 1, "code": "M", "name": "Metro Líneal"}}], "department": {"id": 5, "code": "1", "name": "ANTIOQUIA"}, "place_rank": 30, "display_name": "Carulla San Lucas, 27-124, Calle 20 Sur, El Diamante No. 2, Medellín, Zona Urbana Medellín, Medellín, Valle de Aburrá, Antioquia, 50022, Colombia", "services_ids": [5, 6, 7], "address_input": "exito"}]', 'Toda la información, incluyendo precios, servicios, características, opciones, planos y disponibilidad están sujetos a cambio sin previo aviso.\n\n', '2019-06-07 20:55:31', '2019-06-07 20:55:41'),
	(100004, 2, 1, 4, '[{"id": 18, "lat": 6.2560494, "lon": -75.5826914129741, "city": {"id": 547, "name": "Medellín", "department": 5}, "completo": {"lat": "6.2560494", "lon": "-75.5826914129741", "icon": "https://nominatim.openstreetmap.org/images/mapicons/shopping_supermarket.p.20.png", "type": "supermarket", "osm_id": 571136747, "address": {"city": "Medellín", "road": "Carrera 66", "state": "Antioquia", "county": "Zona Urbana Medellín", "suburb": "Comuna 11 - Laureles-Estadio", "country": "Colombia", "postcode": "0500", "supermarket": "éxito", "country_code": "co", "neighbourhood": "Suramericana", "state_district": "Valle de Aburrá"}, "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "category": "shop", "osm_type": "way", "place_id": 194519206, "importance": 0.201, "place_rank": 30, "boundingbox": ["6.2559635", "6.2561353", "-75.5827793", "-75.5826035"], "display_name": "éxito, Carrera 66, Suramericana, Comuna 11 - Laureles-Estadio, Zona Urbana Medellín, Medellín, Valle de Aburrá, Antioquia, 0500, Colombia", "polygonpoints": [["-75.5827793", "6.2560193"], ["-75.5826572", "6.2559635"], ["-75.5826035", "6.2560795"], ["-75.5827257", "6.2561353"], ["-75.5827793", "6.2560193"]]}, "place_id": 194519206, "services": [{"id": 13, "name": "Roceria 50% Descuento", "price": 500, "repeat": {"id": 9, "code": "PDDD", "name": "PRIMERO DE CADA DIEZ DIAS"}, "description": "", "type_medition": {"id": 2, "code": "M2", "name": "Metro cuadrado"}}], "department": {"id": 5, "code": "1", "name": "ANTIOQUIA"}, "place_rank": 30, "display_name": "éxito, Carrera 66, Suramericana, Comuna 11 - Laureles-Estadio, Zona Urbana Medellín, Medellín, Valle de Aburrá, Antioquia, 0500, Colombia", "services_ids": [13], "address_input": "exito"}]', 'Toda la información, incluyendo precios, servicios, características, opciones, planos y disponibilidad están sujetos a cambio sin previo aviso.\n\n', '2019-06-07 20:55:31', '2019-06-07 20:55:41'),
	(100005, 3, 1, 3, '[{"id": 18, "lat": 6.2560494, "lon": -75.5826914129741, "city": {"id": 547, "name": "Medellín", "department": 5}, "completo": {"lat": "6.2560494", "lon": "-75.5826914129741", "icon": "https://nominatim.openstreetmap.org/images/mapicons/shopping_supermarket.p.20.png", "type": "supermarket", "osm_id": 571136747, "address": {"city": "Medellín", "road": "Carrera 66", "state": "Antioquia", "county": "Zona Urbana Medellín", "suburb": "Comuna 11 - Laureles-Estadio", "country": "Colombia", "postcode": "0500", "supermarket": "éxito", "country_code": "co", "neighbourhood": "Suramericana", "state_district": "Valle de Aburrá"}, "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "category": "shop", "osm_type": "way", "place_id": 194519206, "importance": 0.201, "place_rank": 30, "boundingbox": ["6.2559635", "6.2561353", "-75.5827793", "-75.5826035"], "display_name": "éxito, Carrera 66, Suramericana, Comuna 11 - Laureles-Estadio, Zona Urbana Medellín, Medellín, Valle de Aburrá, Antioquia, 0500, Colombia", "polygonpoints": [["-75.5827793", "6.2560193"], ["-75.5826572", "6.2559635"], ["-75.5826035", "6.2560795"], ["-75.5827257", "6.2561353"], ["-75.5827793", "6.2560193"]]}, "place_id": 194519206, "services": [{"id": 10, "name": "Estudios de monitoreo y caracterizacion de fauna y flora", "price": 0, "repeat": {"id": 5, "code": "PMES", "name": "PRIMERO DE CADA MES"}, "description": "", "type_medition": {"id": 1, "code": "M", "name": "Metro Líneal"}}, {"id": 11, "name": "Diseño de paisajes", "price": 1542000, "repeat": {"id": 7, "code": "PQUI", "name": "PRIMERO DE CADA QUINCENA"}, "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet tincidunt risus gravida euismod. Mauris ultricies, enim non dignissim auctor, quam dui blandit turpis, quis elementum quam quam non ante. Aliquam diam dolor, hendrerit et consequat ut,", "type_medition": {"id": 1, "code": "M", "name": "Metro Líneal"}}], "department": {"id": 5, "code": "1", "name": "ANTIOQUIA"}, "place_rank": 30, "display_name": "éxito, Carrera 66, Suramericana, Comuna 11 - Laureles-Estadio, Zona Urbana Medellín, Medellín, Valle de Aburrá, Antioquia, 0500, Colombia", "services_ids": [10, 11], "address_input": "exito"}]', 'Toda la información, incluyendo precios, servicios, características, opciones, planos y disponibilidad están sujetos a cambio sin previo aviso.\n\n', '2019-06-07 20:55:31', '2019-06-07 20:55:41'),
	(100012, 5, 1, 3, '[{"id": 18, "lat": 6.2560494, "lon": -75.5826914129741, "city": {"id": 547, "name": "Medellín", "department": 5}, "completo": {"lat": "6.2560494", "lon": "-75.5826914129741", "icon": "https://nominatim.openstreetmap.org/images/mapicons/shopping_supermarket.p.20.png", "type": "supermarket", "osm_id": 571136747, "address": {"city": "Medellín", "road": "Carrera 66", "state": "Antioquia", "county": "Zona Urbana Medellín", "suburb": "Comuna 11 - Laureles-Estadio", "country": "Colombia", "postcode": "0500", "supermarket": "éxito", "country_code": "co", "neighbourhood": "Suramericana", "state_district": "Valle de Aburrá"}, "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "category": "shop", "osm_type": "way", "place_id": 194519206, "importance": 0.201, "place_rank": 30, "boundingbox": ["6.2559635", "6.2561353", "-75.5827793", "-75.5826035"], "display_name": "éxito, Carrera 66, Suramericana, Comuna 11 - Laureles-Estadio, Zona Urbana Medellín, Medellín, Valle de Aburrá, Antioquia, 0500, Colombia", "polygonpoints": [["-75.5827793", "6.2560193"], ["-75.5826572", "6.2559635"], ["-75.5826035", "6.2560795"], ["-75.5827257", "6.2561353"], ["-75.5827793", "6.2560193"]]}, "place_id": 194519206, "services": [{"id": 11, "name": "Diseño de paisajes", "price": 1542000, "repeat": {"id": 9, "code": "PDDD", "name": "PRIMERO DE CADA DIEZ DIAS"}, "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet tincidunt risus gravida euismod. Mauris ultricies, enim non dignissim auctor, quam dui blandit turpis, quis elementum quam quam non ante. Aliquam diam dolor, hendrerit et consequat ut,", "type_medition": {"id": 1, "code": "M", "name": "Metro Líneal"}}], "department": {"id": 5, "code": "1", "name": "ANTIOQUIA"}, "place_rank": 30, "display_name": "éxito, Carrera 66, Suramericana, Comuna 11 - Laureles-Estadio, Zona Urbana Medellín, Medellín, Valle de Aburrá, Antioquia, 0500, Colombia", "services_ids": [11], "address_input": "exito"}, {"id": 16, "lat": 6.1818154, "lon": -75.5693252008214, "city": {"id": 437, "name": "Itagüí", "department": 5}, "completo": {"lat": "6.1818154", "lon": "-75.5693252008214", "icon": "https://nominatim.openstreetmap.org/images/mapicons/shopping_supermarket.p.20.png", "type": "supermarket", "osm_id": 308290614, "address": {"city": "Medellín", "road": "Calle 20 Sur", "state": "Antioquia", "county": "Zona Urbana Medellín", "country": "Colombia", "postcode": "50022", "supermarket": "Carulla San Lucas", "country_code": "co", "house_number": "27-124", "neighbourhood": "El Diamante No. 2", "state_district": "Valle de Aburrá"}, "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "category": "shop", "osm_type": "way", "place_id": 146467214, "importance": 0.201, "place_rank": 30, "boundingbox": ["6.1816319", "6.1819903", "-75.5695672", "-75.5690807"], "display_name": "Carulla San Lucas, 27-124, Calle 20 Sur, El Diamante No. 2, Medellín, Zona Urbana Medellín, Medellín, Valle de Aburrá, Antioquia, 50022, Colombia", "polygonpoints": [["-75.5695672", "6.1816981"], ["-75.5691531", "6.1816319"], ["-75.5691183", "6.1817168"], ["-75.5690807", "6.181914"], ["-75.5694403", "6.1819755"], ["-75.5695266", "6.1819903"], ["-75.5695672", "6.1816981"]]}, "place_id": 146467214, "services": [{"id": 5, "name": "Reforestacion", "price": 0, "repeat": {"id": 9, "code": "PDDD", "name": "PRIMERO DE CADA DIEZ DIAS"}, "description": "", "type_medition": {"id": 1, "code": "M", "name": "Metro Líneal"}}, {"id": 6, "name": "Poda de arboles", "price": 0, "repeat": {"id": 5, "code": "PMES", "name": "PRIMERO DE CADA MES"}, "description": "", "type_medition": {"id": 1, "code": "M", "name": "Metro Líneal"}}, {"id": 7, "name": "Tala de arboles", "price": 0, "repeat": {"id": 5, "code": "PMES", "name": "PRIMERO DE CADA MES"}, "description": "", "type_medition": {"id": 1, "code": "M", "name": "Metro Líneal"}}], "department": {"id": 5, "code": "1", "name": "ANTIOQUIA"}, "place_rank": 30, "display_name": "Carulla San Lucas, 27-124, Calle 20 Sur, El Diamante No. 2, Medellín, Zona Urbana Medellín, Medellín, Valle de Aburrá, Antioquia, 50022, Colombia", "services_ids": [5, 6, 7], "address_input": "exito"}]', 'Toda la información, incluyendo precios, servicios, características, opciones, planos y disponibilidad están sujetos a cambio sin previo aviso.\n\n', '2019-06-07 20:55:31', '2019-06-07 20:55:41'),
	(100020, 6, 1, 3, '[{"id": 18, "lat": 6.2560494, "lon": -75.5826914129741, "city": {"id": 547, "name": "Medellín", "department": 5}, "completo": {"lat": "6.2560494", "lon": "-75.5826914129741", "icon": "https://nominatim.openstreetmap.org/images/mapicons/shopping_supermarket.p.20.png", "type": "supermarket", "osm_id": 571136747, "address": {"city": "Medellín", "road": "Carrera 66", "state": "Antioquia", "county": "Zona Urbana Medellín", "suburb": "Comuna 11 - Laureles-Estadio", "country": "Colombia", "postcode": "0500", "supermarket": "éxito", "country_code": "co", "neighbourhood": "Suramericana", "state_district": "Valle de Aburrá"}, "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "category": "shop", "osm_type": "way", "place_id": 194519206, "importance": 0.201, "place_rank": 30, "boundingbox": ["6.2559635", "6.2561353", "-75.5827793", "-75.5826035"], "display_name": "éxito, Carrera 66, Suramericana, Comuna 11 - Laureles-Estadio, Zona Urbana Medellín, Medellín, Valle de Aburrá, Antioquia, 0500, Colombia", "polygonpoints": [["-75.5827793", "6.2560193"], ["-75.5826572", "6.2559635"], ["-75.5826035", "6.2560795"], ["-75.5827257", "6.2561353"], ["-75.5827793", "6.2560193"]]}, "place_id": 194519206, "services": [{"id": 11, "name": "Diseño de paisajes", "price": 1542000, "repeat": {"id": 9, "code": "PDDD", "name": "PRIMERO DE CADA DIEZ DIAS"}, "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet tincidunt risus gravida euismod. Mauris ultricies, enim non dignissim auctor, quam dui blandit turpis, quis elementum quam quam non ante. Aliquam diam dolor, hendrerit et consequat ut,", "type_medition": {"id": 1, "code": "M", "name": "Metro Líneal"}}], "department": {"id": 5, "code": "1", "name": "ANTIOQUIA"}, "place_rank": 30, "display_name": "éxito, Carrera 66, Suramericana, Comuna 11 - Laureles-Estadio, Zona Urbana Medellín, Medellín, Valle de Aburrá, Antioquia, 0500, Colombia", "services_ids": [11], "address_input": "exito"}, {"id": 16, "lat": 6.1818154, "lon": -75.5693252008214, "city": {"id": 437, "name": "Itagüí", "department": 5}, "completo": {"lat": "6.1818154", "lon": "-75.5693252008214", "icon": "https://nominatim.openstreetmap.org/images/mapicons/shopping_supermarket.p.20.png", "type": "supermarket", "osm_id": 308290614, "address": {"city": "Medellín", "road": "Calle 20 Sur", "state": "Antioquia", "county": "Zona Urbana Medellín", "country": "Colombia", "postcode": "50022", "supermarket": "Carulla San Lucas", "country_code": "co", "house_number": "27-124", "neighbourhood": "El Diamante No. 2", "state_district": "Valle de Aburrá"}, "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "category": "shop", "osm_type": "way", "place_id": 146467214, "importance": 0.201, "place_rank": 30, "boundingbox": ["6.1816319", "6.1819903", "-75.5695672", "-75.5690807"], "display_name": "Carulla San Lucas, 27-124, Calle 20 Sur, El Diamante No. 2, Medellín, Zona Urbana Medellín, Medellín, Valle de Aburrá, Antioquia, 50022, Colombia", "polygonpoints": [["-75.5695672", "6.1816981"], ["-75.5691531", "6.1816319"], ["-75.5691183", "6.1817168"], ["-75.5690807", "6.181914"], ["-75.5694403", "6.1819755"], ["-75.5695266", "6.1819903"], ["-75.5695672", "6.1816981"]]}, "place_id": 146467214, "services": [{"id": 5, "name": "Reforestacion", "price": 0, "repeat": {"id": 9, "code": "PDDD", "name": "PRIMERO DE CADA DIEZ DIAS"}, "description": "", "type_medition": {"id": 1, "code": "M", "name": "Metro Líneal"}}, {"id": 6, "name": "Poda de arboles", "price": 0, "repeat": {"id": 5, "code": "PMES", "name": "PRIMERO DE CADA MES"}, "description": "", "type_medition": {"id": 1, "code": "M", "name": "Metro Líneal"}}, {"id": 7, "name": "Tala de arboles", "price": 0, "repeat": {"id": 5, "code": "PMES", "name": "PRIMERO DE CADA MES"}, "description": "", "type_medition": {"id": 1, "code": "M", "name": "Metro Líneal"}}], "department": {"id": 5, "code": "1", "name": "ANTIOQUIA"}, "place_rank": 30, "display_name": "Carulla San Lucas, 27-124, Calle 20 Sur, El Diamante No. 2, Medellín, Zona Urbana Medellín, Medellín, Valle de Aburrá, Antioquia, 50022, Colombia", "services_ids": [5, 6, 7], "address_input": "exito"}]', 'Toda la información, incluyendo precios, servicios, características, opciones, planos y disponibilidad están sujetos a cambio sin previo aviso.\n\n', '2019-06-07 20:55:31', '2019-06-07 20:55:41'),
	(100021, 8, 1, 2, '[{"id": 21, "lat": 6.33773905, "lon": -75.5442779851541, "city": {"id": 91, "name": "Bello", "department": 5}, "completo": {"lat": "6.33773905", "lon": "-75.5442779851541", "type": "trunk", "osm_id": 182300571, "address": {"road": "Glorieta Niquia", "town": "Bello", "state": "Antioquia", "county": "Bello", "country": "Colombia", "country_code": "co", "neighbourhood": "Niquía", "state_district": "Valle de Aburrá"}, "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "category": "highway", "osm_type": "way", "place_id": 118477656, "importance": 0.51, "place_rank": 26, "boundingbox": ["6.337165", "6.3382806", "-75.5450351", "-75.5434983"], "display_name": "Glorieta Niquia, Niquía, Bello, Valle de Aburrá, Antioquia, Colombia", "polygonpoints": [["-75.5450351", "6.3377046"], ["-75.5450269", "6.3376186"], ["-75.5450084", "6.3375507"], ["-75.5449691", "6.3374677"], ["-75.5449222", "6.33741"], ["-75.5448763", "6.3373682"], ["-75.5448289", "6.337334"], ["-75.5446749", "6.3372199"], ["-75.5445503", "6.3371767"], ["-75.5444444", "6.337165"], ["-75.5442105", "6.3371926"], ["-75.5439537", "6.3372725"], ["-75.5437907", "6.3373233"], ["-75.5437433", "6.3373521"], ["-75.543684", "6.3374042"], ["-75.543652", "6.3374421"], ["-75.5435887", "6.3375507"], ["-75.5435597", "6.3376179"], ["-75.5435307", "6.3377048"], ["-75.5435059", "6.3378208"], ["-75.5434983", "6.3379319"], ["-75.5435101", "6.3380183"], ["-75.5435322", "6.3380759"], ["-75.5435841", "6.3381577"], ["-75.5436673", "6.3382243"], ["-75.5437253", "6.3382476"], ["-75.5438549", "6.3382721"], ["-75.5439419", "6.3382806"], ["-75.544069", "6.3382737"], ["-75.5442715", "6.3382428"], ["-75.5444617", "6.3381981"], ["-75.5446671", "6.3381358"], ["-75.5448362", "6.3380497"], ["-75.5449104", "6.3379967"], ["-75.5449816", "6.3379278"], ["-75.5450128", "6.3378847"], ["-75.5450301", "6.3377733"], ["-75.5450351", "6.3377046"]]}, "place_id": 118477656, "services": [{"id": 13, "name": "Roceria 50% Descuento", "price": 500, "repeat": {"id": 9, "code": "PDDD", "name": "1 VEZ X DECADA"}, "description": "", "type_medition": {"id": 2, "code": "M2", "name": "Metro cuadrado"}}], "department": {"id": 5, "code": "1", "name": "ANTIOQUIA"}, "place_rank": 26, "display_name": "Glorieta Niquia, Niquía, Bello, Valle de Aburrá, Antioquia, Colombia", "services_ids": [13], "address_input": "glorieta"}]', '', '2019-06-07 20:55:31', '2019-06-07 20:55:41'),
	(100022, 1, 1, 2, '[{"id": 29, "lat": 6.2406042, "lon": -75.5864629, "city": {"id": 547, "name": "Medellín", "department": 5}, "completo": {"lat": "6.2406042", "lon": "-75.5864629", "icon": "https://nominatim.openstreetmap.org/images/mapicons/money_bank2.p.20.png", "type": "bank", "osm_id": 2391467030, "address": {"bank": "Banco de Bogota Unicentro", "city": "Medellín", "road": "Carrera 66A", "state": "Antioquia", "county": "Zona Urbana Medellín", "suburb": "Comuna 11 - Laureles-Estadio", "country": "Colombia", "postcode": "0500", "country_code": "co", "neighbourhood": "Los Conquistadores", "state_district": "Valle de Aburrá"}, "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright", "category": "amenity", "osm_type": "node", "place_id": 24677292, "importance": 0.30100000000000005, "place_rank": 30, "boundingbox": ["6.2405542", "6.2406542", "-75.5865129", "-75.5864129"], "namedetails": {"name": "Banco de Bogota Unicentro"}, "display_name": "Banco de Bogota Unicentro, Carrera 66A, Los Conquistadores, Comuna 11 - Laureles-Estadio, Zona Urbana Medellín, Medellín, Valle de Aburrá, Antioquia, 0500, Colombia", "polygonpoints": [[-75.5864629, 6.2406542], [-75.58642754466094, 6.240639555339059], [-75.5864129, 6.2406042], [-75.58642754466094, 6.240568844660941], [-75.5864629, 6.2405542], [-75.58649825533907, 6.240568844660941], [-75.5865129, 6.2406042], [-75.58649825533907, 6.240639555339059]]}, "place_id": 24677292, "services": [{"id": 8, "name": "Roceria", "price": 1000, "repeat": {"id": 6, "code": "PCAT", "name": "1 VEZ X CATORCENA"}, "description": "Uno de los factores que inciden en la seguridad vial, es el crecimiento desmedido de la vegetación en las márgenes de nuestra vía. Por esta razón, realizamos tareas diarias de rocería con nuestros colaboradores del área de influencia del proyecto, buscando que la señalización vertical se encuentre despejada y limpia. El objetivo es entregarles a nuestros usuarios una vía limpia para una circulación con mayor seguridad.", "type_medition": {"id": 2, "code": "M2", "name": "Metro cuadrado"}}], "department": {"id": 5, "code": "1", "name": "ANTIOQUIA"}, "place_rank": 30, "display_name": "Banco de Bogota Unicentro, Carrera 66A, Los Conquistadores, Comuna 11 - Laureles-Estadio, Zona Urbana Medellín, Medellín, Valle de Aburrá, Antioquia, 0500, Colombia", "services_ids": [8], "address_input": "Banco"}]', '', '2019-06-07 20:55:31', '2019-06-07 20:55:41');
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
  CONSTRAINT `FK_requests_activity_requests` FOREIGN KEY (`request`) REFERENCES `requests` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.requests_activity: ~24 rows (aproximadamente)
/*!40000 ALTER TABLE `requests_activity` DISABLE KEYS */;
INSERT IGNORE INTO `requests_activity` (`id`, `request`, `comment`, `code`, `created`, `updated`) VALUES
	(4, 100004, 'Se agregó un elemento al calendario', NULL, '2019-04-24 22:12:45', '2019-05-27 13:23:44'),
	(5, 100005, 'Se agregó un elemento al calendario', NULL, '2019-04-24 23:12:45', '2019-05-27 14:54:40'),
	(6, 100005, 'Se agrego el inventario de tu(s) direccion(es)', NULL, '2019-04-25 08:12:45', '2019-05-27 14:54:43'),
	(7, 100002, 'Se agregó un elemento al calendario', NULL, '2019-04-25 10:00:45', '2019-05-27 14:54:52'),
	(8, 100002, 'Se agrego el inventario de tu(s) direccion(es)', NULL, '2019-04-26 16:09:20', '2019-05-27 14:55:06'),
	(9, 100002, 'Se creo una nueva propuesta', NULL, '2019-04-27 13:40:04', '2019-05-27 14:55:24'),
	(10, 100012, 'Se agregó un elemento al calendario', NULL, '2019-04-25 10:00:45', '2019-05-27 14:54:52'),
	(11, 100012, 'Se agrego el inventario de tu(s) direccion(es)', NULL, '2019-04-26 16:09:20', '2019-05-27 14:55:06'),
	(12, 100012, 'Se creo una nueva propuesta', NULL, '2019-04-27 13:40:04', '2019-05-27 14:55:24'),
	(31, 100012, 'Se cambio el estado de la propuesta por Aprobado', NULL, '2019-05-27 16:14:22', '2019-05-27 16:14:22'),
	(32, 100012, 'Se cambio el estado de la solicitud por En Progreso', NULL, '2019-05-27 16:14:23', '2019-05-27 16:14:23'),
	(33, 100021, 'Se cambio el estado de la solicitud por Suspendida', NULL, '2019-05-27 16:32:59', '2019-05-27 16:32:59'),
	(34, 100021, 'Se cambio el estado de la solicitud por Solicitud Generada', NULL, '2019-05-27 16:33:02', '2019-05-27 16:33:02'),
	(35, 100021, 'Se cambio el estado de la solicitud por Cancelada', NULL, '2019-05-27 16:33:05', '2019-05-27 16:33:05'),
	(36, 100021, 'Se cambio el estado de la solicitud por Suspendida', NULL, '2019-05-27 16:34:27', '2019-05-27 16:34:27'),
	(37, 100021, 'Se cambio el estado de la solicitud por Re Activar', NULL, '2019-05-27 16:34:29', '2019-05-27 16:34:29'),
	(38, 100012, 'Se cambio el estado de la solicitud por En Progreso', NULL, '2019-06-07 12:43:08', '2019-06-07 12:43:08'),
	(39, 100012, 'Se cambio el estado de la solicitud por Esperando Respuesta Cliente', NULL, '2019-06-07 12:44:28', '2019-06-07 12:44:28'),
	(40, 100012, 'Se cambio el estado de la solicitud por En Progreso', NULL, '2019-06-07 12:44:35', '2019-06-07 12:44:35'),
	(41, 100012, 'Se cambio el estado de la solicitud por Suspendida', NULL, '2019-06-07 12:50:16', '2019-06-07 12:50:16'),
	(42, 100012, 'Se cambio el estado de la solicitud por En Progreso', NULL, '2019-06-07 12:50:23', '2019-06-07 12:50:23'),
	(43, 100001, 'Se cambio el estado de la solicitud por Esperando Propuesta', NULL, '2019-06-07 12:59:36', '2019-06-07 12:59:36'),
	(44, 100001, 'Se cambio el estado de la solicitud por Re Activada', NULL, '2019-06-07 12:59:48', '2019-06-07 12:59:48'),
	(45, 100001, 'Se cambio el estado de la solicitud por Solicitud Generada', NULL, '2019-06-07 12:59:54', '2019-06-07 12:59:54'),
	(59, 100001, 'Se agregó un elemento al calendario', '{"end": "2019-06-12 4:00:00", "type": 2, "start": "2019-06-11 4:00:00", "title": "Se agregó una nueva agenda ", "request": "100001"}', '2019-06-11 12:44:38', '2019-06-11 12:44:38'),
	(60, 100001, 'Se cambio el estado de la solicitud por Solicitud Generada', NULL, '2019-06-11 15:46:50', '2019-06-11 15:46:50');
/*!40000 ALTER TABLE `requests_activity` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.services
CREATE TABLE IF NOT EXISTS `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `type_medition` int(11) NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `id` (`id`),
  KEY `FK_services_payments_types` (`type_medition`),
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`type_medition`) REFERENCES `types_meditions` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.services: ~12 rows (aproximadamente)
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT IGNORE INTO `services` (`id`, `name`, `description`, `type_medition`, `price`) VALUES
	(1, 'Estudios de Impacto Ambiental (EIA)', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus ornare tellus sed fringilla. Morbi dapibus nisl ac tortor fermentum, mollis finibus ipsum posuere. Vivamus ornare augue sed neque fermentum rutrum sit amet mattis purus. Pellentesque consectetur in libero a aliquet. Aenean aliquam augue sed turpis efficitur, vitae posuere odio pharetra. Sed nec arcu sem. Integer tincidunt ullamcorper risus. Ut blandit, ante sit amet eleifend tincidunt, nisl felis dapibus lorem, eu commodo lacus nisl sed massa.', 1, 5),
	(2, 'Permisos y licencias', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet tincidunt risus gravida euismod. Mauris ultricies, enim non dignissim auctor, quam dui blandit turpis, quis elementum quam quam non ante. Aliquam diam dolor, hendrerit et consequat ut,', 1, 8),
	(3, 'Estudios de Conectividad Ecologica', '', 1, 3.4),
	(4, 'Restauracion ecologica', '', 1, 0),
	(5, 'Reforestacion', '', 1, 0),
	(6, 'Poda de arboles', '', 1, 0),
	(7, 'Tala de arboles', '', 1, 0),
	(8, 'Roceria', 'Uno de los factores que inciden en la seguridad vial, es el crecimiento desmedido de la vegetación en las márgenes de nuestra vía. Por esta razón, realizamos tareas diarias de rocería con nuestros colaboradores del área de influencia del proyecto, buscando que la señalización vertical se encuentre despejada y limpia. El objetivo es entregarles a nuestros usuarios una vía limpia para una circulación con mayor seguridad.', 2, 1000),
	(9, 'Planes de rescate y ahuyentamiento de fauna', '', 1, 0),
	(10, 'Estudios de monitoreo y caracterizacion de fauna y flora', '', 1, 0),
	(11, 'Diseño de paisajes', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet tincidunt risus gravida euismod. Mauris ultricies, enim non dignissim auctor, quam dui blandit turpis, quis elementum quam quam non ante. Aliquam diam dolor, hendrerit et consequat ut,', 1, 1542000),
	(13, 'Roceria 50% Descuento', '', 2, 500);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.status_employees
CREATE TABLE IF NOT EXISTS `status_employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.status_employees: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `status_employees` DISABLE KEYS */;
INSERT IGNORE INTO `status_employees` (`id`, `name`) VALUES
	(1, 'ACTIVO'),
	(2, 'RETIRADO'),
	(3, 'VACACIONES'),
	(4, 'INCAPACIDAD'),
	(5, 'FALTA INJUSTIFICADA');
/*!40000 ALTER TABLE `status_employees` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.status_invoices
CREATE TABLE IF NOT EXISTS `status_invoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.status_invoices: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `status_invoices` DISABLE KEYS */;
INSERT IGNORE INTO `status_invoices` (`id`, `name`) VALUES
	(1, 'Factura Generada'),
	(2, 'Pago Confirmado'),
	(3, 'Factura Pagada');
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
/*!40000 ALTER TABLE `status_quotations` DISABLE KEYS */;
INSERT IGNORE INTO `status_quotations` (`id`, `name`, `request_status_continue`) VALUES
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
/*!40000 ALTER TABLE `status_requests` DISABLE KEYS */;
INSERT IGNORE INTO `status_requests` (`id`, `name`) VALUES
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
/*!40000 ALTER TABLE `sys_config_options` DISABLE KEYS */;
INSERT IGNORE INTO `sys_config_options` (`id`, `name`, `result`) VALUES
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
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.sys_options: ~35 rows (aproximadamente)
/*!40000 ALTER TABLE `sys_options` DISABLE KEYS */;
INSERT IGNORE INTO `sys_options` (`option_id`, `option_name`, `option_value`, `autoload`) VALUES
	(1, 'site_url', 'http://monteverde.dataservix.com/', 1),
	(2, 'site_name_sm', 'CMS', 1),
	(3, 'site_name_md', 'Sistema de gestión de contenidos', 1),
	(4, 'site_name_lg', 'Sistema de gestión de contenidos by FelipheGomez', 1),
	(5, 'site_description', 'Sistema de gestión de contenidos creado por Andres Felipe Gomez Maya o FelipheGomez.', 1),
	(6, 'home_path', 'http://monteverde.dataservix.com/', 1),
	(7, 'admin_path', 'http://monteverde.dataservix.com/admin/', 1),
	(10, 'login_path', 'http://monteverde.dataservix.com/ingresemos.html', 1),
	(12, 'use_smilies', '1', 1),
	(13, 'admin_email', 'webmaster@ltsolucion.com', 1),
	(14, 'mailserver_url', 'mail.example.com', 1),
	(15, 'mailserver_login', 'login@example.com', 1),
	(16, 'mailserver_pass', 'password', 1),
	(17, 'mailserver_port', '110', 1),
	(18, 'default_category', '1', 1),
	(22, 'posts_per_page', '10', 1),
	(23, 'date_format', 'j F, Y', 1),
	(24, 'time_format', 'g:i a', 1),
	(25, 'links_updated_date_format', 'j F, Y g:i a', 1),
	(26, 'comment_moderation', '0', 1),
	(33, 'active_plugins', '{"name":"demo","config":"demo.php"}', 1),
	(38, 'default_email_category', '1', 1),
	(44, 'comment_registration', '0', 1),
	(57, 'upload_url_path', '', 1),
	(66, 'image_default_link_type', 'none', 1),
	(67, 'image_default_size', '', 1),
	(68, 'image_default_align', '', 1),
	(73, 'page_comments', '0', 1),
	(74, 'comments_per_page', '50', 1),
	(76, 'comment_order', 'asc', 1),
	(82, 'timezone_string', 'America/Bogota', 1),
	(85, 'default_post_format', '0', 1),
	(88, 'site_icon', '444', 1),
	(139, 'current_theme', 'Unique', 1),
	(140, 'admin_theme', 'Glace', 1);
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
) ENGINE=MyISAM AUTO_INCREMENT=112 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.sys_routes: 7 rows
/*!40000 ALTER TABLE `sys_routes` DISABLE KEYS */;
INSERT IGNORE INTO `sys_routes` (`id`, `url`, `plugin`, `module`, `section`, `id_route`, `created_at`, `update_at`, `theme`, `session_required`) VALUES
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
) ENGINE=MyISAM AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.sys_url_redirects: 8 rows
/*!40000 ALTER TABLE `sys_url_redirects` DISABLE KEYS */;
INSERT IGNORE INTO `sys_url_redirects` (`id`, `url`, `module`, `section`, `created_at`, `update_at`) VALUES
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
  CONSTRAINT `FK_tasks_employees` FOREIGN KEY (`employee`) REFERENCES `employees` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_tasks_types_tasks` FOREIGN KEY (`type`) REFERENCES `types_tasks` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.tasks: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT IGNORE INTO `tasks` (`id`, `employee`, `title`, `type`, `created`, `updated`, `dataObj`) VALUES
	(3, 2, 'Nueva Tarea para Visita tecnica para inventario - Propuestas', 4, '2019-06-12 04:00:00', '2019-06-12 04:00:00', '{"end": "2019-06-12 4:00:00", "type": 2, "start": "2019-06-11 4:00:00", "title": "Se agregó una nueva agenda ", "request": "100001"}');
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
/*!40000 ALTER TABLE `types_accounts` DISABLE KEYS */;
INSERT IGNORE INTO `types_accounts` (`id`, `name`) VALUES
	(4, 'Empresa sector publico'),
	(3, 'Establecimiento de Comercio'),
	(2, 'Persona Jurídica'),
	(1, 'Persona Natural');
/*!40000 ALTER TABLE `types_accounts` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_arls
CREATE TABLE IF NOT EXISTS `types_arls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`),
  KEY `code_key` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_arls: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `types_arls` DISABLE KEYS */;
INSERT IGNORE INTO `types_arls` (`id`, `code`, `name`) VALUES
	(1, 'NONE', 'Ninguna'),
	(2, 'SURA', 'SURA');
/*!40000 ALTER TABLE `types_arls` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_bloods
CREATE TABLE IF NOT EXISTS `types_bloods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_bloods: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `types_bloods` DISABLE KEYS */;
INSERT IGNORE INTO `types_bloods` (`id`, `name`) VALUES
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_bloods_rhs: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `types_bloods_rhs` DISABLE KEYS */;
INSERT IGNORE INTO `types_bloods_rhs` (`id`, `name`) VALUES
	(1, 'NEGATIVO (-)'),
	(2, 'POSITIVO (+)'),
	(3, '---');
/*!40000 ALTER TABLE `types_bloods_rhs` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_charges
CREATE TABLE IF NOT EXISTS `types_charges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_charges: ~13 rows (aproximadamente)
/*!40000 ALTER TABLE `types_charges` DISABLE KEYS */;
INSERT IGNORE INTO `types_charges` (`id`, `name`) VALUES
	(1, 'GERENTE'),
	(2, 'DIRECTOR OPERATIVO'),
	(3, 'COORDINADOR'),
	(4, 'OPERARIO'),
	(5, 'DIRECTOR ADMINISTRATIVO'),
	(6, 'LIDER DE CUADRILLA'),
	(7, 'MAQUINISTA'),
	(8, 'AUXILIAR OPERATIVO'),
	(9, 'PODADOR'),
	(10, 'MANILERO'),
	(11, 'CONDUCTOR'),
	(12, 'ADMINISTRATIVO'),
	(13, 'ADMINISTRADOR INFORMATICO');
/*!40000 ALTER TABLE `types_charges` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_contacts
CREATE TABLE IF NOT EXISTS `types_contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_contacts: ~7 rows (aproximadamente)
/*!40000 ALTER TABLE `types_contacts` DISABLE KEYS */;
INSERT IGNORE INTO `types_contacts` (`id`, `name`) VALUES
	(6, 'APRENDIZ AMBIENTAL'),
	(7, 'DIRECTOR EJECUTIVO'),
	(5, 'HIJO'),
	(2, 'MADRE'),
	(1, 'PADRE'),
	(3, 'SOBRINO'),
	(4, 'TIO');
/*!40000 ALTER TABLE `types_contacts` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_eps
CREATE TABLE IF NOT EXISTS `types_eps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`),
  KEY `code_key` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_eps: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `types_eps` DISABLE KEYS */;
INSERT IGNORE INTO `types_eps` (`id`, `code`, `name`) VALUES
	(1, 'EPS005', 'SSS E.P.S. SANITAS S.A.'),
	(2, 'EPS016', 'SSS COOMEVA EPS S.A'),
	(3, 'EPS002', 'SSS SALUD TOTAL S.A. EPS ARS'),
	(4, 'EPS010', 'SSS COMPAÑÍA SURAMERICANA DE SERVICIOS DE SALUD S.A. SUSALUD'),
	(5, 'EPS037', 'NUEVA EPS'),
	(6, 'EPS044', 'MEDIMAS EPS');
/*!40000 ALTER TABLE `types_eps` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_events
CREATE TABLE IF NOT EXISTS `types_events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `colorClass` varchar(50) NOT NULL,
  `task_next` int(11) NOT NULL,
  `request_next` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_types_events_types_tasks` (`task_next`),
  KEY `FK_types_events_status_requests` (`request_next`),
  CONSTRAINT `FK_types_events_status_requests` FOREIGN KEY (`request_next`) REFERENCES `status_requests` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_types_events_types_tasks` FOREIGN KEY (`task_next`) REFERENCES `types_tasks` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_events: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `types_events` DISABLE KEYS */;
INSERT IGNORE INTO `types_events` (`id`, `name`, `colorClass`, `task_next`, `request_next`) VALUES
	(1, 'Visita Comercial', 'Blue', 1, 2),
	(2, 'Visita tecnica para inventario - Propuestas', 'Green', 4, 2),
	(3, 'Entrega de productos/servicios', 'Yellow', 3, 5);
/*!40000 ALTER TABLE `types_events` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_identifications
CREATE TABLE IF NOT EXISTS `types_identifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_identifications: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `types_identifications` DISABLE KEYS */;
INSERT IGNORE INTO `types_identifications` (`id`, `name`) VALUES
	(1, 'CEDULA'),
	(2, 'NIT'),
	(3, 'PASAPORTE'),
	(4, 'TARJETA DE IDENTIDAD');
/*!40000 ALTER TABLE `types_identifications` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_meditions
CREATE TABLE IF NOT EXISTS `types_meditions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `code` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_meditions: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `types_meditions` DISABLE KEYS */;
INSERT IGNORE INTO `types_meditions` (`id`, `name`, `code`) VALUES
	(1, 'Metro Líneal', 'M'),
	(2, 'Metro cuadrado', 'M2'),
	(3, 'Metro cubico', 'M3'),
	(4, 'Global', 'GBL'),
	(5, 'Viajes de Vehículos', 'VDV'),
	(6, 'Lote', 'LOTE');
/*!40000 ALTER TABLE `types_meditions` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.types_tasks
CREATE TABLE IF NOT EXISTS `types_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.types_tasks: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `types_tasks` DISABLE KEYS */;
INSERT IGNORE INTO `types_tasks` (`id`, `name`) VALUES
	(1, 'Validar Solicitud'),
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
  CONSTRAINT `FK_users_pictures` FOREIGN KEY (`avatar`) REFERENCES `pictures` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.users: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT IGNORE INTO `users` (`id`, `username`, `names`, `surname`, `second_surname`, `phone`, `mobile`, `mail`, `permissions`, `password`, `avatar`, `registered`, `updated`) VALUES
	(5, 'user', 'User', 'Pruebas', 'DEMO', '2745002', '3005473082', 'demo@feliphegomez.lts', 1, 'demo', 1, '2019-02-01 19:40:59', '2019-06-04 16:00:52'),
	(41, 'admin', 'Andres Felipe', 'Gomez', 'Maya', '2745002', '3005473082', 'soporte@monteverdeltda.com', 3, '1035429360', 1, '2019-02-01 19:40:59', '2019-06-11 15:06:41');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.users_clients
CREATE TABLE IF NOT EXISTS `users_clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `client` int(11) NOT NULL,
  `permissions` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_af_users_clients_af_clients` (`client`),
  KEY `FK_af_users_clients_users` (`user`),
  KEY `FK_af_users_clients_permissions` (`permissions`),
  KEY `id` (`id`),
  CONSTRAINT `FK_af_users_clients_af_clients` FOREIGN KEY (`client`) REFERENCES `accounts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_af_users_clients_permissions` FOREIGN KEY (`permissions`) REFERENCES `permissions` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_af_users_clients_users` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla admin_mv1.users_clients: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `users_clients` DISABLE KEYS */;
INSERT IGNORE INTO `users_clients` (`id`, `user`, `client`, `permissions`) VALUES
	(1, 41, 1, 4);
/*!40000 ALTER TABLE `users_clients` ENABLE KEYS */;

-- Volcando estructura para tabla admin_mv1.users_clients_pending
CREATE TABLE IF NOT EXISTS `users_clients_pending` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client` int(11) NOT NULL,
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
  KEY `FK_af_users_clients_pending_af_clients` (`client`),
  KEY `FK_af_users_clients_pending_users` (`user_create`),
  KEY `FK_af_users_clients_pending_permissions` (`permissions`),
  CONSTRAINT `FK_af_users_clients_pending_af_clients` FOREIGN KEY (`client`) REFERENCES `accounts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_af_users_clients_pending_permissions` FOREIGN KEY (`permissions`) REFERENCES `permissions` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_af_users_clients_pending_users` FOREIGN KEY (`user_create`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla admin_mv1.users_clients_pending: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `users_clients_pending` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_clients_pending` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;