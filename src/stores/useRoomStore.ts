import { create } from "zustand";
import {
  Room,
  RoomCreateRequest,
  Rooms,
  RoomUpdateRequest,
} from "../types/api/room";
import {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
} from "../api/room";

interface RoomStore {
  rooms: Rooms[];
  room: Room | null;
  currentRoomId: number | null;
  currentRoomTitle: string | null;
  isLoading: boolean;

  setRooms: () => Promise<void>;
  setRoom: (roomId: number) => Promise<void>;
  createRoom: (room: RoomCreateRequest) => Promise<void>;
  updateRoom: (roomId: number, updatedRoom: RoomUpdateRequest) => Promise<void>;
  deleteRoom: (roomId: number) => Promise<void>;
}

export const useRoomStore = create<RoomStore>((set, get) => ({
  rooms: [],
  room: null,
  currentRoomId: null,
  currentRoomTitle: null,
  isLoading: false,

  setRooms: async () => {
    set({ isLoading: true });
    const response = await getRooms();
    set({ rooms: response, isLoading: false });
  },

  setRoom: async (roomId: number) => {
    const response = await getRoom(roomId);
    set({ room: response });
  },

  createRoom: async (room) => {
    const newRoom = await createRoom(room);
    set((state) => ({ rooms: [...state.rooms, newRoom] }));
  },

  updateRoom: async (roomId, updatedRoom) => {
    const latest = await updateRoom(roomId, updatedRoom);
    set((state) => ({
      rooms: state.rooms.map((room) => (room.id === roomId ? latest : room)),
      room: state.room && state.room.id === roomId ? latest : state.room,
    }));
  },

  deleteRoom: async (roomId) => {
    await deleteRoom(roomId);
    set((state) => ({
      rooms: state.rooms.filter((room) => room.id !== roomId),
    }));
  },
}));
