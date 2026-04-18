import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Chip,
  Box,
  CardActionArea,
  Rating,
} from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useTranslation } from "react-i18next";
import type { HotelSearchItem } from "../types/types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { localizeField } from "@shared/utils/localize";

type Props = {
  hotel: HotelSearchItem;
};

export default function HotelCard({ hotel }: Props) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const checkIn = searchParams.get("checkInDate") ?? "";
  const checkOut = searchParams.get("checkOutDate") ?? "";
  const adults = Number(searchParams.get("adults") ?? 2);
  const children = Number(searchParams.get("children") ?? 0);
  const rooms = Number(searchParams.get("numberOfRooms") ?? 1);

  const onCardClick = () => {
    navigate(`/hotels/${hotel.hotelId}?${searchParams.toString()}`);
  };

  return (
    <Card
      elevation={1}
      sx={{
        overflow: "hidden",
        border: "1px solid",
        borderRadius: 5,
        borderColor: "divider",
        backgroundColor: "background.paper",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
        transition:
          "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 18px 40px rgba(15, 23, 42, 0.12)",
          borderColor: "primary.light",
        },
        "&:hover .hotel-image": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardActionArea onClick={onCardClick} sx={{ display: "block" }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={0}>
          <Box
            sx={{
              width: { xs: "100%", md: 280, lg: 320 },
              minWidth: { md: 280, lg: 320 },
              height: { xs: 220, md: 260 },
              overflow: "hidden",
              position: "relative",
            }}
          >
            <CardMedia
              component="img"
              image={hotel.roomPhotoUrl}
              alt={localizeField(hotel.hotelName, i18n.language)}
              className="hotel-image"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
              }}
            />

            {hotel.discount > 0 && (
              <Chip
                label={t("search.offPercent", { value: hotel.discount })}
                color="success"
                size="small"
                sx={{
                  position: "absolute",
                  left: 16,
                  top: 16,
                  fontWeight: 700,
                  borderRadius: 999,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
                }}
              />
            )}
          </Box>

          <CardContent
            sx={{
              flex: 1,
              p: 2.5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: { md: 260 },
              borderLeft: { md: "1px solid" },
              borderColor: "divider",
              mx: { xs: "auto", md: 0 },
            }}
          >
            <Stack spacing={{ xs: 1.25, md: 1.75 }}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    color: "text.primary",
                    mb: 0.75,
                    lineHeight: 1.2,
                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                  }}
                >
                  {localizeField(hotel.hotelName, i18n.language)}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Rating
                    value={hotel.starRating ?? 0}
                    readOnly
                    size="medium"
                    precision={0.5}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "0.85rem" }}
                  >
                    {t("search.starHotel", { count: hotel.starRating })}
                  </Typography>
                </Stack>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: "primary.main",
                  lineHeight: 1.1,
                }}
              >
                ${hotel.roomPrice} {t("search.perNight")}
              </Typography>

              <Stack direction="row" spacing={0.75} alignItems="center">
                <LocationOnOutlinedIcon
                  sx={{ fontSize: 18, color: "text.secondary" }}
                />
                <Typography variant="body1" color="text.secondary">
                  {localizeField(hotel.roomType, i18n.language)} •{" "}
                  {localizeField(hotel.cityName, i18n.language)}
                </Typography>
              </Stack>

              {checkIn && checkOut && (
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <CalendarMonthOutlinedIcon
                    sx={{ fontSize: 18, color: "text.secondary" }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {checkIn} → {checkOut}
                  </Typography>
                </Stack>
              )}

              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <PeopleOutlineIcon
                    sx={{ fontSize: 18, color: "text.secondary" }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {t("search.adults", { count: adults })}
                    {children > 0
                      ? ` • ${t("search.children", { count: children })}`
                      : ""}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={0.75} alignItems="center">
                  <HotelOutlinedIcon
                    sx={{ fontSize: 18, color: "text.secondary" }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {t("search.rooms", { count: rooms })}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
