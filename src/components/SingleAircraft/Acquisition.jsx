import cn from "classnames";
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

import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "../shared/SectionHeader";
import Dropdown from "../common/Dropdown";
import { FUTURE_OPTIONS } from "../../utils/constants/app-constants";
import { useEffect, useState } from "react";
import numeral from "numeral";
import Axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Acquisition = ({ params, acquisition, currency }) => {
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
          text: `Value (${
            currency === "USD" ? "$" : currency === "GBP" ? "£" : "€"
          })`,
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const keys = Object.keys(acquisition);

  const values = Object.values(acquisition);
  const labels = keys;

  const [yearManufacture, setYearManufacture] = useState("Select");

  const [airframe, setAirframe] = useState(500);
  const [estimatedFutureValue, setestimatedFutureValue] = useState(
    FUTURE_OPTIONS[0]
  );
  const [futureValue, setfutureValue] = useState([]);
  const [futureValueConstant, setfutureValueConstant] = useState([]);
  const [hourAdjusted, setHourAdjusted] = useState([]);
  const [hourAdjustedSingleValue, setHourAdjustedSingleValue] = useState(0);
  const [info, setInfo] = useState([]);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("usd");
  const [conversionRate, setConversionRate] = useState(0);
  const [i, seti] = useState(0);
  const [futureCounter, setFutureCounter] = useState(0);

  useEffect(() => {
    Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
    ).then((res) => {
      setInfo(res.data[from]);
    });
  }, [from]);

  useEffect(() => {
    currency === "USD"
      ? setTo("usd")
      : currency === "GBP"
      ? setTo("gbp")
      : setTo("eur");
    setFrom("usd");
    setConversionRate(info[to]);
  }, [info, currency, to]);

  for (let counter = 0; counter < keys.length; counter++) {
    keys[counter] = keys[counter].replace("-", "");
  }

  for (var k = 0; k < values.length; k++) {
    futureValue[k] =
      values[k] *
      Math.pow(
        (100 - parseFloat(params.depreication_rate)) / 100,
        parseFloat(estimatedFutureValue)
      );
    futureValue[k].toFixed(2);
  }

  useEffect(() => {
    setfutureValueConstant(
      values[i] *
        Math.pow(
          (100 - parseFloat(params.depreication_rate)) / 100,
          parseFloat(estimatedFutureValue)
        )
    );
  }, [i, yearManufacture, estimatedFutureValue]);

  for (let kounter = 0; kounter < keys.length; kounter++) {
    let real = (2022 - keys[kounter]) * 400;
    hourAdjusted[kounter] = values[kounter];
    if (parseFloat(airframe) - real > 0) {
      for (let i = 0; i < parseFloat(airframe) - real; i++) {
        hourAdjusted[kounter] *= 0.99999;
      }
    } else {
      for (let i = 0; i < Math.abs(parseFloat(airframe) - real); i++) {
        hourAdjusted[kounter] *= 1.00001;
      }
    }
    hourAdjusted[kounter] = Math.round(hourAdjusted[kounter]);
  }

  const onYearChanged = (val) => {
    setYearManufacture(val);
    for (var c = 0; c < values.length; c++) {
      if (keys[c] === val) {
        seti(c);
        setHourAdjustedSingleValue(hourAdjusted[c]);
      }
    }
  };

  const onAirframeChanged = (e) => {
    setAirframe(e.target.value);
  };

  const onestimatedFutureValueChanged = (val) => {
    setestimatedFutureValue(val);
    for (var c = 0; c < FUTURE_OPTIONS.length; c++) {
      if (FUTURE_OPTIONS[c] === val) {
        setFutureCounter(c);
      }
    }
  };

  useEffect(() => {
    if (hourAdjusted[i] !== undefined) {
      setHourAdjustedSingleValue(hourAdjusted[i]);
    } else {
      setHourAdjustedSingleValue(0);
    }
  }, [airframe, yearManufacture, i]);

  const data = {
    labels,

    datasets: [
      {
        label: "Current Value",
        data: values,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Hour Adjusted",
        data: hourAdjusted,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Future Value",
        data: futureValue,
        borderColor: "rgb(153, 82, 155)",
        backgroundColor: "rgba(153, 82, 155, 0.5)",
      },
    ],
  };

  return (
    <section className={cn(global.section, global.page_break)}>
      <SectionHeader title="Acquisition Costs" />
      <main className={cn(styles.main_aquisiton)}>
        <div className={cn(global.details_table)}>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  New Purchase Price
                </span>

                <span className={cn(global.green_value)}>
                  {params.new_purchase == 0
                    ? "-"
                    : currency === "USD"
                    ? "$" + numeral(params.new_purchase).format("0,0")
                    : currency === "GBP"
                    ? "£" +
                      numeral(params.new_purchase * conversionRate).format(
                        "0,0"
                      )
                    : "€" +
                      numeral(params.new_purchase * conversionRate).format(
                        "0,0"
                      )}
                </span>
              </div>
              <div
                className={
                  cn(global.row, global.pdf_hidden) + " " + global.pdf_hidden
                }
              >
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  Year of Manufacture
                </span>
                <div className={styles.sorting}>
                  <div className={styles.dropdown + " " + global.pdf_hidden}>
                    <Dropdown
                      className={styles.dropdown}
                      value={yearManufacture}
                      setValue={(value) => onYearChanged(value)}
                      options={keys}
                    />
                  </div>
                </div>
                <span className={global.pdf_only}>
                  {yearManufacture === "Select" ? "-" : yearManufacture}
                </span>
              </div>
              <div className={cn(global.row) + " " + global.pdf_hidden}>
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  Airframe Hours
                </span>
                <div className={styles.sorting + " " + global.pdf_hidden}>
                  <div className={styles.dropdown}>
                    <form
                      className={styles.search}
                      action=""
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <input
                        className={styles.input}
                        type="text"
                        value={airframe}
                        onChange={(e) => onAirframeChanged(e)}
                        name="nbHours"
                        placeholder="Enter hours"
                        required
                      />
                    </form>
                  </div>
                </div>
                <span className={global.pdf_only}>{airframe}</span>
              </div>
              <div className={cn(global.row)}>
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  Estimated Future Value
                </span>
                <div className={styles.sorting + " " + global.pdf_hidden}>
                  <div className={styles.dropdown + " " + global.pdf_hidden}>
                    <Dropdown
                      className={styles.dropdown}
                      value={estimatedFutureValue}
                      setValue={(value) => onestimatedFutureValueChanged(value)}
                      options={FUTURE_OPTIONS}
                    />
                  </div>
                </div>
                <span className={global.pdf_only}>{estimatedFutureValue}</span>
              </div>
            </div>
          </div>
          <span className={cn(global.seperator)}></span>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  Depreciation Rate
                </span>
                <span className={cn(global.green_value)}>
                  -{params.depreication_rate}%
                </span>
              </div>
              <div className={cn(global.row)}>
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  Current Market Value
                </span>
                <span className={cn(global.green_value)}>
                  {values[i] === 0
                    ? "-"
                    : currency === "USD"
                    ? "$" + numeral(values[i]).format("0,0")
                    : currency === "GBP"
                    ? "£" + numeral(values[i] * conversionRate).format("0,0")
                    : "€" + numeral(values[i] * conversionRate).format("0,0")}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  Adjusted Value
                </span>
                <span className={cn(global.green_value)}>
                  {hourAdjustedSingleValue === 0
                    ? "-"
                    : currency === "USD"
                    ? "$" + numeral(hourAdjustedSingleValue).format("0,0")
                    : currency === "GBP"
                    ? "£" +
                      numeral(hourAdjustedSingleValue * conversionRate).format(
                        "0,0"
                      )
                    : "€" +
                      numeral(hourAdjustedSingleValue * conversionRate).format(
                        "0,0"
                      )}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  Future Value
                </span>
                <span className={cn(global.green_value)}>
                  {futureValueConstant === 0
                    ? "-"
                    : currency === "USD"
                    ? "$" + numeral(futureValueConstant).format("0,0")
                    : currency === "GBP"
                    ? "£" +
                      numeral(futureValueConstant * conversionRate).format(
                        "0,0"
                      )
                    : "€" +
                      numeral(futureValueConstant * conversionRate).format(
                        "0,0"
                      )}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* --------------- */}

        <div className={cn(global.line_chart)}>
          <Line data={data} options={options} />
        </div>
        <div className={cn(styles.table_container)}>
          <table className={cn(global.table)}>
            <thead>
              <tr>
                <th className={cn(global.th)}>Year</th>
                <th className={cn(global.th)}>Current Value</th>
                <th className={cn(global.th)}>Hour Adjusted</th>
                <th className={cn(global.th)}>Future Value</th>
              </tr>
            </thead>
            <tbody>
              {labels.map((label, index) => (
                <tr key={index}>
                  <td className={cn(global.td)}>{label}</td>
                  <td className={cn(global.td)}>
                    {numeral(
                      currency === "USD"
                        ? data.datasets[0].data[index]
                        : data.datasets[0].data[index] * conversionRate
                    ).format("0,0")}
                  </td>
                  <td className={cn(global.td)}>
                    {numeral(
                      currency === "USD"
                        ? data.datasets[1].data[index]
                        : data.datasets[1].data[index] * conversionRate
                    ).format("0,0")}
                  </td>
                  <td className={cn(global.td)}>
                    {currency === "USD"
                      ? numeral(data.datasets[2].data[index]).format("0,0")
                      : numeral(
                          data.datasets[2].data[index] * conversionRate
                        ).format("0,0")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </section>
  );
};

export default Acquisition;
