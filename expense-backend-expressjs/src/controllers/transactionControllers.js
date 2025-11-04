import Transaction from "../models/Transaction.js";

async function createTransaction(req, res, next) {
  try {
    const payload = req.body;
    const tx = new Transaction(payload);
    const saved = await tx.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
}

async function getTransaction(req, res, next) {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ message: "Transaction not found" });
    res.json(tx);
  } catch (err) {
    next(err);
  }
}

async function updateTransaction(req, res, next) {
  try {
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Transaction not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function deleteTransaction(req, res, next) {
  try {
    const removed = await Transaction.findByIdAndDelete(req.params.id);
    if (!removed)
      return res.status(404).json({ message: "Transaction not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
}

async function listTransactions(req, res, next) {
  try {
    const {
      type,
      category,
      startDate,
      endDate,
      page = 1,
      limit = 20,
      sortBy = "date:desc",
    } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.date.$lte = end;
      }
    }

    let sort = { date: -1 };
    if (sortBy) {
      const [field, dir] = sortBy.split(":");
      sort = { [field]: dir === "asc" ? 1 : -1 };
    }

    const skip = (Math.max(1, Number(page)) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      Transaction.find(filter).sort(sort).skip(skip).limit(Number(limit)),
      Transaction.countDocuments(filter),
    ]);

    const agg = await Transaction.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    const summary = { income: 0, expense: 0 };
    agg.forEach((a) => {
      summary[a._id] = a.total;
    });

    res.json({
      page: Number(page),
      limit: Number(limit),
      total,
      items,
      summary,
    });
  } catch (err) {
    next(err);
  }
}
export default {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  listTransactions,
};
