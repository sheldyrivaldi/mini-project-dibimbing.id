create database merchant_service;
use merchant_service;
alter user 'root'@'localhost' identified with mysql_native_password by '';

create table merchants (
id varchar(255) primary key,
password varchar(50),
name varchar(255),
address varchar(255),
join_date date,
phone_number numeric(65),
constraint CHK_merchants check (length(password)>=6 and length(name)>=3 and length(id)>=1)
);

create table products (
id varchar (255) primary key,
name varchar (50),
quantity numeric(65),
price numeric(65),
constraint CHK_products check (length(name)>=3 and quantity>=1 and price>=10000 and length(id)>=1)
);

# Dummy Data Merchants
insert into merchants(id, password, name, address, join_date, phone_number)
values("1", "a1b2c3d4", "Sheldy", "Bekasi", "2022-09-24", 82135435612),
("2", "a2b3c4d5", "Rivaldi", "Jakarta", "2022-10-03", 8124324543);

# Dummy Data Products
insert into products(id, name, quantity, price)
values("1","Jacket", 3, 150000),
("2", "T-shirt", 10, 99000);


select * from merchants;
select * from products;
