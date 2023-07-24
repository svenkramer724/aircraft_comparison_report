import React from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";
import styles from "./styles/styles.module.scss";
import numeral from "numeral";

const Weights = ({ data, currency, country, unit }) => {
  return (
    <>
      <section className={cn(global.section)}>
        <SectionHeader title="Weights" />
        <main>
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
                Max Take-Off Weight{" "}
                {unit === "Imperial Units" ? "(lbs)" : "(KG)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Max Landing Weight{" "}
                {unit === "Imperial Units" ? "(lbs)" : "(KG)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Max Ramp Weight {unit === "Imperial Units" ? "(lbs)" : "(KG)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Available Fuel {unit === "Imperial Units" ? "(lbs)" : "(KG)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Max Payload {unit === "Imperial Units" ? "(lbs)" : "(KG)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Useful Payload {unit === "Imperial Units" ? "(lbs)" : "(KG)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Basic Operating Weight{" "}
                {unit === "Imperial Units" ? "(lbs)" : "(KG)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Baggage Weight {unit === "Imperial Units" ? "(lbs)" : "(KG)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Total Baggage {unit === "Imperial Units" ? "(Cubic Feet)" : "(Cubic Meters)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Internal Baggage {unit === "Imperial Units" ? "(Cubic Feet)" : "(Cubic Meters)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                External Baggage {unit === "Imperial Units" ? "(Cubic Feet)" : "(Cubic Meters)"}
              </span>
            </div>
            {data.map((aircraft) => {
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
                    {unit === "Imperial Units"
                      ? aircraft.MTOW_lbs === 0
                        ? "-"
                        : numeral(aircraft.MTOW_lbs).format("0,0")
                      : aircraft.MTOW_kgs === 0
                      ? "-"
                      : numeral(aircraft.MTOW_kgs).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.max_landing_weight_lbs === 0
                        ? "-"
                        : numeral(aircraft.max_landing_weight_lbs).format("0,0")
                      : aircraft.max_landing_weight_kgs === 0
                      ? "-"
                      : numeral(aircraft.max_landing_weight_kgs).format(
                          "0,0"
                        )}{" "}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.max_ramp_weight_lbs === 0
                        ? "-"
                        : numeral(aircraft.max_ramp_weight_lbs).format("0,0")
                      : aircraft.max_ramp_weight_kgs === 0
                      ? "-"
                      : numeral(aircraft.max_ramp_weight_kgs).format(
                          "0,0"
                        )}{" "}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.available_fuel_lbs === 0
                        ? "-"
                        : numeral(aircraft.available_fuel_lbs).format("0,0")
                      : aircraft.available_fuel_kgs === 0
                      ? "-"
                      : numeral(aircraft.available_fuel_kgs).format("0,0")}{" "}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.max_payload_lbs === 0
                        ? "-"
                        : numeral(aircraft.max_payload_lbs).format("0,0")
                      : aircraft.max_payload_kgs === 0
                      ? "-"
                      : numeral(aircraft.max_payload_kgs).format("0,0")}{" "}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.useful_load_lbs === 0
                        ? "-"
                        : numeral(aircraft.useful_load_lbs).format("0,0")
                      : aircraft.useful_payloads_kgs === 0
                      ? "-"
                      : numeral(aircraft.useful_payloads_kgs).format(
                          "0,0"
                        )}{" "}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.basic_operating_weight_lbs === 0
                        ? "-"
                        : numeral(aircraft.basic_operating_weight_lbs).format(
                            "0,0"
                          )
                      : aircraft.basic_operating_weight_kgs === 0
                      ? "-"
                      : numeral(aircraft.basic_operating_weight_kgs).format(
                          "0,0"
                        )}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.baggage_weight_lbs === 0
                        ? "-"
                        : numeral(aircraft.baggage_weight_lbs).format("0,0")
                      : aircraft.baggage_weight_kgs === 0
                      ? "-"
                      : numeral(aircraft.baggage_weight_kgs).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.baggage_capacity_CF === 0
                        ? "-"
                        : aircraft.baggage_capacity_CF
                      : aircraft.baggage_capacity_cubicmeters === 0
                      ? "-"
                      : aircraft.baggage_capacity_cubicmeters}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.internal_baggage_CF === 0
                        ? "-"
                        : aircraft.internal_baggage_CF
                      : aircraft.internal_baggage_cubicmeters === 0
                      ? "-"
                      : aircraft.internal_baggage_cubicmeters}{" "}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.external_baggage_CF === 0
                        ? "-"
                        : aircraft.external_baggage_CF
                      : aircraft.external_baggage_cubicmeters === 0
                      ? "-"
                      : aircraft.external_baggage_cubicmeters}
                  </span>
                </div>
              );
            })}
          </div>
        </main>
      </section>
    </>
  );
};
export default Weights;
