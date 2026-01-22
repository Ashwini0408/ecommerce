// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiPackage, FiTruck, /* FiCheck, */ FiX, FiEye } from 'react-icons/fi';
// import { orderApi } from '../../api/orderApi';
// import type { Order } from '../../types';
// import { format } from 'date-fns';
// import toast from 'react-hot-toast';
// import { formatINR } from '../../utils/currency';

// const AdminOrders = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [filterStatus, setFilterStatus] = useState<string>('ALL');
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [updateStatusModal, setUpdateStatusModal] = useState(false);
//   const [newStatus, setNewStatus] = useState('');
//   const [trackingNumber, setTrackingNumber] = useState('');

//   useEffect(() => {
//     fetchOrders();
//   }, [filterStatus]);

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const response = await orderApi.getAllOrders(0, 50);
//       let filteredOrders = response.content;
      
//       if (filterStatus !== 'ALL') {
//         filteredOrders = filteredOrders.filter((order) => order.status === filterStatus);
//       }
      
//       setOrders(filteredOrders);
//     } catch (error: any) {
//       toast.error('Failed to fetch orders');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateStatus = async () => {
//     if (!selectedOrder || !newStatus) {
//       toast.error('Please select a status');
//       return;
//     }

//     try {
//       await orderApi.updateOrderStatus(selectedOrder.id, {
//         status: newStatus,
//         trackingNumber: trackingNumber || undefined,
//       });
//       toast.success('Order status updated successfully');
//       setUpdateStatusModal(false);
//       setSelectedOrder(null);
//       setNewStatus('');
//       setTrackingNumber('');
//       fetchOrders();
//     } catch (error: any) {
//       toast.error('Failed to update order status');
//     }
//   };

//   const getStatusColor = (status: string) => {
//     const colors: Record<string, string> = {
//       PENDING: 'bg-yellow-500/20 text-yellow-400',
//       PROCESSING: 'bg-blue-500/20 text-blue-400',
//       SHIPPED: 'bg-purple-500/20 text-purple-400',
//       DELIVERED: 'bg-green-500/20 text-green-400',
//       CANCELLED: 'bg-red-500/20 text-red-400',
//       RETURNED: 'bg-orange-500/20 text-orange-400',
//     };
//     return colors[status] || 'bg-dark-700 text-dark-300';
//   };

//   const statusOptions = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED'];
//   const filterOptions = ['ALL', ...statusOptions];

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h2 className="text-2xl font-bold text-dark-900">Order Management</h2>
//           <p className="text-dark-600 mt-1">{orders.length} orders</p>
//         </div>

//         {/* Filter */}
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="input-field w-full sm:w-auto"
//         >
//           {filterOptions.map((status) => (
//             <option key={status} value={status}>
//               {status === 'ALL' ? 'All Orders' : status}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Orders List */}
//       {loading ? (
//         <div className="space-y-4">
//           {[...Array(5)].map((_, i) => (
//             <div key={i} className="glass-card rounded-2xl h-32 shimmer" />
//           ))}
//         </div>
//       ) : orders.length === 0 ? (
//         <div className="glass-card rounded-2xl p-12 text-center ring-1 ring-[#8FAE8B]">
//           <FiPackage className="mx-auto text-dark-600 mb-4" size={48} />
//           <p className="text-dark-600">No orders found</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <motion.div
//               key={order.id}
//               whileHover={{ x: 4 }}
//               className="glass-card-hover rounded-2xl p-6 ring-1 ring-[#8FAE8B]"
//             >
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                 <div className="flex-1">
//                   <div className="flex flex-wrap items-center gap-2 mb-2">
//   <h3 className="text-lg font-semibold text-dark-900">
//     Order #{order.id}
//   </h3>

//   {/* Order Status */}
//   <span
//     className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(order.status)}`}
//   >
//     Order: {order.status}
//   </span>

//   {/* Payment Status */}
//   <span
//     className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(order.paymentStatus)}`}
//   >
//     Payment: {order.paymentStatus}
//   </span>
// </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-dark-600">
//                     <p>📅 {format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm')}</p>
//                     <p>💰 {formatINR(order.totalAmount)}</p>
//                     <p>📦 {order.items.length} items</p>
//                     {order.trackingNumber && <p>🚚 {order.trackingNumber}</p>}
//                   </div>

//                   {order.shippingAddress && (
//                     <p className="text-sm text-dark-600 mt-2 line-clamp-1">
//                       📍 {order.shippingAddress}
//                     </p>
//                   )}
//                 </div>

//                 {/* Actions */}
//                 <div className="flex items-center space-x-2">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => {
//                       setSelectedOrder(order);
//                       setShowDetailsModal(true);
//                     }}
//                     className="p-3 glass-card rounded-xl ring-1 ring-[#8FAE8B] hover:bg-primary-50 transition-colors"
//                     title="View Details"
//                   >
//                     <FiEye className="text-primary-400" />
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => {
//                       setSelectedOrder(order);
//                       setNewStatus(order.status);
//                       setTrackingNumber(order.trackingNumber || '');
//                       setUpdateStatusModal(true);
//                     }}
//                     className="p-3 glass-card rounded-xl ring-1 ring-[#8FAE8B] hover:bg-primary-50 transition-colors"
//                     title="Update Status"
//                   >
//                     <FiTruck className="text-green-400" />
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* Order Details Modal */}
//       <AnimatePresence>
//         {showDetailsModal && selectedOrder && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setShowDetailsModal(false)}
//               className="backdrop-overlay"
//             />
//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 className="glass-card rounded-2xl p-6 ring-1 ring-[#8FAE8B] max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-2xl font-bold text-dark-900">Order #{selectedOrder.id}</h2>
//                   <button onClick={() => setShowDetailsModal(false)}>
//                     <FiX size={24} className="text-dark-400 hover:text-dark-900" />
//                   </button>
//                 </div>

//                 <div className="space-y-6">
//                   {/* Order Info */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm text-dark-400 mb-1">Status</p>
//                       <span className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(selectedOrder.status)}`}>
//                         {selectedOrder.status}
//                       </span>
//                     </div>
//                     <div>
//                       <p className="text-sm text-dark-400 mb-1">Payment Status</p>
//                       <span className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(selectedOrder.paymentStatus)}`}>
//                         {selectedOrder.paymentStatus}
//                       </span>
//                     </div>
//                     <div>
//                       <p className="text-sm text-dark-400 mb-1">Order Date</p>
//                       <p className="text-dark-900 font-semibold">
//                         {format(new Date(selectedOrder.createdAt), 'MMM dd, yyyy HH:mm')}
//                       </p>
//                     </div>
//                     <div>
//   <p className="text-sm text-dark-400 mb-1">Total Amount</p>
//   <p className="text-dark-900 font-semibold">
//     {formatINR(selectedOrder.totalAmount)}
//   </p>
// </div>

//                   </div>

//                   {/* Shipping Address */}
//                   <div>
//                     <p className="text-sm text-dark-400 mb-2">Shipping Address</p>
//                     <div className="glass-card p-4 rounded-xl ring-1 ring-[#8FAE8B]">
//                       <p className="text-dark-900">{selectedOrder.shippingAddress}</p>
//                     </div>
//                   </div>

//                   {/* Order Items */}
//                   <div>
//                     <p className="text-sm text-dark-400 mb-2">Order Items</p>
//                     <div className="space-y-3">
//                       {selectedOrder.items.map((item) => (
//   <div
//     key={item.id}
//     className="glass-card p-4 rounded-xl flex gap-4 items-center"
//   >
//     {/* 🖼 Product Image */}
//     <div className="w-16 h-16 rounded-lg overflow-hidden ring-1 ring-[#8FAE8B] flex-shrink-0">
//       <img
//        src={(item as any)?.productImage || '/placeholder.jpg'}
//         alt={item.productName}
//         className="w-full h-full object-cover"
//       />
//     </div>

