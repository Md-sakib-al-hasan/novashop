'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface TableData {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  joinDate: string;
  orders: number;
}

const dummyData: TableData[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    joinDate: '2024-01-15',
    orders: 24,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'active',
    joinDate: '2024-02-10',
    orders: 18,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    status: 'inactive',
    joinDate: '2024-01-20',
    orders: 12,
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    status: 'active',
    joinDate: '2024-03-05',
    orders: 31,
  },
  {
    id: '5',
    name: 'Robert Brown',
    email: 'robert@example.com',
    status: 'active',
    joinDate: '2024-02-28',
    orders: 15,
  },
  {
    id: '6',
    name: 'Emily Davis',
    email: 'emily@example.com',
    status: 'inactive',
    joinDate: '2024-01-08',
    orders: 8,
  },
  {
    id: '7',
    name: 'David Miller',
    email: 'david@example.com',
    status: 'active',
    joinDate: '2024-03-12',
    orders: 22,
  },
  {
    id: '8',
    name: 'Lisa Anderson',
    email: 'lisa@example.com',
    status: 'active',
    joinDate: '2024-02-01',
    orders: 19,
  },
];

type SortField = 'name' | 'email' | 'orders';
type SortOrder = 'asc' | 'desc';

export function DataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const itemsPerPage = 5;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const sortedData = [...dummyData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === 'string') {
      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue as string)
        : (bValue as string).localeCompare(aValue);
    }

    return sortOrder === 'asc'
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIdx, startIdx + itemsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  Name
                  <ArrowUpDown size={16} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                <button
                  onClick={() => handleSort('email')}
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  Email
                  <ArrowUpDown size={16} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Join Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                <button
                  onClick={() => handleSort('orders')}
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  Orders
                  <ArrowUpDown size={16} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, idx) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-muted-foreground">#{item.id}</td>
                <td className="px-6 py-4 text-sm font-medium">{item.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{item.email}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === 'active'
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{item.joinDate}</td>
                <td className="px-6 py-4 text-sm font-semibold">{item.orders}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/20">
        <p className="text-sm text-muted-foreground hidden md:block">
          Showing {startIdx + 1}-{Math.min(startIdx + itemsPerPage, sortedData.length)} of{' '}
          {sortedData.length} results
        </p>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-2 md:px-3 py-1 md:py-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
            Previous
          </motion.button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <motion.button
              key={page}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(page)}
              className={`w-8 md:w-10 h-8 md:h-10 rounded-lg font-semibold transition-colors ${currentPage === page
                ? 'bg-accent text-accent-foreground'
                : 'border border-border hover:bg-muted'
                }`}
            >
              {page}
            </motion.button>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-2 md:px-3 py-1 md:py-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
