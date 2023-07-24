import cn from "classnames";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import global from "../../styles/global.module.scss";
import styles from "../styles/styles.module.scss";
import SectionHeader from "../../shared/SectionHeader";
import { useState, useEffect } from "react";
import Axios from "axios";
import numeral from "numeral";

ChartJS.register(ArcElement, Tooltip, Legend);
const OwnershipCosts = ({ params, currency, country }) => {
  const [info, setInfo] = useState([]);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("usd");
  const [nbHours, setNbHours] = useState(0);
  const [annualBudget, setAnnualBudget] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [currencyFrom, setCurrencyFrom] = useState(currency.toLowerCase())
  const [reset, setReset] = useState(false)

  const [annualTotal, setAnnualTotal] = useState(0);
  const [hourlyTotal, setHourlyTotal] = useState(0);
  const [crewSalary, setCrewSalary] = useState(
    Math.round((
      (country === "North America" ? params.NA_annual_employee_benefits : country === "South America" ? params.SA_annual_employee_benefits : country === "Europe" ? params.EU_annual_employee_benefits : params.AS_annual_employee_benefits?? 0) +
      (country === "North America" ? params.NA_annual_captain : country === "South America" ? params.SA_annual_captain : country === "Europe" ? params.EU_annual_captain : params.AS_annual_captain?? 0) +
      (country === "North America" ? params.NA_annual_first_office : country === "South America" ? params.SA_annual_first_office : country === "Europe" ? params.EU_annual_first_office : params.AS_annual_first_office?? 0)
    )*conversionRate).toLocaleString()
  );
  const [crewTrain, setCrewTrain] = useState(Math.round((country === "North America" ? params.NA_annual_crew_training : country === "South America" ? params.SA_annual_crew_training : country === "Europe" ? params.EU_annual_crew_training : params.AS_annual_crew_training?? 0)*conversionRate).toLocaleString());
  const [hanger, setHanger] = useState(Math.round((country === "North America" ? params.NA_annual_hangar : country === "South America" ? params.SA_annual_hangar : country === "Europe" ? params.EU_annual_hangar : params.AS_annual_hangar?? 0)*conversionRate).toLocaleString());
  const [insurranceHull, setInsurranceHull] = useState(Math.round((country === "North America" ? params.NA_annual_insurance_hull : country === "South America" ? params.SA_annual_insurance_hull : country === "Europe" ? params.EU_annual_insurance_hull : params.AS_annual_insurance_hull?? 0)*conversionRate).toLocaleString());
  const [insurranceLiability, setInsurranceLiability] = useState(Math.round((country === "North America" ? params.NA_annual_insurance_liability : country === "South America" ? params.SA_annual_insurance_liability : country === "Europe" ? params.EU_annual_insurance_liability : params.AS_annual_insurance_liability?? 0)*conversionRate).toLocaleString());
  const [management, setManagement] = useState(Math.round((country === "North America" ? params.NA_annual_management : country === "South America" ? params.SA_annual_management : country === "Europe" ? params.EU_annual_management : params.AS_annual_management?? 0)*conversionRate).toLocaleString());
  const [miscFixed, setMiscFixed] = useState(Math.round((country === "North America" ? params.NA_annual_misc : country === "South America" ? params.SA_annual_misc : country === "Europe" ? params.EU_annual_misc : params.AS_annual_misc?? 0)*conversionRate).toLocaleString());
  const [fuelCost, setFuelCost] = useState(Math.round((country === "North America" ? params.NA_hourly_fuel : country === "South America" ? params.SA_hourly_fuel : country === "Europe" ? params.EU_hourly_fuel : params.AS_hourly_fuel?? 0)*conversionRate).toLocaleString());
  const [maintenance, setMaintenance] = useState(Math.round((country === "North America" ? params.NA_hourly_maintenance : country === "South America" ? params.SA_hourly_maintenance : country === "Europe" ? params.EU_hourly_maintenance : params.AS_hourly_maintenance?? 0)*conversionRate).toLocaleString());
  const [engOverhaul, setEngOverhaul] = useState(Math.round((country === "North America" ? params.NA_hourly_engine_overhaul : country === "South America" ? params.SA_hourly_engine_overhaul : country === "Europe" ? params.EU_hourly_engine_overhaul : params.AS_hourly_engine_overhaul?? 0)*conversionRate).toLocaleString());
  const [groundFees, setGroundFees] = useState(Math.round((country === "North America" ? params.NA_hourly_ground_fees : country === "South America" ? params.SA_hourly_ground_fees : country === "Europe" ? params.EU_hourly_ground_fees : params.AS_hourly_ground_fees?? 0)*conversionRate).toLocaleString());
  const [miscVar, setMiscVar] = useState(Math.round((country === "North America" ? params.NA_hourly_misc : country === "South America" ? params.SA_hourly_misc : country === "Europe" ? params.EU_hourly_misc : params.AS_hourly_misc?? 0)*conversionRate).toLocaleString());

  const [annualData, setAnnualData] = useState({
    labels: [
      "Crew Salary",
      "Crew Training",
      "Hangar",
      "Insurance",
      "Management",
      "Miscellaneous Fixed",
    ],
    datasets: [
      {
        data:
          currency === "USD"
            ? country === "North America"
              ? [
                  Math.round(
                    params.NA_annual_captain +
                      params.NA_annual_first_office +
                      params.NA_annual_employee_benefits
                  ),
                  Math.round(params.NA_annual_crew_training),
                  Math.round(params.NA_annual_hangar),
                  Math.round(
                    params.NA_annual_insurance_hull +
                      params.NA_annual_insurance_liability
                  ),
                  Math.round(params.NA_annual_management),
                  Math.round(params.NA_annual_misc),
                ]
              : country === "South America"
              ? [
                  Math.round(
                    params.SA_annual_captain +
                      params.SA_annual_first_office +
                      params.SA_annual_employee_benefits
                  ),
                  Math.round(params.SA_annual_crew_training),
                  Math.round(params.SA_annual_hangar),
                  Math.round(
                    params.SA_annual_insurance_hull +
                      params.SA_annual_insurance_liability
                  ),
                  Math.round(params.SA_annual_management),
                  Math.round(params.SA_annual_misc),
                ]
              : country === "Europe"
              ? [
                  Math.round(
                    params.EU_annual_captain +
                      params.EU_annual_first_office +
                      params.EU_annual_employee_benefits
                  ),
                  Math.round(params.EU_annual_crew_training),
                  Math.round(params.EU_annual_hangar),
                  Math.round(
                    params.EU_annual_insurance_hull +
                      params.EU_annual_insurance_liability
                  ),
                  Math.round(params.EU_annual_management),
                  Math.round(params.EU_annual_misc),
                ]
              : [
                  Math.round(
                    params.AS_annual_captain +
                      params.AS_annual_first_office +
                      params.AS_annual_employee_benefits
                  ),
                  Math.round(params.AS_annual_crew_training),
                  Math.round(params.AS_annual_hangar),
                  Math.round(
                    params.AS_annual_insurance_hull +
                      params.AS_annual_insurance_liability
                  ),
                  Math.round(params.AS_annual_management),
                  Math.round(params.AS_annual_misc),
                ]
            : country === "North America"
            ? [
                Math.round(
                  conversionRate *
                    (params.NA_annual_captain +
                      params.NA_annual_first_office +
                      params.NA_annual_employee_benefits)
                ),
                Math.round(params.NA_annual_crew_training * conversionRate),
                Math.round(params.NA_annual_hangar * conversionRate),
                Math.round(
                  (params.NA_annual_insurance_hull +
                    params.NA_annual_insurance_liability) *
                    conversionRate
                ),
                Math.round(params.NA_annual_management * conversionRate),
                Math.round(params.NA_annual_misc * conversionRate),
              ]
            : country === "South America"
            ? [
                Math.round(
                  conversionRate *
                    (params.SA_annual_captain +
                      params.SA_annual_first_office +
                      params.SA_annual_employee_benefits)
                ),
                Math.round(params.SA_annual_crew_training * conversionRate),
                Math.round(params.SA_annual_hangar * conversionRate),
                Math.round(
                  conversionRate *
                    (params.SA_annual_insurance_hull +
                      params.SA_annual_insurance_liability)
                ),
                Math.round(params.SA_annual_management * conversionRate),
                Math.round(params.SA_annual_misc * conversionRate),
              ]
            : country === "Europe"
            ? [
                Math.round(
                  conversionRate *
                    (params.EU_annual_captain +
                      params.EU_annual_first_office +
                      params.EU_annual_employee_benefits)
                ),
                Math.round(params.EU_annual_crew_training * conversionRate),
                Math.round(params.EU_annual_hangar * conversionRate),
                Math.round(
                  conversionRate *
                    (params.EU_annual_insurance_hull +
                      params.EU_annual_insurance_liability)
                ),
                Math.round(params.EU_annual_management * conversionRate),
                Math.round(params.EU_annual_misc * conversionRate),
              ]
            : [
                Math.round(
                  conversionRate *
                    (params.AS_annual_captain +
                      params.AS_annual_first_office +
                      params.AS_annual_employee_benefits)
                ),
                Math.round(params.AS_annual_crew_training * conversionRate),
                Math.round(params.AS_annual_hangar * conversionRate),
                Math.round(
                  conversionRate *
                    (params.AS_annual_insurance_hull +
                      params.AS_annual_insurance_liability)
                ),
                Math.round(params.AS_annual_management * conversionRate),
                Math.round(params.AS_annual_misc * conversionRate),
              ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const [variableData, setVariableData] = useState({
    labels: [
      "Fuel Cost",
      "Maintenance",
      "Engine Overhaul",
      "Ground Fees",
      "Miscellaneous Variable",
    ],
    datasets: [
      {
        data:
          currency === "USD"
            ? country === "North America"
              ? [
                  params.NA_hourly_fuel,
                  params.NA_hourly_maintenance,
                  params.NA_hourly_engine_overhaul,
                  params.NA_hourly_ground_fees,
                  params.NA_hourly_misc,
                ]
              : country === "South America"
              ? [
                  params.SA_hourly_fuel,
                  params.SA_hourly_maintenance,
                  params.SA_hourly_engine_overhaul,
                  params.SA_hourly_ground_fees,
                  params.SA_hourly_misc,
                ]
              : country === "Europe"
              ? [
                  params.EU_hourly_fuel,
                  params.EU_hourly_maintenance,
                  params.EU_hourly_engine_overhaul,
                  params.EU_hourly_ground_fees,
                  params.EU_hourly_misc,
                ]
              : [
                  params.AS_hourly_fuel,
                  params.AS_hourly_maintenance,
                  params.AS_hourly_engine_overhaul,
                  params.AS_hourly_ground_fees,
                  params.AS_hourly_misc,
                ]
            : country === "North America"
            ? [
                params.NA_hourly_fuel * conversionRate,
                params.NA_hourly_maintenance * conversionRate,
                params.NA_hourly_engine_overhaul * conversionRate,
                params.NA_hourly_ground_fees * conversionRate,
                params.NA_hourly_misc * conversionRate,
              ]
            : country === "South America"
            ? [
                params.SA_hourly_fuel * conversionRate,
                params.SA_hourly_maintenance * conversionRate,
                params.SA_hourly_engine_overhaul * conversionRate,
                params.SA_hourly_ground_fees * conversionRate,
                params.SA_hourly_misc * conversionRate,
              ]
            : country === "Europe"
            ? [
                params.EU_hourly_fuel * conversionRate,
                params.EU_hourly_maintenance * conversionRate,
                params.EU_hourly_engine_overhaul * conversionRate,
                params.EU_hourly_ground_fees * conversionRate,
                params.EU_hourly_misc * conversionRate,
              ]
            : [
                params.AS_hourly_fuel * conversionRate,
                params.AS_hourly_maintenance * conversionRate,
                params.AS_hourly_engine_overhaul * conversionRate,
                params.AS_hourly_ground_fees * conversionRate,
                params.AS_hourly_misc * conversionRate,
              ],

        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

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

  const maximumAnnualValue = Math.max(
    parseInt(params.NA_annual_captain) +
      parseInt(params.NA_annual_first_office) +
      parseInt(params.NA_annual_employee_benefits),
    parseInt(params.NA_annual_crew_training),
    parseInt(params.NA_annual_hangar),
    parseInt(
      params.NA_annual_insurance_liability + params.NA_annual_insurance_hull
    ),
    parseInt(params.NA_annual_management),
    parseInt(params.NA_annual_misc)
  );

  const maximumVariableValue = Math.max(
    params.NA_hourly_fuel,
    params.NA_hourly_maintenance,
    params.NA_hourly_engine_overhaul,
    params.NA_hourly_ground_fees,
    params.NA_hourly_misc
  );

  useEffect(() => {
    setAnnualData({
      labels: [
        "Crew Salary",
        "Crew Training",
        "Hangar",
        "Insurance",
        "Management",
        "Miscellaneous Fixed",
      ],
      datasets: [
        {
          data: [
            Math.round(Number(crewSalary.split(",").join(""))),
            Math.round(Number(crewTrain.split(",").join(""))),
            Math.round(Number(hanger.split(",").join(""))),
            Math.round(
              Number(insurranceHull.split(",").join("")) +
              Number(insurranceLiability.split(",").join(""))
            ),
            Math.round(Number(management.split(",").join(""))),
            Math.round(Number(miscFixed.split(",").join(""))),
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });

    setVariableData({
      labels: [
        "Fuel Cost",
        "Maintenance",
        "Engine Overhaul",
        "Ground Fees",
        "Miscellaneous Variable",
      ],
      datasets: [
        {
          data: [
            Number(fuelCost.split(",").join("")),
            Number(maintenance.split(",").join("")),
            Number(engOverhaul.split(",").join("")),
            Number(groundFees.split(",").join("")),
            Number(miscVar.split(",").join("")),
            ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });

    setAnnualTotal((Number(crewSalary.split(",").join("")) + Number(crewTrain.split(",").join("")) + Number(hanger.split(",").join("")) + Number(insurranceHull.split(",").join("")) + Number(insurranceLiability.split(",").join("")) + Number(management.split(",").join("")) + Number(miscFixed.split(",").join(""))))
    setHourlyTotal((Number(fuelCost.split(",").join("")) + Number(maintenance.split(",").join("")) + Number(engOverhaul.split(",").join("")) + Number(groundFees.split(",").join("")) + Number(miscVar.split(",").join(""))))

  }, [params, crewSalary, crewTrain, hanger, insurranceHull, insurranceLiability, management, miscFixed, fuelCost, maintenance, engOverhaul, groundFees, miscVar])

  const onHoursChanged = (e) => {
    setNbHours(e.target.value);
    setAnnualBudget(
      currency !== "USD"
        ? ((country === "North America"
            ? parseFloat(params.NA_annual_total)
            : country === "Europe"
            ? parseFloat(params.EU_annual_total)
            : country === "South America"
            ? parseFloat(params.SA_annual_total)
            : parseFloat(params.AS_annual_total)) +
            parseFloat(e.target.value)) *
            conversionRate
        : (country === "North America"
            ? parseFloat(params.NA_annual_total)
            : country === "Europe"
            ? parseFloat(params.EU_annual_total)
            : country === "South America"
            ? parseFloat(params.SA_annual_total)
            : parseFloat(params.AS_annual_total)) + parseFloat(e.target.value)
    );
    if (e.target.value === "") {
      setAnnualBudget(params.NA_annual_total);
    }
  };

  useEffect(() => {
    setCrewSalary(
      Math.round((
        (country === "North America" ? params.NA_annual_employee_benefits : country === "South America" ? params.SA_annual_employee_benefits : country === "Europe" ? params.EU_annual_employee_benefits : params.AS_annual_employee_benefits?? 0) +
        (country === "North America" ? params.NA_annual_captain : country === "South America" ? params.SA_annual_captain : country === "Europe" ? params.EU_annual_captain : params.AS_annual_captain?? 0) +
        (country === "North America" ? params.NA_annual_first_office : country === "South America" ? params.SA_annual_first_office : country === "Europe" ? params.EU_annual_first_office : params.AS_annual_first_office?? 0)
      )*conversionRate).toLocaleString()
    );
    setCrewTrain(Math.round((country === "North America" ? params.NA_annual_crew_training : country === "South America" ? params.SA_annual_crew_training : country === "Europe" ? params.EU_annual_crew_training : params.AS_annual_crew_training?? 0)*conversionRate).toLocaleString());
    setHanger(Math.round((country === "North America" ? params.NA_annual_hangar : country === "South America" ? params.SA_annual_hangar : country === "Europe" ? params.EU_annual_hangar : params.AS_annual_hangar?? 0)*conversionRate).toLocaleString());
    setInsurranceHull(Math.round((country === "North America" ? params.NA_annual_insurance_hull : country === "South America" ? params.SA_annual_insurance_hull : country === "Europe" ? params.EU_annual_insurance_hull : params.AS_annual_insurance_hull?? 0)*conversionRate).toLocaleString());
    setInsurranceLiability(Math.round((country === "North America" ? params.NA_annual_insurance_liability : country === "South America" ? params.SA_annual_insurance_liability : country === "Europe" ? params.EU_annual_insurance_liability : params.AS_annual_insurance_liability?? 0)*conversionRate).toLocaleString());
    setManagement(Math.round((country === "North America" ? params.NA_annual_management : country === "South America" ? params.SA_annual_management : country === "Europe" ? params.EU_annual_management : params.AS_annual_management?? 0)*conversionRate).toLocaleString());
    setMiscFixed(Math.round((country === "North America" ? params.NA_annual_misc : country === "South America" ? params.SA_annual_misc : country === "Europe" ? params.EU_annual_misc : params.AS_annual_misc?? 0)*conversionRate).toLocaleString());
    setFuelCost(Math.round((country === "North America" ? params.NA_hourly_fuel : country === "South America" ? params.SA_hourly_fuel : country === "Europe" ? params.EU_hourly_fuel : params.AS_hourly_fuel?? 0)*conversionRate).toLocaleString());
    setMaintenance(Math.round((country === "North America" ? params.NA_hourly_maintenance : country === "South America" ? params.SA_hourly_maintenance : country === "Europe" ? params.EU_hourly_maintenance : params.AS_hourly_maintenance?? 0)*conversionRate).toLocaleString());
    setEngOverhaul(Math.round((country === "North America" ? params.NA_hourly_engine_overhaul : country === "South America" ? params.SA_hourly_engine_overhaul : country === "Europe" ? params.EU_hourly_engine_overhaul : params.AS_hourly_engine_overhaul?? 0)*conversionRate).toLocaleString());
    setGroundFees(Math.round((country === "North America" ? params.NA_hourly_ground_fees : country === "South America" ? params.SA_hourly_ground_fees : country === "Europe" ? params.EU_hourly_ground_fees : params.AS_hourly_ground_fees?? 0)*conversionRate).toLocaleString());
    setMiscVar(Math.round((country === "North America" ? params.NA_hourly_misc : country === "South America" ? params.SA_hourly_misc : country === "Europe" ? params.EU_hourly_misc : params.AS_hourly_misc?? 0)*conversionRate).toLocaleString());
  }, [params, country, reset])


  useEffect(() => {
    let currencyConversionRate = info[to] / info[currencyFrom]
    setCurrencyFrom(to)
    setCrewSalary(Math.round(Number(crewSalary.split(",").join(""))*currencyConversionRate).toLocaleString());
    setCrewTrain(Math.round(Number(crewTrain.split(",").join(""))*currencyConversionRate).toLocaleString());
    setHanger(Math.round(Number(hanger.split(",").join(""))*currencyConversionRate).toLocaleString());
    setInsurranceHull(Math.round(Number(insurranceHull.split(",").join(""))*currencyConversionRate).toLocaleString());
    setInsurranceLiability(Math.round(Number(insurranceLiability.split(",").join(""))*currencyConversionRate).toLocaleString());
    setManagement(Math.round(Number(management.split(",").join(""))*currencyConversionRate).toLocaleString());
    setMiscFixed(Math.round(Number(miscFixed.split(",").join(""))*currencyConversionRate).toLocaleString());
    setFuelCost(Math.round(Number(fuelCost.split(",").join(""))*currencyConversionRate).toLocaleString());
    setMaintenance(Math.round(Number(maintenance.split(",").join(""))*currencyConversionRate).toLocaleString());
    setEngOverhaul(Math.round(Number(engOverhaul.split(",").join(""))*currencyConversionRate).toLocaleString());
    setGroundFees(Math.round(Number(groundFees.split(",").join(""))*currencyConversionRate).toLocaleString());
    setMiscVar(Math.round(Number(miscVar.split(",").join(""))*currencyConversionRate).toLocaleString());
  }, [info, to])


  const wholeNumberKeyValidation = (event) => {
    const key = event.key;
    const regex = /[0-9]/;
    if (
      !regex.test(key) &&
      key !== "Backspace" &&
      key !== "Delete" &&
      key !== "ArrowUp" &&
      key !== "ArrowDown" &&
      key !== "ArrowLeft" &&
      key !== "ArrowRight" &&
      key !== "Tab"
    ) {
      event.preventDefault();
    }
  }

  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");
  const formatting = (event) =>  {
    const inputValue = removeNonNumeric(event.target.value);
    const formattedValue = Number(inputValue).toLocaleString();
    return formattedValue
  }

  const crewChange = (event) => {
    setCrewSalary(formatting(event));
  }

  const crewTrainChange = (event) => {
    setCrewTrain(formatting(event));
  }

  const hangerChange = (event) => {
    setHanger(formatting(event));
  }

  const insHullChange = (event) => {
    setInsurranceHull(formatting(event));
  }

  const insLiabilityChange = (event) => {
    setInsurranceLiability(formatting(event));
  }

  const managementChange = (event) => {
    setManagement(formatting(event));
  }

  const miscFixedChange = (event) => {
    setMiscFixed(formatting(event));
  }

  const fuelCostChange = (event) => {
    setFuelCost(formatting(event));
  }

  const maintenanceChange = (event) => {
    setMaintenance(formatting(event));
  }

  const engOverhaulChange = (event) => {
    setEngOverhaul(formatting(event));
  }

  const groundFeesChange = (event) => {
    setGroundFees(formatting(event));
  }

  const miscVarChange = (event) => {
    setMiscVar(formatting(event));
  }


  return (
    <section className={cn(global.section) + " " + global.page_break}>
      <SectionHeader title="Ownership Costs" />
      <main className={styles.ownership_main}>
        <header className={cn(styles.os_header)}>
          <h2 className={global.pdf_hidden}>
            Estimated annual flight hours:{" "}
            <div className={styles.form + " " + global.pdf_hidden}>
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
                  value={nbHours}
                  onChange={(e) => onHoursChanged(e)}
                  name="nbHours"
                  placeholder="Number of hours"
                  required
                />
              </form>
            </div>
          </h2>
          <h2>Aircraft Annual Budget</h2>
          <h3 className={cn(styles.cost)}>
            {(currency === "GBP" ? "£" : currency === "EUR" ? "€" : "$") + numeral((annualTotal + parseInt(nbHours) * hourlyTotal)).format("0,0")}
          </h3>
        </header>
        <div className={styles.pie_charts}>
          <div className={styles.pie_chart}>
            <div className={styles.pie_chart__header + " pie_containing_block"}>
              <h3>Annual Fixed Costs</h3>
              <p className={cn(styles.cost)}>
                {(currency === "GBP" ? "£" : currency === "EUR" ? "€" : "$") + numeral((annualTotal)).format("0,0")}
              </p>
              <Pie
                data={annualData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className={styles.pie_chart}>
            <div className={styles.pie_chart__header + " pie_containing_block"}>
              <h3>Variable Cost per Hour</h3>
              <p className={cn(styles.cost)}>
                {(currency === "GBP" ? "£" : currency === "EUR" ? "€" : "$") + numeral((hourlyTotal)).format("0,0")}
              </p>

              <Pie
                data={variableData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className={cn(styles.f_v_costs)}>
          <div className={cn(styles.costs_container)}>
            <h3>Annual Fixed Costs Breakdown</h3>
            <div className={cn(styles.costs)}>
              <div className={cn(styles.keys_values_container)}>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value) + " " + cn(global.row)}>
                    <span className={styles.fixed_span_medium}>Crew Salary</span>
                    <div>
                      <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                      <input
                          className={styles.input}
                          type="text"
                          name="crew_salary"
                          placeholder="Crew Salary"
                          value={crewSalary}
                          onKeyDown={wholeNumberKeyValidation}
                          onInput={crewChange}
                        />
                    </div>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill1)}
                      style={{
                        maxWidth: "101%",
                        width:
                          (Number(crewSalary.split(",").join("")) / maximumAnnualValue) * 100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value) + " " + cn(global.row)}>
                    <span className={styles.fixed_span_medium}>Crew Training</span>
                    <div>
                      <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                      <input
                        className={styles.input}
                        type="text"
                        name="crew_training"
                        placeholder="Crew Training"
                        value={crewTrain}
                        onKeyDown={wholeNumberKeyValidation}
                        onInput={crewTrainChange}
                      />
                    </div>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill2)}
                      style={{
                        maxWidth: "101%",
                        width:
                          (Number(crewTrain.split(",").join("")) /
                            maximumAnnualValue) *
                            100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value) + " " + cn(global.row)}>
                    <span className={styles.fixed_span_medium}>Hangar</span>
                    <div>
                      <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                      <input
                        className={styles.input}
                        type="text"
                        name="hangar"
                        placeholder="Hangar"
                        value={hanger}
                        onKeyDown={wholeNumberKeyValidation}
                        onInput={hangerChange}
                      />
                    </div>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill3)}
                      style={{
                        maxWidth: "101%",
                        width:
                          (Number(hanger.split(",").join("")) / maximumAnnualValue) * 100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>{" "}
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value) + " " + cn(global.row)}>
                    <span className={styles.fixed_span_medium}>Insurrance Hull</span>
                    <div>
                      <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                      <input
                        className={styles.input}
                        type="text"
                        name="insurrance_hull"
                        placeholder="Insurrance Hull"
                        value={insurranceHull}
                        onKeyDown={wholeNumberKeyValidation}
                        onInput={insHullChange}
                      />
                    </div>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill4)}
                      style={{
                        maxWidth: "101%",
                        width:
                          (Number(insurranceHull.split(",").join("")) /
                            maximumAnnualValue) *
                            100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value) + " " + cn(global.row)}>
                    <span className={styles.fixed_span_medium}>Insurrance Liability</span>
                    <div>
                      <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                      <input
                        className={styles.input}
                        type="text"
                        name="insurrance_liability"
                        placeholder="Insurrance Liability"
                        value={insurranceLiability}
                        onKeyDown={wholeNumberKeyValidation}
                        onInput={insLiabilityChange}
                      />
                    </div>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill5)}
                      style={{
                        maxWidth: "101%",
                        width:
                          (Number(insurranceLiability.split(",").join("")) /
                            maximumAnnualValue) *
                            100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value) + " " + cn(global.row)}>
                    <span className={styles.fixed_span_medium}>Managment</span>
                    <div>
                      <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                      <input
                        className={styles.input}
                        type="text"
                        name="management"
                        placeholder="Management"
                        value={management}
                        onKeyDown={wholeNumberKeyValidation}
                        onInput={managementChange}
                      />
                    </div>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill6)}
                      style={{
                        maxWidth: "101%",
                        width:
                          (Number(management.split(",").join("")) / maximumAnnualValue) *
                            100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
                {/* <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value) + " " + cn(global.row)}>
                    <span className={styles.fixed_span_medium}>Deprication Rate</span>
                    <span className={styles.fixed_span_short}>
                      {currency === "USD"
                        ? country === "North America"
                          ? "$" +
                            numeral(params.NA_annual_deprecation).format("0,0")
                          : country === "South America"
                          ? "$" +
                            numeral(params.SA_annual_deprecation).format("0,0")
                          : country === "Europe"
                          ? "$" +
                            numeral(params.EU_annual_deprecation).format("0,0")
                          : "$" +
                            numeral(params.AS_annual_deprecation).format("0,0")
                        : currency === "GBP"
                        ? country === "North America"
                          ? "£" +
                            numeral(
                              params.NA_annual_deprecation * conversionRate
                            ).format("0,0")
                          : country === "South America"
                          ? "£" +
                            numeral(
                              params.SA_annual_deprecation * conversionRate
                            ).format("0,0")
                          : country === "Europe"
                          ? "£" +
                            numeral(
                              params.EU_annual_deprecation * conversionRate
                            ).format("0,0")
                          : "£" +
                            numeral(
                              params.AS_annual_deprecation * conversionRate
                            ).format("0,0")
                        : country === "North America"
                        ? "€" +
                          numeral(
                            params.NA_annual_deprecation * conversionRate
                          ).format("0,0")
                        : country === "South America"
                        ? "€" +
                          numeral(
                            params.SA_annual_deprecation * conversionRate
                          ).format("0,0")
                        : country === "Europe"
                        ? "€" +
                          numeral(
                            params.EU_annual_deprecation * conversionRate
                          ).format("0,0")
                        : "€" +
                          numeral(
                            params.AS_annual_deprecation * conversionRate
                          ).format("0,0")}
                    </span>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill8)}
                      style={{
                        width:
                          (params.NA_annual_deprecation / maximumAnnualValue) *
                            100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div> */}
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value) + " " + cn(global.row)}>
                    <span className={styles.fixed_span_medium}>Misc Fixed</span>
                    <div>
                      <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                      <input
                        className={styles.input}
                        type="text"
                        name="misc_fixed"
                        placeholder="Misc Fixed"
                        value={miscFixed}
                        onKeyDown={wholeNumberKeyValidation}
                        onInput={miscFixedChange}
                      />
                    </div>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill7)}
                      style={{
                        width:
                          (Number(miscFixed.split(",").join("")) / maximumAnnualValue) * 100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cn(styles.costs_container)}>
            <h3>Variable Cost Breakdown (per flight hour)</h3>
            <div className={cn(styles.costs)}>
              <div className={cn(styles.keys_values_container)}>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value) + " " + cn(global.row)}>
                    <span className={styles.fixed_span_medium}>Fuel Cost</span>
                    <div>
                      <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                      <input
                        className={styles.input}
                        type="text"
                        name="fuel_cost"
                        placeholder="Fuel Cost"
                        value={fuelCost}
                        onKeyDown={wholeNumberKeyValidation}
                        onInput={fuelCostChange}
                      />
                    </div>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill1)}
                      style={{
                        maxWidth: "101%",
                        width:
                          (Number(fuelCost.split(",").join("")) / maximumVariableValue) * 100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value) + " " + cn(global.row)}>
                    <span className={styles.fixed_span_medium}>Maintenance</span>
                    <div>
                      <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                      <input
                        className={styles.input}
                        type="text"
                        name="maintenance"
                        placeholder="Maintenance"
                        value={maintenance}
                        onKeyDown={wholeNumberKeyValidation}
                        onInput={maintenanceChange}
                      />
                    </div>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill2)}
                      style={{
                        maxWidth: "101%",
                        width:
                          (Number(maintenance.split(",").join("")) /
                            maximumVariableValue) *
                            100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value) + " " + cn(global.row)}>
                    <span className={styles.fixed_span_medium}>Engine Overhaul</span>
                    <div>
                      <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                      <input
                        className={styles.input}
                        type="text"
                        name="engine_overhaul"
                        placeholder="Engine Overhaul"
                        value={engOverhaul}
                        onKeyDown={wholeNumberKeyValidation}
                        onInput={engOverhaulChange}
                      />
                    </div>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill3)}
                      style={{
                        maxWidth: "101%",
                        width:
                          (Number(engOverhaul.split(",").join("")) /
                            maximumVariableValue) *
                            100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value) + " " + cn(global.row)}>
                    <span className={styles.fixed_span_medium}>Ground Fees</span>
                    <div>
                      <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                      <input
                        className={styles.input}
                        type="text"
                        name="ground_fees"
                        placeholder="Ground Fees"
                        value={groundFees}
                        onKeyDown={wholeNumberKeyValidation}
                        onInput={groundFeesChange}
                      />
                    </div>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill4)}
                      style={{
                        maxWidth: "101%",
                        width:
                          (Number(groundFees.split(",").join("")) /
                            maximumVariableValue) *
                            100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value) + " " + cn(global.row)}>
                    <span className={styles.fixed_span_medium}>Misc Variable</span>
                    <div>
                      <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                      <input
                        className={styles.input}
                        type="text"
                        name="misc_variable"
                        placeholder="Misc Variable"
                        value={miscVar}
                        onKeyDown={wholeNumberKeyValidation}
                        onInput={miscVarChange}
                      />
                    </div>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill6)}
                      style={{
                        maxWidth: "101%",
                        width:
                          (Number(miscVar.split(",").join("")) / maximumVariableValue) * 100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.reset_values}>
          <button
            className={styles.reset_button}
            onClick={() => setReset(!reset)}
          >
            Reset Values
          </button>
        </div>
      </main>
    </section>
  );
};

export default OwnershipCosts;
