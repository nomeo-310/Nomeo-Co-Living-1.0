import { create } from "zustand";
import { modalControProps } from "../types/types";


const useSignIn = create<modalControProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useSignIn;