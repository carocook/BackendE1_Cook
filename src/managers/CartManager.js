import fs from "fs/promises";

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    const cart = carts.find((c) => c.id === Number(id));
    if (!cart) throw new Error("Carrito no encontrado");
    return cart;
  }

  async createCart() {
    const carts = await this.getCarts();

    const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;

    const newCart = {
      id: newId,
      products: [],
    };

    carts.push(newCart);

    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async addProductToCart(cid, pid) {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex((c) => c.id === Number(cid));

    if (cartIndex === -1) throw new Error("Carrito no encontrado");

    const productIndex = carts[cartIndex].products.findIndex(
      (p) => p.product === Number(pid),
    );

    if (productIndex === -1) {
      carts[cartIndex].products.push({
        product: Number(pid),
        quantity: 1,
      });
    } else {
      carts[cartIndex].products[productIndex].quantity += 1;
    }

    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return carts[cartIndex];
  }
}
