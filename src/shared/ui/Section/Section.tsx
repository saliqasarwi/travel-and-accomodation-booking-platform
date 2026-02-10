import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

export default function Section({ title, children }: Props) {
  return (
    <Box sx={{ mb: 4 }}>
      {title ? (
        <Typography variant="h5" sx={{ mb: 2 }}>
          {title}
        </Typography>
      ) : null}

      {children}
    </Box>
  );
}
