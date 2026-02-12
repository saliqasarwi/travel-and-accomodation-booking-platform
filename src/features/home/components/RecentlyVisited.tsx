import { useEffect, useState } from "react";
import { getRecentHotels } from "../api/home.api";
import type { RecentHotel } from "../types/home.types";
import { parseApiError } from "@shared/api";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
export default function RecentlyVisited() {
  const [data, setData] = useState<RecentHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setError(null);
        setLoading(true);

        // backend demo uses userId=2
        const res = await getRecentHotels(2);

        if (!cancelled) setData(res);
      } catch (e) {
        if (!cancelled) setError(parseApiError(e).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div>Loading recently visited hotels…</div>;
  if (error) return <div style={{ color: "crimson" }}>{error}</div>;
  return (
    <section>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Recently Visited
      </Typography>

      <Box
        component="ul"
        sx={{
          listStyle: "none",
          p: 0,
          m: 0,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        {data.map((x) => (
          <Box component="li">
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={x.thumbnailUrl}
                alt={x.cityName}
              />
              <CardContent>
                <Typography fontWeight={700}>{x.cityName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Visit Date: {x.visitDate}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </section>
  );
}
