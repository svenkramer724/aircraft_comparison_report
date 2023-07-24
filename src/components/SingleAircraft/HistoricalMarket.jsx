import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "../shared/SectionHeader";
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
import { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HistoricalMarket = ({ historicalData }) => {
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
        onClick: newLegendClickHandler,
      },
    },
  };

  const keys = Object.keys(historicalData);
  const values = Object.values(historicalData);
  const [tmpValues, setTmpValues] = useState(keys);
  const labels = tmpValues.length === 0 ? keys : tmpValues;
  const data = {
    labels,
    datasets: [
      {
        label: "Number of Transactions",
        data: values,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromIndex, setFromIndex] = useState(0);
  const [toIndex, setToIndex] = useState(0);

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
    <section className={cn(global.section, global.page_break)}>
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
            <span  className={global.pdf_only}>
                From {from}
            </span>
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
            <span  className={global.pdf_only}>
                To {to}
            </span>
        </div>
        <div className={cn(styles.line_chart)}>
          <Line data={data} options={options} />
        </div>
      </main>
    </section>
  );
};

export default HistoricalMarket;
