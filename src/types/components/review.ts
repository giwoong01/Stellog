export interface Review {
  id: number;
  starbucksId: number;
  title: string;
  content: string;
  createdAt: string;
  visitedAt: string;
  author: string;
  mainImgUrl: string;
  isAuthor: boolean;
  isLike: boolean;
  likeCount: number;
}

export interface ReviewListProps {
  reviews: Review[];
  onSelectReview: (review: Review) => void;
  isRoom?: boolean;
  isLoading?: boolean;
  locationId?: number;
  onToggleLike?: (reviewId: number, isLike: boolean) => void;
  likeLoadingId?: number | null;
}

export interface ReviewDetailProps {
  review: Review;
  onBack: () => void;
  isRoom?: boolean;
  onDelete?: (reviewId: number) => void;
  onToggleLike?: (reviewId: number, isLike: boolean) => void;
  likeLoadingId?: number | null;
}

export interface DatePickerInputProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
}
