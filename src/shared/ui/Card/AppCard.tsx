import { Card, CardContent } from "@mui/material";
import type { CardProps } from "@mui/material";
import type { ReactNode } from "react";

type Props = CardProps & {
  children: ReactNode;
};

export default function AppCard({ children, ...props }: Props) {
  return (
    <Card elevation={3} {...props}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