//     {/* 📦 Product Info */}
//     <div className="flex-1">
//       <p className="text-dark-900 font-semibold">
//         {item.productName}
//       </p>

//       <p className="text-sm text-dark-500">
//         Qty: {item.quantity} × {formatINR(item.unitPrice)}
//       </p>

//       {/* Size & Colour */}
//       {(item.selectedSize || item.selectedColor) && (
//         <div className="flex gap-2 mt-2">
//           {item.selectedSize && (
//             <span className="text-xs px-2 py-1 bg-dark-800 rounded">
//               Size: {item.selectedSize}
//             </span>
//           )}
//           {item.selectedColor && (
//             <span className="text-xs px-2 py-1 bg-dark-800 rounded">
//               Colour: {item.selectedColor}
//             </span>
//           )}
//         </div>
//       )}
//     </div>

//     {/* 💰 Price */}
//     <div className="text-right">
//       <p className="text-dark-900 font-semibold">
//         {formatINR(item.totalPrice)}
//       </p>
//     </div>
//   </div>
// ))}

//                     </div>
//                   </div>

//                   {/* Tracking */}
//                   {selectedOrder.trackingNumber && (
//                     <div>
//                       <p className="text-sm text-dark-400 mb-2">Tracking Number</p>
//                       <div className="glass-card p-4 rounded-xl ring-1 ring-[#8FAE8B]">
//                         <p className="text-dark-900 font-mono">{selectedOrder.trackingNumber}</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             </div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Update Status Modal */}
//       <AnimatePresence>
//         {updateStatusModal && selectedOrder && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setUpdateStatusModal(false)}
//               className="backdrop-overlay"
//             />
//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 className="glass-card rounded-2xl p-6 max-w-md w-full"
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-2xl font-bold text-dark-900">Update Order Status</h2>
//                   <button onClick={() => setUpdateStatusModal(false)}>
//                     <FiX size={24} className="text-dark-400 hover:text-dark-900" />
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="text-sm font-semibold text-dark-300 mb-2 block">
//                       Order Status
//                     </label>
//                     <select
//                       value={newStatus}
//                       onChange={(e) => setNewStatus(e.target.value)}
//                       className="input-field"
//                     >
//                       {statusOptions.map((status) => (
//                         <option key={status} value={status}>
//                           {status}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="text-sm font-semibold text-dark-300 mb-2 block">
//                       Tracking Number (Optional)
//                     </label>
//                     <input
//                       type="text"
//                       value={trackingNumber}
//                       onChange={(e) => setTrackingNumber(e.target.value)}
//                       placeholder="Enter tracking number"
//                       className="input-field"
//                     />
//                   </div>

//                   <div className="flex space-x-3 pt-4">
//                     <button onClick={handleUpdateStatus} className="flex-1 btn-primary">
//                       Update Status
//                     </button>
//                     <button
//                       onClick={() => setUpdateStatusModal(false)}
//                       className="flex-1 btn-ghost"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default AdminOrders;


// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiPackage, FiTruck, /* FiCheck, */ FiX, FiEye, FiLoader } from 'react-icons/fi';
// import { orderApi } from '../../api/orderApi';
// import type { Order } from '../../types';
// import { format } from 'date-fns';
// import toast from 'react-hot-toast';
// import { formatINR } from '../../utils/currency';

// // --- ADDED SERVER URL CONSTANT ---
// const SERVER_URL = import.meta.env.VITE_API_IMG_URL || 'http://192.168.1.111:8090';

// const Spinner = () => (
//   <div className="flex justify-center items-center p-12">
//     <FiLoader className="animate-spin text-primary-500" size={40} />
//   </div>
// );

// const AdminOrders = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [modalLoading, setModalLoading] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [filterStatus, setFilterStatus] = useState<string>('ALL');
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [updateStatusModal, setUpdateStatusModal] = useState(false);
//   const [newStatus, setNewStatus] = useState('');
//   const [trackingNumber, setTrackingNumber] = useState('');

//   // --- HELPER TO CONSTRUCT IMAGE URL ---
//   const getProductImageUrl = (imagePath: string | null) => {
//     if (!imagePath) return '/placeholder.jpg';
//     // If it's already a full URL (starts with http), return as is
//     if (imagePath.startsWith('http')) return imagePath;
//     // Otherwise prepend server URL
//     return `${SERVER_URL}${imagePath}`;
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [filterStatus]);

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const response = await orderApi.getAllOrders(0, 50);
//       let filteredOrders = response.content || response;
//       if (filterStatus !== 'ALL') {
//         filteredOrders = filteredOrders.filter((order: Order) => order.status === filterStatus);
//       }
//       setOrders(filteredOrders);
//     } catch (error: any) {
//       toast.error('Failed to fetch orders');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchOrderDetails = async (orderId: number) => {
//     setModalLoading(true);
//     setSelectedOrder(null);
//     setShowDetailsModal(true);
//     try {
//       const fullOrderData = await orderApi.getOrderById(orderId);
//       setSelectedOrder(fullOrderData);
//     } catch (error: any) {
//       toast.error('Failed to fetch order details');
//       setShowDetailsModal(false);
//     } finally {
//       setModalLoading(false);
//     }
//   };

//   const handleUpdateStatus = async () => {
//     if (!selectedOrder || !newStatus) {
//       toast.error('Please select a status');
//       return;
//     }
//     try {
//       await orderApi.updateOrderStatus(selectedOrder.id, {
//         status: newStatus,
//         trackingNumber: trackingNumber || undefined,
//       });
//       toast.success('Order status updated successfully');
//       setUpdateStatusModal(false);
//       fetchOrders();
//     } catch (error: any) {
//       toast.error('Failed to update order status');
//     }
//   };

//   const getStatusColor = (status: string) => {
//     const colors: Record<string, string> = {
//       PENDING: 'bg-yellow-500/20 text-yellow-400',
//       PROCESSING: 'bg-blue-500/20 text-blue-400',
//       SHIPPED: 'bg-purple-500/20 text-purple-400',
//       DELIVERED: 'bg-green-500/20 text-green-400',
//       CANCELLED: 'bg-red-500/20 text-red-400',
//       RETURNED: 'bg-orange-500/20 text-orange-400',
//     };
//     return colors[status] || 'bg-dark-700 text-dark-300';
//   };

//   const statusOptions = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED'];
//   const filterOptions = ['ALL', ...statusOptions];

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h2 className="text-2xl font-bold text-dark-900">Order Management</h2>
//           <p className="text-dark-600 mt-1">{orders.length} orders</p>
//         </div>
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="input-field w-full sm:w-auto"
//         >
//           {filterOptions.map((status) => (
//             <option key={status} value={status}>
//               {status === 'ALL' ? 'All Orders' : status}
//             </option>
//           ))}
//         </select>
//       </div>

