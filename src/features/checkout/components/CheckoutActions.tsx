import { Button, Stack } from "@mui/material";

type Props = {
  isLastStep: boolean;
  isSubmitting: boolean;
  activeStep: number;
  onBack: () => void;
  onNext: () => void;
  onConfirm: () => void;
};

export default function CheckoutActions({
  isLastStep,
  isSubmitting,
  activeStep,
  onBack,
  onNext,
  onConfirm,
}: Props) {
  return (
    <Stack
      direction={{ xs: "column-reverse", sm: "row" }}
      spacing={1.5}
      justifyContent="space-between"
      alignItems={{ xs: "stretch", sm: "center" }}
      sx={{ width: "100%" }}
    >
      <Button
        onClick={onBack}
        disabled={activeStep === 0 || isSubmitting}
        sx={{
          fontWeight: 700,
          alignSelf: { xs: "flex-start", sm: "auto" },
        }}
      >
        Back
      </Button>

      <Button
        variant="contained"
        onClick={isLastStep ? onConfirm : onNext}
        sx={{
          minWidth: { xs: "100%", sm: 180 },
          fontWeight: 700,
          borderRadius: 2,
        }}
      >
        {isLastStep ? "Confirm booking" : "Next"}
      </Button>
    </Stack>
  );
}
