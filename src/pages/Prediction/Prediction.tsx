import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import PlaygroundPagesHeader from "../../components/PlaygroundPagesHeader/PlaygroundPagesHeader";
import { WeatherVsPlayState } from "../../recoil/WeatherVsPlayState.atom";
import { Weather } from "../../types/Weather.type";
import "./Prediction.styles.css";

interface PredictionProps {
  prevStep: () => void;
}

const Prediction = (props: PredictionProps) => {
  const weatherVsPlay = useRecoilValue(WeatherVsPlayState);
  const [playStatus, setPlayStatus] = useState<"play" | "not play">("play");
  const [weather, setWeather] = useState<Weather>(Weather.SUNNY);
  const [sunnyYes, setSunnyYes] = useState(0);
  const [sunnyNo, setSunnyNo] = useState(0);
  const [rainYes, setRainYes] = useState(0);
  const [rainNo, setRainNo] = useState(0);
  const [overcastYes, setOvercastYes] = useState(0);
  const [overcastNo, setOvercastNo] = useState(0);
  const [totalYes, setTotalYes] = useState(0);
  const [totalNo, setTotalNo] = useState(0);
  const [likelihood, setLikelihood] = useState(0);
  const [classPriorProbability, setClassPriorProbability] = useState(0);
  const [predictorPriorProbability, setPredictorPriorProbability] = useState(0);

  const predict = async () => {
    var tempSunnyYes = 0;
    var tempSunnyNo = 0;
    var tempRainYes = 0;
    var tempRainNo = 0;
    var tempOvercastYes = 0;
    var tempOvercastNo = 0;
    var tempTotalYes = 0;
    var tempTotalNo = 0;
    var tempLikelihood = 0;
    var tempClassPriorProbability = 0;
    var tempPredictorPriorProbability = 0;
    weatherVsPlay.forEach((singleInstance) => {
      if (singleInstance.weather === Weather.SUNNY) {
        if (singleInstance.willPlay === true) {
          tempSunnyYes++;
          tempTotalYes++;
        } else {
          tempSunnyNo++;
          tempTotalNo++;
        }
      } else if (singleInstance.weather === Weather.RAINY) {
        if (singleInstance.willPlay === true) {
          tempRainYes++;
          tempTotalYes++;
        } else {
          tempRainNo++;
          tempTotalNo++;
        }
      } else {
        if (singleInstance.willPlay === true) {
          tempOvercastYes++;
          tempTotalYes++;
        } else {
          tempOvercastNo++;
          tempTotalNo++;
        }
      }
    });
    weatherVsPlay.forEach((singleInstance) => {
      if (singleInstance.willPlay && playStatus === "play") {
        tempClassPriorProbability = parseFloat(
          (tempTotalYes / (tempTotalNo + tempTotalYes)).toFixed(2)
        );

        if (weather === Weather.SUNNY) {
          tempPredictorPriorProbability = parseFloat(
            (
              (tempSunnyYes + tempSunnyNo) /
              (tempTotalNo + tempTotalYes)
            ).toFixed(2)
          );
          tempLikelihood = parseFloat((tempSunnyYes / tempTotalYes).toFixed(2));
        } else if (weather === Weather.RAINY) {
          tempPredictorPriorProbability = parseFloat(
            ((tempRainYes + tempRainNo) / (tempTotalNo + tempTotalYes)).toFixed(
              2
            )
          );
          tempLikelihood = parseFloat((tempRainYes / tempTotalYes).toFixed(2));
        } else if (weather === Weather.OVERCAST) {
          tempPredictorPriorProbability = parseFloat(
            (
              (tempOvercastYes + tempOvercastNo) /
              (tempTotalNo + tempTotalYes)
            ).toFixed(2)
          );
          tempLikelihood = parseFloat(
            (tempOvercastYes / tempTotalYes).toFixed(2)
          );
        }
      } else if (!singleInstance.willPlay && playStatus === "not play") {
        tempClassPriorProbability = parseFloat(
          (tempTotalNo / (tempTotalNo + tempTotalYes)).toFixed(2)
        );
        if (weather === Weather.SUNNY) {
          tempPredictorPriorProbability = parseFloat(
            (
              (tempSunnyYes + tempSunnyNo) /
              (tempTotalNo + tempTotalYes)
            ).toFixed(2)
          );
          tempLikelihood = parseFloat((tempSunnyNo / tempTotalNo).toFixed(2));
        } else if (weather === Weather.RAINY) {
          tempPredictorPriorProbability = parseFloat(
            ((tempRainYes + tempRainNo) / (tempTotalNo + tempTotalYes)).toFixed(
              2
            )
          );
          tempLikelihood = parseFloat((tempRainNo / tempTotalNo).toFixed(2));
        } else if (weather === Weather.OVERCAST) {
          tempPredictorPriorProbability = parseFloat(
            (
              (tempOvercastYes + tempOvercastNo) /
              (tempTotalNo + tempTotalYes)
            ).toFixed(2)
          );
          tempLikelihood = parseFloat(
            (tempOvercastNo / tempTotalNo).toFixed(2)
          );
        }
      }
    });

    setClassPriorProbability(tempClassPriorProbability);
    setPredictorPriorProbability(tempPredictorPriorProbability);
    setLikelihood(tempLikelihood);
  };

  useEffect(() => {
    var isMounted = true;
    if (isMounted) {
      predict();
    }

    return () => {
      isMounted = false;
    };
  }, [playStatus, weather, weatherVsPlay]);
  return (
    console.log(likelihood),
    (
      <div className="prediction-page">
        <PlaygroundPagesHeader
          hasPrevStep
          hasNextStep={false}
          nextStep={() => {}}
          prevStep={props.prevStep}
          title="Prediction"
        />
        <div className="prediction-page-content">
          <p>
            Will the players play when the weather is{" "}
            <span>
              <select
                onChange={(event) => setWeather(event.target.value as Weather)}
              >
                <option value={Weather.SUNNY}>sunny</option>
                <option value={Weather.RAINY}>rainy</option>
                <option value={Weather.OVERCAST}>overcast</option>
              </select>
            </span>{" "}
            ?
          </p>
          <div className="formula-container">
            <div className="lhs">
              <p>
                P({playStatus} | {weather}) =
              </p>
            </div>
            <div className="rhs">
              <p className="numerator">
                P({weather} | {playStatus}) X P({playStatus})
              </p>
              <p>P({weather})</p>
            </div>
          </div>
          <br></br>
          <div className="formula-container">
            <div className="lhs">
              <p>
                P({playStatus} | {weather}) =
              </p>
            </div>
            <div className="rhs">
              <p className="numerator">
                {likelihood} X {classPriorProbability}
              </p>
              <p>{predictorPriorProbability}</p>
            </div>
            <div>
              <p>
                {" "}
                ={" "}
                {(
                  (likelihood * classPriorProbability) /
                  predictorPriorProbability
                ).toPrecision(2)}
              </p>
            </div>
          </div>
          <div>
            <br></br>

            <p>
              Since P({playStatus} | {weather}) is{" "}
              {parseFloat(
                (
                  (likelihood * classPriorProbability) /
                  predictorPriorProbability
                ).toPrecision(2)
              ) >= 0.5
                ? "greater than 0.5, so the players will play"
                : "lesser than 0.5, so players will not play"}{" "}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default Prediction;
