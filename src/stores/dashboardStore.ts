import { create } from "zustand";

type TDashboardStore = {
    sidebarOpen: boolean;
    setSidebarOpen: (data: boolean) => void;
}

export const useDashboardStore = create<TDashboardStore>((set) => ({
    sidebarOpen: false,
    setSidebarOpen: (data) => set({ sidebarOpen: data}),
}))