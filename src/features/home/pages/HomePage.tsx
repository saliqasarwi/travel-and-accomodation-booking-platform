import HomeSearchBar from "../components/HomeSearchBar";
import FeaturedDeals from "../components/FeaturedDeals";
import RecentlyVisited from "../components/RecentlyVisited";
import TrendingDestinations from "../components/TrendingDestinations";
export default function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <HomeSearchBar />
      <FeaturedDeals />
      <RecentlyVisited />
      <TrendingDestinations />
    </>
  );
}
