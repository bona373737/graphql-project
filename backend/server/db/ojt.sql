-- users 테이블 생성

CREATE TABLE `ojt_db`.`users` (
  `id` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `admin` INT NOT NULL,
  `cre_date` DATETIME NOT NULL,
  `mod_date` DATETIME,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- product 테이블 생성

CREATE TABLE `ojt_db`.`product` (
  `id` VARCHAR(45) NOT NULL AUTO_INCREMENT,
  `mall_name` VARCHAR(45) NOT NULL,
  `product_name` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `profit` INT NOT NULL DEFAULT 0,
  `detail` VARCHAR(255) NOT NULL,
  `img_url` VARCHAR(255) NOT NULL,
  `cre_date` DATETIME NOT NULL,
  `mod_date` DATETIME,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- product size stock

CREATE TABLE `ojt_db`.`product_size_stock` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `product_size` VARCHAR(45) NOT NULL,
  `stock` INT NOT NULL DEFAULT 0,
  `cre_date` DATETIME NOT NULL,
  `mod_date` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- user_product

CREATE TABLE `ojt_db`.`user_product` (
  `id` VARCHAR(255) NOT NULL,
  `product_id` INT NOT NULL,
  `product_name` VARCHAR(45) NOT NULL,
  `size` VARCHAR(45) NOT NULL,
  `number` INT NOT NULL DEFAULT 0,
  `total_price` INT NOT NULL DEFAULT 0,
  `user_id` VARCHAR(45) NOT NULL,
  `cre_date` DATETIME NOT NULL,
  `mod_date` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

