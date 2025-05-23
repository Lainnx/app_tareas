DROP DATABASE IF EXISTS tareas;
CREATE DATABASE IF NOT EXISTS tareas;
USE tareas;

CREATE TABLE IF NOT EXISTS usuarios(
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    pass VARCHAR(30),
    email VARCHAR(150)
);
CREATE TABLE IF NOT EXISTS lista_tareas(
    id_tarea INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_usuario INT,
    nombre_tarea VARCHAR(200),
    estado VARCHAR(10) DEFAULT "EN PROCESO",
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuarios
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id_usuario)
	ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

insert into usuarios (nombre, pass, email)values("test", "test", "test@test.test");
