import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPackage, FiTruck, FiCheck, FiX, FiEye } from 'react-icons/fi';
import { orderApi } from '../../api/orderApi';
import type { Order } from '../../types';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [updateStatusModal, setUpdateStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [filterStatus]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await orderApi.getAllOrders(0, 50);
      let filteredOrders = response.content;
      
      if (filterStatus !== 'ALL') {
        filteredOrders = filteredOrders.filter((order) => order.status === filterStatus);
      }
      
      setOrders(filteredOrders);
    } catch (error: any) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder || !newStatus) {
      toast.error('Please select a status');
      return;
    }

    try {
      await orderApi.updateOrderStatus(selectedOrder.id, {
        status: newStatus,
        trackingNumber: trackingNumber || undefined,
      });
      toast.success('Order status updated successfully');
      setUpdateStatusModal(false);
      setSelectedOrder(null);
      setNewStatus('');
      setTrackingNumber('');
      fetchOrders();
    } catch (error: any) {
      toast.error('Failed to update order status');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-500/20 text-yellow-400',
      PROCESSING: 'bg-blue-500/20 text-blue-400',
      SHIPPED: 'bg-purple-500/20 text-purple-400',
      DELIVERED: 'bg-green-500/20 text-green-400',
      CANCELLED: 'bg-red-500/20 text-red-400',
      RETURNED: 'bg-orange-500/20 text-orange-400',
    };
    return colors[status] || 'bg-dark-700 text-dark-300';
  };

  const statusOptions = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED'];
  const filterOptions = ['ALL', ...statusOptions];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Order Management</h2>
          <p className="text-dark-400 mt-1">{orders.length} orders</p>
        </div>

        {/* Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input-field w-full sm:w-auto"
        >
          {filterOptions.map((status) => (
            <option key={status} value={status}>
              {status === 'ALL' ? 'All Orders' : status}
            </option>
          ))}
        </select>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="glass-card rounded-2xl h-32 shimmer" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <FiPackage className="mx-auto text-dark-600 mb-4" size={48} />
          <p className="text-dark-400">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              whileHover={{ x: 4 }}
              className="glass-card-hover rounded-2xl p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">Order #{order.id}</h3>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-dark-400">
                    <p>📅 {format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm')}</p>
                    <p>💰 ${order.totalAmount.toFixed(2)}</p>
                    <p>📦 {order.items.length} items</p>
                    {order.trackingNumber && <p>🚚 {order.trackingNumber}</p>}
                  </div>

                  {order.shippingAddress && (
                    <p className="text-sm text-dark-500 mt-2 line-clamp-1">
                      📍 {order.shippingAddress}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowDetailsModal(true);
                    }}
                    className="p-3 glass-card rounded-xl hover:bg-white/10 transition-colors"
                    title="View Details"
                  >
                    <FiEye className="text-primary-400" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedOrder(order);
                      setNewStatus(order.status);
                      setTrackingNumber(order.trackingNumber || '');
                      setUpdateStatusModal(true);
                    }}
                    className="p-3 glass-card rounded-xl hover:bg-white/10 transition-colors"
                    title="Update Status"
                  >
                    <FiTruck className="text-green-400" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetailsModal(false)}
              className="backdrop-overlay"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Order #{selectedOrder.id}</h2>
                  <button onClick={() => setShowDetailsModal(false)}>
                    <FiX size={24} className="text-dark-400 hover:text-white" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Order Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-dark-400 mb-1">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-dark-400 mb-1">Payment Status</p>
                      <span className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(selectedOrder.paymentStatus)}`}>
                        {selectedOrder.paymentStatus}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-dark-400 mb-1">Order Date</p>
                      <p className="text-white font-semibold">
                        {format(new Date(selectedOrder.createdAt), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-dark-400 mb-1">Total Amount</p>
                      <p className="text-white font-semibold">${selectedOrder.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <p className="text-sm text-dark-400 mb-2">Shipping Address</p>
                    <div className="glass-card p-4 rounded-xl">
                      <p className="text-white">{selectedOrder.shippingAddress}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <p className="text-sm text-dark-400 mb-2">Order Items</p>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item) => (
                        <div key={item.id} className="glass-card p-4 rounded-xl flex items-center justify-between">
                          <div>
                            <p className="text-white font-semibold">{item.productName}</p>
                            <p className="text-sm text-dark-400">
                              Qty: {item.quantity} × ${item.unitPrice.toFixed(2)}
                            </p>
                            {(item.selectedSize || item.selectedColor) && (
                              <div className="flex gap-2 mt-1">
                                {item.selectedSize && (
                                  <span className="text-xs px-2 py-1 bg-dark-800 rounded">
                                    {item.selectedSize}
                                  </span>
                                )}
                                {item.selectedColor && (
                                  <span className="text-xs px-2 py-1 bg-dark-800 rounded">
                                    {item.selectedColor}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          <p className="text-lg font-bold gradient-text">
                            ${item.totalPrice.toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tracking */}
                  {selectedOrder.trackingNumber && (
                    <div>
                      <p className="text-sm text-dark-400 mb-2">Tracking Number</p>
                      <div className="glass-card p-4 rounded-xl">
                        <p className="text-white font-mono">{selectedOrder.trackingNumber}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Update Status Modal */}
      <AnimatePresence>
        {updateStatusModal && selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setUpdateStatusModal(false)}
              className="backdrop-overlay"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card rounded-2xl p-6 max-w-md w-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Update Order Status</h2>
                  <button onClick={() => setUpdateStatusModal(false)}>
                    <FiX size={24} className="text-dark-400 hover:text-white" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-dark-300 mb-2 block">
                      Order Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="input-field"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-dark-300 mb-2 block">
                      Tracking Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Enter tracking number"
                      className="input-field"
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button onClick={handleUpdateStatus} className="flex-1 btn-primary">
                      Update Status
                    </button>
                    <button
                      onClick={() => setUpdateStatusModal(false)}
                      className="flex-1 btn-ghost"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminOrders;