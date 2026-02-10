import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";

export type AppButtonProps = ButtonProps;

export default function AppButton(props: AppButtonProps) {
  return <Button variant="contained" color="primary" {...props} />;
}
