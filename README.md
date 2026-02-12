# 🛒 Backend Ecommerce

API REST desarrollada con **Node.js y Express** para la gestión de productos y carritos de compra.

La persistencia de datos se realiza mediante archivos JSON (`products.json` y `carts.json`).

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- File System (fs)
- Postman

---

## 📂 Estructura del Proyecto

```bash
BackendE1_Cook
├── src
│ ├── app.js
│ ├── routes
│ │ ├── products.router.js
│ │ └── carts.router.js
│ ├── managers
│ │ ├── ProductManager.js
│ │ └── CartManager.js
│ └── data
│ ├── products.json
│ └── carts.json
├── .gitignore
├── package.json
└── README.md
```

---

## ▶️ Cómo ejecutar el proyecto

1. Clonar el repositorio:

```bash
git clone https://github.com/carocook/BackendE1_Cook.git
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar el servidor:

```bash
npm run dev
```

4. El servidor se ejecuta en:

```bash
http://localhost:8080
```

## 📦 Endpoints

- URL

```bash
http://localhost:8080/api/products

```

#### Endpoints Productos

🔹 GET /

Lista todos los productos.

🔹 GET /:pid

Obtiene un producto por ID.

🔹 POST /

Crea un nuevo producto.

- Formato de JSON requerido:

```bash
{
  "title": "String",
  "description": "String",
  "code": "String",
  "price": 0,
  "status": true,
  "stock": 0,
  "category": "String",
  "thumbnails": ["img1.jpg"]
}
```

🔹 PUT /:pid

Actualiza un producto por ID.

🔹 DELETE /:pid

Elimina un producto por ID.

#### Endpoints Carrito

- URL

```bash
http://localhost:8080/api/carts

```

🔹 POST /

Crea un nuevo carrito.

- Formato de JSON requerido:

```bash
{
  "id": 1,
  "products": []
}
```

🔹 GET /:cid

Lista los productos de un carrito específico.

🔹 POST /:cid/product/:pid

Agrega un producto al carrito.

---

## 💾 Persistencia

La información se almacena en:

`products.json`

`carts.json`

Los datos permanecen guardados incluso al reiniciar el servidor.

---

## 🧪 Pruebas

Todas las pruebas fueron realizadas con Postman.

Se puede importar la colección incluida en el repositorio para replicar las requests.

---

## 👩‍💻 Desarrollado por

**Carolina Cook**

📌 Proyecto académico – Backend con Node.js y Express
