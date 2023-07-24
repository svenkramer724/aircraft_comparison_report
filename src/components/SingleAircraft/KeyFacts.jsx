import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import numeral from "numeral";
import SectionHeader from "../shared/SectionHeader";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const KeyFacts = ({ params, currency, country, unit }) => {
  const [keyFacts, setKeyFacts] = useState([]);
  const [info, setInfo] = useState([]);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("usd");
  const [conversionRate, setConversionRate] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
      )
      .then((res) => {
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
    if (params.key_facts !== undefined) {
      setKeyFacts(params.key_facts.split("\n"));
    } else {
    }
  }, [params.key_facts]);

  const data_passengers = {
    datasets: [
      {
        label: "Pax",
        data: [params.max_pax, 19],
        backgroundColor: ["#56AD70", "rgba(255, 159, 64, 0.0)"],
        borderColor: ["#EBEBEB"],
        borderWidth: 2,
      },
    ],
  };
  const data_range = {
    datasets: [
      {
        label: "Range",
        data: [params.range_NM, 8000],
        backgroundColor: ["#DBE050", "rgba(255, 159, 64, 0.0)"],
        borderColor: ["#EBEBEB"],
        borderWidth: 2,
      },
    ],
  };

  const data_cruise = {
    datasets: [
      {
        label: "Cruise Speed",
        data: [params.high_cruise_knots, 516],
        backgroundColor: ["#DA3978", "rgba(255, 159, 64, 0.0)"],
        borderColor: ["#EBEBEB"],
        borderWidth: 2,
      },
    ],
  };

  const data_cost = {
    datasets: [
      {
        label: "Cost Per Hour",
        data: [params.NA_hourly_total, 10000],
        backgroundColor: ["#90EB4B", "rgba(255, 159, 64, 0.0)"],
        borderColor: ["#EBEBEB"],
        borderWidth: 2,
      },
    ],
  };

  const data_fuel = {
    datasets: [
      {
        label: "Hourly Fuel Burn",
        data: [params.hourly_fuel_burn_GPH, 626],
        backgroundColor: ["#D857F4", "rgba(255, 159, 64, 0.0)"],
        borderColor: ["#EBEBEB"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <section className={cn(global.section, global.page_break)}>
        <SectionHeader title="Key Facts" />
        <main className={cn(styles.main_key_facts)}>
            <ul className={cn(styles.facts)}>
              <div>
                {keyFacts.map((fact, index) => {
                  return <li key={index}>{fact}</li>;
                })}
              </div>
              <div className={cn(styles.main_print_key)}>
            </div>
            </ul>
            <div className={cn(styles.img_container)}>
            <img
              src={`${params?.image_name}`}
              className={cn(styles.single_image)}
              alt=""
            />
            <img
              src={`${params?.floorplan_drawing}`}
              className={cn(styles.single_image)}
              alt=""
            />
          </div>
        </main>
      </section>
      <div className={cn(styles.main_print_section)}>
      <section className={cn(global.section)}>
        <span className={cn(styles.line)}></span>
        <div className={cn(styles.doughnut_charts_wrapper)}>
          <div
            style={{
              width: "130px",
            }}
            className={cn(styles.chart_container)}
          >
            <span>Passengers</span>
            <Doughnut
              data={data_passengers}
              options={{
                responsive: true,
                cutout: 50,
                plugins: {
                  tooltip: {
                    enabled: false, // <-- this option disables tooltips
                  },
                },
              }}
            />
            <span className={styles.chart_label_passengers}>
              {params.max_pax}
              <br></br>
              <span className={styles.chart_label_description}>Pax</span>
            </span>
          </div>
          <div
            style={{
              width: "130px",
            }}
            className={cn(styles.chart_container)}
          >
            <span>Range</span>
            <Doughnut
              data={data_range}
              options={{
                responsive: true,
                cutout: 50,
                plugins: {
                  tooltip: {
                    enabled: false, // <-- this option disables tooltips
                  },
                },
              }}
            />
            <span className={styles.chart_label_range}>
              {unit === "Imperial Units"
                ? numeral(params.range_NM).format("0,0")
                : numeral(params.range_km).format("0,0")}{" "}
              <br></br>
              <span className={styles.chart_label_description}>
                {unit === "Imperial Units" ? "NM" : "KM"}
              </span>
            </span>
          </div>
          <div
            style={{
              width: "130px",
            }}
            className={cn(styles.chart_container)}
          >
            <span>Cruise Speed</span>
            <Doughnut
              data={data_cruise}
              options={{
                responsive: true,
                cutout: 50,
                plugins: {
                  tooltip: {
                    enabled: false, // <-- this option disables tooltips
                  },
                },
              }}
            />
            <span className={styles.chart_label_cruise}>
              {unit === "Imperial Units"
                ? numeral(params.high_cruise_knots).format("0,0")
                : numeral(params.high_speed_cruise_kmh).format("0,0")}{" "}
              <br></br>
              <span className={styles.chart_label_description}>
                {" "}
                {unit === "Imperial Units" ? "Knots" : "Kmh"}
              </span>
            </span>
          </div>
          <div
            style={{
              width: "130px",
            }}
            className={cn(styles.chart_container)}
          >
            <span>Cost per Hour</span>
            <Doughnut
              data={data_cost}
              options={{
                responsive: true,
                cutout: 50,
                plugins: {
                  tooltip: {
                    enabled: false, // <-- this option disables tooltips
                  },
                },
              }}
            />
            <span className={styles.chart_label_cost}>
              {currency === "USD" ? "$" : currency === "EUR" ? "€" : "£"}
              {currency === "USD"
                ? country === "North America"
                  ? numeral(params.NA_hourly_total).format("0,0") !== 0
                    ? numeral(params.NA_hourly_total).format("0,0")
                    : "-"
                  : country === "Europe"
                    ? numeral(params.EU_hourly_total).format("0,0") !== 0
                      ? numeral(params.EU_hourly_total).format("0,0")
                      : "-"
                    : country === "South America"
                      ? numeral(params.SA_hourly_total).format("0,0") !== 0
                        ? numeral(params.SA_hourly_total).format("0,0")
                        : "-"
                      : numeral(params.AS_hourly_total).format("0,0") !== 0
                        ? numeral(params.AS_hourly_total).format("0,0")
                        : "-"
                : country === "North America"
                  ? numeral(params.NA_hourly_total).format("0,0") !== 0
                    ? numeral(params.NA_hourly_total * conversionRate).format(
                      "0,0"
                    )
                    : "-"
                  : country === "Europe"
                    ? numeral(params.EU_hourly_total).format("0,0") !== 0
                      ? numeral(params.EU_hourly_total * conversionRate).format(
                        "0,0"
                      )
                      : "-"
                    : country === "South America"
                      ? params.SA_hourly_total !== 0
                        ? numeral(params.SA_hourly_total * conversionRate).format(
                          "0,0"
                        )
                        : "-"
                      : params.AS_hourly_total !== 0
                        ? numeral(params.AS_hourly_total * conversionRate).format("0,0")
                        : "-"}{" "}
              <br></br>
              <span className={styles.chart_label_description}>per hour</span>
            </span>
          </div>
          <div
            style={{
              width: "130px",
            }}
            className={cn(styles.chart_container)}
          >
            <span>Fuel Burn</span>
            <Doughnut
              data={data_fuel}
              options={{
                responsive: true,
                cutout: 50,
                plugins: {
                  tooltip: {
                    enabled: false, // <-- this option disables tooltips
                  },
                },
              }}
            />
            <span className={styles.chart_label_fuel}>
              {unit === "Imperial Units"
                ? numeral(params.hourly_fuel_burn_GPH).format("0,0")
                : numeral(params.hourly_fuel_burn_LPH).format("0,0")}{" "}
              <br></br>
              <span className={styles.chart_label_description}>
                {unit === "Imperial Units" ? "GPH" : "LPH"}
              </span>
            </span>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default KeyFacts;
