import { httpClient } from "@shared/api";
import type {
  FeaturedDeal,
  HomeSearchParams,
  HomeSearchResult,
  RecentHotel,
  TrendingDestination,
} from "../types/home.types";

export async function searchHome(params: HomeSearchParams) {
  const res = await httpClient.get<HomeSearchResult[]>("/home/search", {
    params,
  });
  return res.data;
}

export async function getFeaturedDeals() {
  const res = await httpClient.get<FeaturedDeal[]>("/home/featured-deals");
  return res.data;
}

export async function getRecentHotels(userId: number) {
  const res = await httpClient.get<RecentHotel[]>(
    `/home/users/${userId}/recent-hotels`
  );
  return res.data;
}

export async function getTrendingDestinations() {
  const res = await httpClient.get<TrendingDestination[]>(
    "/home/destinations/trending"
  );
  return res.data;
}
