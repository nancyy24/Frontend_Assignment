const API_BASE_URL = "https://dummyjson.com";

export const productService = {
  getProducts: async ({ page = 1, limit = 10, search = "" }) => {
    const skip = (page - 1) * limit;
    let url = `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`;

    if (search) {
      url = `${API_BASE_URL}/products/search?q=${encodeURIComponent(
        search
      )}&limit=${limit}&skip=${skip}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return {
      products: data.products,
      total: data.total,
      totalPages: Math.ceil(data.total / limit),
      currentPage: page,
    };
  },

  addProduct: async (productData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    alert(` Product "${productData.title}" has been added successfully!`);

    window.location.reload();

    return { success: true, message: "Product added successfully" };
  },

  updateProduct: async (id, productData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    alert(`Product "${productData.title}" has been updated successfully!`);

    window.location.reload();

    return { success: true, message: "Product updated successfully" };
  },

  deleteProduct: async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      throw new Error("Delete operation cancelled");
    }

    await new Promise((resolve) => setTimeout(resolve, 300));

    window.location.reload();

    return { success: true, message: "Product deleted successfully" };
  },
};
