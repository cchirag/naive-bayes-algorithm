import { useRecoilValue } from "recoil";
import PlaygroundPagesHeader from "../../components/PlaygroundPagesHeader/PlaygroundPagesHeader";
import "./FrequencyTable.styles.css";
import { WeatherVsPlayState } from "../../recoil/WeatherVsPlayState.atom";
import { useEffect, useState } from "react";
import { Weather } from "../../types/Weather.type";

interface FrequencyTableProps {
  nextStep: () => void;
  prevStep: () => void;
}

const FrequencyTable = (props: FrequencyTableProps) => {
  const weatherVsPlay = useRecoilValue(WeatherVsPlayState);
  const [sunnyYes, setSunnyYes] = useState(0);
  const [sunnyNo, setSunnyNo] = useState(0);
  const [rainYes, setRainYes] = useState(0);
  const [rainNo, setRainNo] = useState(0);
  const [overcastYes, setOvercastYes] = useState(0);
  const [overcastNo, setOvercastNo] = useState(0);

  const findFrequency = () => {
    var tempSunnyYes = 0;
    var tempSunnyNo = 0;
    var tempRainYes = 0;
    var tempRainNo = 0;
    var tempOvercastYes = 0;
    var tempOvercastNo = 0;
    weatherVsPlay.forEach((singleInstance) => {
      if (singleInstance.weather === Weather.SUNNY) {
        if (singleInstance.willPlay === true) {
          tempSunnyYes++;
        } else {
          tempSunnyNo++;
        }
      } else if (singleInstance.weather === Weather.RAINY) {
        if (singleInstance.willPlay === true) {
          tempRainYes++;
        } else {
          tempRainNo++;
        }
      } else {
        if (singleInstance.willPlay === true) {
          tempOvercastYes++;
        } else {
          tempOvercastNo++;
        }
      }
    });
    setSunnyYes(tempSunnyYes);
    setSunnyNo(tempSunnyNo);
    setRainYes(tempRainYes);
    setRainNo(tempRainNo);
    setOvercastYes(tempOvercastYes);
    setOvercastNo(tempOvercastNo);
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
    <div className="frequency-table-page">
      <PlaygroundPagesHeader
        hasNextStep
        hasPrevStep
        title="Frequency Table"
        nextStep={props.nextStep}
        prevStep={props.prevStep}
      />
      <div className="frequency-table-container">
        <table>
          <thead>
            <tr>
              <th>Weather</th>
              <th>Yes</th>
              <th>No</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sunny</td>
              <td>{sunnyYes}</td>
              <td>{sunnyNo}</td>
            </tr>
            <tr>
              <td>Rainy</td>
              <td>{rainYes}</td>
              <td>{rainNo}</td>
            </tr>
            <tr>
              <td>Overcast</td>
              <td>{overcastYes}</td>
              <td>{overcastNo}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{sunnyYes + overcastYes + rainYes}</td>
              <td>{sunnyNo + overcastNo + rainNo}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FrequencyTable;
