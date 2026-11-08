# Gestor de Tareas Web

Aplicación web para gestionar tareas personales. Práctica final del curso.

## Tecnologías

- Backend: Java 17, Spring Boot 3, Hibernate/JPA, Maven
- Base de datos: MySQL 8
- Frontend: Angular (pendiente)

## Requisitos

- Java 17
- Docker (para MySQL)

## Cómo ejecutar el backend

1. Arranca MySQL con Docker:

```bash
docker run -d --name mysql-gestor \
  -e MYSQL_ROOT_PASSWORD=tu_contraseña \
  -p 3306:3306 \
  mysql:8
```

2. En `src/main/resources/application.properties`, pon tu contraseña
   en `spring.datasource.password` (o define la variable `DB_PASSWORD`).

3. Lanza la aplicación:

```bash
./mvnw clean spring-boot:run
```

La base de datos `gestor_tareas` se crea automáticamente al arrancar.
La API queda en `http://localhost:8080`.

## Estado del proyecto

- [x] Proyecto Spring Boot con conexión a MySQL
- [ ] Entidad `Tarea` y API REST
- [ ] Frontend Angular
- [ ] Autenticación JWT