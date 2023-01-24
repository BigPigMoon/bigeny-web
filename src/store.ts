import { createStore } from "zustand";
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
