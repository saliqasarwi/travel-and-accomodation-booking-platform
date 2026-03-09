import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import type { RecentHotel } from "../types/home.types";

type Props = {
  items: RecentHotel[];
};

export default function RecentlyVisited({ items }: Props) {
  if (items.length === 0) {
    return (
      <Typography color="text.secondary">
        No recently visited hotels available.
      </Typography>
    );
  }

  return (
    <Box component="section">
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
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
        {items.map((item) => (
          <Box component="li" key={item.hotelId}>
            <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
              <CardMedia
                component="img"
                height="160"
                image={item.thumbnailUrl}
                alt={item.cityName}
              />
              <CardContent>
                <Typography fontWeight={700}>{item.cityName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Visit Date: {item.visitDate}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
