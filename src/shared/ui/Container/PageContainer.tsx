import { Container } from "@mui/material";
import type { ContainerProps } from "@mui/material";
import type { ReactNode } from "react";

type Props = ContainerProps & {
  children: ReactNode;
};

export default function PageContainer({ children, ...props }: Props) {
  return (
    <Container maxWidth="lg" {...props}>
      {children}
    </Container>
  );
}
