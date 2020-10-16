const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      default: 0,
    },
    cat_id: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    status: {
      type: String,
      default: null,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    promotion: {
      type: String,
      default: null,
    },
    warranty: {
      type: String,
      default: null,
    },
    accessories: {
      type: String,
      default: null,
    },
    is_stock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema, "products");
