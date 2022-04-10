import { atom } from "recoil";
import { Weather } from "../types/Weather.type";
import { WeatherVsPlay } from "../types/WeatherVsPlay.model";

const defaultWeatherAndPlay: WeatherVsPlay[] = [
  {
    weather: Weather.SUNNY,
    willPlay: true,
  },
  {
    weather: Weather.RAINY,
    willPlay: false,
  },
  {
    weather: Weather.SUNNY,
    willPlay: false,
  },
  {
    weather: Weather.RAINY,
    willPlay: true,
  },
  {
    weather: Weather.OVERCAST,
    willPlay: true,
  },
];

export const WeatherVsPlayState = atom<WeatherVsPlay[]>({
  key: "WeatherVsPlayState",
  default: defaultWeatherAndPlay,
});
