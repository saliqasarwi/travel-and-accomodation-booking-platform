import { Box, Grid, Stack, Typography } from "@mui/material";
import type { HotelDetails } from "../types/hotel.types";
import type { HotelReview } from "../types/review.types";

type Props = {
  hotel: HotelDetails;
  reviews: HotelReview[];
};

export default function HotelInformation({ hotel }: Props) {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        p: { xs: 3, md: 4 },
        boxShadow: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack spacing={5}>
        {hotel.description && (
          <Box>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              About the hotel
            </Typography>
            <Typography variant="body1" lineHeight={1.8}>
              {hotel.description}
            </Typography>
          </Box>
        )}
        {hotel.amenities?.length > 0 && (
          <Box>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Amenities
            </Typography>
            <Grid container spacing={3}>
              {hotel.amenities.map((amenity) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4 }}
                  key={amenity.id ?? amenity.name}
                >
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      bgcolor: "action.hover",
                      height: "100%",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: "action.selected",
                        transform: "translateY(-4px)",
                        boxShadow: 3,
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      gutterBottom
                    >
                      {amenity.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {amenity.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
