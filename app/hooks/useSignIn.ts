import { create } from "zustand";
import { useSignUpProps } from "../types/types";


const useSignIn = create<useSignUpProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useSignIn;