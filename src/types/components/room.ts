export interface Rooms {
  id: number;
  name: string;
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

export interface RoomVisitListProps {
  visits: {
    title: string;
    date: string;
    starbucksName: string;
  }[];
}

export interface Visit {
  title: string;
  date: string;
  starbucksName: string;
}
