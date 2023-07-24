import React, { useEffect, useState } from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import SectionHeader from "../shared/SectionHeader";
import aircraftService from "../../services/aircraft-service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const HistoricalMarket = ({ params }) => {
  const [history0, setHistory0] = useState([]);
  const [history1, setHistory1] = useState([]);
  const [history2, setHistory2] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromIndex, setFromIndex] = useState(0);
  const [toIndex, setToIndex] = useState(0);
  const keys = Object.keys(history0);
  const values0 = Object.values(history0);
  const values1 = Object.values(history1);
  const values2 = Object.values(history2);
  const [tmpValues, setTmpValues] = useState(keys);
  const labels = tmpValues.length === 0 ? keys : tmpValues;
  console.log(params);
  useEffect(() => {
    aircraftService
      .getAircraftById(params[0].aircraft_id)
      .then((data) => setHistory0(JSON.parse(data[0].historical_data)));

    aircraftService
      .getAircraftById(params[1].aircraft_id)
      .then((data) => setHistory1(JSON.parse(data[0].historical_data)));

    if (params[2] !== undefined) {
      aircraftService
        .getAircraftById(params[2].aircraft_id)
        .then((data) => setHistory2(JSON.parse(data[0].historical_data)));
    }
  }, [params]);

  const newLegendClickHandler = () => {};

  const options = {
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Number of Transactions",
        },
      },
    },
    tooltips: {
      mode: "index",
      position: "nearest",
    },
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const data = {
    labels,
    datasets:
      params[2] !== undefined
        ? [
            {
              label: params[0].aircraft_name,
              data: values0,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: params[1].aircraft_name,
              data: values1,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
            {
              label: params[2].aircraft_name,
              data: values2,
              borderColor: "rgb(153, 82, 155)",
              backgroundColor: "rgba(153, 82, 155, 0.5)",
            },
          ]
        : [
            {
              label: params[0].aircraft_name,
              data: values0,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: params[1].aircraft_name,
              data: values1,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
  };

  const handleFromChange = (event) => {
    setFrom(event.target.value);
  };

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  useEffect(() => {
    if (keys[0] !== undefined) {
      setFrom(keys[0]);
      setTo(keys[keys.length - 1]);
      setFromIndex(0);
      setToIndex(keys.length - 1);
      setTmpValues(keys);
    }
  }, [keys[0]]);

  useEffect(() => {
    for (let i = 0; i < keys.length; i++) {
      if (to === keys[i]) {
        setToIndex(i);
        const tmp = keys;
        setTmpValues(tmp.slice(fromIndex, i + 1));
      }
    }
  }, [to]);

  useEffect(() => {
    for (let i = 0; i < keys.length; i++) {
      if (from === keys[i]) {
        setFromIndex(i);
        const tmp = keys;
        setTmpValues(tmp.slice(i, toIndex));
      }
    }
  }, [from]);

  return (
    <>
      <section className={cn(global.section)}>
        <SectionHeader title="Historical Market Activity" />
        <main>
          <div className={cn(styles.chart_dates)}>
            <div className={cn(styles.single_select, global.pdf_hidden)}>
              From
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={from}
                label="Age"
                onChange={handleFromChange}
              >
                {keys?.map((key) => (
                  <MenuItem key={keys} value={key}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <span className={global.pdf_only}>From {from}</span>
            <div className={cn(styles.single_select, global.pdf_hidden)}>
              To
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={to}
                label="Age"
                onChange={handleToChange}
              >
                {keys?.map((key) => (
                  <MenuItem key={keys} value={key}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <span className={global.pdf_only}>To {to}</span>
          </div>
          <div className={cn(styles.line_chart)}>
            <Line data={data} options={options} />
          </div>
        </main>
      </section>
    </>
  );
};
export default HistoricalMarket;
