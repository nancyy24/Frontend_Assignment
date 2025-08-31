import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import ProductTable from "./components/ProductTable";
import ProductDialog from "./components/ProductDialog";
import { productService } from "./services/productService";

const Dashboard = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [productsData, setProductsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await productService.getProducts({
          page: currentPage,
          limit: 10,
          search: debouncedSearch,
        });
        setProductsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, debouncedSearch]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleDeleteProduct = async (product) => {
    try {
      await productService.deleteProduct(product.id);
    } catch (err) {
      if (err.message !== "Delete operation cancelled") {
        alert("Failed to delete product: " + err.message);
      }
    }
  };

  const handleSaveProduct = async (productData) => {
    setActionLoading(true);

    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, productData);
      } else {
        await productService.addProduct(productData);
      }
      setDialogOpen(false);
      setEditingProduct(null);
    } catch (err) {
      alert("Failed to save product: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <Layout
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      onAddProduct={handleAddProduct}
    >
      <ProductTable
        products={productsData?.products || []}
        loading={isLoading}
        error={error}
        pagination={{
          currentPage,
          totalPages: productsData?.totalPages || 1,
          total: productsData?.total || 0,
        }}
        onPageChange={setCurrentPage}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />

      <ProductDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        product={editingProduct}
        onSave={handleSaveProduct}
        loading={actionLoading}
      />
    </Layout>
  );
};

const App = () => {
  return <Dashboard />;
};

export default App;
