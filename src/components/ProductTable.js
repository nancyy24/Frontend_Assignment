import React, { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

const LoadingSkeleton = () => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex gap-4 p-3">
          <Skeleton className="h-12 w-1/4" />
          <Skeleton className="h-12 w-1/6" />
          <Skeleton className="h-12 w-1/6" />
          <Skeleton className="h-12 w-1/6" />
          <Skeleton className="h-12 w-1/6" />
        </div>
      ))}
    </div>
  );
};

const ProductTable = ({
  products,
  loading,
  error,
  pagination,
  onPageChange,
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(pagination?.currentPage || 1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  if (error) {
    return (
      <div className="bg-white border border-gray-300 rounded p-5 my-2">
        <h3 className="text-red-600 m-0 mb-2">Error</h3>
        <p className="m-0 text-gray-600">
          Failed to load products. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-300 rounded p-5 my-2">
      <div className="mb-5">
        <h2 className="m-0 mb-1 text-2xl text-gray-950">Products</h2>
        {pagination?.total && (
          <p className="m-0 text-gray-950 text-base">
            Showing {products?.length || 0} of {pagination.total} products
          </p>
        )}
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : products?.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 m-0">No products found</p>
        </div>
      ) : (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left border-b border-gray-300">
                  Title
                </th>
                <th className="p-3 text-left border-b border-gray-300">
                  Price
                </th>
                <th className="p-3 text-left border-b border-gray-300">
                  Category
                </th>
                <th className="p-3 text-left border-b border-gray-300">
                  Stock
                </th>
                <th className="p-3 text-right border-b border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product.id} className="border-b border-gray-200">
                  <td className="p-3">
                    <div>
                      <div className="font-bold">{product.title}</div>
                      <div className="text-sm text-gray-600 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                        {product.description}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-bold">${product.price}</div>
                    {product.discountPercentage > 0 && (
                      <div className="text-sm text-green-600">
                        -{product.discountPercentage}% off
                      </div>
                    )}
                  </td>
                  <td className="p-3">
                    <span className="bg-gray-200 px-2 py-1 rounded-full text-sm text-gray-700">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        product.stock > 10
                          ? "bg-green-100 text-green-800"
                          : product.stock > 0
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        onClick={() => onEdit(product)}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => onDelete(product)}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-200">
              <div className="text-base text-gray-950">
                Page {currentPage} of {pagination.totalPages}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  variant="outline"
                >
                  « Previous
                </Button>
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= pagination.totalPages}
                  variant="outline"
                >
                  Next »
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductTable;
