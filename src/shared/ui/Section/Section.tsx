import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material/styles";

type Props = {
  title?: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export default function Section({ title, children, sx }: Props) {
  return (
    <Box sx={[{ mb: 4 }, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}>
      {title ? (
        <Typography variant="h5" sx={{ mb: 2 }}>
          {title}
        </Typography>
      ) : null}

      {children}
    </Box>
  );
}
