import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiUser, FiCalendar, FiMapPin, FiTruck } from 'react-icons/fi';
import Navbar from '../../components/layout/Navbar';
import { useAuth } from '../../hooks/useAuth';
import { orderApi } from '../../api/orderApi';
import { appointmentApi } from '../../api/appointmentApi';
import type { Order, Appointment } from '../../types';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const UserDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'appointments'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const [ordersRes, appointmentsRes] = await Promise.all([
        orderApi.getUserOrders(user.id, 0, 10),
        appointmentApi.getUserAppointments(user.id, 0, 10),
      ]);
      setOrders(ordersRes.content);
      setAppointments(appointmentsRes.content);
    } catch (error: any) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-500/20 text-yellow-400',
      PROCESSING: 'bg-blue-500/20 text-blue-400',
      SHIPPED: 'bg-purple-500/20 text-purple-400',
      DELIVERED: 'bg-green-500/20 text-green-400',
      CANCELLED: 'bg-red-500/20 text-red-400',
      CONFIRMED: 'bg-green-500/20 text-green-400',
      COMPLETED: 'bg-green-500/20 text-green-400',
    };
    return colors[status] || 'bg-dark-700 text-dark-300';
  };

  const tabs = [
    { id: 'orders', label: 'Orders', icon: FiPackage },
    { id: 'appointments', label: 'Appointments', icon: FiCalendar },
    { id: 'profile', label: 'Profile', icon: FiUser },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-dark-400">Manage your orders, appointments, and profile</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            whileHover={{ y: -4 }}
            className="glass-card-hover rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-400 text-sm mb-1">Total Orders</p>
                <p className="text-3xl font-bold gradient-text">{orders.length}</p>
              </div>
              <div className="p-4 glass-card rounded-xl">
                <FiPackage className="text-primary-400" size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="glass-card-hover rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-400 text-sm mb-1">Appointments</p>
                <p className="text-3xl font-bold gradient-text">{appointments.length}</p>
              </div>
              <div className="p-4 glass-card rounded-xl">
                <FiCalendar className="text-primary-400" size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="glass-card-hover rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-400 text-sm mb-1">Active Shipments</p>
                <p className="text-3xl font-bold gradient-text">
                  {orders.filter((o) => o.status === 'SHIPPED').length}
                </p>
              </div>
              <div className="p-4 glass-card rounded-xl">
                <FiTruck className="text-primary-400" size={24} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white'
                    : 'glass-card hover:bg-white/10 text-dark-300'
                }`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Content */}
        <div className="glass-card rounded-2xl p-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 glass-card rounded-xl shimmer" />
              ))}
            </div>
          ) : (
            <>
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white mb-4">Your Orders</h2>
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <FiPackage className="mx-auto text-dark-600 mb-4" size={48} />
                      <p className="text-dark-400">No orders yet</p>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <motion.div
                        key={order.id}
                        whileHover={{ x: 4 }}
                        className="glass-card-hover rounded-xl p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-white">
                                Order #{order.id}
                              </h3>
                              <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm text-dark-400">
                              {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold gradient-text">
                              ${order.totalAmount.toFixed(2)}
                            </p>
                            {order.trackingNumber && (
                              <p className="text-xs text-dark-500 mt-1">
                                Tracking: {order.trackingNumber}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          {order.items.slice(0, 3).map((item) => (
                            <div key={item.id} className="flex items-center justify-between text-sm">
                              <span className="text-dark-300">
                                {item.productName} × {item.quantity}
                              </span>
                              <span className="text-white font-semibold">
                                ${item.totalPrice.toFixed(2)}
                              </span>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <p className="text-xs text-dark-500">
                              +{order.items.length - 3} more items
                            </p>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-white/10">
                          <FiMapPin size={16} className="text-dark-500" />
                          <p className="text-sm text-dark-400 line-clamp-1">
                            {order.shippingAddress}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              )}

              {/* Appointments Tab */}
              {activeTab === 'appointments' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white mb-4">Your Appointments</h2>
                  {appointments.length === 0 ? (
                    <div className="text-center py-12">
                      <FiCalendar className="mx-auto text-dark-600 mb-4" size={48} />
                      <p className="text-dark-400">No appointments scheduled</p>
                    </div>
                  ) : (
                    appointments.map((appointment) => (
                      <motion.div
                        key={appointment.id}
                        whileHover={{ x: 4 }}
                        className="glass-card-hover rounded-xl p-6"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-white">
                                {appointment.serviceType.replace(/_/g, ' ')}
                              </h3>
                              <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                                {appointment.status}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-dark-400">
                                📅 {format(new Date(appointment.appointmentDate), 'MMMM dd, yyyy')}
                              </p>
                              <p className="text-sm text-dark-400">
                                🕐 {appointment.appointmentTime}
                              </p>
                              {appointment.notes && (
                                <p className="text-sm text-dark-500 mt-2">
                                  Note: {appointment.notes}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Your Profile</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold text-dark-300 mb-2 block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={user?.name || ''}
                        readOnly
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-dark-300 mb-2 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-dark-300 mb-2 block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={user?.phone || 'Not provided'}
                        readOnly
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-dark-300 mb-2 block">
                        Account Status
                      </label>
                      <div className="flex items-center space-x-2">
                        <span className="px-4 py-3 glass-card rounded-xl text-green-400 font-semibold">
                          ✓ Active
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Account Actions</h3>
                    <div className="space-y-3">
                      <button className="btn-ghost w-full sm:w-auto">
                        Update Password
                      </button>
                      <button className="btn-ghost w-full sm:w-auto ml-0 sm:ml-3">
                        Manage Addresses
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;