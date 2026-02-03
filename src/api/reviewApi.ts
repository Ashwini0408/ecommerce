import axiosInstance from "./axios";

export interface Review {
  id: number;
  title: string;
  body: string;
  rating: number;
  createdAt: string;
  imageUrls: string[];
  videoUrls: string[];
}

export interface ReviewPageResponse {
  content: Review[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  last: boolean;
}

const reviewApi = {
  getProductReviews: (productId: number, page = 0, size = 5) =>
    axiosInstance.get<ReviewPageResponse>(
      `/api/reviews/product/${productId}?page=${page}&size=${size}`
    ),
};

export default reviewApi;
