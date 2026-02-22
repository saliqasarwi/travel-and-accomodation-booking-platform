import { Button, Card, CardContent, Stack } from "@mui/material";
import CheckoutStepper from "../components/CheckoutStepper";
import { useState } from "react";
const stepsCount = 3;
export default function CheckoutPage() {
  const handleNext = () =>
    setActiveStep((s) => Math.min(s + 1, stepsCount - 1));
  const handleBack = () => setActiveStep((s) => Math.max(s - 1, 0));

  const [activeStep, setActiveStep] = useState(0);
  return (
    <Stack spacing={3}>
      <CheckoutStepper activeStep={activeStep} />
      <Card>
        <CardContent>
          {activeStep === 0 && <div>Guest info step</div>}
          {activeStep === 1 && <div>Payment step</div>}
          {activeStep === 2 && <div>Special requests + review step</div>}
        </CardContent>
      </Card>

      <Stack direction="row" justifyContent="space-between">
        <Button onClick={handleBack} disabled={activeStep === 0}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext}>
          Next
        </Button>
      </Stack>
    </Stack>
  );
}
