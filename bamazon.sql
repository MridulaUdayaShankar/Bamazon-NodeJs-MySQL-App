DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER(10) NOT NULL auto_increment,
  PRIMARY KEY(item_id),
  product_name VARCHAR(30),
  department_name VARCHAR(30),
  price INTEGER(10) NOT NULL,
  stock_quantity INTEGER(10)
);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity) VALUES(1,"HeadPhones","Accessories",100,200);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES("SanDisk Pendrive","Electronics",20,500);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES("Fitbit","Wearable Technology",200,500);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES("Fossil","Watch",250,100);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES("Samsung Smart Tv","Electronics",900,100);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES("Philips Trimmer","Accessories",50,500);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES("Necklaces","Jewelery",30,300);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES("One Plus 6","Cell Phones",600,100);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES("Running Shoes","Sports Accessories",60,1000);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES("Gift Cards","Gifts",10,400);



SELECT * FROM products
