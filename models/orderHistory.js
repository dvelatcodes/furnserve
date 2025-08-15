import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   quantity: { type: Number, required: true }
// });

const orderHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to your User model
      required: true
    },
    products: {
      type: Array,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("OrderHistory", orderHistorySchema);