//       {loading ? (
//         <div className="space-y-4">
//           {[...Array(5)].map((_, i) => (
//             <div key={i} className="glass-card rounded-2xl h-32 shimmer" />
//           ))}
//         </div>
//       ) : orders.length === 0 ? (
//         <div className="glass-card rounded-2xl p-12 text-center ring-1 ring-[#8FAE8B]">
//           <FiPackage className="mx-auto text-dark-600 mb-4" size={48} />
//           <p className="text-dark-600">No orders found</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <motion.div
//               key={order.id}
//               whileHover={{ x: 4 }}
//               className="glass-card-hover rounded-2xl p-6 ring-1 ring-[#8FAE8B]"
//             >
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                 <div className="flex-1">
//                   <div className="flex flex-wrap items-center gap-2 mb-2">
//                     <h3 className="text-lg font-semibold text-dark-900">Order #{order.id}</h3>
//                     <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(order.status)}`}>
//                       {order.status}
//                     </span>
//                     <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(order.paymentStatus)}`}>
//                        {order.paymentStatus}
//                     </span>
//                   </div>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-dark-600">
//                     <p>📅 {format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm')}</p>
//                     <p>💰 {formatINR(order.totalAmount)}</p>
//                     <p>📦 {order.items.length} items</p>
//                     {order.trackingNumber && <p>🚚 {order.trackingNumber}</p>}
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => fetchOrderDetails(order.id)}
//                     className="p-3 glass-card rounded-xl ring-1 ring-[#8FAE8B] hover:bg-primary-50 transition-colors"
//                   >
//                     <FiEye className="text-primary-400" />
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => {
//                       setSelectedOrder(order);
//                       setNewStatus(order.status);
//                       setTrackingNumber(order.trackingNumber || '');
//                       setUpdateStatusModal(true);
//                     }}
//                     className="p-3 glass-card rounded-xl ring-1 ring-[#8FAE8B] hover:bg-primary-50 transition-colors"
//                   >
//                     <FiTruck className="text-green-400" />
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* Order Details Modal */}
//       <AnimatePresence>
//         {showDetailsModal && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setShowDetailsModal(false)}
//               className="backdrop-overlay"
//             />
//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 className="glass-card rounded-2xl p-6 ring-1 ring-[#8FAE8B] max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-2xl font-bold text-dark-900">Order #{selectedOrder?.id || '...'}</h2>
//                   <button onClick={() => setShowDetailsModal(false)}>
//                     <FiX size={24} className="text-dark-400 hover:text-dark-900" />
//                   </button>
//                 </div>

//                 {modalLoading || !selectedOrder ? (
//                   <Spinner />
//                 ) : (
//                   <div className="space-y-6">
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4 glass-card p-4 rounded-xl bg-dark-50/50">
//                       <div>
//                         <p className="text-sm text-dark-400 mb-1">Status</p>
//                         <span className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(selectedOrder.status)}`}>
//                           {selectedOrder.status}
//                         </span>
//                       </div>
//                       <div>
//                         <p className="text-sm text-dark-400 mb-1">Payment</p>
//                         <span className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(selectedOrder.paymentStatus)}`}>
//                           {selectedOrder.paymentStatus}
//                         </span>
//                       </div>
//                       <div>
//                         <p className="text-sm text-dark-400 mb-1">User ID</p>
//                         <p className="text-dark-900 font-semibold">{selectedOrder.userId}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-dark-400 mb-1">Created At</p>
//                         <p className="text-dark-900 font-semibold">{format(new Date(selectedOrder.createdAt), 'MMM dd, yyyy HH:mm')}</p>
//                       </div>
//                       {selectedOrder.updatedAt && (
//                         <div>
//                             <p className="text-sm text-dark-400 mb-1">Last Updated</p>
//                             <p className="text-dark-900 font-semibold">{format(new Date(selectedOrder.updatedAt), 'MMM dd, yyyy HH:mm')}</p>
//                         </div>
//                       )}
//                       <div>
//                         <p className="text-sm text-dark-400 mb-1">Tracking Info</p>
//                         <p className="text-dark-900 font-semibold font-mono">{selectedOrder.trackingNumber || 'N/A'}</p>
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-md font-semibold text-dark-900 mb-2">Shipping Details</h3>
//                       <div className="glass-card p-4 rounded-xl ring-1 ring-[#8FAE8B] bg-dark-50/50">
//                         <p className="text-dark-900 whitespace-pre-wrap">{selectedOrder.shippingAddress}</p>
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-md font-semibold text-dark-900 mb-3">Order Items</h3>
//                       <div className="space-y-3 mb-4">
//                         {selectedOrder.items.map((item) => (
//                           <div key={item.id} className="glass-card p-3 rounded-xl flex gap-4 items-center bg-white/50">
//                             <div className="w-14 h-14 rounded-lg overflow-hidden ring-1 ring-[#8FAE8B]/50 flex-shrink-0 bg-gray-100">
//                               {/* --- UPDATED IMAGE SRC LOGIC --- */}
//                               <img
//                                 src={getProductImageUrl((item as any)?.productImage)}
//                                 alt={(item as any)?.productName || 'Product'}
//                                 className="w-full h-full object-cover"
//                                 onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.jpg' }}
//                               />
//                             </div>
//                             <div className="flex-1">
//                               <p className="text-dark-900 font-medium line-clamp-1">{(item as any)?.productName || `Item #${item.id}`}</p>
//                               <div className="flex gap-2 mt-1 text-xs text-dark-500">
//                                 <span>Qty: {item.quantity}</span>
//                                 {(item as any)?.selectedSize && <span>• Size: {(item as any).selectedSize}</span>}
//                                 {(item as any)?.selectedColor && <span>• Color: {(item as any).selectedColor}</span>}
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-dark-900 font-medium">{formatINR(item.totalPrice)}</p>
//                               <p className="text-xs text-dark-500">({formatINR(item.unitPrice)} ea)</p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       <div className="glass-card p-4 rounded-xl ring-1 ring-[#8FAE8B] bg-primary-50/30 ml-auto max-w-xs">
//                         <div className="space-y-2 text-sm">
//                           <div className="flex justify-between text-dark-600">
//                             <span>Subtotal (Approx):</span>
//                             <span>{formatINR(Number(selectedOrder.totalAmount) - Number(selectedOrder.tax || 0) + Number(selectedOrder.discount || 0))}</span>
//                           </div>
//                           {Number(selectedOrder.discount || 0) > 0 && (
//                             <div className="flex justify-between text-green-600">
//                               <span>Discount:</span>
//                               <span>- {formatINR(selectedOrder.discount || 0)}</span>
//                             </div>
//                           )}
//                           <div className="flex justify-between text-dark-600">
//                             <span>Tax:</span>
//                             <span>{formatINR(selectedOrder.tax || 0)}</span>
//                           </div>
//                           <div className="border-t border-[#8FAE8B]/30 pt-2 mt-2 flex justify-between text-base font-bold text-dark-900">
//                             <span>Total Amount:</span>
//                             <span>{formatINR(selectedOrder.totalAmount)}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </motion.div>
//             </div>
//           </>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {updateStatusModal && selectedOrder && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//               onClick={() => setUpdateStatusModal(false)} className="backdrop-overlay"
//             />
//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
//                 className="glass-card rounded-2xl p-6 max-w-md w-full"
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-2xl font-bold text-dark-900">Update Order Status</h2>
//                   <button onClick={() => setUpdateStatusModal(false)}>
//                     <FiX size={24} className="text-dark-400 hover:text-dark-900" />
//                   </button>
//                 </div>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="text-sm font-semibold text-dark-300 mb-2 block">Order Status</label>
//                     <select
//                       value={newStatus} onChange={(e) => setNewStatus(e.target.value)}
//                       className="input-field"
//                     >
//                       {statusOptions.map((status) => (
//                         <option key={status} value={status}>{status}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="text-sm font-semibold text-dark-300 mb-2 block">Tracking Number (Optional)</label>
//                     <input
//                       type="text" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)}
//                       placeholder="Enter tracking number" className="input-field"
//                     />
//                   </div>
//                   <div className="flex space-x-3 pt-4">
//                     <button onClick={handleUpdateStatus} className="flex-1 btn-primary">Update Status</button>
//                     <button onClick={() => setUpdateStatusModal(false)} className="flex-1 btn-ghost">Cancel</button>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default AdminOrders;



