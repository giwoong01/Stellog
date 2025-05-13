import { create } from "zustand";

interface Room {
  id: number;
  title: string;
  members: {
    id: number;
    name: string;
    profileImage: string;
  }[];
  visitsCount: number;
  isPublic: boolean;
}

interface RoomStore {
  rooms: Room[];
  currentRoomId: number | null;
  currentRoomTitle: string | null;
  setRooms: (rooms: Room[]) => void;
  addRoom: (room: Room) => void;
  updateRoom: (updatedRoom: Partial<Room> & { id: number }) => void;
  setCurrentRoomId: (roomId: number | null) => void;
  setCurrentRoomTitle: (roomTitle: string | null) => void;
}

export const useRoomStore = create<RoomStore>((set) => ({
  rooms: [],
  currentRoomId: null,
  currentRoomTitle: null,
  setRooms: (rooms) => set({ rooms }),
  addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
  updateRoom: (updatedRoom) =>
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.id === updatedRoom.id
          ? { ...room, ...updatedRoom, visitsCount: room.visitsCount }
          : room
      ),
    })),
  setCurrentRoomId: (roomId) => set({ currentRoomId: roomId }),
  setCurrentRoomTitle: (roomTitle) => set({ currentRoomTitle: roomTitle }),
}));
