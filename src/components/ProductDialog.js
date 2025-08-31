import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";

const ProductDialog = ({
  open,
  onOpenChange,
  product,
  onSave,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    stock: "",
    category: "",
    brand: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        discountPercentage: product.discountPercentage?.toString() || "0",
        stock: product.stock?.toString() || "",
        category: product.category || "",
        brand: product.brand || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        price: "",
        discountPercentage: "0",
        stock: "",
        category: "",
        brand: "",
      });
    }
    setErrors({});
  }, [product, open]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (
      !formData.price ||
      isNaN(formData.price) ||
      parseFloat(formData.price) <= 0
    ) {
      newErrors.price = "Valid price is required";
    }

    if (
      !formData.stock ||
      isNaN(formData.stock) ||
      parseInt(formData.stock) < 0
    ) {
      newErrors.stock = "Valid stock quantity is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (
      formData.discountPercentage &&
      (isNaN(formData.discountPercentage) ||
        parseFloat(formData.discountPercentage) < 0 ||
        parseFloat(formData.discountPercentage) > 100)
    ) {
      newErrors.discountPercentage = "Discount must be between 0 and 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      discountPercentage: parseFloat(formData.discountPercentage) || 0,
      stock: parseInt(formData.stock),
    };

    onSave(productData);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-w-screen-sm max-h-screen-sm overflow-auto">
        <div className="mb-5">
          <h2 className="m-0 mb-1 text-xl">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <p className="m-0 text-gray-600 text-sm">
            {product
              ? "Update the product information below."
              : "Fill in the details to add a new product."}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-bold">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter product title"
              className={`w-full p-2 border rounded ${
                errors.title ? "border-red-500" : "border-gray-400"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-bold">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter product description"
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-1 font-bold">Price *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="0.00"
                className={`w-full p-2 border rounded ${
                  errors.price ? "border-red-500" : "border-gray-400"
                }`}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-500">{errors.price}</p>
              )}
            </div>

            <div className="flex-1">
              <label className="block mb-1 font-bold">Stock *</label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => handleInputChange("stock", e.target.value)}
                placeholder="0"
                className={`w-full p-2 border rounded ${
                  errors.stock ? "border-red-500" : "border-gray-400"
                }`}
              />
              {errors.stock && (
                <p className="mt-1 text-sm text-red-500">{errors.stock}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-bold">Category *</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              placeholder="Enter category"
              className={`w-full p-2 border rounded ${
                errors.category ? "border-red-500" : "border-gray-400"
              }`}
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block mb-1 font-bold">Brand</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                placeholder="Enter brand"
                className="w-full p-2 border border-gray-400 rounded"
              />
            </div>

            <div className="flex-1">
              <label className="block mb-1 font-bold">Discount %</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formData.discountPercentage}
                onChange={(e) =>
                  handleInputChange("discountPercentage", e.target.value)
                }
                placeholder="0"
                className={`w-full p-2 border rounded ${
                  errors.discountPercentage
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              />
              {errors.discountPercentage && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.discountPercentage}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} variant="default">
              {loading ? "Saving..." : product ? "Update" : "Add Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDialog;
