const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: { type:mongoose.Schema.ObjectId, required: true },
    items: { type: Object, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, default: "placed" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
