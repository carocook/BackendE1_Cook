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

    if (products.some((p) => p.code === product.code)) {
      throw new Error("El código ya existe");
    }

    const newId =
      products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newProduct = {
      id: newId,
      title: product.title,
      description: product.description,
      price: product.price,
      code: product.code,
      stock: product.stock,
      status: product.status ?? true,
      category: product.category,
      thumbnails: product.thumbnails ?? [],
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
