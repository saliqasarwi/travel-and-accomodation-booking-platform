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
import { Stack } from "@mui/material";

const CustomConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
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
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
}));

/* ------------------ Custom Step Icon ------------------ */

const CustomStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 44,
  height: 44,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient(136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient(136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function CustomStepIcon(props: StepIconProps) {
  const { active, completed, className, icon } = props;

  const icons: Record<string, React.ReactElement> = {
    1: <PersonIcon />,
    2: <PaymentIcon />,
    3: <AssignmentIcon />,
  };

  return (
    <CustomStepIconRoot
      ownerState={{ active, completed }}
      className={className}
    >
      {completed ? <Check /> : icons[String(icon)]}
    </CustomStepIconRoot>
  );
}

const steps = ["Personal Info", "Payment", "Special Requests"];

type Props = {
  activeStep: number;
};

export default function CheckoutStepper({ activeStep }: Props) {
  return (
    <Stack sx={{ width: "100%" }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<CustomConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
