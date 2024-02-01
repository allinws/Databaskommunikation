CREATE DATABASE popular_cars;
USE popular_cars;

CREATE TABLE IF NOT EXISTS cars(
    car_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    power_type VARCHAR(30),
    price INT,
    no_sold INT
);

INSERT INTO cars (name, power_type, price, no_sold) VALUES
("Mitsubishi Outlander","Hybrid", 414000, 4323),
("BMW i3","Electric", 309000, 5687),
("Tesla Model X", "Electric", 846220, 4981),
("Toyota Yaris", "Hybrid", 207100, 3856),
("Peugeot 208", "Petrol", 215900, 1532),
("Nissan Leaf", "Electric", 278000, 12303),
("Volvo XC60", "Hybrid", 764200, 3687),
("Tesla Model S", "Electric", 791200, 3633),
("Toyota RAV4", "Hybrid", 387400, 3627);
