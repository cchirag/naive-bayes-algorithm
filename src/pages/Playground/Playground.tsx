import "./Playground.styles.css";
// @ts-ignore
import Stepper from "react-stepper-horizontal";
import { useState } from "react";
import PrepareAndTrain from "../PrepareAndTrain/PrepareAndTrain";
import FrequencyTable from "../FrequencyTable/FrequencyTable";
import LikelihoodTable from "../LikelihoodTable/LikelihoodTable";
import Prediction from "../Prediction/Prediction";

const Playground = () => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <div className="playground-page">
      <div className="playground-page-header">
        <h1>Playground</h1>
      </div>
      <div className="playground-page-content">
        <div className="stepper-container">
          <Stepper
            steps={[
              { title: "Collect Data" },
              { title: "Frequency Table" },
              { title: "Likelihood Table" },
              { title: "Prediction" },
            ]}
            activeColor="#FE83BA"
            completeColor="#651FD7"
            activeStep={activeStep}
          />
        </div>
        <div className="playground-page-content-steps">
          {activeStep === 0 ? (
            <PrepareAndTrain nextStep={nextStep} />
          ) : activeStep === 1 ? (
            <FrequencyTable nextStep={nextStep} prevStep={prevStep} />
          ) : activeStep === 2 ? (
            <LikelihoodTable nextStep={nextStep} prevStep={prevStep} />
          ) : activeStep === 3 ? (
            <Prediction prevStep={prevStep} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Playground;
