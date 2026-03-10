import { Box, Typography } from "@mui/material";
import type { ReactNode, MouseEvent } from "react";

type SearchBlockProps = {
  icon: ReactNode;
  label: string;
  value: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  children?: ReactNode;
};

export default function SearchBlock({
  icon,
  label,
  value,
  onClick,
  children,
}: SearchBlockProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        bgcolor: "background.paper",
        minHeight: 58,
        px: 2,
        py: 1,
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <Box
        sx={{
          color: "text.secondary",
          display: "flex",
          alignItems: "center",
        }}
      >
        {icon}
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", lineHeight: 1.1, mb: 0.25 }}
        >
          {label}
        </Typography>

        {children ? (
          children
        ) : (
          <Typography
            sx={{
              fontWeight: 700,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: 15,
            }}
          >
            {value}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
