import Container from "./components/addons/Container";
import EmptyState from "./components/addons/EmptyState";
import SingleListing from "./components/cards/ListingCard";
import { getCurrentUser } from "./libs/actions/auth.actions";
import { fetchAllListings } from "./libs/actions/listing.actions";

export default async function Home() {
  const listings = await fetchAllListings();
  const currentUser = await getCurrentUser();
  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Exact matches"
        subtitle="Try changing or removing some of your filters"
        showReset
      />
    )
  }
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        { listings.map((item:any) => {
          return (
            <SingleListing 
              key={item.id}
              currentUser={currentUser}
              data={item}
            />
            )
          })
        }
      </div>
    </Container>
  );
}
