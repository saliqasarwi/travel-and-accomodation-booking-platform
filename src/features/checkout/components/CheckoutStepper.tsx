import * as React from "react";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Check from "@mui/icons-material/Check";
import PersonIcon from "@mui/icons-material/Person";
import PaymentIcon from "@mui/icons-material/Payment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import type { StepIconProps } from "@mui/material/StepIcon";
import { Box } from "@mui/material";

const CustomConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 18,
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
    backgroundImage:
      "linear-gradient(95deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    backgroundImage:
      "linear-gradient(95deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#e5e7eb",
    borderRadius: 999,
  },
}));

/* ------------------ Custom Step Icon ------------------ */

const CustomStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState }) => ({
  backgroundColor: "#d1d5db",
  zIndex: 1,
  color: "#fff",
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  transition: "all 0.2s ease",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient(95deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 6px 16px rgba(21, 101, 192, 0.24)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient(95deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function CustomStepIcon(props: StepIconProps) {
  const { active, completed, className, icon } = props;

  const icons: Record<string, React.ReactElement> = {
    1: <PersonIcon sx={{ fontSize: 20 }} />,
    2: <PaymentIcon sx={{ fontSize: 20 }} />,
    3: <AssignmentIcon sx={{ fontSize: 20 }} />,
  };

  return (
    <CustomStepIconRoot
      ownerState={{ active, completed }}
      className={className}
    >
      {completed ? <Check sx={{ fontSize: 20 }} /> : icons[String(icon)]}
    </CustomStepIconRoot>
  );
}

const steps = ["Personal Info", "Payment", "Special Requests"];

type Props = {
  activeStep: number;
};

export default function CheckoutStepper({ activeStep }: Props) {
  return (
    <Box sx={{ width: "100%", pb: 3 }}>
      <Box sx={{ minWidth: { xs: 520, md: "auto" } }}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<CustomConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel slots={{ stepIcon: CustomStepIcon }}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
}
