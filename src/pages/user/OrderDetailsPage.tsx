import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import {
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiPackage,
  FiRotateCcw,
  FiTruck,
  FiXCircle,
  FiStar,
  FiImage,
  FiX,
} from 'react-icons/fi';
import Navbar from '../../components/layout/Navbar';
import { orderApi } from '../../api/orderApi';
import reviewApi from '../../api/reviewApi';
import type { Order } from '../../types';
import { formatINR } from '../../utils/currency';

type TimelineStep = { key: string; label: string };

const timelineBaseSteps: TimelineStep[] = [
  { key: 'PENDING', label: 'Order Placed' },
  { key: 'PROCESSING', label: 'Order Confirmed' },
  { key: 'SHIPPED', label: 'Shipped' },
  { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
  { key: 'DELIVERED', label: 'Delivered' },
];

const timelineAltSteps: Record<string, TimelineStep[]> = {
  CANCELLED: [
    { key: 'PENDING', label: 'Order Placed' },
    { key: 'CANCELLED', label: 'Cancelled' },
  ],
  RETURNED: [
    { key: 'PENDING', label: 'Order Placed' },
    { key: 'PROCESSING', label: 'Order Confirmed' },
    { key: 'SHIPPED', label: 'Shipped' },
    { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
    { key: 'DELIVERED', label: 'Delivered' },
    { key: 'RETURNED', label: 'Returned' },
  ],
};

const timelineIcons: Record<string, (props: { size?: number }) => JSX.Element> = {
  PENDING: FiClock,
  PROCESSING: FiPackage,
  SHIPPED: FiTruck,
  OUT_FOR_DELIVERY: FiMapPin,
  DELIVERED: FiCheckCircle,
  CANCELLED: FiXCircle,
  RETURNED: FiRotateCcw,
};

const getTimelineSteps = (status: string) =>
  timelineAltSteps[status] ?? timelineBaseSteps;

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-500/20 text-yellow-600',
    PROCESSING: 'bg-blue-500/20 text-blue-600',
    SHIPPED: 'bg-purple-500/20 text-purple-600',
    OUT_FOR_DELIVERY: 'bg-indigo-500/20 text-indigo-600',
    DELIVERED: 'bg-green-500/20 text-green-600',
    CANCELLED: 'bg-red-500/20 text-red-600',
    RETURNED: 'bg-gray-500/20 text-gray-600',
    CONFIRMED: 'bg-green-500/20 text-green-600',
    COMPLETED: 'bg-green-500/20 text-green-600',
  };
  return colors[status] || 'bg-dark-700 text-dark-300';
};

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [timeline, setTimeline] = useState<
    { status: string; message: string; timestamp: string }[]
  >([]);
  const [reviewDrafts, setReviewDrafts] = useState<
    Record<string, { rating: number; title: string; body: string }>
  >({});
  const [reviewSubmitting, setReviewSubmitting] = useState<Record<string, boolean>>({});
  const [reviewAttachments, setReviewAttachments] = useState<
    Record<string, { images: File[]; videos: File[] }>
  >({});
  const [reviewIds, setReviewIds] = useState<Record<string, number>>({});
  const [reviewExistingImages, setReviewExistingImages] = useState<Record<string, string[]>>({});
  const [reviewImagesToDelete, setReviewImagesToDelete] = useState<Record<string, string[]>>(
    {}
  );
  const [reviewModal, setReviewModal] = useState<{
    item: Order['items'][number];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [timelineLoading, setTimelineLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const IMAGE_BASE_URL = import.meta.env.VITE_API_IMG_URL || 'http://localhost:8090';

  const orderId = useMemo(() => (id ? Number(id) : NaN), [id]);

  const getOrderImageUrl = (path?: string) => {
    if (!path) return '/placeholder.jpg';
    if (path.startsWith('http') || path.startsWith('blob:')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${IMAGE_BASE_URL}${cleanPath}`;
  };

  useEffect(() => {
    if (!Number.isFinite(orderId)) {
      setError('Invalid order id');
      setLoading(false);
      return;
    }
    let active = true;
    const loadOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await orderApi.getOrderById(orderId);
        if (active) {
          setOrder(data);
        }
      } catch (err: any) {
        if (active) {
          setError(err?.message || 'Failed to load order details');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    loadOrder();
    return () => {
      active = false;
    };
  }, [orderId]);

  useEffect(() => {
    if (!Number.isFinite(orderId)) return;
    let active = true;
    const loadTimeline = async () => {
      setTimelineLoading(true);
      try {
        const data = await orderApi.getOrderTimeline(orderId);
        if (active) {
          setTimeline(data);
        }
      } catch {
        if (active) {
          setTimeline([]);
        }
      } finally {
        if (active) {
          setTimelineLoading(false);
        }
      }
    };
    loadTimeline();
    return () => {
      active = false;
    };
  }, [orderId]);

  const firstItem = order?.items?.[0];
  const orderDate = order?.createdAt ? new Date(order.createdAt) : null;
  const dateLabel =
    orderDate && !Number.isNaN(orderDate.getTime())
      ? format(orderDate, 'MMMM dd, yyyy')
      : '—';
  const displayOrderId = order?.orderNumber ? String(order.orderNumber) : String(order?.id ?? '');
  const orderLabel = displayOrderId.startsWith('ORD-') ? displayOrderId : `ORD-${displayOrderId}`;

  const timelineSteps = order ? getTimelineSteps(order.status) : timelineBaseSteps;
  const currentIndex = order
    ? Math.max(0, timelineSteps.findIndex((step) => step.key === order.status))
    : 0;
  const eventMap = new Map(timeline.map((event) => [event.status, event]));

  const getReviewKey = (orderIdValue: number, productId: number) =>
    `${orderIdValue}-${productId}`;
  const getReviewDraft = (key: string) =>
    reviewDrafts[key] || { rating: 0, title: '', body: '' };
  const getReviewAttachments = (key: string) =>
    reviewAttachments[key] || { images: [], videos: [] };
  const getReviewId = (key: string) => reviewIds[key];
  const getReviewExistingImages = (key: string) => reviewExistingImages[key] || [];
  const getReviewImagesToDelete = (key: string) => reviewImagesToDelete[key] || [];

  const mapExistingReviewImages = (review: {
    imageUrls?: string[];
    media?: { id: number; url: string; mediaType: 'IMAGE' | 'VIDEO' }[];
  }) => {
    const imageUrls =
      review.imageUrls && review.imageUrls.length > 0
        ? review.imageUrls
        : (review.media || [])
            .filter((m) => m.mediaType === 'IMAGE')
            .map((m) => m.url);

    return imageUrls;
  };

  const updateReviewDraft = (
    key: string,
    patch: Partial<{ rating: number; title: string; body: string }>
  ) => {
    setReviewDrafts((prev) => ({
      ...prev,
      [key]: { ...getReviewDraft(key), ...patch },
    }));
  };

  const updateReviewAttachments = (
    key: string,
    type: 'images' | 'videos',
    files: FileList | File[]
  ) => {
    const list = Array.isArray(files) ? files : Array.from(files);
    setReviewAttachments((prev) => {
      const current = getReviewAttachments(key);
      return {
        ...prev,
        [key]: { ...current, [type]: [...current[type], ...list] },
      };
    });
  };

  const removeReviewAttachment = (
    key: string,
    type: 'images' | 'videos',
    index: number
  ) => {
    setReviewAttachments((prev) => {
      const current = getReviewAttachments(key);
      return {
        ...prev,
        [key]: {
          ...current,
          [type]: current[type].filter((_, idx) => idx !== index),
        },
      };
    });
  };

  const removeExistingReviewImage = (key: string, index: number) => {
    const current = getReviewExistingImages(key);
    const targetUrl = current[index];

    setReviewExistingImages((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((_, idx) => idx !== index),
    }));

    if (targetUrl) {
      setReviewImagesToDelete((prev) => ({
        ...prev,
        [key]: Array.from(new Set([...(prev[key] || []), targetUrl])),
      }));
    }
  };

  const fetchExistingReview = async (
    productId: number,
    userId: number,
    orderIdValue: number,
    knownReviewId?: number
  ) => {
    try {
      const data = await reviewApi.getProductReviews(productId, 0, 200);
      const reviews = data.content || [];
      if (knownReviewId) {
        const byId = reviews.find((review) => review.id === knownReviewId);
        if (byId) return byId;
      }
      return (
        reviews.find(
          (review) =>
            review.userId === userId &&
            (!review.orderId || review.orderId === orderIdValue)
        ) || null
      );
    } catch {
      return null;
    }
  };

  const openReviewModal = async (item: Order['items'][number]) => {
    if (!order) return;
    const key = getReviewKey(order.id, item.productId);
    if (!reviewDrafts[key]) {
      setReviewDrafts((prev) => ({
        ...prev,
        [key]: { rating: 0, title: '', body: '' },
      }));
    }
    setReviewAttachments((prev) => ({
      ...prev,
      [key]: { images: [], videos: [] },
    }));
    if (item.reviewId && !reviewIds[key]) {
      setReviewIds((prev) => ({ ...prev, [key]: item.reviewId! }));
    }
    setReviewModal({ item });

    const existing = await fetchExistingReview(
      item.productId,
      order.userId,
      order.id,
      item.reviewId || getReviewId(key)
    );
    if (existing) {
      setReviewIds((prev) => ({ ...prev, [key]: existing.id }));
      setReviewExistingImages((prev) => ({
        ...prev,
        [key]: mapExistingReviewImages(existing),
      }));
      setReviewImagesToDelete((prev) => ({ ...prev, [key]: [] }));
      setReviewDrafts((prev) => ({
        ...prev,
        [key]: {
          rating: existing.rating || 0,
          title: existing.title || '',
          body: existing.body || '',
        },
      }));
    } else {
      setReviewExistingImages((prev) => ({ ...prev, [key]: [] }));
      setReviewImagesToDelete((prev) => ({ ...prev, [key]: [] }));
    }
  };

  const closeReviewModal = () => {
    setReviewModal(null);
  };

  const handleSubmitReview = async (item: Order['items'][number]) => {
    if (!order) return;
    const key = getReviewKey(order.id, item.productId);
    const draft = getReviewDraft(key);
    if (!draft.rating || draft.rating < 1) {
      return;
    }
    if (!draft.body.trim()) {
      return;
    }

    setReviewSubmitting((prev) => ({ ...prev, [key]: true }));
    try {
      const attachments = getReviewAttachments(key);
      const imagesToDelete = getReviewImagesToDelete(key);
      let existingId = getReviewId(key);
      if (!existingId) {
        const existing = await fetchExistingReview(
          item.productId,
          order.userId,
          order.id,
          item.reviewId
        );
        if (existing) {
          existingId = existing.id;
          setReviewIds((prev) => ({ ...prev, [key]: existing.id }));
        }
      }

      let persistedReviewId: number | null = null;
      let persistedImages: string[] = [];
      if (existingId) {
        const updated = await reviewApi.updateReview(
          existingId,
          {
            userId: order.userId,
            rating: draft.rating,
            title: draft.title.trim() || item.productName || 'Review',
            body: draft.body.trim(),
            imagesToDelete,
            videosToDelete: [],
          },
          attachments.images,
          attachments.videos
        );
        persistedReviewId = updated.id;
        persistedImages = mapExistingReviewImages(updated);
      } else {
        const created = await reviewApi.createReview(
          {
            userId: order.userId,
            productId: item.productId,
            orderId: order.id,
            rating: draft.rating,
            title: draft.title.trim() || item.productName || 'Review',
            body: draft.body.trim(),
          },
          attachments.images,
          attachments.videos
        );
        persistedReviewId = created.id;
        persistedImages = mapExistingReviewImages(created);
      }

      if (persistedReviewId) {
        setReviewIds((prev) => ({ ...prev, [key]: persistedReviewId as number }));
      }
      if (persistedImages.length === 0) {
        const refreshed = await fetchExistingReview(
          item.productId,
          order.userId,
          order.id,
          persistedReviewId || existingId || item.reviewId
        );
        persistedImages = refreshed ? mapExistingReviewImages(refreshed) : [];
      }
      setReviewExistingImages((prev) => ({
        ...prev,
        [key]: persistedImages,
      }));
      setReviewImagesToDelete((prev) => ({ ...prev, [key]: [] }));
      setReviewDrafts((prev) => ({
        ...prev,
        [key]: {
          rating: draft.rating,
          title: draft.title,
          body: draft.body,
        },
      }));
      setReviewAttachments((prev) => ({
        ...prev,
        [key]: { images: [], videos: [] },
      }));
      setReviewModal(null);
    } finally {
      setReviewSubmitting((prev) => ({ ...prev, [key]: false }));
    }
  };

  useEffect(() => {
    const isModalOpen = reviewModal !== null;
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [reviewModal]);

  useEffect(() => {
    if (!order || order.status !== 'DELIVERED') return;
    let active = true;
    const loadExistingReviews = async () => {
      const updates: Record<string, number> = {};
      const drafts: Record<string, { rating: number; title: string; body: string }> = {};
      const existingImages: Record<string, string[]> = {};

      await Promise.all(
        order.items.map(async (item) => {
          const key = getReviewKey(order.id, item.productId);
          if (reviewIds[key]) return;
          const existing = await fetchExistingReview(
            item.productId,
            order.userId,
            order.id,
            item.reviewId
          );
          if (existing) {
            updates[key] = existing.id;
            existingImages[key] = mapExistingReviewImages(existing);
            if (!reviewDrafts[key]) {
              drafts[key] = {
                rating: existing.rating,
                title: existing.title || '',
                body: existing.body || '',
              };
            }
          }
        })
      );

      if (!active) return;
      if (Object.keys(updates).length) {
        setReviewIds((prev) => ({ ...prev, ...updates }));
      }
      if (Object.keys(existingImages).length) {
        setReviewExistingImages((prev) => ({ ...prev, ...existingImages }));
      }
      if (Object.keys(drafts).length) {
        setReviewDrafts((prev) => ({ ...prev, ...drafts }));
      }
    };

    loadExistingReviews();
    return () => {
      active = false;
    };
  }, [order?.id, order?.status]);

  return (
    <div className="min-h-screen bg-[#F6F4EC] text-dark-900">
      <Navbar />
      <div className="mx-auto w-full max-w-5xl px-4 py-8 space-y-6">
        <button
          type="button"
          onClick={() => navigate('/dashboard', { state: { tab: 'orders' } })}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B7D60] hover:underline"
        >
          <FiArrowLeft size={16} />
          Back to Orders
        </button>

        {loading && <p className="text-sm text-dark-500">Loading order details...</p>}
        {!loading && error && <p className="text-sm text-red-500">{error}</p>}

        {!loading && !error && order && (
          <>
            <div className="rounded-2xl border border-[#E6E2D6] bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl bg-[#F2F0E8] overflow-hidden flex items-center justify-center">
                    <img
                      src={getOrderImageUrl(firstItem?.productImage)}
                      alt={firstItem?.productName || 'Order item'}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-dark-700">{orderLabel}</span>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-dark-900">
                      {firstItem?.productName || 'Order items'}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-dark-500">
                      <span>{dateLabel}</span>
                      <span className="font-semibold text-dark-700">
                        {formatINR(order.totalAmount)}
                      </span>
                    </div>
                    <p className="text-xs text-dark-500">
                      Size: {firstItem?.selectedSize || '—'} · Color:{' '}
                      {firstItem?.selectedColor || '—'} · Qty:{' '}
                      {firstItem?.quantity ?? '—'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
                <div className="rounded-2xl border border-[#E6E2D6] bg-white p-5">
                  <p className="text-xs text-dark-500">CURRENT STATUS</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.replace(/_/g, ' ')}
                    </span>
                    {order.trackingNumber && (
                      <span className="text-xs text-dark-500">
                        Tracking: {order.trackingNumber}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                  <div className="rounded-xl border border-[#E6E2D6] bg-white p-4 h-full min-h-[220px]">
                    <p className="text-xs font-semibold tracking-widest text-dark-500">
                      ABOUT PRODUCT
                    </p>
                    <p className="mt-2 text-xs text-dark-500">
                      Size: {firstItem?.selectedSize || '—'} · Color:{' '}
                      {firstItem?.selectedColor || '—'} · Qty:{' '}
                      {firstItem?.quantity ?? '—'}
                    </p>
                    <p className="mt-4 text-xs font-semibold tracking-widest text-dark-500">
                      SHIPPING ADDRESS
                    </p>
                    <p className="mt-2 text-sm text-dark-700 whitespace-pre-line">
                      {order.shippingAddress}
                    </p>
                    <p className="mt-2 text-xs text-dark-500">
                      Phone: {order.userPhone || '—'}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#E6E2D6] bg-white p-4 h-full min-h-[220px]">
                    <p className="text-xs font-semibold tracking-widest text-dark-500">
                      ORDER SUMMARY
                    </p>
                    {(() => {
                      const orderTax = Number(order.tax || 0);
                      const orderDiscount = Number(order.discount || 0);
                      const orderTotal = Number(order.totalAmount || 0);
                      const rawSubtotal = orderTotal - orderTax + orderDiscount;
                      const subtotal = Number.isFinite(rawSubtotal) ? rawSubtotal : orderTotal;
                      const rawPaymentMode =
                        (order as any).paymentMethod ||
                        (order as any).paymentMode ||
                        (order as any).paymentType;
                      const paymentMode = rawPaymentMode
                        ? String(rawPaymentMode).replace(/_/g, ' ')
                        : 'Online';
                      return (
                        <div className="mt-3 space-y-2 text-sm text-dark-600">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{formatINR(subtotal)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="text-[#6B7D60]">Free</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax</span>
                            <span>{formatINR(orderTax)}</span>
                          </div>
                          <div className="border-t border-[#E6E2D6] pt-2 flex justify-between font-semibold text-dark-900">
                            <span>Total</span>
                            <span>{formatINR(orderTotal)}</span>
                          </div>
                          <div className="text-xs text-dark-500">
                            Payment Mode: {paymentMode}
                          </div>
                          <div className="text-xs text-dark-500">
                            Payment Status: {order.paymentStatus.replace(/_/g, ' ')}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                <div className="rounded-2xl border border-[#E6E2D6] bg-white p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold tracking-widest text-dark-500">
                      ORDER TIMELINE
                    </h3>
                    {timelineLoading && (
                      <span className="text-xs text-dark-400">Loading...</span>
                    )}
                  </div>
                  <ol className="mt-4 space-y-6">
                    {timelineSteps.map((step, index) => {
                      const event = eventMap.get(step.key);
                      const eventDate = event ? new Date(event.timestamp) : null;
                      const isValid = !!eventDate && !Number.isNaN(eventDate.getTime());
                      const timeLabel = event
                        ? isValid
                          ? format(eventDate as Date, 'dd MMM yyyy, hh:mm a')
                          : event?.timestamp
                        : index < currentIndex
                        ? 'Completed'
                        : index === currentIndex
                        ? 'In progress'
                        : 'Pending';
                      const isDone = index <= currentIndex;
                      const isLineActive = index < currentIndex;
                      const isLast = index === timelineSteps.length - 1;
                      const Icon = timelineIcons[step.key] || FiPackage;
                      return (
                        <li key={step.key} className="relative pl-10">
                          {!isLast && (
                            <span
                              className={`absolute left-[11px] top-6 h-full w-0.5 ${
                                isLineActive ? 'bg-[#6B7D60]' : 'bg-[#D8D4C7]'
                              }`}
                            />
                          )}
                          <span
                            className={`absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border ${
                              isDone
                                ? 'bg-[#E6EFE2] border-[#6B7D60] text-[#6B7D60]'
                                : 'bg-white border-[#D8D4C7] text-dark-400'
                            }`}
                          >
                            <Icon size={14} />
                          </span>
                          <div>
                            <p
                              className={`text-sm font-semibold ${
                                isDone ? 'text-dark-900' : 'text-dark-400'
                              }`}
                            >
                              {step.label}
                            </p>
                            <p
                              className={`text-xs ${
                                isDone ? 'text-dark-500' : 'text-dark-400'
                              }`}
                            >
                              {timeLabel}
                            </p>
                            {event?.message && (
                              <p className="text-xs text-dark-600 mt-1">{event.message}</p>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
                {order.status === 'DELIVERED' && order.items.length > 0 && (
                  <div className="rounded-2xl border border-[#E6E2D6] bg-white p-5 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xs font-semibold tracking-widest text-dark-500">
                          RATE & REVIEW PRODUCTS
                        </h3>
                        <p className="text-xs text-dark-400 mt-1">
                          Share feedback for each item you received.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {order.items.map((item) => {
                        const key = getReviewKey(order.id, item.productId);
                        const existingReviewId = getReviewId(key);
                        return (
                          <div
                            key={item.id}
                            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E6E2D6] bg-white p-4"
                          >
                            <div className="flex items-center gap-4">
                              <div className="h-14 w-14 rounded-xl bg-[#F2F0E8] overflow-hidden flex items-center justify-center">
                                <img
                                  src={getOrderImageUrl(item.productImage)}
                                  alt={item.productName}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-dark-900">
                                  {item.productName}
                                </p>
                                <p className="text-xs text-dark-500 mt-1">
                                  Qty: {item.quantity}
                                  {item.selectedSize ? ` · Size: ${item.selectedSize}` : ''}
                                  {item.selectedColor ? ` · Color: ${item.selectedColor}` : ''}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => openReviewModal(item)}
                              className="btn-primary"
                            >
                              {existingReviewId ? 'Edit Review' : 'Write Review'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
            </div>
          </>
        )}
      </div>

      {reviewModal && order &&
        (() => {
          const key = getReviewKey(order.id, reviewModal.item.productId);
          const draft = getReviewDraft(key);
          const attachments = getReviewAttachments(key);
          const existingImages = getReviewExistingImages(key);
          const isSubmitting = !!reviewSubmitting[key];
          const existingReviewId = getReviewId(key);
          const previewImage = getOrderImageUrl(reviewModal.item.productImage);

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
              <div className="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-xl border border-[#E6E2D6] flex flex-col">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E2D6]">
                  <h3 className="text-sm font-semibold tracking-widest text-dark-700">
                    WRITE REVIEW
                  </h3>
                  <button
                    type="button"
                    onClick={closeReviewModal}
                    className="text-dark-500 hover:text-dark-700"
                  >
                    &times;
                  </button>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4">
                  <div className="rounded-xl border border-[#E6E2D6] bg-white p-4 flex flex-wrap gap-4">
                    <div className="h-20 w-20 rounded-xl bg-[#F2F0E8] overflow-hidden flex items-center justify-center">
                      <img
                        src={previewImage}
                        alt={reviewModal.item.productName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-dark-900">
                        {reviewModal.item.productName}
                      </p>
                      <div className="mt-2 flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => updateReviewDraft(key, { rating: star })}
                            className="p-1"
                            aria-label={`Rate ${star} stars`}
                          >
                            <FiStar
                              size={18}
                              className={
                                draft.rating >= star
                                  ? 'text-[#6B7D60] fill-[#6B7D60]'
                                  : 'text-dark-300'
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <textarea
                    placeholder="Please write product review here."
                    value={draft.body}
                    onChange={(e) => updateReviewDraft(key, { body: e.target.value })}
                    className="input-field h-40 resize-none"
                  />

                  <div className="flex flex-wrap items-center gap-3">
                    <label className="relative h-14 w-14 rounded-lg border border-dashed border-[#CFC8B4] bg-[#F9F8F4] flex items-center justify-center cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) =>
                          updateReviewAttachments(key, 'images', e.target.files || [])
                        }
                      />
                      <FiImage size={18} className="text-dark-400" />
                    </label>
                    {existingImages.map((imageUrl, index) => (
                      <div
                        key={`existing-${imageUrl}-${index}`}
                        className="relative h-14 w-14 overflow-visible"
                        title="Already uploaded"
                      >
                        <div className="h-full w-full rounded-lg overflow-hidden border border-[#E6E2D6] bg-white">
                          <img
                            src={getOrderImageUrl(imageUrl)}
                            alt="Existing review"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExistingReviewImage(key, index)}
                          className="absolute -top-2 -right-2 z-20 h-5 w-5 rounded-full bg-[#6B7D60] text-white flex items-center justify-center shadow ring-2 ring-white"
                          aria-label="Remove existing photo"
                        >
                          <FiX size={12} />
                        </button>
                      </div>
                    ))}
                    {attachments.images.map((file, index) => (
                      <div key={`${file.name}-${index}`} className="relative h-14 w-14 overflow-visible">
                        <div className="h-full w-full rounded-lg overflow-hidden border border-[#E6E2D6] bg-white">
                          <img
                            src={URL.createObjectURL(file)}
                            alt="Review upload"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeReviewAttachment(key, 'images', index)}
                          className="absolute -top-2 -right-2 z-20 h-5 w-5 rounded-full bg-[#6B7D60] text-white flex items-center justify-center shadow ring-2 ring-white"
                          aria-label="Remove photo"
                        >
                          <FiX size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-[#E6E2D6] flex flex-wrap gap-3">
                  <button type="button" onClick={closeReviewModal} className="btn-ghost">
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSubmitReview(reviewModal.item)}
                    disabled={isSubmitting}
                    className="btn-primary disabled:opacity-50"
                  >
                    {isSubmitting
                      ? 'Submitting...'
                      : existingReviewId
                      ? 'Update Review'
                      : 'Submit Review'}
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
    </div>
  );
};

export default OrderDetailsPage;
