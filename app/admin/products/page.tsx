'use client';

import { motion } from 'framer-motion';
import { Plus, Package } from 'lucide-react';

const products = [
  { id: 1, name: 'Product 1', sku: 'SKU001', price: '$29.99', stock: 150, status: 'active' },
  { id: 2, name: 'Product 2', sku: 'SKU002', price: '$39.99', stock: 75, status: 'active' },
  { id: 3, name: 'Product 3', sku: 'SKU003', price: '$49.99', stock: 0, status: 'inactive' },
  { id: 4, name: 'Product 4', sku: 'SKU004', price: '$19.99', stock: 200, status: 'active' },
  { id: 5, name: 'Product 5', sku: 'SKU005', price: '$59.99', stock: 45, status: 'active' },
];

export default function ProductsPage() {
  return (
    <div className="space-y-6 mt-10 md:mt-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-2 py-1 md:px-6 md:py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg transition-shadow"
        >
          <Plus size={20} />
          Add Product
        </motion.button>
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <Package size={24} />
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${product.status === 'active'
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
              >
                {product.status}
              </span>
            </div>

            <h3 className="font-semibold mb-2">{product.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{product.sku}</p>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Price</span>
                <span className="font-semibold">{product.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Stock</span>
                <span className="font-semibold">{product.stock} units</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
