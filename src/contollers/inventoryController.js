const Inventory = require("../models/InventorySchema");

exports.updateInventory = async (req, res) => {
  const payload = req.body;
  console.log("Payload", payload);
  try {
    for (const item of payload) {
      const { productId, quantity, operation } = item;

      let updatedQuantity;
      const existingProduct = await Inventory.findOne({ productId });

      if (!existingProduct) {
        if (operation === "add") {
          updatedQuantity = quantity;
        } else {
          updatedQuantity = -quantity; // Negative for subtracting non-existing product
        }

        const newProduct = new Inventory({
          productId,
          quantity: updatedQuantity,
        });
        await newProduct.save();
      } else {
        if (operation === "add") {
          updatedQuantity = existingProduct.quantity + quantity;
        } else {
          updatedQuantity = existingProduct.quantity - quantity;
        }

        existingProduct.quantity = updatedQuantity;
        await existingProduct.save();
      }
    }

    res.status(200).json({ message: "Inventory updated successfully." });
  } catch (error) {
    console.error("Error updating inventory:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
