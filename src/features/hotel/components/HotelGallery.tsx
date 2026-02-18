import { useMemo, useState, useEffect, useCallback } from "react";
import {
  Box,
  Dialog,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
  Fade,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

type Props = {
  items: { url: string }[];
};

export default function HotelGallery({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const cols = isMd ? 4 : isSm ? 3 : 2;

  const urls = useMemo(() => items.map((x) => x.url).filter(Boolean), [items]);
  const hasImages = urls.length > 0;

  const handleOpen = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : urls.length - 1));
  }, [urls.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev < urls.length - 1 ? prev + 1 : 0));
  }, [urls.length]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, goToPrevious, goToNext]);

  if (!hasImages) {
    return null;
  }

  return (
    <Box>
      <ImageList
        cols={cols}
        gap={12}
        sx={{
          mb: 0,
          "& .MuiImageListItem-root": {
            overflow: "hidden",
            borderRadius: 3,
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.04)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            },
          },
        }}
      >
        {urls.map((url, index) => (
          <ImageListItem key={url} onClick={() => handleOpen(index)}>
            <img
              src={url}
              alt={`Hotel image ${index + 1}`}
              loading="lazy"
              style={{
                borderRadius: 12,
                objectFit: "cover",
                aspectRatio: "4/3",
                width: "100%",
                height: "100%",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "rgba(0,0,0,0.25)",
                opacity: 0,
                transition: "opacity 0.3s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": { opacity: 1 },
              }}
            >
              <ZoomInIcon sx={{ color: "white", fontSize: 40 }} />
            </Box>
          </ImageListItem>
        ))}
      </ImageList>

      {/* Full-screen  */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={false}
        sx={{
          "& .MuiDialog-paper": {
            m: 0,
            width: "100vw",
            maxWidth: "96vw",
            height: "94vh",
            maxHeight: "94vh",
            backgroundColor: "#000",
            borderRadius: { xs: 0, sm: 4 },
            overflow: "hidden",
            boxShadow: "none",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Close button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              zIndex: 10,
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Navigation arrows */}
          {urls.length > 1 && (
            <>
              <IconButton
                onClick={goToPrevious}
                sx={{
                  position: "absolute",
                  left: { xs: 8, sm: 24 },
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.4)",
                  zIndex: 10,
                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>

              <IconButton
                onClick={goToNext}
                sx={{
                  position: "absolute",
                  right: { xs: 8, sm: 24 },
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.4)",
                  zIndex: 10,
                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </>
          )}
          <Fade in={open} timeout={400} key={activeIndex}>
            <Box
              component="img"
              src={urls[activeIndex]}
              alt={`Hotel image ${activeIndex + 1}`}
              sx={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: 2,
                boxShadow: "0 0 40px rgba(0,0,0,0.6)",
              }}
            />
          </Fade>

          {/* Counter */}
          {urls.length > 1 && (
            <Typography
              sx={{
                position: "absolute",
                bottom: 24,
                color: "white",
                bgcolor: "rgba(0,0,0,0.6)",
                px: 2.5,
                py: 1,
                borderRadius: 20,
                fontWeight: 600,
              }}
            >
              {activeIndex + 1} / {urls.length}
            </Typography>
          )}
        </Box>
      </Dialog>
    </Box>
  );
}
