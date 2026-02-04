import { useState, useEffect, type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiUser, FiCalendar, FiMapPin, FiEdit2, FiPlus, FiEye, FiEyeOff, FiCheck, FiX, FiSearch, FiSliders } from 'react-icons/fi';
import Navbar from '../../components/layout/Navbar';
import { orderApi } from '../../api/orderApi';
import { appointmentApi } from '../../api/appointmentApi';
import { userProfileApi, type UserProfile, type UserAddress, type AddressPayload } from '../../api/userProfileApi';
import type { Order, Appointment } from '../../types';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import {formatINR } from "../../utils/currency";
import type { Footer } from '../../components/layout/Footer';


type AccountTab = 'overview' | 'orders' | 'profile' | 'appointments' | 'addresses';
type OrderStatusFilter = 'ALL' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED' | 'RETURNED';
type OrderTimeFilter = 'ANYTIME' | 'LAST_30_DAYS' | 'LAST_6_MONTHS' | 'LAST_YEAR';

const UserDashboard = () => {
    const { user, isAuthenticated, isHydrated } = useSelector(
      (state: RootState) => state.auth
    );

  const [activeTab, setActiveTab] = useState<AccountTab>('overview');
  const [orders, setOrders] = useState<Order[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [addressForm, setAddressForm] = useState<AddressPayload>({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    contactPhone: user?.phone || '',
    isDefault: false,
  });
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [isPasswordSaving, setIsPasswordSaving] = useState(false);
  const [isAddressSaving, setIsAddressSaving] = useState(false);
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [deletingAddressId, setDeletingAddressId] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState({
    old: false,
    next: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(true);
  const [orderSearch, setOrderSearch] = useState('');
  const [isOrderFilterOpen, setIsOrderFilterOpen] = useState(false);
  const [orderStatusFilter, setOrderStatusFilter] = useState<OrderStatusFilter>('ALL');
  const [orderTimeFilter, setOrderTimeFilter] = useState<OrderTimeFilter>('ANYTIME');
  const [orderStatusDraft, setOrderStatusDraft] = useState<OrderStatusFilter>('ALL');
  const [orderTimeDraft, setOrderTimeDraft] = useState<OrderTimeFilter>('ANYTIME');
  const IMAGE_BASE_URL = import.meta.env.VITE_API_IMG_URL || 'http://localhost:8090';

  const getOrderImageUrl = (path?: string) => {
    if (!path) return '/placeholder.jpg';
    if (path.startsWith('http') || path.startsWith('blob:')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${IMAGE_BASE_URL}${cleanPath}`;
  };

    useEffect(() => {
      if (!isHydrated) return;        // ⛔ wait until localStorage is loaded
      if (!isAuthenticated) return;  // ⛔ user not logged in
      if (!user) return;             // ⛔ safety guard

      fetchUserData();               // ✅ API CALLS FIRE HERE
    }, [isHydrated, isAuthenticated, user]);

    useEffect(() => {
      setProfileForm({
        name: profile?.name || user?.name || '',
        phone: profile?.phone || user?.phone || '',
      });
    }, [profile, user]);


    const resetAddressForm = (overrides: Partial<AddressPayload> = {}) => {
      setAddressForm({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'USA',
        contactPhone: profile?.phone || user?.phone || '',
        isDefault: false,
        ...overrides,
      });
    };

    const loadAddresses = async () => {
      if (!user?.id) return;
      try {
        const response = await userProfileApi.getAddresses(user.id);
        setAddresses(response);
      } catch (error) {
        console.warn('Failed to fetch addresses', error);
      }
    };

    const fetchUserData = async () => {
    if (!user?.id) return;

    
    setLoading(true);
    try {
      const [ordersRes, appointmentsRes] = await Promise.all([
        orderApi.getUserOrders(user.id, 0, 10),
        appointmentApi.getUserAppointments(user.id, 0, 10),
      ]);
      setOrders(ordersRes.content);
      setAppointments(appointmentsRes.content);

      try {
        const profileRes = await userProfileApi.getUserProfile(user.id);
        setProfile(profileRes);
      } catch (profileError) {
        console.warn('Failed to fetch user profile', profileError);
      }

      await loadAddresses();
    } catch (error: any) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setProfileForm((prev) => ({ ...prev, [name]: digitsOnly }));
      return;
    }
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = async () => {
    if (!user?.id) return;
    if (!profileForm.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (profileForm.phone && profileForm.phone.length !== 10) {
      toast.error('Phone number must be exactly 10 digits');
      return;
    }

    setIsProfileSaving(true);
    try {
      const updated = await userProfileApi.updateUserProfile(user.id, {
        name: profileForm.name.trim(),
        phone: profileForm.phone?.trim() || undefined,
      });
      setProfile(updated);
      window.dispatchEvent(new Event("profile:updated"));
      toast.success('Profile updated');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update profile');
    } finally {
      setIsProfileSaving(false);
    }
  };

  const handleProfileReset = () => {
    setProfileForm({
      name: profile?.name || user?.name || '',
      phone: profile?.phone || user?.phone || '',
    });
  };

  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const getPasswordChecks = (password: string) => ({
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^\w\s]/.test(password),
  });

  const getPasswordError = (password: string) => {
    const checks = getPasswordChecks(password);
    if (!checks.length) return 'Password must be at least 8 characters';
    if (!checks.upper) return 'Password must include an uppercase letter';
    if (!checks.lower) return 'Password must include a lowercase letter';
    if (!checks.number) return 'Password must include a number';
    if (!checks.special) return 'Password must include a special character';
    return '';
  };

  const handleChangePassword = async () => {
    if (!user?.id) return;
    if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error('Please fill all password fields');
      return;
    }
    const passwordError = getPasswordError(passwordForm.newPassword);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setIsPasswordSaving(true);
    try {
      await userProfileApi.changePassword(user.id, {
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success('Password updated');
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update password');
    } finally {
      setIsPasswordSaving(false);
    }
  };

  const handleAddressInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'contactPhone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setAddressForm((prev) => ({ ...prev, [name]: digitsOnly }));
      return;
    }
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateAddressForm = () => {
    if (
      !addressForm.addressLine1 ||
      !addressForm.city ||
      !addressForm.state ||
      !addressForm.postalCode ||
      !addressForm.country ||
      !addressForm.contactPhone
    ) {
      toast.error('Please fill in all required address fields');
      return false;
    }
    if (addressForm.contactPhone.length !== 10) {
      toast.error('Contact phone must be exactly 10 digits');
      return false;
    }
    return true;
  };

  const handleAddressSave = async () => {
    if (!user?.id) return;
    if (!validateAddressForm()) return;

    setIsAddressSaving(true);
    try {
      if (editingAddressId !== null) {
        const updated = await userProfileApi.updateAddress(user.id, editingAddressId, {
          ...addressForm,
          id: editingAddressId,
        });
        setAddresses((prev) =>
          prev.map((addr) => (addr.id === updated.id ? updated : addr))
        );
        toast.success('Address updated');
      } else {
        const created = await userProfileApi.addAddress(user.id, addressForm);
        setAddresses((prev) => [created, ...prev]);
        toast.success('Address added');
      }
      setIsAddressFormOpen(false);
      setEditingAddressId(null);
      resetAddressForm();
      await loadAddresses();
    } catch (error: any) {
      console.error('Address save failed', error);
      toast.error(error?.message || 'Failed to save address');
    } finally {
      setIsAddressSaving(false);
    }
  };

  const handleEditAddress = (address: UserAddress) => {
    setEditingAddressId(address.id);
    setIsAddressFormOpen(true);
    setAddressForm({
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || '',
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country || 'USA',
      contactPhone: address.contactPhone || profile?.phone || user?.phone || '',
      isDefault: address.isDefault,
    });
  };

  const handleAddressCancel = () => {
    setIsAddressFormOpen(false);
    setEditingAddressId(null);
    resetAddressForm();
  };

  const handleSetDefaultAddress = async (addressId: number) => {
    if (!user?.id) return;
    try {
      await userProfileApi.setDefaultAddress(user.id, addressId);
      setAddresses((prev) =>
        prev.map((addr) => ({
          ...addr,
          isDefault: addr.id === addressId,
        }))
      );
      toast.success('Default address updated');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to set default address');
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    if (!user?.id) return;
    const confirmed = window.confirm('Delete this address? This action cannot be undone.');
    if (!confirmed) return;

    setDeletingAddressId(addressId);
    try {
      await userProfileApi.deleteAddress(user.id, addressId);
      setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
      toast.success('Address deleted');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to delete address');
    } finally {
      setDeletingAddressId(null);
    }
  };

  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    resetAddressForm();
    setIsAddressFormOpen(true);
  };

  const openOrderFilters = () => {
    setOrderStatusDraft(orderStatusFilter);
    setOrderTimeDraft(orderTimeFilter);
    setIsOrderFilterOpen(true);
  };

  const applyOrderFilters = () => {
    setOrderStatusFilter(orderStatusDraft);
    setOrderTimeFilter(orderTimeDraft);
    setIsOrderFilterOpen(false);
  };

  const clearOrderFilters = () => {
    setOrderStatusDraft('ALL');
    setOrderTimeDraft('ANYTIME');
    setOrderStatusFilter('ALL');
    setOrderTimeFilter('ANYTIME');
    setIsOrderFilterOpen(false);
  };

  const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
  PENDING: 'bg-yellow-500/20 text-yellow-600',
  PROCESSING: 'bg-blue-500/20 text-blue-600',
  SHIPPED: 'bg-purple-500/20 text-purple-600',
  DELIVERED: 'bg-green-500/20 text-green-600',
  CANCELLED: 'bg-red-500/20 text-red-600',
  RETURNED: 'bg-gray-500/20 text-gray-600',
  CONFIRMED: 'bg-green-500/20 text-green-600',
  COMPLETED: 'bg-green-500/20 text-green-600',
};
    return colors[status] || 'bg-dark-700 text-dark-300';
  };

  const isActive = profile?.isActive ?? user?.isActive ?? true;
  const orderedAddresses = [...addresses].sort((a, b) => {
    if (a.isDefault === b.isDefault) return 0;
    return a.isDefault ? -1 : 1;
  });
  const passwordChecks = getPasswordChecks(passwordForm.newPassword);
  const memberSince = profile?.createdAt
    ? format(new Date(profile.createdAt), 'MMMM yyyy')
    : null;
  const profileInitials = (profile?.name || user?.name || 'U')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const accountCards = [
    {
      id: 'profile',
      title: 'Profile',
      description: 'View and edit your personal information',
      icon: FiUser,
    },
    {
      id: 'orders',
      title: 'Orders',
      description: 'Track and manage your orders',
      icon: FiPackage,
      meta: `${profile?.orderCount ?? orders.length} orders`,
    },
    {
      id: 'addresses',
      title: 'Addresses',
      description: 'Manage your shipping addresses',
      icon: FiMapPin,
      meta: `${addresses.length} saved`,
    },
    {
      id: 'appointments',
      title: 'Appointments',
      description: 'Manage your appointments',
      icon: FiCalendar,
      meta: `${profile?.appointmentCount ?? appointments.length} booked`,
    },
  ] as const;

  const orderStatusLabels: Record<OrderStatusFilter, string> = {
    ALL: 'All',
    ON_THE_WAY: 'On the way',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
    RETURNED: 'Returned',
  };

  const orderTimeLabels: Record<OrderTimeFilter, string> = {
    ANYTIME: 'Anytime',
    LAST_30_DAYS: 'Last 30 days',
    LAST_6_MONTHS: 'Last 6 months',
    LAST_YEAR: 'Last year',
  };

  const normalizedSearch = orderSearch.trim().toLowerCase();
  const filteredOrders = orders.filter((order) => {
    const statusMatch =
      orderStatusFilter === 'ALL'
        ? true
        : orderStatusFilter === 'ON_THE_WAY'
        ? ['PROCESSING', 'SHIPPED', 'PENDING'].includes(order.status)
        : order.status === orderStatusFilter;

    const orderDate = new Date(order.createdAt);
    const isValidDate = !Number.isNaN(orderDate.getTime());
    const diffDays = isValidDate
      ? (Date.now() - orderDate.getTime()) / (1000 * 60 * 60 * 24)
      : 0;
    const timeMatch =
      orderTimeFilter === 'ANYTIME'
        ? true
        : orderTimeFilter === 'LAST_30_DAYS'
        ? diffDays <= 30
        : orderTimeFilter === 'LAST_6_MONTHS'
        ? diffDays <= 180
        : diffDays <= 365;

    const searchMatch =
      normalizedSearch.length === 0 ||
      order.id.toString().includes(normalizedSearch) ||
      order.items.some((item) =>
        item.productName?.toLowerCase().includes(normalizedSearch)
      );

    return statusMatch && timeMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-dark-900 mb-2">My Account</h1>
          <p className="text-dark-600">Manage your profile, orders, addresses, and appointments</p>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {accountCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.button
                  key={card.title}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(card.id)}
                  className="group text-left rounded-2xl border border-[#E6E2D6] bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#F2F0E8] text-[#6B7D60] flex items-center justify-center transition-colors group-hover:bg-[#6B7D60] group-hover:text-white">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-dark-900">{card.title}</h3>
                      <p className="text-sm text-dark-500">{card.description}</p>
                      {card.meta && (
                        <p className="text-xs text-dark-400 mt-2">{card.meta}</p>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}

        {activeTab !== 'overview' && (
          <div className="max-w-5xl mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className="text-sm text-dark-500 hover:text-dark-700 flex items-center gap-2"
            >
              <span className="text-base">&larr;</span>
              Back to Account
            </button>

            <div className="mt-6">
              {/* Content */}
              <div className="rounded-2xl">
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
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-display font-bold text-dark-900">My Orders</h2>
                      <p className="text-dark-500">Track and manage your orders</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <div className="relative flex-1 min-w-[220px]">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                        <input
                          type="text"
                          value={orderSearch}
                          onChange={(e) => setOrderSearch(e.target.value)}
                          placeholder="Search in orders"
                          className="input-field pl-10"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={openOrderFilters}
                        className="btn-ghost border border-[#6B7D60] text-[#6B7D60] flex items-center gap-2"
                      >
                        <FiSliders size={16} />
                        Filter
                      </button>
                    </div>
                  </div>

                  {(orderStatusFilter !== 'ALL' || orderTimeFilter !== 'ANYTIME') && (
                    <div className="flex flex-wrap gap-2 text-xs">
                      {orderStatusFilter !== 'ALL' && (
                        <span className="px-3 py-1 rounded-full bg-[#F2F0E8] text-[#6B7D60]">
                          Status: {orderStatusLabels[orderStatusFilter]}
                        </span>
                      )}
                      {orderTimeFilter !== 'ANYTIME' && (
                        <span className="px-3 py-1 rounded-full bg-[#F2F0E8] text-[#6B7D60]">
                          Time: {orderTimeLabels[orderTimeFilter]}
                        </span>
                      )}
                    </div>
                  )}
                  {filteredOrders.length === 0 ? (
                    <div className="text-center py-12">
                      <FiPackage className="mx-auto text-dark-500 mb-4" size={48} />
                      <p className="text-dark-600">No orders yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredOrders.map((order) => {
                        const firstItem = order.items[0];
                        const previewImage = getOrderImageUrl(firstItem?.productImage);
                        return (
                          <motion.div
                            key={order.id}
                            whileHover={{ y: -2 }}
                            className="rounded-2xl border border-[#E6E2D6] bg-white p-5 shadow-sm"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                    order.status
                                  )}`}
                                >
                                  {order.status.replace(/_/g, ' ')}
                                </span>
                                <span className="text-xs text-dark-500">
                                  On {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                                </span>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-semibold text-dark-900">
                                  {formatINR(order.totalAmount)}
                                </p>
                                <p className="text-xs text-dark-500">Order #{order.id}</p>
                              </div>
                            </div>

                            <div className="mt-4 flex flex-col sm:flex-row gap-4">
                              <div className="h-20 w-20 rounded-xl bg-[#F2F0E8] overflow-hidden flex items-center justify-center">
                                <img
                                  src={previewImage}
                                  alt={firstItem?.productName || 'Order item'}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-dark-900">
                                  {firstItem?.productName || 'Order items'}
                                </p>
                                <div className="mt-1 space-y-1 text-xs text-dark-500">
                                  {firstItem?.quantity != null && (
                                    <p>Qty: {firstItem.quantity}</p>
                                  )}
                                  {firstItem?.selectedSize && <p>Size: {firstItem.selectedSize}</p>}
                                  {firstItem?.selectedColor && (
                                    <p>Color: {firstItem.selectedColor}</p>
                                  )}
                                </div>
                                {order.items.length > 1 && (
                                  <p className="text-xs text-dark-500 mt-2">
                                    +{order.items.length - 1} more items
                                  </p>
                                )}
                              </div>
                              <div className="sm:max-w-[200px] flex items-start gap-2 text-xs text-dark-500">
                                <FiMapPin size={14} className="mt-0.5" />
                                <span className="line-clamp-3">{order.shippingAddress}</span>
                              </div>
                            </div>
                            {order.trackingNumber && (
                              <div className="mt-3 text-xs text-dark-500">
                                Tracking: {order.trackingNumber}
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {isOrderFilterOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                  <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-dark-900">Filter Orders</h3>
                      <button
                        type="button"
                        onClick={() => setIsOrderFilterOpen(false)}
                        className="text-dark-500 hover:text-dark-700"
                      >
                        &times;
                      </button>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-semibold text-dark-700">Status</p>
                      <div className="mt-3 space-y-2">
                        {[
                          { label: 'All', value: 'ALL' },
                          { label: 'On the way', value: 'ON_THE_WAY' },
                          { label: 'Delivered', value: 'DELIVERED' },
                          { label: 'Cancelled', value: 'CANCELLED' },
                          { label: 'Returned', value: 'RETURNED' },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-3 text-sm text-dark-600"
                          >
                            <input
                              type="radio"
                              name="orderStatus"
                              checked={orderStatusDraft === option.value}
                              onChange={() => setOrderStatusDraft(option.value as OrderStatusFilter)}
                              className="accent-[#6B7D60]"
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 border-t border-[#E6E2D6] pt-4">
                      <p className="text-sm font-semibold text-dark-700">Time</p>
                      <div className="mt-3 space-y-2">
                        {[
                          { label: 'Anytime', value: 'ANYTIME' },
                          { label: 'Last 30 days', value: 'LAST_30_DAYS' },
                          { label: 'Last 6 months', value: 'LAST_6_MONTHS' },
                          { label: 'Last year', value: 'LAST_YEAR' },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-3 text-sm text-dark-600"
                          >
                            <input
                              type="radio"
                              name="orderTime"
                              checked={orderTimeDraft === option.value}
                              onChange={() => setOrderTimeDraft(option.value as OrderTimeFilter)}
                              className="accent-[#6B7D60]"
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        type="button"
                        onClick={clearOrderFilters}
                        className="btn-ghost flex-1 border border-[#E6E2D6]"
                      >
                        Clear Filters
                      </button>
                      <button
                        type="button"
                        onClick={applyOrderFilters}
                        className="btn-primary flex-1"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Appointments Tab */}
              {activeTab === 'appointments' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-display font-bold text-dark-900">My Appointments</h2>
                    <p className="text-dark-500">View upcoming visits and consultations</p>
                  </div>

                  {appointments.length === 0 ? (
                    <div className="text-center py-12">
                      <FiCalendar className="mx-auto text-dark-500 mb-4" size={48} />
                      <p className="text-dark-600">No appointments scheduled</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {appointments.map((appointment) => (
                        <motion.div
                          key={appointment.id}
                          whileHover={{ y: -2 }}
                          className="rounded-2xl border border-[#E6E2D6] bg-white p-5 shadow-sm"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="text-xs text-dark-500">Service</p>
                              <h3 className="text-lg font-semibold text-dark-900">
                                {appointment.serviceType.replace(/_/g, ' ')}
                              </h3>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                appointment.status
                              )}`}
                            >
                              {appointment.status.replace(/_/g, ' ')}
                            </span>
                          </div>

                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-dark-600">
                            <div className="flex items-center gap-2">
                              <FiCalendar size={16} className="text-dark-400" />
                              <span>
                                {format(new Date(appointment.appointmentDate), 'MMM dd, yyyy')}
                              </span>
                            </div>
                            <div className="text-sm text-dark-600">
                              Time: {appointment.appointmentTime}
                            </div>
                          </div>

                          {appointment.notes && (
                            <p className="mt-3 text-sm text-dark-500">Notes: {appointment.notes}</p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-display font-bold text-dark-900">My Profile</h2>
                    <p className="text-dark-500">Manage your personal information</p>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                      <div className="h-24 w-24 rounded-full bg-[#F2F0E8] text-[#6B7D60] flex items-center justify-center text-2xl font-semibold">
                        {profileInitials}
                      </div>
                      <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-[#6B7D60] text-white flex items-center justify-center shadow">
                        <FiEdit2 size={14} />
                      </div>
                    </div>
                    {memberSince && (
                      <span className="px-4 py-1 rounded-full bg-[#F2F0E8] text-xs text-[#6B7D60]">
                        Member since {memberSince}
                      </span>
                    )}
                  </div>

                  <div className="rounded-2xl border border-[#E6E2D6] bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-dark-900">Profile Details</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="text-sm font-semibold text-dark-700 mb-2 block">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={profileForm.name}
                          onChange={handleProfileInputChange}
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-dark-700 mb-2 block">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profile?.email || user?.email || ''}
                          readOnly
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-dark-700 mb-2 block">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={profileForm.phone}
                          onChange={handleProfileInputChange}
                          inputMode="numeric"
                          pattern="\\d{10}"
                          maxLength={10}
                          className="input-field"
                        />
                        <p className="text-xs text-dark-500 mt-1">10 digits only</p>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-dark-700 mb-2 block">
                          Account Status
                        </label>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-4 py-2 rounded-full text-xs font-semibold ${
                              isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                            }`}
                          >
                            {isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        onClick={handleProfileSave}
                        disabled={isProfileSaving}
                        className="btn-primary disabled:opacity-50"
                      >
                        {isProfileSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        onClick={handleProfileReset}
                        className="btn-ghost border border-[#6B7D60] text-[#6B7D60]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#E6E2D6] bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-dark-900">Change Password</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <label className="text-sm font-semibold text-dark-700 mb-2 block">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword.old ? 'text' : 'password'}
                            name="oldPassword"
                            value={passwordForm.oldPassword}
                            onChange={handlePasswordInputChange}
                            autoComplete="off"
                            className="input-field pr-10"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword((prev) => ({ ...prev, old: !prev.old }))
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-700"
                          >
                            {showPassword.old ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-dark-700 mb-2 block">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword.next ? 'text' : 'password'}
                            name="newPassword"
                            value={passwordForm.newPassword}
                            onChange={handlePasswordInputChange}
                            autoComplete="new-password"
                            className="input-field pr-10"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword((prev) => ({ ...prev, next: !prev.next }))
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-700"
                          >
                            {showPassword.next ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                          </button>
                        </div>
                        {passwordForm.newPassword.length > 0 && (
                          <div className="mt-2 space-y-1 text-xs text-dark-600">
                            <p className="text-dark-500">Password must include:</p>
                            <div className="flex items-center gap-2">
                              {passwordChecks.length ? (
                                <FiCheck className="text-green-500" size={12} />
                              ) : (
                                <FiX className="text-red-500" size={12} />
                              )}
                              <span>At least 8 characters</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {passwordChecks.upper ? (
                                <FiCheck className="text-green-500" size={12} />
                              ) : (
                                <FiX className="text-red-500" size={12} />
                              )}
                              <span>One uppercase letter (A-Z)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {passwordChecks.lower ? (
                                <FiCheck className="text-green-500" size={12} />
                              ) : (
                                <FiX className="text-red-500" size={12} />
                              )}
                              <span>One lowercase letter (a-z)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {passwordChecks.number ? (
                                <FiCheck className="text-green-500" size={12} />
                              ) : (
                                <FiX className="text-red-500" size={12} />
                              )}
                              <span>One number (0-9)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {passwordChecks.special ? (
                                <FiCheck className="text-green-500" size={12} />
                              ) : (
                                <FiX className="text-red-500" size={12} />
                              )}
                              <span>One special character (!@#$...)</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-dark-700 mb-2 block">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword.confirm ? 'text' : 'password'}
                            name="confirmPassword"
                            value={passwordForm.confirmPassword}
                            onChange={handlePasswordInputChange}
                            autoComplete="new-password"
                            className="input-field pr-10"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword((prev) => ({ ...prev, confirm: !prev.confirm }))
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-700"
                          >
                            {showPassword.confirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        onClick={handleChangePassword}
                        disabled={isPasswordSaving}
                        className="btn-primary disabled:opacity-50"
                      >
                        {isPasswordSaving ? 'Updating...' : 'Update Password'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-display font-bold text-dark-900">My Addresses</h2>
                      <p className="text-dark-500">Manage your shipping addresses</p>
                    </div>
                    <button
                      className="btn-primary flex items-center gap-2"
                      onClick={() => (isAddressFormOpen ? handleAddressCancel() : handleOpenAddAddress())}
                    >
                      <FiPlus size={16} />
                      {isAddressFormOpen ? 'Close' : 'Add New Address'}
                    </button>
                  </div>

                  {isAddressFormOpen && (
                    <div className="rounded-2xl border border-[#E6E2D6] bg-white p-6 shadow-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="text-sm font-semibold text-dark-700 mb-2 block">
                            Address Line 1 *
                          </label>
                          <input
                            type="text"
                            name="addressLine1"
                            value={addressForm.addressLine1}
                            onChange={handleAddressInputChange}
                            className="input-field"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="text-sm font-semibold text-dark-700 mb-2 block">
                            Address Line 2
                          </label>
                          <input
                            type="text"
                            name="addressLine2"
                            value={addressForm.addressLine2 || ''}
                            onChange={handleAddressInputChange}
                            className="input-field"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-dark-700 mb-2 block">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={addressForm.city}
                            onChange={handleAddressInputChange}
                            className="input-field"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-dark-700 mb-2 block">
                            State *
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={addressForm.state}
                            onChange={handleAddressInputChange}
                            className="input-field"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-dark-700 mb-2 block">
                            Postal Code *
                          </label>
                          <input
                            type="text"
                            name="postalCode"
                            value={addressForm.postalCode}
                            onChange={handleAddressInputChange}
                            className="input-field"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-dark-700 mb-2 block">
                            Country *
                          </label>
                          <input
                            type="text"
                            name="country"
                            value={addressForm.country}
                            onChange={handleAddressInputChange}
                            className="input-field"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="text-sm font-semibold text-dark-700 mb-2 block">
                            Contact Phone *
                          </label>
                          <input
                            type="tel"
                            name="contactPhone"
                            value={addressForm.contactPhone}
                            onChange={handleAddressInputChange}
                            inputMode="numeric"
                            pattern="\\d{10}"
                            maxLength={10}
                            className="input-field"
                          />
                          <p className="text-xs text-dark-500 mt-1">10 digits only</p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <button
                          onClick={handleAddressSave}
                          disabled={isAddressSaving}
                          className="btn-primary disabled:opacity-50"
                        >
                          {isAddressSaving
                            ? 'Saving...'
                            : editingAddressId
                            ? 'Update Address'
                            : 'Save Address'}
                        </button>
                        <button onClick={handleAddressCancel} className="btn-ghost">
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {orderedAddresses.length === 0 && (
                      <div className="col-span-full text-sm text-dark-600">
                        No saved addresses yet.
                      </div>
                    )}
                    {orderedAddresses.map((address, index) => (
                      <div
                        key={address.id}
                        className="relative rounded-2xl border border-[#E6E2D6] bg-white p-5 shadow-sm"
                      >
                        {address.isDefault && (
                          <span className="absolute -top-3 left-4 px-3 py-1 rounded-full bg-[#6B7D60] text-white text-xs font-semibold">
                            Default
                          </span>
                        )}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-[#F2F0E8] text-[#6B7D60] flex items-center justify-center">
                              <FiMapPin size={16} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-dark-900">
                                Address {index + 1}
                              </p>
                              <p className="text-xs text-dark-500">
                                {address.isDefault ? 'Default address' : 'Saved address'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              className="p-2 rounded-full hover:bg-[#F2F0E8]"
                              onClick={() => handleEditAddress(address)}
                            >
                              <FiEdit2 size={14} className="text-dark-600" />
                            </button>
                            {!address.isDefault && (
                              <button
                                className="p-2 rounded-full hover:bg-red-50"
                                onClick={() => handleDeleteAddress(address.id)}
                                disabled={deletingAddressId === address.id}
                              >
                                {deletingAddressId === address.id ? (
                                  <span className="text-xs text-red-500">...</span>
                                ) : (
                                  <FiX size={16} className="text-red-500" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 space-y-1 text-sm text-dark-700">
                          <p>{address.addressLine1}</p>
                          {address.addressLine2 && <p>{address.addressLine2}</p>}
                          <p>
                            {address.city}, {address.state} {address.postalCode}
                          </p>
                          <p>{address.country}</p>
                          <p className="text-xs text-dark-500">
                            Phone: {address.contactPhone || profile?.phone || user?.phone || 'N/A'}
                          </p>
                        </div>

                        {!address.isDefault && (
                          <button
                            className="mt-4 w-full btn-ghost border border-[#6B7D60] text-[#6B7D60]"
                            onClick={() => handleSetDefaultAddress(address.id)}
                          >
                            Set as Default
                          </button>
                        )}
                      </div>
                    ))}

                    {!isAddressFormOpen && (
                      <button
                        type="button"
                        onClick={handleOpenAddAddress}
                        className="rounded-2xl border-2 border-dashed border-[#E6E2D6] bg-white p-6 text-center text-dark-600 hover:border-[#6B7D60] hover:text-[#6B7D60]"
                      >
                        <div className="mx-auto h-12 w-12 rounded-full bg-[#F2F0E8] text-[#6B7D60] flex items-center justify-center mb-3">
                          <FiPlus size={22} />
                        </div>
                        <p className="text-sm font-semibold">Add New Address</p>
                        <p className="text-xs text-dark-500 mt-1">Save a new shipping address</p>
                      </button>
                    )}
                  </div>

                  <div className="rounded-2xl bg-[#F6F4EC] border border-[#E6E2D6] p-4 text-sm text-dark-600">
                    <span className="font-semibold text-dark-800">Doorstep Service Available</span>
                    <p className="mt-1 text-xs text-dark-500">
                      Our tailor will visit your address for measurements in select areas.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )}
  </div>
</div>

  );
};

export default UserDashboard;
