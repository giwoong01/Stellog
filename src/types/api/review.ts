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

export interface ReviewCreateRequest {
  title: string;
  content: string;
  starbucksId: number;
}

export interface ReviewUpdateRequest {
  title: string;
  content: string;
}
