import { create } from "zustand";
import { modalControProps } from "../types/types";


const useSignUp = create<modalControProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useSignUp;