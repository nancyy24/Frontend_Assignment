import React, { useState } from "react";
import { Button } from "./ui/button";

const Sidebar = ({ isOpen, onToggle }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={onToggle}
        />
      )}

      <div
        className={`fixed top-0 w-52 h-screen bg-gray-100 border-2 border-gray-400 z-50 transition-all duration-300 ${
          isOpen ? "left-0" : "-left-52"
        }`}
      >
        <div className="p-4 border-b-2 border-gray-400 bg-gray-200">
          <div className="flex items-center gap-1">
            <span className="text-base font-normal">Products</span>
          </div>
        </div>

        <div className="p-2">
          <Button
            variant="secondary"
            className="w-full justify-start mb-1 bg-gray-300 hover:bg-gray-400 border border-gray-500"
          >
            All Products
          </Button>
          <Button variant="outline" className="w-full justify-start mb-1">
            Dashboard
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Settings
          </Button>
        </div>
      </div>
    </>
  );
};

const Header = ({
  onSidebarToggle,
  searchValue,
  onSearchChange,
  onAddProduct,
}) => {
  return (
    <div className="bg-gray-100 border-b-2 border-gray-400 px-5 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Button
          onClick={onSidebarToggle}
          variant="secondary"
          size="sm"
          className="bg-gray-300 border border-gray-500 px-2"
        >
          ☰
        </Button>
        <h1 className="text-lg font-normal m-0 text-gray-700">
          Product Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="px-2 py-1 border-2 border-gray-400 rounded w-44 text-sm"
        />

        <Button
          onClick={onAddProduct}
          className="bg-green-500 hover:bg-green-600 border border-green-600 text-sm"
          size="sm"
        >
          + Add
        </Button>
      </div>
    </div>
  );
};

const Layout = ({ children, searchValue, onSearchChange, onAddProduct }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col">
        <Header
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          onAddProduct={onAddProduct}
        />

        <main className="flex-1 overflow-auto p-4 bg-white m-2 border border-gray-300 rounded">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