// import { useState, useEffect, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiEye, FiEdit2, FiTrash2, FiX, FiSearch, FiPackage, FiTruck, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiLoader } from 'react-icons/fi';
// import { orderApi } from '../../api/orderApi';
// import type { Order } from '../../types';
// import { format } from 'date-fns';
// import toast from 'react-hot-toast';
// import { formatINR } from '../../utils/currency';

// const SERVER_URL = import.meta.env.VITE_API_IMG_URL || 'http://192.168.1.111:8090';

// const Spinner = () => (
//   <div className="flex justify-center items-center p-12">
//     <FiLoader className="animate-spin text-sage" size={40} />
//   </div>
// );

// const AdminOrders = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [modalLoading, setModalLoading] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
//   // Modal states
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [updateStatusModal, setUpdateStatusModal] = useState(false);
//   const [newStatus, setNewStatus] = useState('');
//   const [trackingNumber, setTrackingNumber] = useState('');

//   // Column filters
//   const [columnFilters, setColumnFilters] = useState({
//     product: '',
//     orderId: '',
//     orderStatus: '',
//     paymentStatus: '',
//     status: ''
//   });

//   // Pagination
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalOrders, setTotalOrders] = useState(0);

//   const getProductImageUrl = (imagePath: string | null) => {
//     if (!imagePath) return '/placeholder.jpg';
//     if (imagePath.startsWith('http')) return imagePath;
//     return `${SERVER_URL}${imagePath}`;
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [page, rowsPerPage]);

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const offset = (page - 1) * rowsPerPage;
//       const response = await orderApi.getAllOrders(offset, rowsPerPage);
      
//       let filteredOrders = response.content || response;
//       setTotalOrders(response.totalElements || filteredOrders.length);
      
//       // Apply column filters
//       if (columnFilters.product) {
//         filteredOrders = filteredOrders.filter((order: Order) =>
//           order.items.some(item => 
//             (item as any)?.productName?.toLowerCase().includes(columnFilters.product.toLowerCase())
//           )
//         );
//       }
      
//       if (columnFilters.orderId) {
//         filteredOrders = filteredOrders.filter((order: Order) =>
//           order.id.toString().includes(columnFilters.orderId)
//         );
//       }
      
//       if (columnFilters.orderStatus && columnFilters.orderStatus !== 'ALL') {
//         filteredOrders = filteredOrders.filter((order: Order) =>
//           order.status === columnFilters.orderStatus
//         );
//       }
      
//       if (columnFilters.paymentStatus && columnFilters.paymentStatus !== 'ALL') {
//         filteredOrders = filteredOrders.filter((order: Order) =>
//           order.paymentStatus === columnFilters.paymentStatus
//         );
//       }
      
//       setOrders(filteredOrders);
//     } catch (error: any) {
//       toast.error('Failed to fetch orders');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleColumnFilterChange = (column: string, value: string) => {
//     setColumnFilters(prev => ({
//       ...prev,
//       [column]: value
//     }));
//     setPage(1);
//   };

//   // Apply filters when they change
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       fetchOrders();
//     }, 300); // Debounce for 300ms

//     return () => clearTimeout(timeoutId);
//   }, [columnFilters]);

//   const fetchOrderDetails = async (orderId: number) => {
//     setModalLoading(true);
//     setSelectedOrder(null);
//     setShowDetailsModal(true);
//     try {
//       const fullOrderData = await orderApi.getOrderById(orderId);
//       setSelectedOrder(fullOrderData);
//     } catch (error: any) {
//       toast.error('Failed to fetch order details');
//       setShowDetailsModal(false);
//     } finally {
//       setModalLoading(false);
//     }
//   };

//   const handleUpdateStatus = async () => {
//     if (!selectedOrder || !newStatus) {
//       toast.error('Please select a status');
//       return;
//     }
//     try {
//       await orderApi.updateOrderStatus(selectedOrder.id, {
//         status: newStatus,
//         trackingNumber: trackingNumber || undefined,
//       });
//       toast.success('Order status updated successfully');
//       setUpdateStatusModal(false);
//       fetchOrders();
//     } catch (error: any) {
//       toast.error('Failed to update order status');
//     }
//   };

//   // const handleDeleteOrder = async (orderId: number) => {
//   //   if (window.confirm('Are you sure you want to delete this order?')) {
//   //     try {
//   //       await orderApi.deleteOrder(orderId);
//   //       toast.success('Order deleted successfully');
//   //       fetchOrders();
//   //     } catch (error: any) {
//   //       toast.error('Failed to delete order');
//   //     }
//   //   }
//   // };

//   const getStatusColor = (status: string) => {
//     const colors: Record<string, string> = {
//       PENDING: 'text-yellow-700 bg-yellow-100',
//       PROCESSING: 'text-blue-700 bg-blue-100',
//       SHIPPED: 'text-purple-700 bg-purple-100',
//       DELIVERED: 'text-green-700 bg-green-100',
//       CANCELLED: 'text-red-700 bg-red-100',
//       RETURNED: 'text-orange-700 bg-orange-100',
//     };
//     return colors[status] || 'text-gray-700 bg-gray-100';
//   };

//   const getPaymentColor = (status: string) => {
//     const colors: Record<string, string> = {
//       PAID: 'text-green-700 bg-green-100',
//       PENDING: 'text-yellow-700 bg-yellow-100',
//       FAILED: 'text-red-700 bg-red-100',
//       REFUNDED: 'text-blue-700 bg-blue-100',
//     };
//     return colors[status] || 'text-gray-700 bg-gray-100';
//   };

//   const statusOptions = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED'];
//   const paymentOptions = ['PAID', 'PENDING', 'FAILED', 'REFUNDED'];

//   const totalPages = Math.ceil(totalOrders / rowsPerPage);

//   const rowsPerPageOptions = [5, 10, 20, 50, 100];

//   return (
//     <div className="space-y-6">
//       {/* --- HEADER --- */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h2 className="text-2xl font-bold text-dark-900">Order Management</h2>
//           <p className="text-dark-600 mt-1">{totalOrders} orders total</p>
//         </div>
        
//         {/* Export Button */}
//         <div className="flex space-x-3">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-4 py-2 rounded-xl flex items-center space-x-2 glass-card text-dark-800 ring-1 ring-[#8FAE8B] hover:bg-primary-50"
//           >
//             Export all orders
//           </motion.button>
//         </div>
//       </div>

//       {/* --- TABLE WITH COLUMN FILTERS --- */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="min-w-full divide-y divide-dark-200">
//           <thead className="bg-dark-50">
//             <tr>
//               {/* PRODUCT Column with filter */}
//               <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
//                 <div className="flex flex-col">
//                   <span>PRODUCT</span>
//                   <input
//                     type="text"
//                     placeholder="Search Product"
//                     className="mt-1 px-2 py-1 text-xs border border-dark-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 bg-white"
//                     value={columnFilters.product}
//                     onChange={(e) => handleColumnFilterChange('product', e.target.value)}
//                   />
//                 </div>
//               </th>
              
//               {/* ORDER ID Column with filter */}
//               <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
//                 <div className="flex flex-col">
//                   <span>ORDER ID</span>
//                   <input
//                     type="text"
//                     placeholder="Search Order ID"
//                     className="mt-1 px-2 py-1 text-xs border border-dark-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 bg-white"
//                     value={columnFilters.orderId}
//                     onChange={(e) => handleColumnFilterChange('orderId', e.target.value)}
//                   />
//                 </div>
//               </th>
              
