import express from "express";
import controller from "../controllers/transactionControllers.js";
import validate from "../middleware/validateRequest.js";
import {
  createSchema,
  updateSchema,
} from "../validation/transactionValidation.js";

const router = express.Router();

router.post("/", validate(createSchema), controller.createTransaction);
router.get("/", controller.listTransactions);
router.get("/:id", controller.getTransaction);
router.put("/:id", validate(updateSchema), controller.updateTransaction);
router.delete("/:id", controller.deleteTransaction);

export default router;
