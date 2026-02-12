import fs from "fs/promises";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const product = products.find((p) => p.id === Number(id));
    if (!product) throw new Error("Producto no encontrado");
    return product;
  }

  async addProduct(product) {
    const products = await this.getProducts();

    const { title, description, code, price, stock, category, thumbnails } =
      product;

    // validaciones
    if (
      !title ||
      !description ||
      !code ||
      price === undefined ||
      stock === undefined ||
      !category
    ) {
      throw new Error("Faltan campos obligatorios");
    }

    // validacion de tipos
    if (typeof price !== "number" || price <= 0) {
      throw new Error("El price debe ser un número mayor a 0");
    }

    if (typeof stock !== "number" || stock < 0) {
      throw new Error("El stock debe ser un número mayor o igual a 0");
    }

    if (thumbnails && !Array.isArray(thumbnails)) {
      throw new Error("thumbnails debe ser un arreglo");
    }

    // validacion de codigo unico
    if (products.some((p) => p.code === code)) {
      throw new Error("El código ya existe");
    }

    const newId =
      products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newProduct = {
      id: newId,
      title,
      description,
      code,
      price,
      status: product.status ?? true,
      stock,
      category,
      thumbnails: thumbnails ?? [],
    };

    products.push(newProduct);

    await fs.writeFile(this.path, JSON.stringify(products, null, 2));

    return newProduct;
  }

  async updateProduct(id, updates) {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === Number(id));

    if (index === -1) throw new Error("Producto no encontrado");

    products[index] = {
      ...products[index],
      ...updates,
      id: products[index].id,
    };

    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return products[index];
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const exists = products.some((p) => p.id === Number(id));

    if (!exists) throw new Error("Producto no encontrado");

    const filtered = products.filter((p) => p.id !== Number(id));

    await fs.writeFile(this.path, JSON.stringify(filtered, null, 2));
  }
}
