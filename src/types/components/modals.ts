export interface LocationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: {
    id: number;
    name: string;
    address: string;
  } | null;
  isRoom?: boolean;
  roomId?: number;
}
