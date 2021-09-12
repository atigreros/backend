create database adonis;
use adonis;

desc products;

insert into products (title, price, stock, thumbnail) values ("sombrero voltiao", 79, 3,"https://images-na.ssl-images-amazon.com/images/I/91XPsfS64ML._AC_SL1500_.jpg" );
insert into products (title, price, stock, thumbnail) values ("mochila wayuu", 46, 5,"https://www.wayuubags.co/images/Mochilas%20Wayuu%20Bolsos%2019.jpg");

select * from products;
