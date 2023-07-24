import React, { useEffect, useState } from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import Axios from "axios";
import numeral from "numeral";
import SectionHeader from "../shared/SectionHeader";

const OwnershipCost = ({ data, currency, country, unit,setNbHoursProp }) => {
  const [info, setInfo] = useState([]);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("usd");
  const [nbHours, setNbHours] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [currencyFrom, setCurrencyFrom] = useState(currency.toLowerCase())
  const [reset, setReset] = useState(false)

  const [annualTotal, setAnnualTotal] = useState(data.map(() => '-'));
  const [hourlyTotal, setHourlyTotal] = useState(data.map(() => '-'));
  const [crewSalary, setCrewSalary] = useState(data.map((aircraft) => (Math.round((
    (country === "North America" ? aircraft.NA_annual_employee_benefits : country === "South America" ? aircraft.SA_annual_employee_benefits : country === "Europe" ? aircraft.EU_annual_employee_benefits : aircraft.AS_annual_employee_benefits?? 0) +
    (country === "North America" ? aircraft.NA_annual_captain : country === "South America" ? aircraft.SA_annual_captain : country === "Europe" ? aircraft.EU_annual_captain : aircraft.AS_annual_captain?? 0) +
    (country === "North America" ? aircraft.NA_annual_first_office : country === "South America" ? aircraft.SA_annual_first_office : country === "Europe" ? aircraft.EU_annual_first_office : aircraft.AS_annual_first_office?? 0)
  )*conversionRate)).toLocaleString()));
  const [crewTrain, setCrewTrain] = useState(data.map((aircraft) => Math.round((country === "North America" ? aircraft.NA_annual_crew_training : country === "South America" ? aircraft.SA_annual_crew_training : country === "Europe" ? aircraft.EU_annual_crew_training : aircraft.AS_annual_crew_training?? 0)*conversionRate).toLocaleString()));
  const [hanger, setHanger] = useState(data.map((aircraft) => Math.round((country === "North America" ? aircraft.NA_annual_hangar : country === "South America" ? aircraft.SA_annual_hangar : country === "Europe" ? aircraft.EU_annual_hangar : aircraft.AS_annual_hangar?? 0)*conversionRate).toLocaleString()));
  const [insurranceHull, setInsurranceHull] = useState(data.map((aircraft) => Math.round((country === "North America" ? aircraft.NA_annual_insurance_hull : country === "South America" ? aircraft.SA_annual_insurance_hull : country === "Europe" ? aircraft.EU_annual_insurance_hull : aircraft.AS_annual_insurance_hull?? 0)*conversionRate).toLocaleString()));
  const [insurranceLiability, setInsurranceLiability] = useState(data.map((aircraft) => Math.round((country === "North America" ? aircraft.NA_annual_insurance_liability : country === "South America" ? aircraft.SA_annual_insurance_liability : country === "Europe" ? aircraft.EU_annual_insurance_liability : aircraft.AS_annual_insurance_liability?? 0)*conversionRate).toLocaleString()));
  const [management, setManagement] = useState(data.map((aircraft) => Math.round((country === "North America" ? aircraft.NA_annual_management : country === "South America" ? aircraft.SA_annual_management : country === "Europe" ? aircraft.EU_annual_management : aircraft.AS_annual_management?? 0)*conversionRate).toLocaleString()));
  const [miscFixed, setMiscFixed] = useState(data.map((aircraft) => Math.round((country === "North America" ? aircraft.NA_annual_misc : country === "South America" ? aircraft.SA_annual_misc : country === "Europe" ? aircraft.EU_annual_misc : aircraft.AS_annual_misc?? 0)*conversionRate).toLocaleString()));
  const [fuelCost, setFuelCost] = useState(data.map((aircraft) => Math.round((country === "North America" ? aircraft.NA_hourly_fuel : country === "South America" ? aircraft.SA_hourly_fuel : country === "Europe" ? aircraft.EU_hourly_fuel : aircraft.AS_hourly_fuel?? 0)*conversionRate).toLocaleString()));
  const [maintenance, setMaintenance] = useState(data.map((aircraft) => Math.round((country === "North America" ? aircraft.NA_hourly_maintenance : country === "South America" ? aircraft.SA_hourly_maintenance : country === "Europe" ? aircraft.EU_hourly_maintenance : aircraft.AS_hourly_maintenance?? 0)*conversionRate).toLocaleString()));
  const [engOverhaul, setEngOverhaul] = useState(data.map((aircraft) => Math.round((country === "North America" ? aircraft.NA_hourly_engine_overhaul : country === "South America" ? aircraft.SA_hourly_engine_overhaul : country === "Europe" ? aircraft.EU_hourly_engine_overhaul : aircraft.AS_hourly_engine_overhaul?? 0)*conversionRate).toLocaleString()));
  const [groundFees, setGroundFees] = useState(data.map((aircraft) => Math.round((country === "North America" ? aircraft.NA_hourly_ground_fees : country === "South America" ? aircraft.SA_hourly_ground_fees : country === "Europe" ? aircraft.EU_hourly_ground_fees : aircraft.AS_hourly_ground_fees?? 0)*conversionRate).toLocaleString()));
  const [miscVar, setMiscVar] = useState(data.map((aircraft) => Math.round((country === "North America" ? aircraft.NA_hourly_misc : country === "South America" ? aircraft.SA_hourly_misc : country === "Europe" ? aircraft.EU_hourly_misc : aircraft.AS_hourly_misc?? 0)*conversionRate).toLocaleString()));

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

  const onHoursChanged = (e) => {
    setNbHours(e.target.value);
    setNbHoursProp(e.target.value)
  };

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
  const formatting = (event, index, value) =>  {
    const inputValue = removeNonNumeric(event.target.value);
    const formattedValue = Number(inputValue).toLocaleString();
    const newValue = [...value];
    newValue[index] = formattedValue;
    return newValue
  }

  const crewChange = (event, index) => {
    setCrewSalary(formatting(event, index, crewSalary));
  }

  const crewTrainChange = (event, index) => {
    setCrewTrain(formatting(event, index, crewTrain));
  }

  const hangerChange = (event, index) => {
    setHanger(formatting(event, index, hanger));
  }

  const insHullChange = (event, index) => {
    setInsurranceHull(formatting(event, index, insurranceHull));
  }

  const insLiabilityChange = (event, index) => {
    setInsurranceLiability(formatting(event, index, insurranceLiability));
  }

  const managementChange = (event, index) => {
    setManagement(formatting(event, index, management));
  }

  const miscFixedChange = (event, index) => {
    setMiscFixed(formatting(event, index, miscFixed));
  }

  const fuelCostChange = (event, index) => {
    setFuelCost(formatting(event, index, fuelCost));
  }

  const maintenanceChange = (event, index) => {
    setMaintenance(formatting(event, index, maintenance));
  }

  const engOverhaulChange = (event, index) => {
    setEngOverhaul(formatting(event, index, engOverhaul));
  }

  const groundFeesChange = (event, index) => {
    setGroundFees(formatting(event, index, groundFees));
  }

  const miscVarChange = (event, index) => {
    setMiscVar(formatting(event, index, miscVar));
  }

  useEffect(() => {
    setAnnualTotal(data.map((aircraft, index) => (Number(crewSalary[index].split(",").join("")) + Number(crewTrain[index].split(",").join("")) + Number(hanger[index].split(",").join("")) + Number(insurranceHull[index].split(",").join("")) + Number(insurranceLiability[index].split(",").join("")) + Number(management[index].split(",").join("")) + Number(miscFixed[index].split(",").join("")))))
    setHourlyTotal(data.map((aircraft, index) => (Number(fuelCost[index].split(",").join("")) + Number(maintenance[index].split(",").join("")) + Number(engOverhaul[index].split(",").join("")) + Number(groundFees[index].split(",").join("")) + Number(miscVar[index].split(",").join("")))))
  }, [data, crewSalary, crewTrain, hanger, insurranceHull, insurranceLiability, management, miscFixed, fuelCost, maintenance, engOverhaul, groundFees, miscVar])

  useEffect(() => {
    let conversionRate = info[currency.toLowerCase()]
    setCrewSalary(
      data.map(aircraft => (Math.round((
        (country === "North America" ? aircraft.NA_annual_employee_benefits : country === "South America" ? aircraft.SA_annual_employee_benefits : country === "Europe" ? aircraft.EU_annual_employee_benefits : aircraft.AS_annual_employee_benefits?? 0) +
        (country === "North America" ? aircraft.NA_annual_captain : country === "South America" ? aircraft.SA_annual_captain : country === "Europe" ? aircraft.EU_annual_captain : aircraft.AS_annual_captain?? 0) +
        (country === "North America" ? aircraft.NA_annual_first_office : country === "South America" ? aircraft.SA_annual_first_office : country === "Europe" ? aircraft.EU_annual_first_office : aircraft.AS_annual_first_office?? 0)
      )*conversionRate)).toLocaleString())
    );
    setCrewTrain(data.map(aircraft => Math.round((country === "North America" ? aircraft.NA_annual_crew_training : country === "South America" ? aircraft.SA_annual_crew_training : country === "Europe" ? aircraft.EU_annual_crew_training : aircraft.AS_annual_crew_training?? 0)*conversionRate).toLocaleString()));
    setHanger(data.map(aircraft => Math.round((country === "North America" ? aircraft.NA_annual_hangar : country === "South America" ? aircraft.SA_annual_hangar : country === "Europe" ? aircraft.EU_annual_hangar : aircraft.AS_annual_hangar?? 0)*conversionRate).toLocaleString()));
    setInsurranceHull(data.map(aircraft => Math.round((country === "North America" ? aircraft.NA_annual_insurance_hull : country === "South America" ? aircraft.SA_annual_insurance_hull : country === "Europe" ? aircraft.EU_annual_insurance_hull : aircraft.AS_annual_insurance_hull?? 0)*conversionRate).toLocaleString()));
    setInsurranceLiability(data.map(aircraft => Math.round((country === "North America" ? aircraft.NA_annual_insurance_liability : country === "South America" ? aircraft.SA_annual_insurance_liability : country === "Europe" ? aircraft.EU_annual_insurance_liability : aircraft.AS_annual_insurance_liability?? 0)*conversionRate).toLocaleString()));
    setManagement(data.map(aircraft => Math.round((country === "North America" ? aircraft.NA_annual_management : country === "South America" ? aircraft.SA_annual_management : country === "Europe" ? aircraft.EU_annual_management : aircraft.AS_annual_management?? 0)*conversionRate).toLocaleString()));
    setMiscFixed(data.map(aircraft => Math.round((country === "North America" ? aircraft.NA_annual_misc : country === "South America" ? aircraft.SA_annual_misc : country === "Europe" ? aircraft.EU_annual_misc : aircraft.AS_annual_misc?? 0)*conversionRate).toLocaleString()));
    setFuelCost(data.map(aircraft => Math.round((country === "North America" ? aircraft.NA_hourly_fuel : country === "South America" ? aircraft.SA_hourly_fuel : country === "Europe" ? aircraft.EU_hourly_fuel : aircraft.AS_hourly_fuel?? 0)*conversionRate).toLocaleString()));
    setMaintenance(data.map(aircraft => Math.round((country === "North America" ? aircraft.NA_hourly_maintenance : country === "South America" ? aircraft.SA_hourly_maintenance : country === "Europe" ? aircraft.EU_hourly_maintenance : aircraft.AS_hourly_maintenance?? 0)*conversionRate).toLocaleString()));
    setEngOverhaul(data.map(aircraft => Math.round((country === "North America" ? aircraft.NA_hourly_engine_overhaul : country === "South America" ? aircraft.SA_hourly_engine_overhaul : country === "Europe" ? aircraft.EU_hourly_engine_overhaul : aircraft.AS_hourly_engine_overhaul?? 0)*conversionRate).toLocaleString()));
    setGroundFees(data.map(aircraft => Math.round((country === "North America" ? aircraft.NA_hourly_ground_fees : country === "South America" ? aircraft.SA_hourly_ground_fees : country === "Europe" ? aircraft.EU_hourly_ground_fees : aircraft.AS_hourly_ground_fees?? 0)*conversionRate).toLocaleString()));
    setMiscVar(data.map(aircraft => Math.round((country === "North America" ? aircraft.NA_hourly_misc : country === "South America" ? aircraft.SA_hourly_misc : country === "Europe" ? aircraft.EU_hourly_misc : aircraft.AS_hourly_misc?? 0)*conversionRate).toLocaleString()));
  }, [data, country, info.length, reset])

  useEffect(() => {
    let currencyConversionRate = info[to] / info[currencyFrom]
    setCurrencyFrom(to)
    setCrewSalary(data.map((aircraft, index) => Math.round(Number(crewSalary[index].split(",").join(""))*currencyConversionRate).toLocaleString()));
    setCrewTrain(data.map((aircraft, index) => Math.round(Number(crewTrain[index].split(",").join(""))*currencyConversionRate).toLocaleString()));
    setHanger(data.map((aircraft, index) => Math.round(Number(hanger[index].split(",").join(""))*currencyConversionRate).toLocaleString()));
    setInsurranceHull(data.map((aircraft, index) => Math.round(Number(insurranceHull[index].split(",").join(""))*currencyConversionRate).toLocaleString()));
    setInsurranceLiability(data.map((aircraft, index) => Math.round(Number(insurranceLiability[index].split(",").join(""))*currencyConversionRate).toLocaleString()));
    setManagement(data.map((aircraft, index) => Math.round(Number(management[index].split(",").join(""))*currencyConversionRate).toLocaleString()));
    setMiscFixed(data.map((aircraft, index) => Math.round(Number(miscFixed[index].split(",").join(""))*currencyConversionRate).toLocaleString()));
    setFuelCost(data.map((aircraft, index) => Math.round(Number(fuelCost[index].split(",").join(""))*currencyConversionRate).toLocaleString()));
    setMaintenance(data.map((aircraft, index) => Math.round(Number(maintenance[index].split(",").join(""))*currencyConversionRate).toLocaleString()));
    setEngOverhaul(data.map((aircraft, index) => Math.round(Number(engOverhaul[index].split(",").join(""))*currencyConversionRate).toLocaleString()));
    setGroundFees(data.map((aircraft, index) => Math.round(Number(groundFees[index].split(",").join(""))*currencyConversionRate).toLocaleString()));
    setMiscVar(data.map((aircraft, index) => Math.round(Number(miscVar[index].split(",").join(""))*currencyConversionRate).toLocaleString()));
  }, [to])
  

  return (
    <>
      <section className={cn(global.section, global.page_break)}>
        <SectionHeader title="Ownership Costs" />
        <main className={cn(styles.ownership_container)}>
          <center>
            <p className={styles.hidden}>Your estimated annual flight hours: </p>
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
          </center>
          <br></br>
          <br></br>
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
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Annual Budget{" "}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Annual Fixed Costs{" "}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Variable Cost per Hour{" "}
              </span>
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

                  <span
                    className={cn(
                      styles.compare_table_column_cell,
                      styles.green_value
                    )}
                  >
                    {(currency === "GBP" ? "£" : currency === "EUR" ? "€" : "$") + numeral((annualTotal[index] + parseInt(nbHours) * hourlyTotal[index])).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {(currency === "GBP" ? "£" : currency === "EUR" ? "€" : "$") + numeral((annualTotal[index])).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {(currency === "GBP" ? "£" : currency === "EUR" ? "€" : "$") + numeral((hourlyTotal[index])).format("0,0")}
                  </span>
                </div>
              );
            })}
          </div>
          <div className={cn(styles.additional_info)}>
            <br></br>
            <h3>Annual Fixed Costs Breakdown</h3>
            <div>
              <h5>Crew Salary</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span className={cn(styles.fixed_span_long,styles.fixed_span_medium)}>{aircraft.aircraft_name} </span>
                          <div>
                            <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                            <input
                              className={styles.input}
                              type="text"
                              name="crew_salary"
                              placeholder="Crew Salary"
                              value={crewSalary[index]}
                              onKeyDown={wholeNumberKeyValidation}
                              onInput={(e) => crewChange(e, index)}
                            />
                          </div>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? Number(crewSalary[index].split(',').join('')) /
                                  (Number(crewSalary[0].split(',').join('')) +
                                  Number(crewSalary[1].split(',').join('')) +
                                  Number(crewSalary[2].split(',').join(''))) *
                                      100 +
                                    "%"
                                  : Number(crewSalary[index].split(',').join('')) /
                                  (Number(crewSalary[0].split(',').join('')) +
                                  Number(crewSalary[1].split(',').join(''))) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Crew Training</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span className={cn(styles.fixed_span_long,styles.fixed_span_medium)}>{aircraft.aircraft_name} </span>
                          <div>
                            <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                            <input
                              className={styles.input}
                              type="text"
                              name="crew_training"
                              placeholder="Crew Training"
                              value={crewTrain[index]}
                              onKeyDown={wholeNumberKeyValidation}
                              onInput={(e) => crewTrainChange(e, index)}
                            />
                          </div>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? Number(crewTrain[index].split(',').join('')) /
                                  (Number(crewTrain[0].split(',').join('')) +
                                  Number(crewTrain[1].split(',').join('')) +
                                  Number(crewTrain[2].split(',').join(''))) *
                                      100 +
                                    "%"
                                  : Number(crewTrain[index].split(',').join('')) /
                                  (Number(crewTrain[0].split(',').join('')) +
                                  Number(crewTrain[1].split(',').join(''))) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Hangar</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span className={cn(styles.fixed_span_long,styles.fixed_span_medium)}>{aircraft.aircraft_name} </span>
                          <div>
                            <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                            <input
                              className={styles.input}
                              type="text"
                              name="hangar"
                              placeholder="Hangar"
                              value={hanger[index]}
                              onKeyDown={wholeNumberKeyValidation}
                              onInput={(e) => hangerChange(e, index)}
                            />
                          </div>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? Number(hanger[index].split(',').join('')) /
                                  (Number(hanger[0].split(',').join('')) +
                                  Number(hanger[1].split(',').join('')) +
                                  Number(hanger[2].split(',').join(''))) *
                                      100 +
                                    "%"
                                  : Number(hanger[index].split(',').join('')) /
                                  (Number(hanger[0].split(',').join('')) +
                                  Number(hanger[1].split(',').join(''))) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Insurance Hull</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span className={cn(styles.fixed_span_long,styles.fixed_span_medium)}>{aircraft.aircraft_name} </span>
                          <div>
                            <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                            <input
                              className={styles.input}
                              type="text"
                              name="insurrance_hull"
                              placeholder="Insurrance Hull"
                              value={insurranceHull[index]}
                              onKeyDown={wholeNumberKeyValidation}
                              onInput={(e) => insHullChange(e, index)}
                            />
                          </div>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? Number(insurranceHull[index].split(',').join('')) /
                                  (Number(insurranceHull[0].split(',').join('')) +
                                  Number(insurranceHull[1].split(',').join('')) +
                                  Number(insurranceHull[2].split(',').join(''))) *
                                      100 +
                                    "%"
                                  : Number(insurranceHull[index].split(',').join('')) /
                                  (Number(insurranceHull[0].split(',').join('')) +
                                  Number(insurranceHull[1].split(',').join(''))) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={cn(global.new_page)}/>
              <h5>Insurance Liability</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span className={cn(styles.fixed_span_long,styles.fixed_span_medium)}>{aircraft.aircraft_name} </span>
                          <div>
                            <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                            <input
                              className={styles.input}
                              type="text"
                              name="insurrance_liability"
                              placeholder="Insurrance Liability"
                              value={insurranceLiability[index]}
                              onKeyDown={wholeNumberKeyValidation}
                              onInput={(e) => insLiabilityChange(e, index)}
                            />
                          </div>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? Number(insurranceLiability[index].split(',').join('')) /
                                  (Number(insurranceLiability[0].split(',').join('')) +
                                  Number(insurranceLiability[1].split(',').join('')) +
                                  Number(insurranceLiability[2].split(',').join(''))) *
                                      100 +
                                    "%"
                                  : Number(insurranceLiability[index].split(',').join('')) /
                                  (Number(insurranceLiability[0].split(',').join('')) +
                                  Number(insurranceLiability[1].split(',').join(''))) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Management</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span className={cn(styles.fixed_span_long,styles.fixed_span_medium)}>{aircraft.aircraft_name} </span>
                          <div>
                            <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                            <input
                              className={styles.input}
                              type="text"
                              name="management"
                              placeholder="Management"
                              value={management[index]}
                              onKeyDown={wholeNumberKeyValidation}
                              onInput={(e) => managementChange(e, index)}
                            />
                          </div>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? Number(management[index].split(',').join('')) /
                                  (Number(management[0].split(',').join('')) +
                                  Number(management[1].split(',').join('')) +
                                  Number(management[2].split(',').join(''))) *
                                      100 +
                                    "%"
                                  : Number(management[index].split(',').join('')) /
                                  (Number(management[0].split(',').join('')) +
                                  Number(management[1].split(',').join(''))) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* <h5>Deprication Rate</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span className={styles.fixed_span_long}>{aircraft.aircraft_name} </span>
                          <span className={styles.fixed_span_short}>
                            {currency === "USD"
                              ? country === "North America"
                                ? "$" +
                                  numeral(
                                    aircraft.NA_annual_deprecation
                                  ).format("0,0")
                                : country === "South America"
                                ? "$" +
                                  numeral(
                                    aircraft.SA_annual_deprecation
                                  ).format("0,0")
                                : country === "Europe"
                                ? "$" +
                                  numeral(
                                    aircraft.EU_annual_deprecation
                                  ).format("0,0")
                                : "$" +
                                  numeral(
                                    aircraft.AS_annual_deprecation
                                  ).format("0,0")
                              : currency === "GBP"
                              ? country === "North America"
                                ? "£" +
                                  numeral(
                                    aircraft.NA_annual_deprecation *
                                      conversionRate
                                  ).format("0,0")
                                : country === "South America"
                                ? "£" +
                                  numeral(
                                    aircraft.SA_annual_deprecation *
                                      conversionRate
                                  ).format("0,0")
                                : country === "Europe"
                                ? "£" +
                                  numeral(
                                    aircraft.EU_annual_deprecation *
                                      conversionRate
                                  ).format("0,0")
                                : "£" +
                                  numeral(
                                    aircraft.AS_annual_deprecation *
                                      conversionRate
                                  ).format("0,0")
                              : country === "North America"
                              ? "€" +
                                numeral(
                                  aircraft.NA_annual_deprecation *
                                    conversionRate
                                ).format("0,0")
                              : country === "South America"
                              ? "€" +
                                numeral(
                                  aircraft.SA_annual_deprecation *
                                    conversionRate
                                ).format("0,0")
                              : country === "Europe"
                              ? "€" +
                                numeral(
                                  aircraft.EU_annual_deprecation *
                                    conversionRate
                                ).format("0,0")
                              : "€" +
                                numeral(
                                  aircraft.AS_annual_deprecation *
                                    conversionRate
                                ).format("0,0")}
                          </span>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? (country === "North America"
                                      ? aircraft.NA_annual_deprecation /
                                        (data[0].NA_annual_deprecation +
                                          data[1].NA_annual_deprecation +
                                          data[2].NA_annual_deprecation)
                                      : country === "South America"
                                      ? aircraft.SA_annual_deprecation /
                                        (data[0].SA_annual_deprecation +
                                          data[1].SA_annual_deprecation +
                                          data[2].SA_annual_deprecation)
                                      : country === "Europe"
                                      ? aircraft.EU_annual_deprecation /
                                        (data[0].EU_annual_deprecation +
                                          data[1].EU_annual_deprecation +
                                          data[2].EU_annual_deprecation)
                                      : aircraft.AS_annual_deprecation /
                                        (data[0].AS_annual_deprecation +
                                          data[1].AS_annual_deprecation +
                                          data[2].AS_annual_deprecation)) *
                                      100 +
                                    "%"
                                  : (country === "North America"
                                      ? aircraft.NA_hourly_deprecation /
                                        (data[0].NA_hourly_deprecation +
                                          data[1].NA_hourly_deprecation)
                                      : country === "South America"
                                      ? aircraft.SA_hourly_deprecation /
                                        (data[0].SA_hourly_deprecation +
                                          data[1].SA_hourly_deprecation)
                                      : country === "Europe"
                                      ? aircraft.EU_hourly_deprecation /
                                        (data[0].EU_hourly_deprecation +
                                          data[1].EU_hourly_deprecation)
                                      : aircraft.AS_hourly_deprecation /
                                        (data[0].AS_hourly_deprecation +
                                          data[1].AS_hourly_deprecation)) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div> */}
              <h5>Misc Fixed</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span className={cn(styles.fixed_span_long,styles.fixed_span_medium)}>{aircraft.aircraft_name} </span>
                          <div>
                            <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                            <input
                              className={styles.input}
                              type="text"
                              name="misc_fixed"
                              placeholder="Misc Fixed"
                              value={miscFixed[index]}
                              onKeyDown={wholeNumberKeyValidation}
                              onInput={(e) => miscFixedChange(e, index)}
                            />
                          </div>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? Number(miscFixed[index].split(',').join('')) /
                                  (Number(miscFixed[0].split(',').join('')) +
                                  Number(miscFixed[1].split(',').join('')) +
                                  Number(miscFixed[2].split(',').join(''))) *
                                      100 +
                                    "%"
                                  : Number(miscFixed[index].split(',').join('')) /
                                  (Number(miscFixed[0].split(',').join('')) +
                                  Number(miscFixed[1].split(',').join(''))) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <br></br>
            <br></br>
            <h3>Variable Costs Breakdown</h3>
            <div>
              <h5>Fuel Cost</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span className={cn(styles.fixed_span_long,styles.fixed_span_medium)}>{aircraft.aircraft_name} </span>
                          <div>
                            <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                            <input
                              className={styles.input}
                              type="text"
                              name="fuel_cost"
                              placeholder="Fuel Cost"
                              value={fuelCost[index]}
                              onKeyDown={wholeNumberKeyValidation}
                              onInput={(e) => fuelCostChange(e, index)}
                            />
                          </div>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? Number(fuelCost[index].split(',').join('')) /
                                  (Number(fuelCost[0].split(',').join('')) +
                                  Number(fuelCost[1].split(',').join('')) +
                                  Number(fuelCost[2].split(',').join(''))) *
                                      100 +
                                    "%"
                                  : Number(fuelCost[index].split(',').join('')) /
                                  (Number(fuelCost[0].split(',').join('')) +
                                  Number(fuelCost[1].split(',').join(''))) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Maintenance</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span className={cn(styles.fixed_span_long,styles.fixed_span_medium)}>{aircraft.aircraft_name} </span>
                          <div>
                            <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                            <input
                              className={styles.input}
                              type="text"
                              name="maintenance"
                              placeholder="Maintenance"
                              value={maintenance[index]}
                              onKeyDown={wholeNumberKeyValidation}
                              onInput={(e) => maintenanceChange(e, index)}
                            />
                          </div>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? Number(maintenance[index].split(',').join('')) /
                                  (Number(maintenance[0].split(',').join('')) +
                                  Number(maintenance[1].split(',').join('')) +
                                  Number(maintenance[2].split(',').join(''))) *
                                      100 +
                                    "%"
                                  : Number(maintenance[index].split(',').join('')) /
                                  (Number(maintenance[0].split(',').join('')) +
                                  Number(maintenance[1].split(',').join(''))) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Engine Overhaul</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span className={cn(styles.fixed_span_long,styles.fixed_span_medium)}>{aircraft.aircraft_name} </span>
                          <div>
                            <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                            <input
                              className={styles.input}
                              type="text"
                              name="engine_overhaul"
                              placeholder="Engine Overhaul"
                              value={engOverhaul[index]}
                              onKeyDown={wholeNumberKeyValidation}
                              onInput={(e) => engOverhaulChange(e, index)}
                            />
                          </div>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? Number(engOverhaul[index].split(',').join('')) /
                                  (Number(engOverhaul[0].split(',').join('')) +
                                  Number(engOverhaul[1].split(',').join('')) +
                                  Number(engOverhaul[2].split(',').join(''))) *
                                      100 +
                                    "%"
                                  : Number(engOverhaul[index].split(',').join('')) /
                                  (Number(engOverhaul[0].split(',').join('')) +
                                  Number(engOverhaul[1].split(',').join(''))) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Ground Fees</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span className={cn(styles.fixed_span_long,styles.fixed_span_medium)}>{aircraft.aircraft_name} </span>
                          <div>
                            <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                            <input
                              className={styles.input}
                              type="text"
                              name="ground_fees"
                              placeholder="Ground Fees"
                              value={groundFees[index]}
                              onKeyDown={wholeNumberKeyValidation}
                              onInput={(e) => groundFeesChange(e, index)}
                            />
                          </div>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? Number(groundFees[index].split(',').join('')) /
                                  (Number(groundFees[0].split(',').join('')) +
                                  Number(groundFees[1].split(',').join('')) +
                                  Number(groundFees[2].split(',').join(''))) *
                                      100 +
                                    "%"
                                  : Number(groundFees[index].split(',').join('')) /
                                  (Number(groundFees[0].split(',').join('')) +
                                  Number(groundFees[1].split(',').join(''))) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Misc Variable</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span className={cn(styles.fixed_span_long,styles.fixed_span_medium)}>{aircraft.aircraft_name} </span>
                          <div>
                            <span>{currency === "USD" ? "$ " : currency === "EUR" ? "€ " : "£ "}</span>
                            <input
                              className={styles.input}
                              type="text"
                              name="misc_variable"
                              placeholder="Misc Variable"
                              value={miscVar[index]}
                              onKeyDown={wholeNumberKeyValidation}
                              onInput={(e) => miscVarChange(e, index)}
                            />
                          </div>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? Number(miscVar[index].split(',').join('')) /
                                  (Number(miscVar[0].split(',').join('')) +
                                  Number(miscVar[1].split(',').join('')) +
                                  Number(miscVar[2].split(',').join(''))) *
                                      100 +
                                    "%"
                                  : Number(miscVar[index].split(',').join('')) /
                                  (Number(miscVar[0].split(',').join('')) +
                                  Number(miscVar[1].split(',').join(''))) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
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
    </>
  );
};
export default OwnershipCost;
