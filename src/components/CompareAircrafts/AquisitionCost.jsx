import React from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
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
import Dropdown from "../common/Dropdown";
import { FUTURE_OPTIONS } from "../../utils/constants/app-constants";
import { useEffect, useState } from "react";
import numeral from "numeral";
import Axios from "axios";
import SectionHeader from "../shared/SectionHeader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const AquisitionCost = ({ data, currency, country, unit }) => {
  const [estimatedFutureValue, setestimatedFutureValue] = useState(
    FUTURE_OPTIONS[0]
  );
  const [info, setInfo] = useState([]);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("usd");
  const [conversionRate, setConversionRate] = useState(0);

  const keys0 = Object.keys(JSON.parse(data[0].acquisition_values));
  const values0 = Object.values(JSON.parse(data[0].acquisition_values));
  const keys1 = Object.keys(JSON.parse(data[1].acquisition_values));
  const values1 = Object.values(JSON.parse(data[1].acquisition_values));
  var keys2 =
    data[2] !== undefined
      ? Object.keys(JSON.parse(data[2].acquisition_values))
      : null;
  var values2 =
    data[2] !== undefined
      ? Object.values(JSON.parse(data[2].acquisition_values))
      : null;

  var lbl;

  const [yearManufacture0, setYearManufacture0] = useState("Select");
  const [yearManufacture1, setYearManufacture1] = useState("Select");
  const [yearManufacture2, setYearManufacture2] = useState("Select");
  const [i0, seti0] = useState(0);
  const [i1, seti1] = useState(0);
  const [i2, seti2] = useState(0);
  const [futureValueConstant0, setfutureValueConstant0] = useState();
  const [futureValueConstant1, setfutureValueConstant1] = useState();
  const [futureValueConstant2, setfutureValueConstant2] = useState();

  useEffect(() => {
    console.log(data[0].acquisition_values);
    if (data[2] !== undefined) {
      keys2 = Object.keys(data[2].acquisition_values);
      values2 = Object.values(data[2].acquisition_values);
    }
  }, [from]);

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

  useEffect(() => {
    setfutureValueConstant0(
      values0[i0] *
        Math.pow(
          (100 - parseFloat(data[0].depreication_rate)) / 100,
          parseFloat(estimatedFutureValue)
        )
    );
    setfutureValueConstant1(
      values1[i1] *
        Math.pow(
          (100 - parseFloat(data[1].depreication_rate)) / 100,
          parseFloat(estimatedFutureValue)
        )
    );

    if (data[2] !== undefined) {
      setfutureValueConstant2(
        values2[i2] *
          Math.pow(
            (100 - parseFloat(data[2].depreication_rate)) / 100,
            parseFloat(estimatedFutureValue)
          )
      );
    }
  }, [
    i0,
    i1,
    i2,
    yearManufacture0,
    yearManufacture1,
    yearManufacture2,
    estimatedFutureValue,
  ]);

  const onYearChanged = (val, index) => {
    if (index === 0) {
      setYearManufacture0(val);
      for (var c = 0; c < values0.length; c++) {
        if (keys0[c] === val) {
          seti0(c);
        }
      }
    } else if (index === 1) {
      setYearManufacture1(val);
      for (var c = 0; c < values1.length; c++) {
        if (keys1[c] === val) {
          seti1(c);
        }
      }
    } else {
      setYearManufacture2(val);
      for (var c = 0; c < values2.length; c++) {
        if (keys2[c] === val) {
          seti2(c);
        }
      }
    }
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          display: false,
        },
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
      tooltip: {
        callbacks: {
          title: function () {
            return "";
          },
        },
      },
      legend: {
        position: "bottom",
      },
    },
  };

  const getUniqueAfterMerge = (arr1, arr2) => {
    // merge two arrays
    let arr = arr1.concat(arr2);
    let uniqueArr = [];

    // loop through array
    for (let i of arr) {
      if (uniqueArr.indexOf(i) === -1) {
        uniqueArr.push(i);
      }
    }
  };

  // const labels =
  //   data[2] !== undefined
  //     ? keys0
  //         .concat(keys1.filter((item) => keys0.indexOf(item) < 0))
  //         .concat(keys2.filter((item) => keys0.indexOf(item) < 0))
  //     : keys0.concat(keys1.filter((item) => keys0.indexOf(item) < 0));
  const labels = keys1;

  const lineData = {
    labels,
    datasets:
      data[2] !== undefined
        ? [
            {
              label: data[0].aircraft_name,
              data: values0,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: data[1].aircraft_name,
              data: values1,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
            {
              label: data[2].aircraft_name,
              data: values2,
              borderColor: "rgb(153, 82, 155)",
              backgroundColor: "rgba(153, 82, 155, 0.5)",
            },
          ]
        : [
            {
              label: data[0].aircraft_name,
              data: values0,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: data[1].aircraft_name,
              data: values1,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
  };

  const onestimatedFutureValueChanged = (val) => {
    setestimatedFutureValue(val);
  };

  return (
    <>
      <section className={cn(global.section, global.new_page)}>
        <SectionHeader title="Acquisition Costs" />
        <main className={cn(styles.aquisition_container)}>
          <div className={cn(styles.future_value)}>
            <h2>
              Estimated Future Value{" "}
              <div className={styles.sorting}>
                <div className={styles.dropdown + " "}>
                  <center>
                    <Dropdown
                      className={styles.dropdown}
                      value={estimatedFutureValue}
                      setValue={(value) => onestimatedFutureValueChanged(value)}
                      options={FUTURE_OPTIONS}
                    />
                  </center>
                </div>
              </div>
            </h2>
          </div>
          <div className={cn(styles.compare_table)}>
            <div className={cn(styles.compare_table_column)}>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.invisible
                )}
              >
                invisible
              </span>
              <br></br>
              <br></br>

              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Select Year
              </span>
              <br></br>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                New Purchase Price
              </span>
              <br></br>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Current Value
              </span>
              <br></br>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Depreciation Rate
              </span>
              <br></br>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Future Values
              </span>
              <br></br>
            </div>
            {data.map((aircraft, index) => {
              return (
                <div
                  className={cn(styles.compare_table_column)}
                  key={aircraft.aircraft_id}
                >
                  <span
                    className={cn(
                      styles.compare_table_column_cell,
                      styles.table_column_head
                    )}
                  >
                    {aircraft.aircraft_name}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    <div className={styles.dropdown + " "}>
                      <center>
                        <Dropdown
                          className={styles.dropdown}
                          value={
                            index === 0
                              ? yearManufacture0
                              : index === 1
                              ? yearManufacture1
                              : index === 2
                              ? yearManufacture2
                              : null
                          }
                          setValue={(value) => onYearChanged(value, index)}
                          options={
                            index === 0 ? keys0 : index === 1 ? keys1 : keys2
                          }
                        />
                      </center>
                    </div>
                  </span>
                  <br></br>
                  <span
                    className={cn(
                      styles.compare_table_column_cell,
                      styles.green_value
                    )}
                  >
                    {aircraft.new_purchase == 0
                      ? "-"
                      : currency === "USD"
                      ? "$" + numeral(aircraft.new_purchase).format("0,0")
                      : currency === "GBP"
                      ? "£" +
                        numeral(aircraft.new_purchase * conversionRate).format(
                          "0,0"
                        )
                      : "€" +
                        numeral(aircraft.new_purchase * conversionRate).format(
                          "0,0"
                        )}
                  </span>
                  <br></br>
                  <span
                    className={cn(
                      styles.compare_table_column_cell,
                      styles.green_value
                    )}
                  >
                    {index === 0
                      ? values0[i0] === 0
                        ? "-"
                        : currency === "USD"
                        ? "$" + numeral(values0[i0]).format("0,0")
                        : currency === "GBP"
                        ? "£" +
                          numeral(values0[i0] * conversionRate).format("0,0")
                        : "€" +
                          numeral(values0[i0] * conversionRate).format("0,0")
                      : index === 1
                      ? values1[i1] === 0
                        ? "-"
                        : currency === "USD"
                        ? "$" + numeral(values1[i1]).format("0,0")
                        : currency === "GBP"
                        ? "£" +
                          numeral(values1[i1] * conversionRate).format("0,0")
                        : "€" +
                          numeral(values1[i1] * conversionRate).format("0,0")
                      : values2[i2] === 0
                      ? "-"
                      : currency === "USD"
                      ? "$" + numeral(values2[i2]).format("0,0")
                      : currency === "GBP"
                      ? "£" +
                        numeral(values2[i2] * conversionRate).format("0,0")
                      : "€" +
                        numeral(values2[i2] * conversionRate).format("0,0")}
                  </span>
                  <br></br>
                  <span
                    className={cn(
                      styles.compare_table_column_cell,
                      styles.green_value
                    )}
                  >
                    -{aircraft.depreication_rate}%
                  </span>
                  <br></br>
                  <span
                    className={cn(
                      styles.compare_table_column_cell,
                      styles.green_value
                    )}
                  >
                    {index === 0
                      ? futureValueConstant0 === 0
                        ? "-"
                        : currency === "USD"
                        ? "$" + numeral(futureValueConstant0).format("0,0")
                        : currency === "GBP"
                        ? "£" +
                          numeral(futureValueConstant0 * conversionRate).format(
                            "0,0"
                          )
                        : "€" +
                          numeral(futureValueConstant0 * conversionRate).format(
                            "0,0"
                          )
                      : index === 1
                      ? futureValueConstant1 === 0
                        ? "-"
                        : currency === "USD"
                        ? "$" + numeral(futureValueConstant1).format("0,0")
                        : currency === "GBP"
                        ? "£" +
                          numeral(futureValueConstant1 * conversionRate).format(
                            "0,0"
                          )
                        : "€" +
                          numeral(futureValueConstant1 * conversionRate).format(
                            "0,0"
                          )
                      : futureValueConstant2 === 0
                      ? "-"
                      : currency === "USD"
                      ? "$" + numeral(futureValueConstant2).format("0,0")
                      : currency === "GBP"
                      ? "£" +
                        numeral(futureValueConstant2 * conversionRate).format(
                          "0,0"
                        )
                      : "€" +
                        numeral(futureValueConstant2 * conversionRate).format(
                          "0,0"
                        )}
                  </span>
                </div>
              );
            })}
          </div>
          <div className={cn(global.line_chart)}>
            <Line data={lineData} options={options} />
          </div>
        </main>
      </section>
    </>
  );
};
export default AquisitionCost;
