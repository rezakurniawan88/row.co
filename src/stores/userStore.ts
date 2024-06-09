import { create } from "zustand";

type UserDataProps = {
        email: string;
        exp: number;
        iat: number;
        profile_picture_url: string;
        role: string;
        userId: number | null;
        username: string;
}

type TUserStore = {
    userData: UserDataProps;
    setUserData: (data: UserDataProps) => void;
    modalOpen: boolean;
    setModalOpen: (data: boolean) => void;
    editMode: boolean;
    setEditMode: (data: boolean) => void;
    dataUserById: {},
    setDataUserById: (data: object) => void;
}

const useUserStore = create<TUserStore>((set) => ({
    userData: {
        email: "",
        exp: 0,
        iat: 0,
        profile_picture_url: "",
        role: "",
        userId: 0,
        username: ""
    },
    setUserData: (data) => set({ userData: data }),
    modalOpen: false,
    setModalOpen: (data) => set({ modalOpen: data}),
    editMode: false,
    setEditMode: (data) => set({ editMode: data}),
    dataUserById: {},
    setDataUserById: (data) => set({ dataUserById: data }),
}))

export default useUserStore;