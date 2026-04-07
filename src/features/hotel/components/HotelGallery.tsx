import { useMemo, useState, useEffect, useCallback } from "react";
import { Box, Dialog, IconButton, Fade, Stack } from "@mui/material";
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

  const urls = useMemo(() => items.map((x) => x.url).filter(Boolean), [items]);

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
  const mainImage = urls[activeIndex] ?? urls[0];
  return (
    <>
      <Box
        sx={{
          position: "relative",
          borderRadius: 1,
          overflow: "hidden",
          mb: 1.5,
          cursor: "pointer",
        }}
        onClick={() => handleOpen(activeIndex)}
      >
        <Box
          component="img"
          src={mainImage}
          alt="Hotel main"
          sx={{
            width: "100%",
            height: { xs: 240, md: 360 },
            objectFit: "cover",
            display: "block",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(15,23,42,0.16)",
            opacity: 0,
            transition: "opacity 0.25s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": { opacity: 1 },
          }}
        >
          <ZoomInIcon sx={{ color: "white", fontSize: 36 }} />
        </Box>
      </Box>
      <Stack direction="row" spacing={1.25} sx={{ overflowX: "auto", pb: 0.5 }}>
        {urls.map((url, index) => (
          <Box
            key={index}
            onClick={() => setActiveIndex(index)}
            sx={{
              flex: "0 0 auto",
              width: 96,
              height: 72,
              borderRadius: 1,
              overflow: "hidden",
              cursor: "pointer",
              border: "2px solid",
              borderColor:
                index === activeIndex ? "primary.main" : "transparent",
              opacity: index === activeIndex ? 1 : 0.75,
              transition: "all 0.2s ease",
            }}
          >
            <Box
              component="img"
              src={url}
              alt={`Thumbnail ${index + 1}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
        ))}
      </Stack>
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
            height: "90vh",
            maxHeight: "90vh",
            backgroundColor: "background.paper",
            borderRadius: { xs: 0, sm: 1 },
            overflow: "hidden",
            boxShadow: "none",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              zIndex: 10,
            }}
          >
            <CloseIcon />
          </IconButton>

          {urls.length > 1 && (
            <>
              <IconButton
                onClick={goToPrevious}
                sx={{
                  position: "absolute",
                  left: 16,
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.4)",
                  zIndex: 10,
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>

              <IconButton
                onClick={goToNext}
                sx={{
                  position: "absolute",
                  right: 16,
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.4)",
                  zIndex: 10,
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </>
          )}

          <Fade in={open} timeout={300} key={activeIndex}>
            <Box
              component="img"
              src={mainImage}
              alt={`Hotel image ${activeIndex + 1}`}
              sx={{
                maxWidth: "100%",
                maxHeight: "85vh",
                objectFit: "contain",
                borderRadius: 1,
              }}
            />
          </Fade>
        </Box>
      </Dialog>
    </>
  );
}
