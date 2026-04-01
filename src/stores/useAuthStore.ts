import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
    email: string;
    [key: string]: any;
}

interface AuthState {
    user: User | null;
    token: string | null;
    setUser: (data: { user: User; token: string } | null) => void;
}



export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setUser: (data) => {
                if (data) {
                    set({ user: data.user, token: data.token });
                } else {
                    set({ user: null, token: null });
                }
            },
        }),
        {
            name: "auth-storage",
        },
    ),
);