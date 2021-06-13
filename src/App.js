import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

import Autocomplete from "react-autocomplete";
import "./App.css";
import { API_KEY, AUTO_REFRESH_INTERVAL } from "./constants";
import WeatherIcon from "./components/WeatherIcon";
import { FormControlLabel, Switch } from "@material-ui/core";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [value, setValue] = useState("");
  const [key, setKey] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [refreshOn, setRefreshOn] = useState(false);
  const [close, setClose] = useState(true);
  const [polling, setPolling] = useState("");

  const getWeatherDetails = () => {
    fetch(
      `http://dataservice.accuweather.com/currentconditions/v1/${
        key || value
      }?apikey=${API_KEY}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result[0]);
          setWeatherData(result[0]);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const onChanges = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (newValue.length >= 3) {
      fetch(
        `https://www.accuweather.com/web-api/zip-autocomplete?query=${newValue}&language=en-us`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(result);
            if (result) setSuggestions(result);
            setClose(false);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  useEffect(() => {
    return () => {
      // clearing auto refresh on component unmount
      clearInterval(polling);
    };
  }, []);

  useEffect(() => {
    clearInterval(polling);
    if (key && refreshOn) {
      setPolling(setInterval(getWeatherDetails, AUTO_REFRESH_INTERVAL));
    }
  }, [refreshOn, key]);

  const onItemSelect = (val) => {
    setClose(true);
    setKey(val);
    getWeatherDetails();
  };

  return (
    <div className="App">
      <header className="App-header">Current Weather Condition</header>
      <form className="form-body">
        <label>
          Enter Location:
          <Autocomplete
            getItemValue={(item) => item.key}
            items={suggestions}
            renderItem={(item, isHighlighted) => (
              <div
                className="suggestion-content"
                style={{ background: isHighlighted ? "skyblue" : "white" }}
              >
                {item.primaryPostalCode}-{item.administrativeArea.englishName}-
                {item.country.englishName}
              </div>
            )}
            open={!close}
            value={value}
            onChange={onChanges}
            onSelect={(val) => onItemSelect(val)}
          />
          <FormControlLabel
            value="bottom"
            control={<Switch color="primary" />}
            label="Auto-Refresh"
            labelPlacement="bottom"
            onChange={() => setRefreshOn(!refreshOn)}
          />
        </label>
      </form>
      {weatherData && (
        <article>
          <div>
            Current Temperature: {weatherData.Temperature.Metric.Value}°C
          </div>
          {weatherData.IsDayTime ? (
            <div>
              <FaSun /> Day
            </div>
          ) : (
            <div>
              <FaMoon /> Night
            </div>
          )}
          <div>
            Current Weather: <WeatherIcon index={weatherData.WeatherIcon} />
            <div>{weatherData.WeatherText}</div>
          </div>
        </article>
      )}
    </div>
  );
}

export default App;
