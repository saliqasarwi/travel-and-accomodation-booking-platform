import { useEffect, useState } from "react";
import axios from "axios";

import { fetchAmenities } from "../api/search.api";
import type { Amenity } from "../types/types";

export function useAmenities() {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadAmenities() {
      try {
        setLoading(true);
        setError(null);

        const list = await fetchAmenities(controller.signal);
        setAmenities(list);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError("Failed to load amenities");
      } finally {
        setLoading(false);
      }
    }

    loadAmenities();

    return () => controller.abort();
  }, []);

  return {
    amenities,
    loading,
    error,
  };
}
