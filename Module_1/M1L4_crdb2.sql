CREATE TABLE OrderLines
(
    order_id INT NOT NULL,
    lineno INT NOT NULL,
    qty INT NOT NULL,
    product VARCHAR(30) NOT NULL,
    CONSTRAINT pk_orderline
    PRIMARY KEY (order_id, lineno),
    CONSTRAINT fk_order
    FOREIGN KEY (order_id)
    REFERENCES Orders(order_id)
);
