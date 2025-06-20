export interface Route {
  name: string;
  isOwner: boolean;
  bookmarkCount: number;
  starbucksList: Starbucks[];
}

export interface Starbucks {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export interface RouteCreateRequest {
  name: string;
  starbucksIds: number[];
}

export interface RouteUpdateRequest {
  name: string;
  starbucksIds: number[];
}
