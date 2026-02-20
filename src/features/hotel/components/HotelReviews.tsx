import { Avatar, Box, Rating, Stack, Typography } from "@mui/material";
import type { HotelReview } from "../types/review.types";

interface HotelReviewsSectionProps {
  reviews: HotelReview[];
}

export default function HotelReviewsSection({
  reviews,
}: HotelReviewsSectionProps) {
  if (reviews.length === 0) {
    return (
      <Box>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Guest Reviews
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          No reviews yet. Be the first to share your experience!
        </Typography>
      </Box>
    );
  }

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        justifyContent="space-between"
        flexWrap="wrap"
        sx={{ mb: 4 }}
      >
        <Typography variant="h5" fontWeight={700}>
          Guest Reviews
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Typography variant="body2" color="text.secondary">
            Average Rating:
          </Typography>
          <Rating
            value={avgRating}
            precision={0.1}
            readOnly
            size="large"
            sx={{ color: "gold" }}
          />
          <Typography variant="h6" fontWeight={700}>
            {avgRating.toFixed(1)}
          </Typography>
          <Typography color="text.secondary" variant="body1">
            ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
          </Typography>
        </Stack>
      </Stack>

      <Stack spacing={3}>
        {reviews.map((review) => (
          <Box
            key={review.reviewId}
            sx={{
              p: { xs: 2.5, md: 3.5 },
              borderRadius: 3,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: 1,
              transition: "all 0.2s ease",
              "&:hover": {
                boxShadow: 4,
                borderColor: "primary.light",
              },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ mb: 2 }}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 48,
                  height: 48,
                  fontSize: "1.25rem",
                  fontWeight: 600,
                }}
              >
                {review.customerName?.[0]?.toUpperCase() || "?"}
              </Avatar>

              <Box>
                <Typography variant="subtitle1" fontWeight={700}>
                  {review.customerName || "Anonymous"}
                </Typography>
                <Rating
                  value={review.rating}
                  readOnly
                  size="small"
                  sx={{ mt: 0.5 }}
                />
              </Box>
            </Stack>

            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.7,
                fontStyle: "italic",
                color: "text.primary",
              }}
            >
              "{review.description}"
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