//               {/* ORDER STATUS Column with filter */}
//               <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
//                 <div className="flex flex-col">
//                   <span>ORDER STATUS</span>
//                   <select
//                     className="mt-1 px-2 py-1 text-xs border border-dark-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 bg-white"
//                     value={columnFilters.orderStatus}
//                     onChange={(e) => handleColumnFilterChange('orderStatus', e.target.value)}
//                   >
//                     <option value="">All</option>
//                     {statusOptions.map(status => (
//                       <option key={status} value={status}>{status}</option>
//                     ))}
//                   </select>
//                 </div>
//               </th>
              
//               {/* PAYMENT STATUS Column with filter */}
//               <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
//                 <div className="flex flex-col">
//                   <span>PAYMENT STATUS</span>
//                   <select
//                     className="mt-1 px-2 py-1 text-xs border border-dark-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 bg-white"
//                     value={columnFilters.paymentStatus}
//                     onChange={(e) => handleColumnFilterChange('paymentStatus', e.target.value)}
//                   >
//                     <option value="">All</option>
//                     {paymentOptions.map(status => (
//                       <option key={status} value={status}>{status}</option>
//                     ))}
//                   </select>
//                 </div>
//               </th>
              
//               {/* ACTIONS Column */}
//               <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
//                 ACTIONS
//               </th>
//             </tr>
//           </thead>
          
//           <tbody className="bg-white divide-y divide-dark-200">
//             {loading ? (
//               <tr>
//                 <td colSpan={5} className="px-6 py-12 text-center text-dark-500">
//                   Loading orders...
//                 </td>
//               </tr>
//             ) : orders.length === 0 ? (
//               <tr>
//                 <td colSpan={5} className="px-6 py-12 text-center text-dark-500">
//                   <FiPackage className="mx-auto text-gray-400 mb-2" size={32} />
//                   No orders found
//                 </td>
//               </tr>
//             ) : (
//               orders.map((order) => (
//                 <tr key={order.id} className="hover:bg-dark-50">
//                   {/* PRODUCT Column */}
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       {order.items[0] && (
//                         <div className="h-10 w-10 flex-shrink-0 mr-3">
//                           <img
//                             src={getProductImageUrl((order.items[0] as any)?.productImage)}
//                             alt={(order.items[0] as any)?.productName || 'Product'}
//                             className="h-10 w-10 rounded object-cover"
//                           />
//                         </div>
//                       )}
//                       <div>
//                         <div className="text-sm font-medium text-dark-900">
//                           {(order.items[0] as any)?.productName || `Order #${order.id}`}
//                         </div>
//                         <div className="text-xs text-dark-500">
//                           Qty: {order.items.reduce((sum, item) => sum + item.quantity, 0)} • {formatINR(order.totalAmount)}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
                  
//                   {/* ORDER ID Column */}
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-dark-900">#{order.id}</div>
//                     <div className="text-xs text-dark-500">
//                       User ID: {order.userId}
//                     </div>
//                     <div className="text-xs text-dark-500">
//                       {format(new Date(order.createdAt), 'MMM dd, yyyy')}
//                     </div>
//                   </td>
                  
//                   {/* ORDER STATUS Column */}
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                       {order.status}
//                     </span>
//                     {order.trackingNumber && (
//                       <div className="text-xs text-dark-500 mt-1">
//                         Tracking: {order.trackingNumber}
//                       </div>
//                     )}
//                   </td>
                  
//                   {/* PAYMENT STATUS Column */}
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentColor(order.paymentStatus)}`}>
//                       {order.paymentStatus}
//                     </span>
//                   </td>
                  
//                   {/* ACTIONS Column - Icons only */}
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className="flex space-x-1">
//                       <button
//                         onClick={() => fetchOrderDetails(order.id)}
//                         className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded"
//                         title="View Details"
//                       >
//                         <FiEye size={16} />
//                       </button>
//                       <button
//                         onClick={() => {
//                           setSelectedOrder(order);
//                           setNewStatus(order.status);
//                           setTrackingNumber(order.trackingNumber || '');
//                           setUpdateStatusModal(true);
//                         }}
//                         className="p-1 text-primary-600 hover:text-primary-900 hover:bg-primary-50 rounded"
//                         title="Update Status"
//                       >
//                         <FiEdit2 size={16} />
//                       </button>
//                       {/* <button
//                         onClick={() => handleDeleteOrder(order.id)}
//                         className="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded"
//                         title="Delete"
//                       >
//                         <FiTrash2 size={16} />
//                       </button> */}
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* --- PAGINATION & ROWS PER PAGE --- */}
//       <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-white border-t border-dark-200 sm:px-6">
//         <div className="flex items-center space-x-4 mb-4 sm:mb-0">
//           <div className="flex items-center space-x-2">
//             <span className="text-sm text-dark-700">Rows per page:</span>
//             <select
//               className="text-sm border border-dark-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
//               value={rowsPerPage}
//               onChange={(e) => {
//                 setRowsPerPage(Number(e.target.value));
//                 setPage(1);
//               }}
//             >
//               {rowsPerPageOptions.map(option => (
//                 <option key={option} value={option}>{option}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <p className="text-sm text-dark-700">
//               Showing <span className="font-medium">{(page - 1) * rowsPerPage + 1}</span> to{' '}
//               <span className="font-medium">{Math.min(page * rowsPerPage, totalOrders)}</span>{' '}
//               of <span className="font-medium">{totalOrders}</span> results
//             </p>
//           </div>
//         </div>
        
//         <div>
//           <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//             <button
//               onClick={() => setPage(prev => Math.max(1, prev - 1))}
//               disabled={page === 1}
//               className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-dark-300 bg-white text-sm font-medium text-dark-500 hover:bg-dark-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Previous
//             </button>
//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setPage(i + 1)}
//                 className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                   page === i + 1
//                     ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
//                     : 'bg-white border-dark-300 text-dark-500 hover:bg-dark-50'
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button
//               onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
//               disabled={page === totalPages}
//               className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-dark-300 bg-white text-sm font-medium text-dark-500 hover:bg-dark-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Next
//             </button>
//           </nav>
//         </div>
//       </div>

//       {/* --- ORDER DETAILS MODAL --- */}
//       <AnimatePresence>
//         {showDetailsModal && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setShowDetailsModal(false)}
//               className="backdrop-overlay"
//             />
//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 className="glass-card rounded-2xl p-6 ring-1 ring-[#8FAE8B] max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-2xl font-bold text-dark-900">Order #{selectedOrder?.id || '...'}</h2>
//                   <button onClick={() => setShowDetailsModal(false)}>
//                     <FiX size={24} className="text-dark-400 hover:text-dark-900" />
//                   </button>
//                 </div>

//                 {modalLoading || !selectedOrder ? (
//                   <Spinner />
//                 ) : (
//                   <div className="space-y-6">
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4 glass-card p-4 rounded-xl bg-dark-50/50">
//                       <div>
//                         <p className="text-sm text-dark-400 mb-1">Status</p>
//                         <span className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(selectedOrder.status)}`}>
//                           {selectedOrder.status}
//                         </span>
//                       </div>
//                       <div>
//                         <p className="text-sm text-dark-400 mb-1">Payment</p>
//                         <span className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${getPaymentColor(selectedOrder.paymentStatus)}`}>
//                           {selectedOrder.paymentStatus}
//                         </span>
//                       </div>
//                       <div>
//                         <p className="text-sm text-dark-400 mb-1">User ID</p>
//                         <p className="text-dark-900 font-semibold">{selectedOrder.userId}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-dark-400 mb-1">Created At</p>
//                         <p className="text-dark-900 font-semibold">{format(new Date(selectedOrder.createdAt), 'MMM dd, yyyy HH:mm')}</p>
//                       </div>
//                       {selectedOrder.updatedAt && (
//                         <div>
//                             <p className="text-sm text-dark-400 mb-1">Last Updated</p>
//                             <p className="text-dark-900 font-semibold">{format(new Date(selectedOrder.updatedAt), 'MMM dd, yyyy HH:mm')}</p>
//                         </div>
//                       )}
//                       <div>
//                         <p className="text-sm text-dark-400 mb-1">Tracking Info</p>
//                         <p className="text-dark-900 font-semibold font-mono">{selectedOrder.trackingNumber || 'N/A'}</p>
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-md font-semibold text-dark-900 mb-2">Shipping Details</h3>
//                       <div className="glass-card p-4 rounded-xl ring-1 ring-[#8FAE8B] bg-dark-50/50">
//                         <p className="text-dark-900 whitespace-pre-wrap">{selectedOrder.shippingAddress}</p>
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-md font-semibold text-dark-900 mb-3">Order Items</h3>
//                       <div className="space-y-3 mb-4">
//                         {selectedOrder.items.map((item) => (
//                           <div key={item.id} className="glass-card p-3 rounded-xl flex gap-4 items-center bg-white/50">
//                             <div className="w-14 h-14 rounded-lg overflow-hidden ring-1 ring-[#8FAE8B]/50 flex-shrink-0 bg-gray-100">
//                               <img
//                                 src={getProductImageUrl((item as any)?.productImage)}
//                                 alt={(item as any)?.productName || 'Product'}
//                                 className="w-full h-full object-cover"
//                               />
//                             </div>
//                             <div className="flex-1">
//                               <p className="text-dark-900 font-medium line-clamp-1">{(item as any)?.productName || `Item #${item.id}`}</p>
//                               <div className="flex gap-2 mt-1 text-xs text-dark-500">
//                                 <span>Qty: {item.quantity}</span>
//                                 {(item as any)?.selectedSize && <span>• Size: {(item as any).selectedSize}</span>}
//                                 {(item as any)?.selectedColor && <span>• Color: {(item as any).selectedColor}</span>}
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-dark-900 font-medium">{formatINR(item.totalPrice)}</p>
//                               <p className="text-xs text-dark-500">({formatINR(item.unitPrice)} ea)</p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       <div className="glass-card p-4 rounded-xl ring-1 ring-[#8FAE8B] bg-primary-50/30 ml-auto max-w-xs">
//                         <div className="space-y-2 text-sm">
//                           <div className="flex justify-between text-dark-600">
//                             <span>Subtotal (Approx):</span>
//                             <span>{formatINR(Number(selectedOrder.totalAmount) - Number(selectedOrder.tax || 0) + Number(selectedOrder.discount || 0))}</span>
//                           </div>
//                           {Number(selectedOrder.discount || 0) > 0 && (
//                             <div className="flex justify-between text-green-600">
//                               <span>Discount:</span>
//                               <span>- {formatINR(selectedOrder.discount || 0)}</span>
//                             </div>
//                           )}
//                           <div className="flex justify-between text-dark-600">
//                             <span>Tax:</span>
//                             <span>{formatINR(selectedOrder.tax || 0)}</span>
//                           </div>
//                           <div className="border-t border-[#8FAE8B]/30 pt-2 mt-2 flex justify-between text-base font-bold text-dark-900">
//                             <span>Total Amount:</span>
//                             <span>{formatINR(selectedOrder.totalAmount)}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </motion.div>
//             </div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* --- UPDATE STATUS MODAL --- */}
//       <AnimatePresence>
//         {updateStatusModal && selectedOrder && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setUpdateStatusModal(false)}
//               className="backdrop-overlay"
//             />
//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 className="glass-card rounded-2xl p-6 max-w-md w-full"
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-2xl font-bold text-dark-900">Update Order Status</h2>
//                   <button onClick={() => setUpdateStatusModal(false)}>
//                     <FiX size={24} className="text-dark-400 hover:text-dark-900" />
//                   </button>
//                 </div>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="text-sm font-semibold text-dark-300 mb-2 block">Order Status</label>
//                     <select
//                       value={newStatus}
//                       onChange={(e) => setNewStatus(e.target.value)}
//                       className="input-field"
//                     >
//                       {statusOptions.map((status) => (
//                         <option key={status} value={status}>{status}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="text-sm font-semibold text-dark-300 mb-2 block">Tracking Number (Optional)</label>
//                     <input
//                       type="text"
//                       value={trackingNumber}
//                       onChange={(e) => setTrackingNumber(e.target.value)}
//                       placeholder="Enter tracking number"
//                       className="input-field"
//                     />
//                   </div>
//                   <div className="flex space-x-3 pt-4">
//                     <button onClick={handleUpdateStatus} className="flex-1 btn-primary">Update Status</button>
//                     <button onClick={() => setUpdateStatusModal(false)} className="flex-1 btn-ghost">Cancel</button>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </>
//         )}
//       </AnimatePresence>

