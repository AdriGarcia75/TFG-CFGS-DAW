# Gestor de Tareas estilo Kanban - AnyTasks

AnyTasks es una herramienta de gestión de tareas inspirada en el estilo Kanban, pensada para quienes buscan una opción sencilla pero eficaz frente a herramientas más complejas como Jira o Trello.

Con AnyTasks, puedes gestionar tus tareas de manera rápida y eficiente, asignar etiquetas personalizadas y definir prioridades según lo necesites. Además, puedes añadir comentarios y adjuntar archivos, manteniendo un historial detallado de todos los cambios realizados.

La idea es ofrecer una alternativa práctica, clara y visualmente atractiva, para que puedas mantener el control de tus tareas, ya sean personales o en equipo, sin complicaciones innecesarias.

## Características

- 📝 **Gestión de tareas**: Crea, edita y elimina tareas.
- 🗂️ **Clasificación de tareas**: Organiza las tareas en categorías y asigna etiquetas personalizadas.
- 🚦 **Estado de tareas**: Cada tarea puede tener un estado como "Pendiente", "En progreso" o "Hecho".
- 🔥 **Prioridades**: Asigna prioridades a las tareas (Baja, Media, Alta).
- 💬 **Comentarios**: Los usuarios pueden agregar comentarios a las tareas.
- 📎 **Archivos adjuntos**: Permite adjuntar archivos a las tareas.
- 📜 **Historial de cambios**: Un registro de los cambios realizados en cada tarea, como cambios de estado o prioridad.
- 🔁 **Tareas recurrentes**: Puedes configurar tareas que se repiten de forma diaria, semanal o mensual.

## Tecnologías Utilizadas

- **Frontend**: React con Tailwind CSS
- **Backend**: Express.js
- **Base de Datos**: MySQL
- **Autenticación**: WIP - por decidir si a mano o via libreria (seguramente esta opción)
- **ORM**: Sequelize ORM

## Base de Datos

### Tablas / modelos:

1. **Users**
   Almacena información de los usuarios, como su nombre, correo y contraseña.

2. **Tasks**
   Incluye título, descripción, fecha de vencimiento, estado y prioridad. Cada tarea está vinculada a un usuario.

3. **Projects**
   Contiene nombre y descripción de los proyectos.

4. **Task_Projects**
   Relación muchos a muchos entre tareas y proyectos.

5. **Categories**
   Clasificación de tareas mediante categorías con nombre y descripción.

6. **Task_Categories**
   Relación muchos a muchos entre tareas y categorías.

7. **Tags**
   Etiquetas libres para clasificación flexible de tareas.

8. **Task_Tags**
   Relación muchos a muchos entre tareas y etiquetas.

9. **Comments**
   Comentarios de los usuarios asociados a tareas.

10. **Attachments**
    Archivos adjuntos relacionados a tareas (documentos, imágenes, etc.).

11. **Task_History**
    Historial de cambios en tareas: estado, prioridad, etc.

### Diagrama completo de la Base de Datos:
![Descripción de la imagen](assets/images/db-schema.png)

## Instalación
### Paso 1 -Descarga e instalación del proyecto

**Paso 1.1 - Clonar el Repositorio** 

Clona el repositorio en tu máquina local:
```bash
git clone https://github.com/AdriGarcia75/TFG-CFGS-DAW.git
cd ./anytasks
```

**Paso 1.2 - Descargar e instalar dependencias**

Instala las dependencias necesarias para el proyecto en ambas carpetas server y client.
Para la carpeta de _server_
```bash
cd server/
npm install
```
Para la carpeta de _client_
```bash
cd ../client/
npm install
```
### Paso 2 - Creación de Base de Datos y Migraciones
> ⚠️ **IMPORTANTE:** Asegúrate de tener MySQL Server instalado y que el proceso de **MySQL Server** esté en ejecución antes de continuar.

### Paso 2.1 - Creación del conector de la BBDD
Ahora crearemos un conector de la BBDD, así podemos consultarla desde nuestro gestor (recomiendo utlizar DBeaver).
![Ejemplo de creación de conector de BBDD](assets/images/connector1.png)

> Si da error, seguramente sea por el parámetro de "Database". Este da por hecho de que **ya existe** una BBDD del mismo nombre, dejar vacío si decides crearla en el siguiente paso (Método 2)

### Paso 2.2 - Editar el conector de la BBDD
Esta opción se habilita debido a que a partir de la versión 8 o superior de MySQL se usa un método de autenticación que requiere la recuperación de la clave pública para establecer la conexión correctamente.  
![Edición del conector, habilitando las claves públicas](assets/images/allowPublicKeyRetrieval.png)

### Paso 2.3 - Migraciones (y creacíón de la BBDD desde terminal) 

> ❗ **Nota:** Abre el proyecto en Visual Studio Code o en otro IDE, navega al archivo _.env_ en _./server/_ y cambía si es necesario las credenciales de tu gestor de BBDD (nombre y contraseña).

#### Método 1: Creación manual de la base de datos

1. Abre **DBeaver** u otro gestor de bases de datos MySQL.
2. Crea una base de datos llamada `anytasks` o el nombre que hayas configurado en el _.env_ de _./server/_.
3. Abre **Visual Studio Code** y navega a la carpeta `/server`.
4. Ejecuta el siguiente comando en la terminal:

```bash
npx sequelize-cli db:migrate
```

#### Método 2: Creación automática de la BBDD desde la terminal

1. Abre **Visual Studio Code** y navega a la carpeta `/server`.
2. Ejecuta los siguientes comandos en la terminal:

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```
