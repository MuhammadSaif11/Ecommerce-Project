CREATE DATABASE ecommerce_project;
USE ecommerce_project;

 CREATE TABLE `role` ( 
  `role_name` varchar(50) NOT NULL,
  `role_description` varchar(50) NOT NULL, 
   PRIMARY KEY (`role_name`) 
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

 CREATE TABLE `user` ( 
  `username` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL, 
  `password` varchar(80) NOT NULL, 
  `email` varchar(255) NOT NULL,
   PRIMARY KEY (`username`) 
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE otp_codes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    otp VARCHAR(6) NOT NULL,
    expiration_time TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

 CREATE TABLE `user_role` ( 
  `user_id` varchar(50) NOT NULL,
  `role_id` varchar(50) NOT NULL, 
PRIMARY KEY (`user_id`,`role_id`),
CONSTRAINT `FK_USER_05` 
FOREIGN KEY (`user_id`) 
REFERENCES `user` (`username`),
 CONSTRAINT `FK_ROLE` 
FOREIGN KEY (`role_id`) 
REFERENCES `role` (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1; 

 CREATE TABLE `product` ( 
  `product_id` bigint auto_increment primary key,
  `product_name` varchar(50) NOT NULL,
  `product_description` varchar(255) NOT NULL, 
  `product_actual_price` decimal(10,2) NOT NULL, 
  `product_discounted_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE image_model (
    image_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    image_type VARCHAR(255),
    image_name VARCHAR(255),
    image_pic_byte LONGBLOB
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE product_image (
    product_id BIGINT,
    image_id BIGINT,
    PRIMARY KEY (product_id, image_id),
    FOREIGN KEY (product_id) REFERENCES product (product_id),
    FOREIGN KEY (image_id) REFERENCES image_model (image_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE Cart (
    cart_id bigint PRIMARY KEY AUTO_INCREMENT,
    user_id varchar(50) NOT NULL ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES `user` (username)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE cart_item (
    cart_item_id bigint PRIMARY KEY AUTO_INCREMENT,
    cart_id bigint NOT NULL,
    product_id bigint NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES Cart(cart_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE orders (
    order_id bigint PRIMARY KEY AUTO_INCREMENT,
    user_id varchar(50) NOT NULL ,
    full_name varchar(50) NOT NULL,
    contact_number varchar(11) NOT NULL,
    full_address varchar(255) NOT NULL,
    order_status varchar(50) NOT NULL,
    order_total_amount decimal(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES `user` (username)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE order_item (
    order_item_id bigint PRIMARY KEY AUTO_INCREMENT,
    order_id bigint NOT NULL,
    product_id bigint NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders (order_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;