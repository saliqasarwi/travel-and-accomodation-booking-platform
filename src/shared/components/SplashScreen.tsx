import { useEffect, useState } from "react";
import { Box, Typography, Container, Fade } from "@mui/material";
import { Flight, Hotel, Map } from "@mui/icons-material";

const TravelSplash = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [animateElements, setAnimateElements] = useState(false);

  useEffect(() => {
    // Using setTimeout to avoid calling setState synchronously within an effect,
    // which fixes the ESLint error
    const animationTimer = setTimeout(() => {
      setAnimateElements(true);
    }, 0);

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Fade in={showSplash} timeout={1000}>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundSize: "400% 400%",
          animation: "gradientBG 15s ease infinite",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          color: "#4f4450ff ",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "URL(https://media.istockphoto.com/id/2152087659/vector/seamless-passport-travel-stamps-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=pYLszDkc6O5wn8lekazPKA1b05oRD-p-LSfyd8_RCsM=)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            pointerEvents: "none",
          }}
        />

        <Container
          maxWidth="sm"
          sx={{ textAlign: "center", position: "relative", zIndex: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              mb: 4,
              opacity: animateElements ? 1 : 0,
              transform: animateElements ? "translateY(0)" : "translateY(50px)",
              transition: "all 0.8s ease-out 0.2s",
            }}
          >
            <Flight
              sx={{
                fontSize: 60,
                animation: "fly 3s ease-in-out infinite",
                "@keyframes fly": {
                  "0%": { transform: "rotate(0deg) translateY(0)" },
                  "50%": { transform: "rotate(50deg) translateY(-100px)" },
                  "100%": { transform: "rotate(50deg) translateY(-100px)" },
                },
              }}
            />
            <Hotel
              sx={{
                fontSize: 60,
                animation: "bounce 3s ease-in-out infinite 1s",
                "@keyframes bounce": {
                  "0%": { transform: "scale(1)" },
                  "100%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.1)" },
                },
              }}
            />
            <Map
              sx={{
                fontSize: 60,
                animation: "pulse 3s ease-in-out infinite 2s",
                "@keyframes pulse": {
                  "0%": { opacity: 0.7 },
                  "100%": { opacity: 0.7 },
                  "50%": { opacity: 1 },
                },
              }}
            />
          </Box>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 900,
              fontSize: 60,
              letterSpacing: 4,
              mb: 2,
              textTransform: "uppercase",
              opacity: animateElements ? 1 : 0,
              transform: animateElements ? "scale(1)" : "scale(0.9)",
              transition: "all 0.8s ease-out 0.4s",
              textShadow: "0 4px 10px rgba(236, 219, 219, 0.86)",
            }}
          >
            Travelio
          </Typography>
        </Container>
      </Box>
    </Fade>
  );
};

export default TravelSplash;
