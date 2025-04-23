import { create } from 'zustand';

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
    setRooms: (rooms: Room[]) => void;
    addRoom: (room: Room) => void;
}

export const useRoomStore = create<RoomStore>((set) => ({
    rooms: [],
    setRooms: (rooms) => set({ rooms }),
    addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
}));