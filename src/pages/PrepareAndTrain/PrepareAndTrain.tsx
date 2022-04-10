import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Button from "../../components/Button/Button";
import PlaygroundPage from "../../components/PlaygroundPage/PlaygroundPage";
import PlaygroundPagesHeader from "../../components/PlaygroundPagesHeader/PlaygroundPagesHeader";
import { WeatherVsPlayState } from "../../recoil/WeatherVsPlayState.atom";
import { Weather } from "../../types/Weather.type";
import { WeatherVsPlay } from "../../types/WeatherVsPlay.model";
import "./PrepareAndTrain.styles.css";

interface PrepareAndTrainProps {
  nextStep: () => void;
}

const PrepareAndTrain = (props: PrepareAndTrainProps) => {
  const navigate = useNavigate();
  const [weatherVsPlay, setWeatherVsPlay] = useRecoilState(WeatherVsPlayState);

  const [selectedWeather, setSelectedWeather] = useState<Weather | "">("");
  const [selectedPlay, setSelectedPlay] = useState<"yes" | "no" | "">("");

  const addWeatherVsPlay = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedWeather !== "" && selectedPlay !== "") {
      const newWeatherVsPlay: WeatherVsPlay = {
        weather: selectedWeather,
        willPlay: selectedPlay === "yes" ? true : false,
      };
      setWeatherVsPlay([...weatherVsPlay, newWeatherVsPlay]);
    } else {
      alert("Please select a weather and a play");
    }
  };

  return (
    <div className="prepare-and-train-page">
      <PlaygroundPagesHeader
        title="Collect Data"
        hasPrevStep
        hasNextStep
        nextStep={props.nextStep}
        prevStep={() => {
          navigate("/");
        }}
      />
      <form className="prepare-and-train-form" onSubmit={addWeatherVsPlay}>
        <select
          onChange={(event) => {
            setSelectedWeather(event.target.value as Weather);
          }}
        >
          <option value="">Select a weather</option>
          <option value="Sunny">Sunny</option>
          <option value="Rainy">Rainy</option>
          <option value="Overcast">Overcast</option>
        </select>
        <select
          onChange={(event) => {
            setSelectedPlay(event.target.value as "yes" | "no");
          }}
        >
          <option value="">Will the players play?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <Button type="submit" onClick={() => {}} variant="primary">
          ADD
        </Button>
      </form>
      <div className="weather-vs-play-table-container">
        <table className="weather-vs-play-table">
          <thead>
            <tr>
              <th>Weather</th>
              <th>Play</th>
            </tr>
          </thead>
          <tbody>
            {weatherVsPlay.map((singleInstance, index) => (
              <tr key={index}>
                <td>{singleInstance.weather}</td>
                <td>{singleInstance.willPlay ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrepareAndTrain;