//       <style>{`
//         .backdrop-overlay {
//           @apply fixed inset-0 bg-black/50 z-40;
//         }
//         .glass-card {
//           @apply bg-white/95 backdrop-blur-sm;
//         }
//         .input-field {
//           @apply w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors;
//         }
//         .btn-primary {
//           @apply px-6 py-2 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors;
//         }
//         .btn-ghost {
//           @apply px-6 py-2 bg-dark-800 text-dark-300 font-semibold rounded-lg hover:bg-dark-700 transition-colors;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AdminOrders;


import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiEdit2, FiTrash2, FiX, FiSearch, FiPackage, FiTruck, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiLoader, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { orderApi } from '../../api/orderApi';
import type { Order } from '../../types';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { formatINR } from '../../utils/currency';

const SERVER_URL = import.meta.env.VITE_API_IMG_URL || 'http://192.168.1.111:8090';

const Spinner = () => (
  <div className="flex justify-center items-center p-12">
    <FiLoader className="animate-spin text-sage" size={40} />
  </div>
);

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [updateStatusModal, setUpdateStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  // Column filters
  const [columnFilters, setColumnFilters] = useState({
    product: '',
    orderId: '',
    orderStatus: '',
    paymentStatus: '',
    status: ''
  });

  // Pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalOrders, setTotalOrders] = useState(0);

  const getProductImageUrl = (imagePath: string | null) => {
    if (!imagePath) return '/placeholder.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return `${SERVER_URL}${imagePath}`;
  };

  useEffect(() => {
    fetchOrders();
  }, [page, rowsPerPage]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * rowsPerPage;
      const response = await orderApi.getAllOrders(offset, rowsPerPage);
      
      let filteredOrders = response.content || response;
      setTotalOrders(response.totalElements || filteredOrders.length);
      
      // Apply column filters
      if (columnFilters.product) {
        filteredOrders = filteredOrders.filter((order: Order) =>
          order.items.some(item => 
            (item as any)?.productName?.toLowerCase().includes(columnFilters.product.toLowerCase())
          )
        );
      }
      
      if (columnFilters.orderId) {
        filteredOrders = filteredOrders.filter((order: Order) =>
          order.id.toString().includes(columnFilters.orderId)
        );
      }
      
      if (columnFilters.orderStatus && columnFilters.orderStatus !== 'ALL') {
        filteredOrders = filteredOrders.filter((order: Order) =>
          order.status === columnFilters.orderStatus
        );
      }
      
      if (columnFilters.paymentStatus && columnFilters.paymentStatus !== 'ALL') {
        filteredOrders = filteredOrders.filter((order: Order) =>
          order.paymentStatus === columnFilters.paymentStatus
        );
      }
      
      setOrders(filteredOrders);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Failed to fetch orders';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleColumnFilterChange = (column: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value
    }));
    setPage(1);
  };

  // Apply filters when they change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchOrders();
    }, 300); // Debounce for 300ms

    return () => clearTimeout(timeoutId);
  }, [columnFilters]);

  const fetchOrderDetails = async (orderId: number) => {
    setModalLoading(true);
    setSelectedOrder(null);
    setShowDetailsModal(true);
    try {
      const fullOrderData = await orderApi.getOrderById(orderId);
      setSelectedOrder(fullOrderData);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Failed to fetch order details';
      toast.error(errorMessage);
      setShowDetailsModal(false);
    } finally {
      setModalLoading(false);
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
      fetchOrders();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Failed to update order status';
      toast.error(errorMessage);
    }
  };

  // const handleDeleteOrder = async (orderId: number) => {
  //   if (window.confirm('Are you sure you want to delete this order?')) {
  //     try {
  //       await orderApi.deleteOrder(orderId);
  //       toast.success('Order deleted successfully');
  //       fetchOrders();
  //     } catch (error: any) {
  //       const errorMessage = error.response?.data?.message || 
  //                           error.response?.data?.error || 
  //                           error.message || 
  //                           'Failed to delete order';
  //       toast.error(errorMessage);
  //     }
  //   }
  // };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'text-yellow-700 bg-yellow-100',
      PROCESSING: 'text-blue-700 bg-blue-100',
      SHIPPED: 'text-purple-700 bg-purple-100',
      DELIVERED: 'text-green-700 bg-green-100',
      CANCELLED: 'text-red-700 bg-red-100',
      RETURNED: 'text-orange-700 bg-orange-100',
    };
    return colors[status] || 'text-gray-700 bg-gray-100';
  };

  const getPaymentColor = (status: string) => {
    const colors: Record<string, string> = {
      PAID: 'text-green-700 bg-green-100',
      PENDING: 'text-yellow-700 bg-yellow-100',
      FAILED: 'text-red-700 bg-red-100',
      REFUNDED: 'text-blue-700 bg-blue-100',
    };
    return colors[status] || 'text-gray-700 bg-gray-100';
  };

  const statusOptions = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED'];
  const paymentOptions = ['PAID', 'PENDING', 'FAILED', 'REFUNDED'];

  const totalPages = Math.ceil(totalOrders / rowsPerPage);

  const rowsPerPageOptions = [5, 10, 20, 50, 100];

  return (
    <div className="space-y-6">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-dark-900">Order Management</h2>
          <p className="text-dark-600 mt-1">{totalOrders} orders total</p>
        </div>
        
        {/* Export Button */}
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-xl flex items-center space-x-2 glass-card text-dark-800 ring-1 ring-[#8FAE8B] hover:bg-primary-50"
          >
            Export all orders
          </motion.button>
        </div>
      </div>

      {/* --- TABLE WITH COLUMN FILTERS --- */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-dark-200">
          <thead className="bg-dark-50">
            <tr>
              {/* PRODUCT Column with filter */}
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                <div className="flex flex-col">
                  <span>PRODUCT</span>
                  <input
                    type="text"
                    placeholder="Search Product"
                    className="mt-1 px-2 py-1 text-xs border border-dark-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 bg-white"
                    value={columnFilters.product}
                    onChange={(e) => handleColumnFilterChange('product', e.target.value)}
                  />
                </div>
              </th>
              
              {/* ORDER ID Column with filter */}
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                <div className="flex flex-col">
                  <span>ORDER ID</span>
                  <input
                    type="text"
                    placeholder="Search Order ID"
                    className="mt-1 px-2 py-1 text-xs border border-dark-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 bg-white"
                    value={columnFilters.orderId}
                    onChange={(e) => handleColumnFilterChange('orderId', e.target.value)}
                  />
                </div>
              </th>
              
              {/* ORDER STATUS Column with filter */}
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                <div className="flex flex-col">
                  <span>ORDER STATUS</span>
                  <select
                    className="mt-1 px-2 py-1 text-xs border border-dark-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 bg-white"
                    value={columnFilters.orderStatus}
                    onChange={(e) => handleColumnFilterChange('orderStatus', e.target.value)}
                  >
                    <option value="">All</option>
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </th>
              
              {/* PAYMENT STATUS Column with filter */}
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                <div className="flex flex-col">
                  <span>PAYMENT STATUS</span>
                  <select
                    className="mt-1 px-2 py-1 text-xs border border-dark-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 bg-white"
                    value={columnFilters.paymentStatus}
                    onChange={(e) => handleColumnFilterChange('paymentStatus', e.target.value)}
                  >
                    <option value="">All</option>
                    {paymentOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </th>
              
              {/* ACTIONS Column */}
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-dark-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-dark-500">
                  Loading orders...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-dark-500">
                  <FiPackage className="mx-auto text-gray-400 mb-2" size={32} />
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-dark-50">
                  {/* PRODUCT Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {order.items[0] && (
                        <div className="h-10 w-10 flex-shrink-0 mr-3">
                          <img
                            src={getProductImageUrl((order.items[0] as any)?.productImage)}
                            alt={(order.items[0] as any)?.productName || 'Product'}
                            className="h-10 w-10 rounded object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-dark-900">
                          {(order.items[0] as any)?.productName || `Order #${order.id}`}
                        </div>
                        <div className="text-xs text-dark-500">
                          Qty: {order.items.reduce((sum, item) => sum + item.quantity, 0)} • {formatINR(order.totalAmount)}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* ORDER ID Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-dark-900">#{order.id}</div>
                    <div className="text-xs text-dark-500">
                      User ID: {order.userId}
                    </div>
                    <div className="text-xs text-dark-500">
                      {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                    </div>
                  </td>
                  
                  {/* ORDER STATUS Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    {order.trackingNumber && (
                      <div className="text-xs text-dark-500 mt-1">
                        Tracking: {order.trackingNumber}
                      </div>
                    )}
                  </td>
                  
                  {/* PAYMENT STATUS Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  
                  {/* ACTIONS Column - Icons only */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => fetchOrderDetails(order.id)}
                        className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <FiEye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setNewStatus(order.status);
                          setTrackingNumber(order.trackingNumber || '');
                          setUpdateStatusModal(true);
                        }}
                        className="p-1 text-primary-600 hover:text-primary-900 hover:bg-primary-50 rounded"
                        title="Update Status"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      {/* <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- PAGINATION & ROWS PER PAGE --- */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-white border-t border-dark-200 sm:px-6">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-dark-700">Rows per page:</span>
            <select
              className="text-sm border border-dark-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              {rowsPerPageOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-sm text-dark-700">
              Showing <span className="font-medium">{(page - 1) * rowsPerPage + 1}</span> to{' '}
              <span className="font-medium">{Math.min(page * rowsPerPage, totalOrders)}</span>{' '}
              of <span className="font-medium">{totalOrders}</span> results
            </p>
          </div>
        </div>
        
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => setPage(prev => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-dark-300 bg-white text-sm font-medium text-dark-500 hover:bg-dark-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  page === i + 1
                    ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                    : 'bg-white border-dark-300 text-dark-500 hover:bg-dark-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-dark-300 bg-white text-sm font-medium text-dark-500 hover:bg-dark-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      </div>

      {/* --- ORDER DETAILS MODAL --- */}
      <AnimatePresence>
        {showDetailsModal && (
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
                className="glass-card rounded-2xl p-6 ring-1 ring-[#8FAE8B] max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-dark-900">Order #{selectedOrder?.id || '...'}</h2>
                  <button onClick={() => setShowDetailsModal(false)}>
                    <FiX size={24} className="text-dark-400 hover:text-dark-900" />
                  </button>
                </div>

                {modalLoading || !selectedOrder ? (
                  <Spinner />
                ) : (
                  <div className="space-y-6">
                    {/* User Information Section */}
                    <div className="bg-gradient-to-br from-[#8FAE8B]/10 to-[#7E9F7A]/5 rounded-2xl p-5 border border-[#8FAE8B]/20">
                      <h3 className="text-lg font-bold text-dark-900 mb-4 flex items-center gap-2">
                        <FiUser className="text-[#8FAE8B]" />
                        Customer Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FiUser className="text-dark-400" size={16} />
                            <span className="text-sm font-medium text-dark-400">Customer Name</span>
                          </div>
                          <p className="text-dark-900 font-semibold text-lg pl-6">
                            {selectedOrder.userName || 'Not Available'}
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FiMail className="text-dark-400" size={16} />
                            <span className="text-sm font-medium text-dark-400">Email Address</span>
                          </div>
                          <p className="text-dark-900 font-semibold text-lg pl-6 break-all">
                            {selectedOrder.userEmail || 'Not Available'}
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FiPhone className="text-dark-400" size={16} />
                            <span className="text-sm font-medium text-dark-400">Phone Number</span>
                          </div>
                          <p className="text-dark-900 font-semibold text-lg pl-6">
                            {selectedOrder.userPhone || 'Not Available'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Status Section */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-[#8FAE8B]/20 shadow-sm">
                        <p className="text-sm text-dark-400 mb-1">Order Status</p>
                        <span className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(selectedOrder.status)}`}>
                          {selectedOrder.status}
                        </span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-[#8FAE8B]/20 shadow-sm">
                        <p className="text-sm text-dark-400 mb-1">Payment Status</p>
                        <span className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${getPaymentColor(selectedOrder.paymentStatus)}`}>
                          {selectedOrder.paymentStatus}
                        </span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-[#8FAE8B]/20 shadow-sm">
                        <p className="text-sm text-dark-400 mb-1">Order ID</p>
                        <p className="text-dark-900 font-semibold">#{selectedOrder.id}</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-[#8FAE8B]/20 shadow-sm">
                        <p className="text-sm text-dark-400 mb-1">User ID</p>
                        <p className="text-dark-900 font-semibold">{selectedOrder.userId}</p>
                      </div>
                    </div>

                    {/* Dates and Tracking Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-[#8FAE8B]/20 shadow-sm">
                        <p className="text-sm text-dark-400 mb-1">Order Date</p>
                        <p className="text-dark-900 font-semibold">{format(new Date(selectedOrder.createdAt), 'MMM dd, yyyy HH:mm')}</p>
                      </div>
                      {selectedOrder.updatedAt && (
                        <div className="bg-white p-4 rounded-xl border border-[#8FAE8B]/20 shadow-sm">
                          <p className="text-sm text-dark-400 mb-1">Last Updated</p>
                          <p className="text-dark-900 font-semibold">{format(new Date(selectedOrder.updatedAt), 'MMM dd, yyyy HH:mm')}</p>
                        </div>
                      )}
                      <div className="bg-white p-4 rounded-xl border border-[#8FAE8B]/20 shadow-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <FiTruck className="text-dark-400" size={14} />
                          <p className="text-sm text-dark-400">Tracking Info</p>
                        </div>
                        <p className="text-dark-900 font-semibold font-mono text-sm">
                          {selectedOrder.trackingNumber || 'Not Available'}
                        </p>
                      </div>
                    </div>

                    {/* Shipping Details */}
                    <div className="bg-white p-5 rounded-xl border border-[#8FAE8B]/20 shadow-sm">
                      <h3 className="text-lg font-semibold text-dark-900 mb-3 flex items-center gap-2">
                        <FiPackage className="text-[#8FAE8B]" />
                        Shipping Details
                      </h3>
                      <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                        <p className="text-dark-900 whitespace-pre-wrap leading-relaxed">
                          {selectedOrder.shippingAddress || 'No shipping address provided'}
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white p-5 rounded-xl border border-[#8FAE8B]/20 shadow-sm">
                      <h3 className="text-lg font-semibold text-dark-900 mb-4">Order Items</h3>
                      <div className="space-y-3 mb-6">
                        {selectedOrder.items.map((item) => (
                          <div key={item.id} className="bg-gray-50 p-4 rounded-xl flex gap-4 items-center hover:bg-gray-100 transition-colors border border-gray-200">
                            <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-[#8FAE8B]/30 flex-shrink-0 bg-white">
                              <img
                                src={getProductImageUrl((item as any)?.productImage)}
                                alt={(item as any)?.productName || 'Product'}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-dark-900 font-semibold text-lg mb-1">{(item as any)?.productName || `Item #${item.id}`}</p>
                              <div className="flex flex-wrap gap-3 mt-2 text-sm text-dark-600">
                                <span className="bg-gray-200 px-2 py-1 rounded">Qty: {item.quantity}</span>
                                {(item as any)?.selectedSize && (
                                  <span className="bg-gray-200 px-2 py-1 rounded">Size: {(item as any).selectedSize}</span>
                                )}
                                {(item as any)?.selectedColor && (
                                  <span className="bg-gray-200 px-2 py-1 rounded">Color: {(item as any).selectedColor}</span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-dark-900 font-bold text-lg">{formatINR(item.totalPrice)}</p>
                              <p className="text-sm text-dark-500">({formatINR(item.unitPrice)} each)</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Summary */}
                      <div className="bg-gradient-to-br from-[#8FAE8B]/10 to-[#7E9F7A]/5 p-5 rounded-xl border border-[#8FAE8B]/30 ml-auto max-w-md">
                        <h4 className="text-lg font-bold text-dark-900 mb-4">Order Summary</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-dark-700">
                            <span>Subtotal:</span>
                            <span>{formatINR(Number(selectedOrder.totalAmount) - Number(selectedOrder.tax || 0) + Number(selectedOrder.discount || 0))}</span>
                          </div>
                          {Number(selectedOrder.discount || 0) > 0 && (
                            <div className="flex justify-between text-green-600">
                              <span>Discount:</span>
                              <span className="font-semibold">- {formatINR(selectedOrder.discount || 0)}</span>
                            </div>
                          )}
                          {Number(selectedOrder.tax || 0) > 0 && (
                            <div className="flex justify-between text-dark-700">
                              <span>Tax:</span>
                              <span>{formatINR(selectedOrder.tax || 0)}</span>
                            </div>
                          )}
                          <div className="border-t border-[#8FAE8B]/30 pt-3 mt-2 flex justify-between text-lg font-bold text-dark-900">
                            <span>Total Amount:</span>
                            <span className="text-xl">{formatINR(selectedOrder.totalAmount)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* --- UPDATE STATUS MODAL --- */}
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
                  <h2 className="text-2xl font-bold text-dark-900">Update Order Status</h2>
                  <button onClick={() => setUpdateStatusModal(false)}>
                    <FiX size={24} className="text-dark-400 hover:text-dark-900" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-dark-300 mb-2 block">Order Status</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="input-field"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-dark-300 mb-2 block">Tracking Number (Optional)</label>
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Enter tracking number"
                      className="input-field"
                    />
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button onClick={handleUpdateStatus} className="flex-1 btn-primary">Update Status</button>
                    <button onClick={() => setUpdateStatusModal(false)} className="flex-1 btn-ghost">Cancel</button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .backdrop-overlay {
          @apply fixed inset-0 bg-black/50 z-40;
        }
        .glass-card {
          @apply bg-white/95 backdrop-blur-sm;
        }
        .input-field {
          @apply w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors;
        }
        .btn-primary {
          @apply px-6 py-2 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors;
        }
        .btn-ghost {
          @apply px-6 py-2 bg-dark-800 text-dark-300 font-semibold rounded-lg hover:bg-dark-700 transition-colors;
        }
      `}</style>
    </div>
  );
};

export default AdminOrders;