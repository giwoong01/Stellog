export interface Rooms {
  roomId: number;
  roomName: string;
  memberCount: number;
  visitedStarbucksCount: number;
}

export interface Room {
  roomId: number;
  roomName: string;
  roomMembers: {
    id: number;
    name: string;
  }[];
  ownerId: number;
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
