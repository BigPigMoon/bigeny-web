import { create, createStore } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface TokenStore {
  access: string;
  refresh: string;
}

export const useToken = createStore<TokenStore>()(
  devtools(
    persist(
      () => ({
        access: "",
        refresh: "",
      }),
      { name: "token-storage" }
    )
  )
);

// TODO: store self user id
// interface UserId {
//   id: number;
//   setId: (id: number) => void;
// }

// export const useUserId = create<UserId>()((set) => ({
//   id: 0,
//   setId: (id: number) => set((state) => ({ id: id })),
// }));

export enum DarkLightTheme {
  light = "light",
  dark = "dark",
}

export interface Theme {
  theme: DarkLightTheme;
  swithTheme: () => void;
}

export const useTheme = create<Theme>()(
  persist(
    (set) => ({
      theme: DarkLightTheme.light,
      swithTheme: () =>
        set((state) => ({
          theme:
            state.theme === DarkLightTheme.dark
              ? DarkLightTheme.light
              : DarkLightTheme.dark,
        })),
    }),
    { name: "theme" }
  )
);
