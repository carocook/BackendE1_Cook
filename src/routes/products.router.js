import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const manager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res, next) => {
  try {
    const products = await manager.getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:pid", async (req, res, next) => {
  try {
    const product = await manager.getProductById(req.params.pid);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const product = await manager.addProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

router.put("/:pid", async (req, res, next) => {
  try {
    const updated = await manager.updateProduct(req.params.pid, req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete("/:pid", async (req, res, next) => {
  try {
    await manager.deleteProduct(req.params.pid);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    next(error);
  }
});

export default router;
