import {
  FaCloud,
  FaCloudShowersHeavy,
  FaCloudSun,
  FaPooStorm,
  FaSun,
} from "react-icons/fa";
import {
  RiMoonClearFill,
  RiMoonCloudyFill,
  RiMoonFoggyFill,
  RiSunFoggyFill,
  RiTempColdFill,
  RiTempHotFill,
  RiWindyFill,
} from "react-icons/ri";
import { GiFog, GiSnowing } from "react-icons/gi";
import {
  WiDayShowers,
  WiDaySnow,
  WiDayThunderstorm,
  WiNightAltShowers,
  WiNightAltStormShowers,
  WiNightStormShowers,
  WiSleet,
} from "react-icons/wi";

const WeatherIcon = (props) => {
  const getIcon = (index) => {
    switch (props.index) {
      case 1:
        return <FaSun />;
      case 2 || 3 || 4 || 6:
        return <FaCloudSun />;
      case 5:
        return <RiSunFoggyFill />;
      case 7 || 8:
        return <FaCloud />;
      case 11:
        return <GiFog />;
      case 12 || 18:
        return <FaCloudShowersHeavy />;
      case 13 || 14 || 26 || 29:
        return <WiDayShowers />;
      case 15:
        return <FaPooStorm />;
      case 16 || 17:
        return <WiDayThunderstorm />;
      case 19 || 22:
        return <GiSnowing />;
      case 20 || 21 || 23:
        return <WiDaySnow />;
      case 24 || 25:
        return <WiSleet />;
      case 30:
        return <RiTempColdFill />;
      case 31:
        return <RiTempHotFill />;
      case 32:
        return <RiWindyFill />;
      case 33:
        return <RiMoonClearFill />;
      case 34 || 35 || 36 || 38:
        return <RiMoonCloudyFill />;
      case 37:
        return <RiMoonFoggyFill />;
      case 39 || 40:
        return <WiNightAltShowers />;
      case 41 || 42:
        return <WiNightAltStormShowers />;
      case 43 || 44:
        return <WiNightStormShowers />;

      default:
        return <FaSun />;
    }
  };

  return <div>{getIcon(props.index)}</div>;
};

export default WeatherIcon;
