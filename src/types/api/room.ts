export interface Rooms {
  id: number;
  name: string;
  memberCount: number;
  visitedStarbucksCount: number;
}

export interface Room {
  id: number;
  name: string;
  isOwner: boolean;
  roomMembers: {
    id: number;
    name: string;
  }[];
  visitedStarbucksCount: number;
  badges: number[];
  reviews: {
    id: number;
    title: string;
    date: string;
    starbucksName: string;
  }[];
}

export interface RoomCreateRequest {
  name: string;
  isPublic: boolean;
  memberIdList: number[];
}

export interface RoomUpdateRequest {
  name: string;
  isPublic: boolean;
  memberIdList: number[];
}
