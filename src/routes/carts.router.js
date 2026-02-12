import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const manager = new CartManager("./src/data/carts.json");

router.post("/", async (req, res, next) => {
  try {
    const cart = await manager.createCart();
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
});

router.get("/:cid", async (req, res, next) => {
  try {
    const cart = await manager.getCartById(req.params.cid);
    res.json(cart.products);
  } catch (error) {
    next(error);
  }
});

router.post("/:cid/product/:pid", async (req, res, next) => {
  try {
    const updatedCart = await manager.addProductToCart(
      req.params.cid,
      req.params.pid,
    );
    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
});

export default router;
