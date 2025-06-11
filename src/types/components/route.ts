export interface Route {
  id: number;
  name: string;
  isOwner: boolean;
  isBookmarked: boolean;
  bookmarkCount: number;
  starbucksList: Starbucks[];
}

export interface Starbucks {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export interface Room {
  roomId: number;
  roomName: string;
  routes: Route[];
}

export interface RouteGridProps {
  currentPage: number;
  routes: Route[];
  onClick: (routeId: number) => void;
  showAddButton?: boolean;
}

export interface RouteCardProps {
  route: Route;
  onClick: () => void;
}

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

export interface BaseProps {
  locations: Location[];
  onRemove?: (name: string) => void;
  showButtons?: boolean;
  onSave?: () => void;
  onEdit?: () => void;
}

export interface OptimizedProps extends BaseProps {
  isOptimized: true;
  optimizedLocations: Location[];
}

export interface NotOptimizedProps extends BaseProps {
  isOptimized: false;
  optimizedLocations?: Location[];
}

export type Props = OptimizedProps | NotOptimizedProps;
