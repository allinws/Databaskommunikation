/*
Create a demonstration database using a bicycle shop
that builds custom bicycles as an example.
As a first iteration, we start with customers who place orders.
As a training convenience, we will forget that orders actually need
much more information than what is in this first script.
*/
DROP DATABASE BicycleShop;
CREATE DATABASE BicycleShop;
USE BicycleShop
/*
Customers:
We assume that we only deal with individuals and not companies.
Not all customers are happy with sharing their addresses - especially if they collect
the bicycle themselves.
*/
CREATE TABLE IF NOT EXISTS Customers
(
  cust_id INT AUTO_INCREMENT PRIMARY KEY,
  surname VARCHAR(20) NOT NULL,
  initials VARCHAR(5),
  salutation VARCHAR(8),
  telnumber VARCHAR(15) NOT NULL, -- max length of 15 as per ITU E.164
  address VARCHAR(150) -- for now, an address is just characters
);

/*
Orders:
A customer can (obviously) create many orders, but an order MUST belong to
a specific customer.
*/
CREATE TABLE IF NOT EXISTS Orders
(
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE NOT NULL,
    delivery_date DATE, -- cannot be NOT NULL as not known when the order is placed
    customer INT NOT NULL,
    total_price DECIMAL(8,2) NOT NULL,
    CONSTRAINT fk_customer
    FOREIGN KEY (customer)
        REFERENCES Customers(cust_id)
        ON DELETE RESTRICT
        ON UPDATE RESTRICT
);

/*
Check what happened
*/
SHOW DATABASES;
SHOW TABLES;
