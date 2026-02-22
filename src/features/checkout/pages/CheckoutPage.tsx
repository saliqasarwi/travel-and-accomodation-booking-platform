import { useState } from "react";
import CheckoutStepper from "../components/CheckoutStepper";

export default function CheckoutPage() {
  const [activeStep] = useState(0);
  return (
    <div>
      <CheckoutStepper activeStep={activeStep} />
    </div>
  );
}
