import { Avatar, Box, Rating, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { HotelReview } from "../types/review.types";

interface HotelReviewsSectionProps {
  reviews: HotelReview[];
}

export default function HotelReviewsSection({
  reviews,
}: HotelReviewsSectionProps) {
  const { t } = useTranslation();

  if (reviews.length === 0) {
    return (
      <Box
        sx={{
          p: 2,
          borderRadius: 1,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
          maxHeight: "false",
        }}
      >
        <Typography variant="h6" fontWeight={800} gutterBottom sx={{ mb: 8 }}>
          {t("hotel.guestReviews")}
        </Typography>
        <Typography color="text.secondary">{t("hotel.noReviews")}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Stack
        spacing={2}
        direction="column"
        alignItems={{ xs: "flex-start", md: "flex-start" }}
        justifyContent="space-between"
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.75rem", md: "2rem" },
            lineHeight: 1.05,
            background: "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 10,
          }}
        >
          {t("hotel.guestReviews")}
        </Typography>

        {reviews.map((review) => (
          <Box
            key={review.reviewId}
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
            }}
          >
            <Stack direction="row" spacing={1.5} sx={{ mb: 1.5 }}>
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 42,
                  height: 42,
                  fontSize: "1rem",
                  fontWeight: 700,
                }}
              >
                {review.customerName?.[0]?.toUpperCase() || "?"}
              </Avatar>

              <Box>
                <Typography variant="subtitle1" fontWeight={700}>
                  {review.customerName || t("hotel.anonymous")}
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
                lineHeight: 1.8,
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
