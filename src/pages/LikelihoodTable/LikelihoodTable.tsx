import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import PlaygroundPagesHeader from "../../components/PlaygroundPagesHeader/PlaygroundPagesHeader";
import { WeatherVsPlayState } from "../../recoil/WeatherVsPlayState.atom";
import { Weather } from "../../types/Weather.type";
import "./LikelihoodTable.styles.css";

interface LikelihoodTableProps {
  nextStep: () => void;
  prevStep: () => void;
}

const LikelihoodTable = (props: LikelihoodTableProps) => {
  const weatherVsPlay = useRecoilValue(WeatherVsPlayState);
  const [sunnyYes, setSunnyYes] = useState(0);
  const [sunnyNo, setSunnyNo] = useState(0);
  const [rainYes, setRainYes] = useState(0);
  const [rainNo, setRainNo] = useState(0);
  const [overcastYes, setOvercastYes] = useState(0);
  const [overcastNo, setOvercastNo] = useState(0);
  const [totalYes, setTotalYes] = useState(0);
  const [totalNo, setTotalNo] = useState(0);

  const findFrequency = () => {
    var tempSunnyYes = 0;
    var tempSunnyNo = 0;
    var tempRainYes = 0;
    var tempRainNo = 0;
    var tempOvercastYes = 0;
    var tempOvercastNo = 0;
    var tempTotalYes = 0;
    var tempTotalNo = 0;
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
    setSunnyYes(tempSunnyYes);
    setSunnyNo(tempSunnyNo);
    setRainYes(tempRainYes);
    setRainNo(tempRainNo);
    setOvercastYes(tempOvercastYes);
    setOvercastNo(tempOvercastNo);
    setTotalNo(tempTotalNo);
    setTotalYes(tempTotalYes);
  };

  useEffect(() => {
    var isMounted = true;
    if (isMounted) {
      console.log("Hello");
      findFrequency();
    }
    return () => {
      isMounted = false;
    };
  }, [weatherVsPlay]);

  return (
    <div className="likelihood-table-page">
      <PlaygroundPagesHeader
        hasNextStep
        hasPrevStep
        nextStep={props.nextStep}
        prevStep={props.prevStep}
        title="Likelihood Table"
      />
      <div className="likelihood-table-container">
        <table>
          <thead>
            <tr>
              <th>Weather</th>
              <th>Yes</th>
              <th>No</th>
              <th>Probability</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sunny</td>
              <td>{sunnyYes}</td>
              <td>{sunnyNo}</td>
              <td>{`${sunnyYes + sunnyNo} / ${totalYes + totalNo} = ${(
                (sunnyYes + sunnyNo) /
                (totalYes + totalNo)
              ).toFixed(2)}`}</td>
            </tr>
            <tr>
              <td>Rainy</td>
              <td>{rainYes}</td>
              <td>{rainNo}</td>
              <td>{`${rainYes + rainNo} / ${totalYes + totalNo} = ${(
                (rainYes + rainNo) /
                (totalYes + totalNo)
              ).toFixed(2)}`}</td>
            </tr>
            <tr>
              <td>Overcast</td>
              <td>{overcastYes}</td>
              <td>{overcastNo}</td>
              <td>{`${overcastYes + overcastNo} / ${totalYes + totalNo} = ${(
                (overcastYes + overcastNo) /
                (totalYes + totalNo)
              ).toFixed(2)}`}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{totalYes}</td>
              <td>{totalNo}</td>
              <td></td>
            </tr>
            <tr>
              <td>Probability</td>
              <td>{`${totalYes} / ${totalYes + totalNo} = ${(
                totalYes /
                (totalYes + totalNo)
              ).toFixed(2)}`}</td>
              <td>{`${totalNo} / ${totalYes + totalNo} = ${(
                totalNo /
                (totalYes + totalNo)
              ).toFixed(2)}`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LikelihoodTable;
