import React, { useState, useEffect } from "react";
//import { DatePicker } from "@material-ui/pickers";
import "./App.css";
import { Table } from "antd";
import { getRoommates, getTasks } from "./api";
import ReactWeather, { useOpenWeather } from "react-open-weather";

function App() {
  // const [date, changeDate] = useState(new Date());
  const [roommateList, setRoommateList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
    lat: "45.508888",
    lon: "-73.561668",
    lang: "fr",
    unit: "metric", // values are (metric, standard, imperial)
  });
  const date = new Date();

  const customStyles = {
    fontFamily: "Helvetica, sans-serif",
    gradientStart: "#000",
    gradientMid: "#000",
    gradientEnd: "#000",
    locationFontColor: "#FFF",
    todayTempFontColor: "#FFF",
    todayDateFontColor: "#FFF",
    todayRangeFontColor: "#FFF",
    todayDescFontColor: "#FFF",
    todayInfoFontColor: "#FFF",
    todayIconColor: "#FFF",
    forecastBackgroundColor: "#000",
    forecastSeparatorColor: "#fff",
    forecastDateColor: "#fff",
    forecastDescColor: "#fff",
    forecastRangeColor: "#fff",
    forecastIconColor: "#fff",
  };

  function calcTime(offset) {
    // create Date object for current location
    var d = new Date();

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + 3600000 * offset);

    // return time as a string
    return nd.toLocaleString();
  }

  useEffect(() => {
    async function fetchTableData() {
      const promises = [getTasks(), getRoommates()];
      await Promise.all(promises).then(([tasks, roommates]) => {
        setTaskList([
          tasks[0].tasks.reduce((previous, current, index) => {
            return {
              ...previous,
              [`task${index}`]: current,
            };
          }, {}),
        ]);

        setRoommateList(
          roommates[0].roommates.map((elem, index) => {
            return {
              title: elem,
              dataIndex: `task${index}`,
              key: `task${index}`,
            };
          })
        );
      });

      //await getRoommates().then((data) => data);
    }
    fetchTableData();
  }, []);
  return (
    <div className="App">
      {/* <DatePicker
        className="DatePicker"
        autoOk
        variant="static"
        openTo="date"
        value={date}
        onChange={changeDate}
        disableFuture={true}
        disablePast={true}
        rightArrowIcon={null}
        leftArrowIcon={null}
      /> */}
      <div>
        <ReactWeather
          isLoading={isLoading}
          errorMessage={errorMessage}
          data={data}
          lang="fr"
          locationLabel="Montréal"
          unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
          showForecast={true}
          className="weather"
          theme={customStyles}
        />
      </div>
      <div className="rightColumn">
        <Table
          columns={roommateList}
          dataSource={taskList}
          pagination={false}
          className="table"
          tableLayout="fixed"
          size="small"
        />
        <p>{`${new Date().toLocaleString()}`}</p>
      </div>
    </div>
  );
}

export default App;
