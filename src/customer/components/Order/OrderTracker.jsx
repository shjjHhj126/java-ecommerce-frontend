import { Step, StepLabel, Stepper } from "@mui/material";

const OrderTracker = ({ activeStep }) => {
  const steps = ["Pending", "Confirmed", "Shipping", "Delivered", "canceled"];

  return (
    <div className="w-full p-7 border shadow-md">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((stepLabel) => (
          <Step key={stepLabel}>
            <StepLabel>{stepLabel}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderTracker;
