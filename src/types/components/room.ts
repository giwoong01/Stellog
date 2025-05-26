export interface Room {
  roomId: number;
  roomName: string;
  roomMembers: {
    id: number;
    name: string;
  };
}

export interface Rooms {
  roomId: number;
  roomName: string;
  memberCount: number;
  visitedStarbucksCount: number;
}

export interface RoomGridProps {
  currentPage: number;
  rooms: Rooms[];
}

export interface RoomCardProps {
  roomName: string;
  visitedStarbucksCount: number;
  memberCount: number;
  onClick: () => void;
}

export interface RoomTitleProps {
  roomId: number;
  title: string;
}
