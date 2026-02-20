import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import type { AvailableRoom } from "../types/room.types";

type Props = {
  rooms: AvailableRoom[];
  onAddToCart: (room: AvailableRoom) => void;
};

export default function HotelRoomsSection({ rooms, onAddToCart }: Props) {
  return (
    <Stack spacing={2}>
      <Typography variant="h6" fontWeight={800}>
        Available Rooms
      </Typography>

      {rooms.length === 0 ? (
        <Typography color="text.secondary">No available rooms.</Typography>
      ) : (
        <Stack spacing={2}>
          {rooms.map((room) => {
            return (
              <Card key={room.roomId} sx={{ borderRadius: 3 }} elevation={2}>
                <Stack direction={{ xs: "column", md: "row" }}>
                  <CardMedia
                    component="img"
                    image={room.roomPhotoUrl}
                    alt={room.roomType}
                    sx={{
                      width: { md: 260 },
                      height: { xs: 180, md: "auto" },
                      objectFit: "cover",
                    }}
                  />

                  <CardContent sx={{ flex: 1 }}>
                    <Stack spacing={1}>
                      <Typography variant="h6" fontWeight={900}>
                        {room.roomType} (#{room.roomNumber})
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Capacity: {room.capacityOfAdults} adults •{" "}
                        {room.capacityOfChildren} children
                      </Typography>

                      {room.amenities?.length > 0 && (
                        <Typography variant="body2" color="text.secondary">
                          Amenities:{" "}
                          {room.amenities.map((a) => a.name).join(" • ")}
                        </Typography>
                      )}

                      <Typography variant="h6" fontWeight={900}>
                        ${room.price} / night
                      </Typography>

                      <Button
                        variant="contained"
                        disabled={!room.availability}
                        onClick={() => onAddToCart(room)}
                      >
                        {room.availability ? "Add to cart" : "Not available"}
                      </Button>
                    </Stack>
                  </CardContent>
                </Stack>
              </Card>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}
