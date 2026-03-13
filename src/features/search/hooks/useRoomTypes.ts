import { useEffect, useState } from "react";
import axios from "axios";

import { fetchSearchResults } from "../api/search.api";
import type { HotelSearchItem } from "../types/types";

type Params = {
  city?: string;
  checkInDate?: string;
  checkOutDate?: string;
  adults?: number;
  children?: number;
  numberOfRooms?: number;
};

export function useRoomTypes(params: Params) {
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRoomTypes() {
      try {
        setLoading(true);
        setError(null);

        const baseResults: HotelSearchItem[] = await fetchSearchResults(
          params,
          controller.signal
        );

        const types = Array.from(
          new Set(
            baseResults
              .map((r) => r.roomType)
              .filter(
                (t): t is string => typeof t === "string" && t.trim().length > 0
              )
          )
        ).sort((a, b) => a.localeCompare(b));

        setRoomTypes(types);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError("Failed to load room types");
      } finally {
        setLoading(false);
      }
    }

    loadRoomTypes();

    return () => controller.abort();
  }, [
    params.city,
    params.checkInDate,
    params.checkOutDate,
    params.adults,
    params.children,
    params.numberOfRooms,
  ]);

  return {
    roomTypes,
    loading,
    error,
  };
}
