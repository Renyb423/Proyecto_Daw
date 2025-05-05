CREATE DATABASE GestorProductos;

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'adminPass';

GRANT ALL PRIVILEGES ON GestorProductos.* TO 'admin'@'localhost';

flush privileges;

use GestorProductos;

CREATE TABLE Usuario (
   id INT AUTO_INCREMENT,
   nombre VARCHAR(20) NOT NULL,
   apellido VARCHAR(20) NOT NULL,
   email VARCHAR(20) NOT NULL,
   password VARCHAR(20) NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE Producto (
   id INT AUTO_INCREMENT,
   nombre VARCHAR(20) NOT NULL,
   precioCompra DOUBLE NOT NULL,
   precioVenta DOUBLE NOT NULL,
   cantidad INT NOT NULL,
   proveedor VARCHAR(20) NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE Roles (
   id INT AUTO_INCREMENT,
   nombre VARCHAR(20) NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE user_roles (
   usuario_id INT NOT NULL,
   role_id INT NOT NULL,
   PRIMARY KEY(usuario_id, role_id),
   foreign key (usuario_id) references Usuario(id) ON DELETE CASCADE ON UPDATE CASCADE,
   foreign key (role_id) references Roles(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO  Roles(nombre) VALUES ("ROLE_ADMIN");
INSERT INTO  Roles(nombre) VALUES ("ROLE_READER");
