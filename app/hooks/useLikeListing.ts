import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSignIn from "./useSignIn";
import { likeListing, unlikeListing } from "../libs/actions/user.actions";


const useLikeListing = ({listingId, currentUser}: {listingId:any, currentUser:any}) => {
  const router = useRouter();
  const signInUser = useSignIn();

  const alreadyLikeListing = React.useMemo(() => {
    const list:string[] = currentUser?.favouritesId;
    return list?.includes(listingId)
  },[currentUser, listingId]);

  const toggleLikeListing = React.useCallback(async(e:React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (!currentUser) {
      return signInUser.onOpen()
    }

    try {
      if (alreadyLikeListing) {
        await unlikeListing(listingId)
        toast.success('Listing removed from your favourites')
        router.refresh()
      } else {
        await likeListing(listingId)
        toast.success('Listing added to your favourites')
        router.refresh()
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  },[currentUser, alreadyLikeListing, listingId, signInUser, router]);

  return { alreadyLikeListing, toggleLikeListing }
}

export default useLikeListing;